/**
 * @emitter anotherEvent
 * @topic foo
 * @description get's called when client sends some data
 */
socket.emit('foo');


/**
 * @broadcaster something
 * @topic something
 * @snippet
 * {
 *   some: 'data'
 * }
 * @endsnippet
 */
socket.broadcast('something', { some: 'data' } );

/**
 * @listener adminSocketListener
 * @topic joinAdmin
 * @description The client has joined the admin role
 */
socket.on('data', function(){

});