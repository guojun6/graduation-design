var PID = 'pid';
var PID2 = 'parentId';

var arrangeLevelList = function(rawList, IS_PID) {
    var resList = [],
        len = rawList.length,
        i = 0,
        idIndex = {},
        PIDD = IS_PID ? PID : PID2;
console.log(PIDD)
    for (; i < len; i++) {
        if (rawList[i][PIDD] == 0) {
            resList.push(rawList[i]);
            idIndex[rawList[i]['id']] = resList.length - 1;
        }
    }

    var tempIndex;
    for (i = 0; i < len; i++) {
        if (rawList[i][PIDD] != 0) {
            tempIndex = idIndex[rawList[i][PIDD]];
            if (!resList[tempIndex].child) {
                resList[tempIndex].child = [];
            }
            resList[tempIndex].child.push(rawList[i]);
        }
    }
    return resList;
};
// 深度复制一个对象
var simpleDeepCopy = function(item) {
    var res;
    if (typeof item !== 'object' || item === null) {
        return item;
    }
    if (item instanceof Date) {
        return new Date(item);
    }
    if (item instanceof Array) {
        res = [];
    } else {
        res = {};
    }
    var keys = Object.keys(item);
    for (var i = 0, l = keys.length; i < l; i++) {
        res[keys[i]] = simpleDeepCopy(item[keys[i]]);
    }

    return res;
};

// 插入排序
/**
 * 
 * @param {Array} array [需要排序的数组]
 * @param {String} type [order/desc表明升序还是降序]
 */
var insertSort = function(array, type) {
    var i, j, l, temp;
    for (i = 1, l = array.length; i < l; i++) {
        var index;
        var item = array[i];
        if (type === 'order') {
                for (j = i - 1; j >= 0; j--) {
                    if (item < array[j]) {
                        array[j + 1] = array[j];
                    } else {
                        break;
                    }
                    
                }
        } else {
            (function() {
                for (j = i - 1; j >= 0; j--) {
                    if (item > array[j]) {
                        array[j + 1] = array[j];
                    } else {
                        break;
                    }
                }
            })()
        }
        array[j + 1] = item;
    }
};

// 二分查找
var binarySearch = function(array, value) {
    var i, j, l;
    var low = 0, high = array.length - 1,
        mid;
    while (low <= high) {
        mid = Math.floor((high + low) / 2);
        if (value > array[mid]) {
            low = mid + 1;
        } else if (value < array[mid]) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
};
exports.arrangeLevelList = arrangeLevelList;
exports.simpleDeepCopy = simpleDeepCopy;
exports.insertSort = insertSort;
exports.binarySearch = binarySearch;