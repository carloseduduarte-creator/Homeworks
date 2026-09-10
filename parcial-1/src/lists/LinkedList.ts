import Node from './Node'

class LinkedList {
  head: Node | null
  tail: Node | null
  length: number

  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  append(value: string) {
    const newNode = new Node(value)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail!.next = newNode
      this.tail = newNode
    }

    this.length++
  }

  remove(value: string) {
    let current = this.head
    let previous: Node | null = null

    while (current) {
      if (current.value === value) {
        if (previous === null) {
          this.head = current.next
        } else {
          previous.next = current.next
        }

        if (current === this.tail) {
          this.tail = previous
        }

        this.length--
        return
      }

      previous = current
      current = current.next
    }
  }

  getValues() {
    const values: string[] = []
    let current = this.head

    while (current) {
      values.push(current.value)
      current = current.next
    }

    return values
  }

  print() {
    let current = this.head

    while (current) {
      console.log(current.value)
      current = current.next
    }
  }
}

export default LinkedList