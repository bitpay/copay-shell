/*
** copay-shell - builder
*/

try {
  require('./build-' + process.platform);
}
catch (err) {
  console.log('platform not yet supported for auto-build :(')
}
