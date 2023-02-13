import React from 'react';

export function ControlPanel(props) {
    function handleChange(event) {
        if (event !== undefined)
        {
            props.onEditNode(event.target.value);
            console.log(event.target.value);
            console.log("in controlPanel: " + props.onEditNode);
        }
    }
  return (<div>
    <button className="button-control"
        onClick={props.onAddNode}>
        Add
    </button>
    <button className="button-control"
        onClick={props.onRemoveNode}>
        Remove
    </button>
    <button className="button-control"
        onClick={props.onClearTree}>
        Reset
    </button>
    <label>Selected Node:</label>
    <input value={props.selectedNodeName}
        onChange={handleChange}></input>
    </div>);
}