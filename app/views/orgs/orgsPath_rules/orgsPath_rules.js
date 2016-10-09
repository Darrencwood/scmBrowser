'use strict';
angular.module('myApp.orgsPath_rules', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgsPath_rules', {
    templateUrl: 'views/orgsPath_rules/orgsPath_rules.html',
    controller: 'orgsPath_rulesCtrl'
  });
}])
.controller('orgsPath_rulesCtrl',
		[ '$scope', 'orgsPath_rulesApi', '$location', 'orgsPath_rulesSelectionSvc', '$timeout',
			function($scope, orgsPath_rulesApi, $location, orgsPath_rulesSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.orgsPath_rules = orgsPath_rulesApi.query();
				$scope.orgsPath_rulesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsPath_rulesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'Dsttype', field:'dsttype'/*, visible: */},
						{ name:'Qos', field:'qos'/*, visible: */},
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Marking', field:'marking'/*, visible: */},
						{ name:'Zones', field:'zones'/*, visible: */},
						{ name:'Srctype', field:'srctype'/*, visible: */},
						{ name:'Uid', field:'uid'/*, visible: */},
						{ name:'Active', field:'active'/*, visible: */},
						{ name:'Sites', field:'sites'/*, visible: */},
						{ name:'Path Preference', field:'path_preference'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Dscp', field:'dscp'/*, visible: */},
						{ name:'Apps', field:'apps'/*, visible: */},
						{ name:'Devices', field:'devices'/*, visible: */},
						{ name:'Tags', field:'tags'/*, visible: */},
						{ name:'Users', field:'users'/*, visible: */},
					],
					data: $scope.orgsPath_rules,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsPath_rulesApi.save(newObject).$promise.then(function(data){
    						$scope.orgsPath_rules.push(data);
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
                					$scope.orgsPath_rulesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsPath_rulesSelected = undefined;
				}
				
				$scope.orgsPath_rulesFields = [
						{key: 'dsttype', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dsttype', placeholder: ""/*, required: */
            					}
          				},
						{key: 'qos', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'qos', placeholder: ""/*, required: */
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: ""/*, required: */
            					}
          				},
						{key: 'marking', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'marking', placeholder: ""/*, required: */
            					}
          				},
						{key: 'zones', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zones', placeholder: ""/*, required: */
            					}
          				},
						{key: 'srctype', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'srctype', placeholder: ""/*, required: */
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: ""/*, required: */
            					}
          				},
						{key: 'active', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'active', placeholder: ""/*, required: */
            					}
          				},
						{key: 'sites', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'sites', placeholder: ""/*, required: */
            					}
          				},
						{key: 'path_preference', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'path_preference', placeholder: ""/*, required: */
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: ""/*, required: */
            					}
          				},
						{key: 'dscp', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dscp', placeholder: ""/*, required: */
            					}
          				},
						{key: 'apps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'apps', placeholder: ""/*, required: */
            					}
          				},
						{key: 'devices', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devices', placeholder: ""/*, required: */
            					}
          				},
						{key: 'tags', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tags', placeholder: ""/*, required: */
            					}
          				},
						{key: 'users', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'users', placeholder: ""/*, required: */
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
								
				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("dsttype,qos,marking,zones,srctype,active,sites,path_preference,org,dscp,apps,devices,tags,users\n");
				var dlAnchorElem = document.getElementById('download');
				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "org.csv");
				
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);