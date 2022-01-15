'use strict';

const makeRequest = require('./requestUtility');
const { errorCodes } = require('./errorUtility');
class Msg91Sms {
  /**
   * Creates a new SendSMS instance
   * @param {string} authKey Authentication key.
   * @param {string} FlowId of message to send.
   */
  constructor(args = {}) {
    if (!args.authKey) throw new errorCodes['NO_AUTH_KEY']();
    /*
     * if (!args.flowId) throw new errorCodes['NO_FLOW_ID']();
     * if (!args.senderId) throw new errorCodes['NO_SENDER_ID'](); 
     */
    this.authKey = args.authKey;

    this.baseUrl = args.baseUrl || 'https://api.msg91.com/api';
    this.apiVersion = args.apiVersion || 'v5';

    this.APIs = {
      sendSms: { url: `${this.baseUrl}/${this.apiVersion}/flow`, method: 'POST' },
    };

    this.send = this.send.bind(this);
    // this.makeRequest = this.makeRequest.bind(this);
  }

  /**
   * Send Otp to given mobile number
   * @param {string} contactNumber receiver's mobile number along with country code
   * @param {object, optional} args
   * @param {object, optional} custom_vars custom varaiables for DLT templates
   * Return promise
   */
  async send(contactNumber, args = {}, custom_vars = {}) {
    const smsParams = {
      mobiles: contactNumber,
      flow_id: args.flow_id,
      sender: args.sender,
    };
    for (const [key, value] of Object.entries(custom_vars))
      smsParams[key]=value;

    const options = {
      url: this.APIs['sendSms'].url,
      method: this.APIs['sendSms'].method,
      params: '',
      headers:  {
        'authkey': this.authKey,
        'Content-Type': 'application/json',
      },
      postData: JSON.stringify(smsParams),
    };
    return await makeRequest(options);
  }

}

module.exports = Msg91Sms;
