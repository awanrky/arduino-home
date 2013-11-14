/**
 * Created by mark on 11/13/13.
 */

module.exports = function(name, version) {
    this.version = version || 'v0';
    this.name = name;

    var path = [
        '/api/',
        this.version,
        '/',
        this.name
    ].join('');

    this.getPath = function(parameters) {
        if (!parameters) { return path; }

        return [
            path,
            '/',
            parameters
        ].join('');
    }
};
