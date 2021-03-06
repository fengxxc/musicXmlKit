// import { zrender } from "zrender/dist/zrender";
import * as zrender from "zrender";
import RectBound from "./rectBound";
// import { zrender } from "../../node_modules/zrender/zrender.all";

export class Shape {
    private ctxDom: HTMLCanvasElement;
    private zr: zrender;

    constructor(ctxDom: HTMLCanvasElement) {
        this.ctxDom = ctxDom;
        this.zr = zrender.init(ctxDom);
    }
    static Circle(x: number, y: number, r: number, fillColorHex: string, strokeColorHex: string): zrender {
        return new zrender.Circle({
            shape: {
                cx: x,
                cy: y,
                r: r
            }, 
            style: {
                fill: fillColorHex,
                stroke: strokeColorHex
            }
        });
    }

    static Line(x1: number, y1: number, x2: number, y2: number, lineWidth: number, colorHex: string): zrender {
        return new zrender.Line({
            shape: {
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2
            },
            style: {
                stroke: colorHex,
                lineWidth: lineWidth
            },
            cursor: 'auto'
        })
    }

    static Image(dataURI: string | HTMLImageElement | HTMLCanvasElement ,x: number, y: number, width: number, height: number): zrender {
        return new zrender.Image({
            style: {
                image: dataURI,
                x: x,
                y: y,
                width: width,
                height: height
            }
        })
    }

    /**
     * 画 音符头
     * @static
     * @param {number} x 坐标
     * @param {number} y 坐标
     * @param {number} lineSpace 谱线间距
     * @param {number} angle 符头旋转角度
     * @param {number} lineWidth 谱线宽度（暂不用）
     * @param {string} fillColorHex 填充颜色 16进制
     * @param {string} strokeColorHex 描边颜色 16进制
     * @param {number} strokeWidth 描边宽度
     * @returns {zrender}
     * @memberof Shape
     */
    static NoteHead(x: number, y: number, lineSpace: number, angle: number, lineWidth: number, fillColorHex: string, strokeColorHex: string, strokeWidth: number): zrender {
        const h = (lineSpace - strokeWidth) / 2;
        const rad = angle / 180 * Math.PI; // 转成弧度
        const ra: number = h / (2 * Math.sin(rad));
        // const rb: number = (3 * Math.pow(h, 2) + 2 * h * t * Math.pow(Math.cos(rad), 2)) /
        //     2 * Math.cos(rad) * Math.sqrt(4 * h * h - Math.pow(h + 2 * t * Math.pow(Math.sin(rad), 2), 2));
        const rb: number = Math.sqrt(3) * h / (2 * Math.cos(rad));
        
        // console.log(ra, rb)
        return new zrender.Ellipse({
            shape: {
                cx: x,
                cy: y,
                rx: ra,
                ry: rb
            },
            rotation: rad,
            origin: [x, y],
            style: {
                fill: fillColorHex,
                stroke: strokeColorHex,
                lineWidth: strokeWidth
            }
        });
    }

    static NoteTail(x: number, y: number, scale: number=1, fillColorHex: string): zrender {
        const _scale =scale;
        return new zrender.path.createFromString(
            'M' + (x) + ',' + (y)
            + 'c0,0,0,15.957,0,17c1.908,1.969,19.804,-1.999,18,32c-0.106,1.999,5.524,-13.894,-1,-28c-2.143,-4.633,-6.458,-8.413,-12,-12c-2.03,-1.314,-5,-9,-5,-9z'
            , {
                origin: [x, y],
                scale: [_scale, _scale],
                style: {
                    fill: fillColorHex
                }
            }
        )
    }

    static NoteTailFlip(x: number, y: number, scale: number=1, fillColorHex: string): zrender {
        const _scale =scale;
        return new zrender.path.createFromString(
            'M' + (x) + ',' + (y)
            // + 'l0,-17c0,0,22.931,-1.198,21,-32c-0.125,-1.998,6.524,14.894,0,29c-2.143,4.633,-9.458,7.413,-15,11c-2.03,1.314,-6,9,-6,9z'
            + 'c0,0,-0.058,-17.932,0,-17c1.864,-1.631,20.222,1.968,18,-32c-0.131,-1.997,5.524,13.894,-1,28c-2.143,4.633,-5.458,8.413,-11,12c-2.03,1.314,-6,9,-6,9z'
            , {
                origin: [x, y],
                scale: [_scale, _scale],
                style: {
                    fill: fillColorHex
                }
            }
        )
    }

