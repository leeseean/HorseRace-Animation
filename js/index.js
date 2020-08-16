import {
    isIE,
    queue,
    reverse_array,
    randomBetween,
    query,
    queryAll,
    getKeyFromValue
} from './utils';
import {getOpenCode} from './axios';
import '../css/index.css';

class HorseAni {
    constructor() {
        this.horses = [...queryAll('.horse')];
        this.innerHorseWrap = query('.innerHorseWrap');
        this.issueAnd = query('.issueAnd');
        this.horseIssueDetail = query('.horseIssueDetail');
        this.viewWidth = parseInt(window.getComputedStyle(this.innerHorseWrap).width);//动画可视区宽度
        this.horseWrap = query('.horseWrap');
        this.horseSky = query('.horseSky');
        this.horseOrders = query('.horseOrders');
        this.horseOrderArr = [...queryAll('.horseOrders .horseOrder')];
        this.horseLineLeft = query('.horseLineLeft');
        this.horseLineRight = query('.horseLineRight');
        this.horseQuan = query('.horseQuan');
        this.bottomSpace = query('.bottomSpace');
        this.resultDialog = query('.resultDialog');//弹幕
        this.closeResultDialog = query('.resultDialog .closeResultDialog');//关闭檀木按钮
        this.horseNumElems = [...queryAll('.rangeNums>div.horseNum')];//排序马匹
        this.totalDistance = 15000;//总共要跑的距离 草地宽度800-马身150-终点线距离右边75
        this.duration = [37.0, 38, 39, ...Array(7).fill(1).map(() => 39 * (randomBetween(1.01, 1.05))).sort()];//预先设定每匹马要跑的时间
        this.rangeNumImg = Array(10).fill(1).map((item, index) => `${-6 - index * 62.35}px -9px`);//底部排序
        /*把路程分成5段，每段的速度不一样，可中慢快，中快慢，慢快中，慢中快，快慢中，快中慢随机;
         * 把时间分成5段，[[0.35,0.5,0.15,....],[0.35,0.15,0.5,...],...等;
        */
        this.timeMaps = queue([0.19, 0.215, 0.2, 0.225, 0.17], 5);
        //开奖结果弹幕关闭
        this.closeResultDialog.onclick = function () {
            this.resultDialog.style.display = 'none';
            this.horseInit();//回到初始位置
        };
        this.lastOpenTime = null;
    }

    horseInit() {//初始位置
        this.innerHorseWrap.scrollLeft = 0;//回到最左边
        if (isIE()) {//如果是IE，bottomSpace采用fixed定位，因为ie环境下滚动时动态改变left值会抖动
            bottomSpace.style.position = 'fixed';
            window.addEventListener('scroll', (() => {
                bottomSpace.style.left = `${this.innerHorseWrap.getBoundingClientRect().left}px`;
                bottomSpace.style.top = `${this.horseWrap.getBoundingClientRect().bottom}px`;
            }));
            bottomSpace.style.left = `${this.innerHorseWrap.getBoundingClientRect().left}px`;
            bottomSpace.style.top = `${this.horseWrap.getBoundingClientRect().bottom}px`;
        } else {
            this.bottomSpace.style.left = 0;//回到最左边
        }
        this.horsesLeftsValues = Array(10).fill(0);
        this.horses.forEach((horse, index) => {
            horse.style.backgroundImage = `url(./images/horse_${index + 1}.png)`;
            horse.style.backgroundSize = '512px';
            horse.style.backgroundPosition = '25px 0';
            horse.style.top = `${38 + index * 29}px`;
            horse.style.left = '-95px';//一开始的位置
            horse.style.animation = '';
        });
        this.horseNumElems.forEach((num, i) => {//底部数字
            num.style.backgroundPosition = this.rangeNumImg[i];
        });
        this.horseOrders.style.left = '65px';
        this.horseOrderArr.forEach((order, i) => {
            order.style.top = `${15 + i * 29.15}px`;
        });
        this.horseLineLeftValue = 40;//css里面的值
        this.horseLineRightValue = -85;//css里面的值 终点线
        this.horseOrdersLeftValue = 65;//css里面的值
        this.horseQuanRightValue = -160;//css里面的值终点上角圈圈
        this.horseWrapLeftValue = 0;//运动的云朵和草地初始背景位置为0
        this.horseSkyLeftValue = 0;//运动的云朵和草地初始背景位置为0
    }

