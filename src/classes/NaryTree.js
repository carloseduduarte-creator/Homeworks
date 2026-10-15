
import TreeNode from "./TreeNode";

class NaryTree {
  constructor(name, email) {
    this.root = new TreeNode(name, "folder", email);
  }

  addNode(parent, node) {
    if (parent.type !== "folder") {
      console.log("No se pueden agregar hijos a un archivo");
      return false;
    }

    if (!this.findNode(this.root, parent)) {
      console.log("La carpeta no pertenece al árbol");
      return false;
    }

    parent.addChild(node);
    return true;
  }

  findNode(current, target) {
    if (current === target) {
      return true;
    }

    for (let child of current.children) {
      if (this.findNode(child, target)) {
        return true;
      }
    }

    return false;
  }

  printTree(node = this.root) {
    console.log(node.name);

    for (let child of node.children) {
      this.printTree(child);
    }
  }
}

export default NaryTree;
