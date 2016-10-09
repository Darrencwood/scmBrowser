const Mustache = require('mustache');
const _ = require('underscore');
const fs = require('fs');
const yaml = require('js-yaml');
const fse = require('fs.extra');
const _s = require('underscore.string');
_.mixin(_s.exports());


const mainMenuMappings = [
  { id: 'ap', value: ':apid' , definition: 'node'},
  { id: 'apps', value: ':appid' , definition: 'app'},
  { id: 'app_groups', value: ':appgrpid' , definition: 'appgrp'},
  { id: 'bgpneighs', value: ':bgpneighid' , definition: 'bgpneigh'},
  { id: 'broadcasts', value: ':bcastid' , definition: 'broadcast'},
  { id: 'clusters', value: ':clusterid' , definition: 'cluster'},
  { id: 'custom_apps', value: ':appid', definition: 'custom_app' },
  { id: 'dcinterfaces', value: ':dcinterfaceid' , definition: 'dcinterface'},
  { id: 'dcuplinks', value: ':dcuplinkid' , definition: 'dcuplink'},
  { id: 'devices', value: ':devid' , definition: 'device'},
  { id: 'endpoints', value: ':epid' , definition: 'endpoint'},
  { id: 'inbound_rules', value: ':ruleid' , definition: 'inboundrule'},
  { id: 'networks', value: ':netid' , definition: 'network'},
  { id: 'nodes', value: ':nodeid' , definition: 'node'},
  { id: 'orgs', value: ':orgid' , definition: 'organization'},
  { id: 'outbound_rules', value: ':ruleid' , definition: 'outboundrule'},
  { id: 'path_rules', value: ':pruleid' , definition: 'pathrule'},
  { id: 'ports', value: ':portid', definition: 'port' },
  { id: 'sites', value: ':siteid' , definition: 'site'},
  { id: 'ssids', value: ':ssidid' , definition: 'ssid'},
  { id: 'switches', value: ':switchid' , definition: 'node'},
  { id: 'uplinks', value: ':uplinkid' , definition: 'uplink'},
  { id: 'users', value: ':userid' , definition: 'user'},
  { id: 'wans', value: ':wanid' , definition: 'wan'},
  { id: 'zones', value: ':zoneid' , definition: 'zone'},
];

const sampleHeaders = {
  node: { sampleData:{} },
  app: {sampleData:{} },
  appgrp: {sampleData:{} },
  bgpneigh: {sampleData:{} },
  broadcast: {sampleData:{} },
  cluster: { sampleData:{}},
  custom_app: {sampleData:{} },
  dcinterface: {sampleData:{} },
  dcuplink: {sampleData:{} },
  device: {sampleData:{} },
  endpoint: {sampleData:{} },
  inboundrule: { sampleData:{}},
  network: {sampleData:{} },
  node: { sampleData:{}},
  organization: {sampleData:{} },
  outboundrule: { sampleData:{}},
  pathrule: { sampleData:{}},
  port: { sampleData:{}},
  site: { sampleData:{}},
  ssid: { sampleData:{}},
  node : {sampleData:{} },
  uplink: { sampleData:{}},
  user: {sampleData:{} },
  wan: { sampleData:{}},
  zone: {sampleData:{} }
};

let views = "../views/"
let components = "../components/";

function copyFiles() {
  fse.copyRecursive('./services/', '../components',function(err){
    console.log("Copied components");
  });
  fse.copyRecursive('./views/', '../views',function(err){
    console.log("Copied views");
  });
}

function openMenuTpl(callback) {
  fs.readFile('menu.tpl', 'utf8', (err, view) => {
    callback(view);
  });
}

function openViewTpl(callback) {
  fs.readFile('view.tpl', 'utf8', (err, view) => {
    callback(view);
  });
}

function openControllerTpl(callback) {
  fs.readFile('controller.tpl', 'utf8', (err, view) => {
    callback(view);
  });
}

function loadSwagger(callback){
  fs.readFile('swagger.yaml', 'utf8', function (err, data) {
    if (err) throw err;
    data = yaml.safeLoad(data);
    callback(data);
  });
}

function restructureDefinitions(definition){
  return _.chain(definition.properties)
  .map(function(v,k){
    return { realType: v.type, type: 'input', name: k, title: _.titleize(_.humanize(k)) };
  })
  .value();
}

