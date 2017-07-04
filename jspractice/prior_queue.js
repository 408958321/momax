/**
 * Created by momax on 2017/7/4.
 * 优先队列
 */

(function(){
    "use strict";
    function priorQueue() {
        this.dataStore = [];
    }

    priorQueue.prototype.enqueue = function (element) {
        if (Array.isArray(element)) {
            var i;
            var len = element.length;
            for (i = 0; i < len; i += 1) {
                this.dataStore.push(element[i]);
            }
        } else {
            this.dataStore.push(element);
        }
    };

    priorQueue.prototype.dequeue = function () {
        var priority = this.dataStore[0].code;
        var i;
        var len = this.dataStore.length;
        for (i = 1; i < len; i += 1) {
            if (this.dataStore[i].code < priority) {
                priority = i;
            }
        }
        return this.dataStore.splice(priority,1);
    };

    priorQueue.prototype.front = function () {
        return this.dataStore[0];
    };

    priorQueue.prototype.back = function () {
        var len = this.dataStore.length - 1;
        return this.dataStore[len];
    };

    priorQueue.prototype.toString = function () {
        var reStr = "";
        var i;
        var len = this.dataStore.length;
        for (i = 0; i < len; i += 1) {
            reStr += this.dataStore[i].name + " code: " +
                     this.dataStore[i].code + "\n";
        }
        return reStr;
    };

    priorQueue.prototype.empty = function () {
        var len = this.dataStore.length;
        return len === 0;
    };

    priorQueue.prototype.count = function () {
        return this.dataStore.length;
    };


    function Patient (name, code) {
        this.name = name;
        this.code = code;
    }

    var p = new Patient ("Smith", 5);
    var ed = new priorQueue();
    ed.enqueue(p);
    p = new Patient("Jones", 4);
    ed.enqueue(p);
    p = new Patient("Brown", 1);
    ed.enqueue(p);
    p = new Patient("Ingram", 1);
    ed.enqueue(p);

    console.log("total patient");
    console.log(ed.toString());
    var seen = ed.dequeue();
    console.log("Patients being treated:" + seen[0].name);
    console.log("Patients waiting to be seen: ");
    console.log(ed.toString);

    //下一轮
    var seen = ed.dequeue();
    console.log("Patient being treated:" + seen[0].name);
    console.log("patinents wating to be seen: ");
    console.log(ed.toString());



}());
