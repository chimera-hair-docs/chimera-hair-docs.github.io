// 本文の日本語を文節（BudouX）で区切り、区切り目にだけ <wbr> を入れる。
// custom.css で本文を word-break: keep-all にして、<wbr> の所でだけ行を切る（「くださ｜い」のような言葉の途中で切れないように）。
// ブラウザの word-break: auto-phrase に任せないのは、Chrome・Edge でしか効かず、スマホの Safari では今までどおり切れるため
import {loadDefaultJapaneseParser} from 'budoux';

const parser = loadDefaultJapaneseParser();

// コード・キー表記の中は区切らない（コピーした文字や、決まった表記の見た目を変えないため）
const SKIP = new Set(['code', 'pre', 'kbd', 'script', 'style', 'svg']);
const JAPANESE = /[぀-ヿ㐀-鿿＀-￯]/;

const wbr = () => ({type: 'element', tagName: 'wbr', properties: {}, children: []});

function splitChildren(children) {
  const result = [];
  for (const child of children) {
    if (child.type === 'text' && JAPANESE.test(child.value)) {
      parser.parse(child.value).forEach((chunk, index) => {
        if (index > 0) result.push(wbr());
        result.push({type: 'text', value: chunk});
      });
    } else {
      walk(child);
      result.push(child);
    }
  }
  return result;
}

function walk(node) {
  if (!node.children) return;
  if (node.type === 'element' && SKIP.has(node.tagName)) return;
  if ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && SKIP.has(node.name)) return;
  node.children = splitChildren(node.children);
}

/** 見出しの id と目次は、この前の段階（remark）で作られるので、<wbr> を入れても変わらない */
export default function rehypeBudoux() {
  return (tree) => {
    walk(tree);
  };
}
