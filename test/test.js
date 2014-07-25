/*global describe:false, it:false, before: false*/

'use strict';

var should = require( 'should' );
var blockEmitter = require( '../index' );
var fs = require( 'fs' );
var merge = require( 'merge' );
var jade = require( 'jade' );

describe('Things', function(){

  var jadeOpts = {};
  var jadeLocals = {
    pretty: true
  };

  it('works', function(done){
    var blocks = [];
    var root = 'test/src';
    blockEmitter
      // start at the configured source root
      .from( root )
      // begin parsing docs
      .run()
        // listen for individual blocks as soon as they're
        // available
        .on('block', function( block ){
          if ( block.snippet ) {
            block.snippet.should.have.property( 'foo' );
            block.snippet.foo.should.equal( 'bar' );
          }
          blocks.push( block );
        })
        // receive all blocks once everything has finished
        // processing
        .on('end', function(srcRoot, apiEntries){

          jadeLocals.items = apiEntries;
          var html = jade.renderFile('./template/index.jade', merge( jadeOpts, jadeLocals ) );
          fs.createWriteStream( 'out/index.html' ).write( html );

          srcRoot.should.equal( root );
          done();
        });
  });



});