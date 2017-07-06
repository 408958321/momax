/**
 * Created by momax on 2017/7/4.
 * 优先队列
 * 1优先级最高
 */

(function () {
    "use strict";
    var i, len;

    function PriorQueue() {
        this.dataStore = [];
    }

    function Patient(name, code) {
        this.name = name;
        this.code = code;
    }

    PriorQueue.prototype = {
        constructor: PriorQueue,
        enqueue: function (element) {
            if (Array.isArray(element)) {
                len = element.length;
                for (i = 0; i < len; i += 1) {
                    this.dataStore.push(element[i]);
                }
            } else {
                this.dataStore.push(element);
            }
        },
        dequeue: function () {
            var priority = this.dataStore[0].code;
            var index;
            len = this.dataStore.length;
            for (i = 1; i < len; i += 1) {
                if (this.dataStore[i].code < priority) {
                    priority = this.dataStore[i].code;
                    index = i;
                }
            }
            return this.dataStore.splice(index, 1);
        },
        toString: function () {
            var reStr = "";
            len = this.dataStore.length;
            for (i = 0; i < len; i += 1) {
                reStr += this.dataStore[i].name + " code:" +
                    this.dataStore[i].code + "\n";
            }
            return reStr;
        },
        front: function () {
            return this.dataStore[0];
        },
        back: function () {
            len = this.dataStore.length - 1;
            return this.dataStore[len];
        },
        empty: function () {
            len = this.dataStore.length;
            return len === 0;
        },
        count: function () {
            return this.dataStore.length;
        }
    };
    var ed = new PriorQueue();
    var p = [new Patient("Smith", 1), new Patient("Jones", 1), new Patient("Brown", 1), new Patient("Ingram", 1)];
    ed.enqueue(p);

    function inform(queue) {

        var pat;


        while (!queue.empty()) {

            pat = queue.dequeue();
            console.log("Patient being treated " + pat[0].name);
            console.log("Patients waiting to be seen: ");
            console.log(queue.toString());

        }

    }

    inform(ed);


}());
