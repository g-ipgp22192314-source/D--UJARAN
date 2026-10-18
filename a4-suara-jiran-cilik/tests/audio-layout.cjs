const { chromium } = require("playwright"),
  assert = require("node:assert/strict"),
  fs = require("node:fs");
(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: [
      "--no-sandbox",
      "--use-fake-device-for-media-stream",
      "--use-fake-ui-for-media-stream",
    ],
  });
  const c = await b.newContext({ permissions: ["microphone"] });
  const p = await c.newPage({ viewport: { width: 1440, height: 1000 } });
  let errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  await p.route("https://audio.example.test/ujaran.mp3", (route) =>
    route.fulfill({
      status: 200,
      contentType: "audio/mpeg",
      body: fs.readFileSync(
        require("node:path").join(__dirname, "fixtures/audio-test.mp3"),
      ),
    }),
  );
  await p.goto(
    process.env.A4_TEST_URL || "http://127.0.0.1:8895/a4-suara-jiran-cilik/",
  );
  await p.locator("#student-name").fill("Ujian Audio");
  await p.locator("#student-class").fill("4A");
  await p.locator("#profile-form button").click();
  for (const width of [1440, 768, 390]) {
    await p.setViewportSize({ width, height: 1000 });
    const boxes = await p.evaluate(() => {
      const map = document
        .querySelector(".neighborhood-map")
        .getBoundingClientRect();
      return [...document.querySelectorAll("[data-mission]")].map((e) => {
        let r = e.getBoundingClientRect();
        return {
          top: r.top - map.top,
          bottom: r.bottom - map.top,
          left: r.left - map.left,
          right: r.right - map.left,
          mapW: map.width,
          mapH: map.height,
        };
      });
    });
    for (const x of boxes) {
      assert(
        x.top >= 0 &&
          x.left >= 0 &&
          x.bottom <= x.mapH + 1 &&
          x.right <= x.mapW + 1,
        JSON.stringify(x),
      );
    }
  }
  await p.locator('[data-mission="1"]').click();
  await p.locator("#music").click();
  await p.waitForFunction(
    () => context?.state === "running" && musicTimer !== null,
  );
  await p.locator("#sfx").click();
  assert.equal(await p.locator("#sfx").getAttribute("aria-pressed"), "true");
  await p.locator("#teacher").click();
  await p.locator("#edit-audio0").fill("https://audio.example.test/ujaran.mp3");
  await p.locator('#edit-form button[type="submit"]').click();
  await p.locator("#teacher-panel .close-dialog").click();
  await p.locator("#listen").click();
  await p.waitForFunction(
    () =>
      !document.querySelector("#utterance-audio").paused &&
      document.querySelector("#utterance-audio").currentTime > 0.1,
  );
  assert(await p.evaluate(() => duck === true && musicTimer === null));
  await p
    .locator("#utterance-audio")
    .evaluate((e) => (e.currentTime = e.duration - 0.2));
  await p.waitForFunction(
    () =>
      document.querySelector("#utterance-audio").ended && musicTimer !== null,
  );
  await p.locator("#record-start").click();
  await p.waitForFunction(() => recorder.active);
  assert(await p.evaluate(() => duck && musicTimer === null));
  p.once("dialog", (d) => d.accept());
  await p.locator("#nav-map").click();
  assert(
    await p.evaluate(
      () => !recorder.active && !recorder.pending && recorder.stream === null,
    ),
  );
  assert.equal(await p.evaluate(() => recorder.recordings.size), 0);
  await p.locator("#motion").click();
  assert(
    await p
      .locator("body")
      .evaluate((e) => e.classList.contains("reduce-motion")),
  );
  await p.locator("#teacher").click();
  p.once("dialog", (d) => d.dismiss());
  await p.locator("#reset").click();
  assert(await p.locator("#teacher-panel").isVisible());
  p.once("dialog", (d) => d.accept());
  await p.locator("#reset").click();
  assert(await p.locator("#student-name").isVisible());
  assert.equal(await p.locator("#student-name").inputValue(), "");
  assert.equal(errors.length, 0, errors.join("\n"));
  console.log(
    "PASS no clipped map buttons at 3 widths; HTTPS teacher MP3 playback, background music duck/resume, capture cancellation, motion setting and reset confirmation.",
  );
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
