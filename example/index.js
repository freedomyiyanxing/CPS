const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://192.168.1.22:8899/i/index', { waitUntil: 'domcontentloaded' });
  // await page.evaluate(function (heading) {
  //   console.log(heading);
  //   return heading.innerText
  // });
  const bodyHandle = await page.$('div#root');
  const html = await page.evaluate(root => {
    console.log(root);
    console.log('\n');
    console.log('\n');
    return root.innerHTML
  }, bodyHandle);
  console.log(html);
  await bodyHandle.dispose();
  await browser.close();
})();
