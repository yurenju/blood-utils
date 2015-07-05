# blood-utils

Utility of blood donation in Taiwan

# Install

```shell
npm install blood-utils
```

# Usage

the Array of donations looks like this:

```javascript
var donations = [
  {volumeType: '500', 'Sun Jul 05 2015 18:46:42 GMT+0800 (CST)'},
  {volumeType: '250', 'Sun Jul 05 2015 18:46:42 GMT+0800 (CST)'},
  {volumeType: 'PH', 'Sun Jul 05 2015 18:46:42 GMT+0800 (CST)'},
  // PH is Apheresis Platelets
];
```

if you want to get volume of certain year donation:

```js
var donations = [
  {volumeType: '500', 'Sun Jul 05 2015 18:46:42 GMT+0800 (CST)'},
  {volumeType: '250', 'Sun Jul 05 2015 18:46:42 GMT+0800 (CST)'},
  {volumeType: 'PH', 'Sun Jul 05 2015 18:46:42 GMT+0800 (CST)'},
];
var bloodUtils = require('blood-utils');
var volume = bloodUtils.getYearly(donations, 2015);
console.log(volume); // 750
```

`checkLastDonation()` is used to check if you can donate again in certain date:

```js
var donations = [
  {volumeType: '500', 'Sun Jul 01 2015 18:46:42 GMT+0800 (CST)'}
];
var today = new Date('2015/7/5');

bloodUtils.checkLastDonation('500', '2015/7/1', today);
// it's false since the last time you donate blood is 7/1
// which is less than 3 months
```

Since male only can donate less that 1500cc in a year, female only can donate less that 1000cc in a year, we also have `checkYearlyVolume()` to check the yearly Volume.

```js
bloodUtils.checkYearlyVolume('male', donations, 2015);
```

See [blood-utils-test.js](test/blood-utils-test.js) to get more examples.
