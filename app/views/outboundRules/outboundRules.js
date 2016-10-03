'use strict';

angular.module('myApp.outboundRules', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/outboundRules', {
    templateUrl: 'views/outboundRules/outboundRules.html',
    controller: 'outboundRulesCtrl'
  });
}])
.controller('outboundRulesCtrl',
		[ '$scope', 'apiOutboundRules', '$location', 'currentOutboundRules', 
			function($scope, apiOutboundRules, $location, currentOutboundRules) {
				$scope.outboundRules = apiOutboundRules.query();
				$scope.outboundRulesSelected = '';
				$scope.outboundRules.$promise.then(function(data){
					console.log(data);
				});
				$scope.outboundRulesGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					columnDefs: [
						{ name:'active', field: 'active', visible:true },
						{ name:'allow', field: 'allow', visible:true },
						{ name:'appgrps', field: 'appgrps', visible:true },
						{ name:'apps', field: 'apps', visible:true },
						{ name:'devgrps', field: 'devgrps', visible:true },
						{ name:'devices', field: 'devices', visible:true },
						{ name:'dsttype', field: 'dsttype', visible:true },
						{ name:'org', field: 'org', visible:true },
						{ name:'srctype', field: 'srctype', visible:true },
						{ name:'tags', field: 'tags', visible:true },
						{ name:'usergrps', field: 'usergrps', visible:true },
						{ name:'users', field: 'users', visible:true },
						{ name:'zones', field: 'zones', visible:true },
					],
					data: $scope.outboundRules,
					rowTemplate: '<div ng-dblclick="grid.appScope.clickOutboundRules(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid, newObjects ) {
      			$scope.outboundRules = $scope.outboundRules.concat( newObjects );
      			console.log(newObjects);
    			},
    			importerObjectCallback: function ( grid, newObject ) {
    				apiOutboundRules.save(newObject);
    			},
    			onRegisterApi: function(gridApi){ 
      			$scope.gridApi = gridApi;
      			//$scope.gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    			},
				};
  			     
				$scope.clickOutboundRules = function(row){ 
					//currentOutboundRules.setOutboundRules(row.entity.id);
					console.log(row);
					$scope.outboundRulesSelected = row.entity;
				}
				
				$scope.isSelected = function() {
					return ($scope.outboundRulesSelected === '')? false: true;
				}
				
				$scope.outboundRulesFields = [
					{
            key: 'active', type: 'input',
            templateOptions: {
                type: 'text', label: 'active', placeholder: 'active', required: true
            }
          },
					{
            key: 'allow', type: 'input',
            templateOptions: {
                type: 'text', label: 'allow', placeholder: 'allow', required: true
            }
          },
					{
            key: 'appgrps', type: 'input',
            templateOptions: {
                type: 'text', label: 'appgrps', placeholder: 'appgrps', required: true
            }
          },
					{
            key: 'apps', type: 'input',
            templateOptions: {
                type: 'text', label: 'apps', placeholder: 'apps', required: true
            }
          },
					{
            key: 'devgrps', type: 'input',
            templateOptions: {
                type: 'text', label: 'devgrps', placeholder: 'devgrps', required: true
            }
          },
					{
            key: 'devices', type: 'input',
            templateOptions: {
                type: 'text', label: 'devices', placeholder: 'devices', required: true
            }
          },
					{
            key: 'dsttype', type: 'input',
            templateOptions: {
                type: 'text', label: 'dsttype', placeholder: 'dsttype', required: true
            }
          },
					{
            key: 'org', type: 'input',
            templateOptions: {
                type: 'text', label: 'org', placeholder: 'org', required: true
            }
          },
					{
            key: 'srctype', type: 'input',
            templateOptions: {
                type: 'text', label: 'srctype', placeholder: 'srctype', required: true
            }
          },
					{
            key: 'tags', type: 'input',
            templateOptions: {
                type: 'text', label: 'tags', placeholder: 'tags', required: true
            }
          },
					{
            key: 'usergrps', type: 'input',
            templateOptions: {
                type: 'text', label: 'usergrps', placeholder: 'usergrps', required: true
            }
          },
					{
            key: 'users', type: 'input',
            templateOptions: {
                type: 'text', label: 'users', placeholder: 'users', required: true
            }
          },
					{
            key: 'zones', type: 'input',
            templateOptions: {
                type: 'text', label: 'zones', placeholder: 'zones', required: true
            }
          },
				];
				
				var uploadZone = document.getElementById('upload');

    		// Optional.   Show the copy icon when dragging over.  Seems to only work for chrome.
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
