var hidden, state, visibilityChange,
  _this = this;

if (document.hidden != null) {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
    state = "visibilityState";
} else if (document.mozHidden != null) {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
    state = "mozVisibilityState";
} else if (document.msHidden != null) {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
    state = "msVisibilityState";
} else if (document.webkitHidden != null) {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
    state = "webkitVisibilityState";
}

this.d = new Date();
this.new_d = new Date();

// Calculates Time Spent on page upon switching windows

setInterval((function () {
    if (document.hasFocus() === false) {
        _this.new_d = new Date();
        var time_spent = Math.round((_this.new_d - _this.d) / 1000);
        doSomething("Switched Window", time_spent);
        _this.d = new Date();
    }
}), 200);

// Calculates Time Spent on page upon leaving/closing page

window.onunload = function () {
    _this.new_d = new Date();
    var time_spent = Math.round((_this.new_d - _this.d) / 1000);
    doSomething("Left Page", time_spent);
};

// Calculates Time Spent on page upon unfocusing tab
// http://davidwalsh.name/page-visibility

document.addEventListener(visibilityChange, (function (e) {
    if (document[state] === 'visible') {
        _this.d = new Date();
    } else if (document[hidden]) {
        _this.new_d = new Date();
        var time_spent = Math.round((_this.new_d - _this.d) / 1000);
        doSomething("Changed Tab", time_spent);
    }
}), false);

// Function that does something

var doSomething = function (message, time_spent) {
    if (time_spent >= 1) {
        var text = "[" + message + "] " + time_spent + " seconds"
        var item = document.createElement("li");
        item.innerHTML = text;
        document.body.appendChild(item);
        console.log(text);
    }
}