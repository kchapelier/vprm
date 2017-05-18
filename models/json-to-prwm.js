"use strict";

var fs = require('fs'),
    prwm = require('../implementations/packed-raw-webgl/prwm/index');

var smoothNefertitiData = require('./json/smooth-nefertiti.json'),
    facetedNefertitiData = require('./json/faceted-nefertiti.json'),
    smoothSuzanneData = require('./json/smooth-heavy-suzanne.json'),
    facetedSuzanneData = require('./json/faceted-heavy-suzanne.json'),
    cubeData = require('./json/cube.json');

function saveAsPRWM (data, meshType, positionsType, normalsType, uvsType, bigEndian, path) {

    var attributes = {};

    if (positionsType) {
        attributes['position'] = {
            type: prwm.AttributeTypes.Float,
            cardinality: 3,
            values: new positionsType(data.vertices)
        };
    }

    if (normalsType) {
        attributes['normal'] = {
            type: prwm.AttributeTypes.Float,
            cardinality: 3,
            values: new normalsType(data.normals)
        };
    }

    if (uvsType) {
        attributes['uv'] = {
            type: prwm.AttributeTypes.Float,
            cardinality: 2,
            values: new uvsType(data.uvs)
        };
    }

    var arrayBuffer = prwm.encodePrwm(
        meshType,
        attributes,
        new Uint16Array(data.indices), //TODO should be Uint32 for suzannes
        bigEndian
    );

    fs.writeFileSync(__dirname + '/' + path, new Buffer(arrayBuffer), { flag: 'w' });
}

saveAsPRWM(smoothNefertitiData, prwm.MeshTypes.TriangleMesh, Float32Array, Float32Array, null, false, './prwm/smooth-nefertiti-LE.prwm');
saveAsPRWM(smoothNefertitiData, prwm.MeshTypes.TriangleMesh, Float32Array, Float32Array, null, true, './prwm/smooth-nefertiti-BE.prwm');
saveAsPRWM(facetedNefertitiData, prwm.MeshTypes.TriangleMesh, Float32Array, Float32Array, null, false, './prwm/faceted-nefertiti-LE.prwm');
saveAsPRWM(facetedNefertitiData, prwm.MeshTypes.TriangleMesh, Float32Array, Float32Array, null, true, './prwm/faceted-nefertiti-BE.prwm');
saveAsPRWM(smoothSuzanneData, prwm.MeshTypes.TriangleMesh, Float32Array, Float32Array, null, false, './prwm/smooth-heavy-suzanne-LE.prwm');
saveAsPRWM(smoothSuzanneData, prwm.MeshTypes.TriangleMesh, Float32Array, Float32Array, null, true, './prwm/smooth-heavy-suzanne-BE.prwm');
saveAsPRWM(facetedSuzanneData, prwm.MeshTypes.TriangleMesh, Float32Array, Float32Array, null, false, './prwm/faceted-heavy-suzanne-LE.prwm');
saveAsPRWM(facetedSuzanneData, prwm.MeshTypes.TriangleMesh, Float32Array, Float32Array, null, true, './prwm/faceted-heavy-suzanne-BE.prwm');
saveAsPRWM(cubeData, prwm.MeshTypes.TriangleMesh, Int8Array, Int8Array, Int8Array, false, './prwm/cube-LE.prwm');
saveAsPRWM(cubeData, prwm.MeshTypes.TriangleMesh, Int8Array, Int8Array, Int8Array, true, './prwm/cube-BE.prwm');