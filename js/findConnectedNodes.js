var data = require('./x.js')
var x = data
var inId = "209b213fd0304cc694c3a56b96860d80"

function allEdges() {
    return Object.values(x.extendedData.edges)
}
var allEdge = allEdges()
// 查找连通分支上的节点
function findConnectedNodes(edgeSpace, targetId, collector) {
    for (var edge of edgeSpace) {
        if (edge.outVertexId == targetId) {
            collector[edge.inVertexId] = true
            findConnectedNodes(edgeSpace, edge.inVertexId, collector)
        }
    }
}
var col = {}
findConnectedNodes(allEdge, inId, col)
console.log(col)

console.log(Object.keys(col).length, Object.keys(x.extendedData.vertices).length)
