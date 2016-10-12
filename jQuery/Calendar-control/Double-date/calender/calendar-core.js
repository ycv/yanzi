//页面输入事件
//失去焦点
function fnBlur() {
    this.value = this.value == "" ? this.defaultValue : this.value;
    this.className = "";
    this.style.color = this.value == this.defaultValue ? "#C1C1C1" : "#404040";
}
//选则日期函数
function fnSelectDay(obj) {
    var oInput = oCalendar.currentElement;
    var oSpan = _.$$("span", oInput.parentNode)[0];
    oInput.value = obj["data-date"];
    oInput.style.color = "#404040";
    oSpan.innerHTML = oCalendar.changeDay(obj) ? oCalendar.changeDay(obj) : obj["data-week"];
    oCalendar.hide();
    if (oInput == oBeginText) {
        oCalendar.beginDay = obj["data-date"];
        oCalendar.Draw();
        //oEndText.focus();
    }
    if (oInput == oEndText) {
        oCalendar.endDay = obj["data-date"];
    }
}
//日历控件构造函数
function Calendar() {
    this.initialize.apply(this, arguments)
}
Calendar.prototype = {
    constructor: Calendar,
    //初始化
    initialize: function (config) {
        config = config || {};
        //日历对象列表
        this.aCal = [],
                //插入指定位置
                this.insertBefore = typeof config.insertBefore === "object" ? config.insertBefore : document.getElementById(config.insertBefore);
        //日历id
        this.id = config.id || "C_" + (+new Date());
        //日历内容容器
        this.container = document.createElement("div");
        this.container.id = this.id;
        //关闭按钮
        this.oClose = document.createElement("span");
        this.oClose.className = "cal-close";
        //左按钮
        this.oPrev = document.createElement("span");
        this.oPrev.className = "cal-prev";
        //右按钮
        this.oNext = document.createElement("span");
        this.oNext.className = "cal-next";
        //是否显示功能按钮
        this.bShowBtn = config.showBtn;
        //是否特殊显示节假日
        this.holiday = config.holiday;
        //日历个数
        this.count = config.count || 1;
        //指定年份
        this.Year = config.year || new Date().getFullYear();
        //指定月份
        this.Month = config.month || new Date().getMonth() + 1;
        //选择的日期
        this.selectDay = config.selectDay;
        //当天回调函数
        this.onToday = config.onToday || function () {
        };
        //日历创建完毕回调函数
        this.onComplete = config.onComplete || function () {
        };
        //选择日期回调函数
        this.onSelectDay = config.onSelectDay || function () {
        };
        //今天
        this.today = new Date().getFullYear() + "-" + this.format(new Date().getMonth() + 1) + "-" + this.format(new Date().getDate());
        //配置功能按钮
        this.setBtn(this.bShowBtn);
        //添加事件
        this.addEvent();
    },
    //创建日历算法
    _Draw: function (iYear, iMonth) {
        var oContainer = document.createElement("div"),
                oDl = document.createElement("dl"),
                oDd = document.createElement("dd"),
                oFrag = document.createDocumentFragment(),
                //计算当月第一天是星期几
                firstDay = new Date(iYear, iMonth - 1, 1).getDay(),
                //计算当月有多少天
                lastDay = new Date(iYear, iMonth, 0).getDate(),
                //日历头
                aTmp = [
                    "<dt class=\"date\">" + iYear + "\u5e74" + iMonth + "\u6708</dt>",
                    "<dt><strong>\u65e5</strong></dt>",
                    "<dt>\u4e00</dt>",
                    "<dt>\u4e8c</dt>",
                    "<dt>\u4e09</dt>",
                    "<dt>\u56db</dt>",
                    "<dt>\u4e94</dt>",
                    "<dt><strong>\u516d</strong></dt>"
                ],
                arr = [],
                cur, oA, i, len, sValue, classIndex;
        //-------------------------------------------------------------
        for (i = 1; i <= firstDay; i++)
            arr.push(0);
        for (i = 1; i <= lastDay; i++)
            arr.push(i);
        while (arr.length) {
            for (i = 1, len = arr.length; i <= len; i++) {
                if (arr.length) {
                    oA = document.createElement("a");
                    sValue = arr.shift();
                    if (!sValue) {
                        oA.innerHTML = "&nbsp;";
                        oA.className = "disabled";
                    }
                    else {
                        oA["data-date"] = iYear + "-" + this.format(iMonth) + "-" + this.format(sValue);
                        oA["data-week"] = this.getWeek(oA["data-date"]);
                        oA.href = "javascript:;";
                        oA.innerHTML = sValue;
                        cur = new Date(iYear, iMonth - 1, sValue);
                        //屏蔽今天以前的日期选择
                        parseInt(oA["data-date"].replace(/-/g, "")) < parseInt(this.today.replace(/-/g, "")) && (oA.className = "disabled");
                        //节假日处理
                        if (this.holiday)
                            for (var className in this.dayName)
                                this.isHoliday(oA, className)
                    }
                }
                oFrag.appendChild(oA)
            }
        }
        //插入相关元素
        oDd.appendChild(oFrag);
        oDl.innerHTML = aTmp.join("");
        oDl.appendChild(oDd);
        oContainer.className = "cal-container";
        oContainer.appendChild(oDl);
        //记录日历队列
        this.aCal.push(oContainer);
        //返回生成好的日历
        return oContainer
    },
    //创建日历
    create: function () {
        var year = this.Year,
                month = this.Month,
                i = 0;
        //----------------------------------------------------------------
        this.container.className = "calendar"; //※指定日历控件className
        //清空日历队列
        while (this.aCal[0])
            this.container.removeChild(this.aCal.shift());
        //批量生成日历
        //for(i = 0; i < this.count; i++) {
        for (i = 0; i < 1; i++) {
            year += (month + (i ? 1 : 0)) > 12 ? 1 : 0;
            month = (month + (i ? 1 : 0)) % 12 || 12;
            this.container.appendChild(this._Draw(year, month))
        }
        //将日历插入页面, 如果未指定插入位置则插入BODY
        (this.insertBefore ? this.insertBefore.parentNode : document.body).insertBefore(this.container, this.insertBefore);
        //日历生成完毕的回调方法
        this.onComplete();
        return this
    },
    //根据日期创建日历
    Draw: function (date) {
        this.Year = date && date.getFullYear() || this.Year;
        this.Month = date && date.getMonth() + 1 || this.Month;
        //重新创建日历
        this.create();
        return this
    },
    //当前月
    NowMonth: function () {
        this.Draw(new Date())
    },
    //下月
    NextMonth: function () {
        this.Draw(new Date(this.Year, this.Month + (this.count - 1), 1))
    },
    //上月
    PrevMonth: function () {
        this.Draw(new Date(this.Year, this.Month - (this.count + 1), 1))
    },
    //计算是否为节假日
    isHoliday: function (obj, className) {
        if (new RegExp(obj["data-date"]).test(this.Holidays()[className].join())) {
            obj.className = className;
            obj["data-week"] = this.dayName[className];
            obj.innerHTML = "<span>" + obj.innerHTML + "</span>"
        }
    },
    //格式化数字, 不足两位补0
    format: function (str) {
        return str.toString().replace(/^(\d)$/, "0$1")
    },
    //显示日历
    show: function () {
        this.container.style.display = "block";
        return this
    },
    //隐藏日历
    hide: function () {
        this.container.style.display = "none"
        return this
    },
    //按钮设置(显示/隐藏)
    setBtn: function (boolean) {
        var obj = this.container;
        //如果按钮没有创建过并且设置为显示, 则创建按钮, 并添加已创建标记
        if (!this.mark && boolean) {
            obj.insertBefore(this.oClose, obj.firstChild);
            obj.insertBefore(this.oPrev, obj.firstChild);
            obj.insertBefore(this.oNext, obj.firstChild);
            //添加已创建标记
            this.mark = true
        }
        //如果按钮已经创建过, 则设置其显示/隐藏
        this.oClose.style.display = this.oPrev.style.display = this.oNext.style.display = boolean ? "block" : "none";
    },
    //添加事件
    addEvent: function () {
        var that = this,
                obj = this.container,
                handler = null;
        //CLICK事件代理
        handler = function (e) {
            e = e || event
            var oTarget = e.target || e.srcElement;
            switch (oTarget.className) {
                case "cal-close":
                    that.hide();
                    break;
                case "cal-prev":
                    that.PrevMonth();
                    break;
                case "cal-next":
                    that.NextMonth();
                    break;
            }
            oTarget.parentNode.tagName.toUpperCase() === "A" && (oTarget = oTarget.parentNode);
            if (oTarget.tagName.toUpperCase() === "A" && oTarget.className != "disabled") {
                that.onSelectDay(oTarget)
            }
        }
        //为日历控件添加CLICK事件监听
        if (obj.addEventListener)
            obj.addEventListener("click", handler, false);
        else if (obj.attachEvent)
            obj.attachEvent("onclick", handler)
    },
    //获取指定日期是星期几 @param date string yyyy-mm-dd
    getWeek: function (date) {
        var aWeek = ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
                arr = date.split(/-/g);
        return "\u661f\u671f" + aWeek[new Date(arr[0], arr[1] - 1, arr[2]).getDay()]
    },
    //节假日名字
    dayName: {
        "today": "\u4eca\u5929",
        "yuandan": "\u5143\u65e6",
        "chuxi": "\u9664\u5915",
        "chunjie": "\u6625\u8282",
        "yuanxiao": "\u5143\u5bb5\u8282",
        "qingming": "\u6e05\u660e",
        "wuyi": "\u52b3\u52a8\u8282",
        "duanwu": "\u7aef\u5348\u8282",
        "zhongqiu": "\u4e2d\u79cb\u8282",
        "guoqing": "\u56fd\u5e86\u8282"
    },
    //2012——2020年节假日数据
    Holidays: function () {
        return {
            today: [this.today],
            yuandan: ["2012-01-01", "2013-01-01", "2014-01-01", "2015-01-01", "2016-01-01", "2017-01-01", "2018-01-01", "2019-01-01", "2020-01-01"],
            chuxi: ["2012-01-22", "2013-02-09", "2014-01-30", "2015-02-18", "2016-02-07", "2017-01-27", "2018-02-15", "2019-02-04", "2020-01-24"],
            chunjie: ["2012-01-23", "2013-02-10", "2014-01-31", "2015-02-19", "2016-02-08", "2017-01-28", "2018-02-16", "2019-02-05", "2020-01-25"],
            yuanxiao: ["2012-02-06", "2013-02-24", "2014-2-14", "2015-03-05", "2016-02-22", "2017-02-11", "2018-03-02", "2019-02-19", "2020-02-8"],
            qingming: ["2012-04-04", "2013-04-04", "2014-04-05", "2015-04-05", "2016-04-04", "2017-04-04", "2018-04-05", "2019-04-05", "2020-04-04"],
            wuyi: ["2012-05-01", "2013-05-01", "2014-05-01", "2015-05-01", "2016-05-01", "2017-05-01", "2018-05-01", "2019-05-01", "2020-05-01"],
            duanwu: ["2012-06-23", "2013-06-12", "2014-06-02", "2015-06-20", "2016-06-09", "2017-05-30", "2018-06-18", "2019-06-07", "2020-06-25"],
            zhongqiu: ["2012-09-30", "2013-09-19", "2014-09-08", "2015-09-27", "2016-09-15", "2017-10-04", "2018-09-24", "2019-09-13", "2020-10-01"],
            guoqing: ["2012-10-01", "2013-10-01", "2014-10-01", "2015-10-01", "2016-10-01", "2017-10-01", "2018-10-01", "2019-10-01", "2020-10-01"]
        }
    }
};
//扩展
//继承日历控件
function TripCalendar() {
    Calendar.apply(this, arguments);
    this.beginDay = null;
    this.endDay = null;
    this.currentElement = null;
}
TripCalendar.prototype = new Calendar();

