import { Expression } from './Lexer'

export class Derivator{
  _root: Expression
  _operators = []
  constructor(root: Expression, operators: Array<string>){
    this._root = root
    this._operators = operators
  }

  treeTraverse(node = this._root){
    if (node != null){
      console.log(node.operator)
      this.treeTraverse(node.left)
      this.treeTraverse(node.right)
    }
  }
  
  derivate(node: Expression){
    if (node != null){
      node.left = this.derivate(node.left)
      node.right = this.derivate(node.right)

      if (node.left != null && node.right != null){
        if (isNumber(node.left.operator) && isNumber(node.right.operator)){
          return this.operateNode(node)
        }
        if (this._operators.indexOf(node.operator) == 4){
          if (node.left.operator == 'x' && isNumber(node.right.operator)){
            return this.powerDerivate(node)
          }
        }
      }
      
      /*if (isNumber(node.operator) && node.operator != 'x' && !this._operators.find(key => key == node.operator)){
        console.log('test', node.operator)
        return null
      }*/
      //console.log('===============================')
      //console.log(JSON.stringify(node, null, 4))
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

    result.operator = node.right.operator + node.left.operator + '^(' + (parseFloat(node.right.operator) - 1) + ')'

    return result
  }
}


function isNumber (input: any): boolean{
  return !isNaN(input)
}