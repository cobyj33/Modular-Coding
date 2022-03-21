import { useState, createContext} from "react";
import { NodeArea } from "./components/NodeArea";
import { Sidebar } from "./components/SideBar/Sidebar";
import { BottomBar } from "./components/BottomBar/BottomBar";
import { VariableNode } from "./components/Nodes/VariableNode";
import "./App.css";
import { FileExplorer } from "./Files";

let fileCounter = 1;

let nodeID = 0;
export const NodeContext = createContext(null);
function App() {
    const fileExplorer = new FileExplorer();
    const [scope, setScope] = useState('window');
    const [files, setFiles] = useState(fileExplorer.head);
    const [nodes, setNodes] = useState([]);
    const [nodeSelection, setNodeSelection] = useState('variable');

    return (
        <NodeContext.Provider value={{
            nodeState: [nodes, setNodes],
            selectionState: [nodeSelection, setNodeSelection],
            fileExplorer: fileExplorer
        }}>
            <Sidebar files={files} fileExplorer={fileExplorer} />
            <NodeArea scope={scope} file={fileExplorer.head}/>
            <BottomBar />
        </NodeContext.Provider>
    )
}

export default App;

export class Node {
    constructor({ type, name, scope, position }) {
        this.type = type;
        this.name = name;
        this.connections = []
        this.numOfConnections = 4;
        this.scope = scope ? scope : "window";
        console.log('nodeid ', nodeID);
        this.id = ++nodeID;
        this.position = position ? position : {
            left: 0,
            top: 0
        };
    }

    getInstance() {
        const hashVal = window.hash(this);
        switch(this.type) {
            case 'variable': return <VariableNode nodeObj={this} key={hashVal} position={this.position} />
        }
        return 'GET INSTANCE ERROR';
    }

    connect(node) {
        this.connections.push(node);
    }

    disconnect(node) {
        this.connections = this.connections.filter(connection => connection !== node);
    }

    separate() {
        this.connections = [];
        this.connections.forEach(connection => {
            connection.connections = connection.connections.filter(con => con !== this);
        });
    }
}
