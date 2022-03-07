import setColors from "./colorGraph.js";
import getGraph from "./readFromFile.js";
import Vertex from "./Vertex.js";

// const { edgeList, colors } = getGraph("./files/input.txt")
// const { edgeList, colors } = getGraph("./files/input1.txt")
// const { edgeList, colors } = getGraph("./files/gc_1378296846561000.txt")
const { edgeList, colors } = getGraph("./files/gc_78317094521100.txt")
// const { edgeList, colors } = getGraph("./files/input1.txt")

// Build our graph
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
let color_config_array = new Array(vertices.length)

function colorGraph(vertex_num, number_of_colours) {
    if (vertex_num == vertices.length)//base condition
    {
        return checkGraph();
    }
    for (let i = 1; i <= number_of_colours; i++) {
        color_config_array[vertex_num] = i;
        if (colorGraph(vertex_num + 1, number_of_colours) == true) {
            return true;
        }
    }
    return false;
}



if (setColors(vertices[0], vertices.length, colors)) {
    for (const vertex of vertices) {
        console.log(vertex.name + " " + vertex.color)
    }
}
else
    console.log("No Solution")

export { buildGraph }