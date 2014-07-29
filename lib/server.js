
'use strict';

var restify = require( 'restify' );
var log = require( 'luvely' );
var resumer = require( 'resumer' );

var _server;
var _opts = {};
var _s = JSON.stringify;

exports.run = function( opts ) {
  _opts = opts || {};

  if ( opts.verbose ) {
    log.debug( 'Starting server' );
  }

  var port = opts.port || 9000;
  var docRoute = opts.endpoint || '/blockflow';
  var blockStr = ( opts.blocks ) ? ( _s( opts.blocks ) ) : _s( [] );

  _server = restify.createServer({
    name: 'Block Flow'
  });

  _server.use( restify.acceptParser( _server.acceptable ) );
  _server.use( restify.queryParser() );
  _server.use( restify.bodyParser() );

  _server.get(docRoute, function (req, res, next) {
    resumer().queue( blockStr ).end().pipe( res );
    next();
  });

  _server.listen(port, function () {
    log.debug( 'Yo dawg - I heard you like APIs. So I created and API for your API!' );
    log.info( '%s listening at %s%s', _server.name, _server.url, docRoute );
  });

  return exports;
};

var kill = function() {

  if ( _opts.verbose ) {
    log.debug( 'Killing server' );
  }

};

exports.__testHook = {

  selfDestruct: function( ms ) {
    ms = ms || 1000;
    setTimeout( kill, ms );
  }

};