const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    translate(text, locale) {
        let matchedTimes = locale == 'american-to-british' ? text.match(RegExp(/([1-9]|1[012]):[0-5][0-9]/g)) : text.match(RegExp(/([1-9]|1[012]).[0-5][0-9]/g));
        let loweredOriginalText = text.toLowerCase();
        let wholeWords = loweredOriginalText.match(/\w+/g);

        if (locale == 'american-to-british') {
            Object.entries(americanOnly).map(([k, v]) => {
                if (wholeWords.includes(k) || (k.includes(' ') && loweredOriginalText.includes(k)))
                    text = text.replace(RegExp(k, 'gi'), '<span class="highlight">' + v + '</span>');
            });
            Object.entries(americanToBritishSpelling).map(([k, v]) => {
                if (wholeWords.includes(k))
                    text = text.replace(RegExp(k, 'gi'), '<span class="highlight">' + v + '</span>');
            });
            Object.entries(americanToBritishTitles).map(([k, v]) => {
                    text = text.replace(RegExp(k, 'gi'), '<span class="highlight">' + v[0].toUpperCase() + v.substring(1) + '</span>');
            });
            if (matchedTimes) {
                matchedTimes.forEach(matchedTime => {
                    text = text.replace(RegExp(matchedTime, 'gi'), '<span class="highlight">' + matchedTime.replace(':', '.') + '</span>');
                });
            }
        }
        else if (locale == 'british-to-american') {
            Object.entries(britishOnly).map(([k, v]) => {
                if (wholeWords.includes(k) || (k.includes(' ') && loweredOriginalText.includes(k)))
                    text = text.replace(RegExp(k, 'gi'), '<span class="highlight">' + v + '</span>');
            });
            Object.entries(americanToBritishSpelling).map(([k, v]) => {
                if (wholeWords.includes(v))
                    text = text.replace(RegExp(v, 'gi'), '<span class="highlight">' + k + '</span>');
            });
            Object.entries(americanToBritishTitles).map(([k, v]) => {
                if (wholeWords.includes(v))
                    text = text.replace(RegExp(v, 'gi'), '<span class="highlight">' + k[0].toUpperCase() + k.substring(1) + '</span>');
            });
            if (matchedTimes) {
                matchedTimes.forEach(matchedTime => {
                    text = text.replace(RegExp(matchedTime, 'gi'), '<span class="highlight">' + matchedTime.replace('.', ':') + '</span>');
                });
            }
        }
        return text;
    }
}

module.exports = Translator;