    /**
     * G谱号
     * 默认谱线间距是20
     * @static
     * @param {number} x
     * @param {number} y
     * @param {number} [scale=1]
     * @returns {void}
     * @memberof Shape
     */
    static ClefG(x: number, y: number, scale: number = 1): zrender {
        const _scale = scale;
        return new zrender.path.createFromString(
            // 'M' + x + ',' + (y - 90) 
            'M' + (x + 30) + ',' + (y - 90) 
            + 'c-5.426,-0.141,-11.774,12.818,-11.563,24.375c0.049,3.52,1.16,10.659,2.782,19.625c-10.224,10.581,-22.094,21.44,-22.094,35.688c-0.163,13.057,7.816,29.695,26.75,29.531c2.906,-0.015,5.521,-0.383,7.844,-1c1.73,9.492,2.881,16.981,2.875,20.437c0.061,13.641,-17.86,14.991,-18.719,7.156c3.777,-0.129,6.781,-3.136,6.781,-6.843c0,-3.79,-3.138,-6.875,-7.031,-6.875c-2.142,0,-4.05,0.938,-5.344,2.406c-0.029,0.033,-0.065,0.06,-0.093,0.094c-0.293,0.304,-0.538,0.68,-0.782,1.093c-0.797,1.353,-1.316,3.293,-1.343,6.063c0,11.425,28.874,18.774,28.875,-3.75c0.045,-3.025,-1.258,-10.715,-3.157,-20.406c20.603,-7.457,15.427,-38.044,-3.531,-38.188c-1.47,0.015,-2.886,0.186,-4.25,0.532c-1.079,-5.197,-2.121,-10.241,-3.031,-14.875c7.199,-7.072,13.484,-16.225,13.344,-33.094c0.022,-12.114,-4.014,-21.828,-8.313,-21.969zm1.281,11.719c2.456,-0.237,4.407,2.043,4.407,7.062c0.198,8.62,-5.84,16.148,-13.032,23.719c-0.687,-4.147,-1.139,-7.507,-1.187,-9.5c0.204,-13.466,5.719,-20.886,9.812,-21.281zm-7.719,44.688c0.877,4.515,1.825,9.271,2.782,14.062c-12.549,4.465,-18.571,21.954,-0.782,29.781c-10.843,-9.231,-5.505,-20.157,2.313,-22.062c1.965,9.817,3.885,19.5,5.437,27.875c-2.107,0.733,-4.566,1.168,-7.437,1.187c-7.182,0,-21.532,-4.573,-21.532,-21.875c0,-14.494,10.047,-20.383,19.219,-28.969zm6.094,21.469c0.313,-0.019,0.652,-0.012,0.968,0c13.063,0,17.99,20.743,4.688,27.375c-1.655,-8.319,-3.662,-17.861,-5.656,-27.375z'
            , {
                origin: [x, y],
                scale: [_scale, _scale]
            }
        )
    }

    /**
     * F谱号
     * 默认谱线间距是20
     * @static
     * @param {number} x
     * @param {number} y
     * @param {number} [scale=1]
     * @returns {void}
     * @memberof Shape
     */
    static ClefF(x: number, y: number, scale: number = 1): zrender {
        const _scale = scale;
        return new zrender.path.createFromString(
            'M' + (x) + ',' + (y)
            + 'c-0.303,-1.106,-0.518,-2.237,-0.525,-3.404c-0.046,-7.667,7.628,-16.689,19.697,-16.689c17.664,0,25.106,12.253,25.106,23.953c0,11.701,-10.942,27.714,-44.849,43.933c-0.931,0.446,-3.62,-0.564,-0.913,-2.156c22.999,-13.529,32.981,-30.774,32.981,-43.366c0,-7.627,-1.879,-19.041,-13.923,-18.958c-8.963,0.061,-10.544,4.559,-12.096,7.833c-0.7,1.476,0.052,2.245,0.913,2.043c2.261,-0.53,1.877,-0.567,3.537,-0.567c3.285,0,8.902,2.396,8.902,7.378c0,4.983,-6.192,7.266,-9.701,7.266c-5.845,0,-8.137,-3.64,-9.129,-7.266zm51.696,-13.168c2.521,0,4.565,2.033,4.565,4.541c0,2.508,-2.044,4.541,-4.565,4.541c-2.521,0,-4.565,-2.033,-4.565,-4.541c0,-2.508,2.044,-4.541,4.565,-4.541zm0,18.845c2.521,0,4.565,2.033,4.565,4.541c0,2.507,-2.044,4.54,-4.565,4.54c-2.521,0,-4.565,-2.033,-4.565,-4.54c0,-2.508,2.044,-4.541,4.565,-4.541z'
            , {
                origin: [x, y],
                scale: [_scale, _scale]
            }
        )
    }

