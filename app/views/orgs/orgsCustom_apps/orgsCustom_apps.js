'use strict';
angular.module('myApp.orgsCustom_apps', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/orgs/orgsCustom_apps', {
  templateUrl: 'views/orgs/orgsCustom_apps/orgsCustom_apps.html',
    controller: 'orgsCustom_appsCtrl'
  });
}])
.controller('orgsCustom_appsCtrl',
		[ '$scope', 'orgsCustom_appsApi', '$location', 'orgsCustom_appsSelectionSvc', '$timeout' , 'orgsSelectionSvc'   , 'proxyRegisterSvc', 
			function($scope, orgsCustom_appsApi, $location, orgsCustom_appsSelectionSvc, $timeout  , orgsSelectionSvc  , proxyRegisterSvc) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				$scope.isProxyRegister = function() {
					return proxyRegisterSvc.hasRegister;
				}
				
				$scope.orgsCustom_appsSelected = orgsSelectionSvc.getorgs();
				$scope.orgsCustom_apps = orgsCustom_appsApi.query({ orgid: $scope.orgsCustom_appsSelected.id });
				
				
				$scope.clicked = false;
				$scope.stopped = false;
				
				var refresh = function() {
					if ($scope.$$phase) {
						$scope.$apply;
					}
				};
				
				$scope.clicked = true;
				
				$scope.orgsCustom_appsGridOptions = {
					enableSorting: true,
					enableColumnResize: true,
					enableCellEdit: false,
					exporterMenuPdf: false,
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					exporterCsvFilename: 'custom_apps.csv',
					exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
					rowHeight: 40,
					columnDefs: [
					{ name: 'delete',
					  cellTemplate: '<a id="delete" class="btn btn-danger" role="button" ng-click="grid.appScope.deleteRow(row)"> <span class="glyphicon glyphicon-trash"></span></a>'
					},
						{ name:'Id', field:'id'/*, visible: */, enableCellEdit: ('id'=='id' || 'id'=='uid' || 'id'=='gid')? false: true},
						{ name:'Appid', field:'appid'/*, visible: */, enableCellEdit: ('appid'=='id' || 'appid'=='uid' || 'appid'=='gid')? false: true},
						{ name:'Desc', field:'desc'/*, visible: */, enableCellEdit: ('desc'=='id' || 'desc'=='uid' || 'desc'=='gid')? false: true},
						{ name:'Name', field:'name'/*, visible: */, enableCellEdit: ('name'=='id' || 'name'=='uid' || 'name'=='gid')? false: true},
						{ name:'Appgrps', field:'appgrps'/*, visible: */, enableCellEdit: ('appgrps'=='id' || 'appgrps'=='uid' || 'appgrps'=='gid')? false: true},
						{ name:'Devgrp', field:'devgrp'/*, visible: */, enableCellEdit: ('devgrp'=='id' || 'devgrp'=='uid' || 'devgrp'=='gid')? false: true},
						{ name:'Org', field:'org'/*, visible: */, enableCellEdit: ('org'=='id' || 'org'=='uid' || 'org'=='gid')? false: true},
						{ name:'Dnats', field:'dnats'/*, visible: */, enableCellEdit: ('dnats'=='id' || 'dnats'=='uid' || 'dnats'=='gid')? false: true},
						{ name:'Device Proto', field:'device_proto'/*, visible: */, enableCellEdit: ('device_proto'=='id' || 'device_proto'=='uid' || 'device_proto'=='gid')? false: true},
						{ name:'Type', field:'type'/*, visible: */, enableCellEdit: ('type'=='id' || 'type'=='uid' || 'type'=='gid')? false: true},
						{ name:'Internal', field:'internal'/*, visible: */, enableCellEdit: ('internal'=='id' || 'internal'=='uid' || 'internal'=='gid')? false: true},
						{ name:'Ipport', field:'ipport'/*, visible: */, enableCellEdit: ('ipport'=='id' || 'ipport'=='uid' || 'ipport'=='gid')? false: true},
						{ name:'Httphost', field:'httphost'/*, visible: */, enableCellEdit: ('httphost'=='id' || 'httphost'=='uid' || 'httphost'=='gid')? false: true},
						{ name:'Device', field:'device'/*, visible: */, enableCellEdit: ('device'=='id' || 'device'=='uid' || 'device'=='gid')? false: true},
						{ name:'Segments', field:'segments'/*, visible: */, enableCellEdit: ('segments'=='id' || 'segments'=='uid' || 'segments'=='gid')? false: true},
						{ name:'Device Ports', field:'device_ports'/*, visible: */, enableCellEdit: ('device_ports'=='id' || 'device_ports'=='uid' || 'device_ports'=='gid')? false: true},
						{ name:'Uid', field:'uid'/*, visible: */, enableCellEdit: ('uid'=='id' || 'uid'=='uid' || 'uid'=='gid')? false: true},
					],
					data: $scope.orgsCustom_apps,
						rowTemplate: '<div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsCustom_appsApi.save({ orgid: $scope.orgsCustom_appsSelected.id }, newObject).$promise.then(function(data){
    						$scope.orgsCustom_apps.push(data);
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
							req['appid'] = rowEntity.id;
            				orgsCustom_appsApi.update(req, rowEntity).$promise.then(function(success){
            					// Do nothing , we already updated the table.
            				}, function(error){
            					// TODO: Rollback change.
            				});
          				});
    					}
				};
				$scope.deselect = function(){ 
					orgsCustom_appsSelectionSvc.setorgsCustom_apps();
					$location.path('/orgs');
				}
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsCustom_appsSelected = undefined;
				}
				
				$scope.deleteRow = function(row) {
					$scope.stopped = $timeout.cancel($scope.clicked);
					console.log('Deleting ' + row.entity.id);	
					let req = { };
					req['appid'] = row.entity.id;
					orgsCustom_appsApi.delete(req).$promise.then(function(success){
						for (let i=0; i<$scope.orgsCustom_apps.length; i++){
							if ($scope.orgsCustom_apps[i].id == row.entity.id) {
								$scope.orgsCustom_apps.splice(i, 1);
								refresh();
								break;
							}
						}
					}, function(error){
						console.log(error);
					});

				}
				
				$scope.orgsCustom_appsFields = [
						{key: 'id', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'id', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'appid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'appid', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'desc', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'desc', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'name', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'name', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'appgrps', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'appgrps', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'devgrp', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'devgrp', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'org', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'org', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'dnats', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'dnats', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'device_proto', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'device_proto', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'type', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'type', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'internal', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'internal', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'ipport', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'ipport', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'httphost', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'httphost', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'device', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'device', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'segments', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'segments', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'device_ports', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'device_ports', placeholder: "", disabled: true/*, required: */ 
            					}
          				},
						{key: 'uid', type: 'input',
            					templateOptions: {
                					type: 'input', label: 'uid', placeholder: "", disabled: true/*, required: */ 
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
					
					var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent("appid,desc,name,appgrps,devgrp,org,dnats,device_proto,type,ipport,httphost,device,segments,device_ports\n");
					var dlAnchorElem = document.getElementById('download');
					dlAnchorElem.setAttribute("href",     dataStr     );
					dlAnchorElem.setAttribute("download", "custom_apps.csv");
							
				$scope.closeResults = function(){
					$scope.showUploadResults = false;
				};
}]);