function findSubMenuItem(data, mmap) {
  return _.chain(data.paths)
  .map(function(value, key){
      return {path:key, ops:value};
    })
  .filter(function(d){
      let path = d.path;
      return path.match(/:(\w)+/);
    })
  .filter(function(d) {
    let arr = d.path.split('/');
    return ( arr.length > 3 && arr[2] == mmap.value);
  }) 
  .each(function(v){
    let uri = v.path.split('/');
    if(uri.length == 4){
      let name = uri[3];
      let newMmap = _.find(mainMenuMappings, function(e) { return e.id == name; });
      let path = '/' + mmap.id + '/' + uri[3];
      let back = '/' + mmap.id;
      _.each(v.ops, function(op, method) {
        op.values = {
          id: newMmap.id,
          name:  _.camelize(newMmap.id),
          title: _.titleize(_.humanize(newMmap.id)),
          definition: restructureDefinitions(data.definitions[newMmap.definition]),
          path: path,
          back: back,
        }
        if (method == "post") {
          op.values.sampleHeaders = sampleHeaders[newMmap.definition];
        }
        v.mmap = newMmap;
      });
    }
  })
  .value();
}

function getMainElements(data) {
  // CREATE DATA STRUCTURE TO PROCESS MENUS AND VIEWS
  let elements = _.chain(data.paths)
    .map(function(value, key){
      return {path:key, ops:value};
    })
    .filter(function(d){
      return d.path.match(/:(\w)+/)? false: true;
    })
    .each(function(v){
      let name = v.path.substr(1, v.path.length);
      let mmap = _.find(mainMenuMappings, function(e) { return e.id == name; });
      if (!mmap) { // Fix mappings , new element???
        console.log('Not found ' + name);
        process.exit(1);
      }
      _.each(v.ops, function(op, method) {
        let path = '/' + mmap.id;
        op.values = {
          id: mmap.value,
          name:  _.camelize(mmap.id),
          title: _.titleize(_.humanize(mmap.id)),
          definition: restructureDefinitions(data.definitions[mmap.definition]),
          path: path
        }
        if (method == "post"){
          op.values.sampleHeaders = sampleHeaders[mmap.definition];
        }
        v.mmap = mmap;
      });
    })
    .each(function(v) { // Find submenus }
      let = submenus = findSubMenuItem(data, v.mmap);
      if (submenus && submenus.length > 0) {
        v.submenus = submenus;
        v.ops['get'].values.submenus = true;
      } 
    })
    .value();
  
  return elements;
}

function mkdir(dir, element, callback) {
  fs.exists(dir, function(exists){
    if (!exists){
      console.log('creating dir ' + dir);
      fs.mkdirSync(dir, 0744);
    }
  });
  callback(dir, element);
}

//copyFiles();

function generateFiles(v, e){
  let dir =  '';  
  let html = '';
  let controller = '';
  if (!v) {
    dir = views + e.ops['get'].values.name;
  } else {
    dir = views + v.ops['get'].values.name + '/' + e.ops['get'].values.name;
  }
  mkdir(dir, e, function(dir, e) {
    if (!v) {
      let _get = e.ops['get'];
      html = dir + '/' + _get.values.name + '.html';
      controller = dir + '/' + _get.values.name + '.js';
    } else {
      //console.log(e);
      //console.log(v);
      //let basePath = views + v.ops['get'].values.name;
      html = dir + '/' + e.ops['get'].values.name + '.html';
      controller = dir + '/' + e.ops['get'].values.name + '.js';
    }
    //console.log(dir);
    //console.log(html);
    //console.log(controller);
    // WRITE VIEW FILES 
    openViewTpl(function(view) {
      fs.open(html, 'w', (err, fd) => {
        console.log('Generating ' + html);
        fs.write(fd, Mustache.render(view, e));
      });
    });
    
    // WRITE CONTROLLER FILES
    openControllerTpl(function(view) {
      fs.open(controller, 'w', (err, fd) => {
        console.log('Generating ' + controller);
        fs.write(fd, Mustache.render(view, e));
      });
    });
    
    // PROCESS SUBMENUS
    if (e.submenus) {
      // WRITE MENU FILES
      openMenuTpl(function(view){
        let menu = views + e.ops['get'].values.name + '/menu.html';
        fs.open(menu, 'w', (err, fd) => {
          console.log('Generating ' + menu);
          fs.write(fd, Mustache.render(view, e.submenus));
        });
      });
      // ITERATE OVER SUBMENUS
      _.each(e.submenus, function(s){
        generateFiles(e, s);
      });
    }
   });   
}

loadSwagger(function(data){
  let elements = getMainElements(data);
  console.log(JSON.stringify(elements));
  
  // GENERATE MAIN MENU
  openMenuTpl(function(view){
    mainMenu = views + 'main/menu.html';
    fs.open(mainMenu, 'w', (err, fd) => {
      console.log('Generating ' + mainMenu);
      fs.write(fd, Mustache.render(view, elements));
    });
  });
  // GENERATE VIEWS
  _.each(elements, function(e){
    generateFiles(undefined, e);
  });
  
});














