<div><h2>{{title}}</h2>
	<div class='row'>
		<div id='upload' class='col-xs-12 col-sm-12 col-md-12'>
			<span class="glyphicon glyphicon-upload "
style="font-size:3em;"></span>
		</div>
	</div>
	<div class='row'>
		<div class='col-xs-12 col-sm-12 col-md-12'>
			<div id='grid1' ui-grid='{{camel}}GridOptions'
ui-grid-edit ui-grid-importer ui-grid-resize-columns class='grid'></div>
		</div>
	</div>
</div>
	<div class="row" ng-if="isSelected()">
		<div class="col-lg-12">
			<form novalidate>
				<h2>{{title}}</h2>
					<formly-form model="{{camel}}Selected"
fields="{{camel}}Fields" form="{{camel}}Form">
						<button type="submit" class="btn
btn-primary" ng-disabled="{{camel}}Form.$invalid"
ng-click="save()">Save</button>
					</formly-form>
			</form>
		</div>
</div>
