'use strict';
angular.module('myApp.orgsDevices', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgs/orgsDevices', {
  	templateUrl: 'views/orgs/orgsDevices/orgsDevices.html',
    controller: 'orgsDevicesCtrl'
  });
}])
.controller('orgsDevicesCtrl',
		[ '$scope', 'orgsDevicesApi', '$location', 'orgsDevicesSelectionSvc', '$timeout',  'orgsSelectionSvc' , 
			function($scope, orgsDevicesApi, $location, orgsDevicesSelectionSvc, $timeout  , orgsSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = orgsSelectionSvc.getorgs();
				console.log(id);
				$scope.orgsDevices = orgsDevicesApi.query({ orgid: id.id });
				
				$scope.orgsDevicesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsDevicesGridOptions = {
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
						{ name:'User', field:'user'/*, visible: */},
						{ name:'Mac', field:'mac'/*, visible: */},
						{ name:'Info', field:'info'/*, visible: */},
						{ name:'Ipv4', field:'ipv4'/*, visible: */},
						{ name:'Ipv6', field:'ipv6'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Devgrps', field:'devgrps'/*, visible: */},
						{ name:'Tags', field:'tags'/*, visible: */},
						{ name:'Net', field:'net'/*, visible: */},
						{ name:'Endpoint', field:'endpoint'/*, visible: */},
					],
					data: $scope.orgsDevices,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsDevicesApi.save({ orgid: id.id }, newObject).$promise.then(function(data){
    						$scope.orgsDevices.push(data);
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
                					$scope.orgsDevicesSelected = row.entity;
							$scope.showSelectedRecord = true;
							console.log(row.entity);	
							orgsDevicesSelectionSvc.setorgsDevices(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsDevicesSelected = undefined;
				}
				
				$scope.orgsDevicesFields = [
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
						{key: 'user', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'user', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'mac', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'mac', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'info', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'info', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ipv4', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ipv4', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ipv6', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ipv6', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devgrps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devgrps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'tags', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tags', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'net', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'net', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'endpoint', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'endpoint', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("user,mac,info,ipv4,ipv6,org,devgrps,tags,net,endpoint\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "devices.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);