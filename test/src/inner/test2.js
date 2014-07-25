/**
 * @emitter anotherEmitter
 * @description get's called when client sends some data
 */
socket.emit('foo');

/**
 * @listener adminSocketListener
 * @on joinAdmin
 * @description The client has joined the admin role
 */
socket.on('data', function(){

});