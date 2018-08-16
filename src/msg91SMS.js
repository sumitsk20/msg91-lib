/**
 * @author: Sumeet Kumar (sumitsk20@gmail.com)
 * @description: This file is responsible for code sending, resending and verifying the otp by calling MSG91 APIs.
 */

"use strict";

const axios = require('axios');

// Initialize axios with Base URL for MSG91 api call
const MSG91 = axios.create({
    baseURL: "https://control.msg91.com/api/v2/",
    headers: { 'content-type': 'application/json' }
});

class Msg91Sms {
    /**
     * Creates a new SendOtp instance
     * @param {string} authKey Authentication key
     * @param {string, optional} senderId Sender ID of 6 digit
     * @param {number, optional} route 1 for promotional, 4 for transactional
     */
    constructor(authKey, senderId, route, countryCode) {
        this.authKey = authKey;
        this.route = route || 4;
        this.senderId = senderId || 'SUMEET';
        this.country = countryCode || 91;
    }

    /**
     * Send sms to list of given mobile number
     * @param {object} args object containing optional and necessary fields to send SMS
     * @param {string/number} contactNumber receiver's mobile number or list of mobile numbers
     * @param {string} message message to be send
     * Return promise 
     */
    send(args, contactNumbers, message) {
        return new Promise((resolve, reject) => {
            let to = [];
            if ((typeof contactNumbers === 'number' || 'string' || undefined) && !(typeof contactNumbers ==='object')) {
                to = [contactNumbers];
            } else if (Array.isArray(contactNumbers)) {
                to  = contactNumbers;
            } else {
                return reject(new Error('Expected either a number or array of numbers as second parameter.'))
            }
            let smsObject = [{ "message": message, "to":to }]

            let opts = {
                "sender": this.senderId,
                "sms": smsObject,
                "route" : this.route,
                "country": this.country
            };
            if (args) {
                if (typeof args !== 'object') {
                   return reject(new Error('Expected JSON object as first argument'));
                }
                if (args.contactNumbers || args.message) {
                   return reject(new Error('Message and Numbers are not allowd to be passed directly as argument, instead pass "sms" array.'));
                }
            opts = Object.assign({}, opts, args);
            }
            resolve(Msg91Sms.doRequest("sendsms", opts, this.authKey));
        });
    }


    static doRequest(path, opts, authKey) {
        return new Promise((resolve, reject) => {
            MSG91.post(path, opts, {headers:{authkey: authKey}}).then((response) => {
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
module.exports = Msg91Sms;
