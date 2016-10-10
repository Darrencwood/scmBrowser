'use strict';
angular.module('myApp.orgsSsids', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgsSsids', {
    templateUrl: 'views/orgsSsids/orgsSsids.html',
    controller: 'orgsSsidsCtrl'
  });
}])
.controller('orgsSsidsCtrl',
		[ '$scope', 'orgsSsidsApi', '$location', 'orgsSsidsSelectionSvc', '$timeout',
			function($scope, orgsSsidsApi, $location, orgsSsidsSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.orgsSsids = orgsSsidsApi.query();
				$scope.orgsSsidsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsSsidsGridOptions = {
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
						{ name:'Ssid', field:'ssid'/*, visible: */},
						{ name:'Security', field:'security'/*, visible: */},
						{ name:'Encryption', field:'encryption'/*, visible: */},
						{ name:'Key', field:'key'/*, visible: */},
						{ name:'Authentication', field:'authentication'/*, visible: */},
						{ name:'Eapol Version', field:'eapol_version'/*, visible: */},
						{ name:'Dtim Period', field:'dtim_period'/*, visible: */},
						{ name:'Bcasts', field:'bcasts'/*, visible: */},
					],
					data: $scope.orgsSsids,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsSsidsApi.save(newObject).$promise.then(function(data){
    						$scope.orgsSsids.push(data);
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
                					$scope.orgsSsidsSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsSsidsSelected = undefined;
				}
				
				$scope.orgsSsidsFields = [
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
						{key: 'ssid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ssid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'security', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'security', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'encryption', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'encryption', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'key', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'key', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'authentication', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'authentication', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'eapol_version', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'eapol_version', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dtim_period', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dtim_period', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'bcasts', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'bcasts', placeholder: "", disabled: true/*, required: */ 
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
								
				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("org,ssid,security,encryption,key,authentication,eapol_version,dtim_period,bcasts\n");
				var dlAnchorElem = document.getElementById('download');
				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "org.csv");
				
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);