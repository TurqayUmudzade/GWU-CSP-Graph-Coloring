export default class Vertex {
    constructor(name) {
        this.name = name
        this.adjacentVertices = []
    }

    addNeighbor(vertex) {
        this.adjacentVertices.push(vertex)
        vertex.adjacentVertices.push(this)
    }
}





