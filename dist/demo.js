'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var horses = [].concat(_toConsumableArray(document.querySelectorAll('.horse')));
var innerHorseWrap = document.querySelector('.innerHorseWrap');
var viewWidth = innerHorseWrap.offsetWidth; //动画可视区宽度
var horseWrap = document.querySelector('.horseWrap');
var horseSky = document.querySelector('.horseSky');
var horseOrders = document.querySelector('.horseOrders');
var horseOrderArr = [].concat(_toConsumableArray(document.querySelectorAll('.horseOrders .horseOrder')));
var horseWrapLeftValue = void 0;
var horseSkyLeftValue = void 0;
var horseLineLeft = document.querySelector('.horseLineLeft');
var horseLineRight = document.querySelector('.horseLineRight');
var horseQuan = document.querySelector('.horseQuan');
var bottomSpace = document.querySelector('.bottomSpace');
var resultDialog = document.querySelector('.resultDialog'); //弹幕
var closeResultDialog = document.querySelector('.resultDialog .closeResultDialog'); //关闭檀木按钮
var horseQuanRightValue = void 0;
var horseLineRightValue = void 0;
var horseLineLeftValue = void 0;
var horseOrdersLeftValue = void 0;
var horseNumElems = [].concat(_toConsumableArray(document.querySelectorAll('.rangeNums>div.horseNum'))); //排序马匹
var totalDistance = 15000; //总共要跑的距离 草地宽度800-马身150-终点线距离右边75
var duration = [37.0, 38, 39].concat(_toConsumableArray(Array(7).fill(1).map(function () {
    return 39 * randomBetween(1.01, 1.2);
}).sort())); //预先设定每匹马要跑的时间
var openData = [8, 4, 5, 6, 1, 3, 2, 7, 9, 10]; //从后台传回的开奖结果
var horsesLeftsValues = null;
var rangeNumImg = Array(10).fill(1).map(function (item, index) {
    return -6 - index * 62.35 + 'px -9px';
}); //底部排序
var openResult = new Object(); //声明一个对象来存储openData和duration的对应关系
openData.forEach(function (item, index) {
    //openData和duration对应
    openResult['horse_' + item] = duration[index];
});
var timeout = null;

function horseInit(horses, horseOrders, horseNums, rangeNumImg) {
    //初始位置
    innerHorseWrap.scrollLeft = 0; //回到最左边
    bottomSpace.style.left = 0; //回到最左边
    horsesLeftsValues = Array(10).fill(0);
    horses.forEach(function (horse, index) {
        horse.style.backgroundImage = 'url(./images/horse_' + (index + 1) + '.png)';
        horse.style.backgroundSize = '512px';
        horse.style.backgroundPosition = '25px 0';
        horse.style.top = 38 + index * 29 + 'px';
        horse.style.left = '-95px'; //一开始的位置
        horse.style.animation = '';
    });
    horseNumElems.forEach(function (num, i) {
        //底部数字
        num.style.backgroundPosition = rangeNumImg[i];
    });
    horseOrders.style.left = '65px';
    horseOrderArr.forEach(function (order, i) {
        order.style.top = 15 + i * 29.15 + 'px';
    });
    horseLineLeftValue = 40; //css里面的值
    horseLineRightValue = -85; //css里面的值 终点线
    horseOrdersLeftValue = 65; //css里面的值
    horseQuanRightValue = -160; //css里面的值终点上角圈圈
    horseWrapLeftValue = 0; //运动的云朵和草地初始背景位置为0
    horseSkyLeftValue = 0; //运动的云朵和草地初始背景位置为0

    clearTimeout(timeout); //
}
function horseRun(horses) {
    //马跑的动作函数
    horses.forEach(function (horse, index) {
        horse.style.animation = 'horse_run infinite 450ms forwards step-start';
    });
}
/*把路程分成5段，每段的速度不一样，可中慢快，中快慢，慢快中，慢中快，快慢中，快中慢随机;
 * 把时间分成5段，[[0.35,0.5,0.15,....],[0.35,0.15,0.5,...],...等;
 * */

