import { Config } from "../config";
import { Backup } from "../model/interface/backup";
import { Note } from "../model/interface/note";
import { RootNode } from "../model/rootNode";
import { MxIterator } from "./mxIterator";
import MxToken, { ClefToken } from "./mxToken";
import RectBound from "./rectBound";
import RenderHelper from "./renderHelper";
import { Shape } from "./shape";
import NoteRenderInfo from "./noteRenderInfo";
import Guide from "./guide";

export class Render {
    /**
     * 渲染乐谱执行入口
     * @static
     * @param {HTMLCanvasElement} canvasDom canvas的dom对象
     * @param {RootNode} musicXmlNode 解析musicXml后的结构化对象
     * @memberof Render
     */
    static action(canvasDom: HTMLCanvasElement, musicXmlNode: RootNode): void {
        const cfg = new Config(canvasDom, musicXmlNode);
        const gu = new Guide(cfg);
        const shape: Shape = new Shape(canvasDom);
        const iterator = MxIterator.getIterator(musicXmlNode);
        let entry = null;
        let noteRenderInfoTemp: NoteRenderInfo[] = [];
        let measureAltersTemp: Record<string, number> = null;
        let token: MxToken = null;
        while (!(entry = iterator.next()).done) {
            token = entry.value;
            if (token.SpiritType == 'note') {
                // 做渲染音符之前应该做的事...
                [noteRenderInfoTemp, measureAltersTemp] = Render.beforeRenderNote(gu, token, cfg, shape, noteRenderInfoTemp, measureAltersTemp);
                // 开始渲染音符和他的朋友们
                const note: Note = <Note>token.Spirit;
                let _y = gu.Y(note.Staff());
                let noteWidth: number = 0;
                if (note.Rest()) {
                    // 画休止符
                    noteWidth = Render.renderRestSign(shape, gu.X, _y, note.Type(), cfg.LineSpace, cfg.LineColor).Width;
                } else {
                    // 画音符
                    const clefToken: ClefToken = token.getClefByNumber(note.Staff());
                    const line: number = RenderHelper.getLineByPitchSign(note.PitchStep(), note.PitchOctave(), clefToken.Sign, clefToken.Line);
                    _y += (cfg.LineSpace * 5) - (line * cfg.LineSpace);
                    // 如果是和弦音，保证横坐标方向上跟上个音符一样
                    if (note.Chord()) // 和弦音在x轴不前进，固退回
                        gu.stepAhead(- Render.getNoteStepXDistance(note.Duration(), token.Divisions, cfg.SingleDurationWidth, noteRenderInfoTemp[noteRenderInfoTemp.length-1].HeadWidth));
                    // 画符头
                    if (
                        noteRenderInfoTemp.length > 0
                        && gu.CurViewRow != noteRenderInfoTemp[noteRenderInfoTemp.length - 1].ViewRow
                        && note.Beams()[0] != 'begin'
                    ) {
                        const prev = noteRenderInfoTemp[noteRenderInfoTemp.length - 1];
                        // 到右边距了，必须换行了，那就用两个虚拟音分割成两组
                        // 具体的渲染策略是：当前复制一个（虚拟音）放到本行最后；上一个复制一个（虚拟音）放到下一行开头。注意viewRow参数
                        const currVirtualEnd = NoteRenderInfo.instanceVirtualDisplayed(cfg.PaddingLeft + cfg.ContentWidth, _y - gu.getYStepDistance(), prev.ViewRow, note.Dot(), note.Duration(), token.Divisions, note.Stem());
                        const nextVirtualStart = NoteRenderInfo.instanceVirtualDisplayed(gu.X, prev.Y + gu.getYStepDistance(), gu.CurViewRow, prev.IsDot, prev.Duration, prev.Divisions, prev.Stem);
                        noteRenderInfoTemp.push(currVirtualEnd);
                        noteRenderInfoTemp.push(nextVirtualStart);
                        const xOffset = Render.getNoteStepXDistance(prev.Duration, prev.Divisions, cfg.SingleDurationWidth, prev.HeadWidth) - (cfg.PaddingLeft + cfg.ContentWidth - prev.X);
                        gu.stepAhead(xOffset);
                    }
                    noteWidth = RenderHelper.computeNoteHeadWidth(cfg.LineSpace, 0, cfg.NoteHeadAngle);
                }
                noteRenderInfoTemp.push(NoteRenderInfo.instance(gu.X, _y, gu.CurViewRow, noteWidth, token, note));
                gu.stepAhead(Render.getNoteStepXDistance(note.Duration(), token.Divisions, cfg.SingleDurationWidth, noteWidth));
            } else if (token.SpiritType == 'backup') {
                const backup: Backup = <Backup>token.Spirit;
                const backDistance = (() => {
                    let res = 0;
                    let backupDuration: number = backup.Duration();
                    for (let i = noteRenderInfoTemp.length - 1; i >= 0; i--) {
                        const noteRenderInfo: NoteRenderInfo = noteRenderInfoTemp[i];
                        backupDuration -= noteRenderInfo.Duration;
                        if (backupDuration <= 0) {
                            const des = gu.X - noteRenderInfo.X;
                            res = des < 0 ? cfg.ContentWidth + des : des;
                            break;
                        }
                    }
                    return res;
                })();
                gu.stepAhead(-backDistance);
            } else if (token.SpiritType == 'direction') {
                // TODO
            }
            // TODO
        }
        measureAltersTemp = Render.completeRenderMeasureNotes(noteRenderInfoTemp, measureAltersTemp, shape, token.TimeBeats, token.TimeBeatType, cfg.LineSpace / 2 * 7, cfg.LineWidth , cfg.LineWidth * 3 
                                            , cfg.LineSpace , cfg.NoteBeamSlopeFactor, cfg.BeamInfoFrom, gu.getYStepDistance(), cfg.LineColor);
    }