    /**
     * C谱号
     * 默认谱线间距是20
     * @static
     * @param {number} x
     * @param {number} y
     * @param {number} [scale=1]
     * @returns {void}
     * @memberof Shape
     */
    static ClefC(x: number, y: number, scale: number = 1): zrender {
        const _scale = scale;
        return new zrender.path.createFromString(
            'M'+ (x - 0) + ',' + (y - 40)
            + 'h10.179v80h-10.179v-80zm13.679,80.057h3.391v-39.35c2.034,-0.04,2.044,0.813,5.611,6.411c2.189,3.435,3.957,5.867,1.525,8.7c0.933,2.379,4.729,1.475,5.423,0.791c0.914,-2.831,2.825,-8.948,7.287,-8.475s6.6,4.5,7.23,13.9s-1.98,13.642,-6.836,13.785s-5.6,0.231,-5.7,-1.751s0.106,-1.458,0.565,-2.09c1.721,0.152,5.344,-0.454,4.971,-4.011a5.663,5.663,0,0,0,-2.768,-3.9c-2.371,-1.443,-4.179,-1,-6.27,0.226c-1.154,0.678,-1.928,1.952,-2.2,4.237c-0.251,2.084,0.3,3.629,0.226,6.554c2.585,2.053,5.118,4.658,10.619,4.746c5.276,0.085,15.061,-3.337,14.847,-19.43c-0.136,-10.272,-5.117,-15.907,-8.247,-17.684c-2.195,-1.246,-7.913,-1.233,-9.885,1.243s-3.045,3.964,-4.293,5.311c-6.121,-7.107,-7.188,-9.27,-7.188,-9.27s1.052,-2.133,7.178,-9.231c1.249,1.346,2.322,2.832,4.3,5.307s7.695,2.487,9.891,1.242c3.131,-1.776,8.116,-7.406,8.252,-17.671c0.21,-16.086,-9.582,-19.505,-14.869,-19.421c-5.505,0.088,-8.039,2.69,-10.626,4.742c0.07,2.923,-0.477,4.466,-0.226,6.549c0.275,2.284,1.05,3.557,2.2,4.234c2.092,1.228,3.9,1.668,6.274,0.226a5.658,5.658,0,0,0,2.77,-3.9c0.374,-3.555,-3.252,-4.16,-4.974,-4.009c-0.457,-0.626,-0.67,-0.103,-0.557,-2.084s0.85,-1.893,5.709,-1.75s7.466,4.384,6.839,13.776s-2.774,13.416,-7.239,13.89s-6.377,-5.639,-7.291,-8.469c-0.694,-0.683,-4.492,-1.587,-5.426,0.79c2.433,2.831,0.664,5.262,-1.526,8.694c-3.57,5.594,-3.579,6.447,-5.615,6.407v-39.322h-3.394v40z'
            , {
                origin: [x, y],
                scale: [_scale, _scale]
            }
        )
    }

    /**
     * 文本
     * @static
     * @param {number} x
     * @param {number} y
     * @param {string} text
     * @param {string} font textFont: '18px Consolas'
     * @param {string} colorHex
     * @param {string} textAlign
     * @returns {zrender}
     * @memberof Shape
     */
    static Text(x: number, y: number, text: string, font: string, colorHex: string, textAlign: string): zrender {
        return new zrender.Text({
            style: {
                x: x,
                y: y,
                text: text,
                textFont: font,
                textFill: colorHex,
                textAlign: textAlign
            }
        })
    }

