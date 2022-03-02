const { xml2js } = require('xml-js')

module.exports = function(xml) {
    const json = xml2js(xml, { compact: true });

    return json;
}