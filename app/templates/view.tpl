<div id="wrapper">
	{{#ops.get.values}}
	{{#back}}
	<div ng-include="'/views{{& back}}/menu.html'"></div>
	{{/back}}
	{{^back}}
	<div ng-include="'/views/browser/browser_menu.html'" ng-if="!showSelectedRecord"></div>
	<div ng-include="'/views/{{name}}/menu.html'" ng-if="showSelectedRecord"></div>
	{{/back}}
	<!-- /#sidebar-wrapper -->
			
	<!-- Page Content -->
	<div id="page-content-wrapper">
	    <div class="container-fluid">
	        <div class="row">
	            <div class="col-lg-12">
	            	<div>
	            		<div class='row'>
	            			<h2>{{title}}</h2>
	            		</div>
	            		
						<div class='row' >
							<div  class='col-xs-1 col-sm-1 col-md-1' ng-show="!showSelectedRecord">
								<a id="download" class="btn btn-primary" role="button">
									<span class="glyphicon glyphicon-download"></span>
									<span>download</span>
								</a>
							</div>
							<div class='col-xs-1 col-sm-1 col-md-1' ng-show="!showSelectedRecord">
								<a id="upload" class="btn btn-primary" role="button">
									<span class="glyphicon glyphicon-upload"></span>
									<span>upload</span>
								</a>
							</div>
							{{#isSubMenu}}
								<div id="selectedButton" class='col-xs-1 col-sm-1 col-md-1'  ng-click="deselect()" >
								<a id="selectedButton" class="btn btn-primary" role="button" >
									<span>{{=<% %>=}}
									{{<%name%>Selected.name}}
									<%={{ }}=%></span>
								</a>
								</div>
							{{/isSubMenu}}
							{{^isSubMenu}}
								<div id="selectedButton" class='col-xs-1 col-sm-1 col-md-1' ng-show="showSelectedRecord" ng-click="closeSelected()">
								<a id="selectedButton" class="btn btn-primary" role="button" >
									<span>{{=<% %>=}}
									{{<%name%>Selected.name}}
									<%={{ }}=%></span>
								</a>
								</div>
							{{/isSubMenu}}
							
						</div>
						<div id='showRecord' ng-if="showSelectedRecord">
							<div class="row">
								<div class="col-lg-12">
									<form novalidate>
										<formly-form model="{{name}}Selected" fields="{{name}}Fields" form="{{name}}Form">
											<!-- <button type="submit" class="btn btn-primary" ng-disabled="{{name}}Form.$invalid" ng-click="save()">Save</button> -->
										</formly-form>
									</form>
								</div>
							</div>
						</div>
						<div id='uploadResults' ng-if="showUploadResults">
							<div class="row" >
							<div id='closeButton' class='col-xs-1 col-sm-1 col-md-1' ng-click="closeResults()">
								<span class="glyphicon glyphicon-remove "style="font-size:2em;"></span>
							</div>
						</div>	
							<div class="row" >
							<div class="panel panel-default">
								<div class="panel-heading">Upload Results:</div>
									<table class="table">
										<thead>
      										<tr>
        										<th>Index</th>
        										<th>Status</th>
        										<th>Message</th>
      										</tr>
										</thead>
										<tr ng-repeat="x in updateResults">
										{{=<% %>=}}
											<td>{{ $index }}</td>
											<td>{{ x.status }}</td>
											<td>{{ x.message}}</td>
										<%={{ }}=%>
										</tr>
									</table>
								</div>	
							</div>
						</div>
						<div class='row' ng-if="!showSelectedRecord">
							<div class='col-xs-12 col-sm-12 col-md-12'>
								<div ui-grid='{{name}}GridOptions'ui-grid-edit ui-grid-importer {{^isSubMenu}} ui-grid-selection{{/isSubMenu}} ui-grid-resize-columns ui-grid-exporter class='mainGrid'></div>
							</div>
						</div>
					</div>
	            </div>
	        </div>
	    </div>
	</div>
	<!-- /#page-content-wrapper -->
{{/ops.get.values}}
</div>



