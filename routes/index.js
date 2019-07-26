const express = require('express');
const router  = express.Router();
const nodemailer = require('nodemailer');
const sparkPostTransport = require('nodemailer-sparkpost-transport');

const transporter = nodemailer.createTransport(sparkPostTransport({
  'sparkPostApiKey': process.env.SPARKPOST_API_KEY
}));

router.get('/', (req, res) => {
  res.render('index');
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
