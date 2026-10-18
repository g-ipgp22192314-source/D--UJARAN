"use strict";
const DEFAULTS = window.A4_MISSIONS,
  app = document.querySelector("#app"),
  utteranceAudio = document.querySelector("#utterance-audio"),
  KEY = "dujaran-a4-v1";
const positions = [
    [17, 23],
    [37, 23],
    [47, 57],
    [19, 73],
    [68, 57],
    [83, 24],
    [84, 78],
    [57, 80],
  ],
  icons = ["🧭", "💝", "🤝", "💚", "🎨", "🛡️", "🌙", "👑"];
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
let state = {
    profile: null,
    completed: {},
    settings: { music: false, sfx: false, reduce: false },
    overrides: {},
  },
  storageOK = true;
try {
  const x = JSON.parse(localStorage.getItem(KEY) || "null");
  if (x && typeof x === "object") {
    state.profile =
      x.profile &&
      typeof x.profile.name === "string" &&
      typeof x.profile.className === "string"
        ? x.profile
        : null;
    state.completed =
      x.completed && typeof x.completed === "object" ? x.completed : {};
    state.settings = { ...state.settings, ...x.settings };
    state.overrides =
      x.overrides && typeof x.overrides === "object" ? x.overrides : {};
  }
} catch {
  storageOK = false;
}
let missions = structuredClone(DEFAULTS),
  current = null,
  stage = 0,
  view = "intro",
  proofs = new Map(),
  assessment = [false, false, false],
  hintOpen = false,
  requestGeneration = 0;
function applyOverrides() {
  missions = structuredClone(DEFAULTS);
  for (const m of missions) {
    const o = state.overrides[m.id];
    if (
      o &&
      typeof o.main === "string" &&
      typeof o.follow === "string" &&
      Array.isArray(o.hints)
    ) {
      m.stages[0].utterance = o.main;
      m.stages[1].utterance = o.follow;
      m.hints = o.hints;
      m.teacherExample =
        typeof o.example === "string" ? o.example : m.teacherExample;
      m.stages[0].audioUrl = typeof o.audio0 === "string" ? o.audio0 : "";
      m.stages[1].audioUrl = typeof o.audio1 === "string" ? o.audio1 : "";
    }
  }
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    storageOK = false;
    toast(
      "Simpanan pelayar tidak tersedia. Kemajuan hanya tersedia sepanjang sesi ini.",
    );
  }
}
function completed(id) {
  return state.completed[id]?.done === true;
}
function count() {
  return missions.filter((m) => completed(m.id)).length;
}
function unlocked(id) {
  return id === 1 || missions.slice(0, id - 1).every((m) => completed(m.id));
}
function toast(msg) {
  const t = document.querySelector("#toast");
  t.textContent = msg;
  t.classList.add("visible");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("visible"), 6500);
}
function key() {
  return `${current.id}:${stage}`;
}
function hasProof(s = stage) {
  return current && proofs.has(`${current.id}:${s}`);
}
let context = null,
  musicTimer = null,
  musicNodes = [],
  duck = false;
