'use strict';
{{#ops}}
{{#get.values}}
angular.module('myApp.{{name}}', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/{{name}}', {
    templateUrl: 'views/{{name}}/{{name}}.html',
    controller: '{{name}}Ctrl'
  });
}])
.controller('{{name}}Ctrl',
		[ '$scope', '{{name}}Api', '$location', '{{name}}SelectionSvc', '$timeout',
			function($scope, {{name}}Api, $location, {{name}}SelectionSvc, $timeout) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				$scope.{{name}} = {{name}}Api.query();
				$scope.{{name}}Selected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.{{name}}GridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
					{{#definition}}
						{ name:'{{title}}', field:'{{name}}'/*, visible:{{visible}} */},
					{{/definition}}
					],
					data: $scope.{{name}},
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					{{name}}Api.save(newObject).$promise.then(function(data){
    						$scope.{{name}}.push(data);
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
                					$scope.{{name}}Selected = row.entity;
							$scope.showSelectedRecord = true;
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
					{{#submenus}}
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log(row.entity);	
					{{name}}SelectionSvc.set{{name}}(row.entity.{{selectedSubmenu}});
					$location.path('/org');
					{{/submenus}}
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.{{name}}Selected = undefined;
				}
				
				$scope.{{name}}Fields = [
					{{#definition}}
						{key: '{{name}}', type: 'input',
            					templateOptions: {
                					type: '{{type}}', label: '{{name}}', placeholder: "{{description}}", disabled: true/*, required: {{required}}*/ 
            					}
          				},
          			{{/definition}}
				];
{{/get.values}}
{{#post.values}}
				{{#sampleHeaders}}
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("{{& sampleHeaders }}\n{{& sampleData }}");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "org.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
				{{/sampleHeaders}}
{{/post.values}}
{{/ops}}
}]);