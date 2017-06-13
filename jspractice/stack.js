/**
 * Created by momax on 2017/6/13.
 * 栈的实现
 * 使用栈来进行2-9数制之间的转化
 * 使用栈来判断字符串是否是回文
 * 使用栈模拟递归
 */

function Stack(){
    "use strict";
    this.dataStore = [];
    this.push = function(element){
        this.dataStore.push(element);
    };
    this.pop = function(){
        return this.dataStore.pop();
    };
    this.peek = function(){
        var top = this.length-1;
        return this.dataStore[top];
    };
    this.clear = function(){
        this.dataStore.length = 0;
    };
    this.length = function(){
        return this.dataStore.length;
    };
}


function mulBase(num,base){
    "use strict";
    var s = new Stack();
    do {
        s.push(num % base);
        num = Math.floor(num /= base);

    } while (num > 0);
    var converted = "";
    while (s.length() > 0){
        converted += s.pop();
    }
    return converted;
}

var num = 32;

var base = 2;

var newNum = mulBase(num,base);

console.log(newNum);

function ispalindrome(word){
    "use strict";
    var s = new Stack();
    var i;
    var rword = "";
    for( i = 0;i < word.length; i+=1){
        s.push(word[i]);
    }

    while (s.length() > 0){
        rword += s.pop();
    }

    return word === rword;
}

var word = "hello";

console.log(word + "  is a plindrome? :  " + ispalindrome(word) );



word = "racecar";

console.log(word + "  is a plindrome? :  " + ispalindrome(word) );


//递归函数

function factorial(n) {
    "use strict";
    if (n === 0){
        return 1;
    }
    else{
        return n * factorial(n-1);
    }
}

console.log(factorial(5));

//使用栈模拟递归

function fact(n) {
    "use strict";
    var s = new Stack();
    while (n > 1){
        s.push(n);
        n -= 1;
    }
    var product = 1;
    while (s.length() > 0){

        product *= s.pop();
    }
    return product;
}

console.log(fact(5));