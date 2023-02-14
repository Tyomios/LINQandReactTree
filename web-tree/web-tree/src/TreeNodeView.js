import React from 'react';
import './index.css';

// Component to display tree node data and and fire events.
export class TreeNodeView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            node: this.props.node
        };
    }

    // Handle click on node name.
    handleNodeSelect(id, name) {
        this.props.onNodeClick(id, name);
    }

    // Render node name and childs.
    render() {

        var childNodes = []
        if (this.props.node.childs !== null
            && typeof this.props.node.childs !== 'undefined'
            && this.props.node.childs.length > 0) {
            for (var i = 0; i < this.props.node.childs.length; i++) {
                childNodes.push(this.renderChildNode(i));
            }
        }

        return (
            <div>
                <button className="node" onClick={() => this.props.onNodeClick(this.props.node.id, this.props.node.name)}>
                    {this.props.node.name}
                </button>
                <div className="childs">
                    {childNodes}
                </div>
            </div>
        );
    }

    renderChildNode(i) {
        return (
            <TreeNodeView node={this.props.node.childs[i]} key={this.props.node.childs[i].id}
            onNodeClick={(id, name) => this.handleNodeSelect(id, name)}></TreeNodeView>
        );
    }
}