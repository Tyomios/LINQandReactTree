import { TreeNode } from './TreeNode';

export class Tree {
    constructor(rootNode) {
        this.rootNode = rootNode;
    }

    getRootNode() {
        return this.rootNode;
    }

    // Add node to tree.
    addNode(parentId) {
        let parentNode = this.findNodeById(parentId);
        console.log("in tree: " + parentNode.id);
        if (parentNode) {
            let id = `${parentId}${parentNode.childs.length}`;
            id = parseInt(id);
            id++;
            parentNode.childs.push(new TreeNode(id, "node " + id, []));
            console.log("count: " + parentNode.childs.length);
        }
    }

    // Remove node from tree.
    removeNode(id) {
        var idAsString = id.toString();
        console.log("idLength: " + idAsString.length);
        var parentNodeId = parseInt(this.deleteLastChar(idAsString));
        if (parentNodeId === "") {
            parentNodeId = 0;
        }
        let parentNode = this.findNodeById(parentNodeId);
        console.log("removed: " + parentNode);
        if (parentNode) {
            let index = parentNode.childs.findIndex(node => node.id === id);
            if (index !== -1) {
                parentNode.childs.splice(index, 1);
            }
        }
    }

    deleteLastChar(str) {
        return str.substring(0, str.length - 1);
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