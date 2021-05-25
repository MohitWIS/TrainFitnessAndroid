/*!
 * MediaElement.js
 * HTML5 <video> and <audio> shim and player
 * http://mediaelementjs.com/
 *
 * Creates a JavaScript object that mimics HTML5 MediaElement API
 * for browsers that don't understand HTML5 or can't play the provided codec
 * Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
 *
 * Copyright 2010-2013, John Dyer (http://j.hn)
 * License: MIT
 *
 */
var mejs = mejs || {};
mejs.version = "2.13.1";
mejs.meIndex = 0;
mejs.plugins = {
silverlight: [{
              version: [3, 0],
              types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"]
              }],
flash: [{
        version: [9, 0, 124],
        types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube"]
        }],
youtube: [{
          version: null,
          types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"]
          }],
vimeo: [{
        version: null,
        types: ["video/vimeo", "video/x-vimeo"]
        }]
};
mejs.Utility = {
encodeUrl: function(url) {
    return encodeURIComponent(url);
},
escapeHTML: function(s) {
    return s.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;");
},
absolutizeUrl: function(url) {
    var el = document.createElement("div");
    el.innerHTML = '<a href="' + this.escapeHTML(url) + '">x</a>';
    return el.firstChild.href;
},
getScriptPath: function(scriptNames) {
    var i = 0,
    j, codePath = "",
    testname = "",
    slashPos, filenamePos, scriptUrl, scriptPath, scriptFilename, scripts = document.getElementsByTagName("script"),
    il = scripts.length,
    jl = scriptNames.length;
    for (; i < il; i++) {
        scriptUrl = scripts[i].src;
        slashPos = scriptUrl.lastIndexOf("/");
        if (slashPos > -1) {
            scriptFilename = scriptUrl.substring(slashPos + 1);
            scriptPath = scriptUrl.substring(0, slashPos + 1);
        } else {
            scriptFilename = scriptUrl;
            scriptPath = "";
        }
        for (j = 0; j < jl; j++) {
            testname = scriptNames[j];
            filenamePos = scriptFilename.indexOf(testname);
            if (filenamePos > -1) {
                codePath = scriptPath;
                break;
            }
        }
        if (codePath !== "") {
            break;
        }
    }
    return codePath;
},
secondsToTimeCode: function(time, forceHours, showFrameCount, fps) {
    if (typeof showFrameCount == "undefined") {
        showFrameCount = false;
    } else {
        if (typeof fps == "undefined") {
            fps = 25;
        }
    }
    var hours = Math.floor(time / 3600) % 24,
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time % 60),
    frames = Math.floor(((time % 1) * fps).toFixed(3)),
    result = ((forceHours || hours > 0) ? (hours < 10 ? "0" + hours : hours) + ":" : "") + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) + ((showFrameCount) ? ":" + (frames < 10 ? "0" + frames : frames) : "");
    return result;
},
timeCodeToSeconds: function(hh_mm_ss_ff, forceHours, showFrameCount, fps) {
    if (typeof showFrameCount == "undefined") {
        showFrameCount = false;
    } else {
        if (typeof fps == "undefined") {
            fps = 25;
        }
    }
    var tc_array = hh_mm_ss_ff.split(":"),
    tc_hh = parseInt(tc_array[0], 10),
    tc_mm = parseInt(tc_array[1], 10),
    tc_ss = parseInt(tc_array[2], 10),
    tc_ff = 0,
    tc_in_seconds = 0;
    if (showFrameCount) {
        tc_ff = parseInt(tc_array[3]) / fps;
    }
    tc_in_seconds = (tc_hh * 3600) + (tc_mm * 60) + tc_ss + tc_ff;
    return tc_in_seconds;
},
convertSMPTEtoSeconds: function(SMPTE) {
    if (typeof SMPTE != "string") {
        return false;
    }
    SMPTE = SMPTE.replace(",", ".");
    var secs = 0,
    decimalLen = (SMPTE.indexOf(".") != -1) ? SMPTE.split(".")[1].length : 0,
    multiplier = 1;
    SMPTE = SMPTE.split(":").reverse();
    for (var i = 0; i < SMPTE.length; i++) {
        multiplier = 1;
        if (i > 0) {
            multiplier = Math.pow(60, i);
        }
        secs += Number(SMPTE[i]) * multiplier;
    }
    return Number(secs.toFixed(decimalLen));
},
removeSwf: function(id) {
    var obj = document.getElementById(id);
    if (obj && /object|embed/i.test(obj.nodeName)) {
        if (mejs.MediaFeatures.isIE) {
            obj.style.display = "none";
            (function() {
             if (obj.readyState == 4) {
             mejs.Utility.removeObjectInIE(id);
             } else {
             setTimeout(arguments.callee, 10);
             }
             })();
        } else {
            obj.parentNode.removeChild(obj);
        }
    }
},
removeObjectInIE: function(id) {
    var obj = document.getElementById(id);
    if (obj) {
        for (var i in obj) {
            if (typeof obj[i] == "function") {
                obj[i] = null;
            }
        }
        obj.parentNode.removeChild(obj);
    }
}
};
mejs.PluginDetector = {
hasPluginVersion: function(plugin, v) {
    var pv = this.plugins[plugin];
    v[1] = v[1] || 0;
    v[2] = v[2] || 0;
    return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
},
nav: window.navigator,
ua: window.navigator.userAgent.toLowerCase(),
plugins: [],
addPlugin: function(p, pluginName, mimeType, activeX, axDetect) {
    this.plugins[p] = this.detectPlugin(pluginName, mimeType, activeX, axDetect);
},
detectPlugin: function(pluginName, mimeType, activeX, axDetect) {
    var version = [0, 0, 0],
    description, i, ax;
    if (typeof(this.nav.plugins) != "undefined" && typeof this.nav.plugins[pluginName] == "object") {
        description = this.nav.plugins[pluginName].description;
        if (description && !(typeof this.nav.mimeTypes != "undefined" && this.nav.mimeTypes[mimeType] && !this.nav.mimeTypes[mimeType].enabledPlugin)) {
            version = description.replace(pluginName, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split(".");
            for (i = 0; i < version.length; i++) {
                version[i] = parseInt(version[i].match(/\d+/), 10);
            }
        }
    } else {
        if (typeof(window.ActiveXObject) != "undefined") {
            try {
                ax = new ActiveXObject(activeX);
                if (ax) {
                    version = axDetect(ax);
                }
            } catch (e) {}
        }
    }
    return version;
}
};
mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function(ax) {
                              var version = [],
                              d = ax.GetVariable("$version");
                              if (d) {
                              d = d.split(" ")[1].split(",");
                              version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
                              }
                              return version;
                              });
mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function(ax) {
                              var v = [0, 0, 0, 0],
                              loopMatch = function(ax, v, i, n) {
                              while (ax.isVersionSupported(v[0] + "." + v[1] + "." + v[2] + "." + v[3])) {
                              v[i] += n;
                              }
                              v[i] -= n;
                              };
                              loopMatch(ax, v, 0, 1);
                              loopMatch(ax, v, 1, 1);
                              loopMatch(ax, v, 2, 10000);
                              loopMatch(ax, v, 2, 1000);
                              loopMatch(ax, v, 2, 100);
                              loopMatch(ax, v, 2, 10);
                              loopMatch(ax, v, 2, 1);
                              loopMatch(ax, v, 3, 1);
                              return v;
                              });