function getContext() {
  if (!window.AudioContext) return null;
  context ??= new AudioContext();
  context.resume().catch(() => {});
  return context;
}
function tone(frequency, time, duration, volume = 0.035) {
  const c = getContext();
  if (!c) return;
  const osc = c.createOscillator(),
    gain = c.createGain();
  osc.type = "sine";
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(volume, time + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(time);
  osc.stop(time + duration + 0.02);
  return { osc, gain };
}
function effect(win = false) {
  if (!state.settings.sfx || duck) return;
  const c = getContext();
  if (!c) return;
  (win ? [523, 659, 784, 1047] : [620]).forEach((f, i) =>
    tone(f, c.currentTime + i * 0.11, 0.18, 0.045),
  );
}
function stopMusic() {
  clearInterval(musicTimer);
  musicTimer = null;
  for (const n of musicNodes)
    try {
      n.osc.stop();
    } catch {}
  musicNodes = [];
}
function updateMusic() {
  stopMusic();
  if (!state.settings.music || duck || document.hidden) return;
  const c = getContext();
  if (!c) return;
  let index = 0;
  const notes = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23];
  const play = () => {
    musicNodes = musicNodes.filter((n) => n.until > c.currentTime);
    const n = tone(notes[index++ % notes.length], c.currentTime, 0.55, 0.012);
    if (n) musicNodes.push({ ...n, until: c.currentTime + 0.6 });
  };
  play();
  musicTimer = setInterval(play, 700);
}
function setDuck(value) {
  duck = value;
  updateMusic();
}
function stopPlayback() {
  requestGeneration++;
  utteranceAudio.pause();
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  document.querySelector("#recording-preview")?.pause();
  setDuck(false);
  document.querySelector(".audio-card")?.classList.remove("speaking");
}
function allowLeave() {
  if (recorder.active || recorder.pending)
    return confirm(
      "Rakaman sedang berjalan. Keluar akan membuang rakaman yang belum dihentikan. Teruskan?",
    );
  return true;
}
function cleanup() {
  recorder.cancel();
  stopPlayback();
}
function render(html) {
  cleanup();
  app.innerHTML = html;
  app.focus({ preventScroll: true });
  scrollTo({ top: 0, behavior: "instant" });
}
function avatar(name = "Wira", toneClass = "") {
  return `<div class="avatar ${toneClass}" aria-label="${esc(name)}"><span class="avatar-hair"></span><span class="avatar-head"><i></i><i></i><b>⌣</b></span><span class="avatar-body"></span><span class="arm left-arm"></span><span class="arm right-arm"></span><span class="leg left-leg"></span><span class="leg right-leg"></span></div>`;
}
function scenery() {
  return `<div class="sky-cloud one"></div><div class="sky-cloud two"></div><span class="butterfly" aria-hidden="true">🦋</span><span class="bird" aria-hidden="true">⌁</span>`;
}
function house(n, color = "#f6c4df", kind = "house") {
  return `<svg viewBox="0 0 160 140" aria-hidden="true"><ellipse cx="80" cy="127" rx="68" ry="11" fill="#24694e" opacity=".18"/><path d="M24 62L101 45L144 66L68 84Z" fill="#fff4cf"/><path d="M24 62L68 84V126L24 103Z" fill="${color}"/><path d="M68 84L144 66V110L68 126Z" fill="#fff0ce"/><path d="M12 59L79 10L153 51L86 71Z" fill="#d56b60"/><path d="M12 59L86 71L86 82L12 69Z" fill="#a74144"/><path d="M86 71L153 51V62L86 82Z" fill="#ab4954"/><path d="M35 77L53 85V106L35 98Z" fill="#5bb5cd" stroke="white" stroke-width="3"/><path d="M83 91L106 85V116L83 121Z" fill="#43768b"/><path d="M115 84L132 80V97L115 102Z" fill="#75d7df" stroke="white" stroke-width="3"/><path d="M82 22L105 34L105 49L82 37Z" fill="#f8ae7d"/></svg>`;
}
function intro() {
  view = "intro";
  current = null;
  render(
    `<section class="intro"><div class="intro-copy"><span class="eyebrow">D-UJARAN · MOD A · TAHUN 4</span><h1>SUARA<br><em>JIRAN CILIK</em></h1><p class="kicker">PENGEMBARAAN WIRA KOMUNIKASI</p><h2>SELAMAT DATANG,<br>WIRA KOMUNIKASI!</h2><p class="lead">8 misi baharu menanti kamu! Dengar ujaran jiran, fikirkan respons yang sesuai dan rakam suara kamu!</p><p class="motto">Dengar • Fikir • Bertutur • Jadi Wira!</p><form id="profile-form" class="profile-card"><label>Nama murid<input name="name" id="student-name" required maxlength="60" autocomplete="off" value="${esc(state.profile?.name || "")}" placeholder="Nama panggilan kamu"></label><label>Kelas<input name="className" id="student-class" required maxlength="40" autocomplete="off" value="${esc(state.profile?.className || "")}" placeholder="Contoh: 4 Cemerlang"></label><button class="primary" type="submit">▶ MULA PENGEMBARAAN</button></form><div class="actions"><button id="help-button" class="gold">▤ CARA BERMAIN</button><a class="button secondary" href="${esc(window.A4_SETTINGS.portalUrl)}">← KEMBALI KE D-UJARAN</a></div><small>Nama dan kelas disimpan pada pelayar ini sahaja.</small></div><div class="intro-world">${scenery()}<div class="sun"></div><div class="mini-town"><div class="town-house h1">${house(1)}</div><div class="town-house h2">${house(2, "#b9d3ff")}</div><div class="town-house h3">${house(3, "#ffdc92")}</div><div class="tree t1">🌳</div><div class="tree t2">🌳</div><div class="town-road"></div><div class="gate"><span>TAMAN HARMONI 3D</span><i></i><i></i></div><div class="welcome-avatar">${avatar("Wira Komunikasi")}</div></div><div class="world-label">✦ 8 misi · 16 cabaran suara · 1 wira hebat</div></div></section>`,
  );
  document.querySelector("#profile-form").onsubmit = (e) => {
    e.preventDefault();
    const name = document.querySelector("#student-name").value.trim(),
      className = document.querySelector("#student-class").value.trim();
    if (!name || !className) {
      toast("Isi nama dan kelas dahulu.");
      return;
    }
    state.profile = { name, className };
    save();
    effect();
    mapView();
  };
  document.querySelector("#help-button").onclick = () =>
    document.querySelector("#help").showModal();
}
function mapView() {
  if (!state.profile) {
    intro();
    return;
  }
  view = "map";
  current = null;
  const done = count();
  render(
    `<section class="page"><div class="section-heading"><div><span class="eyebrow">PETA PENGEMBARAAN</span><h1>Taman Harmoni 3D</h1><p>Hai, ${esc(state.profile.name)}! Pilih lokasi yang terbuka dan bantu jiran kamu.</p></div><div class="progress-card"><b>${done}/8 misi selesai</b><progress max="8" value="${done}" aria-label="Kemajuan misi"></progress></div></div><div class="map-scroll"><div class="neighborhood-map">${scenery()}<svg class="map-paths" viewBox="0 0 1000 650" preserveAspectRatio="none" aria-hidden="true"><path d="M80 160H830V535H575V380H190V480M460 160V380H680" stroke="#fff2cc" stroke-width="55" fill="none" stroke-linejoin="round"/><path d="M80 160H830V535H575V380H190V480M460 160V380H680" stroke="#c2aa8a" stroke-width="3" stroke-dasharray="12 12" fill="none"/><path d="M180 190H455V335" stroke="#2476b6" stroke-width="6" fill="none"/><path d="M440 320L455 340L470 320" stroke="#2476b6" stroke-width="5" fill="none"/></svg><span class="map-tree mt1">🌳</span><span class="map-tree mt2">🌳</span><span class="map-tree mt3">🌴</span><span class="map-pond">≈</span>${missions.map((m, i) => `<button class="map-location ${completed(m.id) ? "finished" : unlocked(m.id) ? "available" : "locked"}" style="left:${positions[i][0]}%;top:${positions[i][1]}%" data-mission="${m.id}" ${unlocked(m.id) ? "" : "disabled"} aria-label="Misi ${m.id}: ${esc(m.title)}. ${completed(m.id) ? "Selesai, boleh ulang latihan" : unlocked(m.id) ? "Terbuka" : "Terkunci"}"><div class="building">${house(m.id, ["#f8b8da", "#c3afff", "#ffd086", "#b0e5c8"][i % 4])}</div><span class="location-label"><b>${completed(m.id) ? "🏅" : unlocked(m.id) ? icons[i] : "🔒"} ${m.id}. ${m.location}</b><small>${completed(m.id) ? "SELESAI" : unlocked(m.id) ? "TERBUKA" : "TERKUNCI"}</small></span></button>`).join("")}<div class="map-avatar" aria-hidden="true">${avatar()}</div></div></div><p class="map-guide">🧭 Dari Rumah Jiran Baharu, ikut jalan biru terus ke simpang dan belok kanan ke taman permainan. Dewan Hari Keluarga bersebelahan taman. Pada skrin kecil, tatal peta ke sisi.</p><div class="actions"><button class="gold" id="gallery-button">✦ GALERI LENCANA</button>${done === 8 ? '<button class="primary" id="victory-button">🏆 PENTAS KEMENANGAN</button>' : ""}<button id="profile-button" class="secondary">Sunting nama / kelas</button></div>${storageOK ? "" : '<p role="status">Kemajuan tidak dapat disimpan secara kekal pada pelayar ini.</p>'}</section>`,
  );
  app
    .querySelectorAll("[data-mission]")
    .forEach((b) => (b.onclick = () => openMission(Number(b.dataset.mission))));
  document.querySelector("#gallery-button").onclick = gallery;
  document.querySelector("#profile-button").onclick = intro;
  const win = document.querySelector("#victory-button");
  if (win) win.onclick = victory;
}
function openMission(id) {
  if (!unlocked(id)) {
    toast("Selesaikan misi sebelumnya dahulu.");
    return;
  }
  current = missions.find((m) => m.id === id);
  stage = 0;
  assessment = [false, false, false];
  hintOpen = false;
  view = "mission";
  effect();
  missionView();
}
function missionView() {
  view = "mission";
  const m = current,
    s = m.stages[stage],
    r = recorder.recordings.get(key());
  render(
    `<section class="page mission-page"><div class="section-heading"><div><span class="eyebrow">MISI ${m.id}/8 · ${m.level}</span><h1>${m.title}</h1><p>${m.location}</p></div><div class="mission-mark">${icons[m.id - 1]}</div></div><ol class="stages"><li class="${stage === 0 ? "active" : "done"}" ${stage === 0 ? 'aria-current="step"' : ""}>1 · Latihan Suara Harmoni</li><li class="${stage === 1 ? "active" : ""}" ${stage === 1 ? 'aria-current="step"' : ""}>2 · Cabaran Wira Komunikasi</li></ol><div class="mission-layout"><aside class="situation"><div class="scene-block scene-${m.id}">${scenery()}<div class="scene-building">${house(m.id)}</div><div class="neighbor">${avatar("Jiran", m.id % 3 === 0 ? "tone-deep" : m.id % 2 === 0 ? "tone-warm" : "")}</div><div class="scene-item">${icons[m.id - 1]}</div></div><h2>Situasi kamu</h2><p>${m.situation}</p><p class="scene-location">📍 ${m.location}</p></aside><div class="mission-task"><h2>${stage === 0 ? "LATIHAN SUARA HARMONI" : "CABARAN WIRA KOMUNIKASI"}</h2><div class="speech-bubble"><span>Ujaran jiran</span><p>${esc(s.utterance)}</p></div><div class="audio-card"><div class="wave" aria-hidden="true">${"<i></i>".repeat(12)}</div><div class="actions compact"><button class="primary" id="listen">▶ DENGAR UJARAN</button><button class="secondary" id="relisten">↻ DENGAR SEMULA</button></div><p id="audio-status" role="status">${s.audioUrl ? "Audio guru ditetapkan." : "Audio guru belum ditetapkan. Suara ms-MY akan digunakan jika tersedia; ujaran juga boleh dibaca."}</p></div><p class="instruction">${stage === 0 ? "Fikirkan respons yang sesuai, jelas dan sopan. Kemudian rakam suara kamu." : "Berikan respons spontan terhadap ujaran susulan. Gunakan idea sendiri dan bahasa yang sopan."}</p>${stage === 0 ? `<button id="hint" class="gold" aria-expanded="${hintOpen}">💡 PETUNJUK</button><p id="hint-content" class="hint" ${hintOpen ? "" : "hidden"}>${m.hints.map(esc).join(" · ")}</p>` : ""}<section class="recorder-card" aria-label="Rakaman suara murid"><div class="record-heading"><span class="mic" aria-hidden="true">🎙️</span><div><h3>Studio suara kamu</h3><p id="record-status" role="status">${r ? "Rakaman tersedia untuk didengar dan dimuat turun." : hasProof() ? "Aktiviti lisan telah disahkan guru." : "Tekan MULA RAKAM dan benarkan mikrofon."}</p></div><output id="timer" aria-label="Tempoh rakaman">00:00</output></div><div class="actions compact"><button id="record-start" class="record-button">● MULA RAKAM</button><button id="record-stop" class="secondary" disabled>■ BERHENTI</button></div><div class="record-tools" ${r ? "" : "hidden"}><audio id="recording-preview" controls ${r ? 'src="' + r.url + '"' : ""} aria-label="Rakaman respons kamu"></audio><div class="actions compact"><button id="record-play" class="secondary">▶ DENGAR RAKAMAN</button><button id="record-again" class="gold">↻ RAKAM SEMULA</button><button id="record-download" class="secondary">↓ MUAT TURUN</button></div></div><p class="record-note">Rakaman kekal dalam sesi ini sahaja. Muat turun sebelum menutup halaman. Had satu rakaman: 2 minit. Audio tidak dimuat naik ke pelayan.</p><button id="mic-help" class="text-button">Mikrofon tidak boleh digunakan?</button><p id="mic-guidance" hidden>Benarkan mikrofon melalui tetapan laman, gunakan HTTPS dan semak peranti audio. Jika masih gagal, minta guru membuka Panel Guru untuk mengurus aktiviti lisan secara berasingan.</p></section>${stage === 1 ? `<fieldset class="self-check"><legend>Semak pertuturan kamu</legend>${["Saya memberikan respons yang sesuai.", "Saya menggunakan bahasa yang sopan.", "Saya bertutur dengan jelas."].map((t, i) => `<label><input type="checkbox" data-check="${i}" ${assessment[i] ? "checked" : ""}>${t}</label>`).join("")}<p>Ini penilaian kendiri. Aplikasi tidak menilai ketepatan pertuturan secara automatik.</p></fieldset>` : ""}<p id="gate-status" role="status"></p><div class="actions navigation"><button class="secondary" id="mission-back">← ${stage === 0 ? "PETA MISI" : "PERINGKAT 1"}</button><button class="primary" id="mission-next">${stage === 0 ? "TERUSKAN KE PERINGKAT 2 →" : "✦ SELESAIKAN MISI"}</button></div></div></div></section>`,
  );
  document.querySelector("#listen").onclick = () =>
    playUtterance(current.stages[stage]);
  document.querySelector("#relisten").onclick = () =>
    playUtterance(current.stages[stage]);
  if (stage === 0)
    document.querySelector("#hint").onclick = () => {
      hintOpen = !hintOpen;
      document.querySelector("#hint-content").hidden = !hintOpen;
      document.querySelector("#hint").setAttribute("aria-expanded", hintOpen);
    };
  document.querySelector("#record-start").onclick = startRecording;
  document.querySelector("#record-stop").onclick = () => recorder.stop();
  document.querySelector("#record-play").onclick = () => {
    const audio = document.querySelector("#recording-preview");
    stopPlayback();
    setDuck(true);
    audio.play().catch(() => {
      setDuck(false);
      toast("Rakaman tidak dapat dimainkan. Muat turun atau rakam semula.");
    });
  };
  document.querySelector("#record-download").onclick = () => {
    if (!recorder.download(key(), `A4_M${m.id}_P${stage + 1}`))
      toast("Tiada rakaman untuk dimuat turun.");
  };
  document.querySelector("#record-again").onclick = () => {
    if (!confirm("Buang rakaman peringkat ini dan rakam semula?")) return;
    stopPlayback();
    recorder.remove(key());
    proofs.delete(key());
    missionView();
  };
  document.querySelector("#mic-help").onclick = () => {
    document.querySelector("#mic-guidance").hidden = false;
  };
  document.querySelector("#mission-back").onclick = () => {
    if (!allowLeave()) return;
    if (stage === 1) {
      stage = 0;
      missionView();
    } else mapView();
  };
  document.querySelector("#mission-next").onclick = () => {
    if (!canContinue()) return;
    if (stage === 0) {
      stage = 1;
      missionView();
    } else finishMission();
  };
  app.querySelectorAll("[data-check]").forEach(
    (e) =>
      (e.onchange = () => {
        assessment[Number(e.dataset.check)] = e.checked;
        updateGate();
      }),
  );
  const preview = document.querySelector("#recording-preview");
  if (preview) {
    preview.onplay = () => setDuck(true);
    preview.onpause = () => setDuck(false);
    preview.onended = () => setDuck(false);
  }
  updateGate();
}
function canContinue() {
  return !!(
    hasProof() &&
    !recorder.active &&
    !recorder.pending &&
    (stage === 0 || (hasProof(0) && assessment.every(Boolean)))
  );
}
function updateGate() {
  const b = document.querySelector("#mission-next");
  if (!b) return;
  b.disabled = !canContinue();
  document.querySelector("#gate-status").textContent =
    recorder.active || recorder.pending
      ? "Hentikan rakaman dahulu."
      : !hasProof()
        ? "Lengkapkan sekurang-kurangnya satu rakaman sebelum meneruskan."
        : stage === 1 && !assessment.every(Boolean)
          ? "Lengkapkan tiga perkara dalam penilaian kendiri."
          : hasProof() && proofs.get(key())?.type === "oral"
            ? "Peringkat ini disahkan sebagai aktiviti lisan bersama guru."
            : "Rakaman peringkat ini telah selesai.";
}
const recorder = new A4Recorder((kind, seconds, message) => {
  const status = document.querySelector("#record-status"),
    start = document.querySelector("#record-start"),
    stop = document.querySelector("#record-stop"),
    timer = document.querySelector("#timer");
  if (timer)
    timer.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  if (kind === "request") {
    if (start) start.disabled = true;
    if (status) status.textContent = "Menunggu kebenaran mikrofon…";
  }
  if (kind === "recording") {
    if (stop) stop.disabled = false;
    if (status)
      status.textContent =
        "Sedang merakam. Berikan respons kamu, kemudian tekan BERHENTI.";
    document.querySelector(".recorder-card")?.classList.add("is-recording");
  }
  if (kind === "saved") {
    proofs.set(key(), { type: "recording", duration: seconds });
    setDuck(false);
    missionView();
    return;
  }
  if (kind === "error") {
    setDuck(false);
    if (status) status.textContent = message;
    document.querySelector(".recorder-card")?.classList.remove("is-recording");
    if (start) start.disabled = false;
    if (stop) stop.disabled = true;
  }
  updateGate();
});
async function startRecording() {
  stopPlayback();
  setDuck(true);
  try {
    await recorder.start(key());
  } catch (e) {
    setDuck(false);
    const el = document.querySelector("#record-status");
    if (el) el.textContent = e.message;
    const b = document.querySelector("#record-start");
    if (b) b.disabled = false;
    updateGate();
  }
}
async function playUtterance(s) {
  if (recorder.active || recorder.pending) {
    toast("Hentikan rakaman sebelum memainkan ujaran.");
    return;
  }
  stopPlayback();
  const token = requestGeneration;
  setDuck(true);
  const status = (t) => {
    const e = document.querySelector("#audio-status");
    if (e) e.textContent = t;
    const tstatus = document.querySelector("#teacher-status");
    if (document.querySelector("#teacher-panel").open && tstatus)
      tstatus.textContent = t;
  };
  const speaking = () =>
    document.querySelector(".audio-card")?.classList.add("speaking");
  if (s.audioUrl) {
    if (!/^https:\/\//i.test(s.audioUrl)) {
      status("URL audio mesti menggunakan HTTPS.");
      setDuck(false);
      return;
    }
    utteranceAudio.src = s.audioUrl;
    try {
      await utteranceAudio.play();
      if (token !== requestGeneration) return;
      speaking();
      status("Sedang memainkan rakaman guru.");
      return;
    } catch {
      if (token !== requestGeneration) return;
      status("Audio guru gagal dimuatkan. Mencuba suara ms-MY yang tersedia.");
    }
  }
  if ("speechSynthesis" in window) {
    let voices = speechSynthesis
      .getVoices()
      .filter((v) => v.lang.toLowerCase() === "ms-my");
    if (!voices.length) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      voices = speechSynthesis
        .getVoices()
        .filter((v) => v.lang.toLowerCase() === "ms-my");
    }
    if (token !== requestGeneration) return;
    if (voices.length) {
      const u = new SpeechSynthesisUtterance(s.utterance);
      u.lang = "ms-MY";
      u.voice = voices[0];
      u.rate = 0.9;
      u.onend = () => {
        if (token === requestGeneration) {
          status("Ujaran selesai. Fikirkan respons kamu.");
          setDuck(false);
          document.querySelector(".audio-card")?.classList.remove("speaking");
        }
      };
      u.onerror = () => {
        if (token === requestGeneration) {
          status(
            "Suara tidak dapat dimainkan. Baca ujaran atau minta guru menetapkan MP3.",
          );
          setDuck(false);
        }
      };
      speechSynthesis.speak(u);
      speaking();
      status("Menggunakan suara automatik Bahasa Melayu Malaysia.");
      return;
    }
  }
  status(
    "Suara ms-MY tidak tersedia. Baca ujaran atau minta guru menetapkan fail MP3. Suara bahasa lain tidak digunakan.",
  );
  setDuck(false);
}
utteranceAudio.onended = () => {
  setDuck(false);
  document.querySelector(".audio-card")?.classList.remove("speaking");
  const e = document.querySelector("#audio-status");
  if (e) e.textContent = "Ujaran selesai.";
};
utteranceAudio.onerror = () => setDuck(false);
function finishMission() {
  if (!current || stage !== 1 || !canContinue()) return;
  state.completed[current.id] = {
    done: true,
    date: new Date().toISOString(),
    evidence: [proofs.get(`${current.id}:0`), proofs.get(`${current.id}:1`)],
    selfAssessment: assessment.slice(),
  };
  save();
  reward();
}
function confetti() {
  if (
    state.settings.reduce ||
    matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  const el = document.createElement("div");
  el.className = "confetti";
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = Array.from(
    { length: 32 },
    (_, i) =>
      `<i style="left:${i * 3.2}%;background:${["#ffda6a", "#72e2d3", "#b49bfb", "#ff9ed3"][i % 4]};animation-delay:${(i % 5) * 0.12}s"></i>`,
  ).join("");
  document.body.append(el);
  setTimeout(() => el.remove(), 3500);
}
function reward() {
  view = "reward";
  const m = current;
  render(
    `<section class="page"><div class="reward"><span class="eyebrow">MISI ${m.id} DISELESAIKAN</span><div class="reward-avatar">${avatar()}</div><div class="big-badge">${icons[m.id - 1]}</div><h1>TAHNIAH!<br>MISI BERJAYA!</h1><h2>${m.badge}</h2><p>Kamu telah melengkapkan dua peringkat dan menyemak pertuturan sendiri.</p><p class="note">Lencana ini menandakan penyertaan dan penyelesaian tugasan, bukan penilaian automatik ketepatan pertuturan.</p><div class="actions"><button class="primary" id="reward-next">${count() === 8 ? "🏆 PENTAS KEMENANGAN" : "▦ KEMBALI KE PETA"}</button><button class="gold" id="reward-gallery">✦ LIHAT LENCANA</button></div></div></section>`,
  );
  effect(true);
  confetti();
  document.querySelector("#reward-next").onclick =
    count() === 8 ? victory : mapView;
  document.querySelector("#reward-gallery").onclick = gallery;
}
function gallery() {
  if (!state.profile) {
    intro();
    return;
  }
  view = "gallery";
  current = null;
  render(
    `<section class="page"><span class="eyebrow">KOLEKSI WIRA</span><h1>Galeri Lencana</h1><p>${count()} daripada 8 lencana dikumpulkan.</p><div class="badge-grid">${missions.map((m, i) => `<article class="badge-card ${completed(m.id) ? "earned" : ""}"><span class="badge-icon">${completed(m.id) ? icons[i] : "🔒"}</span><h2>${m.badge}</h2><p>Misi ${m.id} · ${completed(m.id) ? "DIPEROLEH" : "TERKUNCI"}</p><button data-practice="${m.id}" ${unlocked(m.id) ? "" : "disabled"}>${completed(m.id) ? "Latihan semula" : "Ke misi"}</button></article>`).join("")}</div><p class="note">Lencana ialah rekod penyertaan, bukan markah penguasaan yang dinilai secara automatik.</p><div class="actions"><button id="gallery-map" class="primary">KEMBALI KE PETA</button>${count() === 8 ? '<button id="gallery-win" class="gold">🏆 LIHAT SIJIL</button>' : ""}</div></section>`,
  );
  app
    .querySelectorAll("[data-practice]")
    .forEach(
      (b) => (b.onclick = () => openMission(Number(b.dataset.practice))),
    );
  document.querySelector("#gallery-map").onclick = mapView;
  if (count() === 8) document.querySelector("#gallery-win").onclick = victory;
}
function victory() {
  if (count() !== 8) {
    toast("Lengkapkan lapan misi untuk membuka sijil.");
    mapView();
    return;
  }
  view = "victory";
  current = null;
  const date = new Intl.DateTimeFormat("ms-MY", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kuala_Lumpur",
  }).format(new Date());
  render(
    `<section class="page victory-page"><div class="victory-heading"><span class="trophy">🏆</span><h1>PENTAS KEMENANGAN<br>WIRA KOMUNIKASI</h1><div class="victory-avatar">${avatar()}</div><div class="mini-badges">${icons.map((i) => `<span>${i}</span>`).join("")}</div></div><article id="certificate" class="certificate"><div class="certificate-border"><span class="cert-brand">D-UJARAN · A4</span><h2>SIJIL PENCAPAIAN</h2><h3>WIRA SUARA HARMONI</h3><p>Dengan bangganya dianugerahkan kepada:</p><strong class="cert-name">${esc(state.profile.name)}</strong><p class="cert-class">Kelas: ${esc(state.profile.className)}</p><p>Atas usaha dan kejayaan melengkapkan lapan misi dalam aktiviti Suara Jiran Cilik, D-UJARAN.</p><p class="cert-motto">“Dengar • Faham • Bertutur”</p><p>Dibangunkan oleh Cikgu Adibah Amani</p><p class="cert-date">Tarikh: ${date}</p><span class="cert-seal">✦</span></div></article><div class="actions certificate-actions"><button class="primary" id="pdf">↓ MUAT TURUN PDF</button><button class="secondary" id="print">▤ CETAK SIJIL</button><button class="gold" id="cert-gallery">✦ LIHAT LENCANA</button><a class="button secondary" href="${esc(window.A4_SETTINGS.modAUrl)}">KEMBALI KE MENU MOD A</a></div><p class="print-note">MUAT TURUN PDF membuka tetingkap cetakan pelayar. Pilih “Simpan sebagai PDF”, kertas A4 dan orientasi landskap. Nama dan kelas tidak dihantar ke pelayan.</p></section>`,
  );
  effect(true);
  confetti();
  document.querySelector("#pdf").onclick = () => {
    stopPlayback();
    window.print();
  };
  document.querySelector("#print").onclick = () => {
    stopPlayback();
    window.print();
  };
  document.querySelector("#cert-gallery").onclick = gallery;
}
function settingsUI() {
  document.body.classList.toggle("reduce-motion", !!state.settings.reduce);
  for (const [id, on, off] of [
    ["music", "♫ Muzik ON", "♫ Muzik OFF"],
    ["sfx", "♪ Kesan bunyi ON", "♪ Kesan bunyi OFF"],
    ["motion", "Animasi dikurangkan", "Kurangkan animasi"],
  ]) {
    const setting = id === "motion" ? "reduce" : id,
      b = document.querySelector("#" + id);
    b.setAttribute("aria-pressed", !!state.settings[setting]);
    b.textContent = state.settings[setting] ? on : off;
  }
}
for (const name of ["music", "sfx", "motion"])
  document.querySelector("#" + name).onclick = () => {
    const k = name === "motion" ? "reduce" : name;
    state.settings[k] = !state.settings[k];
    settingsUI();
    save();
    updateMusic();
    if (name === "sfx") effect();
  };
