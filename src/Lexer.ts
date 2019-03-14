//import chalk from "chalk";

export class Expression {
  operator: string
  left: any
  right: any
}

export class Lexer{
  expressions = []
  operators = []
  constructor(operators: Array<string>){
    this.operators = operators
  }

  expressionBuilder(shunt: Array<string>): Expression{
    let stack = []
    for (let i = 0; i < shunt.length; i++){
      if (!this.operators.find(key => key == shunt[i])){
        const expression: Expression = {
          operator: shunt[i],
          right: null,
          left: null
        }
        stack.push(expression)
      }else{
        const expression: Expression = {
          operator: shunt[i],
          right: stack.pop(),
          left: stack.pop()
        }
        stack.push(expression)
      }
    }
    return stack[0]
  }
}
