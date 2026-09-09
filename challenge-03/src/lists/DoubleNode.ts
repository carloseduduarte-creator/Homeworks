class DoubleNode {
  value: string
  next: DoubleNode | null
  previous: DoubleNode | null

  constructor(value: string) {
    this.value = value
    this.next = null
    this.previous = null
  }
}

export default DoubleNode