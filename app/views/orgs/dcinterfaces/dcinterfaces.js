'use strict';
angular.module('myApp.dcinterfaces', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dcinterfaces', {
    templateUrl: 'views/dcinterfaces/dcinterfaces.html',
    controller: 'dcinterfacesCtrl'
  });
}])
.controller('dcinterfacesCtrl',
		[ '$scope', 'dcinterfacesApi', '$location', 'dcinterfacesSelectionSvc', '$timeout',
			function($scope, dcinterfacesApi, $location, dcinterfacesSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.dcinterfaces = dcinterfacesApi.query();
				$scope.dcinterfacesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.dcinterfacesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Port', field:'port'/*, visible: */},
						{ name:'Gateway Ipv4', field:'gateway_ipv4'/*, visible: */},
						{ name:'Gateway Ipv6', field:'gateway_ipv6'/*, visible: */},
						{ name:'Ipv4', field:'ipv4'/*, visible: */},
						{ name:'Ipv6', field:'ipv6'/*, visible: */},
						{ name:'Mtu', field:'mtu'/*, visible: */},
						{ name:'Auto Negotiation', field:'auto_negotiation'/*, visible: */},
						{ name:'Enabled', field:'enabled'/*, visible: */},
					],
					data: $scope.dcinterfaces,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					dcinterfacesApi.save(newObject).$promise.then(function(data){
    						$scope.dcinterfaces.push(data);
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
                					$scope.dcinterfacesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.dcinterfacesSelected = undefined;
				}
				
				$scope.dcinterfacesFields = [
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: ""/*, required: */
            					}
          				},
						{key: 'port', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'port', placeholder: ""/*, required: */
            					}
          				},
						{key: 'gateway_ipv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'gateway_ipv4', placeholder: ""/*, required: */
            					}
          				},
						{key: 'gateway_ipv6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'gateway_ipv6', placeholder: ""/*, required: */
            					}
          				},
						{key: 'ipv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ipv4', placeholder: ""/*, required: */
            					}
          				},
						{key: 'ipv6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ipv6', placeholder: ""/*, required: */
            					}
          				},
						{key: 'mtu', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'mtu', placeholder: ""/*, required: */
            					}
          				},
						{key: 'auto_negotiation', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'auto_negotiation', placeholder: ""/*, required: */
            					}
          				},
						{key: 'enabled', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'enabled', placeholder: ""/*, required: */
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
								
				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("[object Object]\n");
				var dlAnchorElem = document.getElementById('download');
				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "org.csv");
				
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				}
		}]
)
