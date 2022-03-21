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

class NodeGraph {
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