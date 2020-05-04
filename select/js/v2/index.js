(function () {
  'use strict';

  // 클래스 추가
  function addClass(elem, className) {
    var classes = elem.className.split(' '); // 기존에 가지고 있던 클래스 문자열을 배열로 쪼갠다.
    if (classes.indexOf(className) < 0) { // 내가 찾는 className이 없다면
      classes.push(className); // 해당 클래스를 classes push 한다.
      elem.className = classes.join(" "); // 해당 엘리먼트에 다시 className을 심는다.
    }
  }
  // 클래스 제거
  function removeClass(elem, className) {
    var classes = elem.className.split(' ')
    if (classes.indexOf(className) > 0) {
      classes.splice(classes.indexOf(className), 1); // 해당 클래스 제거.
    }
    elem.className = classes.join(' ');
  }
  // 이벤트 리스너 등록
  function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
      list[i].addEventListener(event, fn, false);
    }
  }


  function selectBox(ctxElem) {

    var btnSelect = ctxElem.querySelector('.btn_select');
    var layerSelect = ctxElem.querySelector('.layer_select');
    var selectItems = layerSelect.querySelectorAll('li')

    var isOpen = false;

    function hideLayer() {
      // close 하자.
      isOpen = false;
      // hide 추가
      addClass(layerSelect, 'hide')
      // 화살표 제어
      removeClass(btnSelect, 'open_select')
    }

    function showLayer() {
      // open 하자.
      isOpen = true;
      // hide 제거
      removeClass(layerSelect, 'hide')
      // 화살표 제어
      addClass(btnSelect, 'open_select')
    }

    // select box 클릭시 
    function btnClickHandler(e) {
      // why?
      e.preventDefault();

      if (!isOpen) {
        showLayer();
      } else {
        hideLayer();
      }
    }

    function itemClickHandler(e) {
      e.preventDefault();

      var itemValue = this.innerText;
      btnSelect.querySelector('.txt_select').innerText = itemValue
      hideLayer();
    }

    btnSelect.addEventListener('click', btnClickHandler, false)
    // select change 시
    addEventListenerList(selectItems, 'click', itemClickHandler);

    // 다른데 클릭스 layer hide 처리.
    document.addEventListener('click', function (e) {
      if (!ctxElem.contains(e.target)) {
        hideLayer();
      }

    }, false)
  }


  // index 

  var ageSelectElm = document.getElementById('ageSelect')
  var locaSelectElm = document.getElementById('locaSelect')

  selectBox(ageSelectElm);
  selectBox(locaSelectElm);

})()