    /**
     * 升调符号 ♯
     * @static
     * @param {number} x
     * @param {number} y
     * @param {number} [scale=1]
     * @param {string} fillColorHex
     * @returns {zrender}
     * @memberof Shape
     */
    static Sharp(x: number, y: number, scale: number = 1, fillColorHex: string): zrender {
        const _scale = scale;
        return new zrender.path.createFromString(
            'M' + (x + 0) + ',' + (y + 5) // 原点设在右中
            + 'l0,5.6l-3.118,0.738c0,6.595,0,11.721,0,12.247c0,1.562,-2.297,1.422,-2.297,-0.08c0,-0.491,0,-5.324,0,-11.624l-5.17,1.223c0,6.397,0,11.326,0,11.841c0,1.562,-2.297,1.422,-2.297,-0.08c0,-0.48,0,-5.116,0,-11.218l-3.118,0.738l0,-5.6l3.118,-0.738c0,-3.272,0,-6.704,0,-10l-3.118,0.738l0,-5.6l3.118,-0.738c0,-6.621,0,-11.695,0,-11.982c0,-1.202,2.297,-1.282,2.297,-0.08c0,0.299,0,5.139,0,11.519l5.17,-1.223c0,-6.419,0,-11.295,0,-11.576c0,-1.202,2.297,-1.282,2.297,-0.08c0,0.292,0,4.935,0,11.113l3.118,-0.738l0,5.6l-3.118,0.738c0,3.267,0,6.697,0,10l3.118,-0.738zm-5.415,-8.719l-5.17,1.223c0,3.28,0,6.709,0,10l5.17,-1.223c0,-3.286,0,-6.716,0,-10z'
            , {
                origin: [x, y],
                scale: [_scale, _scale],
                style: {
                    fill: fillColorHex
                }
            }
        )
    }

    /**
     * 还原调符号
     * @static
     * @param {number} x
     * @param {number} y
     * @param {number} [scale=1]
     * @param {string} fillColorHex
     * @returns {zrender}
     * @memberof Shape
     */
    static Restore(x: number, y: number, scale: number = 1, fillColorHex: string): zrender {
        const _scale = scale;
        return new zrender.path.createFromString(
            // svg起始点在右下 M11.862,47.499'
            'M' + (x + 0) + ',' + (y + 24) // 原点设在右中
            + 'c0,-2.55,0,-8.322,0,-14.266c-1.71,0.611,-3.922,1.898,-10.887,4.665c-0.584,0.232,-0.975,0.069,-0.975,-0.403c0,-1.222,0,-36.274,0,-36.994c0,-0.72,1.138,-0.645,1.138,0c0,2.55,0,8.322,0,14.266c1.71,-0.611,3.922,-1.898,10.887,-4.665c0.584,-0.232,0.975,-0.069,0.975,0.403c0,1.222,0,36.274,0,36.994c0,0.72,-1.138,0.645,-1.138,0zm-10.724,-27.699c0,6.782,0,12.617,0,12.617l10.724,-4.217c0,-6.782,0,-12.617,0,-12.617l-10.724,4.217z'
            , {
                origin: [x, y],
                scale: [_scale, _scale],
                style: {
                    fill: fillColorHex
                }
            }
        )
    }


    /**
     * 降调符号♭
     * @static
     * @param {number} x
     * @param {number} y
     * @param {number} [scale=1]
     * @param {string} fillColorHex
     * @returns {zrender}
     * @memberof Shape
     */
    static Flat(x: number, y: number, scale: number = 1, fillColorHex: string): zrender {
        const _scale = scale;
        return new zrender.path.createFromString(
            // M11.763,40.8
            'M' + (x - 6) + ',' + (y + 6) // 原点设在右中
            + 'c-2.62,2.301,-5.331,5.038,-10.133,6.939c-0.52,0.381,-1.63,0.097,-1.63,-0.619c0,-0.935,0,-45.482,0,-46.32c0,-0.838,1.895,-0.855,1.895,0.08c0,0.47,0,11.899,0,23.288c7.549,-5.772,13.18,-3.768,15.158,0.872c1.589,3.728,1.884,9.46,-5.29,15.76zm-0.868,-12.96c-1.689,-2.072,-5.614,-3.252,-9,-0.741c0,7.827,0,15.16,0,18.384c10.709,-10.906,10.931,-15.273,9,-17.643z'
            , {
                origin: [x, y],
                scale: [_scale, _scale],
                style: {
                    fill: fillColorHex
                }
            }
        )
    }

    static Rect(x: number, y: number, width: number, height: number, scale: number = 1, fillColorHex: string): zrender {
        const _scale = scale;
        return new zrender.Rect({
            shape: {
                x: x,
                y: y,
                width: width,
                height: height,
            }, style: {
                fill: fillColorHex,
                stroke: fillColorHex
            }
        })
    }

