import setColors from "./colorGraph.js";
import getGraph from "./readFromFile.js";
import Vertex from "./Vertex.js";

const { edgeList, colors } = getGraph()

//Build our graph
function buildGraph(edgeList) {
    let vertices = []
    let set = new Set()

    for (const [a, b] of edgeList) {
        set.add(a)
        set.add(b)
    }
    set.forEach(v => {
        vertices.push(new Vertex(v))
    })

    for (const [a, b] of edgeList) {
        let v1 = vertices.find(v => v.name === a)
        let v2 = vertices.find(v => v.name === b)
        v1.addNeighbor(v2)
    }
    return vertices
}

let vertices = buildGraph(edgeList)

//Apply coloring
if (setColors(vertices[0], vertices.length, colors)) {
    for (const vertex of vertices)
        console.log(vertex.name + " " + vertex.color)
}
else
    console.log("No Solution")

export { buildGraph }