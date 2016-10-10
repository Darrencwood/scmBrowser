<div id="wrapper">
	{{#ops.get.values}}
	{{#back}}
	<div ng-include="'/views{{& path}}/menu.html'"></div>
	{{/back}}
	{{^back}}
	<div ng-include="'/views/main/main_menu.html'"></div>
	{{/back}}
	<!-- /#sidebar-wrapper -->
			
	<!-- Page Content -->
	<div id="page-content-wrapper">
	    <div class="container-fluid">
	        <div class="row">
	            <div class="col-lg-12">
	            	<div>
	            		<h2>{{title}}</h2>
						<div class='row'>
							<div class='col-xs-1 col-sm-1 col-md-1'>
			<a id='download'>
				<span class="glyphicon glyphicon-download "style="font-size:3em;"></span>
			</a>
		</div>
							<div id='upload' class='col-xs-1 col-sm-1 col-md-1'>
			<span class="glyphicon glyphicon-upload "style="font-size:3em;"></span>
		</div>
						</div>
						<div id='showRecord' ng-if="showSelectedRecord">
							<div class="row" >
								<div id='closeSelectedRecord' class='col-xs-1 col-sm-1 col-md-1' ng-click="closeSelected()">
									<span class="glyphicon glyphicon-remove "style="font-size:2em;"></span>
								</div>
							</div>	
							<div class="row">
								<div class="col-lg-12">
									<form novalidate>
										<h2>{{title}}</h2>
										<formly-form model="{{name}}Selected" fields="{{name}}Fields" form="{{name}}Form">
											<button type="submit" class="btn btn-primary" ng-disabled="{{name}}Form.$invalid" ng-click="save()">Save</button>
										</formly-form>
									</form>
								</div>
							</div>
						</div>
						<div id='uploadResults' ng-if="showUploadResults">
							<div class="row" >
							<div id='upload' class='col-xs-1 col-sm-1 col-md-1' ng-click="closeResults()">
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
						<div class='row'>
							<div class='col-xs-12 col-sm-12 col-md-12'>
								<div id='grid1' ui-grid='{{name}}GridOptions'ui-grid-edit ui-grid-importer ui-grid-resize-columns class='grid'></div>
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



