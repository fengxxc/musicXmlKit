var MxNodeRender = /** @class */ (function () {
    function MxNodeRender() {
    }
    MxNodeRender.render = function (root) {
        var name = root.getName();
        switch (name) {
            case 'score-partwise':
                console.log("score-partwise\u7248\u672C\uFF1A" + root.getAttr()['version']);
                break;
            case 'encoding-date':
                console.log("\u7F16\u7801\u65E5\u671F\uFF1A" + root.getFullText());
                break;
            case 'software':
                console.log("\u8F6F\u4EF6\uFF1A" + root.getFullText());
                break;
            case 'note':
            default:
                // console.log(name)
                break;
        }
        root.forEachChildNodes(function (child, index, array) { return MxNodeRender.render(child); });
    };
    return MxNodeRender;
}());
export { MxNodeRender };
//# sourceMappingURL=mxNodeRender.js.map