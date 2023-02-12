import './App.css';
import { TreeNodeView } from './TreeNodeView';

function App() {
  let tree = new Tree(new Node(1, "root"));
  return (
    <div className="App">
      <TreeView tree={tree}></TreeView>
    </div>
  );
}

export default App;
