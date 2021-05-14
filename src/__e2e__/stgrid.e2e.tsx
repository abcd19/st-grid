import React from 'react';
import {CheckboxFldLayoutEdit} from '../CheckboxFld/CheckboxFldLayoutEdit';
import {ICheckboxFldLayoutEditProps} from '../CheckboxFld/CheckboxFldLayoutEdit';
import puppeteer from "puppeteer";
import 'regenerator-runtime/runtime'

let page: any;
let browser: any;
const width = 1920;
const height = 1080;

describe('Checkbox e2e tests', () => {

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 80,
      args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
  });

  afterAll(async done => {
    await browser.close();
    done();
  });


  test('open',async()=>{
    await page.goto('http://localhost:8080/stgrid.html');
    await page.screenshot({ path: 'src/__e2e__/__screenshots__/screenshot.png' });
    const html = await page.$eval('h2', (e:any) => e.innerHTML);
    expect(html).toBe('Demo')
  })

  //test for grid
  /*test('click add btn',async()=>{
    await page.goto('http://localhost:8080/stgrid.html');
    page.click('.st_icon_32_plus')
  })*/
  
  
});
