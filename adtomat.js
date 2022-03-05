let n, m, a, b, i, j;

n = con.nextInt();
m = con.nextInt();
let g = new Array(n).fill(new Array(n))

for (i = 0; i < m; i++) {
    a = con.nextInt();
    b = con.nextInt();
    g[a - 1][b - 1] = g[b - 1][a - 1] = 1;
}
for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
        console.log(g[i][j] + " ");
    }
}
