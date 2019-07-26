const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const Statistics = require('../models/userStatistics')


router.get('/admin', (req, res) => {
  res.render('admin/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin/stats',
  failureRedirect: '/admin',
  failureFlash: true,
  passReqToCallback: true,
}));

router.get('/admin/stats', ensureLogin.ensureLoggedIn('/admin'), (req, res) => {
  Statistics.find()
    .then((data) => {
      const stats = data[0];
      res.render('admin/stats', { stats })
    })
    .catch(err => console.log(err));
});

module.exports = router;