document.querySelector("#nav-map").onclick = () => {
  if (allowLeave()) mapView();
};
document.querySelector("#nav-badges").onclick = () => {
  if (allowLeave()) gallery();
};
document
  .querySelectorAll(".close-dialog")
  .forEach((b) => (b.onclick = () => b.closest("dialog").close()));
document.querySelector("#help").addEventListener("close", stopPlayback);
let editingId = 1;
function fillEditor() {
  const m = missions.find((m) => m.id === editingId);
  document.querySelector("#edit-main").value = m.stages[0].utterance;
  document.querySelector("#edit-follow").value = m.stages[1].utterance;
  document.querySelector("#edit-hints").value = m.hints.join(", ");
  document.querySelector("#edit-example").value = m.teacherExample;
  document.querySelector("#edit-audio0").value = m.stages[0].audioUrl;
  document.querySelector("#edit-audio1").value = m.stages[1].audioUrl;
}
function teacherPanel() {
  if (!allowLeave()) return;
  cleanup();
  document.querySelector("#edit-mission").innerHTML = missions
    .map((m) => `<option value="${m.id}">${m.id}. ${m.title}</option>`)
    .join("");
  editingId = current?.id || 1;
  document.querySelector("#edit-mission").value = editingId;
  fillEditor();
  document.querySelector("#teacher-status").textContent = "";
  const oral = document.querySelector("#oral-controls");
  oral.innerHTML =
    current && view === "mission"
      ? `<p>Misi ${current.id}, peringkat ${stage + 1}</p><label><input type="checkbox" id="oral-confirm">Saya guru telah mendengar respons lisan murid untuk peringkat ini.</label><button id="oral-approve" class="gold">Sahkan aktiviti lisan peringkat ini</button>`
      : "<p>Buka misi dan peringkat yang ingin diurus dahulu.</p>";
  document.querySelector("#teacher-panel").showModal();
  const approve = document.querySelector("#oral-approve");
  if (approve)
    approve.onclick = () => {
      if (!document.querySelector("#oral-confirm").checked) {
        toast("Tandakan pengesahan selepas aktiviti lisan sebenar dijalankan.");
        return;
      }
      proofs.set(key(), {
        type: "oral",
        confirmedAt: new Date().toISOString(),
      });
      document.querySelector("#teacher-status").textContent =
        "Aktiviti lisan bersama guru disahkan. Tiada rakaman digital dicipta.";
      updateGate();
    };
}
document.querySelector("#teacher").onclick = teacherPanel;
document.querySelector("#edit-mission").onchange = (e) => {
  stopPlayback();
  editingId = Number(e.target.value);
  fillEditor();
};
document.querySelector("#edit-form").onsubmit = (e) => {
  e.preventDefault();
  const audio0 = document.querySelector("#edit-audio0").value.trim(),
    audio1 = document.querySelector("#edit-audio1").value.trim();
  if ([audio0, audio1].some((u) => u && !/^https:\/\//i.test(u))) {
    document.querySelector("#teacher-status").textContent =
      "URL audio mesti menggunakan HTTPS.";
    return;
  }
  const main = document.querySelector("#edit-main").value.trim(),
    follow = document.querySelector("#edit-follow").value.trim(),
    hints = document
      .querySelector("#edit-hints")
      .value.split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  if (!main || !follow || !hints.length) {
    toast("Isi kedua-dua ujaran dan sekurang-kurangnya satu petunjuk.");
    return;
  }
  state.overrides[editingId] = {
    main,
    follow,
    hints,
    example: document.querySelector("#edit-example").value.trim(),
    audio0,
    audio1,
  };
  save();
  applyOverrides();
  if (current) current = missions.find((m) => m.id === current.id);
  document.querySelector("#teacher-status").textContent =
    "Disimpan dalam pelayar ini sahaja. Untuk semua peranti, kemas kini missions.js pada hos.";
};
for (const s of [0, 1])
  document.querySelector("#test-audio" + s).onclick = () => {
    const audioUrl = document.querySelector("#edit-audio" + s).value.trim(),
      utterance = document
        .querySelector(s === 0 ? "#edit-main" : "#edit-follow")
        .value.trim();
    playUtterance({ audioUrl, utterance });
  };
document.querySelector("#restore").onclick = () => {
  if (!confirm("Pulihkan kandungan lalai misi ini?")) return;
  delete state.overrides[editingId];
  save();
  applyOverrides();
  if (current) current = missions.find((m) => m.id === current.id);
  fillEditor();
  document.querySelector("#teacher-status").textContent =
    "Kandungan lalai dipulihkan.";
};
document.querySelector("#teacher-panel").addEventListener("close", () => {
  stopPlayback();
  if (view === "mission" && current) missionView();
  else updateMusic();
});
document.querySelector("#reset").onclick = () => {
  if (
    !confirm(
      "Padam nama, kelas, kemajuan, lencana dan rakaman sesi ini? Suntingan kandungan guru dikekalkan.",
    )
  )
    return;
  recorder.clear();
  proofs.clear();
  state.profile = null;
  state.completed = {};
  save();
  current = null;
  view = "intro";
  document.querySelector("#teacher-panel").close();
  intro();
};
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopPlayback();
    stopMusic();
  } else updateMusic();
});
window.addEventListener("pagehide", () => {
  cleanup();
  stopMusic();
});
window.addEventListener("beforeunload", (e) => {
  if (recorder.active || recorder.pending) {
    e.preventDefault();
    e.returnValue = "";
  }
});
applyOverrides();
settingsUI();
intro();
