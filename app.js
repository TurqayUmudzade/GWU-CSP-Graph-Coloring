
class Vertex {
    constructor(name) {
        this.name = name;
        this.adjacentVertices = []
        this.colored = false;
        this.color = "";
    }

    addNeighbor(vertex) {
        this.adjacentVertices.push(vertex);
        vertex.adjacentVertices.push(this);
    }

}

class Coloring {
    colorCount = 0
    constructor(colors, N) {
        this.colors = colors;
        this.numberOfVertices = N;
    }

    // Function to check whether it is valid to color with color[colorIndex]
    canColorWith(colorIndex, vertex) {
        for (const nbrvertex of vertex.adjacentVertices) {
            if (nbrvertex.colored && nbrvertex.color === this.colors[colorIndex])
                return false;
        }
        return true;
    }

    setColors(vertex) {
        // Step: 1
        for (let colorIndex = 0; colorIndex < this.colors.length; colorIndex++) {
            // Step-1.1: checking validity
            if (!this.canColorWith(colorIndex, vertex))
                continue;

            // Step-1.2: continue coloring
            vertex.color = this.colors[colorIndex];
            vertex.colored = true;
            this.colorCount++;

            // Step-1.3: check whether all vertices colored?
            if (this.colorCount == this.numberOfVertices) // base case
                return true;


            // Step-1.4: next uncolored vertex
            for (const nbrvertex of vertex.adjacentVertices) {
                if (!nbrvertex.colored) {
                    if (this.setColors(nbrvertex)) {
                        return true;
                    }
                }
            }

        }

        // Step-4: backtrack
        vertex.colored = false;
        vertex.color = "";
        return false;
    }


}

let vertices = []
vertices.push(new Vertex("1"), new Vertex("2"), new Vertex("3"), new Vertex("18"), new Vertex("19"))

vertices[0].addNeighbor(vertices[2]);
vertices[1].addNeighbor(vertices[3]);
vertices[2].addNeighbor(vertices[4]);
vertices[1].addNeighbor(vertices[4]);

let testColors = ["Green", "Blue", "Red",]
console.log(vertices.length);

let coloring = new Coloring(testColors, vertices.length);

let hasSolution = coloring.setColors(vertices[0]);

// check if coloring was successful
if (!hasSolution)
    console.log("No Solution");
else {
    for (const vertex of vertices) {
        console.log(vertex.name + " " + vertex.color);
    }
}