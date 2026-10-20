(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const progressKey = "dujaran-a4-progress-v2";
  const audioKey = "dujaran-a4-teacher-audio-v1";
  const defaults = [
    {name:"JIRAN BAHARU PERLUKAN PANDUAN",place:"Rumah Jiran Baharu",level:"Mudah",icon:"🏡",badge:"Lencana Penunjuk Arah Hebat",badgeIcon:"🧭",situation:"Jiran baharu tidak tahu lokasi taman permainan.",utterance:"Hai, adik! Kami baru berpindah ke Taman Harmoni. Bolehkah kamu tunjukkan arah ke taman permainan?",keywords:"Terus, belok, sebelah, sama-sama",challenge:"Terima kasih! Kalau kami mahu pergi ke dewan komuniti pula, ke manakah arah yang perlu kami ikut?"},
    {name:"HADIAH UNTUK JIRAN ISTIMEWA",place:"Rumah Hadiah Kasih",level:"Mudah",icon:"🎁",badge:"Lencana Hati Penyayang",badgeIcon:"💝",situation:"Jiran mahu memberikan hadiah penghargaan kepada jiran yang banyak membantu.",utterance:"Aina, mak cik mahu memberikan hadiah kepada Pak Kumar kerana beliau selalu membantu kami. Apakah hadiah yang sesuai?",keywords:"Hadiah, menghargai, berguna, terima kasih",challenge:"Kalau mak cik tidak mempunyai wang yang banyak, bagaimanakah cara lain untuk menghargai Pak Kumar?"},
    {name:"SALAH FAHAM DI TAMAN HARMONI",place:"Taman Permainan Harmoni",level:"Sederhana",icon:"🛝",badge:"Lencana Pendamai Bijak",badgeIcon:"🕊️",situation:"Dua kanak-kanak salah faham tentang giliran buaian.",utterance:"Saya ingat kamu sudah selesai bermain buaian tadi. Mengapa kamu masih mahu menggunakannya?",keywords:"Maaf, giliran, berbincang, berkongsi",challenge:"Baiklah. Bagaimanakah kita boleh memastikan semua kanak-kanak mendapat giliran yang adil?"},
    {name:"SIAPA PATUT DIBANTU DAHULU?",place:"Lorong Prihatin",level:"Sederhana",icon:"🤲",badge:"Lencana Wira Prihatin",badgeIcon:"🤲",situation:"Warga emas membawa barang berat dan jiran lain mahu bantuan menyiram pokok.",utterance:"Adik, mak cik perlu membawa barang ke rumah. Pak Kumar pula meminta bantuan menyiram pokok. Bolehkah kamu membantu kami?",keywords:"Membantu, dahulu, kemudian, keperluan",challenge:"Mak cik perlu masuk ke rumah sekarang kerana barang ini berat. Pak Kumar boleh menunggu sebentar. Siapakah yang patut kamu bantu dahulu dan mengapa?"},
    {name:"JOM RANCANG HARI KELUARGA!",place:"Dewan Hari Keluarga",level:"Sederhana",icon:"🎉",badge:"Lencana Perancang Kreatif",badgeIcon:"🎉",situation:"Penduduk mahu memilih aktiviti Hari Keluarga.",utterance:"Kami sedang merancang Hari Keluarga Taman Harmoni. Apakah aktiviti yang sesuai untuk kanak-kanak dan orang dewasa?",keywords:"Permainan, keluarga, bekerjasama, seronok",challenge:"Cadangan kamu menarik! Tetapi, bagaimana jika hujan pada hari tersebut? Apakah aktiviti lain yang boleh kita jalankan?"},
    {name:"JIRAN TERLUPA MENUTUP PAGAR",place:"Pagar Keselamatan",level:"Sederhana tinggi",icon:"🚪",badge:"Lencana Penjaga Keselamatan",badgeIcon:"🛡️",situation:"Pagar rumah terbuka dan haiwan peliharaan hampir keluar.",utterance:"Adik, pak cik terlupa menutup pagar tadi. Mengapakah kamu memanggil pak cik?",keywords:"Pagar, keselamatan, haiwan, berhati-hati",challenge:"Terima kasih kerana mengingatkan pak cik. Apakah langkah lain yang boleh kita lakukan untuk menjaga keselamatan rumah?"},
    {name:"BUNYI BISING PADA WAKTU MALAM",place:"Lorong Malam Tenang",level:"Tinggi",icon:"🌙",badge:"Lencana Komunikasi Berhemah",badgeIcon:"🌙",situation:"Jiran memasang muzik terlalu kuat pada waktu malam.",utterance:"Maaf, adik. Pak cik sedang mengadakan majlis keluarga. Adakah bunyi muzik ini mengganggu keluarga kamu?",keywords:"Maaf, perlahan, berehat, bertimbang rasa",challenge:"Pak cik faham. Bagaimanakah kita boleh memastikan semua jiran selesa apabila mengadakan majlis pada waktu malam?"},
    {name:"MESYUARAT MINI TAMAN HARMONI",place:"Dewan Mesyuarat Harmoni",level:"Tinggi",icon:"🏛️",badge:"Lencana Pemimpin Harmoni",badgeIcon:"🌻",situation:"Penduduk mahu memilih satu projek untuk menceriakan kawasan.",utterance:"Kami mempunyai tiga cadangan, iaitu taman bunga, sudut bacaan dan kawasan permainan. Pada pendapat kamu, projek manakah yang patut dilaksanakan dahulu?",keywords:"Cadangan, manfaat, sebab, masyarakat",challenge:"Cadangan kamu bagus! Namun, ada jiran yang lebih suka taman bunga. Bagaimanakah kamu boleh meyakinkan mereka secara sopan?"}
  ];
  const missionTitles = [
    "Misi 1 – Jiran Baharu Perlukan Panduan.","Misi 2 – Hadiah untuk Jiran Istimewa.",
    "Misi 3 – Salah Faham di Taman Harmoni.","Misi 4 – Siapa Patut Dibantu Dahulu?",
    "Misi 5 – Jom Rancang Hari Keluarga!","Misi 6 – Jiran Terlupa Menutup Pagar.",
    "Misi 7 – Bunyi Bising pada Waktu Malam.","Misi 8 – Mesyuarat Mini Taman Harmoni."
  ];
  const key = (mission, level) => `${mission}-${level}`;
  const readJSON = (storageKey, fallback) => { try { return JSON.parse(localStorage.getItem(storageKey)) || fallback; } catch { return fallback; } };
  let savedRaw = readJSON(progressKey, {});
  let saved = {
    name:typeof savedRaw.name === "string" ? savedRaw.name : "",
    kelas:typeof savedRaw.kelas === "string" ? savedRaw.kelas : "",
    completed:Array.isArray(savedRaw.completed) ? [...new Set(savedRaw.completed.filter(n => Number.isInteger(n) && n >= 0 && n < 8))].sort((a,b)=>a-b) : []
  };
  let audioConfig = readJSON(audioKey, {});
  if (!audioConfig || typeof audioConfig !== "object" || Array.isArray(audioConfig)) audioConfig = {};
  const bundledAudio = Object.fromEntries(Array.from({length:8},(_,i)=>[key(i,1),{kind:"bundled",url:`audio/A4_M${String(i+1).padStart(2,"0")}_P1.mp3`}]));
  const audioEntry=id=>Object.prototype.hasOwnProperty.call(audioConfig,id)?audioConfig[id]:bundledAudio[id];
  const recordings = new Map();
  const recordingURLs = new Map();
  const previewURLs = [null,null];
  let current = 0, stage = 1, galleryPrevious = "map-view", lastFocused = null, noticeTimer;
  let teacherMission = 0, activeAudio = null, audioSourceURL = null, audioToken = 0;
  let recorder=null, stream=null, recordTimer=null, micRequestPending=false, captureToken=0, processing=false;
  let dbPromise;
  function notify(text) {
    const el = $("message"); el.textContent = text; el.hidden = false;
    clearTimeout(noticeTimer); noticeTimer = setTimeout(() => { el.hidden = true; }, 9000);
  }
  function persist() {
    try { localStorage.setItem(progressKey, JSON.stringify(saved)); }
    catch { notify("Pelayar ini tidak dapat menyimpan maklumat. Semak tetapan storan pelayar."); }
  }
  function persistAudio() {
    try { localStorage.setItem(audioKey, JSON.stringify(audioConfig)); return true; }
    catch { notify("Tetapan audio tidak dapat disimpan dalam pelayar ini."); return false; }
  }
  function openDB() {
    if (!("indexedDB" in window)) return Promise.reject(new Error("IndexedDB tidak tersedia"));
    if (!dbPromise) dbPromise = new Promise((resolve,reject) => {
      const request = indexedDB.open("dujaran-a4-audio-v1",1);
      request.onupgradeneeded = () => request.result.createObjectStore("files");
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error("Storan audio disekat"));
    }).catch(error => { dbPromise = null; throw error; });
    return dbPromise;
  }
  async function fileOperation(mode, id, value) {
    const db = await openDB();
    return new Promise((resolve,reject) => {
      const tx = db.transaction("files",mode === "get" ? "readonly" : "readwrite");
      const request = mode === "get" ? tx.objectStore("files").get(id) : mode === "delete" ? tx.objectStore("files").delete(id) : tx.objectStore("files").put(value,id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      tx.onerror = () => reject(tx.error);
    });
  }
  function formatTime(seconds) { return `${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`; }
  function stopPreview() { for (let n=1;n<=2;n++) $( `slot-${n}-preview` ).pause(); }
  function setPlaying(playing, buttonId) {
    $("speech-control").classList.toggle("is-playing",playing);
    for (const id of ["listen","relisten"]) {
      const buttonLabel = $(`${id}-button-label`) || document.querySelector(`[data-template-id="${id}-button-label"]`);
      const stopLabel = $(`${id}-stop-label`) || document.querySelector(`[data-template-id="${id}-stop-label"]`);
      if (buttonLabel) buttonLabel.hidden = playing && id === buttonId;
      if (stopLabel) stopLabel.hidden = !playing || id !== buttonId;
    }
  }
  function stopAudio() {
    audioToken++;
    if (activeAudio) { activeAudio.pause(); activeAudio.removeAttribute("src"); activeAudio.load(); activeAudio = null; }
    if (audioSourceURL) { URL.revokeObjectURL(audioSourceURL); audioSourceURL = null; }
    setPlaying(false);
    stopPreview();
    $("record-preview").pause();
  }
  function stopMicrophone() {
    captureToken++;micRequestPending=false;processing=false;
    const previous=recorder;recorder=null;
    if(previous && previous.state!=="inactive")previous.stop();
    if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;}
    clearInterval(recordTimer);recordTimer=null;
    $("recording-studio").classList.remove("is-recording");
    $("record-stop").hidden=true;$("record-start").hidden=false;$("record-start").disabled=false;
  }
  function releaseMedia() { stopAudio(); stopMicrophone(); }
  function show(id) {
    if (!$("mission-view").hidden && id !== "mission-view") releaseMedia();
    document.querySelectorAll(".view").forEach(view => { view.hidden = view.id !== id; });
    window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"});
  }
  function celebrate() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = $("confetti"); box.replaceChildren();
    const colors = ["#ffd166","#12acb6","#ed6da4","#8067c8","#75c878"];
    for(let i=0;i<28;i++){ const piece=document.createElement("span");piece.style.left=`${Math.random()*100}%`;piece.style.background=colors[i%colors.length];piece.style.animationDelay=`${Math.random()*.9}s`;box.append(piece); }
    setTimeout(()=>box.replaceChildren(),4300);
  }
  function renderMap() {
    const list = $("locations"); list.replaceChildren();
    defaults.forEach((m,i) => {
      const done=saved.completed.includes(i), unlocked=done || i===0 || saved.completed.includes(i-1);
      const button=document.createElement("button");button.type="button";button.className="location"+(done?" done":"");button.disabled=!unlocked;
      button.setAttribute("aria-label",`Misi ${i+1}: ${m.place}. ${done?"Selesai":unlocked?"Tersedia":"Terkunci"}`);
      const number=document.createElement("strong");number.textContent=`MISI ${i+1}`;
      const icon=document.createElement("span");icon.className="location-icon";icon.textContent=m.icon;
      const place=document.createElement("strong");place.textContent=m.place;
      const status=document.createElement("span");status.textContent=done?"✓ SELESAI":unlocked?"▶ MULA MISI":"🔒 TERKUNCI";
      button.append(number,icon,place,status);if(unlocked)button.addEventListener("click",()=>openMission(i));list.append(button);
    });
    const count=saved.completed.length;$("progress-count").textContent=`${count}/8 MISI`;
    $("progress-bar").setAttribute("aria-valuenow",String(count));$("progress-fill").style.width=`${count/8*100}%`;
  }
  function openMission(i) { releaseMedia();current=i;stage=1;renderMission();show("mission-view"); }
  function showRecording() {
    const id=key(current,stage), item=recordings.get(id), oldURL=recordingURLs.get(id);
    const preview=$("record-preview");
    preview.pause();
    if (item) {
      if (!oldURL) recordingURLs.set(id,URL.createObjectURL(item.blob));
      preview.src=recordingURLs.get(id);preview.hidden=false;
      $("record-status").textContent="✓ Rakaman berjaya! Hebat, Wira Komunikasi!";
    } else {
      preview.removeAttribute("src");preview.load();preview.hidden=true;
      $("record-status").textContent="Rakam respons kamu untuk melengkapkan peringkat ini.";
    }
    $("record-play").disabled=!item;$("record-again").disabled=!item;$("record-download").disabled=!item;
    $("record-timer").textContent="00:00";
    const supported=Boolean(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);
    $("record-unavailable").hidden=supported;
    $("record-controls").hidden=!supported;
  }
  function renderMission() {
    const m=defaults[current];
    $("mission-icon").textContent=m.icon;$("mission-name").textContent=m.name;
    $("mission-level").textContent=`TAHAP: ${m.level}`;$("mission-place").textContent=m.place;
    $("mission-situation").textContent=m.situation;
    $("stage-counter").textContent=`MISI ${current+1} / 8 · PERINGKAT ${stage} / 2`;
    $("stage-title").textContent=stage===1?"LATIHAN SUARA HARMONI":"CABARAN WIRA KOMUNIKASI";
    $("mission-dialog").textContent=stage===1?m.utterance:m.challenge;
    $("stage-one-extra").hidden=stage!==1;$("stage-two-extra").hidden=stage!==2;
    $("next-stage").hidden=stage!==1;$("complete-mission").hidden=stage!==2;
    $("hint-content").hidden=true;$("hint-button").setAttribute("aria-expanded","false");
    $("spoken-check").checked=false;document.querySelectorAll(".self-check").forEach(box=>{box.checked=false;});
    $("speech-status").textContent="";showRecording();
  }
  function returnModA() {
    releaseMedia();
    const event=new CustomEvent("dujaran:navigate-mod-a",{bubbles:true,composed:true,cancelable:true,detail:{from:"A4"}});
    document.dispatchEvent(event);
    if(!event.defaultPrevented)window.location.href="https://g-ipgp22192314-source.github.io/D--UJARAN/#mod";
  }
  $("student-name").value=saved.name;$("student-class").value=saved.kelas;
  [["student-name","name"],["student-class","kelas"]].forEach(([id,field])=>{
    for(const type of ["input","change"]) $(id).addEventListener(type,()=>{
      const value=$(id).value.trim();if(value){saved[field]=value;persist();}
    });
  });
  $("student-form").addEventListener("submit",event=>{
    event.preventDefault();const name=$("student-name").value.trim(),kelas=$("student-class").value.trim();
    if(!name||!kelas){$("form-message").textContent="Sila tulis nama dan kelas kamu dahulu.";$("form-message").hidden=false;(!name?$("student-name"):$("student-class")).focus();return;}
    $("form-message").hidden=true;saved.name=name;saved.kelas=kelas;persist();renderMap();celebrate();show("map-view");
  });
  function closeHow(){ $("how-overlay").hidden=true;document.body.style.overflow="";(lastFocused||$("how-button")).focus(); }
  $("how-button").addEventListener("click",()=>{lastFocused=document.activeElement;$("how-overlay").hidden=false;document.body.style.overflow="hidden";$("how-close").focus();});
  $("how-close").addEventListener("click",closeHow);
  $("how-overlay").addEventListener("click",event=>{if(event.target===$("how-overlay"))closeHow();});
  $("return-opening").addEventListener("click",returnModA);
  document.querySelectorAll(".return-mod-a").forEach(button=>button.addEventListener("click",returnModA));
  $("mission-back").addEventListener("click",()=>{releaseMedia();renderMap();show("map-view");});
  $("hint-button").addEventListener("click",()=>{
    $("hint-content").textContent=defaults[current].keywords;$("hint-content").hidden=!$("hint-content").hidden;
    $("hint-button").setAttribute("aria-expanded",String(!$("hint-content").hidden));
  });
  async function playSpeech(buttonId,restart) {
    if(recorder || micRequestPending || processing){notify("Hentikan rakaman dahulu sebelum memainkan ujaran.");return;}
    if(activeAudio && !restart){stopAudio();$("speech-status").textContent="Audio dihentikan.";return;}
    stopAudio();const token=audioToken,id=key(current,stage),entry=audioEntry(id);
    if(!entry){$("speech-status").textContent="Audio ujaran belum tersedia untuk misi dan peringkat ini.";return;}
    let source;
    if(entry.kind==="bundled" || (entry.kind==="url" && validHTTPS(entry.url))) source=entry.url;
    else if(entry.kind==="file") {
      try {const file=await fileOperation("get",id);if(file && token===audioToken){audioSourceURL=URL.createObjectURL(file);source=audioSourceURL;}}
      catch { /* Status below explains unavailable local storage. */ }
    }
    if(token!==audioToken)return;
    if(!source){$("speech-status").textContent="Audio ujaran belum tersedia dalam pelayar ini. Fail tempatan guru tidak dikongsi antara peranti.";return;}
    const audio=new Audio();activeAudio=audio;audio.preload="auto";audio.src=source;
    audio.onplay=()=>{if(activeAudio===audio){setPlaying(true,buttonId);$("speech-status").textContent="Gelombang suara · Audio sedang dimainkan."; }};
    audio.onended=()=>{if(activeAudio===audio){stopAudio();$("speech-status").textContent="Audio tamat. Tekan DENGAR SEMULA untuk mengulang."; }};
    audio.onerror=()=>{if(activeAudio===audio){stopAudio();$("speech-status").textContent="GAGAL: Audio tidak dapat dimainkan. Semak fail atau pautan HTTPS."; }};
    try {await audio.play();} catch {if(activeAudio===audio){stopAudio();$("speech-status").textContent="GAGAL: Audio tidak dapat dimainkan dalam pelayar ini.";}}
  }
  $("listen-button").addEventListener("click",()=>playSpeech("listen",false));
  $("relisten-button").addEventListener("click",()=>playSpeech("relisten",true));
  function needsRecording() {
    if(micRequestPending || processing || recorder){notify("Tekan BERHENTI RAKAM dan tunggu rakaman selesai dahulu.");return true;}
    if(!recordings.has(key(current,stage))){notify("Rakaman belum berjaya. Rakam respons kamu sebelum meneruskan.");return true;}
    return false;
  }
  $("next-stage").addEventListener("click",()=>{
    if(needsRecording())return;
    if(!$("spoken-check").checked){notify("Berikan respons secara lisan dan tandakan kotak latihan dahulu.");return;}
    releaseMedia();stage=2;renderMission();
  });
  $("complete-mission").addEventListener("click",()=>{
    if(needsRecording())return;
    if(!$("spoken-check").checked){notify("Sebut respons kamu dahulu, kemudian tandakan latihan lisan.");return;}
    if(![...document.querySelectorAll(".self-check")].every(box=>box.checked)){notify("Lengkapkan ketiga-tiga kotak semakan kendiri dahulu.");return;}
    if(!recordings.has(key(current,1))){notify("Rakaman Peringkat 1 belum tersedia untuk misi ini.");return;}
    if(!saved.completed.includes(current)){saved.completed.push(current);saved.completed.sort((a,b)=>a-b);persist();}
    $("won-badge").textContent=`${defaults[current].badgeIcon} ${defaults[current].badge}`;celebrate();show("win-view");
  });
  $("win-continue").addEventListener("click",()=>{if(saved.completed.length===8){celebrate();show("final-view");}else{renderMap();show("map-view");}});
  function openGallery(from) {
    galleryPrevious=from;const box=$("badges");box.replaceChildren();
    defaults.forEach((m,i)=>{const earned=saved.completed.includes(i),card=document.createElement("div");card.className="notice text-center";card.style.opacity=earned?"1":".6";card.textContent=`${earned?m.badgeIcon:"🔒"} ${m.badge} — ${earned?"DIKUMPUL":"BELUM DIPEROLEH"}`;box.append(card);});show("gallery-view");
  }
  $("gallery-map-button").addEventListener("click",()=>openGallery("map-view"));
  $("gallery-cert-button").addEventListener("click",()=>openGallery("certificate-view"));
  $("gallery-back").addEventListener("click",()=>show(galleryPrevious));
  $("show-certificate").addEventListener("click",()=>{
    $("cert-name").textContent=saved.name;$("cert-class").textContent=`Kelas: ${saved.kelas}`;
    $("cert-date").textContent=`Tarikh: ${new Intl.DateTimeFormat("ms-MY",{day:"numeric",month:"long",year:"numeric"}).format(new Date())}`;
    show("certificate-view");
  });
  $("print-button").addEventListener("click",()=>window.print());
  $("restart-button").addEventListener("click",()=>{$("restart-confirm").hidden=false;$("restart-yes").focus();});
  $("restart-no").addEventListener("click",()=>{$("restart-confirm").hidden=true;$("restart-button").focus();});
  $("restart-yes").addEventListener("click",()=>{
    releaseMedia();recordings.clear();for(const url of recordingURLs.values())URL.revokeObjectURL(url);recordingURLs.clear();
    saved={name:"",kelas:"",completed:[]};persist();$("student-name").value="";$("student-class").value="";
    $("restart-confirm").hidden=true;show("opening");notify("Pengembaraan murid telah dimulakan semula.");
  });

  function validHTTPS(value) {
    try {const url=new URL(value);return url.protocol==="https:" && !!url.hostname;}catch{return false;}
  }
  function selectedID(level){return key(teacherMission,level);}
  async function renderSlot(level) {
    const id=selectedID(level),entry=audioEntry(id),name=$(`slot-${level}-name`),player=$(`slot-${level}-preview`);
    const old=previewURLs[level-1];if(old){URL.revokeObjectURL(old);previewURLs[level-1]=null;}
    player.pause();player.removeAttribute("src");player.load();player.hidden=true;
    $(`slot-${level}-url`).value=entry?.kind==="url"?entry.url:"";
    name.textContent=entry?.kind==="file"?`Fail: ${entry.name}`:entry?.kind==="url"?"Pautan HTTPS disimpan.":entry?.kind==="bundled"?"Audio asal tersedia untuk semua murid.":"Tiada audio disimpan.";
    $(`slot-${level}-status`).textContent="";
    if(entry?.kind==="bundled" || (entry?.kind==="url" && validHTTPS(entry.url))){player.src=entry.url;player.hidden=false;}
    if(entry?.kind==="file"){
      try {
        const blob=await fileOperation("get",id);
        if(id!==selectedID(level))return;
        if(blob){previewURLs[level-1]=URL.createObjectURL(blob);player.src=previewURLs[level-1];player.hidden=false;}
        else $(`slot-${level}-status`).textContent="Fail tempatan tidak tersedia dalam pelayar ini.";
      } catch {if(id===selectedID(level))$(`slot-${level}-status`).textContent="IndexedDB tidak tersedia; fail tempatan tidak dapat dipulihkan."; }
    }
  }
  function renderUtterancePanel(){
    const mission=defaults[teacherMission];
    const available=Boolean(mission);
    $("utterance-stage-one-text").value=available?mission.utterance:"Teks ujaran belum tersedia untuk misi ini";
    $("utterance-stage-two-text").value=available?mission.challenge:"Teks ujaran belum tersedia untuk misi ini";
    $("utterance-status").textContent=available?`Teks untuk Misi ${teacherMission+1} dipaparkan untuk rujukan rakaman.`:"Teks ujaran belum tersedia untuk misi ini";
    document.querySelectorAll("#utterance-tabs button").forEach((button,index)=>{
      const active=index===teacherMission;button.setAttribute("aria-selected",String(active));button.classList.toggle("purple",active);button.classList.toggle("white",!active);
    });
  }
  function renderTeacher(){
    const title=missionTitles[teacherMission]||missionTitles[0];
    $("teacher-mission").value=String(teacherMission);
    $("teacher-active-mission").textContent=`MISI AKTIF: ${title}`;
    renderUtterancePanel();
    renderSlot(1);renderSlot(2);
  }
  missionTitles.forEach((title,index)=>{
    const option=document.createElement("option");
    option.value=String(index);option.textContent=title;option.disabled=false;
    $("teacher-mission").append(option);
    const tab=document.createElement("button");tab.type="button";tab.className="canva-button action white";tab.textContent=`MISI ${index+1}`;tab.setAttribute("role","tab");tab.setAttribute("aria-selected","false");tab.addEventListener("click",()=>{teacherMission=index;renderTeacher();});
    $("utterance-tabs").append(tab);
  });
  $("copy-utterance").addEventListener("click",async()=>{
    const text=[$("utterance-stage-one-text").value,$("utterance-stage-two-text").value].join("\n\n");
    try {await navigator.clipboard.writeText(text);$("utterance-status").textContent="Teks ujaran berjaya disalin.";}
    catch {$("utterance-status").textContent="Teks tidak dapat disalin secara automatik. Pilih teks dalam kotak dan salin secara manual.";}
  });
  function closeTeacher(){
    releaseMedia();$("teacher-overlay").hidden=true;document.body.style.overflow="";
    for(let n=1;n<=2;n++){if(previewURLs[n-1]){URL.revokeObjectURL(previewURLs[n-1]);previewURLs[n-1]=null;}$(`slot-${n}-preview`).pause();}
    showRecording();$("teacher-open").focus();
  }
  $("teacher-open").addEventListener("click",()=>{
    releaseMedia();teacherMission=current;$("teacher-mission").value=String(current);
    $("teacher-overlay").hidden=false;document.body.style.overflow="hidden";renderTeacher();$("teacher-close").focus();
  });
  $("teacher-close").addEventListener("click",closeTeacher);
  $("teacher-mission").addEventListener("change",event=>{stopPreview();teacherMission=Number(event.target.value);renderTeacher();});
  for(let level=1;level<=2;level++){
    $(`slot-${level}-replace`).addEventListener("click",()=>$(`slot-${level}-file`).click());
    $(`slot-${level}-file`).addEventListener("change",async event=>{
      const file=event.target.files?.[0];if(!file)return;
      const id=selectedID(level),status=$(`slot-${level}-status`);
      if(!/\.(mp3|wav|m4a)$/i.test(file.name)){status.textContent="GAGAL: Pilih fail MP3, WAV atau M4A.";event.target.value="";return;}
      try {
        await fileOperation("put",id,file);
        const previous=audioConfig[id];audioConfig[id]={kind:"file",name:file.name};
        if(!persistAudio()){audioConfig[id]=previous;await fileOperation("delete",id);return;}
        stopAudio();if(id===selectedID(level)){await renderSlot(level);status.textContent="BERJAYA: Fail disimpan dalam pelayar ini sahaja.";}
      } catch {
        status.textContent="GAGAL: Fail tidak dapat disimpan dalam IndexedDB. Tiada fail besar disimpan dalam localStorage.";
      }
      event.target.value="";
    });
    $(`slot-${level}-delete`).addEventListener("click",async()=>{
      const id=selectedID(level);stopAudio();
      try {await fileOperation("delete",id);} catch { /* URL entries do not require IndexedDB. */ }
      audioConfig[id]=null;const ok=persistAudio();await renderSlot(level);
      $(`slot-${level}-status`).textContent=ok?"Audio slot ini dipadam.":"GAGAL: Tetapan tidak dapat dikemas kini.";
    });
    $(`slot-${level}-save`).addEventListener("click",async()=>{
      const value=$(`slot-${level}-url`).value.trim(),status=$(`slot-${level}-status`),id=selectedID(level);
      if(!validHTTPS(value)){status.textContent="GAGAL: Gunakan URL audio HTTPS yang sah.";return;}
      const previous=audioConfig[id];audioConfig[id]={kind:"url",url:value};
      if(!persistAudio()){audioConfig[id]=previous;return;}
      stopAudio();await renderSlot(level);status.textContent="Pautan HTTPS disimpan. Gunakan UJI AUDIO untuk menyemak pemuatan.";
    });
    $(`slot-${level}-test`).addEventListener("click",async()=>{
      const value=$(`slot-${level}-url`).value.trim(),status=$(`slot-${level}-status`),button=$(`slot-${level}-test`);
      if(!validHTTPS(value)){status.textContent="GAGAL: Gunakan URL audio HTTPS yang sah.";return;}
      button.disabled=true;status.textContent="Menguji pemuatan audio…";
      const test=new Audio();test.preload="metadata";
      const result=await new Promise(resolve=>{
        let settled=false;
        const finish=success=>{if(settled)return;settled=true;clearTimeout(timer);test.removeAttribute("src");test.load();resolve(success);};
        const timer=setTimeout(()=>finish(false),10000);
        test.onloadeddata=()=>finish(true);test.onerror=()=>finish(false);
        test.src=value;test.load();
      });
      status.textContent=result?"BERJAYA: Audio berjaya dimuatkan.":"GAGAL: Audio tidak dapat dimuatkan atau pelayan tidak memberi respons.";
      button.disabled=false;
    });
  }
  let confirmation=null;
  function askConfirmation(text,action){
    confirmation=action;$("confirm-message").textContent=text;$("confirm-overlay").hidden=false;$("confirm-no").focus();
  }
  function closeConfirmation(){confirmation=null;$("confirm-overlay").hidden=true;if(!$("teacher-overlay").hidden)$("teacher-reset").focus();else $("record-again").focus();}
  $("confirm-no").addEventListener("click",closeConfirmation);
  $("confirm-yes").addEventListener("click",async()=>{const action=confirmation;closeConfirmation();if(action)await action();});
  $("teacher-reset").addEventListener("click",()=>askConfirmation("Padam semua 16 tetapan audio guru dan fail setempat dalam pelayar ini?",async()=>{
    releaseMedia();
    try {
      const db=await openDB();
      await new Promise((resolve,reject)=>{const tx=db.transaction("files","readwrite");tx.objectStore("files").clear();tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});
    } catch { /* URL settings can still be cleared if IndexedDB is unavailable. */ }
    audioConfig={};const ok=persistAudio();renderTeacher();
    notify(ok?"Tetapan audio asal dipulihkan. Audio Peringkat 1 tersedia; Peringkat 2 menunggu rakaman guru.":"Tetapan audio tidak dapat ditetapkan semula sepenuhnya.");
  }));

  const mimeChoices=["audio/webm;codecs=opus","audio/mp4","audio/webm","audio/ogg;codecs=opus"];
  const extensionFor=mime=>mime.includes("mp4")?"m4a":mime.includes("ogg")?"ogg":mime.includes("wav")?"wav":"webm";
  async function startRecording(){
    if(micRequestPending||processing||recorder)return;
    if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){$("record-unavailable").hidden=false;return;}
    const id=key(current,stage);
    if(recordings.has(id)){askConfirmation("Gantikan rakaman sedia ada untuk misi dan peringkat ini?",()=>beginRecording(id));return;}
    await beginRecording(id);
  }
  async function beginRecording(id){
    if(micRequestPending||processing||recorder)return;
    const token=++captureToken;
    micRequestPending=true;stopAudio();$("record-start").disabled=true;
    $("record-status").textContent="Meminta kebenaran mikrofon… Pilih Benarkan dalam pelayar.";
    let requested;
    try{
      requested=await navigator.mediaDevices.getUserMedia({audio:true});
      if(token!==captureToken||id!==key(current,stage)||$("mission-view").hidden||!$("teacher-overlay").hidden){requested.getTracks().forEach(t=>t.stop());return;}
      stream=requested;
      const mime=mimeChoices.find(t=>MediaRecorder.isTypeSupported(t));
      const capture=mime?new MediaRecorder(requested,{mimeType:mime}):new MediaRecorder(requested);
      const parts=[];recorder=capture;
      const finishTracks=()=>{requested.getTracks().forEach(t=>t.stop());if(stream===requested)stream=null;};
      capture.ondataavailable=e=>{if(e.data?.size)parts.push(e.data);};
      capture.onerror=()=>{if(token!==captureToken)return;stopMicrophone();showRecording();$("record-status").textContent="Rakaman gagal. Sila cuba lagi.";};
      capture.onstop=()=>{
        finishTracks();if(token!==captureToken)return;
        clearInterval(recordTimer);recordTimer=null;recorder=null;processing=false;
        $("recording-studio").classList.remove("is-recording");$("record-stop").hidden=true;$("record-start").hidden=false;$("record-start").disabled=false;
        const blob=new Blob(parts,{type:capture.mimeType||parts[0]?.type||mime||""});
        if(blob.size){const old=recordingURLs.get(id);if(old)URL.revokeObjectURL(old);recordingURLs.delete(id);recordings.set(id,{blob,mime:blob.type});}
        showRecording();if(!blob.size)$("record-status").textContent="Rakaman kosong. Rakam semula respons kamu.";
      };
      capture.start(250);micRequestPending=false;
      $("record-timer").textContent="00:00";const started=Date.now();
      recordTimer=setInterval(()=>{const seconds=Math.floor((Date.now()-started)/1000);$("record-timer").textContent=formatTime(seconds);if(seconds>=120)finishRecording();},250);
      $("recording-studio").classList.add("is-recording");$("record-start").hidden=true;$("record-stop").hidden=false;$("record-stop").disabled=false;
      for(const name of ["record-play","record-again","record-download"])$(name).disabled=true;
      $("record-status").textContent="● Sedang merakam. Sebut respons kamu dengan jelas.";
    }catch(error){
      if(requested)requested.getTracks().forEach(t=>t.stop());
      if(token!==captureToken)return;
      stopMicrophone();showRecording();
      $("record-status").textContent=error.name==="NotFoundError"?"Mikrofon tidak ditemui. Sambungkan mikrofon dan cuba lagi.":"Mikrofon tidak dapat digunakan. Benarkan mikrofon dalam tetapan pelayar dan buka pautan HTTPS terus, di luar Canva.";
    }finally{if(token===captureToken){micRequestPending=false;$("record-start").disabled=false;}}
  }
  function finishRecording(){
    if(recorder?.state!=="recording")return;
    processing=true;$("record-stop").disabled=true;$("record-status").textContent="Memproses rakaman…";recorder.stop();
    if(stream)stream.getTracks().forEach(t=>t.stop());clearInterval(recordTimer);
  }
  $("record-start").addEventListener("click",startRecording);
  $("record-stop").addEventListener("click",finishRecording);
  $("record-play").addEventListener("click",async()=>{stopAudio();try{await $("record-preview").play();}catch{$("record-status").textContent="Rakaman tidak dapat dimainkan dalam pelayar ini.";}}); 
  $("record-again").addEventListener("click",()=>askConfirmation("Gantikan rakaman sedia ada untuk misi dan peringkat ini?",()=>beginRecording(key(current,stage))));
  $("record-download").addEventListener("click",()=>{
    const item=recordings.get(key(current,stage));if(!item)return;
    const url=URL.createObjectURL(item.blob),anchor=document.createElement("a");
    anchor.href=url;anchor.download=`A4_Misi${current+1}_Peringkat${stage}_Rakaman.${extensionFor(item.mime)}`;
    document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);
  });
  document.addEventListener("keydown",event=>{
    if(event.key!=="Escape")return;
    if(!$("confirm-overlay").hidden){closeConfirmation();return;}
    if(!$("teacher-overlay").hidden){closeTeacher();return;}
    if(!$("how-overlay").hidden)closeHow();
  });
  window.addEventListener("pagehide",releaseMedia);
  show("opening");
  if(window.lucide)lucide.createIcons();
})();
