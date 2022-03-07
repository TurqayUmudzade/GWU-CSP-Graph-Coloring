let colorCount = 0

// Function to check whether it is valid to color with color[colorIndex]
function canColorWith(colorIndex, vertex, colors) {
    for (const nbrvertex of vertex.adjacentVertices) {
        if (nbrvertex.colored && nbrvertex.color === colors[colorIndex])
            return false
    }
    return true
}

export default function setColors(vertex, numberOfVertices, colors) {
    // Step: 1
    for (let colorIndex = 0; colorIndex < colors.length; colorIndex++) {
        // Step-1.1: checking validity
        if (!canColorWith(colorIndex, vertex, colors))
            continue

        // Step-1.2: continue coloring
        vertex.color = colors[colorIndex]
        vertex.colored = true
        colorCount++

        // Step-1.3: check whether all vertices colored?
        if (colorCount == numberOfVertices) // base case
            return true

        // Step-1.4: next uncolored vertex

        for (const nbrvertex of vertex.adjacentVertices) {
            if (!nbrvertex.colored) {
                if (setColors(nbrvertex, numberOfVertices, colors)) {
                    return true
                }
            }
        }
    }

    // Step-4: backtrack
    vertex.colored = false
    vertex.color = ""
    return false
}