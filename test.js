let t = '\n' +
	'<div class="row">\n' +
	'\t<h1><%= title %></h1>\n' +
	'</div>\n' +
	'\n' +
	'<div class="row">\n' +
	'\t<div class="col-sm-3"><%= __(\'Author\') %>: <%= author %></div>\n' +
	'\t<div class="col-sm-3"><%= __(\'Date published\') %>: <%= publish_at %></div>\n' +
	'</div>\n' +
	'\n' +
	'<div class="dline"></div>\n' +
	'\n' +
	'<div class="row">\n' +
	'\t<div><%- text %></div>\n' +
	'</div>\n' +
	'\n' +
	'<% if (user) { %>\n' +
	'\t<% include detail-comments.ejs %>\n' +
	'<% } %>\n' +
	'\n';
const ejsLint = require('ejs-lint');
ejsLint(t);
