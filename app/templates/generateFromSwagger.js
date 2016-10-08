const Mustache = require('mustache');
const _ = require('underscore');
const fs = require('fs');
const yaml = require('js-yaml');
const fse = require('fs.extra');
const _s = require('underscore.string');
_.mixin(_s.exports());


const mainMenuMappings = [
  { id: 'ap', value: ':apid' },
  { id: 'app_groups', value: ':appgrpid' },
  { id: 'bgpneighs', value: ':bgpneighid' },
  { id: 'broadcasts', value: ':bcastid' },
  { id: 'clusters', value: ':clusterid' },
  { id: 'custom_apps', value: ':appid' },
  { id: 'dcinterfaces', value: ':dcinterfaceid' },
  { id: 'dcuplinks', value: ':dcuplinkid' },
  { id: 'devices', value: ':devid' },
  { id: 'endpoints', value: ':epid' },
  { id: 'inbound_rules', value: ':ruleid' },
  { id: 'networks', value: ':netid' },
  { id: 'nodes', value: ':nodeid' },
  { id: 'orgs', value: ':orgid' },
  { id: 'outbound_rules', value: ':ruleid' },
  { id: 'path_rules', value: ':pruleid' },
  { id: 'ports', value: ':portid' },
  { id: 'sites', value: ':siteid' },
  { id: 'ssids', value: ':ssidid' },
  { id: 'switches', value: ':switchid' },
  { id: 'uplinks', value: ':uplinkid' },
  { id: 'users', value: ':userid' },
  { id: 'wans', value: ':wanid' },
  { id: 'zones', value: ':zoneid' },
];

  
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

function openViewTpl(callback) {
  fs.readFile('view.tpl', 'utf8', (err, view) => {
    callback(view);
  });
}

function createViewsDirectory(path, e, callback){
  fs.exists(path + e.path, function(exists) {
    if (!exists) {
      console.log(path + e.path + ' does not existing, creating dir' );
      fs.mkdirSync(path + e.path, 0744);
    }
    callback(path,e);
  });
}

function createComponentDirectory(path, e, callback){
  fs.exists(path + e.path, function(exists) {
    if (!exists) {
      console.log(path + e.path + ' does not existing, creating dir' );
      fs.mkdirSync(path + e.path ,0744);
    }
    callback(path,e);
  });
}

var reId = /:(\w)+/;

function propertiesToArray(prop) {
  return _.map(prop, function(value, key) {
    value.name = key;
    value.required = 'false';
    value.description = value.description.replace(/(?:\n)/g, ' ');
    switch (value.type) {
      case 'string': 
        value.type = 'text';
      break;
    }
    return value;
  });
}

function createMainMenuObject(data, path){
  let name = path.substring(1,path.length);
      //console.log(name);
  let obj =  { 
      'name': name, 
      'path':path, 
      'title': createTitle(name), 
      'capWord': createCapWord(name)
    }
    // Override fields
    //console.log (name + ' ==> ' + def[2]);
    switch(name) {
      case 'ap':
        //console.log(data.definitions.node);
        obj.definition = propertiesToArray(data.definitions.node.properties);
        //console.log(obj.definition);
      break;
      case 'app_groups':
          obj.definition = propertiesToArray(obj.definition = data.definitions.appgrp.properties);
        break;
      case 'apps':
          obj.definition = propertiesToArray(data.definitions.app.properties);
        break;
      case 'bgpneighs':
          obj.definition = propertiesToArray(data.definitions.bgpneigh.properties);
        break;
      case 'broadcasts':
          obj.definition = propertiesToArray(data.definitions.broadcast.properties);
        break;
      case 'clusters':
          obj.definition = propertiesToArray(data.definitions.cluster.properties);
        break;
      case 'custom_apps':
          obj.definition = propertiesToArray(data.definitions.custom_app.properties);
        break;
      case 'dcinterfaces':
          obj.definition = propertiesToArray(data.definitions.dcinterface.properties);
        break;
      case 'dcuplinks':
          obj.definition = propertiesToArray(data.definitions.dcuplink.properties);
        break;
      case 'devices':
          obj.definition = propertiesToArray(data.definitions.device.properties);
        break;
      case 'endpoints':
          obj.definition = propertiesToArray(data.definitions.endpoint.properties);
        break;
      case 'inbound_rules':
          obj.definition = propertiesToArray(data.definitions.inboundrule.properties);
        break;
      case 'networks':
          obj.definition = propertiesToArray(data.definitions.network.properties);
        break;
      case 'nodes':
          obj.definition = propertiesToArray(data.definitions.node.properties);
        break;
      case 'orgs':
          obj.definition = propertiesToArray(data.definitions.organization.properties);
        break;
      case 'outbound_rules':
          obj.definition = propertiesToArray(data.definitions.outboundrule.properties);
        break;
      case 'path_rules':
          obj.definition = propertiesToArray(data.definitions.pathrule.properties);
        break;  
      case 'ports':
          obj.definition = propertiesToArray(data.definitions.port.properties);
        break; 
      case 'sites':
          obj.definition = propertiesToArray(data.definitions.site.properties);
        break;  
      case 'ssids':
          obj.definition = propertiesToArray(data.definitions.ssid.properties);
        break; 
      case 'switches':
          obj.definition = propertiesToArray(data.definitions.node.properties);
        break;  
      case 'uplinks':
          obj.definition = propertiesToArray(data.definitions.uplink.properties);
        break; 
      case 'users':
          obj.definition = propertiesToArray(data.definitions.user.properties);
        break; 
      case 'wans':
          obj.definition = propertiesToArray(data.definitions.wan.properties);
        break;  
      case 'zones':
          obj.definition = propertiesToArray(data.definitions.zone.properties);
        break;
    }
    console.log(obj);
  return obj;
}


