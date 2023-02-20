const app = require("express")();
const express = require("express")();
const puppeteer = require("puppeteer");
//const puppeteer = require('puppeteer-core');
const cors = require('cors');
const agent = require('random-mobile-ua')
const NodeRSA = require('node-rsa');
const key = new NodeRSA();
const privatePem = '-----BEGIN RSA PRIVATE KEY-----MIIBOwIBAAJBAJfTPs4kSrLCxnVHC/6YGYqiZg/X7RRCiowY/YQ9brBkymIh4bhsEhYH141t4RQyh0ThAU09ycNUF+d4OVUmUBECAwEAAQJAdJWlc7xQlAaXSLVe04jOjDN6dg4UImuaYkxKWIKn/dCg7oMZR9IYn+nuNKiDhpFuWH33yWxVxPNfZqsXRrMcAQIhAPhInJiCK66WitClXOndZCyB2mQh2yHPCy4BexDUOOhRAiEAnIsxcbWcdwq9i0FhByvf3TysVvuovOAWxmlm+2TMu8ECICBu0830SyJ+VdnVkCKYogpSWCX2ajqrYil7Vgknv9tRAiEAhawuKmTkGJqpQ/IuAkuqu2YF27jFW5MWn5J9h4mJcYECIQDGIqyayMmoPwe4NAEWS4FmMVenG2t9tQPfeOVvKkvqXg==-----END RSA PRIVATE KEY-----  ';
key.importKey(privatePem, 'pkcs1-pem');

app.use(cors({
   origin: 'http://localhost:3000'
}));
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.get("/wrapper",  async (req, res)  => {
  
 if(Object.keys(req.query).length === 0) {
   res.json({
     ret:0,
     msg: 'Unauthorized',
     'developer telegram': '@god_forever'
   })
 }
 else if(req.query.token == "") {
   res.json({
   ret:1,
  msg:'Unauthorized',
  'developer telegram': '@god_forever'
   })
 }
 else {
   try {
     const now = Date.now();
  const encrypted = req.query.token;
  const decryptedString = key.decrypt(decodeURIComponent(encrypted), 'utf8');
  const decrypedObject = JSON.parse(decryptedString);
  const vt = (decrypedObject.time);
  const idx = (decrypedObject.id);
  const ws = (decrypedObject.ws);
  console.log(ws)
  
  if(vt>now && ws == '0') {
    func(idx)
  }
  else if (vt>now && ws !== '0'){
    wsfun(idx,ws)
  }
  
   else if(vt<now) {
   res.json ({
     ret:'tokeneinvalid',
        msg:'Unauthorized',
  'developer telegram': '@god_forever'
   })
 }
   }
   
   catch {
     res.json({
    ret:'+1',
    msg:'Unauthorized'
  })
   }
 }


async function func(idx) {
  
const brewery = async(page) => {
 await page.setUserAgent(MOBILE_USERAGENT);
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if(req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image'){
            req.abort();
        }
        else {
            req.continue();
        }
    }); 
}
const url = "https://www.midasbuy.com/adyen/pk/buy/pubgm"
 const MOBILE_USERAGENTx = agent.randomAgent();
 const MOBILE_USERAGENT = MOBILE_USERAGENTx.agent
 console.log(MOBILE_USERAGENT)
 console.log(idx,"fun executed")
 try {
const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-gpu']});
    let page = await browser.newPage();
   
 //// collectData//////   
  const collectData = async (page,idx) => {
  try {
 console.log(attempts)
 if(attempts === 0){
   console.log("if exex")
   await brewery(page);
   await page.goto("https://www.midasbuy.com/adyen/pk/buy/pubgm", { timeout:0});
   await page.$eval('#cookie-agreement-pop > .close-btn', el => el.click());
   await  page.waitForSelector('.input')
     .then(() => console.log('selector player id found'));
   await page.type('.input', JSON.stringify(idx), { delay: 10 });
   await page.keyboard.press('Enter');
   await page.on('response', async(response) =>{
   const eu = response.url()
   const str = eu.split("?")
  const mxx = "https://www.midasbuy.com/interface/getCharac";
    if(str[0] == mxx){
      console.log(response.headers())
      //console.log(str[1])
      const euu = "https://www.midasbuy.com/interface/getCharac?"
      const urll = euu+str[1]
      console.log('XHR response received');
const resx = await response.json();
console.log(resx)
responsex(resx)
return resx
}
});
   await page.screenshot({
      type: "png",
      path: Date.now()+".png"
    });
    
 } ////IF END////
 else {
   await page.goto("https://www.midasbuy.com/adyen/pk/buy/pubgm", { timeout:0});
   await page.$eval('#cookie-agreement-pop > .close-btn', el => el.click());
   await  page.waitForSelector('.input')
     .then(() => console.log('selector player id found'));
   await page.type('.input', JSON.stringify(idx), { delay: 10 });
   await page.keyboard.press('Enter');
   await page.on('response', async(response) =>{
   const eu = response.url()
   const str = eu.split("?")
  const mxx = "https://www.midasbuy.com/interface/getCharac";
    if(str[0] == mxx){
      console.log(response.headers())
      //console.log(str[1])
      const euu = "https://www.midasbuy.com/interface/getCharac?"
      const urll = euu+str[1]
      console.log('XHR response received');
const resx = await response.json();
console.log(resx)
responsex(resx)
return resx
}
});
   await page.screenshot({
      type: "png",
      path: Date.now()+"else.png"
    });

    
 } ////ELSE END////
  
  } catch (err) {
    console.error(err.message);
    return false;
  }
}
/////////COLLECT END////////////
const responsex = async(resx) => {
  console.log('here res',resx)
  res.json(resx)
}

let data = false;
let attempts = 0;
// Retry request until it gets data or tries 5 times
while(data === false && attempts < 10)
{
  data = await collectData(page,idx);
  attempts += 1;  
  if (data === false) {
    // Wait a few seconds, also a good idea to swap proxy here*
    console.log('failed att>>',attempts)
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  else {
  //  console.log('here res>>',JSON.stringify(data))
  console.log(await data)
  }
}
  
  
 } ///try bracket//// 
catch(err) {
  console.log(err)
res.json({
ret: err
)}
}////cqtch end/////
}/////fun function////



});

app.use(function(req, res) {
// Invalid request
res.sendFile('./public/index.html', { root: __dirname });      
});  

app.listen(process.env.PORT || 4001, () => {
  console.log("Server started");
});

module.exports = app;
