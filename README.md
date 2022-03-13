# GWU-CSP-Graph-Coloring
The following code solves Constraint Satisfaction Problem called  "map coloring", where the goal is to color adjacent nodes in a graph.

The main file is "app.js" which you can run using  [NodeJs](https://nodejs.dev/) and the following command 

```sh
node app.js
```

I choose a file from the files folder which you can rename to any other file, and the application is run on windows, on linux you might need to change the file reading file's line 9 from 
```js
const lines = data.split("\r\n")

```
to
```js
const lines = data.split(/\r?\n/)
```
For clarity I added a color generator class with uses all CSS colors to assign them to a vertex, unfortunately, they are limited to 148 colors.

The file reader expects a file containing a line with "color", ignores # comments, takes every other line as a pair of nodes, and builds a graph.
 
The algorithm uses Depth First Search with backtracking to traverse all nodes depth-first, combined with LCV and AC-3. AC-3 is close to a forward checking algorithm and it is used to perform inference of how the domains of neighbors and the vertices connected to the neighbors will be affected if a value is assigned to a vertex. If one of the vertices has an empty domain, then the inference is false and the vertex is assigned a new value and the AC-3 algorithm is applied again.
