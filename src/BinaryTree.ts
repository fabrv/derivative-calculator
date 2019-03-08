import { finished } from "stream";

class TNode{
  value: string
  key: number
  left: TNode = null
  right: TNode = null
  height: number = 0
}

class BinaryTree{
  root: TNode = null
  constructor(){
    this.insertNode(10, 'test')
    this.insertNode(2, 'test 2')
    this.insertNode(12, 'test 2')
    this.printTree()
    //console.log(this.findNode(6))
  }

  findNode(key: number, node: TNode = this.root): TNode{
    if (node == null){
      return node
    }

    if (key > node.key){
      return this.findNode(key, node.right)
    } else if (key == node.key){
      return node
    } else {
      return this.findNode(key, node.left)
    }
  }

  insertNode(key: number, value: string, node: TNode = this.root, lastNode: TNode = this.root, right: boolean = true){
    const newNode = new TNode
    newNode.key = key
    newNode.value = value

    if (node == null){
      if (right){
        lastNode.right = newNode
      }else{
        lastNode.left = newNode
      }
      return node
    }

    if (key >= node.key){
      return this.insertNode(key, value, node.right, node, true)
    } else {
      return this.insertNode(key, value, node.left, node, false)
    }
  }

  printTree(node: TNode = this.root){
    if (node != null){
      console.log(node.key, node.value)
      this.printTree(node.left)
      this.printTree(node.right)
    }
  }
}

export default new BinaryTree()