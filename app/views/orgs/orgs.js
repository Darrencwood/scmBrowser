'use strict';
angular.module('myApp.orgs', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgs', {
    templateUrl: 'views/orgs/orgs.html',
    controller: 'orgsCtrl'
  });
}])
.controller('orgsCtrl',
		[ '$scope', 'orgsApi', '$location', 'orgsSelectionSvc', '$timeout',
			function($scope, orgsApi, $location, orgsSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.orgs = orgsApi.query();
				$scope.orgsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Contact', field:'contact'/*, visible: */},
						{ name:'Uid', field:'uid'/*, visible: */},
						{ name:'Realm', field:'realm'/*, visible: */},
						{ name:'Gid', field:'gid'/*, visible: */},
						{ name:'Longname', field:'longname'/*, visible: */},
						{ name:'City', field:'city'/*, visible: */},
						{ name:'Country', field:'country'/*, visible: */},
						{ name:'Street Address', field:'street_address'/*, visible: */},
						{ name:'Timezone', field:'timezone'/*, visible: */},
					],
					data: $scope.orgs,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsApi.save(newObject).$promise.then(function(data){
    						$scope.orgs.push(data);
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
                					$scope.orgsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log(row.entity);	
					orgsSelectionSvc.setorgs(row.entity.id);
					$location.path('/org');
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsSelected = undefined;
				}
				
				$scope.orgsFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'contact', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'contact', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'realm', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'realm', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'gid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'gid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'longname', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'longname', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'city', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'city', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'country', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'country', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'street_address', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'street_address', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'timezone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'timezone', placeholder: "", disabled: true/*, required: */ 
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
								
				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("name,longname,city\nTestOrg, Test Organization, San Antonio");
				var dlAnchorElem = document.getElementById('download');
				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "org.csv");
				
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);