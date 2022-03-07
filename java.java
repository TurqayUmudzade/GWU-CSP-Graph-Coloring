import java.util.Arrays;

public class InterviewBit {
    final int V = 4;
    int[] color;

    boolean isSafeToColor(int v, int[][] graphMatrix, int[] color, int c) {
        // check for each edge
        for (int i = 0; i < V; i++)
            if (graphMatrix[v][i] == 1 && c == color[i])
                return false;
        return true;
    }

    boolean graphColorUtil(int[][] graphMatrix, int m, int[] color, int v) {
        // If all vertices are assigned a color then return true
        if (v == V)
            return true;

        // Try different colors for vertex V
        for (int i = 1; i <= m; i++) {
            // check for assignment safety
            if (isSafeToColor(v, graphMatrix, color, i)) {
                color[v] = i;
                // recursion for checking other vertices
                if (graphColorUtil(graphMatrix, m, color, v + 1))
                    return true;
                // if color doesnt lead to solution
                color[v] = 0;
            }
        }
        // If no color can be assigned to vertex
        return false;
    }

    void printColoringSolution(int color[]) {
        System.out.println("Color schema for vertices are: ");
        for (int i = 0; i < V; i++)
            System.out.println(color[i]);
    }

    /**
     * It returns false if the m colors cannot be assigned
     * otherwise return true and
     * print color assignment result to all vertices.
     */
    boolean graphColoring(int[][] graphMatrix, int m) {
        // Initialize all color values as 0.
        color = new int[V];
        Arrays.fill(color, 0);

        // Call graphColorUtil() for vertex 0
        if (!graphColorUtil(graphMatrix, m, color, 0)) {
            System.out.println(
                    "Color schema not possible");
            return false;
        }

        // Print the color schema of vertices
        printColoringSolution(color);
        return true;
    }

    // Main driver program
    public static void main(String args[]) {
        InterviewBit interviewBit = new InterviewBit();

        int graphMatrix[][] = {
                { 0, 1, 1, 1 },
                { 1, 0, 1, 0 },
                { 1, 1, 0, 1 },
                { 1, 0, 1, 0 },
        };
        int m = 3; // Number of colors
        interviewBit.graphColoring(graphMatrix, m);
    }
}