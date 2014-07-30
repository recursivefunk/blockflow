/*global describe:false, it:false, before: false*/

'use strict';

var path = require( 'path' );

var should = require( 'should' );
var request = require( 'request' );
var fs = require( 'fs-extra' );
var jade = require( 'jade' );
var sass = require( 'node-sass' );

var server = require( '../lib/server' );
var docflow = require( '../index' );

describe('Block Flow', function(){

  var blocks = [];
  var serverOpts = {};
  var jadeOpts = {
    pretty: true
  };
  var outDir = './out';
  var tmplDir = './template';
  var htmlOut = path.join( outDir, 'index.html' );
  var cssOut = path.join( outDir, 'css', 'app.css' );
  var jadeTmpl = path.join( tmplDir, 'index.jade' );
  var sassTmpl = path.join( tmplDir, 'sass', 'app.scss' );

  it('flows blocks like a boss', function(done){

    var root = 'test/src';

    var onEnd = function( srcRoot, apiEntries ) {
      blocks.length.should.equal( apiEntries.length );
      jadeOpts.items = apiEntries;
      var html = jade.renderFile( jadeTmpl, jadeOpts );
      var css = sass.renderSync({
        file: sassTmpl
      });

      srcRoot.should.equal( root );

      fs.mkdirsSync( path.join( outDir, 'css' ) );
      fs.createWriteStream( htmlOut ).write( html );
      fs.createWriteStream( cssOut ).write( css );

      var clean = function() {
        fs.statSync( htmlOut );
        fs.statSync( cssOut );
        fs.removeSync( outDir );
      };

      ( clean ).should.not.throw();

      serverOpts.blocks = apiEntries;
      server.run( serverOpts );

      done();
    };

    docflow
      // start at the configured source root
      .from( root )
      // begin parsing docs
      .flow()
        // listen for individual blocks as soon as they're
        // available
        .on('block', function( block ){
          blocks.push( block );
        })
        // receive all blocks once everything has finished
        // processing
        .on( 'end', onEnd );
  });

  it('serves API', function(done){
    var url = 'http://localhost:9000/blockflow';
    request({ url: url }, function( err, res, body ){
      should.not.exist( err );
      var apiBlocks = JSON.parse( body );
      apiBlocks.should.eql( blocks );
      server.__testHook.selfDestruct( 10 );
      done();
    });
  });

});