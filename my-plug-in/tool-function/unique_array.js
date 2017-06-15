
/**
 * Created by momax on 2017/6/12.
 */

function unique(array){
    "use strict";
    var arr = [];
    var len = array.legth;
    var i;
    for (i = 0; i < len; i += 1) {
        if (arr.indexOf(array[i]) === -1) {
            arr.push(array[i]);
        }
    }
    return arr;
}

var array = [12, 2, 3, 3, 4, 5, 3, 4, 5, 68, 8, 8];

unique(array);