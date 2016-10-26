angular.module('myApp.networkTopology', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/network_topology', {
    templateUrl: 'views/network_topology/network_topology.html',
    controller: 'networkTopologyCtrl'
  });
}])
.controller('networkTopologyCtrl',
	[ '$scope', '$location', 'proxyRegisterSvc', 'orgsSitesApi', 'orgsWansApi', 
	  'orgsUplinksApi', 'orgsZonesApi', 'orgsNetworksApi', '_', '$q', 
		function($scope, $location, proxyRegisterSvc, orgsSitesApi, orgsWansApi, 
		          orgsUplinksApi, orgsZonesApi, orgsNetworksApi, _ , $q){
		
		  $scope.proxy = '';
		  $scope.isProxyRegister = false;
		  $scope.menuItems = [ {name: 'All', id:'All'} ];
		  
		  let nodes = new vis.DataSet([]);
      let edges = new vis.DataSet([]);
		  
		  function getMenuEntries() {
		    _.each($scope.wans, function(wan){
		      if (wan.longname != 'RouteVPN') {
            $scope.menuItems.push({name: wan.longname, id: wan.id});
          }
		    });
		  }
		  
		  var options = {
        groups: {
          wan: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              code: '\uf0c2',
              size: 50,
              color: '#ffffff'
            },
            font: '12px sans-serif white',
            labelHighlightBold: true,
            mass: 5
          },
          site: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              code: '\uf1ad',
              size: 50,
              color: '#ff672b' 
            },
            font: '12px sans-serif white',
            labelHighlightBold: true,
            mass: 5
          },
          zone: {
            shape: 'icon',
            icon: {
              face: 'FontAwesome',
              code: '\uf0e8',
              size: 25,
              color: '#ff6720' 
            },
            font: '12px sans-serif white',
            labelHighlightBold: true,
            mass: 5
          }
        },
        edges: {
          font: '12px sans-serif white',
          width: 2
        },
        physics:{
          forceAtlas2Based: {
            gravitationalConstant: -1000,
            centralGravity: 0.001,
            springConstant: 0.1,
            springLength: 100,
            damping: 0.4,
            avoidOverlap: 1
          }
        },
        layout: {
          improvedLayout: true
        }
      };
      
      
      
      
      let htmlSiteTitle = _.template('<table>' +
                  '<% if(name) { %>' +
                      '<tr><td>Name:</td><td><%=name%></td></tr>' +
                  '<% } %>' +
                  '<tr style="border-bottom:1px solid black"><td colspan="100%"></td></tr>' +
                  '<% if(street_address) { %>' +
                      '<tr><td>Street:</td><td><%=street_address%></td></tr>' +
                  '<% } %>' +
                  '<% if(city) { %>' +
                      '<tr><td>City:</td><td><%=city%></td></tr>' +
                  '<% } %>' +
                  '<% if(country) { %>' +
                      '<tr><td>Country:</td><td><%=country%></td></tr>' +
                  '<% } %>' +
                '</table>'); 
                
      let htmlZoneTitle = _.template('<table>' +
            '<% if(name) { %>' +
                '<tr><td>Name:</td><td><%=name%></td></tr>' +
            '<% } %>' +
            '<tr style="border-bottom:1px solid black"><td colspan="100%"></td></tr>' +
            '<% if(site) { %>' +
                '<tr><td>Site:</td><td><%=site%></td></tr>' +
            '<% } %>' +
            '<% if(tag) { %>' +
                '<tr><td>Vlan tag:</td><td><%=tag%></td></tr>' +
            '<% } %>' +
            '<% if(mgmt) { %>' +
                '<tr><td>Management:</td><td><%=mgmt%></td></tr>' +
            '<% } %>' +
            '<tr style="border-bottom:1px solid black"><td colspan="100%"></td></tr>' +
            '<% if(netv4) { %>' +
                '<tr><td>IPv4 Network:</td><td><%=netv4%></td></tr>' +
            '<% } %>' +
            '<% if(netv6) { %>' +
                '<tr><td>IPv6 Network:</td><td><%=netv6%></td></tr>' +
            '<% } %>' +
            '<% if(tag) { %>' +
                '<tr><td>Vlan Tag:</td><td><%=tag%></td></tr>' +
            '<% } %>' +
          '</table>'); 
                
		  
		  function draw(menu) {
		    nodes = new vis.DataSet([]);
		    edges = new vis.DataSet([]);
		    // Process WAN's nodes
		    if (menu.id == 'All') {
          // Create Sites Nodes
          _.each($scope.sites, function(site){
            nodes.update({ id: site.id, label: site.longname, group: 'site', title: htmlSiteTitle(site)});
          });
          // Create Wan Nodes and Edges
          _.each($scope.wans, function(wan){
            if (wan.longname != 'RouteVPN') {
		          nodes.update({ id: wan.id, label: wan.longname, group: 'wan'});
		        }
		        _.each($scope.sites, function(site){
		          if (_.intersection(site.uplinks, wan.uplinks).length != 0) {
		            edges.update({from: site.id , to: wan.id, length: 50});
		          }
		        });
          });
          
        } else {
          wan = _.find($scope.wans, function(wan) { return wan.id == menu.id });
          // Create WAN Node
          nodes.update({ id: menu.id, label: menu.name, group: 'wan'});
          // Create Site Nodes and Edges to WAN
          _.each($scope.sites, function(site){
            if (_.intersection(site.uplinks, wan.uplinks).length != 0 ){
              nodes.update({ id: site.id, label: site.longname, group: 'site', title: htmlSiteTitle(site)});
              edges.update({from: site.id , to: wan.id, length: 50});
              // Search for Zones connected to this site
              let zone = _.find($scope.zones, { site: site.id });
              if (zone) {
                // Search Networks for this zone
                let network = _.find($scope.networks, { zone: zone.id });
                _.extend(network, zone);
                console.log(network);
                nodes.update({ id: zone.id, label: zone.name, group: 'zone', title: htmlZoneTitle(network)});
                edges.update({from: zone.id , to: site.id, length: 50});
              }
            } 
          });
          
        }
        

        // create a network
        var container = document.getElementById('mynetwork');
        console.log($(window).height());
        container.style.height = ( $(window).height() - 300 ) + 'px';
        var data = {
          nodes: nodes,
          edges: edges
        };
        var network = new vis.Network(container, data, options);
		  }
		  
		  $scope.changeDraw = function(id) {
		    draw(id);
		  }
		
		  $scope.connect = function() {
        proxyRegisterSvc.setUrl($scope.proxy);
        $scope.isProxyRegister = true;
        
        $q.all([
            orgsWansApi.query({ orgid: 'org-PacketsInc-ddd7fa358e8fda62' }).$promise,
            orgsSitesApi.query({ orgid: 'org-PacketsInc-ddd7fa358e8fda62' }).$promise,
            orgsZonesApi.query({ orgid: 'org-PacketsInc-ddd7fa358e8fda62' }).$promise,
            orgsNetworksApi.query({ orgid: 'org-PacketsInc-ddd7fa358e8fda62' }).$promise,
          ])
          .then(function(data){
            $scope.wans = data[0];
            $scope.sites = data[1];
            $scope.zones = data[2];
            $scope.networks = data[3];
            
            getMenuEntries();
            draw({id:'All'});
          });
        
		  }

		}
	]
);	