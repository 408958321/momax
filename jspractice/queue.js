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

    function Dancer(name, sex) {
        this.name = name;
        this.sex  = sex;
    }

    function getDancers(males,females) {
        var i;
        for (i = 0; i < dancers.length; i++){
            
        }
    }
}());

