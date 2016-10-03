const Mustache = require('mustache');
const _ = require('underscore');
const fs = require('fs');

data = {
        "items": [
                { fieldName: "ap" , title: "Ap", camel:"ap"
                },
                { fieldName: "app_groups", title: "AppGroups", camel:"appGroups",
                	fields: [
                		{ key: "apps", type: "input", option_type: "text", require: "true" , visible: "true"},
                		{ key: "desc", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "name", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "org", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "predefined", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "sapps", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "webcat", type: "input", option_type: "text", require: "true" , visible: "true" }
                	]
                },
                { fieldName: "bgpneighs", title: "BgpNeighs", camel:"bgpNeighs"},
                { fieldName: "broadcasts", title: "Broadcasts", camel:"broadcast"},
                { fieldName: "clusters", title: "Clusters", camel:"clusters"},
                { fieldName: "custom_apps", title: "CustomApps", camel:"customApps",
                	fields: [
                		{ key: "appgrps", type: "input", option_type: "text", require: "true" , visible: "true"},
                		{ key: "appid", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "desc", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "devgrp", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "device", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "device_ports", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "device_proto", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "dnats", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "httphosts", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "internal", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "ipport", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "name", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "org", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "segments", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "type", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "uid", type: "input", option_type: "text", require: "true" , visible: "false" }
                	]
                },
                { fieldName: "devices", title: "Devices" , camel:"devices",
                	fields: [
                		{ key: "devgrp", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "endpoint", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "info", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "ipv4", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "ipv6", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "mac", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "net", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "org", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "tags", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "uid", type: "input", option_type: "text", require: "true" , visible: "false" },
                		{ key: "user", type: "input", option_type: "text", require: "true" , visible: "true" },
                	]
                },
                { fieldName: "dcuplinks", title: "DCUplinks", camel:"dcUplinks"},
                { fieldName: "dcinterfaces", title: "DCInterfaces", camel:"dcInterfaces"},
                { fieldName: "endpoints", title:"EndPoints" , camel:"endPoints"},
                { fieldName: "inbound_rules", title: "InboundRules", camel:"inboundRules",
                	fields: [
                		{ key: "app", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "custom_ip", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "hostlist", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "inactive", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "mode", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "nat_port_offset", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "no_reflection", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "uplinks", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "use_hostlist", type: "input", option_type: "text", require: "true" , visible: "true" }
                	]
                },
                { fieldName: "networks", title: "Networks", camel:"networks",
                	fields:[
                		{ key: "breakout_preference", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "breakout_sitelink_site", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "devices", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "dhcps_leasetime", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "dhcps_options", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "dhcps_range_start", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "dhcps_range_end", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "gw_noauto", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "gwv4", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "gwv6", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "lnets", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "name", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "netv4", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "netv6", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "nodenetcfgs", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "org", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "primary", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "ra", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "routes", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "site", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "wans", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "zone", type: "input", option_type: "text", require: "true" , visible: "true" }
                	]
                },
                { fieldName: "nodes", title: "Nodes", camel:"nodes",
                	fields: [
                		{ key: "disable_stp", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "inventory_version_cc", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "license", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "local_as", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "location", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "model", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "org", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "ports", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "radios", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "realm", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "router_id", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "serial", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "simulated", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "site", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "sitelink", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "uid", type: "input", option_type: "text", require: "true" , visible: "false" },
                		{ key: "uplinks", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "zones", type: "input", option_type: "text", require: "true" , visible: "true" }
                	]
                },
                { fieldName: "outbound_rules", title: "OutboundRules", camel:"outboundRules",
                	fields: [
                		{ key: "active", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "allow", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "appgrps", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "apps", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "devgrps", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "devices", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "dsttype", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "org", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "srctype", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "tags", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "usergrps", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "users", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "zones", type: "input", option_type: "text", require: "true" , visible: "true" }
                	]
                },
                { fieldName: "orgs", title: "Orgs", camel:"orgs",
                	fields: [
                		{ key: "city", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "contact", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "country", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "gid", type: "input", option_type: "text", require: "true" , visible: "false" },
                		{ key: "id", type: "input", option_type: "text", require: "true" , visible: "false" },
                		{ key: "longname", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "name", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "realm", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "street_address", type: "input", option_type: "text", require: "true" , visible: "true"  },
                		{ key: "timezone", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "uid", type: "input", option_type: "text", require: "true" , visible: "true" }
                	]
                },
                { fieldName: "path_rules", title: "PathRules", camel:"pathRules",
                	fields:[
                		{ key: "active", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "apps", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "devices", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "dscp", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "dsttype", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "marking", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "org", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "path_preference", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "qos", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "sapps", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "sites", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "srctype", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "tags", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "uid", type: "input", option_type: "text", require: "true" , visible: "false" },
                		{ key: "users", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "zones", type: "input", option_type: "text", require: "true" , visible: "true" }
                	]
                },
                { fieldName: "sites", title: "Sites", camel:"sites",
                	fields:[
                		{ key: "city", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "country", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "longname", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "name", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "networks", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "org", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "size", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "street_address", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "timezone", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "uid", type: "input", option_type: "text", require: "true" , visible: "false" },
                		{ key: "uplinks", type: "input", option_type: "text", require: "true" , visible: "true" }
                	]},
                { fieldName: "switches", title: "Switches", camel:"switches"},
                { fieldName: "ssids", title: "Ssids", camel:"ssids"},
                { fieldName: "uplinks", title: "Uplinks", camel:"uplinks", // CHECK AGAIN
                	fields: [
                		{ key: "name", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "node", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "org", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "port", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "qos_bw_down", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "qos_bw_up", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "site", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "static_gw_v4", type: "input", option_type: "text", require: "false", visible: "false"  },
                		{ key: "static_gw_v6", type: "input", option_type: "text", require: "false", visible: "false"  },
                		{ key: "static_ip_v4", type: "input", option_type: "text", require: "false", visible: "false"  },
                		{ key: "static_ip_v6", type: "input", option_type: "text", require: "false", visible: "false"  },
                		{ key: "type", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "uid", type: "input", option_type: "text", require: "false", visible: "false" },
                		{ key: "uin", type: "input", option_type: "text", require: "false", visible: "true" },
                		{ key: "vlan", type: "input", option_type: "text", require: "true" , visible: "true" },
                		{ key: "wan", type: "input", option_type: "text", require: "true" , visible: "true" },
                	] },
                { fieldName: "users", title: "Users", camel:"users"},
                { fieldName: "zones" , title: "Zones", camel:"zones"}
        ]
};

