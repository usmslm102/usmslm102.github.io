// Run against an Astro preview server. Set PLAYWRIGHT_PATH when Playwright is external.
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser=await chromium.launch({headless:true, ...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
 const context=await browser.newContext({permissions:['clipboard-read','clipboard-write']});
 const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
 const origin=process.env.TEST_URL||'http://127.0.0.1:4321';
 const routes=['/','/blog/','/uses/','/about/','/contact/','/r/'];
 await page.goto(origin+'/blog/');
 const posts=await page.locator('[data-post] h2 a').evaluateAll(links=>links.map(link=>link.getAttribute('href')));
 assert.equal(posts.length,4);routes.push(...posts);
 for(const width of [1440,390,320]){
  await page.setViewportSize({width,height:1000});
  for(const route of routes){
   const response=await page.goto(origin+route);assert.equal(response.status(),200,route);
   await page.waitForTimeout(100);
   assert(await page.locator('h1').count()>=1,route);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow at ${width}: ${route}`);
  }
 }
 await page.setViewportSize({width:1440,height:1000});
 await page.goto(origin+'/');await page.getByRole('button',{name:'Pause motion'}).click();assert.equal(await page.locator('.orbit-art').evaluate(el=>el.classList.contains('paused')),true);
 await page.getByRole('button',{name:'Resume motion'}).click();
 await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,80));}window.scrollTo({top:0,behavior:"instant"});});await page.waitForTimeout(1200);await page.screenshot({path:'/tmp/website-home.png',fullPage:true});
 await page.goto(origin+'/blog/');await page.locator('#post-search').fill('Docker');assert(await page.locator('[data-post]:visible').count()>0);
 await page.locator('#post-search').fill('zzzz-no-match');assert.equal(await page.locator('[data-post]:visible').count(),0);assert(await page.locator('#no-results').isVisible());
 await page.locator('#post-search').fill('');assert.equal(await page.locator('[data-post]:visible').count(),4);
 await page.goto(origin+'/uses/');for(const key of ['hardware','stack','apps','editor']){await page.locator(`[data-detail="${key}"]`).click();assert.equal(await page.locator('.detail-link').getAttribute('href'),'#'+key);assert.equal(await page.locator(`[data-detail="${key}"]`).getAttribute('aria-pressed'),'true');}
 await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,80));}window.scrollTo({top:0,behavior:"instant"});});await page.waitForTimeout(1200);await page.screenshot({path:'/tmp/website-uses.png',fullPage:true});
 await page.goto(origin+'/blog/containerizing-angular-application-for-production-using-docker/');await page.getByText('On this page',{exact:true}).click();assert(await page.locator('.reading-tools nav a').count()>0);
 await page.locator('.copy-link').click();await page.waitForFunction(()=>document.querySelector('.copy-status').textContent.length>0);assert.equal(await page.locator('.copy-status').textContent(),'Link copied');await page.goto(origin+'/blog/create-deploy-azure-function-using-vs-code-and-azure-devops-ci-cd/');await page.locator('.copy-code').first().click();await page.waitForFunction(()=>document.querySelector('.copy-code').textContent==='Copied!');assert.equal(await page.locator('.copy-code').first().textContent(),'Copied!');
 for(const route of routes){await page.goto(origin+route);const broken=await page.locator('a[href^="#"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')).filter(href=>href.length>1&&!document.getElementById(decodeURIComponent(href.slice(1)))&&!document.getElementsByName(decodeURIComponent(href.slice(1))).length));assert.deepEqual(broken,[],`Broken anchors: ${route}`);}
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(origin+'/');assert.equal(await page.locator('.orbit-plane').evaluate(el=>getComputedStyle(el).animationName),'none');
 assert.equal((await context.request.get(origin+'/rss.xml')).status(),200);assert.equal((await context.request.get(origin+'/sitemap-index.xml')).status(),200);
 const noJs=await browser.newContext({javaScriptEnabled:false});const staticPage=await noJs.newPage();for(const route of ['/','/blog/','/uses/',...posts]){await staticPage.goto(origin+route);assert(await staticPage.locator('h1').first().isVisible());}assert.deepEqual(errors,[]);
 await page.setViewportSize({width:390,height:844});await page.goto(origin+'/');await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,80));}window.scrollTo({top:0,behavior:"instant"});});await page.waitForTimeout(1200);await page.screenshot({path:'/tmp/website-mobile.png',fullPage:true});
 await browser.close();console.log(`PASS: ${routes.length} routes at 3 widths, search, desk controls, motion, reading tools, anchors, RSS, sitemap, no-JS content, and no browser errors.`);
})().catch(error=>{console.error(error);process.exit(1)});
