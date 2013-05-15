function (doc, req) {
    if (!doc) {
        doc = {'com.stemstorage.dropbox':true};
        if (req.id) doc._id = req.id;
        else doc._id = 'dropbox-' + req.uuid;
        doc.created = new Date().toISOString();
        doc.name = req.form.name;
    } else if (req.form._method === 'DELETE') {
        doc._deleted = true;
        doc._attachments = {};
    } else throw Error("This update is only for creating/deleting dropboxen.");
    
    var ddoc_path = req.path.slice(0,3).join('/'),
        next_url = '/' + ddoc_path + '/_rewrite';
    return [doc, { 
        headers: {'Location': next_url}, code: 303,
        body: '<meta http-equiv="refresh" content="0; url="'+next_url+'">'
    }];
}