html = `
<div><h2>{{title}}</h2>
	<div class='row'>
		<div id='upload' class='col-xs-12 col-sm-12 col-md-12'>
			<span class="glyphicon glyphicon-upload " style="font-size:3em;"></span>
		</div>
	</div>
	<div class='row'>
		<div class='col-xs-12 col-sm-12 col-md-12'>
			<div id='grid1' ui-grid='{{camel}}GridOptions' ui-grid-edit ui-grid-importer ui-grid-resize-columns class='grid'></div>
		</div>
	</div>
</div>
	<div class="row" ng-if="isSelected()">
		<div class="col-lg-12">
			<form novalidate>
				<h2>{{title}}</h2>
					<formly-form model="{{camel}}Selected" fields="{{camel}}Fields" form="{{camel}}Form">
						<button type="submit" class="btn btn-primary" ng-disabled="{{camel}}Form.$invalid" ng-click="save()">Save</button>
					</formly-form>
			</form>
		</div>
</div>
`;

js = `'use strict';

angular.module('myApp.{{camel}}', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/{{camel}}', {
    templateUrl: 'views/{{camel}}/{{camel}}.html',
    controller: '{{camel}}Ctrl'
  });
}])
.controller('{{camel}}Ctrl',
		[ '$scope', 'api{{title}}', '$location', 'current{{title}}', 
			function($scope, api{{title}}, $location, current{{title}}) {
				$scope.{{camel}} = api{{title}}.query();
				$scope.{{camel}}Selected = '';
				$scope.{{camel}}.$promise.then(function(data){
					console.log(data);
				});
				$scope.{{camel}}GridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
					{{#fields}}
						{ name:'{{key}}', field: '{{key}}', visible:{{visible}} },
					{{/fields}}
					],
					data: $scope.{{camel}},
					rowTemplate: '<div ng-dblclick="grid.appScope.click{{title}}(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.{{camel}} = $scope.{{camel}}.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				api{{title}}.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.click{{title}} = function(row){ 
					//current{{title}}.set{{title}}(row.entity.id);
					console.log(row);
					$scope.{{camel}}Selected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.{{camel}}Selected === '')? false: true;
				}
				
				$scope.{{camel}}Fields = [
					{{#fields}}
					{
            key: '{{key}}', type: '{{type}}',
            templateOptions: {
                type: '{{option_type}}', label: '{{key}}', placeholder: '{{key}}', required: {{require}}
            }
          },
          {{/fields}}
				];
				
				var uploadZone = document.getElementById('upload');

    		// Optional.   Show the copy icon when dragging over.  Seems to only work for chrome.
    		uploadZone.addEventListener('dragover', function(e) {
    		    e.stopPropagation();
    		    e.preventDefault();
    		    e.dataTransfer.dropEffect = 'copy';
    		});
		
    		// Get file data on drop
    		uploadZone.addEventListener('drop', function(e) {
    		    e.stopPropagation();
    		    e.preventDefault();
    		    var files = e.dataTransfer.files; // Array of all files
    		    $scope.gridApi.importer.importFile(files[0]);
					}
				);
		}]
);
`;

