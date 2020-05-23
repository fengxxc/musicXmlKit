import { Node } from "../../src/model/node";
import { expect } from "chai";

describe('Node test', () => {
    const lijing = new Node(0, null, '李靖', {'外号': '托塔天王', '技能': '百分百空手接白刃', '兵器': '玲珑宝塔'});
    lijing.setText('孽障，休得无礼！');
    const jinzha = new Node(0, lijing, '金吒', {'外号': '大太子', '技能': '找师傅', '兵器': '吴钩剑'});
    jinzha.setText('你不要过来啊~');
    const nezha = new Node(null, lijing, '哪吒', {'外号': '吒儿', '技能': ['得瑟', '泡妞'], '兵器': []});
    nezha.setText('切~');
    const nezha2 = new Node(2, lijing, '哪吒', {'外号': '三太子', '技能': ['三昧真火', '藕断丝连'], '兵器': ['火尖枪', '乾坤圈', '混天绫', '风火轮', '幡天章']});
    nezha.setText('师傅讨厌啦~');

    it('expect: node.getName', () => expect(nezha.getName()).to.be.equal('哪吒'));

    it('expect: node.getIndex', () => expect(nezha2.getIndex()).to.be.equal(2));

    it('expect: node.getAttr', () => 
        expect(nezha2.getAttr()).to.be.deep.equal({'外号': '三太子', '技能': ['三昧真火', '藕断丝连'], '兵器': ['火尖枪', '乾坤圈', '混天绫', '风火轮', '幡天章']})
    );

    it('expect: node.getText', () => expect(nezha.getText()).to.be.equal('师傅讨厌啦~'));
 
    it('expect: node.getFullText', () => expect(nezha.getFullText()).to.be.equal('师傅讨厌啦~'));

    it('expect: node.getParentNode', () => expect(nezha.getParentNode().getName()).to.be.equal('李靖'));

    // console.log(lijing.getChildNodesByName('哪吒'))
    // console.log(lijing._childAttrIndex)
    it('expect: node.getChildNodesByName', () => {
        expect(lijing.getChildNodesByName('金吒')[0]).to.be.equal(jinzha);
        expect(lijing.getChildNodesByName('哪吒')[0]).to.be.equal(nezha);
        expect(lijing.getChildNodesByName('哪吒')[1]).to.be.equal(nezha2);
    });

    it('expect: node.getChildNodesByName deep', () => expect(lijing.getChildNodesByName('哪吒')[0]).to.be.deep.equal(nezha));

    it('expect: node.getChildSize', () => expect(lijing.getChildSize()).to.be.deep.equal(3));
})