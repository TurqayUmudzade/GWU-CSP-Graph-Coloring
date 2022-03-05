// Number of vertices in the graph
let V = 4;

/* A utility function to print solution */
function printSolution(color) {
    console.log("Solution Exists:" +
        " Following are the assigned colors ");
    for (let i = 0; i < V; i++)
        console.log("   " + color[i]);
    console.log(" ");
}

// check if the colored
// graph is safe or not
function isSafe(graph, color) {
    // check for every edge
    for (let i = 0; i < V; i++)
        for (let j = i + 1; j < V; j++)
            if (graph[i][j] && color[j] == color[i])
                return false;
    return true;
}


/* This function solves the m Coloring
  problem using recursion. It returns
  false if the m colours cannot be assigned,
  otherwise, return true and prints
  assignments of colours to all vertices.
  Please note that there may be more than
  one solutions, this function prints one
  of the feasible solutions.*/
function graphColoring(graph, m, i, color) {
    // if current index reached end
    if (i == V) {

        // if coloring is safe
        if (isSafe(graph, color)) {

            // Print the solution
            printSolution(color);
            return true;
        }
        return false;
    }

    // Assign each color from 1 to m
    for (let j = 1; j <= m; j++) {
        color[i] = j;

        // Recur of the rest vertices
        if (graphColoring(graph, m, i + 1, color))
            return true;
        color[i] = 0;
    }
    return false;
}

// Driver code

/* Create following graph and
    test whether it is 3 colorable
    (3)---(2)
    | / |
    | / |
    | / |
    (0)---(1)
    */
let graph = [[false, true, true, true],
[true, false, true, false],
[true, true, false, true],
[true, false, true, false]];

let m = 3; // Number of colors

// Initialize all color values as 0.
// This initialization is needed
// correct functioning of isSafe()
let color = new Array(V);
for (let i = 0; i < V; i++)
    color[i] = 0;

if (!graphColoring(graph, m, 0, color))
    console.log("Solution does not exist");
