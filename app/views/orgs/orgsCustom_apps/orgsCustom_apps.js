'use strict';
angular.module('myApp.orgsCustom_apps', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/orgs/orgsCustom_apps', {
  	templateUrl: 'views/orgs/orgsCustom_apps/orgsCustom_apps.html',
    controller: 'orgsCustom_appsCtrl'
  });
}])
.controller('orgsCustom_appsCtrl',
		[ '$scope', 'orgsCustom_appsApi', '$location', 'orgsCustom_appsSelectionSvc', '$timeout',  'orgsSelectionSvc' , 
			function($scope, orgsCustom_appsApi, $location, orgsCustom_appsSelectionSvc, $timeout  , orgsSelectionSvc  ) {
				$scope.showUploadResults = false;
				$scope.showSelectedRecord = false;
				$scope.updateResults =[];
				
				let id = orgsSelectionSvc.getorgs();
				console.log(id);
				$scope.orgsCustom_apps = orgsCustom_appsApi.query({ orgid: id.id });
				
				$scope.orgsCustom_appsSelected = '';
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
					showFilter : true,
					enableGridMenu: true,
					enableImporter: false,
					rowHeight: 40,
					columnDefs: [
						{ name:'Id', field:'id'/*, visible: */},
						{ name:'Appid', field:'appid'/*, visible: */},
						{ name:'Desc', field:'desc'/*, visible: */},
						{ name:'Name', field:'name'/*, visible: */},
						{ name:'Appgrps', field:'appgrps'/*, visible: */},
						{ name:'Devgrp', field:'devgrp'/*, visible: */},
						{ name:'Org', field:'org'/*, visible: */},
						{ name:'Dnats', field:'dnats'/*, visible: */},
						{ name:'Device Proto', field:'device_proto'/*, visible: */},
						{ name:'Type', field:'type'/*, visible: */},
						{ name:'Internal', field:'internal'/*, visible: */},
						{ name:'Ipport', field:'ipport'/*, visible: */},
						{ name:'Httphost', field:'httphost'/*, visible: */},
						{ name:'Device', field:'device'/*, visible: */},
						{ name:'Segments', field:'segments'/*, visible: */},
						{ name:'Device Ports', field:'device_ports'/*, visible: */},
						{ name:'Uid', field:'uid'/*, visible: */},
					],
					data: $scope.orgsCustom_apps,
					rowTemplate: '<div ng-click="grid.appScope.click(row)" ng-dblclick="grid.appScope.dblclick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
					importerDataAddCallback: function( grid,newObjects ) {
      				},
    				importerObjectCallback: function ( grid, newObject ) {
    					orgsCustom_appsApi.save({ orgid: id.id }, newObject).$promise.then(function(data){
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
      						//$scope.gridApi.rowEdit.on.saveRow($scope,
      						//$scope.saveRow);
    					}
				};
  			     
				$scope.click = function(row){ 
					$scope.clicked = $timeout(function(){
						if ($scope.stopped == false){
                					$scope.orgsCustom_appsSelected = row.entity;
							$scope.showSelectedRecord = true;
							console.log(row.entity);	
							orgsCustom_appsSelectionSvc.setorgsCustom_apps(row.entity);
						}
        				},500);
				}
				
				$scope.dblclick = function(row){
				}
				
				$scope.closeSelected = function() {
					$scope.showSelectedRecord = false;
					$scope.orgsCustom_appsSelected = undefined;
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