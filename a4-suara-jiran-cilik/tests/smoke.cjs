const { chromium } = require("playwright"),
  assert = require("node:assert/strict"),
  fs = require("node:fs"),
  path = require("node:path"),
  { spawn } = require("node:child_process");
const root = path.resolve(__dirname, "../.."),
  port = 8896,
  url = `http://127.0.0.1:${port}/a4-suara-jiran-cilik/`;
const server = spawn(
  "python3",
  [
    "-m",
    "http.server",
    String(port),
    "--bind",
    "127.0.0.1",
    "--directory",
    root,
  ],
  { stdio: "ignore" },
);
let browser;
(async () => {
  for (let i = 0; i < 50; i++) {
    try {
      await fetch(url);
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 100));
    }
  }
  browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: [
      "--no-sandbox",
      "--use-fake-device-for-media-stream",
      "--use-fake-ui-for-media-stream",
    ],
  });
  const context = await browser.newContext({
    permissions: ["microphone"],
    acceptDownloads: true,
  });
  const page = await context.newPage({
    viewport: { width: 1440, height: 1050 },
  });
  let errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.locator("#student-name").fill("Aina <Wira>");
  await page.locator("#student-class").fill("4 Cemerlang");
  await page.locator("#profile-form button").click();
  assert.equal(await page.locator("[data-mission]").count(), 8);
  assert.equal(await page.locator("[data-mission]:disabled").count(), 7);
  async function record() {
    await page.locator("#record-start").click();
    await page.waitForFunction(() => recorder.active);
    await page.waitForTimeout(420);
    await page.locator("#record-stop").click();
    await page.waitForFunction(
      () => !recorder.active && !!recorder.recordings.get(key()),
    );
    assert(await page.evaluate(() => recorder.stream === null));
    assert(await page.locator("#recording-preview").isVisible());
  }
  for (let id = 1; id <= 8; id++) {
    await page.locator(`[data-mission="${id}"]`).click();
    assert(await page.locator("#mission-next").isDisabled());
    assert.equal(await page.locator(".stages li").count(), 2);
    await page.locator("#hint").click();
    assert(await page.locator("#hint-content").isVisible());
    await record();
    if (id === 1) {
      await page.locator("#record-play").click();
      await page.waitForFunction(
        () => document.querySelector("#recording-preview").currentTime > 0,
      );
      const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.locator("#record-download").click(),
      ]);
      assert(/\.(webm|m4a|ogg|audio)$/.test(download.suggestedFilename()));
      assert(!download.suggestedFilename().endsWith(".mp3"));
      const f = await download.path();
      assert(fs.statSync(f).size > 0);
      page.once("dialog", (d) => d.accept());
      await page.locator("#record-again").click();
      assert(await page.locator("#mission-next").isDisabled());
      await record();
    }
    await page.locator("#mission-next").click();
    assert.equal(await page.locator("#hint").count(), 0);
    assert(await page.locator("#mission-next").isDisabled());
    await record();
    assert(await page.locator("#mission-next").isDisabled());
    for (let i = 0; i < 3; i++)
      await page.locator(`[data-check="${i}"]`).check();
    assert(await page.locator("#mission-next").isEnabled());
    await page.locator("#mission-next").click();
    assert(
      (await page.locator(".reward").innerText()).includes("MISI BERJAYA"),
    );
    assert.equal(
      await page.evaluate(
        (id) =>
          JSON.parse(localStorage.getItem("dujaran-a4-v1")).completed[id].done,
        id,
      ),
      true,
    );
    console.log(
      "PASS Mission " +
        id +
        ": 2 real MediaRecorder blobs, gates, self-check and badge.",
    );
    if (id < 8) {
      await page.locator("#reward-next").click();
      assert.equal(
        await page.locator("[data-mission]:disabled").count(),
        7 - id,
      );
    }
  }
  await page.locator("#reward-next").click();
  assert(await page.locator("#certificate").isVisible());
  assert(
    (await page.locator(".cert-name").innerText()).includes("Aina <Wira>"),
  );
  assert(
    (await page.locator(".cert-class").innerText()).includes("4 Cemerlang"),
  );
  assert.equal(await page.locator(".mini-badges span").count(), 8);
  await page.pdf({
    path: "/tmp/a4-certificate.pdf",
    preferCSSPageSize: true,
    printBackground: true,
  });
  assert(fs.statSync("/tmp/a4-certificate.pdf").size > 1000);
  await page.evaluate(
    () =>
      (window.print = () => {
        window.printed = true;
      }),
  );
  await page.locator("#pdf").click();
  assert(await page.evaluate(() => window.printed));
  await page.reload();
  await page.locator("#profile-form button").click();
  assert.equal(await page.locator("[data-mission].finished").count(), 8);
  assert.equal(await page.evaluate(() => recorder.recordings.size), 0);
  await page.locator('[data-mission="1"]').click();
  assert(await page.locator("#mission-next").isDisabled());
  await page.locator("#nav-map").click();
  // Teacher edits, HTTPS validation and declared oral fallback.
  await page.locator("#teacher").click();
  await page
    .locator("#edit-main")
    .fill("Selamat pagi! Bolehkah kamu membantu saya?");
  await page.locator("#edit-audio0").fill("http://example.com/test.mp3");
  await page.locator('#edit-form button[type="submit"]').click();
  assert((await page.locator("#teacher-status").innerText()).includes("HTTPS"));
  await page.locator("#edit-audio0").fill("");
  await page.locator('#edit-form button[type="submit"]').click();
  await page.locator("#teacher-panel .close-dialog").click();
  await page.locator('[data-mission="1"]').click();
  assert(
    (await page.locator(".speech-bubble").innerText()).includes(
      "Selamat pagi!",
    ),
  );
  await page.locator("#teacher").click();
  await page.locator("#oral-confirm").check();
  await page.locator("#oral-approve").click();
  await page.locator("#teacher-panel .close-dialog").click();
  assert(await page.locator("#mission-next").isEnabled());
  assert.equal(await page.evaluate(() => recorder.recordings.size), 0);
  assert(
    (await page.locator("#gate-status").innerText()).includes(
      "lisan bersama guru",
    ),
  );
  // Simulate denied permission separately; the other test used Chromium's real capture stack.
  const denied = await browser.newContext();
  const p2 = await denied.newPage();
  await p2.addInitScript(() => {
    navigator.mediaDevices.getUserMedia = async () => {
      throw new DOMException("Denied", "NotAllowedError");
    };
  });
  await p2.goto(url);
  await p2.locator("#student-name").fill("Ujian");
  await p2.locator("#student-class").fill("4A");
  await p2.locator("#profile-form button").click();
  await p2.locator('[data-mission="1"]').click();
  await p2.locator("#record-start").click();
  await p2.waitForFunction(() =>
    document.querySelector("#record-status").textContent.includes("ditolak"),
  );
  assert(await p2.locator("#mission-next").isDisabled());
  assert.equal(await p2.evaluate(() => recorder.recordings.size), 0);
  await denied.close();
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.locator("#nav-map").click();
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    await page.locator('[data-mission="2"]').click();
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    const text = await page.locator("body").innerText();
    assert(!/\b(?:SK|SP)\b/.test(text));
  }
  assert.equal(errors.length, 0, errors.join("\n"));
  console.log(
    "PASS download/playback/re-record, sequential unlock, reload, teacher edits, oral fallback, denied mic, certificate PDF and responsive views; no JavaScript errors.",
  );
})()
  .then(async () => {
    if (browser) await browser.close();
    server.kill();
  })
  .catch(async (e) => {
    console.error(e);
    if (browser) await browser.close();
    server.kill();
    process.exitCode = 1;
  });
