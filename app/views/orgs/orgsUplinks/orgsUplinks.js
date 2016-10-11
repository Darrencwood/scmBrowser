'use strict';
angular.module('myApp.orgsUplinks', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgs/orgsUplinks', {
  	templateUrl: 'views/orgs/orgsUplinks/orgsUplinks.html',
    controller: 'orgsUplinksCtrl'
  });
}])
.controller('orgsUplinksCtrl',
		[ '$scope', 'orgsUplinksApi', '$location', 'orgsUplinksSelectionSvc', '$timeout',  'orgsSelectionSvc' , 
			function($scope, orgsUplinksApi, $location, orgsUplinksSelectionSvc, $timeout  , orgsSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = orgsSelectionSvc.getorgs();
				console.log(id);
				$scope.orgsUplinks = orgsUplinksApi.query({ orgid: id.id });
				
				$scope.orgsUplinksSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsUplinksGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Qos Bw Up', field:'qos_bw_up'/*, visible: */},
						{ name:'Qos Up', field:'qos_up'/*, visible: */},
						{ name:'Site', field:'site'/*, visible: */},
						{ name:'Static Ip V6', field:'static_ip_v6'/*, visible: */},
						{ name:'Uin', field:'uin'/*, visible: */},
						{ name:'Uid', field:'uid'/*, visible: */},
						{ name:'Node', field:'node'/*, visible: */},
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Static Gw V4', field:'static_gw_v4'/*, visible: */},
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Wan', field:'wan'/*, visible: */},
						{ name:'Static Gw V6', field:'static_gw_v6'/*, visible: */},
						{ name:'Qos Bw Down', field:'qos_bw_down'/*, visible: */},
						{ name:'Qos Down', field:'qos_down'/*, visible: */},
						{ name:'Static Ip V4', field:'static_ip_v4'/*, visible: */},
						{ name:'Port', field:'port'/*, visible: */},
						{ name:'Vlan', field:'vlan'/*, visible: */},
						{ name:'Type', field:'type'/*, visible: */},
					],
					data: $scope.orgsUplinks,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsUplinksApi.save({ orgid: id.id }, newObject).$promise.then(function(data){
    						$scope.orgsUplinks.push(data);
    						$scope.updateResults.push({status: "ok", message: 'created.'});
    						refresh();
    					},function(error){
    						$scope.updateResults.push({status: "error", message: error.data.error.message});
						refresh();
    					});
    				},
    				onRegisterApi: function(gridApi){ 
      					$scope.gridApi = gridApi;
      						//$scope.gridApi.rowEdit.on.saveRow($scope,
      						//$scope.saveRow);
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.orgsUplinksSelected = row.entity;
							$scope.showSelectedRecord = true;
							console.log(row.entity);	
							orgsUplinksSelectionSvc.setorgsUplinks(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsUplinksSelected = undefined;
				}
				
				$scope.orgsUplinksFields = [
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'qos_bw_up', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'qos_bw_up', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'qos_up', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'qos_up', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'site', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'static_ip_v6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'static_ip_v6', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uin', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uin', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'node', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'node', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'static_gw_v4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'static_gw_v4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'wan', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'wan', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'static_gw_v6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'static_gw_v6', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'qos_bw_down', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'qos_bw_down', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'qos_down', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'qos_down', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'static_ip_v4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'static_ip_v4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'port', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'port', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'vlan', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'vlan', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'type', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'type', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
				console.log();
            		var uploadZone = document.getElementById('upload');

					// Optional.   Show the copy icon when dragging over.  Seems to
    				// only work for chrome.
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
    		    		$scope.updateResults =[];
    		    		$scope.showUploadResults = true;
    		    		$scope.gridApi.importer.importFile(files[0]);
					});
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("org,qos_bw_up,qos_up,site,static_ip_v6,uin,uid,node,name,static_gw_v4,wan,static_gw_v6,qos_bw_down,qos_down,static_ip_v4,port,vlan,type\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "uplinks.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);