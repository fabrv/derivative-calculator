import { Expression } from './Lexer'

export class Derivator{
  _root: Expression
  _operators = []
  constructor(root: Expression, operators: Array<string>){
    this._root = this.operate(root)
    this._operators = operators
  }

  treeTraverse(node = this._root){
    if (node != null){
      console.log(node.operator)
      this.treeTraverse(node.left)
      this.treeTraverse(node.right)
    }
  }

  operate(node: Expression){
    if (node != null){
      node.left = this.operate(node.left)
      node.right = this.operate(node.right)

      if (node.left != null && node.right != null){
        if (isNumber(node.left.operator) && isNumber(node.right.operator)){
          return this.operateNode(node)
        }
      }
    }
    return node
  }
  
  derivate(node: Expression = this._root){
    if (node != null){
      node.left = this.derivate(node.left)
      node.right = this.derivate(node.right)

      if (node.left != null && node.right != null){
        if (this._operators.indexOf(node.operator) == 4){
          if (node.left.operator.includes('x') && isNumber(node.right.operator)){
            return this.powerDerivate(node)
          }
          if (node.left.operator == 'e' && isNumber(node.right.operattor)){
            return this.eDerivate(node)
          }
        }
      }
    }
    return node
  }

  operateNode(node: Expression): Expression{
    const left = node.left.operator
    const right = node.right.operator
    let result: number
    const operation: Expression =  {
      operator: '0',
      left: null,
      right: null      
    }
    switch (node.operator){
      case ('-'):
        result = parseFloat(left) - parseFloat(right)
        operation.operator = result.toString()
        break
      case ('+'):
        result = parseFloat(left) + parseFloat(right)
        operation.operator = result.toString()
        break
      case ('*'):
        result = parseFloat(left) * parseFloat(right)
        operation.operator = result.toString()
        break
      case ('/'):
        result = parseFloat(left) / parseFloat(right)
        operation.operator = result.toString()
        break
      case ('^'):
        result = Math.pow(parseFloat(left), parseFloat(right))
        operation.operator = result.toString()
        break
    }
    return operation
  }

  powerDerivate(node: Expression): Expression{
    const result: Expression = {
      operator: '',
      left: null,
      right: null
    }
    let value = node.left.operator.replace('x', '')
    if (value == ''){
      value = 1
    }else{
      value = parseInt(value)
    }

    result.operator = (parseFloat(node.right.operator) * value) + 'x^(' + (parseFloat(node.right.operator) - 1) + ')'

    return result
  }

  eDerivate(node: Expression): Expression{
    const result: Expression = {
      operator: '',
      left: null,
      right: null
    }
    
    result.operator = 'e^' + result.right + '*' + this.derivate(result.right)

    return result
  }
}


function isNumber (input: any): boolean{
  return !isNaN(input)
}