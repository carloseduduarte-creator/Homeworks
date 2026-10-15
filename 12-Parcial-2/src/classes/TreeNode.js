
class TreeNode {
  constructor(name, type, email) {
    this.name = name;
    this.type = type;
    this.email = email;
    this.children = [];
  }

  addChild(node) {
    if (this.type === "folder") {
      this.children.push(node);
    }
  }
}

export default TreeNode;
