/**
 * 作用：判断变量的数据类型
 * @argument
 *   data: [All] 需要判断的变量
 * @return [String] 数据类型
 */
exports.typeOf = function(data) {
    var type = typeof data;

    if (type !== 'object') {
        return type;
    }
    
    return Object.prototype.toString.call(data).slice(8, -1);
};

exports.object2Query = function(obj) {
    var res = '?';

    for (var i in obj) {
        res += i + '=' + obj[i] + '&';
    }

    return res.slice(0, -1);
};


var PID = 'pid';
var PID2 = 'parentId';
exports.arrangeLevelList = function(rawList, IS_PID) {
    var resList = [],
        len = rawList.length,
        i = 0,
        idIndex = {},
        PIDD = IS_PID ? PID : PID2;
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
    console.log(resList)
    return resList;
};
