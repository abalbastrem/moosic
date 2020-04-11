const populate = require('./controller/populate_methods');

populate.firstPopulate()
    .then(process.exit)
    .catch(e => "::::: ERROR while populating database -> " + e);