    /**
     * 渲染 升/降/还原/... 记号
     * @private
     * @static
     * @param {Record<string, number>} measureAltersTemp
     * @param {string} noteStep
     * @param {number} noteAlter
     * @param {Shape} shape
     * @param {number} x
     * @param {number} noteWidth
     * @param {number} y
     * @param {number} lineSpace
     * @param {string} lineColor
     * @return {Record<string, number>}
     * @memberof Render
     */
    private static renderNoteAlter(measureAltersTemp: Record<string, number>, noteStep: string, noteAlter: number, shape: Shape, x: number, noteWidth: number, y: number, lineSpace: number, lineColor: string): Record<string, number> {
        let alter: number = null;
        [alter, measureAltersTemp] = RenderHelper.getNoteAlter(measureAltersTemp, noteStep, noteAlter);
        switch (alter) {
            case 2: // TODO 重升
                break;
            case 1:
                shape.drawSharp(x - Math.round(noteWidth / 2), y, lineSpace, lineColor);
                break;
            case 0:
                shape.drawRestore(x - Math.round(noteWidth / 2), y, lineSpace, lineColor);
                break;
            case -1:
                shape.drawFlat(x - Math.round(noteWidth / 2), y, lineSpace, lineColor);
                break;
            case -2: // TODO 重降
                break;
            default:
                break;
        }
        return measureAltersTemp;
    }

