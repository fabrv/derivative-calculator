class Lexer{
  tokens: Array<string> = ['(', ')', '*', '+', '-', '^', '/']

  constructor(){

  }

  tokenize (data: string): Array<string> {
    let token = ''
    let result = []
    for (let i = 0; i < data.length; i++){
      const isToken = this.tokens.find(key => key == data[i])
      if (isToken && token != '' && !isNullOrWhitespace(token)) {
        result.push(token.replace(/\s/g, ''))
        token = ''
      }
      token += data[i]
      if (isToken) {
        result.push(data[i])
        token = ''
      }
    }
    return result
  }
}

function isNullOrWhitespace (input: string): boolean {
  if (typeof input === 'undefined' || input == null) return true;

  return input.replace(/\s/g, '').length < 1;
}

export default new Lexer()