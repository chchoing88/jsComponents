(function () {
  'use strict';

  var elemInnerSelect = document.querySelector('.inner_select');
  var elemBtnSelect = elemInnerSelect.querySelector('.btn_select');
  var elemLayerSelect = elemInnerSelect.querySelector('.layer_select');
  var elemItems = elemLayerSelect.querySelectorAll('li');
  var elemText = elemBtnSelect.querySelector('.txt_select');

  var isOpen = false;

  function addClass(elem, className) {
    var classes = elem.className.split(' ');
    var index = classes.indexOf(className);
    if (index < 0) {
      classes.push(className);
    }
    elem.className = classes.join(' ');
  }

  function removeClass(elem, className) {
    var classes = elem.className.split(' ');
    var index = classes.indexOf(className);
    if (index >= 0) {
      classes.splice(index, 1)
    }
    elem.className = classes.join(' ');
  }

  function addEventListenerLists(elems, type, fn) {
    for (var i = 0, len = elems.length; i < len; i++) {
      elems[i].addEventListener(type, fn, false);
    }
  }

  //////

  function openLayer() {
    removeClass(elemLayerSelect, 'hide');
    addClass(elemBtnSelect, 'open_select');
    isOpen = true;
  }

  function closeLayer() {
    addClass(elemLayerSelect, 'hide');
    removeClass(elemBtnSelect, 'open_select');
    isOpen = false;
  }

  function btnClickDone(e) {
    if (isOpen) { // 열렸으면
      closeLayer();
    } else {
      openLayer();
    }
  }

  elemBtnSelect.addEventListener('click', btnClickDone, false)

  addEventListenerLists(elemItems, 'click', function (e) {
    e.preventDefault();
    elemText.innerText = this.innerText;
    closeLayer();
  })

  // 다른쪽 클릭시 닫힘.
  document.addEventListener('click', function (e) {
    e.preventDefault();
    if (elemInnerSelect.contains(e.target)) {
      return;
    }
    closeLayer();
  }, false)





})()