    /**
     * 完成本小节的所有符桿、符尾、符杠的渲染
     * @private
     * @static
     * @param {NoteRenderInfo[]} noteRenderInfos  本小节的音符渲染信息
     * @param {Shape} shape
     * @param {number} beats
     * @param {number} beatType
     * @param {number} noteStemHeight   符桿高度
     * @param {number} noteStemWidth    符桿宽度
     * @param {number} noteBeamWidth    符杠宽度
     * @param {number} lineSpace
     * @param {number} noteBeamSlopeFactor
     * @param {string} beamInfoFrom 符杠连接信息来自于 musicxml | auto
     * @param {number} yStepDistance    y轴方向上前进一步（也就是换行）所需的距离
     * @param {string} colorHex
     * @returns {Record<string, number>} 本小节最新的升降信息
     * @memberof Render
     */
    private static completeRenderMeasureNotes(
        noteRenderInfos: NoteRenderInfo[], measureAltersTemp: Record<string, number>, shape: Shape, beats: number, beatType: number, noteStemHeight: number
        , noteStemWidth: number, noteBeamWidth: number, lineSpace: number, noteBeamSlopeFactor: number, beamInfoFrom: string, yStepDistance: number, colorHex: string
    ): Record<string, number> {
        // 设4分音符长度为1，在一组连体音符中有多少个4分音符长度
        const quarterCountInSiamesed: number = RenderHelper.computeQuarterCountInSiamesed(beats, beatType);
        let _start: number = 0, _end: number = 0;
        for (let i = 0; i < noteRenderInfos.length; i++) {
            const noteInfo: NoteRenderInfo = noteRenderInfos[i];
            if (noteInfo.IsRest) continue;

            // 根据musicXml里的beam标签划分相连的符杠
            if (beamInfoFrom == 'musicxml') {
                if (noteInfo.BeamType == 1) {
                    _start = _end = i;
                    for (; _end < noteRenderInfos.length; _end++) {
                        const nri: NoteRenderInfo = noteRenderInfos[_end];
                        if (
                            ( nri.BeamType == 2 && _end == noteRenderInfos.length - 1 )
                            || ( nri.BeamType == 2 && (noteRenderInfos[_end+1] && noteRenderInfos[_end+1].BeamType != 2) )
                        ) break;
                    }
                    measureAltersTemp = Render.renderSingleOrTupletNotes(noteRenderInfos.slice(_start, _end + 1), measureAltersTemp, shape, noteStemHeight, noteStemWidth, noteBeamWidth //
                                                , lineSpace, noteInfo.HeadWidth / 2, noteBeamSlopeFactor, yStepDistance, colorHex);
                    i = _end;
                    continue;
                }
            } 
            // 根据拍号划分相连的符杠
            else {
                if (noteInfo.Duration / noteInfo.Divisions < 1) {
                    _start = _end = i;
                    for (let timeLen = 0; _end < noteRenderInfos.length; _end++) {
                        const nri: NoteRenderInfo = noteRenderInfos[_end];
                        if (
                            nri.IsRest
                            || _end > _start && nri.Staff != noteRenderInfos[_end - 1].Staff
                            || nri.Duration / nri.Divisions >= 1
                        ) break;
                        const tl = nri.IsChord ? 0 : nri.Duration / nri.Divisions
                        if (timeLen + tl > quarterCountInSiamesed)
                            break;
                        timeLen += tl;
                    }
                    measureAltersTemp = Render.renderSingleOrTupletNotes(noteRenderInfos.slice(_start, _end), measureAltersTemp, shape, noteStemHeight, noteStemWidth, noteBeamWidth //
                                                , lineSpace, noteInfo.HeadWidth / 2, noteBeamSlopeFactor, yStepDistance, colorHex);
                    i = _end - 1;
                    continue;
                }
            }
            // 渲染没有符杠（可能有符尾）的音符或和弦音
            _start = _end = i;
            for (; _end < noteRenderInfos.length; _end++)
                if ( _end == noteRenderInfos.length - 1 || !noteRenderInfos[_end + 1].IsChord) 
                    break;

            measureAltersTemp = Render.renderSingleOrTupletNotes(noteRenderInfos.slice(_start, _end + 1), measureAltersTemp, shape, noteStemHeight, noteStemWidth, noteBeamWidth //
                                        , lineSpace, noteInfo.HeadWidth / 2, noteBeamSlopeFactor, yStepDistance, colorHex);
            i = _end;
        }

        return measureAltersTemp;
    }

    /**
     * 渲染符尾
     * @private
     * @static
     * @param {Shape} shape
     * @param {number} x
     * @param {number} y
     * @param {number} stemDire 符桿朝向 1 是下；-1是上
     * @param {number} count 有几条符尾
     * @param {number} lineSpace
     * @param {string} colorHex
     * @returns {RectBound}
     * @memberof Render
     */
    private static renderNoteTails(shape: Shape, x: number, y: number, stemDire: number, count: number, lineSpace: number, colorHex: string): RectBound {
        for (let i = 0; i < count; i++)
            if (stemDire == -1) shape.drawNoteTail(x, y - stemDire * lineSpace * i, lineSpace, colorHex);
            else                shape.drawNoteTailFlip(x, y - stemDire * lineSpace * i,lineSpace, colorHex);
        return null;
    }

