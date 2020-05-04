(function () {
  'use strict';

  function addClass(elem, className) {
    var classes = elem.className.split(' ');
    if (classes.indexOf(className) < 0) {
      classes.push(className);
      elem.className = classes.join(" ");
    }
  }

  function removeClass(elem, className) {
    var classes = elem.className.split(' ')
    if (classes.indexOf(className) > 0) {
      classes.splice(classes.indexOf(className), 1);
    }
    elem.className = classes.join(' ');
  }

  function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
      list[i].addEventListener(event, fn, false);
    }
  }

  function removeEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
      list[i].removeEventListener(event, fn, false);
    }
  }

  function ajax(method, url, data, cb) {
    var sendData = data || null
    var req = new XMLHttpRequest()
    req.open(method, url, true);
    req.onreadystatechange = function () { // 서버로부터 응답이 도착했을때 콜백함수를 지정하면 웹 서버로부터 응답이 도착했을때 콜백함수가 호출된다.
      if (req.readyState === 4) { // 상태코드
        if (req.status === 200) { // 응답코드
          var responseData = JSON.parse(this.responseText);
          cb(responseData)
        } else {
          console.log("Error loading page\n");
        }
      }
    };
    req.send(sendData);
  }



  function selectBox(ctxElem, callback) {

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
      btnSelect.querySelector('.txt_select').innerText = itemValue;

      if (callback) {
        callback(itemValue)
      }

      hideLayer();
    }

    function docClickHandler(e) {
      if (!ctxElem.contains(e.target)) {
        hideLayer();
      }
    }

    btnSelect.addEventListener('click', btnClickHandler, false)
    // select change 시
    addEventListenerList(selectItems, 'click', itemClickHandler);
    // 다른데 클릭스 layer hide 처리.
    document.addEventListener('click', docClickHandler, false)

    return {
      unbindEvent: function () {
        btnSelect.removeEventListener('click', btnClickHandler, false)
        removeEventListenerList(selectItems, 'click');
        document.removeEventListener('click', docClickHandler, false)

      },
      getSelectedValue: function () {
        return btnSelect.querySelector('.txt_select').innerText;
      }
    }
  }



  // index 

  var elmGenderSelect = document.getElementById('genderSelect')
  var elmNameSelect = document.getElementById('nameSelect')
  var elmResultImg = document.getElementById('resultImg')
  var nameUlElm = elmNameSelect.querySelector('.layer_select ul')
  // 초기화.
  var nameSelect = null;
  var genderSelect = null;

  var resultData = {
    male: {},
    female: {}
  };
  var REQUEST_URL = 'https://randomuser.me/api/?results=10';

  ajax('GET', REQUEST_URL, null, ajaxDone)

  function ajaxDone(responseData) {
    if (responseData && responseData.results) {
      var userData = responseData.results;
      var userLength = userData.length;

      for (var i = 0; i < userLength; i++) {
        var gender = userData[i].gender || 'male';
        var name = userData[i].name.first || 'merlin';
        var picture = userData[i].picture.large || '';


        resultData[gender][name] = picture
      }
      console.log(resultData)
      // genderSelect 활성화
      genderSelect = selectBox(elmGenderSelect, genderSelectDone);
      removeClass(elmGenderSelect, 'disable');

    } else {
      throw new Error("no response user Data")
    }
  }

  function genderSelectDone(selectValue) {
    addClass(elmNameSelect, 'disable')
    nameSelectInit();
    elmResultImg.innerHTML = '';

    if (resultData[selectValue]) {
      // li 리스트 생성
      var nameListItme = [];
      for (var name in resultData[selectValue]) {
        var itemTag = '<li>' + name + '</li>';
        nameListItme.push(itemTag)
      }

      var elmNameLists = nameListItme.join(' ');
      nameUlElm.innerHTML = elmNameLists;

      // name 셀렉트 활성화.
      nameSelect = selectBox(elmNameSelect, nameSelectDone);
      removeClass(elmNameSelect, 'disable');
    }
  }

  function nameSelectDone(selectValue) {
    var genderValue = genderSelect.getSelectedValue();
    if (resultData[genderValue]) {
      // alt 값을 모르고 생략
      var imageTag = '<img src="' + resultData[genderValue][selectValue] + '" alt="">';
      elmResultImg.innerHTML = imageTag
    }
  }

  function nameSelectInit() {
    if (nameSelect) {
      nameSelect.unbindEvent();
      elmNameSelect.querySelector('.txt_select').innerText = 'Name';
      nameUlElm.innerHTML = '';
    }
  }

})()

