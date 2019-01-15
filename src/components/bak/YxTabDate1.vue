<template>
  <div style="display: flex; justify-content: flex-end; width:100%;">
    <v-radio-group type="button" size="large"  :data="[{value: 'day', text: '日'}]" v-model="selectValue" @change="changedRadio" />
    <div @click="clickPre"><v-icon type="left" :style="selectIconStyle"></v-icon></div>
    <div @click="clickNext"><v-icon type="right" :style="nextStyle"></v-icon></div>
  </div>
</template>

<script>
export default {
  props: {
    changed: Function, // (type, start, end)
    changedFormart: Function, //  startdate, enddate, enddate2/*enddate加一天*/
  },
  data() {
    return {
      today: new Date(),
      startDate: {},
      endDate: {},
      selectDate: new Date(),
      selectValue: 'day',
      selectIconStyle: 'font-size: 20px; margin-left: 3px; cursor: pointer; margin-Top:8px; color: #3296fa;',
      selectIconStyleDisabled: ' color: #cccccc;',
      nextStyle: null
    }
  },
  created() {
    this.selectDate = new Date();
    this.callback();
  },
  methods: {
    getNextStyle() {
      let _self = this;
    
      // console.log(_self.today,_self.startDate,_self.endDate)

      let _date = _self.endDate;
      if (!_date) _date = _self.startDate;
      if (!_date || !_self.today) return _self.selectIconStyle+_self.selectIconStyleDisabled;
      // console.log(_date)
      const isLastEnabled =_date.getFullYear() === _self.today.getFullYear() && 
                           _date.getMonth() === _self.today.getMonth() && 
                           _date.getDate() === _self.today.getDate();
       return isLastEnabled?_self.selectIconStyle+_self.selectIconStyleDisabled:_self.selectIconStyle;
    },
    callback() {
      let _self = this;
      
      let curDate = new Date(_self.selectDate);
      if (_self.selectValue === 'day') {
        _self.startDate = curDate;
        _self.endDate = null;
      } else if (_self.selectValue === 'week') {
        // debugger;
        const curDay = curDate.getDay();// 一周 星期几  0——6
        if (curDay < 6) {
          curDate.setDate(curDate.getDate() - curDay - 1);
        }
        
        _self.startDate = new Date(curDate);
        curDate.setDate(curDate.getDate() + 6);
        _self.endDate = new Date(curDate);

        _self.selectDate.setTime(_self.endDate.getTime());
      } else {
        curDate.setDate(1);
        _self.startDate = new Date(curDate);

        curDate.setMonth(curDate.getMonth() + 1);
        curDate.setDate(curDate.getDate() - 1);
        _self.endDate = new Date(curDate);

        _self.selectDate.setTime(_self.startDate.getTime());
      }
      // console.log(_self.startDate);
      // console.log(_self.today);
      if (_self.startDate.getFullYear() > _self.today.getFullYear() ||
          (_self.startDate.getFullYear() >= _self.today.getFullYear() && _self.startDate.getMonth() > _self.today.getMonth()) ||
          (_self.startDate.getFullYear() >= _self.today.getFullYear() && _self.startDate.getMonth() >= _self.today.getMonth() && _self.startDate.getDate() > _self.today.getDate()) 
      ) {
        _self.selectDate.setTime(_self.today.getTime());
        return;
      }
      if (_self.endDate && (_self.endDate.getFullYear() > _self.today.getFullYear() ||
          (_self.endDate.getFullYear() >= _self.today.getFullYear() && _self.endDate.getMonth() > _self.today.getMonth()) ||
          (_self.endDate.getFullYear() >= _self.today.getFullYear() && _self.endDate.getMonth() >= _self.today.getMonth() && _self.endDate.getDate() > _self.today.getDate()) )
      ) {
        _self.endDate = new Date();
        _self.selectDate.setTime(_self.endDate.getTime());
      }

      // formartdate 2017-11-12

      if (_self.changed) _self.changed(this.startDate, this.endDate);
      _self.nextStyle = _self.getNextStyle();
      if (!_self.changedFormart) return;
      _self.changedDateFormart(this.startDate, this.endDate);
    },
    changedDateFormart(startdate, enddate) {
      let _self = this;
      let _startDate = startdate.getFullYear() + '-' + (startdate.getMonth()+1) + '-' + startdate.getDate();
      let _endDate, _endDate2;
      if (enddate) {
        // _self.isEndDate = true;
        _endDate = enddate.getFullYear() + '-' + (enddate.getMonth()+1) + '-' + enddate.getDate();
        
        enddate.setDate(enddate.getDate()+1);
        _endDate2 = enddate.getFullYear() + '-' + (enddate.getMonth()+1) + '-' + enddate.getDate();
      } else {
        // _self.isEndDate = false;
        _endDate = startdate.getFullYear() + '-' + (startdate.getMonth()+1) + '-' + startdate.getDate();
        
        startdate.setDate(startdate.getDate()+1);
        _endDate2 = startdate.getFullYear() + '-' + (startdate.getMonth()+1) + '-' + startdate.getDate();
      }
      
      _self.changedFormart(_startDate, _endDate, _endDate2,enddate!==null);
    },
    // 上一个日期
    clickPre() {
      // debugger;      
      let _self = this;
      if (_self.selectValue === 'day') {
        this.selectDate.setDate(this.selectDate.getDate() - 1);
      } else if (_self.selectValue === 'week') {
        this.selectDate.setDate(this.selectDate.getDate() - 7);
      } else {
        this.selectDate.setMonth(this.selectDate.getMonth() - 1);
      }
      
      this.callback();
    },
    // 下一个日期
    clickNext() {
      let _self = this;
      if (_self.selectValue === 'day') {
        this.selectDate.setDate(this.selectDate.getDate() + 1);
      } else if (_self.selectValue === 'week') {
        this.selectDate.setDate(this.selectDate.getDate() + 7);
      } else {
        this.selectDate.setMonth(this.selectDate.getMonth() + 1);
      }
      
      this.callback();
    },
    changedRadio(value) {

      this.selectDate = new Date();
      this.callback();
    }
  }
}
</script>

