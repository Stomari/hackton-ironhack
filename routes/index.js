const express = require('express');
const router  = express.Router();
const nodemailer = require('nodemailer');
const sparkPostTransport = require('nodemailer-sparkpost-transport');
var QRCode = require('qrcode')

const transporter = nodemailer.createTransport(sparkPostTransport({
  'sparkPostApiKey': process.env.SPARKPOST_API_KEY
}));

router.get('/', (req, res) => {
  QRCode.toDataURL('ULTRASECRET!', { version: 10 })
  .then(url => {
    console.log(url)
    res.render('index', {url});
  })
  .catch(err => {
    console.error(err)
  })
  // QRCode.toDataURL('I am a pony!', function (err, url) {
  //   console.log(url, '######################################')
  //   res.render('index', {url});
  // })
});

router.post('/send-email', (req, res) => {
  let { username, email } = req.body;
  transporter.sendMail({
    from: '"Bravocado! 🥑" <bravocado@ironhackers.dev>',
    to: email, 
    subject: 'Awesome Subject', 
    text: 'Awesome Message',
    html: `<b>${username}</b>`
  })
  .then(info => {
    res.redirect('/')
  })
  .catch(error => console.log(error))
});

module.exports = router;
