function Node(value) {
  this.value = value
  this.isEndOfWord = false
  this.children = {}
}

class Trie {
  constructor() {
    this.root = new Node(null)
  }

  insert(word, popularity) {
    let current = this.root

    for (let character of word) {
      if (current.children[character] === undefined) {
        current.children[character] = new Node(character)
      }
      current = current.children[character]
    }

    current.isEndOfWord = true
    current.word = word
    current.popularity = popularity
  }

  search(word) {
    let current = this.root

    for (let character of word) {
      if (current.children[character] === undefined) {
        return false
      }
      current = current.children[character]
    }

    return current.isEndOfWord
  }

  palabrasConPrefijo(prefix) {
    let current = this.root

    for (let character of prefix) {
      if (current.children[character] === undefined) return []
      current = current.children[character]
    }

    const lista = []
    this.recolectar(current, lista)
    return lista
  }

  recolectar(node, lista) {
    if (node.isEndOfWord) {
      lista.push({ name: node.word, popularity: node.popularity })
    }
    for (let character in node.children) {
      this.recolectar(node.children[character], lista)
    }
  }
}

export default Trie
