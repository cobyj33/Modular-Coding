import { VariableNode } from "./components/Nodes/VariableNode";

export const nodes = [];
let nodeID = 0;

export const getScopes = function() {
    return nodes.map(node => node.scope).filter((node, index, self) => self.indexOf(node) === index);
}

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
        this.id = hashVal;
        switch(this.type) {
            case 'var': return <VariableNode nodeObj={this} key={hashVal} position={this.position} />
        }
        return 'GET INSTANCE ERROR';
    }

    connect(node) {
        this.connections.push(node);
    }

    disconnect(node) {
        this.connections = this.connections.filter(connection => connection !== node);
    }

    delete() {
        console.log(this);
        this.connections = [];
        this.connections.forEach(connection => {
            connection.connections = connection.connections.filter(con => con !== this);
        });
        
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i] == this) {
                nodes.splice(i, 1); break;
            }
        }
    }
}