var webStorageSupported = ("localStorage" in window) && window.localStorage !== null;
var isIosDevice = true;
var searchIssues;
var podcastFile = "podcasts.xml";
var podcastxml = "";
var _dbPodcastDB = window.localStorage;
var _filesPodcasts = "PodcastItems";
var _filesVideoCategories = "VideoCategoryItems";
var _filesAudioCategories = "AudioCategoryItems";
var _filesPlaylists = "UserPlaylists";
var _fileseClasses = "EClasses";
var downloadfiles = new Array();
var itemsDownloading = 0;
var Configs = function() {
    try {
        if (device.name == "iOS") {
            isIosDevice = true;
        }
        this.init();
    } catch (e) {
        errorHandler("Configs", e);
    }
};
Configs.prototype = {
init: function() {
    var that = this;
    that.configs = {
    AppSettings: [],
    CustomSettings: []
    };
    $.ajax({
           type: "GET",
           url: "resources/eteacherconfig.xml",
           dataType: "xml",
           cache: true,
           async: false,
           beforeSend: function(xhr) {
           if (xhr.overrideMimeType) {
           xhr.overrideMimeType("text/xml");
           }
           },
           success: function(data) {
           this.parseConfig(data, that.configs);
           },
           parseConfig: function(data, configs) {
           that = this;
           $(data).find("settings").each(function() {
                                         var id_text = $(this).attr("id");
                                         if (id_text == "app") {
                                         $(this).find("item").each(function() {
                                                                   configs.AppSettings[$(this).find("const").text()] = $(this).find("value").text();
                                                                   });
                                         } else {
                                         $(this).find("item").each(function() {
                                                                   configs.CustomSettings[$(this).find("const").text()] = $(this).find("value").text();
                                                                   });
                                         }
                                         });
           },
           error: function(xhr, textStatus, errorThrown) {
           if (textStatus == "parsererror" || textStatus == "OK") {
           var resp = xhr.responseText;
           try {
           if (window.DOMParser) {
           parser = new DOMParser();
           doc = parser.parseFromString(resp, "text/xml");
           } else {
           doc = new ActiveXObject("Microsoft.XMLDOM");
           doc.async = "false";
           doc.loadXML(resp);
           }
           if (doc != undefined) {
           this.parseConfig(doc, that.configs);
           }
           } catch (e) {
           errorHandler("getting configuration", e);
           }
           } else {}
           }
           });
},
getApp: function(item) {
    var s = this.configs.AppSettings[item];
    return s;
},
getCustom: function(item) {
    var s = this.configs.CustomSettings[item];
    return s;
}
};
var Users = function() {
    try {
        this.init();
    } catch (e) {
        errorHandler("Users", e);
    }
};
Users.prototype = {
init: function() {
    try {
        this.loadUsers();
    } catch (e) {
        errorHandler("Users.init", e);
    }
},
loadUsers: function() {
    try {
        this.users = [];
        if (webStorageSupported) {
            var username = localStorage.getItem("ETP_USERNAME");
            if (username != null && username != undefined) {
                if (username.length > 0) {
                    var requireslogin = localStorage.getItem("ETP_REQUIRESLOGIN");
                    var pwdhash = localStorage.getItem("ETP_PWDHASH");
                    var userId = localStorage.getItem("ETP_USERID");
                    var remember = localStorage.getItem("ETP_REMEMBERME");
                    var saved = localStorage.getItem("ETP_SAVEDPOSITION");
                    var startuppage = localStorage.getItem("ETP_STARTUPPAGE");
                    var hascourses = localStorage.getItem("ETP_HASCOURSES");
                    var hasvideos = localStorage.getItem("ETP_HASVIDEOS");
                    var hasaudio = localStorage.getItem("ETP_HASAUDIO");
                    var savedmedia = localStorage.getItem("ETP_SAVEDMEDIAPOSITION");
					var hasTermsConditionsAgreed = localStorage.getItem("ETP_HASTERMSCONDITIONSAGREED");
                    var savedPosition = {};
                    var savedMediaPosition = {};
                    if (saved != undefined && saved != "") {
                        var ids = saved.split("-");
                        savedPosition.courseid = ids[0] == undefined ? 0 : ids[0];
                        savedPosition.modulegroupid = ids[1] == undefined ? 0 : ids[1];
                        savedPosition.moduleid = ids[2] == undefined ? 0 : ids[2];
                        savedPosition.sectionid = ids[3] == undefined ? 0 : ids[3];
                        savedPosition.assetid = ids[4] == undefined ? 0 : ids[4];
                        savedPosition.pageid = ids[5] == undefined ? "" : ids[5];
                        savedPosition.issuetab = ids[6] == undefined ? "" : ids[6];
                        savedPosition.issueid = ids[7] == undefined ? "" : ids[7];
                        savedPosition.nodekey = ids[8] == undefined ? "" : ids[8];
                    }
                    if (savedmedia != undefined && savedmedia != "") {
                        var mediaids = savedmedia.split("-");
                        savedMediaPosition.tabname = mediaids[0] == undefined ? "" : mediaids[0];
                        savedMediaPosition.tabid = mediaids[2] == undefined ? "" : mediaids[1];
                        savedMediaPosition.categoryid = mediaids[3] == undefined ? "" : mediaids[2];
                        savedMediaPosition.itemid = mediaids[4] == undefined ? "" : mediaids[3];
                    }
                    var user = new User();
                    user.requireslogin = (requireslogin === "true" || requireslogin === true) ? true : false;
                    user.username = username;
                    user.pwdHash = pwdhash;
                    user.userId = parseInt(userId, 10);
                    user.rememberPassword = (remember === "true" || remember === true) ? true : false;
                    user.savedPosition = savedPosition;
                    user.savedMediaPosition = savedMediaPosition;
                    user.startuppage = startuppage;
                    user.hascourses = (hascourses === "true" || hascourses === true) ? true : false;
                    user.hasvideos = (hasvideos === "true" || hasvideos === true) ? true : false;
                    user.hasaudio = (hasaudio === "true" || hasaudio === true) ? true : false;
					user.hasTermsConditionsAgreed = (hasTermsConditionsAgreed === "true" || hasTermsConditionsAgreed === true) ? true : false;
                    this.users.push(user);
                }
            }
        }
    } catch (e) {
        errorHandler("Users.loadUsers", e);
    }
},
save: function(user) {
    try {
        if (user.requireslogin == undefined) {
            user.requireslogin = true;
        }
        if (user.username == undefined) {
            user.username = "";
        }
        if (user.pwdHash == undefined) {
            user.pwdHash = "";
        }
        if (user.rememberPassword == undefined) {
            user.rememberPassword = true;
        }
        if (user.userId == undefined) {
            user.userId = 0;
        }
        if (user.startuppage == undefined) {
            user.startuppage = "";
        }
        if (user.hascourses == undefined) {
            user.hascourses = true;
        }
        if (user.hascourses === false && userHasCourses === true) {
            user.hascourses = true;
        }
        if (user.hasvideos == undefined) {
            user.hasvideos = false;
        }
        if (user.hasaudio == undefined) {
            user.hasaudio = false;
        }
		if (user.hasTermsConditionsAgreed == undefined) {
            user.hasTermsConditionsAgreed = false;
        }
        var savedPosition, savedMediaPosition;
        if (user.savedPosition == undefined) {
            savedPosition = "";
        } else {
            savedPosition = user.savedPosition.courseid + "-" + user.savedPosition.modulegroupid + "-" + user.savedPosition.moduleid + "-" + user.savedPosition.sectionid + "-" + user.savedPosition.assetid + "-" + user.savedPosition.pageid + "-" + user.savedPosition.issuetab + "-" + user.savedPosition.issueid + "-" + user.savedPosition.nodekey;
        }
        if (user.savedMediaPosition == undefined) {
            savedMediaPosition = "";
        } else {
            savedMediaPosition = user.savedMediaPosition.tabname + "-" + user.savedMediaPosition.tabid + "-" + user.savedMediaPosition.categoryid + "-" + user.savedMediaPosition.itemid;
        }
        if (webStorageSupported) {
            localStorage.setItem("ETP_REQUIRESLOGIN", user.requireslogin);
            localStorage.setItem("ETP_USERNAME", user.username);
            localStorage.setItem("ETP_PWDHASH", user.pwdHash);
            localStorage.setItem("ETP_USERID", user.userId);
            localStorage.setItem("ETP_REMEMBERME", user.rememberPassword);
            localStorage.setItem("ETP_SAVEDPOSITION", savedPosition);
            localStorage.setItem("ETP_SAVEDMEDIAPOSITION", savedMediaPosition);
            localStorage.setItem("ETP_STARTUPPAGE", user.startuppage);
            localStorage.setItem("ETP_HASCOURSES", user.hascourses);
            localStorage.setItem("ETP_HASVIDEOS", user.hasvideos);
            localStorage.setItem("ETP_HASAUDIO", user.hasaudio);
			localStorage.setItem("ETP_HASTERMSCONDITIONSAGREED", user.hasTermsConditionsAgreed);
        }
        if(user.userId !== undefined && user.userId > 0){
            var databaseName = "eteacherDB_" + user.userId;
            this.userDB = window.openDatabase(databaseName,"1.0", databaseName, 200000);
        }
    } catch (e) {
        errorHandler("Users.save", e);
    }
},
count: function() {
    try {
        return this.users.length;
    } catch (e) {
        errorHandler("Users.count", e);
        return 0;
    }
},
getUser: function() {
    try {
        if (this.users[0] == undefined) {
            return new User();
        } else {
            return this.users[0];
        }
    } catch (e) {
        errorHandler("Users.getUser", e);
        return 0;
    }
},
deleteUser: function(deleteUser) {
    try {
        if (this.users[0] == undefined) {
            this.users = [];
        }
        return 0;
    } catch (e) {
        errorHandler("Users.deleteUser", e);
        return 0;
    }
}
};
var User = function(requireslogin, username, pwdHash, userId, remember, savedPosition, startuppage, hascourses, hasvideos, hasaudio, savedMediaPosition, hasTermsConditionsAgreed) {
    try {
        this.init();
    } catch (e) {
        errorHandler("User", e);
    }
};
User.prototype = {
init: function(requireslogin, username, pwdHash, userId, remember, savedPosition, startuppage, hascourses, hasvideos, hasaudio, savedMediaPosition, hasTermsConditionsAgreed) {
    try {
        if (requireslogin == undefined) {
            requireslogin = true;
        }
        if (username == undefined) {
            username = "";
        }
        if (pwdHash == undefined) {
            pwdHash = "";
        }
        if (remember == undefined) {
            remember = true;
        }
        if (savedPosition == undefined) {
            savedPosition = {};
        }
        if (savedMediaPosition == undefined) {
            savedMediaPosition = {};
        }
        if (userId == undefined) {
            userId = 0;
        }
        if (startuppage == undefined) {
            startuppage = "";
        }
        if (hascourses == undefined) {
            hascourses = true;
        }
        if (hasvideos == undefined) {
            hasvideos = false;
        }
        if (hasaudio === undefined) {
            hasaudio = false;
        }
		if (hasTermsConditionsAgreed == undefined) {
            hasTermsConditionsAgreed = false;
        }
        this.username = username;
        this.pwdHash = pwdHash;
        this.userId = userId;
        this.numUnreadLetters = 0;
        this.rememberPassword = remember;
        this.requireslogin = requireslogin;
        this.language = "English";
        this.startuppage = startuppage;
        this.savedPosition = savedPosition;
        this.savedMediaPosition = savedMediaPosition;
        this.hascourses = hascourses;
        this.hasvideos = hasvideos;
        this.hasaudio = hasaudio;
		this.hasTermsConditionsAgreed = hasTermsConditionsAgreed;
        this.issues = new Array();
        this.helpdeskcategories = new Array();
        this.podcasts = new Array();
        this.userplaylists = new Array();
        this.eclasses = new Array();
        this.videocategories = new Array();
        this.audiocategories = new Array();
        this._filesPodcasts = _filesPodcasts;
        this._filesPlaylists = _filesPlaylists;
        this._filesVideoCategories = _filesVideoCategories;
        this._filesAudioCategories = _filesAudioCategories;
        this._fileseClasses = _fileseClasses;
        var databaseName = "eteacherDB_" + userId;
        this.userDB = window.openDatabase(databaseName,"1.0", databaseName, 200000);
        this.userDB.transaction(populateDB, errorDB, successDB);
        this.existPods = new Array();
        this.existVids = new Array();
        this.existeClasses = new Array();
        this.existAuds = new Array();
        this.existPlaylists = new Array();
        return this;
    } catch (e) {
        errorHandler("User.init", e);
    }
},
saveFilesList: function(filesList, mediaType, saveExisting, returnFunction) {
    try {
        var filesTable = "";
        if (mediaType === "podcasts") {
            filesTable = this._filesPodcasts;
        } else if (mediaType === "videocategories") {
            filesTable = this._filesVideoCategories;
        } else if (mediaType === "audiocategories") {
            filesTable = this._filesAudioCategories;
        } else if (mediaType === "userplaylists") {
            filesTable = this._filesPlaylists;
        } else if (mediaType === "eclasses"){
            filesTable = this._fileseClasses;
            
        }
        if (filesList === undefined) {
            if (mediaType === "podcasts") {
                filesList = this.podcasts;
            } else if (mediaType === "videocategories") {
                filesList = this.videocategories;
            } else if (mediaType === "audiocategories") {
                filesList = this.audiocategories;
            } else if (mediaType === "userplaylists") {
                filesList = this.userplaylists;
            } else if (mediaType === "eclasses"){
                filesList =  this.eclasses;            }
        }
        
        if (filesTable.length > 0) {
            setLocalStorage(filesTable, filesList, saveExisting, function(){
                            if (mediaType === "podcasts") {
                            this.podcasts = filesList;
                            } else if (mediaType === "videocategories") {
                            this.videocategories = filesList;
                            } else  if (mediaType === "audiocategories") {
                            this.audiocategories = filesList;
                            } else  if (mediaType === "userplaylists") {
                            this.userplaylists = filesList;
                            } else  if (mediaType === "eclasses") {
                            this.eclasses = filesList;
                            }
                            });
        }
        returnFunction(true);
    } catch (e) {
        errorHandler("User.saveFilesList", e);
        returnFunction(false);
    }
},
getUserDatabaseList: function() {
    this._filesPodcasts = _filesPodcasts;
    this._filesPlaylists = _filesPlaylists;
    this._filesVideoCategories = _filesVideoCategories;
    this._filesAudioCategories = _filesAudioCategories;
    this._fileseClasses = _fileseClasses;
},
getStoredFilesListAsync: function(mediaType, resetDownload, returnFunction) {
    try {
        var filesTable = "";
        var foundFiles = false;
        if (mediaType === "podcasts") {
            filesTable = this._filesPodcasts;
        } else  if (mediaType === "videocategories") {
            filesTable = this._filesVideoCategories;
        } else  if (mediaType === "audiocategories") {
            filesTable = this._filesAudioCategories;
        } else  if (mediaType === "userplaylists") {
            filesTable = this._filesPlaylists;
        } else  if (mediaType === "eclasses") {
            filesTable = this._fileseClasses;
        }
        // RESETDOWNLOAD WHEN OFFLINE
        if(deviceIsOnline===false){resetDownload=false;}
        if (resetDownload === false  || useExistingMedia===true) {
            if (mediaType === "podcasts" && this.podcasts.length > 0) {
                foundFiles = true;
            } else  if (mediaType === "videocategories" && this.videocategories.length > 0) {
                foundFiles = true;
            } else if (mediaType === "audiocategories" && this.audiocategories.length > 0) {
                foundFiles = true;
            } else if (mediaType === "userplaylists" && this.userplaylists.length > 0) {
                foundFiles = true;
            } else if (mediaType === "eclasses" && this.eclasses.length > 0) {
                foundFiles = true;
            }
            
        }
        if (foundFiles === false && filesTable.length > 0 && resetDownload === false) {
            var retrievedObject;
            var retrievedStr = "";
            getLocalStorage(filesTable, function(data) {
                            if (data !== undefined && data !== null) {
                            retrievedStr = data;
                            if (retrievedStr.length > 10) {
                            retrievedObject = JSON.parse(retrievedStr);
                            if (retrievedObject != undefined) {
                            if (mediaType === "podcasts") {
                            activeUser.setStoredPodcasts(retrievedObject, resetDownload,
                                                         function(ret) {
                                                         activeUser.resetPodcastsDownloadsFiles(function(saved) {
                                                                                                if (resetDownload === true && deviceIsOnline === true) {
                                                                                                returnFunction(false);
                                                                                                } else {
                                                                                                returnFunction(true);
                                                                                                }
                                                                                                });
                                                         });
                            } else if (mediaType === "audiocategories") {
                            activeUser.setStoredAudios(retrievedObject, resetDownload,
                                                       function(ret) {
                                                       activeUser.resetAudioDownloadsFiles(function(saved) {
                                                                                           if (resetDownload === true && deviceIsOnline === true) {
                                                                                           returnFunction(false);
                                                                                           }else{
                                                                                           returnFunction(true);
                                                                                           }
                                                                                           });
                                                       });
                            } else if (mediaType === "videocategories") {
                            activeUser.setStoredVideos(retrievedObject, resetDownload, videoLibraryID, function(ret) {
                                                       activeUser.resetVideoDownloadsFiles(videoLibraryID, function(saved) {
                                                                                           
                                                                                           if (resetDownload === true && deviceIsOnline === true) {
                                                                                           returnFunction(false);
                                                                                           }else{
                                                                                           returnFunction(true);
                                                                                           }
                                                                                           });
                                                       });
                            } else if (mediaType === "eclasses") {
                            activeUser.setStoredVideos(retrievedObject, resetDownload, eClassLibraryID,
                                                       function(ret) {
                                                       activeUser.resetVideoDownloadsFiles(eClassLibraryID, function(saved) {
                                                                                           if (resetDownload === true && deviceIsOnline === true) {
                                                                                           returnFunction(false);
                                                                                           }else{
                                                                                           returnFunction(true);
                                                                                           }
                                                                                           });
                                                       });
                            } else if (mediaType === "userplaylists") {
                            
                            activeUser.setStoredPlaylists(retrievedObject, resetDownload,
                                                          function(ret) {
                                                          activeUser.resetPlaylistsDownloadsFiles(function(saved) {
                                                                                                  if (resetDownload === true && deviceIsOnline === true) {
                                                                                                  returnFunction(false);
                                                                                                  }else{
                                                                                                  returnFunction(true);
                                                                                                  }
                                                                                                  });
                                                          });
                            
                            }
                            } else {
                            returnFunction(false);
                            }
                            } else {
                            returnFunction(false);
                            }
                            } else {
                            if (deviceIsOnline === false) {
                            msgStr = resources.refreshmedia;
                            msgTitle = resources.connError;
                            msgBtnValue = resources.btnOk;
                            navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                            }
                            returnFunction(false);
                            }
                            });
        } else {
            returnFunction(foundFiles);
        }
    } catch (e) {
        errorHandler("User.getStoredFilesList", e);
        returnFunction(false);
    }
},
setStoredPodcasts: function(retrievedObject, resetDownload, returnFunction) {
    try {
        if (retrievedObject != undefined) {
            this.podcasts = new Array();
            for (var i = 0; i < retrievedObject.length; i++) {
                var item = retrievedObject[i];
                var newPodcast = new Podcast(item.id, item.courseid, item.moduleid, item.coursetitle, item.moduletitle, item.thumbnail, item.alldownloaded, item.haspdf, item.isdefaultthumbnail, item.localthumbnail, item.itemcount);
                this.podcasts.push(newPodcast);
                newPodcast.items = [];
                if (item.items != undefined) {
                    for (var x = 0; x < item.items.length; x++) {
                        var podItem = item.items[x];
                        var podcastItem = new PodcastItem(podItem.podcastid, podItem.id, podItem.link, podItem.title, podItem.type, podItem.length, podItem.isdownloaded, podItem.fileuri, podItem.filename, podItem.downloading, podItem.index);
                        newPodcast.items.push(podcastItem);
                    }
                }
            }
            setLocalStorage(this._filesPodcasts, this.podcasts, true, function(){});
            returnFunction(true);
        } else {
            returnFunction(false);
        }
    } catch (e) {
        errorHandler("User.setStoredPodcasts", e);
        returnFunction(false);
    }
},
setStoredPlaylists: function(retrievedObject, resetDownload, returnFunction) {
    try {
        if (retrievedObject != undefined) {
            this.userplaylists = new Array();
            for (var i = 0; i < retrievedObject.length; i++) {
                var item = retrievedObject[i];
                var newPlaylist = new UserPlaylist(item.userplaylistid, item.title, item.audiocount, item.vieworder, item.thumbnail, item.alldownloaded, item.localthumbnail, item.updatepending, false, 0);
                this.userplaylists.push(newPlaylist);
                newPlaylist.playlistitems = [];
                if (item.playlistitems != undefined) {
                    for (var x = 0; x < item.playlistitems.length; x++) {
                        var playlistitem = item.playlistitems[x];
                        var newPlaylitstItem = new PlaylistItem(playlistitem.userplaylistid, playlistitem.playlistitemid,playlistitem.categoryref,playlistitem.audioid,playlistitem.itemorder,playlistitem.tracktitle,playlistitem.artist,playlistitem.length,playlistitem.isdownloaded,playlistitem.fileuri,-1 );
                        newPlaylist.playlistitems.push(newPlaylitstItem);
                    }
                }
            }
            setLocalStorage(this._filesPlaylists, this.userplaylists, true, function(){});
            returnFunction(true);
        } else {
            returnFunction(false);
        }
    } catch (e) {
        errorHandler("User.setStoredPlaylists", e);
        returnFunction(false);
    }
},
setStoredVideos: function(retrievedObject, resetDownload, libraryId, returnFunction) {
    try {
        if (retrievedObject != undefined) {
            var eclassLibraryId = eClassLibraryID;
            var videoLibraryId = videoLibraryID;
            if (libraryId === eclassLibraryId){
                this.eclasses = new Array();
            }else{
                this.videocategories = new Array();
            }
            var extension = "mp4";
            for (var i = 0; i < retrievedObject.length; i++) {
                var item = retrievedObject[i];
                var categoryAllDownloaded = true;
                var newVideoCategory = new VideoCategory(item.tabid, item.categorytitle, item.categoryid, item.seriesid, item.category, item.categoryname, item.videocount, item.vieworder, item.alldownloaded, item.thumbnail, item.localthumbnail, item.videonoteurl, item.hasnotes);
                if (libraryId === eclassLibraryId){
                    this.eclasses.push(newVideoCategory);
                }else{
                    this.videocategories.push(newVideoCategory);
                }
                if (item.videocategories != undefined) {
                    newVideoCategory.videocategories = [];
                    for (var y = 0; y < item.videocategories.length; y++) {
                        var categoryItem = item.videocategories[y];
                        var newCategoryItem = new VideoCategory(categoryItem.tabid, categoryItem.categorytitle, categoryItem.categoryid, categoryItem.seriesid, categoryItem.category, categoryItem.categoryname, categoryItem.videocount, categoryItem.vieworder, categoryItem.alldownloaded, categoryItem.thumbnail, categoryItem.localthumbnail, categoryItem.videonoteurl, categoryItem.hasnotes);
                        newVideoCategory.videocategories.push(newCategoryItem);
                        newCategoryItem.videos = [];
                        for (var x = 0; x < categoryItem.videos.length; x++) {
                            var vidItem = categoryItem.videos[x];
                            var video = new VideoItem(vidItem.videoid, vidItem.filename, vidItem.categoryid, vidItem.title, vidItem.length, vidItem.aspectratio, vidItem.videopath, vidItem.thumbnail, vidItem.seriesid, vidItem.seriesindex, vidItem.isdownloaded, vidItem.downloading, vidItem.fileuri);
                            newCategoryItem.videos.push(video);
                        }
                    }
                }
            }
            
            if (libraryId === eclassLibraryId){
                setLocalStorage(this._fileseClasses, this.eclasses, true, function(){});
            }else{
                setLocalStorage(this._filesVideoCategories, this.videocategories, true, function(){});
            }
            returnFunction(true);
        } else {
            returnFunction(false);
        }
    } catch (e) {
        errorHandler("User.setStoredVideos", e);
        returnFunction(false);
    }
},
setStoredAudios: function(retrievedObject, resetDownload, returnFunction) {
    try {
        if (retrievedObject !== undefined) {
            this.audiocategories = new Array();
            for (var i = 0; i < retrievedObject.length; i++) {
                var item = retrievedObject[i];
                var audiodownloading = -1;
                var newAudioCategory = new AudioCategory(item.tabid, item.categorytitle, item.categoryid, item.category, item.description, item.audiocount, item.vieworder, item.thumbnail, item.alldownloaded, item.audiomix, item.audiomixdownloaded, item.audiomixurl, item.audiomixremoteurl, audiodownloading, item.localthumbnail);
                this.audiocategories.push(newAudioCategory);
                if (item.audiocategories != undefined) {
                    newAudioCategory.audiocategories = [];
                    for (var y = 0; y < item.audiocategories.length; y++) {
                        var categoryItem = item.audiocategories[y];
                        var newCategoryItem = new AudioCategory(categoryItem.tabid, categoryItem.categorytitle, categoryItem.categoryid, categoryItem.category, categoryItem.description, categoryItem.audiocount, categoryItem.vieworder, categoryItem.thumbnail, categoryItem.alldownloaded, categoryItem.audiomix, categoryItem.audiomixdownloaded, categoryItem.audiomixurl, categoryItem.audiomixremoteurl, categoryItem.audioisdownloading, categoryItem.localthumbnail);
                        newAudioCategory.audiocategories.push(newCategoryItem);
                        newCategoryItem.audios = [];
                        if (categoryItem.audios != undefined) {
                            for (var x = 0; x < categoryItem.audios.length; x++) {
                                var audItem = categoryItem.audios[x];
                                //console.log("setstoredaudio audioid=" + audItem.audioid + " : " + audItem.isdownloaded);
                                var audio = new AudioItem(audItem.audioid, audItem.filename, audItem.categoryid, audItem.audiotitle, audItem.length, audItem.audiopath, audItem.seriesid, audItem.seriesindex, audItem.isdownloaded, audItem.downloading, audItem.fileuri, audItem.tracktitle, audItem.artist, newCategoryItem.audiomixdownloaded);
                                newCategoryItem.audios.push(audio);
                            }
                        }
                        if (categoryItem.audiotracks != undefined) {
                            newCategoryItem.audiotracks = [];
                            for (var z = 0; z < categoryItem.audiotracks.length; z++) {
                                var newAudTrack = {};
                                var audTrack = categoryItem.audiotracks[z];
                                newAudTrack.start = audTrack.start;
                                newAudTrack.duration = audTrack.duration;
                                newAudTrack.end = audTrack.end;
                                newAudTrack.loadedreset = audTrack.loadedreset;
                                newCategoryItem.audiotracks.push(newAudTrack);
                            }
                        }
                    }
                }
            }
            setLocalStorage(this._filesAudioCategories, this.audiocategories, true, function(){});
            returnFunction(true);
        } else {
            returnFunction(true);
        }
    } catch (e) {
        errorHandler("User.setStoredAudios", e);
        returnFunction(false);
    }
},
setPosition: function(courseid, modulegroupid, moduleid, sectionid, assetid, pageid, issuetab, issueid, nodekey) {
    try {
        if (courseid == undefined) {
            courseid = 0;
        }
        if (modulegroupid == undefined) {
            modulegroupid = 0;
        }
        if (moduleid == undefined) {
            moduleid = 0;
        }
        if (sectionid == undefined) {
            sectionid = 0;
        }
        if (assetid == undefined) {
            assetid = 0;
        }
        if (pageid == undefined) {
            pageid = "";
        }
        if (issuetab == undefined) {
            issuetab = "";
        }
        if (issueid == undefined) {
            issueid = "";
        }
        if (nodekey == undefined) {
            nodekey = "";
        }
        this.savedPosition.courseid = courseid;
        this.savedPosition.modulegroupid = modulegroupid;
        this.savedPosition.moduleid = moduleid;
        this.savedPosition.sectionid = sectionid;
        this.savedPosition.assetid = assetid;
        this.savedPosition.pageid = pageid;
        this.savedPosition.issuetab = issuetab;
        this.savedPosition.issueid = issueid;
        this.savedPosition.nodekey = nodekey;
    } catch (e) {
        errorHandler("Users.setPosition", e);
    }
},
updatePodState: function(courseid, moduleid, sectionid, assetid, nodekey, returnFunction) {
    try {
        if (courseid == undefined) {
            courseid = 0;
        }
        if (moduleid == undefined) {
            moduleid = 0;
        }
        if (sectionid == undefined) {
            sectionid = 0;
        }
        if (assetid == undefined) {
            assetid = 0;
        }
        if (nodekey == undefined) {
            nodekey = "";
        }
        var existingCourseId = this.savedPosition.courseid;
        var existingModuleId = this.savedPosition.moduleid;
        var existingSectionId = this.savedPosition.sectionid;
        var existingAssetId = this.savedPosition.assetid;
        var existingnodekey = this.savedPosition.nodekey;
        if ((courseid > 0 && moduleid > 0) || (moduleid === 0 && nodekey === "AssessmentSummary")) {
            coController.coUpdatePodState(courseid, moduleid, sectionid, assetid, nodekey, function(ret) {
                                          returnFunction(ret);
                                          });
        }
    } catch (e) {
        errorHandler("Users.updatePodState", e);
        returnFunction("");
    }
},
setMediaPosition: function(tabname, tabid, categoryid, itemid) {
    try {
        if (tabname === undefined) {
            tabname = "";
        }
        if (tabid === undefined) {
            tabid = "";
        }
        if (categoryid === undefined) {
            categoryid = "";
        }
        if (itemid === undefined) {
            itemid = "";
        }
        this.savedMediaPosition.tabname = tabname;
        this.savedMediaPosition.tabid = tabid;
        this.savedMediaPosition.categoryid = categoryid;
        this.savedMediaPosition.itemid = itemid;
    } catch (e) {
        errorHandler("Users.setMediaPosition", e);
    }
},
setCounts: function() {
    try {
        var ok = coController.coNetworkOk();
        if (!ok) {
            return;
        }
        var that = this;
    } catch (e) {
        errorHandler("User.setCounts", e);
    }
},
setHelpdeskCategories: function(categoriesObj, returnFunction) {
    try {
        this.helpdeskcategories = new Array();
        if (categoriesObj != undefined) {
            var categoryObj;
            var category;
            if (categoriesObj.length == undefined) {
                categoryObj = categoriesObj;
                category = new HelpdeskCategory(categoryObj.CategoryID, categoryObj.CategoryName, categoryObj.ProjectID, categoryObj.ParentCategoryID);
                this.helpdeskcategories.push(category);
            } else {
                for (var i = 0; i < categoriesObj.length; i++) {
                    categoryObj = categoriesObj[i];
                    category = new HelpdeskCategory(categoryObj.CategoryID, categoryObj.CategoryName, categoryObj.ProjectID, categoryObj.ParentCategoryID);
                    this.helpdeskcategories.push(category);
                }
            }
        }
        returnFunction(true);
    } catch (e) {
        errorHandler("User.setHelpdeskCategories", e);
    }
},
compareIssuesOrder: function(a, b) {
    return b.issueid - a.issueid;
},
compareCategoriesOrder: function(a, b) {
    return a.categoryname - b.categoryname;
},
setUserIssues: function(returnFunction) {
    try {
        var that = this;
        var comments;
        coController.coGetHelpdeskIssues(function(ret) {
                                         if (ret === undefined || ret === -1) {
                                         if (showOfflineMessage === true) {
                                         showOfflineMessage = false;
                                         msgStr = resources.connectionFail;
                                         msgTitle = resources.connError;
                                         msgBtnValue = resources.btnOk;
                                         navigator.notification.alert(msgStr, function() {
                                                                      hidePleaseWait();
                                                                      returnFunction("");
                                                                      }, msgTitle, msgBtnValue);
                                         } else {
                                         returnFunction("");
                                         }
                                         } else {
                                         if (ret === 0) {
                                         returnFunction("");
                                         } else {
                                         var issuesObj = ret;
                                         that.issues = new Array();
                                         if (issuesObj != undefined) {
                                         var issueobj;
                                         var issue;
                                         if (issuesObj.length == undefined) {
                                         issueobj = issuesObj;
                                         issue = new Issue(issueobj.IssueID, issueobj.ProjectID, issueobj.IssueCreatorID, issueobj.IssueCreatorName, issueobj.RequesterID, issueobj.RequesterName, issueobj.IssueTitle, issueobj.DateTimeCreated, issueobj.IssueCategoryId, issueobj.StatusName, issueobj.IssueCategoryName, issueobj.ProjectName);
                                         if ((issue.categoryname == undefined || issue.categoryname == "") && issue.issuecategoryid > 0) {
                                         issue.categoryname = that.setIssueCategoryName(issue.issuecategoryid);
                                         }
                                         that.issues.push(issue);
                                         comments = issueobj.Comments;
                                         if (comments != undefined) {
                                         issue.setIssueComments(comments);
                                         }
                                         issue.setIssueFiles(issueobj);
                                         } else {
                                         for (var i = 0; i < issuesObj.length; i++) {
                                         issueobj = issuesObj[i];
                                         issue = new Issue(issueobj.IssueID, issueobj.ProjectID, issueobj.IssueCreatorID, issueobj.IssueCreatorName, issueobj.RequesterID, issueobj.RequesterName, issueobj.IssueTitle, issueobj.DateTimeCreated, issueobj.IssueCategoryId, issueobj.StatusName, issueobj.IssueCategoryName, issueobj.ProjectName);
                                         if (issue.categoryname == undefined || issue.categoryname == "") {
                                         var name = that.setIssueCategoryName(issue.issuecategoryid);
                                         issue.categoryname = name;
                                         }
                                         that.issues.push(issue);
                                         comments = issueobj.Comments;
                                         if (comments != undefined) {
                                         issue.setIssueComments(comments);
                                         }
                                         issue.setIssueFiles(issueobj);
                                         }
                                         }
                                         }
                                         returnFunction(true);
                                         }
                                         }
                                         });
    } catch (e) {
        errorHandler("User.setUserIssues", e);
    }
},
addUserIssue: function(projectId, issueTitle, issueCategoryId, comment, returnFunction) {
    try {
        var that = this;
        coController.coAddHelpdeskIssue(projectId, issueTitle, issueCategoryId, comment, function(ret) {
                                        if (ret === undefined || ret === -1) {
                                        if (showOfflineMessage === true) {
                                        showOfflineMessage = false;
                                        msgStr = resources.connectionFail;
                                        msgTitle = resources.connError;
                                        msgBtnValue = resources.btnOk;
                                        navigator.notification.alert(msgStr, function() {
                                                                     hidePleaseWait();
                                                                     returnFunction(0);
                                                                     }, msgTitle, msgBtnValue);
                                        } else {
                                        returnFunction(0);
                                        }
                                        } else {
                                        if (ret === 0) {
                                        returnFunction(0);
                                        } else {
                                        var issueobj = ret;
                                        if (issueobj != undefined && issueobj.HelpdeskIssueCreateResult != undefined && issueobj.HelpdeskIssueCreateResult.Data != undefined) {
                                        issueobj = issueobj.HelpdeskIssueCreateResult.Data;
                                        var issue = new Issue(issueobj.IssueID, issueobj.ProjectID, issueobj.IssueCreatorID, issueobj.IssueCreatorName, issueobj.RequesterID, issueobj.RequesterName, issueobj.IssueTitle, issueobj.DateTimeCreated, issueobj.IssueCategoryId, issueobj.StatusName, issueobj.IssueCategoryName, issueobj.ProjectName);
                                        if ((issue.categoryname == undefined || issue.categoryname == "") && issue.issuecategoryid > 0) {
                                        issue.categoryname = that.setIssueCategoryName(issue.issuecategoryid);
                                        }
                                        that.issues.push(issue);
                                        var comments = issueobj.Comments;
                                        if (comments != undefined) {
                                        issue.setIssueComments(comments);
                                        }
                                        issue.setIssueFiles(issueobj);
                                        returnFunction(issue.issueid);
                                        } else {
                                        returnFunction(0);
                                        }
                                        }
                                        }
                                        });
    } catch (e) {
        errorHandler("User.addUserIssue", e);
    }
},
getIssuesListView: function(issuePageNo, issuesPerPage, returnFunction) {
    try {
        var that = this;
        this.setUserIssues(function(ret) {
                           var issuesListNew = that.issues.sort(that.compareIssuesOrder);
                           if (issuesListNew == undefined || issuesListNew.length == 0) {
                           returnFunction("");
                           } else {
                           that.generateIssuesListView(issuesListNew, issuePageNo, issuesPerPage, function(ret) {
                                                       returnFunction(ret);
                                                       });
                           }
                           });
    } catch (e) {
        errorHandler("User.getIssuesListView", e);
        return "";
    }
},
getSearchIssuesListView: function(searchValue, issuePageNo, issuesPerPage, returnFunction) {
    try {
        searchIssues = new Array();
        var issuesArray = new Array();
        if (searchValue != undefined && searchValue.length > 0) {
            searchValue = searchValue.toLowerCase();
        } else {
            return "";
        }
        if (this.issues == undefined || this.issues.length == 0) {
            var that = this;
            this.setUserIssues(function(ret) {
                               if (that.issues == undefined || that.issues.length == 0) {
                               returnFunction("");
                               } else {
                               issuesArray = that.issues.slice(0, that.issues.length);
                               issuesArray = issuesArray.sort(that.compareIssuesOrder);
                               that.generateIssuesSearchListView(issuesListNew, searchValue, issuePageNo, issuesPerPage, function(ret) {
                                                                 returnFunction(ret);
                                                                 });
                               }
                               });
        } else {
            issuesArray = this.issues.slice(0, this.issues.length);
            issuesArray = issuesArray.sort(this.compareIssuesOrder);
            this.generateIssuesSearchListView(issuesArray, searchValue, issuePageNo, issuesPerPage, function(ret) {
                                              returnFunction(ret);
                                              });
        }
    } catch (e) {
        errorHandler("User.getSearchIssuesListView", e);
        return "";
    }
},
generateIssuesSearchListView: function(issues, searchValue, issuepageno, issuesPerPage, returnFunction) {
    try {
        var issuesStr = "";
        if (issues != undefined && issues.length > 0) {
            var startIssue = (issuepageno * issuesPerPage) - issuesPerPage;
            var endIssue = issues.length > (issuesPerPage * issuepageno) ? (issuesPerPage * issuepageno) : issues.length;
            for (var i = 0; i < issues.length; i++) {
                var issue = issues[i];
                var issueTitle = issue.issuetitle.toLowerCase();
                if (issueTitle.indexOf(searchValue) > -1) {
                    searchIssues.push(issue);
                } else {
                    if (issue.comments != undefined && issue.comments.length > 0) {
                        for (var x = 0; x < issue.comments.length; x++) {
                            var comment = issue.comments[x];
                            var commentstr = comment.comment.toLowerCase();
                            if (commentstr.indexOf(searchValue) > -1) {
                                searchIssues.push(issue);
                                break;
                            }
                        }
                    }
                }
            }
            if (searchIssues != undefined && searchIssues.length > 0) {
                endIssue = searchIssues.length > endIssue ? endIssue : searchIssues.length;
                for (var y = startIssue; y < searchIssues.length; y++) {
                    if (searchIssues[y] != undefined) {
                        var issueItem = searchIssues[y];
                        issuesStr += issueItem.getIssueLi(this.username, this.userId);
                    }
                }
            }
            returnFunction(issuesStr);
        } else {
            returnFunction(issuesStr);
        }
    } catch (e) {
        errorHandler("User.generateIssuesSearchListView", e);
        return "";
    }
},
getHelpdeskCategoryOptions: function(returnFunction) {
    try {
        var optionStr = "";
        if (this.helpdeskcategories.length > 0) {
            var categories = this.helpdeskcategories.sort(this.compareCategoriesOrder);
            for (var i = 0; i < categories.length; i++) {
                var category = categories[i];
                optionStr += category.getCategoryOption();
            }
            returnFunction(optionStr);
        } else {
            optionStr = "<option value='category-0'>" + resources.defaultoption + "</option>";
            returnFunction(optionStr);
        }
    } catch (e) {
        errorHandler("User.getHelpdeskCategoryOptions", e);
        return "";
    }
},
getIssueById: function(issueId) {
    try {
        if (this.issues.length > 0) {
            for (var i = 0; i < this.issues.length; i++) {
                var issue = this.issues[i];
                if (issue.issueid == issueId) {
                    return issue;
                }
            }
        } else {
            return new Issue();
        }
    } catch (e) {
        errorHandler("User.getIssueById", e);
        return undefined;
    }
},
generateIssuesListView: function(issues, issuepageno, issuesPerPage, returnFunction) {
    try {
        var issuesStr = "";
        if (issues != undefined && issues.length > 0) {
            var startIssue = (issuepageno * issuesPerPage) - issuesPerPage;
            var endIssue = issues.length > (issuesPerPage * issuepageno) ? (issuesPerPage * issuepageno) : issues.length;
            for (var i = startIssue; i < endIssue; i++) {
                var issue = issues[i];
                issuesStr += issue.getIssueLi(this.username, this.userId);
            }
            returnFunction(issuesStr);
        } else {
            returnFunction(issuesStr);
        }
    } catch (e) {
        errorHandler("User.generateIssuesListView", e);
    }
},
setIssueCategoryName: function(issueCategoryId) {
    try {
        var categoryName = "";
        if (this.helpdeskcategories != undefined && this.helpdeskcategories.length > 0) {
            for (var i = 0; i < this.helpdeskcategories.length; i++) {
                var category = this.helpdeskcategories[i];
                if (category.categoryid == issueCategoryId) {
                    return category.categoryname;
                }
            }
        }
        return categoryName;
    } catch (e) {
        errorHandler("User.setIssueCategoryName", e);
        return "";
    }
},
getIssueCategory: function(issueCategoryId) {
    try {
        var category = new HelpdeskCategory();
        if (this.helpdeskcategories != undefined && this.helpdeskcategories.length > 0) {
            for (var i = 0; i < this.helpdeskcategories.length; i++) {
                category = this.helpdeskcategories[i];
                if (category.categoryid == issueCategoryId) {
                    return category;
                }
            }
        }
        return category;
    } catch (e) {
        errorHandler("User.getIssueCategory", e);
        return "";
    }
},
getAllUserPodcasts: function(podcastsExist, courseid, returnFunction) {
    try {
        var podsOk = false;
        var podList;
        if (podcastsExist === true && mediaInit === false) {
            podsOk = true;
            returnFunction(courseid);
        } else {
            if (mediaInit === false && this.podcasts.length > 0 || (mediaInit === true && this.podcasts.length > 0 && deviceIsOnline === false)) {
                if (courseid === 0) {
                    podList = this.podcasts;
                } else {
                    podList = this.getPodcastListByCourse(courseid);
                }
                if (podList !== undefined && podList.length > 0) {
                    podsOk = true;
                    returnFunction(courseid);
                }
            }
        }
        if (podsOk === false) {
            podList = this.getPodcastListByCourse(courseid);
            if (podList !== undefined && podList.length > 0) {
                podsOk = true;
                returnFunction(courseid);
            } else {
                var that = this;
                coController.coUserPodcastsGet(courseid, function(ret) {
                                               var podcastsObj;
                                               var podsToProcess = {};
                                               var podcastObj;
                                               var podcastItemsObj;
                                               var podcastItemObj;
                                               var podcast;
                                               var podcastItem;
                                               var indexNo = 0;
                                               var moduleItem;
                                               var itemCount = 0;
                                               var appName = configs.getCustom("CS_PORTAL_NAME");
                                               var pdfurl = "";
                                               var theoryModule;
                                               if (ret === undefined || ret === -1) {
                                               if (showOfflineMessage === true) {
                                               showOfflineMessage = false;
                                               msgStr = resources.connectionFail;
                                               msgTitle = resources.connError;
                                               msgBtnValue = resources.btnOk;
                                               navigator.notification.alert(msgStr, function() {
                                                                            hidePleaseWait();
                                                                            returnFunction(false);
                                                                            }, msgTitle, msgBtnValue);
                                               } else {
                                               returnFunction(false);
                                               }
                                               } else {
                                               if (ret === 0) {
                                               returnFunction(false);
                                               } else {
                                               podcastsObj = ret;
                                               if (podcastsObj != undefined) {
                                               if (podcastsObj.length == undefined) {
                                               podcastObj = podcastsObj;
                                               if (podcastObj.Items !== undefined && podcastObj.Items.length > 0) {
                                               podcastItemsObj = podcastObj.Items;
                                               itemCount = podcastItemsObj === undefined ? 0 : podcastItemsObj.length;
                                               }
                                               podcast = new Podcast(podcastObj.PodcastId, podcastObj.CourseId, podcastObj.ModuleId, podcastObj.CourseTitle, podcastObj.ModuleTitle, podcastObj.ThumbnailUrl, false, false, podcastObj.IsDefaultThumbnail, "", itemCount);
                                               that.podcasts.push(podcast);
                                               podcast.items = [];
                                               if (podcastItemsObj != undefined) {
                                               for (var i = 0; i < podcastItemsObj.length; i++) {
                                               podcastItemObj = podcastItemsObj[i];
                                               if (podcastItemObj.Type === "pdf") {
                                               podcast.haspdf = true;
                                               }
                                               podcastItem = new PodcastItem(podcast.id, podcastItemObj.PodcastItemId, podcastItemObj.Link, podcastItemObj.Title, podcastItemObj.Type, podcastItemObj.Length, false, "", podcastItemObj.FileName, -1, i);
                                               podcast.items.push(podcastItem);
                                               }
                                               }
                                               setLocalStorage(that._filesPodcasts, that.podcasts, false, function(){});
                                               } else {
                                               for (var y = 0; y < podcastsObj.length; y++) {
                                               podcastObj = podcastsObj[y];
                                               podcast = that.getPodcastById(podcastObj.PodcastId);
                                               itemCount = 0;
                                               if (podcast === undefined) {
                                               if (podcastObj.Items !== undefined && podcastObj.Items.length > 0) {
                                               podcastItemsObj = podcastObj.Items;
                                               itemCount = podcastItemsObj === undefined ? 0 : podcastItemsObj.length;
                                               }
                                               podcast = new Podcast(podcastObj.PodcastId, podcastObj.CourseId, podcastObj.ModuleId, podcastObj.CourseTitle, podcastObj.ModuleTitle, podcastObj.ThumbnailUrl, false, false, podcastObj.IsDefaultThumbnail, "", itemCount);
                                               that.podcasts.push(podcast);
                                               podcast.items = [];
                                               if (podcastItemsObj != undefined) {
                                               for (var i = 0; i < podcastItemsObj.length; i++) {
                                               podcastItemObj = podcastItemsObj[i];
                                               if (podcastItemObj.Type === "pdf") {
                                               podcast.haspdf = true;
                                               }
                                               podcastItem = new PodcastItem(podcast.id, podcastItemObj.PodcastItemId, podcastItemObj.Link, podcastItemObj.Title, podcastItemObj.Type, podcastItemObj.Length, false, "", podcastItemObj.FileName, -1, i);
                                               podcast.items.push(podcastItem);
                                               }
                                               }
                                               }
                                               }
                                               }
                                               setLocalStorage(that._filesPodcasts, that.podcasts, false, function(){});
                                               that.comparePodcastsExists(courseid, function(retVal) {
                                                                          returnFunction(retVal);
                                                                          });
                                               }
                                               }
                                               }
                                               });
            }
        }
    } catch (e) {
        errorHandler("User.getAllUserPodcasts", e);
        returnFunction(false);
    }
},
comparePodcastsExists: function(courseid, returnFunction) {
    try {
        var existPod;
        var localThumbNail = "";
        var thumbnailPath = "";
        var thumbNailFile;
        if (this.podcasts !== undefined && this.podcasts.length > 0) {
            for (var i = 0; i < this.podcasts.length; i++) {
                var pod = this.podcasts[i];
                if (pod.courseid === courseid || courseid === 0) {
                    if (this.existPods !== undefined && this.existPods.length > 0) {
                        existPod = this.getPodcastByIdFromList(this.existPods, pod.id);
                        if (existPod !== undefined) {
                            pod = existPod;
                        }
                    } else {
                        for (var n = 0; n < pod.items.length; n++) {
                            var podItem = pod.items[n];
                            if (podItem !== undefined) {
                                var ids = pod.id.split("-");
                                var moduleDir = ids[0].toString() + "-" + ids[1].toString();
                                var localFileName = podItem.filename;
                                if(localFileName.substring(localFileName.length - 5, 4) === ".pdf"){
                                    localFileExists(docsFileDir, moduleDir, localFileName, podItem, "podcasts", false, false, false, function(ret) {});
                                }else{
                                    
                                    localFileExists(theoryMediaDir, moduleDir, localFileName, podItem, "podcasts", false, false, false, function(ret) {});
                                }
                            }
                        }
                    }
                }
            }
            returnFunction(courseid);
        } else {
            returnFunction(courseid);
        }
    } catch (e) {
        errorHandler("User.comparePodcastsExists", e);
        returnFunction(false);
    }
},
getPodcastListByCourse: function(courseId) {
    try {
        var podcastsList = [];
        for (var i = 0; i < this.podcasts.length; i++) {
            var pod = this.podcasts[i];
            if (pod.courseid === courseId) {
                podcastsList.push(pod);
            }
        }
        return podcastsList;
    } catch (e) {
        errorHandler("User.getPodcastListByCourse", e);
        return new Array();
    }
},
getUserPodcasts: function(courseId, returnFunction) {
    try {
        var podcastListingFound = false;
        var podcastStr = "";
        var listing;
        var listingItem = {};
        if (podcastsListing !== undefined && podcastsListing.length > 0) {
            for (var p = 0; p < podcastsListing.length; p++) {
                listing = podcastsListing[p];
                if (listing.courseid === courseId) {
                    podcastListingFound = true;
                    podcastStr = listing.listingstring;
                    break;
                }
            }
        }
        if (podcastListingFound === false) {
            var activeCourseId = 0;
            for (var x = 0; x < portalCourses.count(); x++) {
                var course = portalCourses.courses[x];
                activeCourseId = course.courseid;
                if (courseId === 0 || (courseId > 0 && activeCourseId === courseId)) {
                    var podStr = "";
                    var podStrL = "";
                    var coursename = course.title;
                    podStr += "<div id='podcategory-" + x + "-theory-" + activeCourseId + "' data-role='collapsible' class='videocategorymedia podcollapse' data-collapsed='false' data-theme='h' data-content-theme='d' data-inset='false' data-iconpos='right'>";
                    podStr += "<h3  class='podcastheaderdiv'><div style='margin: 0px;font-size: 0.9em;font-weight: bold !important;text-align:left !important;'>" + coursename + "</div></h3>";
                    podStr += "<div id='podserieslistul-" + activeCourseId + "' class='podcastcattable'>";
                    var podcastList = this.getPodcastListByCourse(activeCourseId);
                    if (podcastList != undefined && podcastList.length > 0) {
                        podcastStr += podStr;
                        var podLiStr = "<ul data-role='listview' data-theme='h' data-inset='true' class='podcastcatul'>";
                        for (var n = 0; n < podcastList.length; n++) {
                            var podcat = podcastList[n];
                            var itemStr = "";
                            var modtitle =podcat.moduletitle;
                            itemStr += "<li class='catli'><a id='podcategory-" + podcat.id + "' href='#' class='podseriesbtn'><div class='cattitlediv'><div class='catlititlediv'><div class='captionblockdiv' ";
                            itemStr += "' id='podcategorycaption-" + podcat.id + "'>" + modtitle + "</div>";
                            var filesNo = podcat.itemcount;
                            filesNo = filesNo === 1 ? filesNo + " " + resources.filetxt : filesNo + " " + resources.filesnotxt;
                            itemStr += "<div class='imagecaptionsub'>" + filesNo + "</div></div>";
                            itemStr += "<div class='catnavdiv'></div></div>";
                            itemStr += "</a></li>";
                            podLiStr += itemStr;
                        }
                        podLiStr += "</ul></div>";
                        podcastStr += podLiStr;
                    }
                    podcastStr += "</div>";
                    if (activeCourseId === courseId && courseId > 0) {
                        listingItem = {};
                        listingItem.courseid = courseId;
                        listingItem.listingstring = podcastStr;
                        if (podcastsListing !== undefined && podcastsListing.length > 0) {
                            for (var p1 = 0; p1 < podcastsListing.length; p1++) {
                                listing = podcastsListing[p1];
                                if (listing.courseid === courseId) {
                                    podcastsListing.splice(p1, 1);
                                    break;
                                }
                            }
                        }
                        podcastsListing.push(listingItem);
                        break;
                    }
                }
            }
            if (courseId === 0) {
                podcastsListing = [];
                listingItem = {};
                listingItem.courseid = courseId;
                listingItem.listingstring = podcastStr;
                podcastsListing.push(listingItem);
            }
        }
        returnFunction(podcastStr);
    } catch (e) {
        errorHandler("User.getUserPodcasts", e);
        returnFunction("");
    }
},
filefail: function(error) {},
getPodcastById: function(podcastId) {
    try {
        var podcast;
        if (this.podcasts != undefined && this.podcasts.length > 0) {
            for (var i = 0; i < this.podcasts.length; i++) {
                var p = this.podcasts[i];
                if (p.id == podcastId) {
                    return p;
                }
            }
        }
        return podcast;
    } catch (e) {
        errorHandler("User.getPodcastById", e);
        return undefined;
    }
},
getPodcastByIdFromList: function(pods, podcastId) {
    try {
        var podcast;
        if (pods != undefined && pods.length > 0) {
            for (var i = 0; i < pods.length; i++) {
                var p = pods[i];
                if (p.id == podcastId) {
                    return p;
                }
            }
        }
        return podcast;
    } catch (e) {
        errorHandler("User.getPodcastByIdFromList", e);
        return undefined;
    }
},
formatTitleString: function(content) {
    try {
        var returnStr = content.replace("&", "&amp;");
        returnStr = returnStr.replace("'", "&apos;");
        returnStr = returnStr.replace('"', "&quot;");
        return returnStr;
    } catch (e) {
        errorHandler("User.formatTitleString", e);
        return content;
    }
},
resetPodcastsDownloadsFiles: function(returnFunction) {
    try {
        if (this.podcasts !== undefined && this.podcasts.length > 0) {
            for (var i = 0; i < this.podcasts.length; i++) {
                var p = this.podcasts[i];
                var alldownloaded = true;
                if (p.items !== undefined && p.items.length > 0) {
                    for (var x = 0; x < p.items.length; x++) {
                        var item = p.items[x];
                        if (item.downloading > -1) {
                            item.downloading = -1;
                            item.isdownloaded = false;
                            item.fileuri = "";
                            alldownloaded = false;
                            var ids = item.podcastid.split("-");
                            var moduleDir = ids[0].toString() + "-" + ids[1].toString();
                            var localFileName = item.filename;
                            var that = this;
                            if(localFileName.substring(localFileName.length - 5, 4) === ".pdf"){
                                localFileExists(docsFileDir, moduleDir, localFileName, item, "podcasts", false, true, false, function(ret) {});
                            }else{
                                localFileExists(theoryMediaDir, moduleDir, localFileName, item, "podcasts", false, true, false, function(ret) {});
                            }
                            
                            
                        } else {
                            if (item.isdownloaded === false) {
                                alldownloaded = false;
                            }
                        }
                    }
                    p.alldownloaded = alldownloaded;
                }
            }
            setLocalStorage(this._filesPodcasts, this.podcasts, true, function(){});
        }
        returnFunction(true);
    } catch (e) {
        errorHandler("User.resetPodcastsDownloadsFiles", e);
        returnFunction(false);
    }
},
resetPlaylistsDownloadsFiles: function(returnFunction) {
    try {
        if (this.userplaylists !== undefined && this.userplaylists.length > 0) {
            for (var i = 0; i < this.userplaylists.length; i++) {
                var p = this.userplaylists[i];
                var alldownloaded = true;
                if (p.playlistitems !== undefined && p.playlistitems.length > 0) {
                    for (var x = 0; x < p.playlistitems.length; x++) {
                        var item = p.playlistitems[x];
                        if (item.downloading > -1) {
                            item.downloading = -1;
                            item.isdownloaded = false;
                            item.fileuri = "";
                            alldownloaded = false;
                            
                        } else {
                            if (item.isdownloaded === false) {
                                alldownloaded = false;
                            }
                        }
                        var ids = item.categoryref.split("-");
                        var tabId = ids[0];
                        var audiocategoryid = ids[1] + "-" + ids[2];
                        var category;
                        if(this.audiocategories!==undefined && this.audiocategories.length>0){
                            category= this.getAudiocategoryById(tabId, audiocategoryid);
                        }else if (this.existAuds!==undefined && this.existAuds.length > 0){
                            category= this.getAudiocategoryByIdFromList(this.existAuds, tabId, audiocategoryid);
                        }else{
                            category=undefined;
                        }
                        if (category!==undefined && category.audios!==undefined && category.audios.length>0){
                            var audioid =item.audioid + "mp3";
                            var audio = category.getAudioItemById(audioid);
                            if(audio!==undefined){
                                item.fileuri = audio.fileuri.length > 0 ? audio.fileuri : audio.audiopath;
                                item.isdownloaded = audio.isdownloaded;
                                if (item.isdownloaded === false) {
                                    alldownloaded = false;
                                }
                                
                            }
                        }
                    }
                    p.alldownloaded = alldownloaded;
                }
            }
            setLocalStorage(this._filesPlaylists, this.userplaylists, true, function(){});
        }
        returnFunction(true);
    } catch (e) {
        errorHandler("User.resetPlaylistsDownloadsFiles", e);
        returnFunction(false);
    }
},
resetVideoDownloadsFiles: function(libraryId, returnFunction) {
    try {
        if(libraryId === videoLibraryID){
            if (this.videocategories !== undefined && this.videocategories.length > 0) {
                for (var i = 0; i < this.videocategories.length; i++) {
                    var vc = this.videocategories[i];
                    if (vc.videocategories !== undefined && vc.videocategories.length > 0) {
                        for (var x = 0; x < vc.videocategories.length; x++) {
                            var vcitem = vc.videocategories[x];
                            var allDownloaded = true;
                            if (vcitem.videos !== undefined && vcitem.videos.length > 0) {
                                for (var y = 0; y < vcitem.videos.length; y++) {
                                    var item = vcitem.videos[y];
                                    if (item.downloading > -1) {
                                        allDownloaded = false;
                                        item.downloading = -1;
                                        item.isdownloaded = false;
                                        item.fileuri = "";
                                        var categoryDirectory = item.categoryid.toString();
                                        var localFileName = item.filename;
                                        var that = this;
                                        localFileExists(videoMediaDir, categoryDirectory, localFileName, item, "videocategories", false, true, false, function(ret) {});
                                    } else {
                                        if (item.isdownloaded === false) {
                                            allDownloaded = false;
                                        }
                                    }
                                }
                                vcitem.alldownloaded = allDownloaded;
                            }
                        }
                    }
                }
            }
            }else{
                if (this.eclasses !== undefined && this.eclasses.length > 0) {
                    for (var i = 0; i < this.eclasses.length; i++) {
                        var vc = this.eclasses[i];
                        if (vc.videocategories !== undefined && vc.videocategories.length > 0) {
                            for (var x = 0; x < vc.videocategories.length; x++) {
                                var vcitem = vc.videocategories[x];
                                var allDownloaded = true;
                                if (vcitem.videos !== undefined && vcitem.videos.length > 0) {
                                    for (var y = 0; y < vcitem.videos.length; y++) {
                                        var item = vcitem.videos[y];
                                        if (item.downloading > -1) {
                                            allDownloaded = false;
                                            item.downloading = -1;
                                            item.isdownloaded = false;
                                            item.fileuri = "";
                                            var categoryDirectory = item.categoryid.toString();
                                            var localFileName = item.filename;
                                            var that = this;
                                            localFileExists(videoMediaDir, categoryDirectory, localFileName, item, "videocategories", false, true, false, function(ret) {});
                                        } else {
                                            if (item.isdownloaded === false) {
                                                allDownloaded = false;
                                            }
                                        }
                                    }
                                    vcitem.alldownloaded = allDownloaded;
                                }
                            }
                        }
                    }
            }
            
        }
        if(libraryId === videoLibraryID){
            setLocalStorage(this._filesVideoCategories, this.videocategories, true, function(){});
        }else{
            setLocalStorage(this._fileseClasses, this.eclasses, true, function(){});
        }
                
        returnFunction(true);
    } catch (e) {
        errorHandler("User.resetVideoDownloadsFiles", e);
        returnFunction(false);
    }
},
resetAudioDownloadsFiles: function(returnFunction) {
    try {
        if (this.audiocategories !== undefined && this.audiocategories.length > 0) {
            for (var i = 0; i < this.audiocategories.length; i++) {
                var ac = this.audiocategories[i];
                if (ac.audiocategories !== undefined && ac.audiocategories.length > 0) {
                    for (var x = 0; x < ac.audiocategories.length; x++) {
                        var acitem = ac.audiocategories[x];
                        if (acitem.audiomix === true && acitem.audioisdownloading > -1) {
                            var audiolocalFileName = "alltracks.mp3";
                            var audiocategoryDirectory = acitem.tabid.toString() + "-" + acitem.categoryid.toString();
                            acitem.audioisdownloading = -1;
                            acitem.audiomixdownloaded = false;
                            acitem.audiomixurl = "";
                            localFileExists(audioMediaDir, audiocategoryDirectory, audiolocalFileName, acitem, "audiocategories", true, true, false, function(ret) {});
                        }
                        if (acitem.audios !== undefined && acitem.audios.length > 0) {
                            var alldownloaded = true;
                            for (var y = 0; y < acitem.audios.length; y++) {
                                var item = acitem.audios[y];
                                item.mixdownloaded = acitem.audiomixdownloaded;
                                if (item.downloading > -1) {
                                    item.downloading = -1;
                                    item.isdownloaded = false;
                                    item.fileuri = "";
                                    alldownloaded = false;
                                    var categoryDirectory = item.categoryid.toString();
                                    var localFileName = item.filename;
                                    localFileExists(audioMediaDir, categoryDirectory, localFileName, item, "audiocategories", false, true, false, function(ret) {});
                                } else {
                                    if (item.isdownloaded === false) {
                                        alldownloaded = false;
                                    }
                                }
                            }
                            acitem.alldownloaded = alldownloaded;
                        }
                    }
                }
            }
            setLocalStorage(this._filesAudioCategories, this.audiocategories, true, function(){});
            returnFunction(true);
        } else {
            returnFunction(false);
        }
    } catch (e) {
        errorHandler("User.resetAudioDownloadsFiles", e);
        returnFunction(false);
    }
},
getUserVideos: function(libraryId, videoInit, returnFunction) {
    try {
        var videoStr = "";
        var continueProcess = false;
        var eclassLibraryId = eClassLibraryID;
        
        if((libraryId !== eclassLibraryId) && (this.videocategories === undefined || this.videocategories.length === 0 || videoInit === true) && deviceIsOnline === true){
            continueProcess = true;
            this.videocategories = new Array();
        }
        if((libraryId === eclassLibraryId) && (this.eclasses === undefined || this.eclasses.length === 0 || videoInit === true) && deviceIsOnline === true){
            continueProcess = true;
            this.eclasses = new Array();
        }
        
        if (continueProcess===true) {
            var videos;
            var videoCategories;
            var vidsToProcess = {};
            var delayListing = false;
            var totalCats =0 ;
            var hasnotes = false;
            var vidnotesurl = "";
            var that = this;
            coController.coVideoGroupCategoriesGet(libraryId, function(ret) {
                                                   if (ret === undefined || ret === -1) {
                                                   if (showOfflineMessage === true) {
                                                   showOfflineMessage = false;
                                                   msgStr = resources.connectionFail;
                                                   msgTitle = resources.connError;
                                                   msgBtnValue = resources.btnOk;
                                                   navigator.notification.alert(msgStr, function() {
                                                                                hidePleaseWait();
                                                                                returnFunction("");
                                                                                }, msgTitle, msgBtnValue);
                                                   } else {
                                                   returnFunction("");
                                                   }
                                                   } else {
                                                   if (ret === 0) {
                                                   returnFunction("");
                                                   } else {
                                                   var videoGroupCategoriesObj = ret;
                                                   var seriesId;
                                                   var extension = "mp4";
                                                   if (videoGroupCategoriesObj != undefined) {
                                                   var videoGroupCategoryObj;
                                                   var videoGroupCategory;
                                                   var videoCategoriesObj;
                                                   var videoCategoryObj;
                                                   var vidcatid = "";
                                                   var vidCatRef, vidTabId, that1;
                                                   if (videoGroupCategoriesObj.length === undefined) {
                                                   videoGroupCategoryObj = videoGroupCategoriesObj;
                                                   seriesId = videoGroupCategoryObj.SeriesId === undefined ? 0 : videoGroupCategoryObj.SeriesId;
                                                   var title = videoGroupCategoryObj.CategoryTitle == undefined ? videoGroupCategoryObj.Category : videoGroupCategoryObj.CategoryTitle;
                                                   vidnotesurl = (videoCategoryObj.VideoNoteUrl==undefined || videoCategoryObj.VideoNoteUrl == null) ? "" : videoCategoryObj.VideoNoteUrl;
                                                   hasnotes = (vidnotesurl!==undefined && vidnotesurl.length > 0) ? true : false;
                                                   videoGroupCategory = new VideoCategory(0, title, videoGroupCategoryObj.CategoryId, seriesId, title, videoGroupCategoryObj.Category, 0, videoGroupCategoryObj.ViewOrder, false, "", "", vidnotesurl, hasnotes);
                                                   if(libraryId===eclassLibraryId){
                                                   that.eclasses.push(videoGroupCategory);
                                                   }else{
                                                   that.videocategories.push(videoGroupCategory);
                                                   }
                                                   videoGroupCategory.videocategories = new Array();
                                                   videoCategoriesObj = videoGroupCategoryObj.Categories;
                                                   if (videoCategoriesObj != undefined) {
                                                   if (videoCategoriesObj.length == undefined) {
                                                   videoCategoryObj = videoCategoriesObj;
                                                   vidnotesurl = (videoCategoryObj.VideoNoteUrl==undefined || videoCategoryObj.VideoNoteUrl == null) ? "" : videoCategoryObj.VideoNoteUrl;
                                                   hasnotes = (vidnotesurl!==undefined && vidnotesurl.length > 0) ? true : false;
                                                   videocategory = new VideoCategory(videoGroupCategory.CategoryId, title, videoCategoryObj.CategoryId, videoCategoryObj.SeriesId, title, videoCategoryObj.CategoryName, videoCategoryObj.VideoCount, videoCategoryObj.ViewOrder, false, "", "", vidnotesurl, hasnotes);
                                                   videoGroupCategory.videocategories.push(videocategory);
                                                   videocategory.videos = new Array();
                                                   videos = videoCategoryObj.Videos;
                                                   
                                                   if (videos != undefined && videos.length > 0) {
                                                   videocategory.setVideos(videos);
                                                   }else{
                                                   that.setVideoDetails(libraryId, videocategory, function(ret){
                                                                        if(ret !==undefined && ret !== false){
                                                                        videocategory = ret;
                                                                        }
                                                                        if(libraryId===eclassLibraryId){
                                                                        that.compareEClassExists(videocategory, function(retVal) {});
                                                                        }else{
                                                                        that.compareVideoExists(videocategory, function(retVal) { });
                                                                        }
                                                                        });
                                                   }
                                                   
                                                   }
                                                   } else {
                                                   for (var i = 0; i < videoCategoriesObj.length; i++) {
                                                   videoCategoryObj = videoCategoriesObj[i];
                                                   vidnotesurl = (videoCategoryObj.VideoNoteUrl==undefined || videoCategoryObj.VideoNoteUrl == null) ? "" : videoCategoryObj.VideoNoteUrl;
                                                   hasnotes = (vidnotesurl!==undefined && vidnotesurl.length > 0) ? true : false;
                                                   videocategory = new VideoCategory(videoGroupCategory.CategoryId, title, videoCategoryObj.CategoryId, videoCategoryObj.SeriesId, title, videoCategoryObj.CategoryName, videoCategoryObj.VideoCount, videoCategoryObj.ViewOrder, false, "", "",vidnotesurl, hasnotes);
                                                   videoGroupCategory.videocategories.push(videocategory);
                                                   videocategory.videos = new Array();
                                                   videos = videoCategoryObj.Videos;
                                                   if (videos != undefined  && videos.length > 0) {
                                                   videocategory.setVideos(videos);
                                                   }else{
                                                   that.setVideoDetails(libraryId, videocategory, function(ret){
                                                                        if(ret !==undefined && ret !== false){
                                                                        videocategory = ret;
                                                                        }
                                                                        if(libraryId===eclassLibraryId){
                                                                        that.compareEClassExists(videocategory, function(retVal) {});
                                                                        }else{
                                                                        that.compareVideoExists(videocategory, function(retVal) { });
                                                                        }
                                                                        });
                                                   }
                                                   
                                                   }
                                                   if(libraryId === eclassLibraryId){
                                                   setLocalStorage(that._fileseClasses, that.eclasses, true, function(){});
                                                   }else{
                                                   setLocalStorage(that._filesVideoCategories, that.videocategories, true, function(){});
                                                   }
                                                   }
                                                   } else {
                                                   for (var y = 0; y < videoGroupCategoriesObj.length; y++) {
                                                   videoGroupCategoryObj = videoGroupCategoriesObj[y];
                                                   seriesId = videoGroupCategoryObj.SeriesId === undefined ? 0 : videoGroupCategoryObj.SeriesId;
                                                   videoGroupCategory = new VideoCategory(0, videoGroupCategoryObj.Category, videoGroupCategoryObj.CategoryId, seriesId, videoGroupCategoryObj.Category, videoGroupCategoryObj.Category, 0, videoGroupCategoryObj.ViewOrder, false, "", "", "", false);
                                                   if(libraryId===eclassLibraryId){
                                                   that.eclasses.push(videoGroupCategory);
                                                   }else{
                                                   that.videocategories.push(videoGroupCategory);
                                                   }
                                                   videoGroupCategory.videocategories = new Array();
                                                   videoCategoriesObj = videoGroupCategoryObj.Categories;
                                                   if (videoCategoriesObj != undefined) {
                                                   if (videoCategoriesObj.length == undefined) {
                                                   videoCategoryObj = videoCategoriesObj;
                                                   vidnotesurl = (videoCategoryObj.VideoNoteUrl==undefined || videoCategoryObj.VideoNoteUrl == null) ? "" : videoCategoryObj.VideoNoteUrl;
                                                   hasnotes = (vidnotesurl!==undefined && vidnotesurl.length > 0) ? true : false;
                                                   videocategory = new VideoCategory(videoGroupCategory.CategoryId, title, videoCategoryObj.CategoryId, videoCategoryObj.SeriesId, title, videoCategoryObj.CategoryName, videoCategoryObj.VideoCount, videoCategoryObj.ViewOrder, false, "", "", vidnotesurl, hasnotes);
                                                   videoGroupCategory.videocategories.push(videocategory);
                                                   videocategory.videos = new Array();
                                                   
                                                   if (videos != undefined  && videos.length > 0) {
                                                   videocategory.setVideos(videos);
                                                   }else{
                                                   that.setVideoDetails(libraryId, videocategory, function(ret){
                                                                        if(ret !==undefined && ret !== false){
                                                                        videocategory = ret;
                                                                        }
                                                                        if(libraryId===eclassLibraryId){
                                                                        that.compareEClassExists(videocategory, function(retVal) {});
                                                                        }else{
                                                                        that.compareVideoExists(videocategory, function(retVal) { });
                                                                        }
                                                                        });
                                                   }
                                                   
                                                   } else {
                                                   totalCats += videoCategoriesObj.length;
                                                   for (var x = 0; x < videoCategoriesObj.length; x++) {
                                                   videoCategoryObj = videoCategoriesObj[x];
                                                   var cattitle = videoCategoryObj.CategoryTitle == undefined ? videoCategoryObj.Category : videoCategoryObj.CategoryTitle;
                                                   vidnotesurl = (videoCategoryObj.VideoNoteUrl==undefined || videoCategoryObj.VideoNoteUrl == null) ? "" : videoCategoryObj.VideoNoteUrl;
                                                   hasnotes = (vidnotesurl!==undefined && vidnotesurl.length > 0) ? true : false;
                                                   videocategory = new VideoCategory(videoGroupCategory.categoryid, cattitle, videoCategoryObj.CategoryId, videoCategoryObj.SeriesId, cattitle, videoCategoryObj.CategoryName, videoCategoryObj.VideoCount, videoCategoryObj.ViewOrder, false, "", "",vidnotesurl, hasnotes);
                                                   videoGroupCategory.videocategories.push(videocategory);
                                                   videocategory.videos = new Array();
                                                   videos = videoCategoryObj.Videos;
                                                   if (videos != undefined  && videos.length > 0) {
                                                   videocategory.setVideos(videos);
                                                   }else{
                                                   that.setVideoDetails(libraryId, videocategory, function(ret){
                                                                        if(ret !==undefined && ret !== false){
                                                                        videocategory = ret;
                                                                        }
                                                                        if(libraryId===eclassLibraryId){
                                                                        that.compareEClassExists(videocategory, function(retVal) {});
                                                                        }else{
                                                                        that.compareVideoExists(videocategory, function(retVal) { });
                                                                        }
                                                                        });
                                                   }
                                                   
                                                   }
                                                   }
                                                   if(libraryId === eclassLibraryId){
                                                   setLocalStorage(that._fileseClasses, that.eclasses, true, function(){});
                                                   }else{
                                                   setLocalStorage(that._filesVideoCategories, that.videocategories, true, function(){});
                                                   }
                                                   }
                                                   }
                                                   if(libraryId===eclassLibraryId){
                                                   that.getUserVideosListing(libraryId, function(ret) {                                                                                      eClassListing = ret;                                        returnFunction(ret);
                                                                             });
                                                   }else{
                                                   that.getUserVideosListing(libraryId, function(ret) {                                                                                      videoCategoryListing = ret;
                                                                             returnFunction(ret);                                       });
                                                   }
                                                   
                                                   }
                                                   }
                                                   }
                                                   }
                                                   });
        } else {
            
            if(libraryId === eclassLibraryId && eClassListing.length > 0){
                returnFunction(eClassListing);
            }else if (libraryId === videoLibraryID  && videoCategoryListing.length > 0) {
                returnFunction(videoCategoryListing);
            } else {
                this.getUserVideosListing(libraryId, function(ret) {
                                          if(libraryId===eclassLibraryId){
                                          eClassListing = ret;
                                          }else{
                                          videoCategoryListing = ret;
                                          }
                                          returnFunction(ret);
                                          });
            }
        }
    } catch (e) {
        errorHandler("User.getUserVideos", e);
        returnFunction("");
    }
},
setVideoDetails: function(libraryId, videocategory, returnFunction){
    try{
        var vidCatRef = videocategory.categoryid + "-" + videocategory.seriesid;
        var vidSeriesId =videocategory.seriesid;
        var vidCatId =videocategory.categoryid;
        var vidTabId =videocategory.tabid;
        var eclassLibraryId = eClassLibraryID;
        var that = this;
        coController.coVideoDetailsGet(vidTabId, vidCatRef, function(ret) {
               if (ret === undefined || ret === -1) {
                   returnFunction(false);
               }else{
                   var videos = ret;
                   if(videocategory!==undefined){
                   videocategory.setVideos(videos);
                   returnFunction(videocategory);
                   }else{
                   returnFunction(false);
                   }
               }
        });
    } catch (e) {
        errorHandler("User.setVideoDetails", e);
        returnFunction(false);
    }
},
compareEClassExists: function(vcitem, returnFunction) {
    try {
        var existVid;
        var localThumbNail = "";
        var thumbnailPath = "";
        var thumbNailFile;
        var extension = "mp4";
        var vidFound = false;
        if (this.existeClasses !== undefined && this.existeClasses.length > 0) {
            existVid = this.getVideocategoryFromListById(this.existeClasses, vcitem.tabid, vcitem.categoryid, vcitem.seriesid);
            if (existVid !== undefined) {
                vcitem.localthumbnail = existVid.localthumbnail;
                vcitem.alldownloaded = existVid.alldownloaded;
                if (existVid.videos !== undefined && existVid.videos.length > 0 && vcitem.videos !== undefined && vcitem.videos.length > 0) {
                    for (var y = 0; y < vcitem.videos.length; y++) {
                        var vid = vcitem.videos[y];
                        for (var v = 0; v < existVid.videos.length; v++) {
                            var vide = existVid.videos[v];
                            if (vid.videoid === vide.videoid) {
                                vid.isdownloaded = vide.isdownloaded;
                                vid.fileuri = vide.fileuri;
                                break;
                            }
                        }
                    }
                }
            }
        } else {
            for (var n = 0; n < vcitem.videos.length; n++) {
                var vidItem = vcitem.videos[n];
                var categoryDirectory = vidItem.categoryid.toString();
                var localFileName = vidItem.filename;
                localFileExists(videoMediaDir, categoryDirectory, localFileName, vidItem, "videocategories", false, false, false, function(ret) {});
            }
        }
        returnFunction(true);
    } catch (e) {
        errorHandler("User.compareEClassExists", e);
        returnFunction(false);
    }
},
compareVideoExists: function(vcitem, returnFunction) {
    try {
        var existVid;
        var localThumbNail = "";
        var thumbnailPath = "";
        var thumbNailFile;
        var extension = "mp4";
        if (this.existVids !== undefined && this.existVids.length > 0) {
            existVid = this.getVideocategoryFromListById(this.existVids, vcitem.tabid, vcitem.categoryid, vcitem.seriesid);
            if (existVid !== undefined) {
                vcitem.localthumbnail = existVid.localthumbnail;
                vcitem.alldownloaded = existVid.alldownloaded;
                if (existVid.videos !== undefined && existVid.videos.length > 0 && vcitem.videos !== undefined && vcitem.videos.length > 0) {
                    for (var y = 0; y < vcitem.videos.length; y++) {
                        var vid = vcitem.videos[y];
                        for (var v = 0; v < existVid.videos.length; v++) {
                            var vide = existVid.videos[v];
                            if (vid.videoid === vide.videoid) {
                                vid.isdownloaded = vide.isdownloaded;
                                vid.fileuri = vide.fileuri;
								 var categoryDirectory = vid.categoryid.toString();
								var localFileName = vid.filename;
								localFileExists(videoMediaDir, categoryDirectory, localFileName, vid, "videocategories", false, false, false, function(ret) {});
                                break;
                            }
                        }
                    }
                }
            }
        } else {
            for (var n = 0; n < vcitem.videos.length; n++) {
                var vidItem = vcitem.videos[n];
                var categoryDirectory = vidItem.categoryid.toString();
                var localFileName = vidItem.filename;
                localFileExists(videoMediaDir, categoryDirectory, localFileName, vidItem, "videocategories", false, false, false, function(ret) {});
            }
        }
        returnFunction(true);
    } catch (e) {
        errorHandler("User.compareVideoExists", e);
        returnFunction(false);
    }
},
getUserVideosListing: function(libraryId, returnFunction) {
    try {
        var videoStr = "";
        var tabId = 0;
        var eclassLibraryId = eClassLibraryID;
        var videocategorieslist;
        if (libraryId === eclassLibraryId) {
            videocategorieslist = this.eclasses;
        }else{
            videocategorieslist = this.videocategories;
        }
        for (var n = 0; n < videocategorieslist.length; n++) {
            var categoryGroup = videocategorieslist[n];
            var totalItems = categoryGroup.videocategories.length;
            tabId = categoryGroup.categoryid;
            
            if (n === 0) {
                videoStr += "<div id='videocategory-videos-" + tabId + "' data-role='collapsible' class='videocategorymedia categoryfirst' data-collapsed='false' data-theme='h' data-content-theme='d' data-inset='false' data-iconpos='right'>";
            } else {
                videoStr += "<div id='videocategory-videos-" + tabId + "' data-role='collapsible' class='videocategorymedia' data-collapsed='false' data-theme='h' data-content-theme='d' data-inset='false' data-iconpos='right'>";
            }
            videoStr += "<h3 class='podcastheaderdiv'><div style='margin: 0px;font-size: 0.9em;font-weight: bold !important;text-align: left !important;'>" + categoryGroup.categorytitle + "</div></h3>";
            videoStr += "<div id='vidserieslistul-" + tabId + "' class='podcastcattable'>";
            if (categoryGroup.videocategories != undefined && categoryGroup.videocategories.length > 0) {
                
                var videoLiStr = "<ul data-role='listview' data-theme='h' data-inset='true' class='podcastcatul'>";
                
                for (var y = 0; y < categoryGroup.videocategories.length; y++) {
                    var itemStr = "";
                    var videocat = categoryGroup.videocategories[y];
                    var vidCatId = videocat.tabid + "-" + videocat.categoryid + "-" + videocat.seriesid;
                    
                    var title =videocat.categorytitle;
                    itemStr += "<li class='catli'><a id='vidcategory-" + vidCatId + "' href='#' class='podseriesbtn videoseriesbtn'><div class='cattitlediv'><div class='catlititlediv'><div class='captionblockdiv'";
                    itemStr += " id='videocategorycaption-" + vidCatId + "'>" + title + "</div>";
                    itemStr += "<div class='imagecaptionsub'>" + videocat.videocount + " " + resources.videos + "</div></div>";
                    itemStr += "<div class='catnavdiv'></div></div>";
                    itemStr += "</a></li>";
                    videoLiStr += itemStr;
                }
                videoLiStr += "</ul></div>";
                videoStr += videoLiStr;
            } else {
                videoStr += "<div class='podcastcatdiv'></div>";
            }
            videoStr += "</div>";
        }
        returnFunction(videoStr);
    } catch (e) {
        errorHandler("User.getUserVideosListing", e);
        returnFunction("");
    }
},
getVideocategoryById: function(tabId, videoCategoryId, seriesId) {
    try {
        var catFound = false;
        var videoCategory;
        var videoCategories = new Array();
        if (this.videocategories !== undefined && this.videocategories.length > 0){
            for (b=0; b<this.videocategories.length; b++){
                videoCategories.push(this.videocategories[b]);
            }
        }
        if (this.eclasses !== undefined && this.eclasses.length > 0){
            for (a=0; a<this.eclasses.length; a++){
                videoCategories.push( this.eclasses[a]);
            }
        }
        if (!(videoCategories == undefined)) {
            for (var i = 0; i < videoCategories.length; i++) {
                var vc = videoCategories[i];
                if (vc.tabid == tabId && vc.categoryid == videoCategoryId && vc.seriesid == seriesId) {
                    videoCategory = vc;
                    catFound = true;
                    break;
                } else {
                    if (!(vc.videocategories == undefined && vc.videocategories.length > 0)) {
                        for (var x = 0; x < vc.videocategories.length; x++) {
                            var vcitem = vc.videocategories[x];
                            if (vcitem.categoryid == videoCategoryId && vcitem.tabid == tabId && vcitem.seriesid == seriesId) {
                                videoCategory = vcitem;
                                catFound = true;
                                break;
                            }
                        }
                    }
                }
                if (catFound === true) {
                    break;
                }
            }
        }
        return videoCategory;
    } catch (e) {
        errorHandler("User.getVideocategoryById", e);
        return;
    }
},
getVideocategoryFromListById: function(vids, tabId, videoCategoryId, seriesId) {
    try {
        var catFound = false;
        var videoCategory;
        if (!(vids == undefined)) {
            for (var i = 0; i < vids.length; i++) {
                var vc = vids[i];
                if (vc.tabid == tabId && vc.categoryid == videoCategoryId && vc.seriesid == seriesId) {
                    videoCategory = vc;
                    catFound = true;
                    break;
                } else {
                    if (vc.videocategories !== undefined && vc.videocategories.length > 0) {
                        for (var x = 0; x < vc.videocategories.length; x++) {
                            var vcitem = vc.videocategories[x];
                            if (vcitem.categoryid == videoCategoryId && vcitem.tabid == tabId && vcitem.seriesid == seriesId) {
                                videoCategory = vcitem;
                                catFound = true;
                                break;
                            }
                        }
                    }
                }
                if (catFound === true) {
                    break;
                }
            }
        }
        return videoCategory;
    } catch (e) {
        errorHandler("User.getVideocategoryFromListById", e);
        return;
    }
},
getFirstVideoCategory: function() {
    try {
        var videoCategory;
        var catFound = false;
        var videoCategories;
        if (this.videocategories !== undefined && this.videocategories.length > 0){
            for (b=0; b<this.videocategories.length; b++){
                videoCategories.Add(this.videocategories[b]);
            }
        }
        if (this.eclasses !== undefined && this.eclasses.length > 0){
            for (a=0; a<this.eclasses.length; a++){
                videoCategories.Add( this.eclasses[a]);
            }
        }
        if (!(videoCategories == undefined)) {
            for (var i = 0; i < videoCategories.length; i++) {
                var vc = videoCategories[i];
                if (!(vc.videocategories == undefined && vc.videocategories.length > 0)) {
                    videoCategory = vc.videocategories[0];
                    catFound = true;
                }
                if (catFound === true) {
                    break;
                }
            }
        }
        return videoCategory;
    } catch (e) {
        errorHandler("User.getFirstVideoCategory", e);
        return undefined;
    }
},
updateVideoViews: function(videoId, returnFunction) {
    try {
        if (videoId > 0) {
            coController.coVideoViewsUpdate(videoId, function(ret) {
                                            if (ret === undefined || ret === -1) {
                                            if (showOfflineMessage === true) {
                                            showOfflineMessage = false;
                                            msgStr = resources.connectionFail;
                                            msgTitle = resources.connError;
                                            msgBtnValue = resources.btnOk;
                                            navigator.notification.alert(msgStr, function() {
                                                                         hidePleaseWait();
                                                                         returnFunction("");
                                                                         }, msgTitle, msgBtnValue);
                                            } else {
                                            hidePleaseWait();
                                            returnFunction("");
                                            }
                                            } else {
                                            if (ret === 0) {
                                            returnFunction("");
                                            } else {
                                            returnFunction(ret);
                                            }
                                            }
                                            });
        }
    } catch (e) {
        errorHandler("User.updateVideoViews", e);
        returnFunction("");
    }
},
getUserAudios: function(audioInit, returnFunction) {
    try {
        var audioStr = "";
        if ((this.audiocategories === undefined || this.audiocategories.length === 0 || audioInit === true) && deviceIsOnline === true) {
            var audios;
            var audioCategories;
            this.audiocategories = new Array();
            var audsToProcess = {};
            var that = this;
            coController.coAudioGroupCategoriesGet(function(ret) {
                                                   if (ret === undefined || ret === -1) {
                                                   if (showOfflineMessage === true) {
                                                   showOfflineMessage = false;
                                                   msgStr = resources.connectionFail;
                                                   msgTitle = resources.connError;
                                                   msgBtnValue = resources.btnOk;
                                                   navigator.notification.alert(msgStr, function() {
                                                                                hidePleaseWait();
                                                                                returnFunction("");
                                                                                }, msgTitle, msgBtnValue);
                                                   } else {
                                                   returnFunction("");
                                                   }
                                                   } else {
                                                   if (ret === 0) {
                                                   returnFunction("");
                                                   } else {
                                                   var thumbNailDownloaded = false;
                                                   var localThumbNail = "";
                                                   var remoteMediaFileUrl = "";
                                                   var audioGroupCategoriesObj = ret;
                                                   if (audioGroupCategoriesObj !== undefined) {
                                                   var audioGroupCategoryObj;
                                                   var audioGroupCategory;
                                                   var audioCategoriesObj;
                                                   var audioCategoryObj;
                                                   var audcatid = "";
                                                   if (audioGroupCategoriesObj.length == undefined) {
                                                   audioGroupCategoryObj = audioGroupCategoriesObj;
                                                   var title = audioGroupCategoryObj.AudioCategoryGroupTitle;
                                                   audioGroupCategory = new AudioCategory(0, title, audioGroupCategoryObj.AudioCategoryId, title, "", 0, audioGroupCategoryObj.ViewOrder, "", false, false, false, "", "", -1, "");
                                                   that.audiocategories.push(audioGroupCategory);
                                                   audioGroupCategory.audiocategories = new Array();
                                                   audioCategoriesObj = audioGroupCategoryObj.Categories;
                                                   if (audioCategoriesObj != undefined) {
                                                   for (var i = 0; i < audioCategoriesObj.length; i++) {
                                                   audioCategoryObj = audioCategoriesObj[i];
                                                   audcatid = audioCategoryObj.AudioCategoryId + "-" + audioCategoryObj.AudioSeriesId;
                                                   audiocategory = new AudioCategory(audioGroupCategory.AudioCategoryId, audioCategoryObj.AudioCategoryTitle, audcatid, audioCategoryObj.AudioCategoryTitle, audioCategoryObj.Description, audioCategoryObj.AudioCount, audioCategoryObj.SeriesViewOrder, audioCategoryObj.Thumbnail, false, false, false, "", audioCategoryObj.AllTracksUrl, -1, "");
                                                   audioGroupCategory.audiocategories.push(audiocategory);
                                                   if (audioCategoryObj.Audios != undefined) {
                                                   audios = audioCategoryObj.Audios;
                                                   if (audios != undefined) {
                                                   audiocategory.setAudios(audios);
                                                   that.compareAudioExists(audiocategory, function(retVal) {});
                                                   }
                                                   }
                                                   
                                                   }
                                                   setLocalStorage(that._filesAudioCategories, that.audiocategories, false, function(){});
                                                   }
                                                   } else {
                                                   for (var y = 0; y < audioGroupCategoriesObj.length; y++) {
                                                   audioGroupCategoryObj = audioGroupCategoriesObj[y];
                                                   audioGroupCategory = new AudioCategory(0, audioGroupCategoryObj.AudioCategoryGroupTitle, audioGroupCategoryObj.AudioCategoryId, audioGroupCategoryObj.AudioCategoryGroupTitle, "", 0, audioGroupCategoryObj.ViewOrder, "", false, false, false, "", "", -1, "");
                                                   that.audiocategories.push(audioGroupCategory);
                                                   audioGroupCategory.audiocategories = new Array();
                                                   audioCategoriesObj = audioGroupCategoryObj.Categories;
                                                   if (audioCategoriesObj != undefined) {
                                                   for (var x = 0; x < audioCategoriesObj.length; x++) {
                                                   audioCategoryObj = audioCategoriesObj[x];
                                                   audcatid = audioCategoryObj.AudioCategoryId + "-" + audioCategoryObj.AudioSeriesId;
                                                   audiocategory = new AudioCategory(audioGroupCategoryObj.AudioCategoryId, audioCategoryObj.AudioCategoryTitle, audcatid, audioCategoryObj.AudioCategoryTitle, audioCategoryObj.Description, audioCategoryObj.AudioCount, audioCategoryObj.SeriesViewOrder, audioCategoryObj.Thumbnail, false, false, false, "", audioCategoryObj.AllTracksUrl, -1, "");
                                                   audioGroupCategory.audiocategories.push(audiocategory);
                                                   if (audioCategoryObj.Audios != undefined) {
                                                   audios = audioCategoryObj.Audios;
                                                   audiocategory.setAudios(audios);
                                                   that.compareAudioExists(audiocategory, function(retVal) {});
                                                   }
                                                   }
                                                   setLocalStorage(that._filesAudioCategories, that.audiocategories, false, function(){});
                                                   }
                                                   }
                                                   }
                                                   }
                                                   that.getUserAudiosListing(function(ret) {
                                                                             audioCategoryListing = ret;
                                                                             returnFunction(ret);
                                                                             });
                                                   }
                                                   }
                                                   });
        } else {
            if (audioCategoryListing.length > 0) {
                returnFunction(audioCategoryListing);
            } else {
                this.getUserAudiosListing(function(ret) {
                                          audioCategoryListing = ret;
                                          returnFunction(audioCategoryListing);
                                          });
            }
        }
    } catch (e) {
        errorHandler("User.getUserAudios", e);
        returnFunction("");
    }
},
compareAudioExists: function(acitem, returnFunction) {
    try {
        var existAud;
        var localThumbNail = "";
        var thumbnailPath = "";
        var thumbNailFile;
        var extension = "mp3";
        var audFound = false;
        if (this.existAuds !== undefined && this.existAuds.length > 0) {
            existAud = this.getAudiocategoryByIdFromList(this.existAuds, acitem.tabid, acitem.categoryid);
            if (existAud !== undefined) {
                acitem.localthumbnail = existAud.localthumbnail;
                acitem.alldownloaded = existAud.alldownloaded;
                acitem.audiomixurl = existAud.audiomixurl;
                acitem.audiomixdownloaded = existAud.audiomixdownloaded;
                if (existAud.audios !== undefined && existAud.audios.length > 0 && acitem.audios !== undefined && acitem.audios.length > 0) {
                    for (var y = 0; y < acitem.audios.length; y++) {
                        var aud = acitem.audios[y];
                        for (var v = 0; v < existAud.audios.length; v++) {
                            var aude = existAud.audios[v];
                            if (aud.audioid === aude.audioid) {
                                aud.isdownloaded = aude.isdownloaded;
                                aud.fileuri = aude.fileuri;
                                aud.mixdownloaded = aude.mixdownloaded;
                                break;
                            }
                        }
                    }
                }
                if (existAud.audiotracks !== undefined && existAud.audiotracks.length > 0) {
                    acitem.audiotracks = existAud.audiotracks;
                }
            }
        } else {
            var audiolocalFileName = "alltracks.mp3";
            var audiocategoryDirectory = acitem.tabid.toString() + "-" + acitem.categoryid.toString();
            localFileExists(audioMediaDir, audiocategoryDirectory, audiolocalFileName, acitem, "audiocategories", true, false, false, function(ret) {});
            for (var n = 0; n < acitem.audios.length; n++) {
                var audItem = acitem.audios[n];
                var categoryDirectory = audItem.categoryid.toString();
                var localFileName = audItem.filename;
                localFileExists(audioMediaDir, categoryDirectory, localFileName, audItem, "audiocategories", false, false, false, function(ret) {});
            }
        }
        if (acitem.localthumbnail.length === 0 && acitem.thumbnail.length > 0) {
            acitem.setAudioCategoryThumbnail(function(ret) {});
        }
        returnFunction(true);
    } catch (e) {
        errorHandler("User.compareAudioExists", e);
        returnFunction(false);
    }
},
comparePlaylistExists: function(playlist, returnFunction) {
    try {
        if(this.audiocategories !== undefined && this.audiocategories.length > 0){
            var playlistitem, category, audioid, audio;
            for (var x = 0; x < playlist.playlistitems.length; x++){
                playlistitem =playlist.playlistitems[x];
                if(playlistitem!==undefined){
                    var ids = playlistitem.categoryref.split("-");
                    var tabId = ids[0];
                    var audiocategoryid = ids[1] + "-" + ids[2];
                    var category = activeUser.getAudiocategoryById(tabId, audiocategoryid);
                    if (category!==undefined && category.audios!==undefined && category.audios.length>0){
                        var audio = category.getAudioItemById(playlistitem.audioid + "mp3");
                        if(audio!==undefined){
                            playlistitem.filePath = audio.fileuri.length > 0 ? audio.fileuri : audio.audiopath;
                            playlistitem.isdownloaded = audio.isdownloaded;
                        }
                    }
                }
            }
            activeUser.saveFilesList(undefined, "userplaylists", true, function() {});
        }
        returnFunction(true);
    } catch (e) {
        errorHandler("User.comparePlaylistExists", e);
        returnFunction(false);
    }
},
getUserAudiosListing: function(returnFunction) {
    try {
        var audioStr = "";
        var tabId = 0;
        for (var n = 0; n < this.audiocategories.length; n++) {
            var categoryGroup = this.audiocategories[n];
            tabId = categoryGroup.categoryid;
            
            if (n === 0) {
                audioStr += "<div id='audiocategory-audios-" + tabId + "' data-role='collapsible' class='audiocategorymedia categoryfirst' data-collapsed='false' data-theme='h' data-iconpos='right'>";
            } else {
                audioStr += "<div id='audiocategory-audios-" + tabId + "' data-role='collapsible' class='audiocategorymedia' data-collapsed='false' data-theme='h' data-iconpos='right'>";
            }
            
            audioStr += "<h3 class='podcastheaderdiv'><div style='margin: 0px;font-size: 0.9em;font-weight: bold !important;text-align: left !important;'>" + categoryGroup.categorytitle + "</div></h3>";
            if (categoryGroup.audiocategories != undefined && categoryGroup.audiocategories.length > 0) {
                var audioLiStr = "<div id='audserieslistul-" + tabId + "' class='podcastcattable'>";
                audioLiStr += "<ul data-role='listview' data-theme='h' data-inset='true' class='podcastcatul'>";
                
                for (var y = 0; y < categoryGroup.audiocategories.length; y++) {
                    var itemStr = "";
                    var audiocat = categoryGroup.audiocategories[y];
                    var audCatId = audiocat.tabid + "-" + audiocat.categoryid;
                    itemStr += "<li class='catli'><a id='audcategory-" + audCatId + "' href='#' class='podseriesbtn audioseriesbtn'><div class='cattitlediv'><div class='catlititlediv'><div class='captionblockdiv'";
                    var title =audiocat.categorytitle;
                    itemStr += " id='audiocategorycaption-" + audCatId + "'>" + title + "</div>";
                    itemStr += "<div class='imagecaptionsub'>" + audiocat.audiocount + " " + resources.tracks + "</div></div>";
                    itemStr += "<div class='catnavdiv'></div></div>";
                    itemStr += "</a></li>";
                    audioLiStr += itemStr;
                }
                
                audioLiStr += "</ul></div>";
                audioStr += audioLiStr;
            } else {
                audioStr += "<div class='podcastcatdiv'></div>";
            }
            audioStr += "</div>";
        }
        returnFunction(audioStr);
    } catch (e) {
        errorHandler("User.getUserAudiosListing", e);
        returnFunction("");
    }
},
getUserPlaylistListing: function(returnFunction) {
    try {
        var playlistStr = "";
        var tabId = 0;
        if (this.userplaylists != undefined && this.userplaylists.length > 0) {
            var playlistId = 0;
            var playlistLiStr = "<div id='playlistserieslistul' class='podcastcattable'>";
            playlistLiStr += "<ul data-role='listview' data-theme='h' data-inset='true' class='podcastcatul'>";
            
            for (var y = 0; y < this.userplaylists.length; y++) {
                var itemStr = "";
                var playlist = this.userplaylists[y];
                playlistId = playlist.userplaylistid;
                if (playlistId===0 && playlist.tempid > 0){
                    playlistId = "temp" + playlist.tempid;
                }
                itemStr += "<li class='catli'><a id='playlist-" + playlistId + "' href='#' class='podseriesbtn playlistseriesbtn'>";
                itemStr += "<div class='cattitlediv'><div class='catlititlediv'><div class='captionblockdiv'";
                itemStr += " id='audiocaptionblock-" + playlistId + "'>" + playlist.title + "</div>";
                itemStr += "<div class='imagecaptionsub'>"+ playlist.audiocount + " " + resources.tracks + "</div></div>";
                itemStr += "<div class='catnavdiv'></div>";
                itemStr +="<div id='playlistchkbx-" + playlistId + "' class='playlistchkbxdiv playlistchkbx nodisplay'></div>";
                itemStr += "</div></a></li>";
                
                playlistLiStr += itemStr;
            }
            playlistLiStr += "</ul></div>";
            playlistStr += playlistLiStr;
        } else {
            playlistStr += "";
        }
        returnFunction(playlistStr);
    } catch (e) {
        errorHandler("User.getUserPlaylistListing", e);
        returnFunction("");
    }
},
getPlaylistById: function(playlistId){
    try {
        if (!(this.userplaylists === undefined && this.userplaylists.length === 0)) {
            var playlist;
            for (var i = 0; i < this.userplaylists.length; i++) {
                var pl = this.userplaylists[i];
                if (pl.userplaylistid == playlistId || pl.userplaylistid===0 && pl.tempid===playlistId) {
                    playlist = pl;
                    break;
                }else if (pl.userplaylistid===0 && playlistId.indexOf("temp") > -1 && pl.tempid==playlistId.replace("temp","")){
                    playlist = pl;
                    break;
                }
            }
            var returnPlaylist = checkPlaylistItems(playlist);
            return returnPlaylist;
        } else {
            return undefined;
        }
    } catch (e) {
        errorHandler("User.getPlaylistById", e);
        return undefined;
    }
},
comparePlaylistOrder: function(a, b) {
    try{
        if(a.title < b.title) {return -1;}
        if(a.title > b.title) {return 1;}
        return 0;
    }catch(e){
        errorHandler("User.comparePlaylistOrder", e);
    }
},
getAudiocategoryById: function(tabId, audioCategoryId) {
    try {
        if (!(this.audiocategories === undefined && this.audiocategories.length === 0)) {
            var audioCategory;
            for (var i = 0; i < this.audiocategories.length; i++) {
                var ac = this.audiocategories[i];
                if (ac.tabid == tabId || ac.tabid == 0) {
                    if (ac.categoryid === audioCategoryId && ac.tabid !== 0 && ac.categoryid !== 0) {
                        audioCategory = ac;
                        break;
                    } else {
                        var audioGroupId = ac.categoryid;
                        if (ac.audiocategories !== undefined && ac.audiocategories.length > 0) {
                            for (var x = 0; x < ac.audiocategories.length; x++) {
                                var acitem = ac.audiocategories[x];
                                if (acitem.categoryid == audioCategoryId && acitem.tabid == audioGroupId) {
                                    return acitem;
                                }
                            }
                        }
                    }
                }
            }
            return audioCategory;
        } else {
            return undefined;
        }
    } catch (e) {
        errorHandler("User.getAudiocategoryById", e);
        return undefined;
    }
},
setAudiocategoryAudios: function(existingAudioItems, newAudioItems) {
    try {
        if ((existingAudioItems !== undefined && existingAudioItems.length > 0) && (newAudioItems !== undefined && newAudioItems.length > 0)) {
            for (var i = 0; i < newAudioItems.length; i++) {
                var ac = newAudioItems[i];
                for (var x = 0; x < existingAudioItems.length; x++) {
                    var acitem = existingAudioItems[x];
                    if (ac.audioid === acitem.audioid) {
                        ac.isdownloaded = acitem.isdownloaded;
                        ac.fileuri = acitem.fileuri;
                        ac.mixdownloaded = acitem.mixdownloaded;
                        break;
                    }
                }
            }
            return true;
        } else {
            return true;
        }
    } catch (e) {
        errorHandler("User.setAudiocategoryAudios", e);
        return false;
    }
},
getAudiocategoryByIdFromList: function(existAuds, tabId, audioCategoryId) {
    try {
        if (!(existAuds === undefined && existAuds.length === 0)) {
            var audioCategory;
            for (var i = 0; i < existAuds.length; i++) {
                var ac = existAuds[i];
                if (ac.tabid == tabId || ac.tabid == 0) {
                    if (ac.categoryid === audioCategoryId && ac.tabid !== 0 && ac.categoryid !== 0) {
                        audioCategory = ac;
                        break;
                    } else {
                        var audioGroupId = ac.categoryid;
                        if (!(ac.audiocategories === undefined && ac.audiocategories.length === 0)) {
                            for (var x = 0; x < ac.audiocategories.length; x++) {
                                var acitem = ac.audiocategories[x];
                                if (acitem.categoryid == audioCategoryId && acitem.tabid == audioGroupId) {
                                    return acitem;
                                }
                            }
                        }
                    }
                }
            }
            return audioCategory;
        } else {
            return undefined;
        }
    } catch (e) {
        errorHandler("User.getAudiocategoryByIdFromList", e);
        return undefined;
    }
},
addUserPlaylist: function(playlistTitle, returnFunction){
    try {
        var addPL = true;
        var vieworder = 0;
        var thumbnail = "";
        var tempId = 0;
        var pl;
        if(this.userplaylists!==undefined && this.userplaylists.length > 0){
            for (var i=0; i < this.userplaylists.length; i++){
                pl = this.userplaylists[i];
                if(pl.tempid > 0 && pl.tempid > tempId){
                    tempId = pl.tempid;
                }
                if(pl.title.toLowerCase() === playlistTitle.toLowerCase()){
                    addPL=false;
                    break;
                }
            }
        }
        if (addPL === false){
            msgTitle = resources.requiredFields;
            msgBtnValue = resources.btnOk;
            msgStr = resources.playlisttitleunique;
            navigator.notification.confirm(msgStr, function() {
                                           returnFunction(false);
                                           }, msgTitle, msgBtnValue);
        }else{
            
            var newPlaylist = new UserPlaylist(0, playlistTitle, 0, vieworder, thumbnail, false, thumbnail,
                                               true, false, tempId + 1);
            newPlaylist.playlistitems = new Array();
            this.userplaylists.push(newPlaylist);
            this.userplaylists = this.userplaylists.sort(this.comparePlaylistOrder);
            for (var y=0; y < this.userplaylists.length; y++){
                pl = this.userplaylists[y];
                pl.vieworder = y;
            }
            setLocalStorage(this._filesPlaylists, this.userplaylists, true, function(){});
            this.getUserPlaylistListing(function(ret) {
                                        playlistListing = ret;
                                        });
            
            var that = this;
            coController.coUserPlaylistSave(newPlaylist, function(ret) {
                                            
                                            if (ret === undefined || ret === -1) {
                                            returnFunction(false);
                                            } else if (ret === 0) {
                                            returnFunction(false);
                                            } else {
                                            var playlistObj = ret;
                                            if (playlistObj !== undefined) {
                                            newPlaylist.userplaylistid = playlistObj.AudioPlaylistId;
                                            
                                            newPlaylist.updatepending=false;
                                            newPlaylist.tempid=0;
                                            setLocalStorage(that._filesPlaylists, that.userplaylists, false, function(){});
                                            currentPlaylist = newPlaylist;
                                            that.getUserPlaylistListing(function(ret) {
                                                                        playlistListing = ret;
                                                                        });
                                            }
                                            returnFunction(true);
                                            }
                                            });
        }
    } catch (e) {
        errorHandler("User.addUserPlaylist", e);
        returnFunction(false);
    }
},
updateUserPlaylist: function(playlist, returnFunction){
    try {
        var addPL = true;
        var vieworder = 0;
        var thumbnail = "";
        var tempId = 0;
        var pl;
        if(this.userplaylists!==undefined && this.userplaylists.length > 0){
            var that = this;
            coController.coUserPlaylistUpdate(playlist, function(ret) {
                                              
                                              if (ret === undefined || ret === -1) {
                                              returnFunction(false);
                                              } else if (ret === 0) {
                                              returnFunction(false);
                                              } else {
                                              var playlistObj = ret;
                                              if (playlistObj !== undefined) {
                                              playlist.userplaylistid = playlistObj.AudioPlaylistId;
                                              
                                              playlist.updatepending=false;
                                              playlist.tempid=0;
                                              
                                              if (playlistObj.PlaylistItems != undefined) {
                                              playlist.playlistitems = new Array();
                                              playlist.setPlaylistItems(playlistObj.PlaylistItems);
                                              }
                                              setLocalStorage(that._filesPlaylists, that.userplaylists, false, function(){});
                                              that.getUserPlaylistListing(function(ret) {
                                                                          playlistListing = ret;
                                                                          });
                                              }
                                              returnFunction(true);
                                              }
                                              });
        }
    } catch (e) {
        errorHandler("User.updateUserPlaylist", e);
        returnFunction(false);
    }
},
deleteUserPlaylists: function(playlistIds, returnFunction){
    try {
        var vieworder = 0;
        var tempId = 0;
        var pl;
        if(this.userplaylists!==undefined && this.userplaylists.length > 0 && playlistIds.length > 0){
            var ids = playlistIds.split(",");
            for (var x=0; x < ids.length; x++){
                var id = ids[x];
                for (var i=0; i < this.userplaylists.length; i++){
                    pl = this.userplaylists[i];
                    if(pl.userplaylistid == id || (pl.userplaylistid===0 && pl.tempid===id)){
                        this.userplaylists.splice(i,1);
                    }
                }
            }
            
            this.userplaylists = this.userplaylists.sort(this.comparePlaylistOrder);
            for (var y=0; y < this.userplaylists.length; y++){
                pl = this.userplaylists[y];
                pl.vieworder = y;
            }
            setLocalStorage(this._filesPlaylists, this.userplaylists, true, function(){});
            this.getUserPlaylistListing(function(ret) {
                                        playlistListing = ret;
                                        });
            var that = this;
            coController.coUserPlaylistsDelete(playlistIds, function(ret) {
                                               
                                               if (ret === undefined || ret === -1) {
                                               returnFunction(false);
                                               } else if (ret === 0) {
                                               returnFunction(false);
                                               } else {
                                               that.getUserPlaylistListing(function(ret) {
                                                                           playlistListing = ret;
                                                                           });
                                               returnFunction(true);
                                               
                                               }
                                               });
        }
    } catch (e) {
        errorHandler("User.deleteUserPlaylists", e);
        returnFunction(false);
    }
},
getUserPlaylists: function(playlistInit, returnFunction) {
    try {
        var playlistStr = "";
        ///  CHECK IF ANY PLAYLISTS HAVE PENDING SUBMITS
        
        //
        if ((this.userplaylists === undefined || this.userplaylists.length === 0 || playlistInit === true) && deviceIsOnline === true) {
            var playlistItems;
            var playlists;
            this.userplaylists = new Array();
            var that = this;
            
            coController.coUserPlaylistsGet(function(ret) {
                                            if (ret === undefined || ret === -1) {
                                            returnFunction("");
                                            } else if (ret === 0) {
                                            returnFunction("");
                                            } else {
                                            var playlistsObj = ret;
                                            if (playlistsObj !== undefined) {
                                            var playlistObj;
                                            var newPlaylist;
                                            if (playlistsObj.length == undefined) {
                                            playlistObj = playlistsObj;
                                            
                                            if( playlistObj.ThumbnailUrl===null){ playlistObj.ThumbnailUrl="";}
                                            newPlaylist = new UserPlaylist(playlistObj.AudioPlaylistId, playlistObj.Title, playlistObj.AudioCount, playlistObj.ViewOrder, playlistObj.ThumbnailUrl, false, "", false, false, 0);
                                            that.userplaylists.push(newPlaylist);
                                            
                                            newPlaylist.playlistitems = new Array();
                                            if (playlistObj.PlaylistItems != undefined) {
                                            newPlaylist.setPlaylistItems(playlistObj.PlaylistItems);
                                            }
                                            that.comparePlaylistExists(newPlaylist, function(retVal) {});
                                            setLocalStorage(that._filesPlaylists, that.userplaylists, false, function(){});
                                            } else {
                                            for (var y = 0; y < playlistsObj.length; y++) {
                                            playlistObj = playlistsObj[y];
                                            if( playlistObj.ThumbnailUrl===null){ playlistObj.ThumbnailUrl="";}
                                            newPlaylist = new UserPlaylist(playlistObj.AudioPlaylistId, playlistObj.Title, playlistObj.AudioCount, playlistObj.ViewOrder, playlistObj.ThumbnailUrl, false, "", false, false, 0);
                                            that.userplaylists.push(newPlaylist);
                                            
                                            newPlaylist.playlistitems = new Array();
                                            if (playlistObj.PlaylistItems != undefined) {
                                            newPlaylist.setPlaylistItems(playlistObj.PlaylistItems);
                                            }
                                            that.comparePlaylistExists(newPlaylist, function(retVal) {});
                                            
                                            }
                                            
                                            setLocalStorage(that._filesPlaylists, that.userplaylists, false, function(){});
                                            }
                                            setLocalStorage(that._filesPlaylists, that.userplaylists, false, function(){});
                                            that.getUserPlaylistListing(function(ret) {
                                                                        playlistListing = ret;
                                                                        returnFunction(ret);
                                                                        });
                                            
                                            }
                                            }
                                            });
            
        } else {
            if (playlistListing.length > 0) {
                returnFunction(playlistListing);
            } else {
                this.getUserPlaylistListing(function(ret) {
                                            playlistListing = ret;
                                            returnFunction(playlistListing);
                                            });
                
            }
        }
    } catch (e) {
        errorHandler("User.getUserPlaylists", e);
        returnFunction("");
    }
},
getPlaylistTracks: function(returnFunction) {
    try {
        if(playlistTracks!==undefined && playlistTracks.length ===0){
            var listStr = "";
            var tabId = 0;
            var category;
            for (var n = 0; n < this.audiocategories.length; n++) {
                //if(n>0){break;}
                var categoryGroup = this.audiocategories[n];
                tabId = categoryGroup.categoryid;
                if (n === 0) {
                    listStr += "<div id='audiocategory-playlists-" + tabId + "' data-role='collapsible' class='playlistmedia' data-collapsed='false' data-theme='h' data-content-theme='h' data-inset='false' data-iconpos='right'>";
                } else {
                    listStr += "<div id='audiocategory-playlists-" + tabId + "' data-role='collapsible' class='playlistmedia' data-collapsed='true' data-theme='h' data-content-theme='h' data-inset='false' data-iconpos='right'>";
                }
                listStr += "<h3 class='podcastheaderdiv playlistitemsheaderdiv'>" + categoryGroup.categorytitle + "</h3>";
                if (categoryGroup.audiocategories != undefined && categoryGroup.audiocategories.length > 0) {
                    listStr += "<div class='tracksuldiv'><ul class='pltrackscategory' data-theme='h' data-role='listview' data-inset='true'>";
                    
                    for (var y = 0; y < categoryGroup.audiocategories.length; y++) {
                        //if(y>0){break;}
                        category =categoryGroup.audiocategories[y];
                        var catId = category.tabid + "-" + category.categoryid;
                        listStr += "<li data-role='list-divider' class='tracksheader'>";
                        listStr +=category.categorytitle;
                        listStr +="</li>";
                        if(category.audios!==undefined && category.audios.length > 0){
                            
                            for(var x=0; x<category.audios.length; x++){
                                var audio = category.audios[x];
                                listStr +="<li id='plli-";
                                var audioId = catId + "-" + audio.audioid;
                                listStr += audioId + "' >";
                                listStr += "<div class='pltrackitems pldiv-" + audio.audioid.replace("mp3","") + "'>";
                                
                                var title = (x + 1) + ".   " + audio.audiotitle + " " + audio.tracktitle + " (" + audio.artist + ") : " + audio.length;
                                listStr += "<a id='pl-" + audioId + "' class='trackitemlink'><div class='tracksitemdiv podcastitemaudiodiv ";
                                listStr += "'>" + title;
                                listStr += "</div></a>";
                                listStr += "<div id='plchkbx-" + audioId + "' class='trackschbxdiv pltrackschkbx'></div></div>";
                                listStr += "</li>";
                            }
                            
                        }
                    }
                    listStr += "</ul></div>";
                }
                listStr += "</div>";
            }
            
            playlistTracks=listStr;
        }
        returnFunction(playlistTracks);
    } catch (e) {
        errorHandler("User.getPlaylistTracks", e);
        returnFunction("");
    }
},
setUserPlaylistIconFile: function(returnFunction){
    try{
        var itemDirStr = "0";
        var localFileName = "playlisticon.png";
        var remoteUrl = configs.getCustom("CS_PLAYLIST_ICONFILE");
        var remoteMediaFileUrl="";
        if (audioMediaDir != undefined) {
            audioMediaDir.getDirectory(itemDirStr, {
                                       create: true,
                                       exclusive: false
                                       }, function(itemDir) {
                                       itemDir.getFile(localFileName, {
                                                       create: false,
                                                       exclusive: false
                                                       }, function(fileE) {
                                                       userPlaylistIconFile = fileE.toURL();
                                                       returnFunction(fileE.toURL());
                                                       },
                                                       function(error) {
                                                       if (deviceIsOnline === true) {
                                                       itemDir.getFile(localFileName, {
                                                                       create: true,
                                                                       exclusive: true
                                                                       }, function(fileEntry) {
                                                                       var localMediaPath = fileEntry.toURL();
                                                                       remoteMediaFileUrl = encodeURI(remoteUrl);
                                                                       var ft = new FileTransfer();
                                                                       var fileNameURL = "";
                                                                       var onFileDownloadSuccess = function(entry) {
                                                                       userPlaylistIconFile = entry.toURL();
                                                                       ft = null;
                                                                       returnFunction(entry.toURL());
                                                                       };
                                                                       var onFileDownloadError = function(error) {
                                                                       
                                                                       ft = null;
                                                                       if (entry !== undefined) {
                                                                       try {
                                                                       entry.remove();
                                                                       } catch (e) {}
                                                                       }
                                                                       returnFunction("");
                                                                       };
                                                                       ft.download(remoteMediaFileUrl, localMediaPath, onFileDownloadSuccess, onFileDownloadError, true);
                                                                       }, function(error) {
                                                                       returnFunction("");
                                                                       });
                                                       }else{
                                                       returnFunction("");
                                                       }
                                                       });
                                       },function(error){
                                       returnFunction("");
                                       });
        }
        
        
    } catch (e) {
        errorHandler("User.setUserPlaylistIconFile", e);
        returnFunction("");
    }
}
};
var Issue = function(issueid, projectid, issuecreatorid, issuecreatorname, requesterid, requestername, issuetitle, datecreated, issuecategoryid, statusname, categoryname, projectname) {
    try {
        this.init(issueid, projectid, issuecreatorid, issuecreatorname, requesterid, requestername, issuetitle, datecreated, issuecategoryid, statusname, categoryname, projectname);
    } catch (e) {
        errorHandler("Issue", e);
    }
};
Issue.prototype = {
init: function(issueid, projectid, issuecreatorid, issuecreatorname, requesterid, requestername, issuetitle, datecreated, issuecategoryid, statusname, categoryname, projectname) {
    try {
        if (issueid == undefined) {
            issueid = 0;
        }
        if (projectid == undefined) {
            projectid = 0;
        }
        if (issuecreatorid == undefined) {
            issuecreatorid = 0;
        }
        if (issuecreatorname == undefined) {
            issuecreatorname = "";
        }
        if (requesterid == undefined) {
            requesterid = 0;
        }
        if (requestername == undefined) {
            requestername = "";
        }
        if (issuetitle == undefined) {
            issuetitle = "";
        }
        if (datecreated == undefined) {
            datecreated = "";
        }
        if (issuecategoryid == undefined) {
            issuecategoryid = 0;
        }
        if (statusname == undefined) {
            statusname = "";
        }
        if (projectname == undefined) {
            projectname = "";
        }
        if (categoryname == undefined) {
            categoryname = "";
        }
        this.issueid = issueid;
        this.projectid = projectid;
        this.issuecreatorid = issuecreatorid;
        this.issuecreatorname = issuecreatorname;
        this.requesterid = requesterid;
        this.requestername = requestername;
        this.issuetitle = issuetitle;
        this.datecreated = datecreated;
        this.issuecategoryid = issuecategoryid;
        this.statusname = statusname;
        this.projectname = projectname;
        this.categoryname = categoryname;
        this.files = new Array();
        this.comments = new Array();
        return this;
    } catch (e) {
        errorHandler("Issue.init", e);
        return undefined;
    }
},
setIssueComments: function(commentsObj) {
    try {
        this.comments = new Array();
        if (commentsObj != undefined) {
            var comment;
            var commentObj;
            if (commentsObj.length == undefined) {
                commentObj = commentsObj;
                comment = new Comment(commentObj.CommentID, commentObj.IssueID, commentObj.Comment, commentObj.DateTimeCreated, commentObj.CommentDateTime, commentObj.UserId, commentObj.UserName);
                this.comments.push(comment);
            } else {
                for (var i = 0; i < commentsObj.length; i++) {
                    commentObj = commentsObj[i];
                    comment = new Comment(commentObj.CommentID, commentObj.IssueID, commentObj.Comment, commentObj.DateTimeCreated, commentObj.CommentDateTime, commentObj.UserId,commentObj.UserName);
                    this.comments.push(comment);
                }
            }
        }
    } catch (e) {
        errorHandler("Issue.setIssueComments", e);
    }
},
setIssueFiles: function(filesObj) {
    try {
        this.files = new Array();
        if (filesObj != undefined) {
            filesObj = filesObj.Files;
            if (filesObj == undefined) {
                return;
            }
            var helpdeskFile;
            var fileObj;
            if (filesObj.length == undefined) {
                fileObj = filesObj;
                helpdeskFile = new HelpdeskFile(fileObj.FileID, fileObj.IssueID, fileObj.FileName, fileObj.FileSize, fileObj.FileType, fileObj.DateTimeCreated, fileObj.FileData);
                this.files.push(helpdeskFile);
            } else {
                for (var i = 0; i < filesObj.length; i++) {
                    fileObj = filesObj[i];
					//var fileext=fileObj.FileName;
					  fileObj.FileType = getfiletype(fileObj.FileName);
                    helpdeskFile = new HelpdeskFile(fileObj.FileID, fileObj.IssueID, fileObj.FileName, fileObj.FileSize, fileObj.FileType, fileObj.DateTimeCreated, fileObj.FileData);
                    this.files.push(helpdeskFile);
                }
            }
        }
    } catch (e) {
        errorHandler("Issue.setIssueFiles", e);
    }
},
getIssueLi: function(userName, userId) {
    try {
        var liStr = "";
        var id = "issue-" + this.issueid;
        var title = "";
        var maintitle = "";

        title =this.issuetitle;
        //liStr = "<div id='" + id + "' data-role='collapsible' class='issues' data-iconpos='right' data-collapsed='true' data-theme='h' data-content-theme='d'>";
         liStr = "<div id='" + id + "' data-role='collapsible' data-iconpos='right' data-collapsed='true' data-theme='h' data-content-theme='d'>";
        liStr += "<h3 style='background-color: #5e5f5f;'><div class='issuetitlediv'>";
        liStr += "<div class='issuetitletitle'>" + title + "</div>";
        liStr += "</div></h3>";

        liStr += "<div class='issuebody'>";
        var commentStr = "";
        if (this.comments != undefined && this.comments.length > 0) {
            commentStr = "<div class='issuebodycomments ui-fieldcontain'>";
            commentStr = "<div class='issuebodycommentrow'>";
            commentStr += "<div class='issuecommentlabel'>" + resources.comments + "</div>";
            commentStr += "<div class='issuecommentslist'>";
            var a = this.getCommentsListView(userName, userId);
            commentStr += a;
            commentStr += "</div></div>";
        }
        liStr += commentStr;

        var fileListStr = "";
        fileListStr += "<div class='issuefieldsfiles'>";
        fileListStr += "<div id='collapsiblefilesrow-" + this.issueid + "' class='issuebodyfilerow'>";
        fileListStr += "<div class='issuelabelfile'>" + resources.filestxt + "</div>";
        fileListStr += "<div class='fileslistview'>";
        if (this.files.length > 0) {
            fileListStr += "<ul class='issuefilesul' data-role='listview' data-inset='true'>";
            fileListStr += this.getFilesListView();
            fileListStr += "</ul>";
        }
        fileListStr += "</div></div></div>";
        liStr += fileListStr;


        var upload = '<div class="dx-viewport" data-theme="h" data-shadow="false" data-iconshadow="false" style="width: 75%;margin-left: 23%;"><div class="demo-container" data-theme="h" data-shadow="false" data-iconshadow="false"><div id="file-uploader-'+this.issueid+'" data-theme="h" data-shadow="false" data-iconshadow="false"></div><div  class="chunk-panel"></div></div></div>';

        liStr += upload;

        var fileStr = "<div id='issueadd-files' class='issuefields'><div class='issuebodyfilerow'>";
        fileStr += "<div class='filestxt issuelabel'></div><div class='issueitem'>";
        /*fileStr += "<div id='addnewfilesitemdiv-" + this.issueid + "' class='addnewfilesitemdiv'>";
        fileStr += "<a id='addnewissuefilebtn-" + this.issueid + "' class='addnewissuefilebtn addfiletxt ui-btn'>";
        fileStr += "<img class='addissueimg' style='border:none' src='css/base/images/icons-png/plus-white.png' alt='Add File'/>";
        fileStr += "<div class='addissuefilebtntxt'></div></a></div>";*/

        fileStr += "<div id='removenewfilesitemdiv-" + this.issueid + "' class='removenewfilesitemdiv'>";
        fileStr += "<a id='removenewissuefilebtn-" + this.issueid + "' class='removenewissuefilebtn removefiletxt ui-btn'>";
        fileStr += "<img class='removeissueimg' style='border:none' src='css/base/images/delete_white.png' alt='Remove File'/>";
        fileStr += "<div class='removeissuefilebtntxt'></div></a></div>";

        fileStr += '<div style="width: 78%;margin-left: 24%;" class="progressOld'+this.issueid+'"><div class="barOld'+this.issueid+'" style="background-color: #079469;color:white;"></div ></div><p style="width: 78%;margin-left: 24%;" class="deleteImageOld" id="filenameOld'+this.issueid+'"></p><p class="deleteImageOld" style="width: 78%;margin-left: 24%;" id="fileNoSupportError'+this.issueid+'"></p>'

        fileStr += "</div></div></div>";

        var issueSupportDiv = "<div class='issuecommentaddfields ui-fieldcontain'><div class='issuecommentlabel'>" + resources.addComment + "</div><div class='addcommenttextarea'><textarea class='commenttextarea' id='";
        issueSupportDiv += "textarea-" + this.issueid + "'></textarea></div></div>";

        fileStr += issueSupportDiv;
        fileStr += "<div class='msgbuttongrid'><div class='addcommentbuttondiv'><a id='addcommentbtn-" + this.issueid + "' class='ui-btn ui-btn-h sendsupportbtn sendsupportupdatebtn' data-theme='h'>" + resources.sendbtntxt + "</a><a id='cancelsupportupdatebtn-" + this.issueid + "' class='ui-btn ui-btn-h cancelsupportbtn cancelsupportupdatebtn' data-theme='h'>" + resources.cancelbtntxt + "</a></div></div>";
        liStr += fileStr;

        liStr += "</div></div>";
        return liStr;
    } catch (e) {
        errorHandler("Issue.getIssueLi", e);
        return "";
    }
},
/*getIssueLi: function(userName, userId) {
    try {
        var liStr = "";
        var id = "issue-" + this.issueid;
        var title = "";
        var maintitle = "";
        
        title =this.issuetitle;
        liStr = "<div id='" + id + "' data-role='collapsible' class='issues' data-iconpos='right' data-collapsed='true' data-theme='h' data-content-theme='d'>";
        liStr += "<h3><div class='issuetitlediv'>";
        liStr += "<div class='issuetitletitle'>" + title + "</div>";
        liStr += "</div></h3>";
        
        liStr += "<div class='issuebody'>";
        var commentStr = "";
        if (this.comments != undefined && this.comments.length > 0) {
            commentStr = "<div class='issuebodycomments ui-fieldcontain'>";
            commentStr = "<div class='issuebodycommentrow'>";
            commentStr += "<div class='issuecommentlabel'>" + resources.comments + "</div>";
            commentStr += "<div class='issuecommentslist'>";
            var a = this.getCommentsListView(userName, userId);
            commentStr += a;
            commentStr += "</div></div>";
        }
        liStr += commentStr;
        
        var fileListStr = "";
        fileListStr += "<div class='issuefieldsfiles'>";
        fileListStr += "<div id='collapsiblefilesrow-" + this.issueid + "' class='issuebodyfilerow'>";
        fileListStr += "<div class='issuelabelfile'>" + resources.filestxt + "</div>";
        fileListStr += "<div class='fileslistview'>";
        if (this.files.length > 0) {
            fileListStr += "<ul class='issuefilesul' data-role='listview' data-inset='true'>";
            fileListStr += this.getFilesListView();
            fileListStr += "</ul>";
        }
        fileListStr += "</div></div></div>";
        liStr += fileListStr;
        
        var fileStr = "<div id='issueadd-files' class='issuefields'><div class='issuebodyfilerow'>";
        fileStr += "<div class='filestxt issuelabel'></div><div class='issueitem'>";
        fileStr += "<div id='addnewfilesitemdiv-" + this.issueid + "' class='addnewfilesitemdiv'>";
        fileStr += "<a id='addnewissuefilebtn-" + this.issueid + "' class='addnewissuefilebtn addfiletxt ui-btn'>";
        fileStr += "<img class='addissueimg' style='border:none' src='css/base/images/icons-png/plus-white.png' alt='Add File'/>";
        fileStr += "<div class='addissuefilebtntxt'></div></a></div>";
        
        fileStr += "<div id='removenewfilesitemdiv-" + this.issueid + "' class='removenewfilesitemdiv'>";
        fileStr += "<a id='removenewissuefilebtn-" + this.issueid + "' class='removenewissuefilebtn removefiletxt ui-btn'>";
        fileStr += "<img class='removeissueimg' style='border:none' src='css/base/images/delete_white.png' alt='Remove File'/>";
        fileStr += "<div class='removeissuefilebtntxt'></div></a></div>";
        
        fileStr += "</div></div></div>";
        
        var issueSupportDiv = "<div class='issuecommentaddfields ui-fieldcontain'><div class='issuecommentlabel'>" + resources.addComment + "</div><div class='addcommenttextarea'><textarea class='commenttextarea' id='";
        issueSupportDiv += "textarea-" + this.issueid + "'></textarea></div></div>";
        
        fileStr += issueSupportDiv;
        fileStr += "<div class='msgbuttongrid'><div class='addcommentbuttondiv'><a id='addcommentbtn-" + this.issueid + "' class='ui-btn ui-btn-h sendsupportbtn sendsupportupdatebtn' data-theme='h'>" + resources.sendbtntxt + "</a><a id='cancelsupportupdatebtn-" + this.issueid + "' class='ui-btn ui-btn-h cancelsupportbtn cancelsupportupdatebtn' data-theme='h'>" + resources.cancelbtntxt + "</a></div></div>";
        liStr += fileStr;
        
        liStr += "</div></div>";
        return liStr;
    } catch (e) {
        errorHandler("Issue.getIssueLi", e);
        return "";
    }
},*/
compareFilesOrder: function(a, b) {
    return b.fileid - a.fileid;
},
getFilesListView: function() {
    try {
        var fileLiStr = "";
        if (this.files != undefined) {
            var fileList = this.files.sort(this.compareFilesOrder);
            $.each(fileList, function(i, file) {
                   fileLiStr += file.getFileLi();
                   });
        }
        return fileLiStr;
    } catch (e) {
        errorHandler("Issue.getFilesListView", e);
        return "";
    }
},
getFile: function(fileid) {
    try {
        var fileObj;
        if (this.files != undefined) {
            for (var i = 0; i < this.files.length; i++) {
                fileObj = this.files[i];
                if (fileObj.fileid == fileid) {
                    return fileObj;
                }
            }
        }
        return fileObj;
    } catch (e) {
        errorHandler("Issue.getFile", e);
        return "";
    }
},
getNewFileName: function() {
    try {
        var fileName = "issue_" + this.issueid + "_";
        if (this.files != undefined) {
            var maxFile = this.files.length - 1;
            var matchFound = 1;
            var newFileName = fileName + maxFile;
            while (matchFound == 1) {
                maxFile += 1;
                newFileName = fileName + maxFile;
                matchFound = 0;
                for (var i = 0; i < this.files.length; i++) {
                    var file = this.files[i];
                    if (file.filename.indexOf(newFileName + ".") > -1) {
                        matchFound = 1;
                    }
                }
            }
        } else {
            newFileName = fileName + "0";
        }
        return newFileName;
    } catch (e) {
        errorHandler("Issue.getNewFileName", e);
        return "";
    }
},
getCommentsListView: function(userName) {
    try {
        var commentLiStr = "";
        if (this.comments != undefined) {
            $.each(this.comments, function(i, comment) {
                   var b = comment.getCommentLi(userName);
                   commentLiStr += b;
                   });
        }
        return commentLiStr;
    } catch (e) {
        errorHandler("Issue.getCommentsListView", e);
        return "";
    }
},
addIssueComment: function(projectId, issueId, issueTitle, issueCategoryId, comment, returnFunction) {
    try {
        var that = this;
        coController.coAddHelpdeskComment(projectId, issueId, issueTitle, issueCategoryId, comment, function(ret) {
                                          if (ret === undefined || ret === -1) {
                                          if (showOfflineMessage === true) {
                                          showOfflineMessage = false;
                                          msgStr = resources.connectionFail;
                                          msgTitle = resources.connError;
                                          msgBtnValue = resources.btnOk;
                                          navigator.notification.alert(msgStr, function() {
                                                                       hidePleaseWait();
                                                                       returnFunction(false);
                                                                       }, msgTitle, msgBtnValue);
                                          } else {
                                          hidePleaseWait();
                                          returnFunction(false);
                                          }
                                          } else {
                                          if (ret === 0) {
                                          returnFunction(false);
                                          } else {
                                          var issueObj = ret;
                                          if (issueObj != undefined && issueObj.HelpdeskIssueAddCommentResult != undefined && issueObj.HelpdeskIssueAddCommentResult.Data != undefined) {
                                          issueObj = issueObj.HelpdeskIssueAddCommentResult.Data;
                                          var comments = issueObj.Comments;
                                          if (comments != undefined) {
                                          that.setIssueComments(comments);
                                          }
                                          that.setIssueFiles(issueObj);
                                          returnFunction(true);
                                          } else {
                                          returnFunction(false);
                                          }
                                          }
                                          }
                                          });
    } catch (e) {
        errorHandler("User.addUserComment", e);
        returnFunction(false);
    }
},
deleteIssueFile: function(issueId, fileId, returnFunction) {
    try {
        var that = this;
        coController.coDeleteHelpdeskFile(issueId, fileId, function(ret) {
                                          if (ret === undefined || ret === -1) {
                                          if (showOfflineMessage === true) {
                                          showOfflineMessage = false;
                                          msgStr = resources.connectionFail;
                                          msgTitle = resources.connError;
                                          msgBtnValue = resources.btnOk;
                                          navigator.notification.alert(msgStr, function() {
                                                                       hidePleaseWait();
                                                                       returnFunction(false);
                                                                       }, msgTitle, msgBtnValue);
                                          } else {
                                          hidePleaseWait();
                                          returnFunction(false);
                                          }
                                          } else {
                                          if (ret === 0) {
                                          returnFunction(false);
                                          } else {
                                          var issueObj = ret;
                                          if (issueObj != undefined && issueObj.HelpdeskIssueFileDeleteResult != undefined && issueObj.HelpdeskIssueFileDeleteResult.Data != undefined) {
                                          issueObj = issueObj.HelpdeskIssueFileDeleteResult.Data;
                                          var comments = issueObj.Comments;
                                          if (comments != undefined) {
                                          that.setIssueComments(comments);
                                          }
                                          that.setIssueFiles(issueObj);
                                          returnFunction(true);
                                          } else {
                                          returnFunction(false);
                                          }
                                          }
                                          }
                                          });
    } catch (e) {
        errorHandler("User.deleteIssueFile", e);
        returnFunction(false);
    }
},
addIssueFile: function(fileName, fileSize, fileType, fileData, returnFunction) {
    try {
        var that = this;
        coController.coUploadHelpdeskFile(this.issueid, fileName, fileSize, fileType, fileData, function(ret) {
                                          if (ret === undefined || ret === -1) {
                                          if (showOfflineMessage === true) {
                                          showOfflineMessage = false;
                                          msgStr = resources.connectionFail;
                                          msgTitle = resources.connError;
                                          msgBtnValue = resources.btnOk;
                                          navigator.notification.alert(msgStr, function() {
                                                                       hidePleaseWait();
                                                                       returnFunction(false);
                                                                       }, msgTitle, msgBtnValue);
                                          } else {
                                          hidePleaseWait();
                                          returnFunction(false);
                                          }
                                          } else {
                                          if (ret === 0) {
                                          returnFunction(false);
                                          } else {
                                          var issueObj = ret;
                                          if (issueObj != undefined && issueObj.HelpdeskFileUploadResult != undefined && issueObj.HelpdeskFileUploadResult.Data != undefined) {
                                          issueObj = issueObj.HelpdeskFileUploadResult.Data;
                                          var comments = issueObj.Comments;
                                          if (comments != undefined) {
                                          that.setIssueComments(comments);
                                          }
                                          that.setIssueFiles(issueObj);
                                          }
                                          returnFunction(true);
                                          }
                                          }
                                          });
    } catch (e) {
        errorHandler("User.addIssueFile", e);
        returnFunction(false);
    }
},
downloadHelpdeskImageFile: function(issueid, fileId, returnFunction) {
    try {
        var that = this;
        coController.coDownloadHelpdeskImageFile(issueid, fileId, function(ret) {
                                                 if (ret === undefined || ret === -1) {
                                                 if (showOfflineMessage === true) {
                                                 showOfflineMessage = false;
                                                 msgStr = resources.connectionFail;
                                                 msgTitle = resources.connError;
                                                 msgBtnValue = resources.btnOk;
                                                 navigator.notification.alert(msgStr, function() {
                                                                              hidePleaseWait();
                                                                              returnFunction(false);
                                                                              }, msgTitle, msgBtnValue);
                                                 } else {
                                                 hidePleaseWait();
                                                 returnFunction(false);
                                                 }
                                                 } else {
                                                 if (ret === 0) {
                                                 returnFunction(false);
                                                 } else {
                                                 var fileObj = ret;
                                                 var helpdeskFile;
                                                 if (fileObj != undefined && fileObj.HelpdeskFileGetResult != undefined && fileObj.HelpdeskFileGetResult.Data != undefined) {
                                                 fileObj = fileObj.HelpdeskFileGetResult.Data;
                                                 helpdeskFile = new HelpdeskFile(fileObj.FileID, fileObj.IssueID, fileObj.FileName, fileObj.FileSize, fileObj.FileType, fileObj.DateTimeCreated, fileObj.FileContent);
                                                 }
                                                 returnFunction(helpdeskFile);
                                                 }
                                                 }
                                                 });
    } catch (e) {
        errorHandler("issue.downloadHelpdeskImageFile", e);
        returnFunction(undefined);
    }
},
downloadHelpdeskFile: function(issueid, fileId, returnFunction) {
    try {
        var that = this;
        coController.coDownloadHelpdeskFile(issueid, fileId, function(ret) {
                                            if (ret === undefined || ret === -1) {
                                            if (showOfflineMessage === true) {
                                            showOfflineMessage = false;
                                            msgStr = resources.connectionFail;
                                            msgTitle = resources.connError;
                                            msgBtnValue = resources.btnOk;
                                            navigator.notification.alert(msgStr, function() {
                                                                         hidePleaseWait();
                                                                         returnFunction(false);
                                                                         }, msgTitle, msgBtnValue);
                                            } else {
                                            hidePleaseWait();
                                            returnFunction(false);
                                            }
                                            } else {
                                            if (ret === 0) {
                                            returnFunction(false);
                                            } else {
                                            var fileObj = ret;
                                            var helpdeskFile;
                                            if (fileObj != undefined && fileObj.HelpdeskFileDownloadResult != undefined && fileObj.HelpdeskFileDownloadResult.Data != undefined) {
                                            fileObj = fileObj.HelpdeskFileDownloadResult.Data;
											//navigator.notification.alert(fileObj.FileData);
                                            helpdeskFile = new HelpdeskFile(fileObj.FileID, fileObj.IssueID, fileObj.FileName, fileObj.FileSize, fileObj.FileType, fileObj.DateTimeCreated, fileObj.FileData);
                                            }
                                            returnFunction(helpdeskFile);
                                            }
                                            }
                                            });
    } catch (e) {
        errorHandler("issue.downloadHelpdeskFile", e);
        returnFunction(undefined);
    }
}
};
var Comment = function(commentid, issueid, comment, datecreated, commentdate, userid, username) {
    try {
        this.init(commentid, issueid, comment, datecreated, commentdate, userid, username);
    } catch (e) {
        errorHandler("Issue", e);
    }
};
Comment.prototype = {
init: function(commentid, issueid, comment, datecreated, commentdate, userid, username) {
    try {
        if (issueid == undefined) {
            issueid = 0;
        }
        if (commentid == undefined) {
            commentid = 0;
        }
        if (comment == undefined) {
            comment = "";
        }
        if (commentdate == undefined) {
            commentdate = "";
        }
        if (datecreated == undefined) {
            datecreated = "";
        }
        if (userid == undefined) {
            userid = activeUser.userId;
        }
        if (username == undefined) {
            username = "";
        }
        
        this.issueid = issueid;
        this.commentid = commentid;
        this.comment = comment;
        this.commentdate = commentdate;
        this.datecreated = datecreated;
        this.userid = userid;
        this.username = username;
        return this;
    } catch (e) {
        errorHandler("Comment.init", e);
        return undefined;
    }
},
getCommentLi: function(userName) {
    try {
        var commentStr = "";
        var userComment = userName + resources.commentedon + this.commentdate;
        var commentUser = (this.userid===activeUser.userId) ? "user" : "admin";
        if (commentUser==="admin"){
            userComment = this.username + resources.commentedon + this.commentdate;
        }
        commentStr += "<div class='issuecommentitem'>";
        commentStr += "<div class='issuebodycomment ui-corner-all ui-bar-h " + commentUser + "'>";
        commentStr += "<div class='issuecommentuser'>" + userComment + "</div>";
        commentStr += "<div class='issuecomment'>" + this.comment + "</div>";
        commentStr += "</div></div>";
        return commentStr;
    } catch (e) {
        errorHandler("Comment.getCommentLi", e);
        return "";
    }
}
};
var HelpdeskFile = function(fileid, issueid, filename, filesize, filetype, datecreated, filedata) {
    try {
        this.init(fileid, issueid, filename, filesize, filetype, datecreated, filedata);
    } catch (e) {
        errorHandler("HelpdeskFile", e);
    }
};
HelpdeskFile.prototype = {
init: function(fileid, issueid, filename, filesize, filetype, datecreated, filedata) {
    try {
        if (issueid == undefined) {
            issueid = 0;
        }
        if (fileid == undefined) {
            fileid = 0;
        }
        if (filename == undefined) {
            filename = "";
        }
        if (filesize == undefined) {
            filesize = 0;
        }
        if (filetype == undefined) {
            filetype = "";
        }
        if (datecreated == undefined) {
            datecreated = "";
        }
        if (filedata == undefined) {
            filedata = "";
        }
        this.issueid = issueid;
        this.fileid = fileid;
        this.filename = filename;
        this.filesize = filesize;
        this.filetype = filetype;
        this.datecreated = datecreated;
        this.filedata = filedata;
        return this;
    } catch (e) {
        errorHandler("HelpdeskFile.init", e);
        return undefined;
    }
},
getFileLi: function() {
    try {
        var fileStr;
        var id = "filelink-" + this.issueid + "-" + this.fileid;
        var removeFileLink = "removefile-" + this.issueid + "-" + this.fileid;
        var downloadfilelink = "showfile-" + this.issueid + "-" + this.fileid;
        fileStr = "<li id='" + id + "' class='filelinkitems'>";
        fileStr += "<div class='issuefilediv'>";
        fileStr += "<div class='issuefilebuttondivlink'><a class='issuefiledownload' id='" + downloadfilelink + "'><div class='issuefilebutton' id='"+this.filename+"'></div><div class='issuefilename' id='"+this.filename+"'>" + this.filename + "</div></a></div>";
        fileStr += "</div>";
        fileStr += "</li>";
        return fileStr;
    } catch (e) {
        errorHandler("HelpdeskFile.getFileLi", e);
        return "";
    }
}
};
var HelpdeskCategory = function(categoryid, categoryname, projectid, parentcategoryid) {
    try {
        this.init(categoryid, categoryname, projectid, parentcategoryid);
    } catch (e) {
        errorHandler("HelpdeskCategory", e);
    }
};
HelpdeskCategory.prototype = {
init: function(categoryid, categoryname, projectid, parentcategoryid) {
    try {
        if (categoryid == undefined) {
            categoryid = 0;
        }
        if (categoryname == undefined) {
            categoryname = "";
        }
        if (projectid == undefined) {
            projectid = 0;
        }
        if (parentcategoryid == undefined) {
            parentcategoryid = 0;
        }
        this.categoryid = categoryid;
        this.categoryname = categoryname;
        this.projectid = projectid;
        this.parentcategoryid = parentcategoryid;
        return this;
    } catch (e) {
        errorHandler("HelpdeskFile.init", e);
        return undefined;
    }
},
getCategoryOption: function() {
    try {
        var optionStr = "";
        var id = "category-" + this.categoryid;
        optionStr = "<option value='" + id + "'>";
        optionStr += this.categoryname;
        optionStr += "</option>";
        return optionStr;
    } catch (e) {
        errorHandler("HelpdeskFile.getCategoryOption", e);
        return "";
    }
}
};

