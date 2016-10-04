'use strict';

angular.module('myApp.orgs', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgs', {
    templateUrl: 'views/orgs/orgs.html',
    controller: 'orgsCtrl'
  });
}])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Org', {
    templateUrl: 'views/orgs/Org.html',
    controller: 'OrgCtrl'
  });
}])
.controller('orgsCtrl',
		[ '$scope', 'apiOrgs', '$location', 'currentOrgs', '$timeout',
			function($scope, apiOrgs, $location, currentOrgs, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.orgs = apiOrgs.query();
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
					columnDefs: [
						{ name:'city', field:'city', visible:true },
						{ name:'contact', field:'contact', visible:true },
						{ name:'country', field:'country', visible:true },
						{ name:'gid', field:'gid', visible:false },
						{ name:'id', field:'id', visible:false },
						{ name:'longname', field:'longname', visible:true },
						{ name:'name', field:'name', visible:true },
						{ name:'realm', field:'realm', visible:true },
						{ name:'street_address', field:'street_address', visible:true },
						{ name:'timezone', field:'timezone', visible:true },
						{ name:'uid', field:'uid', visible:true },
					],
					data: $scope.orgs,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiOrgs.save(newObject).$promise.then(function(data){
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
					//console.log(row.entity);	
					currentOrgs.setOrgs(row.entity.id);
					$location.path('/org');
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsSelected = undefined;
				}
				
				$scope.orgsFields = [
						{key: 'city', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'city', placeholder: 'city', required: true
            				}
          				},
						{key: 'contact', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'contact', placeholder: 'contact', required: true
            				}
          				},
						{key: 'country', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'country', placeholder: 'country', required: true
            				}
          				},
						{key: 'gid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'gid', placeholder: 'gid', required: true
            				}
          				},
						{key: 'id', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'id', placeholder: 'id', required: true
            				}
          				},
						{key: 'longname', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'longname', placeholder: 'longname', required: true
            				}
          				},
						{key: 'name', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'name', placeholder: 'name', required: true
            				}
          				},
						{key: 'realm', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'realm', placeholder: 'realm', required: true
            				}
          				},
						{key: 'street_address', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'street_address', placeholder: 'street_address', required: true
            				}
          				},
						{key: 'timezone', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'timezone', placeholder: 'timezone', required: true
            				}
          				},
						{key: 'uid', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'uid', placeholder: 'uid', required: true
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
				}
		}]
)
.controller('orgCtrl',
		[ '$scope', 'apiOrg', '$location', 'currentOrgs',
			function($scope, apiOrg, $location, currentOrgs) {
			}
		]
)
;
