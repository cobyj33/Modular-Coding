const nodeGraphs = [];

export const graphOf = function(scope) {
    const searched = nodeGraphs.filter(graph => graph.scope == scope);
    if (searched.length == 0) {
        const newGraph = new NodeGraph(scope);
        nodeGraphs.push(newGraph);
        return newGraph;
    }
    return searched[0];
}

export class NodeGraph {
    constructor(scope) {
        this.scope = scope;
        this.relations = [];
    }

    addNode() {

    }

    addConnection() {

    }

    removeConnection() {

    }
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
