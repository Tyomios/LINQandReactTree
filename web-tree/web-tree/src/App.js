import './App.css';
import React from 'react';
import { TreeView } from './TreeView';
import { Tree } from './Tree';
import { TreeNode } from './TreeNode';

function App() {
  let tree = new Tree(new TreeNode(0, "root", []));
  return (
    <div className="App">
      <TreeView tree={tree}></TreeView>
    </div>
  );
}

export default App;