mejs.MediaFeatures = {
init: function() {
    var t = this,
    d = document,
    nav = mejs.PluginDetector.nav,
    ua = mejs.PluginDetector.ua.toLowerCase(),
    i, v, html5Elements = ["source", "track", "audio", "video"];
    t.isiPad = (ua.match(/ipad/i) !== null);
    t.isiPhone = (ua.match(/iphone/i) !== null);
    t.isiOS = t.isiPhone || t.isiPad;
    t.isAndroid = (ua.match(/android/i) !== null);
    t.isBustedAndroid = (ua.match(/android 2\.[12]/) !== null);
    t.isBustedNativeHTTPS = (location.protocol === "https:" && (ua.match(/android [12]\./) !== null || ua.match(/macintosh.* version.* safari/) !== null));
    t.isIE = (nav.appName.toLowerCase().match(/trident/gi) !== null);
    t.isChrome = (ua.match(/chrome/gi) !== null);
    t.isFirefox = (ua.match(/firefox/gi) !== null);
    t.isWebkit = (ua.match(/webkit/gi) !== null);
    t.isGecko = (ua.match(/gecko/gi) !== null) && !t.isWebkit && !t.isIE;
    t.isOpera = (ua.match(/opera/gi) !== null);
    t.hasTouch = ("ontouchstart" in window && window.ontouchstart != null);
    t.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;
    for (i = 0; i < html5Elements.length; i++) {
        v = document.createElement(html5Elements[i]);
    }
    t.supportsMediaTag = (typeof v.canPlayType !== "undefined" || t.isBustedAndroid);
    try {
        v.canPlayType("video/mp4");
    } catch (e) {
        t.supportsMediaTag = false;
    }
    t.hasSemiNativeFullScreen = (typeof v.webkitEnterFullscreen !== "undefined");
    t.hasNativeFullscreen = (typeof v.requestFullscreen !== "undefined");
    t.hasWebkitNativeFullScreen = (typeof v.webkitRequestFullScreen !== "undefined");
    t.hasMozNativeFullScreen = (typeof v.mozRequestFullScreen !== "undefined");
    t.hasMsNativeFullScreen = (typeof v.msRequestFullscreen !== "undefined");
    t.hasTrueNativeFullScreen = (t.hasWebkitNativeFullScreen || t.hasMozNativeFullScreen || t.hasMsNativeFullScreen);
    t.nativeFullScreenEnabled = t.hasTrueNativeFullScreen;
    if (t.hasMozNativeFullScreen) {
        t.nativeFullScreenEnabled = document.mozFullScreenEnabled;
    } else {
        if (t.hasMsNativeFullScreen) {
            t.nativeFullScreenEnabled = document.msFullscreenEnabled;
        }
    }
    if (t.isChrome) {
        t.hasSemiNativeFullScreen = false;
    }
    if (t.hasTrueNativeFullScreen) {
        t.fullScreenEventName = "";
        if (t.hasWebkitNativeFullScreen) {
            t.fullScreenEventName = "webkitfullscreenchange";
        } else {
            if (t.hasMozNativeFullScreen) {
                t.fullScreenEventName = "mozfullscreenchange";
            } else {
                if (t.hasMsNativeFullScreen) {
                    t.fullScreenEventName = "MSFullscreenChange";
                }
            }
        }
        t.isFullScreen = function() {
            if (v.mozRequestFullScreen) {
                return d.mozFullScreen;
            } else {
                if (v.webkitRequestFullScreen) {
                    return d.webkitIsFullScreen;
                } else {
                    if (v.hasMsNativeFullScreen) {
                        return d.msFullscreenElement !== null;
                    }
                }
            }
        };
        t.requestFullScreen = function(el) {
            if (t.hasWebkitNativeFullScreen) {
                el.webkitRequestFullScreen();
            } else {
                if (t.hasMozNativeFullScreen) {
                    el.mozRequestFullScreen();
                } else {
                    if (t.hasMsNativeFullScreen) {
                        el.msRequestFullscreen();
                    }
                }
            }
        };
        t.cancelFullScreen = function() {
            if (t.hasWebkitNativeFullScreen) {
                document.webkitCancelFullScreen();
            } else {
                if (t.hasMozNativeFullScreen) {
                    document.mozCancelFullScreen();
                } else {
                    if (t.hasMsNativeFullScreen) {
                        document.msExitFullscreen();
                    }
                }
            }
        };
    }
    if (t.hasSemiNativeFullScreen && ua.match(/mac os x 10_5/i)) {
        t.hasNativeFullScreen = false;
        t.hasSemiNativeFullScreen = false;
    }
}
};
mejs.MediaFeatures.init();
mejs.HtmlMediaElement = {
pluginType: "native",
isFullScreen: false,
setCurrentTime: function(time) {
    try {
        this.currentTime = time;
    } catch (e) {}
},
setMuted: function(muted) {
    this.muted = muted;
},
setVolume: function(volume) {
    this.volume = volume;
},
stop: function() {
    this.pause();
},
setSrc: function(url) {
    var existingSources = this.getElementsByTagName("source");
    while (existingSources.length > 0) {
        this.removeChild(existingSources[0]);
    }
    if (typeof url == "string") {
        this.src = url;
    } else {
        var i, media;
        for (i = 0; i < url.length; i++) {
            media = url[i];
            if (this.canPlayType(media.type)) {
                this.src = media.src;
                break;
            }
        }
    }
},
setVideoSize: function(width, height) {
    this.width = width;
    this.height = height;
}
};
mejs.PluginMediaElement = function(pluginid, pluginType, mediaUrl) {
    this.id = pluginid;
    this.pluginType = pluginType;
    this.src = mediaUrl;
    this.events = {};
    this.attributes = {};
};
mejs.PluginMediaElement.prototype = {
pluginElement: null,
pluginType: "",
isFullScreen: false,
playbackRate: -1,
defaultPlaybackRate: -1,
seekable: [],
played: [],
paused: true,
ended: false,
seeking: false,
duration: 0,
error: null,
tagName: "",
muted: false,
volume: 1,
currentTime: 0,
play: function() {
    if (this.pluginApi != null) {
        if (this.pluginType == "youtube") {
            this.pluginApi.playVideo();
        } else {
            this.pluginApi.playMedia();
        }
        this.paused = false;
    }
},
load: function() {
    if (this.pluginApi != null) {
        if (this.pluginType == "youtube") {} else {
            this.pluginApi.loadMedia();
        }
        this.paused = false;
    }
},
pause: function() {
    if (this.pluginApi != null) {
        if (this.pluginType == "youtube") {
            this.pluginApi.pauseVideo();
        } else {
            this.pluginApi.pauseMedia();
        }
        this.paused = true;
    }
},
stop: function() {
    if (this.pluginApi != null) {
        if (this.pluginType == "youtube") {
            this.pluginApi.stopVideo();
        } else {
            this.pluginApi.stopMedia();
        }
        this.paused = true;
    }
},
canPlayType: function(type) {
    var i, j, pluginInfo, pluginVersions = mejs.plugins[this.pluginType];
    for (i = 0; i < pluginVersions.length; i++) {
        pluginInfo = pluginVersions[i];
        if (mejs.PluginDetector.hasPluginVersion(this.pluginType, pluginInfo.version)) {
            for (j = 0; j < pluginInfo.types.length; j++) {
                if (type == pluginInfo.types[j]) {
                    return "probably";
                }
            }
        }
    }
    return "";
},
positionFullscreenButton: function(x, y, visibleAndAbove) {
    if (this.pluginApi != null && this.pluginApi.positionFullscreenButton) {
        this.pluginApi.positionFullscreenButton(Math.floor(x), Math.floor(y), visibleAndAbove);
    }
},
hideFullscreenButton: function() {
    if (this.pluginApi != null && this.pluginApi.hideFullscreenButton) {
        this.pluginApi.hideFullscreenButton();
    }
},
setSrc: function(url) {
    if (typeof url == "string") {
        this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(url));
        this.src = mejs.Utility.absolutizeUrl(url);
    } else {
        var i, media;
        for (i = 0; i < url.length; i++) {
            media = url[i];
            if (this.canPlayType(media.type)) {
                this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(media.src));
                this.src = mejs.Utility.absolutizeUrl(url);
                break;
            }
        }
    }
},
setCurrentTime: function(time) {
    if (this.pluginApi != null) {
        if (this.pluginType == "youtube") {
            this.pluginApi.seekTo(time);
        } else {
            this.pluginApi.setCurrentTime(time);
        }
        this.currentTime = time;
    }
},
setVolume: function(volume) {
    if (this.pluginApi != null) {
        if (this.pluginType == "youtube") {
            this.pluginApi.setVolume(volume * 100);
        } else {
            this.pluginApi.setVolume(volume);
        }
        this.volume = volume;
    }
},
setMuted: function(muted) {
    if (this.pluginApi != null) {
        if (this.pluginType == "youtube") {
            if (muted) {
                this.pluginApi.mute();
            } else {
                this.pluginApi.unMute();
            }
            this.muted = muted;
            this.dispatchEvent("volumechange");
        } else {
            this.pluginApi.setMuted(muted);
        }
        this.muted = muted;
    }
},
setVideoSize: function(width, height) {
    if (this.pluginElement.style) {
        this.pluginElement.style.width = width + "px";
        this.pluginElement.style.height = height + "px";
    }
    if (this.pluginApi != null && this.pluginApi.setVideoSize) {
        this.pluginApi.setVideoSize(width, height);
    }
},
setFullscreen: function(fullscreen) {
    if (this.pluginApi != null && this.pluginApi.setFullscreen) {
        this.pluginApi.setFullscreen(fullscreen);
    }
},
enterFullScreen: function() {
    if (this.pluginApi != null && this.pluginApi.setFullscreen) {
        this.setFullscreen(true);
    }
},
exitFullScreen: function() {
    if (this.pluginApi != null && this.pluginApi.setFullscreen) {
        this.setFullscreen(false);
    }
},
addEventListener: function(eventName, callback, bubble) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);
},
removeEventListener: function(eventName, callback) {
    if (!eventName) {
        this.events = {};
        return true;
    }
    var callbacks = this.events[eventName];
    if (!callbacks) {
        return true;
    }
    if (!callback) {
        this.events[eventName] = [];
        return true;
    }
    for (i = 0; i < callbacks.length; i++) {
        if (callbacks[i] === callback) {
            this.events[eventName].splice(i, 1);
            return true;
        }
    }
    return false;
},
dispatchEvent: function(eventName) {
    var i, args, callbacks = this.events[eventName];
    if (callbacks) {
        args = Array.prototype.slice.call(arguments, 1);
        for (i = 0; i < callbacks.length; i++) {
            callbacks[i].apply(null, args);
        }
    }
},
hasAttribute: function(name) {
    return (name in this.attributes);
},
removeAttribute: function(name) {
    delete this.attributes[name];
},
getAttribute: function(name) {
    if (this.hasAttribute(name)) {
        return this.attributes[name];
    }
    return "";
},
setAttribute: function(name, value) {
    this.attributes[name] = value;
},
remove: function() {
    mejs.Utility.removeSwf(this.pluginElement.id);
    mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id);
}
};
mejs.MediaPluginBridge = {
pluginMediaElements: {},
htmlMediaElements: {},
registerPluginElement: function(id, pluginMediaElement, htmlMediaElement) {
    this.pluginMediaElements[id] = pluginMediaElement;
    this.htmlMediaElements[id] = htmlMediaElement;
},
unregisterPluginElement: function(id) {
    delete this.pluginMediaElements[id];
    delete this.htmlMediaElements[id];
},
initPlugin: function(id) {
    var pluginMediaElement = this.pluginMediaElements[id],
    htmlMediaElement = this.htmlMediaElements[id];
    if (pluginMediaElement) {
        switch (pluginMediaElement.pluginType) {
            case "flash":
                pluginMediaElement.pluginElement = pluginMediaElement.pluginApi = document.getElementById(id);
                break;
            case "silverlight":
                pluginMediaElement.pluginElement = document.getElementById(pluginMediaElement.id);
                pluginMediaElement.pluginApi = pluginMediaElement.pluginElement.Content.MediaElementJS;
                break;
        }
        if (pluginMediaElement.pluginApi != null && pluginMediaElement.success) {
            pluginMediaElement.success(pluginMediaElement, htmlMediaElement);
        }
    }
},
fireEvent: function(id, eventName, values) {
    var e, i, bufferedTime, pluginMediaElement = this.pluginMediaElements[id];
    if (!pluginMediaElement) {
        return;
    }
    e = {
    type: eventName,
    target: pluginMediaElement
    };
    for (i in values) {
        pluginMediaElement[i] = values[i];
        e[i] = values[i];
    }
    bufferedTime = values.bufferedTime || 0;
    e.target.buffered = e.buffered = {
    start: function(index) {
        return 0;
    },
    end: function(index) {
        return bufferedTime;
    },
    length: 1
    };
    pluginMediaElement.dispatchEvent(e.type, e);
}
};
mejs.MediaElementDefaults = {
mode: "auto",
plugins: ["flash", "silverlight", "youtube", "vimeo"],
enablePluginDebug: false,
httpsBasicAuthSite: false,
type: "",
pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]),
flashName: "flashmediaelement.swf",
flashStreamer: "",
enablePluginSmoothing: false,
enablePseudoStreaming: false,
pseudoStreamingStartQueryParam: "start",
silverlightName: "silverlightmediaelement.xap",
defaultVideoWidth: 480,
defaultVideoHeight: 270,
pluginWidth: -1,
pluginHeight: -1,
pluginVars: [],
timerRate: 250,
startVolume: 0.8,
success: function() {},
error: function() {}
};
mejs.MediaElement = function(el, o) {
    return mejs.HtmlMediaElementShim.create(el, o);
};
mejs.HtmlMediaElementShim = {
create: function(el, o) {
    var options = mejs.MediaElementDefaults,
    htmlMediaElement = (typeof(el) == "string") ? document.getElementById(el) : el,
    tagName = htmlMediaElement.tagName.toLowerCase(),
    isMediaTag = (tagName === "audio" || tagName === "video"),
    src = (isMediaTag) ? htmlMediaElement.getAttribute("src") : htmlMediaElement.getAttribute("href"),
    poster = htmlMediaElement.getAttribute("poster"),
    autoplay = htmlMediaElement.getAttribute("autoplay"),
    preload = htmlMediaElement.getAttribute("preload"),
    controls = htmlMediaElement.getAttribute("controls"),
    playback, prop;
    for (prop in o) {
        options[prop] = o[prop];
    }
    src = (typeof src == "undefined" || src === null || src == "") ? null : src;
    poster = (typeof poster == "undefined" || poster === null) ? "" : poster;
    preload = (typeof preload == "undefined" || preload === null || preload === "false") ? "none" : preload;
    autoplay = !(typeof autoplay == "undefined" || autoplay === null || autoplay === "false");
    controls = !(typeof controls == "undefined" || controls === null || controls === "false");
    playback = this.determinePlayback(htmlMediaElement, options, mejs.MediaFeatures.supportsMediaTag, isMediaTag, src);
    playback.url = (playback.url !== null) ? mejs.Utility.absolutizeUrl(playback.url) : "";
    if (playback.method == "native") {
        if (mejs.MediaFeatures.isBustedAndroid) {
            htmlMediaElement.src = playback.url;
            htmlMediaElement.addEventListener("click", function() {
                                              htmlMediaElement.play();
                                              }, false);
        }
        return this.updateNative(playback, options, autoplay, preload);
    } else {
        if (playback.method !== "") {
            return this.createPlugin(playback, options, poster, autoplay, preload, controls);
        } else {
            this.createErrorMessage(playback, options, poster);
            return this;
        }
    }
},
determinePlayback: function(htmlMediaElement, options, supportsMediaTag, isMediaTag, src) {
    var mediaFiles = [],
    i, j, k, l, n, type, result = {
    method: "",
    url: "",
    htmlMediaElement: htmlMediaElement,
    isVideo: (htmlMediaElement.tagName.toLowerCase() != "audio")
    },
    pluginName, pluginVersions, pluginInfo, dummy, media;
    if (typeof options.type != "undefined" && options.type !== "") {
        if (typeof options.type == "string") {
            mediaFiles.push({
                            type: options.type,
                            url: src
                            });
        } else {
            for (i = 0; i < options.type.length; i++) {
                mediaFiles.push({
                                type: options.type[i],
                                url: src
                                });
            }
        }
    } else {
        if (src !== null) {
            type = this.formatType(src, htmlMediaElement.getAttribute("type"));
            mediaFiles.push({
                            type: type,
                            url: src
                            });
        } else {
            for (i = 0; i < htmlMediaElement.childNodes.length; i++) {
                n = htmlMediaElement.childNodes[i];
                if (n.nodeType == 1 && n.tagName.toLowerCase() == "source") {
                    src = n.getAttribute("src");
                    type = this.formatType(src, n.getAttribute("type"));
                    media = n.getAttribute("media");
                    if (!media || !window.matchMedia || (window.matchMedia && window.matchMedia(media).matches)) {
                        mediaFiles.push({
                                        type: type,
                                        url: src
                                        });
                    }
                }
            }
        }
    }
    if (!isMediaTag && mediaFiles.length > 0 && mediaFiles[0].url !== null && this.getTypeFromFile(mediaFiles[0].url).indexOf("audio") > -1) {
        result.isVideo = false;
    }
    if (mejs.MediaFeatures.isBustedAndroid) {
        htmlMediaElement.canPlayType = function(type) {
            return (type.match(/video\/(mp4|m4v)/gi) !== null) ? "maybe" : "";
        };
    }
    if (supportsMediaTag && (options.mode === "auto" || options.mode === "auto_plugin" || options.mode === "native") && !(mejs.MediaFeatures.isBustedNativeHTTPS && options.httpsBasicAuthSite === true)) {
        if (!isMediaTag) {
            dummy = document.createElement(result.isVideo ? "video" : "audio");
            htmlMediaElement.parentNode.insertBefore(dummy, htmlMediaElement);
            htmlMediaElement.style.display = "none";
            result.htmlMediaElement = htmlMediaElement = dummy;
        }
        for (i = 0; i < mediaFiles.length; i++) {
            if (htmlMediaElement.canPlayType(mediaFiles[i].type).replace(/no/, "") !== "" || htmlMediaElement.canPlayType(mediaFiles[i].type.replace(/mp3/, "mpeg")).replace(/no/, "") !== "") {
                result.method = "native";
                result.url = mediaFiles[i].url;
                break;
            }
        }
        if (result.method === "native") {
            if (result.url !== null) {
                htmlMediaElement.src = result.url;
            }
            if (options.mode !== "auto_plugin") {
                return result;
            }
        }
    }
    if (options.mode === "auto" || options.mode === "auto_plugin" || options.mode === "shim") {
        for (i = 0; i < mediaFiles.length; i++) {
            type = mediaFiles[i].type;
            for (j = 0; j < options.plugins.length; j++) {
                pluginName = options.plugins[j];
                pluginVersions = mejs.plugins[pluginName];
                for (k = 0; k < pluginVersions.length; k++) {
                    pluginInfo = pluginVersions[k];
                    if (pluginInfo.version == null || mejs.PluginDetector.hasPluginVersion(pluginName, pluginInfo.version)) {
                        for (l = 0; l < pluginInfo.types.length; l++) {
                            if (type == pluginInfo.types[l]) {
                                result.method = pluginName;
                                result.url = mediaFiles[i].url;
                                return result;
                            }
                        }
                    }
                }
            }
        }
    }
    if (options.mode === "auto_plugin" && result.method === "native") {
        return result;
    }
    if (result.method === "" && mediaFiles.length > 0) {
        result.url = mediaFiles[0].url;
    }
    return result;
},
formatType: function(url, type) {
    var ext;
    if (url && !type) {
        return this.getTypeFromFile(url);
    } else {
        if (type && ~type.indexOf(";")) {
            return type.substr(0, type.indexOf(";"));
        } else {
            return type;
        }
    }
},
getTypeFromFile: function(url) {
    url = url.split("?")[0];
    var ext = url.substring(url.lastIndexOf(".") + 1).toLowerCase();
    return (/(mp4|m4v|ogg|ogv|webm|webmv|flv|wmv|mpeg|mov)/gi.test(ext) ? "video" : "audio") + "/" + this.getTypeFromExtension(ext);
},
getTypeFromExtension: function(ext) {
    switch (ext) {
        case "mp4":
        case "m4v":
            return "mp4";
        case "webm":
        case "webma":
        case "webmv":
            return "webm";
        case "ogg":
        case "oga":
        case "ogv":
            return "ogg";
        default:
            return ext;
    }
},
createErrorMessage: function(playback, options, poster) {
    var htmlMediaElement = playback.htmlMediaElement,
    errorContainer = document.createElement("div");
    errorContainer.className = "me-cannotplay";
    try {
        errorContainer.style.width = htmlMediaElement.width + "px";
        errorContainer.style.height = htmlMediaElement.height + "px";
    } catch (e) {}
    if (options.customError) {
        errorContainer.innerHTML = options.customError;
    } else {
        errorContainer.innerHTML = (poster !== "") ? '<a href="' + playback.url + '"><img src="' + poster + '" width="100%" height="100%" /></a>' : '<a href="' + playback.url + '"><span>' + mejs.i18n.t("Download File") + "</span></a>";
    }
    htmlMediaElement.parentNode.insertBefore(errorContainer, htmlMediaElement);
    htmlMediaElement.style.display = "none";
    options.error(htmlMediaElement);
},
createPlugin: function(playback, options, poster, autoplay, preload, controls) {
    var htmlMediaElement = playback.htmlMediaElement,
    width = 1,
    height = 1,
    pluginid = "me_" + playback.method + "_" + (mejs.meIndex++),
    pluginMediaElement = new mejs.PluginMediaElement(pluginid, playback.method, playback.url),
    container = document.createElement("div"),
    specialIEContainer, node, initVars;
    pluginMediaElement.tagName = htmlMediaElement.tagName;
    for (var i = 0; i < htmlMediaElement.attributes.length; i++) {
        var attribute = htmlMediaElement.attributes[i];
        if (attribute.specified == true) {
            pluginMediaElement.setAttribute(attribute.name, attribute.value);
        }
    }
    node = htmlMediaElement.parentNode;
    while (node !== null && node.tagName.toLowerCase() != "body") {
        if (node.parentNode.tagName.toLowerCase() == "p") {
            node.parentNode.parentNode.insertBefore(node, node.parentNode);
            break;
        }
        node = node.parentNode;
    }
    if (playback.isVideo) {
        width = (options.pluginWidth > 0) ? options.pluginWidth : (options.videoWidth > 0) ? options.videoWidth : (htmlMediaElement.getAttribute("width") !== null) ? htmlMediaElement.getAttribute("width") : options.defaultVideoWidth;
        height = (options.pluginHeight > 0) ? options.pluginHeight : (options.videoHeight > 0) ? options.videoHeight : (htmlMediaElement.getAttribute("height") !== null) ? htmlMediaElement.getAttribute("height") : options.defaultVideoHeight;
        width = mejs.Utility.encodeUrl(width);
        height = mejs.Utility.encodeUrl(height);
    } else {
        if (options.enablePluginDebug) {
            width = 320;
            height = 240;
        }
    }
    pluginMediaElement.success = options.success;
    mejs.MediaPluginBridge.registerPluginElement(pluginid, pluginMediaElement, htmlMediaElement);
    container.className = "me-plugin";
    container.id = pluginid + "_container";
    if (playback.isVideo) {
        htmlMediaElement.parentNode.insertBefore(container, htmlMediaElement);
    } else {
        document.body.insertBefore(container, document.body.childNodes[0]);
    }
    initVars = ["id=" + pluginid, "isvideo=" + ((playback.isVideo) ? "true" : "false"), "autoplay=" + ((autoplay) ? "true" : "false"), "preload=" + preload, "width=" + width, "startvolume=" + options.startVolume, "timerrate=" + options.timerRate, "flashstreamer=" + options.flashStreamer, "height=" + height, "pseudostreamstart=" + options.pseudoStreamingStartQueryParam];
    if (playback.url !== null) {
        if (playback.method == "flash") {
            initVars.push("file=" + mejs.Utility.encodeUrl(playback.url));
        } else {
            initVars.push("file=" + playback.url);
        }
    }
    if (options.enablePluginDebug) {
        initVars.push("debug=true");
    }
    if (options.enablePluginSmoothing) {
        initVars.push("smoothing=true");
    }
    if (options.enablePseudoStreaming) {
        initVars.push("pseudostreaming=true");
    }
    if (controls) {
        initVars.push("controls=true");
    }
    if (options.pluginVars) {
        initVars = initVars.concat(options.pluginVars);
    }
    switch (playback.method) {
        case "silverlight":
            container.innerHTML = '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + pluginid + '" name="' + pluginid + '" width="' + width + '" height="' + height + '" class="mejs-shim"><param name="initParams" value="' + initVars.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + options.pluginPath + options.silverlightName + '" /></object>';
            break;
        case "flash":
            if (mejs.MediaFeatures.isIE) {
                specialIEContainer = document.createElement("div");
                container.appendChild(specialIEContainer);
                specialIEContainer.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + pluginid + '" width="' + width + '" height="' + height + '" class="mejs-shim"><param name="movie" value="' + options.pluginPath + options.flashName + "?x=" + (new Date()) + '" /><param name="flashvars" value="' + initVars.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>';
            } else {
                container.innerHTML = '<embed id="' + pluginid + '" name="' + pluginid + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + options.pluginPath + options.flashName + '" flashvars="' + initVars.join("&") + '" width="' + width + '" height="' + height + '" class="mejs-shim"></embed>';
            }
            break;
        case "youtube":
            var videoId = playback.url.substr(playback.url.lastIndexOf("=") + 1);
            youtubeSettings = {
            container: container,
            containerId: container.id,
            pluginMediaElement: pluginMediaElement,
            pluginId: pluginid,
            videoId: videoId,
            height: height,
            width: width
            };
            if (mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0])) {
                mejs.YouTubeApi.createFlash(youtubeSettings);
            } else {
                mejs.YouTubeApi.enqueueIframe(youtubeSettings);
            }
            break;
        case "vimeo":
            pluginMediaElement.vimeoid = playback.url.substr(playback.url.lastIndexOf("/") + 1);
            container.innerHTML = '<iframe src="http://player.vimeo.com/video/' + pluginMediaElement.vimeoid + '?portrait=0&byline=0&title=0" width="' + width + '" height="' + height + '" frameborder="0" class="mejs-shim"></iframe>';
            break;
    }
    htmlMediaElement.style.display = "none";
    htmlMediaElement.removeAttribute("autoplay");
    return pluginMediaElement;
},
updateNative: function(playback, options, autoplay, preload) {
    var htmlMediaElement = playback.htmlMediaElement,
    m;
    for (m in mejs.HtmlMediaElement) {
        htmlMediaElement[m] = mejs.HtmlMediaElement[m];
    }
    options.success(htmlMediaElement, htmlMediaElement);
    return htmlMediaElement;
}
};
mejs.YouTubeApi = {
isIframeStarted: false,
isIframeLoaded: false,
loadIframeApi: function() {
    if (!this.isIframeStarted) {
        var tag = document.createElement("script");
        tag.src = "//www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        this.isIframeStarted = true;
    }
},
iframeQueue: [],
enqueueIframe: function(yt) {
    if (this.isLoaded) {
        this.createIframe(yt);
    } else {
        this.loadIframeApi();
        this.iframeQueue.push(yt);
    }
},
createIframe: function(settings) {
    var pluginMediaElement = settings.pluginMediaElement,
    player = new YT.Player(settings.containerId, {
                           height: settings.height,
                           width: settings.width,
                           videoId: settings.videoId,
                           playerVars: {
                           controls: 0
                           },
                           events: {
                           onReady: function() {
                           settings.pluginMediaElement.pluginApi = player;
                           mejs.MediaPluginBridge.initPlugin(settings.pluginId);
                           setInterval(function() {
                                       mejs.YouTubeApi.createEvent(player, pluginMediaElement, "timeupdate");
                                       }, 250);
                           },
                           onStateChange: function(e) {
                           mejs.YouTubeApi.handleStateChange(e.data, player, pluginMediaElement);
                           }
                           }
                           });
},
createEvent: function(player, pluginMediaElement, eventName) {
    var obj = {
    type: eventName,
    target: pluginMediaElement
    };
    if (player && player.getDuration) {
        pluginMediaElement.currentTime = obj.currentTime = player.getCurrentTime();
        pluginMediaElement.duration = obj.duration = player.getDuration();
        obj.paused = pluginMediaElement.paused;
        obj.ended = pluginMediaElement.ended;
        obj.muted = player.isMuted();
        obj.volume = player.getVolume() / 100;
        obj.bytesTotal = player.getVideoBytesTotal();
        obj.bufferedBytes = player.getVideoBytesLoaded();
        var bufferedTime = obj.bufferedBytes / obj.bytesTotal * obj.duration;
        obj.target.buffered = obj.buffered = {
        start: function(index) {
            return 0;
        },
        end: function(index) {
            return bufferedTime;
        },
        length: 1
        };
    }
    pluginMediaElement.dispatchEvent(obj.type, obj);
},
iFrameReady: function() {
    this.isLoaded = true;
    this.isIframeLoaded = true;
    while (this.iframeQueue.length > 0) {
        var settings = this.iframeQueue.pop();
        this.createIframe(settings);
    }
},
flashPlayers: {},
createFlash: function(settings) {
    this.flashPlayers[settings.pluginId] = settings;
    var specialIEContainer, youtubeUrl = "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + settings.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0";
    if (mejs.MediaFeatures.isIE) {
        specialIEContainer = document.createElement("div");
        settings.container.appendChild(specialIEContainer);
        specialIEContainer.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + settings.pluginId + '" width="' + settings.width + '" height="' + settings.height + '" class="mejs-shim"><param name="movie" value="' + youtubeUrl + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>';
    } else {
        settings.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + settings.pluginId + '" data="' + youtubeUrl + '" width="' + settings.width + '" height="' + settings.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"></object>';
    }
},
flashReady: function(id) {
    var settings = this.flashPlayers[id],
    player = document.getElementById(id),
    pluginMediaElement = settings.pluginMediaElement;
    pluginMediaElement.pluginApi = pluginMediaElement.pluginElement = player;
    mejs.MediaPluginBridge.initPlugin(id);
    player.cueVideoById(settings.videoId);
    var callbackName = settings.containerId + "_callback";
    window[callbackName] = function(e) {
        mejs.YouTubeApi.handleStateChange(e, player, pluginMediaElement);
    };
    player.addEventListener("onStateChange", callbackName);
    setInterval(function() {
                mejs.YouTubeApi.createEvent(player, pluginMediaElement, "timeupdate");
                }, 250);
},
handleStateChange: function(youTubeState, player, pluginMediaElement) {
    switch (youTubeState) {
        case -1:
            pluginMediaElement.paused = true;
            pluginMediaElement.ended = true;
            mejs.YouTubeApi.createEvent(player, pluginMediaElement, "loadedmetadata");
            break;
        case 0:
            pluginMediaElement.paused = false;
            pluginMediaElement.ended = true;
            mejs.YouTubeApi.createEvent(player, pluginMediaElement, "ended");
            break;
        case 1:
            pluginMediaElement.paused = false;
            pluginMediaElement.ended = false;
            mejs.YouTubeApi.createEvent(player, pluginMediaElement, "play");
            mejs.YouTubeApi.createEvent(player, pluginMediaElement, "playing");
            break;
        case 2:
            pluginMediaElement.paused = true;
            pluginMediaElement.ended = false;
            mejs.YouTubeApi.createEvent(player, pluginMediaElement, "pause");
            break;
        case 3:
            mejs.YouTubeApi.createEvent(player, pluginMediaElement, "progress");
            break;
        case 5:
            break;
    }
}
};

