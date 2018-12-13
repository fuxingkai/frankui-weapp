"use strict";

Component({
    properties: {
        dateType: {
            type: String,
            value: "",//日：day,周：weeks,月：month,季度：quarter,自定义：custom
            observer: 'onDateTypeChange'
        }
    },

    data: {
        preEnable: true,
        nextEable: false,
        queryEable: false,
        callbackDate: {
            curDate: "2018-11-11",
            startDate: "请选择开始时间",
            endDate: "选择结束时间"
        },
        content: "2018-11-11",
        preText: "上一日",
        nextText: "下一日",
        date: null,
        startDatePickerValue: ['', '', ''],
        startDatePickerIsShow: false,
        endDatePickerValue: ['', '', ''],
        endDatePickerIsShow: false,

    },

    created: function created() {
        this.data.date = new Date();
    },



    methods: {
        /**
        * 选择开始日期
        * @param {*} e 
        */
        onClickSelectStart: function onClickSelectStart(e) {
            this.setData({
                startDatePickerIsShow: true,
            });
        },
        /**
        * 选择结束日期
        * @param {*} e 
        */
        onClickSelectEnd: function onClickSelectEnd(e) {
            this.setData({
                endDatePickerIsShow: true,
            });
        },
        /**
         * 确认选择时间
         * @param {*} e 
         */
        onClickSureDatePicker: function onClickCancelDatePicker(e) {
            console.log('datePickerOnSureClick');
            console.log(e);
            let updateData = {};
            let callbackDate = this.data.callbackDate;
            if (e.currentTarget.id == 'start_date_picker') {
                updateData.startDatePickerValue = e.detail.value;
                updateData.startDatePickerIsShow = false;
                callbackDate.startDate = e.detail.value[0] + "-" + e.detail.value[1] + "-" + e.detail.value[2];
            } else if (e.currentTarget.id == 'end_date_picker') {
                updateData.endDatePickerValue = e.detail.value;
                updateData.endDatePickerIsShow = false;
                callbackDate.endDate = e.detail.value[0] + "-" + e.detail.value[1] + "-" + e.detail.value[2];
            }
            if (callbackDate.startDate != '请选择开始时间' && callbackDate.endDate != '选择结束时间') {
                updateData.queryEable = true;
            } else {
                updateData.queryEable = false;
            }
            updateData.callbackDate = callbackDate;
            this.setData(updateData);
        },
        /**
        * 取消选择时间
        * @param {*} e 
        */
        onClickCancelDatePicker: function onClickCancelDatePicker(event) {
            console.log('datePickerOnCancelClick');
            console.log(event);
            this.setData({
                startDatePickerIsShow: false,
                endDatePickerIsShow: false
            });
        },
        /**
         * 查询
         * @param {*} e 
         */
        onClickQuery: function onClickQuery(e) {
            if (!this.data.queryEable) {
                return;
            }
            if (!(this.data.endDatePickerValue[0] >= this.data.startDatePickerValue[0] && this.data.endDatePickerValue[1] >= this.data.startDatePickerValue[1] && this.data.endDatePickerValue[2] >= this.data.startDatePickerValue[2])) {
                wx.showToast({
                    title: '结束时间不能大于开始时间,请重新选择时间！',
                    duration: 2000,
                    icon:'none',
                    mask:true
                })
            }

            this.triggerEvent('onCallbackDate', { date: this.data.callbackDate });
        },
        /**
        * 上个日期
        * @param {*} e 
        */
        onClickPre: function onClickPre(e) {
            if (!this.data.preEnable) {
                return;
            }
            console.log(e);
            let updateData = this.getUpdateData(this.data.date, this.data.dateType, 'pre');
            this.setData(updateData);
            this.triggerEvent('onCallbackDate', { date: this.data.callbackDate });
        },
        /**
         * 下个日期
         * @param {*} e 
         */
        onClickNext: function onClickNext(e) {
            if (!this.data.nextEable) {
                return;
            }
            console.log(e);
            let updateData = this.getUpdateData(this.data.date, this.data.dateType, 'next');
            this.setData(updateData);
            this.triggerEvent('onCallbackDate', { date: this.data.callbackDate });
        },

        /**
         * 获取更新数据
         * @param {*} date 
         * @param {*} dateType 
         */
        getUpdateData: function getUpdateData(date, dateType, direction) {
            let updateData = {};
            let content = "";
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let weeksDay = date.getDay();
            let nextEable = true;
            let callbackDate = this.data.callbackDate;
            switch (dateType) {
                case 'day': {
                    if (direction == 'pre') {
                        date.setDate(date.getDate() - 1);
                    } else if (direction == 'next') {
                        date.setDate(date.getDate() + 1);
                    }
                    if (this.checkNextEableStatus(new Date(), date)) {
                        nextEable = false;
                    }
                    year = date.getFullYear();
                    month = date.getMonth() + 1;
                    day = date.getDate();
                    content = year + "-" + month + "-" + day;
                    callbackDate.curDate = content;
                    callbackDate.startDate = content;
                    callbackDate.endDate = content;
                    break;
                }
                case 'weeks': {
                    //一周有七天，所有点上一周就减去七天，下一周就加上七天
                    if (direction == 'pre') {
                        date.setDate(date.getDate() - 7);
                    } else if (direction == 'next') {
                        date.setDate(date.getDate() + 7);
                    }
                    if (this.checkNextEableStatus(new Date(), date)) {
                        nextEable = false;
                    }

                    //获取当天在这一周是属于第几天，然后计算这一周的起始天日期和结束的日期
                    weeksDay = date.getDay();

                    let starDate = new Date(date.getTime());
                    starDate.setDate(date.getDate() - weeksDay);
                    let startYear = starDate.getFullYear();
                    let startMonth = starDate.getMonth() + 1;
                    let startDay = starDate.getDate();

                    let endDate = new Date(date.getTime());
                    if (nextEable) {
                        endDate.setDate(date.getDate() + (6 - weeksDay));
                    }
                    let endYear = endDate.getFullYear();
                    let endMonth = endDate.getMonth() + 1;
                    let endDay = endDate.getDate();

                    content = startYear + "-" + startMonth + "-" + startDay + ' 至 ' + endYear + "-" + endMonth + "-" + endDay;
                    callbackDate.curDate = content;
                    callbackDate.startDate = startYear + "-" + startMonth + "-" + startDay;
                    callbackDate.endDate = endYear + "-" + endMonth + "-" + endDay;
                    break;
                }
                case 'month': {
                    if (direction == 'pre') {
                        date.setMonth(date.getMonth() - 1);
                    } else if (direction == 'next') {
                        date.setMonth(date.getMonth() + 1);
                    }
                    if (this.checkNextEableStatus(new Date(), date)) {
                        nextEable = false;
                    }

                    let starDate = new Date(date.getTime());
                    //计算当月的第一天日期
                    starDate.setDate(1);
                    let startYear = starDate.getFullYear();
                    let startMonth = starDate.getMonth() + 1;
                    let startDay = starDate.getDate();

                    let endDate = new Date(date.getTime());

                    if (nextEable) {
                        //计算当月的最后一天的日期，通过设置日期加一个月，然后减去一天可以得到当月的最后一天的日期
                        endDate.setMonth(date.getMonth() + 1);
                        endDate.setDate(0);
                    }
                    let endYear = endDate.getFullYear();
                    let endMonth = endDate.getMonth() + 1;
                    let endDay = endDate.getDate();

                    content = startYear + "-" + startMonth + "-" + startDay + ' 至 ' + endYear + "-" + endMonth + "-" + endDay;
                    callbackDate.curDate = content;
                    callbackDate.startDate = startYear + "-" + startMonth + "-" + startDay;
                    callbackDate.endDate = endYear + "-" + endMonth + "-" + endDay;
                    break;
                }
                case 'quarter': {
                    //一季度有三个月，所有点上一季度就减去三个月，下一季度就加上3个月
                    if (direction == 'pre') {
                        date.setMonth(date.getMonth() - 3);
                    } else if (direction == 'next') {
                        date.setMonth(date.getMonth() + 3);
                    }
                    if (this.checkNextEableStatus(new Date(), date)) {
                        nextEable = false;
                    }

                    //获取当前月份除以3，根据向下取整和求余来计算当前季度和季度的起始日期
                    let starDate = new Date(date.getTime());
                    let startMonth = starDate.getMonth() + 1;
                    let startqQuarter = Math.floor(startMonth / 3);
                    let startQuarterMonth = startMonth % 3;
                    //当当前月份是该季度的最后一个月,求开始月份应该减去2个月，当当前月份不是该季度的最后一个月，求开始月份应该减去求余数然后加一
                    if (startQuarterMonth == 0) {
                        starDate.setMonth(starDate.getMonth() - 2);
                    } else {
                        startqQuarter++;
                        starDate.setMonth(starDate.getMonth() + 1 - startQuarterMonth);
                    }

                    starDate.setDate(1);
                    let startYear = starDate.getFullYear();
                    startMonth = starDate.getMonth() + 1;
                    let startDay = starDate.getDate();

                    let endDate = new Date(date.getTime());
                    let endMonth = endDate.getMonth() + 1;
                    let endQuarterMonth = endMonth % 3;
                    if (nextEable) {
                        //当当前月份是该季度的最后一个月,求结束月份应该加上一个月然后设置日期减去0，当当前月份不是该季度的最后一个月，求结束月份应该减去求余数然后加4再然后设置日期减去0
                        if (endQuarterMonth == 0) {
                            endDate.setMonth(endDate.getMonth() + 1);
                        } else {
                            endDate.setMonth(endDate.getMonth() + 4 - endQuarterMonth);
                        }
                        endDate.setDate(0);
                    }
                    let endYear = endDate.getFullYear();
                    endMonth = endDate.getMonth() + 1;
                    let endDay = endDate.getDate();

                    content = startYear + "年第" + startqQuarter + "季度";
                    callbackDate.curDate = content;
                    callbackDate.startDate = startYear + "-" + startMonth + "-" + startDay;
                    callbackDate.endDate = endYear + "-" + endMonth + "-" + endDay;
                    break;
                }
                case 'custom': {

                    break;
                }
                default: {

                    break;
                }
            }
            updateData.content = content;
            updateData.nextEable = nextEable;
            updateData.callbackDate = callbackDate;
            return updateData;
        },


        /**
         * 比较两个时间是否相等
         * @param {*} e 
         */
        checkNextEableStatus: function checkNextEableStatus(date1, date2) {
            if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()) {
                return true;
            } else {
                return false;
            }
        },

        /**
         * 选择日期类型变化
         * @param {*} e 
         */
        onDateTypeChange: function onDateTypeChange(e) {
            let updateData = {}
            let date = this.data.date;
            updateData = this.getInitUpdateData(date, this.data.dateType, updateData);
            switch (this.data.dateType) {
                case 'day': {
                    updateData.preText = "上一日";
                    updateData.nextText = "下一日";
                    break;
                }
                case 'weeks': {
                    updateData.preText = "上一周";
                    updateData.nextText = "下一周";
                    break;
                }
                case 'month': {
                    updateData.preText = "上一月";
                    updateData.nextText = "下一月";
                    break;
                }
                case 'quarter': {
                    updateData.preText = "上一季度";
                    updateData.nextText = "下一季度";
                    break;
                }
                case 'custom': {

                    break;
                }
                default: {

                    break;
                }
            }
            this.setData(updateData);
            this.triggerEvent('onCallbackDate', { date: this.data.callbackDate });
        },

        getInitUpdateData: function getInitUpdateData(date, dateType, updateData) {
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let weeksDay = date.getDay();
            updateData = Object.assign(updateData, this.getUpdateData(date, dateType, 'nromal'));

            return updateData;
        },
    }
});