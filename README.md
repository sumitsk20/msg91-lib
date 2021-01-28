# msg91-lib

[![NPM version](https://img.shields.io/npm/v/msg91-lib.svg?label=version)](https://www.npmjs.com/package/msg91-lib)
[![NPM Licence](https://img.shields.io/npm/l/msg91-lib)](https://www.npmjs.com/package/msg91-lib)
[![Snyk Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/sumitsk20/msg91-lib)](https://www.npmjs.com/package/msg91-lib)
[![NPM downloads](https://img.shields.io/npm/dt/msg91-lib)](https://www.npmjs.com/package/msg91-lib)

##### This is unofficial MSG91 library to send OTP and Messages via MSG91 APIs (_Message Support will be added soon_)

### Set-up

Download the NPM module

```javascript
npm install msg91-lib --save
```

Require the package in your code.

```javascript
const { msg91OTP } = require('msg91-lib');
// or
const msg91OTP = require('msg91-lib').msg91OTP;
```

## OTP GUIDE

Initialize with your [MSG91](https://msg91.com) auth key

```javascript
const msg91otp = new msg91OTP({authKey='xxxxxxxxxxxxxxxxxxxxxx', templateId='xxxxxxxxxxxxxxxxxxxxxx'});
```

That's all, you are ready to use otp service!

### Note

While constructing custom message template please include `{{otp}}` in your string, this will be replaced with otp value
when sending OPT message.

### Requests

You now have the send, retry and verify otp via following methods.

```javascript
msg91otp.send(contactNumber, args); //args is object of optional parameter
msg91otp.retry(contactNumber,retryVoice); //retryVoice is optional boolean value, set it true to enable voice call verification
msg91otp.verify(contactNumber, otpToVerify);
```

### Usage

#### SEND OTP

```javascript
  try {
    const response = await msg91otp.send(9999999999); // can be passed without country code and as string
    console.log(response);
  } catch (error) {
    console.log(error.toJson());
  }
```

**Note:** In `msg91OTP.send()` you can pass second parameter a object of optional argument as:

```javascript
// optional arugemnt object with possible acceptable values
args = {
  // ...
  otp: 9999,
  otp_expiry: 5 // this will be in minute
  // ...
}

await msg91otp.send("919999999999", args)
```

#### RETRY OTP

```javascript
  try {
    const response = await msg91otp.retry("9999999999"); // can be passed without country code and as number(int)
    console.log(response);
  } catch (error) {
    console.log(error.toJson());
  }
```

**Note:** In `msg91otp.retry()` you can pass second parameter _retryVoice_ `true/false` to enable or disable voice call verification, by default it is set to `false`:

```javascript
await msg91otp.retry("919999999999",true)
```

**VERIFY OTP**

```javascript
  try {
    const response = await msg91otp.verify("9999999999"); // can be passed without country code and as number(int)
    console.log(response);
  } catch (error) {
    console.log(error.toJson());
  }
```

### Optional values that can be passed to `send()` function as object

**otp_length**   : `number` Number of digits in OTP (Keep in between 4 to 6)

**otp**          : `number` OTP to send and verify. If not sent, OTP will be generated.

**otp_expiry**   : `number` Expiry of OTP you can pass into minutes (default : 1440, max : 1440, min : 1)

**email**        : `string` Email ID on which you want to send OTP

**userip**        : `string` User IP

**extra_param**   : Here you can pass the variables created in the SendOTP template.

### Licence: (MIT License)

**Copyright (c) 2018 Sumeet Bhardwaj**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
