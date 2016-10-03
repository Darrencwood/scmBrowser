'use strict';

angular.module('myApp.{{camel}}', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/{{camel}}', {
    templateUrl: 'views/{{camel}}/{{camel}}.html',
    controller: '{{camel}}Ctrl'
  });
}])
.controller('{{camel}}Ctrl',
		[ '$scope', 'api{{title}}', '$location', 'current{{title}}', 
			function($scope, api{{title}}, $location,
current{{title}}) {
				$scope.{{camel}} = api{{title}}.query();
				$scope.{{camel}}Selected = '';
				$scope.{{camel}}.$promise.then(function(data){
					console.log(data);
				});
				$scope.{{camel}}GridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
					{{#fields}}
						{ name:'{{key}}', field:
'{{key}}', visible:{{visible}} },
					{{/fields}}
					],
					data: $scope.{{camel}},
					rowTemplate: '<div
ng-dblclick="grid.appScope.click{{title}}(row)" ng-repeat="(colRenderIndex, col)
in colContainer.renderedColumns track by col.uid" class="ui-grid-cell"
ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,
newObjects ) {
      			$scope.{{camel}} = $scope.{{camel}}.concat( newObjects
);
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				api{{title}}.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope,
      			//$scope.saveRow);
    			},
				};
  			     
				$scope.click{{title}} = function(row){ 
					//current{{title}}.set{{title}}(row.entity.id);
					console.log(row);
					$scope.{{camel}}Selected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.{{camel}}Selected ===
'')? false: true;
				}
				
				$scope.{{camel}}Fields = [
					{{#fields}}
					{
            key: '{{key}}', type: '{{type}}',
            templateOptions: {
                type: '{{option_type}}', label: '{{key}}', placeholder:
'{{key}}', required: {{require}}
            }
          },
          {{/fields}}
				];
				
				var uploadZone =
document.getElementById('upload');

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
    		    $scope.gridApi.importer.importFile(files[0]);
					}
				);
		}]
);
