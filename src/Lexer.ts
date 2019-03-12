import chalk from "chalk";

class Expression {
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

  expressionBuilder(shunt: Array<string>): Array<any>{
    let stack = []
    for (let i = 0; i < shunt.length; i++){
      if (!this.operators.find(key => key == shunt[i])){
        stack.push(shunt[i])
      }else{
        let expression: Expression = {
          operator: shunt[i],
          right: stack.pop(),
          left: stack.pop()
        }
        stack.push(expression)
      }
    }
    return stack
  }
}
