'use strict';
var test = require('tap').test;
var lib = require('../');

var network = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            _id: 1,
            geometry: {
                type: 'LineString',
                coordinates: [
                    [0, 0],
                    [0, 100]
                ]
            }
        },
        {
            type: 'Feature',
            _id: 2,
            geometry: {
                type: 'LineString',
                coordinates: [
                    [0, 0],
                    [0, 20]
                ]
            }
        },
        {
            type: 'Feature',
            _id: 3,
            geometry: {
                type: 'LineString',
                coordinates: [
                    [0, 0],
                    [0, 80],
                    [40, 80]
                ]
            }
        }
    ]
};

test('partial matches', function (t) {
    lib.index(network);
    var matches = lib.match(network.features[0], 0.0001);
    t.deepEqual(matches, [
        [[0, 0], [0, 20], 2],
        [[0, 0], [0, 80], 3],
        [[0, 0], [0, 80], 3]
    ])
    t.end();
});
