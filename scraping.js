const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('terms.csv');

//Write headers
writeStream.write(`Title \n`);

axios.get("http://dlearning.co.in/").then(response => {
  const { data } = response;
  const $ = cheerio.load(data);
  const content = $('.cms');

  $('h2').each((i, el) => {
    const listItem = $(el).text();

    //Write to CSV
    writeStream.write(`${listItem} \n`);
  });
  console.log('Scrapping Done...');


}).catch(function (error) {
  // handle error
  console.log(error);
})