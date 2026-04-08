const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

myEmitter.on('greet', () => {
    console.log('Second listener triggered.');
});

myEmitter.emit('greet', 'Student');