//继承日历控件
function TripCalendar() {
	Calendar.apply(this, arguments);
	this.beginDay = null;
	this.endDay = null;
	this.currentElement = null;
}
TripCalendar.prototype = new Calendar();

//创建日历算法
TripCalendar.prototype._Draw = function(iYear, iMonth) {
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
			"<dt class=\"date\">"+ iYear + "年" + iMonth +"月</dt>",
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
	for(i = 1; i <= firstDay; i++) arr.push(0);
	for(i = 1; i <= lastDay; i++) arr.push(i);
	while(arr.length) {
		for(i = 1, len = arr.length; i <= len; i++) {
			if(arr.length) {
				oA = document.createElement("a");					
				sValue = arr.shift();
				if(!sValue) {			
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
					switch(cur - parseInt(this.today.replace(/-/g, ""))) {
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
					if(this.holiday) for(var className in this.dayName) this.isHoliday(oA, className);
					//开始时间
					this.beginDay == oA["data-date"] && ((oA.children[0] || oA).className = "begin", oA.title = "\u51fa\u53d1\u65f6\u95f4");
					//结束时间
					this.endDay == oA["data-date"] && ((oA.children[0] || oA).className = "end", oA.title = "\u8fd4\u56de\u65f6\u95f4");
					//开始时间结束时间范围
					if(this.beginDay && this.endDay) {
						if(cur > this.beginDay.replace(/-/g, "") && cur < this.endDay.replace(/-/g, "")) (oA.children[0] || oA).className = "range";
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
TripCalendar.prototype.changeDay = function(obj) {
	var sDate = obj["data-date"],
		aValue = sDate.split(/-/g),
		aUpper = ["\u4e00", "\u4e8c", "\u4e09"],
		aDate_str = [],
		aDate_int = [],
		o = this.Holidays(),
		msg;
	//如果为节假日当天, 则停止处理
	if(obj.className in o) return;
	//获取节假日前1-3天/后1-3天日期数据
	for(var i = 0; i < 6; i++) {
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
	for(var p in o) {
		for(var i = 0; i < aDate_str.length; i++) {
			if(new RegExp(aDate_str[i]).test(o[p])) {
				if(aDate_str[i] == this.today) continue;
				bAfter = aDate_int[i] > sDate.replace(/-/g, "");
				msg = this.dayName[p] + (bAfter ? "\u524d" : "\u540e") + (bAfter ? aUpper[Math.abs(3 - i)] : aUpper[3 - i - 1]) + "\u5929";
				break;
			}
		}
		if(bAfter) break;
	}
	return msg
};
//下月, 特殊要求：无论生成几个日历, 下月都只调整一个月
TripCalendar.prototype.NextMonth = function() {
	this.Draw(new Date(this.Year, this.Month, 1))	
};
//下月, 特殊要求：无论生成几个日历, 上月都只调整一个月
TripCalendar.prototype.PrevMonth = function() {
	this.Draw(new Date(this.Year, this.Month - 2, 1))
};