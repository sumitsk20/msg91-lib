/**
 * @author: Sumeet Kumar (sumitsk20@gmail.com)
 * @description: This file is responsible for code sending, resending and verifying the otp by calling MSG91 APIs.
 */

'use strict';

const makeRequest = require('./requestUtility');
const { errorCodes } = require('./errorUtility');
class Msg91Otp {
  /**
   * Creates a new SendOtp instance
   * @param {string} authKey Authentication key.
   * @param {string} TemplateId of message to send.
   */
  constructor(args = {}) {
    if (!args.authKey) throw new errorCodes['NO_AUTH_KEY']();
    if (!args.templateId) throw new errorCodes['NO_TEMPLATE_ID']();

    this.authKey = args.authKey;
    this.defaultOtpTemplateId = args.templateId;

    this.baseUrl = args.baseUrl || 'https://api.msg91.com/api';
    this.apiVersion = args.apiVersion || 'v5';
    this.defaultOtpExpiry = Number(args.otpExpiry) || 5;
    this.defaultOtpLength = Number(args.otpLength) || 4;

    this.APIs = {
      sendOtp: { url: `${this.baseUrl}/${this.apiVersion}/otp`, method: 'POST' },
      resendOtp: { url: `${this.baseUrl}/${this.apiVersion}/otp/retry`, method: 'POST' },
      verifyOtp: { url: `${this.baseUrl}/${this.apiVersion}/otp/verify`, method: 'POST' },
    };

    this.send = this.send.bind(this);
    this.retry = this.retry.bind(this);
    this.verify = this.verify.bind(this);
    // this.makeRequest = this.makeRequest.bind(this);

  }

  /**
   * Send Otp to given mobile number
   * @param {string} contactNumber receiver's mobile number along with country code
   * @param {object, optional} args
   * Return promise
   */
  async send(contactNumber, args = {}) {
    const options = {
      url: this.APIs['sendOtp'].url,
      method: this.APIs['sendOtp'].method,
      params: {
        mobile: contactNumber,
        authkey: this.authKey,
        template_id: args.templateId || this.defaultOtpTemplateId,
        otp_expiry: args.expiry || this.defaultOtpExpiry,
        otp_length: args.otpLength || this.defaultOtpLength,
        email: args.email || '',
        invisible: args.invisible || 1
      }
    };
    return await makeRequest(options);
  }

  /**
   * Retry Otp to given mobile number
   * @param {string} contactNumber receiver's mobile number along with country code
   * @param {string} retryType, set voice to enable voice call verification
   * Return promise
   */
  async retry(contactNumber, retryType = 'text') {
    const options = {
      url: this.APIs['resendOtp'].url,
      method: this.APIs['resendOtp'].method,
      params: {
        mobile: contactNumber,
        retrytype: retryType,
        authkey: this.authKey
      }
    };
    return await makeRequest(options);
  }

  /**
   * Verify Otp to given mobile number
   * @param {string} contactNumber receiver's mobile number along with country code
   * @param {string} otp otp to verify
   * Return promise
   */
  async verify(contactNumber, otp) {
    const options = {
      url: this.APIs['verifyOtp'].url,
      method: this.APIs['verifyOtp'].method,
      params: {
        mobile: contactNumber,
        otp: otp,
        authkey: this.authKey
      }
    };
    return await makeRequest(options);
  }

}

module.exports = Msg91Otp;
