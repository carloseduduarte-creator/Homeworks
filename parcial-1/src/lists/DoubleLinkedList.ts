import DoubleNode from './DoubleNode'

class DoubleLinkedList {
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
    } else {
      newNode.previous = this.tail
      this.tail!.next = newNode
      this.tail = newNode
    }

    this.length++
  }

  remove(value: string) {
    let current = this.head

    while (current) {
      if (current.value === value) {
        if (current.previous) {
          current.previous.next = current.next
        } else {
          this.head = current.next
        }

        if (current.next) {
          current.next.previous = current.previous
        } else {
          this.tail = current.previous
        }

        this.length--
        return
      }

      current = current.next
    }
  }

  print() {
    let current = this.head

    while (current) {
      console.log(current.value)
      current = current.next
    }
  }
}

export default DoubleLinkedList