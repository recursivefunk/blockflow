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

    docflow

      .from( srcDir )

      .flow( parseOpts )

      .on('end', function(srcRoot, blocks){

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

      });
  } else {
    printHelp();
  }

} else {
  printHelp();
}

function printHelp() {

  console.log('\n');
  console.log( '    Block Flow Options' );
  console.log('\n');
  console.log( '    -s (source)   [required] The root of your source tree' );
  console.log( '    -o (out)      [optional] Web output directory. Defaults to ./blockflow_docs' );
  console.log( '    -a (api-mode) [optional] Expose raw block data at a restul endpoint' );
  console.log( '    -e (endpoint) [optional] The endpoint at which to expose raw block data' );
  console.log( '    -p (port)     [optional] Port for the api-mode server' );
  console.log( '    -v (verbose)  [optional] Verbose logging. Defaults to false' );
  console.log('\n');

}