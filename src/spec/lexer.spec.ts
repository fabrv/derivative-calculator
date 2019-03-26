// not yet
import { expect } from 'chai'
import { Lexer } from '../Lexer'

describe('Expression built', () => {
  it('should return full json tree based on postfix expression', () => {
    const result = new Lexer(['-', '+', '*', '/', '^']).expressionBuilder(['12','4','5','^','^'])
    expect(result).to.be.an('object')
    expect(result.operator).to.equal('^')
  })
})