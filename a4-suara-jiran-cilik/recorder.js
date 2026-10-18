"use strict";
/* Audio remains in memory. No network upload or persistent recording storage. */
window.A4Recorder = class {
  constructor(onState) {
    this.onState = onState;
    this.recorder = null;
    this.stream = null;
    this.timer = null;
    this.token = 0;
    this.active = false;
    this.pending = false;
    this.seconds = 0;
    this.recordings = new Map();
  }
  static supported() {
    return !!(
      window.isSecureContext &&
      navigator.mediaDevices?.getUserMedia &&
      window.MediaRecorder
    );
  }
  async start(key) {
    if (this.active || this.pending)
      throw Error("Rakaman atau permintaan mikrofon masih berjalan.");
    if (!A4Recorder.supported())
      throw Error(
        "Rakaman memerlukan HTTPS atau localhost dan pelayar yang menyokong mikrofon serta MediaRecorder.",
      );
    this.pending = true;
    const token = ++this.token;
    this.onState("request", 0);
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
        video: false,
      });
      if (token !== this.token) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      this.stream = stream;
      const type = [
        "audio/webm;codecs=opus",
        "audio/mp4",
        "audio/ogg;codecs=opus",
        "audio/webm",
      ].find((t) => MediaRecorder.isTypeSupported(t));
      const rec = new MediaRecorder(
        stream,
        type ? { mimeType: type } : undefined,
      );
      this.recorder = rec;
      const chunks = [];
      this.seconds = 0;
      const begun = performance.now();
      this.active = true;
      this.pending = false;
      rec.ondataavailable = (e) => {
        if (e.data.size) chunks.push(e.data);
      };
      rec.onstop = () => {
        const elapsed = (performance.now() - begun) / 1000;
        this.release();
        if (token !== this.token) return;
        const mime = rec.mimeType || chunks[0]?.type || "";
        const blob = new Blob(chunks, { type: mime });
        if (blob.size === 0) {
          this.onState("error", 0, "Tiada audio diterima. Cuba rakam semula.");
          return;
        }
        const previous = this.recordings.get(key);
        if (previous) URL.revokeObjectURL(previous.url);
        this.recordings.set(key, {
          blob,
          url: URL.createObjectURL(blob),
          mime,
          duration: elapsed,
        });
        this.onState("saved", elapsed);
      };
      rec.onerror = () => {
        this.cancel();
        this.onState(
          "error",
          0,
          "Rakaman terganggu. Semak mikrofon dan cuba lagi.",
        );
      };
      rec.start(250);
      this.onState("recording", 0);
      this.timer = setInterval(() => {
        this.seconds = Math.floor((performance.now() - begun) / 1000);
        this.onState("tick", this.seconds);
        if (this.seconds >= 120) this.stop();
      }, 250);
    } catch (e) {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (token !== this.token) return;
      this.release();
      const messages = {
        NotAllowedError:
          "Kebenaran mikrofon ditolak. Benarkan mikrofon melalui ikon tetapan laman di pelayar, kemudian cuba lagi.",
        NotFoundError:
          "Mikrofon tidak dijumpai. Sambungkan mikrofon dan cuba lagi.",
        NotReadableError:
          "Mikrofon sedang digunakan atau tidak dapat dibaca. Tutup aplikasi lain yang menggunakannya.",
        SecurityError: "Rakaman disekat oleh tetapan keselamatan pelayar.",
      };
      throw Error(
        messages[e.name] || e.message || "Mikrofon tidak dapat dibuka.",
      );
    }
  }
  stop() {
    if (this.recorder?.state === "recording") this.recorder.stop();
  }
  release() {
    clearInterval(this.timer);
    this.timer = null;
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.active = false;
    this.pending = false;
    this.recorder = null;
  }
  cancel() {
    this.token++;
    if (this.recorder && this.recorder.state !== "inactive")
      this.recorder.stop();
    this.release();
  }
  remove(key) {
    const x = this.recordings.get(key);
    if (x) URL.revokeObjectURL(x.url);
    this.recordings.delete(key);
  }
  download(key, filename) {
    const x = this.recordings.get(key);
    if (!x) return false;
    const ext = x.mime.includes("mp4")
      ? "m4a"
      : x.mime.includes("ogg")
        ? "ogg"
        : x.mime.includes("webm")
          ? "webm"
          : "audio";
    const a = document.createElement("a");
    a.href = x.url;
    a.download = filename + "." + ext;
    document.body.append(a);
    a.click();
    a.remove();
    return true;
  }
  clear() {
    this.cancel();
    for (const x of this.recordings.values()) URL.revokeObjectURL(x.url);
    this.recordings.clear();
  }
};
