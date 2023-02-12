function ControlPanel(props) {
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
        onChange={props.onEditNode}></input>
    </div>);
}