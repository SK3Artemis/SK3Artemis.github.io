var scriptsLoaded = [];
function loadFiles(_0x124bd8) {
  startProgress();
  var _0x5d4b47 = new FileLoader();
  _0x124bd8.forEach(function (_0x29634b) {
    if (!!!(scriptsLoaded.indexOf(_0x29634b.split('/').pop()) > -0x1)) {
      _0x5d4b47.add(_0x29634b);
    }
  });
  var _0x314605 = _0x5d4b47.loaded();
  _0x314605.then(function () {
    console.log("Completed loading");
    endProgress();
  });
  return _0x5d4b47.loaded();
}
function FileLoader() {
  var _0x165696 = [];
  this.add = function (_0x46f436) {
    var _0x1a5e41 = new Promise(function (_0x2cab68, _0x4f3523) {
      var _0x9503d1 = null;
      if (_0x46f436.split('.').pop() === 'js') {
        _0x9503d1 = getScriptElm(_0x46f436);
      } else {
        _0x9503d1 = getLinkElm(_0x46f436);
      }
      _0x9503d1.addEventListener("load", function () {
        _0x2cab68(_0x9503d1);
        filename = _0x9503d1.src.split('/').pop();
        if (scriptsLoaded.indexOf(filename) === -0x1) {
          scriptsLoaded.push(filename);
        }
        console.log("file loaded:->" + filename);
      }, false);
      _0x9503d1.addEventListener('error', function () {
        _0x4f3523(_0x9503d1);
        console.log("was rej");
      }, false);
    });
    _0x165696.push(_0x1a5e41);
  };
  this.loaded = function (_0xeb2696) {
    return Promise.all(_0x165696);
  };
}
function startProgress() {
  document.getElementById("ajaxProgressBar").style.display = "block";
}
function endProgress() {
  document.getElementById("ajaxProgressBar").style.display = "none";
}
function isScriptLoaded(_0x24b038) {
  return !!(scriptsLoaded.indexOf(_0x24b038.split('/').pop()) > -0x1);
}
function getScriptElm(_0x275197) {
  var _0x19cf33 = document.createElement("script");
  _0x19cf33.type = 'text/javascript';
  _0x19cf33.src = _0x275197;
  document.getElementsByTagName('head')[0x0].appendChild(_0x19cf33);
  return _0x19cf33;
}
function getLinkElm(_0x542726) {
  var _0x523489 = document.createElement('link');
  _0x523489.rel = "stylesheet";
  _0x523489.type = "text/css";
  _0x523489.href = _0x542726;
  document.getElementsByTagName("HEAD")[0x0].appendChild(_0x523489);
  return _0x523489;
}
var gViewName = '';
document.addEventListener('DOMContentLoaded', loadCommonFunctions);
function loadCommonFunctions() {
  setViewName();
  setThemeMode();
  setFavorite();
  setRecently();
  setupBNavigation();
  checkIfUserIsLoggedIn();
  checkIfAdBlocker();
}
function setViewName() {
  gViewName = document.getElementById("viewName").value;
  console.log("in setview gViewName:->" + gViewName);
}
function setupBNavigation() {
  const _0x3dab59 = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0x0);
  if (_0x3dab59.length > 0x0) {
    _0x3dab59.forEach(_0x2490b2 => {
      _0x2490b2.addEventListener('click', () => {
        const _0x110741 = _0x2490b2.dataset.target;
        const _0x3f8de6 = document.getElementById(_0x110741);
        _0x2490b2.classList.toggle("is-active");
        _0x3f8de6.classList.toggle("is-active");
      });
    });
  }
}
function checkIfUserIsLoggedIn() {
  var _0x1bcbc0 = getCookie('loggedinuser');
  var _0x5b1711 = getCookie('loggedinuserid');
  if (_0x1bcbc0 != '' && _0x5b1711 != '') {
    document.getElementById("usernamelable").textContent = _0x1bcbc0.substring(0x0, 0x5) + '..';
    document.getElementById('notloggedin').style.display = "none";
    document.getElementById("loggedin").style.display = 'block';
    setupUserLoginDropDown();
  }
}
function setupUserLoginDropDown() {
  var _0x4026b2 = document.querySelector('.dropdown');
  _0x4026b2.addEventListener("click", function (_0x52c5b7) {
    _0x52c5b7.stopPropagation();
    _0x4026b2.classList.toggle('is-active');
  });
}
function getCookie(_0x5aa48d) {
  var _0x194295 = _0x5aa48d + '=';
  var _0x4f4b2a = document.cookie.split(';');
  for (var _0xafc84 = 0x0; _0xafc84 < _0x4f4b2a.length; _0xafc84++) {
    var _0x5f234d = _0x4f4b2a[_0xafc84];
    while (_0x5f234d.charAt(0x0) == " ") {
      _0x5f234d = _0x5f234d.substring(0x1);
    }
    if (_0x5f234d.indexOf(_0x194295) == 0x0) {
      _0x194295 = _0x5f234d.substring(_0x194295.length, _0x5f234d.length);
      return _0x194295.replace(/\+/g, " ");
    }
  }
  return '';
}
window.onclick = function (_0x6a94e0) {
  if (!_0x6a94e0.target.matches('.dropbtn')) {
    document.querySelector('.dropdown').classList.remove("is-active");
  }
};
function openErrorModal(_0x211498) {
  document.getElementById("errorMessage").textContent = _0x211498;
  document.getElementById("errorModal").classList.toggle('is-active');
}
function openErrorModalLink(_0x480f40) {
  document.getElementById("errorMessage").innerHTML = _0x480f40;
  document.getElementById("errorModal").classList.toggle("is-active");
}
function closeAllModal() {
  var _0x3e7457 = document.getElementsByClassName("modal");
  for (var _0x1e4169 = 0x0; _0x1e4169 < _0x3e7457.length; _0x1e4169++) {
    _0x3e7457[_0x1e4169].classList.remove("is-active");
  }
}
document.addEventListener("keydown", keyDownEvent);
function keyDownEvent(_0x54b5b0) {
  if (_0x54b5b0.key === "Escape") {
    closeAllModal();
    if (gViewName == 'xmlviewer' && fullscreenEditor == "output") {
      closeFullScreenXML();
    } else {
      closeFullScreen(fullscreenEditor);
    }
  }
}
function makeFav() {
  var _0x31c79d = localStorage.getItem('favoriteList');
  if (_0x31c79d == null || _0x31c79d === undefined) {
    _0x31c79d = [];
  } else {
    _0x31c79d = JSON.parse(_0x31c79d);
  }
  if (document.getElementById("favText").innerText === "Added") {
    document.getElementById("favIcon").setAttribute("href", "#heart-no-fill");
    document.getElementById("favText").innerText = "Add to Fav";
    document.getElementById("favIcon").closest("button").title = "Add this tool to Favorites";
    removeFav(_0x31c79d);
  } else {
    document.getElementById("favIcon").setAttribute("href", "#heart");
    document.getElementById('favText').innerText = "Added";
    document.getElementById("favIcon").closest('button').title = 'Added';
    addFav(_0x31c79d);
  }
}
function setRecently() {
  if (gViewName !== 'index' && gViewName !== "recently-used-tools") {
    return false;
  }
  let _0x3c5d3e = JSON.parse(localStorage.getItem("recentUsedStack"));
  if (_0x3c5d3e != null && _0x3c5d3e.length != 0x0) {
    document.getElementById("recentlyHomePageStatus").classList.remove('is-hidden');
  } else {
    return;
  }
  let _0x5bfe0d = [];
  let _0x1c0b23 = 0x1;
  for (let _0x48146c = 0x1; _0x48146c <= 0x5 && _0x1c0b23 > 0x0; _0x48146c++) {
    _0x1c0b23 = _0x3c5d3e.length - _0x48146c;
    let _0x25ebf2 = _0x3c5d3e[_0x1c0b23].title;
    let _0x1dbab8 = _0x3c5d3e[_0x1c0b23].view;
    if (_0x25ebf2 == null || _0x25ebf2.trim().length == 0x0) {
      _0x25ebf2 = _0x1dbab8.toUpperCase();
    }
    let _0x2941b8 = '';
    if (_0x25ebf2.length < 0x13) {
      _0x2941b8 = 'is-large';
    } else {
      if (_0x25ebf2.length < 0x18) {
        _0x2941b8 = "is-medium";
      } else if (_0x25ebf2.length < 0x1e) {
        _0x2941b8 = '';
      } else {
        _0x2941b8 = 'is-small';
      }
    }
    if (isThemeMode == "dark") {
      _0x2941b8 = _0x2941b8 + " bg-dmode";
    }
    _0x5bfe0d.push("<a class='button funbtn " + _0x2941b8 + "' href=/" + _0x1dbab8 + '>' + _0x25ebf2 + "</a>");
  }
  if (document.getElementById('recentlyHomePage') != null) {
    document.getElementById("recentlyHomePage").innerHTML = document.getElementById("recentlyHomePage").innerHTML + _0x5bfe0d.join('');
  }
}
function setFavorite() {
  var _0xad73f7 = localStorage.getItem("favoriteList");
  if (_0xad73f7 == null || _0xad73f7 === undefined || _0xad73f7.length === 0x0) {
    _0xad73f7 = [];
    return;
  } else {
    _0xad73f7 = JSON.parse(_0xad73f7);
  }
  for (var _0x41f032 = _0xad73f7.length - 0x1; _0x41f032 >= 0x0; _0x41f032--) {
    if (gViewName === _0xad73f7[_0x41f032].view) {
      document.getElementById("favIcon").setAttribute("href", "#heart");
      document.getElementById("favText").innerText = "Added";
      document.getElementById('favIcon').closest("button").title = "Added";
      break;
    }
  }
  reDrawFavMenu(_0xad73f7);
}
function addFav(_0x2ede48) {
  document.getElementById("favLink").style.backgroundColor = "#3850b7";
  document.getElementById('favLink').style.color = '#FFFFFF';
  setTimeout(function () {
    document.getElementById("favLink").style.backgroundColor = '';
    document.getElementById("favLink").style.color = '';
  }, 0x1f4);
  var _0x3ebb15 = {
    'title': document.getElementById('mainTitle').textContent.trim(),
    'view': gViewName
  };
  _0x2ede48.push(_0x3ebb15);
  localStorage.setItem("favoriteList", JSON.stringify(_0x2ede48));
  reDrawFavMenu(_0x2ede48);
}
function removeFav(_0x81407a) {
  for (var _0x59cfbb = _0x81407a.length - 0x1; _0x59cfbb >= 0x0; _0x59cfbb--) {
    if (gViewName === _0x81407a[_0x59cfbb].view) {
      _0x81407a.splice(_0x59cfbb, 0x1);
      localStorage.setItem("favoriteList", JSON.stringify(_0x81407a));
      break;
    }
  }
  reDrawFavMenu(_0x81407a);
}
function reDrawFavMenu(_0x44424a) {
  var _0x26ed25 = '';
  if (_0x44424a.length === 0x0) {
    document.getElementById("favContent").innerHTML = "<p>None</p>";
    return;
  }
  for (var _0x3a141e = _0x44424a.length - 0x1; _0x3a141e >= 0x0; _0x3a141e--) {
    _0x26ed25 = _0x26ed25 + "<a class=\"navbar-item\" href=\"/" + _0x44424a[_0x3a141e].view + "\">" + _0x44424a[_0x3a141e].title + '</a>';
  }
  document.getElementById("favContent").innerHTML = _0x26ed25;
}
function checkIfAdBlocker() {
  adsBlocked(function (_0x1effd8) {
    if (_0x1effd8) {
      actionOnAdBlocker();
    } else {
      adsBlocked(function (_0x2e9516) {
        if (_0x2e9516) {
          actionOnAdBlocker();
        } else {
          console.log("Yay no ad blocker available! Yay");
        }
      }, '/adex.js');
    }
  });
}
function actionOnAdBlocker() {
  document.getElementById("adBlockerShare").style.display = '';
  console.log("hmm blocker available! Oh no");
  gtag('event', "Yes", {
    'app_name': "codebeautify",
    'event_category': document.getElementById("viewName").value
  });
}
function adsBlocked(_0x281a2f, _0x51361b) {
  let _0x505a16 = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
  if (_0x51361b != null) {
    _0x505a16 = _0x51361b;
  }
  console.log("ad link:->" + _0x505a16);
  var _0x37aaed = {
    'method': "HEAD",
    'mode': "no-cors"
  };
  var _0x3554d3 = new Request(_0x505a16, _0x37aaed);
  fetch(_0x3554d3).then(function (_0x37cc91) {
    return _0x37cc91;
  }).then(function (_0x4e8395) {
    console.log(_0x4e8395);
    _0x281a2f(false);
  })["catch"](function (_0x23744f) {
    console.log(_0x23744f);
    _0x281a2f(true);
  });
}
var isThemeMode = 'light';
function setThemeMode() {
  let _0x5b3625 = window.localStorage.getItem("isThemeValue");
  if (_0x5b3625 == null || _0x5b3625 == "light") {
    isThemeMode = "light";
    return;
  }
  if (_0x5b3625 == 'dark') {
    isThemeMode = 'light';
    changeDLMode(false);
  }
}
function changeDLMode(_0x2a2246 = true) {
  if (isThemeMode == "light") {
    isThemeMode = "dark";
    darkMode();
    window.localStorage.setItem("isThemeValue", "dark");
  } else {
    isThemeMode = "light";
    lightMode();
    window.localStorage.setItem("isThemeValue", "light");
  }
  if (_0x2a2246 && updateDarkMode) {
    updateDarkMode();
  }
}
function darkMode() {
  document.getElementById("colorModeIcon").setAttribute("href", "#lightMode");
  document.getElementById('logoInHeader').setAttribute("src", "/img/nlogo-dark.png");
  document.getElementById('app').classList.add("bg-dmode");
  document.querySelectorAll("body, .container, section, h1, h2, h3, h4, h5, p, a, strong, footer, hr, ul,\n\t\t\t.jsoneditor-menu, .jsoneditor-statusbar,\n\t\t\tlabel, .column.box, \n\t\t\t.aceEditorMenu, #inputACEStatusBar, #outputACEStatusBar,\n\t\t\t#favLink, #visitedTools ").forEach(_0x50734d => {
    if (!_0x50734d.classList.contains('is-active') && !_0x50734d.classList.contains("tag")) {
      _0x50734d.classList.add("bg-dmode");
    }
  });
  document.querySelectorAll("input, textarea").forEach(_0x111e3f => {
    _0x111e3f.classList.add('bgmode-inputfields');
  });
}
function lightMode() {
  document.getElementById("colorModeIcon").setAttribute("href", '#darkMode');
  document.getElementById('logoInHeader').setAttribute("src", "/img/nlogo.webp");
  document.getElementById("app").classList.remove("bg-dmode");
  document.querySelectorAll("body, .container, section, h1, h2, h3, h4, h5, p, a, strong, footer, hr, ul,\n\t\t\t.jsoneditor-menu, .jsoneditor-statusbar,\n\t\t\tlabel, .column.box, \n\t\t\t.aceEditorMenu, #inputACEStatusBar, #outputACEStatusBar,\n\t\t\t#favLink, #visitedTools ").forEach(_0x4f5bc6 => {
    _0x4f5bc6.classList.remove("bg-dmode");
  });
  document.querySelectorAll("input, textarea").forEach(_0xd82459 => {
    _0xd82459.classList.remove("bgmode-inputfields");
  });
}
var fullscreenEditor = '';
document.addEventListener("DOMContentLoaded", setDefaultData);
(function () {
  var _0x5f5dda = /(\r?\n|\r)/g;
  var _0x40bf25 = /(\r?\n|\r|\s+)/g;
  window.StringSize = {
    'count': function (_0x4de6ff, _0x31b677) {
      _0x31b677 = _0x31b677 || {};
      _0x31b677.lineBreaks = _0x31b677.lineBreaks || 0x1;
      _0x31b677.ignoreWhitespace = _0x31b677.ignoreWhitespace || false;
      var _0x28a6c9 = _0x4de6ff.length;
      var _0x311b28 = _0x28a6c9 - _0x4de6ff.replace(/[\u0100-\uFFFF]/g, '').length;
      var _0x211c4c = _0x28a6c9 - _0x4de6ff.replace(_0x5f5dda, '').length;
      return _0x31b677.ignoreWhitespace ? (_0x4de6ff = _0x4de6ff.replace(_0x40bf25, ''), _0x4de6ff.length + _0x311b28) : _0x28a6c9 + _0x311b28 + Math.max(0x0, _0x31b677.lineBreaks * (_0x211c4c - 0x1));
    },
    'format': function (_0x19d374, _0xc23f71) {
      var _0x6349e7 = 0x0;
      while (_0x19d374 > 0x400) {
        _0x19d374 /= 0x400;
        _0x6349e7++;
      }
      _0x19d374 = Math.round(_0x19d374 * 0x64) / 0x64;
      _0x6349e7 = ['', 'K', 'M', 'G', 'T'][_0x6349e7];
      return (_0xc23f71 ? _0x19d374 : "<b>" + _0x19d374 + "</b>") + " " + _0x6349e7 + 'B';
    }
  };
})();
function saveRecentlyUsed() {
  if (localStorage) {
    var _0x1e9722 = localStorage.getItem("recentUsedStack");
    if (_0x1e9722 == null || _0x1e9722 === undefined) {
      _0x1e9722 = [];
    } else {
      _0x1e9722 = JSON.parse(_0x1e9722);
    }
    createRecentUsedLink(_0x1e9722);
    _0x1e9722 = _0x1e9722.filter(function (_0x23d55b) {
      return _0x23d55b.view != gViewName;
    });
    if (_0x1e9722 != null && _0x1e9722 !== undefined && _0x1e9722.length >= 0xa) {
      _0x1e9722.shift();
    }
    var _0x106eb5 = {
      'title': document.getElementById("mainTitle").textContent.trim(),
      'view': gViewName,
      'date': new Date()
    };
    console.log(" saveRecentlyUsed view: " + gViewName + "title:->" + document.getElementById("mainTitle").textContent.trim());
    _0x1e9722.push(_0x106eb5);
    localStorage.setItem("recentUsedStack", JSON.stringify(_0x1e9722));
  }
}
function createRecentUsedLink(_0x2e8be9) {
  var _0x4ba401 = [];
  for (var _0x5a5f00 = _0x2e8be9.length - 0x1; _0x5a5f00 >= 0x0; _0x5a5f00--) {
    var _0x5bcf39 = _0x2e8be9[_0x5a5f00].title;
    var _0x49473b = _0x2e8be9[_0x5a5f00].view;
    if (_0x5bcf39 == null || _0x5bcf39.trim().length == 0x0) {
      _0x5bcf39 = _0x49473b.toUpperCase();
    }
    let _0x5bca67 = '';
    if (isThemeMode == "dark") {
      _0x5bca67 = 'bg-dmode';
    }
    _0x4ba401.push("<li><a class='" + _0x5bca67 + "' href=/" + _0x49473b + '>' + _0x5bcf39 + "</a></li>");
  }
  if (document.getElementById('visitedTools') != null) {
    document.getElementById("visitedTools").innerHTML = _0x4ba401.join('');
  }
}
function loadNewView() {
  let _0x2c9297 = window.location.href;
  let _0x4b9a2c = new URL(_0x2c9297);
  _0x4b9a2c.search = '';
  window.history.pushState({}, document.title, _0x4b9a2c.pathname);
  window.location.reload();
}
function setURLParameters() {
  urlParam = function (_0x103cc0) {
    var _0xa45b4a = window.location.href;
    var _0x5879c7 = new RegExp("[?&]" + _0x103cc0 + "=([^&#]*)").exec(_0xa45b4a);
    if (_0x5879c7 == null) {
      return null;
    }
    if (_0x103cc0 == "url") {
      return _0xa45b4a.substring(_0xa45b4a.indexOf('=') + 0x1);
    }
    return decodeURI(_0x5879c7[0x1]) || 0x0;
  };
}
function setDefaultData() {
  saveRecentlyUsed();
  setURLParameters();
  setIsAutoCheckBox();
  if (loadRestoreDataLogin()) {
    return;
  } else {
    if (loadDataFromExternalURL()) {
      return;
    } else {
      if (loadDataFromEnteralInput()) {
        return;
      } else {
        if (loadDataFromSavedData()) {
          return;
        }
      }
    }
  }
}
function setIsAutoCheckBox() {
  let _0x4f72be = window.localStorage.getItem("isAuto-" + gViewName);
  if (_0x4f72be != null) {
    _0x4f72be = JSON.parse(_0x4f72be);
    document.getElementById("isAuto").checked = _0x4f72be;
  }
  if (document.getElementById("isAuto")) {
    document.getElementById("isAuto").addEventListener("change", _0x3d216f => {
      window.localStorage.setItem("isAuto-" + gViewName, _0x3d216f.target.checked);
    });
  }
}
function setFromLocalStorage() {
  if (localStorage) {
    var _0x30d70f = localStorage.getItem(gViewName);
    if (_0x30d70f != null && _0x30d70f.trim().length != 0x0) {
      if (typeof setToEditor == "function") {
        setToEditor(_0x30d70f);
      }
    }
  }
}
function loadRestoreDataLogin() {
  var _0x43ef61 = null;
  if (urlParam("restoreDataAfter") != null) {
    _0x43ef61 = urlParam("restoreDataAfter");
    if (_0x43ef61 != null && _0x43ef61.length != 0x0 && _0x43ef61 === 'true') {
      setFromLocalStorage();
    }
    return true;
  }
  return false;
}
function loadDataFromExternalURL() {
  var _0x23d830 = null;
  if (urlParam("url") != null) {
    _0x23d830 = urlParam('url');
    if (_0x23d830 != null && _0x23d830.length != 0x0) {
      title = "URL: " + _0x23d830;
      if (document.getElementById("subtitle")) {
        document.getElementById("subtitle").textContent = title;
      }
      loadExternalUrl(_0x23d830, gViewName);
    }
    return true;
  }
  return false;
}
function loadDataFromEnteralInput() {
  var _0x49226d = null;
  if (urlParam("input") != null) {
    _0x49226d = urlParam("input");
    if (_0x49226d != null && _0x49226d.length != 0x0) {
      title = "Input Parameter";
      if (document.getElementById("subtitle")) {
        document.getElementById("subtitle").textContent = title;
      }
      setToEditor(_0x49226d);
    }
    return true;
  }
  return false;
}
function loadExternalUrl(_0x3ed347, _0x4da473) {
  parameters = "path=" + encodeURIComponent(_0x3ed347);
  AJAXCB({
    'data': parameters,
    'serverURL': "//www.codebeautify.com/URLService",
    'success': function (_0x2732ea) {
      try {
        if (_0x2732ea.responseText.length === 0x0 || _0x2732ea.responseText === "404: Not Found") {
          openErrorModal("Invalid URL or URL not loading URL: " + _0x3ed347);
        } else {
          setToEditor(_0x2732ea.responseText);
          updateTitleForURL("URL: " + _0x3ed347);
        }
      } catch (_0x2e1a26) {
        openErrorModal("Invalid " + _0x4da473 + " Data Or Invalid " + _0x4da473 + " URL.");
      }
    },
    'error': function (_0x55df64) {
      openErrorModal("Error in data saving Error:->" + _0x55df64.message);
    }
  });
}
function loadDataFromSavedData(_0x34f279) {
  if (document.getElementById("fContent") === null || document.getElementById("fContent") === undefined) {
    return;
  }
  var _0x34f279 = document.getElementById('fContent').value;
  var _0x2c2747 = document.getElementById("fTitle").value;
  parameters = "urlid=" + _0x34f279;
  AJAXCB({
    'data': parameters,
    'serverURL': "/service/getDataFromID",
    'success': function (_0x4c884f) {
      try {
        if (gViewName == 'alleditor') {
          setDataFromDBForAllEditor(_0x4c884f.responseText);
        } else {
          setToEditor(_0x4c884f.responseText);
        }
        updateTitleForURL(_0x2c2747);
      } catch (_0xcb6b54) {
        openErrorModal("Invalid " + view + " Data Or Invalid " + view + " URL.");
      }
    },
    'error': function (_0x44b563) {
      openErrorModal("Error in data saving");
    }
  });
}
function updateTitleForURL(_0x57c105) {
  document.getElementById('permalink').style.display = '';
  document.getElementById('subtitle').textContent = _0x57c105;
}
function manageDPS() {
  document.getElementById('dataSavePolicy').classList.toggle('is-active');
}
function openSaveModal() {
  data = getValueFromInputEditor();
  if (data === null || data === undefined || data.trim().length === 0x0) {
    openErrorModal("There is no data to save.");
    return;
  }
  if (document.getElementById('nsfwPreventionModal') === null) {
    AJAXCB({
      'serverURL': "/common-modals",
      'success': function (_0x410973) {
        document.body.insertAdjacentHTML("beforeend", _0x410973.responseText);
        document.getElementById('nsfwPreventionModal').classList.toggle("is-active");
      }
    });
  } else {
    document.getElementById('nsfwPreventionModal').classList.toggle('is-active');
  }
  return;
  if (document.getElementById("saveModal") === null) {
    AJAXCB({
      'serverURL': '/common-modals',
      'success': function (_0x2e4b6f) {
        document.body.insertAdjacentHTML("beforeend", _0x2e4b6f.responseText);
        document.getElementById('saveModal').classList.toggle("is-active");
        cleanSaveForm();
      }
    });
  } else {
    document.getElementById("saveModal").classList.toggle("is-active");
    cleanSaveForm();
  }
}
function cleanSaveForm() {
  document.getElementById("saveTitle").value = '';
  document.getElementById("saveDesc").value = '';
  document.getElementById("saveTags").value = '';
  document.getElementById("expiryValue").value = "1440";
}
function closeNSFWPreventionModal() {
  if (document.getElementById("nsfwPreventionModal") !== null) {
    document.getElementById("nsfwPreventionModal").classList.remove("is-active");
  }
}
function isSpamCheckTitle(_0x427323) {
  let _0x5c3d58 = ["spam"];
  for (var _0x4866be = 0x0; _0x4866be < _0x5c3d58.length; _0x4866be++) {
    if (_0x427323.toLowerCase().includes(_0x5c3d58[_0x4866be])) {
      return true;
    }
  }
  return false;
}
function isSpamCheckData(_0xfc8d02) {
  let _0x592acf = ["spam"];
  for (var _0x341291 = 0x0; _0x341291 < _0x592acf.length; _0x341291++) {
    if (_0xfc8d02.toLowerCase().includes(_0x592acf[_0x341291])) {
      return true;
    }
  }
  if (gViewName == "htmlviewer") {
    if (!isValidHTMLString(_0xfc8d02)) {
      return true;
    }
  }
  return false;
}
function save() {
  data = getValueFromInputEditor();
  if (data === undefined || data.trim().length === 0x0) {
    closeAllModal();
    openErrorModal("There is no data to save.");
  }
  var _0x5b1ef7 = document.getElementById("saveTitle").value;
  var _0x4db75d = document.getElementById("expiryValue").value;
  if (_0x5b1ef7.trim().length < 0x6) {
    document.getElementById('titleReq').classList.remove("is-hidden");
    document.getElementById("saveTitle").classList.add("is-danger");
    return false;
  } else {
    document.getElementById("titleReq").classList.add('is-hidden');
    document.getElementById("saveTitle").classList.remove("is-danger");
  }
  var _0xb92f32 = document.getElementById('saveDesc').value;
  var _0x53d920 = document.getElementById("saveTags").value;
  if (isSpamCheckTitle(_0x5b1ef7) || isSpamCheckTitle(_0xb92f32)) {
    closeAllModal();
    openErrorModalLink("Spam Alert! We do not support sharing data that contains slang, spam links, cheat codes, or software keys. <a href='/policy/content-policy' target='_blank'>View our Content Policy for more details</a>.");
    return;
  }
  if (isSpamCheckData(data)) {
    closeAllModal();
    openErrorModalLink("Spam Alert! We do not support sharing data that contains slang, spam links, cheat codes, or software keys. <a href='/policy/content-policy' target='_blank'>View our Content Policy for more details</a>.");
    return;
  }
  var _0x2bee26 = gViewName;
  if (_0x2bee26 == "xmlvalidate") {
    _0x2bee26 = "xmlvalidator";
  }
  if (gViewName == "alleditor") {
    data = data + '|' + document.getElementById("editorLanguage").value;
  }
  var _0x4a0061 = "content=" + encodeURIComponent(data) + "&viewname=" + _0x2bee26 + "&title=" + encodeURIComponent(_0x5b1ef7) + "&desc=" + encodeURIComponent(_0xb92f32) + "&tags=" + encodeURIComponent(_0x53d920) + "&expiryvalue=" + encodeURIComponent(_0x4db75d);
  AJAXCB({
    'data': _0x4a0061,
    'serverURL': "/service/save",
    'success': function (_0x1fd5c3) {
      if (_0x1fd5c3.responseText === "spam") {
        openErrorModalLink("Spam Alert! We do not support sharing data that contains slang, spam links, cheat codes, or software keys. <a href='/policy/content-policy' target='_blank'>View our Content Policy for more details</a>.");
        return;
      }
      var _0x3e49f1 = 'https://' + location.host + '/' + _0x2bee26 + '/' + _0x1fd5c3.responseText;
      _0x3e49f1 = _0x3e49f1.replace(" ", '');
      document.getElementById("permalink").style.display = '';
      document.getElementById('subtitle').textContent = _0x5b1ef7;
      document.getElementById("urlLink").setAttribute("href", _0x3e49f1);
      document.getElementById("urlLink").textContent = _0x3e49f1;
    },
    'error': function (_0x160d4e) {
      openErrorModal("Error in data saving");
    }
  });
  return false;
}
function AJAXCB(_0x165118) {
  xhr = new XMLHttpRequest();
  xhr.open('POST', _0x165118.serverURL);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  var _0x3c84c9 = document.getElementById("ajaxProgressBar");
  _0x3c84c9.style.display = "block";
  xhr.onload = function () {
    if (xhr.status === 0xc8) {
      _0x3c84c9.style.display = "none";
      _0x165118.success(xhr);
    } else if (xhr.status !== 0xc8) {
      _0x3c84c9.style.display = "none";
      openErrorModal("Failed to Call Service, Please Try Again : " + xhr.responseText);
      if (_0x165118.error !== undefined) {
        _0x165118.error(xhr);
      }
    }
  };
  xhr.onerror = function () {
    _0x3c84c9.style.display = "none";
    openErrorModal("Failed to Call Service, Please Try Again : " + xhr.responseText);
    if (_0x165118.error !== undefined) {
      _0x165118.error();
    }
  };
  xhr.send(_0x165118.data);
  closeAllModal();
}
function openURLModal() {
  if (document.getElementById('urlModal') === null) {
    AJAXCB({
      'serverURL': "/common-modals",
      'success': function (_0x11a6c1) {
        document.body.insertAdjacentHTML("beforeend", _0x11a6c1.responseText);
        openURLModalAfterLoad();
      }
    });
  } else {
    openURLModalAfterLoad();
  }
}
function openURLModalAfterLoad() {
  document.getElementById("urlModal").classList.toggle('is-active');
  document.getElementById('urlText').value = '';
  document.getElementById("urlText").focus();
}
function loadURLFromUI() {
  var _0xbc7cf = document.getElementById("urlText").value;
  var _0x4011f6 = "path=" + encodeURIComponent(_0xbc7cf);
  AJAXCB({
    'data': _0x4011f6,
    'serverURL': "//www.codebeautify.com/URLService",
    'success': function (_0x3cb2e4) {
      if (_0x3cb2e4.responseText.length === 0x0 || _0x3cb2e4.responseText === "404: Not Found") {
        openErrorModal("Invalid URL or URL not loading URL: " + _0xbc7cf);
      } else {
        setToEditor(_0x3cb2e4.responseText);
        closeAllModal();
      }
    }
  });
}
function closeURLModal() {
  document.getElementById("urlModal").classList.remove('is-active');
}
function createFile(_0x426590, _0x5072f1) {
  var _0x519fc5 = '';
  if (_0x5072f1 == undefined) {
    if (typeof editorResult != "undefined") {
      _0x519fc5 = editorResult.getValue();
    }
    if (_0x519fc5.trim().length == 0x0 && typeof outputACEEditor != 'undefined' && outputACEEditor != null) {
      _0x519fc5 = outputACEEditor.getValue();
    }
    if (_0x519fc5.trim().length == 0x0 && typeof inputACEEditor != "undefined") {
      _0x519fc5 = inputACEEditor.getValue();
    }
    if (_0x519fc5.trim().length == 0x0 && typeof editorAce != 'undefined') {
      _0x519fc5 = editorAce.getValue();
    }
    if (_0x519fc5.trim().length == 0x0 && typeof outputTextArea != "undefined") {
      _0x519fc5 = outputTextArea.value;
    }
    if (_0x519fc5.trim().length == 0x0 && typeof outputJSONEditor != "undefined") {
      _0x519fc5 = outputJSONEditor.getText();
    }
  } else {
    _0x519fc5 = $('#' + _0x5072f1).text();
    if (_0x426590 == 'html') {
      _0x519fc5 = vkbeautify.xml(_0x519fc5);
    }
  }
  if (_0x426590 == "converted") {
    _0x426590 = converted;
  }
  if (_0x519fc5.trim().length != 0x0) {
    var _0x479ed5 = new Blob(['' + _0x519fc5 + ''], {
      'type': "text/plain;charset=utf-8"
    });
    fileDownloadCB(_0x479ed5, gViewName + '.' + _0x426590);
  } else {
    openErrorModal("Sorry Result is Empty");
  }
}
function fileDownloadCB(_0x4caa5a, _0x486b49) {
  if (typeof saveAs !== 'function') {
    loadFiles(["https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"]).then(function () {
      saveAs(_0x4caa5a, _0x486b49);
    });
  } else {
    saveAs(_0x4caa5a, _0x486b49);
  }
}
function copyToClipboard(_0x548cef, _0x1885eb = true) {
  const _0x4f111f = document.createElement("textarea");
  _0x4f111f.value = _0x548cef;
  document.body.appendChild(_0x4f111f);
  _0x4f111f.select();
  document.execCommand("copy");
  document.body.removeChild(_0x4f111f);
  if (_0x1885eb) {
    displayCenterMessage("Copied to Clipboard", "success");
  }
}
function displayCenterMessage(_0x7699e9, _0x341c06) {
  document.getElementById("topMessage").textContent = _0x7699e9;
  if (_0x341c06 === "success") {
    document.getElementById("topMessage").classList.add("is-info");
    document.getElementById("topMessage").classList.remove("is-danger");
  } else {
    document.getElementById("topMessage").classList.add('is-danger');
    document.getElementById("topMessage").classList.remove('is-info');
  }
  document.getElementById("topMessage").parentNode.style.display = '';
  setTimeout(function () {
    document.getElementById("topMessage").parentNode.style.display = "none";
  }, 0x7d0);
}
function handleFiles(_0x297156) {
  _0x297156 = [..._0x297156];
  _0x297156.forEach(previewFile);
}
function previewFile(_0x54324e) {
  let _0x5d75e7 = new FileReader();
  _0x5d75e7.readAsText(_0x54324e);
  _0x5d75e7.onloadend = function () {
    setToEditor(_0x5d75e7.result);
  };
}
function sampleURL() {
  document.getElementById("urlText").value = document.getElementById('sampleurl').value;
}
function savetoLocalStorage(_0x118910) {
  if (_0x118910 === undefined || _0x118910.trim().length === 0x0) {
    return;
  }
  if (localStorage) {
    if (!gViewName.toLowerCase().startsWith("excel")) {
      localStorage.setItem(gViewName, _0x118910);
    }
  }
}
function defaultAction() {
  document.getElementById("defaultAction").click();
  return;
}
function beforeLogin() {
  var _0xb74a41 = getValueFromInputEditor();
  savetoLocalStorage(_0xb74a41);
  localStorage.setItem('lastActionElementName', 'defaultAction');
}
function saveChanges() {
  savetoLocalStorage(getValueFromInputEditor());
}
function setToEditor(_0x177c22) {
  if (_0x177c22 == null || _0x177c22.length == 0x0 || _0x177c22 == "undefined") {
    _0x177c22 = '';
  }
  setValueToInputEditor(_0x177c22);
}
var isLazyAceModeSet = false;
function setupEditorlang(_0x5949dc, _0x3a0698) {
  if (isLazyAceModeSet) {
    return;
  }
  if (_0x5949dc != null && _0x5949dc != undefined) {
    inputACEEditor.getSession().setMode("ace/mode/" + _0x5949dc);
    inputACEEditor.getSession().setUseWorker(true);
  }
  if (_0x3a0698 != null && _0x3a0698 != undefined) {
    outputACEEditor.getSession().setMode('ace/mode/' + _0x3a0698);
  }
  isLazyAceModeSet = true;
}
function setValueToInputEditor(_0x3a130f) {
  if (typeof inputACEEditor !== "undefined" && inputACEEditor !== null) {
    inputACEEditor.setValue(_0x3a130f, 0x1);
  } else {
    if (typeof inputTextArea !== "undefined") {
      inputTextArea.value = _0x3a130f;
      defaultAction();
      if (typeof updateFooterState !== 'undefined') {
        updateFooterState();
      }
    } else if (inputJSONEditor != null && typeof inputJSONEditor !== 'undefined') {
      inputJSONEditor.setText(_0x3a130f);
      defaultAction();
    }
  }
}
function getValueFromInputEditor() {
  if (typeof inputACEEditor !== "undefined" && inputACEEditor.getValue() != undefined && inputACEEditor.getValue().length != 0x0) {
    return inputACEEditor.getValue();
  } else {
    if (typeof inputTextArea !== "undefined" && inputTextArea.value.length != 0x0) {
      return inputTextArea.value;
    }
  }
  if (typeof inputJSONEditor !== "undefined" && inputJSONEditor.getText() != undefined && inputJSONEditor.getText().length != 0x0) {
    return inputJSONEditor.getText();
  }
  return null;
}
function addFullScreen(_0x4ab687) {
  if (_0x4ab687 == "input") {
    document.getElementById('inputDiv').className = "fsoverlay";
    document.getElementById("inputACEEditor").classList.add("fsoverlayeditor");
    document.getElementById('inputACEStatusBar').classList.add('fixedFooter');
    document.getElementById("inputFullScreen").style.display = "none";
    document.getElementById("inputCloseScreen").style.display = '';
    fullscreenEditor = 'input';
    inputACEEditor.resize();
  } else if (_0x4ab687 == 'output') {
    document.getElementById('outputDiv').className = "fsoverlay";
    document.getElementById("outputACEEditor").classList.add("fsoverlayeditor");
    document.getElementById("outputACEStatusBar").classList.add("fixedFooter");
    document.getElementById("outputFullScreen").style.display = "none";
    document.getElementById('outputCloseScreen').style.display = '';
    fullscreenEditor = "input";
    outputACEEditor.resize();
    fullscreenEditor = 'output';
  }
  isFullScreen = true;
  document.body.style.overflow = 'hidden';
  document.body.style.position = "fixed";
}
function closeFullScreen(_0x358d44) {
  if (_0x358d44 == "input") {
    document.getElementById("inputDiv").className = "aceEditorBorder";
    document.getElementById("inputACEEditor").classList.remove("fsoverlayeditor");
    document.getElementById("inputACEStatusBar").classList.remove("fixedFooter");
    document.getElementById("inputFullScreen").style.display = '';
    document.getElementById('inputCloseScreen').style.display = "none";
    inputACEEditor.resize();
  } else if (_0x358d44 == 'output') {
    document.getElementById("outputDiv").className = 'aceEditorBorder';
    document.getElementById("outputACEEditor").classList.remove("fsoverlayeditor");
    document.getElementById('outputACEStatusBar').classList.remove("fixedFooter");
    document.getElementById("outputFullScreen").style.display = '';
    document.getElementById("outputCloseScreen").style.display = "none";
    outputACEEditor.resize();
  }
  document.body.style.overflow = '';
  document.body.style.position = '';
  isFullScreen = false;
}
var inputACEEditor = null;
var inputFontSize = 0x10;
function setupInputEditor(_0x23efbe) {
  inputACEEditor = ace.edit("inputACEEditor");
  inputACEEditor.getSession().setMode("ace/mode/" + _0x23efbe);
  inputACEEditor.getSession().setUseWrapMode(true);
  inputACEEditor.setFontSize(inputFontSize + 'px');
  inputACEEditor.setOptions({
    'showPrintMargin': false,
    'placeholder': "Paste or type your data here...."
  });
  if (document.getElementsByClassName('ace_placeholder') != null && document.getElementsByClassName("ace_placeholder").length != 0x0) {
    document.getElementsByClassName('ace_placeholder')[0x0].style.opacity = 0.3;
  }
  inputACEEditor.getSession().setUseWorker(false);
  inputACEEditor.on('change', function () {
    if (document.getElementById("isAuto") != null && document.getElementById("isAuto").checked) {
      document.getElementById('defaultAction').click();
      inputACEEditor.getSession().setUseWorker(true);
    }
    if (inputACEEditor.getValue().length != 0x0) {
      savetoLocalStorage(inputACEEditor.getValue());
    }
  });
  inputACEEditor.on('changeStatus', updateInputAceEditorStatusBar);
  inputACEEditor.on("changeSelection", updateInputAceEditorStatusBar);
  inputACEEditor.on("keyboardActivity", updateInputAceEditorStatusBar);
  if (isThemeMode == "dark") {
    inputACEEditor.setTheme("ace/theme/github_dark");
  }
  postSetupInputEditor();
}
function postSetupInputEditor() {
  document.getElementById("inputFontSizeI").addEventListener("click", function () {
    if (inputFontSize <= 0x28) {
      inputFontSize = inputFontSize + 0x4;
    } else {
      inputFontSize = 0xc;
    }
    inputACEEditor.setFontSize(inputFontSize + 'px');
  });
  document.getElementById('inputFontSizeD').addEventListener('click', function () {
    if (inputFontSize > 0xa) {
      inputFontSize = inputFontSize - 0x4;
    } else {
      jeFontSize = 0x28;
    }
    inputACEEditor.setFontSize(inputFontSize + 'px');
  });
  document.getElementById('inputcopy').addEventListener("click", function () {
    copyToClipboard(inputACEEditor.getValue());
    document.getElementById("inputcopy").innerHTML = "<svg class=\"svgicon\"><use href=\"#check\"></use></svg>";
    setTimeout(function () {
      document.getElementById("inputcopy").innerHTML = "<svg class=\"svgicon\"><use href=\"#copy\"></use></svg>";
    }, 0x1f4);
  });
  document.getElementById("fileopen").addEventListener("click", function () {
    document.getElementById("fileInput").click();
  });
  inputACEEditor.setValue('');
  inputACEEditor.focus();
  return;
}
function updateInputAceEditorStatusBar() {
  var _0x5a46d8 = StringSize.format(StringSize.count(inputACEEditor.getValue()));
  document.getElementById("inputTextSize").innerHTML = "size: " + _0x5a46d8;
  document.getElementById('inputAceLineColumn').textContent = " Ln: " + (inputACEEditor.getCursorPosition().row + 0x1) + " Col: " + inputACEEditor.getCursorPosition().column;
}
function cleanInputEditor() {
  inputACEEditor.setValue('');
  inputACEEditor.focus();
}
function updateDarkMode() {
  if (inputACEEditor == null) {
    return;
  }
  if (isThemeMode == "dark") {
    inputACEEditor.setTheme("ace/theme/github_dark");
    if (outputACEEditor) {
      outputACEEditor.setTheme("ace/theme/github_dark");
    }
  } else {
    inputACEEditor.setTheme('');
    if (typeof outputACEEditor !== "undefined") {
      outputACEEditor.setTheme('');
    }
  }
}
var outputACEEditor = null;
var outputFontSize = 0x10;
function setupOutputEditor(_0x3263ed) {
  outputACEEditor = ace.edit("outputACEEditor");
  outputACEEditor.getSession().setMode("ace/mode/" + _0x3263ed);
  outputACEEditor.getSession().setUseWrapMode(true);
  outputACEEditor.setFontSize(outputFontSize + 'px');
  outputACEEditor.setOption("showPrintMargin", false);
  outputACEEditor.getSession().setUseWorker(false);
  outputACEEditor.on("changeStatus", updateOutputAceEditorStatusBar);
  outputACEEditor.on("changeSelection", updateOutputAceEditorStatusBar);
  outputACEEditor.on('keyboardActivity', updateOutputAceEditorStatusBar);
  if (isThemeMode == 'dark') {
    outputACEEditor.setTheme("ace/theme/github_dark");
  }
  postSetupOutputEditor();
}
function postSetupOutputEditor() {
  document.getElementById("outputFontSizeI").addEventListener('click', function () {
    if (outputFontSize <= 0x28) {
      outputFontSize = outputFontSize + 0x4;
    } else {
      outputFontSize = 0xc;
    }
    outputACEEditor.setFontSize(outputFontSize + 'px');
  });
  document.getElementById("outputFontSizeD").addEventListener("click", function () {
    if (outputFontSize > 0xa) {
      outputFontSize = outputFontSize - 0x4;
    }
    outputACEEditor.setFontSize(outputFontSize + 'px');
  });
  document.getElementById("outputcopy").addEventListener("click", function () {
    copyToClipboard(outputACEEditor.getValue());
    document.getElementById('outputcopy').innerHTML = "<svg class=\"svgicon\"><use href=\"#check\"></use></svg>";
    setTimeout(function () {
      document.getElementById("outputcopy").innerHTML = "<svg class=\"svgicon\"><use href=\"#copy\"></use></svg>";
    }, 0x1f4);
  });
  outputACEEditor.setValue('');
  return;
}
function updateOutputAceEditorStatusBar() {
  var _0x409357 = StringSize.format(StringSize.count(outputACEEditor.getValue()));
  document.getElementById('outputTextSize').innerHTML = "size: " + _0x409357;
  document.getElementById("outputAceLineColumn").textContent = " Ln: " + (outputACEEditor.getCursorPosition().row + 0x1) + " Col: " + outputACEEditor.getCursorPosition().column;
}
function cleanOutputEditor() {
  outputACEEditor.setValue('');
}
document.addEventListener("DOMContentLoaded", setupEditorAndLoadData);
function setupEditorAndLoadData() {
  setupInputEditor("text");
  if (gViewName !== 'cssvalidate') {
    setupOutputEditor('text');
  }
}
function beautifyCSS(_0x4cee3d) {
  setupEditorlang("css", "css");
  var _0x4989ed = inputACEEditor.getValue();
  if (_0x4989ed === null || _0x4989ed.trim().length === 0x0) {
    return;
  }
  loadFiles(["https://unpkg.com/prettier@2.8.7/standalone.js", 'https://unpkg.com/prettier@2.8.7/parser-postcss.js']).then(function () {
    var _0x2bdfcf = '';
    var _0x44ee12 = 0x2;
    try {
      if (document.getElementById("indent") !== null) {
        _0x44ee12 = parseInt(document.getElementById("indent").value);
      }
      var _0x2bdfcf = prettier.format(_0x4989ed, {
        'parser': "css",
        'plugins': prettierPlugins,
        'tabWidth': _0x44ee12
      });
      if (_0x4cee3d) {
        inputACEEditor.setValue(_0x2bdfcf, 0x1);
      } else {
        outputACEEditor.setValue(_0x2bdfcf, 0x1);
      }
    } catch (_0x28cf3a) {
      console.log(_0x28cf3a.message);
      outputACEEditor.setValue(_0x28cf3a.message);
      return;
    }
    outputACEEditor.setValue(_0x2bdfcf, 0x1);
  });
}
function MinifyCSS(_0x35e302) {
  var _0x4810f8 = inputACEEditor.getValue();
  if (_0x4810f8.trim().length > 0x0) {
    parameters = 'data=' + _0x4810f8;
    AJAXCB({
      'data': parameters,
      'serverURL': "/ProcessData/cssmin",
      'success': function (_0x6cb6fe) {
        try {
          if (_0x6cb6fe.responseText.length === 0x0 || _0x6cb6fe.responseText === "404: Not Found") {
            openErrorModal("Invalid URL or URL not loading URL: " + url);
          } else if (_0x35e302) {
            inputACEEditor.setValue(_0x6cb6fe.responseText, 0x1);
          } else {
            outputACEEditor.setValue(_0x6cb6fe.responseText, 0x1);
          }
        } catch (_0xd1f571) {
          openErrorModal("Failed Minify Data :" + _0xd1f571.message);
        }
      },
      'error': function (_0x1c28f8) {
        openErrorModal("Error in Minify :->" + _0x1c28f8.message);
      }
    });
  }
}
function getCSSSampleData() {
  setToEditor("body {\n  background-color: lightblue;\n}\np {\n  margin-bottom: 100px;\n  margin-left: 80px;\n  margin-right: 150px;\n  margin-top: 100px;\n}");
}