function onYouTubePlayerAPIReady() {
    mejs.YouTubeApi.iFrameReady();
}

function onYouTubePlayerReady(id) {
    mejs.YouTubeApi.flashReady(id);
}
window.mejs = mejs;
window.MediaElement = mejs.MediaElement;
/*!
 * Adds Internationalization and localization to objects.
 *
 * What is the concept beyond i18n?
 *   http://en.wikipedia.org/wiki/Internationalization_and_localization
 *
 *
 * This file both i18n methods and locale which is used to translate
 * strings into other languages.
 *
 * Default translations are not available, you have to add them
 * through locale objects which are named exactly as the langcode
 * they stand for. The default language is always english (en).
 *
 *
 * Wrapper built to be able to attach the i18n object to
 * other objects without changing more than one line.
 *
 *
 * LICENSE:
 *
 *   The i18n file uses methods from the Drupal project (drupal.js):
 *     - i18n.methods.t() (modified)
 *     - i18n.methods.checkPlain() (full copy)
 *     - i18n.methods.formatString() (full copy)
 *
 *   The Drupal project is (like mediaelementjs) licensed under GPLv2.
 *    - http://drupal.org/licensing/faq/#q1
 *    - https://github.com/johndyer/mediaelement
 *    - http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 *
 *
 * @author
 *   Tim Latz (latz.tim@gmail.com)
 *
 * @see
 *   me-i18n-locale.js
 *
 * @params
 *  - context - document, iframe ..
 *  - exports - CommonJS, window ..
 *
 */
(function(context, exports, undefined) {
 var i18n = {
 locale: {
 language: "",
 strings: {}
 },
 methods: {}
 };
 i18n.locale.getLanguage = function() {
 return i18n.locale.language || navigator.language;
 };
 if (typeof mejsL10n != "undefined") {
 i18n.locale.language = mejsL10n.language;
 }
 i18n.locale.INIT_LANGUAGE = i18n.locale.getLanguage();
 i18n.methods.checkPlain = function(str) {
 var character, regex, replace = {
 "&": "&amp;",
 '"': "&quot;",
 "<": "&lt;",
 ">": "&gt;"
 };
 str = String(str);
 for (character in replace) {
 if (replace.hasOwnProperty(character)) {
 regex = new RegExp(character, "g");
 str = str.replace(regex, replace[character]);
 }
 }
 return str;
 };
 i18n.methods.formatString = function(str, args) {
 for (var key in args) {
 switch (key.charAt(0)) {
 case "@":
 args[key] = i18n.methods.checkPlain(args[key]);
 break;
 case "!":
 break;
 case "%":
 default:
 args[key] = '<em class="placeholder">' + i18n.methods.checkPlain(args[key]) + "</em>";
 break;
 }
 str = str.replace(key, args[key]);
 }
 return str;
 };
 i18n.methods.t = function(str, args, options) {
 if (i18n.locale.strings && i18n.locale.strings[options.context] && i18n.locale.strings[options.context][str]) {
 str = i18n.locale.strings[options.context][str];
 }
 if (args) {
 str = i18n.methods.formatString(str, args);
 }
 return str;
 };
 i18n.t = function(str, args, options) {
 if (typeof str === "string" && str.length > 0) {
 var language = i18n.locale.getLanguage();
 options = options || {
 context: language
 };
 return i18n.methods.t(str, args, options);
 } else {
 throw {
 name: "InvalidArgumentException",
 message: "First argument is either not a string or empty."
 };
 }
 };
 exports.i18n = i18n;
 }(document, mejs));
(function(exports, undefined) {
 if (typeof mejsL10n != "undefined") {
 exports[mejsL10n.language] = mejsL10n.strings;
 }
 }(mejs.i18n.locale.strings));
/*!
 * This is a i18n.locale language object.
 *
 *<de> German translation by Tim Latz, latz.tim@gmail.com
 *
 * @author
 *   Tim Latz (latz.tim@gmail.com)
 *
 * @see
 *   me-i18n.js
 *
 * @params
 *  - exports - CommonJS, window ..
 */
(function(exports, undefined) {
 exports.de = {
 Fullscreen: "Vollbild",
 "Go Fullscreen": "Vollbild an",
 "Turn off Fullscreen": "Vollbild aus",
 Close: "Schließen"
 };
 }(mejs.i18n.locale.strings));
