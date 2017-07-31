const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const URL = 'https://octodex.github.com';

module.exports = function() {
  request(URL, function(error, response, body) {
    if (error) return console.log(error);

    let $ = cheerio.load(body);
    let images = [].map.call($('.preview-image > img'), function(image) {
      return {
        name: $(image).attr('alt'),
        url: URL + $(image).data('src')
      };
    });

    fs.writeFileSync('octocats.json', JSON.stringify(images));
  });
};