var timeMaps = queue([0.19, 0.215, 0.2, 0.225, 0.17], 5); //分5段处理
function createTimeMap(horses, timeMaps) {
    //随机每匹马的时间分配
    var timeObj = new Object();
    horses.forEach(function (horse, index) {
        timeObj[horse.id] = timeMaps[Math.floor(randomBetween(0, timeMaps.length))];
    });
    return timeObj;
}
function horseMove(horses) {
    var total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : totalDistance;
    var timeMaps = arguments[2];
    var openResult = arguments[3];
    var openData = arguments[4];
    var rangeNumImg = arguments[5];
    //赛马

    horseRun(horses);

    var speeds = {},
        leftValue = {}; //盛放各皮马的速度，盛放个屁马的left值

    var timeMap = createTimeMap(horses, timeMaps);

    var eachTotal = total / 5; //每段的长度

    function move() {

        var horsesLefts = getHorsesLeft(horses);

        horses.forEach(function (horse, index) {
            //处理10段里面每段速度

            if (parseInt(horsesLefts[horse.id]) < eachTotal) {
                //第一段的速度
                speeds[horse.id] = eachTotal / (openResult[horse.id] * timeMap[horse.id][0] * 16); //第一段
            } else if (parseInt(horsesLefts[horse.id]) >= eachTotal && parseInt(horsesLefts[horse.id]) < eachTotal * 2) {
                //第二段的速度
                speeds[horse.id] = eachTotal / (openResult[horse.id] * timeMap[horse.id][1] * 16); //第二段
            } else if (parseInt(horsesLefts[horse.id]) >= eachTotal * 2 && parseInt(horsesLefts[horse.id]) < eachTotal * 3) {
                //第三段的速度
                speeds[horse.id] = eachTotal / (openResult[horse.id] * timeMap[horse.id][2] * 16); //第三段
            } else if (parseInt(horsesLefts[horse.id]) >= eachTotal * 3 && parseInt(horsesLefts[horse.id]) < eachTotal * 4) {
                //第4段的速度
                speeds[horse.id] = eachTotal / (openResult[horse.id] * timeMap[horse.id][3] * 16); //第4段
            } else if (parseInt(horsesLefts[horse.id]) >= eachTotal * 4 && parseInt(horsesLefts[horse.id]) < eachTotal * 5) {
                //第5段的速度
                speeds[horse.id] = eachTotal / (openResult[horse.id] * timeMap[horse.id][4] * 16); //第5段
            }

            leftValue[horse.id] = leftValue[horse.id] || 0;
            leftValue[horse.id] += speeds[horse.id];
            horse.style.left = leftValue[horse.id] + 'px';
        });
        var speedMin = Math.min.apply(Math, _toConsumableArray(Object.values(speeds)));
        var speedMax = Math.max.apply(Math, _toConsumableArray(Object.values(speeds)));
        var leftMax = Math.max.apply(Math, _toConsumableArray(Object.values(horsesLefts).map(function (value) {
            return parseInt(value);
        })));
        var leftMin = Math.min.apply(Math, _toConsumableArray(Object.values(horsesLefts).map(function (value) {
            return parseInt(value);
        })));
        var horsesLeftsKeys = Object.keys(horsesLefts); //马的id数组,马排序
        horsesLeftsValues = Object.values(horsesLefts); //马的距离数组
        var sort_horsesLeftsValues = horsesLeftsValues.sort(function (a, b) {
            return parseInt(a) - parseInt(b);
        }); //按跑动距离从小道大排序后的数组
        var sort_horsesLeftKeys = sort_horsesLeftsValues.map(function (value) {
            return getKeyFromValue(horsesLefts, value);
        }); //horseid排序
        if (!JSON.parse(localStorage.getItem('sort_horsesLeftKeys')) || JSON.parse(localStorage.getItem('sort_horsesLeftKeys')).toString() != sort_horsesLeftKeys.toString()) {
            sortHorseRange(horseNumElems, horsesLefts, sort_horsesLeftsValues, total, reverse_array(openData), rangeNumImg); //底部实时排名,排名发生改变时重新排名。
        }
        localStorage.setItem('sort_horsesLeftKeys', JSON.stringify(sort_horsesLeftKeys)); //把旧的排名存起来，和之后的排名做比较

        var innerHorseWrap_scrollLeft = innerHorseWrap.scrollLeft;
        if (innerHorseWrap_scrollLeft < total - viewWidth) {
            //未到达终点线区域
            if (leftMax - innerHorseWrap_scrollLeft > viewWidth - 300) {
                //马要向前跑出屏幕时滚动滚动条使得马不会跑出
                innerHorseWrap.scrollLeft += speedMax;
            } else if (innerHorseWrap_scrollLeft > leftMax - 500) {
                innerHorseWrap.scrollLeft += speedMin;
            }
        } else {
            //到达终点线区域后，不滚动
            innerHorseWrap.scrollLeft += 0;
        }
        bottomSpace.style.left = innerHorseWrap.scrollLeft + 'px'; //底部实时排序div跟随移动，以防看不到
        resultDialog.style.left = innerHorseWrap.scrollLeft + viewWidth / 2 + 'px'; //结果弹屏也跟着走吧，免得到了终点看不到

        if (leftMax > total) {//totalDistance
        }

        if (leftMin > total) {
            var yajunHorse = document.querySelector('.yajunHorse .horse2');
            var guanjunHorse = document.querySelector('.guanjunHorse .horse1');
            var jijunHorse = document.querySelector('.jijunHorse .horse3');
            var yajunNum = document.querySelector('.yajunHorse .yajunNum');
            var guanjunNum = document.querySelector('.guanjunHorse .guanjunNum');
            var jijunNum = document.querySelector('.jijunHorse .jijunNum');
            var resultOrders = [].concat(_toConsumableArray(document.querySelectorAll('.resultOrders .resultOrder')));
            yajunHorse.style.backgroundImage = 'url(./images/horse_' + openData[1] + '.png)';
            guanjunHorse.style.backgroundImage = 'url(./images/horse_' + openData[0] + '.png)';
            jijunHorse.style.backgroundImage = 'url(./images/horse_' + openData[2] + '.png)';
            yajunNum.style.backgroundPosition = rangeNumImg[openData[1] - 1];
            guanjunNum.style.backgroundPosition = rangeNumImg[openData[0] - 1];
            jijunNum.style.backgroundPosition = rangeNumImg[openData[2] - 1];
            resultOrders.forEach(function (v, i) {
                //弹出开奖结果底部排列
                v.style.backgroundPosition = rangeNumImg[openData[i + 3] - 1];
            });
            resultDialog.style.display = 'block';
            setTimeout(function () {
                window.clearTimeout(timeout); //1秒后关闭动画
            }, 1000);
        }

        timeout = setTimeout(move, 1000 / 16);
    }
    move();
}
horseInit(horses, horseOrders, horseNumElems, rangeNumImg); //初始位置
horseMove(horses, totalDistance, timeMaps, openResult, openData, rangeNumImg); //启动


