const Mustache = require('mustache');
const _ = require('underscore');
const fs = require('fs');
const yaml = require('js-yaml');
const fse = require('fs.extra');
const _s = require('underscore.string');
_.mixin(_s.exports());


const mainMenuMappings = [
  { id: 'ap', value: ':apid' , definition: 'node', selectedSubmenu: "id"},
  { id: 'apps', value: ':appid' , definition: 'app', selectedSubmenu: "id"},
  { id: 'app_groups', value: ':appgrpid' , definition: 'appgrp', selectedSubmenu: "id"},
  { id: 'bgpneighs', value: ':bgpneighid' , definition: 'bgpneigh', selectedSubmenu: "id"},
  { id: 'broadcasts', value: ':bcastid' , definition: 'broadcast', selectedSubmenu: "id"},
  { id: 'clusters', value: ':clusterid' , definition: 'cluster', selectedSubmenu: "id"},
  { id: 'custom_apps', value: ':appid', definition: 'custom_app' , selectedSubmenu: "id"},
  { id: 'dcinterfaces', value: ':dcinterfaceid' , definition: 'dcinterface', selectedSubmenu: "id"},
  { id: 'dcuplinks', value: ':dcuplinkid' , definition: 'dcuplink', selectedSubmenu: "id"},
  { id: 'devices', value: ':devid' , definition: 'device', selectedSubmenu: "id"},
  { id: 'endpoints', value: ':epid' , definition: 'endpoint', selectedSubmenu: "id"},
  { id: 'inbound_rules', value: ':ruleid' , definition: 'inboundrule', selectedSubmenu: "id"},
  { id: 'networks', value: ':netid' , definition: 'network', selectedSubmenu: "id"},
  { id: 'nodes', value: ':nodeid' , definition: 'node', selectedSubmenu: "id"},
  { id: 'orgs', value: ':orgid' , definition: 'organization', selectedSubmenu: "id"},
  { id: 'outbound_rules', value: ':ruleid' , definition: 'outboundrule', selectedSubmenu: "id"},
  { id: 'path_rules', value: ':pruleid' , definition: 'pathrule', selectedSubmenu: "id"},
  { id: 'ports', value: ':portid', definition: 'port' , selectedSubmenu: "id"},
  { id: 'sites', value: ':siteid' , definition: 'site', selectedSubmenu: "id"},
  { id: 'ssids', value: ':ssidid' , definition: 'ssid', selectedSubmenu: "id"},
  { id: 'switches', value: ':switchid' , definition: 'node', selectedSubmenu: "id"},
  { id: 'uplinks', value: ':uplinkid' , definition: 'uplink', selectedSubmenu: "id"},
  { id: 'users', value: ':userid' , definition: 'user', selectedSubmenu: "id"},
  { id: 'wans', value: ':wanid' , definition: 'wan', selectedSubmenu: "id"},
  { id: 'zones', value: ':zoneid' , definition: 'zone', selectedSubmenu: "id"}
];

