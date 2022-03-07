import getGraph from "./readFromFile.js";
import Vertex from "./Vertex.js";

const { edgeList, colors } = getGraph("./files/input.txt")
// const { edgeList, colors } = getGraph("./files/input1.txt")
// const { edgeList, colors } = getGraph("./files/gc_1378296846561000.txt")
// const { edgeList, colors } = getGraph("./files/gc_78317094521100.txt")

// Build our graph
let vertices = []
let variables = []
let constraints = []
let set = new Set()

for (const [a, b] of edgeList) {
    set.add(a)
    set.add(b)
}
set.forEach(v => {
    variables.push(v)
    vertices.push(new Vertex(v))
})

for (const [a, b] of edgeList) {
    let v1 = vertices.find(v => v.name === a)
    let v2 = vertices.find(v => v.name === b)
    v1.addNeighbor(v2)
}
for (const v of vertices) {
    let temp = []
    for (const adV of v.adjacentVertices) {
        temp.push(adV.name)
    }
    constraints.push(temp)
}
let d = new Array(variables.length).fill([...colors])


// let variables = ["WA", "NT", "SA", "Q", "NSW", "V", "T"]
// let constraints = [["NT", "SA"], ["WA", "SA", "Q"], ["WA", "NT", "Q"], ["SA", "NT", "NSW"], ["SA", "Q", "V"], ["NSW", "SA"], []]
// let d = [["red", "green", "blue"], ["red", "green", "blue"], ["red", "green", "blue"], ["red", "green", "blue"], ["red", "green", "blue"], ["red", "green", "blue"], ["red", "green", "blue"]]

let assignments = {}
let arcs = []


function fillQueue() {
    for (const [i, v] of variables.entries()) {
        for (const arc of constraints[i]) {
            arcs.push([v, arc])
        }
    }
}

function revise(Xi, Xj) {
    let revised = false

    let index = variables.indexOf(Xi)

    for (const x of d[index]) {
        if (!constraints[index].some(x => x == Xj)) break
        if (!assignments[Xj]) continue
        if (assignments[Xj] == x) {
            d[index] = d[index].filter(e => e != x)
            revised = true
        }
    }

    if (!revised && d[index].length > 0)
        assignments[Xi] = d[index][0]

    return revised
}


function AC3() {
    fillQueue()

    while (arcs.length > 0) {
        let arcVars = arcs.shift()
        if (revise(arcVars[0], arcVars[1])) {
            let dIndex = variables.indexOf(arcVars[0])

            if (d[dIndex].length == 0) {
                console.log("No solution");
            }
            let neighbors = constraints[dIndex]
            neighbors = neighbors.filter(e => e != arcVars[1])
            for (const xk of neighbors) {
                arcs.push([xk, arcVars[0]])
            }

        }

    }

    console.log(assignments);
}
AC3()