/*!
 * This is a i18n.locale language object.
 *
 *<de> Traditional chinese translation by Tim Latz, latz.tim@gmail.com
 *
 * @author
 *   Tim Latz (latz.tim@gmail.com)
 *
 * @see
 *   me-i18n.js
 *
 * @params
 *  - exports - CommonJS, window ..
 */
(function(exports, undefined) {
 exports.zh = {
 Fullscreen: "全螢幕",
 "Go Fullscreen": "全屏模式",
 "Turn off Fullscreen": "退出全屏模式",
 Close: "關閉"
 };
 }(mejs.i18n.locale.strings));
/*!
 * MediaElementPlayer
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> add <audio> tags
 * using jQuery and MediaElement.js (HTML5 Flash/Silverlight wrapper)
 *
 * Copyright 2010-2013, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
if (typeof jQuery != "undefined") {
    mejs.$ = jQuery;
} else {
    if (typeof ender != "undefined") {
        mejs.$ = ender;
    }
}(function($) {
  mejs.MepDefaults = {
  poster: "",
  showPosterWhenEnded: false,
  defaultVideoWidth: 480,
  defaultVideoHeight: 270,
  videoWidth: -1,
  videoHeight: -1,
  defaultAudioWidth: 400,
  defaultAudioHeight: 30,
  defaultSeekBackwardInterval: function(media) {
  return (media.duration * 0.05);
  },
  defaultSeekForwardInterval: function(media) {
  return (media.duration * 0.05);
  },
  audioWidth: -1,
  audioHeight: -1,
  startVolume: 0.8,
  loop: false,
  autoRewind: true,
  enableAutosize: true,
  alwaysShowHours: false,
  showTimecodeFrameCount: false,
  framesPerSecond: 25,
  autosizeProgress: true,
  alwaysShowControls: false,
  hideVideoControlsOnLoad: false,
  clickToPlayPause: true,
  iPadUseNativeControls: false,
  iPhoneUseNativeControls: false,
  AndroidUseNativeControls: false,
  features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
  isVideo: true,
  enableKeyboard: true,
  pauseOtherPlayers: true,
  keyActions: [{
               keys: [32, 179],
               action: function(player, media) {
               if (media.paused || media.ended) {
               media.play();
               } else {
               media.pause();
               }
               }
               }, {
               keys: [38],
               action: function(player, media) {
               var newVolume = Math.min(media.volume + 0.1, 1);
               media.setVolume(newVolume);
               }
               }, {
               keys: [40],
               action: function(player, media) {
               var newVolume = Math.max(media.volume - 0.1, 0);
               media.setVolume(newVolume);
               }
               }, {
               keys: [37, 227],
               action: function(player, media) {
               if (!isNaN(media.duration) && media.duration > 0) {
               if (player.isVideo) {
               player.showControls();
               player.startControlsTimer();
               }
               var newTime = Math.max(media.currentTime - player.options.defaultSeekBackwardInterval(media), 0);
               media.setCurrentTime(newTime);
               }
               }
               }, {
               keys: [39, 228],
               action: function(player, media) {
               if (!isNaN(media.duration) && media.duration > 0) {
               if (player.isVideo) {
               player.showControls();
               player.startControlsTimer();
               }
               var newTime = Math.min(media.currentTime + player.options.defaultSeekForwardInterval(media), media.duration);
               media.setCurrentTime(newTime);
               }
               }
               }, {
               keys: [70],
               action: function(player, media) {
               if (typeof player.enterFullScreen != "undefined") {
               if (player.isFullScreen) {
               player.exitFullScreen();
               } else {
               player.enterFullScreen();
               }
               }
               }
               }]
  };
  mejs.mepIndex = 0;
  mejs.players = {};
  mejs.MediaElementPlayer = function(node, o) {
  if (!(this instanceof mejs.MediaElementPlayer)) {
  return new mejs.MediaElementPlayer(node, o);
  }
  var t = this;
  t.$media = t.$node = $(node);
  t.node = t.media = t.$media[0];
  if (typeof t.node.player != "undefined") {
  return t.node.player;
  } else {
  t.node.player = t;
  }
  if (typeof o == "undefined") {
  o = t.$node.data("mejsoptions");
  }
  t.options = $.extend({}, mejs.MepDefaults, o);
  t.id = "mep_" + mejs.mepIndex++;
  mejs.players[t.id] = t;
  t.init();
  return t;
  };
  mejs.MediaElementPlayer.prototype = {
  hasFocus: false,
  controlsAreVisible: true,
  init: function() {
  var t = this,
  mf = mejs.MediaFeatures,
  meOptions = $.extend(true, {}, t.options, {
                       success: function(media, domNode) {
                       t.meReady(media, domNode);
                       },
                       error: function(e) {
                       t.handleError(e);
                       }
                       }),
  tagName = t.media.tagName.toLowerCase();
  t.isDynamic = (tagName !== "audio" && tagName !== "video");
  if (t.isDynamic) {
  t.isVideo = t.options.isVideo;
  } else {
  t.isVideo = (tagName !== "audio" && t.options.isVideo);
  }
  if ((mf.isiPad && t.options.iPadUseNativeControls) || (mf.isiPhone && t.options.iPhoneUseNativeControls)) {
  t.$media.attr("controls", "controls");
  if (mf.isiPad && t.media.getAttribute("autoplay") !== null) {
  t.media.load();
  t.media.play();
  }
  } else {
  if (mf.isAndroid && t.options.AndroidUseNativeControls) {} else {
  t.$media.removeAttr("controls");
  t.container = $('<div id="' + t.id + '" class="mejs-container ' + (mejs.MediaFeatures.svg ? "svg" : "no-svg") + '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(t.$media[0].className).insertBefore(t.$media);
  t.container.addClass((mf.isAndroid ? "mejs-android " : "") + (mf.isiOS ? "mejs-ios " : "") + (mf.isiPad ? "mejs-ipad " : "") + (mf.isiPhone ? "mejs-iphone " : "") + (t.isVideo ? "mejs-video " : "mejs-audio "));
  if (mf.isiOS) {
  var $newMedia = t.$media.clone();
  t.container.find(".mejs-mediaelement").append($newMedia);
  t.$media.remove();
  t.$node = t.$media = $newMedia;
  t.node = t.media = $newMedia[0];
  } else {
  t.container.find(".mejs-mediaelement").append(t.$media);
  }
  t.controls = t.container.find(".mejs-controls");
  t.layers = t.container.find(".mejs-layers");
  var tagType = (t.isVideo ? "video" : "audio"),
  capsTagName = tagType.substring(0, 1).toUpperCase() + tagType.substring(1);
  if (t.options[tagType + "Width"] > 0 || t.options[tagType + "Width"].toString().indexOf("%") > -1) {
  t.width = t.options[tagType + "Width"];
  } else {
  if (t.media.style.width !== "" && t.media.style.width !== null) {
  t.width = t.media.style.width;
  } else {
  if (t.media.getAttribute("width") !== null) {
  t.width = t.$media.attr("width");
  } else {
  t.width = t.options["default" + capsTagName + "Width"];
  }
  }
  }
  if (t.options[tagType + "Height"] > 0 || t.options[tagType + "Height"].toString().indexOf("%") > -1) {
  t.height = t.options[tagType + "Height"];
  } else {
  if (t.media.style.height !== "" && t.media.style.height !== null) {
  t.height = t.media.style.height;
  } else {
  if (t.$media[0].getAttribute("height") !== null) {
  t.height = t.$media.attr("height");
  } else {
  t.height = t.options["default" + capsTagName + "Height"];
  }
  }
  }
  t.setPlayerSize(t.width, t.height);
  meOptions.pluginWidth = t.width;
  meOptions.pluginHeight = t.height;
  }
  }
  mejs.MediaElement(t.$media[0], meOptions);
  if (typeof(t.container) != "undefined" && t.controlsAreVisible) {
  t.container.trigger("controlsshown");
  }
  },
  showControls: function(doAnimation) {
  var t = this;
  doAnimation = typeof doAnimation == "undefined" || doAnimation;
  if (t.controlsAreVisible) {
  return;
  }
  if (doAnimation) {
  t.controls.css("visibility", "visible").stop(true, true).fadeIn(200, function() {
                                                                  t.controlsAreVisible = true;
                                                                  t.container.trigger("controlsshown");
                                                                  });
  t.container.find(".mejs-control").css("visibility", "visible").stop(true, true).fadeIn(200, function() {
                                                                                         t.controlsAreVisible = true;
                                                                                         });
  } else {
  t.controls.css("visibility", "visible").css("display", "block");
  t.container.find(".mejs-control").css("visibility", "visible").css("display", "block");
  t.controlsAreVisible = true;
  t.container.trigger("controlsshown");
  }
  t.setControlsSize();
  },
  hideControls: function(doAnimation) {
  var t = this;
  doAnimation = typeof doAnimation == "undefined" || doAnimation;
  if (!t.controlsAreVisible || t.options.alwaysShowControls) {
  return;
  }
  if (doAnimation) {
  t.controls.stop(true, true).fadeOut(200, function() {
                                      $(this).css("visibility", "hidden").css("display", "block");
                                      t.controlsAreVisible = false;
                                      t.container.trigger("controlshidden");
                                      });
  t.container.find(".mejs-control").stop(true, true).fadeOut(200, function() {
                                                             $(this).css("visibility", "hidden").css("display", "block");
                                                             });
  } else {
  t.controls.css("visibility", "hidden").css("display", "block");
  t.container.find(".mejs-control").css("visibility", "hidden").css("display", "block");
  t.controlsAreVisible = false;
  t.container.trigger("controlshidden");
  }
  },
  controlsTimer: null,
  startControlsTimer: function(timeout) {
  var t = this;
  timeout = typeof timeout != "undefined" ? timeout : 1500;
  t.killControlsTimer("start");
  t.controlsTimer = setTimeout(function() {
                               t.hideControls();
                               t.killControlsTimer("hide");
                               }, timeout);
  },
  killControlsTimer: function(src) {
  var t = this;
  if (t.controlsTimer !== null) {
  clearTimeout(t.controlsTimer);
  delete t.controlsTimer;
  t.controlsTimer = null;
  }
  },
  controlsEnabled: true,
  disableControls: function() {
  var t = this;
  t.killControlsTimer();
  t.hideControls(false);
  this.controlsEnabled = false;
  },
  enableControls: function() {
  var t = this;
  t.showControls(false);
  t.controlsEnabled = true;
  },
  meReady: function(media, domNode) {
  var t = this,
  mf = mejs.MediaFeatures,
  autoplayAttr = domNode.getAttribute("autoplay"),
  autoplay = !(typeof autoplayAttr == "undefined" || autoplayAttr === null || autoplayAttr === "false"),
  featureIndex, feature;
  if (t.created) {
  return;
  } else {
  t.created = true;
  }
  t.media = media;
  t.domNode = domNode;
  if (!(mf.isAndroid && t.options.AndroidUseNativeControls) && !(mf.isiPad && t.options.iPadUseNativeControls) && !(mf.isiPhone && t.options.iPhoneUseNativeControls)) {
  t.buildposter(t, t.controls, t.layers, t.media);
  t.buildkeyboard(t, t.controls, t.layers, t.media);
  t.buildoverlays(t, t.controls, t.layers, t.media);
  t.findTracks();
  for (featureIndex in t.options.features) {
  feature = t.options.features[featureIndex];
  if (t["build" + feature]) {
  try {
  t["build" + feature](t, t.controls, t.layers, t.media);
  } catch (e) {}
  }
  }
  t.container.trigger("controlsready");
  t.setPlayerSize(t.width, t.height);
  t.setControlsSize();
  if (t.isVideo) {
  if (mejs.MediaFeatures.hasTouch) {
  t.$media.bind("touchstart", function() {
                if (t.controlsAreVisible) {
                t.hideControls(false);
                } else {
                if (t.controlsEnabled) {
                t.showControls(false);
                }
                }
                });
  } else {
  mejs.MediaElementPlayer.prototype.clickToPlayPauseCallback = function() {
  if (t.options.clickToPlayPause) {
  if (t.media.paused) {
  t.media.play();
  } else {
  t.media.pause();
  }
  }
  };
  t.media.addEventListener("click", t.clickToPlayPauseCallback, false);
  t.container.bind("mouseenter mouseover", function() {
                   if (t.controlsEnabled) {
                   if (!t.options.alwaysShowControls) {
                   t.killControlsTimer("enter");
                   t.showControls();
                   t.startControlsTimer(2500);
                   }
                   }
                   }).bind("mousemove", function() {
                           if (t.controlsEnabled) {
                           if (!t.controlsAreVisible) {
                           t.showControls();
                           }
                           if (!t.options.alwaysShowControls) {
                           t.startControlsTimer(2500);
                           }
                           }
                           }).bind("mouseleave", function() {
                                   if (t.controlsEnabled) {
                                   if (!t.media.paused && !t.options.alwaysShowControls) {
                                   t.startControlsTimer(1000);
                                   }
                                   }
                                   });
  }
  if (t.options.hideVideoControlsOnLoad) {
  t.hideControls(false);
  }
  if (autoplay && !t.options.alwaysShowControls) {
  t.hideControls();
  }
  if (t.options.enableAutosize) {
  t.media.addEventListener("loadedmetadata", function(e) {
                           if (t.options.videoHeight <= 0 && t.domNode.getAttribute("height") === null && !isNaN(e.target.videoHeight)) {
                           t.setPlayerSize(e.target.videoWidth, e.target.videoHeight);
                           t.setControlsSize();
                           t.media.setVideoSize(e.target.videoWidth, e.target.videoHeight);
                           }
                           }, false);
  }
  }
  media.addEventListener("play", function() {
                         var playerIndex;
                         for (playerIndex in mejs.players) {
                         var p = mejs.players[playerIndex];
                         if (p.id != t.id && t.options.pauseOtherPlayers && !p.paused && !p.ended) {
                         p.pause();
                         }
                         p.hasFocus = false;
                         }
                         t.hasFocus = true;
                         }, false);
  t.media.addEventListener("ended", function(e) {
                           if (!t.options.autoRewind) {
                           try {
                           t.media.setCurrentTime(0);
                           } catch (exp) {}
                           }
                           t.media.pause();
                           if (t.setProgressRail) {
                           t.setProgressRail();
                           }
                           if (t.setCurrentRail) {
                           t.setCurrentRail();
                           }
                           if (t.options.loop) {
                           t.media.play();
                           } else {
                           if (!t.options.alwaysShowControls && t.controlsEnabled) {
                           t.showControls();
                           }
                           }
                           }, false);
  t.media.addEventListener("loadedmetadata", function(e) {
                           if (t.updateDuration) {
                           t.updateDuration();
                           }
                           if (t.updateCurrent) {
                           t.updateCurrent();
                           }
                           if (!t.isFullScreen) {
                           t.setPlayerSize(t.width, t.height);
                           t.setControlsSize();
                           }
                           }, false);
  setTimeout(function() {
             t.setPlayerSize(t.width, t.height);
             t.setControlsSize();
             }, 50);
  t.globalBind("resize", function() {
               if (!(t.isFullScreen || (mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen))) {
               t.setPlayerSize(t.width, t.height);
               }
               t.setControlsSize();
               });
  if (t.media.pluginType == "youtube") {
  t.container.find(".mejs-overlay-play").hide();
  }
  }
  if (autoplay && media.pluginType == "native") {
  media.load();
  media.play();
  }
  if (t.options.success) {
  if (typeof t.options.success == "string") {
  window[t.options.success](t.media, t.domNode, t);
  } else {
  t.options.success(t.media, t.domNode, t);
  }
  }
  },
  handleError: function(e) {
  var t = this;
  t.controls.hide();
  if (t.options.error) {
  t.options.error(e);
  }
  },
  setPlayerSize: function(width, height) {
  var t = this;
  if (typeof width != "undefined") {
  t.width = width;
  }
  if (typeof height != "undefined") {
  t.height = height;
  }
  if (t.height.toString().indexOf("%") > 0 || t.$node.css("max-width") === "100%" || parseInt(t.$node.css("max-width").replace(/px/, ""), 10) / t.$node.offsetParent().width() === 1 || (t.$node[0].currentStyle && t.$node[0].currentStyle.maxWidth === "100%")) {
  var nativeWidth = t.isVideo ? ((t.media.videoWidth && t.media.videoWidth > 0) ? t.media.videoWidth : t.options.defaultVideoWidth) : t.options.defaultAudioWidth,
  nativeHeight = t.isVideo ? ((t.media.videoHeight && t.media.videoHeight > 0) ? t.media.videoHeight : t.options.defaultVideoHeight) : t.options.defaultAudioHeight,
  parentWidth = t.container.parent().closest(":visible").width(),
  newHeight = t.isVideo || !t.options.autosizeProgress ? parseInt(parentWidth * nativeHeight / nativeWidth, 10) : nativeHeight;
  if (t.container.parent()[0].tagName.toLowerCase() === "body") {
  parentWidth = $(window).width();
  newHeight = $(window).height();
  }
  if (newHeight != 0 && parentWidth != 0) {
  t.container.width(parentWidth).height(newHeight);
  t.$media.add(t.container.find(".mejs-shim")).width("100%").height("100%");
  if (t.isVideo) {
  if (t.media.setVideoSize) {
  t.media.setVideoSize(parentWidth, newHeight);
  }
  }
  t.layers.children(".mejs-layer").width("100%").height("100%");
  }
  } else {
  t.container.width(t.width).height(t.height);
  t.layers.children(".mejs-layer").width(t.width).height(t.height);
  }
  var playLayer = t.layers.find(".mejs-overlay-play"),
  playButton = playLayer.find(".mejs-overlay-button");
  playLayer.height(t.container.height() - t.controls.height());
  playButton.css("margin-top", "-" + (playButton.height() / 2 - t.controls.height() / 2).toString() + "px");
  },
  setControlsSize: function() {
  var t = this,
  usedWidth = 1,
  railWidth = 1,
  rail = t.controls.find(".mejs-time-rail"),
  total = t.controls.find(".mejs-time-total"),
  current = t.controls.find(".mejs-time-current"),
  loaded = t.controls.find(".mejs-time-loaded"),
  others = rail.siblings();
  if (t.options && !t.options.autosizeProgress) {
  railWidth = parseInt(rail.css("width"));
  }
  if (railWidth === 0 || !railWidth) {
  others.each(function() {
              var $this = $(this);
              if ($this.css("position") != "absolute" && $this.is(":visible")) {
              usedWidth += $(this).outerWidth(true);
              }
              });
  railWidth = t.controls.width() - usedWidth - (rail.outerWidth(true) - rail.width());
  }
  rail.width(railWidth);
  total.width(railWidth - (total.outerWidth(true) - total.width()));
  if (t.setProgressRail) {
  t.setProgressRail();
  }
  if (t.setCurrentRail) {
  t.setCurrentRail();
  }
  },
  buildposter: function(player, controls, layers, media) {
  var t = this,
  poster = $('<div class="mejs-poster mejs-layer"></div>').appendTo(layers),
  posterUrl = player.$media.attr("poster");
  if (player.options.poster !== "") {
  posterUrl = player.options.poster;
  }
  if (posterUrl !== "" && posterUrl != null) {
  t.setPoster(posterUrl);
  } else {
  poster.hide();
  }
  media.addEventListener("play", function() {
                         poster.hide();
                         }, false);
  if (player.options.showPosterWhenEnded && player.options.autoRewind) {
  media.addEventListener("ended", function() {
                         poster.show();
                         }, false);
  }
  },
  setPoster: function(url) {
  var t = this,
  posterDiv = t.container.find(".mejs-poster"),
  posterImg = posterDiv.find("img");
  if (posterImg.length == 0) {
  posterImg = $('<img width="100%" height="100%" />').appendTo(posterDiv);
  }
  posterImg.attr("src", url);
  posterDiv.css({
                "background-image": "url(" + url + ")"
                });
  },
  buildoverlays: function(player, controls, layers, media) {
  var t = this;
  if (!player.isVideo) {
  return;
  }
  var loading = $('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(layers),
  error = $('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(layers),
  bigPlay = $('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').appendTo(layers).click(function() {
                                                                                                                                             if (t.options.clickToPlayPause) {
                                                                                                                                             if (media.paused) {
                                                                                                                                             media.play();
                                                                                                                                             } else {
                                                                                                                                             media.pause();
                                                                                                                                             }
                                                                                                                                             }
                                                                                                                                             });
  media.addEventListener("play", function() {
                         bigPlay.hide();
                         loading.hide();
                         controls.find(".mejs-time-buffering").hide();
                         error.hide();
                         }, false);
  media.addEventListener("playing", function() {
                         bigPlay.hide();
                         loading.hide();
                         controls.find(".mejs-time-buffering").hide();
                         error.hide();
                         }, false);
  media.addEventListener("seeking", function() {
                         loading.show();
                         controls.find(".mejs-time-buffering").show();
                         }, false);
  media.addEventListener("seeked", function() {
                         loading.hide();
                         controls.find(".mejs-time-buffering").hide();
                         }, false);
  media.addEventListener("pause", function() {
                         if (!mejs.MediaFeatures.isiPhone) {
                         bigPlay.show();
                         }
                         }, false);
  media.addEventListener("waiting", function() {
                         loading.show();
                         controls.find(".mejs-time-buffering").show();
                         }, false);
  media.addEventListener("loadeddata", function() {
                         loading.show();
                         controls.find(".mejs-time-buffering").show();
                         }, false);
  media.addEventListener("canplay", function() {
                         loading.hide();
                         controls.find(".mejs-time-buffering").hide();
                         }, false);
  media.addEventListener("error", function() {
                         loading.hide();
                         controls.find(".mejs-time-buffering").hide();
                         error.show();
                         error.find("mejs-overlay-error").html("Error loading this resource");
                         }, false);
  },
  buildkeyboard: function(player, controls, layers, media) {
  var t = this;
  t.globalBind("keydown", function(e) {
               if (player.hasFocus && player.options.enableKeyboard) {
               for (var i = 0, il = player.options.keyActions.length; i < il; i++) {
               var keyAction = player.options.keyActions[i];
               for (var j = 0, jl = keyAction.keys.length; j < jl; j++) {
               if (e.keyCode == keyAction.keys[j]) {
               e.preventDefault();
               keyAction.action(player, media, e.keyCode);
               return false;
               }
               }
               }
               }
               return true;
               });
  t.globalBind("click", function(event) {
               if ($(event.target).closest(".mejs-container").length == 0) {
               player.hasFocus = false;
               }
               });
  },
  findTracks: function() {
  var t = this,
  tracktags = t.$media.find("track");
  t.tracks = [];
  tracktags.each(function(index, track) {
                 track = $(track);
                 t.tracks.push({
                               srclang: (track.attr("srclang")) ? track.attr("srclang").toLowerCase() : "",
                               src: track.attr("src"),
                               kind: track.attr("kind"),
                               label: track.attr("label") || "",
                               entries: [],
                               isLoaded: false
                               });
                 });
  },
  changeSkin: function(className) {
  this.container[0].className = "mejs-container " + className;
  this.setPlayerSize(this.width, this.height);
  this.setControlsSize();
  },
  play: function() {
  this.media.play();
  },
  pause: function() {
  try {
  this.media.pause();
  } catch (e) {}
  },
  load: function() {
  this.media.load();
  },
  setMuted: function(muted) {
  this.media.setMuted(muted);
  },
  setCurrentTime: function(time) {
  this.media.setCurrentTime(time);
  },
  getCurrentTime: function() {
  return this.media.currentTime;
  },
  setVolume: function(volume) {
  this.media.setVolume(volume);
  },
  getVolume: function() {
  return this.media.volume;
  },
  setSrc: function(src) {
  this.media.setSrc(src);
  },
  remove: function() {
  var t = this,
  featureIndex, feature;
  for (featureIndex in t.options.features) {
  feature = t.options.features[featureIndex];
  if (t["clean" + feature]) {
  try {
  t["clean" + feature](t);
  } catch (e) {}
  }
  }
  if (!t.isDynamic) {
  t.$media.prop("controls", true);
  t.$node.clone().show().insertBefore(t.container);
  t.$node.remove();
  } else {
  t.$node.insertBefore(t.container);
  }
  if (t.media.pluginType !== "native") {
  t.media.remove();
  }
  delete mejs.players[t.id];
  t.container.remove();
  t.globalUnbind();
  delete t.node.player;
  }
  };
  (function() {
   var rwindow = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
   
   function splitEvents(events, id) {
   var ret = {
   d: [],
   w: []
   };
   $.each((events || "").split(" "), function(k, v) {
          var eventname = v + "." + id;
          if (eventname.indexOf(".") === 0) {
          ret.d.push(eventname);
          ret.w.push(eventname);
          } else {
          ret[rwindow.test(v) ? "w" : "d"].push(eventname);
          }
          });
   ret.d = ret.d.join(" ");
   ret.w = ret.w.join(" ");
   return ret;
   }
   mejs.MediaElementPlayer.prototype.globalBind = function(events, data, callback) {
   var t = this;
   events = splitEvents(events, t.id);
   if (events.d) {
   $(document).bind(events.d, data, callback);
   }
   if (events.w) {
   $(window).bind(events.w, data, callback);
   }
   };
   mejs.MediaElementPlayer.prototype.globalUnbind = function(events, callback) {
   var t = this;
   events = splitEvents(events, t.id);
   if (events.d) {
   $(document).unbind(events.d, callback);
   }
   if (events.w) {
   $(window).unbind(events.w, callback);
   }
   };
   })();
  if (typeof jQuery != "undefined") {
  jQuery.fn.mediaelementplayer = function(options) {
  if (options === false) {
  this.each(function() {
            var player = jQuery(this).data("mediaelementplayer");
            if (player) {
            player.remove();
            }
            jQuery(this).removeData("mediaelementplayer");
            });
  } else {
  this.each(function() {
            jQuery(this).data("mediaelementplayer", new mejs.MediaElementPlayer(this, options));
            });
  }
  return this;
  };
  }
  $(document).ready(function() {
                    $(".mejs-player").mediaelementplayer();
                    });
  window.MediaElementPlayer = mejs.MediaElementPlayer;
  })(mejs.$);
(function($) {
 $.extend(mejs.MepDefaults, {
          playpauseText: mejs.i18n.t("Play/Pause")
          });
 $.extend(MediaElementPlayer.prototype, {
          buildplaypause: function(player, controls, layers, media) {
          var t = this,
          play = $('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' + t.id + '" title="' + t.options.playpauseText + '" aria-label="' + t.options.playpauseText + '"></button></div>').appendTo(controls).click(function(e) {
                                                                                                                                                                                                                                                                 e.preventDefault();
                                                                                                                                                                                                                                                                 if (media.paused) {
                                                                                                                                                                                                                                                                 media.play();
                                                                                                                                                                                                                                                                 } else {
                                                                                                                                                                                                                                                                 media.pause();
                                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                                 return false;
                                                                                                                                                                                                                                                                 });
          media.addEventListener("play", function() {
                                 play.removeClass("mejs-play").addClass("mejs-pause");
                                 }, false);
          media.addEventListener("playing", function() {
                                 play.removeClass("mejs-play").addClass("mejs-pause");
                                 }, false);
          media.addEventListener("pause", function() {
                                 play.removeClass("mejs-pause").addClass("mejs-play");
                                 }, false);
          media.addEventListener("paused", function() {
                                 play.removeClass("mejs-pause").addClass("mejs-play");
                                 }, false);
          }
          });
 })(mejs.$);
(function($) {
 $.extend(mejs.MepDefaults, {
          stopText: "Stop"
          });
 $.extend(MediaElementPlayer.prototype, {
          buildstop: function(player, controls, layers, media) {
          var t = this,
          stop = $('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' + t.id + '" title="' + t.options.stopText + '" aria-label="' + t.options.stopText + '"></button></div>').appendTo(controls).click(function() {
                                                                                                                                                                                                                                                 if (!media.paused) {
                                                                                                                                                                                                                                                 media.pause();
                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                 if (media.currentTime > 0) {
                                                                                                                                                                                                                                                 media.setCurrentTime(0);
                                                                                                                                                                                                                                                 media.pause();
                                                                                                                                                                                                                                                 controls.find(".mejs-time-current").width("0px");
                                                                                                                                                                                                                                                 controls.find(".mejs-time-handle").css("left", "0px");
                                                                                                                                                                                                                                                 controls.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0));
                                                                                                                                                                                                                                                 controls.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0));
                                                                                                                                                                                                                                                 layers.find(".mejs-poster").show();
                                                                                                                                                                                                                                                 }
                                                                                                                                                                                                                                                 });
          }
          });
 })(mejs.$);
(function($) {
 $.extend(MediaElementPlayer.prototype, {
          buildprogress: function(player, controls, layers, media) {
          $('<div class="mejs-time-rail"><span class="mejs-time-total"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></span></div>').appendTo(controls);
          controls.find(".mejs-time-buffering").hide();
          var t = this,
          total = controls.find(".mejs-time-total"),
          loaded = controls.find(".mejs-time-loaded"),
          current = controls.find(".mejs-time-current"),
          handle = controls.find(".mejs-time-handle"),
          timefloat = controls.find(".mejs-time-float"),
          timefloatcurrent = controls.find(".mejs-time-float-current"),
          handleMouseMove = function(e) {
          var x = e.pageX,
          offset = total.offset(),
          width = total.outerWidth(true),
          percentage = 0,
          newTime = 0,
          pos = 0;
          if (media.duration) {
          if (x < offset.left) {
          x = offset.left;
          } else {
          if (x > width + offset.left) {
          x = width + offset.left;
          }
          }
          pos = x - offset.left;
          percentage = (pos / width);
          newTime = (percentage <= 0.02) ? 0 : percentage * media.duration;
          if (mouseIsDown === true && newTime !== media.currentTime && newTime < (media.duration - 0.25)) {
          audioPlayerPositionSet = true;
          media.setCurrentTime(newTime);
          audioPlayerPositionSetTime = newTime;
          }
          if (!mejs.MediaFeatures.hasTouch) {
          timefloat.css("left", pos);
          timefloatcurrent.html(mejs.Utility.secondsToTimeCode(newTime));
          timefloat.show();
          }
          }
          },
          mouseIsDown = false,
          mouseIsOver = false;
          total.bind("mousedown", function(e) {
                     if (e.which === 1) {
                     mouseIsDown = true;
                     handleMouseMove(e);
                     t.globalBind("mousemove.dur", function(e) {
                                  handleMouseMove(e);
                                  });
                     t.globalBind("mouseup.dur", function(e) {
                                  mouseIsDown = false;
                                  timefloat.hide();
                                  t.globalUnbind(".dur");
                                  });
                     return false;
                     }
                     }).bind("mouseenter", function(e) {
                             mouseIsOver = true;
                             t.globalBind("mousemove.dur", function(e) {
                                          handleMouseMove(e);
                                          });
                             if (!mejs.MediaFeatures.hasTouch) {
                             timefloat.show();
                             }
                             }).bind("touchmove", function(e) {
                                     mouseIsOver = true;
                                     mouseIsDown = true;
                                     var x = e.originalEvent.touches[0].pageX,
                                     offset = total.offset(),
                                     width = (total.outerWidth(true) - 25),
                                     percentage = 0,
                                     newTime = 0,
                                     pos = 0;
                                     if (media.duration) {
                                     if (x < offset.left) {
                                     x = offset.left;
                                     } else {
                                     if (x > width + offset.left) {
                                     x = width + offset.left;
                                     }
                                     }
                                     pos = x - offset.left;
                                     percentage = (pos / width);
                                     if (percentage === 1) {
                                     percentage = 0.99;
                                     }
                                     newTime = (percentage <= 0.02) ? 0 : (percentage * media.duration);
                                     if (newTime !== media.currentTime) {
                                     audioPlayerPositionSet = true;
                                     audioPlayerPositionSetTime = newTime;
                                     media.setCurrentTime(newTime);
                                     }
                                     }
                                     mouseIsDown = false;
                                     timefloat.hide();
                                     }).bind("mouseleave", function(e) {
                                             mouseIsOver = false;
                                             if (!mouseIsDown) {
                                             t.globalUnbind(".dur");
                                             timefloat.hide();
                                             }
                                             });
          media.addEventListener("progress", function(e) {
                                 player.setProgressRail(e);
                                 player.setCurrentRail(e);
                                 }, false);
          media.addEventListener("timeupdate", function(e) {
                                 player.setProgressRail(e);
                                 player.setCurrentRail(e);
                                 }, false);
          t.loaded = loaded;
          t.total = total;
          t.current = current;
          t.handle = handle;
          },
          setProgressRail: function(e) {
          var t = this,
          target = (e != undefined) ? e.target : t.media,
          percent = null;
          if (target && target.buffered && target.buffered.length > 0 && target.buffered.end && target.duration) {
          percent = target.buffered.end(0) / target.duration;
          } else {
          if (target && target.bytesTotal != undefined && target.bytesTotal > 0 && target.bufferedBytes != undefined) {
          percent = target.bufferedBytes / target.bytesTotal;
          } else {
          if (e && e.lengthComputable && e.total != 0) {
          percent = e.loaded / e.total;
          }
          }
          }
          if (percent !== null) {
          percent = Math.min(1, Math.max(0, percent));
          if (t.loaded && t.total) {
          t.loaded.width(t.total.width() * percent);
          }
          }
          },
          setCurrentRail: function() {
          var t = this;
          if (t.media.currentTime != undefined && t.media.duration) {
          if (t.total && t.handle) {
          var newWidth = Math.round(t.total.width() * t.media.currentTime / t.media.duration),
          //handlePos = newWidth - Math.round(t.handle.outerWidth(true) / 2);
          handlePos = newWidth
          t.current.width(newWidth);
          t.handle.css("left", handlePos);
          }
          }
          }
          });
 })(mejs.$);
(function($) {
 $.extend(mejs.MepDefaults, {
          duration: -1,
          timeAndDurationSeparator: "<span> | </span>"
          });
 $.extend(MediaElementPlayer.prototype, {
          buildcurrent: function(player, controls, layers, media) {
          var t = this;
          $('<div class="mejs-time"><span class="mejs-currenttime">' + (player.options.alwaysShowHours ? "00:" : "") + (player.options.showTimecodeFrameCount ? "00:00:00" : "00:00") + "</span></div>").appendTo(controls);
          t.currenttime = t.controls.find(".mejs-currenttime");
          media.addEventListener("timeupdate", function() {
                                 player.updateCurrent();
                                 }, false);
          },
          buildduration: function(player, controls, layers, media) {
          var t = this;
          if (controls.children().last().find(".mejs-currenttime").length > 0) {
          $(t.options.timeAndDurationSeparator + '<span class="mejs-duration">' + (t.options.duration > 0 ? mejs.Utility.secondsToTimeCode(t.options.duration, t.options.alwaysShowHours || t.media.duration > 3600, t.options.showTimecodeFrameCount, t.options.framesPerSecond || 25) : ((player.options.alwaysShowHours ? "00:" : "") + (player.options.showTimecodeFrameCount ? "00:00:00" : "00:00"))) + "</span>").appendTo(controls.find(".mejs-time"));
          } else {
          controls.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container");
          $('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' + (t.options.duration > 0 ? mejs.Utility.secondsToTimeCode(t.options.duration, t.options.alwaysShowHours || t.media.duration > 3600, t.options.showTimecodeFrameCount, t.options.framesPerSecond || 25) : ((player.options.alwaysShowHours ? "00:" : "") + (player.options.showTimecodeFrameCount ? "00:00:00" : "00:00"))) + "</span></div>").appendTo(controls);
          }
          t.durationD = t.controls.find(".mejs-duration");
          media.addEventListener("timeupdate", function() {
                                 player.updateDuration();
                                 }, false);
          },
          updateCurrent: function() {
          var t = this;
          if (t.currenttime) {
          t.currenttime.html(mejs.Utility.secondsToTimeCode(t.media.currentTime, t.options.alwaysShowHours || t.media.duration > 3600, t.options.showTimecodeFrameCount, t.options.framesPerSecond || 25));
          }
          },
          updateDuration: function() {
          var t = this;
          t.container.toggleClass("mejs-long-video", t.media.duration > 3600);
          if (t.durationD && (t.options.duration > 0 || t.media.duration)) {
          t.durationD.html(mejs.Utility.secondsToTimeCode(t.options.duration > 0 ? t.options.duration : t.media.duration, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond || 25));
          }
          }
          });
 })(mejs.$);
(function($) {
 $.extend(mejs.MepDefaults, {
          muteText: mejs.i18n.t("Mute Toggle"),
          hideVolumeOnTouchDevices: true,
          audioVolume: "horizontal",
          videoVolume: "vertical"
          });
 $.extend(MediaElementPlayer.prototype, {
          buildvolume: function(player, controls, layers, media) {
          if (mejs.MediaFeatures.hasTouch && this.options.hideVolumeOnTouchDevices) {
          return;
          }
          var t = this,
          mode = (t.isVideo) ? t.options.videoVolume : t.options.audioVolume,
          mute = (mode == "horizontal") ? $('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + t.id + '" title="' + t.options.muteText + '" aria-label="' + t.options.muteText + '"></button></div><div class="mejs-horizontal-volume-slider"><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></div>').appendTo(controls) : $('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + t.id + '" title="' + t.options.muteText + '" aria-label="' + t.options.muteText + '"></button><div class="mejs-volume-slider"><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></div></div>').appendTo(controls),
          volumeSlider = t.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"),
          volumeTotal = t.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"),
          volumeCurrent = t.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"),
          volumeHandle = t.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"),
          positionVolumeHandle = function(volume, secondTry) {
          if (!volumeSlider.is(":visible") && typeof secondTry == "undefined") {
          volumeSlider.show();
          positionVolumeHandle(volume, true);
          volumeSlider.hide();
          return;
          }
          volume = Math.max(0, volume);
          volume = Math.min(volume, 1);
          if (volume == 0) {
          mute.removeClass("mejs-mute").addClass("mejs-unmute");
          } else {
          mute.removeClass("mejs-unmute").addClass("mejs-mute");
          }
          if (mode == "vertical") {
          var totalHeight = volumeTotal.height(),
          totalPosition = volumeTotal.position(),
          newTop = totalHeight - (totalHeight * volume);
          volumeHandle.css("top", Math.round(totalPosition.top + newTop - (volumeHandle.height() / 2)));
          volumeCurrent.height(totalHeight - newTop);
          volumeCurrent.css("top", totalPosition.top + newTop);
          } else {
          var totalWidth = volumeTotal.width(),
          totalPosition = volumeTotal.position(),
          newLeft = totalWidth * volume;
          volumeHandle.css("left", Math.round(totalPosition.left + newLeft - (volumeHandle.width() / 2)));
          volumeCurrent.width(Math.round(newLeft));
          }
          },
          handleVolumeMove = function(e) {
          var volume = null,
          totalOffset = volumeTotal.offset();
          if (mode == "vertical") {
          var railHeight = volumeTotal.height(),
          totalTop = parseInt(volumeTotal.css("top").replace(/px/, ""), 10),
          newY = e.pageY - totalOffset.top;
          volume = (railHeight - newY) / railHeight;
          if (totalOffset.top == 0 || totalOffset.left == 0) {
          return;
          }
          } else {
          var railWidth = volumeTotal.width(),
          newX = e.pageX - totalOffset.left;
          volume = newX / railWidth;
          }
          volume = Math.max(0, volume);
          volume = Math.min(volume, 1);
          positionVolumeHandle(volume);
          if (volume == 0) {
          media.setMuted(true);
          } else {
          media.setMuted(false);
          }
          media.setVolume(volume);
          },
          mouseIsDown = false,
          mouseIsOver = false;
          mute.hover(function() {
                     volumeSlider.show();
                     mouseIsOver = true;
                     }, function() {
                     mouseIsOver = false;
                     if (!mouseIsDown && mode == "vertical") {
                     volumeSlider.hide();
                     }
                     });
          volumeSlider.bind("mouseover", function() {
                            mouseIsOver = true;
                            }).bind("mousedown", function(e) {
                                    handleVolumeMove(e);
                                    t.globalBind("mousemove.vol", function(e) {
                                                 handleVolumeMove(e);
                                                 });
                                    t.globalBind("mouseup.vol", function() {
                                                 mouseIsDown = false;
                                                 t.globalUnbind(".vol");
                                                 if (!mouseIsOver && mode == "vertical") {
                                                 volumeSlider.hide();
                                                 }
                                                 });
                                    mouseIsDown = true;
                                    return false;
                                    });
          mute.find("button").click(function() {
                                    media.setMuted(!media.muted);
                                    });
          media.addEventListener("volumechange", function(e) {
                                 if (!mouseIsDown) {
                                 if (media.muted) {
                                 positionVolumeHandle(0);
                                 mute.removeClass("mejs-mute").addClass("mejs-unmute");
                                 } else {
                                 positionVolumeHandle(media.volume);
                                 mute.removeClass("mejs-unmute").addClass("mejs-mute");
                                 }
                                 }
                                 }, false);
          if (t.container.is(":visible")) {
          positionVolumeHandle(player.options.startVolume);
          if (player.options.startVolume === 0) {
          media.setMuted(true);
          }
          if (media.pluginType === "native") {
          media.setVolume(player.options.startVolume);
          }
          }
          }
          });
 })(mejs.$);
(function($) {
 $.extend(mejs.MepDefaults, {
          usePluginFullScreen: true,
          newWindowCallback: function() {
          return "";
          },
          fullscreenText: mejs.i18n.t("Fullscreen")
          });
 $.extend(MediaElementPlayer.prototype, {
          isFullScreen: false,
          isNativeFullScreen: false,
          isInIframe: false,
          buildfullscreen: function(player, controls, layers, media) {
          if (!player.isVideo) {
          return;
          }
          player.isInIframe = (window.location != window.parent.location);
          if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
          var func = function(e) {
          if (player.isFullScreen) {
          if (mejs.MediaFeatures.isFullScreen()) {
          player.isNativeFullScreen = true;
          player.setControlsSize();
          } else {
          player.isNativeFullScreen = false;
          player.exitFullScreen();
          }
          }
          };
          if (mejs.MediaFeatures.hasMozNativeFullScreen) {
          player.globalBind(mejs.MediaFeatures.fullScreenEventName, func);
          } else {
          player.container.bind(mejs.MediaFeatures.fullScreenEventName, func);
          }
          }
          var t = this,
          normalHeight = 1,
          normalWidth = 1,
          container = player.container,
          fullscreenBtn = $('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + t.id + '" title="' + t.options.fullscreenText + '" aria-label="' + t.options.fullscreenText + '"></button></div>').appendTo(controls);
          if (t.media.pluginType === "native" || (!t.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox)) {
          fullscreenBtn.click(function() {
                              var isFullScreen = (mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen()) || player.isFullScreen;
                              if (isFullScreen) {
                              player.exitFullScreen();
                              } else {
                              player.enterFullScreen();
                              }
                              });
          } else {
          var hideTimeout = null,
          supportsPointerEvents = (function() {
                                   var element = document.createElement("x"),
                                   documentElement = document.documentElement,
                                   getComputedStyle = window.getComputedStyle,
                                   supports;
                                   if (!("pointerEvents" in element.style)) {
                                   return false;
                                   }
                                   element.style.pointerEvents = "auto";
                                   element.style.pointerEvents = "x";
                                   documentElement.appendChild(element);
                                   supports = getComputedStyle && getComputedStyle(element, "").pointerEvents === "auto";
                                   documentElement.removeChild(element);
                                   return !!supports;
                                   })();
          if (supportsPointerEvents && !mejs.MediaFeatures.isOpera) {
          var fullscreenIsDisabled = false,
          restoreControls = function() {
          if (fullscreenIsDisabled) {
          for (var i in hoverDivs) {
          hoverDivs[i].hide();
          }
          fullscreenBtn.css("pointer-events", "");
          t.controls.css("pointer-events", "");
          t.media.removeEventListener("click", t.clickToPlayPauseCallback);
          fullscreenIsDisabled = false;
          }
          },
          hoverDivs = {},
          hoverDivNames = ["top", "left", "right", "bottom"],
          i, len, positionHoverDivs = function() {
          var fullScreenBtnOffsetLeft = fullscreenBtn.offset().left - t.container.offset().left,
          fullScreenBtnOffsetTop = fullscreenBtn.offset().top - t.container.offset().top,
          fullScreenBtnWidth = fullscreenBtn.outerWidth(true),
          fullScreenBtnHeight = fullscreenBtn.outerHeight(true),
          containerWidth = t.container.width(),
          containerHeight = t.container.height();
          for (i in hoverDivs) {
          hoverDivs[i].css({
                           position: "absolute",
                           top: 0,
                           left: 0
                           });
          }
          hoverDivs.top.width(containerWidth).height(fullScreenBtnOffsetTop);
          hoverDivs.left.width(fullScreenBtnOffsetLeft).height(fullScreenBtnHeight).css({
                                                                                        top: fullScreenBtnOffsetTop
                                                                                        });
          hoverDivs.right.width(containerWidth - fullScreenBtnOffsetLeft - fullScreenBtnWidth).height(fullScreenBtnHeight).css({
                                                                                                                               top: fullScreenBtnOffsetTop,
                                                                                                                               left: fullScreenBtnOffsetLeft + fullScreenBtnWidth
                                                                                                                               });
          hoverDivs.bottom.width(containerWidth).height(containerHeight - fullScreenBtnHeight - fullScreenBtnOffsetTop).css({
                                                                                                                            top: fullScreenBtnOffsetTop + fullScreenBtnHeight
                                                                                                                            });
          };
          t.globalBind("resize", function() {
                       positionHoverDivs();
                       });
          for (i = 0, len = hoverDivNames.length; i < len; i++) {
          hoverDivs[hoverDivNames[i]] = $('<div class="mejs-fullscreen-hover" />').appendTo(t.container).mouseover(restoreControls).hide();
          }
          fullscreenBtn.on("mouseover", function() {
                           if (!t.isFullScreen) {
                           var buttonPos = fullscreenBtn.offset(),
                           containerPos = player.container.offset();
                           media.positionFullscreenButton(buttonPos.left - containerPos.left, buttonPos.top - containerPos.top, false);
                           fullscreenBtn.css("pointer-events", "none");
                           t.controls.css("pointer-events", "none");
                           t.media.addEventListener("click", t.clickToPlayPauseCallback);
                           for (i in hoverDivs) {
                           hoverDivs[i].show();
                           }
                           positionHoverDivs();
                           fullscreenIsDisabled = true;
                           }
                           });
          media.addEventListener("fullscreenchange", function(e) {
                                 t.isFullScreen = !t.isFullScreen;
                                 if (t.isFullScreen) {
                                 t.media.removeEventListener("click", t.clickToPlayPauseCallback);
                                 } else {
                                 t.media.addEventListener("click", t.clickToPlayPauseCallback);
                                 }
                                 restoreControls();
                                 });
          t.globalBind("mousemove", function(e) {
                       if (fullscreenIsDisabled) {
                       var fullscreenBtnPos = fullscreenBtn.offset();
                       if (e.pageY < fullscreenBtnPos.top || e.pageY > fullscreenBtnPos.top + fullscreenBtn.outerHeight(true) || e.pageX < fullscreenBtnPos.left || e.pageX > fullscreenBtnPos.left + fullscreenBtn.outerWidth(true)) {
                       fullscreenBtn.css("pointer-events", "");
                       t.controls.css("pointer-events", "");
                       fullscreenIsDisabled = false;
                       }
                       }
                       });
          } else {
          fullscreenBtn.on("mouseover", function() {
                           if (hideTimeout !== null) {
                           clearTimeout(hideTimeout);
                           delete hideTimeout;
                           }
                           var buttonPos = fullscreenBtn.offset(),
                           containerPos = player.container.offset();
                           media.positionFullscreenButton(buttonPos.left - containerPos.left, buttonPos.top - containerPos.top, true);
                           }).on("mouseout", function() {
                                 if (hideTimeout !== null) {
                                 clearTimeout(hideTimeout);
                                 delete hideTimeout;
                                 }
                                 hideTimeout = setTimeout(function() {
                                                          media.hideFullscreenButton();
                                                          }, 1500);
                                 });
          }
          }
          player.fullscreenBtn = fullscreenBtn;
          t.globalBind("keydown", function(e) {
                       if (((mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen()) || t.isFullScreen) && e.keyCode == 27) {
                       player.exitFullScreen();
                       }
                       });
          },
          cleanfullscreen: function(player) {
          player.exitFullScreen();
          },
          containerSizeTimeout: null,
          enterFullScreen: function() {
          var t = this;
          if (t.media.pluginType !== "native" && (mejs.MediaFeatures.isFirefox || t.options.usePluginFullScreen)) {
          return;
          }
          $(document.documentElement).addClass("mejs-fullscreen");
          normalHeight = t.container.height();
          normalWidth = t.container.width();
          if (t.media.pluginType === "native") {
          if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
          mejs.MediaFeatures.requestFullScreen(t.container[0]);
          if (t.isInIframe) {
          setTimeout(function checkFullscreen() {
                     if (t.isNativeFullScreen) {
                     if ($(window).width() !== screen.width) {
                     t.exitFullScreen();
                     } else {
                     setTimeout(checkFullscreen, 500);
                     }
                     }
                     }, 500);
          }
          } else {
          if (mejs.MediaFeatures.hasSemiNativeFullScreen) {
          t.media.webkitEnterFullscreen();
          return;
          }
          }
          }
          if (t.isInIframe) {
          var url = t.options.newWindowCallback(this);
          if (url !== "") {
          if (!mejs.MediaFeatures.hasTrueNativeFullScreen) {
          t.pause();
          window.open(url, t.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no");
          return;
          } else {
          setTimeout(function() {
                     if (!t.isNativeFullScreen) {
                     t.pause();
                     window.open(url, t.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no");
                     }
                     }, 250);
          }
          }
          }
          t.container.addClass("mejs-container-fullscreen").width("100%").height("100%");
          t.containerSizeTimeout = setTimeout(function() {
                                              t.container.css({
                                                              width: "100%",
                                                              height: "100%"
                                                              });
                                              t.setControlsSize();
                                              }, 500);
          if (t.media.pluginType === "native") {
          t.$media.width("100%").height("100%");
          } else {
          t.container.find(".mejs-shim").width("100%").height("100%");
          t.media.setVideoSize($(window).width(), $(window).height());
          }
          t.layers.children("div").width("100%").height("100%");
          if (t.fullscreenBtn) {
          t.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen");
          }
          t.setControlsSize();
          t.isFullScreen = true;
          },
          exitFullScreen: function() {
          var t = this;
          clearTimeout(t.containerSizeTimeout);
          if (t.media.pluginType !== "native" && mejs.MediaFeatures.isFirefox) {
          t.media.setFullscreen(false);
          return;
          }
          if (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || t.isFullScreen)) {
          mejs.MediaFeatures.cancelFullScreen();
          }
          $(document.documentElement).removeClass("mejs-fullscreen");
          t.container.removeClass("mejs-container-fullscreen");
          if (t.media.pluginType === "native") {} else {}
          t.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen");
          t.setControlsSize();
          t.isFullScreen = false;
          }
          });
 })(mejs.$);
(function($) {
 $.extend(mejs.MepDefaults, {
          startLanguage: "",
          tracksText: mejs.i18n.t("Captions/Subtitles"),
          hideCaptionsButtonWhenEmpty: true,
          toggleCaptionsButtonWhenOnlyOne: false,
          slidesSelector: ""
          });
 $.extend(MediaElementPlayer.prototype, {
          hasChapters: false,
          buildtracks: function(player, controls, layers, media) {
          if (player.tracks.length == 0) {
          return;
          }
          var t = this,
          i, options = "";
          if (t.domNode.textTracks) {
          for (var i = t.domNode.textTracks.length - 1; i >= 0; i--) {
          t.domNode.textTracks[i].mode = "hidden";
          }
          }
          player.chapters = $('<div class="mejs-chapters mejs-layer"></div>').prependTo(layers).hide();
          player.captions = $('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover"><span class="mejs-captions-text"></span></div></div>').prependTo(layers).hide();
          player.captionsText = player.captions.find(".mejs-captions-text");
          player.captionsButton = $('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' + t.id + '" title="' + t.options.tracksText + '" aria-label="' + t.options.tracksText + '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' + player.id + '_captions" id="' + player.id + '_captions_none" value="none" checked="checked" /><label for="' + player.id + '_captions_none">' + mejs.i18n.t("None") + "</label></li></ul></div></div>").appendTo(controls);
          var subtitleCount = 0;
          for (i = 0; i < player.tracks.length; i++) {
          if (player.tracks[i].kind == "subtitles") {
          subtitleCount++;
          }
          }
          if (t.options.toggleCaptionsButtonWhenOnlyOne && subtitleCount == 1) {
          player.captionsButton.on("click", function() {
                                   if (player.selectedTrack == null) {
                                   var lang = player.tracks[0].srclang;
                                   } else {
                                   var lang = "none";
                                   }
                                   player.setTrack(lang);
                                   });
          } else {
          player.captionsButton.hover(function() {
                                      $(this).find(".mejs-captions-selector").css("visibility", "visible");
                                      }, function() {
                                      $(this).find(".mejs-captions-selector").css("visibility", "hidden");
                                      }).on("click", "input[type=radio]", function() {
                                            lang = this.value;
                                            player.setTrack(lang);
                                            });
          }
          if (!player.options.alwaysShowControls) {
          player.container.bind("controlsshown", function() {
                                player.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover");
                                }).bind("controlshidden", function() {
                                        if (!media.paused) {
                                        player.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover");
                                        }
                                        });
          } else {
          player.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover");
          }
          player.trackToLoad = -1;
          player.selectedTrack = null;
          player.isLoadingTrack = false;
          for (i = 0; i < player.tracks.length; i++) {
          if (player.tracks[i].kind == "subtitles") {
          player.addTrackButton(player.tracks[i].srclang, player.tracks[i].label);
          }
          }
          player.loadNextTrack();
          media.addEventListener("timeupdate", function(e) {
                                 player.displayCaptions();
                                 }, false);
          if (player.options.slidesSelector != "") {
          player.slidesContainer = $(player.options.slidesSelector);
          media.addEventListener("timeupdate", function(e) {
                                 player.displaySlides();
                                 }, false);
          }
          media.addEventListener("loadedmetadata", function(e) {
                                 player.displayChapters();
                                 }, false);
          player.container.hover(function() {
                                 if (player.hasChapters) {
                                 player.chapters.css("visibility", "visible");
                                 player.chapters.fadeIn(200).height(player.chapters.find(".mejs-chapter").outerHeight());
                                 }
                                 }, function() {
                                 if (player.hasChapters && !media.paused) {
                                 player.chapters.fadeOut(200, function() {
                                                         $(this).css("visibility", "hidden");
                                                         $(this).css("display", "block");
                                                         });
                                 }
                                 });
          if (player.node.getAttribute("autoplay") !== null) {
          player.chapters.css("visibility", "hidden");
          }
          },
          setTrack: function(lang) {
          var t = this,
          i;
          if (lang == "none") {
          t.selectedTrack = null;
          t.captionsButton.removeClass("mejs-captions-enabled");
          } else {
          for (i = 0; i < t.tracks.length; i++) {
          if (t.tracks[i].srclang == lang) {
          if (t.selectedTrack == null) {
          t.captionsButton.addClass("mejs-captions-enabled");
          }
          t.selectedTrack = t.tracks[i];
          t.captions.attr("lang", t.selectedTrack.srclang);
          t.displayCaptions();
          break;
          }
          }
          }
          },
          loadNextTrack: function() {
          var t = this;
          t.trackToLoad++;
          if (t.trackToLoad < t.tracks.length) {
          t.isLoadingTrack = true;
          t.loadTrack(t.trackToLoad);
          } else {
          t.isLoadingTrack = false;
          t.checkForTracks();
          }
          },
          loadTrack: function(index) {
          var t = this,
          track = t.tracks[index],
          after = function() {
          track.isLoaded = true;
          t.enableTrackButton(track.srclang, track.label);
          t.loadNextTrack();
          };
          $.ajax({
                 url: track.src,
                 dataType: "text",
                 success: function(d) {
                 if (typeof d == "string" && (/<tt\s+xml/ig).exec(d)) {
                 track.entries = mejs.TrackFormatParser.dfxp.parse(d);
                 } else {
                 track.entries = mejs.TrackFormatParser.webvvt.parse(d);
                 }
                 after();
                 if (track.kind == "chapters") {
                 t.media.addEventListener("play", function(e) {
                                          if (t.media.duration > 0) {
                                          t.displayChapters(track);
                                          }
                                          }, false);
                 }
                 if (track.kind == "slides") {
                 t.setupSlides(track);
                 }
                 },
                 error: function() {
                 t.loadNextTrack();
                 }
                 });
          },
          enableTrackButton: function(lang, label) {
          var t = this;
          if (label === "") {
          label = mejs.language.codes[lang] || lang;
          }
          t.captionsButton.find("input[value=" + lang + "]").prop("disabled", false).siblings("label").html(label);
          if (t.options.startLanguage == lang) {
          $("#" + t.id + "_captions_" + lang).click();
          }
          t.adjustLanguageBox();
          },
          addTrackButton: function(lang, label) {
          var t = this;
          if (label === "") {
          label = mejs.language.codes[lang] || lang;
          }
          t.captionsButton.find("ul").append($('<li><input type="radio" name="' + t.id + '_captions" id="' + t.id + "_captions_" + lang + '" value="' + lang + '" disabled="disabled" /><label for="' + t.id + "_captions_" + lang + '">' + label + " (loading)</label></li>"));
          t.adjustLanguageBox();
          t.container.find(".mejs-captions-translations option[value=" + lang + "]").remove();
          },
          adjustLanguageBox: function() {
          var t = this;
          t.captionsButton.find(".mejs-captions-selector").height(t.captionsButton.find(".mejs-captions-selector ul").outerHeight(true) + t.captionsButton.find(".mejs-captions-translations").outerHeight(true));
          },
          checkForTracks: function() {
          var t = this,
          hasSubtitles = false;
          if (t.options.hideCaptionsButtonWhenEmpty) {
          for (i = 0; i < t.tracks.length; i++) {
          if (t.tracks[i].kind == "subtitles") {
          hasSubtitles = true;
          break;
          }
          }
          if (!hasSubtitles) {
          t.captionsButton.hide();
          t.setControlsSize();
          }
          }
          },
          displayCaptions: function() {
          if (typeof this.tracks == "undefined") {
          return;
          }
          var t = this,
          i, track = t.selectedTrack;
          if (track != null && track.isLoaded) {
          for (i = 0; i < track.entries.times.length; i++) {
          if (t.media.currentTime >= track.entries.times[i].start && t.media.currentTime <= track.entries.times[i].stop) {
          t.captionsText.html(track.entries.text[i]);
          t.captions.show().height(0);
          return;
          }
          }
          t.captions.hide();
          } else {
          t.captions.hide();
          }
          },
          setupSlides: function(track) {
          var t = this;
          t.slides = track;
          t.slides.entries.imgs = [t.slides.entries.text.length];
          t.showSlide(0);
          },
          showSlide: function(index) {
          if (typeof this.tracks == "undefined" || typeof this.slidesContainer == "undefined") {
          return;
          }
          var t = this,
          url = t.slides.entries.text[index],
          img = t.slides.entries.imgs[index];
          if (typeof img == "undefined" || typeof img.fadeIn == "undefined") {
          t.slides.entries.imgs[index] = img = $('<img src="' + url + '">').on("load", function() {
                                                                               img.appendTo(t.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut();
                                                                               });
          } else {
          if (!img.is(":visible") && !img.is(":animated")) {
          img.fadeIn().siblings(":visible").fadeOut();
          }
          }
          },
          displaySlides: function() {
          if (typeof this.slides == "undefined") {
          return;
          }
          var t = this,
          slides = t.slides,
          i;
          for (i = 0; i < slides.entries.times.length; i++) {
          if (t.media.currentTime >= slides.entries.times[i].start && t.media.currentTime <= slides.entries.times[i].stop) {
          t.showSlide(i);
          return;
          }
          }
          },
          displayChapters: function() {
          var t = this,
          i;
          for (i = 0; i < t.tracks.length; i++) {
          if (t.tracks[i].kind == "chapters" && t.tracks[i].isLoaded) {
          t.drawChapters(t.tracks[i]);
          t.hasChapters = true;
          break;
          }
          }
          },
          drawChapters: function(chapters) {
          var t = this,
          i, dur, percent = 0,
          usedPercent = 0;
          t.chapters.empty();
          for (i = 0; i < chapters.entries.times.length; i++) {
          dur = chapters.entries.times[i].stop - chapters.entries.times[i].start;
          percent = Math.floor(dur / t.media.duration * 100);
          if (percent + usedPercent > 100 || i == chapters.entries.times.length - 1 && percent + usedPercent < 100) {
          percent = 100 - usedPercent;
          }
          t.chapters.append($('<div class="mejs-chapter" rel="' + chapters.entries.times[i].start + '" style="left: ' + usedPercent.toString() + "%;width: " + percent.toString() + '%;"><div class="mejs-chapter-block' + ((i == chapters.entries.times.length - 1) ? " mejs-chapter-block-last" : "") + '"><span class="ch-title">' + chapters.entries.text[i] + '</span><span class="ch-time">' + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].start) + "&ndash;" + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].stop) + "</span></div></div>"));
          usedPercent += percent;
          }
          t.chapters.find("div.mejs-chapter").click(function() {
                                                    t.media.setCurrentTime(parseFloat($(this).attr("rel")));
                                                    if (t.media.paused) {
                                                    t.media.play();
                                                    }
                                                    });
          t.chapters.show();
          }
          });
 mejs.language = {
 codes: {
 af: "Afrikaans",
 sq: "Albanian",
 ar: "Arabic",
 be: "Belarusian",
 bg: "Bulgarian",
 ca: "Catalan",
 zh: "Chinese",
 "zh-cn": "Chinese Simplified",
 "zh-tw": "Chinese Traditional",
 hr: "Croatian",
 cs: "Czech",
 da: "Danish",
 nl: "Dutch",
 en: "English",
 et: "Estonian",
 tl: "Filipino",
 fi: "Finnish",
 fr: "French",
 gl: "Galician",
 de: "German",
 el: "Greek",
 ht: "Haitian Creole",
 iw: "Hebrew",
 hi: "Hindi",
 hu: "Hungarian",
 is: "Icelandic",
 id: "Indonesian",
 ga: "Irish",
 it: "Italian",
 ja: "Japanese",
 ko: "Korean",
 lv: "Latvian",
 lt: "Lithuanian",
 mk: "Macedonian",
 ms: "Malay",
 mt: "Maltese",
 no: "Norwegian",
 fa: "Persian",
 pl: "Polish",
 pt: "Portuguese",
 ro: "Romanian",
 ru: "Russian",
 sr: "Serbian",
 sk: "Slovak",
 sl: "Slovenian",
 es: "Spanish",
 sw: "Swahili",
 sv: "Swedish",
 tl: "Tagalog",
 th: "Thai",
 tr: "Turkish",
 uk: "Ukrainian",
 vi: "Vietnamese",
 cy: "Welsh",
 yi: "Yiddish"
 }
 };
 mejs.TrackFormatParser = {
 webvvt: {
 pattern_identifier: /^([a-zA-z]+-)?[0-9]+$/,
 pattern_timecode: /^([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
 parse: function(trackText) {
 var i = 0,
 lines = mejs.TrackFormatParser.split2(trackText, /\r?\n/),
 entries = {
 text: [],
 times: []
 },
 timecode, text;
 for (; i < lines.length; i++) {
 if (this.pattern_identifier.exec(lines[i])) {
 i++;
 timecode = this.pattern_timecode.exec(lines[i]);
 if (timecode && i < lines.length) {
 i++;
 text = lines[i];
 i++;
 while (lines[i] !== "" && i < lines.length) {
 text = text + "\n" + lines[i];
 i++;
 }
 text = $.trim(text).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
 entries.text.push(text);
 entries.times.push({
                    start: (mejs.Utility.convertSMPTEtoSeconds(timecode[1]) == 0) ? 0.2 : mejs.Utility.convertSMPTEtoSeconds(timecode[1]),
                    stop: mejs.Utility.convertSMPTEtoSeconds(timecode[3]),
                    settings: timecode[5]
                    });
 }
 }
 }
 return entries;
 }
 },
 dfxp: {
 parse: function(trackText) {
 trackText = $(trackText).filter("tt");
 var i = 0,
 container = trackText.children("div").eq(0),
 lines = container.find("p"),
 styleNode = trackText.find("#" + container.attr("style")),
 styles, begin, end, text, entries = {
 text: [],
 times: []
 };
 if (styleNode.length) {
 var attributes = styleNode.removeAttr("id").get(0).attributes;
 if (attributes.length) {
 styles = {};
 for (i = 0; i < attributes.length; i++) {
 styles[attributes[i].name.split(":")[1]] = attributes[i].value;
 }
 }
 }
 for (i = 0; i < lines.length; i++) {
 var style;
 var _temp_times = {
 start: null,
 stop: null,
 style: null
 };
 if (lines.eq(i).attr("begin")) {
 _temp_times.start = mejs.Utility.convertSMPTEtoSeconds(lines.eq(i).attr("begin"));
 }
 if (!_temp_times.start && lines.eq(i - 1).attr("end")) {
 _temp_times.start = mejs.Utility.convertSMPTEtoSeconds(lines.eq(i - 1).attr("end"));
 }
 if (lines.eq(i).attr("end")) {
 _temp_times.stop = mejs.Utility.convertSMPTEtoSeconds(lines.eq(i).attr("end"));
 }
 if (!_temp_times.stop && lines.eq(i + 1).attr("begin")) {
 _temp_times.stop = mejs.Utility.convertSMPTEtoSeconds(lines.eq(i + 1).attr("begin"));
 }
 if (styles) {
 style = "";
 for (var _style in styles) {
 style += _style + ":" + styles[_style] + ";";
 }
 }
 if (style) {
 _temp_times.style = style;
 }
 if (_temp_times.start == 0) {
 _temp_times.start = 0.2;
 }
 entries.times.push(_temp_times);
 text = $.trim(lines.eq(i).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>");
 entries.text.push(text);
 if (entries.times.start == 0) {
 entries.times.start = 2;
 }
 }
 return entries;
 }
 },
 split2: function(text, regex) {
 return text.split(regex);
 }
 };
 if ("x\n\ny".split(/\n/gi).length != 3) {
 mejs.TrackFormatParser.split2 = function(text, regex) {
 var parts = [],
 chunk = "",
 i;
 for (i = 0; i < text.length; i++) {
 chunk += text.substring(i, i + 1);
 if (regex.test(chunk)) {
 parts.push(chunk.replace(regex, ""));
 chunk = "";
 }
 }
 parts.push(chunk);
 return parts;
 };
 }
 })(mejs.$);
(function($) {
 $.extend(mejs.MepDefaults, {
          contextMenuItems: [{
                             render: function(player) {
                             if (typeof player.enterFullScreen == "undefined") {
                             return null;
                             }
                             if (player.isFullScreen) {
                             return mejs.i18n.t("Turn off Fullscreen");
                             } else {
                             return mejs.i18n.t("Go Fullscreen");
                             }
                             },
                             click: function(player) {
                             if (player.isFullScreen) {
                             player.exitFullScreen();
                             } else {
                             player.enterFullScreen();
                             }
                             }
                             }, {
                             render: function(player) {
                             if (player.media.muted) {
                             return mejs.i18n.t("Unmute");
                             } else {
                             return mejs.i18n.t("Mute");
                             }
                             },
                             click: function(player) {
                             if (player.media.muted) {
                             player.setMuted(false);
                             } else {
                             player.setMuted(true);
                             }
                             }
                             }, {
                             isSeparator: true
                             }, {
                             render: function(player) {
                             return mejs.i18n.t("Download Video");
                             },
                             click: function(player) {
                             window.location.href = player.media.currentSrc;
                             }
                             }]
          });
 $.extend(MediaElementPlayer.prototype, {
          buildcontextmenu: function(player, controls, layers, media) {
          player.contextMenu = $('<div class="mejs-contextmenu"></div>').appendTo($("body")).hide();
          player.container.bind("contextmenu", function(e) {
                                if (player.isContextMenuEnabled) {
                                e.preventDefault();
                                player.renderContextMenu(e.clientX - 1, e.clientY - 1);
                                return false;
                                }
                                });
          player.container.bind("click", function() {
                                player.contextMenu.hide();
                                });
          player.contextMenu.bind("mouseleave", function() {
                                  player.startContextMenuTimer();
                                  });
          },
          cleancontextmenu: function(player) {
          player.contextMenu.remove();
          },
          isContextMenuEnabled: true,
          enableContextMenu: function() {
          this.isContextMenuEnabled = true;
          },
          disableContextMenu: function() {
          this.isContextMenuEnabled = false;
          },
          contextMenuTimeout: null,
          startContextMenuTimer: function() {
          var t = this;
          t.killContextMenuTimer();
          t.contextMenuTimer = setTimeout(function() {
                                          t.hideContextMenu();
                                          t.killContextMenuTimer();
                                          }, 750);
          },
          killContextMenuTimer: function() {
          var timer = this.contextMenuTimer;
          if (timer != null) {
          clearTimeout(timer);
          delete timer;
          timer = null;
          }
          },
          hideContextMenu: function() {
          this.contextMenu.hide();
          },
          renderContextMenu: function(x, y) {
          var t = this,
          html = "",
          items = t.options.contextMenuItems;
          for (var i = 0, il = items.length; i < il; i++) {
          if (items[i].isSeparator) {
          html += '<div class="mejs-contextmenu-separator"></div>';
          } else {
          var rendered = items[i].render(t);
          if (rendered != null) {
          html += '<div class="mejs-contextmenu-item" data-itemindex="' + i + '" id="element-' + (Math.random() * 1000000) + '">' + rendered + "</div>";
          }
          }
          }
          t.contextMenu.empty().append($(html)).css({
                                                    top: y,
                                                    left: x
                                                    }).show();
          t.contextMenu.find(".mejs-contextmenu-item").each(function() {
                                                            var $dom = $(this),
                                                            itemIndex = parseInt($dom.data("itemindex"), 10),
                                                            item = t.options.contextMenuItems[itemIndex];
                                                            if (typeof item.show != "undefined") {
                                                            item.show($dom, t);
                                                            }
                                                            $dom.click(function() {
                                                                       if (typeof item.click != "undefined") {
                                                                       item.click(t);
                                                                       }
                                                                       t.contextMenu.hide();
                                                                       });
                                                            });
          setTimeout(function() {
                     t.killControlsTimer("rev3");
                     }, 100);
          }
          });
 })(mejs.$);
(function($) {
 $.extend(mejs.MepDefaults, {
          postrollCloseText: mejs.i18n.t("Close")
          });
 $.extend(MediaElementPlayer.prototype, {
          buildpostroll: function(player, controls, layers, media) {
          var t = this,
          postrollLink = t.container.find('link[rel="postroll"]').attr("href");
          if (typeof postrollLink !== "undefined") {
          player.postroll = $('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' + t.options.postrollCloseText + '</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(layers).hide();
          t.media.addEventListener("ended", function(e) {
                                   $.ajax({
                                          dataType: "html",
                                          url: postrollLink,
                                          success: function(data, textStatus) {
                                          layers.find(".mejs-postroll-layer-content").html(data);
                                          }
                                          });
                                   player.postroll.show();
                                   }, false);
          }
          }
          });
 })(mejs.$);