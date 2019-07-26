const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const sparkPostTransport = require('nodemailer-sparkpost-transport');
const QRCode = require('qrcode');
const User = require('../models/user')


const transporter = nodemailer.createTransport(sparkPostTransport({
  'sparkPostApiKey': process.env.SPARKPOST_API_KEY
}));

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/send-email', (req, res) => {
  let { username, email } = req.body;

  if (username === '' || email === '') {
    res.render('/', { message: 'Username and email are required' });
    return;
  }

  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = 'AVOCADO';
  for (let i = 0; i < 15; i += 1) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }

  User.findOne({ email })
    .then((user) => {
      console.log(user)
      if (user !== null) {
        res.render('index', { message: 'You have already redeemed your cupom' });
        return;
      }

      const newUser = new User({
        username,
        email,
        promoCode: token,
      });

      newUser.save((err) => {
        if (err) {
          res.render('index', { message: 'Something went wrong' });
        }
      })

      // transporter.sendMail({
      //   from: '"Bravocado! 🥑" <bravocado@ironhackers.dev>',
      //   to: email,
      //   subject: 'Awesome Subject',
      //   text: 'Awesome Message',
      //   html: `<b>${username} <a href="http://localhost:3000/promo/${token}">Click on this link to confirm</a></b>`
      // })
      //   .then(info => {
      //     res.redirect('/')
      //   })
      //   .catch(error => console.log(error))
      res.redirect('/');
    })
    .catch(err => console.log(err));
})

module.exports = router;
