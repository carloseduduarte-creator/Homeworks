
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    isLeaf() {
        return this.left === null && this.right === null;
    }
}

export default TreeNode;
