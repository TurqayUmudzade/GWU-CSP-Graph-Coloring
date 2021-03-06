import fs from "fs"
import generateColorArray from "./colorGenerator.js";

export default function getGraph(path = './files/input1.txt') {
    const edgeList = []
    let colorCount = 0;

    let data = fs.readFileSync(path, 'utf8')
    const lines = data.split("\r\n")
    for (const line of lines) {
        if (line[0] === '#') continue
        if (line.includes('colors')) { colorCount = parseInt(line.split("=")[1]) }
        else {
            let list = line.split(",").map(e => parseInt(e))
            if (list && !isNaN(list[0]))
                edgeList.push(list)
        }
    }

    let colors = generateColorArray(colorCount)

    return { edgeList, colors }
}