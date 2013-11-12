/**
 * Created by mark on 11/11/13.
 */

var schema = require('../schemas/tmp36');

module.exports.tmp36 = function(server) {

    // Sample Rest Call

    server.get('/api/v0/tmp36/id/:id', function(req, res){
        schema.getById(req.params.id, function(error, documents) {
            if (error) {
                res.send(500, {error: error.message});
                return;
            }
            res.send(documents);
        });
    });

}
