
/**
 * @listener aSocketEventListener
 * @topic data
 * @description get's called when client sends data
 * @callbackArg foo
 * @callbackArg bar
 */
socket.on('data', function(foo, bar){

});

/**
 * @emitter someSocketEmitter
 * @topic foo
 * @snippet
 * {
 *   "foo": "bar"
 * }
 * @endsnippet
 */
socket.emit('foo', { foo: 'bar' } );