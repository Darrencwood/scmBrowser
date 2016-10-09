'use strict';
angular.module('myApp.dcuplinks', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dcuplinks', {
    templateUrl: 'views/dcuplinks/dcuplinks.html',
    controller: 'dcuplinksCtrl'
  });
}])
.controller('dcuplinksCtrl',
		[ '$scope', 'dcuplinksApi', '$location', 'dcuplinksSelectionSvc', '$timeout',
			function($scope, dcuplinksApi, $location, dcuplinksSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.dcuplinks = dcuplinksApi.query();
				$scope.dcuplinksSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.dcuplinksGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
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
					data: $scope.dcuplinks,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					dcuplinksApi.save(newObject).$promise.then(function(data){
    						$scope.dcuplinks.push(data);
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
                					$scope.dcuplinksSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.dcuplinksSelected = undefined;
				}
				
				$scope.dcuplinksFields = [
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: ""/*, required: */
            					}
          				},
						{key: 'net', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'net', placeholder: ""/*, required: */
            					}
          				},
						{key: 'public_ipv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'public_ipv4', placeholder: ""/*, required: */
            					}
          				},
						{key: 'public_ipv6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'public_ipv6', placeholder: ""/*, required: */
            					}
          				},
						{key: 'nat_range_start', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'nat_range_start', placeholder: ""/*, required: */
            					}
          				},
						{key: 'wan', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'wan', placeholder: ""/*, required: */
            					}
          				},
						{key: 'cluster', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'cluster', placeholder: ""/*, required: */
            					}
          				},
						{key: 'tags', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tags', placeholder: ""/*, required: */
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
								
				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("org,net,public_ipv4,public_ipv6,nat_range_start,wan,cluster,tags\n");
				var dlAnchorElem = document.getElementById('download');
				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "org.csv");
				
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				}
		}]
)
