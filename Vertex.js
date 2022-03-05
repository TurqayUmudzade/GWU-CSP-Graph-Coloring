export default class Vertex {
    constructor(name) {
        this.name = name
        this.adjacentVertices = []
        this.colored = false
        this.color = ""
    }

    addNeighbor(vertex) {
        this.adjacentVertices.push(vertex)
        vertex.adjacentVertices.push(this)
    }
}





