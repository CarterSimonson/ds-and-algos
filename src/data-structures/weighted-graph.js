import MinPriorityQueue from "../data-structures/min-priority-queue.js";

export default class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (this.adjacencyList[vertex]) throw "Vertex already exists";

    this.adjacencyList[vertex] = [];
  }

  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) throw "Vertex does not exist";

    [...this.adjacencyList[vertex]].forEach(({ node }) => this.removeEdge(vertex, node));
    delete this.adjacencyList[vertex];
  }
  
  addEdge(a, b, weight) {
    [a, b].forEach((vertex) => {
      if (!this.adjacencyList[vertex]) throw `Vertex "${vertex}" does not exist`;
    });

    const aEdges = this.adjacencyList[a];
    const bEdges = this.adjacencyList[b];
    const aEdgeIndex = aEdges.findIndex(({ node }) => node === b);
    const bEdgeIndex = bEdges.findIndex(({ node }) => node === a);

    if (aEdgeIndex !== -1 || bEdgeIndex !== -1) throw `${a} already contains an edge to ${b}`;

    this.adjacencyList[a].push({ node: b, weight });
    this.adjacencyList[b].push({ node: a, weight });
  }

  removeEdge(a, b) {
    [a, b].forEach((vertex) => {
      if (!this.adjacencyList[vertex]) throw `Vertex "${vertex}" does not exist`;
    });

    const aEdges = this.adjacencyList[a];
    const bEdges = this.adjacencyList[b];
    const aEdgeIndex = aEdges.findIndex(({ node }) => node === b);
    const bEdgeIndex = bEdges.findIndex(({ node }) => node === a);

    if (aEdgeIndex === -1 || bEdgeIndex === -1) throw `${a} does not contain an edge to ${b}`;

    aEdges.splice(aEdgeIndex, 1);
    bEdges.splice(bEdgeIndex, 1);
  }

  bfs(vertex, results = [], visited = {}) {
    if (!vertex) {
      return results;
    }

    results.push(vertex);
    visited[vertex] = true;

    this.adjacencyList[vertex].forEach(({ node }) => {
      if (!visited[node]) {
        this.bfs(node, results, visited);
      }
    });

    return results;
  }

  dfs(vertex, results = [], visited = {}, queue = []) {
    if (!vertex) {
      return results;
    }

    results.push(vertex);
    visited[vertex] = true;

    this.adjacencyList[vertex].forEach(({ node }) => {
      if (!visited[node]) {
        queue.push(node);
        visited[node] = true;
      }
    });

    if (queue.length > 0) {
      this.dfs(queue.shift(), results, visited, queue);
    }

    return results;
  }

  dijkstra(a, b) {
    const visited = {};
    const previous = {};
    const distance = {};
    const priorityQueue = new MinPriorityQueue();

    // Setup data structures
    Object.keys(this.adjacencyList).forEach((vertex) => {
      distance[vertex] = vertex === a ? 0 : Infinity;
      priorityQueue.enqueue(vertex, distance[vertex]);
    });
    
    const iterate = (vertex) => {
      if (!vertex) return;

      const edges = this.adjacencyList[vertex];
      if (!visited[vertex]) {
        edges.forEach(({ node, weight }) => {
          // Determine if this is the shortest path for the given node
          const total = distance[vertex] + weight;
          if (total < distance[node]) {
            previous[node] = vertex;
            distance[node] = total;
            priorityQueue.enqueue(node, total);
          }
        });
        visited[vertex] = true;

        // If we've visited the destination node, that means the algorithm has finished
        if (vertex === b) return;
      }

      iterate(priorityQueue.dequeue()?.val);
    }
    iterate(priorityQueue.dequeue()?.val);

    // Build and return the path
    const buildPath = (vertex, path = []) => {
      if (!vertex) {
        return path.reverse();
      }
      path.push(vertex);
      return buildPath(previous[vertex], path);
    }

    return {
      path: buildPath(b),
      distance: distance[b]
    };
  }
}

// Test:
const graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "F", 1);
graph.addEdge("D", "E", 3);
graph.addEdge("F", "E", 1);

const x = graph.dijkstra("A", "E");
console.log(x);