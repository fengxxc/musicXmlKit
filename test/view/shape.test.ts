import RectBound from "../../src/view/rectBound";
import RenderHelper from "../../src/view/renderHelper";
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
    const angle_18: number = 18;
    const rb0: RectBound = shape.drawNoteHead(x, y+lineDstc/2, lineDstc, angle_18, 1, '#000', '#000', 0)
    console.log('rb0 render  width: ' + rb0.Width)
    console.log('rb0 compute width: ' + RenderHelper.computeNoteHeadWidth(lineDstc, 1, angle_18))
    console.log('----------------------------------------------------');
    shape.drawMultiHorizontalLine(x - RenderHelper.computeNoteHeadWidth(lineDstc, 1, angle_18) / 2, y+lineDstc/2, RenderHelper.computeNoteHeadWidth(lineDstc, 1, angle_18), 2, '#0f0', 1, 1, 0)

    x += 60
    const angle_20: number = 20;
    const rb1: RectBound = shape.drawNoteHead(x, y+lineDstc/2, lineDstc, angle_20, 1, '#000', '#000', 0)
    console.log('rb1 render  width: ' + rb1.Width)
    console.log('rb1 compute width: ' + RenderHelper.computeNoteHeadWidth(lineDstc, 1, angle_20))
    console.log('----------------------------------------------------');
    shape.drawMultiHorizontalLine(x - RenderHelper.computeNoteHeadWidth(lineDstc, 1, angle_20) / 2, y+lineDstc/2, RenderHelper.computeNoteHeadWidth(lineDstc, 1, angle_20), 2, '#0f0', 1, 1, 0)

    x += 60
    const angle_22: number = 22;
    const rb2: RectBound = shape.drawNoteHead(x, y+lineDstc/2, lineDstc, angle_22, 1, '#000', '#000', 0)
    console.log('rb2 render  width: ' + rb2.Width)
    console.log('rb2 compute width: ' + RenderHelper.computeNoteHeadWidth(lineDstc, 1, angle_22))
    console.log('----------------------------------------------------');

    x += 60
    const angle_24: number = 24;
    const rb3: RectBound = shape.drawNoteHead(x, y+lineDstc/2, lineDstc, angle_24, 1, '#000', '#000', 0)
    console.log('rb3 render  width: ' + rb3.Width)
    console.log('rb3 compute width: ' + RenderHelper.computeNoteHeadWidth(lineDstc, 1, angle_24))
    console.log('----------------------------------------------------');

    x += 60
    const rb4: RectBound = shape.drawNoteHead(x, y+lineDstc/2, lineDstc, angle_24, 1, '#fff', '#000', 2)
    x += 60
    const rb5: RectBound = shape.drawNoteHead(x, y+lineDstc/2, lineDstc, angle_24, 1, 'transparent', '#00f', 2)
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

    shape.drawText(x, y + lineDstc * 0, '4', lineDstc * 2, 'Consolas', '#000')
    shape.drawText(x, y + lineDstc * 2, '4', lineDstc * 2, 'Consolas', '#000')
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