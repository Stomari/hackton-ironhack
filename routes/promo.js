const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const User = require('../models/user')

router.get('/promo/:codePromo', (req, res) => {
  const { codePromo } = req.params;

  User.findOne({ promoCode: codePromo })
    .then((user) => {
      User.findOneAndUpdate({ _id: user._id }, { validation: true })
        .then(data => console.log(data))
        .catch(err => console.log(err));
      QRCode.toDataURL(user.promoCode, { version: 10 })
        .then(url => {
          res.render('redeem', { url, codePromo });
        })
        .catch(err => {
          console.error(err)
        })
    })
});

module.exports = router;
