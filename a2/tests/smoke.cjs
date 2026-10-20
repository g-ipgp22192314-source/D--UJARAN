/* Run with Node.js and Playwright installed: node a2/tests/smoke.cjs */
const {chromium}=require('playwright');
const {spawn}=require('node:child_process');
const path=require('node:path'),fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..'),port=8879,url=`http://127.0.0.1:${port}/a2/`;
const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'a2/data.js'),'utf8'),sandbox);const units=sandbox.window.A2_UNITS;
const server=spawn('python3',['-m','http.server',String(port),'--bind','127.0.0.1','--directory',root],{stdio:'ignore'});
let browser;
(async()=>{for(let i=0;i<50;i++){try{await fetch(url);break}catch{await new Promise(r=>setTimeout(r,100))}}
assert.equal(units.length,8);assert.equal(units.reduce((n,u)=>n+u.questions.length+2,0),40);for(const u of units){assert.equal(u.questions.length,3);assert.equal(u.evidence.length,3);for(const q of [...u.questions,u.intent]){assert.equal(q.options.length,4);assert(q.correct>=0&&q.correct<4);assert(q.explanation)}}
browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});const context=await browser.newContext();const page=await context.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(url);await page.locator('#help-button').click();assert(await page.locator('#help').isVisible());await page.keyboard.press('Escape');await page.locator('#start').click();assert.equal(await page.locator('[data-open]').count(),8);
const targets=[0,1,2,3,4,5,5,5],starTargets=[0,1,1,2,3,3,3,3];
for(const [i,u] of units.entries()){
 await page.locator(`[data-open="${u.id}"]`).click();assert.equal(await page.locator('.progress li').count(),4);
 await page.locator('[data-audio="text"]').click();assert(await page.locator('#transcript').isVisible());assert((await page.locator('#transcript').innerText()).includes(u.characters[0]));
 await page.locator('#next').click();
 for(let qi=0;qi<5;qi++){
  const correct=qi<3?u.questions[qi].correct:qi===3?u.evidenceCorrect:u.intent.correct;
  const count=qi===3?3:4,choice=qi<targets[i]?correct:(correct+1)%count;
  assert(await page.locator('#next').isDisabled());await page.locator(`[data-choice="${choice}"]`).click();assert.equal(await page.locator('[data-choice]:disabled').count(),count);
  assert((await page.locator('#feedback').innerText()).includes(qi<targets[i]?'Tepat sekali':'Belum tepat'));
  await page.evaluate(()=>document.querySelectorAll('[data-choice]')[0].click());
  await page.locator('#next').click();
 }
 assert((await page.locator('.score').innerText()).includes(String(targets[i]*20)));
 assert.equal(await page.locator('.result > .stars').getAttribute('aria-label'),`${starTargets[i]} bintang`);
 await page.locator('#review').click();await page.locator('#next').click();assert.equal(await page.locator('[data-choice]:disabled').count(),4);await page.locator('#board-nav').click();
 console.log(`PASS Unit ${u.id}: 4 cabaran, 5 jawapan dikunci, ${targets[i]*20} markah, ${starTargets[i]} bintang`);
}
assert.equal((await page.locator('body').innerText()).trim(),'');await page.reload();await page.locator('#start').click();const persisted=await page.evaluate(()=>JSON.parse(localStorage.getItem('dujaran-a2-v1')).progress);assert.equal(Object.values(persisted).filter(r=>r.completed).length,8);assert.equal(Object.values(persisted).flatMap(r=>r.answers).filter(a=>a.correct).length*20,500);
// Missing audio must explain the next step; no language fallback is forced.
await page.locator('[data-open="6"]').click();await page.locator('#review').click();await page.locator('[data-audio="play"]').click();await page.waitForFunction(()=>document.querySelector('#audio-status').textContent.includes('Rakaman belum tersedia')||document.querySelector('#audio-status').textContent.includes('ms-MY'));
await page.locator('#board-nav').click();await page.locator('[data-open="1"]').click();await page.locator('#review').click();await page.locator('[data-audio="play"]').click();await page.waitForFunction(()=>document.querySelector('audio').duration>24&&document.querySelector('audio').currentTime>.1);await page.locator('[data-audio="pause"]').click();assert(await page.locator('audio').evaluate(a=>a.paused));
// Upload a generated 3-second WAV fixture: validates media operations, not Malay voice content.
const rate=22050,n=rate*3,buf=Buffer.alloc(44+n*2);buf.write('RIFF');buf.writeUInt32LE(36+n*2,4);buf.write('WAVEfmt ',8);buf.writeUInt32LE(16,16);buf.writeUInt16LE(1,20);buf.writeUInt16LE(1,22);buf.writeUInt32LE(rate,24);buf.writeUInt32LE(rate*2,28);buf.writeUInt16LE(2,32);buf.writeUInt16LE(16,34);buf.write('data',36);buf.writeUInt32LE(n*2,40);for(let i=0;i<n;i++)buf.writeInt16LE(Math.round(Math.sin(i/rate*Math.PI*2*440)*2000),44+i*2);
await page.locator('#teacher').click();await page.locator('#upload-1').setInputFiles({name:'ujian.wav',mimeType:'audio/wav',buffer:buf});await page.waitForFunction(()=>document.querySelector('#teacher-status').textContent.includes('Disimpan'));await page.locator('#teacher-dialog .close-dialog').click();await page.locator('[data-audio="play"]').click();await page.waitForFunction(()=>document.querySelector('audio').currentTime>.15);await page.locator('[data-audio="pause"]').click();assert(await page.locator('audio').evaluate(a=>a.paused));const at=await page.locator('audio').evaluate(a=>a.currentTime);await page.waitForTimeout(200);assert.equal(await page.locator('audio').evaluate(a=>a.currentTime),at);await page.locator('[data-audio="play"]').click();await page.waitForFunction(t=>document.querySelector('audio').currentTime>t,at);await page.locator('[data-audio="replay"]').click();assert((await page.locator('audio').evaluate(a=>a.currentTime))<.6);
await page.locator('#mute').click();assert(await page.locator('audio').evaluate(a=>a.paused));await page.locator('[data-audio="play"]').click();assert((await page.locator('#audio-status').innerText()).includes('Bunyi dimatikan'));await page.locator('#mute').click();
await page.reload();await page.locator('#art-info').click();await page.waitForFunction(()=>document.querySelector('#audio-fields').textContent.includes('Rakaman guru dimuat naik'));await page.locator('#teacher-dialog .close-dialog').click();
console.log('PASS audio: muat naik, main, jeda, sambung, ulang, mute dan IndexedDB selepas reload (WAV ujian; bukan dialog sebenar)');
await page.locator('#art-motion').click();assert(await page.locator('body').evaluate(e=>e.classList.contains('reduce-motion')));
await page.locator('#start').click();
for(const width of [1440,768,390]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.locator('[data-open="2"]').click();await page.locator('#review').click();await page.locator('#next').click();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.locator('#board-nav').click()}
assert.equal(errors.length,0,errors.join('\n'));await page.goto(`http://127.0.0.1:${port}/`);assert.equal(await page.locator('.activity-card').count(),10);assert.equal(await page.locator('a[href="a2/index.html"]').count(),1);assert.equal(await page.locator('[data-url="puzzleUrl"]').count(),2);console.log('PASS simpanan, kemenangan 8 unit, responsif, pautan A2 dan 10 kad portal; tiada ralat JavaScript');
})().then(async()=>{if(browser)await browser.close();server.kill();}).catch(async e=>{console.error(e);if(browser)await browser.close();server.kill();process.exitCode=1});
