import { Collapsible } from './collapsible.js'

const fs = {
  clear() {
    self.innerHTML = ''
  },
  self: document.querySelector('#file-system')
}

fs.clear()


let depthsArray = [[2, 4], [1, 5], [3, 1, 2]]

const spam = (root, n = 1, trees = [2, 1, 3, 5]) => {
  trees.forEach((tree, rootIndex) => {
    const treeNode = root.createNode({
      name: `Tree ${rootIndex + 1}`,
      nodeType: 'folder',
      isRoot: false,
      id: `Tree ${rootIndex + 1}`,
    })

    tree.forEach((depth, subTreeIndex) => {
      let depthCount = 0;

      const sub = treeNode.createNode({
        name: `Subtree ${subTreeIndex + 1}`,
        nodeType: 'folder',
        isRoot: false,
        id: `${treeNode.name} - Subtree ${subTreeIndex + 1}`,
      })

      while (depthCount < depth) {
        const depth = sub.createNode({
          name: `Child ${depthCount + 1}`,
          nodeType: 'folder',
          isRoot: false,
          id: `${sub.name} - Child ${depthCount + 1}`,
        })

        depthCount++;
      }
    });
  });
}

const rootNode = new Collapsible({
  isRoot: true,
  id: 'root folder',
  nodeType: 'folder',
  name: 'root',
  children: [],
  nodes: [],
}, null);

fs.self.appendChild(rootNode.self)

spam(rootNode, 2, depthsArray)
