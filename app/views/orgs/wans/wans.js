'use strict';
angular.module('myApp.wans', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/wans', {
    templateUrl: 'views/wans/wans.html',
    controller: 'wansCtrl'
  });
}])
.controller('wansCtrl',
		[ '$scope', 'wansApi', '$location', 'wansSelectionSvc', '$timeout',
			function($scope, wansApi, $location, wansSelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.wans = wansApi.query();
				$scope.wansSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.wansGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
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
					data: $scope.wans,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					wansApi.save(newObject).$promise.then(function(data){
    						$scope.wans.push(data);
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
                					$scope.wansSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.wansSelected = undefined;
				}
				
				$scope.wansFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: ""/*, required: */
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: ""/*, required: */
            					}
          				},
						{key: 'uplinks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uplinks', placeholder: ""/*, required: */
            					}
          				},
						{key: 'nets', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'nets', placeholder: ""/*, required: */
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: ""/*, required: */
            					}
          				},
						{key: 'longname', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'longname', placeholder: ""/*, required: */
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: ""/*, required: */
            					}
          				},
						{key: 'internet', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'internet', placeholder: ""/*, required: */
            					}
          				},
						{key: 'sitelink', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'sitelink', placeholder: ""/*, required: */
            					}
          				},
						{key: 'pingcheck_ips', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'pingcheck_ips', placeholder: ""/*, required: */
            					}
          				},
						{key: 'dcuplink', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dcuplink', placeholder: ""/*, required: */
            					}
          				},
						{key: 'breakout', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'breakout', placeholder: ""/*, required: */
            					}
          				},
						{key: 'breakout_sites', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'breakout_sites', placeholder: ""/*, required: */
            					}
          				},
						{key: 'xfer_networks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'xfer_networks', placeholder: ""/*, required: */
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
								
				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("org,uplinks,nets,name,longname,internet,sitelink,pingcheck_ips,dcuplink,breakout,breakout_sites,xfer_networks\n");
				var dlAnchorElem = document.getElementById('download');
				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "org.csv");
				
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				}
		}]
)
