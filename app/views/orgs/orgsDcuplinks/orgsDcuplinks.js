'use strict';
angular.module('myApp.orgsDcuplinks', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgs/orgsDcuplinks', {
  	templateUrl: 'views/orgs/orgsDcuplinks/orgsDcuplinks.html',
    controller: 'orgsDcuplinksCtrl'
  });
}])
.controller('orgsDcuplinksCtrl',
		[ '$scope', 'orgsDcuplinksApi', '$location', 'orgsDcuplinksSelectionSvc', '$timeout',  'orgsSelectionSvc' , 
			function($scope, orgsDcuplinksApi, $location, orgsDcuplinksSelectionSvc, $timeout  , orgsSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = orgsSelectionSvc.getorgs();
				console.log(id);
				$scope.orgsDcuplinks = orgsDcuplinksApi.query({ orgid: id.id });
				
				$scope.orgsDcuplinksSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsDcuplinksGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Net', field:'net'/*, visible: */},
						{ name:'Public Ipv4', field:'public_ipv4'/*, visible: */},
						{ name:'Public Ipv6', field:'public_ipv6'/*, visible: */},
						{ name:'Nat Range Start', field:'nat_range_start'/*, visible: */},
						{ name:'Wan', field:'wan'/*, visible: */},
						{ name:'Cluster', field:'cluster'/*, visible: */},
						{ name:'Tags', field:'tags'/*, visible: */},
					],
					data: $scope.orgsDcuplinks,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsDcuplinksApi.save({ orgid: id.id }, newObject).$promise.then(function(data){
    						$scope.orgsDcuplinks.push(data);
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
                					$scope.orgsDcuplinksSelected = row.entity;
							$scope.showSelectedRecord = true;
							console.log(row.entity);	
							orgsDcuplinksSelectionSvc.setorgsDcuplinks(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsDcuplinksSelected = undefined;
				}
				
				$scope.orgsDcuplinksFields = [
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'net', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'net', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'public_ipv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'public_ipv4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'public_ipv6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'public_ipv6', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'nat_range_start', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'nat_range_start', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'wan', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'wan', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'cluster', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'cluster', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'tags', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tags', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("org,net,public_ipv4,public_ipv6,nat_range_start,wan,cluster,tags\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "dcuplinks.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);