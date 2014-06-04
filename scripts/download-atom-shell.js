/*
** copay-shell - atom shell downloader
*/

var path    = require('path');
var fs      = require('fs');
var GitHub  = require('github-releases');
var unzip   = require('unzip');
var async   = require('async');
var readl   = require('readline');
var color   = require('cli-color');
var github  = new GitHub({ repo: 'atom/atom-shell' });

var version = 'v0.12.7';
var target  = path.normalize(__dirname + '/../build/');

module.exports = function(options, callback) {

  console.log(color.blue('{copay}'), 'ensuring existence of output direcrtory');
  ensureOutputTargets();

  console.log(color.blue('{copay}'), 'getting atom-shell release ' + version);

  github.getReleases({ tag_name: version }, function(err, releases) {

    if (err || !releases.length) {
      return callback(err || new Error('Release not found'));
    }

    var filename = 'atom-shell-' + version + '-' + process.platform + '.zip';

    console.log(color.blue('{copay}'), 'looking for prebuilt binary ' + filename);

    for (var a = 0; a < releases[0].assets.length; a++) {
      var asset = releases[0].assets[a];

      if (asset.name === filename) {

        console.log(color.blue('{copay}'), 'downloading ' + asset.name);

        var rl = readl.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        rl.write('      bytes received: 0');

        return github.downloadAsset(asset, function(err, inStream) {
          if (err) {
            return callback(err);
          }

          inStream.on('data', function(chunk) {
            rl.write(null, { ctrl: true, name: 'u' });
            rl.write('      bytes received: ' + chunk.length);
          });

          inStream.on('end', function() {
            rl.close();
            console.log('');
            console.log(color.blue('{copay}'), 'done!');
          });

          var out = target + process.platform;

          inStream.pipe(unzip.Extract({ path: out }));

        });
      }
    }

  });
};

function ensureOutputTargets() {
  if (!fs.existsSync(target)) fs.mkdirSync(target);
  if (!fs.existsSync(target + process.platform)) {
    fs.mkdirSync(target + process.platform);
  }
};
