const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const sparkPostTransport = require('nodemailer-sparkpost-transport');
const User = require('../models/user');
const UserStatistics = require('../models/userStatistics');


// const transporter = nodemailer.createTransport(sparkPostTransport({
//   'sparkPostApiKey': process.env.SPARKPOST_API_KEY
// }));

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'e86143af192ef8',
    pass: '5c8ee907365d35',
  },
});

router.get('/', (req, res) => {
  UserStatistics.find()
    .then((data) => {
      let { access } = data[0];
      access += 1;
      UserStatistics.findOneAndUpdate({ _id: data[0]._id }, { access })
        .then(() => {
          res.render('index');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post('/send-email', (req, res) => {
  let { username, email } = req.body;

  if (username === '' || email === '') {
    res.render('/', { message: 'Username and email are required' });
    return;
  }

  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let token = 'AVO';
  for (let i = 0; i < 4; i += 1) {
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

      newUser.save()
        .then(() => {
          transporter.sendMail({
            from: '"Bravocado! 🥑" <bravocado@ironhackers.dev>',
            to: email,
            subject: 'Awesome Subject',
            text: 'Awesome Message',
            html: `<b>${username} <a href="http://localhost:3000/promo/${token}">Click on this link to confirm</a></b>`
          })
            .then(info => {
              // res.redirect('/')
              UserStatistics.find()
                .then((data) => {
                  let { form, access } = data[0];
                  form += 1;
                  access -= 1;
                  UserStatistics.findOneAndUpdate({ _id: data[0]._id }, { access, form })
                    .then(() => {
                      res.redirect('/');
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            })
            .catch(error => console.log(error))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
})

module.exports = router;
