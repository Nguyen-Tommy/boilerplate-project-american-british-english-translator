'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      if (req.body.text == undefined || !req.body.locale)
        return res.json({ error: 'Required field(s) missing' });
      else if (req.body.text == '')
        return res.json({ error: 'No text to translate' });
      else if (req.body.locale != 'american-to-british' && req.body.locale != 'british-to-american')
        return res.json({ error: 'Invalid value for locale field' });
      else if (translator.translate(req.body.text, req.body.locale) == req.body.text)
        return res.json({ text: req.body.text, translation: 'Everything looks good to me!' });
      else
        return res.json({ text: req.body.text, translation: translator.translate(req.body.text, req.body.locale) });
    });
};
