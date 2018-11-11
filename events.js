const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('Event',function(EventArg){
    console.log('Event Listend',EventArg);
})
emitter.on('Logging',function(EventArg){
    console.log('Event Logging ',EventArg);
})
emitter.emit('Logging',{Message:'Hii Swapnil'});
called(function(){
    emitter.emit('Event',{id:76,url:'swapnil'});
});
function called(call){
    setTimeout(call,5000);}
 