    static Rest_2(x: number, y: number, scale: number, fillColorHex: string): zrender {
        const _scale = scale;
        return Shape.Rect(x - _scale * 1.3 / 2, y, _scale * 1.3, _scale / 2, _scale / 20, fillColorHex);
    }

    /**
     * 4分休止符
     * @param x 
     * @param y 
     * @param scale 
     * @param fillColorHex 
     */
    static Rest_4(x: number, y: number, scale: number, fillColorHex: string): zrender {
        const _scale = scale / 20;
        return new zrender.path.createFromString(
            // M4.141,0.72
            'M' + (x + 4 - 10) + ',' + (y - 24) // x轴原点设在中间
            + 'c0.852,0.631,5.938,5.065,5.846,8.24c-0.092,3.175,-6.475,11.692,-7.308,12.64c-0.832,0.948,-1.504,2.087,-0.081,3.52c1.423,1.433,4.702,4.342,5.197,5.04c-2.859,-0.263,-4.992,-0.62,-6.739,2.08c-1.478,2.283,-1.136,4.51,-0.163,6.32c0.974,1.81,5.811,7.997,6.577,9.12c0.446,0.654,2.086,0.226,1.38,-0.64c-1.021,-1.252,-6.201,-6.548,-2.679,-10.8c3.101,-3.744,6.468,-2.51,9.987,2.64c1.635,2.394,3.901,0.048,2.111,-1.6c-1.971,-1.814,-8.498,-7.952,-9.175,-8.72c-0.35,-0.398,-0.996,-0.979,-0.325,-1.92c0.956,-1.339,8.019,-10.837,8.607,-11.92c0.588,-1.083,0.693,-1.854,-0.244,-2.88c-0.936,-1.026,-11.428,-11.161,-12.179,-11.68c-0.496,-0.343,-1.183,0.285,-0.812,0.56z'
            , {
                origin: [x, y],
                scale: [_scale, _scale],
                style: {
                    fill: fillColorHex
                }
            }
        )
    }

    /**
     * 8分休止符
     * @param x 
     * @param y 
     * @param scale 
     * @param fillColorHex 
     */
    static Rest_8(x: number, y: number, scale: number, fillColorHex: string): zrender {
        const _scale = scale / 20;
        return new zrender.path.createFromString(
            // 'M0,7.74'
            'M' + (x - 10) + ',' + (y - 0) // x轴原点设在中间
            + 'c0,2.697,2.539,5.109,6.056,5.109c0.883,0,1.618,-0.117,2.41,-0.301c1.333,0.142,3.175,0.031,4.141,-0.18c1.092,-0.239,2.517,-0.706,3.151,-1.322c-0.28,0.655,-9.927,23.749,-10.196,24.4c-0.403,0.976,1.434,1.427,2.163,-0.12c0.758,-1.609,13.803,-32.923,14.213,-33.956c0.486,-1.224,-1.622,-1.31,-2.163,0.06c-0.518,1.312,-2.595,6.304,-2.781,6.731c-0.601,1.382,-2.686,1.86,-3.398,1.863c-0.823,0.004,-1.484,-0.108,-1.669,-0.361c0.185,-1.185,0.185,-1.018,0.185,-1.923c0,-2.091,-1.955,-5.108,-6.056,-5.108c-4.002,0,-6.056,2.777,-6.056,5.108z'
            , {
                origin: [x, y],
                scale: [_scale, _scale],
                style: {
                    fill: fillColorHex
                }
            }
        )
    }

