
import TreeNode from './TreeNode.js';

class NaryTree {
    constructor() {
        this.root = null;
    }

    setRoot(title, link, component) {
        this.root = new TreeNode(title, link, component);
        return this.root;
    }

    addChild(parent, title, link, component) {
        const newNode = new TreeNode(title, link, component);
        parent.addChild(newNode);
        return newNode;
    }

    printTree(node = this.root) {
        if (node !== null) {
            console.log(node.title);

            node.children.forEach((child) => {
                this.printTree(child);
            });
        }
    }
}

export default NaryTree;
