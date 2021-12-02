//counter, that will later help determine the order of notes to be played
let pause = 0;
//creating a tree
class BinarySearchTree {
   
    constructor() {
       // Initialize a root element to null.
       this.root = null;
  
       
    }
    //take the first x coordinate of the line and this will be the "data" of the node
    insertIter(data,beat) {
        //create a node object, each node will store a beat
        let node = new this.Node(data,null,null,beat);
        
       
       
 
    // Check if the tree is empty
    if (this.root === null) {
       // Insert as the first element
       this.root = node;
      
       return;
    }
    //first node you want to check against the root. 
    //currNode represents the node you are comparing the "data" against
    let currNode = this.root;
    //will iterate through the tree to find the correct place the node needs to be inserted
    while (true) {
       //if the data is larger then the current node
        if (data < currNode.data) {
            // check if the node to the left is empty
            if (currNode.left === null) {
            //if it is empty then insert the node here
            currNode.left = node;
            //it has been inserted to we can break away from the loop
            break;
            //if the node to the left is not empty...
            } else {
               //then set the current Node to the node to the left (this is the new node we will be checking our data against)
                currNode = currNode.left;
            }
         // if data is smaller then the current node
        }else {
            // Check if the node to the right of it is empty
            if (currNode.right === null) {
                //if it is empty then insert the node here
                currNode.right = node;
                 //it has been inserted to we can break away from the loop
                break;
              //if the node to the right is not empty...
            } else {
               //then set the current Node to the node to the right (this is the new node we will be checking our data against)
                currNode = currNode.right;
            }
        }
    }
 }
 //creating the node
 insertRec(data,beat) {
    let node = new this.Node(data,beat);
 
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
 //in order traversal
 inOrder() {
   //set the pause value to 0
   pause = 0;
   //calls the in order helper sending in the root value first
    inOrderHelper(this.root);
 }
 preOrder() {
   pause = 0;
    preOrderHelper(this.root);
 }
 postOrder() {
   pause = 0;
    postOrderHelper(this.root);
 }
 }
 
 BinarySearchTree.prototype.Node = class {
    constructor(data, left = null, right = null, beat, ) {
       this.data = data;
       this.left = left;
       this.right = right;
       this.beat = beat;  
    
    }
 };
 
 // HELPER METHODS
 function preOrderHelper(root) {
    if (root !== null) {
       console.log(root.data);
       for (let i = 0; i < root.beat.notes.length; i++) {
         //play the note..
         playMusic(root.beat.notes[i].pitch,root.beat.notes[i].volume,root.beat.notes[i].brush,pause,root.beat.notes[i].xcoOrds,root.beat.notes[i].ycoOrds,true)
          
       }
       pause = pause+0.5;
       preOrderHelper(root.left);
       preOrderHelper(root.right);
    }
 }
 function inOrderHelper(root) {
   //if the root is not empty
    if (root !== null) {
       //call the same function (recursion) sending the node to the left as the root
       inOrderHelper(root.left);
       //When there are no more nodes to the left, log the data of the leftest most node
       console.log(root.data);
       //play the leftest most beat, for every note in the beat...
       for (let i = 0; i < root.beat.notes.length; i++) {
         //play the note..
         playMusic(root.beat.notes[i].pitch,root.beat.notes[i].volume,root.beat.notes[i].brush,pause,root.beat.notes[i].xcoOrds,root.beat.notes[i].ycoOrds,true)
         
          
       }
       
       //playMusic(root.beat.pitch,root.beat.volume,root.beat.brush,pause,root.beat.xcoOrds,root.beat.ycoOrds,true);
       // there is going to be a 0.5 gap in between each beat. Everytime a node is traversed, the gap will increase 
       //ie the first note will play at time = 0, the second beat will play at time = 0.5, the third beat will play at time = 1...
       pause = pause+0.5;
       
       
       
       
      //addDotAnimations(root.beat.xcoOrds,root.beat.ycoOrds)
     
       
       //once there are no more nodes to the left, move to the node on the right
       inOrderHelper(root.right);
    }
 }
 
 function postOrderHelper(root) {
    if (root !== null) {
       postOrderHelper(root.left);
       postOrderHelper(root.right);
        console.log(root.data);
        for (let i = 0; i < root.beat.notes.length; i++) {
         //play the note..
         playMusic(root.beat.notes[i].pitch,root.beat.notes[i].volume,root.beat.notes[i].brush,pause,root.beat.notes[i].xcoOrds,root.beat.notes[i].ycoOrds,true)
          
       }
       pause = pause+0.5;
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

//create a new tree, this tree represents the music...
let music = new BinarySearchTree();



let test = new BinarySearchTree();












//each note is an object...

