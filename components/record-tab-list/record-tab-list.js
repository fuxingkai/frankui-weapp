"use strict";
const app = getApp();
var rate = 0;
var doubleLineCanvasWidth = 0;
var doubleLineCanvasHeight = 0;
Component({
    properties: {
        data: {
            type: Object,
            value: null,
            observer: "onDataChange"
        },
        onReachBottom: {
            type: Number,
            value: 0,
            observer: "onReachBottom"
        },
        tab:{
            type: String,
            value: '',//all,hasAnswer,hasArchive,noAnswer
            observer: "onTabChange"
        },
        parentTab:{
            type: String,
            value: '',//all,hasAnswer,hasArchive,noAnswer
            observer: "onTabChange"
        }
    },


    data: {
        page:1,
        loadMore: {
            enableLoadMore: false,
            hasMore: true,
        },
        recordList: [
            {
                isPlay: false,
                name: '王先生',
                recordSrc: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
                phone: '13168849257',
                type: '安居客来电',
                rPersonnel: '万兴',
                duration: '30:22',
                createTime: '2019-11-11 22:22:12',
                curTime: '30:22',
            },
            {
                isPlay: false,
                name: '林生',
                recordSrc: 'https://m10.music.126.net/20181224155914/03dce6a865a2e3b86ed4072a6065c071/ymusic/2aaa/a86b/87e5/212e204b1a56ed13728108dc00a495c7.mp3',
                phone: '13168849257',
                type: '安居客来电',
                rPersonnel: '万兴',
                duration: '30:22',
                createTime: '2019-11-11 22:22:12',
                curTime: '30:22',
            },
            {
                isPlay: false,
                name: '王先生',
                recordSrc: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
                phone: '13168849257',
                type: '安居客来电',
                rPersonnel: '万兴',
                duration: '30:22',
                createTime: '2019-11-11 22:22:12',
                curTime: '30:22',
            },
            {
                isPlay: false,
                name: '林生',
                recordSrc: 'https://m10.music.126.net/20181224155914/03dce6a865a2e3b86ed4072a6065c071/ymusic/2aaa/a86b/87e5/212e204b1a56ed13728108dc00a495c7.mp3',
                phone: '13168849257',
                type: '安居客来电',
                rPersonnel: '万兴',
                duration: '30:22',
                createTime: '2019-11-11 22:22:12',
                curTime: '30:22',
            },
            {
                isPlay: false,
                name: '王先生',
                recordSrc: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
                phone: '13168849257',
                type: '安居客来电',
                rPersonnel: '万兴',
                duration: '30:22',
                createTime: '2019-11-11 22:22:12',
                curTime: '30:22',
            },
            {
                isPlay: false,
                name: '林生',
                recordSrc: 'https://m10.music.126.net/20181224155914/03dce6a865a2e3b86ed4072a6065c071/ymusic/2aaa/a86b/87e5/212e204b1a56ed13728108dc00a495c7.mp3',
                phone: '13168849257',
                type: '安居客来电',
                rPersonnel: '万兴',
                duration: '30:22',
                createTime: '2019-11-11 22:22:12',
                curTime: '30:22',
            },
            {
                isPlay: false,
                name: '王先生',
                recordSrc: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
                phone: '13168849257',
                type: '安居客来电',
                rPersonnel: '万兴',
                duration: '30:22',
                createTime: '2019-11-11 22:22:12',
                curTime: '30:22',
            },
            {
                isPlay: false,
                name: '林生',
                recordSrc: 'https://m10.music.126.net/20181224155914/03dce6a865a2e3b86ed4072a6065c071/ymusic/2aaa/a86b/87e5/212e204b1a56ed13728108dc00a495c7.mp3',
                phone: '13168849257',
                type: '安居客来电',
                rPersonnel: '万兴',
                duration: '30:22',
                createTime: '2019-11-11 22:22:12',
                curTime: '30:22',
            },
            {
                isPlay: false,
                name: '王先生',
                recordSrc: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
                phone: '13168849257',
                type: '安居客来电',
                rPersonnel: '万兴',
                duration: '30:22',
                createTime: '2019-11-11 22:22:12',
                curTime: '30:22',
            },
            {
                isPlay: false,
                name: '林生',
                recordSrc: 'https://m10.music.126.net/20181224155914/03dce6a865a2e3b86ed4072a6065c071/ymusic/2aaa/a86b/87e5/212e204b1a56ed13728108dc00a495c7.mp3',
                phone: '13168849257',
                type: '安居客来电',
                rPersonnel: '万兴',
                duration: '30:22',
                createTime: '2019-11-11 22:22:12',
                curTime: '30:22',
            }
        ]
    },


    methods: {

        onDataChange: function onDataChange() {
            if(this.data.data==null||this.data.data==undefined){
                return;
            }
            //开始加载数据
            console.log(this.data.data);
        },

        /**
         * tab发生改变，停止播放音频，更新界面UI
         */
        onTabChange: function onTabChange() {
            if(this.data.parentTab!=this.data.tab){
                getApp().getAudioContext().stop();
                this.updateRecordList(-1);
            }
        },

        /**
         * item内部点击
         * @param {*} e 
         */
        onClickListItem: function onClickListItem(e) {
            console.log(e);
            if(e.detail.clickEvent.target=='play'){
                this.updateRecordList(e.detail.index);
            }
        },

        /**
         * 更新音频list
         * @param {*} index 
         */
        updateRecordList: function updateRecordList(index) {
            let recordList = [];
            for (var i = 0; i < this.data.recordList.length; i++) {
                var item = this.data.recordList[i];
                if (index != i) {
                    item.isPlay = false;
                } else {
                    item.isPlay = item.isPlay ? false : true;
                }
                recordList.push(item);
            }
            this.setData({
                recordList: recordList
            });
        },

        
        onReachBottom: function onReachBottom() {
            console.log('list--onReachBottom');
            if (this.data.recordList === null || this.data.recordList.length === 0) {
                return;
            }
            this.setData({
                'loadMore.enableLoadMore': true
            });
    
            if (this.data.loadMore.hasMore) {
                this.getRecordListData();
            }
        },

        getRecordListData: function getRecordListData() {
            if(this.data.page>5){
                this.setData({
                    'loadMore.enableLoadMore': true,
                    'loadMore.hasMore': false
                });
                return;
            }
            let _this = this;
            setTimeout(function(){

                let recordList = _this.data.recordList;
                let item={};
                item.isPlay=false;
                item.name='王先生';
                item.recordSrc='http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
                item.phone='13168849257';
                item.type='安居客来电';
                item.rPersonnel='万兴';
                item.duration='30:22';
                item.createTime='2019-11-11 22:22:12';
                item.curTime='30:22';
                let item1 = {};
                item1.isPlay=false;
                item1.name='王先生';
                item1.recordSrc='http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
                item1.phone='13168849257';
                item1.type='安居客来电';
                item1.rPersonnel='万兴';
                item1.duration='30:22';
                item1.createTime='2019-11-11 22:22:12';
                item1.curTime='30:22';

                recordList.push(item);
                recordList.push(item1);
                _this.setData({
                    'loadMore.enableLoadMore': false,
                    'loadMore.hasMore': true,
                    recordList:recordList,
                    page:_this.data.page+1
                });
            },1000);
        },

    }
});