    /**
     * 16分休止符
     * @param x 
     * @param y 
     * @param scale 
     * @param fillColorHex 
     */
    static Rest_16(x: number, y: number, scale: number, fillColorHex: string): zrender {
        const _scale = scale / 20;
        return new zrender.path.createFromString(
            // 'M20.098,30.893'
            'M' + (x + 16 - 13) + ',' + (y + 19) // x轴原点设在中间
            + 'c-0.487,1.14,-1.481,1.468,-2.002,1.468c-0.523,0,-0.94,-0.148,-1.138,-0.385c0.198,-1.257,0.198,-1.08,0.198,-2.041c0,-2.22,-2.087,-5.421,-6.464,-5.421c-4.272,0,-6.464,2.947,-6.464,5.421c0,2.862,2.71,5.422,6.464,5.422c0.942,0,1.727,-0.124,2.572,-0.319c1.422,0.151,3.259,-0.097,4.289,-0.321c-0.122,0.027,0.809,-0.217,1.316,-0.436c-2.561,7.245,-8.568,23.485,-8.763,24.069c-0.354,1.064,1.634,1.402,2.291,-0.291c0.684,-1.763,18.286,-50.56,18.643,-51.686c0.423,-1.334,-1.593,-1.171,-2.295,0.227c-0.588,1.171,-0.801,1.526,-1.247,2.761c-0.38,1.051,-0.925,2.189,-0.97,2.292c-0.642,1.466,-2.778,1.974,-3.538,1.977c-0.878,0.005,-1.583,-0.114,-1.781,-0.382c0.198,-1.258,0.198,-1.081,0.198,-2.041c0,-2.22,-2.086,-5.422,-6.464,-5.422c-4.272,0,-6.464,2.947,-6.464,5.422c0,2.861,2.71,5.421,6.464,5.421c0.943,0,1.727,-0.124,2.573,-0.319c1.422,0.151,3.389,0.033,4.419,-0.191c1.166,-0.254,2.957,-0.749,3.634,-1.403c-0.319,1.031,-5.427,16.075,-5.471,16.178z'
            , {
                origin: [x, y],
                scale: [_scale, _scale],
                style: {
                    fill: fillColorHex
                }
            }
        )
    }

    /**
     * 32分休止符
     * @param x 
     * @param y 
     * @param scale 
     * @param fillColorHex 
     */
    static Rest_32(x: number, y: number, scale: number, fillColorHex: string): zrender {
        const _scale = scale / 20;
        return new zrender.path.createFromString(
            // 'M8.169,72.698'
            'M' + (x + 8 - 16) + ',' + (y + 48) // x轴原点设在中间
            + 'c0.814,-2.153,22.199,-70.343,22.643,-71.686c0.439,-1.328,-1.593,-1.171,-2.295,0.227c-0.588,1.171,-0.801,1.526,-1.247,2.761c-0.38,1.051,-0.925,2.189,-0.97,2.292c-0.642,1.466,-2.778,1.974,-3.538,1.977c-0.878,0.005,-1.583,-0.114,-1.781,-0.382c0.198,-1.258,0.198,-1.081,0.198,-2.041c0,-2.22,-2.086,-5.422,-6.464,-5.422c-4.272,0,-6.464,2.947,-6.464,5.422c0,2.861,2.71,5.421,6.464,5.421c0.943,0,1.727,-0.124,2.573,-0.319c1.422,0.151,3.389,0.033,4.419,-0.191c1.166,-0.254,2.957,-0.749,3.634,-1.403c-0.159,0.512,-3.402,12.362,-5.17,18.287c-0.109,0.366,-0.649,0.625,-1.409,0.628c-0.878,0.005,-1.583,-0.114,-1.781,-0.382c0.198,-1.258,0.198,-1.081,0.198,-2.041c0,-2.22,-2.086,-5.422,-6.464,-5.422c-4.272,0,-6.464,2.947,-6.464,5.422c0,2.861,2.71,5.421,6.464,5.421c0.943,0,1.727,-0.124,2.573,-0.319c1.422,0.151,3.389,0.033,4.419,-0.191c1.166,-0.254,1.419,-0.502,1.85,-0.761c-2.413,8.127,-4.658,15.488,-4.675,15.536c-0.432,1.195,-0.751,1.468,-1.138,1.468c-0.523,0,-0.816,-0.148,-1.014,-0.385c0.198,-1.257,0.198,-1.08,0.198,-2.041c0,-2.22,-2.087,-5.421,-6.464,-5.421c-4.272,0,-6.464,2.947,-6.464,5.421c0,2.862,2.71,5.422,6.464,5.422c0.942,0,1.727,-0.124,2.572,-0.319c1.422,0.151,2.145,0.137,3.178,-0.074c0.664,-0.18,1.179,-0.397,1.686,-0.683c-2.494,7.379,-7.827,23.485,-8.022,24.069c-0.354,1.064,1.634,1.402,2.291,-0.291z'
            , {
                origin: [x, y],
                scale: [_scale, _scale],
                style: {
                    fill: fillColorHex
                }
            }
        )
    }

