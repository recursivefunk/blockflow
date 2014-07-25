/*global describe:false, it:false, before: false*/

'use strict';

var path = require( 'path' );

var should = require( 'should' );
var fs = require( 'fs-extra' );
var jade = require( 'jade' );
var sass = require( 'node-sass' );

var blockEmitter = require( '../index' );

describe('Things', function(){

  var jadeOpts = {
    pretty: true
  };
  var outDir = './out';
  var tmplDir = './template';
  var htmlOut = path.join( outDir, 'index.html' );
  var cssOut = path.join( outDir, 'css', 'app.css' );
  var jadeTmpl = path.join( tmplDir, 'index.jade' );
  var sassTmpl = path.join( tmplDir, 'sass', 'app.scss' );

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
          jadeOpts.items = apiEntries;
          var html = jade.renderFile( jadeTmpl, jadeOpts );
          var css = sass.renderSync({
            file: sassTmpl
          });

          srcRoot.should.equal( root );

          fs.mkdirsSync( path.join( outDir, 'css' ) );
          fs.createWriteStream( htmlOut ).write( html );
          fs.createWriteStream( cssOut ).write( css );

          (function(){
            fs.statSync( htmlOut );
            fs.statSync( cssOut );
            fs.removeSync( outDir );
          }).should.not.throw();

          done();
        });
  });
});