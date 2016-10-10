'use strict';
angular.module('myApp.orgsUsers', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgsUsers', {
    templateUrl: 'views/orgsUsers/orgsUsers.html',
    controller: 'orgsUsersCtrl'
  });
}])
.controller('orgsUsersCtrl',
		[ '$scope', 'orgsUsersApi', '$location', 'orgsUsersSelectionSvc', '$timeout',
			function($scope, orgsUsersApi, $location, orgsUsersSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.orgsUsers = orgsUsersApi.query();
				$scope.orgsUsersSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsUsersGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Uid', field:'uid'/*, visible: */},
						{ name:'Devices', field:'devices'/*, visible: */},
						{ name:'Tags', field:'tags'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Usergrps', field:'usergrps'/*, visible: */},
						{ name:'Home Site', field:'home_site'/*, visible: */},
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Username', field:'username'/*, visible: */},
						{ name:'Email', field:'email'/*, visible: */},
						{ name:'Mobile', field:'mobile'/*, visible: */},
						{ name:'Endpoints', field:'endpoints'/*, visible: */},
					],
					data: $scope.orgsUsers,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsUsersApi.save(newObject).$promise.then(function(data){
    						$scope.orgsUsers.push(data);
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
                					$scope.orgsUsersSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsUsersSelected = undefined;
				}
				
				$scope.orgsUsersFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devices', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devices', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'tags', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tags', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'usergrps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'usergrps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'home_site', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'home_site', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'username', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'username', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'email', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'email', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'mobile', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'mobile', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'endpoints', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'endpoints', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("devices,tags,org,usergrps,home_site,name,username,email,mobile,endpoints\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "org.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);