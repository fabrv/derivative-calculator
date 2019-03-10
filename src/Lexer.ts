import chalk from "chalk";
export class Lexer{
  groupers: {open: string, close: string} = {open: '(', close:')'}
  tokens: Array<string> = ['*', '+', '-', '^', '/', '(', ')']

  constructor(){
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
    let groupsMapped = this.groupMapper(data)
    
    return groupsMapped
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