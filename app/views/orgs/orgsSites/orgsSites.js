'use strict';
angular.module('myApp.orgsSites', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgs/orgsSites', {
  	templateUrl: 'views/orgs/orgsSites/orgsSites.html',
    controller: 'orgsSitesCtrl'
  });
}])
.controller('orgsSitesCtrl',
		[ '$scope', 'orgsSitesApi', '$location', 'orgsSitesSelectionSvc', '$timeout',  'orgsSelectionSvc' , 
			function($scope, orgsSitesApi, $location, orgsSitesSelectionSvc, $timeout  , orgsSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = orgsSelectionSvc.getorgs();
				console.log(id);
				$scope.orgsSites = orgsSitesApi.query({ orgid: id.id });
				
				$scope.orgsSitesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsSitesGridOptions = {
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
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Longname', field:'longname'/*, visible: */},
						{ name:'Uplinks', field:'uplinks'/*, visible: */},
						{ name:'Networks', field:'networks'/*, visible: */},
						{ name:'Street Address', field:'street_address'/*, visible: */},
						{ name:'City', field:'city'/*, visible: */},
						{ name:'Country', field:'country'/*, visible: */},
						{ name:'Timezone', field:'timezone'/*, visible: */},
						{ name:'Size', field:'size'/*, visible: */},
						{ name:'Uid', field:'uid'/*, visible: */},
					],
					data: $scope.orgsSites,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsSitesApi.save({ orgid: id.id }, newObject).$promise.then(function(data){
    						$scope.orgsSites.push(data);
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
                					$scope.orgsSitesSelected = row.entity;
							$scope.showSelectedRecord = true;
							console.log(row.entity);	
							orgsSitesSelectionSvc.setorgsSites(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsSitesSelected = undefined;
				}
				
				$scope.orgsSitesFields = [
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
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'longname', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'longname', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uplinks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uplinks', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'networks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'networks', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'street_address', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'street_address', placeholder: "", disabled: true/*, required: */ 
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
						{key: 'timezone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'timezone', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'size', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'size', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("name,longname,city\nTestSite1,This is test site #1, San Antonio");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "sites.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);