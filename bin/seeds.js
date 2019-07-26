const mongoose = require('mongoose');
const UserStatistics = require('../models/userStatistics');
const Admin = require('../models/admin');

// mongoose.connect('mongodb://heroku_mwbpkdzx:5rdvv0q07vtih0o7oid9ujfsjj@ds255577.mlab.com:55577/heroku_mwbpkdzx');
mongoose.connect('mongodb://localhost/hackton-ironhack');

const statistics =
{
  access: 0,
  form: 0,
  redeem: 0,
};

const newAdmin = 
{
  username: 'Admin',
  password: 'admin',
}

Admin.create(newAdmin, (err) => {
  if (err) {
    throw (err);
  }
  console.log(`Created ${newAdmin.length} movies`);
  mongoose.connection.close();
});


UserStatistics.create(statistics, (err) => {
  if (err) {
    throw (err);
  }
  console.log(`Created ${statistics.length} movies`);
  mongoose.connection.close();
});