    /**
     * 渲染连音音符的符桿、符杠
     * @private
     * @static
     * @param {NoteRenderInfo[]} noteRenderInfos  要渲染的一组连音音符信息
     * @param {Record<string, number>} measureAltersTemp 本小节最新的升降信息
     * @param {number} start   包括
     * @param {number} end     包括
     * @param {number} noteStemHeight   符桿高度 
     * @param {number} noteStemWidth    符桿宽度
     * @param {number} noteBeamWidth    符杠宽度
     * @param {number} singleBeamLength
     * @param {number} beamSlopeFactor  符杠倾斜系数 0~1
     * @param {number} yStepDistance    y轴方向上前进一步（也就是换行）所需的距离
     * @param {string} colorHex
     * @param {number} tangent  符杠倾斜角度的正切值（可空）
     * @returns {Record<string, number>} 本小节最新的升降信息
     * @memberof Render
     */
    private static renderSingleOrTupletNotes(
        noteRenderInfos: NoteRenderInfo[], measureAltersTemp: Record<string, number>, shape: Shape, noteStemHeight: number, noteStemWidth: number, noteBeamWidth: number
        , lineSpace: number, singleBeamLength: number, beamSlopeFactor: number, yStepDistance: number, colorHex: string, tangent?: number
    ): Record<string, number> {
        let nris: NoteRenderInfo[] = noteRenderInfos;
        // 符桿朝上吗？1 是下；-1是上
        const stemDire: number = nris[0].Stem == 'up' ? -1 : 1;

        // 符杠倾斜角度的正切值
        const tan = tangent || RenderHelper.computeBeamTangent(nris[0], nris[nris.length - 1], yStepDistance, beamSlopeFactor);
        // 初始符杠基准点Y
        let baseTailY: number = RenderHelper.computeTupletNotesBaseTailY(nris, stemDire, tan, noteStemHeight);
        // 初始符杠基准点X
        let baseTailX: number = nris[0].X + Math.floor(nris[0].HeadWidth / 2) * (-stemDire);

        let prevprev: NoteRenderInfo = null;
        let prev: NoteRenderInfo = null;
        let self: NoteRenderInfo = null;
        let chord: boolean = false;
        for (let i = 0; i <= nris.length; i++) {

            /* 多个和弦音处理成一个，最后一个用没有实际意义的虚拟音占位 */
            if (i != nris.length) {
                if (!nris[i].isVirtual()) {
                    Render.renderNoteHeader(shape, nris[i].X, nris[i].Y, nris[i].Divisions, nris[i].Duration, lineSpace, 22, 1, colorHex, colorHex);
                    // 画升降号（如果有的话）
                    measureAltersTemp = Render.renderNoteAlter(measureAltersTemp, nris[i].PitchStep, nris[i].PitchAlter, shape, nris[i].X, nris[i].HeadWidth, nris[i].Y, lineSpace, colorHex);

                    // 画加线（如果有的话）
                    const line: number = RenderHelper.getLineByPitchSign(nris[i].PitchStep, nris[i].PitchOctave, nris[i].ClefSign, nris[i].ClefLine);
                    Render.renderLedgerLine(shape, nris[i].X, nris[i].Y, line, lineSpace, nris[i].HeadWidth * 3 / 2, 1, colorHex);

                    // 画符点
                    if (nris[i].IsDot)
                        shape.drawPoint(nris[i].X + nris[i].HeadWidth, nris[i].Y + (line%1 - 0.5) * lineSpace, lineSpace / 8, colorHex, colorHex); 
                }

                // self = nris[i];
                // while (i < nris.length - 1 && nris[i + 1].IsChord) {
                //     // if (self.MeasureNo == 2) debugger;
                //     const _self: NoteRenderInfo = nris[i];
                //     shape.drawText(_self.X+6, _self.Y+0, 's', lineSpace, 'Consolas', colorHex)
                //     const _next: NoteRenderInfo = nris[i + 1];
                //     shape.drawText(_next.X+6, _next.Y+0, 'n', lineSpace, 'Consolas', colorHex)
                //     self = (_self.Y * stemDire < _next.Y * stemDire) ? _self : _next;
                    // shape.drawText(_self.X+4, _self.Y+8, ((_self.Y * stemDire < _next.Y * stemDire) ? 's' : 'n'), lineSpace, 'Consolas', '#00f')
                //     i++;
                // }

                if (i < nris.length - 1 && nris[i + 1].IsChord) {
                    const _self: NoteRenderInfo = nris[i];
                    const _next: NoteRenderInfo = nris[i + 1];
                    self = (_self.Y * stemDire < _next.Y * stemDire) ? _self : _next;
                    chord = true;
                    continue;
                }
                self = chord ? self : nris[i];
                chord = false;
            } else {
                self = NoteRenderInfo.instanceVirtual(prev.ViewRow);
            }

            if (prev == null) { // first iterate
                prev = self;
                continue;
            }

            const noteHeadOffsetX = Math.floor(self.HeadWidth / 2) * (-stemDire);
            if (self.ViewRow != prev.ViewRow) 
                return Render.renderSingleOrTupletNotes(nris.slice(i), measureAltersTemp, shape, noteStemHeight, noteStemWidth, noteBeamWidth, lineSpace, singleBeamLength, beamSlopeFactor, yStepDistance, colorHex, tan);
 
            const prevBeamCount: number = RenderHelper.computeTailCount(prev.IsDot, prev.Duration, prev.Divisions);
            const selfBeamCount: number = RenderHelper.computeTailCount(self.IsDot, self.Duration, self.Divisions);
            const commBeamCount: number = Math.min(prevBeamCount, selfBeamCount);
            let _y = baseTailY;

            /* 渲染前一个音符的符桿 */
            if (!prev.isVirtual()) // 若前一个音符不是虚拟音
                shape.drawLine(baseTailX, prev.Y, baseTailX, baseTailY, noteStemWidth, colorHex);

            /* 渲染当前和前一个公共的符杠 */
            for (let c = 0; c < commBeamCount; c++, _y += noteBeamWidth * 2 * (-stemDire)) 
                shape.drawLine(baseTailX, _y, self.X + noteHeadOffsetX, _y + (self.X + noteHeadOffsetX - baseTailX) * tan, noteBeamWidth, colorHex)
            /* 渲染前一个不相连的符杠 || 渲染符尾 */
            // beamDire: 朝向哪里，1朝右，-1朝左, singleBeamCount: 代表前一个不相连的符杠有几条，overBeamCount: 代表应该跳过几条符杠
            const [beamDire, singleBeamCount, overBeamCount]: number[] = ((): number[] => {
                if (prevprev == null) return [1, Math.max(prevBeamCount - selfBeamCount, 0), 0];
                const prevprevBeamCount = prevprev != null ? RenderHelper.computeTailCount(prevprev.IsDot, prevprev.Duration, prevprev.Divisions) : 0;
                return (prevprevBeamCount >= selfBeamCount) ? [-1, Math.max(prevBeamCount - prevprevBeamCount, 0), prevprevBeamCount - selfBeamCount] //
                                                            : [1, Math.max(prevBeamCount - selfBeamCount, 0), 0];
            })();
            // 跳过已经渲染的公共符杠
            for (let v = 0; v < overBeamCount; v++) _y += noteBeamWidth * 2 * (-stemDire);
            if (nris[nris.length - 1].X - nris[0].X == 0) {
                // 只有一个音符 || 只有一组和弦，渲染符尾
                Render.renderNoteTails(shape, nris[0].X + Math.floor(nris[0].HeadWidth / 2) * (-stemDire), _y, stemDire, singleBeamCount, lineSpace, colorHex); 
                break;
            } else {
                // 渲染不相连的符杠
                for (let s = 0; s < singleBeamCount; s++, _y += noteBeamWidth * 2 * (-stemDire)) 
                    shape.drawLine(baseTailX, _y, baseTailX + singleBeamLength * beamDire, _y + singleBeamLength * tan * beamDire, noteBeamWidth, colorHex);
            }
 
            /* 符杠基准点置为当前音符的 */
            baseTailY = baseTailY + (self.X + noteHeadOffsetX - baseTailX) * tan;
            baseTailX = self.X + noteHeadOffsetX;
            prevprev = prev;
            prev = self;
        }

        return measureAltersTemp;
    }

