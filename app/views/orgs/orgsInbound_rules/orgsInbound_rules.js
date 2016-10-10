'use strict';
angular.module('myApp.orgsInbound_rules', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgsInbound_rules', {
    templateUrl: 'views/orgsInbound_rules/orgsInbound_rules.html',
    controller: 'orgsInbound_rulesCtrl'
  });
}])
.controller('orgsInbound_rulesCtrl',
		[ '$scope', 'orgsInbound_rulesApi', '$location', 'orgsInbound_rulesSelectionSvc', '$timeout',
			function($scope, orgsInbound_rulesApi, $location, orgsInbound_rulesSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.orgsInbound_rules = orgsInbound_rulesApi.query();
				$scope.orgsInbound_rulesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsInbound_rulesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Nat Port Offset', field:'nat_port_offset'/*, visible: */},
						{ name:'App', field:'app'/*, visible: */},
						{ name:'No Reflection', field:'no_reflection'/*, visible: */},
						{ name:'Uplinks', field:'uplinks'/*, visible: */},
						{ name:'Mode', field:'mode'/*, visible: */},
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Inactive', field:'inactive'/*, visible: */},
						{ name:'Custom Ip', field:'custom_ip'/*, visible: */},
						{ name:'Hostlist', field:'hostlist'/*, visible: */},
						{ name:'Use Hostlist', field:'use_hostlist'/*, visible: */},
					],
					data: $scope.orgsInbound_rules,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsInbound_rulesApi.save(newObject).$promise.then(function(data){
    						$scope.orgsInbound_rules.push(data);
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
                					$scope.orgsInbound_rulesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsInbound_rulesSelected = undefined;
				}
				
				$scope.orgsInbound_rulesFields = [
						{key: 'nat_port_offset', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'nat_port_offset', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'app', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'app', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'no_reflection', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'no_reflection', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uplinks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uplinks', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'mode', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'mode', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'inactive', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'inactive', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'custom_ip', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'custom_ip', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'hostlist', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'hostlist', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'use_hostlist', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'use_hostlist', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
				];
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
								
				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("nat_port_offset,app,no_reflection,uplinks,mode,id,inactive,custom_ip,hostlist,use_hostlist\n");
				var dlAnchorElem = document.getElementById('download');
				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "org.csv");
				
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);