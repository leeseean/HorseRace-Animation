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