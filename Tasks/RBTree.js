/**
 * Created by Anton on 12.10.2017.
 */

function Start(){
    this.start = null;
    this.name = "root"
}

function NIL(){
    this.color = 0;
    this.value = null;
    this.name = "nil";
    this.parent = null;
}

root = new Start();
nil = new NIL();


function RBNode(value, parent){
    this.color = 1; //0 - черный, 1 - красный
    this.value = value;
    this.leftChild = nil;
    this.rightChild = nil;
    this.name = "node";
    if(parent === null) {
        this.parent = root;
        root.start = this;
    }
    else{
        if(parent.value > this.value)
            parent.leftChild = this;
        else
            parent.rightChild = this;
        this.parent = parent
    }
}

function addNewRBNode(value, node){
    console.log("hahaha lol");
    if(node === root && node.start !== null){
        return addNewRBNode(value, root.start);
    }
    if(node === root || node === null) {
        return new RBNode(value, null);
    }
    var parent = node;
    var currentChild;
    do {
        console.log(parent);
        if(parent.name === "node") {
            if (parent.value > value)
                currentChild = parent.leftChild;
            else
                currentChild = parent.rightChild;
            if (currentChild !== nil) {
                parent = currentChild;
            }
        }
        console.log("test");
    } while(currentChild !== nil);
    var newNode = addNewRBNode(value, parent);
    checkColor(newNode);
    return newNode;
}

function rotate_left(curNode){
    var buf = curNode.rightChild;
    buf.parent = curNode.parent;
    if(curNode.parent !== root) {
        if (curNode.parent.leftChild === buf) {
            curNode.parent.leftChild = buf;
        } else {
            curNode.parent.rightChild = buf;
        }
    } else
        root.start = buf;

    curNode.rightChild = buf.leftChild;
    if(curNode.rightChild !== nil)
        curNode.rightChild.parent = curNode;

    curNode.parent = buf;
    buf.leftChild = curNode;
}

function rotate_right(curNode){
    var buf = curNode.leftChild;
    buf.parent = curNode.parent;
    if(curNode.parent !== root){
        if (curNode.parent.leftChild === buf) {
            curNode.parent.leftChild = buf;
        } else {
            curNode.parent.rightChild = buf;
        }
    } else
        root.start = buf;

    curNode.leftChild = buf.rightChild;
    if(curNode.leftChild !== nil)
        curNode.leftChild.parent = curNode;

    curNode.parent = buf;
    buf.rightChild = curNode;
}

function checkColor(node){
    var gParent = node.parent.parent;
    var parent = node.parent;
    if(gParent === root){
        return;
    }
 //   if(node.parent.color === node.color)
}

function test(){
    console.log("hello");
}


function case1_rotate_left(){
    addNewRBNode(10, null);
    addNewRBNode(9, root.start);
    addNewRBNode(14, root.start);
    addNewRBNode(11, root.start);
    addNewRBNode(18, root.start);
    addNewRBNode(15, root.start);
    addNewRBNode(19, root.start);
    rotate_left(root.start.rightChild);
}

/*
 public void checkAfterInsert(Node x) {
     Node parent = x.parent;
     if (parent != null) {
         if (x.rightChild == null && x.leftChild == null) {
             checkAfterInsert(x.parent);
             return;
         }

         if (parent.leftChild != null && parent.rightChild != null && parent.leftChild.color == RED && parent.rightChild.color == RED) {
             if (x.color == RED && (x.rightChild != null && x.rightChild.color == RED || x.leftChild != null && x.leftChild.color == RED)) {
                DoubleRed(x, true);
             }
         } else {
             if (x.color == RED && (x.rightChild != null && x.rightChild.color == RED || x.leftChild != null && x.leftChild.color == RED)) {
                DoubleRed(x, false);
             }
         }
     } else {
     this.root = x;
     x.color = BLACK;
     return;
     }
     if (x.parent != null) {
     checkAfterInsert(x.parent);
     } else {
     this.root = x;
     x.color = BLACK;
     }
 }

 public void checkAfterDelete(Node x) {

 if (x.leftChild == null && x.rightChild == null) {
 return;
 }
 // когда левый/правый и правый/левый красный и черный соответственное (1-ый случай)
 if (x.leftChild != null && x.rightChild != null && x.color == BLACK) {
 if (x.leftChild.color == BLACK && x.rightChild.color == RED) {
 rotateLeft(x);
 x.color = RED;
 x.parent.color = BLACK;
 } else if (x.rightChild.color == BLACK && x.leftChild.color == RED) {
 rotateRight(x);
 x.color = RED;
 x.parent.color = BLACK;
 }
 // проверяем их детей на баланс в дереве
 checkAfterDelete(x.leftChild);
 checkAfterDelete(x.rightChild);
 return;
 }
 // когда сыновья x оба черные
 if (x.leftChild == null && x.rightChild.color == BLACK) {
 x.rightChild.color = RED;
 x.color = BLACK;
 checkAfterDelete(x.rightChild);
 return;
 } else if (x.rightChild == null && x.leftChild.color == BLACK) {
 x.leftChild.color = RED;
 x.color = BLACK;
 checkAfterDelete(x.leftChild);
 return;
 } else if (x.leftChild.color == BLACK && x.rightChild.color == BLACK) {
 Node right = x.rightChild;
 Node left = x.leftChild;
 if (right.rightChild == null && right.leftChild == null) {
 right.color = RED;
 x.color = BLACK;
 return;
 // когда у правого брата, оба сына черные
 } else if (right.leftChild != null && right.leftChild.color == BLACK && x.rightChild == null) {
 right.color = RED;
 x.color = BLACK;
 checkAfterDelete(right.leftChild);
 return;
 //когда у правого брата левый сын красный, а правый черный
 } else if ((right.leftChild != null && right.leftChild.color == RED && right.rightChild == null) || (right.leftChild != null && right.leftChild.color == RED && right.rightChild != null)) {
 right.leftChild.color = BLACK;
 right.color = RED;
 rotateRight(right);
 checkAfterDelete(right.leftChild);
 if (right.rightChild != null) {
 checkAfterDelete(right.rightChild);
 }
 //когда у правого брата правый сын красный, а на левый нам пофиг
 } else if (right.rightChild != null && right.rightChild.color == RED) {
 right.color = x.color;
 right.rightChild.color = BLACK;
 x.color = BLACK;
 rotateLeft(x);
 }
 }
 checkAfterDelete(x.leftChild);
 checkAfterDelete(x.rightChild);

 if (x.leftChild == null && x.rightChild == null) {
 return;
 }
 if (x.leftChild == null || x.leftChild != null && x.leftChild.color == BLACK) {
 if (x.color == BLACK && x.rightChild != null && x.rightChild.color == RED) {
 rotateLeft(x);
 } else if (x.rightChild == null || x.rightChild != null && x.rightChild.color == BLACK) {
 Node right = x.rightChild;
 if (right != null) {
 if (right.rightChild != null && right.leftChild != null) {

 } else if (right.rightChild == null && right.leftChild == null) {

 } else if (right.rightChild == null && right.leftChild != null && right.leftChild.color == RED) {

 }
 } else{

 }
 }
 } else if (x.rightChild == null || x.rightChild != null && x.rightChild.color == BLACK) {
 if (x.color == BLACK && x.leftChild != null && x.leftChild.color == RED) {
 rotateRight(x);
 }
 }
}
*/