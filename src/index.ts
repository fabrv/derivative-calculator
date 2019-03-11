import { Lexer } from './Lexer';
import BinaryTree from './BinaryTree';
//let binaryTree = BinaryTree
let lexer = new Lexer(['^', '/', '*', '+', '-'], {open: '(', close:')'})

console.log(JSON.stringify(lexer.expressionMapper(lexer.stringMap(process.argv[2])), null, 2))