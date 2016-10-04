const Mustache = require('mustache');
const _ = require('underscore');
const fs = require('fs');
const yaml = require('js-yaml');
var fse = require('fs.extra');


var createTitle = function(str)
{
  return (str.charAt(0).toUpperCase() + str.substr(1)).replace('_',' ');
}

var createCapWord = function(str)
{
  str = str.replace('_','')
  return str.charAt(0).toUpperCase() + str.substr(1);
}

function loadSwagger(callback){
  fs.readFile('swagger.yaml', 'utf8', function (err, data) {
    if (err) throw err;
    data = yaml.safeLoad(data);
    callback(data);
  });
}

function copyFiles() {
  fse.copyRecursive('./services/', '../components',function(err){
    console.log("Copied components");
  });
  fse.copyRecursive('./views/', '../views',function(err){
    console.log("Copied views");
  });
}

function openMainMenuTpl(callback) {
  fs.readFile('main_menu.tpl', 'utf8', (err, view) => {
    callback(view);
  });
}

function openServicesTpl(callback) {
  fs.readFile('services.tpl', 'utf8', (err, view) => {
    callback(view);
  });
}

function openControllerTpl(callback) {
  fs.readFile('controller.tpl', 'utf8', (err, view) => {
    callback(view);
  });
}

//copyFiles();

var reId = /:(\w)+/;


loadSwagger(function(data){
  //console.log(data); 
 let mainElements = _.chain(data.paths)
 .map(function(path,value) {
    let found = value.match(reId);
    let name = value.substring(1,value.length);
    return (!found)? { 'name': name, 'path':value, 'title': createTitle(name), 'capWord': createCapWord(name)} : null;
  })
  .filter(function(data) {
    return (data == null)? false: true;
  }).value();
  /*
  openMainMenuTpl(function(view){
    let output = Mustache.render(view, mainElements);
    console.log(output);
  });
  
  openServicesTpl(function(view){
    let output = Mustache.render(view, mainElements);
    console.log(output);
  });
  */
  openControllerTpl(function(view){
    let output = Mustache.render(view, mainElements);
    console.log(output);
  });
  
  //console.log(mainElements);
});
