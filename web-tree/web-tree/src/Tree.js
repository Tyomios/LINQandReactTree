export class Tree {
    constructor(rootNode) {
        this.rootNode = rootNode;
    }

    getRootNode() {
        return this.rootNode;
    }

    // Add node to tree.
    addNode(node, parentId) {
        let parentNode = this.findNodeById(parentId);
        if (parentNode) {
            parentNode.childs.push(node);
        }
    }

    // Remove node from tree.
    removeNode(id) {
        let parentNode = this.findParentNode(id);
        if (parentNode) {
            let index = parentNode.childs.findIndex(node => node.id === id);
            if (index !== -1) {
                parentNode.childs.splice(index, 1);
            }
        }
    }

    // edit node in tree.
    editNode(id, name) {
        let node = this.findNodeById(id);
        if (node) {
            node.name = name;
        }
    }

    // remove all childs from node.
    clearTree() {
        this.rootNode.childs = [];
    }

    // Find node by id.
    findNodeById(id) {
        return this.findNodeByIdRecursive(id, this.rootNode);
    }

    // Find node by id.
    // Recursive function.
    findNodeByIdRecursive(id, node) {
        if (node.id === id) {
            return node;
        }

        for (let i = 0; i < node.childs.length; i++) {
            let foundNode = this.findNodeByIdRecursive(id, node.childs[i]);
            if (foundNode) {
                return foundNode;
            }
        }
    }
}