function getHorsesLeft(horses) {
    //获取每匹马的left值,即跑的距离
    var horsesLefts = new Object();
    horses.forEach(function (horse) {
        return horsesLefts[horse.id] = window.getComputedStyle(horse).left;
    });
    return horsesLefts;
}

//底部实时排名函数
function sortHorseRange(horseNumElems, horsesLefts, sort_horsesLeftsValues, totalDistance, openData, rangeNumImg) {
    var horsesLeftsValues = Object.values(horsesLefts).map(function (v) {
        return parseInt(v);
    });
    var completedHorseNums = horsesLeftsValues.filter(function (v) {
        return v >= totalDistance;
    }).length; //已经跑完的马数量
    var rest_horseNumElems = horseNumElems.slice(0, horseNumElems.length - completedHorseNums);
    if (completedHorseNums == 10) {
        sortHorseRangeLast(horseNumElems, reverse_array(openData), rangeNumImg);
        return;
    }
    rest_horseNumElems.forEach(function (numElem, index) {
        if (sort_horsesLeftsValues.length == [].concat(_toConsumableArray(new Set(sort_horsesLeftsValues))).length) {
            //防止value值相同情况
            numElem.style.backgroundPosition = rangeNumImg[getKeyFromValue(horsesLefts, sort_horsesLeftsValues[index]).split('_')[1] - 1];
        }
    });
}
//最终排名函数
function sortHorseRangeLast(horseNumElems, openData, rangeNumImg) {
    console.log(horseNumElems);
    horseNumElems.forEach(function (numElem, index) {
        numElem.style.backgroundPosition = rangeNumImg[reverse_array(openData)[index] - 1];
    });
}
//工具函数
function randomBetween(a, b) {
    //获取两个数之间的随机数
    return Math.random() * (b - a) + a;
}
function getKeyFromValue(obj, value) {
    //通过对象的value值查找与其映射的key值,对象有相同value值的话只检索第一个
    var objArr = Object.keys(obj).map(function (item, index) {
        //{a:1}->[{_key:'a',_value:1}]
        return { '_key': item, '_value': obj[item] };
    });
    return objArr.find(function (k, i) {
        return k['_value'] == value;
    })['_key'];
}
function queue(arr, size) {
    //求数组排列的所有排列方式[1,2,3]->[1,2],[1,3],[2,3],[2,1],[3,1],[3,2]
    if (size > arr.length) {
        return;
    }
    var allResult = [];

    (function (arr, size, result) {
        if (result.length == size) {
            allResult.push(result);
        } else {
            for (var i = 0, len = arr.length; i < len; i++) {
                var newArr = [].concat(arr),
                    curItem = newArr.splice(i, 1);
                arguments.callee(newArr, size, [].concat(result, curItem));
            }
        }
    })(arr, size, []);

    return allResult;
}
function reverse_array(arr) {
    return arr.map(function (v, i) {
        return arr[arr.length - 1 - i];
    }); //反转排序
}
/*function createSpeed(){//随机生成跑步速度
 return Array(8).fill(1).map(()=>(randomBetween(0.7,1)*5));
 }*/
//开奖结果弹幕关闭
closeResultDialog.onclick = function () {
    resultDialog.style.display = 'none';
    horseInit(horses, horseOrders, horseNumElems, rangeNumImg); //回到初始位置
};