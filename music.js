class BinarySearchTree {
    constructor() {
       // Initialize a root element to null.
       this.root = null;
    }
    insertIter(data,volume) {
       let node = new this.Node(data,volume=volume);
       
       
       
 
    // Check if the tree is empty
    if (this.root === null) {
       // Insert as the first element
       this.root = node;
      
       return;
    }
    let currNode = this.root;
    while (true) {
    if (data < currNode.data) {
       // Set the value here as we've reached a leaf node
       if (currNode.left === null) {
          currNode.left = node;
             break;
          } else {
             currNode = currNode.left;
          }
       } else {
          // Set the value here as we've reached a leaf node
          if (currNode.right === null) {
             currNode.right = node;
             break;
          } else {
             currNode = currNode.right;
          }
       }
    }
 }
 insertRec(data) {
    let node = new this.Node(data);
 
    // Check if the tree is empty
    if (this.root === null) {
       // Insert as the first element
       this.root = node;
    } else {
       insertRecHelper(this.root, node);
    }
 }
 searchIter(data) {
    let currNode = this.root;
 
    while (currNode !== null) {
       if (currNode.data === data) {
 
       // Found the element!
       return true;
    } else if (data < currNode.data) {
 
       // Go Left as data is smaller than parent
       currNode = currNode.left;
    } else {
 
       // Go right as data is greater than parent
       currNode = currNode.right;
    }
 }
 return false;
 }
 searchRec(data) {
    return searchRecHelper(data, this.root);
 }
 getMinVal() {
    if (this.root === null) {
    throw "Empty tree!";
 }
 let currNode = this.root;
 
 while (currNode.left !== null) {
       currNode = currNode.left;
    }
 return currNode.data;
 }
 getMaxVal() {
    if (this.root === null) {
       throw "Empty tree!";
    }
    let currNode = this.root;
 
    while (currNode.right !== null) {
       currNode = currNode.right;
    }
    return currNode.data;
 }
 deleteNode(key) {
    
    return !(deleteNodeHelper(this.root, key) === false);
 }
 inOrder() {
    inOrderHelper(this.root);
 }
 preOrder() {
    preOrderHelper(this.root);
 }
 postOrder() {
    postOrderHelper(this.root);
 }
 }
 
 BinarySearchTree.prototype.Node = class {
    constructor(data, left = null, right = null, volume) {
       this.data = data;
       this.left = left;
       this.right = right;
       this.volume = volume;
       alert(this.volume);
       
    }
 };
 
 // HELPER METHODS
 function preOrderHelper(root) {
    if (root !== null) {
       console.log(root.data);
       preOrderHelper(root.left);
       preOrderHelper(root.right);
    }
 }
 function inOrderHelper(root) {
    if (root !== null) {
       inOrderHelper(root.left);
       console.log(root.data);
       inOrderHelper(root.right);
    }
 }
 
 function postOrderHelper(root) {
    if (root !== null) {
       postOrderHelper(root.left);
       postOrderHelper(root.right);
    console.log(root.data);
    }
 }
 
 function insertRecHelper(root, node) {
    if (node.data < root.data) {
 
       // Set the value here as we've reached a leaf node
       if (root.left === null) {
          root.left = node;
       } else {
          insertRecHelper(root.left, node);
       }
    } else {
       // Set the value here as we've reached a leaf node
       if (root.right === null) {
          root.right = node;
       } else {
          insertRecHelper(root.right, node);
       }
    }
 }
 
 function searchRecHelper(data, root) {
    if (root === null) {
       // Reached leaf but didn't find it.
       return false;
    }
    if (data < root.data) {
       return searchRecHelper(data, root.left);
 } else if (data > root.data) {
       return searchRecHelper(data, root.right);
    }
    // This means element is found return true;
 }
 function deleteNodeHelper(root, key) {
    if (root === null) {
    // Empty tree return false;
    }
    
    if (key < root.data) {
    root.left = deleteNodeHelper(root.left, key);
    return root;
    } else if (key > root.data) {
    root.right = deleteNodeHelper(root.right, key);
    return root;
    } else {
    // No children
    //case 1 - a leaf node
    if (root.left === null && root.right === null) {
    root = null;
    return root;
    }
    
    // Single Child cases
    if (root.left === null) return root.right;
    if (root.right === null) return root.left;
    
    // Both children, so need to find successor
    let currNode = root.right;
    
    while (currNode.left !== null) {
    currNode = currNode.left;
    } root.data = currNode.data;
    
    // Delete the value from right subtree.
    root.right = deleteNodeHelper(root.right, currNode.data);
    return root;
    }
}

let music = new BinarySearchTree();
music.insertIter(2,volume=4);