    /**
     * 渲染一个音符前要做的事
     * @private
     * @static
     * @param {Guide} gu
     * @param {MxToken} token
     * @param {Config} cfg
     * @param {Shape} shape
     * @param {NoteRenderInfo[]} noteRenderInfoTemp 本小节的音符渲染信息
     * @param {Record<string, number>} measureAltersTemp 本小节最新的升降信息
     * @returns {[NoteRenderInfo[], Record<string, number>]} [本小节的音符渲染信息, 本小节最新的升降信息]
     * @memberof Render
     */
    private static beforeRenderNote(gu: Guide, token: MxToken, cfg: Config, shape: Shape, noteRenderInfoTemp: NoteRenderInfo[], measureAltersTemp: Record<string, number>): [NoteRenderInfo[], Record<string, number>] {
        const isNewRow: boolean = gu.isRowStart();
        // 如果是行开始...
        if (isNewRow) {
            gu.CurMeasureHeight = (token.Clefs.length - 1) * (cfg.StaveSpace + cfg.Stave5Height) + cfg.Stave5Height;
            // 一整行谱左边的起始竖线
            shape.drawLine(gu.X, gu.Y(1), gu.X, gu.Y(1) + gu.CurMeasureHeight, cfg.LineWidth, cfg.LineColor);
            let startX = 0; // 本行起始x
            token.Clefs.forEach(c => {
                let _x = gu.X;
                const _y: number = gu.Y(c.Number);
                // 画五线谱 TODO 多声部
                shape.drawMultiHorizontalLine(_x, _y, cfg.ContentWidth, cfg.LineWidth, cfg.LineColor, 5, 1 , cfg.LineSpace);
                // 画谱号
                const cRb: RectBound = Render.renderClefSign(shape, c.Sign, _x += cfg.RowLeftPadding, _y + cfg.Stave5Height - (c.Line - 1) * cfg.LineSpace, cfg.LineSpace);
                if (c.Number == 1) startX = _x += cRb.Width;
            });
            gu.stepAhead(startX);
            gu.CurViewRow ++;
        }
        // 如果是小节开始...
        const lastNoteInfo: NoteRenderInfo = noteRenderInfoTemp.length > 0 ? noteRenderInfoTemp[noteRenderInfoTemp.length - 1] : null;
        if (lastNoteInfo == null || token.MeasureNo != lastNoteInfo.MeasureNo) {
            // 画上一小节内符桿、符尾、符杠
            measureAltersTemp = Render.completeRenderMeasureNotes(
                noteRenderInfoTemp, measureAltersTemp, shape, token.TimeBeats, token.TimeBeatType, cfg.LineSpace / 2 * 7 , cfg.LineWidth
                , cfg.LineWidth * 3, cfg.LineSpace, cfg.NoteBeamSlopeFactor, cfg.BeamInfoFrom, gu.getYStepDistance(), cfg.LineColor
            );
            noteRenderInfoTemp = [];
            measureAltersTemp = RenderHelper.MEASURE_ALTER_SET[token.Fifths];
            if (!isNewRow) // 画小节分割线
                token.Clefs.forEach(c => shape.drawVerticalLine(gu.X, gu.Y(c.Number), cfg.Stave5Height, cfg.LineWidth, cfg.LineColor));
 
            // 画小节号
            shape.drawText(gu.X, gu.Y(1) - cfg.MeasureNoFontHeight - 2, token.MeasureNo + '', cfg.MeasureNoFontHeight, 'Consolas', cfg.LineColor);
            let overX = cfg.MeasureLeftPadding;
            if (lastNoteInfo == null || lastNoteInfo.Fifths != token.Fifths) {
                // 画音调符号
                token.Clefs.forEach(c => {
                    const kRb: RectBound = Render.renderKeySign(shape, gu.X + overX, gu.Y(c.Number), token.Fifths, token.Mode, c.Sign, c.Line, cfg.LineSpace, cfg.LineColor);
                    if (c.Number == token.Clefs.length) overX += kRb.Width;
                });
            }
            if (lastNoteInfo == null || (lastNoteInfo.TimeBeatType != token.TimeBeatType || lastNoteInfo.TimeBeats != token.TimeBeats)) {
                // 画拍号
                token.Clefs.forEach(c => {
                    const tRb: RectBound = Render.renderTimeBeat(shape, gu.X + overX, gu.Y(c.Number), token.TimeBeatType, token.TimeBeats, cfg.LineSpace, cfg.LineColor);
                    if (c.Number == token.Clefs.length) overX += tRb.Width;
                });
            }
            gu.stepAhead(overX + cfg.MeasureLeftPadding);
        }
        return [noteRenderInfoTemp, measureAltersTemp];
    }

