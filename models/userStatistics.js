const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userStatisticsSchema = new Schema({
  access: { type: Number, default: 0 },
  form: { type: Number, default: 0 },
  redeem: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const UserStatistics = mongoose.model('UserStatistics', userStatisticsSchema);

module.exports = UserStatistics;