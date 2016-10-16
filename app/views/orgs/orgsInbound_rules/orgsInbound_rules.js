'use strict';
angular.module('myApp.orgsInbound_rules', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/orgs/orgsInbound_rules', {
  templateUrl: 'views/orgs/orgsInbound_rules/orgsInbound_rules.html',
    controller: 'orgsInbound_rulesCtrl'
  });
}])
.controller('orgsInbound_rulesCtrl',
		[ '$scope', 'orgsInbound_rulesApi', '$location', 'orgsInbound_rulesSelectionSvc', '$timeout',  'orgsSelectionSvc' , 
			function($scope, orgsInbound_rulesApi, $location, orgsInbound_rulesSelectionSvc, $timeout  , orgsSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = orgsSelectionSvc.getorgs();
				console.log(id);
				$scope.orgsInbound_rules = orgsInbound_rulesApi.query({ orgid: id.id });
				
				$scope.orgsInbound_rulesSelected = '';
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsInbound_rulesGridOptions = {
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
						{ name:'Nat Port Offset', field:'nat_port_offset'/*, visible: */, enableCellEdit: ('nat_port_offset'=='id' || 'nat_port_offset'=='uid' || 'nat_port_offset'=='gid')? false: true},
						{ name:'App', field:'app'/*, visible: */, enableCellEdit: ('app'=='id' || 'app'=='uid' || 'app'=='gid')? false: true},
						{ name:'No Reflection', field:'no_reflection'/*, visible: */, enableCellEdit: ('no_reflection'=='id' || 'no_reflection'=='uid' || 'no_reflection'=='gid')? false: true},
						{ name:'Uplinks', field:'uplinks'/*, visible: */, enableCellEdit: ('uplinks'=='id' || 'uplinks'=='uid' || 'uplinks'=='gid')? false: true},
						{ name:'Mode', field:'mode'/*, visible: */, enableCellEdit: ('mode'=='id' || 'mode'=='uid' || 'mode'=='gid')? false: true},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Inactive', field:'inactive'/*, visible: */, enableCellEdit: ('inactive'=='id' || 'inactive'=='uid' || 'inactive'=='gid')? false: true},
						{ name:'Custom Ip', field:'custom_ip'/*, visible: */, enableCellEdit: ('custom_ip'=='id' || 'custom_ip'=='uid' || 'custom_ip'=='gid')? false: true},
						{ name:'Hostlist', field:'hostlist'/*, visible: */, enableCellEdit: ('hostlist'=='id' || 'hostlist'=='uid' || 'hostlist'=='gid')? false: true},
						{ name:'Use Hostlist', field:'use_hostlist'/*, visible: */, enableCellEdit: ('use_hostlist'=='id' || 'use_hostlist'=='uid' || 'use_hostlist'=='gid')? false: true},
					],
					data: $scope.orgsInbound_rules,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsInbound_rulesApi.save({ orgid: id.id }, newObject).$promise.then(function(data){
    						$scope.orgsInbound_rules.push(data);
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
							req['ruleid'] = rowEntity.id;
            				orgsInbound_rulesApi.update(req, rowEntity);
          				});
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.orgsInbound_rulesSelected = row.entity;
							$scope.showSelectedRecord = true;
							//console.log(row.entity);	
							orgsInbound_rulesSelectionSvc.setorgsInbound_rules(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsInbound_rulesSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['ruleid'] = row.entity.id;
					orgsInbound_rulesApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.orgsInbound_rules.length; i++){
							if ($scope.orgsInbound_rules[i].id == row.entity.id) {
								$scope.orgsInbound_rules.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.orgsInbound_rulesFields = [
						{key: 'nat_port_offset', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'nat_port_offset', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'app', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'app', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'no_reflection', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'no_reflection', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uplinks', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uplinks', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'mode', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'mode', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'inactive', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'inactive', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'custom_ip', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'custom_ip', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'hostlist', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'hostlist', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'use_hostlist', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'use_hostlist', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("nat_port_offset,app,no_reflection,uplinks,mode,id,inactive,custom_ip,hostlist,use_hostlist\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "inbound_rules.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);