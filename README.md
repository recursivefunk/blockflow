# Rundown

Yet another documentation generator. This one, however, uses custom annotations to place emphasis on event documenting driven/streaming APIs. 

```
/**
 * @listener aSocketEventListener
 * @on data
 * @description get's called when client sends data
 * @callbackArg foo
 * @callbackArg bar
 */
socket.on('data', function(foo, bar){

});

```

```
/**
 * @emitter someSocketEmitter
 * @snippet
 * {
 *   "foo": "bar"
 * }
 * @endsnippet
 */
socket.emit('foo', { foo: 'bar' } );
```

More docs and features coming soon.