var path = "../views/"

_.each(data.items, function(item) {
	fs.exists(path + item.camel, function(exists) {
    if (!exists) {
    	fs.mkdirSync(path + item.camel,0744);
    }
    // Creates html view files
    console.log('creating ' + path + item.camel + '/' + item.camel + '.html');
		fs.open(path + item.camel + '/' + item.camel + '.html', 'w', (err, fd) => {
			if (err) {
				console.log(err);
				process.exit(1);
			}
  		fs.write(fd, Mustache.render(html, item));
		});
		// Creates javascript view file 
		console.log('creating ' + path + item.camel + '/' + item.camel + '.js');
		fs.open(path + item.camel + '/' + item.camel + '.js', 'w', (err, fd) => {
  		fs.write(fd, Mustache.render(js, item));
		});
	});
});

var main = `
<div id="wrapper">
	<!-- Sidebar -->
		<div id="sidebar-wrapper">
			<ul class="sidebar-nav">
			{{#items}}
				<li><a href="#!/{{camel}}">{{title}}</a></li>
			{{/items}}
      </ul>
    </div>
	<!-- /#sidebar-wrapper -->
			
	<!-- Page Content -->
	<div id="page-content-wrapper">
	    <div class="container-fluid">
	        <div class="row">
	            <div class="col-lg-12">
	              
	              
	            </div>
	        </div>
	    </div>
	</div>
	<!-- /#page-content-wrapper -->

</div>
`;

// Regenerate main.html file
fs.open('../views/main/main.html', 'w', (err, fd) => {
  fs.write(fd, Mustache.render(main, data));
});


var services = `
'use strict';

angular.module('myApp').factory('api{{title}}', function($resource) {
    return $resource('/api/scm.config/1.0/{{fieldName}}', {}, 
    {
    	'query': {
    		method: 'GET', 
    		isArray: true , 
    		responseType: 'json',
    		transformResponse: function (data) {
     			var wrapped = angular.fromJson(data); 
     			return wrapped.items;
    		} 
    	}
    });
});

angular.module('myApp').service('current{{title}}', function() {
  this.{{camel}} = { id: ''};
  this.set{{title}} = function(id){ 
  	console.log('setting current {{title}} to: ' + id);
    this.{{camel}}.id = id;
  }
  this.get{{title}} = function(){
    return this.{{camel}};
  }
});`;


var componentsPath = "../components/";
// Create components
_.each(data.items, function(item) {
	fs.exists(componentsPath + item.camel, function(exists) {
    if (!exists) {
    	fs.mkdirSync(componentsPath + item.camel,0744);
    }
    // Creates html view files
    console.log('creating ' + componentsPath + item.camel + '/' + item.camel + '-api-service.js');
		fs.open(componentsPath + item.camel + '/' + item.camel + '-api-service.js', 'w', (err, fd) => {
  		fs.write(fd, Mustache.render(services, item));
		});
	
	});
});


