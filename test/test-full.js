'use strict';
var test = require('tap').test;
var lib  = require('../');

var network = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            _id: 1,
            geometry: {
                type: 'LineString',
                coordinates: [
                    [1, 2],
                    [1, 100]
                ]
            }
        },
        {
            type: 'Feature',
            _id: 2,
            geometry: {
                type: 'LineString',
                coordinates: [
                    [1, 2],
                    [1, 100]
                ]
            }
        }
    ]
};

test('complete match', function (t) {
    lib.index(network);
    var matches = lib.match(network.features[0], 0.0000001);
    t.deepEqual(matches, [2]);
    t.end()
});
