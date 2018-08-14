# msg91-lib

##### This is unofficial MSG91 library to send OTP and Messages via MSG91 APIs (_Message Support will be added soon_).

### Set-up:

1. Download the NPM module
```
npm install msg91-lib --save
```
2. Require the package in your code.
```
const MSG91 = require('msg91-lib');
```
3. Initialize with your [MSG91](https://msg91.com) auth key
```javascript
/** SenderID & messageTemplate are optional
* Default Values:
* SenderID = SUMEET
* messageTemplate = {{otp}} is your otp. Please do not share it with anybody
*/
const msg91OTP = new MSG91('AuthKey', 'SenderID', 'messageTemplate');
```
That's all, you are ready to use otp service!

### Note:
While constructing custom message template please include `{{otp}}` in your string, this will be replaced with otp value
when sending OPT message.

### Requests

You now have the send, retry and verify otp via following methods.
```javascript
msg91OTP.send(contactNumber, args); //args is object of optional parameter
msg91OTP.retry(contactNumber,retryVoice); //retryVoice is optional boolean value, set it true to enable voice call verification
msg91OTP.verify(contactNumber, otpToVerify);
```

### Usage:

**SEND OTP**
```javascript
msg91OTP.send("919999999999").then((response) => {
    console.log(response); // response object with keys 'message' and 'type'
    if(response.type == 'success') console.log('OTP sent successfully')
    if(response.type == 'error') console.log((`OTP sending failed due to "${response.message}"`)
  }).catch((error) => {  // error object is send as it is received from msg91 server due to failure of API call
    console.log(error.message)
  });
```
**Note:** In `msg91OTP.send()` you can pass second parameter a object of optional argument as:
```javascript
// optional arugemnt object with possible acceptable values
args = {
  ...
  otp: 9999,
  otp_expiry: 5 // this will be in minute 
  ...
}

msg91OTP.send("919999999999", args).then(...)
```

**RETRY OTP**
```javascript
msg91OTP.retry("919999999999").then((response) => {
    console.log(response); // response object with keys 'message' and 'type'
    if(response.type == 'success') console.log('OTP retry successfull')
    if(response.type == 'error') console.log(`OTP retry failed due to "${response.message}"`)
  }).catch((error) => {  // error object is send as it is received from msg91 server due to failure of API call 
    console.log(error.message)
  });
```
**Note:** In `msg91OTP.retry()` you can pass second parameter _retryVoice_ `true/false` to enable or disable voice call verification, by default it is set to `false`:
```javascript
msg91OTP.retry("919999999999",true).then(...)
```

**VERIFY OTP**
```javascript
msg91OTP.verify("919999999999").then((response) => {
    console.log(response); // response object with keys 'message' and 'type'    
    if(response.type == 'success') console.log('OTP verified successfully')
    if(response.type == 'error') console.log('OTP verification failed')
  }).catch((error) => {  // error object is send as it is received from msg91 server due to failure of API call
    console.log(error.message)
  });
```

### Optional values that can be passed to `send()` function as object:

**otp_length**   :	`number`	Number of digits in OTP (Keep in between 4 to 6)

**message**      :	`string`	Message content to send. (For example : Your verification code is {{OTP}}.)

**senderId**     :	`string`	Receiver will see this as sender's ID. (For example : OTPSMS)

**otp**          :	`number`	OTP to send and verify. If not sent, OTP will be generated.

**otp_expiry**   :	`number`	Expiry of OTP you can pass into minutes (default : 1440, max : 1440, min : 1)



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
