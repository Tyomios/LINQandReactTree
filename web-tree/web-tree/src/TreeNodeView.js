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
    // If node has childs, then expand/collapse node.
    // If node has no childs, then fire event to parent component.
    handleNodeSelect = (event) => {
        this.props.onNodeClick(this.props.node.id, this.props.node.name);
    }

    // Render node name and childs.
    render() {
        return (
            <div>
                <div className="node" onClick={this.handleNodeSelect}>
                    {this.props.node.name}
                </div>
                <div className="childs">
                    {this.props.node.childs.map((node) => {
                        return <TreeNodeView node={node} onNodeClick={this.props.onNodeClick}></TreeNodeView>
                    })}
                </div>
            </div>
        );
    }
}