var ctx;
var index = 0;
var user = {
    mousedown: undefined,
    hook: undefined
};

var nodes = [];
var root;
var edges = [];
var canvas;

var NODE_RADIUS = 15;
var START_POS_NODE = 0;
var END_POS_NODE = Math.PI * 2;
var WIDTH = 500;
var HEIGHT = 500;
var D_WIDTH = 30;
var D_HEIGHT = 50;

var ROOT_POINT = new Point(WIDTH / 2, 40);
var DEFUALT_POINT = new Point(40,40);

var Edges = {
    edgeOnCanvas: undefined,
    draw: function(ctxDraw){
        ctxDraw.font = '18px serif';
        ctx.textAlign="center";
        ctxDraw.textBaseline="top";
        var point = this.centerPoint(this.edgeOnCanvas.to, this.edgeOnCanvas.from);
        ctxDraw.fillText(this.edgeOnCanvas.text, point.x, point.y);

        ctx.beginPath();
        ctx.strokeStyle="#000000";
        ctx.moveTo(this.edgeOnCanvas.from.objectsOnCanvas.point.x, this.edgeOnCanvas.from.objectsOnCanvas.point.y);
        ctx.lineTo(this.edgeOnCanvas.to.objectsOnCanvas.point.x, this.edgeOnCanvas.to.objectsOnCanvas.point.y);
        ctx.stroke();
    },
    centerPoint: function(to, from) {
        return new Point(Math.round((to.objectsOnCanvas.point.x + from.objectsOnCanvas.point.x) / 2), Math.round((to.objectsOnCanvas.point.y + from.objectsOnCanvas.point.y) / 2))
    }
};

function EdgeOnCanvas(vertexFrom, vertexTo, text){
    this.from = vertexFrom;
    this.to = vertexTo;
    this.text = text;
}

function Point(x, y){
    this.x = x;
    this.y = y;
}

var Objects = {
    objectsOnCanvas: undefined,
    distancePoints: function(mPoint) {
        return new Point(mPoint.x - this.objectsOnCanvas.point.x, mPoint.y - this.objectsOnCanvas.point.y)
    },
    distanceCoordinates: function(mPoint) {
        return Math.sqrt(Math.pow(mPoint.x - this.objectsOnCanvas.point.x, 2) + Math.pow(mPoint.y - this.objectsOnCanvas.point.y, 2));
    },
    move: function(ctxDraw, mPoint) {
        var distPoint = this.distancePoints(mPoint);
        this.objectsOnCanvas.point.x += distPoint.x;
        this.objectsOnCanvas.point.y += distPoint.y;
        this.draw(ctxDraw)
    },
    draw: function(ctxDraw){
        ctxDraw.fillStyle = "#ffffff";
        ctxDraw.beginPath();
        ctxDraw.arc(this.objectsOnCanvas.point.x, this.objectsOnCanvas.point.y, this.objectsOnCanvas.radius, this.objectsOnCanvas.startPos, this.objectsOnCanvas.endPos, true);
        ctxDraw.fill();
        ctxDraw.strokeStyle = "#000000";
        ctxDraw.stroke();
        ctxDraw.fillStyle = "#000000";
        ctxDraw.font = '18px serif';
        ctxDraw.textAlign="center";
        ctxDraw.textBaseline="middle";
        ctxDraw.fillText(this.objectsOnCanvas.text, this.objectsOnCanvas.point.x, this.objectsOnCanvas.point.y);
    },
    selected: function(ctxDraw){
        ctxDraw.strokeStyle = "#ffff00";
        ctxDraw.beginPath();
        ctxDraw.arc(this.objectsOnCanvas.point.x, this.objectsOnCanvas.point.y, this.objectsOnCanvas.radius, this.objectsOnCanvas.startPos, this.objectsOnCanvas.endPos, true);
        ctxDraw.stroke();
    },
    setLeftChild: function(child){
        this.objectsOnCanvas.leftChild = child;
        child.objectsOnCanvas.parent = this;
        var pPoint = this.objectsOnCanvas.point;
        child.objectsOnCanvas.point = new Point(pPoint.x - D_WIDTH, pPoint.y + D_HEIGHT);
    },
    setRightChild: function(child){
        this.objectsOnCanvas.rightChild = child;
        child.objectsOnCanvas.parent = this;
        var pPoint = this.objectsOnCanvas.point;
        child.objectsOnCanvas.point = new Point(pPoint.x + D_WIDTH, pPoint.y + D_HEIGHT);
    }
};


function ObjectsOnCanvas(type, point, text) {
    this.leftDepth = 0;
    this.rightDepth = 0;
    this.type = type;
    this.point = point;
    this.radius = NODE_RADIUS;
    this.startPos = START_POS_NODE;
    this.endPos = END_POS_NODE;
    this.text = text;
    this.index = index++;
    this.getIndex = function() {return this.index;};
    this.leftChild = undefined;
    this.rightChild = undefined;
    this.parent = undefined;
}

