var fs = require('fs');
var path = require('path');
var appRoot = require('app-root-path').path;

if (appRoot === path.join(__dirname, '..') ||
    appRoot === path.join(__dirname, '..', '..')) {
   appRoot = process.cwd();
}

var workingPkg = require(path.join(appRoot, 'package.json'));
var pkg = require(path.join('..', '..', 'package.json'));
var PathExists = require('./path-exists');
var defaultBanner = ""
  + "/**\n"
  + " * @version "  + workingPkg.version + "\n"
  + " * @copyright " + workingPkg.author + "\n"
  + " * @license " + workingPkg.license + "\n"
  + " */\n";

workingPkg.spellbook = workingPkg.spellbook || {};

if (workingPkg.spellbook.banner && pathExists(path.join(appRoot, workingPkg.spellbook.banner))) {
  workingPkg.spellbook.banner = require(path.join(appRoot, workingPkg.spellbook.banner));
}


var config = {
  name: workingPkg.name,
  version: workingPkg.version,
  path: appRoot,
  sbVersion: pkg.version,

  verbose: workingPkg.spellbook.verbose || true,
  port: workingPkg.spellbook.port || 9999,
  src: workingPkg.spellbook.src || 'src',
  dist: workingPkg.spellbook.dist || 'dist',
  banner: workingPkg.spellbook.banner || defaultBanner,
};

// tack on the fullpath
config.src = path.join(config.path, config.src);
config.dist = path.join(config.path, config.dist);

module.exports = config;
