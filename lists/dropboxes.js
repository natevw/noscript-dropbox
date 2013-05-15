function(head, req) {
    var ddoc = this;
    
    provides("html", function () {
        var html = '';
        html += [
'<!doctype html>',
'<html><head>',
'    <meta charset="utf-8">',
'    <title>Dropboxes</title>',
'</head><body>',
'<h1>Dropboxes</h1>',
'<ul>',null].join('\n');
        var row,
            ddoc_path = req.path.slice(0,3).join('/');
        while (row = getRow()) {
            html +=
'    <li><a href="/' + ddoc_path + '/_show/dropbox/' + row.id + '">' + row.value + '</a></li>\n';
        }
        
        html += [
'</ul>',
'<form method=POST action="/' + ddoc_path + '/_update/dropbox"><input name=name><input type=submit value="Add dropbox"></form>',
'</body></html>'].join('\n');
        return html;
    });
    
    provides("json", function() {
        return JSON.stringify(req, null, 4);
    });
}
