import { Lexer } from './Lexer';
import BinaryTree from './BinaryTree';
//let binaryTree = BinaryTree
let lexer = new Lexer(['^', '/', '*', '+', '-'], {open: '(', close:')'})

const stringMap: Array<string> = lexer.stringMap(process.argv[2])
const expressionTree = lexer.expressionMapper(stringMap)
console.log(JSON.stringify(expressionTree, null, 2))