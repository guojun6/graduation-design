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