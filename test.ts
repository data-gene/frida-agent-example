var now = new Date();
console.log(`time=${now.toLocaleTimeString()}`)
console.log(`time=${now.toISOString()}`)
console.log(`time=${now.getMilliseconds().toString()}`)
var ms = now.getMilliseconds().toString();
var currentTime = now.toLocaleTimeString() + '.' + ms;

console.log(`[${currentTime}]`);
