<!-- Sidebar -->
<div id="sidebar-wrapper">
	<ul class="sidebar-nav">
	{{#.}}
		{{#ops.get.values}}
		<li><a href="#!{{& path}}">{{title}}</a></li>
		{{/ops.get.values}}
	{{/.}}
	</ul>
</div>