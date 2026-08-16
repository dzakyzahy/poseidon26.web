const fs = require('fs');
const buffer = fs.readFileSync('./public/models/trash_and_debris.glb');
const jsonLen = buffer.readUInt32LE(12);
const jsonChunk = buffer.toString('utf8', 20, 20 + jsonLen);
const gltf = JSON.parse(jsonChunk);
gltf.nodes.forEach((n, i) => console.log('Node ' + i + ': ' + n.name + ' (mesh: ' + n.mesh + ')'));
