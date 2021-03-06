import getGraph from "./readFromFile.js"
import Vertex from "./Vertex.js"

// const { edgeList, colors } = getGraph("./files/test.txt")
const { edgeList, colors } = getGraph("./files/input.txt")
// const { edgeList, colors } = getGraph("./files/input1.txt")
// const { edgeList, colors } = getGraph("./files/gc_1378296846561000.txt")
// const { edgeList, colors } = getGraph("./files/gc_78317094521100.txt")
//No solution
// const { edgeList, colors } = getGraph("./files/gc_78317097930400.txt")
// const { edgeList, colors } = getGraph("./files/gc_78317097930401.txt")
// const { edgeList, colors } = getGraph("./files/gc_78317100510400.txt")

// Build our graph
let vertices = []
let variables = []
let constraints = []
let set = new Set()

for (const [a, b] of edgeList) {
  set.add(a)
  set.add(b)
}
set.forEach((v) => {
  variables.push(v)
  vertices.push(new Vertex(v))
})

for (const [a, b] of edgeList) {
  let v1 = vertices.find((v) => v.name === a)
  let v2 = vertices.find((v) => v.name === b)
  v1.addNeighbor(v2)
}
for (const v of vertices) {
  let temp = []
  for (const adV of v.adjacentVertices) {
    temp.push(adV.name)
  }
  constraints.push(temp)
}

let domains = new Array(variables.length).fill([...colors])
let assignments = {}
let arcs = []

function fillQueue() {
  for (const [i, v] of variables.entries()) {
    for (const arc of constraints[i]) {
      arcs.push([v, arc])
    }
  }
}

// This function orders the domain values of the variable according to LCV heuristic
function LCV(v, adjList, doms) {
  let order = []
  let color
  for (const c of doms[v]) {
    let min = 100

    for (const i of adjList[v]) {
      let temp = doms[i].length
      if (doms[i].some((x) => x == c)) temp = temp - 1
      if (temp < min) min = temp
    }

    order.push([c, min])
    let o = [...order].sort((a, b) => b[1] - a[1])
    color = [...o.map((a) => a[0])]
  }
  return color
}

function revise(Xi, Xj) {
  let revised = false
  let index = variables.indexOf(Xi)
  for (const x of domains[index]) {
    //state is adjacent
    if (!constraints[index].some((x) => x == Xj)) break
    if (!assignments[Xj]) continue
    //adjacent state has current assignment of X (same color)
    if (assignments[Xj] == x) {
      domains[index] = domains[index].filter((e) => e != x)
      revised = true
    }
  }

  if (!revised && domains[index].length > 0) assignments[Xi] = domains[index][0]

  return revised
}

function AC3() {
  fillQueue()

  while (arcs.length > 0) {
    let arcVars = arcs.shift()
    if (revise(arcVars[0], arcVars[1])) {
      let dIndex = variables.indexOf(arcVars[0])

      if (domains[dIndex].length == 0) {
        console.log("No solution")
        return
      }
      let neighbors = constraints[dIndex]
      neighbors = neighbors.filter((e) => e != arcVars[1])
      for (const xk of neighbors) {
        arcs.push([xk, arcVars[0]])
      }
    }
  }
  console.log(assignments)
}

function getAdjList(vertices) {
  let list = []
  for (const v of vertices) {
    list.push([...v.adjacentVertices.map((v) => v.name)])
  }
  return list
}
// let adjList = getAdjList(vertices)
AC3()
