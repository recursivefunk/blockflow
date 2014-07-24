/*global describe:false, it:false, before: false*/

'use strict';

var should = require( 'should' );
var blockEmitter = require( '../index' );

describe('Things', function(){

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
        .on('block', function( filename, block ){
          if ( block.snippet ) {
            block.snippet.should.have.property( 'foo' );
            block.snippet.foo.should.equal( 'bar' );
          }
          blocks.push( block );
        })
        // receive all blocks once everything has finished
        // processing
        .on('end', function(srcRoot, fileDescipts){
          srcRoot.should.equal( root );
          done();
        });
  });



});