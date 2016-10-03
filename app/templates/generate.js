const Mustache = require('mustache');
const _ = require('underscore');
const fs = require('fs');

var path = "../views/"
var componentsPath = "../components/";

function load_data(callback){
  fs.readFile('data.json', 'utf8', function (err, data) {
    if (err) throw err;
    data = JSON.parse(data);
    callback(data);
  });
}

function check_viewDir(path, item, callback){
  fs.exists(path + item.camel, function(exists) {
    if (!exists) {
      console.log(path + ' does not existing, creating dir' );
      fs.mkdirSync(path + item.camel,0744);
    }
    callback(path,item);
  });
}

function check_componentDir(path, item, callback){
  fs.exists(path + item.camel, function(exists) {
    if (!exists) {
      console.log(path + ' does not existing, creating dir' );
      fs.mkdirSync(path + item.camel,0744);
    }
    callback(path,item);
  });
}

function open_view(callback) {
  fs.readFile('view.tpl', 'utf8', (err, view) => {
    callback(view);
  });
}

function open_controller(callback) {
  fs.readFile('controller.tpl', 'utf8', (err, controller) => {
    callback(controller);
  });
}

function open_services(callback) {
  fs.readFile('services.tpl', 'utf8', (err, services) => {
    callback(services);
  });
}

function create_view(path, item){
  var htmlFileName = path + item.camel + '/' + item.camel + '.html';
  var controllerFileName = path + item.camel + '/' + item.camel + '.js';
  
  open_view(function(view) {
    fs.open(htmlFileName, 'w', (err, fd) => {
      console.log('Generating ' + htmlFileName);
      fs.write(fd, Mustache.render(view, item));
    });
  });
  
  open_controller(function(controller) {
    fs.open(controllerFileName, 'w', (err, fd) => {
      console.log('Generating ' + controllerFileName);
      fs.write(fd, Mustache.render(controller, item));
    });
  });
}

function create_component(path, item){
  var componentFileName = path + item.camel + '/' + item.camel + '-api-service.js';
  
  open_services(function(service) {
    fs.open(componentFileName, 'w', (err, fd) => {
      console.log('Generating ' + componentFileName);
      fs.write(fd, Mustache.render(service, item));
    });
  });
  
}


load_data(function(data){
  _.each(data.items, function(item){
    check_viewDir(path, item, create_view);
    check_componentDir(componentsPath, item, create_component);
  });
});