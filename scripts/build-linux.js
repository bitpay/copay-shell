/*
** copay-shell - linux builder
*/

var os           = require('os');
var downloadAtom = require('./download-atom-shell');

downloadAtom({

}, function(err) {
  console.log(err || 'done!')
});
