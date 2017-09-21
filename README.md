## networkmatch

Modified from [mapbox/linematch](https://github.com/mapbox/linematch).

### usage

```(javascript)
var { index, match, clearIndex } = require('linematch');
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
index(network);
console.log(network.features[1], 0.0001);
// [ [ [ 0, 0 ], [ 0, 100 ], 1 ], [ [ 0, 0 ], [ 0, 80 ], 3 ] ]
clearIndex();
```

### index(FeatureCollection)

Indexes a geojson FeatureCollection. Each feature must have a unique `_id` property, otherwise it will be included in it's own matches.

### match(feature, precision)

Match a single feature against the indexed collection. You must call `index()` before running this. It returns a list of matching segments (not features!):

```(javascript)
[
   [ [seg_start_x, seg_start_y], [seg_end_x, seg_end_y], feature_id ],
   [ [seg_start_x, seg_start_y], [seg_end_x, seg_end_y], feature_id ],
   ...
]
```

### clearIndex()

Clears the index. You should use this before indexing a new FeatureCollection to compare against.
