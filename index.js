'use strict';

var rbush = require('rbush');
var matchSegment = require('./segment');

module.exports.index = index;
module.exports.clearIndex = clearIndex;
module.exports.match = match;

var tree;
function index(featureCollection) {
    tree = indexFeatures(featureCollection.features);
}

function clearIndex() {
    tree = null;
}

function match(feature, threshold) {
    if (!tree) {
        throw new Error('You must call index() first');
    }

    var segments = [],
        matches = [],
        matched = {};

    featureToSegments(feature, segments);
    matched[feature._id] = true;

    while (segments.length) {
        var seg = segments.pop();
        var other = tree.search(segmentBBox(seg, threshold));

        for (var j = 0; j < other.length; j++) {
            if (matched[other[j][4][2]]) continue;
            else if (matchSegment(seg, other[j][4], threshold, segments)) {
                matched[other[j][4][2]] = true;
                matches.push(other[j][4]);
            }
        }
    }

    return matches;
}

function indexFeatures(features) {
    var segments = featuresToSegments(features),
        bboxes = [];
    for (var i = 0; i < segments.length; i++) {
        bboxes.push(segmentBBox(segments[i], 0));
    }
    return rbush().load(bboxes);
}

function segmentBBox(seg, r) {
    var a = seg[0],
        b = seg[1];
    return [
        Math.min(a[0], b[0]) - r, // minX
        Math.min(a[1], b[1]) - r, // minY
        Math.max(a[0], b[0]) + r, // maxX
        Math.max(a[1], b[1]) + r, // maxY
        seg
    ];
}

function featuresToSegments(features) {
    var segments = [];
    for (var i = 0; i < features.length; i++) {
        featureToSegments(features[i], segments);
    }
    return segments;
}

function featureToSegments(feature, segments) {
    for (var j = feature.geometry.coordinates.length - 1; j > 0; j--) {
        var a = feature.geometry.coordinates[j - 1],
        b = feature.geometry.coordinates[j];
        if (a[0] !== b[0] || a[1] !== b[1]) segments.push([a, b, feature._id]);
    }
}