    /**
     * 64分休止符
     * @param x 
     * @param y 
     * @param scale 
     * @param fillColorHex 
     */
    static Rest_64(x: number, y: number, scale: number, fillColorHex: string): zrender {
        const _scale = scale / 20;
        return new zrender.path.createFromString(
            // 'M9.169,87.698'
            'M' + (x + 8 - 17) + ',' + (y + 63) // x轴原点设在中间
            + 'c0.814,-2.153,25.051,-85.343,25.495,-86.686c0.439,-1.328,-1.445,-1.171,-2.147,0.227c-0.588,1.171,-0.801,1.725,-1.247,2.909c-0.394,1.047,-0.719,1.855,-0.822,2.144c-0.596,1.672,-2.926,1.974,-3.686,1.977c-0.878,0.005,-1.583,-0.114,-1.781,-0.382c0.198,-1.258,0.198,-1.081,0.198,-2.041c0,-2.22,-2.086,-5.422,-6.464,-5.422c-4.272,0,-6.464,2.947,-6.464,5.422c0,2.861,2.71,5.421,6.464,5.421c0.943,0,1.727,-0.124,2.573,-0.319c1.422,0.151,3.389,0.033,4.419,-0.191c1.166,-0.254,2.957,-0.749,3.634,-1.403c-0.159,0.512,-3.502,12.438,-5.17,18.287c-0.105,0.367,-0.649,0.625,-1.409,0.628c-0.878,0.005,-1.583,-0.114,-1.781,-0.382c0.198,-1.258,0.198,-1.081,0.198,-2.041c0,-2.22,-2.086,-5.422,-6.464,-5.422c-4.272,0,-6.464,2.947,-6.464,5.422c0,2.861,2.71,5.421,6.464,5.421c0.943,0,1.727,-0.124,2.573,-0.319c1.422,0.151,3.389,0.033,4.419,-0.191c1.166,-0.254,1.419,-0.502,1.85,-0.761c-2.413,8.127,-4.658,15.488,-4.675,15.536c-0.432,1.195,-0.751,1.468,-1.138,1.468c-0.523,0,-0.816,-0.148,-1.014,-0.385c0.198,-1.257,0.198,-1.08,0.198,-2.041c0,-2.22,-2.087,-5.421,-6.464,-5.421c-4.272,0,-6.464,2.947,-6.464,5.421c0,2.862,2.71,5.422,6.464,5.422c0.942,0,1.727,-0.124,2.572,-0.319c1.422,0.151,2.538,0.067,3.178,-0.074c0.664,-0.18,1.727,-0.638,1.731,-0.653c-0.396,1.612,-4.339,17.473,-4.497,18.05c-0.523,0,-0.52,-0.148,-0.718,-0.385c0.198,-1.257,0.198,-1.08,0.198,-2.041c0,-2.22,-2.087,-5.421,-6.464,-5.421c-4.272,0,-6.464,2.947,-6.464,5.421c0,2.862,2.71,5.422,6.464,5.422c0.942,0,1.727,-0.124,2.572,-0.319c0.931,0.129,1.441,0.071,2.14,-0.074c0.664,-0.18,1.179,-0.397,1.685,-0.683c-2.372,7.622,-5.788,18.485,-5.983,19.069c-0.354,1.064,1.634,1.402,2.291,-0.291z'
            , {
                origin: [x, y],
                scale: [_scale, _scale],
                style: {
                    fill: fillColorHex
                }
            }
        )
    }

    static getWidthHeight(shape: zrender): [number, number] {
        const br = shape.getBoundingRect();
        return [br.width * shape.scale[0], br.height * shape.scale[1]];
    }

    draw(shape: zrender): RectBound {
        this.zr.add(shape);
        // test
        // debugger
        // const br = shape.getBoundingRect()
        /* this.zr.add(
            new zrender.Rect({
                shape: {
                    x: br.x,
                    y: br.y,
                    width: br.width * shape.scale[0],
                    height: br.height * shape.scale[1],
                },
                style: {
                    fill: 'rgba(135, 206, 250, 0.8)',
                    stroke: 'rgba(135, 206, 250, 0.8)'
                }
            })
        )
        console.log(br.width, br.height); */
        return new RectBound(...Shape.getWidthHeight(shape));
    }

    drawPoint(x: number, y: number, r: number, fillColorHex: string, strokeColorHex: string): RectBound {
        return this.draw(Shape.Circle(x, y, r, fillColorHex, strokeColorHex));
    }

    drawLine(x1: number, y1: number, x2: number, y2: number, lineWidth: number, colorHex: string): RectBound {
        return this.draw(Shape.Line(x1, y1, x2, y2, lineWidth, colorHex));
    }

