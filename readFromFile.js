import fs from "fs"

export default function getGraph(path = './tests/input1.txt') {
    const edgeList = []
    let colorCount = 0;

    let data = fs.readFileSync(path, 'utf8')
    const lines = data.split("\r\n")
    for (const line of lines) {
        if (line[0] === '#') continue
        if (line.includes('colors')) { colorCount = parseInt(line.split("=")[1]) }
        else {
            let list = line.split(",").map(e => parseInt(e))
            edgeList.push(list)
        }
    }

    let colors = Array.from({ length: colorCount }, (_, i) => "color" + (i + 1))

    return { edgeList, colors }
}