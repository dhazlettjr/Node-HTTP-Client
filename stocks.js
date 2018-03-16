#!/usr/bin/env node

const { get } = require('https');
const {readFile} = require('fs');
const [,,...args] = process.argv;

get(`https://api.iextrading.com/1.0/stock/${args}/quote`, (res) => {
    console.log('fetching data...');
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    try {
      let parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.log(e.message);
    }
  });
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});