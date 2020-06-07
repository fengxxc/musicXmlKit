import { Shape } from "../../src/view/shape";

function main() {
    const ctx: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('can')
    const shape = new Shape(ctx)
    shape.drawPoint(10, 10, 3, '#333', '#888')
    shape.drawLine(10, 10, 30, 30, 1, '#255')
    shape.drawImage('../t1.jpg', 40, 10, null, null)

    const lineDstc = 40
    let x = 400
    let y = 40
    shape.drawLine(x, y, 1000, y, 1, '#000')
    shape.drawLine(x, y + lineDstc, 1000, y + lineDstc, 1, '#000')
    x += 30
    // shape.drawPoint(420, 30, 1, 'blue', '#000');
    shape.drawNoteHead(x, y+lineDstc/2, lineDstc, 18, 1, '#000', '#000', 0)
    x += 60
    shape.drawNoteHead(x, y+lineDstc/2, lineDstc, 20, 1, '#000', '#000', 0)
    x += 60
    shape.drawNoteHead(x, y+lineDstc/2, lineDstc, 22, 1, '#000', '#000', 0)
    x += 60
    shape.drawNoteHead(x, y+lineDstc/2, lineDstc, 24, 1, '#000', '#000', 0)
    x += 60
    shape.drawNoteHead(x, y+lineDstc/2, lineDstc, 24, 1, '#fff', '#000', 2)
    x += 60
    shape.drawNoteHead(x, y+lineDstc/2, lineDstc, 24, 1, 'transparency', '#00f', 12)
    x += 60

    shape.drawClefG(x, y+lineDstc/2, 1)
    shape.drawPoint(x, y+lineDstc/2, 3, '#00f', '#000');
    x += 60
    shape.drawClefG(x, y+lineDstc/2, .5)
    shape.drawPoint(x, y+lineDstc/2, 3, '#00f', '#000');
    x += 60

    shape.drawClefF(x, y+lineDstc/2, 1)
    shape.drawPoint(x, y+lineDstc/2, 3, '#00f', '#000');
    x += 60
    shape.drawClefF(x, y+lineDstc/2, .5)
    shape.drawPoint(x, y+lineDstc/2, 3, '#00f', '#000');
    x += 60
}

main()