    /**
     * 画多条水平线
     * @param {number} x
     * @param {number} y
     * @param {number} length
     * @param {number} lineWidth
     * @param {string} colorHex
     * @param {number} count
     * @param {number} iterateDirection 迭代方向: 1是下；-1是上
     * @param {number} lineSpace
     * @returns {RectBound[]}
     * @memberof Shape
     */
    drawMultiHorizontalLine(x: number, y: number, length: number, lineWidth: number, colorHex: string, count: number, iterateDirection: number, lineSpace: number): RectBound[] {
        let arr: RectBound[] = [];
        for (let i = 0; i < count; i++) {
            arr.push(this.drawLine(x, y + i * lineSpace * iterateDirection, x + length, y + i * lineSpace * iterateDirection, lineWidth, colorHex));
        }
        return arr;
    }

    drawVerticalLine(x: number, y: number, length: number, lineWidth: number, colorHex: string): RectBound {
        return this.drawLine(x, y, x, y + length, lineWidth, colorHex);
    }

    drawImage(dataURI: string | HTMLImageElement | HTMLCanvasElement, x: number, y: number, width: number, height: number): RectBound {
        return this.draw(Shape.Image(dataURI, x, y, width, height));
    }

    drawNoteHead(x: number, y: number, lineSpace: number, angle: number, lineWidth: number, fillColorHex: string, strokeColorHex: string, strokeWidth: number): RectBound {
        return this.draw(Shape.NoteHead(x, y, lineSpace, angle, lineWidth, fillColorHex, strokeColorHex, strokeWidth));
    }

    drawNoteTail(x: number, y: number, lineSpace: number, fillColorHex: string): RectBound {
        return this.draw(Shape.NoteTail(x, y, lineSpace / 20, fillColorHex));
    }

    drawNoteTailFlip(x: number, y: number, lineSpace: number, fillColorHex: string): RectBound {
        return this.draw(Shape.NoteTailFlip(x, y, lineSpace / 20, fillColorHex));
    }

    drawClefG(x: number, y: number, lineSpace: number): RectBound {
        return this.draw(Shape.ClefG(x, y, lineSpace / 20));
    }

    drawClefF(x: number, y: number, lineSpace: number): RectBound {
        return this.draw(Shape.ClefF(x, y, lineSpace / 20));
    }

    drawClefC(x: number, y: number, lineSpace: number): RectBound {
        return this.draw(Shape.ClefC(x, y, lineSpace / 20));
    }

    drawText(x: number, y: number, text: string, lineSpace: number, fontFamily: string, colorHex: string, textAlign?: string): RectBound {
        return this.draw(Shape.Text(x, y, text, lineSpace * 1.2 + 'px ' + fontFamily, colorHex, textAlign));
    }

    drawSharp(x: number, y: number, lineSpace: number, fillColorHex: string): RectBound {
        return this.draw(Shape.Sharp(x, y, lineSpace / 20, fillColorHex))
    }

    drawRestore(x: number, y: number, lineSpace: number, fillColorHex: string): RectBound {
        return this.draw(Shape.Restore(x, y, lineSpace / 20, fillColorHex))
    }

    drawFlat(x: number, y: number, lineSpace: number, fillColorHex: string): RectBound {
        return this.draw(Shape.Flat(x, y, lineSpace / 20, fillColorHex))
    }

    drawRest_2(x: number, y: number, lineSpace: number, fillColorHex: string) {
        return this.draw(Shape.Rest_2(x, y, lineSpace, fillColorHex))
    }

    drawRest_4(x: number, y: number, lineSpace: number, fillColorHex: string): RectBound {
        return this.draw(Shape.Rest_4(x, y, lineSpace, fillColorHex))
    }

    drawRest_8(x: number, y: number, lineSpace: number, fillColorHex: string): RectBound {
        return this.draw(Shape.Rest_8(x, y, lineSpace, fillColorHex))
    }

    drawRest_16(x: number, y: number, lineSpace: number, fillColorHex: string): RectBound {
        return this.draw(Shape.Rest_16(x, y, lineSpace, fillColorHex))
    }

    drawRest_32(x: number, y: number, lineSpace: number, fillColorHex: string): RectBound {
        return this.draw(Shape.Rest_32(x, y, lineSpace, fillColorHex))
    }

    drawRest_64(x: number, y: number, lineSpace: number, fillColorHex: string): RectBound {
        return this.draw(Shape.Rest_64(x, y, lineSpace, fillColorHex))
    }
}