let views = "../views/"
let components = "../components/";

function createViewsFiles(path, e){
  let html = views + e.path + '/' + e.name + '.html';
  let controller = views + e.path + '/' + e.name + '.js';
  
  openViewTpl(function(view) {
    fs.open(html, 'w', (err, fd) => {
      console.log('Writing ' + html);
      fs.write(fd, Mustache.render(view, e));
    });
  });
  openControllerTpl(function(view) {
    fs.open(controller, 'w', (err, fd) => {
      console.log('Writing ' + controller);
      fs.write(fd, Mustache.render(view, e));
    });
  });
}

function createComponentFiles(path, e){
  var service = components + e.path + '/' + e.name  + '-api-service.js';
    
  openServicesTpl(function(view) {
    fs.open(service, 'w', (err, fd) => {
      console.log('Writing ' + service);
      fs.write(fd, Mustache.render(view, e));
    });
  });
  
}

function mkdirView(e, elements, callback){
  
  _.each(e.ops, function(value, key){
    if ( value.path != null) {
      let dir = views + e.id + '/' + value.path;
      console.log('Checking ' + dir);
      fs.exists(dir, function(exists) {
        if (!exists) {
          console.log(dir + ' does not existing, creating dir' );
          fs.mkdirSync(dir, 0744);
        }
        console.log(dir);
        console.log(value);
      });
    }
  });
  callback();
}


copyFiles();

loadSwagger(function(data){
  // CREATE DATA STRUCTURE TO PROCESS MENUS AND VIEWS
  let subElements = _.chain(data.paths)
    .map(function(value, path) {
      let found = path.match(reId);
      let lastPath = path.split('/').pop();
      let obj = {
        prop: {
          path: path,
          ops: value
        }
      }
      if (found) { 
        obj.key = found[0];
        obj.path = (found[0] == lastPath)? null: lastPath;
      } else {
        obj.key = 'none';
        obj.title = _.classify(path.substring(1, path.length));
        obj.id = path.substring(1, path.length);
      }
      return obj;
    })
    .groupBy('key')
    .value();
  // CREATE MAIN MENU
  console.log('========= MAIN ELEMENTS =========');
  openMainMenuTpl(function(view){
    mainMenu = views + 'main/main_menu.html';
    fs.open(mainMenu, 'w', (err, fd) => {
      console.log('Writing ' + mainMenu);
      fs.write(fd, Mustache.render(view, subElements['none']));
    });
  });
  
  var filtered = _.reduce(subElements, function(memo, value, key){
    if( key !== 'none') memo[key] = value;
    return memo;
  }, {});
  console.log(filtered);
  _.each(filtered, function(e, k) {
    //console.log(k);
    let element = (_.find(mainMenuMappings, function(item) {
      return item.value == k;
    }));
    element.ops = e;
    /* Element:
      [ { prop: { path: '/ap/:apid', ops: [Object] }, key: ':apid' },
        id: 'ap',
        value: ':apid' 
      ]
    */
    //console.log(element);
    //console.log(element[0].prop.ops);
    //console.log('-----');
    mkdirView(element, filtered, function(){
      
    });
    //createViewsDirectory(views, e, createViewsFiles);
    //createComponentDirectory(components, e, createComponentFiles);
  });
  
});

