export default class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (this.adjacencyList[vertex]) throw "Vertex already exists";

    this.adjacencyList[vertex] = [];
  }

  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) throw "Vertex does not exist";

    [...this.adjacencyList[vertex]].forEach(neighbor => this.removeEdge(vertex, neighbor));
    delete this.adjacencyList[vertex];
  }
  
  addEdge(a, b) {
    [a, b].forEach((vertex) => {
      if (!this.adjacencyList[vertex]) throw `Vertex "${vertex}" does not exist`;
    });

    this.adjacencyList[a].push(b);
    this.adjacencyList[b].push(a);
  }

  removeEdge(a, b) {
    [a, b].forEach((vertex) => {
      if (!this.adjacencyList[vertex]) throw `Vertex "${vertex}" does not exist`;
    });

    const aEdges = this.adjacencyList[a];
    const bEdges = this.adjacencyList[b];

    if (!aEdges.includes(b)) throw `${a} does not contain an edge to ${b}`;
    if (!bEdges.includes(a)) throw `${b} does not contain an edge to ${a}`;

    aEdges.splice(aEdges.indexOf(b), 1);
    bEdges.splice(bEdges.indexOf(a), 1);
  }

  bfs(vertex, results = [], visited = {}) {
    if (!vertex) {
      return results;
    }

    results.push(vertex);
    visited[vertex] = true;

    this.adjacencyList[vertex].forEach((neighbor) => {
      if (!visited[neighbor]) {
        this.bfs(neighbor, results, visited);
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

    this.adjacencyList[vertex].forEach((neighbor) => {
      if (!visited[neighbor]) {
        queue.push(neighbor);
        visited[neighbor] = true;
      }
    });

    if (queue.length > 0) {
      this.dfs(queue.shift(), results, visited, queue);
    }

    return results;
  }
}

// Test
// const graph = new Graph();
// graph.addVertex("A");
// graph.addVertex("B");
// graph.addVertex("C");
// graph.addVertex("D");
// graph.addVertex("E");
// graph.addVertex("F");

// graph.addEdge("A", "B");
// graph.addEdge("A", "C");
// graph.addEdge("B", "D");
// graph.addEdge("C", "E");
// graph.addEdge("D", "E");
// graph.addEdge("D", "F");
// graph.addEdge("E", "F");

// console.log(graph.dfs("A"));