
import TreeNode from './TreeNode.js';

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);

        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else if (newNode.value > node.value) {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    inOrder(node = this.root) {
        if (node !== null) {
            this.inOrder(node.left);
            console.log(node.value);
            this.inOrder(node.right);
        }
    }

    postOrder(node = this.root) {
        if (node !== null) {
            this.postOrder(node.left);
            this.postOrder(node.right);
            console.log(node.value);
        }
    }

    preOrder(node = this.root) {
        if (node !== null) {
            console.log(node.value);
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }

    toD3Tree(node = this.root) {
        if (node === null) {
            return null;
        }

        const children = [];

        if (node.left !== null) {
            children.push(this.toD3Tree(node.left));
        }

        if (node.right !== null) {
            children.push(this.toD3Tree(node.right));
        }

        return {
            name: String(node.value),
            ...(children.length > 0 && { children })
        };
    }


    search(value, node = this.root) {
        if (node === null) {
            return false;
        }

        if (node.value === value) {
            return true;
        }

        if (value < node.value) {
            return this.search(value, node.left);
        }

        return this.search(value, node.right);
    }
}

export default BinaryTree;
