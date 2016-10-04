'use strict';

angular.module('myApp.inboundRules', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/inboundRules', {
    templateUrl: 'views/inboundRules/inboundRules.html',
    controller: 'inboundRulesCtrl'
  });
}])
.controller('inboundRulesCtrl',
		[ '$scope', 'apiInboundRules', '$location', 'currentInboundRules', '$timeout',
			function($scope, apiInboundRules, $location, currentInboundRules, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.inboundRules = apiInboundRules.query();
				$scope.inboundRulesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.inboundRulesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'app', field:'app', visible:true },
						{ name:'custom_ip', field:'custom_ip', visible:true },
						{ name:'hostlist', field:'hostlist', visible:true },
						{ name:'inactive', field:'inactive', visible:true },
						{ name:'mode', field:'mode', visible:true },
						{ name:'nat_port_offset', field:'nat_port_offset', visible:true },
						{ name:'no_reflection', field:'no_reflection', visible:true },
						{ name:'uplinks', field:'uplinks', visible:true },
						{ name:'use_hostlist', field:'use_hostlist', visible:true },
					],
					data: $scope.inboundRules,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					apiInboundRules.save(newObject).$promise.then(function(data){
    						$scope.inboundRules.push(data);
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
                			$scope.inboundRulesSelected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.inboundRulesSelected = undefined;
				}
				
				$scope.inboundRulesFields = [
						{key: 'app', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'app', placeholder: 'app', required: true
            				}
          				},
						{key: 'custom_ip', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'custom_ip', placeholder: 'custom_ip', required: true
            				}
          				},
						{key: 'hostlist', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'hostlist', placeholder: 'hostlist', required: true
            				}
          				},
						{key: 'inactive', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'inactive', placeholder: 'inactive', required: true
            				}
          				},
						{key: 'mode', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'mode', placeholder: 'mode', required: true
            				}
          				},
						{key: 'nat_port_offset', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'nat_port_offset', placeholder: 'nat_port_offset', required: true
            				}
          				},
						{key: 'no_reflection', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'no_reflection', placeholder: 'no_reflection', required: true
            				}
          				},
						{key: 'uplinks', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'uplinks', placeholder: 'uplinks', required: true
            				}
          				},
						{key: 'use_hostlist', type: 'input',
            				templateOptions: {
                				type: 'text', label: 'use_hostlist', placeholder: 'use_hostlist', required: true
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
		}]
)
;