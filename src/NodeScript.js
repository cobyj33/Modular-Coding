export const validVariableTypes = ['value', 'variable', 'function', 'array', 'object', 'loop', 'class']

let nodeID = 0;

export class NodeGraph {
    constructor(scope, nodes) {
        console.log(nodes);
        this.scope = scope;
        this.nodes = nodes ? [...nodes] : [];
    }

    get length() {
        return this.nodes.length
    }

    addNode(type, coordinates) {
        const newNode = new Node({type: type, coordinates: coordinates})
        console.log(newNode);
        this.nodes.push(newNode);
        console.log(this.nodes.length)
    }

    addConnection() {

    }

    removeConnection() {

    }

    deleteNode(node) {
        node.separate();
        this.nodes = this.nodes.filter(curr => curr.id !== node.id)
    }

    
}

class Node {
    constructor({ type, name, scope, coordinates }) {
        this.type = type;
        this.name = name;
        this.connections = []
        this.numOfConnections = 4;
        this.scope = scope ? scope : "window";
        this.id = ++nodeID;
        this.coordinates = coordinates ? coordinates : {
            x: 0,
            y: 0
        };
        console.log('run through node constructor');
    }

    getInstance() {
        // const hashVal = window.hash(this);
        // switch(this.type) {
        //     case 'variable': return <VariableNode nodeObj={this} key={hashVal} position={this.position} />
        // }
        // return 'GET INSTANCE ERROR';
    }

    connect(node) {
        this.connections.push(node);
    }

    disconnect(node) {
        this.connections = this.connections.filter(connection => connection !== node);
    }

    separate() {
        this.connections.forEach(connection => {
            connection.connections = connection.connections.filter(con => con !== this);
        });
        this.connections = [];
    }
}
