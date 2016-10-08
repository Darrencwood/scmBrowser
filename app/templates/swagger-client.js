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

let views = "../views/"
let components = "../components/";

function loadSwagger(callback){
  fs.readFile('swagger.yaml', 'utf8', function (err, data) {
    if (err) throw err;
    data = yaml.safeLoad(data);
    callback(data);
  });
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
      _.each(v.ops, function(op) {
        op.values = {
          id: mmap.id,
          name:  _.camelize(mmap.id),
          title: _.titleize(_.humanize(mmap.id)),
          definition: data.definitions[mmap.definition]
        }
        v.mmap = mmap;
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
      _.each(v.ops, function(op) {
        op.values = {
          id: mmap.value,
          name:  _.camelize(mmap.id),
          title: _.titleize(_.humanize(mmap.id)),
          definition: data.definitions[mmap.definition]
        }
        v.mmap = mmap;
      });
    })
    .each(function(v) { // Find submenus }
      let = submenus = findSubMenuItem(data, v.mmap);
      if (submenus && submenus.length > 0) {
        v.submenus = submenus;
      } 
    })
    .value();
  
  return elements;
}

loadSwagger(function(data){
  let elements = getMainElements(data);
  console.log(JSON.stringify(elements));
  
});