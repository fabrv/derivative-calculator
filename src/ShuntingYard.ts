import chalk from "chalk";

export class ShuntingYard{
  groupers: {open: string, close: string}
  tokens: Array<string>

  expressions = []
  constructor(operators: Array<string>, groupers: {open: string, close: string}){
    this.tokens = operators
    this.tokens.push(groupers.open)
    this.tokens.push(groupers.close)
    this.groupers = groupers
  }

  tokenize(string: string): Array<string>{
    let token = ''
    let result = []
    for (let i = 0; i < string.length; i++){
      const isToken = this.tokens.find(key => key == string[i])
      if (isToken && !isNullOrWhitespace(token)) {
        result.push(token.replace(/\s/g, ''))
        token = ''
      }
      token += string[i]
      if (isToken) {
        result.push(string[i])
        token = ''
      }
    }

    if (!isNullOrWhitespace(string[string.length - 1]) && token != ''){
      result.push(token.replace(/\s/g, ''))
    }  
    return result
  }

  shunt(data: Array<string>): Array<string>{
    let output = []
    let stack = []
    for (let i = 0; i < data.length; i++){
      const token = data[i]
      if (!this.tokens.find(key => key == data[i])){
        output.push(token)
      }
      if (this.tokens.find(key => key == data[i]) && (token != this.groupers.open && token != this.groupers.close)){
        let lastPrecedence = this.tokens.indexOf(stack[stack.length - 1])
        let currentPrecedence = this.tokens.indexOf(data[i])
        if (stack.length == 0){
          lastPrecedence = 0
        }
        while (lastPrecedence >= currentPrecedence && stack[stack.length - 1] != this.groupers.open){
          output.push(stack.pop())
          lastPrecedence = this.tokens.indexOf(stack[stack.length - 1])
        }
        stack.push(data[i])
      }
      if (data[i] == this.groupers.open){
        stack.push(data[i])
      }
      if (data[i] == this.groupers.close){
        while (stack[stack.length - 1] != this.groupers.open){
          output.push(stack.pop())
        }
        if (stack[stack.length - 1] == this.groupers.open){
          stack.pop()
        }
      }
    }
    while (stack.length > 0){
      output.push(stack.pop())
    }
    return output
  }

  stringify(tokens: Array<string>): string{
    let string = ''
    for (let i = 0; i < tokens.length; i++){
      string += tokens[i]
    }
    return string
  }
}

function isNullOrWhitespace (input: string): boolean {
  if (typeof input === 'undefined' || input == null) return true;

  return input.replace(/\s/g, '').length < 1;
}

function isNumber (input: any): boolean{
  return !isNaN(input)
}