    /**
     * 渲染谱号
     * @static
     * @param {Shape} shape
     * @param {string} sign
     * @param {number} x
     * @param {number} y
     * @param {number} lineSpace
     * @memberof Render
     */
    private static renderClefSign(shape: Shape, sign: string, x: number, y: number, lineSpace: number): RectBound {
        switch (sign) {
            case 'G':
                return shape.drawClefG(x, y, lineSpace);
            case 'F':
                return shape.drawClefF(x, y, lineSpace);
            case 'C':
                return shape.drawClefC(x, y, lineSpace);
            default:
                console.error('Unknown ClefSign: ' + sign);
                break;
        }
    }

    /**
     * 渲染音调符号 
     * @param {Shape} shape
     * @param {number} x
     * @param {number} y
     * @param {number} fifths 五度圈里的位置，暂时这么理解
     * @param {string} mode 调性：大调、小调 [major | minor]
     * @param {string} clefSign 谱号 [TAB | G | F | C]
     * @param {number} clefLine
     * @param {number} lineSpace
     * @param {string} colorHex
     * @returns {RectBound}
     * @memberof Render
     */
    private static renderKeySign(shape: Shape, x: number, y: number, fifths: number, mode: string, clefSign: string, clefLine: number, lineSpace: number, colorHex: string): RectBound {
        if (clefSign == 'TAB') // TODO
            return new RectBound(0, 0);

        // F4: -1; C3: -0.5; C4: +0.5
        let pos: number[] = RenderHelper.FIFTH_TO_KEY_LINES_ON_G[fifths];
        if (pos.length == 0) return new RectBound(0, 0);

        if (clefSign + clefLine == 'F4') {
            pos = RenderHelper.FIFTH_TO_KEY_LINES_ON_G[fifths].map(p => p - 1);
        } else if (clefSign + clefLine == 'C3') {
            pos = RenderHelper.FIFTH_TO_KEY_LINES_ON_G[fifths].map(p => p - 0.5);
        } else if (clefSign + clefLine == 'C4') {
            pos = RenderHelper.FIFTH_TO_KEY_LINES_ON_G[fifths].map(p => p + 0.5);
        }
        y += 4 * lineSpace;
        let rb: RectBound = null;
        if (fifths < 0) {
            rb = shape.drawFlat(x, y - (pos[0] - 1) * lineSpace, lineSpace, colorHex);
            for (let i = 1; i < pos.length; i++)
                shape.drawFlat(x += Math.round(rb.Width), y - (pos[i] - 1) * lineSpace, lineSpace, colorHex);
        } else {
            rb = shape.drawSharp(x, y - (pos[0] - 1) * lineSpace, lineSpace, colorHex);
            for (let i = 1; i < pos.length; i++)
                shape.drawSharp(x += Math.round(rb.Width), y - (pos[i] - 1) * lineSpace, lineSpace, colorHex);
        }
        return new RectBound(pos.length * rb.Width, rb.Height + (Math.abs(fifths) - 1) * lineSpace);
    }

