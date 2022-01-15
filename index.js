/**
 * @author: Sumeet Kumar (sumitsk20@gmail.com)
 * @description: This file is responsible for exporting msg91OTP and msg91SMS module.
 */
'use-strict';

const msg91OTP = require('./src/msg91OTP');
const msg91SMS = require('./src/msg91SMS');

module.exports = {
  msg91OTP,msg91SMS,
};
