# Liq

Yet another documentation generator. This one, however, uses custom annotations to place emphasis on event-driven/streaming APIs.

## Install
```
[sudo] npm install -g liquidity
```


```javascript
/**
 * @listener aSocketEventListener
 * @on data
 * @description get's called when client sends data
 * @callbackArg foo
 * @callbackArg bar
 */
socket.on('foo', function(foo){

});

```

```javascript
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
liq -s path/to/src
```

The above generates the documentation in the default directory. To learn more about available options just type the command itself

```
liq
```

More docs and features coming soon.

