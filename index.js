const app = require("express")();
let chrome = {};
let puppeteer;
const express = require("express")();
//const puppeteer = require("puppeteer");
const puppeteer = require('puppeteer-core');
const cors = require('cors');
const randomUseragent = require('random-useragent');
const NodeRSA = require('node-rsa');
const key = new NodeRSA();
const privatePem = '-----BEGIN RSA PRIVATE KEY-----MIIBOwIBAAJBAJfTPs4kSrLCxnVHC/6YGYqiZg/X7RRCiowY/YQ9brBkymIh4bhsEhYH141t4RQyh0ThAU09ycNUF+d4OVUmUBECAwEAAQJAdJWlc7xQlAaXSLVe04jOjDN6dg4UImuaYkxKWIKn/dCg7oMZR9IYn+nuNKiDhpFuWH33yWxVxPNfZqsXRrMcAQIhAPhInJiCK66WitClXOndZCyB2mQh2yHPCy4BexDUOOhRAiEAnIsxcbWcdwq9i0FhByvf3TysVvuovOAWxmlm+2TMu8ECICBu0830SyJ+VdnVkCKYogpSWCX2ajqrYil7Vgknv9tRAiEAhawuKmTkGJqpQ/IuAkuqu2YF27jFW5MWn5J9h4mJcYECIQDGIqyayMmoPwe4NAEWS4FmMVenG2t9tQPfeOVvKkvqXg==-----END RSA PRIVATE KEY-----  ';
key.importKey(privatePem, 'pkcs1-pem');

app.use(cors({
   origin: 'http://localhost:3000',
// origin: 'https://www.battlegroundindiaesports.com'//
}));
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

app.get("/api", async (req, res) => {
  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }

  try {
    let browser = await puppeteer.launch(options);
    const url = req.query.url
    let page = await browser.newPage();
    await page.goto(url);
    res.send(await page.title());
  } catch (err) {
    console.error(err);
    return null;
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});

module.exports = app;