const downloadSamples = {
  app: {
		sampleHeaders:"desc,dgrp,name",
		sampleData:""
	},
  appgrp: {
		sampleHeaders: "name,webcat,sapps,org,predefined,apps,id,desc",
		sampleData:""
	},
  bgpneigh: {
		sampleHeaders: "org,node,name,ipv4,remote_as,password,keepalive_time,hold_time",
		sampleData:""
	},
  broadcast: {
		sampleHeaders:"org,site,zone,ssid,inactive,dynzone,portal,hide_ssid,band",
		sampleData:""
	},
  cluster: { 
		sampleHeaders: "site,org,name,failover,members,dcuplinks,url,bgp_graceful_restart,bgp_tep_community_type,bgp_tep_community,bgp_branch_community_type,bgp_branch_community,bgp_deployment_mode,bgp_subnet_splitting",
		sampleData: ""
	},
  custom_app: {
		sampleHeaders: "appid,desc,name,appgrps,devgrp,org,dnats,device_proto,type,ipport,httphost,device,segments,device_ports",
		sampleData:""
	},
  dcinterface: {
		sampleHaders: "org,port,gateway_ipv4,gateway_ipv6,ipv4,ipv6,mtu,auto_negotiation,enabled",
		sampleData:""
	},
  dcuplink: {
		sampleHeaders: "org,net,public_ipv4,public_ipv6,nat_range_start,wan,cluster,tags",
		sampleData:""
	},
  device: {
		sampleHeaders:"user,mac,info,ipv4,ipv6,org,devgrps,tags,net,endpoint",
		sampleData:""
	},
  endpoint: {
		sampleHeaders: "zvmac,secret,devices,org,user,client_id",
		sampleData:""
	},
  inboundrule: { 
		sampleHeaders: "nat_port_offset,app,no_reflection,uplinks,mode,id,inactive,custom_ip,hostlist,use_hostlist",
		sampleData:""
	},
  network: {
		sampleHeaders:"nodenetcfgs,zone,name,dhcps_range_start,devices,dhcps_range_end,primary,site,netv6,netv4,org,gwv6,ra,wans,routes,gwv4,lnets,breakout_preference,breakout_sitelink_site,gw_noauto,dhcps_leasetime,dhcps_options",
		sampleData: ""
	},
  node: { 
		sampleHeaders: "site,org,local_as,router_id,serial,zones,radios,realm,location,ports,uplinks,inventory_version_cc,disable_stp,license,model,sitelink",
		sampleData:""
	},
  organization: {
		sampleHeaders: "name,longname,city",
		sampleData: "TestOrg, Test Organization, San Antonio"
	},
  outboundrule: { 
		sampleHeaders: "org,users,active,devices,zones,apps,srctype,dsttype,tags,allow,usergrps,devgrps,appgrps",
		sampleData: ""
	},
  pathrule: { 
		sampleHeaders:"dsttype,qos,marking,zones,srctype,active,sites,path_preference,org,dscp,apps,devices,tags,users",
		sampleData:""
	},
  port: { 
		sampleHeaders:"port_id,node,tag,type,speeds,speed,patchlabel,zone,uplink,portal,mac,virtual_mac,switch_id,autotrunk,bridge_with,ifname,dcinterface,auto,autocfg",
		sampleData:""
	},
  site: { 
		sampleHeaders: "name,org,longname,uplinks,networks,street_address,city,country,timezone,size",
		sampleData:""
	},
  ssid: { 
		sampleHeaders: "org,ssid,security,encryption,key,authentication,eapol_version,dtim_period,bcasts",
		sampleData:""
	},
  uplink: { 
		sampleHeaders: "org,qos_bw_up,qos_up,site,static_ip_v6,uin,uid,node,name,static_gw_v4,wan,static_gw_v6,qos_bw_down,qos_down,static_ip_v4,port,vlan,type",
		sampleData:""
	},
  user: {
		sampleHeaders: "devices,tags,org,usergrps,home_site,name,username,email,mobile,endpoints",
		sampleData:""
	},
  wan: { 
		sampleHeaders:"org,uplinks,nets,name,longname,internet,sitelink,pingcheck_ips,dcuplink,breakout,breakout_sites,xfer_networks",
		sampleData:""
	},
  zone: {
		sampleHeader: "org,name'site,mgmt,icmp,guest,tag,tags",
		sampleData:""
	}
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

function openServicesTpl(callback) {
  fs.readFile('services.tpl', 'utf8', (err, view) => {
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
          selectedSubmenu: newMmap.selectedSubmenu
        }
        if (method == "post") {
          op.values.sampleHeaders = downloadSamples[newMmap.definition].sampleHeaders;
          op.values.sampleData = downloadSamples[newMmap.definition].sampleData;
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
          path: path,
          selectedSubmenu: mmap.selectedSubmenu
        }
        if (method == "post"){
          op.values.sampleHeaders = downloadSamples[mmap.definition].sampleHeaders;
          op.values.sampleData = downloadSamples[mmap.definition].sampleData;
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
  let service = '';
  if (!v) {
    dir = views + e.ops['get'].values.name;
  } else {
    dir = views + v.ops['get'].values.name + '/' + e.ops['get'].values.name;
  }
  mkdir(dir, e, function(dir, e) {
    html = dir + '/' + e.ops['get'].values.name + '.html';
    controller = dir + '/' + e.ops['get'].values.name + '.js';
    service = dir + '/' + e.ops['get'].values.name + '-service.js';
    console.log('------>');
    
    // WRITE VIEW FILES 
    openViewTpl(function(view) {
      fs.open(html, 'w', (err, fd) => {
        //console.log('Generating ' + html);
        fs.write(fd, Mustache.render(view, e));
      });
    });
    
    // WRITE CONTROLLER FILES
    openControllerTpl(function(view) {
      fs.open(controller, 'w', (err, fd) => {
        console.log(' <script src="' + controller + '"></script>');
        fs.write(fd, Mustache.render(view, e));
      });
    });
    
    // WRITE SERVICES FILES
    openServicesTpl(function(view) {
    	fs.open(service, 'w', (err, fd) => {
      	console.log(' <script src="' + service + '"></script>');
      	fs.write(fd, Mustache.render(view, e));
    	});
  });
    
    // PROCESS SUBMENUS
    if (e.submenus) {
      // WRITE MENU FILES
      openMenuTpl(function(view){
        let menu = views + e.ops['get'].values.name + '/menu.html';
        fs.open(menu, 'w', (err, fd) => {
          //console.log('Generating ' + menu);
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
  fs.open("dump.json", "w", (err, fd) => {
  	fs.write(fd, JSON.stringify(elements));
  });
  
  // GENERATE MAIN MENU
  openMenuTpl(function(view){
    mainMenu = views + 'main/menu.html';
    fs.open(mainMenu, 'w', (err, fd) => {
      console.log('Generating ' + mainMenu);
      fs.write(fd, Mustache.render(view, elements));
    });
  });
  // GENERATE FILES
  _.each(elements, function(e){
    generateFiles(undefined, e);
  });
  
});














