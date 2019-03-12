import { Lexer } from './Lexer';
import { ShuntingYard } from './ShuntingYard';
//let binaryTree = BinaryTree
const operators = ['-', '+', '*', '/', '^']
let shuntingYard = new ShuntingYard(operators, {open: '(', close:')'})
let lexer = new Lexer(operators)

let shunt = shuntingYard.shunt(shuntingYard.tokenize(process.argv[2]))
let string = shuntingYard.stringify(shunt)
console.log(string)

let binaryTree = lexer.expressionBuilder(shunt)
console.log(JSON.stringify(binaryTree, null, 4))