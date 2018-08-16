/**
 * @author: Sumeet Kumar (sumitsk20@gmail.com)
 * @description: This file is responsible for code sending, resending and verifying the otp by calling MSG91 APIs.
 */

'use strict';

const axios = require('axios');
const qs = require('querystring');

// Initialize axios with Base URL for MSG91 api call
const MSG91 = axios.create({
    baseURL: "https://control.msg91.com/api/",
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

class Msg91Otp {
    /**
     * Creates a new SendOtp instance
     * @param {string} authKey Authentication key
     * @param {string, optional} senderId Sender ID of 6 digit
     * @param {string, optional} messageTemplate message template containing {{otp}}
     */
    constructor(authKey, senderId, messageTemplate) {
        this.authKey = authKey;
        this.otp_expiry = 1440;
        if (messageTemplate) {
            this.messageTemplate = messageTemplate;
        } else {
            this.messageTemplate = "{{otp}} is your otp. Please do not share it with anybody";
        }
        if (senderId) {
            this.senderId = senderId;
        } else {
            this.senderId = "SUMEET";
        }
    }

    /**
     * Returns the n digit otp
     * @param {integer}
     * @returns {integer}
     */
    static generateOtp(length) {
        length = length || 4;
        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9000);
    }

    /**
     * Send Otp to given mobile number
     * @param {string} contactNumber receiver's mobile number along with country code
     * @param {object, optional} args
     * Return promise 
     */
    send(contactNumber, args) {
        return new Promise((resolve, reject) => {
            let otp = Msg91Otp.generateOtp()

            if (args && args.otp_length) {
                if (args.otp_length > 6) {return reject(new Error('OTP can be maximum of 6 digit'));}
                otp = Msg91Otp.generateOtp(args.otp_length);
            }
            let opts = {
                authkey: this.authKey,
                mobile: contactNumber,
                sender: this.senderId,
                otp: otp,
                message: this.messageTemplate
            };
            if (args) {
                if (typeof args !== 'object') {
                    return reject(new Error('Expected object of arguments'));
                }
                if (args.otp_expiry && typeof args.otp_expiry !== 'number' && !(1441 < args.otp_expiry < 0)) {
                    return reject(new Error('Expected numeric value in range of 1440-1.'));
                }
            }
            opts = Object.assign({}, opts, args);
            try {
                opts.message = opts.message.replace('{{otp}}', opts.otp)
            } catch (error) {
                return reject(new Error('Message template does not contain "{{otp}}"'));
            };
            resolve(Msg91Otp.doRequest("sendotp.php", opts));
        });
    }

    /**
     * Retry Otp to given mobile number
     * @param {string} contactNumber receiver's mobile number along with country code
     * @param {boolean} retryVoice, set true to enable voice call verification
     * Return promise 
     */
    retry(contactNumber, retryVoice) {
        return new Promise((resolve, reject) => {
            let retryType = 'voice';
            if (!retryVoice) {
                retryType = 'text'
            }
            let opts = {
                authkey: this.authKey,
                mobile: contactNumber,
                retrytype: retryType
            };
            resolve(Msg91Otp.doRequest("retryotp.php", opts));
        });
    }

    /**
     * Verify Otp to given mobile number
     * @param {string} contactNumber receiver's mobile number along with country code
     * @param {string} otp otp to verify
     * Return promise 
     */
    verify(contactNumber, otp) {
        return new Promise((resolve, reject) => {
            let opts = {
                authkey: this.authKey,
                mobile: contactNumber,
                otp: otp
            };
            resolve(Msg91Otp.doRequest("verifyRequestOTP.php", opts));
        });
    }

    static doRequest(path, opts) {
        return new Promise((resolve, reject) => {
            MSG91.post(path, qs.stringify(opts)).then((response) => {
                // response object errors
                // This should return an error object not an array of errors
                if (response.data.errors !== undefined) {
                    return reject(response.data.errors);
                }
                resolve(response.data);
            }).catch((error) => {
                //return the error object received from server
                return reject(error);
            });
        });
    }
}
module.exports = Msg91Otp;
