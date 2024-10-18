class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(v => this.addVertex(v));
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    vertex.adjacent.forEach(v => {
      v.adjacent.delete(vertex)
    })
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = new Set()
    const result = []
    const traverse = (vertex) => {
      // if the vertex has already been visited, return
      if (visited.has(vertex)) return
      // add the vertex to the visited set and the result array
      visited.add(vertex)
      result.push(vertex.value)
      // traverse all the adjacent vertices
      vertex.adjacent.forEach(v => traverse(v))
    }
    traverse(start)
    return result
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = new Set()
    const result = []
    const queue = [start]
    visited.add(start)
    while (queue.length) {
      // shift the first vertex off the queue
      const vertex = queue.shift()
      // add the value of the vertex to the result array
      result.push(vertex.value)
      // loop through adjacent vertices
      vertex.adjacent.forEach(v => {
        // if the adjacent vertex has not been visited
        if (!visited.has(v)) {
          // mark the vertex as visited
          visited.add(v)
          // add the vertex to the queue to be processed later
          queue.push(v)
        }
      })
    }
    return result
  }
}

module.exports = {Graph, Node}