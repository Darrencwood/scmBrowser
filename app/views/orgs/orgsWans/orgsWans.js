'use strict';
angular.module('myApp.orgsWans', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgsWans', {
    templateUrl: 'views/orgsWans/orgsWans.html',
    controller: 'orgsWansCtrl'
  });
}])
.controller('orgsWansCtrl',
		[ '$scope', 'orgsWansApi', '$location', 'orgsWansSelectionSvc', '$timeout',
			function($scope, orgsWansApi, $location, orgsWansSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.orgsWans = orgsWansApi.query();
				$scope.orgsWansSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsWansGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Uplinks', field:'uplinks'/*, visible: */},
						{ name:'Nets', field:'nets'/*, visible: */},
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Longname', field:'longname'/*, visible: */},
						{ name:'Uid', field:'uid'/*, visible: */},
						{ name:'Internet', field:'internet'/*, visible: */},
						{ name:'Sitelink', field:'sitelink'/*, visible: */},
						{ name:'Pingcheck Ips', field:'pingcheck_ips'/*, visible: */},
						{ name:'Dcuplink', field:'dcuplink'/*, visible: */},
						{ name:'Breakout', field:'breakout'/*, visible: */},
						{ name:'Breakout Sites', field:'breakout_sites'/*, visible: */},
						{ name:'Xfer Networks', field:'xfer_networks'/*, visible: */},
					],
					data: $scope.orgsWans,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsWansApi.save(newObject).$promise.then(function(data){
    						$scope.orgsWans.push(data);
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
                					$scope.orgsWansSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsWansSelected = undefined;
				}
				
				$scope.orgsWansFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uplinks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uplinks', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'nets', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'nets', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'longname', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'longname', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'internet', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'internet', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'sitelink', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'sitelink', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'pingcheck_ips', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'pingcheck_ips', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dcuplink', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dcuplink', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'breakout', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'breakout', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'breakout_sites', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'breakout_sites', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'xfer_networks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'xfer_networks', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("org,uplinks,nets,name,longname,internet,sitelink,pingcheck_ips,dcuplink,breakout,breakout_sites,xfer_networks\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "org.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);