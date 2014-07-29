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

## Usage
```
rundown -s path/to/src
```

The above generates the documentation in the default directory. To learn more about available options just type the command itself

```
rundown
```

More docs and features coming soon.

