'use strict';
angular.module('myApp.orgsPath_rules', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/orgs/orgsPath_rules', {
  templateUrl: 'views/orgs/orgsPath_rules/orgsPath_rules.html',
    controller: 'orgsPath_rulesCtrl'
  });
}])
.controller('orgsPath_rulesCtrl',
		[ '$scope', 'orgsPath_rulesApi', '$location', 'orgsPath_rulesSelectionSvc', '$timeout',  'orgsSelectionSvc' , 
			function($scope, orgsPath_rulesApi, $location, orgsPath_rulesSelectionSvc, $timeout  , orgsSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = orgsSelectionSvc.getorgs();
				console.log(id);
				$scope.orgsPath_rules = orgsPath_rulesApi.query({ orgid: id.id });
				
				$scope.orgsPath_rulesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsPath_rulesGridOptions = {
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
						{ name:'Dsttype', field:'dsttype'/*, visible: */, enableCellEdit: ('dsttype'=='id' || 'dsttype'=='uid' || 'dsttype'=='gid')? false: true},
						{ name:'Qos', field:'qos'/*, visible: */, enableCellEdit: ('qos'=='id' || 'qos'=='uid' || 'qos'=='gid')? false: true},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Marking', field:'marking'/*, visible: */, enableCellEdit: ('marking'=='id' || 'marking'=='uid' || 'marking'=='gid')? false: true},
						{ name:'Zones', field:'zones'/*, visible: */, enableCellEdit: ('zones'=='id' || 'zones'=='uid' || 'zones'=='gid')? false: true},
						{ name:'Srctype', field:'srctype'/*, visible: */, enableCellEdit: ('srctype'=='id' || 'srctype'=='uid' || 'srctype'=='gid')? false: true},
						{ name:'Uid', field:'uid'/*, visible: */, enableCellEdit: ('uid'=='id' || 'uid'=='uid' || 'uid'=='gid')? false: true},
						{ name:'Active', field:'active'/*, visible: */, enableCellEdit: ('active'=='id' || 'active'=='uid' || 'active'=='gid')? false: true},
						{ name:'Sites', field:'sites'/*, visible: */, enableCellEdit: ('sites'=='id' || 'sites'=='uid' || 'sites'=='gid')? false: true},
						{ name:'Path Preference', field:'path_preference'/*, visible: */, enableCellEdit: ('path_preference'=='id' || 'path_preference'=='uid' || 'path_preference'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Dscp', field:'dscp'/*, visible: */, enableCellEdit: ('dscp'=='id' || 'dscp'=='uid' || 'dscp'=='gid')? false: true},
						{ name:'Apps', field:'apps'/*, visible: */, enableCellEdit: ('apps'=='id' || 'apps'=='uid' || 'apps'=='gid')? false: true},
						{ name:'Devices', field:'devices'/*, visible: */, enableCellEdit: ('devices'=='id' || 'devices'=='uid' || 'devices'=='gid')? false: true},
						{ name:'Tags', field:'tags'/*, visible: */, enableCellEdit: ('tags'=='id' || 'tags'=='uid' || 'tags'=='gid')? false: true},
						{ name:'Users', field:'users'/*, visible: */, enableCellEdit: ('users'=='id' || 'users'=='uid' || 'users'=='gid')? false: true},
					],
					data: $scope.orgsPath_rules,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsPath_rulesApi.save({ orgid: id.id }, newObject).$promise.then(function(data){
    						$scope.orgsPath_rules.push(data);
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
							req['pruleid'] = rowEntity.id;
            				orgsPath_rulesApi.update(req, rowEntity);
          				});
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.orgsPath_rulesSelected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
							orgsPath_rulesSelectionSvc.setorgsPath_rules(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsPath_rulesSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['pruleid'] = row.entity.id;
					orgsPath_rulesApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.orgsPath_rules.length; i++){
							if ($scope.orgsPath_rules[i].id == row.entity.id) {
								$scope.orgsPath_rules.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.orgsPath_rulesFields = [
						{key: 'dsttype', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dsttype', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'qos', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'qos', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'marking', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'marking', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'zones', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'zones', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'srctype', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'srctype', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'active', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'active', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'sites', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'sites', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'path_preference', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'path_preference', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dscp', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dscp', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'apps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'apps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devices', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devices', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'tags', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'tags', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'users', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'users', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("dsttype,qos,marking,zones,srctype,active,sites,path_preference,org,dscp,apps,devices,tags,users\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "path_rules.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);