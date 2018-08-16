/**
 * @author: Sumeet Kumar (sumitsk20@gmail.com)
 * @description: This file is responsible for exporting msg91OTP and msg91SMS module.
 */
'use-strict'

let msg91OTP = require('./src/msg91OTP');
let msg91SMS = require('./src/msg91SMS');

module.exports = {
    msg91OTP,
    msg91SMS
}