'use strict';
{{#ops}}
{{#get.values}}
angular.module('myApp.{{name}}', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('{{&path}}', {
  	templateUrl: 'views{{&path}}/{{name}}.html',
    controller: '{{name}}Ctrl'
  });
}])
.controller('{{name}}Ctrl',
		[ '$scope', '{{name}}Api', '$location', '{{name}}SelectionSvc', '$timeout', {{#isSubMenu}} '{{originalName}}SelectionSvc' , {{/isSubMenu}}
			function($scope, {{name}}Api, $location, {{name}}SelectionSvc, $timeout {{#isSubMenu}} , {{originalName}}SelectionSvc {{/isSubMenu}} ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				{{#isSubMenu}}
				let id = {{originalName}}SelectionSvc.get{{originalName}}();
				console.log(id);
				$scope.{{name}} = {{name}}Api.query({ {{originalId}}: id.{{selectedSubmenu}} });
				{{/isSubMenu}}
				{{^isSubMenu}}
				$scope.{{name}} = {{name}}Api.query();
				{{/isSubMenu}}
				
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
    				{{#isSubMenu}}
    					{{name}}Api.save({ {{originalId}}: id.{{selectedSubmenu}} }, newObject).$promise.then(function(data){
    				{{/isSubMenu}}
    				{{^isSubMenu}}
    					{{name}}Api.save(newObject).$promise.then(function(data){
    				{{/isSubMenu}}
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
							console.log(row.entity);	
							{{name}}SelectionSvc.set{{name}}(row.entity);
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
					dlAnchorElem.setAttribute("download", "{{id}}.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
				{{/sampleHeaders}}
{{/post.values}}
{{/ops}}
}]);