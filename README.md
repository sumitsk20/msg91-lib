# msg91-lib

##### This is unofficial MSG91 library to send OTP and Messages via MSG91 APIs (_Message Support will be added soon_).

### Set-up:

Download the NPM module
```
npm install msg91-lib --save
```
Require the package in your code.
```javascript
// to use both OTP & SMS
const {msg91OTP, msg91SMS} = require('msg91-lib');
// or to use only OTP
const msg91OTP = require('msg91-lib').msg91OTP;
// or to use only SMS
const msg91SMS = require('msg91-lib').msg91SMS;
```

## OTP GUIDE

Initialize with your [MSG91](https://msg91.com) auth key
```javascript
/** SenderID & messageTemplate are optional
* Default Values:
* SenderID = SUMEET
* messageTemplate = {{otp}} is your otp. Please do not share it with anybody
*/
const msg91OTP = new msg91OTP('authKey', 'senderId', 'messageTemplate');
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


## SMS GUIDE

Initialize with your [MSG91](https://msg91.com) auth key
```javascript
/** SenderID & messageTemplate are optional
* Default Values:
* senderId = SUMEET  // 6 digit string
* route = 4  // 1 for promotional and 4 for transactional
* countryCode = 91  // 0 for International, 1 for USA, 91 for India
*/
const msg91SMS = new msg91SMS('authKey', 'senderId', route, countryCode);
```
That's all, you are ready to use SMS service!

### Requests

You can now send sms using send method as follow.
```javascript
msg91SMS.send(args, contactNumber, message); //args is object of optional parameter
```

### Note:
- `send()` function call the msg91 api as POST request with json body as structured below, you can pass similar structured
object and pass it as `args` _**only argument**_ to send() function, i.e no need to send `contactNumber` and `message` in this case.
- You can also construct only `sms` array if you want to _**send different message to different user list**_ and pass it as attribute of args.
- **Any key passed in `args` will be given higher priority and will overwrite all other default values and arguments passed**
```javascript
{
  "sender": "SOCKET",
  "route": "4",
  "country": "91",
  "sms": [
    {
      "message": "Message1",
      "to": [
        "98260XXXXX",
        "98261XXXXX"
      ]
    },
    {
      "message": "Message2",
      "to": [
        "98260XXXXX",
        "98261XXXXX"
      ]
    }
  ]
}
```

### Usage:

**Option 1**

```javascript
msg91SMS.send({sender:'senderId'}, 97XXXXXXXX, "test message") // number can also be list/array of comma separated numbers
.then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
    if (error.data) {
        console.log(error.data); // object containing api error code
    } else {
        console.log(error.message); // error message due to any other failure
    }
});
```

**Option 2**

```javascript
smsobj = [{
  "message": "dummy message 2",
  "to": [97XXXXXXXX, 97XXXXXXXX] // it can be comma separated list of numbers also each number can be either string or integer/number
}]
args = {  // it can be either javascript object or JSON object
  ...
  sender:'senderId',
  sms:smsobj
  ...
}

msg91SMS.send(args) // no need to pass contactNumbers and message parameter as we are passing sms key
.then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
    if (error.data) {
        console.log(error.data); // object containing api error code
    } else {
        console.log(error.message); // error message due to any other failure
    }
});
```

**Option 3**

```javascript
args = {   // it can be either javascript object or JSON object
  "sender": "SOCKET",
  "route": "4",  // can be either string or integer/number
  "country": "91",  // can be either string or integer/number
  "sms": [
    {
      "message": "Message1",
      "to": [
        "98260XXXXX",
        "98261XXXXX"  // each number can be either string or integer/number
      ]
    },
    {
      "message": "Message2",
      "to": [
        "98260XXXXX",
        "98261XXXXX"
      ]
    }
  ]
}

msg91SMS.send(args) // no need to pass contactNumbers and message parameter as we are passing sms key
.then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
    if (error.data) {
        console.log(error.data); // object containing api error code
    } else {
        console.log(error.message); // error message due to any other failure
    }
});
```

### Optional values that can be passed to `send()` function as object:

**schtime**   :	`string`	When you want to schedule the SMS to be sent. Time format could be of your choice you can use Y-m-d h:i:s (2020-01-01 10:10:00) Or Y/m/d h:i:s (2020/01/01 10:10:00) Or you can send unix timestamp (1577873400)

**campaign**      :	`string`	Campaign name you wish to create.

**unicode**     :	`number`	unicode=1 (for unicode SMS)

**flash**          :	`number`	flash=1 (for flash SMS)

**country**   :	`number`	0 for international,1 for USA, 91 for India.

**route**   :	`number`	If your operator supports multiple routes then give one route name. Eg: route=1 for promotional, route=4 for transactional SMS.

**sms**   :	`array`	 Array of objects, each object containing list of numbers as `to` and message to be send to each list as `message`.


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