    horseRun(horses) {//马跑的动作函数
        horses.forEach((horse, index) => {
            horse.style.animation = `horse_run infinite 450ms forwards step-start`;
        });
    }

    createTimeMap(horses, timeMaps) {//随机每匹马的时间分配
        const timeObj = new Object();
        horses.forEach((horse, index) => {
            timeObj[horse.id] = timeMaps[Math.floor(randomBetween(0, timeMaps.length))];
        });
        return timeObj;
    }

    horseMove(horses, total = this.totalDistance, timeMaps, openData, rangeNumImg) {//赛马
        const openResult = new Object();//声明一个对象来存储openData和duration的对应关系
        openData.forEach((item, index) => {//openData和duration对应
            openResult[`horse_${item}`] = duration[index];
        });

        this.horseRun(horses);//跑的动作

        const speeds = {}, leftValue = {};//盛放各皮马的速度，盛放个屁马的left值

        const timeMap = createTimeMap(horses, timeMaps);

        const eachTotal = total / 5;//每段的长度

        const move = () => {

            const horsesLefts = this.getHorsesLeft(horses);

            horses.forEach((horse, index) => {//处理10段里面每段速度

                if (parseInt(horsesLefts[horse.id]) < eachTotal) {//第一段的速度
                    speeds[horse.id] = eachTotal / (openResult[horse.id] * (timeMap[horse.id][0]) * 60);//第一段
                } else if (parseInt(horsesLefts[horse.id]) >= eachTotal && parseInt(horsesLefts[horse.id]) < eachTotal * 2) {//第二段的速度
                    speeds[horse.id] = eachTotal / (openResult[horse.id] * (timeMap[horse.id][1]) * 60);//第二段
                } else if (parseInt(horsesLefts[horse.id]) >= eachTotal * 2 && parseInt(horsesLefts[horse.id]) < eachTotal * 3) {//第三段的速度
                    speeds[horse.id] = eachTotal / (openResult[horse.id] * (timeMap[horse.id][2]) * 60);//第三段
                } else if (parseInt(horsesLefts[horse.id]) >= eachTotal * 3 && parseInt(horsesLefts[horse.id]) < eachTotal * 4) {//第4段的速度
                    speeds[horse.id] = eachTotal / (openResult[horse.id] * (timeMap[horse.id][3]) * 60);//第4段
                } else if (parseInt(horsesLefts[horse.id]) >= eachTotal * 4 && parseInt(horsesLefts[horse.id]) < eachTotal * 5) {//第5段的速度
                    speeds[horse.id] = eachTotal / (openResult[horse.id] * (timeMap[horse.id][4]) * 60);//第5段
                }

                leftValue[horse.id] = leftValue[horse.id] || 0;
                leftValue[horse.id] += speeds[horse.id];
                horse.style.left = `${leftValue[horse.id]}px`;

            });
            const speedMin = Math.min(...Object.values(speeds));
            const speedMax = Math.max(...Object.values(speeds));
            const leftMax = Math.max(...Object.values(horsesLefts).map(value => parseInt(value)));
            const leftMin = Math.min(...Object.values(horsesLefts).map(value => parseInt(value)));
            const horsesLeftsKeys = Object.keys(horsesLefts);//马的id数组,马排序
            const horsesLeftsValues = Object.values(horsesLefts);//马的距离数组
            const sort_horsesLeftsValues = horsesLeftsValues.sort((a, b) => parseInt(a) - parseInt(b));//按跑动距离从小道大排序后的数组
            const sort_horsesLeftKeys = sort_horsesLeftsValues.map((value) => getKeyFromValue(horsesLefts, value));//horseid排序
            if (!store.get('sort_horsesLeftKeys') || store.get('sort_horsesLeftKeys').toString() != sort_horsesLeftKeys.toString()) {
                this.sortHorseRange(horseNumElems, horsesLefts, sort_horsesLeftsValues, total, reverse_array(openData), rangeNumImg);//底部实时排名,排名发生改变时重新排名。
            }
            store.set('sort_horsesLeftKeys', sort_horsesLeftKeys);//把旧的排名存起来，和之后的排名做比较

            const innerHorseWrap_scrollLeft = this.innerHorseWrap.scrollLeft;
            if (innerHorseWrap_scrollLeft < total - this.viewWidth) {//未到达终点线区域
                this.innerHorseWrap.scrollLeft = leftMax - (this.viewWidth - 200);
            } else {//到达终点线区域后，不滚动
                this.innerHorseWrap.scrollLeft += 0;
            }
            if (!isIE()) {//ie这样会抖动，不使用这个方案
                this.bottomSpace.style.left = `${this.innerHorseWrap.scrollLeft}px`;//底部实时排序div跟随移动，以防看不到
            }
            this.resultDialog.style.left = `${this.innerHorseWrap.scrollLeft + this.viewWidth / 2}px`;//结果弹屏也跟着走吧，免得到了终点看不到

            if (leftMin > total) {
                const yajunHorse = query('.yajunHorse .horse2');
                const guanjunHorse = query('.guanjunHorse .horse1');
                const jijunHorse = query('.jijunHorse .horse3');
                const yajunNum = query('.yajunHorse .yajunNum');
                const guanjunNum = query('.guanjunHorse .guanjunNum');
                const jijunNum = query('.jijunHorse .jijunNum');
                const resultOrders = [...queryAll('.resultOrders .resultOrder')];
                yajunHorse.style.backgroundImage = `url(./images/horse_${openData[1]}.png)`;
                guanjunHorse.style.backgroundImage = `url(./images/horse_${openData[0]}.png)`;
                jijunHorse.style.backgroundImage = `url(./images/horse_${openData[2]}.png)`;
                yajunNum.style.backgroundPosition = rangeNumImg[openData[1] - 1];
                guanjunNum.style.backgroundPosition = rangeNumImg[openData[0] - 1];
                jijunNum.style.backgroundPosition = rangeNumImg[openData[2] - 1];
                resultOrders.forEach((v, i) => {//弹出开奖结果底部排列
                    v.style.backgroundPosition = rangeNumImg[openData[i + 3] - 1];
                });
                this.resultDialog.style.display = 'block';
                setTimeout(() => {
                    window.clearTimeout(timeout);//1秒后关闭动画
                }, 1000);
            }
            timeout = setTimeout(move, 1000 / 60);
        }

        move();
    }