function updateCanvas(ctxDraw){
    ctxDraw.clearRect(0, 0, canvas.width, canvas.height);
    edges.forEach(function(value){value.draw(ctxDraw);});
    nodes.forEach(function(value){value.draw(ctxDraw);});
}

function getNode(x, y){
    var node = new Path2D();
    node.arc(x, y, 50, 0, Math.PI * 2, true);
    node.font = '20px Times New Roman';
    node.fillStyle = 'Black';
    return node;
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function getNearNode(point){
    return nodes.filter(function (value) {
        if(value.distanceCoordinates(point) < 20)
            return value;
        else
            return null;
    });
}

function addRandomNodes(count){
    for(var i = 0; i < count; i++){
        var obj = Object.create(Objects);
        obj.objectsOnCanvas = new ObjectsOnCanvas("node", new Point(Math.random() * 1000 % WIDTH, Math.random() * 1000 % HEIGHT), i);
        obj.draw(ctx);
        nodes.push(obj)
    }
}

function addEdges(count){
    for(var i = 0; i < count; i++){
        var edge = Object.create(Edges);
        edge.edgeOnCanvas = new EdgeOnCanvas(nodes[i], nodes[(i + 1) % nodes.length], i);
        edge.draw(ctx);
        edges.push(edge);
    }
}

function init(){
    canvas.addEventListener("mousemove", function(e){
        if(user.mousedown === true) {
            var offset = canvas.getBoundingClientRect();
            var p = new Point(e.clientX - Math.round(offset.left), e.clientY - Math.round(offset.top));
            if(user.hook === undefined) {
                user.hook = getNearNode(p)[0];
            }
            if(user.hook === undefined)
                return;
            console.log(user.hook);
            user.hook.move(ctx, p);
            updateCanvas(ctx);
        }
    });
    canvas.addEventListener("mousedown", function(e) {
        console.log("down: " + e.clientX + " " + e.clientY);
        user.mousedown = true;
        new MouseEvent("mousemove", e);

    });
    canvas.addEventListener("mouseup", function(e){
        console.log("up: " + e.clientX + " " + e.clientY);
        user.mousedown = false;
        user.hook = undefined
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    edges.forEach(function(value){value.draw(ctx);});
    nodes.forEach(function(value){value.draw(ctx);});
}

function addNewEdge(from, to){
    var edge = Object.create(Edges);
    edge.edgeOnCanvas = new EdgeOnCanvas(from, to, "");
    edge.draw(ctx);
    edges.push(edge);
}

function setupNewNode(parent, node){
    parent.selected(ctx);
    if(parent.objectsOnCanvas.text > node.objectsOnCanvas.text) {
        if (parent.objectsOnCanvas.leftChild !== undefined)
            setupNewNode(parent.objectsOnCanvas.leftChild, node);
        else {
            parent.setLeftChild(node);
            addNewEdge(parent, node);
        }
    }else if(parent.objectsOnCanvas.text < node.objectsOnCanvas.text) {
        if (parent.objectsOnCanvas.rightChild !== undefined)
            setupNewNode(parent.objectsOnCanvas.rightChild, node);
        else {
            parent.setRightChild(node);
            addNewEdge(parent, node);
        }
    }
}

function updateDepth(node){
    var parent = node.objectsOnCanvas.parent;
    if(parent === undefined){
        return;
    }
    var depth;
    var point = parent.objectsOnCanvas.point;
    if(parent.objectsOnCanvas.leftChild === node){
        parent.objectsOnCanvas.leftDepth = Math.max(node.objectsOnCanvas.leftDepth, node.objectsOnCanvas.rightDepth) + 1;
        depth = parent.objectsOnCanvas.leftDepth;
        node.objectsOnCanvas.point = new Point(point.x - D_WIDTH * depth, point.y +  D_HEIGHT)
    } else {
        parent.objectsOnCanvas.rightDepth = Math.max(node.objectsOnCanvas.leftDepth, node.objectsOnCanvas.rightDepth) + 1;
        depth = parent.objectsOnCanvas.rightDepth;
        node.objectsOnCanvas.point = new Point(point.x + D_WIDTH * depth, point.y +  D_HEIGHT)
    }
    updateDepth(parent);
}

function addNewNode(){
    var textEdit = document.getElementById("addNewNode");
    var obj = Object.create(Objects);
    if(nodes.length === 0) {
        obj.objectsOnCanvas = new ObjectsOnCanvas("root", ROOT_POINT, parseInt(textEdit.value));
        root = obj;
        root.objectsOnCanvas.level = 1;
    } else {
        obj.objectsOnCanvas = new ObjectsOnCanvas("node", DEFUALT_POINT, parseInt(textEdit.value));
    }
    obj.draw(ctx);
    nodes.push(obj);
    if(nodes.length > 1){
        setupNewNode(root, obj);
        updateDepth(obj);
        updateCanvas(ctx);
    }
}

window.onload = function() {
    canvas = document.getElementsByTagName("canvas")[0];
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        init();
    }
};