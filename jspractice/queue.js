/**
 * Created by Momax on 2017/6/15.
 * 队列的实现
 */

(function() {
    "use strict";
    function Queue() {
        this.dataStore = [];

    }

    Queue.prototype.enqueue = function (element) {
        if(Array.isArray(element)){
            var i;
            var len = element.length;
               for (i = 0; i < len; i += 1){
                    this.dataStore.push(element[i]);
               }
        }else {
            this.dataStore.push(element);
        }
    };

    Queue.prototype.dequeue = function () {
        return this.dataStore.shift();
    };

    Queue.prototype.front = function () {
        return this.dataStore[0];
    };
    Queue.prototype.back = function () {
        var len = this.dataStore.length - 1;
        return this.dataStore[len];
    };
    Queue.prototype.toString = function () {
        var reStr = "";
        var i;
        var len = this.dataStore.length;
        for (i = 0; i < len; i += 1){
            reStr += this.dataStore[i] + "\n";
        }
        return reStr;
    };
    Queue.prototype.empty = function (){
        var len = this.dataStore.length;
        return len === 0;
    };

    Queue.prototype.count = function (){
        return this.dataStore.length;
    };

    var a = ["yun","zhao","cc","hehe"];
    var q = new Queue();
    q.enqueue("hahhah");
    q.enqueue("momax");
    q.enqueue(a);
    console.log(q.toString());
    console.log(q.dequeue());
    console.log(q.empty());
    console.log(q.front());
    console.log(q.back());

    //模拟方块舞
    var dancers = ["F Alison McMillan",
                    "M Frank Opitz",
                    "M Frank Opitz",
                    "M Mason McMilllan",
                    "M Clayton Ruff",
                    "F Cheryl Ferenback",
                    "M Raymond Williams",
                    "F Jennifer Ingram",
                    "M Bryan Frazer",
                    "M David Martin",
                    "F Aurora Adney"];

    function Dancer(firsname, sex) {
        this.firstname = firsname;
        this.sex  = sex;
    }

    function getDancers(males,females) {
        var i;
        var dancer;
        var sex;
        var name;
        for (i = 0; i < dancers.length; i += 1){
            dancer = dancers[i].split(' ');
            sex    = dancer[0];
            name   = dancer[1];
            if( sex === "F") {
                females.enqueue(new Dancer(name,sex));
            }else {
                males.enqueue(new Dancer(name,sex));
            }
        }
    }

    function dance(males,females) {
        var person;
        console.log("The dance partners are: \n");

        while (!females.empty() && !males.empty()) {
            person = females.dequeue();
            console.log("Female dancer is: "+ person.firstname);
            person = males.dequeue();
            console.log("Male dancer is: "+ person.firstname);
        }
    }

    var maleDancers = new Queue();
    var femaleDancers = new Queue();
    getDancers(maleDancers,femaleDancers);
    dance(maleDancers,femaleDancers);

    if(maleDancers.count() > 0){
        console.log("there are " + maleDancers.count() + " male dancers waiting to dance");
    }

    if(femaleDancers.count() > 0){
        console.log("there are " + femaleDancers.count() + " female dancers waiting to dance");
    }

    //基数排序

    function distribute(nums,queues,n,digit) {
        var i;
        for (i = 0; i < n; i += 1){
            if (digit === 1) {
                queues[nums[i]%10].enqueue(nums[i]);
            }
            else {
                queues[Math.floor(nums[i] / 10)].enqueue(nums[i]);
            }
        }

    }

    function collect(queues, nums) {
        var i = 0;
        var digit;
        for (digit = 0; digit < 10; digit += 1) {
            while (!queues[digit].empty()) {

                nums[i] = queues[digit].dequeue();
                i += 1;
            }
        }
    }

    function dispArray(arr) {

            console.log(arr+"");

    }

    var queues = [];
    var j;
    for (j = 0; j < 10; j += 1) {
        queues[j] = new Queue();
    }
    var nums = [];

    for (j = 0; j < 10; j += 1) {
        nums[j] = Math.floor(Math.floor(Math.random() * 101));
    }

    console.log("Before radix sort: ");
    dispArray(nums);
    distribute(nums, queues, 10, 1);
    collect(queues, nums);
    distribute(nums, queues, 10, 10);
    collect(queues, nums);
    console.log("\n After radix sort: ");
    dispArray(nums);


}());