    /**
     * 渲染拍号
     * @private
     * @static
     * @param {Shape} shape
     * @param {number} x
     * @param {number} y
     * @param {number} timeBeatType 以几分音符为一拍
     * @param {number} timeBeats 每小节有几拍
     * @param {number} lineSpace
     * @param {string} colorHex
     * @returns {RectBound}
     * @memberof Render
     */
    private static renderTimeBeat(shape: Shape, x: number, y: number, timeBeatType: number, timeBeats: number, lineSpace: number, colorHex: string): RectBound {
        if ((timeBeatType+'').length > (timeBeats+'').length) {
            return Render.renderTimeBeat(shape, x, y, timeBeats, timeBeatType, lineSpace, colorHex);
        }
        const rb: RectBound =shape.drawText(x, y, timeBeats+'', lineSpace * 2, 'Consolas', colorHex);
        shape.drawText(x + rb.Width/2, y + lineSpace * 2, timeBeatType+'', lineSpace * 2, 'Consolas', colorHex, 'center');
        return new RectBound(rb.Width, lineSpace * 4);
    }

    /**
     * 渲染休止符
     * @private
     * @static
     * @param {Shape} shape
     * @param {number} x
     * @param {number} y
     * @param {string} restType 休止符类型 二全: 'breve'; 全: 'whole'; 2分: 'half'; 4分: 'quarter'; 8分: 'eighth';
     *                                   16分: '16th'; 32分: '32th'; 64分: '64th'; 128分: '128th';
     * @param {number} lineSpace
     * @param {string} colorHex
     * @returns {RectBound}
     * @memberof Render
     */
    private static renderRestSign(shape: Shape, x: number, y: number, restType: string, lineSpace: number, colorHex: string): RectBound {
        switch (restType) {
            case 'quarter': // 四分休止符
                return shape.drawRest_4(x, y + lineSpace * 2, lineSpace, colorHex);
            case 'eighth': // 八分休止符
                return shape.drawRest_8(x, y + lineSpace * 1.5, lineSpace, colorHex);
            case 'half': // 二分休止符
                return shape.drawRest_2(x, y + lineSpace * 1.5, lineSpace, colorHex);
            case 'whole': // 全休止符
                return shape.drawRest_2(x, y + lineSpace * 1, lineSpace, colorHex);
            case '16th': // 十六分休止符
                return shape.drawRest_16(x, y + lineSpace * 2, lineSpace, colorHex);
            default: // TODO 其他分休止符 32、64等
                return null;
        }
    }

