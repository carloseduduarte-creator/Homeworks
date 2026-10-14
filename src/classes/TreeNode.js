
class TreeNode {
    constructor(title, link, component) {
        this.title = title;
        this.link = link;
        this.component = component;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }
}

export default TreeNode;
