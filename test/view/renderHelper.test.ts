import RenderHelper from "../../src/view/renderHelper"

test('RenderHelper test', () => {
    const line1 = RenderHelper.getLineByPitchSign('C', 4, 'G', 2);
    expect(line1).toBe(0);

    const line2 = RenderHelper.getLineByPitchSign('A', 4, 'G', 2);
    expect(line2).toBe(2.5);
})