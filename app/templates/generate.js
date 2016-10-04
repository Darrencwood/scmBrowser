const Mustache = require('mustache');
const _ = require('underscore');
const fs = require('fs');

function load_data(callback){
  fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) throw err;
    data = JSON.parse(data);
    callback(data);
  });
}

function createViewsDirectory(path, item, callback){
  fs.exists(path + item.camel, function(exists) {
    if (!exists) {
      console.log(path + ' does not existing, creating dir' );
      fs.mkdirSync(path + item.camel,0744);
    }
    callback(path,item);
  });
}

function createMainDirectory(mainPath, items, callback){
  fs.exists(mainPath, function(exists) {
    if (!exists) {
      console.log(mainPath + ' does not existing, creating dir' );
      fs.mkdirSync(mainPath,0744);
    }
    callback(mainPath,items);
  });
}

function createComponentDirectory(path, item, callback){
  fs.exists(path + item.camel, function(exists) {
    if (!exists) {
      console.log(path + ' does not existing, creating dir' );
      fs.mkdirSync(path + item.camel,0744);
    }
    callback(path,item);
  });
}

function openViewTpl(callback) {
  fs.readFile('view.tpl', 'utf8', (err, view) => {
    callback(view);
  });
}

function openMainTpl(callback) {
  fs.readFile('main.tpl', 'utf8', (err, view) => {
    callback(view);
  });
}

function openMainMenuTpl(callback) {
  fs.readFile('main_menu.tpl', 'utf8', (err, view) => {
    callback(view);
  });
}

function openSubmenuTpl(callback) {
  fs.readFile('sub_menu.tpl', 'utf8', (err, view) => {
    callback(view);
  });
}

function openControllerTpl(callback) {
  fs.readFile('controller.tpl', 'utf8', (err, controller) => {
    callback(controller);
  });
}

function openServicesTpl(callback) {
  fs.readFile('services.tpl', 'utf8', (err, services) => {
    callback(services);
  });
}

function createViewsFiles(path, item){
  var htmlFileName = path + item.camel + '/' + item.camel + '.html';
  var controllerFileName = path + item.camel + '/' + item.camel + '.js';
  
  openViewTpl(function(view) {
    fs.open(htmlFileName, 'w', (err, fd) => {
      console.log('Generating ' + htmlFileName);
      fs.write(fd, Mustache.render(view, item));
    });
  });
  
  openControllerTpl(function(controller) {
    fs.open(controllerFileName, 'w', (err, fd) => {
      console.log('Generating ' + controllerFileName);
      fs.write(fd, Mustache.render(controller, item));
    });
  });
}

function createMainView(path, items){
  var htmlFileName = path + '/main.html';
  var htmlMainMenu = path + '/main_menu.html';
  
  openMainMenuTpl(function(view) {
    fs.open(htmlMainMenu, 'w', (err, fd) => {
      console.log('Generating ' + htmlMainMenu);
      fs.write(fd, Mustache.render(view, items));
    });
  });

    openMainTpl(function(view) {
    fs.open(htmlFileName, 'w', (err, fd) => {
      console.log('Generating ' + htmlFileName);
      fs.write(fd, Mustache.render(view, items));
    });
    
  });
}

function createComponentFiles(path, item){
  var componentFileName = path + item.camel + '/' + item.camel + '-api-service.js';
  
  openServicesTpl(function(service) {
    fs.open(componentFileName, 'w', (err, fd) => {
      console.log('Generating ' + componentFileName);
      fs.write(fd, Mustache.render(service, item));
    });
  });
  
}

var path = "../views/"
var componentsPath = "../components/";

load_data(function(data){
  _.each(data.items, function(item){
    createViewsDirectory(path, item, createViewsFiles);
    createComponentDirectory(componentsPath, item, createComponentFiles);
  });
  createMainDirectory(path + "main", data, createMainView);
});