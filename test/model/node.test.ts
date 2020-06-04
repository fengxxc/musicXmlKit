import { Node } from "../../src/model/node";

test('Node test', () => {
    const lijing = new Node(0, null, '李靖', {'外号': '托塔天王', '技能': '百分百空手接白刃', '兵器': '玲珑宝塔'});
    lijing.setText('孽障，休得无礼！');
    const jinzha = new Node(0, lijing, '金吒', {'外号': '大太子', '技能': '找师傅', '兵器': '吴钩剑'});
    jinzha.setText('你不要过来啊~');
    const nezha = new Node(null, lijing, '哪吒', {'外号': '吒儿', '技能': ['得瑟', '泡妞'], '兵器': []});
    nezha.setText('切~');
    const nezha2 = new Node(2, lijing, '哪吒', {'外号': '三太子', '技能': ['三昧真火', '藕断丝连'], '兵器': ['火尖枪', '乾坤圈', '混天绫', '风火轮', '幡天章']});
    nezha.setText('师傅讨厌啦~');

    expect(nezha.getName()).toBe('哪吒');

    expect(nezha2.getIndex()).toBe(2);

   expect(nezha2.getAttr()).toEqual({'外号': '三太子', '技能': ['三昧真火', '藕断丝连'], '兵器': ['火尖枪', '乾坤圈', '混天绫', '风火轮', '幡天章']});

    expect(nezha.getText()).toBe('师傅讨厌啦~');
 
    expect(nezha.getFullText()).toBe('师傅讨厌啦~');

    expect(nezha.getParentNode().getName()).toBe('李靖');

    // console.log(lijing.getChildNodesByName('哪吒'))
    // console.log(lijing._childAttrIndex)
    expect(lijing.getChildNodesByName('金吒')[0]).toEqual(jinzha);
    expect(lijing.getChildNodesByName('哪吒')[0]).toEqual(nezha);
    expect(lijing.getChildNodesByName('哪吒')[1]).toEqual(nezha2);

    expect(lijing.getChildNodesByName('哪吒')[0]).toEqual(nezha);

    expect(lijing.getChildSize()).toEqual(3);
})