function(doc, req) {
    provides("html", function () {
        var html = '';
        html += [
'<!doctype html>',
'<html><head>',
'    <meta charset="utf-8">',
'    <title>Dropbox</title>',
'</head><body>',
'<h1>Dropbox "' + doc._id + '"</h1>',
'<h2>Files</h2>',
'<ul>',null].join('\n');
        
        var ddoc_path = req.path.slice(0,3).join('/'),
            doc_path = req.path[0] + '/' + req.path[req.path.length - 1];
        Object.keys(doc._attachments || {}).forEach(function (file) {
            html +=
'    <li><a href="/' + doc_path + '/' + file + '">' + file + '</a></li>\n';
        });
        
        html += [
'</ul>',
'<form action="/' + doc_path + '" method="post" enctype="multipart/form-data">',
'    <input type=file name="_attachments"><br>',
'    <input type=hidden name="_rev" value="' + doc._rev + '">',
'    <input type=submit>',
'</form>',
'<hr>',
'<form method=POST action="/' + ddoc_path + '/_update/dropbox/'+ doc._id + '"><input name="_method" value="DELETE" type=hidden><input type=submit value="Delete!"></form>',
'</body></html>'].join('\n');
        return html;
    });
    
    // for debugging/reference
    provides("json", function() {
        return JSON.stringify(req, null, 4);
    });
}
