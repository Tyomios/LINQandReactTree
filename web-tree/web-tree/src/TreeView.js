import React from 'react';
import './index.css';
import { TreeNodeView } from './TreeNodeView';
import { ControlPanel } from './ControlPanel';

export class TreeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tree: this.props.tree,
            selectedNodeId: 0,
            selectedNodeName: ""
        };
    }

    handleAddNode = () => {
        var tree = this.state.tree;
        tree.addNode(new Node(1, "new node"), this.state.selectedNodeId);

        this.setState({tree: tree});
    }

    handleRemoveNode = () => {
        var tree = this.state.tree;
        tree.removeNode(this.state.selectedNodeId);

        this.setState({tree: tree, selectedNodeId: 0, selectedNodeName: ""});
    }

    handleClearTree = () => {
        var tree = this.state.tree;
        tree.clearTree();

        this.setState({tree: tree, selectedNodeId: 0, selectedNodeName: ""});
    }

    handleEditNode = (name) => {
        var tree = this.state.tree;
        tree.editNode(this.state.selectedNodeId, name);

        this.setState({tree: tree, selectedNodeName: name});
    }

    handleNodeClick = (id, name) => {
        this.setState({selectedNodeId: id, selectedNodeName: name});
    }

    // Render tree nodes.
    render() {
        return (
            <div>
                {this.props.tree.map((node, index) => {
                    return <TreeNodeView key={index} node={node} onNodeClick={this.handleNodeClick} />
                })}
                <ControlPanel selectedNodeName={this.state.selectedNodeName}
                onAddNode={() => this.handleAddNode}
                onRemoveNode={() => this.handleRemoveNode}
                onEditNode={(name) => this.handleEditNode}
                onClearTree={() => this.handleClearTree}></ControlPanel>
            </div>
        );
    }
}