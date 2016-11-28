var __mypicker = $.fn.datepicker;

$.fn.datepicker = function (options) {
    options.disableddates = options.disableddates || [];
    options.daterange = options.daterange || [];
    var oldOptions = jQuery.extend(true, {}, options);
    options.beforeShowDay = function (date, me) {
        if (oldOptions.beforeShowDay) {
            oldOptions.beforeShowDay(date, me);
        }
        var dd = options.disableddates.map(function (item) {
            return item.getTime();
        });
        var dr = options.daterange.map(function (item) {
            return item.getTime();
        });
        if ($.inArray(date.getTime(), dd) != -1) {
            return [false, '', ''];
        }
        if ($.inArray(date.getTime(), dr) != -1) {
            return [true, "ui-range-selected"];
        }
        return [true, '', ''];
    }
    options.onSelect = function (date, me) {
        var rq_selsetType_mord = $("#rq_selsetType_mord").val();
        if (!options.dateFormat) {
            options.dateFormat = "mm/dd/yy"
        }
        var d = $.datepicker.parseDate(options.dateFormat, date);


        if (oldOptions.onSelect) {
            oldOptions.onSelect(date, me);
        }
        me.inline = true;
        var disabled = $.inArray(d.getTime(), options.disableddates.map(function (item) {
            return item.getTime();
        })) != -1;
        if (disabled) {
            return;
        }
        //某一天
        if (rq_selsetType_mord == 2) {
            options.daterange = [];
            options.daterange.push(d);
        }

        //某一周
        if (rq_selsetType_mord == 1) {
            var nr = [];
            var setnowTime = d.getTime();
            var sday_n = d.getDay();
            if (0 == sday_n) {
                sday_n = 7;
            }
            var oneDayLong = 24 * 60 * 60 * 1000;
            var MondayTime = setnowTime - (sday_n - 1) * oneDayLong;
            var SundayTime = setnowTime + (7 - sday_n) * oneDayLong;


            var max = new Date(SundayTime);
            var min = new Date(MondayTime);

            for (var d1 = min; d1 <= max; d1.setDate(d1.getDate() + 1)) {
                if ($.inArray(d1.getTime(), options.disableddates.map(function (item) {
                    return item.getTime();
                })) == -1) {
                    nr.push(new Date(d1));
                }
            }

            options.daterange = nr;
        }

        var max = new Date(Math.max.apply(Math, options.daterange));
        var min = new Date(Math.min.apply(Math, options.daterange));

        //$(this).val($.datepicker.formatDate(options.dateFormat, max, options) + " - " + $.datepicker.formatDate(options.dateFormat, min, options));
    }
    options.onClose = function (date, me) {
        if (oldOptions.onClose) {
            oldOptions.onClose(date, me);
        }
        me.inline = false;
    }

    __mypicker.apply(this, [options]);
    $(document).bind('keydown', function (event) {
        if (event.ctrlKey || event.metaKey) {
            options.ctrlKey = event.ctrlKey || event.metaKey;
        }
    });
    $(document).bind('keyup', function (event) {
        options.ctrlKey = false;
    });

    //set the date range
    var $self = this;
    $self.getDateRange = function () {
        return options.daterange;
    }
    return this;
}