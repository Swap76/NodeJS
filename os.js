const os = require('os');

var total = os.totalmem();
var free = os.freemem();
console.log('Totoal Memory:'+ total);
console.log('Free Memory:'+ free);