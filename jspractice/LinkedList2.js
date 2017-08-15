//實現 双向链表

//實現node類 element 保存節點上的數據,next保存指向下一個節點的鏈接
//增加一个previous属性

function Node(element) {
    this.element = element;
    this.next = null;
	this.previous = null;
}


// LListl類提供對鏈表操作的方法

function LList() {
    this.head = new Node("head");
 
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
    newNode.next = current.next;
	newNode.previous = current;      // 相对单向链表新增
    current.next = newNode;
}

LList.prototype.display = function() {
    var currNode = this.head;
    while (!(currNode.next === null)) {
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}

LList.prototype.findPrevious = function(item) {
    var currNode = this.head;
    while (!(currNode.next === null) &&
            (currNode.next.element !== item)) {
        currNode = currNode.next;
    }
    return currNode;
}

LList.prototype.remove = function(item) {       //相对单向链表remove方法有所不同
 //   var prevNode = this.findPrevious(item);
   // if(!(prevNode.next === null)) {
     //   prevNode.next = prevNode.next.next;
    //}
	var currNode = this.find(item);
	if  (!(currNode.next === null)) {
			currNode.previous.next = currNode.next;
			currNode.next.previous = currNode.previous;
			currNode.next = null;
			currNode.previous = null;
	}
}

LList.prototype.findLast = function() {
		var currNode = this.head;
		while (!(currNode.next === null)) {
			currNode = currNode.next;
		}
		return currNode;
}

LList.prototype.dispReverse = function() {
		var currNode = this.head;
		currNode = this.findLast();
		while (!(currNode.previous === null)){
				console.log(currNode.element);
				currNode = currNode.previous;
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
console.log("\n");
cities.dispReverse();
