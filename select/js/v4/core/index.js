(function (UI) {
  'use strict';
  UI.core = UI.core || {};


  function SelectBox(defaultValue) {
    this.defaultSelectValue = defaultValue || '';
    this.selectedValue = this.defaultSelectValue;
    this.callBackFn = function () { }
  }

  SelectBox.prototype = {
    setSelectValue: function (value) {
      this.selectedValue = value;
      this.callBackFn(this.selectedValue);
    },
    setDefaultValue: function () {
      this.selectedValue = this.defaultSelectValue;
      this.callBackFn(this.selectedValue);
    },
    getSelectedValue: function () {
      return this.selectedValue;
    },
    // getDefaultValue: function () {
    //   return this.defaultSelectValue;
    // },
    onCallback: function (fn) {
      if (typeof fn === 'function') {
        this.callBackFn = fn;
      }
    }
  }

  UI.core.SelectBox = SelectBox;

})(window.UI = window.UI || {})


