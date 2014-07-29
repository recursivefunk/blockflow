
'use strict';

exports.printHelp = function() {

  console.log( '\n' );
  console.log( '    ----------------------' );
  console.log( '    | Block Flow Options |' );
  console.log( '    ----------------------' );
  console.log( '\n' );
  console.log( '    -s (source)   [required] The root of your source tree' );
  console.log( '    -o (out)      [optional] Web output directory. Defaults to ./blockflow_docs' );
  console.log( '    -a (api-mode) [optional] Expose raw block data at a restul endpoint' );
  console.log( '    -e (endpoint) [optional] The endpoint at which to expose raw block data' );
  console.log( '    -p (port)     [optional] Port for the api-mode server' );
  console.log( '    -v (verbose)  [optional] Verbose logging. Defaults to false' );
  console.log( '\n' );

};