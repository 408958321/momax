A zero-indexed array A consisting of N different integers is given. The array contains integers in the range [1..(N + 1)], which means that exactly one element is missing.

Your goal is to find that missing element.

Write a function:

function solution(A);

that, given a zero-indexed array A, returns the value of the missing element.

For example, given array A such that:

  A[0] = 2
  A[1] = 3
  A[2] = 1
  A[3] = 5
the function should return 4, as it is the missing element.

Assume that:

N is an integer within the range [0..100,000];
the elements of A are all distinct;
each element of array A is an integer within the range [1..(N + 1)].
Complexity:

expected worst-case time complexity is O(N);
expected worst-case space complexity is O(1), beyond input storage (not counting the storage required for input arguments).
Elements of input arrays can be modified.

Copyright 2009–2017 by Codility Limited. All Rights Reserved. Unauthorized copying, publication or disclosure prohibited.




//方案5得分 为100;
//其余 为 70；

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

//方案一
function solution(A) {
    // write your code in JavaScript (Node.js 6.4.0)
    var len = A.length;
    if(len < 0 || len > 100000) {
        return A;    
    }


    // var i,
    // B = [];
    // for(i = 0; i < len; i += 1) {
    //     if(A[i] < 1 || A[i] > len + 1) {
            
    //         return A;     
    //     }else if(B.indexOf(A[i]) === -1) {
    //         B.push(A[i]);
            
    //     }else {
    //         return A;
    //     }    
    // }
    
    // var max,min,choices,
        // len = len + 1;
    
    // max = Math.max.apply(Math,A);
    // min = Math.min.apply(Math,A);
    // choices = max - min + 1;
    
    // for(i = 1; i <= len ; i += 1) {
    //     if(A.indexOf(i) === -1) {
    //             C.push(i);
    //     }    
    // }
    // if(C.length === 1){
    //     return C[0];    
    // }else{
        
    //     return C;    
    // }
    var B = {},

    for(var k in A) {

    	var ele = A[k];
    	if(ele < 1 || ele > 100000) {
    		return A;
    	}
    	if(!B[ele]) {
    		B[ele] = ele;
    	}else{
    		return A;
    	}
    }

    len = len + 1;
    var C =[];
    for(var i = 1;i <= len; i += 1) {
    	C.push(i);
    }

    for(var j in C) {
    	var ele = C[j]
    	if(!B[ele]){
    		B[ele] = 1;
    	}eles {
    		delete B[ele];
    	}
    }

    return Object.keys(B)[0];
    

}

//方案二
function solution(A) {
    // write your code in JavaScript (Node.js 6.4.0)
    var len = A.length;
    if(len < 0 || len > 100000) {
        return A;    
    }
    var B = {};

    for(var k in A) {

    	var ele = A[k];
    	// if(ele < 1 || ele > 100000) {
    	// 	return A;
    	// }
    	if(!B[ele]) {
    		B[ele] = 1;
    	}else{
    		return A;
    	}
    }

    len = len + 1;
    var C =[];
    for(var i = 1; i <= len; i += 1) {
    	C.push(i);
    }

    for(var j in C) {
    	var ele = C[j]
    	if(!B[ele]){
    		B[ele] = 1;
    	}else {
    		delete B[ele];
    	}
    }

    var a = Object.keys(B);
    a = a[0];
    a = parseInt(a);

    
    return a;
}

//方案三
function solution(A) {
	var len = A.length;
    if(len < 0 || len > 100000) {
        return A;    
    }

    A.sort();
    if(A[0] !== 1) {
    	return 1;
    }
    if(A[len-1] !== len+1) {
    	return len+1;
    }
    for(var i = 0; i < len; i += 1) {
    	if(A[i+1] - A[i] !== 1) {
    		return (A[i]+1);
    	}
    }
}

//方案四

function solution(A) {
	var len = A.length;
	if(len < 0 || len > 100000) {
        return A;    
    }
    var B = {};
    len = len + 1;
    for(var i = 1; i <= len; i += 1) {
    	B[i] = i;
    }

    for (var k in B) {
    	
    	// var ele = B[k];
    	// if(!A[ele]){
    	// 	return ele;
    	// } 

    	if(A.indexOf(B[k]) === -1){
    		return B[k];
    	}

    }
}

// 方案5 

function solution(A) {
	var len = A.length;
	if(len < 0 || len > 100000) {
        return A;    
    }
    var B = {};
  	for(var i in A) {
  		var ele = A[i];
  		B[ele] = ele;
  	}
  	len = len + 1;
  	
  	var C = {};

  	for(var i = 1; i <= len; i += 1) {
    	C[i] = i;
    }

    for(var k in C) {
    	var ele = C[k];
    	if(!B[ele]){
    		return ele;
    	}
    }
}
