const path = require('path');
const rootDir = require('../util/path');

exports.contactuscontroller = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contact.html'))
}
