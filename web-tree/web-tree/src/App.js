import './App.css';
import React from 'react';
import { TreeView } from './TreeView';
import { Tree } from './Tree';

function App() {
  let tree = new Tree(new Node(1, "root"));
  return (
    <div className="App">
      <TreeView tree={tree}></TreeView>
    </div>
  );
}

export default App;