    /**
     * 渲染符头
     * @private
     * @static
     * @param {Shape} shape
     * @param {number} x
     * @param {number} y
     * @param {number} divisions 本小节每个4分音符的分割数。我的理解是：本小节时值最小的元素占一个四分音符的几分之一
     * @param {number} duration  持续时间长度。我的理解是：该音符是几个dicisions，所以，dutation / dicisions的值，就是几个4分音符的时值长度
     * @param {number} lineSpace
     * @param {number} noteHeadAngle
     * @param {number} lineWidth
     * @param {string} fillColorHex
     * @param {string} strokeColorHex
     * @returns {RectBound}
     * @memberof Render
     */
    private static renderNoteHeader(shape: Shape, x: number, y: number, divisions: number, duration: number, lineSpace: number, noteHeadAngle: number, lineWidth: number, fillColorHex: string, strokeColorHex: string): RectBound {
        // dutation / dicisions的值，就是几个4分音符的时值长度
        const quarterCount = duration / divisions;
        if (quarterCount >= 2) { // 空心头
            return shape.drawNoteHead(x, y, lineSpace, noteHeadAngle, lineWidth, 'transparent', strokeColorHex, lineWidth * 3/2); // 符头描边宽度先偷个懒 _(:з)∠)_
        } else { // 实心头
            return shape.drawNoteHead(x, y, lineSpace, noteHeadAngle, lineWidth, fillColorHex, strokeColorHex, 0);
        }
    }

    /**
     * 渲染加线，根据音符位置
     * @private
     * @static
     * @param {Shape} shape
     * @param {number} x 音符坐标原点x
     * @param {number} y 音符坐标原点y
     * @param {number} line 在第几条线上
     * @param {number} lineSpace
     * @param {number} lineLength
     * @param {number} lineWidth
     * @param {string} fillColorHex
     * @memberof Render
     */
    private static renderLedgerLine(shape: Shape, x: number, y: number, line: number, lineSpace: number, lineLength: number, lineWidth: number, fillColorHex: string) {
        const ledgerLineCount: number = ((_line) => {
            if (_line <= 0)      return Math.floor(-_line) + 1;
            else if (6 <= _line) return Math.floor(_line - 5);
            else                 return 0;
        })(line);
        if (ledgerLineCount != 0) {
            const ledgerLineDire: number = line == 0 ? 1 : line / Math.abs(line); // 加线迭代方向: 1是下；-1是上
            const ledgerLineY: number = (Math.abs(line) % 1 > 0) ? y + ledgerLineDire * 0.5 * lineSpace : y;
            const ledgerLineX: number = x - lineLength / 2;
            shape.drawMultiHorizontalLine(ledgerLineX, ledgerLineY, lineLength, lineWidth, fillColorHex, ledgerLineCount, ledgerLineDire, lineSpace);
        }
    }

    /**
     * 获取渲染音符后x坐标向右移动的距离
     * @private
     * @static
     * @param {number} duration
     * @param {number} divisions
     * @param {number} singleDurationWidth
     * @param {number} noteWidth
     * @returns {number}
     * @memberof Render
     */
    private static getNoteStepXDistance(duration: number, divisions: number, singleDurationWidth: number, noteWidth: number): number {
        return duration / divisions * singleDurationWidth + noteWidth;
    }
}