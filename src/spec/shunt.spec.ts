// not yet
import { expect } from 'chai'
import { ShuntingYard } from '../ShuntingYard'

describe('Separate strings in tokens', () => {
  it('should return an array of strings, [12, + , 34, * , 56, ^ 67]', () => {
    const result = new ShuntingYard(['-', '+', '*', '/', '^'], {open: '(', close: ')'}).tokenize('12+34*56^67')
    expect(result).to.be.an('array')
    expect(result[1]).to.equal('+')
  })
})