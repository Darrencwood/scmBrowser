<!-- Sidebar -->
<div id="sidebar-wrapper">
	<ul class="sidebar-nav">
	{{#.}}
		{{#prop}}
			<li><a href="#!{{& path}}">{{title}}</a></li>
		{{/prop}}
	{{/.}}
	</ul>
</div>