import DoubleNode from './DoubleNode'

class DoubleCircularLinkedList {
  head: DoubleNode | null
  tail: DoubleNode | null
  length: number

  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  append(value: string) {
    const newNode = new DoubleNode(value)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode

      newNode.next = newNode
      newNode.previous = newNode
    } else {
      newNode.previous = this.tail
      newNode.next = this.head

      this.tail!.next = newNode
      this.head!.previous = newNode

      this.tail = newNode
    }

    this.length++
  }

  getValues() {
    const values: string[] = []
    let current = this.head

    if (!current) {
      return values
    }

    for (let i = 0; i < this.length; i++) {
      values.push(current.value)
      current = current.next!
    }

    return values
  }

  print() {
    if (!this.head) {
      return
    }

    let current = this.head

    for (let i = 0; i < this.length; i++) {
      console.log(current.value)
      current = current.next!
    }
  }
}

export default DoubleCircularLinkedList