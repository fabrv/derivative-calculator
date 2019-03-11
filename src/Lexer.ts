import chalk from "chalk";

export class Lexer{
  groupers: {open: string, close: string}
  tokens: Array<string>

  expressions = []
  constructor(operators: Array<string>, groupers: {open: string, close: string}){
    this.tokens = operators
    this.tokens.push(groupers.open)
    this.tokens.push(groupers.close)
    this.groupers = groupers
  }

  stringMap(string: string): Array<string>{
    let token = ''
    let result = []
    for (let i = 0; i < string.length; i++){
      const isToken = this.tokens.find(key => key == string[i])
      if (isToken && token != '' && !isNullOrWhitespace(token)) {
        result.push(token.replace(/\s/g, ''))
        token = ''
      }
      token += string[i]
      if (isToken) {
        result.push(string[i])
        token = ''
      }
    }
    return result
  }

  expressionMapper(data: Array<any>){
    let expression = this.groupMapper(data)
    for (let i = 0; i < this.tokens.length - 2; i++){
      expression = this.expressionBuilder(expression, this.tokens[i])
    }
    return expression
  }

  expressionBuilder(data: Array<any>, operator: string){
    for (let i = 0; i < data.length; i++){
      if (data[i] instanceof Array){
        this.expressionBuilder(data[i], operator)
      } else if (data[i] instanceof Object){
        data[i].left = this.expressionBuilder(data[i].left, operator)
        data[i].right = this.expressionBuilder(data[i].right, operator)
      }
      if (data[i] == operator){
        if (data[i - 1] && data[i + 1]){
          let expression = {
            operator: data[i],
            left: this.expressionBuilder(data[i - 1], operator),
            right: this.expressionBuilder(data[i + 1], operator)
          }
          data.splice(i - 1, i + 2, expression)
          i -= 2
        }else{
          console.error(chalk.red(`Syntax error: Expression written improperly, ${operator} operator wihtout operands`))
          return
        }
      }
    }
    return data
  }

  groupMapper(data: Array<any>){
    let map = data.slice()
    let opens: Array<number> = []
    let openCount: number = 0
    for (let i = 0; i < data.length; i++){
      switch (data[i]){
        case (this.groupers.open):
          openCount ++
          opens.push(i)
          break
        case (this.groupers.close):
          if (openCount > 0){
            const openGroup = opens.pop()
            const token: Array<string> = data.slice(openGroup + 1, i)
            map.splice(openGroup, (i - openGroup) + 1, token)
            
            return this.groupMapper(map)
          }else{
            console.error(chalk.red(`Syntax error: "${this.groupers.open}" expected before position ${i}`))
            return
          }          
      }
    }
    return data
  }
}

function isNullOrWhitespace (input: string): boolean {
  if (typeof input === 'undefined' || input == null) return true;

  return input.replace(/\s/g, '').length < 1;
}