function(doc) {
    if (doc['com.stemstorage.dropbox']) emit(doc.last_modified, doc.name);
}
