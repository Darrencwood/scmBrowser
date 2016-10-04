'use strict';

angular.module('myApp.{{camel}}', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/{{camel}}', {
    templateUrl: 'views/{{camel}}/{{camel}}.html',
    controller: '{{camel}}Ctrl'
  });
}])
{{#selectedSubmenu}}
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/{{submenuName}}', {
    templateUrl: 'views/{{camel}}/{{submenuName}}.html',
    controller: '{{submenuName}}Ctrl'
  });
}])
{{/selectedSubmenu}}
.controller('{{camel}}Ctrl',
		[ '$scope', 'api{{title}}', '$location', 'current{{title}}', '$timeout',
			function($scope, api{{title}}, $location, current{{title}}, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.{{camel}} = api{{title}}.query();
				$scope.{{camel}}Selected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.{{camel}}GridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
					{{#fields}}
						{ name:'{{key}}', field:'{{key}}', visible:{{visible}} },
					{{/fields}}
					],
					data: $scope.{{camel}},
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					api{{title}}.save(newObject).$promise.then(function(data){
    						$scope.{{camel}}.push(data);
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
                			$scope.{{camel}}Selected = row.entity;
							$scope.showSelectedRecord = true;
						}
        			},500);
				}
				
				$scope.dblclick = function(row){
					{{#selectedSubmenu}}
					$scope.stopped = $timeout.cancel($scope.clicked);
					//console.log(row.entity);	
					current{{title}}.set{{title}}(row.entity.{{selectedSubmenu}});
					$location.path('/org');
					{{/selectedSubmenu}}
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.{{camel}}Selected = undefined;
				}
				
				$scope.{{camel}}Fields = [
					{{#fields}}
						{key: '{{key}}', type: '{{type}}',
            				templateOptions: {
                				type: '{{option_type}}', label: '{{key}}', placeholder: '{{key}}', required: {{require}}
            				}
          				},
          			{{/fields}}
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
				{{#sampleHeaders}}				
				var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("{{& sampleHeaders }}\n{{& sampleData }}");
				var dlAnchorElem = document.getElementById('download');
				dlAnchorElem.setAttribute("href",     dataStr     );
				dlAnchorElem.setAttribute("download", "org.csv");
				
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				}
				{{/sampleHeaders}}
		}]
)
{{#selectedSubmenu}}
.controller('{{submenuNameCamel}}Ctrl',
		[ '$scope', 'api{{submenuName}}', '$location', 'current{{title}}',
			function($scope, api{{submenuName}}, $location, current{{title}}) {
			}
		]
)
{{/selectedSubmenu}}
;
