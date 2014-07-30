#!/usr/bin/env node

'use strict';

var path = require( 'path' );
var fs = require( 'fs-extra' );
var args = require( 'minimist' )( process.argv.slice( 2 ) );
var jade = require( 'jade' );
var sass = require( 'node-sass' );
var docflow = require( './index' );
var log = require( 'luvely' );
var server = require( './lib/server' );
var utils = require( './lib/utils' );

if ( !args.h ) {

  if ( args.s ) {

    var outDir = args.o || './blockflow_docs';
    var srcDir = args.s;
    var debug = args.d;
    var parseOpts = {
      verbose: args.v
    };

    var jadeOpts = {
      pretty: true
    };
    var tmplDir = './template';
    var htmlOut = path.join( outDir, 'index.html' );
    var cssOut = path.join( outDir, 'css', 'app.css' );
    var jadeTmpl = path.join( tmplDir, 'index.jade' );
    var sassTmpl = path.join( tmplDir, 'sass', 'app.scss' );

    var onEnd = function( srcRoot, blocks ) {
      log.info( 'Successfully parsed ' + blocks.length + ' apiBlocks under ' + srcRoot );

      if ( !args.a ) {
        jadeOpts.items = blocks;
        var html = jade.renderFile( jadeTmpl, jadeOpts );
        var css = sass.renderSync({
          file: sassTmpl
        });

        fs.mkdirsSync( path.join( outDir, 'css' ) );
        fs.createWriteStream( htmlOut ).write( html );
        fs.createWriteStream( cssOut ).write( css );
      } else {
        var serverOpts = {
          blocks: blocks,
          endpoint: args.e,
          port: args.p,
          verbose: args.v
        };
        server.run( serverOpts );
      }
    };

    docflow

      .from( srcDir )

      .flow( parseOpts )

      .on( 'end', onEnd );


  } else {
    utils.printHelp();
  }

} else {
  utils.printHelp();
}
