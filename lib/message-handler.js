/*
** copay-shell - message handler
*/

var ipc    = require('ipc');
var dialog = require('dialog');

module.exports = function(renderer) {

  // handle alerts sent from renderer (browser window)
  ipc.on('alert', function(e, type, message) {

    dialog.showMessageBox(renderer, {
      type: type || 'info',
      buttons: ['Okay'],
      title: 'Copay',
      message: message
    });
  });

};
