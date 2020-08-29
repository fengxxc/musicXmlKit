import { Shape } from "../../src/view/shape";

function main() {
    const ctx: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('can')
    const shape = new Shape(ctx)
    const lineDstc = 10
    let x = 10.5
    let y = 10.5
    shape.drawPoint(x, y, 2, '#333', '#888')
    shape.drawLine(x, y, 30, 30, 1, '#255')
    shape.drawImage('../t1.jpg', 80, y + lineDstc * 18, null, null)

    x = 40.5
    y = 80.5
    shape.drawLine(x, y, 1200, y, 1, '#000')
    shape.drawLine(x, y + lineDstc, 1200, y + lineDstc, 1, '#000')
    shape.drawLine(x, y + lineDstc*2, 1200, y + lineDstc*2, 1, '#000')
    shape.drawLine(x, y + lineDstc*3, 1200, y + lineDstc*3, 1, '#000')
    shape.drawLine(x, y + lineDstc*4, 1200, y + lineDstc*4, 1, '#000')
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
    shape.drawNoteHead(x, y+lineDstc/2, lineDstc, 24, 1, 'transparent', '#00f', 2)
    x += 60

    shape.drawClefG(x, y + lineDstc * 3, lineDstc)
    shape.drawPoint(x, y+lineDstc*3, 2, '#0f0', '#000');
    x += 60
    shape.drawClefG(x, y + lineDstc * 3, lineDstc/2)
    shape.drawPoint(x, y+lineDstc*3, 2, '#0f0', '#000');
    x += 60

    shape.drawClefF(x, y + lineDstc * 1, lineDstc)
    shape.drawPoint(x, y+lineDstc*1, 2, '#0f0', '#000');
    x += 60
    shape.drawClefF(x, y + lineDstc * 1, lineDstc / 2)
    shape.drawPoint(x, y+lineDstc*1, 2, '#0f0', '#000');
    x += 60

    shape.drawClefC(x, y + lineDstc * 2, lineDstc)
    shape.drawPoint(x, y+lineDstc*2, 2, '#0f0', '#000')
    x += 60
    shape.drawClefC(x, y + lineDstc * 2, lineDstc / 2)
    shape.drawPoint(x, y+lineDstc*2, 2, '#0f0', '#000')
    x += 60

    shape.drawClefC(x, y + lineDstc * 3, lineDstc)
    shape.drawPoint(x, y + lineDstc * 3, 2, '#0f0', '#000')
    x += 60

    shape.drawNoteTail(x, y + lineDstc * 1, lineDstc, '#000')
    shape.drawPoint(x, y + lineDstc * 1, 2, '#0f0', '#000')
    x += 60

    shape.drawText(x, y + lineDstc * 0, '4', lineDstc * 2, 'Microsoft Yahei', '#000')
    shape.drawText(x, y + lineDstc * 2, '4', lineDstc * 2, 'Microsoft Yahei', '#000')
    shape.drawPoint(x, y + lineDstc * 0, 2, '#0f0', '#000')
    x += 60

    shape.drawSharp(x, y + lineDstc * 2, lineDstc, '#000')
    shape.drawPoint(x, y + lineDstc * 2, 2, '#0f0', '#000')
    x += 60

    x = 40
    y += lineDstc * 6
    shape.drawLine(x, y, 1200, y, 1, '#000')
    shape.drawLine(x, y + lineDstc, 1200, y + lineDstc, 1, '#000')
    shape.drawLine(x, y + lineDstc*2, 1200, y + lineDstc*2, 1, '#000')
    shape.drawLine(x, y + lineDstc*3, 1200, y + lineDstc*3, 1, '#000')
    shape.drawLine(x, y + lineDstc*4, 1200, y + lineDstc*4, 1, '#000')
    x += 20

    shape.drawRestore(x, y + lineDstc * 2, lineDstc, '#000')
    shape.drawPoint(x, y + lineDstc * 2, 2, '#0f0', '#000')
    x += 40

    shape.drawFlat(x, y + lineDstc * 2, lineDstc, '#000')
    shape.drawPoint(x, y + lineDstc * 2, 2, '#0f0', '#000')
    x += 40

    shape.drawRest_4(x, y + lineDstc * 2, lineDstc, '#000')
    shape.drawPoint(x, y + lineDstc * 2, 2, '#0f0', '#000')
    x += 40

    shape.drawRest_8(x, y + lineDstc * 1.5, lineDstc, '#000')
    shape.drawPoint(x, y + lineDstc * 1.5, 2, '#0f0', '#000')
    x += 40

    shape.drawRest_16(x, y + lineDstc * 1.5, lineDstc, '#000')
    shape.drawPoint(x, y + lineDstc * 1.5, 2, '#0f0', '#000')
    x += 40

    shape.drawRest_32(x, y + lineDstc * 1.5, lineDstc, '#000')
    shape.drawPoint(x, y + lineDstc * 1.5, 2, '#0f0', '#000')
    x += 40

    shape.drawRest_64(x, y + lineDstc * 1.5, lineDstc, '#000')
    shape.drawPoint(x, y + lineDstc * 1.5, 2, '#0f0', '#000')
    x += 40

    shape.drawRest_2(x, y + lineDstc * 1.5, lineDstc, '#000')
    shape.drawPoint(x, y + lineDstc * 1.5, 2, '#0f0', '#000')
    x += 40

    // 全休符
    shape.drawRest_2(x, y + lineDstc * 1, lineDstc, '#000')
    shape.drawPoint(x, y + lineDstc * 1, 2, '#0f0', '#000')
    x += 40
}

main()