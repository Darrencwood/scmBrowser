'use strict';
{{#ops}}
{{#get.values}}
angular.module('myApp.{{name}}', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('{{& path}}', {
{{#isSubMenu}}
  templateUrl: 'views{{& path}}/{{name}}.html',
{{/isSubMenu}}
{{^isSubMenu}}
  	templateUrl: 'views/{{name}}/{{name}}.html',
{{/isSubMenu}}
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
					enableSelectAll: true,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: '{{id}}.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
					{{#definition}}
						{ name:'{{title}}', field:'{{name}}'/*, visible:{{visible}} */, enableCellEdit: ('{{name}}'=='id' || '{{name}}'=='uid' || '{{name}}'=='gid')? false: true},
					{{/definition}}
					],
					data: $scope.{{name}},
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
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
      					gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            				console.log('edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue);
            				console.log(rowEntity);
            				let req = { };
							req['{{putId}}'] = rowEntity.id;
            				{{name}}Api.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.{{name}}Selected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
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
				
				$scope.deleteRow = function(row) {
					{{#delete}}
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['{{deleteId}}'] = row.entity.id;
					{{name}}Api.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.{{name}}.length; i++){
							if ($scope.{{name}}[i].id == row.entity.id) {
								$scope.{{name}}.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});
					{{/delete}}

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