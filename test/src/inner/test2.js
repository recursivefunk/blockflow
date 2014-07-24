/**
 * @emitter anotherEmitter
 * @description get's called when client sends some data
 */
socket.emit('foo');

/**
 * @listener adminSocket
 * @on joinAdmin
 * @description The client has joined the admin role
 */
socket.on('data', function(){

});