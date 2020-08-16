export function queue(arr, size) {//求数组排列的所有排列方式[1,2,3]->[1,2],[1,3],[2,3],[2,1],[3,1],[3,2]
    if (size > arr.length) {
        return;
    }
    var allResult = [];

    function _queue(arr, size, result) {
        if (result.length == size) {
            allResult.push(result);
        } else {
            for (var i = 0, len = arr.length; i < len; i++) {
                var newArr = [].concat(arr),
                    curItem = newArr.splice(i, 1);
                _queue(newArr, size, [].concat(result, curItem));
            }
        }
    };
    _queue(arr, size, []);

    return allResult;
}

export function reverse_array(arr) {
    return arr.map((v, i) => arr[arr.length - 1 - i]);//反转排序
}

export function isIE() { //ie?
    if (!!window.ActiveXObject || "ActiveXObject" in window) return true;
    else return false;
}

export function randomBetween(a, b) {//获取两个数之间的随机数
    return Math.random() * (b - a) + a;
}

export function query(t) {
    return document.querySelector(t)
}

export function queryAll(t) {
    return document.querySelectorAll(t)
}

export function getKeyFromValue(obj, value) {//通过对象的value值查找与其映射的key值,对象有相同value值的话只检索第一个
    const objArr = Object.keys(obj).map((item, index) => {//{a:1}->[{_key:'a',_value:1}]
        return {'_key': item, '_value': obj[item]};
    });
    return objArr.find((k, i) => k['_value'] == value)['_key'];
}
