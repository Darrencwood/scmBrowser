'use strict';
angular.module('myApp.orgs', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/orgs', {
  	templateUrl: 'views/orgs/orgs.html',
    controller: 'orgsCtrl'
  });
}])
.controller('orgsCtrl',
		[ '$scope', 'orgsApi', '$location', 'orgsSelectionSvc', '$timeout', 
			function($scope, orgsApi, $location, orgsSelectionSvc, $timeout  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.orgs = orgsApi.query();
				
				$scope.orgsSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Name', field:'name'/*, visible: */, enableCellEdit: ('name'=='id' || 'name'=='uid' || 'name'=='gid')? false: true},
						{ name:'Contact', field:'contact'/*, visible: */, enableCellEdit: ('contact'=='id' || 'contact'=='uid' || 'contact'=='gid')? false: true},
						{ name:'Uid', field:'uid'/*, visible: */, enableCellEdit: ('uid'=='id' || 'uid'=='uid' || 'uid'=='gid')? false: true},
						{ name:'Realm', field:'realm'/*, visible: */, enableCellEdit: ('realm'=='id' || 'realm'=='uid' || 'realm'=='gid')? false: true},
						{ name:'Gid', field:'gid'/*, visible: */, enableCellEdit: ('gid'=='id' || 'gid'=='uid' || 'gid'=='gid')? false: true},
						{ name:'Longname', field:'longname'/*, visible: */, enableCellEdit: ('longname'=='id' || 'longname'=='uid' || 'longname'=='gid')? false: true},
						{ name:'City', field:'city'/*, visible: */, enableCellEdit: ('city'=='id' || 'city'=='uid' || 'city'=='gid')? false: true},
						{ name:'Country', field:'country'/*, visible: */, enableCellEdit: ('country'=='id' || 'country'=='uid' || 'country'=='gid')? false: true},
						{ name:'Street Address', field:'street_address'/*, visible: */, enableCellEdit: ('street_address'=='id' || 'street_address'=='uid' || 'street_address'=='gid')? false: true},
						{ name:'Timezone', field:'timezone'/*, visible: */, enableCellEdit: ('timezone'=='id' || 'timezone'=='uid' || 'timezone'=='gid')? false: true},
					],
					data: $scope.orgs,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsApi.save(newObject).$promise.then(function(data){
    						$scope.orgs.push(data);
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
							req['orgid'] = rowEntity.id;
            				orgsApi.update(req, rowEntity);
          				});
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.orgsSelected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
							orgsSelectionSvc.setorgs(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log(row.entity);	
					orgsSelectionSvc.setorgs(row.entity.id);
					$location.path('/org');
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['orgid'] = row.entity.id;
					orgsApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.orgs.length; i++){
							if ($scope.orgs[i].id == row.entity.id) {
								$scope.orgs.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.orgsFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'contact', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'contact', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'realm', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'realm', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'gid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'gid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'longname', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'longname', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'city', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'city', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'country', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'country', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'street_address', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'street_address', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'timezone', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'timezone', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("name,longname,city\nTestOrg, Test Organization, San Antonio");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", ":orgid.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);