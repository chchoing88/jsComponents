(function (UI) {
  UI.view = UI.view || {};
  var EventManager = UI.utils.EventManager;
  var _ = UI.utils

  var BTN_SELECTOR = '.btn_select';
  var LAYER_SELECTOR = '.layer_select';
  var TEXT_SELECTOR = '.txt_select';
  var LI_SELECTOR = 'li';
  var UL_SELECTOR = 'ul';
  var HIDE_CLASS = 'hide';
  var SHOW_CLASS = 'open_select';
  var DISABLE_CLASS = 'disable';

  function SelectBox(ctx) {
    if (!(ctx && ctx instanceof HTMLElement)) {
      throw new Error(SelectBox.massages.ctxError);
    }

    this.context = ctx;
    this.btnEl = ctx.querySelector(BTN_SELECTOR);
    this.textEl = this.btnEl.querySelector(TEXT_SELECTOR)
    this.layerEl = ctx.querySelector(LAYER_SELECTOR);
    this.layerUlEl = this.layerEl.querySelector(UL_SELECTOR);
    this.isOpen = false;
    this.isDisable = false;
    this.callback = function () { };
    this.coreSelectBox = {
      setSelectValue: function () { },
      setDefaultValue: function () { },
      getSelectedValue: function () { },
      onCallback: function () { }
    }

    this.eventManager = new EventManager();
  };

  SelectBox.prototype = {
    registryCore: function (core) {
      var self = this;
      this.coreSelectBox = core;

      this.coreSelectBox.onCallback(function (selectedValue) {
        self.setSelectText(selectedValue);
        self.hideLayer();
      });
    },
    showLayer: function () {
      // hide 제거
      _.removeClass(this.layerEl, HIDE_CLASS)
      // 화살표 제어
      _.addClass(this.btnEl, SHOW_CLASS)
      this.isOpen = true;
    },
    hideLayer: function () {
      // hide 추가
      _.addClass(this.layerEl, HIDE_CLASS)
      // 화살표 제어
      _.removeClass(this.btnEl, SHOW_CLASS)
      this.isOpen = false;
    },
    toggleLayer: function () {
      if (this.isOpen) {
        this.hideLayer()
      } else {
        this.showLayer()
      }
    },
    setDisable: function () {
      _.addClass(this.context, DISABLE_CLASS)
      this.isDisable = true;
      this.coreSelectBox.setDefaultValue();
    },
    setEnable: function () {
      _.removeClass(this.context, DISABLE_CLASS)
      this.isDisable = false;
    },
    setSelectText: function (value) {
      this.textEl.innerText = value;
    },
    getTriggerBtnEl: function () {
      return this.btnEl;
    },
    getSelectItemEl: function () {
      if (this.layerEl instanceof HTMLElement) {
        return this.layerEl.querySelectorAll(LI_SELECTOR)
      }
      return null;
    },
    getSelectedValue: function () {
      return this.coreSelectBox.getSelectedValue();
    },
    renderItems: function (itemList) {
      var itemTag = [];
      for (var i = 0, len = itemList.length; i < len; i++) {
        itemTag.push('<li>' + itemList[i] + '</li>');
      }

      this.layerUlEl.innerHTML = itemTag.join(' ');
    },
    removeItems: function () {
      this.layerUlEl.innerHTML = '';
    },

    unbindEvent: function () {
      this.eventManager.offAll();
    },
    bindEvent: function () {
      var self = this;

      // 트리거 버튼 클릭
      var btnEl = this.getTriggerBtnEl()
      this.eventManager.on(btnEl, 'click', function (e) {
        self.toggleLayer()
      })

      function itemClickHandler(e) {
        e.preventDefault();
        var itemValue = this.innerText;
        self.coreSelectBox.setSelectValue(itemValue);

        if (typeof self.callback === 'function') {
          self.callback(itemValue);
        } else {
          throw new Error('registerItemClickCallback 에 등록된 타입' + typeof self.callback + '은 적절한 타입이 아닙니다. function 타입을 등록해주세요.')
        }
      }
      // select itme 클릭
      var selectItemEl = this.getSelectItemEl()
      if (selectItemEl) {
        this.eventManager.on(selectItemEl, 'click', itemClickHandler)
      }

      // document 클릭시.
      function docClickHandler(e) {
        if (!self.context.contains(e.target)) {
          self.hideLayer();
        }
      }
      self.eventManager.on(document, 'click', docClickHandler)
    },
    setCallback: function (fn) {
      this.callback = fn;
    }
  }

  SelectBox.massages = {
    ctxError: 'context 옵션은 반드시 넣어주어야 합니다. 인자는 HTMLElement 인스턴스여야 합니다.'
  }


  UI.view.SelectBox = SelectBox;

})(window.UI = window.UI || {})



