import Graph from "./graph.js"
import fs from "fs"

const adjacencyList = []
let colors = 0;

//Read from file
let data = fs.readFileSync('./tests/input1.txt', 'utf8')
const lines = data.split("\r\n")
for (const line of lines) {
    if (line[0] === '#') continue
    if (line.includes('colors')) { colors = parseInt(line.split("=")[1]) }
    else {
        let list = line.split(",").map(e => parseInt(e))
        adjacencyList.push(list)
    }
}

let g = new Graph(adjacencyList)
console.log(g.adjacencyList);

let edgeListToMatrix = (graph) => {

    let n = graph.adjacencyList.length
    let g = new Array(n).fill(new Array(n).fill(0))
    console.log(graph.adjacencyList);
    for (const [a, b] of graph.adjacencyList) {
        console.log(a, b);
        g[a - 1][b - 1] = 1;
        g[b - 1][a - 1] = 1;
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // console.log(g[i][j] + " ");
        }
    }
    return g
}

console.log(edgeListToMatrix(g));
