import { Lexer } from './Lexer';
import BinaryTree from './BinaryTree';
//let binaryTree = BinaryTree
let lexer = new Lexer()

console.log('final', lexer.expressionMapper(lexer.stringMap(process.argv[2])))