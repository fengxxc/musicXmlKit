import { Node } from "../../src/model/node";
import { expect } from "chai";

describe('Node test', () => {
    const lijing = new Node(0, null, '李靖', {'外号': '托塔天王', '技能': '百分百空手接白刃', '兵器': '玲珑宝塔'});
    
    const nezha = new Node(2, lijing, '哪吒', {'外号': '三太子', '技能': ['三昧真火', '藕断丝连'], '兵器': ['火尖枪', '乾坤圈', '混天绫', '风火轮', '幡天章']});
    nezha.setText('师傅讨厌啦~');

    it('expect: node.getName', () => expect(nezha.getName()).to.be.equal('哪吒'));

    it('expect: node.getIndex', () => expect(nezha.getIndex()).to.be.equal(2));

    it('expect: node.getAttr', () => 
        expect(nezha.getAttr()).to.be.deep.equal({'外号': '三太子', '技能': ['三昧真火', '藕断丝连'], '兵器': ['火尖枪', '乾坤圈', '混天绫', '风火轮', '幡天章']})
    );

    it('expect: node.getText', () => expect(nezha.getText()).to.be.equal('师傅讨厌啦~'));
 
    it('expect: node.getFullText', () => expect(nezha.getFullText()).to.be.equal('师傅讨厌啦~'));

    it('expect: node.getParentNode', () => expect(nezha.getParentNode().getName()).to.be.equal('李靖'));
})