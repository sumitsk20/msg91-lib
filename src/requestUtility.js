/**
 * @author: Sumeet Kumar (sumitsk20@gmail.com)
 * @description: This file contain utility function to promisify request.
 */

'use strict';

const http = require('http');
const https = require('https');
const qs = require('querystring');
const urlUtil = require('url');

const { errorCodes } = require('./errorUtility');

const makeRequest = async ({ url, method = 'GET', params, headers = {}, postData }) => {
  const lib = url.startsWith('https://') ? https : http;

  const { hostname, port, path } = urlUtil.parse(url);

  const options = {
    hostname,
    port: port || url.startsWith('https://') ? 443 : 80,
    path: params ? `${path}?${qs.encode(params)}` : path || '/',
    method: method.toUpperCase(),
    headers
  };

  return new Promise((resolve, reject) => {
    const req = lib.request(options, result => {

      const data = [];

      result.on('data', chunk => {
        data.push(chunk);
      });

      result.on('end', () => {
        const jsonResult = JSON.parse(Buffer.concat(data).toString());
        if (jsonResult.type !== 'success') return reject(new errorCodes['BAD_REQUEST_DATA'](jsonResult.message));
        resolve(jsonResult);
      });

    });

    req.on('error', reject);

    if (postData)
      req.write(postData);

    req.end();
  });
};

module.exports = makeRequest;
