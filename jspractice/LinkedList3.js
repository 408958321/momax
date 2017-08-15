//實現 循环鏈表

//實現node類 element 保存節點上的數據,next保存指向下一個節點的鏈接

function Node(element) {
    this.element = element;
    this.next = null;
}


// LListl類提供對鏈表操作的方法

function LList() {
    this.head = new Node("head");
	this.head.next = this.head;
    //this.find = find;
   // this.insert = insert;
   // this.remove = remove;
   // this.display = display;
}

LList.prototype.find = function(item) {
    var currNode = this.head;
    while (currNode.element != item) {

        currNode = currNode.next;
    }
    return currNode;
}

LList.prototype.insert = function(newElement, item){
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = this.head;
    current.next = newNode;
}

LList.prototype.display = function() {
    var currNode = this.head;
    while (!(currNode.next === null) && !(currNode.next.element === "head")) {
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}

LList.prototype.findPrevious = function(item) {
    var currNode = this.head;
    while (!(currNode.next === this.head) &&
            (currNode.next.element !== item)) {
        currNode = currNode.next;
    }
    return currNode;
}

LList.prototype.remove = function(item) {
    var prevNode = this.findPrevious(item);
    if(!(prevNode.next === this.head)) {
        prevNode.next = prevNode.next.next;
    }
}

var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle","Russellville");
cities.insert("Alma","Carlisle");

cities.display();
cities.remove("Carlisle");
cities.display();
