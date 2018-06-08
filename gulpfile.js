var gulp = require( 'gulp' ),
    spawn = require( 'child_process' ).spawn;
    
var node;

gulp.task( 'default', [ 'server' ], function()
{
 // code ...
});

// restart server when change files
gulp.task( 'server', function()
{
  gulp.run( 'run' );

  gulp.watch( [ '**/*.js' ], function()
  {
    gulp.run( 'run' );
  });
});

gulp.task( 'run', function()
{
  if( node ) node.kill(); // if server run the kill it

  node = spawn( 'node', [ 'server.js' ], { stdio: 'inherit' } ); // run server
});