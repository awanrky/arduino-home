/**
 * Created by mark on 11/13/13.
 */
'use strict';

function Info (name, version) {
    this.version = version || this.version;
    this.name = name;

    this.path = [
        '/api/',
        this.version,
        '/',
        this.name
    ].join('');
}

Info.prototype = {
    version: 'v0',
    getPath: function(parameters) {
        if (!parameters) { return this.path; }

        return [
            this.path,
            '/',
            parameters
        ].join('');
    }
};

module.exports = exports = Info;