//创建日历算法
TripCalendar.prototype._Draw = function (iYear, iMonth) {
    var oContainer = document.createElement("div"),
            oDl = document.createElement("dl"),
            oDd = document.createElement("dd"),
            oFrag = document.createDocumentFragment(),
            //计算当月第一天是星期几
            firstDay = new Date(iYear, iMonth - 1, 1).getDay(),
            //计算当月有多少天
            lastDay = new Date(iYear, iMonth, 0).getDate(),
            //日历头
            aTmp = [
                "<dt class=\"date\">" + iYear + "年" + iMonth + "月</dt>",
                "<dt><strong>日</strong></dt>",
                "<dt>一</dt>",
                "<dt>二</dt>",
                "<dt>三</dt>",
                "<dt>四</dt>",
                "<dt>五</dt>",
                "<dt><strong>六</strong></dt>"
            ],
            arr = [],
            cur, oA, i, len, sValue, classIndex;
    //-------------------------------------------------------------
    for (i = 1; i <= firstDay; i++)
        arr.push(0);
    for (i = 1; i <= lastDay; i++)
        arr.push(i);

    while (arr.length) {
        for (i = 1, len = arr.length; i <= len; i++) {
            if (arr.length) {
                oA = document.createElement("a");
                sValue = arr.shift();
                if (!sValue) {
                    oA.innerHTML = "&nbsp;";
                    oA.className = "disabled";
                }
                else {
                    cur = iYear + this.format(iMonth) + this.format(sValue);
                    oA["data-date"] = iYear + "-" + this.format(iMonth) + "-" + this.format(sValue);
                    oA["data-week"] = this.getWeek(oA["data-date"]);
                    oA.href = "javascript:;";
                    oA.innerHTML = sValue;
                    //标记明天, 后天
                    switch (cur - parseInt(this.today.replace(/-/g, ""))) {
                        case 1:
                            oA["data-week"] = "\u660e\u5929";
                            break;
                        case 2:
                            oA["data-week"] = "\u540e\u5929";
                            break;
                    }
                    //屏蔽今天以前的日期选择
                    cur < parseInt(this.today.replace(/-/g, "")) && (oA.className = "disabled");
                    //节假日处理
                    if (this.holiday)
                        for (var className in this.dayName)
                            this.isHoliday(oA, className);
                    //开始时间
                    this.beginDay == oA["data-date"] && ((oA.children[0] || oA).className = "begin", oA.title = "222");
                    //this.beginDay == oA["data-date"] && ((oA.children[0] || oA).className = "begin", oA.title = "\u51fa\u53d1\u65f6\u95f4");
                    //结束时间
                    this.endDay == oA["data-date"] && ((oA.children[0] || oA).className = "end", oA.title = "\u8fd4\u56de\u65f6\u95f4");
                    //开始时间结束时间范围
                    if (this.beginDay && this.endDay) {
                        if (cur > this.beginDay.replace(/-/g, "") && cur < this.endDay.replace(/-/g, ""))
                            (oA.children[0] || oA).className = "range";
                    }
                }
            }
            oFrag.appendChild(oA)
        }
    }
    //插入相关元素
    oDd.appendChild(oFrag);
    oDl.innerHTML = aTmp.join("");
    oDl.appendChild(oDd);
    oContainer.className = "cal-container";
    oContainer.appendChild(oDl);
    //记录日历队列
    this.aCal.push(oContainer);
    //返回生成好的日历
    return oContainer
};
//转换节假日前1-3天/后1-3天显示
TripCalendar.prototype.changeDay = function (obj) {
    var sDate = obj["data-date"],
            aValue = sDate.split(/-/g),
            aUpper = ["\u4e00", "\u4e8c", "\u4e09"],
            aDate_str = [],
            aDate_int = [],
            o = this.Holidays(),
            msg;
    
    //如果为节假日当天, 则停止处理
    if (obj.className in o)
        return;
    //获取节假日前1-3天/后1-3天日期数据
    for (var i = 0; i < 6; i++) {
        aDate_str[i] = new Date(aValue[0], aValue[1] - 1, aValue[2] - 0 - (i < 3 ? (i + 1) : -(i - 2)));
        aDate_str[i] = aDate_str[i].getFullYear() + "-" + this.format(aDate_str[i].getMonth() + 1) + "-" + this.format(aDate_str[i].getDate());
        aDate_int[i] = aDate_str[i].replace(/-/g, "")
    }
    //将获取的数据按时间正序排列
    aDate_str.sort();
    aDate_int.sort();
    //是否是节假日后1-3天
    var bAfter = false;
    //例遍节假日数据进行匹配
    for (var p in o) {
        for (var i = 0; i < aDate_str.length; i++) {
            if (new RegExp(aDate_str[i]).test(o[p])) {
                if (aDate_str[i] == this.today)
                    continue;
                bAfter = aDate_int[i] > sDate.replace(/-/g, "");
                msg = this.dayName[p] + (bAfter ? "\u524d" : "\u540e") + (bAfter ? aUpper[Math.abs(3 - i)] : aUpper[3 - i - 1]) + "\u5929";
                break;
            }
        }
        if (bAfter)
            break;
    }
 console.log(sDate);
    return msg
};
//下月, 特殊要求：无论生成几个日历, 下月都只调整一个月
TripCalendar.prototype.NextMonth = function () {
    this.Draw(new Date(this.Year, this.Month, 1))
};
//下月, 特殊要求：无论生成几个日历, 上月都只调整一个月
TripCalendar.prototype.PrevMonth = function () {
    this.Draw(new Date(this.Year, this.Month - 2, 1))
};