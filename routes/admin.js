const express = require('express');
const router = express.Router();
const Admin = require('../models/admin')

router.get('/admin', (req, res) => {
  res.render('/admin/login');
});

module.exports = router;