    getHorsesLeft(horses) {//获取每匹马的left值,即跑的距离
        const horsesLefts = new Object();
        horses.forEach(horse => horsesLefts[horse.id] = window.getComputedStyle(horse).left);
        return horsesLefts;
    }

    //底部实时排名函数
    sortHorseRange(horseNumElems, horsesLefts, sort_horsesLeftsValues, totalDistance, openData, rangeNumImg) {
        const horsesLeftsValues = Object.values(horsesLefts).map(v => parseInt(v));
        const completedHorseNums = horsesLeftsValues.filter(v => v >= totalDistance).length;//已经跑完的马数量
        const rest_horseNumElems = horseNumElems.slice(0, horseNumElems.length - completedHorseNums);
        if (completedHorseNums === 10) {
            this.sortHorseRangeLast(horseNumElems, reverse_array(openData), rangeNumImg);
            return;
        }
        rest_horseNumElems.forEach((numElem, index) => {
            if (sort_horsesLeftsValues.length === [...new Set(sort_horsesLeftsValues)].length) {//防止value值相同情况
                numElem.style.backgroundPosition = rangeNumImg[getKeyFromValue(horsesLefts, sort_horsesLeftsValues[index]).split('_')[1] - 1];
            }
        });
    }

    //最终排名函数
    sortHorseRangeLast(horseNumElems, openData, rangeNumImg) {
        horseNumElems.forEach((numElem, index) => {
            numElem.style.backgroundPosition = rangeNumImg[reverse_array(openData)[index] - 1];
        });
    }

    startGame() {
        getOpenCode({
            t: 'vrsm',
            p: 'json',
            limit: 3,
            token: '9261FABA1C0B092F'
        }).then((res) => {
            const openData = res.data.data[0].opencode.split(',').map(v => Number(v));
            const openTime = res.data.data[0].opentime.split(',');
            console.log(this)
            this.horseIssueDetail.innerText = res.data.data[0].expect;
            this.openResult = new Object();//声明一个对象来存储openData和duration的对应关系
            openData.forEach((item, index) => {//openData和duration对应
                this.openResult[`horse_${item}`] = this.duration[index];
            });
            this.horseInit();//初始位置
            if (Date.now() - new Date(openTime) > 90 * 1000) {
                this.lastOpenTime = openTime;
                if (this.lastOpenTime && (Date.now() - new Date(this.lastOpenTime) <= 90 * 1000)) {
                    return;
                }
                // this.horseMove(this.horses, this.totalDistance, this.timeMaps, this.openData, this.rangeNumImg);
            }
        }).catch(e => {
                console.log(e)
            }
        );
    }
}

new HorseAni().startGame();


