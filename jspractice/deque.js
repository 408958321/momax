/**
 * Created by momax on 2017/7/6.
 * 双向队列
 */
(function () {
    "use strict";
    var len;

    function Deque() {
        this.dataStore = [];
    }

    Deque.prototype = {
        constructor: Deque,
        push: function (element) {
            this.dataStore.push(element);
        },
        pop: function () {
            return this.dataStore.pop();
        },
        enqueue: function (element) {
            this.dataStore.unshift(element);
        },
        dequeue: function () {
            return this.dataStore.shift();
        },
        length: function () {
            return this.dataStore.length;
        },
        empty: function () {
            return this.dataStore.length === 0;
        },
        back: function () {
            len = this.dataStore.length - 1;
            return this.dataStore[len];
        },
        front: function () {
            return this.dataStore[0];
        }
    };

    var word = "racecar";

    //利用原生的字符串方法
    var s = word.split("");

    var rword = s.reverse().join("");

    console.log(word === rword);

    //双向队列方法

    function ispalindrome(word) {
        var d = new Deque();
        var i;
        var rword = "";
        var leng = word.length;
        for (i = 0; i < leng; i += 1) {
            d.push(word[i]);
        }
        while (!d.empty()) {
            rword += d.pop();
        }

        return word === rword;

    }

    console.log(ispalindrome(word));

}());