function failError(evt) {console.log("failError - " + evt);}

function populateDB(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS etpUser (id unique, requireslogin, username, pwdHash, userId, rememberMe, savedPosition, startuppage, hascourses, hasvideos, hasaudio, mediaPosition, hasTermsConditionsAgreed)");
}

function errorDB(tx, err) {}

function successDB() {}

function setLocalStorage(key, filesList, updateExisting, returnFunction) {
    try {
        var overWrite = true;
        if (updateExisting === true) {
            if (key === "PodcastItems") {
                activeUser.existPods = filesList;
            } else if (key === "VideoCategoryItems") {
                
                //console.log("setLocalStorage vids = " + filesList[0].videocategories[0].videos.length);
                activeUser.existVids = filesList;
            } else if (key === "AudioCategoryItems") {
                activeUser.existAuds = filesList;
            } else if (key === "UserPlaylists") {
                activeUser.existPlaylists = filesList;
            }else if (key === "EClasses"){
                activeUser.existeClasses = filesList;
            }
        }
        if (key==="EClasses" || key === "VideoCategoryItems"){
            if(filesList!==undefined && filesList[0] !== undefined && filesList[0].videocategories !== undefined && filesList[0].videocategories[0] !== undefined && filesList[0].videocategories[0].videos !== undefined && filesList[0].videocategories[0].videos.length===0){
                overWrite=false;
            }
        }
        if(overWrite===true){
            saveLocalDataStore(key, "", JSON.stringify(filesList), function(ret) {});
        }
    } catch (e) {}
    returnFunction(true);
}
function getLocalStorage(key, returnFunction) {
    try {
        getLocalData(key, "", function(ret) {
                     // console.log("key="+key + " - " + ret);
                     returnFunction(ret);
                     });
    } catch (e) {
        returnFunction("");
    }
}
function checkPlaylistItems(playlist){
    try {
        var updatePlaylist=false;
        var newPlaylist = playlist;
        if(playlist !== undefined && playlist.playlistitems.length > 0){
            newPlaylist = JSON.parse(JSON.stringify(playlist));
            var categoryRef = "";
            for(var i=0; i<playlist.playlistitems.length; i++){
                var playlistitem = playlist.playlistitems[i];
                if (playlistitem.categoryref!==undefined && playlistitem.categoryref.length>0){
                    categoryRef = playlistitem.categoryref;
                    var ids = playlistitem.categoryref.split("-");
                    var tabId = ids[0];
                    var audiocategoryid = ids[1] + "-" + ids[2];
                    var category = activeUser.getAudiocategoryById(tabId, audiocategoryid);
                    if (category!==undefined && category.audios!==undefined && category.audios.length>0){
                        var audioRef =playlistitem.audioid ;
                        var audio = category.getAudioItemById(playlistitem.audioid + "mp3");
                        
                        if(audio===undefined){
                            updatePlaylist=true;
                            // If audiocategory audio no longer exists then delete the playlistItem.
                            for (var y=0; y < newPlaylist.playlistitems.length; y++){
                                var newPlaylistItem = newPlaylist.playlistitems[y];
                                if(newPlaylistItem.categoryref===categoryRef && newPlaylistItem.audioid === audioRef){
                                    newPlaylist.playlistitems.splice(y,1);
                                    break;
                                }
                            }
                        }
                    }else{
                        // If audiocategory no longer exists then delete all the playlistItems with this categoryRef.
                        updatePlaylist=true;
                        cont = true;
                        var deletePlaylist = newPlaylist;
                        for (var z=0; z < newPlaylist.playlistitems.length; z++){
                            var deletePlaylistItem = newPlaylist.playlistitems[z];
                            if(deletePlaylistItem.categoryref===categoryRef){
                                newPlaylist.playlistitems.splice(z,1);
                                break;
                            }
                        }
                    }
                }
            }
        }
        if(updatePlaylist===true){
            if(newPlaylist !==undefined && playlist!==undefined)
            {
                playlist.playlistitems = [];
                for (var m = 0; m < newPlaylist.playlistitems.length; m++) {
                    var updatelistItem = newPlaylist.playlistitems[m];
                    var newUpdatelistItem = new PlaylistItem(updatelistItem.userplaylistid, updatelistItem.playlistitemid,updatelistItem.categoryref,updatelistItem.audioid,updatelistItem.itemorder,updatelistItem.tracktitle,updatelistItem.artist,updatelistItem.length,updatelistItem.isdownloaded,updatelistItem.fileuri, updatelistItem.downloading, updatelistItem.tempid);
                    playlist.playlistitems.push(newUpdatelistItem);
                }
            }
            
            playlist.updatepending=true;
            playlist.audiocount = playlist.playlistitems.length;
            for (var x=0; x < playlist.playlistitems.length; x++){
                var item = playlist.playlistitems[x];
                item.itemorder = x;
            }
            for (var n = 0; n < activeUser.userplaylists; n++){
                var plist = activeUser.userplaylists[n];
                if (plist.userplaylistid===playlist.userplaylistid){
                    activeUser.userplaylist[n] = playlist;
                    break;
                }
            }
            activeUser.saveFilesList(undefined, "userplaylists", true, function() {});
            activeUser.updateUserPlaylist(playlist, function(ret){
                                          activeUser.getUserPlaylists(true, function(ret){
                                                                      setPagePadderDiv("playlistScroller", true, "playlist");
                                                                      });
                                          });
        }
        return playlist;
        
    } catch (e) {
        return playlist;
    }
}


function getfiletype(filename){
	var afterDot = filename.substr(filename.indexOf('.')).toLowerCase();
					  switch (afterDot) {
						case ".png":
							RetFileType = 'image/png';
							return(RetFileType);
							break;
						case ".jpg":
							RetFileType = 'image/jpg';
							return(RetFileType);
							break;
						case ".jpeg":
							RetFileType = 'image/jpeg';
							return(RetFileType);
							break;
						case ".gif":
						RetFileType = 'image/gif';
						return(RetFileType);
							break;
						case ".pjpeg":
						RetFileType = 'image/pjpeg';
						return(RetFileType);
							break;
						case ".bmp":
						RetFileType = 'image/bmp';
						return(RetFileType);
							break;
						case ".tiff":
						RetFileType = 'image/tiff';
						return(RetFileType);
							break;
						case ".txt":
						RetFileType = 'text/plain';
						return(RetFileType);
							break;
						case ".html":
						RetFileType = 'text/html';
						return(RetFileType);
							break;
						case ".pdf":
						RetFileType = 'application/pdf';
						return(RetFileType);
							break;
						case ".rtf":
						RetFileType = 'application/rtf';
						return(RetFileType);
							break;
						
					}
	
	
	
}