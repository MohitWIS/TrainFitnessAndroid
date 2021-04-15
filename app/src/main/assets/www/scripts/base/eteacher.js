var baseCodeVersion = 8;
var checkGoogleUrl = "http://www.google.com";
var networkTestUrl="";
var checkDeviceOnlineOK = true;
var users;
var activeUser;
var pageLoad = "#mainhomepage";
var firstMenuChange = true;
var iabRef = null;
var coController;
var coControllertest;
var configs;
var iosDevice = false;
var tablet = true;
var iosToolbarsNotSet = true;
var loadingOK = true;
var connectionErrorVisible = false;
var deviceSpecificScripts = true;
var defaultLoadingTime = 60;
var filecount = {};
var HelpDeskFiles = [];
var portalId;
var firstLoad = true;
var IsLiveOTA = "0";
var hideLoadingOK = true;
var courseStatus = {
Completed: "Completed",
InProgress: "In Progress",
NotStarted: "Not Started",
Payment: "Payment Required",
PaymentPending: "Payment Pending",
Exempt: "Exempt",
Suspended: "Suspended",
PendingExemption: "Pending Exemption"
};
var worksheetStatus = {
InProgress: "In Progress",
Completed: "Completed",
NotComplete: "Not Complete"
};
var moduleType = {
Book: "Book",
Lesson: "Lesson",
Certificate: "Certificate",
Portfolio: "Portfolio",
Practicum: "Practicum",
NA: "Not Applicable"
};
var portalCourses;
var activeCourse;
var activeModuleGroup;
var activeSection;
var activeModule;
var activeSCO;
var refreshed = false;
var assetIndex = 0;
var savedPosition;
var loadFirstSave = false;
var loadIds = {};
var prevLoadIds = {};
var mediaLoadIds = {};
var courseListContent = "";
var menuScroller, menuGroupScroller, scoMenuScroller, contentScroller, supportScroller, helpdeskScroller, scheduleScroller, mapScroller, rhsMenuScroller, eClassScroller, eClassPlaylistScroller, zoomContentScroller;
var videoPodcastScroller, audioPodcastScroller, userPlaylistScroller, theoryPodcastScroller, playlistPodcastScroller, playlistScroller, playlistItemScroller;
var root;
var messagePage = 1;
var issuesPerPage = 1;
var fileUploadUri = "";
var gImageId = "";
var fileUploadImg = "<img id='addissueimg' class='addissueimg' alt='Add Image' src='css/base/images/icons-png/plus-white.png'/>";
var issuesFirstShow = true;
var localFileSystem, docsFileSystem;
var helpDeskDir, userDataDir, userMainDir, fileMainDir, mediaDataDir, videoMediaDir, audioMediaDir, theoryMediaDir, docsFileDir;
var currentIssueId = 0;
var viewFile;
var pdfViewFile = "";
var helpDeskFileUri = "";
var loadingGif = "<div class='spinnerhtml'><img src='css/client/images/ajax-loader.gif' alt='Please Wait'/></div>";

var mloadingGif = "<div class='pdfspinnerdiv' id='mloader'><div class='pdfspinner'><img style='height:60px;width:60px;' src='css/client/images/app_loading_animation.gif' alt='Please Wait'/></div></div>";
var loadingPDFGif = "<div class='pdfspinnerdiv'><div class='pdfspinner'><img class='imgpdfspinner' style='height:60px;width:60px;' src='css/client/images/app_loading_animation.gif' alt='Please Wait'/></div></div>";
//var mloadingGif = "<div class='pdfspinnerdiv' id='mloader'><div class='pdfspinner'><img src='css/client/images/ajax-loader.gif' alt='Please Wait'/></div></div>";
//var loadingPDFGif = "<div class='pdfspinnerdiv'><div class='pdfspinner'><img class='imgpdfspinner' src='css/client/images/ajax-loader.gif' alt='Please Wait'/></div></div>";
var downloadIssueid = 0;
var downloadFileid = 0;
var loadingItems = 0;
var isGuideLines = false;
var changeUser = false;
var retinaDisplay = false;
var iphone5 = false;
var pixelx2 = false;
var pixelx3 = false;
var issuesParentOK = true;
var supportParentOK = true;
var sectionOK = true;
var coursesOK = true;
var moduleOK = true;
var moduleBookOK = true;
var sectionClickOK = true;
var naOK = true;
var wsNSOK = true;
var dateOK = true;
var summaryParentOK = true;
var mediaItemOK = true;
var downloadOK = true;
var commentTextAreaResize = false;
var commentTextAreaID = "";
var scheduleDates = [];
var scheduleDatesFull = [];
var mapDiv = '<div id="map_canvas"></div>';
var currentLatlng;
var contactEmail = "";
var firstLoadCourses = true;
var rhsMenuOpen = false;
var saveLocalData = false;
var usRadioOK = false;
var menubtnOk = true;
var sectionsUrl = "";
var userMenuSelect = false;
var showMenu = false;
var helpDeskLoaded = false;
var searchFocus = false;
var videoPlaying = false;
var prevPage = "";
var helpdeskFirstLoad = true;
var loadCoursePage = true;
var lastVisitedPodcastTab = "";
var currentBookSchedule = "";
var showPreferencePopup = true;
var deviceIsOnline = true;
var showOfflineMessage = false;
var mediaInit = true;
var coursesInit = true;
var venueAssessmentScheduleId = 0;
var swipeAction = false;
var courseTitleChars = 60;
var moduleTitleChars = 80;
var gaPlugin;
var analyticsAccount = "";
var allowAnalytics = "0";
var appPaused = false;
var strErrorMessage = "";
var startupPageid = "#coursepage";
var allowOffline = true;
var msgStr = "";
var msgTitle = "";
var msgBtnValue = "";
var thumbnailsToDownload = [];
var mediaToDownload = [];
var audioMixToDownload = [];
var audioTheoryPlayer;
var audioTheoryPaused = false;
var audioTheoryPlayerLoaded = false;
var loadingContent = false;
var mediaRefreshing = false;
var dataRefreshed = false;
var userHasCourses = true;
var userhasTermsConditionsAgreed = false;
var googleAvailable = true;
var googleAnalyticsLoaded = false;
var resetSectionLoad = true;
var reloadPage = false;
var ignoreGoogle = false;
var getpositionfirst = true;
var retryPositioning = true;
var iosDevice6 = false;
var setGoogleJSOK = false;
var getUserVideosOk = true;
var userPortalId = 0;
var userLanguage = "";
var appLanguageId = "en";
var portalsList;
var getSectionOk = true;
var videoCategoryListing = "";
var eClassListing = "";
var audioCategoryListing = "";
var podcastsListing = [];
var playlistListing = "";
var playlistTracks = "";
var fileTransfers = [];
var thumbnailTransfers = [];
var overrideLoadingMsg = false;
var supressWarningMsgs = false;
var pdfViewFileLocal = "";
var remoteArtist = "";
var remoteTitle = "";
var remoteAlbum = "";
var remoteImage = "";
var remoteDuration = 0;
var remoteElapsedTime = 0;
var loadingSpinnerVisible = false;
var downloadingItems = false;
var pausedAppTime=0;
var userPlaylistIconFile ="";
var orientationPosition="portrait";
var useExistingMedia=false;
var medialistingOK = true;
var currentAudioPlaylistNo = 0;
var currentVideoPlaylistNo = 0;
var videoVideoPlayer, eClassVideoPlayer;
var playListVideoSourceList;
var playListAudioSourceList;
var rotation = 180;
var currentTab = "";
var nextAudioUrl = "";
var podcastsFirstLoad = true;
var audioPlaylist;
var audioPlaylistItems = [];
var audioAudioPlayer1, audioAudioPlayer3;
var audioFirstPlay = true;
var audioPaused = false;
var currentAudioTracks;
var audioplayerIndex1 = 0;
var audioMixLoaded = false;
var audioMixFirstLoadTime = true;
var audioMixLoadTrack = 0;
var audioPlayer1CurrentTime = 0;
var audioPlayerPositionSet = false;
var audioMixPlaying = false;
var audioPlayerPositionSetTime = 0;
var audioPlayerFirstLoad = true;
var loadingAudioMix = false;
var loadNextAudioTrack = true;
var trackUpdating = false;
var audioMixLoadedFirstTime = false;
var audioPlayer1Play = false;
var videoPaused = false;
var videoPlayerPlay = false;
var playAudioOk = true;
var downloadAllAudioOk = true;
var getUserAudioOk = true;
var getUserPlaylistOk = true;
var mejsOk = true;
var audioMixStartTrack = -1;
var audioMixDownloadedStart = false;
var showMessage = true;
var mediaSeriesBtnOk = true;
var startFirstTrack = true;
var currentAudioCategory;
var podrefresh = false;
var firstAud;
var nextAudioLoadTrackNo = 0;
var resetAudio3Timing = 0;
var mixloading = false;
var destroyPlayersOK = true;
var resetAudioTimings = false;
var audioplayerIndex3 = 0;
var playAudioItem;
var currentPlayListCategory = "";
var ignoreWarnings = false;
var remoteControlsOk = true;
var audioplaying = false;
var playlistOk = true;
var currentPlaylist;
var activeTab="audio";
var refreshTimer;
var lastScrollPosition;
var lastScrollEnded = true;
var menuOpen = false;
var menuOpenName = "";
var menuOpenForce = false;
var eClassLibraryID = 4;
var videoLibraryID = 5;
var backButtonOK = true;
var mcurrentplaying= "";
var mtermsagreed;
var customdata;
var iscertificatedgenetated= false;
function deviceReadyInit() {
    
    try {
        navigator.globalization.getPreferredLanguage(function(language) {
          
            var lang = language.value.indexOf("-") > -1 ? language.value.substring(0, language.value.indexOf("-")) : language.value;
            switch (lang.toLowerCase()) {
            case "en":
            userLanguage = "en";
            appLanguageId = "en";
            break;
            case "zh":
            userLanguage = "cn";
            appLanguageId = "cn";
            break;
            default:
            userLanguage = "en";
            appLanguageId = "en";
            break;
            }
            return deviceReadyInitSet();
            }, function() {
            userLanguage = "en";
            appLanguageId = "en";
            return deviceReadyInitSet();
            });
            cordova.plugins.backgroundMode.enable();  
            cordova.plugins.backgroundMode.on('activate', function() {
                //alert($.mobile.activePage.attr('id'));
                if($.mobile.activePage.attr('id') == "OtaQuestionPage"){
                    pressHome();
                }
                else{

                }
            });
            document.addEventListener("backbutton", function(e){
                if($.mobile.activePage.is('#coursepage')||$.mobile.activePage.is('#termsconditionpage')){

                    navigator.notification.confirm(resources.exitconfirm, ExitConfirm, 'Train Fitness', [resources.rememberoptionon,resources.rememberoptionoff]);

                }
                else if($.mobile.activePage.attr('id') == "OtaQuestionPage"){
                    pressBackOnQues();
                }
                else {
                navigator.app.backHistory()
                }
            }, false);

            // //navigator.app.overrideButton("menubutton", true);
            // document.addEventListener("menubutton", function(e){
            //     //console.log('Menu_button_Pressed');
            //     alert('Menu_button_Pressed');
            //     //alert($.mobile.activePage.attr( "id" ));
            //     // if($.mobile.activePage.attr("id")=="OtaQuestionPage"){
            //     //     pressHome();
            //     // }
            //     // else{

            //     // }
            // }, false);

        } catch (e) {
        return false;
        }
}

function deviceReadyInitSet() {
    try {

        if (device.platform === "iOS") {
            iosDevice = true;
        }
        if(screen!==undefined && screen.lockOrientation!==undefined){
            screen.lockOrientation("portrait");
        }
        document.addEventListener("online", onOnline, false);
        document.addEventListener("offline", onOffline, false);
        if (device.platform === "iOS") {
            if ((device.model.toLowerCase().indexOf("iphone") > -1 || device.model.toLowerCase().indexOf("ipod") > -1) || device.model === "iPhone" || device.model === "iPod touch" || device.model === "iPhone Simulator" || (device.model === "x86_64" && window.screen.width < 768)) {
                tablet = false;
                if (device.model === "x86_64" && window.screen.width > 320 && window.screen.height > 568) {
                    iosDevice6 = true;
                }
            }
        } else {
            if(device.platform === "Android" && (screen.width !== undefined && screen.width < 601 && orientationPosition==='portrait')){
                tablet = false;
            }else if (device.platform === "Android" && ((window.screen.width >= 601 && pixelx2 === false && pixelx3 === false) || (window.screen.width >= 768 && pixelx2 === true && pixelx3 === false ) || (window.screen.width >= 1280 && pixelx2 === true && pixelx3 === false))) {
                tablet = true;
            } else {
                tablet = false;
            }
        }
        
        setResourcesScriptFile(false, function() {
                               if (localStorage.getItem("ETP_FIRSTLOAD") === null || localStorage.getItem("ETP_FIRSTLOAD") === undefined) {
                               appFirstLoad = true;
                               localStorage.setItem("ETP_FIRSTLOAD", appFirstLoad);
                               } else {
                               appFirstLoad = localStorage.getItem("ETP_FIRSTLOAD");
                               }
                               useExistingMedia = appFirstLoad;
                               root = this;
                               if (parseFloat(window.device.version) === 7) {
                               document.body.style.marginTop = "20px";
                               }
                               if (window.devicePixelRatio >= 3) {
                               pixelx3 = true;
                               }
                               if (window.devicePixelRatio >= 2) {
                               pixelx2 = true;
                               retinaDisplay = true;
                               $("body").addClass("pixelx2");
                               }
                               if (tablet === true) {
                               $('link[rel=stylesheet][href="css/base/eteacher.mobile.css"]').attr("disabled", "disabled");
                               $('link[rel=stylesheet][href="css/base/eteacher.mobile.css"]').remove();
                               } else {
                               $(".ui-page").addClass("etpmobile");
                               }
                               if (retinaDisplay == true && iosDevice == true && tablet == false) {
                               if ((orientationPosition == "portrait" && window.screen.height == 568)) {
                               iphone5 = iosDevice6 === false ? true : false;
                               }
                               }
                               document.addEventListener("pause", onPauseApp, false);
                               document.addEventListener("resume", onResumeApp, false);
                             $(document).on("pagechange", pagechangefun);
                               if (device.platform === "Android") {
                               document.addEventListener("backbutton", function(event) {
                                                         event.preventDefault();
                                                         }, false);
                               }
                               setGoogleJSOK = false;
                               return true;
                               });
        if(screen!==undefined && screen.lockOrientation!==undefined){
            screen.lockOrientation("portrait");
        }
        if (StatusBar !== undefined) {
            setTimeout(function() {
                       StatusBar.hide();
                       }, 300);
        }
    } catch (e) {
        return false;
    }
}

function pagechangefun()
{
    var urlMethod = getBaseUrl();
    urlMethod += configs.getCustom("CS_SITE_URL_CHECKUSERLOGOUTOTHERDEVICE");
    var authKey = getAuthKeyUnencrypt();
    var portalKey = getPortalKeyUnencrypt();
    var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey);
    urlMethod += params;
    $.ajax({
           url: urlMethod,
           dataType: "json",
           type: "GET",
           async: true,
           success: function(data, textStatus, jqXHR) {
           logauthObj = data;
           if (logauthObj != undefined && logauthObj.IsUserLogOutByOtherDeviceResult == true) {
              autologoutstring=1;
              logoutUser();
                      }
           },
           error: function(msg) {
           console.log("page change error");
           }
           });
    
}

function analyticsSuccessHandler(result) {}

function analyticsErrorHandler(result) {}

function pageTracked(url) {
    try {
        if (gaPlugin!==undefined && ignoreGoogle === false && googleAvailable === true && googleAnalyticsLoaded === true) {
            gaPlugin.trackView(url, analyticsSuccessHandler, analyticsErrorHandler);
        }
    } catch (e) {}
}

function onOnline() {
    deviceIsOnline = true;
    showOfflineMessage = false;
}

function onOffline() {
    deviceIsOnline = false;
    showOfflineMessage = true;
    resetFileDownload(true);
    
    if (activeUser.podcasts !== undefined && activeUser.podcasts.length > 0) {
        activeUser.saveFilesList(undefined, "podcasts", true, function() {});
    }
    if (activeUser.audiocategories !== undefined && activeUser.audiocategories.length > 0) {
        activeUser.saveFilesList(undefined, "audiocategories", true, function() {});
    }
    if (activeUser.videocategories !== undefined && activeUser.videocategories.length > 0) {
        activeUser.saveFilesList(undefined, "videocategories", true, function() {});
    }
    if (activeUser.userplaylists !== undefined && activeUser.userplaylists.length > 0) {
        activeUser.saveFilesList(undefined, "userplaylist", true, function() {});
    }
    if (activeUser.eclasses !== undefined && activeUser.eclasses.length > 0) {
        activeUser.saveFilesList(undefined, "eclasses", true, function() {});
    }
}







function onPauseApp() {
    try {
        appPaused = true;
        pausedAppTime=0;
        if(device.platform==="iOS"){
            downloadingItems = ((mediaToDownload !==undefined && mediaToDownload.length > 0) || (audioMixToDownload !==undefined && audioMixToDownload.length > 0) || (thumbnailsToDownload !==undefined && thumbnailsToDownload.length > 0)) ? true : false;
            if(downloadingItems===true){
                var pauseDate = new Date();
                var pauseDateSecs = Math.abs(pauseDate.getTime());
                
                setTimeout(setPausedAppTimer, 3000);
                localStorage.setItem("ETP_PAUSEDDATE", pauseDateSecs);
            }else{
                pausedAppTime=0;
                localStorage.setItem("ETP_PAUSEDDATE", 0);
            }
        }else{
            pausedAppTime = 0;
            localStorage.setItem("ETP_PAUSEDDATE", 0);
        }
        
        if (device.platform !== "Android" && podcastVideoPlayer != undefined && podcastVideoPlayer != null) {
            podcastVideoPlayer.pause();
        }
        if (device.platform !== "Android" && videoVideoPlayer != undefined && videoVideoPlayer != null) {
            videoVideoPlayer.pause();
        }
        if (device.platform !== "Android" && eClassVideoPlayer != undefined && eClassVideoPlayer != null) {
            eClassVideoPlayer.pause();
        }
        appFirstLoad = false;
        showMenu=false;
        localStorage.setItem("ETP_FIRSTLOAD", appFirstLoad);
        podcastPageFirstLoad = false;
        if(activeUser!==undefined){
            
            if (activeUser.podcasts !== undefined && activeUser.podcasts.length > 0) {
                activeUser.saveFilesList(undefined, "podcasts", true, function() {});
            }
            if (activeUser.audiocategories !== undefined  && activeUser.audiocategories.length > 0) {
                activeUser.saveFilesList(undefined, "audiocategories", true, function() {});
                if (activeUser.userplaylists !== undefined  && activeUser.userplaylists.length > 0) {
                    activeUser.saveFilesList(undefined, "userplaylists", true, function() {});
                }
            }
            if (activeUser.videocategories !== undefined  && activeUser.videocategories.length > 0) {
                activeUser.saveFilesList(undefined, "videocategories", true, function() {});
            }
            if (activeUser.eclasses !== undefined  && activeUser.eclasses.length > 0) {
                activeUser.saveFilesList(undefined, "eclasses", true, function() {});
            }
            
        }
        
        if(audioplaying===true || audioMixPlaying===true){
            try{
                if(device.platform==="Android" || device.platform==='iOS'){
                    var params = [remoteArtist, remoteTitle, remoteAlbum, remoteImage, remoteDuration, remoteElapsedTime];
                    window.remoteControls.updateMetas(function(success){}, function(fail){
                                                      }, params);
          
                }
                
            }catch(ex){
                return false;
            }
        }
        return true;
    } catch (e) {
        return false;
    }
}

function onResumeApp() {
    try {
        
        appPaused = false;
        showMenu=false;
        if (localStorage.getItem("ETP_LOGGEDOUTUSER") !== null || localStorage.getItem("ETP_LOGGEDOUTUSER") !== undefined) {
            mediaInit =localStorage.getItem("ETP_LOGGEDOUTUSER")==="true" ? true : false;
            coursesInit = mediaInit;
        }
        if(downloadingItems===true){
            
            var pauseDateSecs = localStorage.getItem("ETP_PAUSEDDATE");
            if(pauseDateSecs!==undefined ){
                var resumeDate = new Date();
                var resumeDateSecs = Math.abs(resumeDate.getTime());
                var diffMs = (resumeDateSecs - pauseDateSecs);
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                if((pausedAppTime / 60000) > 8 || diffMins > 7 || (pausedAppTime + 4000) < diffMs ){
                    downloadingItems = false;
                    pausedAppTime=0;
                    localStorage.setItem("ETP_PAUSEDDATE", 0);
                    if( audioMixPlaying===false && audioplaying===false){
                        if(pageLoad==="#podcastpage" && $("#podrefreshbtn") !== undefined){
                            $("#podrefreshbtn").trigger("vclick");
                        }else{
                            resetFileDownload(true);
                        }
                    }
                }
            }
            downloadingItems = false;
            pausedAppTime=0;
            localStorage.setItem("ETP_PAUSEDDATE", 0);
        }
        setTimeout(function() {
                   coController.coCheckNetworkAvaliable(false, function(ret) {
                                                        if (ret === false) {
                                                        msgStr = resources.noNetworkLimited;

                            if($.mobile.activePage.is('#termsconditionpage'))
                            {
                              msgStr=resources.termsconnectionfail;
                            }

                                                        msgTitle = resources.connError;
                                                        msgBtnValue = resources.btnOk;
                            if(audioMixPlaying!=true && audioplaying!=true){
                                                        navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);}
                                                        } else {
                                                        if (coursesInit===true){
                                                        checkASDUserPodState(false, function(ret) {});
                                                        }
                                                        }
                                                        });
                   if ((ignoreGoogle === false) && (googleAnalyticsLoaded === false || googleAvailable === false)) {
                   coController.coCheckUrlExists(checkGoogleUrl, function(status) {
                                                 if (status === 200) {
                                                 googleAvailable = true;
                                                 ignoreGoogle = false;
                                                 setGoogleJS();
                                                 var allowOfflineSetting = configs.getCustom("CS_ALLOW_OFFLINE") === "1";
                                                 allowOffline = allowOfflineSetting === undefined || allowOfflineSetting === 0 ? false : true;
                                                 allowAnalytics = configs.getCustom("CS_ANALYTICS_TRACK") === "1" ? "1" : "0";
                                                 if (allowAnalytics === "1" && googleAvailable === true && googleAnalyticsLoaded === false) {
                                                 gaPlugin = window.analytics;
                                                 analyticsAccount = configs.getCustom("CS_ANALYTICS_ID");
                                                 if(gaPlugin!==undefined){
                                                 gaPlugin.startTrackerWithId(analyticsAccount, analyticsSuccessHandler, analyticsErrorHandler);
                                                 var devicePlatformVersion = device.platform + " - " + device.version;
                                                 gaPlugin.addCustomDimension(1, devicePlatformVersion, analyticsSuccessHandler, analyticsErrorHandler);
                                                 gaPlugin.addCustomDimension(2, device.model, analyticsSuccessHandler, analyticsErrorHandler);
                                                 }
                                                 googleAnalyticsLoaded = true;
                                                 }
                                                 $(document).off("pagebeforeshow", ".ui-page");
                                                 $(document).on("pagebeforeshow", ".ui-page", function(event) {
                                                                try {
                                                                appPaused=false;
                                                                if(screen!==undefined && screen.lockOrientation!==undefined){
                                                                screen.lockOrientation("portrait");
                                                                }
                                                                if (allowAnalytics === "1" && googleAvailable === true && googleAnalyticsLoaded === true) {
                                                                var pageUrl = $(event.currentTarget).attr("id");
                                                                pageTracked(pageUrl);
                                                                }
                                                                } catch (e) {}
                                                                });
                                                 } else {
                                                 googleAvailable = false;
                                                 allowAnalytics === "0";
                                                 }
                                                 });
                   }
                   }, 0);
        return true;
    } catch (e) {
        
        return false;
    }
}

function showAndroidKeyboard() {
   
}

function hideAndroidKeyboard() {
    if (tablet === false) {
        $(".scrollpadderdiv").hide();
    }
    if (helpdeskScroller != undefined) {
        setTimeout(function() {
                   helpdeskScroller.refresh();
                   }, 0);
    }
}

function initStart() {
    try {
        coController = new Controller();
        setDeviceSpecificInitialization();
        if (device.platform === "iOS") {
            window.requestFileSystem(3, 0, onFSSuccess, onError);
            window.requestFileSystem(3, 0, onFSDocSuccess, onError);
        } else {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, onError);
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSDocSuccess, onError);
        }
        
        if (configs == undefined) {
            configs = new Configs();
        }
        portalId = parseInt(configs.getCustom("CS_PORTAL_ID"),10);
        userPortalId = parseInt(localStorage.getItem("ETP_USERPORTALID"),10);
        eClassLibraryID = parseInt(localStorage.getItem("ETP_ECLASSLIBRARYID"),10);
        videoLibraryID = parseInt(localStorage.getItem("ETP_VIDEOLIBRARYID"),10);
        
        if(userPortalId !==undefined && userPortalId > 0 && userPortalId!==portalId){
            portalId = userPortalId;
        }else{
            userPortalId = portalId;
            localStorage.setItem("ETP_USERPORTALID", userPortalId);
        }
        
        users = new Users();
        if (users.count() > 0) {
            activeUser = users.getUser();
            activeUser.getUserDatabaseList();
        } else {
            activeUser = new User();
            activeUser.getUserDatabaseList();
        }
        portalCourses = new Courses();
        networkTestUrl = (configs !== undefined) ? configs.getCustom("CS_SITE_URL") : "";
        if (networkTestUrl.length > 0) {
            if (networkTestUrl.indexOf("http://") < 0) {
                networkTestUrl = "http://" + networkTestUrl;
            }
        }
        /*if(configs.getCustom("CS_VERSION_NO") < "9.22"){
            msgStr = "There is a new version of this app. Please go to the App Store to update.";
            msgTitle = "Update";
            msgBtnValue = "Update,Cancel";
            navigator.notification.confirm(msgStr, UpdateApp, msgTitle, msgBtnValue);
            function UpdateApp(choice){
                if(choice == "1"){
                   openWebBrowser("https://play.google.com/store/apps/details?id=com.eteacherpro.trainfitness");
                   navigator.app.exitApp();
                }
                else{
                    navigator.app.exitApp();
                }
            }
            //openWebBrowser("https://play.google.com/store/apps/details?id=com.eteacherpro.trainfitness");
        }
        else{
            mainStartup();
        }*/

        mainStartup();
    } catch (e) {
        mainStartup();
        return false;
    }
    return true;
}

function openWebBrowser(url) {
    try {
        window.open(encodeURI(url), "_system", "location=yes");
    } catch (e) {
        errorHandler("openWebBrowser", e);
    }
}

function setResourcesScriptFile(removeResource, returnFunction) {
    try {
        var scriptSource = "";
        if (removeResource === true) {
            scriptSource = "localization/resources_" + userLanguage + ".js";
            if ($('script[src="' + scriptSource + '"]').length > 0) {
                $('script[src="' + scriptSource + '"]').remove();
            }
            scriptSource = "localization/resourcessupport_" + userLanguage + ".js";
            if ($('script[src="' + scriptSource + '"]').length > 0) {
                $('script[src="' + scriptSource + '"]').remove();
            }
            scriptSource = "localization/jquery.mobile.datebox.i18n." + appLanguageId + ".utf8.js";
            if ($('script[src="' + scriptSource + '"]').length > 0) {
                $('script[src="' + scriptSource + '"]').remove();
            }
        }
        scriptSource = "localization/resources_" + appLanguageId + ".js";
        $.getScript(scriptSource, function(data, textStatus, jqxhr) {
                    scriptSource = "localization/resourcessupport_" + appLanguageId + ".js";
                    $.getScript(scriptSource, function(data, textStatus, jqxhr) {
                                scriptSource = "localization/jquery.mobile.datebox.i18n." + appLanguageId + ".utf8.js";
                                $.getScript(scriptSource, function(data, textStatus, jqxhr) {
                                            returnFunction(true);
                                            });
                                });
                    });
    } catch (e) {
        errorHandler("setResourcesScriptFile", e);
        returnFunction(false);
    }
}

function mainStartup() {
    try {

    if(window.devicePixelRatio>=2 && parseFloat(device.version).toFixed(1)<=4.3)
    {
      document.head.insertAdjacentHTML( 'beforeEnd', '<meta name="viewport" content="target-densityDpi=300" />' );
      $("body").css("font-size","1.3em");
      
    }
        setMediaSetRefresh();
        resetFileDownload(true);
        setTimeout(function() {
                   coController.coCheckNetworkAvaliable(false, function(ret) {
                                                        if (ret === false) {
                                                        msgStr = resources.noNetworkLimited;
                                                        msgTitle = resources.connError;
                                                        msgBtnValue = resources.btnOk;
                              
                            if((localStorage.getItem("ETP_HASTERMSCONDITIONSAGREED")==false||localStorage.getItem("ETP_HASTERMSCONDITIONSAGREED") == undefined))
                            {
                              msgStr=resources.termsconnectionfail;
                            }
                            
                            
                            
                                                        navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                            
                                                        appFirstLoad = false;
                                                        localStorage.setItem("ETP_FIRSTLOAD", appFirstLoad);
                                                        }
                                                        setFirstPage(function(retFirst) {
                                                                     if (retFirst === "login") {
                                                                     showLoginPage();
                                                                     } else {
                                                                     $("#popupcontainerinner").css("transform", "translateX(50%)");
                                                                     }
                                                                     });
                                                        return true;
                                                        });
                   }, 300);
    } catch (e) {
        errorHandler("mainStartup", e);
        return false;
    }
    return true;
}

function setDeviceSpecificInitialization() {
    try {
        
        if (device.platform === "Android") {
            try {
                
                window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(dir) {
                                                 if (dir !== undefined) {
                                                 dir.getDirectory(".eteacher.pro", {
                                                                  create: false,
                                                                  exclusive: true
                                                                  }, function(dirEntry) {
                                                                  dirEntry.removeRecursively();
                                                                  }, function() {});
                                                 }
                                                 });
            } catch (e) {}
        }
    } catch (e) {
        errorHandler("setDeviceSpecificInitialization", e);
    }
}

function initializemap() {}

function onLocationSuccess(position) {
    try {
        retryPositioning = false;
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        coController.coCheckCountryLocation(lat, lng, function(ret) {
                                            if (ret !== undefined && ret.length > 1) {
                                            if (ret === "CN") {
                                            ignoreGoogle = true;
                                            googleAvailable = false;
                                            } else {
                                            coController.coCheckUrlExists(checkGoogleUrl, function(status) {
                                              console.log(checkGoogleUrl);
                                                                          if (status === 200) {
                                                                          googleAvailable = true;
                                                                          } else {
                                                                          googleAvailable = false;
                                                                          }
                                                                          retryPositioning = true;
                                                                          if (googleAvailable === true) {
                                                                          ignoreGoogle = false;
                                                                          checkAnalyticsLoaded();
                                                                          setGoogleJS();
                                                                          }
                                                                          });
                                            }
                                            } else {
                                            coController.coCheckUrlExists(checkGoogleUrl, function(status) {
                                                                          if (status === 200) {
                                                                          googleAvailable = true;
                                                                          } else {
                                                                          googleAvailable = false;
                                                                          }
                                                                          retryPositioning = true;
                                                                          if (googleAvailable === true) {
                                                                          ignoreGoogle = false;
                                                                          checkAnalyticsLoaded();
                                                                          setGoogleJS();
                                                                          }
                                                                          });
                                            }
                                            });
    } catch (e) {}
}

function onLocationError() {
    try {
        retryPositioning = true;
        getpositionfirst = false;
        coController.coCheckUrlExists(checkGoogleUrl, function(status) {
                                      if (status === 200) {
                                      googleAvailable = true;
                                      } else {
                                      googleAvailable = false;
                                      }
                                      ignoreGoogle = false;
                                      checkAnalyticsLoaded();
                                      setGoogleJS();
                                      });
    } catch (e) {}
}

function setFirstPage(returnFunction) {
    try {
        pageLoad = "#mainhomepage";
        if (activeUser.username !== undefined && activeUser.username !== "" && activeUser.username.length > 0) {
            if (activeUser.savedPosition != undefined) {
                loadIds = {
                courseid: activeUser.savedPosition.courseid == undefined ? 0 : activeUser.savedPosition.courseid,
                modulegroupid: activeUser.savedPosition.modulegroupid == undefined ? 0 : activeUser.savedPosition.modulegroupid,
                moduleid: activeUser.savedPosition.moduleid == undefined ? 0 : activeUser.savedPosition.moduleid,
                sectionid: activeUser.savedPosition.sectionid == undefined ? 0 : activeUser.savedPosition.sectionid,
                assetid: activeUser.savedPosition.assetid == undefined ? 0 : activeUser.savedPosition.assetid,
                pageid: activeUser.savedPosition.pageid == undefined ? "" : activeUser.savedPosition.pageid,
                issuetab: activeUser.savedPosition.issuetab == undefined ? "" : activeUser.savedPosition.issuetab,
                issueid: activeUser.savedPosition.issueid == undefined ? "" : activeUser.savedPosition.issueid,
                nodekey: activeUser.savedPosition.nodekey == undefined ? 0 : activeUser.savedPosition.nodekey
                };
                prevLoadIds = loadIds;
            }
            if (loadIds != undefined && loadIds.pageid != undefined && loadIds.pageid.length > 0) {
                startupPageid = loadIds.pageid;
            }
      
            if (activeUser.savedMediaPosition !== undefined) {
                mediaLoadIds = {
                tabname: activeUser.savedMediaPosition.tabname == undefined ? "" : activeUser.savedMediaPosition.tabname,
                tabid: activeUser.savedMediaPosition.tabid == undefined ? "" : activeUser.savedMediaPosition.tabid,
                categoryid: activeUser.savedMediaPosition.categoryid == undefined ? "" : activeUser.savedMediaPosition.categoryid,
                itemid: activeUser.savedMediaPosition.itemid == undefined ? "" : activeUser.savedMediaPosition.itemid
                };
            }
            if (activeUser.rememberPassword===true) {
                coController.coLogin(true, function(ret) {
                                     if (ret == undefined || ret == -1) {
                                      //alert("if")
                                     msgStr = resources.connectionFail;
                                     msgTitle = resources.connError;
                                     msgBtnValue = resources.btnOk;
                                     navigator.notification.alert(msgStr, function() {
                                                                  hidePleaseWait();
                                                                  activeUser.requireslogin = true;
                                                                  }, msgTitle, msgBtnValue);
                                     } else {
                                     if (ret == 0) {
                                      activeUser.requireslogin = true;
                                      showLoginPage();
                                      } else {
                                      //console.log(ret);
                                     var authObj = ret;
                                     var id = authObj.UserId;
                                     activeUser.userId = id;
                                     activeUser.hascourses = authObj.HasCourses;
                                     userHasCourses = activeUser.hascourses;
                                     activeUser.hasTermsConditionsAgreed = authObj.hasTermsConditionsAgreed;
                                     userhasTermsConditionsAgreed=activeUser.hasTermsConditionsAgreed;
                                     activeUser.hasvideos = authObj.HasVideos;
                                     activeUser.hasaudio = authObj.HasAudio;
                                     users.save(activeUser);
                                     if (fileMainDir != undefined) {
                                       getUserRootDir(function(ret) {});
                                     }
                                     var portalName = "";
                                     portalsList = authObj.Portals;
                                     if (portalsList.length == undefined) {
                                       portalName = portalsList.Name;
                                       eClassLibraryID = portalsList.EClassLibraryId;
                                       videoLibraryID = portalsList.VideoLibraryId;
                                     } else {
                                       for (var i = 0; i < portalsList.length; i++) {
                                         var portal = portalsList[i];
                                         if (portal.PortalId == portalId) {
                                           portalName = portal.Name;
                                           eClassLibraryID = portal.EClassLibraryId;
                                           videoLibraryID = portal.VideoLibraryId;
                                           break;
                                         }
                                       }
                                     }
                                     if (portalName == "") {
                                     activeUser.requireslogin = true;
                                     } else {
                                     activeUser.requireslogin = false;
                                     users.save(activeUser);
                                     loadFirstSave = true;
                                     var languageChoices = configs.getCustom("CS_APP_LANGUAGE");
                                     var languages;
                                     if (languageChoices !== undefined) {
                                     languages = JSON.parse(languageChoices);
                                     }
                                     if (languages !== undefined && languages.length > 0) {
                                     for (i = 0; i < languages.length; i++) {
                                     var lang = languages[i];
                                     if (lang.value === portalId) {
                                     appLanguageId = lang.language;
                                     userLanguage = appLanguageId;
                                     break;
                                     }
                                     }
                                     }
                                     setResourcesScriptFile(true, function(ret){
                                                            activeUser.setHelpdeskCategories(authObj.HelpdeskCategories, function() {});
                                                            loadCoursePage = false;
                              
                              if((authObj.hasTermsConditionsAgreed==false)&& (localStorage.getItem("ETP_HASTERMSCONDITIONSAGREED")==false||localStorage.getItem("ETP_HASTERMSCONDITIONSAGREED") == undefined))
                              {
                                goToPage("#termsconditionpage");
                              }
                              else
                              {
                                                            if (startupPageid !== "#coursepage" && activeUser.hascourses === true) {
                                                            loadCoursePage = true;
                                                            goToPage("#coursepage");
                                                            } else {
                                                            goToPage(startupPageid);
                                                            }}
                                                            });
                                     }
                                   
                                     }
                                     }
                                     });
            } else {
                returnFunction("login");
            }
        } else {
            returnFunction("login");
        }
        setTimeout(function() {
                   if (navigator.geolocation != undefined) {
                   navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, {
                                                            enableHighAccuracy: true,
                                                            timeout: 30000,
                                                            maximumAge: 30000
                                                            });
                   }
                   }, 1200);
    } catch (e) {
        errorHandler("setFirstPage", e);
    }
}
var firstURL = "";

function checkAnalyticsLoaded() {
  //console.log("In analytics");
    try{
        if (ignoreGoogle === false && googleAnalyticsLoaded === false) {
            coController.coCheckUrlExists(checkGoogleUrl, function(status) {
              if (status === 200) {
                googleAvailable = true;
                var allowOfflineSetting = configs.getCustom("CS_ALLOW_OFFLINE") === "1";
                allowOffline = allowOfflineSetting === undefined || allowOfflineSetting === 0 ? false : true;
                allowAnalytics = configs.getCustom("CS_ANALYTICS_TRACK") === "1" ? "1" : "0";
                if (allowAnalytics === "1" && googleAvailable === true) {
                  analyticsAccount = configs.getCustom("CS_ANALYTICS_ID");
                  var devicePlatformVersion = device.platform + " - " + device.version;
                  gaPlugin = window.analytics;
                  if(gaPlugin!==undefined){
                    gaPlugin.startTrackerWithId(analyticsAccount, analyticsSuccessHandler, analyticsErrorHandler);
                    gaPlugin.addCustomDimension(1, devicePlatformVersion, analyticsSuccessHandler, analyticsErrorHandler);
                    gaPlugin.addCustomDimension(2, device.model, analyticsSuccessHandler, analyticsErrorHandler);
                    googleAnalyticsLoaded = true;
                  }
                }
                $(document).on("pagebeforeshow", ".ui-page", function(event) {
                  try {
                    if (allowAnalytics === "1" && googleAvailable === true && googleAnalyticsLoaded === true) {
                      var pageUrl = $(event.currentTarget).attr("id");
                      pageTracked(pageUrl);
                    }
                  } catch (e) {}
                });
              } else {
                googleAvailable = false;
                allowAnalytics === "0";
              }
            });
        }
    } catch (e) {
        errorHandler("checkAnalyticsLoaded", e);
    }
}

function setGoogleJS() {
    try {
        if (googleAvailable === true && ignoreGoogle === false) {
            var mapSource = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCLnHHP7HiIeIOehYwKD8fncG3jDCwtU50&callback=initializemap";
            var mapScript = document.createElement("script");
            if ($('script[src="' + mapSource + '"]').length === 0) {
                mapScript.setAttribute("src", mapSource);
                document.body.appendChild(mapScript);
            }
            mapSource = "scripts/base/jquery.ui.map.js";
            if ($('script[src="' + mapSource + '"]').length === 0) {
                mapScript = document.createElement("script");
                mapScript.setAttribute("src", mapSource);
                document.body.appendChild(mapScript);
            }
            mapSource = "scripts/base/jquery.ui.map.services.js";
            if ($('script[src="' + mapSource + '"]').length === 0) {
                mapScript = document.createElement("script");
                mapScript.setAttribute("src", mapSource);
                document.body.appendChild(mapScript);
            }
            mapSource = "scripts/base/jquery.ui.map.extensions.js";
            if ($('script[src="' + mapSource + '"]').length === 0) {
                mapScript = document.createElement("script");
                mapScript.setAttribute("src", mapSource);
                document.body.appendChild(mapScript);
            }
            setGoogleJSOK = true;
        }
    } catch (e) {
        googleAvailable = false;
    }
}

function goToPage(page, trans, back, navi) {
    try {
        document.activeElement.blur();
        showPleaseWait();
        back = false;
        trans = "none";
        var delay = 0;
        $("#supportfooter").css("display","block");
        $("#supportfooter1").css("display","block");
        $("#pagefooter").css("display","block");
        $(".class1").css("display","block");
        $(".class2").css("display","block");
        $(".class3").css("display","block");
        $(".class4").css("display","block");
        $("#footerdatarool").css("display","block");
        var htmlPage = "";
       //htmlPage = "#termsconditionpage2";

        //switch comment from 1081 to 1188
     switch (page) {
            case "#mainhomepage":
                htmlPage = "index.html";
                break;
          
            case "#termsconditionpage":
                htmlPage = "#termsconditionpage";
                break;
        
            case "#OtaDetailPage":
             trans = "slide";
              htmlPage = "#OtaDetailPage";
            break;

            case "#eClasse":
                trans = "slide";
                htmlPage = "#eClasse";
            break;

            case "#bookingPage":
                trans = "slide";
                htmlPage = "#bookingPage";
            break;

            case "#OtaQuestionPage":
             trans = "slide";
              htmlPage = "#OtaQuestionPage";
            break;
       case "#termsconditionpage2":
                htmlPage = "#termsconditionpage2";
                break;
            case "#coursepage":
      
      if(mtermsagreed==false)
      {
        htmlPage = "#termsconditionpage";
        
      }else{
        htmlPage = "#coursepage";
      }
                if (prevPage === "#helpdeskpage") {
                    trans = "slide";
                }
                break;
      case "#termsconditionpage":
                htmlPage = "#termsconditionpage";
                if (prevPage === "#helpdeskpage") {
                    trans = "slide";
                }
                break;
        
        
            case "#helpdeskpage":
      if(mtermsagreed==false)
      {
        htmlPage = "#termsconditionpage";
        
      }else{
        filecount.counter = 1;
        HelpDeskFiles = [];
        htmlPage = "helpdesk.html";
      }
                trans = "slide";
                break;
            case "#pdfviewpage":
                htmlPage = "pdfviewcontainer.html";
                trans = "slide";
                break;
            case "#errorpage":
                htmlPage = "errorpage.html";
                trans = "slide";
                break;
            case "#podcastpage":
      if(mtermsagreed==false)
      {
        htmlPage = "#termsconditionpage";
        
      }else{
        htmlPage = "podcast.html";
      }
                trans = "slide";
        
                break;
            case "#coursepodcastpage":
      
      if(mtermsagreed==false)
      {
        htmlPage = "#termsconditionpage";
        
      }else{
        htmlPage = "coursepodcast.html";
      }
                trans = "slide";
                break;
            case "#eclassvideopage":
      if(mtermsagreed==false)
      {
        htmlPage = "#termsconditionpage";
        
      }else{
        htmlPage = "eclassvideo.html";
      }
                trans = "slide";
                break;
            case "#supportpage":
      if(mtermsagreed==false)
      {
        htmlPage = "#termsconditionpage";
        
      }else{
        htmlPage = "support.html";
      }
                trans = "slide";
                break;
            case "#venuedetailpage":
                htmlPage = "venuedetail.html";
                trans = "slide";
                break;
            default:
      if(mtermsagreed==false)
      {
        htmlPage = "#termsconditionpage";
        
      }else{
        htmlPage = "#coursepage";
      }
                break;
        }

        //comment till
        trans = trans == undefined ? "slide" : trans;
        back = (back == undefined) ? false : back;
        navi = (navi == undefined) ? true : navi;
        if (device.platform === "Android") {
            trans = "none";
        }
        if (page == "#coursepage") {
            firstLoad = true;
        }
        if (page == "#mainhomepage") {
            if (pageLoad == "#coursepage") {
                showLoginPage();
            }
        }
        $("body").pagecontainer("change", htmlPage, {
                                transition: trans,
                                allowSamePageTransition: false,
                                showLoadMsg: false,
                                reloadPage: false
                                });
        prevPage = pageLoad;
        pageLoad = page;
        if (pageLoad === "#coursepage") {
            if (firstMenuChange===true) {
                firstMenuChange = false;
            }
        }
        if (pageLoad === "#mainhomepage") {
            if (device.platform == "Android") {
                navigator.app.exitApp();
            } else {
                showLoginPage();
            }
        }
        firstLoad = false;
    } catch (e) {
        errorHandler("goToPage", e);
    }
    return false;
}


function logoutUser()
{
  if (deviceIsOnline === false)
  {
     msgStr = resources.connectLogout;
     msgTitle = resources.connError;
     msgBtnValue = resources.btnOk;
    navigator.notification.confirm(msgStr, function() {console.log("device offline")
                                                          }, msgTitle, msgBtnValue);
  }
  else
  {
    
  
   var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_LOGOUT");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: mlogoutUser,
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
  
  
  }
  
  
  
}


function mlogoutUser() {
    try {
        
        resetFileDownload(true);
        videoCategoryListing =  "";
        audioCategoryListing = "";
        eClassListing = "";
        podcastsListing = [];
        playlistTracks="";
        useExistingMedia = false;
        
        activeUser.portalCourses = undefined;
        activeUser.playlists = undefined;
        activeUser.audiocategories = undefined;
        activeUser.videocategories = undefined;
        activeUser.eclasses = undefined;
        activeUser.userDB = undefined;
        activeUser.existPods = new Array();
        activeUser.existVids = new Array();
        activeUser.existeClasses = new Array();
        activeUser.existAuds = new Array();
        activeUser.existPlaylists = new Array();
        
        
        activeUser.saveFilesList(undefined, "podcasts", false, function() {});
        activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
        activeUser.saveFilesList(undefined, "videocategories", false, function() {});
        activeUser.saveFilesList(undefined, "eclasses", false, function() {});
        activeUser.saveFilesList(undefined, "userplaylists", false, function() {});
        
        
        activeCourse = undefined;
        activeModuleGroup = undefined;
        activeModule = undefined;
        activeSection = undefined;
        activeSCO = undefined;
        
        mediaSetRefresh();
        resetMenuOpenName();
        localStorage.setItem("ETP_LOGGEDOUTUSER", true);
        
        portalId = configs.getCustom("CS_PORTAL_ID");
        userPortalId = 0;
        localStorage.setItem("ETP_USERPORTALID", portalId);
        useExistingMedia=false;
        mediaInit=true;
        coursesInit=true;
        appFirstLoad = true;
        
        localStorage.setItem("ETP_FIRSTLOAD", appFirstLoad);
        if (loadIds !== undefined) {
            loadIds.courseid = 0;
            loadIds.modulegroupid = 0;
            loadIds.moduleid = 0;
            loadIds.sectionid = 0;
            loadIds.assetid = 0;
            loadIds.pageid = "";
            loadIds.issuetab = "";
            loadIds.issueid = "";
            loadIds.nodekey = "";
        }
        if (mediaLoadIds !== undefined) {
            mediaLoadIds.tabname = "";
            mediaLoadIds.tabid = "";
            mediaLoadIds.categoryid = "";
            mediaLoadIds.itemid = "";
        }
        
        activeUser.requireslogin = true;
        activeUser.pwdHash = "";
        activeUser.username = "";
        
        users.save(activeUser);
        users.deleteUser(activeUser);
        
        activeUser = new User();
        
        activeUser.requireslogin = true;
        activeUser.rememberPassword = true;
        changeUser = true;
        loadFirstSave = true;
        users.save(activeUser);
        
        $("#scosset").empty();
        $("#ulcourses").empty();
        $("#theorydatacontent").empty();
        $("#contentnavdiv").hide();
        $("#wscontentnavdiv").hide();
        
        // Delete all files downloaded for the user
        deleteAllUserData();
        
        // reset the user file directories
        helpDeskDir=undefined;
        userDataDir=undefined;
        userMainDir=undefined;
        fileMainDir=undefined;
        mediaDataDir=undefined;
        videoMediaDir=undefined;
        audioMediaDir=undefined;
        theoryMediaDir=undefined;
        docsFileDir=undefined;
        
        msgStr = resources.logoutWait;
        msgTitle = resources.logoutSuccess;
    if(autologoutstring==1)
    {
      msgTitle=resources.autologout;
      autologoutstring=0;
    }
        msgBtnValue = resources.btnOk;
        navigator.notification.confirm(msgStr, function() {
                                       hidePleaseWait();
                                       courseListContent = "";
                                       loadIds = undefined;
                                       mediaLoadIds = undefined;
                                       prevLoadIds = undefined;
                                       loadFirstSave = true;
                                       portalCourses = new Courses();
                                       prevPage="";
                                       pageLoad="";
                                       courseListContent = "";
                                       loadFirstSave = true;
                                       
                                       // initStart();
                                       goToPage("#mainhomepage");
                                       }, msgTitle, msgBtnValue);
    } catch (e) {
        errorHandler("logoutUser", e);
    }
}

function preventDefaultScrolling(event) {
    if (device.platform === "Android") {
        hideKeyboard(event, false);
    }
}

$(document).on("pagebeforeshow", ".ui-page", function(event) {
               try {
               if (iosDevice === true) {
               $(".ui-content[role='main']").addClass("ios");
               }
               } catch (e) {}
               });
$(".ui-header").on("touchmove",function(e){e.preventDefault();});
$(".ui-footer").on("touchmove",function(e){e.preventDefault();});


$("#mainhomepage").on("touchmove", function(event) {
                      event.preventDefault();
                      });
$("#pdfviewpage").on("touchmove", function(event) {
                     event.preventDefault();
                     });
$("#mainhomepage").on("pagecreate", function(event) {
                      if (retinaDisplay === true) {
                      $("#mainhomepage").addClass("retinamain");
                      $("#maincontentimgdiv").addClass("retinamain");
                      }
                      if (pixelx2 === true) {
                      $("#maincontentimgdiv").addClass("pixelx2");
                      }
                      
                      if (iphone5 === true) {
                      $(".ui-page").addClass("iphone5");
                      $(".ui-content").addClass("iphone5");
                      $(".ui-panel-content-wrap-closed").addClass("iphone5");
                      $(".ui-panel").addClass("iphone5");
                      $("#mainhomepage").addClass("iphone5");
                      $("#loginpopup").addClass("iphone5");
                      }
                      $("#maincontentimgdiv").off("doubletap");
                      $("#maincontentimgdiv").on("doubletap", function(event) {
                                                 showLoginPage();
                                                 });
                      if(screen!==undefined && screen.lockOrientation!==undefined){
                      screen.lockOrientation("portrait");
                      }
                      });
$("#mainhomepage").on("pagebeforeshow", function(event) {
                      try {
                      $("#popupcontainerinner").css("transform", "translateX(50%)");
                      if(screen!==undefined && screen.lockOrientation!==undefined){
                      screen.lockOrientation("portrait");
                      }
                      if (retinaDisplay === true) {
                      $("#mainhomepage").addClass("retinamain");
                      $("#maincontentimgdiv").addClass("retinamain");
                      }
                      if (pixelx2 === true) {
                      $("#maincontentimgdiv").addClass("pixelx2");
                      }
                      
                      if (iphone5 === true) {
                      $(".ui-page").addClass("iphone5");
                      $(".ui-content").addClass("iphone5");
                      $(".ui-panel").addClass("iphone5");
                      $(".ui-panel-content-wrap-closed").addClass("iphone5");
                      $("#mainhomepage").addClass("iphone5");
                      $("#loginpopup").addClass("iphone5");
                      }
                      
                      $("#maincontentimgdiv").on("vclick", function(event) {
                                                 loginpopupOpen();
                                                 });
                      $("input[name=radio-choice-portal]").off("click");
                      $("input[name=radio-choice-portal]").on("click", function(event, ui) {
                                                              $("input[name=radio-choice-portal]").checkboxradio("refresh");
                                                              $("#fieldsetportals label").removeClass("ui-btn-hover-h").removeClass("ui-btn-down-h");
                                                              });
                      } catch (e) {
                      errorHandler("mainhomepage.pagebeforeshow", e);
                      }
                      });
$("#errorpage").on("pagebeforeshow", function(event) {
                   try {
                   audioTheoryPlayerLoaded = false;
                   $("#errormessage").html(strErrorMessage);
                   $("#errormessagemodel").html("Device Model :  " + device.model);
                   $("#errormessageversion").html("Device Version :  " + device.version);
                   $("#errormessageplatform").html("Device Platform :  " + device.platform);
                   var version = configs.getCustom("CS_VERSION_NO");
                   $("#errorappversion").html("App Version No :  " + version);
                   $("#errorbackbtn").off("vclick");
                   $("#errorbackbtn").on("vclick", function(event) {
                                         event.preventDefault();
                                         if (device.platform === "Android") {
                                         history.back();
                                         } else {
                                         $.mobile.back();
                                         }
                                         });
                   } catch (e) {}
                   });

function loginpopupOpen() {
    
    $("#loginpopuphead").html(resources.loginpopuphead);
    $("#loginfieldsusername").html(resources.loginfieldsusername);
    $("#loginfieldspassword").html(resources.loginfieldspassword);
    $("#loginuserbtn").html(resources.loginpopuphead);
    $("#popupcontainer").show();
    $("#popupcontainerinner").css("transform", "translateX(0)");
    
    if (device.platform === "Android") {
        $("#loginpopup").addClass("android");
    }
    if (iphone5 === true) {
        $("#loginpopup").addClass("iphone5");
    }
    if (configs === undefined) {
        return;
    }
    if (retinaDisplay === true && pixelx3 === true) {
        $("#loginpopup").addClass("retinamainlogin");
    }
    
    $(".ui-input-text").removeClass("ui-corner-all").removeClass("ui-shadow-inset");
    var rememberVal = "on";
    $("#login-username").val(activeUser.username);
    $("#login-password").val(activeUser.pwdHash);
    $("#loginpopup").off("keyup");
    $("#loginpopup").on("keyup", function(event) {
                        if (device.platform === "Android" && tablet === false) {
                        var loginEvent = event || window.event;
                        var keyPressed = loginEvent.keyCode || loginEvent.which;
                        if (keyPressed == 13) {
                        $("#loginuserbtn").trigger("click");
                        }
                        }
                        return true;
                        });
}
$(document).on("pagecontainerhide", function(event) {
               $("#maincontentimgdiv").off("tap");
               });
$(document).on("pagecreate", "#errorpage", function(event) {
               try {
               var mailLink = configs.getCustom("CS_SUPPORT_EMAIL");
               var supportText = configs.getCustom("CS_PORTAL_NAME") + " Administrator";
               var errorLinkDiv = "<a href='mailto:" + mailLink + "'>" + supportText + "</a>";
               $("#errordivlink").html(errorLinkDiv);
               $("#errormessage").html(strErrorMessage);
               $("#errormessagemodel").html("Device Model :  " + device.model);
               $("#errormessageversion").html("Device Version :  " + device.version);
               $("#errormessageplatform").html("Device Platform :  " + device.platform);
               var version = configs.getCustom("CS_VERSION_NO");
               $("#errorappversion").html("App Version No :  " + version);
               audioTheoryPlayerLoaded = false;
               $("#errorbackbtn").off("vclick");
               $("#errorbackbtn").on("vclick", function(event) {
                                     event.preventDefault();
                                     if (device.platform === "Android") {
                                     history.back();
                                     } else {
                                     $.mobile.back();
                                     }
                                     });
               } catch (e) {}
               });
         


$(document).on("pagebeforeshow", "#termsconditionpage", function(event) {
                   try {
                   $("#novideopodcastdiv").show();
               $("#novideopodcastdiv").html(resources.loadingData);
                   } catch (e) {
              errorHandler("termsconditionpage.pagebeforeshow", e);
           }
                   });
           
           
           
$(document).on("pagebeforeshow", "#termsconditionpage2", function(event) {
                   try {
                   $(".novideopodcastdiv").show();
               $(".novideopodcastdiv").html(resources.loadingData);
                   } catch (e) {
              errorHandler("termsconditionpage.pagebeforeshow", e);
           }
                   });





morepolicyexist=""; 
var termsParamsObj = {
policyVersionID: "",
PolicyTypeID: "",
PolicyRole: "",
PolicyRoleLength: ""
};       
         
$(document).on("pagecreate", "#termsconditionpage", function(event) {
               try {
         
                $("#disagreelink").html(resources.termsnotagreed);
        $("#agreelink").html(resources.termsagree);
          $("#novideopodcastdiv").html(resources.loadingData);
           var termsurl=configs.getCustom("CS_TERMS_URL");
           termsurl+= "?pid="+userPortalId+"&uid="+activeUser.userId;
                $(".termsdiv1").load(termsurl, function() {
  $("#novideopodcastdiv").hide();
});

var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_TERMS_SECOND_PART");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
             termsdata=data;
            
             $(".supportviewheader1").html(termsdata.getTermsCondtionsDataResult.Data.PolicyName);
            
           },
                   error: function(msg) {
                  
                   }
                   });




           
            $("#disagreelink").off("vclick");
            $("#disagreelink").on("vclick", function(event) {
                var urlMethod = getBaseUrl();
                urlMethod += configs.getCustom("CS_TERMS_SECOND_PART");
                var authKey = getAuthKeyUnencrypt();
                var portalKey = getPortalKeyUnencrypt();
                var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey);
                urlMethod += params;
                $.ajax({
                    beforeSend: function() {   $("#termsdiv").append(mloadingGif); }, 
                    complete: function() {  $("#mloader").remove();  },
                    url: urlMethod,
                    dataType: "json",
                    type: "GET",
                    async: true,
                    success: function(data, textStatus, jqXHR) {
                        termsdata=data;
                        morepolicyexist=termsdata.getTermsCondtionsDataResult.Data.IsMorePoliciesExist;
                        termsParamsObj.policyVersionID = termsdata.getTermsCondtionsDataResult.Data.PolicyVersionID;
                        termsParamsObj.PolicyTypeID = termsdata.getTermsCondtionsDataResult.Data.PolicyTypeID;
                        termsParamsObj.PolicyRole = termsdata.getTermsCondtionsDataResult.Data.PolicyRole;
                        termsParamsObj.PolicyRoleLength = termsdata.getTermsCondtionsDataResult.Data.PolicyRoleLength;
                        navigator.notification.alert(resources.termsnotagreedpart1+termsdata.getTermsCondtionsDataResult.Data.PolicyName+resources.termsnotagreedpart2);
                    },
                        error: function(msg) {
                    }
                });
            });
        
          
            $("#agreelink").off("vclick");
            $("#agreelink").on("vclick", function(event) {
                ShowAcceptanceData();
            });
                      
        
        
               } catch (e) {
               errorHandler("termsconditionpage.pagecreate", e);
               }
               });
         
         
function ShowAcceptanceData(){
  var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_TERMS_SECOND_PART");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey);
            urlMethod += params;
            $.ajax({
            beforeSend: function() {   $("#termsdiv").append(mloadingGif); }, 
            complete: function() {   $("#mloader").remove();  },
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
               termsdata=data;
               morepolicyexist=termsdata.getTermsCondtionsDataResult.Data.IsMorePoliciesExist;
               termsParamsObj.policyVersionID = termsdata.getTermsCondtionsDataResult.Data.PolicyVersionID;
               termsParamsObj.PolicyTypeID = termsdata.getTermsCondtionsDataResult.Data.PolicyTypeID;
            termsParamsObj.PolicyRole = termsdata.getTermsCondtionsDataResult.Data.PolicyRole;
            termsParamsObj.PolicyRoleLength = termsdata.getTermsCondtionsDataResult.Data.PolicyRoleLength;
            navigator.notification.confirm(
    (termsdata.getTermsCondtionsDataResult.Data.PolicyConfirmStatement+"\n"+termsdata.getTermsCondtionsDataResult.Data.PolicyAcceptStatement).replace(/<\/?[^>]+(>|$)/g, ""), // message
     AgreeTermaAndCondt,            // callback to invoke with index of button pressed
    resources.termsagree+" "+termsdata.getTermsCondtionsDataResult.Data.PolicyName,           // title
    [resources.termsagree,resources.termsnotagreed]     // buttonLabels
);
             
             
           },
                   error: function(msg) {
                   //returnFunction(-1);
                   }
                   });
  
  
  
  
} 


function AgreeTermaAndCondt(button){
  
  if(button==1){
   var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_TERMS_AGREED");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(termsParamsObj);
            urlMethod += params;
       $.ajax({
         beforeSend: function() {    $("#termsdiv").append(mloadingGif); }, 
           complete: function() {  $("#mloader").remove();  },
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   tauthObj = data;
                   
                   if (tauthObj != undefined && tauthObj.userAcceptPolicyResult.JsonResponse== "True" && morepolicyexist== "False") {
             localStorage.setItem("ETP_HASTERMSCONDITIONSAGREED", "true")
                  mtermsagreed=true;
              setTimeout(function() {
                                                     goToPage(startupPageid);                          
                                                                               }, 10);
           
              
          
                   } else {
           if($.mobile.activePage.attr('id')=="termsconditionpage"){
             goToPage("#termsconditionpage2"); 
           }else{
              goToPage("#termsconditionpage"); 
           }
          
                   }
                   },
                   error: function(msg) {
                   console.log("error terms");
           msgStr = resources.termsconnectionfail;
                                                        msgTitle = resources.connError;
                                                        msgBtnValue = resources.btnOk;
                            
                            
                                                        navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                   }
                   });
  }
  
  
  
      
      
  
}      
         
$(document).on("pagecreate", "#termsconditionpage2", function(event) {
               try {
           
           
          
                $(".disagreeterm2").html(resources.termsnotagreed);
        $(".agreeterm2").html(resources.termsagree);
          $(".novideopodcastdiv").html(resources.loadingData);
           var termsurl=configs.getCustom("CS_TERMS_URL");
           termsurl+="?pid="+userPortalId+"&uid="+activeUser.userId;
                $(".termsdiv2").load(termsurl, function() {
                  $(".novideopodcastdiv").hide();
                });
        
        
        
        
        
        //show policy name
        var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_TERMS_SECOND_PART");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey);
            urlMethod += params;
            $.ajax({
                    url: urlMethod,
                    dataType: "json",
                    type: "GET",
                    async: true,
                    success: function(data, textStatus, jqXHR) {
                      termsdata=data;
                      $(".supportviewheader2").html(termsdata.getTermsCondtionsDataResult.Data.PolicyName);
                    },
                    error: function(msg) {
                   
                    }
                   });
        
        
        
        
        
         $(".disagreeterm2").off("vclick");
                                            $(".disagreeterm2").on("vclick", function(event) {
                        var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_TERMS_SECOND_PART");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey);
            urlMethod += params;
            $.ajax({
        beforeSend: function() {   $(".termsdiv2").append(mloadingGif); }, 
           complete: function() {  $("#mloader").remove();  },
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
             termsdata=data;
            morepolicyexist=termsdata.getTermsCondtionsDataResult.Data.IsMorePoliciesExist;
            termsParamsObj.policyVersionID = termsdata.getTermsCondtionsDataResult.Data.PolicyVersionID;
            termsParamsObj.PolicyTypeID = termsdata.getTermsCondtionsDataResult.Data.PolicyTypeID;
            termsParamsObj.PolicyRole = termsdata.getTermsCondtionsDataResult.Data.PolicyRole;
            termsParamsObj.PolicyRoleLength = termsdata.getTermsCondtionsDataResult.Data.PolicyRoleLength;
            navigator.notification.alert(resources.termsnotagreedpart1+termsdata.getTermsCondtionsDataResult.Data.PolicyName+resources.termsnotagreedpart2); 
           },
                   error: function(msg) {
                   //returnFunction(-1);
                   }
                   });
               });
        
          
         $(".agreeterm2").off("vclick");
                                            $(".agreeterm2").on("vclick", function(event) {
                        ShowAcceptanceData();
      
                                                                   });
                                                                
               } catch (e) {
               errorHandler("termsconditionpage.pagecreate", e);
               }
               });
         
         
         
$(document).on("pagecreate", "#coursepage", function(event) {
               try {
               
               $(".ui-header").on("touchmove",function(e){e.preventDefault();});
               $(".ui-footer").on("touchmove",function(e){e.preventDefault();});
               $(".pageheaderpanel").on("touchmove",function(e){e.preventDefault();});
               
               $("#theoryviewheader").html(resources.theoryView);
               $("#theoryviewheader").removeClass("noicon");
               $("#initialcontent").html(resources.initialcontent);
               $("#bookingdisclaimerdiv").html(resources.bookingdisclaimerdiv);
               $("#understand1txt").html(resources.understand1txt);
               $("#understand2txt").html(resources.understand2txt);
               $("#prevlink").html(resources.prevlink);
               $("#nextlink").html(resources.nextlink);
               $("#wsprevlink").html(resources.prevlink);
               $("#wsnextlink").html(resources.nextlink);
               $("#pdfviewimgtxt").html(resources.pdfviewimgtxt);
               $("#podcastimgtxt").html(resources.mypodcasts);
               $("#videobtnimgtxt").html(resources.myvideos);
               $("#audiobtnimgtxt").html(resources.mymusic);
               $("#plbtnimgtxt").html(resources.myplaylist);
               $("#helpdeskimgtxt").html(resources.helpdeskimgtxt);
               $(".coursesimgtxt").html(resources.coursesimgtxt);
               $("#supportimgtxt").html(resources.supportimgtxt);
               $(".refreshimgtxt").html(resources.refreshimgtxt);
               $("#logoutimgtxt").html(resources.logoutimgtxt);
               $("#closehelpimgtxt").html(resources.closehelpimgtxt);
               $("#settingsmenuheader").html(resources.settingsmenuhead);
               $("#bookdetailpopup").addClass("nodisplay");
               $(".moduleiconrhs").hide();
               $(".lessoniconrhs").hide();
               if (pixelx2 === true) {
               $("#ulscossdiv").addClass("pixelx2");
               $("#coursepagecontent").addClass("pixelx2");
               $("#sectiontitlehead").addClass("pixelx2");
               }
               if (retinaDisplay === true) {
               $("#coursepage").addClass("retina");
               $("#coursepagecontent").addClass("retina");
               }
               if (retinaDisplay === true) {
               $(".pageheaderpanel").addClass("retina");
               $(".pageheader").addClass("retina");
               $(".pageheaderpanelrhs").addClass("retina");
               }
               if (retinaDisplay === true && device.platform === "Android") {
               $(".extramenupanel").addClass("pixelx2");
               $(".coursemenupanel").addClass("pixelx2");
               }
               $("#pagefooter").removeClass("ui-panel-animate").removeClass("ui-panel-page-content-position-left");
               refreshMenu("refresh");
               if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined) {
               audioTheoryPaused = true;
               audioTheoryPlayer.pause();
               }
               $("#audiotheoryplayerdiv").hide();
               $("#changemenubtnli").hide();
               $("#sectiontitlehead").hide();
               $("#theorydatacontent").html("");
               $("#contentnavdiv").hide();
               $("#wscontentnavdiv").hide();
               if (tablet === false) {
               $(".ui-page").addClass("etpmobile");
               $(".ui-content").addClass("etpmobile");
               $(".ui-panel").addClass("etpmobile");
               $("#audiotheoryplayerdiv").addClass("etpmobile");
               $("#loginpopup").addClass("etpmobile");
               $("#videoplayerdiv").addClass("etpmobile");
               $(".audioplaycontainerdiv").addClass("etpmobile");
               $("#helpdeskpage").addClass("etpmobile");
               $("#supportpage").addClass("etpmobile");
               $("#podcastpage").addClass("etpmobile");
               $("#userplaylistpage").addClass("etpmobile");
               }
               
               if (iphone5 === true) {
               $(".ui-page").addClass("iphone5");
               $(".ui-content").addClass("iphone5");
               $(".ui-panel").addClass("iphone5");
               $(".ui-panel-content-wrap-closed").addClass("iphone5");
               $("#mainhomepage").addClass("iphone5");
               $("#loginpopup").addClass("iphone5");
               $("#mainhomepage").addClass("iphone5");
               $("#coursepagecontent").addClass("iphone5");
               $("#menucontentsection").addClass("iphone5");
               $("#menucontentcourse").addClass("iphone5");
               $("#menucontentgroup").addClass("iphone5");
               $("#scosset").addClass("iphone5");
               $("#supportmessagediv").addClass("iphone5");
               $("#mapdiv").addClass("iphone5");
               $("#coursemenupagecontent").addClass("iphone5");
               $("#podcastcontent").addClass("iphone5");
               $(".podcastcattable").addClass("iphone5");
               $("#contentprimary").addClass("iphone5");
               $("#footericonsleft").addClass("iphone5");
               $(".rhsmenuicondiv").addClass("iphone5");
               $("#coursepanelheader").addClass("iphone5");
               $("#theoryviewheader").addClass("iphone5");
               $(".theoryviewhead").addClass("iphone5");
               $("#supportpage").addClass("iphone5");
               
               
               
               }
               moduleTitleChars = configs.getCustom("CS_MODULETITLE_CHARS") === undefined ? 80 : parseInt(configs.getCustom("CS_MODULETITLE_CHARS"), 10);
               $(".headpadderdiv").hide();
               hideKeyboard(event, false);
               if($("video")){
               $("video").each(function(index, vid) {
                               vid.pause();
                               });
               }
               if (audioTheoryPlayer != undefined && audioTheoryPlayer !== undefined) {
               audioTheoryPaused = true;
               audioTheoryPlayer.pause();
               }
               $("#scosset").html("");
               $("#audiotheoryplayerdiv").hide();
               setRightHandMenuBtns();
               firstLoadCourses = false;
               $(".sectionsearchli").on("vclick", function(event) {
                                        event.preventDefault();
                                        });
               if (activeUser.hasvideos == false) {
               $("#videomenubtnli").hide();
               }
               if (activeUser.hasaudio == false) {
               $("#audiomenubtnli").hide();
               $("#plistmenubtnli").hide();
               }
               $("#pdfmenubtn").addClass("nodisplay");
               $("#podcastmenubtn").addClass("nodisplay");
               $("#eclassmenubtn").addClass("nodisplay");
               $("#bookingmenubtn").addClass("nodisplay");
               var windowheight = $(window).height() - $("header", $("body").pagecontainer("getActivePage")).height();
               $("#coursepagecontentwrapper").css("min-height", windowheight);
               $("#autocomplete").off("filterablebeforefilter");
               $("#autocomplete").on("filterablebeforefilter", function(e, data) {
                                     var $ul = $(this),
                                     $input = $(data.input),
                                     value = $input.val(),
                                     html = "";
                                     $ul.html("");
                                     if (value && value.length > 2) {
                                     $ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
                                     $ul.listview("refresh");
                                     userMenuSelect = true;
                                     sectionsUrl = coController.coSectionsGet($input.val());
                                     showMenu=false;
                                     
                                     $.ajax({
                                            url: sectionsUrl,
                                            dataType: "json",
                                            type: "GET",
                                            async: true,
                                            success: function(data, textStatus, jqXHR) {
                                            var sectionsResultObj = data;
                                            if (data.SectionsGetResult != undefined) {
                                            var sections = sectionsResultObj.SectionsGetResult.Data;
                                            $.each(sections, function(i, val) {
                                                   html += "<li><a class='searchsection' id='search-" + val.SearchId + "'>" + val.DisplayTitle + "</a></li>";
                                                   });
                                            $ul.html(html);
                                            $ul.listview("refresh");
                                            $ul.trigger("updatelayout");
                                            $("#sectionsearchdiv .ui-input-search a").show();
                                            $(".searchsection").off("vclick");
                                            $(".searchsection").on("vclick", function(event) {
                                                                   event.preventDefault();
                                                                   searchFocus = false;
                                                                   var id = $(event.currentTarget).attr("id");
                                                                   $("#sectionsearchdiv .ui-input-search a").hide();
                                                                   setPagePadderDiv("menuScroller", true);
                                                                   goToSection(id);
                                                                   });
                                            $("#sectionsearchdiv .ui-input-search a").off("vclick");
                                            $("#sectionsearchdiv .ui-input-search a").on("vclick", function(event) {
                                                                                         event.preventDefault();
                                                                                         $("#sectionsearchdiv .ui-input-search input").attr("data-lastval", "");
                                                                                         $("#autocomplete").empty();
                                                                                         $("#sectionsearchdiv input").val("");
                                                                                         $(this).hide();
                                                                                         setPagePadderDiv("menuScroller", true);
                                                                                         });
                                            setPagePadderDiv("menuScroller", false);
                                            }
                                            
                                            },
                                            error: function(msg) {
                                            return false;
                                            }
                                            });
                                     }
                                     });
              
               $("#menucontentcourse").removeClass("menuopen").addClass("menuclosed");
               $("#menucontentgroup").removeClass("menuopen").addClass("menuclosed");
               $("#menucontentsection").removeClass("menuopen").addClass("menuclosed");
               
               $("#menucontentcourse").hide();
               $("#menucontentgroup").hide();
               $("#menucontentsection").hide();
               } catch (e) {
               errorHandler("coursepage.pagecreate", e);
               }
               });
var wsok = true;
$(document).on("pagebeforeshow", "#coursepage", function(event) {
               try {
               pageLoad = "#coursepage";
               if(menuOpenName!==undefined && menuOpenName.length===0){showMenu=false;}
               hidePleaseWait();
               if (startupPageid !== "#coursepage" && loadCoursePage === true) {
               supressWarningMsgs = true;
               }
               if (fileMainDir != undefined) {
               getUserRootDir(function(ret) {});
               }
               audioTheoryPlayerLoaded = false;
               $("#theoryviewheader").html(resources.theoryView);
               $("#theoryviewheader").removeClass("noicon");
               $("#initialcontent").html(resources.initialcontent);
               $("#bookingdisclaimerdiv").html(resources.bookingdisclaimerdiv);
               $("#understand1txt").html(resources.understand1txt);
               $("#understand2txt").html(resources.understand2txt);
               $("#pdfviewimgtxt").html(resources.pdfviewimgtxt);
               $("#podcastimgtxt").html(resources.mypodcasts);
               $("#videobtnimgtxt").html(resources.myvideos);
               $("#audiobtnimgtxt").html(resources.mymusic);
               $("#plbtnimgtxt").html(resources.myplaylist);
               $("#helpdeskimgtxt").html(resources.helpdeskimgtxt);
               $("#supportimgtxt").html(resources.supportimgtxt);
               $("#preferenceimgtxt").html(resources.preferenceimgtxt);
               $("#logoutimgtxt").html(resources.logoutimgtxt);
               $("#closehelpimgtxt").html(resources.closehelpimgtxt);
               $("#settingsmenuheader").html(resources.settingsmenuhead);
               
               $("#prevlink").html(resources.prevlink);
               $("#nextlink").html(resources.nextlink);
               $("#wsprevlink").html(resources.prevlink);
               $("#wsnextlink").html(resources.nextlink);
               $(".coursesimgtxt").html(resources.coursesimgtxt);
               $(".refreshimgtxt").html(resources.refreshimgtxt);
               
               $("#autocomplete").attr("data-filter-placeholder", resources.searchcourseplaceholder);
               $("#sectionsearchdiv input").attr("placeholder", resources.searchcourseplaceholder);
               $("#pagefooter").removeClass("ui-panel-animate").removeClass("ui-panel-page-content-position-left");
               $("#videomenubtnli").show();
               $("#audiomenubtnli").show();
               $("#plistmenubtnli").show();
               $(".moduleiconrhs").hide();
               $(".lessoniconrhs").hide();
               $("#lessonheaderdiv").hide();
               $("#theoryviewheader").html("");
               
               $("#footerleftbckbtn").removeClass("buttondisabled");
               
               if (activeUser.hasvideos == false) {
               $("#videomenubtnli").hide();
               }
               if (activeUser.hasaudio == false) {
               $("#audiomenubtnli").hide();
               $("#plistmenubtnli").hide();
               }
               if (prevPage !== "#helpdeskpage" && prevPage !== "#pdfviewpage" && prevPage !== "#podcastpage" && prevPage !== "#coursepodcastpage" && prevPage !== "#eclassvideopage" && prevPage !== "#userplaylistpage" && prevPage !== "#venuedetailpage" && prevPage !== "#supportpage") {
               $("#theorydatacontent").html("");
               $("#contentnavdiv").hide();
               $("#wscontentnavdiv").hide();
               
               }
               if (activeUser.savedPosition != undefined) {
               loadIds = {
               courseid: activeUser.savedPosition.courseid == undefined ? 0 : activeUser.savedPosition.courseid,
               modulegroupid: activeUser.savedPosition.modulegroupid == undefined ? 0 : activeUser.savedPosition.modulegroupid,
               moduleid: activeUser.savedPosition.moduleid == undefined ? 0 : activeUser.savedPosition.moduleid,
               sectionid: activeUser.savedPosition.sectionid == undefined ? 0 : activeUser.savedPosition.sectionid,
               assetid: activeUser.savedPosition.assetid == undefined ? 0 : activeUser.savedPosition.assetid,
               pageid: activeUser.savedPosition.pageid == undefined ? "" : activeUser.savedPosition.pageid,
               issuetab: activeUser.savedPosition.issuetab == undefined ? "" : activeUser.savedPosition.issuetab,
               issueid: activeUser.savedPosition.issueid == undefined ? "" : activeUser.savedPosition.issueid,
               nodekey: activeUser.savedPosition.nodekey == undefined ? "" : activeUser.savedPosition.nodekey
               };
               }
               if (activeUser.savedMediaPosition !== undefined) {
               mediaLoadIds = {
               tabname: activeUser.savedMediaPosition.tabname == undefined ? "" : activeUser.savedMediaPosition.tabname,
               tabid: activeUser.savedMediaPosition.tabid == undefined ? "" : activeUser.savedMediaPosition.tabid,
               categoryid: activeUser.savedMediaPosition.categoryid == undefined ? "" : activeUser.savedMediaPosition.categoryid,
               itemid: activeUser.savedMediaPosition.itemid == undefined ? "" : activeUser.savedMediaPosition.itemid
               };
               }
               $("#sectionsearchdiv input").off("vclick");
               $("#sectionsearchdiv input").on("vclick", function(event) {
                                               event.preventDefault();
                                               $("#sectionsearchdiv input").focus();
                                               if (device.platform === "Android") {
                                               showAndroidKeyboard();
                                               }
                                               });
               $("#sectionsearchdiv input").off("focus");
               $("#sectionsearchdiv input").on("focus", function(event) {
                                               searchFocus = true;
                                               event.preventDefault();
                                               
                                               });
               $("#sectionsearchdiv input").off("focusout");
               $("#sectionsearchdiv input").on("focusout", function(event) {
                                               searchFocus = false;
                                               hideKeyboard(event, false);
                                               });
               $("#searchsection").hide();
               $(".ulcourseslist").listview("refresh");
               destroyScrollers();
               setTimeout(function() {
                          menuScroller = new IScroll("#menucontentcoursescroller", {
                                                     fadeScrollbars: false,
                                                     useTransform: true,
                                                     useTransition: false,
                                                     bindToWrapper: true,
                                                     bounce: false
                                                     });
                          setTimeout(function() {
                                     menuScroller.refresh();
                                     }, 0);
                          menuGroupScroller = new IScroll("#menucontentgroupscroller", {
                                                          fadeScrollbars: false,
                                                          useTransform: true,
                                                          useTransition: false,
                                                          bindToWrapper: true,
                                                          bounce: false
                                                          });
                          setTimeout(function() {
                                     menuGroupScroller.refresh();
                                     
                                     }, 0);
                          
                          
                          scoMenuScroller = new IScroll("#menucontentsectionscroller", {
                                                        fadeScrollbars: false,
                                                        useTransform: true,
                                                        useTransition: false,
                                                        bindToWrapper: true,
                                                        bounce: false
                                                        });
                          setTimeout(function() {
                                     scoMenuScroller.refresh();
                                     
                                     }, 0);
                          }, 0);
               if (tablet === false) {
               setTimeout(function() {
                          rhsMenuScroller = new IScroll("#rhsmenuscrollbar", {
                                                        fadeScrollbars: false,
                                                        useTransform: true,
                                                        useTransition: false,
                                                        bindToWrapper: true,
                                                        bounce: false
                                                        });
                          }, 100);
               }
               $(".spinnerhtml").hide();
               $("#wsprevlink").off("vclick");
               $("#wsnextlink").off("vclick");
               $("#wsprevlink").on("vclick", function(event, ui) {
                                   event.preventDefault();
                                   if (wsok===true) {
                                   wsok = false;
                                   getWorksheetContent("prev");
                                   }
                                   });
               $("#wsnextlink").on("vclick", function(event, ui) {
                                   event.preventDefault();
                                   if (wsok===true) {
                                   wsok = false;
                                   getWorksheetContent("next");
                                   }
                                   });
               setTimeout(function() {
                          scheduleScroller = new IScroll("#bookingdetaildiv", {
                                                         fadeScrollbars: false,
                                                         useTransform: true,
                                                         useTransition: false,
                                                         bindToWrapper: true,
                                                         bounce: false
                                                         });
                          }, 100);
               $(".extramenupanel").off("panelopen");
               $(".extramenupanel").on("panelopen", function(event) {
                                       rhsMenuOpen = true;
                                       $("#theorydatacontent").addClass("rhsmenuopen");
                                       
                                       setPagePadderDiv("rhsMenuScroller", true);
                                       });
               $(".extramenupanel").off("panelclose");
               $(".extramenupanel").on("panelclose", function(event) {
                                       rhsMenuOpen = false;
                                       $(".settingsmenubtn").removeClass("ui-btn-active");
                                       $("#theorydatacontent").removeClass("rhsmenuopen");
                                       if($("#menucontentdiv div").hasClass("menuopen") || menuOpenName.length > 0){
                                       changeMenu(menuOpenName);
                                       }
                                       
                                       });
               $(".coursemenupanel").off("panelbeforeopen");
               $(".coursemenupanel").on("panelbeforeopen", function(event) {
                                        if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined) {
                                        audioTheoryPaused = true;
                                        audioTheoryPlayer.pause();
                                        }
                                        $("#pagefooter").removeClass("ui-panel-animate").removeClass("ui-panel-page-content-position-left");
                                        $("#footerleftbckbtn").removeClass("btnmenuclosed");
                                        $("#footerleftbckbtn").addClass("btnmenuopen");
                                        });
               $(".coursemenupanel").off("panelopen");
               $(".coursemenupanel").on("panelopen", function(event) {
                                        
                                        $("#audiotheoryplayerdiv").addClass("panelopen");
                                        $("#pagefooter").removeClass("ui-panel-animate").removeClass("ui-panel-page-content-position-left");
                                        if (menuScroller !== undefined && menuScroller !== null) {
                                        menuScroller.enable;
                                        setPagePadderDiv("menuScroller", false);
                                        setPagePadderDiv("scoMenuScroller", false);
                                        setPagePadderDiv("menuGroupScroller", false);
                                        if (activeModule !== undefined) {
                                        var modType = getModuleType(activeModule.basemoduletypeid);
                                        if (modType === "Certificate" || modType === "Book") {
                                        var id = "#module-" + activeModule.courseid + "-" + activeModule.basemoduleid;
                                        if ($(id) != undefined) {
                                        setTimeout(function() {
                                                   menuScroller.scrollToElement(id, 300);
                                                   hidePleaseWait();
                                                   }, 300);
                                        }
                                        }
                                        }
                                        }
                                        });
               $(".coursemenupanel").off("panelclose");
               $(".coursemenupanel").on("panelclose", function(event) {
                                        $("#footerleftbckbtn").removeClass("btnmenuopen");
                                        $("#footerleftbckbtn").addClass("btnmenuclosed");
                                        var coursesdiv = $("#menucontentcourse");
                                        var groupsdiv = $("#menucontentgroup");
                                        var scosdiv = $("#menucontentsection");
                                        $(groupsdiv).removeClass("menuopen").addClass("menuclosed");
                                        $(scosdiv).removeClass("menuopen").addClass("menuclosed");
                                        $(coursesdiv).removeClass("menuopen").addClass("menuclosed");
                                        
                                        $(groupsdiv).hide();
                                        $(scosdiv).hide();
                                        $(coursesdiv).hide();
                                        
                                        $("#audiotheoryplayerdiv").removeClass("panelopen");
                                        var showPreferences = configs.getCustom("CS_SHOW_PREFERENCES");
                                        if (showPreferences !== "1") {
                                        $("#preferencemenubtnli").hide();
                                        }
                                        if (device.platform === "Android") {
                                        $("input").off("focusout");
                                        $("input").on("focusout", function(event) {
                                                      hideKeyboard(event, false);
                                                      });
                                        $("textarea").off("focusout");
                                        $("textarea").on("focusout", function(event) {
                                                         hideKeyboard(event, false);
                                                         });
                                        }
                                        });
               
               
               
               
               setFooterMenuButtons();
               setHeaderMenuButtons();
               setRightHandMenuBtns();
               var zooming = (tablet === false) ? true : false;
               setTimeout(function() {
                          contentScroller = new IScroll("#coursepagecontentwrapper", {
                                                        fadeScrollbars: false,
                                                        useTransform: true,
                                                        useTransition: false,
                                                        bounce: false,
                                                        zoom: false
                                                        });
                          
                          
                          }, 100);
               setTimeout(function() {
                          zoomContentScroller = new IScroll("#zoomcontentwrapper", {
                                                            fadeScrollbars: false,
                                                            useTransform: true,
                                                            useTransition: false,
                                                            bounce: false,
                                                            scrollX: true,
                                                            scrollY: true,
                                                            zoom: zooming
                                                            });
                          
                          
                          }, 100);
               
               if (prevPage !== "#helpdeskpage" && prevPage !== "#pdfviewpage" && prevPage !== "#podcastpage"  && prevPage !== "#coursepodcastpage" && prevPage !== "#eclassvideopage" && prevPage !== "#userplaylistpage" && prevPage !== "#venuedetailpage" && prevPage !== "#supportpage") {
               $("#audiotheoryplayerdiv").hide();
               $("#theorydatacontent").html("");
               $("#contentnavdiv").hide();
               $("#wscontentnavdiv").hide();
               }
               
               
               if (prevPage === "#helpdeskpage" || prevPage === "#pdfviewpage" || prevPage === "#podcastpage" || prevPage === "#coursepodcastpage" ||  prevPage !== "#eclassvideopage"|| prevPage === "#userplaylistpage" || prevPage !== "#venuedetailpage" || prevPage !== "#supportpage") {
               if(menuOpenName!==undefined && menuOpenName.length > 0){
               menuOpenForce = true;
               }else{
               if (activeSection === undefined){
               triggerSection();
               }else if(activeSCO != undefined) {
               triggerSCO();
               }
               }
               }
               if (reloadPage === true && pageLoad === "#coursepage" && device.platform === "Android" && (prevPage === "#podcastpage" || prevPage === "#coursepodcastpage" || prevPage === "#eclassvideopage"|| prevPage === "#userplaylistpage" || prevPage === "#supportpage" || prevPage === "#venuedetailpage" || prevPage === "#helpdeskpage")) {
               $("#settingsmenubtn").trigger("vclick");
               setTimeout(function() {
                          $(".extramenupanel").panel("close");
                          setPagePadderDiv("contentScroller", true);
                          }, 300);
               }
               setTimeout(function() {
                          if (contentScroller != undefined) {
                          if ($("#bookingdetaildiv").is(":visible")) {
                          contentScroller.disable();
                          } else {
                          contentScroller.enable();
                          }
                          }
                          setPagePadderDiv("contentScroller", true);
                          }, 600);
               if (startupPageid !== "#coursepage" && loadCoursePage === true) {
               loadCoursePage = false;
               prevPage = "#coursepage";
               goToPage(startupPageid);
               setTimeout(function() {
                          supressWarningMsgs = false;
                          $("#pagefooter").removeClass("ui-panel-animate").removeClass("ui-panel-page-content-position-left");
                          }, 1200);
               }
               $("#pagefooter").removeClass("ui-panel-animate").removeClass("ui-panel-page-content-position-left");
               } catch (e) {
               errorHandler("coursepage.pagebeforeshow", e);
               }
               });
$("#coursepage").on("pageshow", function(event) {
                    try {
                    var modType="";
                    $("#pagefooter").removeClass("ui-panel-animate").removeClass("ui-panel-page-content-position-left");
                    if (startupPageid !== "#coursepage" && loadCoursePage === true) {
                    loadCoursePage = false;
                    prevPage = "#coursepage";
                    goToPage(startupPageid);
                    } else {
                    
                    if (prevPage === "#pdfviewpage") {
                    if (menuScroller !== undefined && menuScroller !== null) {
                    menuScroller.enable;
                    } else {
                    setTimeout(function() {
                               menuScroller = new IScroll("#menucontentcoursescroller", {
                                                          fadeScrollbars: false,
                                                          useTransform: true,
                                                          useTransition: false,
                                                          bindToWrapper: true,
                                                          bounce: false
                                                          });
                               }, 0);
                    }
                    }
                    
                    if (activeModule !== undefined) {
                    modType = getModuleType(activeModule.basemoduletypeid);
                    if (modType === "Book") {
                    if (activeModule.status == courseStatus.Completed) {
                    $("#theoryviewheader").html(resources.assessmentHead);
                    }else{
                    $("#theoryviewheader").html(resources.bookingHead);
                    }
                    }
                    }
                    }
                    if(menuOpenForce===true){
                    menuOpenForce = false;
                    $(".coursemenupanel").panel("open");
                    changeMenu(menuOpenName);
                    }
                    } catch (e) {
                    errorHandler("coursepage.pageshow", e);
                    }
                    });
$(document).on("pagecontainerhide", "#pdfviewpage", function() {
               $(this).remove();
               });
$(document).on("pagecreate", "#pdfviewpage", function(event) {
               try {
               $("#pdfviewpageheader").on("touchmove",function(e){e.preventDefault();});
               } catch (e) {
               errorHandler("pdfviewpage.pagecreate", e);
               }
               });
$(document).on("pagebeforeshow", "#pdfviewpage", function(event) {
               try {
               mediaInit=false;
               $("#pdfviewpageheader").on("touchmove",function(e){e.preventDefault();});
               audioTheoryPlayerLoaded = false;
               $("#pdfviewcontent").height($("#pdfviewpage").height());
               if (device.platform === "Android" && pixelx2 === true) {
               $("#pdfviewiframe").addClass("pixelx2");
               }
               $("#pdfcoursemenubtn").off("vclick");
               $("#pdfcoursemenubtn").on("vclick", function(event) {
                                         if (backButtonOK===true){
                                         backButtonOK=false;
                                         mediaInit=false;
                                         prevPage = "#pdfviewpage";
                                         pageLoad = "#coursepage";
                                         $.mobile.back();
                                         event.preventDefault();
                                         }
                                         setTimeout(function(){backButtonOK=true},600);
                                         });
               } catch (e) {
               errorHandler("pdfviewpage.pagebeforeshow", e);
               }
               });
$(document).on("pagecontainershow", "#pdfviewpage", function(event) {
               try {
               hidePleaseWait();
               } catch (e) {
               errorHandler("pdfviewpage.pageshow", e);
               }
               });
$(document).on("pagecontainerhide", "#errorpage", function() {
               $(this).remove();
               });
$(document).on("pagecreate", "#supportpage", function(event) {
               try {
               
               $(".ui-header").on("touchmove",function(e){e.preventDefault();});
               $(".ui-footer").on("touchmove",function(e){e.preventDefault();});
               
               var version = configs.getCustom("CS_VERSION_NO");
               $("#helpversiondiv").html(resourcessupport.helpversion + " : " + version);
               $("#supportviewheader").html(resourcessupport.supportviewheader);
               $("#statusmenutitle").html(resourcessupport.statusmenutitle);
               $("#coursemenutitle").html(resourcessupport.coursemenutitle);
               $("#supportmenutitle").html(resourcessupport.supportmenutitle);
               $("#mediamenutitle").html(resourcessupport.mediamenutitle);
               $("#troublemenutitle").html(resourcessupport.troublemenutitle);
               $("#supportmain-menu h3 img").attr("alt", resourcessupport.helptitleset0);
               $("#supportmain-settings h3 img").attr("alt", resourcessupport.helptitleset1);
               $("#supportmain-6 h3 img").attr("alt", resourcessupport.helptitleset2);
               $("#supportmain-7 h3 img").attr("alt", resourcessupport.helptitleset3);
               $("#supportmain-8 h3 img").attr("alt", resourcessupport.helptitleset4);
               $("#supportmain-9 h3 img").attr("alt", resourcessupport.helptitleset5);
               $("#supportmain-10 h3 img").attr("alt", resourcessupport.helptitleset6);
               $("#supportmain-11 h3 img").attr("alt", resourcessupport.helptitleset7);
               $("#supportmain-12 h3 img").attr("alt", resourcessupport.helptitleset8);
               $("#supportmain-13 h3 img").attr("alt", resourcessupport.helptitleset9);
               $("#supportmain-14 h3 img").attr("alt", resourcessupport.helptitleset10);
               $("#supportmain-15 h3 img").attr("alt", resourcessupport.helptitleset11);
               $("#supportmain-16 h3 img").attr("alt", resourcessupport.helptitleset11);
               $("#supportmain-17 h3 img").attr("alt", resourcessupport.helptitleset13);
               $("#supportmain-17a h3 img").attr("alt", resourcessupport.helptitleset13a);
               $("#supportmain-18 h3 img").attr("alt", resourcessupport.helptitleset14);
               $("#supportmain-19 h3 img").attr("alt", resourcessupport.helptitleset15);
               $("#supportmain-20 h3 img").attr("alt", resourcessupport.helptitleset16);
               $("#help1txt").html(resourcessupport.help1txt);
               $("#help1atxt").html(resourcessupport.help1atxt);
               $("#help1btxt").html(resourcessupport.help1btxt);
               $("#help2txt").html(resourcessupport.help2txt);
               $("#help3txt").html(resourcessupport.help3txt);
               $("#help4txt").html(resourcessupport.help4txt);
               $("#help5txt").html(resourcessupport.help5txt);
               $("#help6txt").html(resourcessupport.help6txt);
               $("#help7txt").html(resourcessupport.help7txt);
               $("#help8txt").html(resourcessupport.help8txt);
               $("#help9txt").html(resourcessupport.help9txt);
               $("#help10txt").html(resourcessupport.help10txt);
               $("#help11txt").html(resourcessupport.help11txt);
               $("#help12txt").html(resourcessupport.help12txt);
               $("#help13txt").html(resourcessupport.help13txt);
               $("#help14txt").html(resourcessupport.help14txt);
               $("#help15txt").html(resourcessupport.help15txt);
               $("#help16txt").html(resourcessupport.help16txt);
               $("#help17txt").html(resourcessupport.help17txt);
               $("#help18txt").html(resourcessupport.help18txt);
               $("#help19txt").html(resourcessupport.help19txt);
               $("#help20txt").html(resourcessupport.help20txt);
               $("#help21txt").html(resourcessupport.help21txt);
               $("#help23txt").html(resourcessupport.help23txt);
               $("#help24txt").html(resourcessupport.help24txt);
               $("#help25txt").html(resourcessupport.help25txt);
               $("#help26txt").html(resourcessupport.help26txt);
               $("#help27txt").html(resourcessupport.help27txt);
               $("#help28atxt").html(resourcessupport.help28atxt);
               $("#help28txt").html(resourcessupport.help28txt);
               $("#help29txt").html(resourcessupport.help29txt);
               $("#help30txt").html(resourcessupport.help30txt);
               $("#help31txt").html(resourcessupport.help31txt);
               $("#help31atxt").html(resourcessupport.help31atxt);
               $("#help32txt").html(resourcessupport.help32txt);
               $("#help34txt").html(resourcessupport.help34txt);
               $("#help35txt").html(resourcessupport.help35txt);
               $("#help36txt").html(resourcessupport.help36txt);
               $("#help37txt").html(resourcessupport.help37txt);
               $("#help38txt").html(resourcessupport.help38txt);
               $("#help39txt").html(resourcessupport.help39txt);
               $("#help40txt").html(resourcessupport.help40txt);
               $("#help41txt").html(resourcessupport.help41txt);
               $("#help42txt").html(resourcessupport.help42txt);
               $("#help43txt").html(resourcessupport.help43txt);
               $("#help44txt").html(resourcessupport.help44txt);
               $("#help45txt").html(resourcessupport.help45txt);
               $("#help46txt").html(resourcessupport.help46txt);
               $("#help47txt").html(resourcessupport.help47txt);
               $("#help48txt").html(resourcessupport.help48txt);
               $("#help49txt").html(resourcessupport.help49txt);
               $("#help50txt").html(resourcessupport.help50txt);
               $("#help51txt").html(resourcessupport.help51txt);
               $("#help52txt").html(resourcessupport.help52txt);
               $("#help53txt").html(resourcessupport.help53txt);
               $("#help54txt").html(resourcessupport.help54txt);
               $("#help55txt").html(resourcessupport.help55txt);
               $("#help56txt").html(resourcessupport.help56txt);
               $("#help57txt").html(resourcessupport.help57txt);
               $("#help58txt").html(resourcessupport.help58txt);
               $("#help59txt").html(resourcessupport.help59txt);
               $("#help60txt").html(resourcessupport.help60txt);
               $("#help61txt").html(resourcessupport.help61txt);
               $("#help62txt").html(resourcessupport.help62txt);
               $("#help63txt").html(resourcessupport.help63txt);
               $("#help64txt").html(resourcessupport.help64txt);
               $("#help65txt").html(resourcessupport.help65txt);
               $("#help66txt").html(resourcessupport.help66txt);
               $("#help67txt").html(resourcessupport.help67txt);
               $("#help68txt").html(resourcessupport.help68txt);
               $("#help69txt").html(resourcessupport.help69txt);
               $("#help70txt").html(resourcessupport.help70txt);
               $("#help71txt").html(resourcessupport.help71txt);
               $("#help72txt").html(resourcessupport.help72txt);
               $("#help73txt").html(resourcessupport.help73txt);
               $("#help74txt").html(resourcessupport.help74txt);
               $("#help75txt").html(resourcessupport.help75txt);
               $("#help76txt").html(resourcessupport.help76txt);
               $("#helptitleset0").html(resourcessupport.helptitleset0);
               $("#helptitleset1").html(resourcessupport.helptitleset1);
               $("#helptitleset2").html(resourcessupport.helptitleset2);
               $("#helptitleset3").html(resourcessupport.helptitleset3);
               $("#helptitleset4").html(resourcessupport.helptitleset4);
               $("#helptitleset5").html(resourcessupport.helptitleset5);
               $("#helptitleset6").html(resourcessupport.helptitleset6);
               $("#helptitleset7").html(resourcessupport.helptitleset7);
               $("#helptitleset8").html(resourcessupport.helptitleset8);
               $("#helptitleset9").html(resourcessupport.helptitleset9);
               $("#helptitleset10").html(resourcessupport.helptitleset10);
               $("#helptitleset11").html(resourcessupport.helptitleset11);
               $("#helptitleset12").html(resourcessupport.helptitleset11);
               $("#helptitleset13").html(resourcessupport.helptitleset13);
               $("#helptitleset13a").html(resourcessupport.helptitleset13a);
               $("#helptitleset14").html(resourcessupport.helptitleset14);
               $("#helptitleset15").html(resourcessupport.helptitleset15);
               $("#helptitleset16").html(resourcessupport.helptitleset16);
               if (tablet === false) {
               $(".ui-page").addClass("etpmobile");
               $(".ui-content").addClass("etpmobile");
               $(".ui-panel").addClass("etpmobile");
               $("#supportpage").addClass("etpmobile");
               }
               if(iphone5===true){
               $("#supportpage").addClass("iphone5");
               }
               
               setPagePadderDiv("supportScroller", false);
               } catch (e) {
               errorHandler("supportpage.pagecreate", e);
               }
               });
$(document).on("pagebeforeshow", "#supportpage", function(event) {
               try {
               audioTheoryPlayerLoaded = false;
               loadCoursePage = false;
               pageLoad = "#supportpage";
               setPagePadderDiv("supportScroller", false);
               var zooming = (tablet === false) ? true : false;
               setTimeout(function() {
                          supportScroller = new IScroll("#supportmaincontentwrapper", {
                                                        fadeScrollbars: false,
                                                        useTransform: true,
                                                        useTransition: false,
                                                        bindToWrapper: true,
                                                        bounce: false
                                                        });
                          }, 100);
               var supportEmail = configs.getCustom("CS_SUPPORT_EMAIL");
               
               $("#supclosebtn").off("vclick");
               $("#supclosebtn").on("vclick", function(event) {
                                    event.preventDefault();
                                    $("#supportfooterbckbtn").trigger("vclick");
                                    });
               
               $("#supportfooterbckbtn").off("vclick");
               $("#supportfooterbckbtn").on("vclick", function(event) {
                                            event.preventDefault();
                                            
                                            pageLoad = prevPage;
                                            prevPage = "#supportpage";
                                            hideKeyboard(event, false);
                                            loadCoursePage = false;
                                            if (pageLoad === undefined || pageLoad.length === 0) {
                                            pageLoad = "#coursepage";
                                            }
                                            setUserPosition(false, pageLoad, false);
                                            if (device.platform === "Android") {
                                            history.back();
                                            } else {
                                            $.mobile.back();
                                            }
                                            });
               
               $("#troublerefreshbtn").off("vclick");
               $("#troublerefreshbtn").on("vclick", function(event) {
                                          event.preventDefault();
                                          prevPage = "#supportpage";
                                          mediaSetRefresh();
                                          prevPage = "#supportpage";
                                          showPleaseWait();
                                          
                                          if (device.platform === "Android") {
                                          //  Download check....reloadPage = true;
                                          history.back();
                                          checkASDUserPodState(true, function(ret) {});
                                          } else {
                                          $.mobile.back();
                                          checkASDUserPodState(true, function(ret) {});
                                          }
                                          });
               $("#troublemailbtn").off("vclick");
               $("#troublemailbtn").on("vclick", function(event) {
                                       event.preventDefault();
                                       var supportEmail = configs.getCustom("CS_SUPPORT_EMAIL");
                                       window.location.href = "mailto:" + supportEmail;
                                       });
               $(".supportmain").off("vclick");
               $(".supportmainmain").off("vclick");
                $(".supportmainmain").on("vclick", function(event) {

                   var evntid = $(event.currentTarget).attr("id");
                   if (supportParentOK === true) {
                       $(".supportmainmain").children('div.ui-collapsible-content').slideUp(300);
                   supportParentOK = false;
                   event.preventDefault();
                   var current = $(this).closest(".ui-collapsible");
                   if ($("#" + evntid).hasClass("ui-collapsible-collapsed")) {
                       $(".ui-collapsible").not(".ui-collapsible-collapsed").find("ui-collapsible-heading-toggle").click();
                       $(".ui-collapsible-content", current).slideDown(300);

                        $("#" + evntid).collapsible("expand");
                   } else {
                       $(".ui-collapsible-content", current).slideUp(300);
                       setTimeout(function() {
                          $("#" + evntid).collapsible("collapse");
                      }, 300);
                        //$("#" + evntid).collapsible("collapse");
                   }
                   setPagePadderDiv("supportScroller", false);
                   }
                   setTimeout(function() {
                              supportParentOK = true;
                              }, 300);
                });
               /*$(".supportmainmain").on("vclick", function(event) {
                                        var evntid = $(event.currentTarget).attr("id");
                                        if (supportParentOK === true) {
                                        supportParentOK = false;
                                        event.preventDefault();
                                        if ($("#" + evntid).hasClass("ui-collapsible-collapsed")) {
                                        $("#" + evntid).collapsible("expand");
                                        } else {
                                        $("#" + evntid).collapsible("collapse");
                                        }
                                        setPagePadderDiv("supportScroller", false);
                                        }
                                        setTimeout(function() {
                                                   supportParentOK = true;
                                                   }, 300);
                                        });*/
               $(".supportmain").on("vclick", function(event) {
                                    try {
                                    event.preventDefault();
                                    if (supportParentOK === true) {
                                    supportParentOK = false;
                                    var id = $(event.currentTarget).attr("id");
                                    if ($("#" + id).hasClass("ui-collapsible-collapsed")) {
                                    $("#" + id).collapsible("expand");
                                    } else {
                                    $("#" + id).collapsible("collapse");
                                    }
                                    setPagePadderDiv("supportScroller", false);
                                    }
                                    setTimeout(function() {
                                               supportParentOK = true;
                                               }, 300);
                                    } catch (e) {
                                    errorHandler("supportmain vclick", e);
                                    }
                                    });
               setPagePadderDiv("supportScroller", false);
               if (activeUser.savedPosition != undefined) {
               loadIds = {
               courseid: activeUser.savedPosition.courseid == undefined ? 0 : activeUser.savedPosition.courseid,
               modulegroupid: activeUser.savedPosition.modulegroupid == undefined ? 0 : activeUser.savedPosition.modulegroupid,
               moduleid: activeUser.savedPosition.moduleid == undefined ? 0 : activeUser.savedPosition.moduleid,
               sectionid: activeUser.savedPosition.sectionid == undefined ? 0 : activeUser.savedPosition.sectionid,
               assetid: activeUser.savedPosition.assetid == undefined ? 0 : activeUser.savedPosition.assetid,
               pageid: activeUser.savedPosition.pageid == undefined ? "" : activeUser.savedPosition.pageid,
               issuetab: activeUser.savedPosition.issuetab == undefined ? "" : activeUser.savedPosition.issuetab,
               issueid: activeUser.savedPosition.issueid == undefined ? "" : activeUser.savedPosition.issueid,
               nodekey: activeUser.savedPosition.nodekey == undefined ? "" : activeUser.savedPosition.nodekey
               };
               }
               if (activeUser.savedMediaPosition !== undefined && activeUser.savedMediaPosition.tabname !== undefined && activeUser.savedMediaPosition.tabname > 0) {
               mediaLoadIds = {
               tabname: activeUser.savedMediaPosition.tabname == undefined ? "" : activeUser.savedMediaPosition.tabname,
               tabid: activeUser.savedMediaPosition.tabid == undefined ? "" : activeUser.savedMediaPosition.tabid,
               categoryid: activeUser.savedMediaPosition.categoryid == undefined ? "" : activeUser.savedMediaPosition.categoryid,
               itemid: activeUser.savedMediaPosition.itemid == undefined ? "" : activeUser.savedMediaPosition.itemid
               };
               }
               setUserPosition(false, "#supportpage", false);
               setTimeout(function() {
                          setPagePadderDiv("supportScroller", false);
                          }, 600);
               } catch (e) {
               errorHandler("supportpage.pagebeforeshow", e);
               }
               });
$(document).on("pagecontainerhide", "#venuedetailpage", function() {
               $(this).remove();
               });
$(document).on("pagecreate", "#venuedetailpage", function(event) {
               try {
               
               $(".ui-header").on("touchmove",function(e){e.preventDefault();});
               $(".ui-footer").on("touchmove",function(e){e.preventDefault();});
               
               $("#venueviewheader").html(resources.venuedetailh1);
               if (iphone5 === true) {
               $("#bookingpopupcontent").addClass("iphone5");
               $("#mapdiv").addClass("iphone5");
               }
               if (navigator.geolocation!=undefined && retryPositioning === true) {
               navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, {
                                                        enableHighAccuracy: true,
                                                        timeout: 30000,
                                                        maximumAge: 30000
                                                        });
               }
               if (tablet === false) {
               $(".ui-page").addClass("etpmobile");
               $(".ui-content").addClass("etpmobile");
               $(".ui-panel").addClass("etpmobile");
               $("#venuedetailpage").addClass("etpmobile");
               }
               var zooming = (tablet === false) ? true : false;
               setTimeout(function() {
                          mapScroller = new IScroll("#bookingpopupcontent", {
                                                    fadeScrollbars: false,
                                                    useTransform: true,
                                                    useTransition: false,
                                                    bindToWrapper: true,
                                                    bounce: false
                                                    });
                          }, 300);
               setTimeout(function() {
                          setPagePadderDiv("mapScroller", false);
                          }, 1200);
               } catch (e) {
               errorHandler("venudetailpage.pagecreate", e);
               }
               });
$(document).on("pagebeforeshow", "#venuedetailpage", function(event) {
               try {
               audioTheoryPlayerLoaded = false;
               pageLoad = "#venudetailpage";
               setTimeout(function() {
                          mapScroller = new IScroll("#bookingpopupcontent", {
                                                    fadeScrollbars: false,
                                                    useTransform: true,
                                                    useTransition: false,
                                                    bindToWrapper: true,
                                                    bounce: false
                                                    });
                          }, 300);
               var schedule = activeModule.getAssessmentScheduleById(venueAssessmentScheduleId);
               var detailStr = "There are no details currently available.";
               if (schedule != null) {
               detailStr = schedule.getScheduleDetails();
               }
               var location = schedule.venuename;
               $("#mapdiv").empty();
               if (isDeviceOnline() === false) {
               $("#mapdiv").hide();
               $(".directionsbtndiv").hide();
               } else {
               $("#mapdiv").show();
               $("#mapdiv").html(mapDiv);
               $(".directionsbtndiv").show();
               }
               
               
               $("#venuefooterbckbtn").off("vclick");
               $("#venuefooterbckbtn").on("vclick", function(event) {
                                          event.preventDefault();
                                          if(backButtonOK===true){
                                          backButtonOK=false;
                                          prevPage = "#venuedetailpage";
                                          pageLoad = "#coursepage";
                                          if (device.platform === "Android") {
                                          $("#extramenupanel").panel("close");
                                          history.back();
                                          } else {
                                          //$.mobile.navigate("#coursepage");
                                          $.mobile.back();
                                          }
                                          setTimeout(function() {
                                                     $("#theoryviewheader").html(resources.bookingHead);
                                                     $("#theoryviewheader").addClass("noicon");
                                                     }, 600);
                                          setPagePadderDiv("mapScroller", false);
                                          setTimeout(function(){backButtonOK=true},600);
                                          }
                                          });
               
               $("#venueclosebtn").off("vclick");
               $("#venueclosebtn").on("vclick", function(event) {
                                      if(menubtnOk===true){
                                      $("#venuefooterbckbtn").trigger("vclick");
                                      setTimeout(function(){menubtnOk=true;},300);
                                      }
                                      
                                      });
               if (retinaDisplay === true) {
               $("#venuedetailpage").addClass("retina");
               }
               setPagePadderDiv("mapScroller", false);
               var address = schedule.address;
               if (isDeviceOnline() === true && googleAvailable === true && setGoogleJSOK === true) {
               getLatLong(schedule, address, function(latLng) {
                          var style = (tablet === true) ? google.maps.ZoomControlStyle.LARGE : google.maps.ZoomControlStyle.SMALL;
                          currentLatlng = latLng;
                          $("#map_canvas").gmap({
                                                center: currentLatlng,
                                                zoom: 14,
                                                disableDefaultUI: false,
                                                zoomControl: true,
                                                zoomControlOptions: {
                                                style: style
                                                },
                                                scaleControl: true,
                                                callback: function() {
                                                self = this;
                                                self.addMarker({
                                                               position: currentLatlng,
                                                               bounds: false
                                                               }).click(function() {
                                                                        self.openInfoWindow({
                                                                                            content: "<div class='mapmarkertitle'>" + schedule.venuename + "</div>"
                                                                                            }, this);
                                                                        });
                                                setTimeout(function() {
                                                           self.refresh();
                                                           }, 300);
                                                $("#mapsubmit").off("vclick");
                                                $("#mapsubmit").on("vclick", function(event) {
                                                                   try {
                                     directions.navigateTo(currentLatlng);
                                   } catch (e) {}
                                                                   });
                                                }
                                                });
                          });
               } else {
               $("#mapdiv").hide();
               $(".directionsbtndiv").hide();
               }
               $("#bookcontentdetail").html(detailStr);
               setPagePadderDiv("mapScroller", false);
               
               } catch (e) {
               errorHandler("venuedetailpage.pagebeforeshow", e);
               }
               });

function onCurrentLocationError() {}

function openDefaultWebsite(url) {
    try {
        if (url === "") {
            if (iosDevice===true && configs.getCustom("CS_SITE_VIEW") === "external") {
                window.open(url);
            } else {
                openWebView(configs.getCustom("CS_SITE_URL"));
            }
        } else {
            if (url === "FB") {
                openWebView(configs.getCustom("CS_FACEBOOK_URL"));
            } else {
                if (url === "Twitter") {
                    openWebView(configs.getCustom("CS_TWITTER_URL"));
                } else {
                    openWebView(url);
                }
            }
        }
    } catch (e) {
        errorHandler("openDefaultWebsite", e);
    }
}

function onCloseBrowser() {
    $(".pdfspinnerdiv").remove();
    iabRef.removeEventListener("exit", onCloseBrowser);
    if (StatusBar !== undefined) {
        setTimeout(function() {
                   StatusBar.hide();
                   }, 300);
    }
}

function onOpenExternal() {}

function androidPDFView(url) {
    try {
        $(".pdfspinnerdiv").remove();
        localStorage.setItem("pdfjsfilename", url);
        hidePleaseWait();
        if (StatusBar !== undefined) {
            setTimeout(function() {
                       StatusBar.hide();
                       }, 300);
        }
        goToPage("#pdfviewpage");
    } catch (e) {
        errorHandler("androidPDFView", e);
    }
}

function openWebView(url) {
    try {
        hidePleaseWait();
        if (device.platform === "Android") {
            iabRef = cordova.InAppBrowser.open(encodeURI(url), '_blank', 'location=no,resizable=yes,scrollbars=yes,status=yes');
            //iabRef = window.open(encodeURI(url), "_blank", "location=no,resizable=yes,scrollbars=yes,status=yes");
            iabRef.addEventListener("loadstart", function() {});
            iabRef.addEventListener("exit", androidClosed);
            $(".pdfspinnerdiv").remove();
        } else {
            iabRef = window.open(encodeURI(url), "_blank", "location=no,resizable=yes,scrollbars=yes,status=yes");
            iabRef.addEventListener("exit", onCloseBrowser);
            setTimeout(function() {
                       $(".pdfspinnerdiv").remove();
                       }, 300);
        }
    } catch (e) {
        errorHandler("openWebView", e);
    }
}

function androidlocationChanged(newurl) {}

function androidClosed() {
    $(".pdfspinnerdiv").remove();
    iabRef.removeEventListener("loadstop", androidlocationChanged);
    iabRef.removeEventListener("exit", androidClosed);
    if (StatusBar !== undefined) {
        setTimeout(function() {
                   StatusBar.hide();
                   }, 300);
    }
    hidePleaseWait();
}

function checkLogin(page) {
    try {
        return coController.coCheckLoginAllows(page);
    } catch (e) {
        errorHandler("checkLogin", e);
    }
}

function showLoginPage() {
    try {

        if (activeUser.requireslogin === true) {
          //alert("if");
            loginpopupOpen();
        } else {
          //alert("else");
            loginUser();
        }
        hidePleaseWait();
    } catch (e) {
        errorHandler("showLoginPage", e);
    }
}

function checkPasswordChange(event) {
    try {
        event.preventDefault();
        event.stopPropagation();
        var pwd = $("#site-password").val();
        var pwdHash = pwd;
        if (pwdHash != activeUser.pwdHash) {
            activeUser.pwdHash = pwdHash;
        }
    } catch (e) {
        errorHandler("checkPasswordChange", e);
    }
}
var rememberUser = true;

function loginUser() {
    try {
        
        loadFirstSave = true;
        showPleaseWait();
        var err = "";
        var pwd = $("#login-password").val();
        var username = $("#login-username").val();
        var pwdHash = "";
        var rememember = true;
        var siteUrl = configs.getCustom("CS_SITE_URL");
        if (username === undefined || username.length === 0) {
            $(".loginfieldsusername").addClass("missing");
            err = resources.missingUsername;
        } else {
            $(".loginfieldsusername").removeClass("missing");
        }
        if (pwd === undefined || pwd.length === 0) {
            $(".loginfieldspassword").addClass("missing");
            err = err.length === 0 ? resources.missingPassword : err;
        } else {
            $(".loginfieldspassword").removeClass("missing");
        }
        if (err.length > 0) {
            msgTitle = resources.requiredFields;
            msgBtnValue = resources.btnOk;
            navigator.notification.confirm(err, function() {
                                           hidePleaseWait();
                                           }, msgTitle, msgBtnValue);
        } else {
            pwdHash = pwd;
            activeUser.username = username;
            activeUser.pwdHash = pwdHash;
            activeUser.rememberPassword = rememberUser;
            courseListContent = "";
            loadFirstSave = true;
            coController.coCheckNetworkAvaliable(false, function(ret) {
                                                 if (ret === false || deviceIsOnline === false) {
                                                 msgStr = resources.connectLogin;
                                                 msgTitle = resources.connError;
                                                 msgBtnValue = resources.btnOk;
                                                 navigator.notification.confirm(msgStr, function() {
                                                                                hidePleaseWait();
                                                                                loginpopupOpen();
                                                                                }, msgTitle, msgBtnValue);
                                                 } else {
                                                 if (activeUser.username != undefined && activeUser.username.length > 0) {
                                                 coController.coFirstTimeLogin(true, loginCallback);
                                                 } else {
                                                 hidePleaseWait();
                                                 loginpopupOpen();
                                                 }
                                                 }
                                                 });
        }
    } catch (e) {
        errorHandler("loginUser", e);
    }
    hidePleaseWait();
}
//mayauser = "";
function loginCallback(ret) {
  //alert(ret);
    try {
        loadFirstSave = true;
        msgTitle = resources.loginError;
        msgBtnValue = resources.btnOk;
    //navigator.notification.alert(ret);
        if (ret == undefined) {
            msgStr = resources.loginFail;
            navigator.notification.confirm(msgStr, function() {
                                           hidePleaseWait();
                                           loginpopupOpen();
                                           }, msgTitle, msgBtnValue);
        } else {
            if (ret == 0) {
              //alert("0");
                msgStr = resources.loginDetailFail;
                navigator.notification.confirm(msgStr, function() {
                                               hidePleaseWait();
                                               loginpopupOpen();
                                               }, msgTitle, msgBtnValue);
            } else {
                if (ret == -1) {
                    msgStr = resources.loginFail;
                    navigator.notification.confirm(msgStr, function() {
                                                   hidePleaseWait();
                                                   loginpopupOpen();
                                                   }, msgTitle, msgBtnValue);
                } else
          {
            
             if (ret == -3) {   
                        var id = mayaval.UserId;
                        activeUser.userId = id;
            msgStr = resources.askotherlogout;
                        navigator.notification.confirm(msgStr, OtherLogout, resources.devicelimitexceeded, [resources.logoutyes,resources.logoutno]);
                    
                } 
            
          else{ 
            
            
            
                    if (ret == -2) {
                        hidePleaseWait();
                        loginpopupOpen();
                    } else {
                        localStorage.setItem("ETP_LOGGEDOUTUSER", false);
                        var authObj = ret;
                        var id = authObj.UserId;
                        
                        activeUser.requireslogin = false;
                        activeUser.userId = id;
                        portalsList = authObj.Portals;
                        activeUser.rememberPassword = rememberUser;
                        
                        
                        users.save(activeUser);
                        if (fileMainDir != undefined) {
                            getUserRootDir(function(ret) {});
                        }else{
                            if (device.platform === "iOS") {
                                window.requestFileSystem(3, 0, onFSSuccess, onError);
                                window.requestFileSystem(3, 0, onFSDocSuccess, onError);
                            } else {
                                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, onError);
                                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSDocSuccess, onError);
                            }
                            if (fileMainDir != undefined) {
                                getUserRootDir(function(ret) {});
                            }
                        }
                        activeUser.getUserDatabaseList();
                        var portalName = "";
                        if (portalsList == undefined || portalsList.length == 0) {
                            msgStr = resources.portalError;
                            msgTitle = resources.loginError;
                            msgBtnValue = resources.btnOk;
                            navigator.notification.confirm(msgStr, function() {
                                                           hidePleaseWait();
                                                           }, msgTitle, msgBtnValue);
                        } else {
                            if (portalsList.length == undefined) {
                                portalName = portalsList.Name;
                                portalId = portalsList.PortalId;
                                eClassLibraryID = portalsList.EClassLibraryId;
                                videoLibraryID = portalsList.VideoLibraryId;
                                
                                if(userPortalId!==portalId){
                                    userPortalId = portalId;
                                    localStorage.setItem("ETP_USERPORTALID", userPortalId);
                                    localStorage.setItem("ETP_ECLASSLIBRARYID", eClassLibraryID);
                                    localStorage.setItem("ETP_VIDEOLIBRARYID", videoLibraryID);
                                }
                            } else {
                                if (portalsList.length > 1) {
                                    portalSelectPopupOpen(portalsList);
                                } else {
                                    if (portalsList.length == 1) {
                                        var portal = portalsList[0];
                                        portalName = portal.Name;
                                        portalId = portal.PortalId;
                                        eClassLibraryID = portalsList.EClassLibraryId;
                                        videoLibraryID = portalsList.VideoLibraryId;
                                        
                                        if(userPortalId!=portalId){
                                            userPortalId = portalId;
                                            localStorage.setItem("ETP_USERPORTALID", userPortalId);
                                            localStorage.setItem("ETP_ECLASSLIBRARYID", eClassLibraryID);
                                            localStorage.setItem("ETP_VIDEOLIBRARYID", videoLibraryID);
                                        }
                                        setPortalLogin(portalId);
                                    } else {
                                        msgStr = resources.loginFail;
                                        navigator.notification.confirm(msgStr, function() {
                                                                       hidePleaseWait();
                                                                       loginpopupOpen();
                                                                       }, msgTitle, msgBtnValue);
                                    }
                                }
                            }
                        }
                    }
                }
          
            }
      }
        }
    } catch (e) {
        errorHandler("loginCallback", e);
    }
}


function OtherLogout(mbutton)
{
    if(mbutton==1)
    {
  if (deviceIsOnline === false)
  {
     msgStr = resources.connectLogout;
     msgTitle = resources.connError;
     msgBtnValue = resources.btnOk;
    navigator.notification.confirm(msgStr, function() {console.log("device offline")
                                                          }, msgTitle, msgBtnValue);
  }
  
  
  
  else
  {
    var urlMethod = getBaseUrl();
    urlMethod += configs.getCustom("CS_SITE_URL_LOGOUTOTHERDEVICE");
     var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey);
            urlMethod += params;
      //navigator.notification.alert("Failed: " + urlMethod);
       $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: loginUser,
                   error: confirmcall
                   });
      
  }
  

    }

}

function confirmcall()
{
  console.log("Call confirmed");
}

function confirmsuccesscall()
{
  console.log("Call success confirmed ankur");
}


function setPortal() {
    try {
        userPortalId = parseInt($("input[name=radio-choice-portal]:checked").val(), 10);
        if (userPortalId !== undefined && userPortalId > 0) {
            portalId = userPortalId;
        } else {
            userPortalId = portalId;
        }
        localStorage.setItem("ETP_USERPORTALID", userPortalId);
        setPortalLogin(portalId);
    } catch (e) {
        errorHandler("setPortal", e);
    }
}

function portalSelectPopupOpen(portals) {
    try {
        hidePleaseWait();
        $("#portalselecthead").html(resources.portalselecthead);
        $("#portalselectbtn").html(resources.nextlink);
        if (retinaDisplay === true && pixelx3 === true) {
            $("#portalselectpopup").addClass("retinamainlogin");
        }
        var optionStr = '<legend id="portallegend">' + resources.portalselectinfo + "</legend>";
        for (i = 0; i < portals.length; i++) {
            var portal = portals[i];
            var id = portal.PortalId;
            var labelStr = '<label id="';
            var labelId = "portal" + i + "label";
            labelStr += labelId;
            labelStr += '" class="understandlabel"><input type="radio" name="radio-choice-portal" id="';
            labelId = "portalpref" + i;
            labelStr += labelId + '" class="preferenceinitial" value="' + portal.PortalId + '" data-theme="h"/><span id="portal';
            labelStr += i + 'labeltxt" class="portalselectname">' + portal.Name + "</span></label>";
            optionStr += labelStr;
        }
        $("#fieldsetportals").html(optionStr);
        $("#fieldsetportals").trigger("create");
        $("#fieldsetportals").trigger("refresh");
        $("#popupcontainerinner").css("transform", "translateX(-50%)");
        $("#portalpref0").prop("checked", "checked");
        $("[name=radio-choice-portal]").checkboxradio("refresh");
        $("input[name=radio-choice-portal]").off("click");
        $("input[name=radio-choice-portal]").on("click", function(event, ui) {
                                                $("input[name=radio-choice-portal]").checkboxradio("refresh");
                                                $("#fieldsetportals label").removeClass("ui-btn-hover-h").removeClass("ui-btn-down-h");
                                                });
        $("#portalselectbtn").off("vclick");
        $("#portalselectbtn").on("vclick", function(event) {
                                 event.preventDefault();
                                 hideKeyboard(event, false);
                                 setPortal();
                                 });
    } catch (e) {
        errorHandler("portalSelectPopupOpen", e);
    }
}

function setPortalLogin(portalId) {
    try {
        var portal;
        var i = 0;
        for (i = 0; i < portalsList.length; i++) {
            var p = portalsList[i];
            if (p.PortalId === portalId) {
                portal = p;
                eClassLibraryID = portal.EClassLibraryId;
                videoLibraryID = portal.VideoLibraryId;
                localStorage.setItem("ETP_ECLASSLIBRARYID", eClassLibraryID);
                localStorage.setItem("ETP_VIDEOLIBRARYID", videoLibraryID);
                break;
            }
        }
        activeUser.hascourses = portal.HasCourses;
        userHasCourses = activeUser.hascourses;
        activeUser.hasvideos = portal.HasVideos;
        activeUser.hasaudio = portal.HasAudio;
        users.save(activeUser);
        activeUser.setHelpdeskCategories(portal.HelpdeskCategories, function() {});
        var hasVideos = activeUser.hasvideos;
        var hasCourses = activeUser.hascourses;
        var hasAudio = activeUser.hasaudio;
        var languageChoices = configs.getCustom("CS_APP_LANGUAGE");
        var languages;
        if (languageChoices !== undefined) {
            languages = JSON.parse(languageChoices);
        }
        if (portalId === undefined || portalId === 0) {
            msgStr = resources.portalAccessError;
            msgTitle = resources.loginError;
            msgBtnValue = resources.btnOk;
            navigator.notification.confirm(msgStr, function() {
                                           hidePleaseWait();
                                           loginpopupOpen();
                                           }, msgTitle, msgBtnValue);
        } else {
            var showPreferences = configs.getCustom("CS_SHOW_PREFERENCES");
            appLanguageId = "en";
            if (languages !== undefined && languages.length > 0) {
                for (i = 0; i < languages.length; i++) {
                    var lang = languages[i];
                    if (lang.value === portalId) {
                        appLanguageId = lang.language;
                        break;
                    }
                }
            }
            if (appLanguageId !== userLanguage) {
                setResourcesScriptFile(true, function(retVal) {
                                       userLanguage = appLanguageId;
                                       setPortalLoginValues(userPortalId, hasCourses, hasVideos, hasAudio, showPreferences);
                                       });
            } else {
                setPortalLoginValues(userPortalId, hasCourses, hasVideos, hasAudio, showPreferences);
            }
        }
    } catch (e) {
        errorHandler("setPortalLogin", e);
    }
}

function setPortalLoginValues(portalId, hasCourses, hasVideos, hasAudio, showPreferences) {
    try {
        var choices = 3;
        if (hasCourses === false) {
            choices -= 1;
        }
        if (hasVideos === false) {
            choices -= 1;
        }
        if (hasAudio === false) {
            choices -= 1;
        }
        
        if (hasCourses === true) {
            activeUser.startuppage = "course";
            users.save(activeUser);
            checkASDUserPodState(false, function() {
                                 if (changeUser===true) {
                                 refreshMenu("refresh");
                                 }
                                 goToPage("#coursepage");
                                 if (changeUser===true) {
                                 changeUser = false;
                                 }
                                 });
        } else {
            if (hasVideos === true) {
                activeUser.startuppage = "video";
                users.save(activeUser);
                startupPageid = "#podcastpage";
                goToPage("#podcastpage");
            } else {
                if (hasAudio === true) {
                    activeUser.startuppage = "audio";
                    users.save(activeUser);
                    goToPage("#podcastpage");
                    startupPageid = "#podcastpage";
                } else {
                    msgStr = resources.enrolledCourses;
                    msgTitle = resources.loginError;
                    msgBtnValue = resources.btnOk;
                    navigator.notification.confirm(msgStr, function() {
                                                   activeUser.requireslogin = true;
                                                   portalId = configs.getCustom("CS_PORTAL_ID");
                                                   if (userPortalId > 0 && userPortalId !== portalId) {
                                                   portalId = userPortalId;
                                                   }
                                                   hidePleaseWait();
                                                   showLoginPage();
                                                   }, msgTitle, msgBtnValue);
                }
            }
        }
    } catch (e) {
        errorHandler("setPortalLoginValues", e);
    }
}

function refreshMenu(menuitem) {
    try {
        if (activeUser.username === undefined || activeUser.username === "") {
            return;
        }
        var menuToOpen = "courses";
        if(menuOpenName!==undefined && menuOpenName.length > 0){
            menuToOpen=menuOpenName;
        }
        if (menuitem === "refresh") {
            courseListContent = "";
            loadFirstSave = true;
            $("#theoryviewheader").html(resources.theoryView);
            $("#theoryviewheader").removeClass("noicon");
            $("#theorydatacontent").hide();
            changeMenu(menuToOpen);
            hidePleaseWait();
            if (mediaRefreshing === false) {}
            hidePleaseWait();
        } else {
            if (menuitem === "refreshonly") {
                courseListContent = "";
                loadFirstSave = false;
                $("#theoryviewheader").html(resources.theoryView);
                $("#theoryviewheader").removeClass("noicon");
                changeMenu(menuToOpen);
                hidePleaseWait();
            }
        }
        populateCourses(false);
        hidePleaseWait();
    } catch (e) {
        errorHandler("refreshMenu", e);
    }
}

/*function changeMenu(menu) {
    try {
        //alert(menu);
        // Set the effect type
        var effect = 'slide';
        var directionSlideRight= "right";
        var directionSlideLeft= "left";
        // Set the options for the effect type chosen
        var optionsLeft = { direction: directionSlideLeft};
        var optionsRight = { direction: directionSlideRight};
        // Set the duration (default: 400 milliseconds)
        var duration = 500;
        var menuRefresh = 600;
        $("#lessonheadclosebtn").removeClass("assessresults").removeClass("assesssummary");
        $("#footerleftbckbtn").removeClass("moduleicon").removeClass("assesssummary");
        if (searchFocus === true) {
            return false;
        }
        if($("video")){
            $("video").each(function(index, vid) {
                            vid.pause();
                            });
        }
        if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined) {
            audioTheoryPaused = true;
            audioTheoryPlayer.pause();
        }
        var coursesdiv = $("#menucontentcourse");
        var groupsdiv = $("#menucontentgroup");
        var scosdiv = $("#menucontentsection");
        var menudiv = $("#menucontentdiv");
        var height;
        var openWidth  ="100%";
        var closedWidth = "0px";
        var panelOpenWidth = $(coursesdiv).width() + "px";
        panelOpenWidth = "100%";
        if($("#menucontentdiv div").hasClass("menuopen")===false){
            $(".coursemenupanel").panel("open");
        }
        if (menu === "courses" || menu === "refresh") {
            $("#autocomplete").empty();
            $("#sectionsearchdiv input").val("");
            $("#searchsection").show();
            $("#pdfmenubtn").addClass("nodisplay");
            $("#podcastmenubtn").addClass("nodisplay");
            $("#eclassmenubtn").addClass("nodisplay");
            $("#footerleftbckbtn").addClass("buttondisabled");
            $("#rhsmenupageheader").show();
            $(".moduleiconrhs").show();
            $(".lessoniconrhs").show();
            if ($(coursesdiv).hasClass("menuopen") === false) {
                
                if ($(groupsdiv).hasClass("menuopen") === true) {
                    $("#menucontentcourse").show();
                                        $("#menucontentgroup").css("position","absolute");
                    panelOpenWidth = $(groupsdiv).width() + "px";
                    $(groupsdiv).animate({marginLeft: panelOpenWidth, width: "0px" }, duration, function() {$(this).hide();});
                    $(coursesdiv).animate({marginLeft: "0px",  width: "100%" }, duration, function() {
                                          $(coursesdiv).removeClass("menuclosed").addClass("menuopen");
                                          $(groupsdiv).removeClass("menuopen").addClass("menuclosed");
                                          $(scosdiv).removeClass("menuopen").addClass("menuclosed");
                                          $(this).show();
                                          $(scosdiv).hide();
                                          $(groupsdiv).hide();
                                          $("#menucontentgroup").css("position","unset");
                                          });
                }
                else if ($(scosdiv).hasClass("menuopen") === true) {
                    panelOpenWidth = $(scosdiv).width() + "px";
                    $(scosdiv).animate({ marginLeft: panelOpenWidth, width: "0px" }, duration, function() {$(this).hide();});
                    $(coursesdiv).animate({marginLeft: "0px",  width: "100%" }, duration, function() {
                                          
                                          $(coursesdiv).removeClass("menuclosed").addClass("menuopen");
                                          $(scosdiv).removeClass("menuopen").addClass("menuclosed");
                                          $(groupsdiv).removeClass("menuopen").addClass("menuclosed");
                                          $(this).show();
                                          $(scosdiv).hide();
                                          $(groupsdiv).hide();
                                          });
                }else{
                    $(coursesdiv).animate({ width: "100%" }, duration, function() {
                                          $(this).show();
                                          $(coursesdiv).removeClass("menuclosed").addClass("menuopen");
                                          $(groupsdiv).removeClass("menuopen").addClass("menuclosed");
                                          $(scosdiv).removeClass("menuopen").addClass("menuclosed");
                                          $(this).show();
                                          $(scosdiv).hide();
                                          $(groupsdiv).hide();
                                          });
                }
                $("#coursepanelheadericon").removeClass("lessonicon").removeClass("moduleicon").addClass("courseicon");
                $("#coursepanelheadertext").html(resources.coursesimgtxt);
                
                $("#footericonsleftli").addClass("nodisplay");
                if (loadFirstSave === false) {
                    userMenuSelect = true;
                }
                menuOpenName="courses";
            }else{
                $(coursesdiv).animate({ width: "100%" }, duration, function() {
                                      
                                      $(coursesdiv).removeClass("menuclosed").addClass("menuopen");
                                      $(groupsdiv).removeClass("menuopen").addClass("menuclosed");
                                      $(scosdiv).removeClass("menuopen").addClass("menuclosed");
                                      $(this).show();
                                      $(scosdiv).hide();
                                      $(groupsdiv).hide();
                                      });
                $("#coursepanelheadericon").removeClass("lessonicon").removeClass("moduleicon").addClass("courseicon");
                $("#coursepanelheadertext").html(resources.coursesimgtxt);
                
                $("#footericonsleftli").addClass("nodisplay");
                if (loadFirstSave === false) {
                    userMenuSelect = true;
                }
            }
            $("#changemenubtnli").hide();
            $("#audiotheoryplayerdiv").hide();
            $("#bookingsul").empty();
            $("#bookingdatediv").hide();
            $("#bookingdisclaimerdiv").hide();
            $("#bookingcontent").hide();
            $("#theorydatacontent").hide();
            $("#contentnavdiv").hide();
            $("#wscontentnavdiv").hide();
            $(".courseiconlhs").hide();
            $(".moduleiconlhs").hide();
            $(".lessoniconlhs").hide();
            $("#coursepanelheader").addClass("show1");
            $("#coursepanelheader").removeClass("show3");
            $("#coursepanelheader").removeClass("show2");
            $(".headericondivlhs").hide();
            $(".homeicon").hide();
            $("#coursepanelheader").removeClass("lessonsmenu");
            setTimeout(function(){setPagePadderDiv("menuScroller", true);}, menuRefresh);
        } else if (menu === "groups" && $(groupsdiv).hasClass("menuopen") === false) {
            $("#footerleftbckbtn").removeClass("buttondisabled");
            $("#pdfmenubtn").addClass("nodisplay");
            $("#podcastmenubtn").removeClass("nodisplay");
            $("#eclassmenubtn").removeClass("nodisplay");
            menuOpenName="groups";
            $("#rhsmenupageheader").show();
            $(".moduleiconrhs").hide();
            $(".lessoniconrhs").show();
            // set activeModule & activeSection & activeSCO to undefined
            // activeModule = undefined;
            // activeSection = undefined;
            // activeSCO = undefined;
            
            if ($(coursesdiv).hasClass("menuopen") === true) {
                $("#menucontentcourse").hide();
                                                    $("#menucontentgroup").show();
                $(coursesdiv).animate({ width: "0px" }, duration, function() {$(this).hide();});
                $(groupsdiv).animate({ marginLeft: closedWidth, width: "100%" }, duration, function() {
                                     $(this).show();
                                     $(groupsdiv).removeClass("menuclosed").addClass("menuopen");
                                     $(coursesdiv).removeClass("menuopen").addClass("menuclosed");
                                     $(scosdiv).removeClass("menuopen").addClass("menuclosed");
                                     $(this).show();
                                     $(scosdiv).hide();
                                     $(coursesdiv).hide();
                                     
                                     });
            } else if ($(scosdiv).hasClass("menuopen") === true) {
                $(groupsdiv).show();
                                $(scosdiv).css("position","absolute");
                $(scosdiv).animate({ marginLeft: panelOpenWidth, width: "0px" }, duration, function() {$(this).hide();});
                $(groupsdiv).animate({ marginLeft: "0px", width: "100%" }, duration, function() {
                                     
                                     $(groupsdiv).removeClass("menuclosed").addClass("menuopen");
                                     $(scosdiv).removeClass("menuopen").addClass("menuclosed");
                                     $(coursesdiv).removeClass("menuopen").addClass("menuclosed");
                                     $(this).show();
                                     $(scosdiv).hide();
                                     $(coursesdiv).hide();
                                     $(scosdiv).css("position","unset");
                                     });
            }else if ($(groupsdiv).hasClass("menuopen") === false){
                $(groupsdiv).animate({ width: "100%" }, duration, function() {
                                     $(groupsdiv).removeClass("menuclosed").addClass("menuopen");
                                     $(scosdiv).removeClass("menuopen").addClass("menuclosed");
                                     $(coursesdiv).removeClass("menuopen").addClass("menuclosed");
                                     $(this).show();
                                     $(scosdiv).hide();
                                     $(coursesdiv).hide();
                                     });
            }
            
            $("#coursepanelheadericon").removeClass("lessonicon").removeClass("courseicon").addClass("moduleicon");
            $(".courseiconlhs").show();
            $(".moduleiconlhs").hide();
            $(".lessoniconlhs").hide();
            $("#coursepanelheader").addClass("show2");
            $("#coursepanelheader").removeClass("show3");
            $("#coursepanelheader").removeClass("show1");
            $(".homeicon").show();
            $("#coursepanelheader").removeClass("lessonsmenu");
            $("#coursepanelheadertext").html(resources.modules);
            $("#footericonsleftli").removeClass("nodisplay");
            $("#footerleftbckbtn").removeClass('lessonicon').addClass('moduleicon');
            if (loadFirstSave === false) {
                userMenuSelect = false;
            }
            $("#changemenubtnli").show();
            $("#settingsmenubtnli").hide();
            $("#refreshbtnli").removeClass("settingsshow");
            setTimeout(function(){setPagePadderDiv("menuGroupScroller", true);}, menuRefresh);
        }else{
            $("#podcastmenubtn").removeClass("nodisplay");
            $("#eclassmenubtn").removeClass("nodisplay");
            $("#footerleftbckbtn").removeClass("buttondisabled");
            $("#footerleftbckbtn").removeClass('moduleicon').addClass('lessonicon');
            $("#rhsmenupageheader").hide();
            $(".moduleiconrhs").hide();
            $(".lessoniconrhs").hide();
            menuOpenName="scos";
            if ($(coursesdiv).hasClass("menuopen") === true) {
                
                $(coursesdiv).animate({ width: "0px" }, duration, function() {$(this).hide();});
                $(scosdiv).animate({ marginLeft: closedWidth, width: "100%" }, duration, function() {
                                   $(scosdiv).addClass("menuopen").removeClass("menuclosed");
                                   $(coursesdiv).removeClass("menuopen").addClass("menuclosed");
                                   $(groupsdiv).removeClass("menuopen").addClass("menuclosed");
                                   $(this).show();
                                   $(groupsdiv).hide();
                                   $(coursesdiv).hide();
                                   });
            }else if ($(groupsdiv).hasClass("menuopen") === true) {
                $(groupsdiv).animate({ width: "0px" }, duration, function() {$(this).hide();});
                $(scosdiv).animate({marginLeft: closedWidth, width: "100%" }, duration, function() {
                                   $(scosdiv).addClass("menuopen").removeClass("menuclosed");
                                   $(coursesdiv).removeClass("menuopen").addClass("menuclosed");
                                   $(groupsdiv).removeClass("menuopen").addClass("menuclosed");
                                   $(this).show();
                                   $(groupsdiv).hide();
                                   $(coursesdiv).hide();
                                   });
            }else if ($(scosdiv).hasClass("menuopen") === false){
                
                $(scosdiv).animate({ width: "100%" }, duration, function() {
                                   $(scosdiv).addClass("menuopen").removeClass("menuclosed");
                                   $(groupsdiv).removeClass("menuopen").addClass("menuclosed");
                                   $(coursesdiv).removeClass("menuopen").addClass("menuclosed");
                                   $(this).show();
                                   $(groupsdiv).hide();
                                   $(coursesdiv).hide();
                                   });
            }
            
            $("#coursepanelheadericon").removeClass("moduleicon").removeClass("courseicon").addClass("lessonicon");
            $("#coursepanelheadertext").html(resources.lessons);
            
            
            $(".homeicon").show();
            $(".courseiconlhs").show();
            $(".moduleiconlhs").show();
            $(".lessoniconlhs").hide();
            $("#coursepanelheader").removeClass("show1");
            $("#coursepanelheader").removeClass("show2");
            $("#coursepanelheader").addClass("show3");
            $("#footericonsleftli").removeClass("nodisplay");
            $("#coursepanelheader").addClass("lessonsmenu");
            $("#footerleftbckbtn").removeClass('moduleicon').addClass('lessonicon');
            if (loadFirstSave === false) {
                userMenuSelect = false;
            }
            $("#changemenubtnli").show();
            $("#settingsmenubtnli").hide();
            $("#refreshbtnli").removeClass("settingsshow");
            setTimeout(function(){setPagePadderDiv("scoMenuScroller", true);}, menuRefresh);
        }
        var id = "";
        var courseElId = "";
        if (menuScroller != undefined) {
            setTimeout(function() {
                       if (menu === "courses") {
                       if(activeCourse === undefined){
                       activeCourse = portalCourses.getFirstCourse();
                       if(activeCourse !== undefined){
                       courseElId = "#course-" + activeCourse.courseid;
                       if ($(courseElId) != undefined) {
                       setTimeout(function() {
                                  if (menuScroller !== undefined && menuScroller !== null) {
                                  menuScroller.scrollToElement(courseElId, 0);
                                  if($(courseElId).hasClass("ui-collapsible-collapsed")){
                                  $(courseElId).collapsible("expand");
                                  setTimeout(function(){setPagePadderDiv("menuScroller", true);}, menuRefresh);
                                  
                                  }
                                  }
                                  hidePleaseWait();
                                  }, duration);
                       }
                       }
                       }else if (activeCourse != undefined && loadFirstSave === false) {
                       courseElId = "#course-" + activeCourse.courseid;
                       if ($(courseElId) != undefined) {
                       setTimeout(function() {
                                  if (menuScroller !== undefined && menuScroller !== null) {
                                  menuScroller.scrollToElement(courseElId, 0);
                                  if($(courseElId).hasClass("ui-collapsible-collapsed")){
                                  $(courseElId).collapsible("expand");
                                  setTimeout(function(){setPagePadderDiv("menuScroller", true);}, menuRefresh);
                                  }
                                  }
                                  hidePleaseWait();
                                  }, duration);
                       }
                       }
                       if (activeModuleGroup !== undefined && activeCourse!==undefined) {
                       id = "#modulegroup-" + activeModuleGroup.courseid + "-" + activeModuleGroup.modulegroupid;
                       
                       if ($(id) != undefined) {
                       setTimeout(function() {
                                  if (menuScroller !== undefined && menuScroller !== null) {
                                  menuScroller.scrollToElement(id, 0);
                                  }
                                  hidePleaseWait();
                                  }, menuRefresh);
                       }
                       }
                       } else if (menu === "groups") {
                       var groupedModuleId;
                       var moduleGroupingElId = "";
                       if (activeModule != undefined) {
                       groupedModuleId = activeModule.modulegrouping;
                       if(activeModuleGroup===undefined){
                       activeModuleGroup = activeCourse.getModuleGroupByModuleId(activeModule.basemoduleid);
                       
                       }
                       if(activeModuleGroup !==undefined){
                       moduleGroupingElId = "#modulegrouping-" + activeModuleGroup.modulegroupid + "-" + groupedModuleId;
                       }
                       id = "#module-" + activeModule.courseid + "-" + activeModule.basemoduleid;
                       if($(moduleGroupingElId) != undefined){
                       if($(moduleGroupingElId).hasClass("ui-collapsible-collapsed")){
                       $(moduleGroupingElId).collapsible("expand");
                       setTimeout(function(){setPagePadderDiv("menuGroupScroller", true);}, menuRefresh);
                       }
                       }
                       if ($(id) != undefined) {
                       setTimeout(function() {
                                  if (menuGroupScroller !== undefined && menuGroupScroller !== null) {
                                  setPagePadderDiv("menuGroupScroller", false);
                                  menuGroupScroller.scrollToElement(id, 0);
                                  }
                                  hidePleaseWait();
                                  }, menuRefresh);
                       }
                       }else{
                       if(activeCourse !== undefined){
                       if(activeModuleGroup!==undefined){
                       if(activeModuleGroup!==undefined){
                       if($(".groupscollapsibleset div:first").hasClass("ui-collapsible-collapsed")){
                       $(".groupscollapsibleset div:first").collapsible("expand");
                       setTimeout(function(){setPagePadderDiv("menuGroupScroller", true);}, menuRefresh);
                       }
                       }
                       }
                       }
                       }
                       }else{
                       if (activeSCO != undefined) {
                       id = "#sco-" + activeSCO.theorymodulesectionid + "-" + activeSCO.assetid;
                       if ($(id) != undefined) {
                       setTimeout(function() {
                                  if (scoMenuScroller !== undefined && scoMenuScroller !== null) {
                                  setPagePadderDiv("scoMenuScroller", false);
                                  scoMenuScroller.scrollToElement(id, 0);
                                  }
                                  hidePleaseWait();
                                  }, menuRefresh);
                       }
                       } else {
                       if (activeSection != undefined && loadFirstSave === false) {
                       var sectionElId = "#section-" + activeSection.theorymodulesectionid;
                       if ($(sectionElId) != undefined) {
                       setTimeout(function() {
                                  if (scoMenuScroller !== undefined && scoMenuScroller !== null) {
                                  scoMenuScroller.scrollToElement(sectionElId, 0);
                                  }
                                  hidePleaseWait();
                                  }, menuRefresh);
                       }
                       }
                       }
                       }
                       }, menuRefresh);
        }
    } catch (e) {
        errorHandler("changeMenu", e);
    }
}*/

function changeMenu(menu) {
    try {
        //alert(menu);
        // Set the effect type
        var effect = 'slide';
        var directionSlideRight= "right";
        var directionSlideLeft= "left";
        // Set the options for the effect type chosen
        var optionsLeft = { direction: directionSlideLeft};
        var optionsRight = { direction: directionSlideRight};
        // Set the duration (default: 400 milliseconds)
        var duration = 400;
        var menuRefresh = 600;
        $("#lessonheadclosebtn").removeClass("assessresults").removeClass("assesssummary");
        $("#footerleftbckbtn").removeClass("moduleicon").removeClass("assesssummary");
        if (searchFocus === true) {
            return false;
        }
        if($("video")){
            $("video").each(function(index, vid) {
                            vid.pause();
                            });
        }
        if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined) {
            audioTheoryPaused = true;
            audioTheoryPlayer.pause();
        }
        var coursesdiv = $("#menucontentcourse");
        var groupsdiv = $("#menucontentgroup");
        var scosdiv = $("#menucontentsection");
        var menudiv = $("#menucontentdiv");
        var height;
        var openWidth  ="100%";
        var closedWidth = "0px";
        var panelOpenWidth = $(coursesdiv).width() + "px";
        panelOpenWidth = "100%";
        if($("#menucontentdiv div").hasClass("menuopen")===false){
            if(menu === "courses" ){
                $(coursesdiv).show();
            }
            else if(menu === "groups"){
                $(groupsdiv).show();
            }
            $(".coursemenupanel").panel("open");
        }
        if (menu === "courses" || menu === "refresh") {
            $("#autocomplete").empty();
            $("#sectionsearchdiv input").val("");
            $("#searchsection").show();
            $("#pdfmenubtn").addClass("nodisplay");
            $("#podcastmenubtn").addClass("nodisplay");
            $("#eclassmenubtn").addClass("nodisplay");
             $("#bookingmenubtn").addClass("nodisplay");
            $("#footerleftbckbtn").addClass("buttondisabled");
            $("#rhsmenupageheader").show();
            $(".moduleiconrhs").show();
            $(".lessoniconrhs").show();
            if ($(coursesdiv).hasClass("menuopen") === false) {

                if ($(groupsdiv).hasClass("menuopen") === true) {
                    //$("#menucontentgroup").hide();
                    $("#menucontentcourse").show();
                    $("#menucontentgroup").css("position","absolute");
                    panelOpenWidth = $(groupsdiv).width() + "px";
                    $(groupsdiv).animate({marginLeft: panelOpenWidth, width: "0px" }, duration, function() {
                        //$(this).hide();
                    });
                    $(coursesdiv).animate({marginLeft: "0px",  width: "100%" }, duration, function() {
                                          $(coursesdiv).removeClass("menuclosed").addClass("menuopen");
                                          $(groupsdiv).removeClass("menuopen").addClass("menuclosed");
                                          $(scosdiv).removeClass("menuopen").addClass("menuclosed");
                                          $(this).show();
                                          $(scosdiv).hide();
                                          $(groupsdiv).hide();
                                          $("#menucontentgroup").css("position","unset");
                                          });
                }
                else if ($(scosdiv).hasClass("menuopen") === true) {
                    $(coursesdiv).show();
                    panelOpenWidth = $(scosdiv).width() + "px";
                    $(scosdiv).animate({ marginLeft: panelOpenWidth, width: "0px" }, duration, function() {$(this).hide();});
                    $(coursesdiv).animate({marginLeft: "0px",  width: "100%" }, duration, function() {

                                          $(coursesdiv).removeClass("menuclosed").addClass("menuopen");
                                          $(scosdiv).removeClass("menuopen").addClass("menuclosed");
                                          $(groupsdiv).removeClass("menuopen").addClass("menuclosed");
                                          $(this).show();
                                          $(scosdiv).hide();
                                          $(groupsdiv).hide();
                                          });
                }else{
                    $(coursesdiv).animate({ width: "100%" }, duration, function() {
                                          $(this).show();
                                          $(coursesdiv).removeClass("menuclosed").addClass("menuopen");
                                          $(groupsdiv).removeClass("menuopen").addClass("menuclosed");
                                          $(scosdiv).removeClass("menuopen").addClass("menuclosed");
                                          $(this).show();
                                          $(scosdiv).hide();
                                          $(groupsdiv).hide();
                                          });
                }
                $("#coursepanelheadericon").removeClass("lessonicon").removeClass("moduleicon").addClass("courseicon");
                $("#coursepanelheadertext").html(resources.coursesimgtxt);

                $("#footericonsleftli").addClass("nodisplay");
                if (loadFirstSave === false) {
                    userMenuSelect = true;
                }
                menuOpenName="courses";
            }else{

                $(coursesdiv).animate({ width: "100%" }, duration, function() {

                                      $(coursesdiv).removeClass("menuclosed").addClass("menuopen");
                                      $(groupsdiv).removeClass("menuopen").addClass("menuclosed");
                                      $(scosdiv).removeClass("menuopen").addClass("menuclosed");
                                      $(this).show();
                                      $(scosdiv).hide();
                                      $(groupsdiv).hide();
                                      });
                $("#coursepanelheadericon").removeClass("lessonicon").removeClass("moduleicon").addClass("courseicon");
                $("#coursepanelheadertext").html(resources.coursesimgtxt);

                $("#footericonsleftli").addClass("nodisplay");
                if (loadFirstSave === false) {
                    userMenuSelect = true;
                }
            }
            $("#changemenubtnli").hide();
            $("#audiotheoryplayerdiv").hide();
            $("#bookingsul").empty();
            $("#bookingdatediv").hide();
            $("#bookingdisclaimerdiv").hide();
            $("#bookingcontent").hide();
            $("#theorydatacontent").hide();
            $("#contentnavdiv").hide();
            $("#wscontentnavdiv").hide();
            $(".courseiconlhs").hide();
            $(".moduleiconlhs").hide();
            $(".lessoniconlhs").hide();
            $("#coursepanelheader").addClass("show1");
            $("#coursepanelheader").removeClass("show3");
            $("#coursepanelheader").removeClass("show2");
            $(".headericondivlhs").hide();
            $(".homeicon").hide();
            $("#coursepanelheader").removeClass("lessonsmenu");
            setTimeout(function(){setPagePadderDiv("menuScroller", true);}, menuRefresh);
        } else if (menu === "groups" && $(groupsdiv).hasClass("menuopen") === false) {
            $("#footerleftbckbtn").removeClass("buttondisabled");
            $("#pdfmenubtn").addClass("nodisplay");
            $("#podcastmenubtn").removeClass("nodisplay");
            $("#eclassmenubtn").removeClass("nodisplay");
             $("#bookingmenubtn").removeClass("nodisplay");
            menuOpenName="groups";
            $("#rhsmenupageheader").show();
            $(".moduleiconrhs").hide();
            $(".lessoniconrhs").show();
            // set activeModule & activeSection & activeSCO to undefined
            // activeModule = undefined;
            // activeSection = undefined;
            // activeSCO = undefined;

            if ($(coursesdiv).hasClass("menuopen") === true) {
                //$("#menucontentcourse").hide();
                $("#menucontentgroup").show();
                $("#menucontentcourse").css("position","absolute");
                $(coursesdiv).animate({ width: "0px" }, duration, function() {
                    $(this).hide();
                });
                $(groupsdiv).animate({ marginLeft: closedWidth, width: "100%" }, duration, function() {
                                     $(this).show();
                                     $(groupsdiv).removeClass("menuclosed").addClass("menuopen");
                                     $(coursesdiv).removeClass("menuopen").addClass("menuclosed");
                                     $(scosdiv).removeClass("menuopen").addClass("menuclosed");
                                     $(this).show();
                                     $(scosdiv).hide();
                                     //$(coursesdiv).hide();
                                     $("#menucontentcourse").css("position","unset");
                                     });
            } else if ($(scosdiv).hasClass("menuopen") === true) {
                $(groupsdiv).show();
                $(scosdiv).css("position","absolute");
                $(scosdiv).animate({ marginLeft: panelOpenWidth, width: "0px" }, duration, function() {$(this).hide();});
                $(groupsdiv).animate({ marginLeft: "0px", width: "100%" }, duration, function() {

                                     $(groupsdiv).removeClass("menuclosed").addClass("menuopen");
                                     $(scosdiv).removeClass("menuopen").addClass("menuclosed");
                                     $(coursesdiv).removeClass("menuopen").addClass("menuclosed");
                                     $(this).show();
                                     $(scosdiv).hide();
                                     $(coursesdiv).hide();
                                     $(scosdiv).css("position","unset");
                                     });
            }else if ($(groupsdiv).hasClass("menuopen") === false){

                $(groupsdiv).animate({ width: "100%" }, duration, function() {
                                     $(groupsdiv).removeClass("menuclosed").addClass("menuopen");
                                     $(scosdiv).removeClass("menuopen").addClass("menuclosed");
                                     $(coursesdiv).removeClass("menuopen").addClass("menuclosed");
                                     $(this).show();
                                     $(scosdiv).hide();
                                     $(coursesdiv).hide();
                                     });
            }

            $("#coursepanelheadericon").removeClass("lessonicon").removeClass("courseicon").addClass("moduleicon");
            $(".courseiconlhs").show();
            $(".moduleiconlhs").hide();
            $(".lessoniconlhs").hide();
            $("#coursepanelheader").addClass("show2");
            $("#coursepanelheader").removeClass("show3");
            $("#coursepanelheader").removeClass("show1");
            $(".homeicon").show();
            $("#coursepanelheader").removeClass("lessonsmenu");
            $("#coursepanelheadertext").html(resources.modules);
            $("#footericonsleftli").removeClass("nodisplay");
            $("#footerleftbckbtn").removeClass('lessonicon').addClass('moduleicon');
            if (loadFirstSave === false) {
                userMenuSelect = false;
            }
            $("#changemenubtnli").show();
            $("#settingsmenubtnli").hide();
            $("#refreshbtnli").removeClass("settingsshow");
            setTimeout(function(){setPagePadderDiv("menuGroupScroller", true);}, menuRefresh);
        }else{
            $("#podcastmenubtn").removeClass("nodisplay");
            $("#eclassmenubtn").removeClass("nodisplay");
             $("#bookingmenubtn").removeClass("nodisplay");
            $("#footerleftbckbtn").removeClass("buttondisabled");
            $("#footerleftbckbtn").removeClass('moduleicon').addClass('lessonicon');
            $("#rhsmenupageheader").hide();
            $(".moduleiconrhs").hide();
            $(".lessoniconrhs").hide();
            menuOpenName="scos";
            if ($(coursesdiv).hasClass("menuopen") === true) {

                $(coursesdiv).animate({ width: "0px" }, duration, function() {$(this).hide();});
                $(scosdiv).animate({ marginLeft: closedWidth, width: "100%" }, duration, function() {
                                   $(scosdiv).addClass("menuopen").removeClass("menuclosed");
                                   $(coursesdiv).removeClass("menuopen").addClass("menuclosed");
                                   $(groupsdiv).removeClass("menuopen").addClass("menuclosed");
                                   $(this).show();
                                   $(groupsdiv).hide();
                                   $(coursesdiv).hide();
                                   });
            }else if ($(groupsdiv).hasClass("menuopen") === true) {
                //check here
                $(scosdiv).show();
                $(groupsdiv).css("position","absolute");
                $(groupsdiv).animate({ width: "0px" }, duration, function() {$(this).hide();});
                $(scosdiv).animate({marginLeft: closedWidth, width: "100%" }, duration, function() {
                                   $(scosdiv).addClass("menuopen").removeClass("menuclosed");
                                   $(coursesdiv).removeClass("menuopen").addClass("menuclosed");
                                   $(groupsdiv).removeClass("menuopen").addClass("menuclosed");
                                   $(this).show();
                                   $(groupsdiv).hide();
                                   $(coursesdiv).hide();
                                   $(groupsdiv).css("position","unset");
                                   });
            }else if ($(scosdiv).hasClass("menuopen") === false){
                $(scosdiv).show();
                //$(scosdiv).css("position","absolute");
                $(scosdiv).animate({ width: "100%" }, duration, function() {
                                   $(scosdiv).addClass("menuopen").removeClass("menuclosed");
                                   $(groupsdiv).removeClass("menuopen").addClass("menuclosed");
                                   $(coursesdiv).removeClass("menuopen").addClass("menuclosed");
                                   $(this).show();
                                   $(groupsdiv).hide();
                                   $(coursesdiv).hide();
                                   });
            }

            $("#coursepanelheadericon").removeClass("moduleicon").removeClass("courseicon").addClass("lessonicon");
            $("#coursepanelheadertext").html(resources.lessons);


            $(".homeicon").show();
            $(".courseiconlhs").show();
            $(".moduleiconlhs").show();
            $(".lessoniconlhs").hide();
            $("#coursepanelheader").removeClass("show1");
            $("#coursepanelheader").removeClass("show2");
            $("#coursepanelheader").addClass("show3");
            $("#footericonsleftli").removeClass("nodisplay");
            $("#coursepanelheader").addClass("lessonsmenu");
            $("#footerleftbckbtn").removeClass('moduleicon').addClass('lessonicon');
            if (loadFirstSave === false) {
                userMenuSelect = false;
            }
            $("#changemenubtnli").show();
            $("#settingsmenubtnli").hide();
            $("#refreshbtnli").removeClass("settingsshow");
            setTimeout(function(){setPagePadderDiv("scoMenuScroller", true);}, menuRefresh);
        }
        var id = "";
        var courseElId = "";
        if (menuScroller != undefined) {
            setTimeout(function() {
                       if (menu === "courses") {
                       if(activeCourse === undefined){
                       activeCourse = portalCourses.getFirstCourse();
                       if(activeCourse !== undefined){
                       courseElId = "#course-" + activeCourse.courseid;
                       if ($(courseElId) != undefined) {
                       setTimeout(function() {
                                  if (menuScroller !== undefined && menuScroller !== null) {
                                  menuScroller.scrollToElement(courseElId, 0);
                                  if($(courseElId).hasClass("ui-collapsible-collapsed")){
                                  $(courseElId).collapsible("expand");
                                  setTimeout(function(){setPagePadderDiv("menuScroller", true);}, menuRefresh);

                                  }
                                  }
                                  hidePleaseWait();
                                  }, duration);
                       }
                       }
                       }else if (activeCourse != undefined && loadFirstSave === false) {
                       courseElId = "#course-" + activeCourse.courseid;
                       if ($(courseElId) != undefined) {
                       setTimeout(function() {
                                  if (menuScroller !== undefined && menuScroller !== null) {
                                  menuScroller.scrollToElement(courseElId, 0);
                                  if($(courseElId).hasClass("ui-collapsible-collapsed")){
                                  $(courseElId).collapsible("expand");
                                  setTimeout(function(){setPagePadderDiv("menuScroller", true);}, menuRefresh);
                                  }
                                  }
                                  hidePleaseWait();
                                  }, duration);
                       }
                       }
                       if (activeModuleGroup !== undefined && activeCourse!==undefined) {
                       id = "#modulegroup-" + activeModuleGroup.courseid + "-" + activeModuleGroup.modulegroupid;

                       if ($(id) != undefined) {
                       setTimeout(function() {
                                  if (menuScroller !== undefined && menuScroller !== null) {
                                  menuScroller.scrollToElement(id, 0);
                                  }
                                  hidePleaseWait();
                                  }, menuRefresh);
                       }
                       }
                       } else if (menu === "groups") {
                       var groupedModuleId;
                       var moduleGroupingElId = "";
                       if (activeModule != undefined) {
                       groupedModuleId = activeModule.modulegrouping;
                       if(activeModuleGroup===undefined){
                       activeModuleGroup = activeCourse.getModuleGroupByModuleId(activeModule.basemoduleid);

                       }
                       if(activeModuleGroup !==undefined){
                       moduleGroupingElId = "#modulegrouping-" + activeModuleGroup.modulegroupid + "-" + groupedModuleId;
                       }
                       id = "#module-" + activeModule.courseid + "-" + activeModule.basemoduleid;
                       if($(moduleGroupingElId) != undefined){
                       if($(moduleGroupingElId).hasClass("ui-collapsible-collapsed")){
                       $(moduleGroupingElId).collapsible("expand");
                       setTimeout(function(){setPagePadderDiv("menuGroupScroller", true);}, menuRefresh);
                       }
                       }
                       if ($(id) != undefined) {
                       setTimeout(function() {
                                  if (menuGroupScroller !== undefined && menuGroupScroller !== null) {
                                  setPagePadderDiv("menuGroupScroller", false);
                                  menuGroupScroller.scrollToElement(id, 0);
                                  }
                                  hidePleaseWait();
                                  }, menuRefresh);
                       }
                       }else{
                       if(activeCourse !== undefined){
                       if(activeModuleGroup!==undefined){
                       if(activeModuleGroup!==undefined){
                       if($(".groupscollapsibleset div:first").hasClass("ui-collapsible-collapsed")){
                       $(".groupscollapsibleset div:first").collapsible("expand");
                       setTimeout(function(){setPagePadderDiv("menuGroupScroller", true);}, menuRefresh);
                       }
                       }
                       }
                       }
                       }
                       }else{
                       if (activeSCO != undefined) {
                       id = "#sco-" + activeSCO.theorymodulesectionid + "-" + activeSCO.assetid;
                       if ($(id) != undefined) {
                       setTimeout(function() {
                                  if (scoMenuScroller !== undefined && scoMenuScroller !== null) {
                                  setPagePadderDiv("scoMenuScroller", false);
                                  scoMenuScroller.scrollToElement(id, 0);
                                  }
                                  hidePleaseWait();
                                  }, menuRefresh);
                       }
                       } else {
                       if (activeSection != undefined && loadFirstSave === false) {
                       var sectionElId = "#section-" + activeSection.theorymodulesectionid;
                       if ($(sectionElId) != undefined) {
                       setTimeout(function() {
                                  if (scoMenuScroller !== undefined && scoMenuScroller !== null) {
                                  scoMenuScroller.scrollToElement(sectionElId, 0);
                                  }
                                  hidePleaseWait();
                                  }, menuRefresh);
                       }
                       }
                       }
                       }
                       }, menuRefresh);
        }
    } catch (e) {
        errorHandler("changeMenu", e);
    }
}
function openPDF() {
    try {
        var url = "";
        if (activeModule != undefined && activeSection != undefined) {
            var pdfDirectory = activeModule.basemoduleid.toString();
            viewFile = "lessonmaterial.pdf";
            hidePleaseWait();
            if(docsFileDir!=undefined){
                $("#contentprimary").append(loadingPDFGif);
                docsFileDir.getDirectory(pdfDirectory, {
                                         create: true,
                                         exclusive: false
                                         }, checkPDFDirExists, fail);
            }else if (theoryMediaDir != undefined) {
                
                $("#contentprimary").append(loadingPDFGif);
                theoryMediaDir.getDirectory(pdfDirectory, {
                                            create: true,
                                            exclusive: false
                                            }, checkPDFDirExists, fail);
            }
        }
        retry = true;
    } catch (e) {
        errorHandler("openPDF", e);
    }
}

function onFSSuccess(fs) {
    try {
        localFileSystem = fs;
        localFileSystem.root.getDirectory(".eteacher.pro", {
                                          create: true
                                          }, getMainFileRootDir, onError);
    } catch (e) {
        errorHandler("onFSSuccess", e);
    }
}
function onFSDocSuccess(fs) {
    try {
        docsFileSystem = fs;
        docsFileSystem.root.getDirectory(resources.companyname.replace(" ",""), {
                                         create: true
                                         }, getDocsFileRootDir, onError);
    } catch (e) {
        errorHandler("onFSDocSuccess", e);
    }
}
function getMainFileRootDir(localDir) {
    try {
        fileMainDir = localDir;
    } catch (e) {
        errorHandler("getMainFileRootDir", e);
    }
}
function getDocsFileRootDir(localDir) {
    try {
        docsFileDir = localDir;
    } catch (e) {
        errorHandler("getDocsFileRootDir", e);
    }
}
function getUserRootDir(returnFunction) {
    try {
        if (activeUser != undefined && activeUser.userId > 0) {
            var userDir = activeUser.userId.toString();
            
            if (device.platform === "Android") {
                window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory,
                                                 function(fileMainDir) {
                                                 fileMainDir.getDirectory(userDir, {
                                                                          create: true
                                                                          }, setUserRootDir, onError);
                                                 });
                
            }else{
                fileMainDir.getDirectory(userDir, {
                                         create: true
                                         }, setUserRootDir, onError);
            }
            returnFunction(true);
        }
    } catch (e) {
        errorHandler("getUserRootDir", e);
    }
}

function setUserRootDir(localDir) {
    try {
        userMainDir = localDir;
        userMainDir.getDirectory(".Helpdesk", {
                                 create: true
                                 }, getHelpdeskDir, onError);
        userMainDir.getDirectory(".UserData", {
                                 create: true
                                 }, getUserDataDir, onError);
        userMainDir.getDirectory(".MediaData", {
                                 create: true
                                 }, getMediaDataDir, onError);
    } catch (e) {
        errorHandler("setUserRootDir", e);
    }
}

function getHelpdeskDir(dir) {
    try {
        helpDeskDir = dir;
    } catch (e) {
        errorHandler("getHelpdeskDir", e);
    }
}

function getUserDataDir(dir) {
    try {
        userDataDir = dir;
    } catch (e) {
        errorHandler("getUserDataDir", e);
    }
}

function getMediaDataDir(dir) {
    try {
        mediaDataDir = dir;
        mediaDataDir.getDirectory(".AudioMedia", {
                                  create: true
                                  }, getAudioMediaDataDir, onError);
        mediaDataDir.getDirectory(".TheoryMedia", {
                                  create: true
                                  }, getTheoryMediaDataDir, onError);
        mediaDataDir.getDirectory(".VideoMedia", {
                                  create: true
                                  }, getVideoMediaDataDir, onError);
       
    } catch (e) {
        errorHandler("getMediaDataDir", e);
    }
}

function getVideoMediaDataDir(dir) {
    try {
        videoMediaDir = dir;
    } catch (e) {
        errorHandler("getVideoMediaDataDir", e);
    }
}

function getAudioMediaDataDir(dir) {
    try {
        audioMediaDir = dir;
    } catch (e) {
        errorHandler("getAudioMediaDataDir", e);
    }
}

function getTheoryMediaDataDir(dir) {
    try {
        theoryMediaDir = dir;
    } catch (e) {
        errorHandler("getTheoryMediaDataDir", e);
    }
}

function onError(evt) {
    try {} catch (e) {
        errorHandler("onError", e);
    }
}

function populateCourses(updatePosition) {
    try {
        showPleaseWait();
        if (activeUser.username == undefined || activeUser.username == "") {
            return;
        }
        var strContent = "";
        $("#contentnavdiv").hide();
        $("#wscontentnavdiv").hide();
        $("#audiotheoryplayerdiv").hide();
        $("#bookingsul").empty();
        $("#bookingdisclaimerdiv").hide();
        $("#bookingdatediv").hide();
        $("#bookingcontent").hide();
        if (portalCourses == undefined || portalCourses.count() == 0 || courseListContent == "" || coursesInit===true) {
            portalCourses.refreshCourses(updatePosition, function(ret) {
              //alert(ret);
                                         if (ret == true) {
                                         coursesInit=false;
                                         setCoursesListView();
                                         } else {
                                         msgStr = resources.enrolledCourses;
                                         msgTitle = resources.loginError;
                                         msgBtnValue = resources.btnOk;
                                         navigator.notification.confirm(msgStr, function() {
                                                                        hidePleaseWait();
                                                                        activeUser.requireslogin = true;
                                                                        goToPage("#mainhomepage");
                                                                        showLoginPage();
                                                                        }, msgTitle, msgBtnValue);
                                         }
                                         });
        } else {
            setCoursesListView();
        }
    } catch (e) {
        errorHandler("populateCourses", e);
    }
}

function setCoursesListView() {
    try {
        if (portalCourses == undefined || portalCourses.count() == 0) {
            hidePleaseWait();
        } else {
            if (courseListContent.length === 0) {
                courseListContent = portalCourses.getCoursesListView();
            }
            $("#ulcourses").html("");
            if ($("#ulcourses").length!=undefined) {
                $("#ulcourses").html(courseListContent);
                $("#ulcourses").trigger("create");
                $("#ulcourses").listview();
                $("#ulcourses").listview("refresh");
                setPagePadderDiv("menuScroller", false);
                if(iphone5===true){
                    $("#ulcourses").addClass("iphone5");
                }
            }
            $(".coursesli").off("vclick");
            $(".coursesli").on("vclick", function(event) {
                               try {
                               event.preventDefault();
                               event.stopPropagation();
                               if (coursesOK === true) {
                               $(".coursesli").children('div.ui-collapsible-content').slideUp(300);
                               if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined) {
                               audioTheoryPaused = true;
                               audioTheoryPlayer.pause();
                               }
                               var id = $(event.currentTarget).attr("id");
                               var current = $(this).closest(".ui-collapsible");
                               if ($("#" + id).hasClass("ui-collapsible-collapsed")) {
                               $(".ui-collapsible").not(".ui-collapsible-collapsed").find("ui-collapsible-heading-toggle").click();
                               $(".ui-collapsible-content", current).slideDown(300);
                               $("#" + id).collapsible("expand");
                               var ids = id.split("-");
                               var courseid = ids[1];
                               activeCourse = portalCourses.getCourseById(courseid);
                               setUserPosition(false, "#coursepage", false);
                               if(activeCourse!==undefined && activeCourse.modulegroups !==undefined && activeCourse.modulegroups.length===1){
                               var modulegroup =activeCourse.modulegroups[0];
                               if(modulegroup!==undefined){
                               var groupid = "#modulegroup-" + modulegroup.courseid + "-" + modulegroup.modulegroupid;
                               $(groupid).trigger("vclick");
                               }
                               }
                               } else {
                               $(".ui-collapsible-content", current).slideUp(300);
                               setTimeout(function() {
                                   $("#" + id).collapsible("collapse");
                               }, 300);
                               //$("#" + id).collapsible("collapse");
                               }
                               setTimeout(function() {
                                          coursesOK = true;
                                          }, 300);
                               setPagePadderDiv("menuScroller", false);
                               setPagePadderDiv("menuGroupScroller", false);
                               }
                               
                               } catch (e) {
                               errorHandler("groups click", e);
                               }
                               });
            $(".coursepaymentrequired").off("vclick");
            $(".coursepaymentrequired").on("vclick", function(event) {
                                           showCoursePaymentInaccessible(event, function(ret) {});
                                           });
            
            setModuleGroupValues();
        }
        if (loadFirstSave===true) {
            showPleaseWait();
            triggerLoad(loadFirstSave);
            loadFirstSave = false;
        }
    } catch (e) {
        errorHandler("setCoursesListView", e);
    }
}

function prevModulesIncomplete(event, returnFunction) {
    try {
        if (naOK === true) {
            naOK = false;
            event.preventDefault();
            event.stopPropagation();
            hidePleaseWait();
            msgTitle = resources.moduleAccess;
            msgBtnValue = resources.btnOk;
            msgStr = resources.moduleIncomplete;
            if (supressWarningMsgs === false) {
                navigator.notification.confirm(msgStr, function() {
                                               hidePleaseWait();
                                               naOK = true;
                                               setTimeout(function() {
                                                          moduleOK = true;
                                                          moduleBookOK = true;
                                                          }, 300);
                                               if (activeModule != undefined) {
                                               var moduleElId = "#module-" + activeModule.courseid + "-" + activeModule.basemoduleid;
                                               if ($(moduleElId) != undefined) {
                                               if (menuScroller != undefined) {
                                               setTimeout(function() {
                                                          menuScroller.scrollToElement(moduleElId, 300);
                                                          }, 100);
                                               setActiveClass("module");
                                               }
                                               }
                                               }
                                               returnFunction(true);
                                               }, msgTitle, msgBtnValue);
            }
        }
    } catch (e) {
        errorHandler("prevModulesIncomplete", e);
        returnFunction(false);
    }
}

function showModulePracticumInaccessible(event, returnFunction) {
    try {
        if (naOK === true) {
            naOK = false;
            event.preventDefault();
            event.stopPropagation();
            hidePleaseWait;
            msgTitle = resources.moduleAccess;
            msgBtnValue = resources.btnOk;
            msgStr = resources.modulePracticum;
            if (supressWarningMsgs === false) {
                navigator.notification.confirm(msgStr, function() {
                                               hidePleaseWait();
                                               naOK = true;
                                               returnFunction(true);
                                               }, msgTitle, msgBtnValue);
            }
        }
    } catch (e) {
        errorHandler("showModulePracticumInaccessible", e);
        returnFunction(false);
    }
}

function showGuideLinesInaccessible(event, returnFunction) {
    try {
        if (naOK === true) {
            naOK = false;
            event.preventDefault();
            event.stopPropagation();
            hidePleaseWait;
            msgTitle = resources.moduleAccess;
            msgBtnValue = resources.btnOk;
            msgStr = resources.moduleGuidelines;
            if (supressWarningMsgs === false) {
                navigator.notification.confirm(msgStr, function() {
                                               hidePleaseWait();
                                               naOK = true;
                                               returnFunction(true);
                                               }, msgTitle, msgBtnValue);
            }
        }
    } catch (e) {
        errorHandler("showGuideLinesInaccessible", e);
        returnFunction(false);
    }
}
function showCoursePaymentInaccessible(event, returnFunction) {
    try {
        //alert('in');
        if (naOK === true) {
            naOK = false;
            event.preventDefault();
            event.stopPropagation();
            hidePleaseWait;
            msgStr = resources.coursePayment;
            msgTitle = resources.courseAccess;
            msgBtnValue = resources.btnOk;
            if (supressWarningMsgs === false) {
                navigator.notification.confirm(msgStr, function() {
                                               hidePleaseWait();
                                               naOK = true;
                                               returnFunction(true);
                                               }, msgTitle, msgBtnValue);
            }
        }
    } catch (e) {
        errorHandler("showCoursePaymentInaccessible", e);
        returnFunction(false);
    }
}

function showModuleRequiresBooking(event, returnFunction) {
    try {
        if (naOK === true) {
            naOK = false;
            event.preventDefault();
            event.stopPropagation();
            hidePleaseWait;

            msgTitle = resources.bookings;
                msgBtnValue = resources.btnOk;
                msgStr = resources.RequiresBookingMsg;
                navigator.notification.confirm(msgStr, function(choice) {

                    hidePleaseWait();
                                               naOK = true;
                                               returnFunction(true);
                }, msgTitle, msgBtnValue);

        }
    } catch (e) {
        errorHandler("showModulePaymentInaccessible", e);
        returnFunction(false);
    }
}

function showModulePaymentInaccessible(event, returnFunction) {
    try {
        if (naOK === true) {
            naOK = false;
            event.preventDefault();
            event.stopPropagation();
            hidePleaseWait;
            msgStr = resources.modulePayment;
            msgTitle = resources.moduleAccess;
            msgBtnValue = resources.btnOk;
            if (supressWarningMsgs === false) {
                navigator.notification.confirm(msgStr, function() {
                                               hidePleaseWait();
                                               naOK = true;
                                               returnFunction(true);
                                               }, msgTitle, msgBtnValue);
            }
        }
    } catch (e) {
        errorHandler("showModulePaymentInaccessible", e);
        returnFunction(false);
    }
}

function showModuleExemptInaccessible(event, returnFunction) {
    try {
        if (naOK === true) {
            naOK = false;
            event.preventDefault();
            event.stopPropagation();
            hidePleaseWait;
            msgTitle = resources.moduleAccess;
            msgBtnValue = resources.btnOk;
            msgStr = resources.moduleExempt;
            if (supressWarningMsgs === false) {
                navigator.notification.confirm(msgStr, function() {
                                               hidePleaseWait();
                                               naOK = true;
                                               returnFunction(true);
                                               }, msgTitle, msgBtnValue);
            }
        }
    } catch (e) {
        errorHandler("showModuleExemptInaccessible", e);
        returnFunction(false);
    }
}

function displayModuleCertificate(returnFunction) {
    try {
        showPleaseWait();
        if (activeModule.moduleurl !== undefined && activeModule.moduleurl.length > 0) {
            openCertificate(function() {
                            returnFunction(true);
                            });
        } else {
            msgStr = resources.moduleCertificateAccess;
            msgTitle = resources.moduleAccess;
            msgBtnValue = resources.btnOk;
            if (supressWarningMsgs === false) {
                navigator.notification.confirm(msgStr, function() {
                                               hidePleaseWait();
                                               naOK = true;
                                               //returnFunction(true);
                                               }, msgTitle, msgBtnValue);
            }
        }
    } catch (e) {
        returnFunction(false);
    }
}

function requestModuleCertificate(returnFunction) {
    try {
        showPleaseWait();
        var displayCertificate = false;
        activeModule.requestCertificate(function(ret) {
                                        msgBtnValue = resources.btnOk;
                                        msgTitle = resources.moduleCertificateRequest;
                                        if (ret === true) {
                                        msgStr = resources.moduleCertificateSuccess;
                                        displayCertificate = true;
                                        } else {
                                        msgStr = resources.moduleCertificateFail;
                                        }
                                        navigator.notification.confirm(msgStr, function() {
                                                                       hidePleaseWait();
                                                                       naOK = true;
                                                                       if (displayCertificate === true) {
                                                                       //activeModule.status = "Completed";
                                                                       resetStatusDisplay("module");
                                                                       completeBookingOTA(courseStatus.Completed);
                                                                       if (activeModule.moduleurl === "" && activeModule.moduleurl.length === 0) {
                                                                       var modUrl = configs.getCustom("CS_ECERTIFICATE_URL");
                                                                       modUrl += activeModule.basemoduleid + "-" + activeUser.userId + "-" + userPortalId + ".pdf";
                                                                       activeModule.moduleurl = modUrl;
                                                                       }
                                                                       displayModuleCertificate(function(retVal) {
                                                                                                returnFunction(retVal);
                                                                                                });
                                                                       } else {
                                                                       returnFunction(true);
                                                                       }
                                                                       }, msgTitle, msgBtnValue);
                                        });
    } catch (e) {
        returnFunction(false);
    }
}

function downloadPDF(fileObject) {
    try {
        if (fileObject != undefined) {
            var courseDir = activeCourse.courseid.toString();
            if(docsFileDir!=undefined){
                docsFileDir.getDirectory(courseDir, {
                                         create: true,
                                         exclusive: false
                                         }, function(dir) {
                                         activeCourse.pdfFileGet(dir, fileObject.filename);
                                         }, function() {});
            }else{
                courseDir = activeCourse.courseid.toString();
                mediaDataDir.getDirectory(courseDir, {
                                          create: true,
                                          exclusive: false
                                          }, function(dir) {
                                          activeCourse.pdfFileGet(dir, fileObject.filename);
                                          }, function() {});
            }
            
            
        }
    } catch (e) {
        errorHandler("downloadPDF", e);
    }
}

function coursePaymentRequired() {
    try {
        
        if (naOK === true) {
            naOK = false;
            event.preventDefault();
            event.stopPropagation();
            hidePleaseWait;
            msgStr = resources.coursePayment;
            msgTitle = resources.courseAccess;
            msgBtnValue = resources.btnOk;
            if (supressWarningMsgs === false) {
                navigator.notification.confirm(msgStr, function() {
                                               hidePleaseWait();
                                               naOK = true;
                                               }, msgTitle, msgBtnValue);
            }
        }
    } catch (e) {
        errorHandler("coursePaymentRequired", e);
    }
}

function showModuleBook(event, returnFunction) {
    try {
        $("#lessonhead").html("");
        $("#lessonheaderdiv").hide();
        event.preventDefault();
        if (moduleBookOK === true) {
          //console.log("if");
            showPleaseWait();
            if (activeModule != undefined) {
                var moduleElId = "#module-" + activeModule.courseid + "-" + activeModule.basemoduleid;
                if ($(moduleElId) != undefined) {
                    if (menuScroller != undefined) {
                        setTimeout(function() {
                                   setPagePadderDiv("scheduleScroller", true);
                                   menuScroller.scrollToElement(moduleElId, 300);
                                   }, 100);
                        setActiveClass("module");
                    }
                }
            }
            
            $(".coursemenupanel").panel("close");
            resetMenuOpenName();
            setActiveClass("module");
            var id = "module-" + activeModule.courseid + "-" + activeModule.basemoduleid;
            var showContentFirstLoad = loadFirstSave;
            loadFirstSave = false;
            
            $(".headericondivlhs").show();
            $(".courseiconlhs").show();
            $(".moduleiconlhs").show();
            $(".lessoniconlhs").hide();
            
            $("#bookingdatediv").hide();
            $("#theorydatacontent").html("");
            $("#theorydatacontent").hide();
            $("#audiotheoryplayerdiv").hide();
            $("#bookingcontent").show();
            $("#wscontentnavdiv").hide();
            $("#contentnavdiv").hide();
            $("#initialcontent").hide();
            $("#bookingsul").empty();
            $("#bookingheader").html("");
            $("#bookingdisclaimerdiv").hide();
            $("#assessmentresultdiv").html("");
            $("#assessmentresultdiv").removeClass("noschedules");
            $("#assessmentresultdiv").removeClass("assessresults");
            $("#bookingdetaildivmain").removeClass("dateboxshow");
            
            $("#bookingheader").on("touchmove",function(e){e.preventDefault();});
            $("#bookingdatediv").on("touchmove",function(e){e.preventDefault();});
            
            if (retinaDisplay===true) {
                $("#bookingheader").addClass("retina");
            }
            setPagePadderDiv("contentScroller", true);
            if (activeModule != undefined) {
                if (activeModule.status == courseStatus.Completed) {
                    $("#theoryviewheader").html(resources.assessmentHead);
                    $("#theoryviewheader").removeClass("noicon");
                    $("#bookingcontent").show();
                    $("#bookingdatediv").hide();
                    $("#bookingheader").hide();
                    $("#bookingdetaildiv").hide();
                    $("#assessmentresultdiv").show();
                    if (contentScroller != undefined) {
                        contentScroller.enable();
                    }
                    if (moduleBookOK === true) {
                        moduleBookOK = false;
                        activeModule.getAssessmentResult(function(ret) {
                                                         setTimeout(function() {
                                                                    moduleBookOK = true;
                                                                    }, 1200);
                                                         if (ret === "offline") {
                                                         msgTitle = resources.connError;
                                                         msgBtnValue = resources.btnOk;
                                                         msgStr = resources.moduleAssessmentOffline;
                                                         navigator.notification.confirm(msgStr, function() {
                                                                                        hidePleaseWait();
                                                                                        returnFunction(true);
                                                                                        }, msgTitle, msgBtnValue);
                                                         } else {
                                                         if (ret != undefined) {
                                                         activeSection = undefined;
                                                         activeSCO = undefined;
                                                         setUserPosition(false, "#coursepage", true);
                                                         $("#assessmentresultdiv").addClass("assessresults");
                                                         var assessTitle =resources.assessmentresults;
                                                         ret=ret.replace("Assessment Results", resources.assessmentresults);
                                                         
                                                         ret = ret.replace("Assessment Summary", resources.assessmentsummary);
                                                         
                                                         ret=ret.replace("Student Name", resources.studentname);
                                                         ret=ret.replace("User Name", resources.loginfieldsusername);
                                                         ret=ret.replace("Enrolement Date", resources.enrolmentdate);
                                                         ret=ret.replace("Completion Date", resources.completiondate);
                                                         
                                                         ret=ret.replace("Action Plan", resources.actionplan);
                                                         ret=ret.replace("Result", resources.resulttext);
                                                         ret=ret.replace("Module Title", resources.moduletitle);
                                                         ret=ret.replace("Feedback", resources.feedback);
                                                         ret=ret.replace("Assessor", resources.assessor);
                                                         ret=ret.replace("Result", resources.resulttext);
                                                         ret=ret.replace("Internal Verifier", resources.internalverifier);
                                                         ret=ret.replace("Feedback", resources.feedback);
                                                         ret=ret.replace("Date Marked", resources.datemarked);
                                                         ret=ret.replace("Sections", resources.sections);
                                                         ret=ret.replace("Result", resources.resulttext);
                                                         ret=ret.replace("Feedback", resources.feedback);
                                                         ret=ret.replace("Date Marked", resources.datemarked);
                                                         resetMenuOpenName();
                                                         $("#lessonheaderdiv").show();
                                                         $("#lessonhead").html(activeModule.title);
                                                         $("#lessonheadclosebtn").addClass("assessresults");
                                                         $("#assessmentresultdiv").html(ret);
                                                         $("#assessmentresultdiv").trigger("refresh");
                                                         setPagePadderDiv("contentScroller", true);
                                                         hidePleaseWait();
                                                         }
                                                         }
                                                         });
                    }
                } else {
                    $("#bookingcontent").show();
                    $("#bookingheader").show();
                    $("#bookingdetaildiv").show();
                    $("#assessmentresultdiv").hide();
                    if (contentScroller != undefined) {
                        contentScroller.disable();
                    }
                    if (retinaDisplay===true) {
                        $("#bookingcontent").addClass("retina");
                        $(".datacontent").addClass("retinacontent");
                        $("#theoryviewheader").addClass("retinatvh");
                        if (iphone5 === true) {
                            $("#bookingcontent").addClass("iphone5");
                        }
                    }
                    $("#theoryviewheader").html(resources.bookingHead);
                    $("#theoryviewheader").addClass("noicon");
                    if (moduleBookOK === true) {
                        moduleBookOK = false;
                        resetMenuOpenName();
                        activeModule.getAssessmentSchedules(function(ret) {
                          //console.log("hi");
                                                            setTimeout(function() {
                                                                       moduleBookOK = true;
                                                                       }, 1200);
                                                            if (ret === "offline") {
                                                            $("#bookingsul").html("");
                                                            msgTitle = resources.connError;
                                                            msgBtnValue = resources.btnOk;
                                                            msgStr = resources.moduleBookOffline;
                                                            navigator.notification.confirm(msgStr, function() {
                                                                                           hidePleaseWait();
                                                                                           returnFunction(true);
                                                                                           }, msgTitle, msgBtnValue);
                                                            } else {
                                                            activeSection = undefined;
                                                            activeSCO = undefined;
                                                            setUserPosition(false, "#coursepage", true);
                                                            if (activeModule.assessmentschedules != undefined && activeModule.assessmentschedules.length > 0) {
                                                            activeModule.getAssessmentSchedulesListView(function(ret) {
                                                                    
                                                                                                        var bookingHeader = "";
                                                                                                        if (activeModule.hasbooking===true) {
                                                                                                        $("#bookingcontent").addClass("actualbookhead");
                                                                                                        msgStr = resources.bookingHeaderBooked;
                                                                                                        bookingHeader = msgStr + activeModule.title;
                                                                                                        $("#bookingheader").html(bookingHeader);
                                                                                                        $("#bookingdatediv").hide();
                                                                                                        $("#bookingdisclaimerdiv").show();
                                                                                                        hidePleaseWait();
                                                                                                        } else {
                                                                                                        $("#bookingdisclaimerdiv").hide();
                                                                                                        msgStr = resources.bookingHeaderAvailable;
                                                                                                        bookingHeader = msgStr + activeModule.title;
                                                                                                        $("#bookingheader").html(bookingHeader);
                                                                                                        $("#bookingcontent").removeClass("actualbookhead");
                                                                                                        
                                                                                                        $("#bookingdatediv").show();
                                                                                                        $("#bookingdetaildivmain").addClass("dateboxshow");
                                                                                                        scheduleDates = [];
                                                                                                        scheduleDatesFull = [];
                                                                                                        scheduleDates = activeModule.scheduledates == undefined ? [] : activeModule.scheduledates;
                                                                                                        scheduleDatesFull = activeModule.schedulefulldates == undefined ? [] : activeModule.schedulefulldates;
                                                                                                        var scheduleDatesAltOptions = scheduleDatesFull.length === 0 ? false : scheduleDatesFull;
                                                                                                        var scheduleDatesOptions = scheduleDates.length === 0 ? false : scheduleDates;
                                                                                                        $("#bookingdate").datebox({
                                                                                                                                  mode: "calbox",
                                                                                                                                  afterToday: true,
                                                                                                                                  useInlineBlind: true,
                                                                                                                                  useTodayButon: true,
                                                                                                                                  useButton: false,
                                                                                                                                  highDatesAlt: scheduleDatesAltOptions,
                                                                                                                                  highDates: scheduleDates
                                                                                                                                  });
                                                                                                        $("#bookingdate").datebox("refresh");
                                                                                                        dateOK = true;
                                                                                                        $("#bookingdatediv .ui-input-text").removeClass("ui-shadow-inset").removeClass("ui-btn-shadow").removeClass("ui-corner-all").removeClass("ui-body-d");
                                                                                                        
                                                                                                        }
                                                                                                        $("#bookingsul").html(ret);
                                                                                                        $("#bookingsul").trigger("create");
                                                                                                        $("#bookingsul").listview();
                                                                                                        $("#bookingsul").listview("refresh");
                                                                                                        hidePleaseWait();
                                                                                                        var height = 0;
                                                                                                        setPagePadderDiv("scheduleScroller", true);
                                                                                                        if (device.platform === "Android") {
                                                                                                        $("#bookingsul").addClass("bookandroid");
                                                                                                        }
                                                                                                        $(".schedulebookbtn").off("vclick");
                                                                                                        $(".viewschedulebookbtn").off("vclick");
                                                                                                        $(".cancelschedulebookbtn").off("vclick");
                                                                                                        $(".nocancelschedulebookbtn").off("vclick");
                                                                                                        $(".attendschedulebookbtn").off("vclick");
                                                                                                        $(".showPassowrdBooking").off("vclick");
                                                                                                        $(".copyClipBooking").off("vclick");
                                                                                                        $(".schedulebookbtn").on("vclick", function(event) {
                                                                                                                                 bookSchedule(event);
                                                                                                                                 });
                                                                                                        $(".viewschedulebookbtn").on("vclick", function(event) {
                                                                                                                                     currentBookSchedule = $(event.currentTarget).attr("id");
                                                                                                                                     event.preventDefault();
                                                                                                                                     event.stopPropagation();
                                                                                                                                     viewBookSchedule(currentBookSchedule);
                                                                                                                                     });
                                                                                                        $(".cancelschedulebookbtn").on("vclick", function(event) {
                                                                                                                                       cancelBookSchedule(event);
                                                                                                                                       });
                                                                                                        $(".nocancelschedulebookbtn").on("vclick", function(event) {
                                                                                                                                         noCancelBookSchedule(event);
                                                                                                                                         });
                                                                                                        $(".attendschedulebookbtn").on("vclick", function(event) {
                                                                                                                                         attendScheduleBook(event);
                                                                                                                                         });
                                                                                                        $(".showPassowrdBooking").on("vclick", function(event) {
                                                                                                                                         showPassowrdBooking(event);
                                                                                                                                         });
                                                                                                        $(".copyClipBooking").on("vclick", function(event) {
                                                                                                                                          copyClipBooking(event);
                                                                                                                                          });
                                                                                                        setPagePadderDiv("scheduleScroller", true);
                                                                                                        setPagePadderDiv("contentscroller", true);
                                                                                                        if (activeModule.hasbooking === false) {
                                                                                                        hidePleaseWait();
                                                                                                        dateOK = true;
                                                                                                        $("#bookingdate").on("datebox", function(event, payload) {
                                                                                                                             if (payload.method == "set") {
                                                                                                                             if (dateOK===true) {
                                                                                                                             dateOK = false;
                                                                                                                             if (payload.value != undefined) {
                                                                                                                             var ds = payload.value.split("/");
                                                                                                                             var day = ds[0];
                                                                                                                             var month = ds[1];
                                                                                                                             var year = ds[2];
                                                                                                                             if (day.length == 1) {
                                                                                                                             day = "0" + day;
                                                                                                                             }
                                                                                                                             if (month.length == 1) {
                                                                                                                             month = "0" + month;
                                                                                                                             }
                                                                                                                             var datecheck = year + "-" + month + "-" + day;
                                                                                                                             msgTitle = resources.bookings;
                                                                                                                             msgBtnValue = resources.btnOk;
                                                                                                                             if ($.inArray(payload.value, scheduleDatesFull) > -1 || $.inArray(datecheck, scheduleDatesFull) > -1) {
                                                                                                                             msgStr = resources.bookingFull;
                                                                                                                             navigator.notification.confirm(msgStr, function() {
                                                                                                                                                            dateOK = true;
                                                                                                                                                            }, msgTitle, msgBtnValue);
                                                                                                                             } else {
                                                                                                                             if ($.inArray(payload.value, scheduleDates) == -1 && $.inArray(datecheck, scheduleDates) == -1) {
                                                                                                                             msgStr = resources.bookingUnavailable;
                                                                                                                             navigator.notification.confirm(msgStr, function() {
                                                                                                                                                            dateOK = true;
                                                                                                                                                            
                                                                                                                                                            $("#bookingdatediv").show();
                                                                                                                                                            $(".ui-datebox-container").show();
                                                                                                                                                            
                                                                                                                                                            }, msgTitle, msgBtnValue);
                                                                                                                             } else {
                                                                                                                             var dateId = payload.value.indexOf("/") > -1 ? datecheck : payload.value;
                                                                                                                             var bookElId = "#libook-" + dateId;
                                                                                                                             var itemsId = ".schedules-" + dateId;
                                                                                                                             $(".scheduleitem").removeClass("book-active-state");
                                                                                                                             $(itemsId).addClass("book-active-state");
                                                                                                                             if (scheduleScroller != undefined) {
                                                                                                                             setPagePadderDiv("scheduleScroller", false);
                                                                                                                             setTimeout(function() {
                                                                                                                                        scheduleScroller.scrollToElement(bookElId, 300);
                                                                                                                                        dateOK = true;
                                                                                                                                        }, 300);
                                                                                                                             }
                                                                                                                             }
                                                                                                                             }
                                                                                                                             }
                                                                                                                             }
                                                                                                                             }
                                                                                                                             });
                                                                                                        } else {
                                                                                                        hidePleaseWait();
                                                                                                        }
                                                                                                        });
                                                            } else {
                                                            $("#bookingdatediv").hide();
                                                            $("#bookingdetaildiv").hide();
                                                            $("#assessmentresultdiv").show();
                                                            $("#assessmentresultdiv").addClass("noschedules");
                                                            $("#assessmentresultdiv").html("<div class='noschedules'>" + resources.noSchedules + "</div>");
                                                            hidePleaseWait();
                                                            }
                                                            }
                                                            });
                    }
                }
            }
            if (showContentFirstLoad===true) {
                resetMenuOpenName();
                setTimeout(function() {
                           $("#bookingcontent").show();
                           }, 600);
            }
            returnFunction(true);
        } else {
            returnFunction(true);
        }
    } catch (e) {
        errorHandler("showModuleBook", e);
    }
}

function bookSchedule(event) {
    /*try {
        event.preventDefault();
        event.stopPropagation();
        var id = $(event.currentTarget).attr("id");
        var ids = id.split("-");
        console.log(id);
        var assessmentScheduleId = ids[1];
        var assessmentItemId = ids[2];
        console.log(assessmentScheduleId +" "+assessmentItemId)
        if (deviceIsOnline === false) {
            msgTitle = resources.bookings;
            msgBtnValue = resources.btnOk;
            msgStr = resources.connectionFail;
            if (supressWarningMsgs === false) {
                navigator.notification.confirm(msgStr, function() {
                                               hidePleaseWait();
                                               }, msgTitle, msgBtnValue);
            }
        } else {
            if($('#' + id).hasClass('restrictbooking')){
                msgTitle = resources.bookings;
                msgBtnValue = resources.btnOk;
                msgStr = resources.restrictBooking;
                navigator.notification.confirm(msgStr, function() {
                                               hidePleaseWait();
                                               }, msgTitle, msgBtnValue);
            }
            else if($('#' + id).hasClass('paynbook')){
              //console.log($('#'+id).parent().attr('id'));
              var callToBook = $('#'+id).parent().attr('id');
                msgTitle = resources.bookings;
                msgBtnValue = resources.btnCancelBookPaynBook;
                msgStr = resources.PayNBookBooking;
                navigator.notification.confirm(msgStr, function(choice) {
                  if(choice===2){
                    payrent1(callToBook);
                  }
                                               
                }, msgTitle, msgBtnValue);
            }
            else{
                msgTitle = resources.bookings;
                msgBtnValue = resources.btnCancelBook;
                msgStr = resources.bookingConfirm;
                navigator.notification.confirm(msgStr, function(choice) {
                                              if (choice === 2) {
                                               showPleaseWait();
                                               var msgBtnOk = resources.btnOk;
                                               var msgStrSubmit = resources.bookingSuccess;
                                               msgStr = resources.bookingConfirm;
                                               activeModule.assessmentBookingCreate(assessmentItemId, assessmentScheduleId, function(ret) {
                                               // console.log(ret);
                                                if (ret == true) {
                                                navigator.notification.confirm(msgStrSubmit, function() {
                                                                                var status = courseStatus.InProgress;
                                                                                //completeBooking(status);
                                                                                alert("true");
                                                                                refreshMenu("refresh");
                                                                                naOK = true;
                                                                                }, msgTitle, msgBtnOk);
                                                } else {
                                                msgStrSubmit = resources.bookingFail;
                                                navigator.notification.confirm(msgStrSubmit, function() {
                                                                                hidePleaseWait();
                                                                                naOK = true;
                                                                                }, msgTitle, msgBtnOk);
                                                }
                                                });
                                               }
                                               }, msgTitle, msgBtnValue);
            }
            function payrent1(callToBook)
            {
              document.location.href = "tel:"+callToBook;
            }
        }
    } catch (e) {
        errorHandler("bookSchedule", e);
    }*/
    try {
        event.preventDefault();
        event.stopPropagation();
        var id = $(event.currentTarget).attr("id");
        var ids = id.split("-");
        console.log(id);
        var assessmentScheduleId = ids[1];
        var assessmentItemId = ids[2];
        //console.log(assessmentScheduleId +" "+assessmentItemId);
        var GetAssessmentScheduleseTeacher = window.localStorage.getItem("GetAssessmentSchedules");
        var GetAssessmentSchedulesParseeTeacher = JSON.parse(GetAssessmentScheduleseTeacher);
        var BookingMsg = window.localStorage.getItem("BookingMessage");
        //alert(BookingMsg)
        if (deviceIsOnline === false) {
            msgTitle = resources.bookings;
            msgBtnValue = resources.btnOk;
            msgStr = resources.connectionFail;
            if (supressWarningMsgs === false) {
                navigator.notification.confirm(msgStr, function() {
                                               hidePleaseWait();
                                               }, msgTitle, msgBtnValue);
            }
        } else {
            if($('#' + id).hasClass('restrictbooking')){
                msgTitle = resources.bookings;
                msgBtnValue = resources.btnOk;
                msgStr = resources.restrictBooking;
                navigator.notification.confirm(msgStr, function() {
                                               hidePleaseWait();
                                               }, msgTitle, msgBtnValue);
            }
            else if($('#' + id).hasClass('paynbook')){
              //console.log($('#'+id).parent().attr('id'));
              var callToBook = $('#'+id).parent().attr('id');
             
                msgTitle = resources.bookbtntxtPayToBook;
                msgBtnValue = resources.btnCancelBookPaynBook;
                msgStr = BookingMsg;
                navigator.notification.confirm(msgStr, function(choice) {
                  if(choice===2){
                    payrent1(callToBook);
                  }
                                               
                }, msgTitle, msgBtnValue);
            }
            else if($('#' + id).hasClass('wthMsg')){
                if(BookingMsg != "null"){
                    //alert("in if");
                    msgTitle = resources.bookings;
                    msgBtnValue = resources.btnCancelBook;
                    msgStr = BookingMsg;
                    navigator.notification.confirm(msgStr, function(choice) {
                        if (choice === 2) {
                        showPleaseWait();
                        var msgBtnOk = resources.btnOk;
                        var msgStrSubmit = resources.bookingSuccess;
                        msgStr = resources.bookingConfirm;
                        activeModule.assessmentBookingCreate(assessmentItemId, assessmentScheduleId, function(ret) {
                        // console.log(ret);
                                if (ret == true) {
                                navigator.notification.confirm(msgStrSubmit, function() {
                                                                var status = courseStatus.InProgress;
                                                                completeBooking(status);
                                                                naOK = true;
                                                                }, msgTitle, msgBtnOk);
                                } else {
                                msgStrSubmit = resources.bookingFail;
                                navigator.notification.confirm(msgStrSubmit, function() {
                                                                hidePleaseWait();
                                                                naOK = true;
                                                                }, msgTitle, msgBtnOk);
                                }
                                });
                        }
                        }, msgTitle, msgBtnValue);
                    }
                    else{
                        //alert("in else");
                    msgTitle = resources.bookings;
                    msgBtnValue = resources.btnCancelBook;
                    msgStr = resources.bookingConfirm;
                    navigator.notification.confirm(msgStr, function(choice) {
                    if (choice === 2) {
                    showPleaseWait();
                    var msgBtnOk = resources.btnOk;
                    var msgStrSubmit = resources.bookingSuccess;
                    msgStr = resources.bookingConfirm;
                    activeModule.assessmentBookingCreate(assessmentItemId, assessmentScheduleId, function(ret) {
                    // console.log(ret);
                            if (ret == true) {
                            navigator.notification.confirm(msgStrSubmit, function() {
                                                            var status = courseStatus.InProgress;
                                                            completeBooking(status);
                                                            naOK = true;
                                                            }, msgTitle, msgBtnOk);
                            } else {
                            msgStrSubmit = resources.bookingFail;
                            navigator.notification.confirm(msgStrSubmit, function() {
                                                            hidePleaseWait();
                                                            naOK = true;
                                                            }, msgTitle, msgBtnOk);
                            }
                            });
                    }
                    }, msgTitle, msgBtnValue);
                    }
            }
            else{
                /*if(BookingMsg != "null"){
                //alert("in if");
                msgTitle = resources.bookings;
                msgBtnValue = resources.btnCancelBook;
                msgStr = BookingMsg;
                navigator.notification.confirm(msgStr, function(choice) {
                    if (choice === 2) {
                    showPleaseWait();
                    var msgBtnOk = resources.btnOk;
                    var msgStrSubmit = resources.bookingSuccess;
                    msgStr = resources.bookingConfirm;
                    activeModule.assessmentBookingCreate(assessmentItemId, assessmentScheduleId, function(ret) {
                    // console.log(ret);
                            if (ret == true) {
                            navigator.notification.confirm(msgStrSubmit, function() {
                                                            var status = courseStatus.InProgress;
                                                            completeBooking(status);
                                                            naOK = true;
                                                            }, msgTitle, msgBtnOk);
                            } else {
                            msgStrSubmit = resources.bookingFail;
                            navigator.notification.confirm(msgStrSubmit, function() {
                                                            hidePleaseWait();
                                                            naOK = true;
                                                            }, msgTitle, msgBtnOk);
                            }
                            });
                    }
                    }, msgTitle, msgBtnValue);
                }*/
                //else{
                    //alert("in else");
                msgTitle = resources.bookings;
                msgBtnValue = resources.btnCancelBook;
                msgStr = resources.bookingConfirm;
                navigator.notification.confirm(msgStr, function(choice) {
                if (choice === 2) {
                showPleaseWait();
                var msgBtnOk = resources.btnOk;
                var msgStrSubmit = resources.bookingSuccess;
                msgStr = resources.bookingConfirm;
                activeModule.assessmentBookingCreate(assessmentItemId, assessmentScheduleId, function(ret) {
                // console.log(ret);
                        if (ret == true) {
                        navigator.notification.confirm(msgStrSubmit, function() {
                                                        var status = courseStatus.InProgress;
                                                        completeBooking(status);
                                                        naOK = true;
                                                        }, msgTitle, msgBtnOk);
                        } else {
                        msgStrSubmit = resources.bookingFail;
                        navigator.notification.confirm(msgStrSubmit, function() {
                                                        hidePleaseWait();
                                                        naOK = true;
                                                        }, msgTitle, msgBtnOk);
                        }
                        });
                }
                }, msgTitle, msgBtnValue);
                //}
            }
            function payrent1(callToBook)
            {
              document.location.href = "tel:"+callToBook;
            }
        }
    } catch (e) {
        errorHandler("bookSchedule", e);
    }
}

function completeBooking(status) {
    try {
        activeModule.updateModuleStatus(status, function() {
                                        refreshMenu("refreshonly");
                                        //refreshMenu("refresh");
                                        });
    } catch (e) {
        errorHandler("completeBooking", e);
    }
}

function completeBookingOTA(status) {
    try {
        activeModule.updateModuleStatus(status, function() {
                                        //refreshMenu("refreshonly");
                                        //refreshMenu("refresh");
                                        });
    } catch (e) {
        errorHandler("completeBookingOTA", e);
    }
}

function cancelBookSchedule(event) {
    try {
        event.preventDefault();
        event.stopPropagation();
        var id = $(event.currentTarget).attr("id");
        var ids = id.split("-");
        var assessmentScheduleId = ids[1];
        var assessmentItemId = ids[2];
        var bookingId = ids[3];
        if (deviceIsOnline === false) {
            msgTitle = resources.bookings;
            msgBtnValue = resources.btnOk;
            msgStr = resources.connectionFail;
            if (supressWarningMsgs === false) {
                navigator.notification.confirm(msgStr, function() {
                                               hidePleaseWait();
                                               }, msgTitle, msgBtnValue);
            }
        } else {
            msgTitle = resources.bookings;
            msgBtnValue = resources.btnYesNo;
            msgStr = resources.bookingConfirmCancel;
            if (supressWarningMsgs === false) {
                navigator.notification.confirm(msgStr, function(choice) {
                                               if (choice === 2) {
                                               showPleaseWait();
                                               msgBtnValue = resources.btnOk;
                                               activeModule.assessmentBookingDelete(assessmentItemId, assessmentScheduleId, bookingId, function(ret) {
                                                    if (ret == true) {
                                                    msgStr = resources.bookingCancelSuccess;
                                                    msgTitle = resources.bookings;
                                                    navigator.notification.confirm(msgStr, function() {
                                                                                    var status = courseStatus.NotStarted;
                                                                                    completeBooking(status);
                                                                                    //refreshMenu("refresh");
                                                                                    naOK = true;
                                                                                    }, msgTitle, msgBtnValue);
                                                    } else {
                                                    msgStr = resources.bookingCancelFail;
                                                    msgTitle = resources.bookings;
                                                    navigator.notification.confirm(msgStr, function() {
                                                                                    hidePleaseWait();
                                                                                    naOK = true;
                                                                                    }, msgTitle, msgBtnValue);
                                                    }
                                                    });
                                               }
                                               }, msgTitle, msgBtnValue);
            }
        }
    } catch (e) {
        errorHandler("cancelBookSchedule", e);
    }
}

function attendScheduleBook(event) {
    try {
        event.preventDefault();
        event.stopPropagation();
        var id = $(event.currentTarget).attr("id");
        openWebBrowser(id);
    } catch (e) {
        errorHandler("attendScheduleBook", e);
    }
}

function showPassowrdBooking(event){
    try {
        event.preventDefault();
        console.log($(event.currentTarget).attr('alt'));
        var PasswordCurrentEle = $(event.currentTarget).attr('alt');
        var idCurrentEle = $(event.currentTarget).attr('id');
        var id= "#"+idCurrentEle;
        var headId = "#head"+idCurrentEle;
        $(headId).width('56%');
        var hidePassword ="#hidebooking-"+idCurrentEle;
        $(hidePassword).remove();
        navigator.notification.activityStart("Copy", "Password copying to clipboard");
        var copyText = PasswordCurrentEle;
        var input = document.createElement('input');
        input.setAttribute('value', copyText);
        document.body.appendChild(input);
        input.select();
        var result = document.execCommand('copy');
        document.body.removeChild(input);
        console.log(result);
        setTimeout(function() {
        	navigator.notification.activityStop();
        }, 2000);
        $(id).after("<div id="+PasswordCurrentEle+" class=copyClipBooking style='float:left;font-size: 0.8em;padding-top: 12px;'>"+PasswordCurrentEle+"</div><img id="+idCurrentEle+" alt="+PasswordCurrentEle+" style='padding-left: 7px;display:block;height: 21px;float: left;padding-top:4px;' class='copyClipBooking' src='css/client/images/passwordShow.png' >").remove();
    } catch (e) {
        errorHandler("showPassowrdBooking", e);
    }
}




$(document).off("vclick","img.copyClipBooking");
$(document).on("vclick","img.copyClipBooking", function(event) {
    try{
        event.preventDefault();
        console.log($(this).attr('alt'));
        var PasswordCurrentEle = $(this).attr('alt');
        var EmptyPass = "#"+PasswordCurrentEle;
        var idCurrentEle = $(this).attr('id');
        var id= "#"+idCurrentEle;
        var headId = "#head"+idCurrentEle;
        $(headId).width('56%');
        $(EmptyPass).remove('');
       //  <img id="'+CurrentEclasses[i].eClassBookingId+'" alt="'+CurrentEclasses[i].ZoomMeetingPassword+'" style="display:none;height: 21px;float: left;" class="'+showPassowrd+'" src="css/client/images/passwordHide.png" >

        $(id).after("<div id=hidebooking-"+idCurrentEle+" style='float:left;font-size: 0.8em;padding-top: 13px;letter-spacing: 3px;'>******</div><img id="+idCurrentEle+" alt="+PasswordCurrentEle+" style='padding-left:3px;height: 21px;float: left;width: 23px;padding-top: 7px;' class=showPassowrdBookingDocument src='css/client/images/passwordHide.png' >").remove();
    }catch (e) {
        errorHandler("copyClipBooking", e);
    }
});

$(document).off("vclick","img.showPassowrdBookingDocument");
$(document).on("vclick","img.showPassowrdBookingDocument", function(event) {
    try{
        event.preventDefault();
        console.log($(event.currentTarget).attr('alt'));
        var PasswordCurrentEle = $(event.currentTarget).attr('alt');
        var idCurrentEle = $(event.currentTarget).attr('id');
        var id= "#"+idCurrentEle;
        var headId = "#head"+idCurrentEle;
        $(headId).width('56%');
        var hidePassword ="#hidebooking-"+idCurrentEle;
        $(hidePassword).remove();
        navigator.notification.activityStart("Copy", "Password copying to clipboard");
        var copyText = PasswordCurrentEle;
        var input = document.createElement('input');
        input.setAttribute('value', copyText);
        document.body.appendChild(input);
        input.select();
        var result = document.execCommand('copy');
        document.body.removeChild(input);
        console.log(result);
        setTimeout(function() {
            navigator.notification.activityStop();
        }, 2000);
        $(id).after("<div id="+PasswordCurrentEle+" class=copyClipBooking style='float:left;font-size: 0.8em;padding-top: 13px;'>"+PasswordCurrentEle+"</div><img id="+idCurrentEle+" alt="+PasswordCurrentEle+" style='padding-left: 7px;display:block;height: 21px;float: left;padding-top:5px' class='copyClipBooking' src='css/client/images/passwordShow.png' >").remove();
    }catch (e) {
        errorHandler("showPassowrdBookingDocument", e);
    }
});

function noCancelBookSchedule(event){
    try {
        event.preventDefault();
        event.stopPropagation();
        msgTitle = resources.bookings;
        msgBtnValue = resources.btnOk;
        msgStr = resources.bookingCancelWarning;
        if (supressWarningMsgs === false) {
            navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
        }
    } catch (e) {
        errorHandler("noCancelBookSchedule", e);
    }
}

function viewBookSchedule(id) {
    try {
        var ids = id.split("-");
        venueAssessmentScheduleId = ids[1];
        goToPage("#venuedetailpage");
    } catch (e) {
        errorHandler("viewBookSchedule", e);
    }
}

function setUserPosition(firstSave, pageid, syncPosition) {
    try {
        var courseid = 0;
        var modulegroupid = 0;
        var moduleid = 0;
        var sectionid = 0;
        var assetid = 0;
        var existingPageId = "";
        var issuetab = "";
        var issueid = "";
        var nodekey = "";
        var updatePodState = false;
        if (pageLoad === "#mainhomepage" || (firstSave === false && pageid === pageLoad) || firstSave === true || (pageid === "video" || pageid === "audio" || pageid === "course")) {
            if (loadIds != undefined) {
                courseid = loadIds.courseid;
                modulegroupid = loadIds.modulegroupid;
                moduleid = loadIds.moduleid;
                sectionid = loadIds.sectionid;
                assetid = loadIds.assetid;
                existingPageId = firstSave === true ? loadIds.pageid : pageid;
                issuetab = loadIds.issuetab;
                issueid = loadIds.issueid;
                nodekey = loadIds.nodekey;
            }
            prevLoadIds = loadIds;
            if (pageid === "audio" || pageid === "video") {
                updatePodState = false;
                existingPageId = "#podcastpage";
            }
            var newcourseid = (activeCourse == undefined) ? 0 : activeCourse.courseid;
            var newmodulegroupid = (activeModuleGroup == undefined) ? 0 : activeModuleGroup.modulegroupid;
            var newmoduleid = (activeModule == undefined) ? 0 : activeModule.basemoduleid;
            var newsectionid = (activeSection == undefined) ? 0 : activeSection.theorymodulesectionid;
            var newassetid = (activeSCO == undefined) ? 0 : activeSCO.assetid;
            if (activeSCO !== undefined && nodekey.length > 0) {
                nodekey = "";
            }
            if (existingPageId === undefined || existingPageId.length === 0) {
                existingPageId = pageid;
            }
            if (firstSave === true && newcourseid === courseid) {
                newmodulegroupid = modulegroupid;
                newmoduleid = moduleid;
                newsectionid = sectionid;
                newassetid = assetid;
            } else {
                if (newcourseid === 0) {
                    newmodulegroupid = 0;
                    newmoduleid = 0;
                    newsectionid = 0;
                    newassetid = 0;
                    nodekey = "";
                } else {
                    if (newcourseid !== courseid) {
                        newmodulegroupid = 0;
                        newmoduleid = 0;
                        newsectionid = 0;
                        newassetid = 0;
                        nodekey = "";
                    } else {
                        if (newmoduleid !== 0 && newmoduleid !== moduleid) {
                            activeModuleGroup = activeCourse.getModuleGroupByModuleId(newmoduleid);
                            if(activeModuleGroup !== undefined){
                                newmodulegroupid = activeModuleGroup.modulegroupid;
                            }
                            newsectionid = 0;
                            newassetid = 0;
                            nodekey = "";
                        } else {
                            if ((newmoduleid !== 0) && (newmoduleid === moduleid) && (newsectionid === 0)) {
                                newsectionid = sectionid;
                                newassetid = assetid;
                                nodekey = "";
                            } else {
                                if ((newsectionid !== 0 && newsectionid === sectionid) && (newassetid === 0 && nodekey !== "Worksheet")) {
                                    newassetid = assetid;
                                    nodekey = "";
                                }
                            }
                        }
                    }
                }
            }
            activeUser.setPosition(newcourseid, newmodulegroupid, newmoduleid, newsectionid, newassetid, existingPageId, issuetab, issueid, nodekey);
            users.save(activeUser);
            loadIds = {
            courseid: newcourseid,
            modulegroupid: newmodulegroupid,
            moduleid: newmoduleid,
            sectionid: newsectionid,
            assetid: newassetid,
            pageid: existingPageId,
            issuetab: issuetab,
            issueid: issueid,
            nodekey: nodekey
            };
            if (pageid === "audio" || pageid === "video") {
                setUserMediaPosition(pageid);
            }
        }
        if (existingPageId !== "#coursepage") {
            updatePodState = false;
        } else {
            if (courseid !== newcourseid || moduleid !== newmoduleid || sectionid !== newsectionid || assetid !== newassetid || nodekey.length > 0) {
                updatePodState = true;
            }
        }
        if (updatePodState === true && syncPosition == true) {
            activeUser.updatePodState(loadIds.courseid, loadIds.moduleid, loadIds.sectionid, loadIds.assetid, loadIds.nodekey, function(ret) {});
        }

       
    } catch (e) {
        errorHandler("setUserPosition", e);
    }
}

function updateUserPosition(userPosObj, returnFunction) {
    try {
        var courseId = 0;
        var moduleGroupId = 0;
        var moduleId = 0;
        var sectionId = 0;
        var assetId = 0;
        var nodeKey = "";
        var updateCourseId = 0;
        var updateModuleGroupId = 0;
        var updateModuleId = 0;
        var updateSectionId = 0;
        var updateAssetId = 0;
        var updateNodeKey = "";
        var updateValues = true;
        if (userPosObj !== null && userPosObj !== undefined) {
            updateCourseId = userPosObj.CourseId;
            updateModuleId = userPosObj.ModuleId;
            updateSectionId = userPosObj.SectionId;
            updateAssetId = userPosObj.AssetId;
            updateNodeKey = userPosObj.NodeKey;
            if (loadIds == undefined) {
                loadIds = {
                courseid: 0,
                modulegroupid:0,
                moduleid: 0,
                sectionid: 0,
                assetid: 0,
                pageid: "",
                issuetab: "",
                issueid: "",
                nodekey: ""
                };
            }
            if (activeUser.savedPosition != undefined) {
                loadIds = {
                courseid: activeUser.savedPosition.courseid == undefined ? 0 : activeUser.savedPosition.courseid,
                modulegroupid: activeUser.savedPosition.modulegroupid == undefined ? 0 : activeUser.savedPosition.modulegroupid,
                moduleid: activeUser.savedPosition.moduleid == undefined ? 0 : activeUser.savedPosition.moduleid,
                sectionid: activeUser.savedPosition.sectionid == undefined ? 0 : activeUser.savedPosition.sectionid,
                assetid: activeUser.savedPosition.assetid == undefined ? 0 : activeUser.savedPosition.assetid,
                pageid: activeUser.savedPosition.pageid == undefined ? "" : activeUser.savedPosition.pageid,
                issuetab: activeUser.savedPosition.issuetab == undefined ? "" : activeUser.savedPosition.issuetab,
                issueid: activeUser.savedPosition.issueid == undefined ? "" : activeUser.savedPosition.issueid,
                nodekey: activeUser.savedPosition.nodekey == undefined ? 0 : activeUser.savedPosition.nodekey
                };
            }
            if (loadIds != undefined) {
                courseId = loadIds.courseid;
                moduleGroupId = loadIds.modulegroupid;
                moduleId = loadIds.moduleid;
                sectionId = loadIds.sectionid;
                assetId = loadIds.assetid;
                nodeKey = loadIds.nodekey;
                if (updateCourseId > 0) {
                    if (updateCourseId !== courseId) {
                        courseId = updateCourseId;
                        moduleId = updateModuleId;
                        sectionId = updateSectionId;
                        assetId = updateAssetId;
                        nodeKey = updateNodeKey;
                    } else {
                        if (updateModuleId !== moduleId) {
                            moduleId = updateModuleId;
                            sectionId = updateSectionId;
                            assetId = updateAssetId;
                            nodeKey = updateNodeKey;
                        } else {
                            if (updateSectionId !== sectionId) {
                                sectionId = updateSectionId;
                                assetId = updateAssetId;
                                nodeKey = updateNodeKey;
                            } else {
                                if (updateAssetId !== assetId && updateNodeKey == "") {
                                    assetId = updateAssetId;
                                    nodeKey = updateNodeKey;
                                } else {
                                    if (updateNodeKey !== nodeKey) {
                                        assetId = updateAssetId;
                                        nodeKey = updateNodeKey;
                                    } else {
                                        updateValues = false;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    updateValues = false;
                }
                
                if (updateValues === true || (activeModuleGroup === undefined || activeModuleGroup.modulegroupid===0)){
                    var existingPageId = loadIds.pageid;
                    var existingIssueTab = loadIds.issuetab;
                    var existingIssueId = loadIds.issueid;


                    if(courseId > 0 && activeCourse !== undefined && activeCourse.courseid !== courseId){
                        activeCourse = portalCourses.getCourseById(courseId);
                    }

                    if(activeCourse!==undefined && moduleId !==undefined && moduleId > 0 && activeModule!== undefined && activeModule.basemoduleid!== moduleId){
                        
                        if(activeModuleGroup !== undefined && activeModuleGroup.modulegroupid !== moduleGroupId){
                            activeModuleGroup = activeCourse.getModuleGroupByModuleId(moduleId);
                            if(activeModuleGroup!== undefined){
                                moduleGroupId = activeModuleGroup.modulegroupid;
                            }
                        }
                    }
                    activeUser.setPosition(courseId, moduleGroupId, moduleId, sectionId, assetId, existingPageId, existingIssueTab, existingIssueId, nodeKey);
                    users.save(activeUser);
                    loadIds = {
                    courseid: courseId,
                    modulegroupid: moduleGroupId,
                    moduleid: moduleId,
                    sectionid: sectionId,
                    assetid: assetId,
                    pageid: existingPageId,
                    issuetab: existingIssueTab,
                    issueid: existingIssueId,
                    nodekey: nodeKey
                    };
                }
            } else {
                updateValues = false;
            }
        } else {
            updateValues = false;
        }
        returnFunction(updateValues);
    } catch (e) {
        returnFunction(false);
    }
}

function setUserMediaPosition(tabname, tabid, categoryid, itemid) {
    try {
        if (tabname == undefined) {
            tabname = "";
        }
        if (tabid == undefined) {
            tabid = "";
        }
        if (categoryid == undefined) {
            categoryid = "";
        }
        if (itemid == undefined) {
            itemid = "";
        }
        if (tabname === "*") {
            tabname = mediaLoadIds.tabname;
        }
        if (tabid === "*") {
            tabid = mediaLoadIds.tabid;
        }
        if (categoryid === "*") {
            categoryid = mediaLoadIds.categoryid;
        }
        activeUser.setMediaPosition(tabname, tabid, categoryid, itemid);
        users.save(activeUser);
        mediaLoadIds = {
        tabname: tabname,
        tabid: tabid,
        categoryid: categoryid,
        itemid: itemid
        };
    } catch (e) {
        errorHandler("setUserMediaPosition", e);
    }
}

function populateSectionsList(moduleType, refresh, returnFunction) {
    try {
        var scoslistStr = "";
        activeModule.getSectionsListView(refresh, function(ret) {
                                         if (ret === "offline") {
                                         msgTitle = resources.sectionAccess;
                                         msgBtnValue = resources.btnOk;
                                         msgStr = resources.offlineContent;
                                         if (supressWarningMsgs === false) {
                                         navigator.notification.confirm(msgStr, function() {
                                                                        if (prevLoadIds !== undefined) {
                                                                        loadIds = prevLoadIds;
                                                                        }
                                                                        hidePleaseWait();
                                                                        }, msgTitle, msgBtnValue);
                                         }
                                         returnFunction(false);
                                         } else {
                                         $("#sectiontitlehead").show();
                                         scoslistStr = ret;
                                         if (activeModule.hassections===true) {
                                         var modTitle = activeModule.title ;
                                         var sectionclass="sectionmoduletitle";
                                         if(tablet===false){
                                         if(iphone5===true){
                                         sectionclass += modTitle.length > 40 ? " doubleline" : "";
                                         }else{
                                         sectionclass += modTitle.length > 48 ? " doubleline" : "";
                                         }
                                         
                                         }
                                         $("#sectiontitlehead").html("<div class='" + sectionclass + "'>" + modTitle + "</div><div class='sectionmodtitlebtn'></div>");
                                         $("#scosset").html(scoslistStr);
                                         $("#scosset").trigger("create");
                                         $("#scosset").collapsibleset();
                                         $(".sections").trigger("create");
                                         $(".sections").collapsible();
                                         $("#scosset").trigger("refesh");
                                         $(".sections").trigger("refresh");
                                         changeMenu("scos");
                                         $(".scoli span").removeClass("ui-icon-arrow-r").removeClass("ui-icon-shadow").addClass("ui-icon-active-r");
                                         $(".sectionli span").removeClass("ui-icon-arrow-r").removeClass("ui-icon-shadow").addClass("ui-icon-active-r");
                                         if (retinaDisplay===true) {
                                         $(".scolititle").addClass("retinascoli");
                                         $(".scowslistatus").addClass("retinascolistatus");
                                         }
                                         $(".ulscodiv").off("vclick");
                                         $(".ulscodiv").on("vclick", function(ev) {
                                                           ev.preventDefault();
                                                           ev.stopPropagation();
                                                           });
                                         $(".sectionmodtitlebtn").off("vclick");
                                         $(".sectionmodtitlebtn").on("vclick", function(event) {
                                                                     event.preventDefault();
                                                                     event.stopPropagation();
                                                                     showMenu=true;
                                                                     menuOpen = $("#menucontentdiv .menuopen").length > 0 ? true : false;
                                                                     if (menubtnOk===true) {
                                                                     if (menuGroupScroller != undefined) {
                                                                     setPagePadderDiv("menuGroupScroller", false);
                                                                     }
                                                                     changeMenu("groups");
                                                                     }
                                                                     });
                                         $(".scoitem").off("vclick");
                                         $(".scoitem").on("vclick", function(event) {
                                                          event.preventDefault();
                                                          if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined) {
                                                          audioTheoryPaused = true;
                                                          audioTheoryPlayer.pause();
                                                          }
                                                          var id = $(event.currentTarget).attr("id");
                                                          moveToSCOItem(id, loadFirstSave);
                                                          });
                                         $(".wsitem").off("vclick");
                                         $(".wsitem").on("vclick", function(event) {
                                                         event.preventDefault();
                                                         var id = $(event.currentTarget).attr("id");
                                                         moveToWSCOItem(id);
                                                         });
                                         $(".sections").off("vclick");
                                         $(".sections").on("vclick", function(event) {
                                                           try {
                                                           if (sectionOK === true) {
                                                           $(".sections").children('div.ui-collapsible-content').slideUp(300);
                                                           if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined) {
                                                           audioTheoryPaused = true;
                                                           audioTheoryPlayer.pause();
                                                           }
                                                           var id = $(event.currentTarget).attr("id");
                                                           var current = $(this).closest(".ui-collapsible");
                                                           if ($("#" + id).hasClass("ui-collapsible-collapsed")) {
                                                           $(".ui-collapsible").not(".ui-collapsible-collapsed").find("ui-collapsible-heading-toggle").click();
                                                           $(".ui-collapsible-content", current).slideDown(300);
                                                           $("#" + id).collapsible("expand");
                                                           var ids = id.split("-");
                                                           var sectionid = ids[1];
                                                           activeModule.getSectionById(sectionid, function(ret) {
                                                                                       activeSection = ret;
                                                                                       if (activeSection.inaccessiblefunction.length === 0) {
                                                                                       setTimeout(function() {
                                                                                                  if (sectionOK === true) {
                                                                                                  if (showMenu === false) {
                                                                                                  triggerSCO();
                                                                                                  }
                                                                                                  hidePleaseWait();
                                                                                                  if (menuScroller != undefined) {
                                                                                                  setTimeout(function() {
                                                                                                             scoMenuScroller.refresh();
                                                                                                             scoMenuScroller.scrollToElement(id, 300);
                                                                                                             if (activeSCO != undefined) {
                                                                                                             var scoid = "#sco-" + activeSCO.theorymodulesectionid + "-" + activeSCO.assetid;
                                                                                                             scoMenuScroller.scrollToElement(scoid, 300);
                                                                                                             }
                                                                                                             }, 100);
                                                                                                  }
                                                                                                  }
                                                                                                  }, 300);
                                                                                       }
                                                                                       setTimeout(function() {
                                                                                                  sectionOK = true;
                                                                                                  }, 100);
                                                                                       });
                                                           } else {
                                                           $(".ui-collapsible-content", current).slideUp(300);
                                                           setTimeout(function() {
                                                               $("#" + id).collapsible("collapse");
                                                           }, 300);
                                                           //$("#" + id).collapsible("collapse");
                                                           //$("#" + id).cosllapsible("collapse");
                                                           setTimeout(function() {
                                                                      sectionOK = true;
                                                                      }, 100);
                                                           setPagePadderDiv("scoMenuScroller", false);
                                                           }
                                                           }
                                                           event.preventDefault();
                                                           } catch (e) {
                                                           errorHandler("sections click", e);
                                                           }
                                                           });
                                         $(".incompletesections").off("expand");
                                         $(".incompletesections").off("collapse");
                                         $(".prevSectionsIncomplete").off("vclick");
                                         $(".prevSectionsIncomplete").on("vclick", function(event) {
                                                                         try {
                                                                         if (sectionOK === true) {
                                                                         sectionOK = false;
                                                                         event.preventDefault();
                                                                         event.stopPropagation();
                                                                         hidePleaseWait;
                                                                         var id = $(event.currentTarget).attr("id");
                                                                         var ids = id.split("-");
                                                                         var sectionid = ids[1];
                                                                         msgTitle = resources.sectionAccess;
                                                                         msgBtnValue = resources.btnOk;
                                                                         msgStr = resources.sectionIncomplete;
                                                                         if (supressWarningMsgs === false) {
                                                                         navigator.notification.confirm(msgStr, function() {
                                                                                                        var previousid = "section-" + activeSection.theorymodulesectionid;
                                                                                                        $("#" + previousid).collapsible("expand");
                                                                                                        if (scoMenuScroller != undefined) {
                                                                                                        setTimeout(function() {
                                                                                                                   scoMenuScroller.refresh();
                                                                                                                   if (activeSCO != undefined) {
                                                                                                                   var scoid = "#sco-" + activeSCO.theorymodulesectionid + "-" + activeSCO.assetid;
                                                                                                                   scoMenuScroller.scrollToElement(scoid, 300);
                                                                                                                   } else {
                                                                                                                   scoMenuScroller.scrollToElement(id, 300);
                                                                                                                   }
                                                                                                                   }, 100);
                                                                                                        }
                                                                                                        }, msgTitle, msgBtnValue);
                                                                         }
                                                                         setTimeout(function() {
                                                                                    sectionOK = true;
                                                                                    }, 300);
                                                                         }
                                                                         } catch (e) {
                                                                         errorHandler("prevSectionsIncomplete", e);
                                                                         }
                                                                         });
                                         if (activeModule != undefined) {
                                         var tm = activeModule.getTheoryModule();
                                         if (tm != undefined) {
                                         var appName = configs.getCustom("CS_PORTAL_NAME");
                                         if(tm.pdfurl == null || tm.pdfurl == ""){
                                            tm.pdfurl = "http://lessonstructure.eteacher.pro/default.aspx?basemoduleid=" + activeModule.basemoduleid + "&PortalName=" + appName;
                                         }


                                         $("#pdfmenubtn").removeClass("nodisplay");
                                         } else {
                                         $("#pdfmenubtn").addClass("nodisplay");
                                         }
                                         }
                                         }
                                         returnFunction(true);
                                         }
                                         });
    } catch (e) {
        errorHandler("populateSectionsList", e);
    }
}

function moveToSCOItem(scoID, closePanel) {
    try {
        var ids = scoID.split("-");
        var sectionid = ids[1];
        var assetid = ids[2];
        $("#bookingcontent").hide();
        showMenu = false;
        $("#theoryviewheader").html(resources.theoryView);
        $("#theoryviewheader").removeClass("noicon");
        hidePleaseWait();
        $(".scoitem").removeClass("active-state");
        $(".wsitem").removeClass("active-state");
        $(".scoli").removeClass("active-state");
        $(".ui-btn-inner").removeClass("active-state");
        if($("video")){
            $("video").each(function(index, vid) {
                            vid.pause();
                            });
        }
        activeSCO = activeSection.getSCOById(assetid);
        if (activeSCO != undefined) {
            setUserPosition(false, "#coursepage", true);
            if ((orientationPosition === "portrait" || tablet === false) && (closePanel || (closePanel === false && userMenuSelect === false && showMenu === false))) {
                $(".coursemenupanel").panel("close");
                resetMenuOpenName();
            }
            $("#initialcontent").hide();
            $("#theorydatacontent").show();
            $("#wscontentnavdiv").hide();
            $("#audiotheoryplayerdiv").hide();
            setActiveSCOContent(function(ret) {
                                if(ret===false){
                                return false;
                                }else{
                                setTheoryViewNavBtns();
                                }
                                });
            var userChoice = (activeSCO.status == courseStatus.InProgress) ? "choice-1" : "choice-2";
            $("[name=understand-radio]").removeAttr("checked");
            $("[name=understand-radio]").filter("[value=" + userChoice + "]").prop("checked", true);
            $("input[name='understand-radio']").on("change", function(event) {
                                                   if (usRadioOK === false) {
                                                   usRadioOK = true;
                                                   if (deviceIsOnline === false) {
                                                   msgTitle = resources.theoryView;
                                                   msgBtnValue = resources.btnOk;
                                                   msgStr = resources.functionConnError;
                                                   setTimeout(function() {
                                                              usRadioOK = false;
                                                              }, 300);
                                                   if (supressWarningMsgs === false) {
                                                   navigator.notification.confirm(msgStr, function() {
                                                                                  if (prevLoadIds !== undefined) {
                                                                                  loadIds = prevLoadIds;
                                                                                  }
                                                                                  hidePleaseWait();
                                                                                  }, msgTitle, msgBtnValue);
                                                   }
                                                   } else {
                                                   var liId = $("#li-sco-" + activeSection.theorymodulesectionid + "-" + activeSCO.assetid + " .statussco");
                                                   if ($("input[name='understand-radio']:checked").val() == "choice-2") {
                                                   activeSCO.setSCOStatus(courseStatus.Completed);
                                                   if($(liId)){$(liId).removeClass("statusnu").addClass("statusu");}
                                                   } else {
                                                   activeSCO.setSCOStatus(courseStatus.InProgress);
                                                   if($(liId)){$(liId).removeClass("statusu").addClass("statusnu");}
                                                   }
                                                   setTimeout(function() {
                                                              $("#understand1label").removeClass("ui-btn-down-h").removeClass("ui-btn-hover-h").addClass("ui-btn-up-h");
                                                              $("#understand2label").removeClass("ui-btn-down-h").removeClass("ui-btn-hover-h").addClass("ui-btn-up-h");
                                                              }, 100);
                                                   setTimeout(function() {
                                                              usRadioOK = false;
                                                              }, 300);
                                                   }
                                                   }
                                                   });
            $("input[name='understand-radio']").checkboxradio("refresh");
        }
        userMenuSelect = false;
        loadFirstSave = false;
    } catch (e) {
        errorHandler("moveToSCOItem", e);
    }
}

function moveToWSCOItem(wsId) {
    try {
        var ids = wsId.split("-");
        var sectionid = ids[1];
        $("#contentnavdiv").hide();
        $("#bookingcontent").hide();
        $(".coursemenupanel").panel("close");
        resetMenuOpenName();
        $("#theorydatacontent").show();
        $("#audiotheoryplayerdiv").hide();
        $(".headericondivlhs").show();
        $("#theorydatacontent").html("");
        $(".scoitem").removeClass("active-state");
        $(".wsitem").removeClass("active-state");
        $(".ui-btn-inner").removeClass("active-state");
        showPleaseWait();
        $("#lessonheaderdiv").show();
        $("#lessonhead").html(activeSection.title);
        if($("video")){
            $("video").each(function(index, vid) {
                            vid.pause();
                            });
        }
        if (activeSection != undefined) {
            activeSection.getWorksheetData(function(ret) {
                                           if (ret != undefined) {
                                           activeSection.worksheet = ret;
                                           }
                                           setActiveClass("worksheet");
                                           loadIds.nodekey = "Worksheet";
                                           activeSCO = undefined;
                                           setUserPosition(false, "#coursepage", true);
                                           if (activeSection.worksheet.status == "Completed") {
                                           if (contentScroller != undefined) {
                                           contentScroller.enable();
                                           menuScroller.enable();
                                           }
                                           showPleaseWait();
                                           activeSection.getWorksheetView(false, function(ret) {
                                                                          if (ret == undefined || ret.length == 0) {
                                                                          $("#contentnavdiv").hide();
                                                                          $("#wscontentnavdiv").hide();
                                                                          hidePleaseWait();
                                                                          } else {
                                                                          hidePleaseWait();
                                                                          $("#initialcontent").hide();
                                                                          $("#theorydatacontent").show();
                                                                          $("#theoryviewheader").html(resources.worksheetHead);
                                                                          $("#theoryviewheader").removeClass("noicon");
                                                                          $("#contentnavdiv").hide();
                                                                          $("#wscontentnavdiv").hide();
                                                                          $("#bookingsul").empty();
                                                                          $("#bookingcontent").hide();
                                                                          $("#theorydatacontent").html(ret);
                                                                          $(".wsnxtbutton").buttonMarkup();
                                                                          $(".wsnxtbutton").off("vclick");
                                                                          $(".wsnxtbutton").on("vclick", function(event) {
                                                                                               event.preventDefault();
                                                                                               event.stopPropagation();
                                                                                               setPagePadderDiv("contentScroller", true);
                                                                                               var id = $(event.currentTarget).attr("id");
                                                                                               wsNSOK = true;
                                                                                               if ($("#" + id).hasClass("wsnxtcomplete")) {
                                                                                               startNextSection(id);
                                                                                               } else {
                                                                                               goToTheoryView(id);
                                                                                               }
                                                                                               });
                                                                          setPagePadderDiv("contentScroller", true);
                                                                          hidePleaseWait();
                                                                          }
                                                                          });
                                           } else {
                                           for (i = 0; i < activeSection.worksheet.questions.length; i++) {
                                           var question = activeSection.worksheet.questions[i];
                                           question.useranswer = "";
                                           }
                                           activeSection.worksheet.getFirstQuestion(function(ret) {
                                            if (ret == undefined || ret.length == 0) {
                                            $("#contentnavdiv").hide();
                                            $("#wscontentnavdiv").hide();
                                            hidePleaseWait();
                                            } else {
                                            $("#initialcontent").hide();
                                            $("#theorydatacontent").show();
                                            $("#theoryviewheader").html(resources.worksheetHead);
                                            $("#theoryviewheader").removeClass("noicon");
                                            $("#contentnavdiv").hide();
                                            $("#wscontentnavdiv").show();
                                            var wscontent = "";
                                            $("#theorydatacontent").html(wscontent + ret);
                                            $("#wsquestions").trigger("create");
                                            $("#wsquestions").listview();
                                            setPagePadderDiv("contentScroller", false);
                                            $(".qtextinput").off("click");
                                            $(".qtextinput").on("click", function(event, ui) {
                                                                event.preventDefault();
                                                                event.stopPropagation();
                                                                $(this).focus();
                                                                if (device.platform === "Android") {
                                                                showAndroidKeyboard();
                                                                }
                                                                });
                                            $(".qtextinput").on("focus", function(event) {
                                                                window.scrollTo(0, 0);
                                                                document.body.scrollTop = 0;
                                                                });
                                            if ($("#theorydatacontent h1")) {
                                            $("#theorydatacontent h1").addClass("wsquestionimgh1");
                                            }
                                            if ($(".worksheetcontent img").length > 0) {
                                            $(".worksheetcontent img").load(function(event) {
                                                                            setPagePadderDiv("contentScroller", true);
                                                                            });
                                            }
                                            $("#theorydatacontent").off("swiperight");
                                            $("#theorydatacontent").off("swipeleft");
                                            $("#theorydatacontent").on("swiperight", function(event) {
                                                                       getWorksheetContent("prev");
                                                                       
                                                                       });
                                            $("#theorydatacontent").on("swipeleft", function(event) {
                                                                       
                                                                       getWorksheetContent("next");
                                                                       
                                                                       });
                                            $("#theorydatacontent").off("tap");
                                            $("#theorydatacontent").on("tap", function(event) {
                                                                       $(".coursemenupanel").panel("close");
                                                                       
                                                                       
                                                                       });
                                            hidePleaseWait();
                                            $("[name=worksheet-choice]").removeAttr("checked");
                                            if ($(".worksheetcontent").hasClass("qinputtype")) {
                                            $("#wsqinput-0").val("");
                                            }
                                            activeSection.worksheet.getFirstQuestionUserAnswer(function(ret) {
                                                   $("[name=worksheet-choice]").removeAttr("checked");
                                                   $("[name=worksheet-choice]").filter("[value='" + ret + "']").prop("checked", true);
                                                   if ($(".worksheetcontent").hasClass("qinputtype")) {
                                                   $("#wsqinput-0").val(ret);
                                                   }
                                                   $("input[name=worksheet-choice]").on("change", function(event, ui) {
                                                                                        var id = $(event.currentTarget).attr("id");
                                                                                        var ids = id.split("-");
                                                                                        var qNo = ids[2];
                                                                                        var wsquestions = $(".wsquestions");
                                                                                        var answer = "";
                                                                                        var questionId = ($(".worksheetcontent").attr("id")).split("-")[1];
                                                                                        if ($(this).hasClass("qtextinput")) {
                                                                                        answer = $(this).value();
                                                                                        } else {
                                                                                        var answerQ = "#wsq-" + qNo;
                                                                                        answer = $(answerQ).html();
                                                                                        }
                                                                                        activeSection.worksheet.setQuestionAnswer(questionId, answer, function() {});
                                                                                        });
                                                   });
                                                                                    }
                                                                                    setPagePadderDiv("contentScroller", true);
                                                                                    });
                                           }
                                           });
        }
    } catch (e) {
        errorHandler("moveToWSCOItem", e);
    }
}

function setActiveSCOContent(returnFunction) {
    try {
        $(".vidspinner").removeClass("nodisplay");
        $(".flashspinner").removeClass("nodisplay");
        $(".imgspinner").removeClass("nodisplay");
        activeSCO.getSCOContent(function(ret) {
                                if (ret != undefined) {
                                if (ret === "offline") {
                                msgTitle = resources.sectionAccess;
                                msgBtnValue = resources.btnOk;
                                msgStr = resources.offlineContent;
                                if (supressWarningMsgs === false) {
                                navigator.notification.confirm(msgStr, function() {
                                                               if (prevLoadIds !== undefined) {
                                                               loadIds = prevLoadIds;
                                                               }
                                                               hidePleaseWait();
                                                               returnFunction(false);
                                                               }, msgTitle, msgBtnValue);
                                }
                                } else {
                                userMenuSelect = false;
                                setActiveClass("sco");
                                returnFunction(setSCOContent(ret, false, false));
                                }
                                }
                                });
    } catch (e) {
        errorHandler("setActiveSCOContent", e);
    }
}

function setSCOContent(content, guideLines, summary) {
    try {
      /*alert("hi");
      $.getScript("scripts/base/scoImageMargins.js", function(){
               alert("Script loaded and executed.");
        });

        $.getScript("scripts/base/TumultHypeAnnimation.js", function(){
               alert("Script loaded and executed.");
        });*/
        if (loadingContent === false) {
            loadingContent = true;
            loadingItems = 0;
            if (summary === false) {
                loadIds.nodekey = "";
            }
            setUserPosition(false, "#coursepage", true);
            if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined) {
                audioTheoryPaused = true;
                audioTheoryPlayer.pause();
            }
            
            resetMenuOpenName();
            
            $("#theorydatacontent").show();
            $("#lessonhead").html("");
            $("#lessonheaderdiv").hide();
            hidePleaseWait();
            $(".headericondivlhs").show();
            if (content == undefined || content == 0) {
                if ($("#theorydatacontent").html().length === 0) {
                    $("#contentnavdiv").hide();
                    $("#wscontentnavdiv").hide();
                    $("#audiotheoryplayerdiv").hide();
                    $("#initialcontent").show();
                    hidePleaseWait();
                }
            } else {
                if (guideLines===true || summary===true) {
                    
                    $(".coursemenupanel").panel("close");
                    resetMenuOpenName();
                    hidePleaseWait();
                    $("#theorydatacontent").show();
                    if (retinaDisplay===true) {
                        content.replace("class='resultcontent", "class='resultcontent retina");
                    }
                    $("#initialcontent").hide();
                    
                    content = content.replace("Assessment Results", resources.assessmentresults);
                    content = content.replace("Assessment Summary", resources.assessmentsummary);
                    
                    content=content.replace("Student Name", resources.studentname);
                    content=content.replace("User Name", resources.loginfieldsusername);
                    content=content.replace("Enrolement Date", resources.enrolmentdate);
                    content=content.replace("Completion Date", resources.completiondate);
                    
                    content=content.replace("Action Plan", resources.actionplan);
                    content=content.replace("Result", resources.resulttext);
                    content=content.replace("Module Title", resources.moduletitle);
                    content=content.replace("Feedback", resources.feedback);
                    content=content.replace("Assessor", resources.assessor);
                    content=content.replace("Internal Verifier", resources.internalverifier);
                    content=content.replace("Date Marked", resources.datemarked);
                    content=content.replace("Sections", resources.sections);
                    
                    if($('.assessmentsummaryresults')!==undefined){
                        $("#theorydatacontent").html(content);
                        var assessTitle ="";
                        if($('.asrsummary').html()==="Assessment Summary"){
                            assessTitle =resources.assessmentsummary;
                            var summhtml="<div class='assessresulttitle'>" + assessTitle + "</div>";
                            $('.asrsummary').html(summhtml);
                            
                            $("#assessmentresultdiv").trigger("refresh");
                            
                        }
                        var isSummary= false;
                        if(content.indexOf("Assessment Summary")>-1){
                            isSummary = true;
                            assessTitle =resources.assessmentsummary;
                            $("#assessmentresultdiv").addClass("asrsummary");
                            $("#lessonheadclosebtn").addClass("assesssummary");
                            $("#lessonhead").html(activeCourse.title);
                        }else if(content.indexOf("Assessment Results") > -1 && content.indexOf("Assessment Summary")===0){
                            assessTitle =resources.assessmentresults;
                            $("#assessmentresultdiv").addClass("assessresults");
                            $("#lessonheadclosebtn").addClass("assessresults");
                            $("#lessonhead").html(activeModule.title);
                        }
                        resetMenuOpenName();
                        $("#lessonheaderdiv").show();
                        $("#assessmentresultdiv").html(content);
                        $("#assessmentresultdiv").trigger("refresh");
                    }
                    setPagePadderDiv("contentScroller", false);
                    $("#contentnavdiv").hide();
                    $("#wscontentnavdiv").hide();
                    $("#audiotheoryplayerdiv").hide();
                    $("#initialcontent").hide();
                    loadFirstSave = false;
                    var moduleElId = "#module-" + activeModule.courseid + "-" + activeModule.basemoduleid;
                    if ($(moduleElId) != undefined) {
                        if (menuScroller != undefined) {
                            setTimeout(function() {
                                       menuScroller.refresh();
                                       menuScroller.scrollToElement(moduleElId, 300);
                                       }, 100);
                            setActiveClass("module");
                        }
                    }
                    if (guideLines===true) {
                        $("#theoryviewheader").html(resources.theoryView);
                        $("#theoryviewheader").removeClass("noicon");
                        $(".headericondivlhs").show();
                        $(".courseiconlhs").show();
                        $(".moduleiconlhs").show();
                        $(".lessoniconlhs").hide();
                        $(".moduleiconrhs").hide();
                        $(".lessoniconrhs").show();
                        $("#lessonhead").html(activeModule.title);
                        
                        $("#lessonheadclosebtn").addClass("assessresults");
                        hidePleaseWait();
                        setPagePadderDiv("contentScroller", true);
                        
                    } else {
                        if (summary===true) {
                            $("#theoryviewheader").html(resources.summaryHead);
                            $("#theoryviewheader").removeClass("noicon");
                            if (retinaDisplay===true) {
                                $("#theorydatacontent").addClass("retina");
                            }
                            $(".headericondivlhs").show();
                            $(".courseiconlhs").show();
                            $(".moduleiconlhs").hide();
                            $(".lessoniconlhs").hide();
                            $(".moduleiconrhs").show();
                            $(".lessoniconrhs").show();
                            if(activeModule!==undefined){
                                $("#lessonhead").html(activeModule.title);
                            }else{
                                $("#lessonhead").html(activeCourse.title);
                            }
                            $("#footerleftbckbtn").removeClass("moduleicon").removeClass("lessonicon");
                            $(".sectionscollapsibleset").trigger("create");
                            $(".sectioncollapsible").trigger("create");
                            $(".sectionscollapsibleset").collapsible();
                            $(".sectioncollapsible").collapsible();
                            $(".sectionscollapsibleset").trigger("refesh");
                            $(".sectioncollapsible").trigger("refresh");
                            $(".sectioncollapsible").off("vclick");
                            $(".sectioncollapsible").on("vclick", function(event) {
                                                        try {
                                                        if (summaryParentOK===true) {
                                                        summaryParentOK = false;
                                                        event.preventDefault();
                                                        var id = $(event.currentTarget).attr("id");
                                                        if ($("#" + id).hasClass("ui-collapsible-collapsed")) {
                                                        $("#" + id).collapsible("expand");
                                                        setTimeout(function() {
                                                                   setPagePadderDiv("contentScroller", false);
                                                                   summaryParentOK = true;
                                                                   }, 200);
                                                        } else {
                                                        $("#" + id).collapsible("collapse");
                                                        }
                                                        event.preventDefault();
                                                        }
                                                        } catch (e) {
                                                        errorHandler("summary section items vclick", e);
                                                        }
                                                        });
                        }
                    }
                    setPagePadderDiv("contentScroller", true);
                    hidePleaseWait();
                } else {
                    $("#lessonheaderdiv").show();
                    $("#lessonhead").html(activeSection.title);
                    
                    if (activeSCO !== undefined && loadFirstSave === true ) {
                        var scoid = "#sco-" + activeSCO.theorymodulesectionid + "-" + activeSCO.assetid;
                        if ($(scoid) != undefined) {
                            if (scoMenuScroller != undefined) {
                                setTimeout(function() {
                                           scoMenuScroller.refresh();
                                           scoMenuScroller.scrollToElement("#section-" + activeSection.theorymodulesectionid, 300);
                                           scoMenuScroller.scrollToElement(scoid, 300);
                                           }, 100);
                            }
                        }
                    }
                    if (content != undefined && content.length > 0) {
                        if (content.indexOf("Using the Facebook Pod") > -1) {
                            content = content.replace('<table border="0" cellspacing="0" cellpadding="5" width="100&#37;" align="left">', "");
                            content = content.replace("</table>", "");
                            content = content.replace("tbody", "p");
                            content = content.replace("tr", "p");
                            content = content.replace("td", "p");
                        }
                        var hasImages = (content.indexOf("imgspinnerdiv") > -1) ? true : false;
                        var hasFlash = (content.indexOf("flashcontent") > -1) ? true : false;
                        var hasVideo = false;
                        var vid;
                        content = content.replace("autoplay", "");
                        var newContent = $(content);
                        newContent.removeAttr("width");
                        $("#podcastmenubtn").removeClass("nodisplay");
                        $("#eclassmenubtn").removeClass("nodisplay");
                         $("#bookingmenubtn").removeClass("nodisplay");
                        $("#pdfmenubtn").removeClass("nodisplay");
                        if (activeSCO !== undefined && activeSCO.asset !== undefined && activeSCO.asset.audiourl != undefined && activeSCO.asset.audiourl.length > 0) {
                            $("#theorydatacontent").addClass("audioshow");
                            $("#audiotheoryplayerdiv").show();
                            if (audioTheoryPlayerLoaded === false || audioTheoryPlayer === null || audioTheoryPlayer === undefined) {
                                var tag = '<audio id="audiotheoryplayer" src="' + activeSCO.asset.audiourl + '" class="audiotheoryplayer" controls="controls" preload="auto"></audio>';
                                $("#audiotheoryplayerdiv").html(tag);
                                audioTheoryPlayer = new MediaElementPlayer("#audiotheoryplayer", {
                                                                           iPadUseNativeControls: false,
                                                                           iPhoneUseNativeControls: false,
                                                                           AndroidUseNativeControls: false,
                                                                           pauseOtherPlayers: false,
                                                                           features: ["playpause", "progress", "current", "duration"],
                                                                           success: function(audpay, node) {
                                                                           audioTheoryPlayerLoaded = true;
                                                                           audpay.addEventListener("timeupdate", function(event) {}, false);
                                                                           audpay.addEventListener("play", function(event) {
                                                                                                   audioTheoryPaused = false;
                                                                                                   }, false);
                                                                           audpay.addEventListener("loadedmetadata", function(event) {}, false);
                                                                           audpay.addEventListener("ended", function(event) {}, false);
                                                                           audpay.addEventListener("pause", function(event) {
                                                                                                   if (audioTheoryPaused === false) {
                                                                                                   setTimeout(function() {
                                                                                                              if (audioTheoryPaused === false) {
                                                                                                              audpay.play();
                                                                                                              }
                                                                                                              }, 1600);
                                                                                                   }
                                                                                                   }, false);
                                                                           if(activeSCO !== undefined && activeSCO.asset !== undefined){
                                                                           audpay.setSrc(activeSCO.asset.audiourl);
                                                                           audpay.load();
                                                                           }
                                                                           }
                                                                           });
                            } else {
                                if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined && audioTheoryPlayerLoaded === true) {
                                    audioTheoryPaused = true;
                                    audioTheoryPlayer.pause();
                                    $("#audiotheoryplayerdiv div.mejs-controls div.mejs-button").removeClass("mejs-pause").addClass("mejs-play");
                                    $("#audiotheoryplayerdiv .mejs-time span.mejs-currenttime").html("00:00");
                                    $("#audiotheoryplayerdiv .mejs-time span.mejs-duration").html("00:00");
                                    $("#audiotheoryplayerdiv .mejs-time-current").css("width", 0);
                                    $("#audiotheoryplayerdiv .mejs-time-handle").css("width", 0);
                                    $("#audiotheoryplayerdiv .mejs-time-handle").css("left", 0);
                                    $("#audiotheoryplayerdiv .mejs-time-loaded").css("width", 0);
                                    $("#audiotheoryplayerdiv .mejs-time-float").css("display", "none");
                                    if(activeSCO !== undefined && activeSCO.asset !== undefined){
                                        $("#audiotheoryplayerdiv audio").attr("src", activeSCO.asset.audiourl);
                                        audioTheoryPlayer.setSrc(activeSCO.asset.audiourl);
                                        audioTheoryPlayer.load();
                                    }
                                }
                            }
                        }
                        $(".audiotheoryplayer .mejs-playpause-button").off("vclick");
                        $(".audiotheoryplayer .mejs-playpause-button").on("vclick", function(event) {
                                                                          try {
                                                                          if ($(this).hasClass("mejs-pause")) {
                                                                          audioTheoryPaused = true;
                                                                          } else {
                                                                          audioTheoryPaused = false;
                                                                          }
                                                                          } catch (e) {
                                                                          errorHandler("mejs vclick", e);
                                                                          }
                                                                          });
                        if (content.indexOf("<video ") > -1) {
                            hasVideo = true;
                        }
                        if (contentScroller != undefined && (hasVideo===true || hasImages===true || hasFlash===true)) {
                            contentScroller.disable();
                            menuScroller.disable();
                        }
                        $("#initialcontent").hide();
                        $("#theorydatacontent").html(content);
                        if($("[name=understand-radio][value='choice-2']").prop("checked")===false){
                            $("[name=understand-radio]").filter("[value='choice-2']").prop("checked", true);
                            $("input[name='understand-radio']").checkboxradio("refresh");
                            $("input[name='understand-radio']").trigger("change");
                        }
                        if (hasVideo===true) {
                            $("video").each(function(index) {
                                            var vidId = $(this).attr("id");
                                            hasVideo = true;
                                            loadingItems += 1;
                                            if (iosDevice === true) {
                                            $(this).attr("preload", "none");
                                            }
                                            var posterImg = (tablet === false) ? "css/client/images/videoposter1.png" : "css/client/images/videoposter.png";
                                            var vid = document.getElementById(vidId);
                                            if (vid != undefined) {
                                            vid.oncanplaythrough = stopSpinner();
                                            vid.load();
                                            $("#" + vidId).attr("poster", posterImg);
                                            if(iphone5===true){
                                            $("#" + vidId).width("280");
                                            $("#" + vidId).height("220");
                                            }else if(tablet===false){
                                            $("#" + vidId).width("320");
                                            $("#" + vidId).height("280");
                                            }
                                            if (device.platform == "Android") {
                                            $("#" + vidId).off("vclick");
                                            $("#" + vidId).on("vclick", function(event) {
                                                              event.preventDefault();
                                                              event.stopPropagation();
                                                              var videoId = $(event.currentTarget).attr("id");
                                                              playVideo($("#" + videoId).attr("src"));
                                                              });
                                            }
                                            }
                                            });
                        }
                        $("#contentnavdiv").show();
                        loadingItems += $(".flashcontent").length;
                        //loadingItems += $(".imgspinnerdiv").length;
                        if ($(".flashcontent").length > 0) {
                            if (deviceIsOnline === true) {
                                $(".flashcontent").on("load", function(event) {
                                                      loadingItems = loadingItems - 1;
                                                      $(".flashspinner").hide();
                                                      var idNew = $(event.currentTarget).attr("id");
                                                      var docEl = document.getElementById(idNew);
                                                      var innerDoc = docEl.contentDocument || iframe.contentWindow.document;
                                                      var bodyEl = innerDoc.getElementsByTagName("body")[0];
                                                      innerDoc.addEventListener("touchmove", function(event) {
                                                                                event.preventDefault();
                                                                                }, true);
                                                      
                                                      setTimeout(function() {
                                                                 if (loadingItems == 0) {
                                                                 resetContentHeight();
                                                                 }
                                                                 }, 300);
                                                      if (tablet === false) {
                                                      $(".flashcontent").contents().find("#swiffycontainer").css("height", "100%");
                                                      $(".flashcontent").contents().find("#swiffycontainer").css("width", "100%");
                                                      }
                                                      });
                            } else {
                                msgTitle = resources.offlineContent;
                                $(".flashspinner").html("<div class='offlinecontent'>" + msgTitle + "</div>");
                            }
                        }
                        if (hasImages === true) {
                            if (deviceIsOnline === true || (deviceIsOnline === false && appFirstLoad === false)) {
                                $(".contentimg").on("load", function(event) {
                                                    //loadingItems = loadingItems - 1;
                                                    $(".imgspinner").hide();
                                                    //if (loadingItems == 0) {
                                                    //resetContentHeight();
                                                    //}
                                                    });
                                $(".imgplain").on("load", function(event) {
                                                  loadingItems = loadingItems - 1;
                                                  $(".imgspinner").hide();
                                                  //if (loadingItems == 0) {
                                                  //resetContentHeight();
                                                  //}
                                                  });
                            } else {
                                $(".imgspinner").hide();
                                $(".imgspinnerdiv img.contentimg").attr("src", "css/client/images/imageplaceholder.png");
                            }
                            setTimeout(function(){},800);
                        }
                        resetContentHeight();
                    }
                    hidePleaseWait();
                }
                $(".contentlink").off("vclick");
                $(".contentlink").on("vclick", function(event) {
                                     event.preventDefault();
                                     var url = $(event.currentTarget).attr("onclick");
                                     if (url !== undefined) {
                                     url = url.replace('openWebView("', "");
                                     url = url.replace('");', "");
                                     if (url.substring(url.lastIndexOf(".")) === ".pdf") {
                                     openPDFLink(url);
                                     } else {
                                     openWebView(url);
                                     }
                                     }
                                     });
            }
            setTimeout(function() {
                       loadingContent = false;
                       $(".imgspinner").hide();
                       resetContentHeight();
                       
                       }, 1200);
            return true;
        }else{
            return false;
        }

    } catch (e) {
        errorHandler("setSCOContent", e);
        loadingContent = false;
        return false;
    }
}

function resetContentHeight() {
    try {
        if (contentScroller != undefined) {
            contentScroller.enable();
            menuScroller.enable();
            setTimeout(function() {
                       setPagePadderDiv("contentScroller", false);
                       }, 600);
        }
    } catch (e) {
        errorHandler("resetContentHeight", e);
    }
}

function fixiFrame(iframeId) {
    if (device.platform === "Android") {
        var iFrameContentHeight = document.getElementById(iframeId).contentDocument.body.offsetHeight;
        document.getElementById(iframeId).style.height = iFrameContentHeight + "px";
    }
}

function stopSpinner() {
    $(".vidspinner").hide();
    loadingItems = loadingItems - 1;
    if (loadingItems == 0) {
        resetContentHeight();
    }
}

function showPoster(vidId) {
    $("#" + vidId).attr("poster", "css/client/images/videoposter.png");
}

function playVideo(vidUrl) {
    try {
        if (videoPlaying === false) {
            videoPlaying = true;
            window.plugins.streamingMedia.playVideo(vidUrl);
        }
        setTimeout(function() {
                   videoPlaying = false;
                   }, 300);
    } catch (e) {
        errorHandler("playVideo", e);
    }
}

function getContent(event, direction) {
    try {
        if (activeSCO == undefined) {
            hidePleaseWait();
            return false;
        }else{

            if($("video")){
                $("video").each(function(index, vid) {
                                vid.pause();
                                });
            }
            $("#sco-" + activeSCO.theorymodulesectionid + "-" + activeSCO.assetid).removeClass("active-state");
            $(".ui-btn-inner").removeClass("active-state");
            var currentOrder = activeSCO.sectionorder == undefined ? 0 : parseInt(activeSCO.sectionorder, 10);
            if (activeSection.isLastSCO(activeSCO.assetid)===true && direction == "next") {
              //alert("last");
                loadingContent=true;
                var wsid = "#ws-" + activeSCO.theorymodulesectionid;
                $(wsid).trigger("vclick");
                setTimeout(function() {
                           loadingContent = false;
                           }, 1600);
            } else {
              //alert("else");
                var nextActiveSCO = activeSection.getNextSCO(direction, currentOrder);
                if (nextActiveSCO == undefined) {
                    setActiveSCOinList(direction);
                } else {
                    activeSCO = nextActiveSCO;
                    moveToActiveSCO();
                }
            }
        }
    $('html, body').animate({ scrollTop: -200 }, 0);
        return true;
    } catch (e) {
        errorHandler("getContent", e);
    }
}
var worksheetdirection, worksheetqId;

function getWorksheetContent(direction) {
    try {
      //alert("hi")
        var id = ($(".worksheetcontent")).attr("id");
        var ids = id.split("-");
        var qId = ids[1];
        worksheetqId = qId;
        worksheetdirection = direction;
        var continueQuestion = false;
        if (direction === "next") {
            if ($(".worksheetcontent").hasClass("qinputtype")) {
                var answer = $("#wsqinput-0").val();
                if (answer.length > 0) {
                    activeSection.worksheet.setQuestionAnswer(qId, answer, function() {});
                }
            }
        }
        var question = activeSection.worksheet.getQuestion(qId, "same");
        if (question != null && question.useranswer.length === 0 && direction === "next") {
            continueQuestion = false;
            msgTitle = resources.worksheet;
            msgBtnValue = resources.btnYesNo;
            msgStr = resources.questionNotAnswered;
            navigator.notification.confirm(msgStr, actionUserAnswer, msgTitle, msgBtnValue);
        } else {
            continueQuestion = true;
            worksheetqId = 0;
        }
        if (continueQuestion === true) {
            getWorksheetContentNext(direction, qId);
        }
    } catch (e) {
        errorHandler("getWorksheetContent", e);
    }
}

function actionUserAnswer(choice) {
    try {
        if (choice === 1) {
            continueQuestion = true;
            getWorksheetContentNext(worksheetdirection, worksheetqId);
        } else {
            wsok = true;
        }
        worksheetqId = 0;
    } catch (e) {
        errorHandler("actionUserAnswer, e");
    }
}

function getWorksheetContentNext(direction, qId) {
    try {
        activeSection.worksheet.getNextQuestion(direction, qId, function(ret) {
          if (ret == undefined || ret.length === 0) {
          wsok = true;
          
          } else {
          if (ret == "result") {
          if (deviceIsOnline === false) {
          msgTitle = resources.worksheet;
          msgBtnValue = resources.btnOk;
          msgStr = resources.functionConnError;
          if (supressWarningMsgs === false) {
          navigator.notification.confirm(msgStr, function() {
                                         hidePleaseWait();
                                         }, msgTitle, msgBtnValue);
          }
          } else {
            msgTitle = resources.worksheet;
            msgBtnValue = resources.btnOkCancel;
            msgStr = resources.worksheetSubmit;
            navigator.notification.confirm(msgStr, function(choice) {
                                         if (choice != 2) {
                                          $("#coursepage").append(mloadingGif);
                                         showPleaseWait();
                                         activeSection.getWorksheetResult(function(ret) {
                                          $("#mloader").remove();
            var msgBtnValueOk = resources.btnOk;
            var msgBtnResults = resources.worksheetresult;
            navigator.notification.confirm("" + ret, function() {
             wsok = true;
             if (ret.indexOf(resources.worksheetpass) > -1) {
             activeSCO = undefined;
             loadFirstSave = true;
             $("#theorydatacontent").html("");
             if (activeModule.isLastSection(activeSection.theorymodulesectionid)===true) {
                  activeModule.updateModuleStatus(courseStatus.Completed, function() {
                     coursesInit = true;
                     var modOrder = activeModule.moduleorder;
                     activeModule = activeModuleGroup.getNextModule("next", modOrder);
                     if(activeModule===undefined && activeModuleGroup.modules.length === modOrder){
                       var moduleGroupId = activeModuleGroup.modulegroupid;
                       activeModuleGroup = activeCourse.getModuleGroupByGroupId(moduleGroupId + 1);
                       if(activeModuleGroup !== undefined){
                        activeModule = activeModuleGroup.getFirstModule();
                       }
                     }
                     if (activeModule == undefined) {
                       activeSection = undefined;
                       loadIds.moduleid = 0;
                       loadIds.sectionid = 0;
                       loadIds.assetid = 0;
                       loadIds.nodekey = "";
                       $("#initialcontent").show();
                       $("#theorydatacontent").html("");
                     }
                     setUserPosition(false, "#coursepage", false);
                     //$("#mloader").remove();
                     hidePleaseWait();
                     $(".coursemenupanel").panel("open");
                     
                     refreshMenu("refresh");
                  });
             } else {
              activeSection = activeModule.getNextSection("next", activeSection.sectionorder);
              if (activeSection != undefined && loadIds != undefined) {
                loadIds.sectionid = activeSection.theorymodulesectionid;
                loadIds.assetid = 0;
                loadIds.nodekey = "";
              }
             setUserPosition(false, "#coursepage", false);
             hidePleaseWait();
             
             refreshMenu("refresh");
             }
             } else {

                activeSection.getWorksheetData(function(ret) {

                  //alert(JSON.stringify(ret.viewWorksheetresults));
                  if(ret.viewWorksheetresults){
                    $("#mloader").remove();
                    hidePleaseWait();
                    //alert("true");
                    msgTitle = resources.worksheet;
                    msgBtnValue = resources.btnWorksheetResult;
                    msgStr = resources.worksheetFail;
                    navigator.notification.confirm(msgStr, actionFailedWorksheet, msgTitle, msgBtnValue);
                  }
                  else{
                    $("#mloader").remove();
                    hidePleaseWait();
                    //alert("false");
                    msgTitle = resources.worksheet;
                    msgBtnValue = resources.btnWorksheetResultnew;
                    msgStr = resources.worksheetFail;
                    navigator.notification.confirm(msgStr, actionFailedWorksheet, msgTitle, msgBtnValue);
                  }
                });
             }
             }, msgBtnResults, msgBtnValueOk);
          });
                                         } else {
                                         wsok = true;
                                         $(".wsnxtbutton").off("vclick");
                                         }
                                         }, msgTitle, msgBtnValue);
          }
          } else {
          hidePleaseWait();
          $("#initialcontent").hide();
          $("#theorydatacontent").show();
          $("#theoryviewheader").html(resources.worksheetHead);
          $("#theoryviewheader").removeClass("noicon");
          $("#contentnavdiv").hide();
          $("#wscontentnavdiv").show();
          $("input[name=worksheet-choice]").off("change");
          var wscontent = "";
          
          $("#theorydatacontent").html(wscontent + ret);
          $("#wsquestions").trigger("create");
          $(".qtextinput").off("click");
          $(".qtextinput").on("click", function(event, ui) {
                              event.preventDefault();
                              event.stopPropagation();
                              $(this).focus();
                              if (device.platform === "Android") {
                              showAndroidKeyboard();
                              }
                              });
          $(".qtextinput").on("focus", function(event) {
                              window.scrollTo(0, 0);
                              document.body.scrollTop = 0;
                              });
          setPagePadderDiv("contentScroller", false);
          if ($(".worksheetcontent h1")) {
          $(".worksheetcontent h1").addClass("wsquestionimgh1");
          }
          if ($(".worksheetcontent img").length > 0) {
          $(".worksheetcontent img").load(function(event) {
                                          setPagePadderDiv("contentScroller", true);
                                          });
          }
          setPagePadderDiv("contentScroller", true);
          activeSection.worksheet.getNextQuestionUserAnswer(direction, qId, function(ret) {
                                                            var userAnswer = ret;
                                                            $("input[name=worksheet-choice]").on("change", function(event, ui) {
                                                                                                 var id = $(event.currentTarget).attr("id");
                                                                                                 var ids = id.split("-");
                                                                                                 var qNo = ids[2];
                                                                                                 var wsquestions = $(".wsquestions");
                                                                                                 var questionId = ($(".worksheetcontent").attr("id")).split("-")[1];
                                                                                                 var answerQ = "#wsq-" + qNo;
                                                                                                 var answer = $(answerQ).html();
                                                                                                 activeSection.worksheet.setQuestionAnswer(questionId, answer, function() {});
                                                                                                 });
                                                            
                                                            if ($(".worksheetcontent").hasClass("qinputtype")) {
                                                            $("#wsqinput-0").val(ret);
                                                            }
                                                            setTimeout(function() {
                                                                       wsok = true;
                                                                       $(".wsnxtbutton").off("vclick");
                                                                       }, 300);
                                                            });
                                                }
                                                }
                                                });
    } catch (e) {
        errorHandler("getWorksheetContentNext", e);
    }
}

function startNextSection(wsId) {
    try {
        if (wsNSOK === true) {
            wsNSOK = false;
            $("#" + wsId).off("vclick");
            var id = wsId.split("-")[1];
            if (activeModule != undefined) {
                activeModule.getSectionById(id, function(ret) {
                                            activeSection = ret;
                                            $("#theoryviewheader").html(resources.theoryView);
                                            $("#theoryviewheader").removeClass("noicon");
                                            hidePleaseWait();
                                            var sOrder = (activeSection.sectionorder == undefined ? 0 : activeSection.sectionorder);
                                            activeSection = activeModule.getNextSection("next", sOrder);
                                            if (activeSCO != undefined) {
                                            activeSCO = undefined;
                                            }
                                            if (activeSection != undefined && loadIds != undefined) {
                                            loadIds.sectionid = activeSection.theorymodulesectionid;
                                            loadIds.assetid = 0;
                                            loadIds.nodekey = "";
                                            activeSCO = activeSection.getFirstSCO();
                                            if (activeSCO != undefined) {
                                            loadIds.assetid = activeSCO.assetid;
                                            loadIds.nodekey = "";
                                            }
                                            setUserPosition(false, "#coursepage", false);
                                            loadFirstSave = true;
                                            wsNSOK = true;
                                            showMenu = false;
                                            userMenuSelect = true;
                                            
                                            $(".coursemenupanel").panel("open");
                                            refreshMenu("courses");
                                            } else {
                                            
                                            if(activeModuleGroup!==undefined){
                                            sOrder = (activeModule.moduleorder == undefined ? 0 : activeModule.moduleorder);
                                            activeModule = activeModuleGroup.getNextModule("next", sOrder, true);
                                            if(activeModule===undefined && activeModuleGroup.modules.length === sOrder){
                                            var moduleGroupId = activeModuleGroup.modulegroupid;
                                            activeModuleGroup = activeCourse.getModuleGroupByGroupId(moduleGroupId + 1);
                                            if(activeModuleGroup !== undefined){
                                            activeModule = activeModuleGroup.getFirstModule();
                                            }
                                            }else{
                                            
                                            }
                                            
                                            if(activeModule !== undefined){
                                            activeSection=undefined;
                                            activeSCO = undefined;
                                            setUserPosition(false, "#coursepage", false);
                                            setTriggerActiveModule(function() {});
                                            }else{
                                            if (wsNSOK === false) {
                                            wsNSOK = true;
                                            msgTitle = resources.moduleCompleted;
                                            msgBtnValue = resources.btnOk;
                                            msgStr = resources.modulePassed;
                                            if (supressWarningMsgs === false) {
                                            navigator.notification.alert(msgStr, function() {
                                                                         $("#theorydatacontent").html("");
                                                                         $("#contentnavdiv").hide();
                                                                         $("#wscontentnavdiv").hide();
                                                                         setPagePadderDiv("contentScroller", true);
                                                                         $("#initialcontent").show();
                                                                         activeSection = undefined;
                                                                         activeSCO=undefined;
                                                                         setUserPosition(false, "#coursepage", false);
                                                                         
                                                                         $(".coursemenupanel").panel("open");
                                                                         
                                                                         refreshMenu("refreshonly");
                                                                         hidePleaseWait();
                                                                         }, msgTitle, msgBtnValue);
                                            }
                                            }
                                            
                                            }
                                            
                                            }else{
                                            if (wsNSOK === false) {
                                            wsNSOK = true;
                                            msgTitle = resources.moduleCompleted;
                                            msgBtnValue = resources.btnOk;
                                            msgStr = resources.modulePassed;
                                            if (supressWarningMsgs === false) {
                                            navigator.notification.alert(msgStr, function() {
                                                                         $("#theorydatacontent").html("");
                                                                         $("#contentnavdiv").hide();
                                                                         $("#wscontentnavdiv").hide();
                                                                         setPagePadderDiv("contentScroller", true);
                                                                         $("#initialcontent").show();
                                                                         activeSection = undefined;
                                                                         activeSCO=undefined;
                                                                         setUserPosition(false, "#coursepage", false);
                                                                         
                                                                         $(".coursemenupanel").panel("open");
                                                                         
                                                                         refreshMenu("refreshonly");
                                                                         hidePleaseWait();
                                                                         }, msgTitle, msgBtnValue);
                                            }
                                            }
                                            }
                                            }
                                            });
            }
        }
    } catch (e) {
        errorHandler("startNextSection", e);
    }
}

function goToTheoryView(wsId) {
    try {
        if (wsNSOK === true) {
            wsNSOK = false;
            if (activeSection !== undefined) {
                activeSCO = activeSection.getFirstSCO();
                loadIds.nodekey = "";
                setUserPosition(false, "#coursepage", false);
            }
            triggerSCO();
            setPagePadderDiv("contentScroller", true);
            wsNSOK = true;
        }
    } catch (e) {
        errorHandler("goToTheoryView", e);
    }
}

function actionFailedWorksheet(choice) {
    try {
        if (contentScroller != undefined) {
            contentScroller.enable();
            if (menuScroller != undefined) {
                menuScroller.enable();
            }
        }
        switch (choice) {
            case 1:
                for (i = 0; i < activeSection.worksheet.questions.length; i++) {
                    var question = activeSection.worksheet.questions[i];
                    question.useranswer = "";
                }
                activeSection.worksheet.getFirstQuestion(function(ret) {
                                                         if (ret == undefined || ret.length == 0) {
                                                         $("#contentnavdiv").hide();
                                                         $("#wscontentnavdiv").hide();
                                                         } else {
                                                         $("#initialcontent").hide();
                                                         $("#theorydatacontent").show();
                                                         $("#theoryviewheader").html(resources.worksheetHead);
                                                         $("#theoryviewheader").removeClass("noicon");
                                                         $("#contentnavdiv").hide();
                                                         $("#wscontentnavdiv").show();
                                                         var wscontent = "";
                                                         $("#theorydatacontent").html(wscontent + ret);
                                                         $("#wsquestions").trigger("create");
                                                         setPagePadderDiv("contentScroller", false);
                                                         $(".qtextinput").off("click");
                                                         $(".qtextinput").on("click", function(event, ui) {
                                                                             event.preventDefault();
                                                                             event.stopPropagation();
                                                                             $(this).focus();
                                                                             if (device.platform === "Android") {
                                                                             showAndroidKeyboard();
                                                                             }
                                                                             });
                                                         $(".qtextinput").on("focus", function(event) {
                                                                             window.scrollTo(0, 0);
                                                                             document.body.scrollTop = 0;
                                                                             });
                                                         
                                                         if ($(".worksheetcontent").hasClass("qinputtype")) {
                                                         $("#wsqinput-0").val("");
                                                         }
                                                         activeSection.worksheet.getFirstQuestionUserAnswer(function(ret) {
                                                                                                            $("[name=worksheet-choice]").removeAttr("checked");
                                                                                                            $("[name=worksheet-choice]").filter("[value='" + ret + "']").prop("checked", true);
                                                                                                            if ($(".worksheetcontent").hasClass("qinputtype")) {
                                                                                                            $("#wsqinput-0").val(ret);
                                                                                                            }
                                                                                                            });
                                                         $("input[name=worksheet-choice]").on("change", function(event, ui) {
                                                                                              var id = $(event.currentTarget).attr("id");
                                                                                              var ids = id.split("-");
                                                                                              var qNo = ids[2];
                                                                                              var wsquestions = $(".wsquestions");
                                                                                              var questionId = ($(".worksheetcontent").attr("id")).split("-")[1];
                                                                                              var answerQ = "#wsq-" + qNo;
                                                                                              var answer = $(answerQ).html();
                                                                                              activeSection.worksheet.setQuestionAnswer(questionId, answer, function() {});
                                                                                              });
                                                         setPagePadderDiv("contentScroller", true);
                                                         }
                                                         });
                break;
            case 2:
                if (activeSection !== undefined) {
                    activeSCO = activeSection.getFirstSCO();
                    loadIds.nodekey = "";
                    setUserPosition(false, "#coursepage", false);
                }
                triggerSCO();
                setPagePadderDiv("contentScroller", true);
                break;
            case 3:
                activeSection.getWorksheetView(true, function(ret) {
                                               if (ret == undefined || ret.length == 0) {
                                               $("#contentnavdiv").hide();
                                               $("#wscontentnavdiv").hide();
                                               hidePleaseWait();
                                               } else {
                                               hidePleaseWait();
                                               $("#initialcontent").hide();
                                               $("#theorydatacontent").show();
                                               $("#theoryviewheader").html(resources.worksheetHead);
                                               $("#theoryviewheader").removeClass("noicon");
                                               $("#contentnavdiv").hide();
                                               $("#wscontentnavdiv").hide();
                                               $("#theorydatacontent").html(ret);
                                               $("#wsquestions").trigger("create");
                                               setPagePadderDiv("contentScroller", false);
                                               $(".qtextinput").off("click");
                                               $(".qtextinput").on("click", function(event, ui) {
                                                                   event.preventDefault();
                                                                   event.stopPropagation();
                                                                   $(this).focus();
                                                                   if (device.platform === "Android") {
                                                                   showAndroidKeyboard();
                                                                   }
                                                                   });
                                               $(".qtextinput").on("focus", function(event) {
                                                                   window.scrollTo(0, 0);
                                                                   document.body.scrollTop = 0;
                                                                   });
                                               $("#wsend-" + activeSection.theorymodulesectionid).buttonMarkup();
                                               $(".wsnxtbutton").off("vclick");
                                               $(".wsnxtbutton").on("vclick", function(event) {
                                                                    event.preventDefault();
                                                                    event.stopPropagation();
                                                                    var id = $(event.currentTarget).attr("id");
                                                                    wsNSOK = true;
                                                                    if ($("#" + id).hasClass("wsnxtcomplete")) {
                                                                    startNextSection(id);
                                                                    } else {
                                                                    goToTheoryView(id);
                                                                    }
                                                                    });
                                               setPagePadderDiv("contentScroller", true);
                                               }
                                               });
                break;
            default:
                break;
        }
    } catch (e) {
        errorHandler("actionFailedWorksheet", e);
    }
}

function moveToActiveSCO() {
    try {
        $(".scos").removeClass("active-state");
        $(".ui-btn-inner").removeClass("active-state");
        if(activeSCO!==undefined && loadingContent===false){
            var nextid = "sco-" + activeSCO.theorymodulesectionid + "-" + activeSCO.assetid;
            $("#" + nextid).trigger("vclick");
        }
        
    } catch (e) {
        errorHandler("moveToActiveSCO", e);
    }
}

function setActiveSCOinList(direction) {
    try {
        if (activeModule == undefined) {
            loadFirstSave = true;
            triggerLoad(false);
            return;
        } else {
            if (activeSection == undefined) {
                loadFirstSave = true;
                triggerLoad(false);
                return;
            }
        }
        var currentSectionOrder = activeSection.sectionorder == undefined ? 0 : parseInt(activeSection.sectionorder, 10);
        activeSection = activeModule.getNextSection(direction, currentSectionOrder);
        if (activeSection != undefined) {
            activeSCO = activeSection.getFirstSCO();
            if (activeSCO != undefined) {
                moveToActiveSCO();
            }
        } else {
            var currentModuleOrder = activeModule.moduleorder == undefined ? 0 : parseInt(activeModule.moduleorder, 10);
            activeModule = activeModuleGroup.getNextModule(direction, currentModuleOrder);
            if(activeModule===undefined && activeModuleGroup.modules.length === currentModuleOrder){
                var moduleGroupId = activeModuleGroup.modulegroupid;
                activeModuleGroup = activeCourse.getModuleGroupByGroupId(moduleGroupId + 1);
                if(activeModuleGroup !== undefined){
                    activeModule = activeModuleGroup.getFirstModule();
                }
            }
            if (activeModule == undefined) {
                msgTitle = resources.courseCompleted;
                msgBtnValue = resources.btnOk;
                msgStr = resources.coursePassed;
                if (supressWarningMsgs === false) {
                    navigator.notification.confirm(msgStr, function() {
                                                   $("#theorydatacontent").html("");
                                                   $("#contentnavdiv").hide();
                                                   $("#wscontentnavdiv").hide();
                                                   triggerLoad(false);
                                                   }, msgTitle, msgBtnValue);
                }
            } else {
                activeModule.getFirstSection(function(ret){
                                             activeSection = ret;
                                             if (ret === "offline") {
                                             msgTitle = resources.sectionAccess;
                                             msgBtnValue = resources.btnOk;
                                             msgStr = resources.offlineContent;
                                             if (supressWarningMsgs === false) {
                                             navigator.notification.confirm(msgStr, function() {
                                                                            if (prevLoadIds !== undefined) {
                                                                            loadIds = prevLoadIds;
                                                                            }
                                                                            hidePleaseWait();
                                                                            }, msgTitle, msgBtnValue);
                                             }
                                             } else {
                                             if (activeSection == undefined) {
                                             msgTitle = resources.moduleCompleted;
                                             msgBtnValue = resources.btnOk;
                                             msgStr = resources.modulePassed;
                                             if (supressWarningMsgs === false) {
                                             navigator.notification.confirm(msgStr, function() {
                                                                            $("#theorydatacontent").html("");
                                                                            $("#contentnavdiv").hide();
                                                                            $("#wscontentnavdiv").hide();
                                                                            triggerLoad(false);
                                                                            }, msgTitle, msgBtnValue);
                                             }
                                             } else {
                                             activeSCO = activeSection.getFirstSCO();
                                             if (activeSCO != undefined) {
                                             moveToActiveSCO();
                                             }
                                             }
                                             }
                                             });
            }
        }
    } catch (e) {
        errorHandler("setActiveSCOinList", e);
    }
}

function triggerLoad(updatePosition) {
    try {
        showPleaseWait();

        if(loadIds.courseid != 0){
            $(".coursemenupanel").panel("open");
        }

        var newcourseid = 0;
        if (loadIds == undefined || loadIds.courseid == 0) {
            loadIds = {
            courseid: 0,
            moduleid: 0,
            sectionid: 0,
            assetid: 0,
            pageid: "",
            issuetab: "",
            issueid: "",
            nodekey: ""
            };
        }
        if (activeUser.savedPosition != undefined) {
            newcourseid = activeUser.savedPosition.courseid == undefined ? 0 : activeUser.savedPosition.courseid;
            loadIds = {
            courseid: activeUser.savedPosition.courseid == undefined ? 0 : activeUser.savedPosition.courseid,
            moduleid: activeUser.savedPosition.moduleid == undefined ? 0 : activeUser.savedPosition.moduleid,
            sectionid: activeUser.savedPosition.sectionid == undefined ? 0 : activeUser.savedPosition.sectionid,
            assetid: activeUser.savedPosition.assetid == undefined ? 0 : activeUser.savedPosition.assetid,
            pageid: activeUser.savedPosition.pageid == undefined ? "" : activeUser.savedPosition.pageid,
            issuetab: activeUser.savedPosition.issuetab == undefined ? "" : activeUser.savedPosition.issuetab,
            issueid: activeUser.savedPosition.issueid == undefined ? "" : activeUser.savedPosition.issueid,
            nodekey: activeUser.savedPosition.nodekey == undefined ? "" : activeUser.savedPosition.nodekey
            };
        }
        if (!(newcourseid > 0)) {
            if (portalCourses.count() > 0) {
                activeCourse = portalCourses.getFirstCourse();
                if (activeCourse == undefined) {
                    hidePleaseWait();
                    loadFirstSave = false;
                    return;
                } else {
                    loadFirstSave = true;
                    setUserPosition(false, "#coursepage", false);
                    if (activeCourse.status!== courseStatus.Completed && activeCourse.status!==courseStatus.InProgress && activeCourse.status!== courseStatus.NotStarted) {
                        hidePleaseWait();
                        loadFirstSave = false;
                        return;
                    }else{
                     setTimeout(function() {
                                              checkASDUserPodState(true, function(ret) {});
                                   refreshMenu("refresh")
                                              }, 2000);
                        setTriggerActiveModule(function() {});
                    }
                }
            } else {
                portalCourses.refreshCourses(updatePosition, function(ret) {
                                             if (ret == true) {
                                             activeCourse = portalCourses.getFirstCourse();
                                             if (activeCourse == undefined || (activeCourse.status!== courseStatus.Completed && activeCourse.status!==courseStatus.InProgress && activeCourse.status!== courseStatus.NotStarted)) {
                                             hidePleaseWait();
                                             loadFirstSave = false;
                                             return;
                                             } else {
                                             loadFirstSave = true;
                                             setTriggerActiveModule(function() {});
                                             }
                                             } else {
                                             msgTitle = resources.courseAccess;
                                             msgBtnValue = resources.btnOk;
                                             msgStr = resources.enrolledCourses;
                                             navigator.notification.confirm(msgStr, function() {
                                                                            hidePleaseWait();
                                                                            activeUser.requireslogin = true;
                                                                            goToPage("#mainhomepage");
                                                                            showLoginPage();
                                                                            }, msgTitle, msgBtnValue);
                                             }
                                             });
            }
        } else {
            activeCourse = portalCourses.getCourseById(newcourseid);
            if (activeCourse != undefined) {
                setUserPosition(true, "#coursepage", false);
                loadFirstSave = true;
                $("#course-" + activeCourse.courseid).collapsible("expand");
                
                if (activeCourse.status!== courseStatus.Completed && activeCourse.status!==courseStatus.InProgress && activeCourse.status!== courseStatus.NotStarted) {
                    hidePleaseWait();
                    loadFirstSave = false;
                    return;
                }else{
                    setTriggerActiveModule(function() {});
                }
            }
            else{
                loadFirstSave = false;
            }
            
        }
    } catch (e) {
        errorHandler("triggerLoad", e);
    }
}

function setTriggerActiveModule(returnFunction) {
    try {
        var newmoduleid = activeUser.savedPosition.moduleid == undefined ? 0 : activeUser.savedPosition.moduleid;
        var btnId;
        if (!(newmoduleid > 0) && activeUser.savedPosition.nodekey !== "AssessmentSummary") {
            if(activeModuleGroup===undefined){
                activeModuleGroup = activeCourse.getFirstModuleGroup();
            }
            if(activeModuleGroup!==undefined){
                activeModule = activeModuleGroup.getFirstModule();
                if (activeModule == undefined) {
                    activeCourse = portalCourses.getNextCourse(activeCourse.courseid);
                    if (activeCourse != undefined) {
                        setUserPosition(false, "#coursepage", false);
                        loadFirstSave = true;
                        triggerLoad(false);
                    } else {
                        hidePleaseWait();
                        returnFunction(false);
                    }
                }
            }
        } else {
            if(activeModuleGroup===undefined){
                activeModuleGroup = activeCourse.getModuleGroupByModuleId(newmoduleid);
            }
            if(activeModuleGroup!==undefined){
                
                var modgroupid = "#modulegroup-" + activeCourse.courseid + "-" + activeModuleGroup.modulegroupid;
                $(modgroupid).trigger("vclick");
                
                if (!(newmoduleid > 0) && activeUser.savedPosition.nodekey === "AssessmentSummary") {
                    btnId = $("#modulegrouping-" + activeModuleGroup.modulegroupid + "-" + 3);
                }else{
                    btnId = $("#modulegrouping-" + activeModuleGroup.modulegroupid + "-" + 1);
                }
                if($(btnId)){
                    $(btnId).collapsible("expand");
                }
                
                activeModule = activeModuleGroup.getModuleById(newmoduleid);
                if (activeModule != undefined) {
                    setUserPosition(true, "#coursepage", false);
                }
            }
            if (activeModule != undefined) {
                btnId = $("#module-" + activeModule.courseid + "-" + activeModule.basemoduleid);
                if ($(btnId) != undefined) {
                    moduleOK=true;
                    naOK=true;
                    if(activeModule.actionIdNew == "9" || activeModule.actionIdNew == "1"){

                    }
                    else{
                        $(btnId).trigger("vclick");
                    }
                }
                hidePleaseWait();
                returnFunction(true);
            }
        }
    } catch (e) {
        errorHandler("setTriggerActiveModule", e);
    }
}

function triggerSection() {
    try {
        if (loadIds != undefined && activeModule !== undefined) {
            showPleaseWait();
            if ((!(loadIds.sectionid > 0))) {
                activeModule.getFirstSection(function(ret) {
                                             if (ret === "offline") {
                                             msgTitle = resources.sectionAccess;
                                             msgBtnValue = resources.btnOk;
                                             msgStr = resources.offlineContent;
                                             if (supressWarningMsgs === false) {
                                             navigator.notification.confirm(msgStr, function() {
                                                                            if (prevLoadIds !== undefined) {
                                                                            loadIds = prevLoadIds;
                                                                            }
                                                                            hidePleaseWait();
                                                                            }, msgTitle, msgBtnValue);
                                             }
                                             } else {
                                             activeSection = ret;
                                             setTriggerSection();
                                             }
                                             });
            } else {
                activeModule.getSectionById(loadIds.sectionid, function(ret) {
                                            activeSection = ret;
                                            setTriggerSection();
                                            });
            }
        } else {
            if (activeModule !== undefined) {
                activeModule.getFirstSection(function(ret) {
                                             if (ret === "offline") {
                                             msgTitle = resources.sectionAccess;
                                             msgBtnValue = resources.btnOk;
                                             msgStr = resources.offlineContent;
                                             if (supressWarningMsgs === false) {
                                             navigator.notification.confirm(msgStr, function() {
                                                                            if (prevLoadIds !== undefined) {
                                                                            loadIds = prevLoadIds;
                                                                            }
                                                                            hidePleaseWait();
                                                                            }, msgTitle, msgBtnValue);
                                             }
                                             } else {
                                             activeSection = ret;
                                             setTriggerSection();
                                             }
                                             });
            }
        }
    } catch (e) {
        errorHandler("triggerSection", e);
    }
}

function setTriggerSection() {
    try {
        if (activeSection != undefined) {
            var secId = "#section-" + activeSection.theorymodulesectionid;
            if ($(secId) == undefined) {
                loadFirstSave = false;
            } else {
                //$(secId).collapsible("expand");
                //if(showMenu===false){
                $(secId).trigger("vclick");
                // }
            }
        }
    } catch (e) {
        errorHandler("setTriggerSection", e);
    }
}

function triggerSCO() {
    try {
        if (loadIds == undefined) {
            activeSCO = activeSection.getFirstSCO();
        } else {
            if (loadIds.assetid == 0 && loadIds.nodekey == "") {
                activeSCO = activeSection.getFirstSCO();
            } else {
                if (loadIds.assetid > 0) {
                    activeSCO = activeSection.getSCOById(loadIds.assetid);
                    if (activeSCO == undefined) {
                        activeSCO = activeSection.getFirstSCO();
                    }
                    setUserPosition(false, "#coursepage", false);
                } else {
                    if (loadIds.nodekey == "Worksheet") {
                        loadFirstSave = false;
                        setUserPosition(false, "#coursepage", false);
                        var wsbtn = "#ws-" + activeSection.theorymodulesectionid;
                        moveToWSCOItem(wsbtn);
                    } else {
                        activeSCO = activeSection.getFirstSCO();
                    }
                }
            }
        }
        loadFirstSave = false;
        if (activeSCO != undefined) {
            setUserPosition(false, "#coursepage", false);
            var scobtn = "#sco-" + activeSCO.theorymodulesectionid + "-" + activeSCO.assetid;
            moveToSCOItem(scobtn, loadFirstSave);
        } else {
            hidePleaseWait();
        }
    } catch (e) {
        errorHandler("triggerSCO", e);
    }
}

function getModuleType(basemoduletypeid) {
    try {
        var type;
        if (basemoduletypeid === 4) {
            type = moduleType.Book;
        } else {
            if (basemoduletypeid === 1) {
                type = moduleType.Lesson;
            } else {
                if (basemoduletypeid === 2) {
                    type = moduleType.Lesson;
                } else {
                    if (basemoduletypeid === 3) {
                        type = moduleType.Practicum;
                    } else {
                        if (basemoduletypeid === 5) {
                            type = moduleType.Book;
                        } else {
                            if (basemoduletypeid === 6) {
                                type = moduleType.Certificate;
                            } else {
                                if (basemoduletypeid === 8) {
                                    type = moduleType.Book;
                                } else {
                                    if (basemoduletypeid === 9) {
                                        type = moduleType.Book;
                                    } else {
                                        if (basemoduletypeid === 10) {
                                            type = moduleType.Book;
                                        } else {
                                            if (basemoduletypeid === 11) {
                                                type = moduleType.Book;
                                            } else {
                                                if (basemoduletypeid === 12) {
                                                    type = moduleType.Book;
                                                } else {
                                                    if (basemoduletypeid === 14) {
                                                        //type = moduleType.Book;
                                                        type = "OTA";
                                                    } else {
                                                        if (basemoduletypeid === 13) {
                                                            type = moduleType.Portfolio;
                                                        } else {
                                                            if (basemoduletypeid === 15) {
                                                                type = moduleType.NA;
                                                            } else {
                                                                type = moduleType.Lesson;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return type;
    } catch (e) {
        errorHandler("getModuleType", e);
    }
}

function checkPDFDirExists(dir) {
    try {
        var existingFileName = viewFile;
        viewFile = device.platform === "Android" ? dir.toURL() + "/lessonmaterial.pdf" : dir.toURL() + "/lessonmaterial.pdf";
        dir.getFile(existingFileName, {
                    create: false
                    }, function(fileEntry) {
                    checkPDFFileSize(fileEntry);
                    if (device.platform === "Android" || device.platform === "iOS") {
                    pdfViewFile = fileEntry.toURL();
                    androidPDFView(pdfViewFile);
                    } else {
                    openWebView(fileEntry.toURL());
                    }
                    }, function() {
                    var tm = activeModule.getTheoryModule();
                    if (tm != undefined && tm.pdfurl.length > 0) {
                    var remoteFile = tm.pdfurl;
                    var localFileName = "lessonmaterial.pdf";
                    dir.getFile(localFileName, {
                                create: true,
                                exclusive: false
                                }, function(pdfEntry) {
                                var localPath = pdfEntry.toURL();
                                var remoteUrl = configs.getCustom("CS_SITE_URL_PDFDOWNLOAD");
                                if(tm.pdfurl == "" || tm.pdfurl == null){
                                    remoteUrl += "?basemoduleid=" + activeModule.basemoduleid + "&PortalName=" + configs.getCustom("CS_PORTAL_NAME");
                                     remoteFile = encodeURI(remoteUrl);
                                }
                                else{
                                     remoteFile = encodeURI(remoteFile);
                                }

                                var ft = new FileTransfer();
                                var onSuccess = function(entry) {
                                if(currentPodcastItem!==undefined){
                                currentPodcastItem.isdownloaded = true;
                                currentPodcastItem.fileuri = entry.toURL();
                                var pdfId = "#downloadpoditem-" + currentPodcastItem.podcastid + "-" + currentPodcastItem.id;
                                activeUser.saveFilesList(undefined, "podcasts", false, function() {});
                                if( $(pdfId)){
                                $(pdfId).removeClass("downloadpdfpoditembtn").addClass("deletepdfpoditembtn");
                                }
                                activeUser.saveFilesList(undefined, "podcasts", false, function() {});
                                $(".podcastitemsul").listview("refresh");
                                setDeletePDFPodcastBtnItem();
                                }
                                if (device.platform === "Android"  || device.platform === "iOS") {
                                androidPDFView(entry.toURL());
                                } else {
                                openWebView(entry.toURL());
                                }
                                };
                                var onError = function(error) {
                                if (error.code == 3) {
                                if (device.platform === "Android"  || device.platform === "iOS") {
                                androidPDFView(localPath);
                                } else {
                                openWebView(localPath);
                                }
                                } else {
                                pdfEntry.remove(function() {}, function(error) {});
                                }
                                };
                                ft.download(remoteFile, localPath, onSuccess, onError);
                                }, function(error) {});
                    }
                    });
    } catch (e) {
        errorHandler("checkPDFDirExists", e);
    }
}

function checkETeacherDirExists(dir) {
    try {
        var existingFileName = "";
        existingFileName = getIssueFileName(viewFile);
        dir.getFile(existingFileName, {
                    create: false
                    }, localIssueFileExists, issueFileNotExists);
    } catch (e) {
        errorHandler("checkETeacherDirExists", e);
    }
}

function fail(evt) {
    msgBtnValue = resources.btnOk;
    msgTitle = resources.requestFail;
    msgStr = resources.generalFunctionError;
    if (supressWarningMsgs === false) {
        navigator.notification.confirm(msgStr, function() {
                                       hidePleaseWait;
                                       }, msgTitle, msgBtnValue);
    }
}

function hideKeyboard(event, stayPosition) {
    try {
        document.activeElement.blur();
        if (!stayPosition===true) {
            $("html, body").animate({
                                    scrollTop: 0
                                    });
        }
        if (device.platform === "Android") {
            hideAndroidKeyboard();
        }
        setTimeout(function() {
                   window.scrollTo(0, 0);
                   }, 0);
    } catch (e) {
        errorHandler("hideKeyboard", e);
    }
}


function errorHandler(transaction, e) {
    try {
        $(".errordivhead").html(resources.errordivhead);
        $(".errordivsupport").html(resources.errordivsupport);
        $(".errormessagediv").html(resources.errormessagediv);
        if (navigator.notification != undefined) {
            hidePleaseWait();
            if (device.platform === "Android") {
                clearTimeout(pw);
            }
        }
        strErrorMessage = transaction + " " + e;
        if (strErrorMessage.match("NETWORK_ERR") != null) {
            msgTitle = resources.connError;
            msgBtnValue = resources.btnOk;
            msgStr = resources.connectionFail;
            navigator.notification.confirm(msgStr, function() {
                                           hidePleaseWait();
                                           }, msgTitle, msgBtnValue);
        } else {
            goToPage("#errorpage");
        }
    } catch (ex) {}
}

function isUrl(s) {
    var regexp = /(http|https):\/\/?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
}

function replaceImg(s) {
    var formatted = s.replace(/<img([^>]*)\s*>/gi, "<img$1 />");
    return formatted;
}
var pw;

function showPleaseWait() {
    try {
      //alert("try");
        if (overrideLoadingMsg === false) {
            loadingSpinnerVisible = true;
            showLoadingScreen(defaultLoadingTime);
        }
    } catch (e) {
        errorHandler("showPleaseWait", e);
    }
}

function hidePleaseWait() {
    try {
        loadingSpinnerVisible = false;
        $.mobile.loading("hide");
        $(".ui-loader-default").hide();
    } catch (e) {
        errorHandler("hidePleaseWait", e);
    }
}

function showLoadingScreen(durationInSeconds) {
    try {
      //alert("try1");
        msgStr = "";
        msgTitle = "";
        $.mobile.loading("show", {
                         text: msgStr,
                         textVisible: false
                         });
        $(".ui-loader-default").show();
        
        setTimeout(function() {
                   $.mobile.loading("hide");
                   }, 36000);
    } catch (e) {
        errorHandler("showLoadingScreen", e);
    }
}

function setActiveClass(activeItem) {
    try {
        var id;
        if (activeItem === "sco" && activeSCO!==undefined) {
            id = "#sco-" + activeSCO.theorymodulesectionid + "-" + activeSCO.assetid;
            if ($(id) != undefined) {
                $(id).addClass("active-state");
                $(id).parent().addClass("active-state");
            }
        } else {
            if (activeItem === "module"  && activeModule!==undefined) {
                id = $("#module-" + activeModule.courseid + "-" + activeModule.basemoduleid);
                if ($(id) != undefined) {
                    $(id).addClass("active-state");
                    $(id).parent().addClass("active-state");
                }
            } else {
                if (activeItem === "worksheet" && activeSection!==undefined) {
                    id = "#ws-" + activeSection.theorymodulesectionid;
                    if ($(id) != undefined) {
                        $(id).addClass("active-state");
                        $(id).parent().addClass("active-state");
                    }
                }
            }
        }
    } catch (e) {
        errorHandler("setActiveClass", e);
    }
}

function resetStatusDisplay(type) {
    try {
        switch (type) {
            case "module":
                var id = "module-" + activeModule.courseid + "-" + activeModule.basemoduleid;
                var classStatus = setNewStatusClass(activeModule.status, activeModule.accessible);
                var modDiv = $("#" + id);
                if ($("#" + id) != undefined) {
                    $("#" + id).children(".limodtitleactive").children(".statuslock").removeClass("status1").removeClass("status2").removeClass("status3");
                    $("#" + id).children(".limodtitleactive").children(".statuslock").removeClass("statusns").removeClass("statusip").removeClass("statusac");
                    $("#" + id).children(".limodtitleactive").children(".statuslock").addClass(classStatus);
                }
                break;
            default:
                break;
        }
    } catch (e) {
        errorHandler("resetStatusDisplay", e);
    }
}

function setNewStatusClass(status, accessible) {
    var classStatus = "status1 statuscp";
    if (status == courseStatus.InProgress && accessible===true) {
        classStatus = "status1 statusip";
    } else if (status == courseStatus.InProgress && accessible===false) {
        classStatus = "status2 statusns";
    } else if (status == courseStatus.NotStarted && accessible===true) {
        classStatus = "status1 statusac";
    } else if (status == courseStatus.NotStarted && accessible===false) {
        classStatus = "status2 statusns";
    } else {
        if (status == courseStatus.Completed) {
            classStatus = "status1 statuscp";
        } else {
            if (status == courseStatus.Payment || status == courseStatus.PaymentPending) {
                classStatus = "status4 statusns";
            }
        }
    }
    return classStatus;
}

function resetControlGroup(group) {
    try {
        if (group === "questions") {
            $("#wsnextprevbtndiv").addClass("ui-corner-all").addClass("ui-controlgroup").addClass("ui-controlgroup-horizontal");
            $("#wsprevlink").removeClass("ui-btn-corner-all").removeClass("ui-shadow").addClass("ui-corner-left");
            $("#wsnextlink").removeClass("ui-btn-corner-all").removeClass("ui-shadow").addClass("ui-corner-right").addClass("ui-controlgroup-last");
        } else {
            $("#nextprevbtndiv").addClass("ui-corner-all").addClass("ui-controlgroup").addClass("ui-controlgroup-horizontal");
            $("#prevlink").removeClass("ui-btn-corner-all").removeClass("ui-shadow").addClass("ui-corner-left");
            $("#nextlink").removeClass("ui-btn-corner-all").removeClass("ui-shadow").addClass("ui-corner-right").addClass("ui-controlgroup-last");
        }
    } catch (e) {
        errorHandler("resetControlGroup", e);
    }
}


function getLatLong(schedule, address, returnFunction) {
    try {
        var latLngresult = "";
        if (schedule.latitude != 0 && schedule.longitude != 0) {
            latLngresult = schedule.latitude + "," + schedule.longitude;
            returnFunction(latLngresult);
        } else {
            var geo = new google.maps.Geocoder;
            geo.geocode({
                        address: address
                        }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                        schedule.latitude = results[0].geometry.location.lat();
                        schedule.longitude = results[0].geometry.location.lng();
                        latLngresult = results[0].geometry.location.lat() + "," + results[0].geometry.location.lng();
                        returnFunction(latLngresult);
                        }
                        });
        }
    } catch (e) {
        returnFunction("");
    }
}

function formatEmailBody(emailMessage) {
    try {
        var message = "<div style='width:100%; padding-bottom:1.5em'>";
        if (emailMessage != undefined && emailMessage.length > 0) {
            message += emailMessage.replace(/\r\n|\r|\n/g, "</div><div style='width:100%; padding-bottom:1.5em'>");
            message += "</div>";
            return message;
        }
    } catch (e) {
        return "";
    }
}

function setTheoryViewNavBtns() {
    try {
        $("#theorydatacontent").off("swiperight");
        $("#theorydatacontent").off("swipeleft");
        $("#theorydatacontent").on("swiperight", function(event) {
                                   if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined) {
                                   audioTheoryPaused = true;
                                   audioTheoryPlayer.pause();
                                   }
                                   if (swipeAction === false && loadingContent === false) {
                                   swipeAction = true;
                                   getContent(event, "prev");
                                   setTimeout(function() {
                                              swipeAction = false;
                                              }, 600);
                                   }
                                   });
        $("#theorydatacontent").on("swipeleft", function(event) {
                                   if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined) {
                                   audioTheoryPaused = true;
                                   audioTheoryPlayer.pause();
                                   }
                                   if (swipeAction === false  && loadingContent === false) {
                                   swipeAction = true;
                                   getContent(event, "next");
                                   setTimeout(function() {
                                              swipeAction = false;
                                              }, 600);
                                   }
                                   });
        $("#prevlink").off("vclick");
        $("#nextlink").off("vclick");
        $("#prevlink").on("vclick", function(event, ui) {
                          if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined) {
                          audioTheoryPaused = true;
                          audioTheoryPlayer.pause();
                          }
                          if (swipeAction === false) {
                          swipeAction = true;
                          getContent(event, "prev");
                          setTimeout(function() {
                                     swipeAction = false;
                                     }, 600);
                          }
                          
                          
                          });
        $("#nextlink").on("vclick", function(event, ui) {
                          if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined) {
                          audioTheoryPaused = true;
                          audioTheoryPlayer.pause();
                          }
                          if (swipeAction === false) {
                          swipeAction = true;
                          getContent(event, "next");
                          setTimeout(function() {
                                     swipeAction = false;
                                     }, 600);
                          }
                          
                          
                          });
        setPagePadderDiv("contentScroller", true);
    } catch (e) {
        errorHandler("setTheoryViewNavBtns", e);
    }
}

function setActiveMenuItem() {
    try {
        if ($("#ulcourses").is(":visible") && activeModule != undefined) {
            var id = "#module-" + activeModule.courseid + "-" + activeModule.basemoduleid;
            if ($(id) != undefined) {
                menuScroller.scrollToElement(id, 300);
            }
        }
    } catch (e) {}
}

function resetScrollers() {
    try {
        setPagePadderDiv("menuScroller", false);
        setPagePadderDiv("contentScroller", false);
        setPagePadderDiv("contentScroller", false);
        setPagePadderDiv("helpdeskScroller", false);
        setPagePadderDiv("scheduleScroller", false);
        setPagePadderDiv("mapScroller", false);
    } catch (e) {}
}

function goToSection(sectionStr) {
    try {
        var ids = sectionStr.split("-");
        var courseid = ids[1];
        var moduleid = ids[2];
        var sectionid = ids[3];
        var assetid = ids[4];
        $("#sectionsearchdiv input").val("");
        $("#autocomplete").empty();
        setPagePadderDiv("menuScroller", true);
        hideKeyboard(false, false);
        if(activeCourse===undefined || activeCourse.courseid!==courseid){
            activeCourse = portalCourses.getCourseById(courseid);
        }
        if(activeModule===undefined || activeModule.basemoduleid!==moduleid){
            activeModuleGroup = activeCourse.getModuleGroupByModuleId(moduleid);
            if(activeModuleGroup!==undefined){
                activeModule = activeModuleGroup.getModuleById(moduleid);
            }
        }
        
        if (activeModule !== undefined) {
            activeSection=undefined;
            activeSCO=undefined;
            var modType = getModuleType(activeModule.basemoduletypeid);
            populateSectionsList(modType, false, function(ret) {
                                 if (ret === true) {
                                 var coursesdiv = $("#menucontentcourse");
                                 var groupsdiv = $("#menucontentgroup");
                                 var scosdiv = $("#menucontentsection");
                                 var menudiv = $("#menucontentdiv");
                                 var moveElId = "#course-" + activeCourse.courseid;
                                 $("#changemenubtnli").show();
                                 $("#settingsmenubtnli").hide();
                                 $("#refreshbtnli").removeClass("settingsshow");
                                 activeModule.getSectionById(sectionid, function(ret) {
                                                             activeSection = ret;
                                                             if (activeSection != undefined) {
                                                             if (activeSection.inaccessiblefunction.length > 0) {
                                                             hidePleaseWait();
                                                             msgTitle = resources.sectionAccess;
                                                             msgBtnValue = resources.btnOk;
                                                             msgStr = resources.sectionIncomplete;
                                                             if (supressWarningMsgs === false) {
                                                             navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                                                             }
                                                             } else {
                                                             if (assetid > 0) {
                                                             activeSCO = activeSection.getSCOById(assetid);
                                                             }
                                                             setUserPosition(false, "#coursepage", false);
                                                             if ($(moveElId) != undefined) {
                                                             setTimeout(function() {
                                                                        menuScroller.refresh();
                                                                        menuScroller.scrollToElement(moveElId, 300);
                                                                        }, 100);
                                                             var moveModElId = "#module-" + activeModule.courseid + "-" + activeModule.basemoduleid;
                                                             setTimeout(function() {
                                                                        menuScroller.refresh();
                                                                        menuScroller.scrollToElement(moveModElId, 300);
                                                                        }, 100);
                                                             var moveSecElId = "#section-" + activeSection.theorymodulesectionid;
                                                             if ($(moveSecElId) != undefined) {
                                                             setTimeout(function() {
                                                                        menuScroller.refresh();
                                                                        scoMenuScroller.scrollToElement(moveSecElId, 300);
                                                                        $(moveSecElId).trigger("vclick");
                                                                        }, 100);
                                                             }
                                                             }
                                                             }
                                                             } else {
                                                             hidePleaseWait();
                                                             }
                                                             });
                                 }
                                 });
        } else {
            hidePleaseWait();
        }
    } catch (e) {}
}

function setRightHandMenuBtns() {
    try {
        
        $("#refreshbtn").off("vclick");
        $("#refreshbtn").on("vclick", function(event) {
                            event.preventDefault();
                            event.stopPropagation();
                            $(".extramenupanel").panel("close");
                            rhsMenuOpen = false;
                            mediaSetRefresh();
                            checkASDUserPodState(true, function(ret) {});
                            refreshMenu("refresh");
                            goToPage("#coursepage");
                            });
        $("#helpdeskmenubtn").off("vclick");
        $("#helpdeskmenubtn").on("vclick", function(event) {
                                 event.preventDefault();
                                 $(".extramenupanel").panel("close");
                                 rhsMenuOpen = false;
                                 destroyPlayers();
                                 audioTheoryPaused = true;
                                 goToPage("#helpdeskpage");
                                 });
        $("#podcastmenubtn").off("vclick");
        $("#podcastmenubtn").on("vclick", function(event) {
                                event.preventDefault();
                                showPleaseWait();
                                destroyPlayers();
                                goToPage("#coursepodcastpage");
                                });
        $("#eclassmenubtn").off("vclick");
        $("#eclassmenubtn").on("vclick", function(event) {
                               event.preventDefault();
                               showPleaseWait();
                               destroyPlayers();
                               //goToPage("#eclassvideopage");
                               EclassModule();
                               });

         $("#bookingmenubtn").off("vclick");
         $("#bookingmenubtn").on("vclick", function(event) {
                               event.preventDefault();
                               showPleaseWait();
                               destroyPlayers();
                               BookingModule();
                               });
         $("#eClassfooterleftbckbtn").off("vclick");
                                    $("#eClassfooterleftbckbtn").on("vclick", function(event) {
                                        goToPage("#coursepage");
                                    });
        $("#bookingfooterleftbckbtn").off("vclick");
                                            $("#bookingfooterleftbckbtn").on("vclick", function(event) {
                                                goToPage("#coursepage");
                                            });
        $("#videomenubtn").off("vclick");
        $("#videomenubtn").on("vclick", function(event) {
                              event.preventDefault();
                              $(".extramenupanel").panel("close");
                              rhsMenuOpen = false;
                              destroyPlayers();
                              setUserMediaPosition("video", "", "", "");
                              showPleaseWait();
                              goToPage("#podcastpage");
                              });
        $("#audiomenubtn").off("vclick");
        $("#audiomenubtn").on("vclick", function(event) {
                              event.preventDefault();
                              $(".extramenupanel").panel("close");
                              rhsMenuOpen = false;
                              destroyPlayers();
                              setUserMediaPosition("audio", "", "", "");
                              showPleaseWait();
                              goToPage("#podcastpage");
                              });
        $("#plistmenubtn").off("vclick");
        $("#plistmenubtn").on("vclick", function(event) {
                              event.preventDefault();
                              $(".extramenupanel").panel("close");
                              rhsMenuOpen = false;
                              destroyPlayers();
                              setUserMediaPosition("userplaylist", "", "", "");
                              showPleaseWait();
                              goToPage("#podcastpage");
                              
                              });
        $("#pdfmenubtn").off("vclick");
        $("#pdfmenubtn").on("vclick", function(event) {
              $(".extramenupanel").panel("close");
              rhsMenuOpen = false;
              destroyPlayers();
              if($("#menucontentsection").hasClass("menuopen")){

                var scobtn="";
                if(activeSection!==undefined){
                  activeSCO = activeSection.getFirstSCO();
                  scobtn = "#sco-" + activeSCO.theorymodulesectionid + "-" + activeSCO.assetid;
                  moveToSCOItem(scobtn, false);
                  if(activeModule.theoryModule.LSURLIsYUDU){
                    $("#contentprimary").append(loadingPDFGif);
                    coController.cogetYuduURL(activeModule.theoryModule.YUDUID,function(ret){
                        $(".pdfspinnerdiv").remove();
                        if(ret!= 0 && ret.getYuduPathResult != ""){
                            var yuduURL = ret.getYuduPathResult;
                            openWebView(yuduURL);
                            //openWebBrowser(yuduURL);
                        }
                        else{
                            msgTitle = resources.requestFail;
                            msgStr = resources.pdfViewer;
                            msgBtnValue = resources.btnOk;
                            navigator.notification.confirm(msgStr, function() {

                            }, msgTitle, msgBtnValue);
                        }

                    });
                  }else{
                    setTimeout(function() {
                        openNewPDF();
                    }, 300);
                  }

                }else{

                  if(activeModule!==undefined){
                    activeModule.getFirstSection(function(ret){
                      activeSection = ret;
                      if(activeSection!==undefined){
                        activeSCO = activeSection.getFirstSCO();
                        scobtn = "#sco-" + activeSCO.theorymodulesectionid + "-" + activeSCO.assetid;
                        moveToSCOItem(scobtn, false);
                        if(activeModule.theoryModule.LSURLIsYUDU){
                            $("#contentprimary").append(loadingPDFGif);
                            coController.cogetYuduURL(activeModule.theoryModule.YUDUID,function(ret){
                                $(".pdfspinnerdiv").remove();
                                if(ret!= 0  && ret.getYuduPathResult != ""){
                                    var yuduURL = ret.getYuduPathResult;
                                    openWebView(yuduURL);
                                    //openWebBrowser(yuduURL);
                                }
                                else{
                                    msgTitle = resources.requestFail;
                                    msgStr = resources.pdfViewer;
                                    msgBtnValue = resources.btnOk;
                                    navigator.notification.confirm(msgStr, function() {

                                    }, msgTitle, msgBtnValue);
                                }

                            });
                        }else{
                        setTimeout(function() {
                            openNewPDF();
                        }, 300);
                        }
                      }
                    });
                  }
                }
              }else{
                if(activeModule.theoryModule.LSURLIsYUDU){
                    $("#contentprimary").append(loadingPDFGif);
                    coController.cogetYuduURL(activeModule.theoryModule.YUDUID,function(ret){
                        $(".pdfspinnerdiv").remove();
                        if(ret!= 0 && ret.getYuduPathResult != ""){
                            var yuduURL = ret.getYuduPathResult;
                            openWebView(yuduURL);
                            //openWebBrowser(yuduURL);
                        }
                        else{
                            msgTitle = resources.requestFail;
                            msgStr = resources.pdfViewer;
                            msgBtnValue = resources.btnOk;
                            navigator.notification.confirm(msgStr, function() {

                            }, msgTitle, msgBtnValue);
                        }

                    });
                }else{
                setTimeout(function() {
                    openNewPDF();
                }, 300);
                }
              }
              event.preventDefault();
        });
        /*$("#pdfmenubtn").on("vclick", function(event) {
            //alert("hi");
              $(".extramenupanel").panel("close");
              rhsMenuOpen = false;
              destroyPlayers();
              if($("#menucontentsection").hasClass("menuopen")){
                //alert("if");
                var scobtn="";
                if(activeSection!==undefined){
                  activeSCO = activeSection.getFirstSCO();
                  scobtn = "#sco-" + activeSCO.theorymodulesectionid + "-" + activeSCO.assetid;
                  moveToSCOItem(scobtn, false);
                  setTimeout(function() {
                    openNewPDF();
                  }, 300);
                }else{
                  //alert("else");
                  if(activeModule!==undefined){
                    activeModule.getFirstSection(function(ret){
                      activeSection = ret;
                      if(activeSection!==undefined){
                        activeSCO = activeSection.getFirstSCO();
                        scobtn = "#sco-" + activeSCO.theorymodulesectionid + "-" + activeSCO.assetid;
                        moveToSCOItem(scobtn, false);
                        setTimeout(function() {
                          openNewPDF();
                        }, 300);
                      }
                    });
                  }
                }
              }else{
                setTimeout(function() {
                  openNewPDF();
                }, 300);
              }
              event.preventDefault();
        });*/

        //coded by MOHIT 08-01-2019
        function openNewPDF() {
            try {
                var url = "";
                if (activeModule != undefined && activeSection != undefined) {
                    var pdfDirectory = activeModule.basemoduleid.toString();
                    viewFile = "lessonmaterial.pdf";
                    hidePleaseWait();
                    if(docsFileDir!=undefined){
                        $("#contentprimary").append(loadingPDFGif);
                        theoryMediaDir.getDirectory(pdfDirectory, {
                            create: true,
                            exclusive: false
                        }, checkPDFDirExists, fail);
                        /*docsFileDir.getDirectory(pdfDirectory, {
                                                 create: true,
                                                 exclusive: false
                                                 }, checkPDFDirExists, fail);*/
                    }else if (theoryMediaDir != undefined) {

                        $("#contentprimary").append(loadingPDFGif);
                        theoryMediaDir.getDirectory(pdfDirectory, {
                                                    create: true,
                                                    exclusive: false
                                                    }, checkPDFDirExists, fail);
                    }
                }
                retry = true;
            } catch (e) {
                errorHandler("openPDF", e);
            }
        }


        $("#closemenubtn").off("vclick");
        $("#closemenubtn").on("vclick", function(event) {
                              $(".extramenupanel").panel("close");
                              event.preventDefault();
                              rhsMenuOpen = false;
                              });
        $("#mainlogoutbtn").off("vclick");
        $("#mainlogoutbtn").on("vclick", function(event) {
                               $(".extramenupanel").panel("close");
                               rhsMenuOpen = false;
                               event.preventDefault();
                               destroyPlayers();
                               logoutUser();
                               });
        $("#supportmenubtn").off("vclick");
        $("#supportmenubtn").on("vclick", function(event) {
                                try {
                                event.preventDefault();
                                $(".extramenupanel").panel("close");
                                rhsMenuOpen = false;
                                destroyPlayers();
                                audioTheoryPaused = true;
                                goToPage("#supportpage");
                                } catch (e) {
                                errorHandler("supportmenubtn vclick", e);
                                }
                                });
    } catch (e) {
        errorHandler("setRightHandMenuBtns", e);
    }
}
var myCheck = false;
function BookingModule(){
    try{
        coController.coCheckNetworkAvaliable(false, function(ret) {
            if (ret === false || deviceIsOnline === false) {
                msgStr = resources.connectLogin;
                msgTitle = resources.connError;
                msgBtnValue = resources.btnOk;
                navigator.notification.confirm(msgStr, function() {

                }, msgTitle, msgBtnValue);
            }
            else{
                goToPage("#bookingPage");
                getMyCurrentBookingSchedule(false, function(ret){
                    console.log(ret);
                    if(ret == 0){
                        msgTitle = resources.connError;
                        msgBtnValue = resources.btnOk;
                        msgStr = resources.moduleOffline;
                        navigator.notification.confirm(msgStr, function() {
                            $("#mloader").remove();
                            goToPage("#coursepage");
                        }, msgTitle, msgBtnValue);
                    }
                    else{
                        $("#AvailableBookingsul").empty();
                        var CurrentBooking = ret.getCurrentBookingsResult.Data.bookings.currentBookings;
                        var CurrentBookingLi = "";
                        var itemHeadLess = "";
                        var showPassowrd = "NotPassowrd";
                        var showPassowrdStar = "NotStar";
                        if(CurrentBooking == null){
                            var NoBooking = "<p style='text-align:center'>You are not currently booked into any Assessment Booking.</p>"
                            $("#AvailableBookingsul").append(NoBooking);
                        }else{
                            for(var i=0; i< CurrentBooking.length; i++){
                                if(CurrentBooking[i].ShowAttendButton == "True"){
                                    showPassowrd = 'showPassowrd';
                                    showPassowrdStar = "ShowStar";
                                    itemHeadLess = "lesswidth";
                                    CurrentBookingLi += '<li data-theme="h" class="ui-bar-h clientheader ui-li ui-li-divider ui-first-child" style="padding: 0px 0px 0px 16px;background: #8c9090 !important;min-height: 32px;"><div class="bookingdatehead" style="color: white;white-space: normal !important;font-size:0.8em;font-weight:bold;margin-top: 6px;">'+CurrentBooking[i].moduleTitle+'</div></li>'

                                    CurrentBookingLi += '<li style="padding-bottom: 0px;padding-top: 0px;padding-right: 0px;min-height: 36px;" class="scheduleitem  ui-li-static ui-body-h" data-theme="h"><div style="width: 100%;min-height: 32px;" class="scheduleitemmain"><div id=head'+CurrentBooking[i].AssessmentBookingId+' class="scheduleitemhead '+itemHeadLess+'">'+CurrentBooking[i].ScheduledDate+', '+CurrentBooking[i].ScheduledTime+'</div><div style="width: 69%;float: left;padding-top: 0px;"><div class=UpattendBtnBModule style="float:right !important;    font-size: 0.8em;width: 40px;;min-height: 19px;padding-top: 12px;"><a style="color: white;" class=attendBtn ui-btn ui-btn-h" data-theme="h"  id="'+CurrentBooking[i].ZoomStartURL+'">'+resources.AttendBtn+'</a></div><img id="'+CurrentBooking[i].AssessmentItemId+'" alt="'+CurrentBooking[i].ZoomMeetingPassword+'" style="display:none;height: 19px;float: right;padding-top: 10px;width:20px;" class="'+showPassowrd+'" src="css/client/images/passwordHide.png" ><div id=hide-'+CurrentBooking[i].AssessmentItemId+' style="float:right;font-size: 0.8em;padding-top: 13px;letter-spacing: 3px;display:none;" class='+showPassowrdStar+'>******</div></div></div></li>';
                                    showPassowrd = "NotPassowrd";
                                    showPassowrdStar = "NotStar";
                                }else{
                                    if(CurrentBooking[i].IsAllowed == "False"){
                                        CurrentBookingLi += '<li data-theme="h" class="ui-bar-h clientheader ui-li ui-li-divider ui-first-child" style="padding: 0px 0px 0px 16px;background: #8c9090 !important;min-height: 32px;"><div class="bookingdatehead" style="color: white;white-space: normal !important;font-size:0.8em;font-weight:bold;margin-top: 6px;">'+CurrentBooking[i].moduleTitle+'</div></li>'

                                        CurrentBookingLi += '<li style="padding-bottom: 0px;padding-top: 0px;padding-right: 0px;min-height: 36px;" class="scheduleitem  ui-li-static ui-body-h" data-theme="h"><div style="width: 100%;min-height: 32px;" class="scheduleitemmain"><div id=head'+CurrentBooking[i].AssessmentBookingId+' class="scheduleitemhead">'+CurrentBooking[i].ScheduledDate+', '+CurrentBooking[i].ScheduledTime+'</div><div class=Upnocancel style="float:right !important;    font-size: 0.8em;;min-height: 19px;padding-top: 12px;background-color: #ef5351;"><a style="color: white;" class=nocancel ui-btn ui-btn-h" data-theme="h" >'+resources.cancelbtntxt+'</a></div></div></li>';
                                    }else{
                                        CurrentBookingLi += '<li data-theme="h" class="ui-bar-h clientheader ui-li ui-li-divider ui-first-child" style="padding: 0px 0px 0px 16px;background: #8c9090 !important;min-height: 32px;"><div class="bookingdatehead" style="color: white;white-space: normal !important;font-size:0.8em;font-weight:bold;margin-top: 6px;">'+CurrentBooking[i].moduleTitle+'</div></li>'

                                        CurrentBookingLi += '<li style="padding-bottom: 0px;padding-top: 0px;padding-right: 0px;min-height: 36px;" class="scheduleitem  ui-li-static ui-body-h" data-theme="h"><div style="width: 100%;min-height: 32px;" class="scheduleitemmain"><div id=head'+CurrentBooking[i].AssessmentBookingId+' class="scheduleitemhead">'+CurrentBooking[i].ScheduledDate+', '+CurrentBooking[i].ScheduledTime+'</div><div class=Upcancelschedulebtn  style="float:right !important;  padding: 5px;  font-size: 0.8em;min-height: 19px;padding-top: 12px;background-color: #ef5351;"><a style="color: white;" class=cancelschedulebtn ui-btn ui-btn-h" data-theme="h" id="'+CurrentBooking[i].AssessmentBookingId+"-"+CurrentBooking[i].AssessmentItemId+"-"+CurrentBooking[i].BaseModuleId+'">'+resources.cancelbtntxt+'</a></div></div></li>';
                                    }
                                }

                            }

                            $("#AvailableBookingsul").append(CurrentBookingLi);

                        }
                    }
                    });
                }
            });

             $(document).off("vclick","img.showPassowrd");
             $(document).on("vclick","img.showPassowrd", function(event) {
                    event.preventDefault();
                    console.log($(this).attr('alt'));
                    var PasswordCurrentEle = $(this).attr('alt');
                    var idCurrentEle = $(this).attr('id');
                    var id= "#"+idCurrentEle;
                    var headId = "#head"+idCurrentEle;
                    $(headId).width('56%');
                    var hidePassword ="#hide-"+idCurrentEle;
                    $(hidePassword).remove();
                    navigator.notification.activityStart("Copy", "Password copying to clipboard");
                     var copyText = PasswordCurrentEle;
                     var input = document.createElement('input');
                     input.setAttribute('value', copyText);
                     document.body.appendChild(input);
                     input.select();
                     var result = document.execCommand('copy');
                     document.body.removeChild(input);
                     console.log(result);
                       setTimeout(function() {
                            navigator.notification.activityStop();
                       }, 2000);
                   $(id).after("<img id="+idCurrentEle+" alt="+PasswordCurrentEle+" style='padding-left: 5px;display:block;height: 19px;float: right;padding-top: 8px;' class='copyClip' src='css/client/images/passwordShow.png' ><div id="+PasswordCurrentEle+" class=copyClip style='float:right;font-size: 0.8em;padding-top: 12px;'>"+PasswordCurrentEle+"</div>").remove();
             });


             $(document).off("vclick","img.copyClip");
             $(document).on("vclick","img.copyClip", function(event) {
                    event.preventDefault();
                    console.log($(this).attr('alt'));
                    var PasswordCurrentEle = $(this).attr('alt');
                    var EmptyPass = "#"+PasswordCurrentEle;
                    var idCurrentEle = $(this).attr('id');
                    var id= "#"+idCurrentEle;
                    var headId = "#head"+idCurrentEle;
                    $(headId).width('56%');
                    $(EmptyPass).remove('');
                   //  <img id="'+CurrentEclasses[i].eClassBookingId+'" alt="'+CurrentEclasses[i].ZoomMeetingPassword+'" style="display:none;height: 21px;float: left;" class="'+showPassowrd+'" src="css/client/images/passwordHide.png" >

                    $(id).after("<img id="+idCurrentEle+" alt="+PasswordCurrentEle+" style='height: 17px;float: right;padding-top: 11px;'' class=showPassowrd src='css/client/images/passwordHide.png' ><div id=hide-"+idCurrentEle+" style='float:right;font-size: 0.8em;padding-top: 13px;letter-spacing: 3px;'>******</div>").remove();
             });
            $(document).off("vclick","a.attendBtn");
            $(document).on("vclick","a.attendBtn", function(event) {
                var id = $(event.currentTarget).attr("id");
                openWebBrowser(id);
            });

            $(document).off("vclick","a.nocancel");
            $(document).on("vclick","a.nocancel", function(event) {
                noCancelBookSchedule(event);
            });

            $(document).off("vclick","a.cancelschedulebtn");
            $(document).on("vclick","a.cancelschedulebtn", function(event) {
                var id = $(event.currentTarget).attr("id");
                var ids = id.split("-");
                var AssessmentBookingId = ids[0];
                var AssessmentItemId = ids[1];
                var BaseModuleId = ids[2];
                coController.coCheckNetworkAvaliable(false, function(ret) {
                    if (ret === false || deviceIsOnline === false) {
                        msgStr = resources.eclassesFail;
                        msgTitle = resources.eclassesNew;
                        msgBtnValue = resources.btnOk;
                        navigator.notification.confirm(msgStr, function() {

                        }, msgTitle, msgBtnValue);
                    }
                    else{
                       deleteCurrentBookingSchedule(AssessmentItemId,AssessmentBookingId, function(ret){
                            console.log(ret);
                            //refreshMenu("refresh");
                            //goToPage("#coursepage");
                            if(ret.cancelMyCurrentBookingResult){
                                msgStr = resources.eclassesCancel;
                                msgTitle = resources.bookingHead;
                                msgBtnValue = resources.btnOk;
                                navigator.notification.confirm(msgStr, function() {
                                    goToPage("#bookingPage");
                                    BookingModule();
                                }, msgTitle, msgBtnValue);
                            }
                            else{
                                msgStr = resources.eclassesFail;
                                msgTitle = resources.bookingHead;
                                msgBtnValue = resources.btnOk;
                                navigator.notification.confirm(msgStr, function() {

                                }, msgTitle, msgBtnValue);
                            }

                        });
                    }
                });

                //CancelBookScheduleCustom(event);
            });
    }catch(e){
        errorHandler("BookingModule", e);
    }
}


function EclassModule(){
    try {
        coController.coCheckNetworkAvaliable(false, function(ret) {
            if (ret === false || deviceIsOnline === false) {
                msgStr = resources.connectLogin;
                msgTitle = resources.connError;
                msgBtnValue = resources.btnOk;
                navigator.notification.confirm(msgStr, function() {

                }, msgTitle, msgBtnValue);
            }
            else{
                goToPage("#eClasse");
                var nowDate = new Date();
                var UTC_offset = nowDate.getTimezoneOffset();
                var isStudentDTS = isObservingDTS();
                var currentStudentOffset = getTimeZoneOffsetBasedOnDTS(nowDate, isStudentDTS);
                var getTimezoneAbbreviationFn = getTimezoneAbbreviation(nowDate, isStudentDTS);
                getMyCurrentEClassSchedule(false, UTC_offset,isStudentDTS,currentStudentOffset,getTimezoneAbbreviationFn, function(ret){
                    //console.log(ret);
                    if(ret == 0){
                        msgTitle = resources.connError;
                        msgBtnValue = resources.btnOk;
                        msgStr = resources.moduleOffline;
                        navigator.notification.confirm(msgStr, function() {
                            $("#mloader").remove();
                            goToPage("#coursepage");
                        }, msgTitle, msgBtnValue);
                    }
                    else{
                        $("#bookingdisclaimerdiv").hide();
                        $("#CurrentEclassesul").empty();
                        var CurrentEclasses = ret.GetMyCurrentEClassScheduleResult.Data.myeclasses.myCurrentEClassSchedule;
                        //console.log(availableEclasses.length);
                        if(CurrentEclasses == null){
                            var NoClasses = "<p>You are not currently booked into any eClasses.</p>"
                            $("#CurrentEclassesul").append(NoClasses);
                        }else{
                            var CurrentEclassLi = "";
                            var CancelclassForAvai;
                            var CancelBookBtn;
                            var btnText = 'Cancel';
                            var showPassowrd = "NotPassowrd";
                            var showPassowrdStar = "NotStar";
                            for(var i=0; i< CurrentEclasses.length; i++){
                                if(CurrentEclasses[i].IsAllowedCancel){
                                    CancelclassForAvai = "eclassCancelbtn";
                                    CancelBookBtn = "bookbtn";

                                }
                                else{
                                    CancelclassForAvai = "eclassNotbookbtn";
                                    CancelBookBtn = "Notbookbtn";
                                }
                                console.log(CurrentEclasses[i].IsAttendEclassEnabled);
                                if(CurrentEclasses[i].IsAttendEclassEnabled == 'True'){
                                    console.log('in'+ CurrentEclasses[i].IsAttendEclassEnabled);
                                    btnText = 'Attend';
                                    showPassowrd = 'showPassowrd';
                                     showPassowrdStar = "ShowStar";
                                     CancelBookBtn = "bookbtnGreen";
                                }
                                if(CurrentEclasses[i].ClassName != null){
                                    CurrentEclassLi += '<li data-theme="h" class="ui-bar-h clientheader ui-li ui-li-divider ui-first-child" style="padding: 0px 0px 0px 16px;background: #8c9090 !important;min-height: 32px;"><div class="bookingdatehead" style="color: white;white-space: normal !important;font-size:0.8em;font-weight:bold;margin-top: 6px;">'+CurrentEclasses[i].ClassName+'</div></li>'

                                    CurrentEclassLi += '<li style="padding-top: 0px;padding-right: 0px;padding-bottom: 0px;" class="scheduleitem  ui-li-static ui-body-h" data-theme="h"><div style="width:100%;min-height: 34px;" class="scheduleitemmain"><div style="padding-top: 10px;width: 63%;" id=head'+CurrentEclasses[i].eClassBookingId+' class="scheduleitemhead">'+CurrentEclasses[i].ScheduledDate+', '+CurrentEclasses[i].ScheduledTime+'</div><div id=hide-'+CurrentEclasses[i].eClassBookingId+' style="float:left;font-size: 0.8em;padding-top: 11px;letter-spacing: 3px;display:none;" class='+showPassowrdStar+'>******</div><img id="'+CurrentEclasses[i].eClassBookingId+'" alt="'+CurrentEclasses[i].ZoomMeetingPassword+'" style="display:none;height: 21px;float: left;padding-top: 8px;" class="'+showPassowrd+'" src="css/client/images/passwordHide.png" ><div class="'+CancelBookBtn+'" style="float:right !important;    font-size: 0.8em;min-height: 21px;padding-top: 10px;"><a class="'+CancelclassForAvai+' ui-btn ui-btn-h" data-theme="h" href="'+CurrentEclasses[i].URL+'" id="'+CurrentEclasses[i].eClassBookingId+'">'+btnText+'</a></div></div></li>';
                                    //CurrentEclassLi += '<li class="scheduleitem  ui-li-static ui-body-h" data-theme="h"><div class="scheduleitemmain"><div class="scheduleitemhead">'+CurrentEclasses[i].ScheduledDate+', '+CurrentEclasses[i].ScheduledTime+'</div><div class="'+CancelBookBtn+'" style="float:right !important;    font-size: 0.7em;"><a class="'+CancelclassForAvai+' ui-btn ui-btn-h" data-theme="h" href="'+CurrentEclasses[i].URL+'" id="'+CurrentEclasses[i].eClassBookingId+'">'+btnText+'</a></div></div></li>';
                                    //CurrentEclassLi += '<li class="scheduleitem  ui-li-static ui-body-h" data-theme="h"><div class="scheduleitemmain"><div id=head'+CurrentEclasses[i].eClassBookingId+' class="scheduleitemhead">'+CurrentEclasses[i].ScheduledDate+', '+CurrentEclasses[i].ScheduledTime+'</div><img id="'+CurrentEclasses[i].eClassBookingId+'" alt="'+CurrentEclasses[i].ZoomMeetingPassword+'" style="display:none;height: 21px;float: left;" class="'+showPassowrd+'" src="css/client/images/password.png" ><div class="'+CancelBookBtn+'" style="float:right !important;    font-size: 0.7em;"><a class="'+CancelclassForAvai+' ui-btn ui-btn-h" data-theme="h" href="'+CurrentEclasses[i].ZoomStartURL+'" id="'+CurrentEclasses[i].eClassBookingId+'">'+btnText+'</a></div></div></li>';
                                    btnText = 'Cancel';
                                    showPassowrd = "NotPassowrd";
                                    showPassowrdStar = "NotStar";
                                }


                            }
                            $("#CurrentEclassesul").append(CurrentEclassLi);
                        }
                    }
                });
                getMyAvailableEClasses(false, UTC_offset,isStudentDTS,currentStudentOffset,getTimezoneAbbreviationFn, function(ret){
                    //console.log(ret);
                    if(ret == 0){
                        msgTitle = resources.connError;
                        msgBtnValue = resources.btnOk;
                        msgStr = resources.moduleOffline;
                        navigator.notification.confirm(msgStr, function() {
                            $("#mloader").remove();
                            goToPage("#coursepage");
                        }, msgTitle, msgBtnValue);
                    }
                    else{
                        $("#AvailableEclassesul").empty();
                        var availableEclasses = ret.getMyAvailableEClassesNewResult.Data.myeclasses.availableEclasses;
                        //console.log(availableEclasses.length);
                        if(availableEclasses == null){
                            var NoClasses = "<p>No Available eClasses</p>"
                            $("#AvailableEclassesul").append(NoClasses);
                        }else{
                            var EclassLi = "";
                            var classForAvai;
                            var BookBtn;
                            for(var i=0; i< availableEclasses.length; i++){
                                /*if(availableEclasses[i].IsAllowedBook){
                                    classForAvai = "eclassbookbtn";
                                    BookBtn = "bookbtn";
                                }
                                else{
                                    classForAvai = "eclassNotbookbtn";
                                    BookBtn = "Notbookbtn";
                                }*/
                                if(availableEclasses[i].ClassName != null){
                                    EclassLi += '<li data-theme="h" class="ui-bar-h clientheader ui-li ui-li-divider ui-first-child" style="padding: 0px 0px 0px 16px;background: #8c9090 !important;min-height: 32px;"><div class="bookingdatehead" style="color: white;white-space: normal !important;font-size:0.8em;font-weight:bold;margin-top: 6px;">'+availableEclasses[i].ClassName+'</div></li>'

                                    for(var k=0; k< availableEclasses[i].ScheduledDateCollection.length; k++){
                                        if(availableEclasses[i].ScheduledDateCollection[k].IsAllowedBook){
                                            classForAvai = "eclassbookbtn";
                                            BookBtn = "bookbtnGreen";
                                        }
                                        else{
                                            classForAvai = "eclassNotbookbtn";
                                            BookBtn = "Notbookbtn";
                                        }
                                        EclassLi += '<li style="padding-top: 0px;padding-right: 0px;padding-bottom: 0px;" class="scheduleitem  ui-li-static ui-body-h" data-theme="h"><div style="width:100%;min-height: 34px;" class="scheduleitemmain"><div class="scheduleitemhead" style="padding-top: 10px;">'+availableEclasses[i].ScheduledDateCollection[k].ScheduledDate+', '+availableEclasses[i].ScheduledDateCollection[k].ScheduledTime+'</div><div style="font-size:0.8em !important;float: right;min-height: 21px;padding-top: 10px;" class="'+BookBtn+'" style="float:right !important;"><a class="'+classForAvai+' ui-btn ui-btn-h" data-theme="h" href="javascript:void(0);" id="'+availableEclasses[i].ScheduledDateCollection[k].eClassScheduleID+'">BOOK</a></div></div></li>'
                                    }
                                    //EclassLi += '<li class="scheduleitem  ui-li-static ui-body-h" data-theme="h"><div class="scheduleitemmain"><div class="scheduleitemhead">'+availableEclasses[i].ScheduledDate+', '+availableEclasses[i].ScheduledTime+'</div><div class="'+BookBtn+'" style="float:right !important;    font-size: 0.7em;"><a class="'+classForAvai+' ui-btn ui-btn-h" data-theme="h" href="javascript:void(0);" id="'+availableEclasses[i].eClassScheduleID+'">BOOK</a></div></div></li>'
                                }


                            }

                            $("#AvailableEclassesul").append(EclassLi);
                            if(!myCheck){
                                $(".availableClass").addClass("active");
                                var avaialableClassHeight = $(".testT").prop('scrollHeight') + 'px';
                                $(".testT").css("max-height",avaialableClassHeight);
                                if($(".currentCalss").hasClass("active")){
                                    var currentclassHeight = $(".testTNew").prop('scrollHeight') + 'px';
                                    $(".testTNew").css("max-height",currentclassHeight);
                                    //console.log($(".testTNew").prop('scrollHeight'));
                                }
                            }
                            else{
                                $(".availableClass").removeClass("active");
                                $(".currentCalss").addClass("active");
                                $(".testT").removeAttr("style");
                                var currentclassHeight = $(".testTNew").prop('scrollHeight') + 'px';
                                $(".testTNew").css("max-height",currentclassHeight);
                            }
                            //$("#AvailableEclassesul").append(EclassLi);
                            //console.log($(".testT").prop('scrollHeight'));

                            //$(".currentCalss").removeClass("active");
                            //$(".testTNew").css("max-height","0px");
                        }

                    }
                });
            }
        });

        //$(".eclassbookbtn").off("vclick");
        $(document).off("vclick","a.eclassbookbtn");
        $(document).on("vclick","a.eclassbookbtn", function(event) {
            event.preventDefault();
            console.log($(this).attr("id"));
            var eClassScheduleID = $(this).attr("id");
            coController.coCheckNetworkAvaliable(false, function(ret) {
                if (ret === false || deviceIsOnline === false) {
                    msgStr = resources.eclassesFail;
                    msgTitle = resources.eclassesNew;
                    msgBtnValue = resources.btnOk;
                    navigator.notification.confirm(msgStr, function() {

                    }, msgTitle, msgBtnValue);
                }
                else{
                    bookMyAvailableEClasses(false, eClassScheduleID, function(ret){
                        console.log(ret);
                        if(ret.BookMyAvailableEClassesResult){
                            msgStr = resources.eclassesSuccess;
                            msgTitle = resources.eclassesNew;
                            msgBtnValue = resources.btnOk;
                            navigator.notification.confirm(msgStr, function() {
                                goToPage("#eClasse");
                                myCheck = true;
                                EclassModule();

                            }, msgTitle, msgBtnValue);

                        }
                        else{
                            msgStr = resources.eclassesFail;
                            msgTitle = resources.eclassesNew;
                            msgBtnValue = resources.btnOk;
                            navigator.notification.confirm(msgStr, function() {

                            }, msgTitle, msgBtnValue);
                        }
                    });
                }
            });
        });


       $(document).off("vclick","img.showPassowrd");
       $(document).on("vclick","img.showPassowrd", function(event) {
            event.preventDefault();
            console.log($(this).attr('alt'));
            var PasswordCurrentEle = $(this).attr('alt');
            var idCurrentEle = $(this).attr('id');
            var id= "#"+idCurrentEle;
            var headId = "#head"+idCurrentEle;
            $(headId).width('62%');
            var hidePassword ="#hide-"+idCurrentEle;
            $(hidePassword).remove();
            navigator.notification.activityStart("Copy", "Password copying to clipboard");
             var copyText = PasswordCurrentEle;
             var input = document.createElement('input');
             input.setAttribute('value', copyText);
             document.body.appendChild(input);
             input.select();
             var result = document.execCommand('copy');
             document.body.removeChild(input);
             console.log(result);
               setTimeout(function() {
                    navigator.notification.activityStop();
               }, 2000);
           $(id).after("<div id="+PasswordCurrentEle+" class=copyClip style='float:left;font-size: 0.8em;padding-top: 10px;'>"+PasswordCurrentEle+"</div><img id="+idCurrentEle+" alt="+PasswordCurrentEle+" style='padding-left: 5px;display:block;height: 21px;float: left;padding-top: 5px;' class='copyClip' src='css/client/images/passwordShow.png' >").remove();
       });


       $(document).off("vclick","img.copyClip");
       $(document).on("vclick","img.copyClip", function(event) {
            event.preventDefault();
            console.log($(this).attr('alt'));
            var PasswordCurrentEle = $(this).attr('alt');
            var EmptyPass = "#"+PasswordCurrentEle;
            var idCurrentEle = $(this).attr('id');
            var id= "#"+idCurrentEle;
            var headId = "#head"+idCurrentEle;
            $(headId).width('62%');
            $(EmptyPass).remove('');
           //  <img id="'+CurrentEclasses[i].eClassBookingId+'" alt="'+CurrentEclasses[i].ZoomMeetingPassword+'" style="display:none;height: 21px;float: left;" class="'+showPassowrd+'" src="css/client/images/passwordHide.png" >

            $(id).after("<div id=hide-"+idCurrentEle+" style='float:left;font-size: 0.8em;padding-top: 11px;letter-spacing: 3px;'>******</div><img id="+idCurrentEle+" alt="+PasswordCurrentEle+" style='padding-left:3px;height: 21px;float: left;width: 25px;padding-top: 8px;'' class=showPassowrd src='css/client/images/passwordHide.png' >").remove();
       });


        $(document).off("vclick","a.eclassCancelbtn");
        $(document).on("vclick","a.eclassCancelbtn", function(event) {
            event.preventDefault();
            console.log($(this).text());
            var EClassurl = $(this).attr('href');
            var TextCanAtt = $(this).text();
            var eClassBookingId = $(this).attr("id");
            if(TextCanAtt == 'Cancel'){
                coController.coCheckNetworkAvaliable(false, function(ret) {
                    if (ret === false || deviceIsOnline === false) {
                        msgStr = resources.eclassesFail;
                        msgTitle = resources.eclassesNew;
                        msgBtnValue = resources.btnOk;
                        navigator.notification.confirm(msgStr, function() {

                        }, msgTitle, msgBtnValue);
                    }
                    else{

                        cancelMyCurrentClasses(false, eClassBookingId, function(ret){
                            console.log(ret);
                            //refreshMenu("refresh");
                            //goToPage("#coursepage");
                            if(ret.cancelMyCurrentClassesResult){
                                msgStr = resources.eclassesCancel;
                                msgTitle = resources.eclassesNew;
                                msgBtnValue = resources.btnOk;
                                navigator.notification.confirm(msgStr, function() {
                                    goToPage("#eClasse");
                                    myCheck = false;
                                    EclassModule();
                                }, msgTitle, msgBtnValue);
                            }
                            else{
                                msgStr = resources.eclassesFail;
                                msgTitle = resources.eclassesNew;
                                msgBtnValue = resources.btnOk;
                                navigator.notification.confirm(msgStr, function() {

                                }, msgTitle, msgBtnValue);
                            }

                        });
                    }
                });
            }
            else{
                coController.coCheckNetworkAvaliable(false, function(ret) {
                    if (ret === false || deviceIsOnline === false) {
                        msgStr = resources.eclassesFail;
                        msgTitle = resources.eclassesNew;
                        msgBtnValue = resources.btnOk;
                        navigator.notification.confirm(msgStr, function() {

                        }, msgTitle, msgBtnValue);
                    }
                    else{
                        openWebBrowser(EClassurl);
                        getUpdatedEClassAttendence(false, eClassBookingId, function(ret){
                            console.log(ret);
                            //refreshMenu("refresh");
                            //goToPage("#coursepage");
                            if(ret.getUpdatedEClassAttendenceResult){
                                /*msgStr = resources.eclassesCancel;
                                msgTitle = resources.eclassesNew;
                                msgBtnValue = resources.btnOk;
                                navigator.notification.confirm(msgStr, function() {
                                    //goToPage("#eClasse");
                                    //EclassModule();
                                }, msgTitle, msgBtnValue);*/
                            }
                            else{
                                msgStr = resources.eclassesFail;
                                msgTitle = resources.eclassesNew;
                                msgBtnValue = resources.btnOk;
                                navigator.notification.confirm(msgStr, function() {

                                }, msgTitle, msgBtnValue);
                            }

                        });
                    }
                });
            }
            /*coController.coCheckNetworkAvaliable(false, function(ret) {
                if (ret === false || deviceIsOnline === false) {
                    msgStr = resources.eclassesFail;
                    msgTitle = resources.eclassesNew;
                    msgBtnValue = resources.btnOk;
                    navigator.notification.confirm(msgStr, function() {

                    }, msgTitle, msgBtnValue);
                }
                else{
                    cancelMyCurrentClasses(false, eClassBookingId, function(ret){
                        console.log(ret);
                        //refreshMenu("refresh");
                        //goToPage("#coursepage");
                        if(ret.cancelMyCurrentClassesResult){
                            msgStr = resources.eclassesCancel;
                            msgTitle = resources.eclassesNew;
                            msgBtnValue = resources.btnOk;
                            navigator.notification.confirm(msgStr, function() {
                                goToPage("#eClasse");
                                EclassModule();
                            }, msgTitle, msgBtnValue);
                        }
                        else{
                            msgStr = resources.eclassesFail;
                            msgTitle = resources.eclassesNew;
                            msgBtnValue = resources.btnOk;
                            navigator.notification.confirm(msgStr, function() {

                            }, msgTitle, msgBtnValue);
                        }

                    });
                }
            });*/
        });
    }catch (e) {
        console.log(e);
    }
}

function resetFileDownload(removePending) {
    try {
        var ftTransfer, ft, fileEntry, item, fileType, progressSpanId, progressId, progressBarId, btnId, audioId, plAudioId, i, y, pl, pli;
        if (fileTransfers !== undefined && fileTransfers.length > 0) {
            for (i = 0; i < fileTransfers.length; i++) {
                ftTransfer = fileTransfers[i];
                ft = ftTransfer.ftitem;
                fileEntry = ftTransfer.file;
                item = ftTransfer.item;
                fileType = ftTransfer.type;
                try {
                    ft.abort();
                } catch (e) {}
                ft = null;
                if (fileEntry !== undefined) {
                    try {
                        fileEntry.remove();
                    } catch (e) {}
                }
                if (item !== undefined && fileType === "audiomix") {
                    progressSpanId = ftTransfer.spanid;
                    progressId = ftTransfer.progressid;
                    btnId = ftTransfer.btnid;
                    progressBarId = ftTransfer.barid;
                    $("#" + progressSpanId).html("0" + resources.percent);
                    $("#" + progressId).hide();
                    $("#" + progressBarId).hide();
                    $("#" + progressSpanId).hide();
                    $("#" + btnId).show();
                    $("#" + btnId).removeClass("ui-btn-active");
                    for (var z = 0; z < item.audios.length; z++) {
                        var aud1 = item.audios[z];
                        var id = "#podcastlidiv-" + aud1.categoryid + "-" + aud1.audioid + " .mediabuttonsdiv";
                        $(id).removeClass("nodisplay");
                        aud1.mixdownloaded = false;
                    }
                    item.audioisdownloading = -1;
                    item.audiomixdownloaded = false;
                    item.audiomixurl = "";
                    activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                } else {
                    if (item !== undefined && fileType !== undefined && fileType.length > 0) {
                        item.isdownloaded = false;
                        item.fileuri = "";
                        item.downloading = -1;
                        activeUser.saveFilesList(undefined, fileType, false, function() {});
                        progressSpanId = ftTransfer.spanid;
                        progressId = ftTransfer.progressid;
                        btnId = ftTransfer.btnid;
                        progressBarId = ftTransfer.barid;
                        $("#" + progressId).hide();
                        $("#" + progressSpanId).hide();
                        $("#" + progressBarId).hide();
                        $("#" + btnId).show();
                        $("#" + btnId).removeClass("active-state").removeClass("ui-btn-active");
                        if(fileType.length>0 && fileType==="audiocategories" && activeUser.userplaylists !== undefined && activeUser.userplaylists.length>0){
                            audioId=item.audioid;
                            $(".pba-" + audioId).hide();
                            $(".pbw-" + audioId).hide();
                            $(".btn-" + audioId).show();
                            plAudioId=audioId.replace("mp3","");
                            for ( y = 0; y < activeUser.userplaylists.length; y++){
                                pl =activeUser.userplaylists[y];
                                if(pl.playlistitems!==undefined && pl.playlistitems.length > 0){
                                    for (var x=0; x<pl.playlistitems.length; x++){
                                        pli =pl.playlistitems[x];
                                        if(pli.audioid===parseInt(plAudioId,10)){
                                            pli.isdownloaded=false;
                                            pli.downloading=-1;
                                            pli.fileuri="";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (thumbnailsToDownload !== undefined && thumbnailsToDownload.length > 0) {
            if (thumbnailTransfers !== undefined && thumbnailTransfers.length > 0) {
                for (var w = 0; w< thumbnailTransfers.length; w++) {
                    ftTransfer = thumbnailTransfers[w];
                    ft = ftTransfer.ftitem;
                    fileEntry = ftTransfer.file;
                    ft.abort();
                    ft = null;
                    if (fileEntry !== undefined) {
                        try {
                            fileEntry.remove();
                        } catch (e) {}
                    }
                }
            }
        }
        if (removePending === true) {
            if(mediaToDownload!==undefined && mediaToDownload.length > 0){
                for (var v = 0; v< mediaToDownload.length; v++) {
                    var mediaItem  = mediaToDownload[v];
                    item = mediaItem.item;
                    if(item!==undefined){
                        item.isdownloaded = false;
                        item.downloading = -1;
                        item.fileuri = "";
                        if(mediaItem.fileListType === "audiocategories"){
                            if(activeUser.userplaylists!==undefined && activeUser.userplaylists.length > 0){
                                audioId=item.audioid;
                                $(".pba-" + audioId).hide();
                                $(".pbw-" + audioId).hide();
                                $(".btn-" + audioId).show();
                                plAudioId=audioId.replace("mp3","");
                                for (var l=0; l<activeUser.userplaylists.length; l++){
                                    pl =activeUser.userplaylists[l];
                                    if(pl.playlistitems!==undefined && pl.playlistitems.length > 0){
                                        for (var j=0; j<pl.playlistitems.length; j++){
                                            pli =pl.playlistitems[j];
                                            if(pli.audioid===parseInt(plAudioId,10)){
                                                pli.isdownloaded=false;
                                                pli.downloading=-1;
                                                pli.fileuri="";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                activeUser.saveFilesList(undefined, "userplaylist", false, function() {});
                activeUser.saveFilesList(undefined, "podcasts", false, function() {});
                activeUser.saveFilesList(undefined, "videocategories", false, function() {});
                activeUser.saveFilesList(undefined, "eclasses", false, function() {});
            }
            if(audioMixToDownload!==undefined && audioMixToDownload.length > 0){
                for (var m = 0; m < audioMixToDownload.length; m++) {
                    var audioItem  = audioMixToDownload[m];
                    var aItem = audioItem.item;
                    if(aItem!==undefined){
                        aItem.audiomixdownloaded = false;
                        aItem.audioisdownloading = -1;
                        aItem.audiomixurl = "";
                    }
                }
                activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                activeUser.saveFilesList(undefined, "podcasts", false, function() {});
                activeUser.saveFilesList(undefined, "videocategories", false, function() {});
                activeUser.saveFilesList(undefined, "userplaylist", false, function() {});
                activeUser.saveFilesList(undefined, "eclasses", false, function() {});
            }
            mediaToDownload = [];
            thumbnailsToDownload = [];
            audioMixToDownload = [];
        }
        fileTransfers = [];
        thumbnailTransfers = [];
        checkDownloadItems(function() {});
        return true;
    } catch (e) {
        return false;
    }
}

function openCertificate(returnFunction) {
    try {
        var url = "";
        if (activeModule != undefined) {
            var pdfDirectory = "eCertificates";
            $("#contentprimary").append(loadingPDFGif);
            viewFile = activeModule.basemoduleid + "-" + activeUser.userId + "-" + userPortalId + ".pdf";
            hidePleaseWait();
            if(docsFileDir!=undefined){
                docsFileDir.getDirectory(pdfDirectory, {
                                         create: true,
                                         exclusive: false
                                         }, certificateExists, fail);
            }else if (theoryMediaDir != undefined) {
                theoryMediaDir.getDirectory(pdfDirectory, {
                                            create: true,
                                            exclusive: false
                                            }, certificateExists, fail);
            }
        }
        returnFunction(true);
    } catch (e) {
        returnFunction(false);
    }
}

function openPDFLink(remoteurl) {
    try {
        pdfViewFileLocal = remoteurl;
        if (activeModule != undefined) {
            var pdfDirectory = activeModule.basemoduleid.toString();
            hidePleaseWait();
            $("#contentprimary").append(loadingPDFGif);
            viewFile = remoteurl.substring(remoteurl.lastIndexOf("/") + 1);
            if(docsFileDir!==undefined){
                docsFileDir.getDirectory(pdfDirectory, {
                                         create: true,
                                         exclusive: false
                                         }, contentPDFFileExists, fail);
            }else{
                theoryMediaDir.getDirectory(pdfDirectory, {
                                            create: true,
                                            exclusive: false
                                            }, contentPDFFileExists, fail);
            }
        }
        retry = true;
    } catch (e) {
        errorHandler("openPDFLink", e);
    }
}

function contentPDFFileExists(dir) {
    try {
        var existingFileName = viewFile;
        viewFile = pdfViewFileLocal;
        dir.getFile(existingFileName, {
                    create: false
                    }, function(fileEntry) {
                    checkPDFFileSize(fileEntry);
                    hidePleaseWait();
                    
                    if (device.platform === "Android"  || device.platform === "iOS") {
                    androidPDFView(fileEntry.toURL());
                    } else {
                    openWebView(fileEntry.toURL());
                    }
                    }, function() {
                    if (viewFile != undefined && viewFile.length > 0) {
                    dir.getFile(existingFileName, {
                                create: true,
                                exclusive: false
                                }, function(pdfEntry) {
                                var localPdfPath = pdfEntry.toURL();
                                coController.coDownloadPDFFile(pdfViewFileLocal, function(ret) {
                                                               var fileData = ret;
                                                               if (fileData !== null && fileData.length > 0) {
                                                               var byteArr = fileData;
                                                               var UTF8_STR = new Uint8Array(byteArr);
                                                               var BINARY_ARR = UTF8_STR.buffer;
                                                               $(".pdfspinnerdiv").remove();
                                                               pdfEntry.createWriter(function(writer) {
                                                                                     writer.onwrite = function(evt) {
                                                                                     if (device.platform === "Android"  || device.platform === "iOS") {
                                                                                     pdfViewFile = localPdfPath;
                                                                                     androidPDFView(localPdfPath);
                                                                                     } else {
                                                                                     openWebView(localPdfPath);
                                                                                     }
                                                                                     };
                                                                                     writer.write(BINARY_ARR);
                                                                                     }, fail);
                                                               } else {
                                                               try {
                                                               pdfEntry.remove();
                                                               } catch (e1) {}
                                                               $(".pdfspinnerdiv").remove();
                                                               if (fileData === -1) {
                                                               msgStr = resources.connectionFail;
                                                               msgTitle = resources.connError;
                                                               } else {
                                                               msgTitle = resources.requestFail;
                                                               msgStr = resources.generalFunctionError;
                                                               }
                                                               msgBtnValue = resources.btnOk;
                                                               navigator.notification.confirm(msgStr, function() {
                                                                                              hidePleaseWait;
                                                                                              }, msgTitle, msgBtnValue);
                                                               }
                                                               });
                                }, function(error) {});
                    }
                    });
    } catch (e) {
        errorHandler("contentPDFFileExists", e);
    }
}

function certificateExists(dir) {
    try {
        var existingFileName = viewFile;
        viewFile = dir.toURL() + "/" + existingFileName;
        dir.getFile(existingFileName, {
                    create: false
                    }, function(fileEntry) {
                    hidePleaseWait();
                    if (device.platform === "Android"  || device.platform === "iOS") {
                    pdfViewFile = fileEntry.toURL();
                    androidPDFView(pdfViewFile);
                    } else {
                    openWebView(fileEntry.toURL());
                    }
                    }, function() {
                    if (activeModule.moduleurl != undefined && activeModule.moduleurl.length > 0) {
                    var remoteFile = activeModule.moduleurl;
                    dir.getFile(existingFileName, {
                                create: true,
                                exclusive: false
                                }, function(pdfEntry) {
                                var localPdfPath = pdfEntry.toURL();
                                coController.coDownloadCertificate(existingFileName, activeModule.courseid, activeModule.basemoduleid, function(ret) {
                                                                   var fileData = ret;
                                                                   if (fileData !== null && fileData.length > 0) {
                                                                   var byteArr = fileData;
                                                                   var UTF8_STR = new Uint8Array(byteArr);
                                                                   var BINARY_ARR = UTF8_STR.buffer;
                                                                   pdfEntry.createWriter(function(writer) {
                                                                                         writer.onwrite = function(evt) {
                                                                                         hidePleaseWait();
                                                                                         if (device.platform === "Android"  || device.platform === "iOS") {
                                                                                         pdfViewFile = localPdfPath;
                                                                                         androidPDFView(localPdfPath);
                                                                                         } else {
                                                                                         openWebView(localPdfPath);
                                                                                         }
                                                                                         };
                                                                                         writer.write(BINARY_ARR);
                                                                                         }, fail);
                                                                   } else {
                                                                   try {
                                                                   pdfEntry.remove();
                                                                   } catch (e1) {}
                                                                   $(".pdfspinnerdiv").remove();
                                                                   if (fileData === -1) {
                                                                   msgStr = resources.connectionFail;
                                                                   msgTitle = resources.connError;
                                                                   } else {
                                                                   msgTitle = resources.requestFail;
                                                                   msgStr = resources.generalFunctionError;
                                                                   }
                                                                   msgBtnValue = resources.btnOk;
                                                                   navigator.notification.confirm(msgStr, function() {
                                                                                                  hidePleaseWait;
                                                                                                  }, msgTitle, msgBtnValue);
                                                                   }
                                                                   });
                                }, function(error) {});
                    }
                    });
    } catch (e) {
        errorHandler("certificateExists", e);
    }
}

function checkASDUserPodState(updatePosition, returnFunction) {
    try {
        var updatevals = false;
        var continueUpdate = true;
        coController.coGetUserPodState(function(ret) {
                                       if (!(ret == undefined || ret == -1 || ret == 0)) {
                                       updateUserPosition(ret, function(retVal) {
                                                          if (retVal === true) {
                                                          continueUpdate = false;
                                                          updatevals = true;
                                                          if (loadIds.pageid === "#coursepage" || pageLoad === "#coursepage") {
                                                          syncDataCallback(updatePosition, continueUpdate, updatevals, function(retVal) {
                                                                           returnFunction(retVal);
                                                                           });
                                                          msgStr = resources.syncdata;
                                                          msgTitle = resources.theoryView;
                                                          overrideLoadingMsg = true;
                                                          if (device.platform === "Android" && loadingOK === true) {
                                                          loadingOK = false;
                                                          navigator.notification.activityStart(msgTitle, msgStr);
                                                          setTimeout(function() {
                                                                     navigator.notification.activityStop();
                                                                     loadingOK = true;
                                                                     overrideLoadingMsg = false;
                                                                     }, 6000);
                                                          } else {
                                                          if (iosDevice===true) {
                                                          loadingOK = false;
                                                          $.mobile.loading("show", {
                                                                           text: "",
                                                                           textVisible: false,
                                                                           theme: "h"
                                                                           });
                                                          setTimeout(function() {
                                                                     $.mobile.loading("hide");
                                                                     loadingOK = true;
                                                                     overrideLoadingMsg = false;
                                                                     }, 6000);
                                                          }
                                                          }
                                                          } else {
                                                          returnFunction(true);
                                                          }
                                                          } else {
                                                          if ((updatePosition === true || updatevals === true) && continueUpdate === true) {
                                                          showMenu = false;
                                                          loadFirstSave = true;
                                                          refreshMenu("refresh");
                                                          hidePleaseWait();
                                                          returnFunction(true);
                                                          } else {
                                                          returnFunction(false);
                                                          }
                                                          }
                                                          });
                                       } else {
                                       returnFunction(false);
                                       }
                                       });
        
        // Check if any playlists require updating
        if(activeUser.userplaylists!==undefined && activeUser.userplaylists.length>0){
            var pl;
            for (var y=0; y<activeUser.userplaylists.length; y++){
                pl =activeUser.userplaylists[y];
                if(pl.updatepending===true){
                    activeUser.updateUserPlaylist(pl, function(ret){});
                }
            }
        }
    } catch (e) {
        returnFunction(false);
    }
}

function syncDataCallback(updatePosition, continueUpdate, updatevals, returnFunction) {
    try {
        if ((activeCourse === undefined) || (activeCourse !== undefined && activeCourse.courseid !== loadIds.courseid)) {
            activeCourse = portalCourses.getCourseById(loadIds.courseid);
        }
        if (activeCourse !== undefined) {
            if ((activeModule === undefined) || (activeModule !== undefined && activeModule.basemoduleid !== loadIds.moduleid)) {
                if(activeModuleGroup!==undefined || activeModuleGroup.modulegroupid != loadIds.modulegroupid){
                    activeModuleGroup = activeCourse.getModuleGroupByModuleId(loadIds.moduleid);
                }
                if(activeModuleGroup!==undefined){
                    activeModule = activeModuleGroup.getModuleById(loadIds.moduleid);
                }
            }
        }
        hidePleaseWait();
        if (activeModule !== undefined) {
            if ((loadIds.sectionid > 0) && ((activeSection === undefined) || (activeSection !== undefined && activeSection.sectionid !== loadIds.sectionid))) {
                updatevals = false;
                var sections = activeModule.getModuleSections();
                if (sections === undefined || sections.length === 0) {
                    activeModule.refreshLessons(function(ret) {
                                                if (ret === true) {
                                                if (getSectionOk === true) {
                                                getSectionOk = false;
                                                activeModule.getSectionById(loadIds.sectionid, function(ret) {
                                                                            activeSection = ret;
                                                                            if (activeSection !== undefined) {
                                                                            if (loadIds.nodekey !== "") {
                                                                            activeSCO = undefined;
                                                                            }
                                                                            if ((activeSCO === undefined && loadIds.nodekey !== "Worksheet") || (activeSCO !== undefined && activeSCO.assetid !== loadIds.assetid)) {
                                                                            activeSCO = activeSection.getSCOById(loadIds.assetid);
                                                                            setUserPosition(false, "#coursepage", false);
                                                                            }
                                                                            }
                                                                            loadFirstSave = true;
                                                                            showMenu = false;
                                                                            refreshMenu("refresh");
                                                                            returnFunction(true);
                                                                            });
                                                setTimeout(function() {
                                                           getSectionOk = true;
                                                           }, 600);
                                                }
                                                }
                                                });
                } else {
                    if (getSectionOk === true) {
                        getSectionOk = false;
                        activeModule.getSectionById(loadIds.sectionid, function(ret) {
                                                    activeSection = ret;
                                                    if (activeSection !== undefined) {
                                                    if (loadIds.nodekey !== "") {
                                                    activeSCO = undefined;
                                                    }
                                                    if ((activeSCO === undefined && loadIds.nodekey !== "Worksheet") || (activeSCO !== undefined && activeSCO.assetid !== loadIds.assetid)) {
                                                    activeSCO = activeSection.getSCOById(loadIds.assetid);
                                                    }
                                                    setUserPosition(false, "#coursepage", false);
                                                    }
                                                    loadFirstSave = true;
                                                    showMenu = false;
                                                    refreshMenu("refresh");
                                                    returnFunction(true);
                                                    });
                        setTimeout(function() {
                                   getSectionOk = true;
                                   }, 600);
                    }
                }
            } else {
                if (activeSection !== undefined && loadIds.sectionid === 0) {
                    activeSection = undefined;
                    activeSCO = undefined;
                }
                if (activeSection !== undefined) {
                    if (loadIds.nodekey === "Worksheet") {
                        activeSCO = undefined;
                    } else {
                        if (activeSCO !== undefined && activeSCO.assetid !== loadIds.assetid) {
                            activeSCO = activeSection.getSCOById(loadIds.assetid);
                        }
                    }
                    setUserPosition(false, "#coursepage", false);
                }
                continueUpdate = true;
            }
        }
        if ((updatePosition === true || updatevals === true) && continueUpdate === true) {
            setUserPosition(false, "#coursepage", false);
            showMenu = false;
            loadFirstSave = true;
            refreshMenu("refresh");
            hidePleaseWait();
            returnFunction(true);
        }
    } catch (e) {
        returnFunction(false);
    }
}
function isDeviceOnline() {
    if (deviceIsOnline === true) {
        if (device.platform === "Android") {
            deviceIsOnlineCheck();
            return deviceIsOnline;
            
        } else {
            return deviceIsOnline;
        }
    } else {
        return deviceIsOnline;
    }
}
function isCheckDeviceOnline() {
    try{
        if(checkDeviceOnlineOK===true){
            
            checkDeviceOnlineOK=false;
            coController.coCheckNetworkAvaliable(false, function(retval) {
                                                 if (networkAvailable === true) {
                                                 coController.coCheckUrlExists(networkTestUrl, function(status){
                                                                               if (status !== 200) {
                                                                               networkAvailable = false;
                                                                               } else {
                                                                               networkAvailable = true;
                                                                               }
                                                                               deviceIsOnline = networkAvailable;
                                                                               checkDeviceOnlineOK = true;
                                                                               });
                                                 } else {
                                                 deviceIsOnline=false;
                                                 checkDeviceOnlineOK = true;
                                                 
                                                 }
                                                 });
        }
        
    }catch(e){
        checkDeviceOnlineOK = true;
    }
    return true;
}

function setPausedAppTimer(){
    try{
        if(downloadingItems===true){
            pausedAppTime += 3000;
            setTimeout(setPausedAppTimer, 3000);
        }else{
            pausedAppTime=0;
            localStorage.setItem("ETP_PAUSEDDATE", 0);
        }
        return true;
    } catch (e) {
        return false;
    }
}
function setModuleGroupValues(){
    try{
        
        $(".modulegroupli").off("vclick");
        $(".modulegroupli").on("vclick", function(event){
                               try{
                               event.preventDefault();
                               event.stopPropagation();
                               if (moduleOK === true) {
                               moduleOK=false;
                               showPleaseWait();
                               var id = $(event.currentTarget).attr("id");
                               sectionOK = true;
                               
                               
                               if($(id).hasClass("coursepaymentrequired")===false){
                               if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined) {
                               audioTheoryPaused = true;
                               audioTheoryPlayer.pause();
                               }
                               if (searchFocus === true) {
                               hideKeyboard(event, false);
                               searchFocus = false;
                               }
                               
                               setTimeout(function() {
                                          moduleOK = true;
                                          moduleBookOK = true;
                                          }, 1200);
                               
                               $(".modulegroupli").removeClass("active-state");
                               $(".moduleli").removeClass("active-state");
                               $(".scoli").removeClass("active-state");
                               $(".scoitem").removeClass("active-state");
                               $(".wsitem").removeClass("active-state");
                               $(".ui-btn-inner").removeClass("active-state");
                               $("#bookingsul").empty();
                               $("#bookingdatediv").hide();
                               $("#bookingcontent").hide();
                               $("#bookingdisclaimerdiv").hide();
                               $("#podcastmenubtn").removeClass("nodisplay");
                               $("#eclassmenubtn").removeClass("nodisplay");
                               $("#bookingmenubtn").removeClass("nodisplay");
                               $("#theorydatacontent").html("");
                               var ids = id.split("-");
                               var courseid = ids[1];
                               var modulegroupid = ids[2];
                               if (activeCourse !== undefined && activeCourse.courseid !== undefined && activeCourse.courseid != courseid) {
                               activeCourse = portalCourses.getCourseById(courseid);
                               activeModuleGroup = undefined;
                               activeModule = undefined;
                               activeSection = undefined;
                               activeSCO = undefined;
                               setUserPosition(false, "#coursepage", false);
                               }
                               if (activeCourse !== undefined && activeCourse.accessible) {
                               activeModuleGroup = activeCourse.getModuleGroupByGroupId(modulegroupid);
                               activeModule = undefined;
                               activeSection = undefined;
                               activeSCO = undefined;
                               
                               if (activeModuleGroup !== undefined) {
                               if (activeModuleGroup.accessible === false ){
                               hidePleaseWait;
                               msgStr = resources.moduleIncomplete;
                               msgTitle = resources.moduleAccess;
                               msgBtnValue = resources.btnOk;
                               navigator.notification.confirm(msgStr, function() {
                                                              naOK = true;
                                                              }, msgTitle, msgBtnValue);
                               }else{
                               
                               if($("#" + id).hasClass("coursesummary")===true){
                               //This is a summary module so bypass menu
                               event.preventDefault();
                               event.stopPropagation();
                               setGroupSummaryValue();
                               }else{
                               var refresh = false;
                               activeModuleGroup.getModulesListView(refresh, function(ret) {
                                                                    if (ret === "offline") {
                                                                    msgTitle = resources.sectionAccess;
                                                                    msgBtnValue = resources.btnOk;
                                                                    msgStr = resources.offlineContent;
                                                                    if (supressWarningMsgs === false) {
                                                                    navigator.notification.confirm(msgStr, function() {
                                                                                                   if (prevLoadIds !== undefined) {
                                                                                                   loadIds = prevLoadIds;
                                                                                                   }
                                                                                                   hidePleaseWait();
                                                                                                   }, msgTitle, msgBtnValue);
                                                                    }
                                                                    returnFunction(false);
                                                                    } else {
                                                                    $("#grouptitlehead").show();
                                                                    var groupsStr = ret;
                                                                    var modTitle = activeModuleGroup.title ;
                                                                    var groupclass = "groupmoduletitle";
                                                                    if(tablet===false){
                                                                    if(iphone5===true){
                                                                    groupclass += modTitle.length > 35 ? " doubleline" : "";
                                                                    }else{
                                                                    
                                                                    groupclass += modTitle.length > 39 ? " doubleline" : "";
                                                                    }
                                                                    
                                                                    }
                                                                    
                                                                    //$("#grouptitlehead").html("<div class='" + groupclass + "'>" + modTitle + "</div><div class='groupmodtitlebtn'></div>");
                                                                    $("#groupset").html(groupsStr);
                                                                    $("#groupset").trigger("create");
                                                                    $("#groupset").collapsibleset();
                                                                    $("#groupset").trigger("refesh");
                                                                    hidePleaseWait();
                                                                    $(".groupmodtitlebtn").off("vclick");
                                                                    $(".groupmodtitlebtn").on("vclick", function(event) {
                                                                                              event.preventDefault();
                                                                                              event.stopPropagation();
                                                                                              showMenu=true;
                                                                                              menuOpen = $("#menucontentdiv .menuopen").length > 0 ? true : false;
                                                                                              if (menubtnOk===true) {
                                                                                              if (menuScroller != undefined) {
                                                                                              setPagePadderDiv("menuScroller", false);
                                                                                              }
                                                                                              changeMenu("courses");
                                                                                              }
                                                                                              });
                                                                    $(".modgroupsli").off("vclick");
                                                                    $(".modgroupsli").on("vclick", function(event) {
                                                                                         try {
                                                                                         event.preventDefault();
                                                                                         
                                                                                         if (coursesOK === true) {
                                                                                         $(".modgroupsli").children('div.ui-collapsible-content').slideUp(300);
                                                                                         coursesOK=false;
                                                                                         var id = $(event.currentTarget).attr("id");
                                                                                         var current = $(this).closest(".ui-collapsible");
                                                                                         if ($("#" + id).hasClass("ui-collapsible-collapsed")) {
                                                                                         $(".ui-collapsible").not(".ui-collapsible-collapsed").find("ui-collapsible-heading-toggle").click();
                                                                                         $(".ui-collapsible-content", current).slideDown(300);
                                                                                         $("#" + id).collapsible("expand");
                                                                                         } else {
                                                                                         $(".ui-collapsible-content", current).slideUp(300);
                                                                                         setTimeout(function() {
                                                                                             $("#" + id).collapsible("collapse");
                                                                                         }, 300);
                                                                                         //$("#" + id).collapsible("collapse");
                                                                                         }
                                                                                         setTimeout(function() {
                                                                                                    coursesOK = true;
                                                                                                    }, 100);
                                                                                         setPagePadderDiv("menuGroupScroller", false);
                                                                                         }
                                                                                         
                                                                                         } catch (e) {
                                                                                         errorHandler("modgroups click", e);
                                                                                         }
                                                                                         });
                                                                    changeMenu("groups");
                                                                    setModulesValues();
                                                                    }
                                                                    });
                               }
                               }
                               }
                               }
                               }
                               }
                               setTimeout(function(){moduleOK = true;},300);
                               }catch(e){
                               errorHandler(".modulegroupli", e);
                               moduleOK=true;
                               naOK=true;
                               }
                               });
        
    } catch (e){
        errorHandler("setModuleGroupValues", e);
        return false;
    }
    return true;
}
function setGroupSummaryValue(){
    try{
        $("#initialcontent").hide();
        activeModule = activeModuleGroup.getModuleById(0);
        activeCourse.getAssessmentSummary(function(ret) {
                                          if (ret === "offline") {
                                          msgTitle = resources.moduleAccess;
                                          msgBtnValue = resources.btnOk;
                                          msgStr = resources.moduleSummaryOffline;
                                          if (supressWarningMsgs === false) {
                                          navigator.notification.confirm(msgStr, function() {
                                                                         hidePleaseWait();
                                                                         }, msgTitle, msgBtnValue);
                                          }
                                          } else {
                                          if (ret != undefined) {
                                          
                                          activeSection = undefined;
                                          activeSCO = undefined;
                                          loadIds.nodekey = "AssessmentSummary";
                                          setUserPosition(false, "#coursepage", true);
                                          setSCOContent(ret, false, true);
                                          $("#pdfmenubtn").addClass("nodisplay");
                                          $("#podcastmenubtn").addClass("nodisplay");
                                          $("#eclassmenubtn").addClass("nodisplay");
                                          $("#bookingmenubtn").addClass("nodisplay");
                                          $("#footerleftbckbtn").removeClass("buttondisabled");
                                          $("#rhsmenupageheader").show();
                                          $(".rhsmoduleicon").show();
                                          $(".rhslessonicon").show();
                                          $(".moduleiconlhs").hide();
                                          $(".lessoniconlhs").hide();
                                          }
                                          }
                                          
                                          });
    } catch (e){
        errorHandler("setModuleGroupValues", e);
        return false;
    }
    return true;
}

function setModulesValues(){
    try{
        $(".moduleli span").removeClass("ui-icon-arrow-r").removeClass("ui-icon-shadow").addClass("ui-icon-active-r");
        if (retinaDisplay===true) {
            $(".limodtitleactive").addClass("retinaliactive");
            $(".limodtitle").addClass("retinaliinactive");
        }
        $("#scosset").html("");
        $("#contentnavdiv").hide();
        $("#wscontentnavdiv").hide();
        $("#bookingsul").empty();
        $("#bookingdatediv").hide();
        $("#bookingcontent").hide();
        $("#bookingdisclaimerdiv").hide();
        
        $(".moduleli span").removeClass("ui-icon-arrow-r").removeClass("ui-icon-shadow").addClass("ui-icon-active-r");
        if (retinaDisplay===true) {
            $(".limodtitleactive").addClass("retinaliactive");
            $(".limodtitle").addClass("retinaliinactive");
        }
        $("#scosset").html("");
        $("#contentnavdiv").hide();
        $("#wscontentnavdiv").hide();
        $("#bookingsul").empty();
        $("#bookingdatediv").hide();
        $("#bookingcontent").hide();
        $("#bookingdisclaimerdiv").hide();
        
        $(".moduleli").off("vclick");
        $(".moduleli").on("vclick", function(event) {
                          try{
                          event.preventDefault();
                          event.stopPropagation();
                          if (naOK === false) {
                          hidePleaseWait();
                          } else {
                          if (moduleOK === true) {
                          showPleaseWait();
                          var id = $(event.currentTarget).attr("id");
                          sectionOK = true;
                          if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined) {
                          audioTheoryPaused = true;
                          audioTheoryPlayer.pause();
                          }
                          if (searchFocus === true) {
                          hideKeyboard(event, false);
                          searchFocus = false;
                          }
                          $(".modules").removeClass("active-state");
                          $(".moduleli").removeClass("active-state");
                          $(".scoli").removeClass("active-state");
                          $(".scoitem").removeClass("active-state");
                          $(".wsitem").removeClass("active-state");
                          $(".ui-btn-inner").removeClass("active-state");
                          $("#bookingsul").empty();
                          $("#bookingdatediv").hide();
                          $("#bookingcontent").hide();
                          $("#bookingdisclaimerdiv").hide();
                          $("#podcastmenubtn").removeClass("nodisplay");
                          $("#eclassmenubtn").removeClass("nodisplay");
                          $("#bookingmenubtn").removeClass("nodisplay");
                          $("#theorydatacontent").html("");
                          var ids = id.split("-");
                          var courseid = ids[1];
                          var moduleid = ids[2];
                          var modTypeBook = "";
                          if (activeCourse !== undefined && activeCourse.courseid !== undefined && activeCourse.courseid != courseid) {
                          activeCourse = portalCourses.getCourseById(courseid);
                          if(activeModuleGroup!==undefined){activeModuleGroup = undefined;}
                          if(activeModule!==undefined){activeModule = undefined;}
                          if(activeSection!==undefined){activeSection = undefined;}
                          if(activeSection!==undefined){activeSCO = undefined;}
                          setUserPosition(false, "#coursepage", false);
                          }
                          if (activeCourse != undefined && activeCourse.accessible) {
                          if (activeModule === undefined || activeModule.basemoduleid !== moduleid) {
                          activeModuleGroup = activeCourse.getModuleGroupByModuleId(moduleid);
                          }
                          if (activeModuleGroup!==undefined){
                          activeModule = activeModuleGroup.getModuleById(moduleid);
                          }
                          
                          var continueLoad = true;
                          if (activeModule != undefined) {
                          activeSection = undefined;
                          activeSCO = undefined;
                          setUserPosition(false, "#coursepage", true);
                          modTypeBook = getModuleType(activeModule.basemoduletypeid);
                          setActiveClass("module");
                          if ((activeModule.status === courseStatus.NotStarted && modTypeBook != moduleType.Book) || (activeModule.basemoduletypeid == 13 && activeModule.status == courseStatus.InProgress)) {
                          var status = courseStatus.InProgress;
                          if (activeModule.basemoduletypeid == 13) {
                          status = courseStatus.Completed;
                          }
                          if (modTypeBook === "Lesson") {
                          continueLoad = false;
                          }
                          if (deviceIsOnline === true) {
                          activeModule.updateModuleStatus(status, function() {
                                                          var id1 = "#module-" + activeModule.courseid + "-" + activeModule.basemoduleid;
                                                          resetStatusDisplay("module");
                                                          $("#ulcourses").trigger("create");
                                                          $("#ulcourses").listview();
                                                          $("#ulcourses").listview("refresh");
                                                          coursesInit = true;
                                                          if (modTypeBook === "Lesson") {
                                                          $("#theoryviewheader").html(resources.theoryView);
                                                          $("#theoryviewheader").removeClass("noicon");
                                                          hidePleaseWait();
                                                          populateSectionsList(modType, false, function(ret) {
                                                                               if (ret === true) {
                                                                               triggerSection();
                                                                               }
                                                                               });
                                                          } else {
                                                          refreshMenu("refresh");
                                                          }
                                                          });
                          }
                          }
                          }
                          if (continueLoad===true && moduleOK === true) {
                          moduleOK = false;
                          setTimeout(function() {
                                     moduleOK = true;
                                     moduleBookOK = true;
                                     }, 1200);
                          if (activeCourse.status == courseStatus.Completed && activeModule != undefined && activeModule.basemoduletypeid == 0) {
                          $("#initialcontent").hide();
                          activeCourse.getAssessmentSummary(function(ret) {
                                                            if (ret === "offline") {
                                                            msgTitle = resources.moduleAccess;
                                                            msgBtnValue = resources.btnOk;
                                                            msgStr = resources.moduleSummaryOffline;
                                                            if (supressWarningMsgs === false) {
                                                            navigator.notification.confirm(msgStr, function() {
                                                                                           hidePleaseWait();
                                                                                           }, msgTitle, msgBtnValue);
                                                            }
                                                            } else {
                                                            if (ret != undefined) {
                                                            activeSection = undefined;
                                                            activeSCO = undefined;
                                                            loadIds.nodekey = "AssessmentSummary";
                                                            setUserPosition(false, "#coursepage", true);
                                                            resetMenuOpenName();
                                                            setSCOContent(ret, false, true);
                                                            }
                                                            }
                                                            });
                          } else {
                          if (activeModule != undefined && activeModule.accessible) {
                            console.log(activeModule);
                          var modType = getModuleType(activeModule.basemoduletypeid);

                          if (modType == "Book") {
                          var modId = "#module-" + activeModule.courseid + "-" + activeModule.basemoduleid;
                          showModuleBook(event, function() {});
                          }

                            else if(modType == "OTA"){
                               coController.coCheckNetworkAvaliable(false, function(ret) {
                                   if (ret === false || deviceIsOnline === false) {
                                       msgStr = resources.connectLogin;
                                       msgTitle = resources.connError;
                                       msgBtnValue = resources.btnOk;
                                       navigator.notification.confirm(msgStr, function() {

                                       }, msgTitle, msgBtnValue);
                                   } else {
                                       console.log(activeModule);
                                       if(activeModule.status == "Completed"){
                                           showModuleBook(event, function() {});
                                       }
                                       else{
                                           if(activeModule.practiceisoptional == true){
                                               msgTitle = resources.assessmentHead;
                                               msgBtnValue = resources.liveOTABtn;
                                               msgStr = resources.liveOTATrue;
                                               navigator.notification.confirm(msgStr, liveOTATrue, msgTitle, msgBtnValue);
                                               function liveOTATrue(choice){
                                                   if(choice == 1){
                                                       IsLiveOTA = "1";

                                       try {

                                           window.localStorage.removeItem("OTAModuleTitle");
                                           window.localStorage.setItem("OTAModuleTitle",activeModule.title);
                                           getOtaGuidliness(false, activeModule.basemoduleid,4,IsLiveOTA, function(ret){
                                               var TodaysOtaAttempts = ret.getOTAInfoResult.Data.DetailsForOTAResult.TodaysOtaAttempts;
                                               var MaxAttemptsPerDay = ret.getOTAInfoResult.Data.DetailsForOTAResult.MaxAttemptsPerDay;

                                               if(ret.getOTAInfoResult.Data.DetailsForOTAResult.IsMaxAttemptExceeded == "True"){

                                                   msgTitle = resources.assessmentHead;
                                                   msgBtnValue = resources.btnOk;
                                                   msgStr = resources.IsMaxAttemptExceeded;
                                                   navigator.notification.confirm(msgStr, function() {

                                                   }, msgTitle, msgBtnValue);
                                               }
                                               else{
                                                   if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes == 1){
                                                       msgTitle = resources.assessmentHead;
                                                       msgBtnValue = resources.btnOk;
                                                       msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRest;
                                                       navigator.notification.confirm(msgStr, function() {

                                                       }, msgTitle, msgBtnValue);
                                                   }else if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes > 1){
                                                       msgTitle = resources.assessmentHead;
                                                       msgBtnValue = resources.btnOk;
                                                       msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRestminutes;
                                                       navigator.notification.confirm(msgStr, function() {

                                                       }, msgTitle, msgBtnValue);
                                                   }else{
                                                       goToPage("#OtaDetailPage");
                                                       OtaGuidlinesDisplay(ret);
                                                   }

                                               }

                                           });

                                       } catch (e) {
                                           errorHandler("OtaDetailPage.pagecreate", e);
                                       }

                                                       $("#otabackbtn").off("vclick");
                                                       $("#otabackbtn").on("vclick", function(event) {

                                                           $("#ptimermg").empty();

                                                           goToPage("#coursepage");
                                                       });

                                                       $("#otadisagree").off("vclick");
                                                       $("#otadisagree").on("vclick", function(event) {

                                                       $("#ptimermg").empty();
                                                       goToPage("#coursepage");
                                                       });

                                                       $("#otaagree").off("vclick");
                                                       $("#otaagree").on("vclick", function(event) {
                                                       event.stopPropagation();
                                                           try {

                                                               $("#OtaDetailPage").append(mloadingGif);
                                                               var OtaIdForQuestions = window.localStorage.getItem("OTAId");
                                                               var OTASectionIDsOTA =  window.localStorage.getItem("OTASectionIDs");
                                                               coController.getOTAQuestions(OtaIdForQuestions,activeModule.basemoduleid,activeModule.courseid,activeModule.assessmentscheduleid,OTASectionIDsOTA,1, function(ret) {
                                                                   if(ret == 0){
                                                                       msgTitle = resources.connError;
                                                                       msgBtnValue = resources.btnOk;
                                                                       msgStr = resources.moduleOffline;
                                                                       navigator.notification.confirm(msgStr, function() {
                                                                           $("#mloader").remove();
                                                                           goToPage("#coursepage");

                                                                       }, msgTitle, msgBtnValue);
                                                                   }
                                                                   else{


                                                                       $("#mloader").remove();

                                                                       OtaQuestionDisplay(ret);
                                                                       goToPage("#OtaQuestionPage");

                                                                   }
                                                               });


                                                           } catch (e) {
                                                               errorHandler("OtaQuestionPage.pagecreate", e);
                                                           }
                                                       });
                                                   }
                                                   else if(choice == 2){
                                                       IsLiveOTA = "0";

                                                       try {
                                                           if(activeModule.otaTypeId == "4"){
                                                               window.localStorage.removeItem("OTAModuleTitle");
                                                               window.localStorage.setItem("OTAModuleTitle",activeModule.title);
                                                               getOtaGuidliness(false, activeModule.basemoduleid,3, IsLiveOTA,function(ret){

                                                                   if(ret.getOTAInfoResult.Data.DetailsForOTAResult.IsMaxAttemptExceeded == "True"){

                                                                       msgTitle = resources.assessmentHead;
                                                                       msgBtnValue = resources.btnOk;
                                                                       msgStr = resources.IsMaxAttemptExceeded;
                                                                       navigator.notification.confirm(msgStr, function() {

                                                                       }, msgTitle, msgBtnValue);
                                                                   }
                                                                   else{
                                                                       if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes == 1){
                                                                           msgTitle = resources.assessmentHead;
                                                                           msgBtnValue = resources.btnOk;
                                                                           msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRest;
                                                                           navigator.notification.confirm(msgStr, function() {

                                                                           }, msgTitle, msgBtnValue);
                                                                       }else if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes > 1){
                                                                           msgTitle = resources.assessmentHead;
                                                                           msgBtnValue = resources.btnOk;
                                                                           msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRestminutes;
                                                                           navigator.notification.confirm(msgStr, function() {

                                                                           }, msgTitle, msgBtnValue);
                                                                       }else{
                                                                           goToPage("#OtaDetailPage");
                                                                           OtaGuidlinesDisplay(ret);
                                                                       }

                                                                   }
                                                               });
                                                           }
                                                           else{
                                                               window.localStorage.removeItem("OTAModuleTitle");
                                                               window.localStorage.setItem("OTAModuleTitle",activeModule.title);
                                                               getOtaGuidliness(false, activeModule.basemoduleid,activeModule.otaTypeId,IsLiveOTA, function(ret){


                                                                   if(ret.getOTAInfoResult.Data.DetailsForOTAResult.IsMaxAttemptExceeded == "True"){

                                                                       msgTitle = resources.assessmentHead;
                                                                       msgBtnValue = resources.btnOk;
                                                                       msgStr = resources.IsMaxAttemptExceeded;
                                                                       navigator.notification.confirm(msgStr, function() {

                                                                       }, msgTitle, msgBtnValue);
                                                                   }
                                                                   else{
                                                                       if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes == 1){
                                                                           msgTitle = resources.assessmentHead;
                                                                           msgBtnValue = resources.btnOk;
                                                                           msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRest;
                                                                           navigator.notification.confirm(msgStr, function() {

                                                                           }, msgTitle, msgBtnValue);
                                                                       }else if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes > 1){
                                                                           msgTitle = resources.assessmentHead;
                                                                           msgBtnValue = resources.btnOk;
                                                                           msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRestminutes;
                                                                           navigator.notification.confirm(msgStr, function() {

                                                                           }, msgTitle, msgBtnValue);
                                                                       }else{
                                                                           goToPage("#OtaDetailPage");
                                                                           OtaGuidlinesDisplay(ret);
                                                                       }

                                                                   }
                                                               });
                                                           }



                                                       } catch (e) {
                                                           errorHandler("OtaDetailPage.pagecreate", e);
                                                       }

                                                       $("#otabackbtn").off("vclick");
                                                       $("#otabackbtn").on("vclick", function(event) {
                                                        $("#ptimermg").empty();
                                                       goToPage("#coursepage");
                                                       });

                                                       $("#otadisagree").off("vclick");
                                                       $("#otadisagree").on("vclick", function(event) {
                                                       $("#ptimermg").empty();
                                                       goToPage("#coursepage");
                                                       });

                                                       $("#otaagree").off("vclick");
                                                       $("#otaagree").on("vclick", function(event) {
                                                       event.stopPropagation();
                                                           try {

                                                               $("#OtaDetailPage").append(mloadingGif);
                                                           var OtaIdForQuestions = window.localStorage.getItem("OTAId");
                                                           var OTASectionIDsOTA =  window.localStorage.getItem("OTASectionIDs");
                                                           coController.getOTAQuestions(OtaIdForQuestions,activeModule.basemoduleid,activeModule.courseid,activeModule.assessmentscheduleid,OTASectionIDsOTA,0, function(ret) {
                                                               if(ret == 0){
                                                                   msgTitle = resources.connError;
                                                                   msgBtnValue = resources.btnOk;
                                                                   msgStr = resources.moduleOffline;
                                                                   navigator.notification.confirm(msgStr, function() {
                                                                       $("#mloader").remove();
                                                                       goToPage("#coursepage");

                                                                   }, msgTitle, msgBtnValue);
                                                               }
                                                               else{

                                                                   $("#mloader").remove();
                                                                   OtaQuestionDisplay(ret);
                                                                   goToPage("#OtaQuestionPage");


                                                               }
                                                           });


                                                           } catch (e) {
                                                               errorHandler("OtaQuestionPage.pagecreate", e);
                                                           }
                                                       });
                                                   }
                                                   else{

                                                   }
                                               }
                                           }
                                           else{
                                               if(activeModule.actionIdNew == "1"){
                                                    msgTitle = resources.assessmentHead;
                                                   msgBtnValue = resources.liveOTABtn;
                                                   msgStr = resources.liveOTA;
                                                   navigator.notification.confirm(msgStr, check, msgTitle, msgBtnValue);
                                                   function check(choice){
                                                       if(choice == 1){
                                                           IsLiveOTA = "1";
                                                           try {
                                                               window.localStorage.removeItem("OTAModuleTitle");
                                                               window.localStorage.setItem("OTAModuleTitle",activeModule.title);
                                                               getOtaGuidliness(false, activeModule.basemoduleid,activeModule.otaTypeId,IsLiveOTA, function(ret){
                                                                   if(ret.getOTAInfoResult.Data.DetailsForOTAResult.IsMaxAttemptExceeded == "True"){

                                                                       msgTitle = resources.assessmentHead;
                                                                       msgBtnValue = resources.btnOk;
                                                                       msgStr = resources.IsMaxAttemptExceeded;
                                                                       navigator.notification.confirm(msgStr, function() {

                                                                       }, msgTitle, msgBtnValue);
                                                                   }
                                                                   else{
                                                                       if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes == 1){
                                                                           msgTitle = resources.assessmentHead;
                                                                           msgBtnValue = resources.btnOk;
                                                                           msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRest;
                                                                           navigator.notification.confirm(msgStr, function() {

                                                                           }, msgTitle, msgBtnValue);
                                                                       }else if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes > 1){
                                                                           msgTitle = resources.assessmentHead;
                                                                           msgBtnValue = resources.btnOk;
                                                                           msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRestminutes;
                                                                           navigator.notification.confirm(msgStr, function() {

                                                                           }, msgTitle, msgBtnValue);
                                                                       }else{
                                                                           goToPage("#OtaDetailPage");
                                                                           OtaGuidlinesDisplay(ret);
                                                                       }

                                                                   }
                                                               });

                                                           } catch (e) {
                                                               errorHandler("OtaDetailPage.pagecreate", e);
                                                           }

                                                           $("#otabackbtn").off("vclick");
                                                           $("#otabackbtn").on("vclick", function(event) {
                                                               //alert("hi");
                                                               $("#ptimermg").empty();
                                                               //e.preventDefault();
                                                               goToPage("#coursepage");
                                                           });

                                                           $("#otadisagree").off("vclick");
                                                           $("#otadisagree").on("vclick", function(event) {
                                                           //alert("hi");
                                                           $("#ptimermg").empty();
                                                           goToPage("#coursepage");
                                                           });

                                                           $("#otaagree").off("vclick");
                                                           $("#otaagree").on("vclick", function(event) {
                                                           event.stopPropagation();
                                                               try {

                                                                   $("#OtaDetailPage").append(mloadingGif);
                                                                   var OtaIdForQuestions = window.localStorage.getItem("OTAId");
                                                                   var OTASectionIDsOTA =  window.localStorage.getItem("OTASectionIDs");
                                                                   coController.getOTAQuestions(OtaIdForQuestions,activeModule.basemoduleid,activeModule.courseid,activeModule.assessmentscheduleid,OTASectionIDsOTA,1, function(ret) {
                                                                       if(ret == 0){
                                                                           msgTitle = resources.connError;
                                                                           msgBtnValue = resources.btnOk;
                                                                           msgStr = resources.moduleOffline;
                                                                           navigator.notification.confirm(msgStr, function() {
                                                                               $("#mloader").remove();
                                                                               goToPage("#coursepage");

                                                                           }, msgTitle, msgBtnValue);
                                                                       }
                                                                       else{

                                                                           /*$("#mloader").remove();

                                                                           OtaQuestionDisplay(ret);
                                                                           goToPage("#OtaQuestionPage");*/
                                                                           $("#mloader").remove();
                                                                           OtaQuestionDisplay(ret);
                                                                           goToPage("#OtaQuestionPage");

                                                                       }
                                                                   });


                                                               } catch (e) {
                                                                   errorHandler("OtaQuestionPage.pagecreate", e);
                                                               }
                                                           });
                                                       }
                                                       else if(choice == 2){
                                                           IsLiveOTA = "0";
                                                           //alert("2");
                                                           //goToPage("#OtaDetailPage");
                                                           try {
                                                               //console.log(activeModule);
                                                               if(activeModule.otaTypeId == "4"){
                                                                   window.localStorage.removeItem("OTAModuleTitle");
                                                                   window.localStorage.setItem("OTAModuleTitle",activeModule.title);
                                                                   getOtaGuidliness(false, activeModule.basemoduleid,3,IsLiveOTA, function(ret){
                                                                       if(ret.getOTAInfoResult.Data.DetailsForOTAResult.IsMaxAttemptExceeded == "True"){

                                                                           msgTitle = resources.assessmentHead;
                                                                           msgBtnValue = resources.btnOk;
                                                                           msgStr = resources.IsMaxAttemptExceeded;
                                                                           navigator.notification.confirm(msgStr, function() {

                                                                           }, msgTitle, msgBtnValue);
                                                                       }
                                                                       else{
                                                                           if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes == 1){
                                                                               msgTitle = resources.assessmentHead;
                                                                               msgBtnValue = resources.btnOk;
                                                                               msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRest;
                                                                               navigator.notification.confirm(msgStr, function() {

                                                                               }, msgTitle, msgBtnValue);
                                                                           }else if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes > 1){
                                                                               msgTitle = resources.assessmentHead;
                                                                               msgBtnValue = resources.btnOk;
                                                                               msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRestminutes;
                                                                               navigator.notification.confirm(msgStr, function() {

                                                                               }, msgTitle, msgBtnValue);
                                                                           }else{
                                                                               goToPage("#OtaDetailPage");
                                                                               OtaGuidlinesDisplay(ret);
                                                                           }

                                                                       }
                                                                   });
                                                               }
                                                               else{
                                                                   window.localStorage.removeItem("OTAModuleTitle");
                                                                   window.localStorage.setItem("OTAModuleTitle",activeModule.title);
                                                                   getOtaGuidliness(false, activeModule.basemoduleid,activeModule.otaTypeId,IsLiveOTA, function(ret){
                                                                       if(ret.getOTAInfoResult.Data.DetailsForOTAResult.IsMaxAttemptExceeded == "True"){

                                                                           msgTitle = resources.assessmentHead;
                                                                           msgBtnValue = resources.btnOk;
                                                                           msgStr = resources.IsMaxAttemptExceeded;
                                                                           navigator.notification.confirm(msgStr, function() {

                                                                           }, msgTitle, msgBtnValue);
                                                                       }
                                                                       else{
                                                                           if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes == 1){
                                                                               msgTitle = resources.assessmentHead;
                                                                               msgBtnValue = resources.btnOk;
                                                                               msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRest;
                                                                               navigator.notification.confirm(msgStr, function() {

                                                                               }, msgTitle, msgBtnValue);
                                                                           }else if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes > 1){
                                                                               msgTitle = resources.assessmentHead;
                                                                               msgBtnValue = resources.btnOk;
                                                                               msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRestminutes;
                                                                               navigator.notification.confirm(msgStr, function() {

                                                                               }, msgTitle, msgBtnValue);
                                                                           }else{
                                                                               goToPage("#OtaDetailPage");
                                                                               OtaGuidlinesDisplay(ret);
                                                                           }

                                                                       }
                                                                   });
                                                               }



                                                           } catch (e) {
                                                               errorHandler("OtaDetailPage.pagecreate", e);
                                                           }

                                                           $("#otabackbtn").off("vclick");
                                                           $("#otabackbtn").on("vclick", function(event) {
                                                           //alert("hi");
                                                           $("#ptimermg").empty();
                                                           //e.preventDefault();
                                                           goToPage("#coursepage");
                                                           });

                                                           $("#otadisagree").off("vclick");
                                                           $("#otadisagree").on("vclick", function(event) {
                                                           //alert("hi");
                                                           $("#ptimermg").empty();
                                                           goToPage("#coursepage");
                                                           });

                                                           $("#otaagree").off("vclick");
                                                           $("#otaagree").on("vclick", function(event) {
                                                           event.stopPropagation();
                                                               try {

                                                                   $("#OtaDetailPage").append(mloadingGif);
                                                               var OtaIdForQuestions = window.localStorage.getItem("OTAId");
                                                               var OTASectionIDsOTA =  window.localStorage.getItem("OTASectionIDs");
                                                               coController.getOTAQuestions(OtaIdForQuestions,activeModule.basemoduleid,activeModule.courseid,activeModule.assessmentscheduleid,OTASectionIDsOTA,0, function(ret) {
                                                                   if(ret == 0){
                                                                       msgTitle = resources.connError;
                                                                       msgBtnValue = resources.btnOk;
                                                                       msgStr = resources.moduleOffline;
                                                                       navigator.notification.confirm(msgStr, function() {
                                                                           $("#mloader").remove();
                                                                           goToPage("#coursepage");

                                                                       }, msgTitle, msgBtnValue);
                                                                   }
                                                                   else{

                                                                       /*$("#mloader").remove();

                                                                       OtaQuestionDisplay(ret);
                                                                       goToPage("#OtaQuestionPage");*/
                                                                       $("#mloader").remove();


                                                                       OtaQuestionDisplay(ret);
                                                                       goToPage("#OtaQuestionPage");



                                                                   }
                                                               });


                                                               } catch (e) {
                                                                   errorHandler("OtaQuestionPage.pagecreate", e);
                                                               }
                                                           });
                                                       }
                                                       else{

                                                       }
                                                   }
                                               }
                                               else{
                                                   IsLiveOTA = "0";
                                                   //alert("3");
                                                   //goToPage("#OtaDetailPage");
                                                   try {
                                                       if(activeModule.otaTypeId == "4"){
                                                           window.localStorage.removeItem("OTAModuleTitle");
                                                           window.localStorage.setItem("OTAModuleTitle",activeModule.title);
                                                           getOtaGuidliness(false, activeModule.basemoduleid,3, IsLiveOTA,function(ret){
                                                               if(ret.getOTAInfoResult.Data.DetailsForOTAResult.IsMaxAttemptExceeded == "True"){

                                                                   msgTitle = resources.assessmentHead;
                                                                   msgBtnValue = resources.btnOk;
                                                                   msgStr = resources.IsMaxAttemptExceeded;
                                                                   navigator.notification.confirm(msgStr, function() {

                                                                   }, msgTitle, msgBtnValue);
                                                               }
                                                               else{
                                                                   if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes == 1){
                                                                       msgTitle = resources.assessmentHead;
                                                                       msgBtnValue = resources.btnOk;
                                                                       msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRest;
                                                                       navigator.notification.confirm(msgStr, function() {

                                                                       }, msgTitle, msgBtnValue);
                                                                   }else if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes > 1){
                                                                       msgTitle = resources.assessmentHead;
                                                                       msgBtnValue = resources.btnOk;
                                                                       msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRestminutes;
                                                                       navigator.notification.confirm(msgStr, function() {

                                                                       }, msgTitle, msgBtnValue);
                                                                   }else{
                                                                       goToPage("#OtaDetailPage");
                                                                       OtaGuidlinesDisplay(ret);
                                                                   }

                                                               }
                                                           });
                                                       }
                                                       else{
                                                           window.localStorage.removeItem("OTAModuleTitle");
                                                           window.localStorage.setItem("OTAModuleTitle",activeModule.title);
                                                           getOtaGuidliness(false, activeModule.basemoduleid,activeModule.otaTypeId,IsLiveOTA, function(ret){
                                                               if(ret.getOTAInfoResult.Data.DetailsForOTAResult.IsMaxAttemptExceeded == "True"){

                                                                   msgTitle = resources.assessmentHead;
                                                                   msgBtnValue = resources.btnOk;
                                                                   msgStr = resources.IsMaxAttemptExceeded;
                                                                   navigator.notification.confirm(msgStr, function() {

                                                                   }, msgTitle, msgBtnValue);
                                                               }
                                                               else{
                                                                   if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes == 1){
                                                                       msgTitle = resources.assessmentHead;
                                                                       msgBtnValue = resources.btnOk;
                                                                       msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRest;
                                                                       navigator.notification.confirm(msgStr, function() {

                                                                       }, msgTitle, msgBtnValue);
                                                                   }else if(ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes > 1){
                                                                       msgTitle = resources.assessmentHead;
                                                                       msgBtnValue = resources.btnOk;
                                                                       msgStr = resources.TimeBetweenAttempts+ret.getOTAInfoResult.Data.DetailsForOTAResult.OtaWaitingTimeInMinutes+resources.TimeBetweenAttemptsRestminutes;
                                                                       navigator.notification.confirm(msgStr, function() {

                                                                       }, msgTitle, msgBtnValue);
                                                                   }else{
                                                                       goToPage("#OtaDetailPage");
                                                                       OtaGuidlinesDisplay(ret);
                                                                   }

                                                               }
                                                           });
                                                       }
                                                   } catch (e) {
                                                       errorHandler("OtaDetailPage.pagecreate", e);
                                                   }

                                                   $("#otabackbtn").off("vclick");
                                                   $("#otabackbtn").on("vclick", function(event) {
                                                   //alert("hi");
                                                   $("#ptimermg").empty();
                                                   //e.preventDefault();
                                                   goToPage("#coursepage");
                                                   });

                                                   $("#otadisagree").off("vclick");
                                                   $("#otadisagree").on("vclick", function(event) {
                                                   //alert("hi");
                                                   $("#ptimermg").empty();
                                                   goToPage("#coursepage");
                                                   });

                                                   $("#otaagree").off("vclick");
                                                   $("#otaagree").on("vclick", function(event) {
                                                   event.stopPropagation();
                                                       try {

                                                           $("#OtaDetailPage").append(mloadingGif);
                                                           var OtaIdForQuestions = window.localStorage.getItem("OTAId");
                                                           var OTASectionIDsOTA =  window.localStorage.getItem("OTASectionIDs");
                                                           coController.getOTAQuestions(OtaIdForQuestions,activeModule.basemoduleid,activeModule.courseid,activeModule.assessmentscheduleid,OTASectionIDsOTA,0, function(ret) {
                                                               if(ret == 0){
                                                                   msgTitle = resources.connError;
                                                                   msgBtnValue = resources.btnOk;
                                                                   msgStr = resources.moduleOffline;
                                                                   navigator.notification.confirm(msgStr, function() {
                                                                       $("#mloader").remove();
                                                                       goToPage("#coursepage");

                                                                   }, msgTitle, msgBtnValue);
                                                               }
                                                               else{

                                                                   $("#mloader").remove();


                                                                       OtaQuestionDisplay(ret);
                                                                       goToPage("#OtaQuestionPage");


                                                                   //OtaQuestionDisplay(ret);
                                                                   //goToPage("#OtaQuestionPage");

                                                               }
                                                           });


                                                       } catch (e) {
                                                           errorHandler("OtaQuestion.pagecreate", e);
                                                       }
                                                   });
                                               }
                                           }
                                       }
                                   }
                               });



                             }
                           else {
                          if (modType === "Portfolio" || modType === "Practicum") {
                          isGuideLines = true;
                          if (activeModule.status !== "In Progress" && activeModule.status !== "Completed") {
                          activeModule.updateGuidelinesStatus(function(ret) {
                                                              resetStatusDisplay("module");
                                                              refreshMenu("refresh");
                                                              });
                          }
                          activeModule.getGuidelinesContent(function(ret) {
                                                            if (ret === "offline") {
                                                            msgTitle = resources.connError;
                                                            msgBtnValue = resources.btnOk;
                                                            msgStr = resources.moduleOffline;
                                                            if (supressWarningMsgs === false) {
                                                            navigator.notification.confirm(msgStr, function() {
                                                                                           hidePleaseWait();
                                                                                           }, msgTitle, msgBtnValue);
                                                            }
                                                            } else {
                                                            if (ret != undefined) {
                                                            resetMenuOpenName();
                                                            setSCOContent(ret, true, false);
                                                            resetContentHeight();
                                                            }
                                                            }
                                                            });
                          } else {
                          if (modType === "Certificate") {
                          if (activeModule.status === "Completed") {
                          activeSection = undefined;
                          activeSCO = undefined;
                          setUserPosition(false, "#coursepage", true);
                          displayModuleCertificate(function() {});
                          } else {
                          if (activeModule.status === "In Progress" || activeModule.status === "Not Started") {
                          if (deviceIsOnline === true) {
                          activeSection = undefined;
                          activeSCO = undefined;
                          setUserPosition(false, "#coursepage", true);
                          if (activeModule.status === "Not Started") {
                          activeModule.updateModuleStatus(courseStatus.InProgress, function() {
                                                          activeModule.status = "In Progress";
                                                          resetStatusDisplay("module");
                                                          });
                          }
                          requestModuleCertificate(function() {
                                                   activeModule.status = "Completed";
                                                   resetStatusDisplay("module");
                                                   refreshMenu("refresh");
                                                   var id = "#module-" + activeModule.courseid + "-" + activeModule.basemoduleid;
                                                   if ($(id) != undefined) {
                                                   setTimeout(function() {
                                                              menuScroller.scrollToElement(id, 300);
                                                              hidePleaseWait();
                                                              }, 300);
                                                   }
                                                   });
                          } else {
                          msgTitle = resources.connError;
                          msgBtnValue = resources.btnOk;
                          msgStr = resources.moduleOffline;
                          if (supressWarningMsgs === false) {
                          navigator.notification.confirm(msgStr, function() {
                                                         hidePleaseWait();
                                                         }, msgTitle, msgBtnValue);
                          }
                          }
                          } else {
                          if (naOK === true) {
                          naOK = false;
                          event.preventDefault();
                          event.stopPropagation();
                          hidePleaseWait;
                          msgStr = resources.moduleIncomplete;
                          msgTitle = resources.moduleAccess;
                          msgBtnValue = resources.btnOk;
                          if (supressWarningMsgs === false) {
                          navigator.notification.confirm(msgStr, function() {
                                                         hidePleaseWait();
                                                         naOK = true;
                                                         }, msgTitle, msgBtnValue);
                          }
                          }
                          }
                          }
                          } else {
                          $("#theoryviewheader").html(resources.theoryView);
                          hidePleaseWait();
                          populateSectionsList(modType, false, function(ret) {
                                               if (ret === true) {

                                               //Automatically go to the Section & SCO
                                               triggerSection();

                                               }
                                               });
                          }
                          }
                          }
                          }
                          }
                          }
                          }
                          } else {
                          loadFirstSave = true;
                          }
                          }
                          event.preventDefault();
                          }catch(e){
                          errorHandler(".moduleli", e);
                          moduleOK=true;
                          naOK=true;
                          }
                          });
        $(".prevmodulesincomplete").off("vclick");
        $(".prevmodulesincomplete").on("vclick", function(event) {
                                       continueLoad = false;
                                       prevModulesIncomplete(event, function(ret) {});
                                       });
        $(".showmodulegetguidelines").off("vclick");
        $(".showmodulegetguidelines").on("vclick", function(event) {
                                         continueLoad = false;
                                         showGuideLinesInaccessible(event, function(ret) {});
                                         });
        $(".showmoduleexempt").off("vclick");
        $(".showmoduleexempt").on("vclick", function(event) {
                                  continueLoad = false;
                                  showModuleExemptInaccessible(event, function(ret) {});
                                  });
        $(".modulepaymentrequired").off("vclick");
        $(".modulepaymentrequired").on("vclick", function(event) {
                                       continueLoad = false;
                                       showModulePaymentInaccessible(event, function(ret) {});
                                       });
         $(".RequiresBooking").off("vclick");
         $(".RequiresBooking").on("vclick", function(event) {
                                        continueLoad = false;
                                        showModuleRequiresBooking(event,function(ret){});
                                        });
        $(".showpracticummodule").off("vclick");
        $(".showpracticummodule").on("vclick", function(event) {
                                     continueLoad = false;
                                     showModulePracticumInaccessible(event, function(ret) {});
                                     });
        $(".showmodulebook").off("vclick");
        $(".showmodulebook").on("vclick", function(event) {
                                continueLoad = false;
                                prevModulesIncomplete(event, function(ret) {});
                                });
        return true;
    }catch(e){
        errorHandler("setModulesValues", e);
        return false;
    }
}
function setHeaderMenuButtons(){
    try{
        $("#headercourseiconlhs").off("vclick");
        $("#headercourseiconlhs").on("vclick", function(event) {
                                     event.preventDefault();
                                     event.stopPropagation();
                                     showMenu=true;
                                     if (menubtnOk===true) {
                                     if (menuScroller != undefined) {
                                     setPagePadderDiv("menuScroller", false);
                                     }
                                     changeMenu("courses");
                                     }
                                     });
        $("#headermoduleiconlhs").off("vclick");
        $("#headermoduleiconlhs").on("vclick", function(event) {
                                     event.preventDefault();
                                     event.stopPropagation();
                                     showMenu=true;
                                     if (menubtnOk===true) {
                                     if (menuGroupScroller != undefined) {
                                     setPagePadderDiv("menuGroupScroller", false);
                                     }
                                     changeMenu("groups");
                                     }
                                     });
        $("#headerlessoniconlhs").off("vclick");
        $("#headerlessoniconlhs").on("vclick", function(event) {
                                     event.preventDefault();
                                     event.stopPropagation();
                                     showMenu=true;
                                     if (menubtnOk===true) {
                                     if (scoMenuScroller != undefined) {
                                     setPagePadderDiv("scoMenuScroller", false);
                                     }
                                     changeMenu("scos");
                                     }
                                     });
        $("#changemenubtn").off("vclick");
        $("#changemenubtn").on("vclick", function(event) {
                               event.preventDefault();
                               event.stopPropagation();
                               if (menubtnOk===true) {
                               if (menuScroller != undefined) {
                               setPagePadderDiv("menuScroller", false);
                               }
                               changeMenu("courses");
                               }
                               });

        $("#rightmenubtn").off("vclick");
        $("#rightmenubtn").on("vclick", function(event) {
                              rhsMenuOpen = true;
                              event.preventDefault();
                              if (searchFocus === true) {
                              searchFocus = false;
                              $("#sectionsearchdiv .ui-input-search a").hide();
                              $("#sectionsearchdiv input").val("");
                              $("#autocomplete").empty();
                              setPagePadderDiv("menuScroller", true);
                              hideKeyboard(event, false);
                              }

                              $(".extramenupanel").panel("open");
                              $(".extramenupanel").addClass("ui-panel-open");
                              });

        $("#courseleftmenubtn").off("vclick");
        $("#courseleftmenubtn").on("vclick", function(event) {
                                   if (menubtnOk === true) {
                                   menubtnOk = false;
                                   showMenu=true;
                                   if (searchFocus === true) {
                                   searchFocus = false;
                                   $("#sectionsearchdiv .ui-input-search a").hide();
                                   $("#sectionsearchdiv input").val("");
                                   $("#autocomplete").empty();
                                   setPagePadderDiv("menuScroller", true);
                                   hideKeyboard(event, false);
                                   }
                                   setTimeout(function() {menubtnOk = true;}, 300);
                                   changeMenu("courses");
                                   }
                                   event.preventDefault();
                                   });
        $("#moduleleftmenubtn").off("vclick");
        $("#moduleleftmenubtn").on("vclick", function(event) {
                                   if (menubtnOk === true) {
                                   menubtnOk = false;
                                   showMenu=true;
                                   if (searchFocus === true) {
                                   searchFocus = false;
                                   $("#sectionsearchdiv .ui-input-search a").hide();
                                   $("#sectionsearchdiv input").val("");
                                   $("#autocomplete").empty();
                                   setPagePadderDiv("menuScroller", true);
                                   hideKeyboard(event, false);
                                   }
                                   setTimeout(function() {menubtnOk = true;}, 300);
                                   changeMenu("groups");
                                   }
                                   event.preventDefault();
                                   });

        $("#lessonleftmenubtn").off("vclick");
        $("#lessonleftmenubtn").on("vclick", function(event) {
                                   if (menubtnOk === true) {
                                   menubtnOk = false;
                                   showMenu=true;
                                   if (searchFocus === true) {
                                   searchFocus = false;
                                   $("#sectionsearchdiv .ui-input-search a").hide();
                                   $("#sectionsearchdiv input").val("");
                                   $("#autocomplete").empty();
                                   setPagePadderDiv("menuScroller", true);
                                   hideKeyboard(event, false);
                                   }

                                   $("#theorydatacontent").empty();
                                   $("#contentnavdiv").hide();
                                   $("#wscontentnavdiv").hide();
                                   $("#theoryviewheader").html("");
                                   setTimeout(function() {menubtnOk = true;}, 300);
                                   changeMenu("scos");
                                   }
                                   event.preventDefault();
                                   });
        $("#lessonheadclosebtn").off("vclick");
        $("#lessonheadclosebtn").on("vclick", function(event) {
                                    event.preventDefault();
                                    if (menubtnOk === true) {
                                    menubtnOk = false;
                                    showMenu=true;
                                    if (searchFocus === true) {
                                    searchFocus = false;
                                    $("#sectionsearchdiv .ui-input-search a").hide();
                                    $("#sectionsearchdiv input").val("");
                                    $("#autocomplete").empty();
                                    setPagePadderDiv("menuScroller", true);
                                    hideKeyboard(event, false);
                                    }
                                    setTimeout(function() {menubtnOk = true;}, 300);
                                    if($("#lessonheadclosebtn").hasClass("assessresults")){
                                    changeMenu("groups");
                                    }else if($("#lessonheadclosebtn").hasClass("assesssummary")){
                                    changeMenu("courses");
                                    }else{
                                    changeMenu("scos");
                                    }
                                    }

                                    });
        return true;
    }catch(e){
        return false;
    }
}
function setFooterMenuButtons(){
    try{
        $("#footerleftbckbtn").off("vclick");
        $("#footerleftbckbtn").on("vclick", function(event) {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  showMenu=true;
                                  menuOpen = $("#menucontentdiv .menuopen").length > 0 ? true : false;
                                  if (menubtnOk===true) {

                                  if($("#footerleftbckbtn").hasClass('moduleicon') && $("#footerleftbckbtn").hasClass('btnmenuopen')) {
                                  if (menuScroller != undefined) {
                                  setPagePadderDiv("menuScroller", false);
                                  }
                                  changeMenu("courses");
                                  }else if($("#footerleftbckbtn").hasClass('lessonicon') && $("#footerleftbckbtn").hasClass('btnmenuopen')) {
                                  if (menuGroupScroller != undefined) {
                                  setPagePadderDiv("menuGroupScroller", false);
                                  }
                                  changeMenu("groups");
                                  }else if($("#footerleftbckbtn").hasClass('moduleicon') && $("#footerleftbckbtn").hasClass('btnmenuopen')===false) {
                                  if (menuGroupScroller != undefined) {
                                  setPagePadderDiv("menuGroupScroller", false);
                                  }
                                  changeMenu("groups");
                                  }else if($("#footerleftbckbtn").hasClass('lessonicon') && $("#footerleftbckbtn").hasClass('btnmenuopen')===false) {
                                  if (scoMenuScroller != undefined) {
                                  setPagePadderDiv("scoMenuScroller", false);
                                  }
                                  changeMenu("scos");
                                  }else if($("#footerleftbckbtn").hasClass('moduleicon') === false && $("#footerleftbckbtn").hasClass('lessonicon')===false ) {
                                  if (menuScroller != undefined) {
                                  setPagePadderDiv("menuScroller", false);
                                  }
                                  changeMenu("courses");
                                  }
                                  }
                                  });
        $("#coursepanelheaderrhs").off("vclick");
        $("#coursepanelheaderrhs").on("vclick", function(event) {
                                      rhsMenuOpen = true;
                                      event.preventDefault();
                                      if($("#coursepanelheaderrhs").hasClass("settingsicon")===true){
                                      if($("#menucontentcourse").hasClass("menuopen")){
                                      menuOpenName = "courses";
                                      }else if($("#menucontentgroup").hasClass("menuopen")){
                                      menuOpenName = "groups";
                                      }else if($("#menucontentsection").hasClass("menuopen")){
                                      menuOpenName = "scos";
                                      }else{
                                      resetMenuOpenName();
                                      }
                                      $(".extramenupanel").panel("open");
                                      $(".extramenupanel").addClass("ui-panel-open");
                                      }

                                      });
        $("#settingspanelrhs").off("vclick");
        $("#settingspanelrhs").on("vclick", function(event) {
                                  rhsMenuOpen = false;
                                  event.preventDefault();
                                  $(".extramenupanel").panel("close");
                                  });
        $(".homeicon").off("vclick");
        $(".homeicon").on("vclick", function(event) {
                          rhsMenuOpen = false;
                          event.preventDefault();
                          // $(".coursemenupanel").panel("close");
                          if (menuScroller != undefined) {
                          setPagePadderDiv("menuScroller", false);
                          }
                          changeMenu("courses");
                          });
        return true;
    }catch(e){
        return false;
    }
}
function destroyPlayers() {
    try {
        audioPaused = true;
        videoPaused = true;
        audioTheoryPaused = true;
        if (destroyPlayersOK === true) {
            destroyPlayersOK = false;
            if (device.platform !== "Android" && podcastVideoPlayer !== undefined && podcastVideoPlayer !== null) {
                podcastVideoPlayer.pause();
                podcastVideoPlayer.remove();
                podcastVideoPlayer = null;
            }
            if (device.platform !== "Android" && podcastAudioPlayer !== undefined && podcastAudioPlayer !== null) {
                podcastAudioPlayer.pause();
                podcastAudioPlayer.remove();
                podcastAudioPlayer = null;
            }
            if (device.platform !== "Android" && videoVideoPlayer !== undefined && videoVideoPlayer !== null) {
                videoVideoPlayer.pause();
                videoVideoPlayer.remove();
                videoVideoPlayer = null;
            }
            if (device.platform !== "Android" && eClassVideoPlayer !== undefined && eClassVideoPlayer !== null) {
                eClassVideoPlayer.pause();
                eClassVideoPlayer.remove();
                eClassVideoPlayer = null;
            }
            if (audioAudioPlayer1 !== undefined && audioAudioPlayer1 !== null) {
                audioAudioPlayer1.pause();
                $("#audioplayerdiv1 .mejs-time span.mejs-currenttime").html("00:00");
                $("#audioplayerdiv1 .mejs-time span.mejs-duration").html("00:00");
                $("#audioplayerdiv1 .mejs-time-current").css("width", 0);
                $("#audioplayerdiv1 .mejs-time-handle").css("width", 0);
                $("#audioplayerdiv1 .mejs-time-handle").css("left", 0);
                $("#audioplayerdiv1 .mejs-time-loaded").css("width", 0);
                $("#audioplayerdiv1 .mejs-time-float").css("display", "none");
                audioAudioPlayer1.remove();
                audioAudioPlayer1 = null;
            }
            if (audioAudioPlayer3 !== undefined && audioAudioPlayer3 !== null) {
                audioAudioPlayer3.pause();
                audioAudioPlayer3.remove();
                audioAudioPlayer3 = null;
            }
            if (audioTheoryPlayer !== null && audioTheoryPlayer !== undefined) {
                audioTheoryPlayer.pause();
                audioTheoryPlayer.remove();
                audioTheoryPlayer = null;
            }

            setTimeout(function() {
                       destroyPlayersOK = true;
                       }, 600);
        }
    } catch (e) {
        errorHandler("destroyPlayers", e);
    }
}

function setMediaSetRefresh(){
    try{

        refreshTimer = setTimeout(mediaSetRefresh, 86400000);

    }catch(e){
        errorHandler("setMediaSetRefresh", e);
    }
}
function mediaSetRefresh(){
    try{
        if(deviceIsOnline===true){

            activeUser.saveFilesList(undefined, "userplaylists", true, function() {});
            activeUser.saveFilesList(undefined, "podcasts", true, function() {});
            activeUser.saveFilesList(undefined, "audiocategories", true, function() {});
            activeUser.saveFilesList(undefined, "videocategories", true, function() {});
            activeUser.saveFilesList(undefined, "eclasses", true, function() {});

            mediaInit=true;
            coursesInit=true;
            videoCategoryListing =  "";
            audioCategoryListing = "";
            eClassListing = "";
            podcastsListing = [];
            playlistTracks="";
            useExistingMedia = false;
            refreshTimer = setTimeout(mediaSetRefresh, 86400000);
        }else{
            refreshTimer = setTimeout(mediaSetRefresh, 300000);
        }
    }catch(e){
        errorHandler("mediaSetRefresh", e);
    }
}

function resetMenuOpenName(){
    try{
        setTimeout(function(){
                   menuOpenName="";
                   $("#menucontentcourse").removeClass("menuopen").addClass("menuclosed");
                   $("#menucontentgroup").removeClass("menuopen").addClass("menuclosed");
                   $("#menucontentsection").removeClass("menuopen").addClass("menuclosed");
                   },400);
        return true;
    }catch(e){
        //errorHandler("resetMenuOpenName", e);
        return false;
    }
}
function checkPDFFileSize(fileEntry) {
    try{
        if(fileEntry!==undefined){
            fileEntry.file(function(fileObj) {
                           if(fileObj.size < 100){
                           fileEntry.remove();
                           }
                           });

        }
    }catch(e){
        return false;
    }
}
function deleteAllUserData() {
    try{



    if(autologoutstring==1)
    {
    window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory,
                                                 function(entry) {
                                                 entry.removeRecursively(function(){}, function(){});
                                                 });
    }
      if(userMainDir!==undefined){
            userMainDir.removeRecursively(function(parent){},
                                          function(error){
                                          console.log("failed to delete data = " + error.code);
                                          });
        }
    }catch(e){
        return false;
    }
}

function ExitConfirm(buttonIndex)
{
  if(buttonIndex==1){
    navigator.app.exitApp();
  }


}



/*$(document).on("pagecreate", "#OtaDetailPage", function(event) {
  try {
      getOtaGuidliness(false, "1631", OtaGuidlinesDisplay);
  } catch (e) {
      errorHandler("OtaDetailPage.pagecreate", e);
  }
});*/
var timeinterval;
var timerIntervalAssement;
function pressHome(){
    $("#quiz").hide();
    clearInterval(tts);
    $(".myButton2").hide();
    ates =[];
    rightans = 0;
    totoalquest=0;
    useransqu = 0;
    questionCounter = 0; //Tracks question number
    questionCounter1 = 0;
    selections = []; //Array containing user choices
    quiz = $('#quiz'); //OTA div object
    answeruser = [];
    answerusernew = [];
    sectiontsarray = [];
    rightansw=0;
    rightclickansw = 0;
    totlaques=0;
    finfaland="";
    i=0;
    checkTureAns = 1;
    checkTureAnsArray = [];
    heckTureAnsArray = [];
    j=0;
    questions="";
    objdata="";
    lendata="";
    seconds="";
    minutes="";
    hours="";
    days="";
    lendataNew = "";
    $("#ptimermg").empty();
    $("#clockdiv").empty();
    clearInterval(timeinterval);
    clearInterval(timerIntervalAssement);
    //console.log(timerIntervalAssement);
    //timeinterval = null;
    $("#progressBar2").animate({ marginTop: "-93px" }, 500);
    $("#finishClick").css("display","none");
    goToPage("#coursepage");
     $('#quizResult').html('');
                $("#quizResult").css("display","none");
                $("#goBack").css("display","none");
    msgTitle = resources.assessmentHead;
    msgBtnValue = resources.btnOk;
    //msgStr = 'No More Questions in this OTA!';
    msgStr = resources.homeBtnPress;
    navigator.notification.confirm(msgStr,function() { console.log("done")}, msgTitle, msgBtnValue);
}

function pressBackOnQues(){
    $("#quiz").hide();
    clearInterval(tts);
    $(".myButton2").hide();
    ates =[];
    rightans = 0;
    totoalquest=0;
    useransqu = 0;
    questionCounter = 0; //Tracks question number
    questionCounter1 = 0;
    selections = []; //Array containing user choices
    quiz = $('#quiz'); //OTA div object
    answeruser = [];
    answerusernew = [];
    sectiontsarray = [];
    rightansw=0;
    rightclickansw = 0;
    totlaques=0;
    finfaland="";
    i=0;
    checkTureAns = 1;
    checkTureAnsArray = [];
    heckTureAnsArray = [];
    j=0;
    questions="";
    objdata="";
    lendata="";
    seconds="";
    minutes="";
    hours="";
    days="";
    lendataNew = "";
    $("#ptimermg").empty();
    $("#clockdiv").empty();
    clearInterval(timeinterval);
    clearInterval(timerIntervalAssement);
    //console.log(timerIntervalAssement);
    //timeinterval = null;
    $("#progressBar2").animate({ marginTop: "-93px" }, 500);
    $("#finishClick").css("display","none");
    goToPage("#coursepage");
     $('#quizResult').html('');
                $("#quizResult").css("display","none");
                $("#goBack").css("display","none");
}

$("#otaquestionbackbtn").on("vclick", function(event) {
    event.preventDefault();
    msgTitle = resources.assessmentHead;
    msgBtnValue = resources.btnYesNo;
    //msgStr = "Do you want to select an answer?";
    msgStr = resources.leaveOTA;
    navigator.notification.confirm(msgStr, leaveOTA, msgTitle, msgBtnValue);
    function leaveOTA(choice){
      //alert(choice);

      //alert(testdata);
      if(choice==2){
        clearInterval(tts);
        $(".myButton2").hide();
        ates =[];
        rightans = 0;
        totoalquest=0;
        useransqu = 0;
        questionCounter = 0; //Tracks question number
        questionCounter1 = 0;
        selections = []; //Array containing user choices
        quiz = $('#quiz'); //OTA div object
        answeruser = [];
        answerusernew = [];
        sectiontsarray = [];
        rightansw=0;
        rightclickansw = 0;
        totlaques=0;
        finfaland="";
        i=0;
        checkTureAns = 1;
        checkTureAnsArray = [];
        heckTureAnsArray = [];
        j=0;
        questions="";
        objdata="";
        lendata="";
        seconds="";
        minutes="";
        hours="";
        days="";
        $("#ptimermg").empty();
        $("#clockdiv").empty();
        clearInterval(timeinterval);
        clearInterval(timerIntervalAssement);
        //console.log(timerIntervalAssement);
        //timeinterval = null;
        $("#progressBar2").animate({ marginTop: "-93px" }, 500);
        $("#finishClick").css("display","none");
        goToPage("#coursepage");
      }
      else{

      }
    }
    //alert("hi");


});

function OtaGuidlinesDisplay(data)
{

  $("#progressBar2").css("display","block");
  $("#progressBar").css("display","block");
  //alert($("#OtaDetailPage").css("paddingTop"));
  var OtaDetailPagePadingtop = $("#OtaDetailPage").css("paddingTop");
  if(OtaDetailPagePadingtop == "29px"){
    $("#OtaDetailPage").css("padding-top","68px");
  }
  else if(OtaDetailPagePadingtop == "67px"){
    $("#OtaDetailPage").css("padding-top","68px");
  }
  else{
    $("#OtaDetailPage").css("padding-top","47px");
  }
  //console.log(data);
  //var OtaGuidlineData=data.getOTAInfoResult.JsonResponse;
  if(data == 0){

    msgTitle = resources.assessmentHead;
    msgBtnValue = resources.btnOk;
    msgStr = resources.generalFunctionError;
    navigator.notification.confirm(msgStr, function() {
       goToPage("#coursepage");
    }, msgTitle, msgBtnValue);
  }

  else if(data.getOTAInfoResult.Data.DetailsForOTAResult.OTAId == null){
      msgTitle = resources.assessmentHead;
      msgBtnValue = resources.btnOk;
      msgStr = resources.generalFunctionError;
      navigator.notification.confirm(msgStr, function() {
         goToPage("#coursepage");
      }, msgTitle, msgBtnValue);
  }
  else{
      if(data.getOTAInfoResult.Data.DetailsForOTAResult.IsMaxLiveAttemptsExceeded == "True"){
          goToPage("#coursepage");
      }
      else{
          if(data.getOTAInfoResult.Data != undefined && data.getOTAInfoResult.Data != null){


              var OtaGuidlineData=data.getOTAInfoResult.Data;
              //console()
              //console.log(OtaGuidlineData);
              //var OtaGuidlineFormatedDatanew =   OtaGuidlineData.replace(/\\/g, '').replace(/\@/g, '').replace(/\&gt;/g, '>').replace(/\&lt;/g, '<');
              var OtaGuidlineFormatedDatanew = OtaGuidlineData;

              //var obj= JSON.parse(OtaGuidlineFormatedDatanew);
              var obj= OtaGuidlineFormatedDatanew;
              var objdata=JSON.stringify(obj.DetailsForOTAResult);

              window.localStorage.removeItem("OTASectionIDs");
              window.localStorage.setItem("OTASectionIDs", obj.DetailsForOTAResult.OTASectionIDList);

              var objn= JSON.parse(objdata);
              window.localStorage.removeItem("OtaPersualTime");
              window.localStorage.setItem("OtaPersualTime", objn.OtaPersualTime);

              window.localStorage.removeItem("OverAllMarks");
              window.localStorage.setItem("OverAllMarks", objn.OverAllMarks);

              window.localStorage.removeItem("OtaAssessmentTime");
              //console.log(objn.OtaPersualTime);
              window.localStorage.setItem("OtaAssessmentTime", objn.OtaAssessmentTime);

              window.localStorage.removeItem("OTAId");
              window.localStorage.setItem("OTAId", objn.OTAId);


              window.localStorage.removeItem("OverallTotalQuestions");
              window.localStorage.setItem("OverallTotalQuestions", objn.OverallTotalQuestions);


              console.log(objn);
              $("#timingsAttempts").empty();
              if(objn.TodaysOtaAttempts != null || objn.MaxAttemptsPerDay != null){
                  $("#timingsAttempts").append('<span id="spanperusaltime" style="color: #8f8f8f;">'+resources.AttemptsPerDay+'</span> <span class="text-red" style="font-weight: bold;" id="perusaltime"> '+objn.TodaysOtaAttempts+"/"+objn.MaxAttemptsPerDay+' </span><br>');
              }
              else{

              }


              if(objn.OtaPersualTime == 0){
                  //$("#perusaltime").empty();
                  //$("#spanperusaltime").html(resources.persualTime);
                  //$("#perusaltime").html("0");
                  //$("#timingsAttempts").append('<span id="spanperusaltime" style="color: #8f8f8f;">'+resources.persualTime+'</span> <span class="text-red" style="font-weight: bold;" id="perusaltime"> 0 </span><br>');
              }
              else{
                  $("#timingsAttempts").append('<span id="spanperusaltime" style="color: #8f8f8f;">'+resources.persualTime+'</span> <span class="text-red" style="font-weight: bold;" id="perusaltime"> '+objn.OtaPersualTime+' </span><br>');
                  //$("#spanperusaltime").html(resources.persualTime);
                  //$("#perusaltime").html(objn.OtaPersualTime);
              }
              var moduleTtile = window.localStorage.getItem("OTAModuleTitle");

              //console.log(moduleTtile);
              $(".moduleTitleOTA").html(moduleTtile);
              //$(".moduleTitleOTA").html("moduleTtile");
              //$("#otaTitle").html(objn.OtaTitle);

              $("#timingsAttempts").append('<span id="spanassessmenttime" style="color: #8f8f8f;">'+resources.assesmentTime+'</span>: <span class="text-red" style="font-weight: bold;" id="assessmenttime" >' +objn.OtaAssessmentTime+' </span>');
              //$("#assessmenttime").html(objn.OtaAssessmentTime);
              //$("#spanassessmenttime").html(resources.assesmentTime);
              $("#spansection").html(resources.sectionsspan);

              $("#spanoverallpassmarks").html(resources.ovlpassmarks);

              $("#assGuidlines").html(resources.assGuidlines);

              //$("#disagreelink").html(resources.OTAagree);
              //$("#agreelink").html(resources.OTAnotagreed);
              $("#overallpassmarks").html(objn.OverAllMarks+"/"+objn.OverallTotalQuestions);
              $("#section").empty();
              for (var i=0; i <objn.DetailsForSections.length; i++) {
                  var DetailsForSections = JSON.stringify(objn.DetailsForSections);

                  var test= JSON.parse(DetailsForSections);

                  $("#section").append(test[i].SectionName+": <span style=font-weight:bold;color:black;>"+test[i].SectionPassMark
                  +"/"+test[i].SectionQuestions+"</span><br>");

              }
              $(".otatitlefordiv").empty();
              $(".otatitlefordiv").append(objn.OtaTitle);

              $("#OtaGuidlineDiv").html(objn.OtaGuideline);
              //$("#ptimermg").empty();
                  $("#clockdiv").empty();
          }
          else{
              msgTitle = resources.assessmentHead;
              msgBtnValue = resources.btnOk;
              msgStr = resources.generalFunctionError;
              navigator.notification.confirm(msgStr, function() {
                  goToPage("#coursepage");
              }, msgTitle, msgBtnValue);
          }
      }


    }

}



/*$(document).on("pagecreate", "#OtaQuestionPage", function(event) {
  try {
    coController.coCheckNetworkAvaliable(false, function(retval) {
      if (networkAvailable === true) {
        //alert("online");
        getOtaQuestions(false, "1631","489", OtaQuestionDisplay);
      } else {
        //alert("offline");
      }
    });

  } catch (e) {
      errorHandler("OtaQuestionPage.pagecreate", e);
  }
});*/

function time_remaining(endtime){
    //console.log(endtime);
    var t = Date.parse(endtime) - Date.parse(new Date());
    var persulatimeTR = window.localStorage.getItem("OtaPersualTime");
    if(persulatimeTR=="0"){
        seconds = "0";
        minutes = "0";
        hours = "00";
        days = Math.floor( t/(1000*60*60*24) );
    }
    else{
        seconds = Math.floor( (t/1000) % 60 );
        minutes = Math.floor( (t/1000/60) % 60 );
        hours = Math.floor( (t/(1000*60*60)) % 24 );
        days = Math.floor( t/(1000*60*60*24) );
    }
    if(minutes<10){
      minutes="0"+minutes;
    }
    if(seconds<10){
      seconds="0"+seconds;
    }
    //alert(minutes+" "+seconds);
    if(minutes!="00" && seconds!="00" ){
      //alert("if");
      $("#OTARadioFrom").off("click");
      $("#OTARadioFrom").on("click", function(event) {
        msgTitle = resources.assessmentHead;
        msgBtnValue = resources.btnOk;
        //msgStr = 'No More Questions in this OTA!';
        msgStr = resources.tapInPersualTime;
        navigator.notification.confirm(msgStr,function() { console.log("if= "+ minutes+" second= "+ seconds)}, msgTitle, msgBtnValue);
      });
        //alert("hi");
      $(".OTARadio").attr('disabled', true);
    }
    else if(minutes=="00" && seconds!="00"){
        //alert("else if");
        //alert("else= "+ minutes+" second= "+ seconds);
        $("#OTARadioFrom").off("click");
        $("#OTARadioFrom").on("click", function(event) {
          if(seconds == "00"){

          }
          else{
            msgTitle = resources.assessmentHead;
            msgBtnValue = resources.btnOk;
            //msgStr = 'No More Questions in this OTA!';
            msgStr = resources.tapInPersualTime;
            navigator.notification.confirm(msgStr,function() { console.log("else= "+ minutes+" second= "+ seconds)}, msgTitle, msgBtnValue);
          }

        });
        //alert("else if")
        $(".OTARadio").attr('disabled', true);
    }


    else if(minutes=="00" && seconds=="00"){
      //alert("else");
      $(".OTARadio").attr('disabled', false);
    }


    return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}

var deadlinenew;
var stuResTime = 0;
//var OtaAssessmentTimeOTA ='1';

function run_clock(id,endtime){
  //var persulatime = '0';
  var persulatime = window.localStorage.getItem("OtaPersualTime");
  $("#ptimermg").empty();
  if(persulatime == 0){

  }
  else{
    $("#ptimermg").append(resources.persualTimeRms);
  }


    var OtaAssessmentTimeOTA = window.localStorage.getItem("OtaAssessmentTime");
    //console.log(OtaAssessmentTimeOTA);
    //console.log(id+" "+endtime);
    var clock = document.getElementById(id);
    function update_clock(){
      //console.log("hi");
      var t = time_remaining(endtime);


      if(persulatime== 0){

      }
      else{
        clock.innerHTML = t.minutes+':'+t.seconds;
      }


      if(t.total==0){
        //console.log("set 0");
        //alert('finisher ' + OtaAssessmentTimeOTA);
        var OtaAssessmentTimeOTAProBar = OtaAssessmentTimeOTA * 60;
        //$("#progressBar").find('div').css("width","0%");
        clearInterval(tts);
        progress(0, OtaAssessmentTimeOTAProBar, $('#progressBar'));
        var current_time = Date.parse(new Date());
        deadlinenew = new Date(current_time + OtaAssessmentTimeOTA*60*1000);
        //console.log(deadlinenew);


        $("#ptimermg").empty();
        $("#ptimermg").append(resources.exmTimeRms);
        if(persulatime == "0"){
        }else{
            msgTitle = resources.assessmentHead;
            msgBtnValue = resources.btnOk;
            msgStr = resources.StartOTA;
            navigator.notification.confirm(msgStr,function() { console.log("done")}, msgTitle, msgBtnValue);
        }

        $("#finishClick").css("display","block");
        //var OTASectionIDs = window.localStorage.getItem("OTASectionIDs");
        //var OtaIdForQuestions = window.localStorage.getItem("OTAId");
        //console.log(OtaIdForQuestions+" "+activeModule.assessmentscheduleid+" "+0+" "+OTASectionIDs);

        //OTAStartEndWSCall(OtaIdForQuestions,activeModule.assessmentscheduleid,0,OTASectionIDs);

        clearInterval(timeinterval);

            timerIntervalAssement = setInterval(function() {

              var now = new Date().getTime();

              var distance = deadlinenew - now;

              var daysAss = Math.floor(distance / (1000 * 60 * 60 * 24));
              var hoursAss = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              var minutesAss = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              var secondsAss = Math.floor((distance % (1000 * 60)) / 1000);

              /*document.getElementById(id).innerHTML = days + "d " + hours + "h "
              + minutes + "m " + seconds + "s ";*/
                if(hoursAss<10){
                  hoursAss="0"+hoursAss;
                }

                if(minutesAss<10){
                  minutesAss="0"+minutesAss;
                }
                if(secondsAss<10){
                  secondsAss="0"+secondsAss;
                }

              //document.getElementById(id).innerHTM = resources.exmTimeRms;
              document.getElementById(id).innerHTML = hoursAss + "h:"
              + minutesAss + "m:" + secondsAss + "s";

              if ((hoursAss == 0 || hoursAss == 00)  && (minutesAss == 0 || minutesAss == 00) && (secondsAss == 0 || secondsAss == 00)) {
                $("#clockdiv").empty();
                //msgTitle = "OTA";
                //msgBtnValue = resources.btnOk;
                //msgStr = 'Now You Can Answer the Questions';
                //msgStr = resources.exmTimeOver;
                //navigator.notification.confirm(msgStr,function() { displayScore();}, msgTitle, msgBtnValue);
                //$("#supportfooter1").hide();
                clearInterval(timerIntervalAssement);
                $("#OtaQuestionPage").append(mloadingGif);
                displayScore();
                //document.getElementById(id).innerHTML = "EXPIRED";
              }
            }, 1000);
      }
    }
    update_clock(); // run function once at first to avoid delay
    if (timeinterval) clearInterval(timeinterval);
    timeinterval = setInterval(update_clock,1000);
}


var ates = new Array();
var i;
var j=0;
var questions;
var objdata;
var lendata, OtaWorksheetJSON;
var lendataNew;
var seconds,minutes,hours,days;

$(".myButton").click(function () {

    // Set the effect type
    var effect = 'slide';

    // Set the options for the effect type chosen
    var options = { direction: "left" };

    // Set the duration (default: 400 milliseconds)
    var duration = 500;

    $('#ptimere').toggle(effect, options, duration);

    setTimeout(function() { $(".myButton2").css("display","block"); }, 500)


});



var hidebar;
$("#hideTimer").click(function(e){
    e.stopPropagation();
    //$("#progressBar").css("margin-top","-28px");

    $("#progressBar2").animate({ marginTop: "-48px" }, 500);
    //$("#progressBar").animate({ marginTop: "-28px" }, 500);
    //clearInterval(hidebar);
});

$("#showHideTimer").click(function(e){
    e.stopPropagation();
    $("#progressBar2").animate({ marginTop: "-93px" }, 500);
});

$("#progressBar2").click(function(){
    $("#progressBar").animate({ marginTop: "-1px" }, 500);
    hidebar = setTimeout(function() {
        //alert("in");
        $("#progressBar").animate({ marginTop: "-32px" }, 500);
        clearInterval(hidebar);
    }, 6000);
});

$("#progressBar").click(function(){
    $("#progressBar").animate({ marginTop: "-1px" }, 500);

    hidebar = setTimeout(function() {
        //alert("in");
        $("#progressBar").animate({ marginTop: "-32px" }, 500);
        clearInterval(hidebar);
    }, 6000);
});

$(".myButton2").click(function () {
    $(".myButton2").css("display","none");
    // Set the effect type
    var effect = 'slide';

    // Set the options for the effect type chosen
    var options = { direction: "left" };

    // Set the duration (default: 400 milliseconds)
    var duration = 500;

    $('#ptimere').toggle(effect, options, duration);
});
var checkTureAnsArray = [];
var tts;
function progress(timeleft, timetotal, $element) {
    var progressBarWidth = (timeleft / timetotal) * 100 ;
    progressBarWidth = progressBarWidth.toString();
    $element.find('div').animate({ width: progressBarWidth +'%' }, 500).html();
    if(timeleft < timetotal) {
        tts = setTimeout(function() {
            progress(timeleft + 1, timetotal, $element);
        }, 1000);
    }
};

//var persulatime = '0';
var CheckForPassNotShowSCOS;
function OtaQuestionDisplay(data) {
     //alert("hi");
     CheckForPassNotShowSCOS = "False";
        var persulatime = window.localStorage.getItem("OtaPersualTime");
  $("#clockdiv").empty();
  //$("#ptimere").show();
  $("#supportfooter1").show();
  lendata = null;
  var OtaGuidlineData=data.getOtaWorksheetResult.Data;
  if(OtaGuidlineData != null && OtaGuidlineData != undefined){
    var OtaGuidlineFormatedDatanew =   OtaGuidlineData;
    var obj = OtaGuidlineFormatedDatanew;
    objdata =JSON.stringify(obj.OtaWorksheet);
    var objn = JSON.parse(objdata);






    var persulatimeProBar = persulatime * 60;
    //var persulatimeProBar = 1 * 60;
    progress(0, persulatimeProBar, $('#progressBar'));

    var time_in_minutes = persulatime;
    var current_time = Date.parse(new Date());
    var deadline = new Date(current_time + time_in_minutes*60*1000);
    run_clock('clockdiv',deadline);
    lendata=objn.OtaSectionsDetails;
    lendataNew = objn.OtaSectionsDetails;
    OtaWorksheetJSON = objn;
    i=lendata.length;
    //alert(i);
    ates =[];
    for (var i = 0; i < lendata.length; i++) {
      var otaqlen=lendata[i].OTAQuestion;
      checkTureAnsArray.push(0);
      ates.push(otaqlen);
    }
    questions= ates[0];

    quest(j);
  }
  else{
    msgTitle = resources.assessmentHead;
    msgBtnValue = resources.btnOk;
    msgStr = resources.generalFunctionError;
    navigator.notification.confirm(msgStr, function() {
       goToPage("#coursepage");
    }, msgTitle, msgBtnValue);
  }


  // body...
  //console.log(JSON.stringify(data));
  //var OtaGuidlineData=data.getOtaWorksheetResult.JsonResponse;

  //console.log(OtaGuidlineData)
  //$.toJSON(OtaGuidlineData);
  //var OtaGuidlineFormatedDatanew =   OtaGuidlineData.replace(/\\/g, '').replace(/\@/g, '');
  //console.log(OtaGuidlineFormatedDatanew)

  //console.log(OtaGuidlineFormatedDatanew);
  //navigator.notification.alert(OtaGuidlineFormatedDatanew);
  //console.log(OtaGuidlineFormatedDatanew);
  //var obj= JSON.parse(OtaGuidlineFormatedDatanew);

  //console.log(obj);

  //counter
  //var persulatime = '1';


  //console.log("hi = "+OtaAssessmentTimeOTA);
  //var OtaTitleforPage = window.localStorage.getItem("OtaTitle");
  //console.log(OtaTitleforPage);
  //$("#otatitlefordiv").append(OtaTitleforPage);
  //var persulatime=90;
  //alert(persulatime);








  //start clock function


    //till here




}
  var rightans = 0;
  var totoalquest = 0;
  var useransqu = 0;
  var questionCounter = 0; //Tracks question number
  var questionCounter1 = 0;
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //OTA div object
  var answeruser = [];
  var tstarray = [];
  var sectiontsarray = [];

  var answerusernew = [];
  var daysDifference,hoursDifference,minutesDifference,secondsDifference;
  $("#quiz").on("swiperight", function(e) {
    checkTureAns = 1;
    useransqu = useransqu - 1;
    if(questionCounter ==0 && j!=0){
    checkTureAns = 1;
            var prevQuestionInd = j - 1;
            if(typeof sectiontsarray[prevQuestionInd] == "undefined"){
            //console.log("if= "+sectiontsarray)
            selections=[];
            }
            else{
            selections=sectiontsarray[prevQuestionInd];
            //console.log("else= "+sectiontsarray)
            }

            j = prevQuestionInd;
            questionCounter = ates[j].length - 1;
            questions = ates[j];
            quest(j);
      /*answeruser=tstarray[tstarray.length - 1];
      selections=sectiontsarray[sectiontsarray.length - 1]

      answeruser.pop();
      j--;
      questionCounter=ates[j].length - 1;
      questions= ates[j];
      answerusernew.pop();


      displayNext();*/

      //console.log(selections);
      //sectiontsarray.pop();
      //tstarray.pop();
      //console.log(answeruser);
      //alert(j+" len= "+questions.length +" quesqua="+questionCounter);
      //console.log(questions);

    }
    else{
      if(questionCounter==0){

      }

      else{
        e.preventDefault();

        if(quiz.is(':animated')) {
          return false;
        }
        //choose();
        answeruser.pop();

        //console.log("pop "+selections);
        questionCounter--;
        displayNext();
        //selections.pop();
      }
    }
    //alert("quiz right");
  });

  $("#quiz").on("swipeleft", function(e) {

    var receiveDate = (new Date()).getTime();
    var difference  = receiveDate - stuResTime;

    daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24

    hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60

    minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60

    secondsDifference = Math.floor(difference/1000);

    if(hoursDifference<10){
        hoursDifference="0"+hoursDifference;
    }
    if(minutesDifference<10){
        minutesDifference="0"+minutesDifference;
    }
    if(secondsDifference<10){
        secondsDifference="0"+secondsDifference;
    }

    checkTureAns = 1;
    if( questionCounter ==  questions.length - 1){
      //console.log("next if");
      if(j == ates.length - 1 ){
        var testdata=$('input[name="OTAnswer"]:checked').val();


        if(testdata!=undefined){
            submitota(testdata);
        }
        else{

        }
        if(minutes!="00" && seconds !="00" ){
            msgTitle = resources.assessmentHead;
            msgBtnValue = resources.btnOk;
            //msgStr = 'No More Questions in this OTA!';
            msgStr = resources.nomreQsn;
            navigator.notification.confirm(msgStr,function() { console.log("done")}, msgTitle, msgBtnValue);
        }

        else if(minutes=="00" && seconds !="00" ){
            msgTitle = resources.assessmentHead;
            msgBtnValue = resources.btnOk;
            //msgStr = 'No More Questions in this OTA!';
            msgStr = resources.nomreQsn;
            navigator.notification.confirm(msgStr,function() { console.log("done")}, msgTitle, msgBtnValue);
        }

        else{
            var testdata=$('input[name="OTAnswer"]:checked').val();
            submitota(testdata);
            msgTitle = resources.assessmentHead;
            msgBtnValue = resources.btnYesNo;
            msgStr = resources.beforeSubmitOTA;
            navigator.notification.confirm(msgStr, actionBeforeOTAsub, msgTitle, msgBtnValue);

            function actionBeforeOTAsub(choice){
                if(choice==2){
                    //alert("no");
                }
                else{
                    msgTitle = resources.assessmentHead;
                    msgBtnValue = resources.btnYesNo;
                    //msgStr = "Do you want to submit OTA?";
                    msgStr = resources.sbmOTA;
                    navigator.notification.confirm(msgStr, actionOTAsub, msgTitle, msgBtnValue);
                }
            }
            //msgTitle = resources.assessmentHead;
            //msgBtnValue = resources.btnYesNo;
            //msgStr = "Do you want to submit OTA?";
            //msgStr = resources.sbmOTA;
            //navigator.notification.confirm(msgStr, actionOTAsub, msgTitle, msgBtnValue);
            function actionOTAsub(choice){
              //alert(choice);

              //alert(testdata);
              if(choice==1){
                //alert("no");
              }
              else{
                //navigator.notification.alert(JSON.stringify(questions));
                //alert("in");
                e.preventDefault();
                //alert("in");
                // Suspend click listener during fade animation

                if(minutes!="00" && seconds !="00" ){
                  //alert("if");
                  // if(quiz.is(':animated')) {
                  //   return false;
                  // }
                  // choose();
                  questionCounter++;
                  questionCounter1++;
                  //console.log(answeruser);
                  displayNext();
                  //choose();
                }

                else if(minutes=="00" && seconds !="00" ){
                    //alert("if");
                    // if(quiz.is(':animated')) {
                    //   return false;
                    // }
                    // choose();
                    questionCounter++;
                    questionCounter1++;
                    //console.log(answeruser);
                    displayNext();
                    //choose();
                }

                else{
                  if(quiz.is(':animated')) {
                    return false;
                  }
                  choose();
                  //alert(isNaN(selections[questionCounter])+"  qc= "+questionCounter);
                  // If no user selection, progress is stopped
                  if (isNaN(selections[questionCounter])) {
                    //alert("null");
                    msgTitle = resources.assessmentHead;
                    msgBtnValue = resources.btnYesNo;
                    //msgStr = "Do you want to select an answer?";
                    msgStr = resources.questionNotAnsweredOTA;
                    navigator.notification.confirm(msgStr, actionOTA, msgTitle, msgBtnValue);
                    function actionOTA(choice){
                      //alert(choice);

                      //alert(testdata);
                      if(choice==2){
                        var testdata=$('input[name="OTAnswer"]:checked').val();
                        submitota(testdata);
                        //console.log(questionCounter);
                        questionCounter++;
                        questionCounter1++;
                        displayNext();
                      }
                      else{

                      }
                    }
                    //navigator.notification.alert('Please make a selection!');
                  } else {
                    //alert(questionCounter +"  "+ questions.length)
                    //alert(j+"   "+ates.length);
                    questionCounter++;
                    questionCounter1++;
                    displayNext();
                  }
                }
              }
            }
        }
      }
      else{
        //console.log("next if else");
        //navigator.notification.alert(JSON.stringify(questions));
        //alert("in");
        e.preventDefault();
        //alert("in");
        // Suspend click listener during fade animation

        if(minutes!="00" && seconds !="00" ){
          choose();
          questionCounter++;
          questionCounter1++;
          displayNext();
        }

        else if(minutes=="00" && seconds !="00" ){
            choose();
            questionCounter++;
            questionCounter1++;
            displayNext();
        }

        else{
          if(quiz.is(':animated')) {
            return false;
          }
          choose();
          //alert(isNaN(selections[questionCounter])+"  qc= "+questionCounter);
          // If no user selection, progress is stopped
          if (isNaN(selections[questionCounter])) {
            //alert("null");
            msgTitle = resources.assessmentHead;
            msgBtnValue = resources.btnYesNo;
            //msgStr = "Do you want to select an answer?";
            msgStr = resources.questionNotAnsweredOTA;
            navigator.notification.confirm(msgStr, actionOTA, msgTitle, msgBtnValue);
            function actionOTA(choice){
              //alert(choice);

              //alert(testdata);
              if(choice==2){
                var testdata=$('input[name="OTAnswer"]:checked').val();
                submitota(testdata);
                //console.log(questionCounter);
                questionCounter++;
                questionCounter1++;
                displayNext();
              }
              else{

              }
            }
            //navigator.notification.alert('Please make a selection!');
          } else {
            //alert(questionCounter +"  "+ questions.length)
            //alert(j+"   "+ates.length);
            questionCounter++;
            questionCounter1++;
            displayNext();
          }
        }
      }
    }
    else{
      //console.log("next else");
      //navigator.notification.alert(JSON.stringify(questions));
        //alert("in");
        e.preventDefault();
        //alert("in");
        // Suspend click listener during fade animation

        if(minutes!="00" && seconds !="00" ){
          choose();
          questionCounter++;
          questionCounter1++;
          displayNext();
        }

        else if(minutes=="00" && seconds !="00" ){
            choose();
            questionCounter++;
            questionCounter1++;
            displayNext();
        }

        else{
          if(quiz.is(':animated')) {
            return false;
          }
          choose();
          //alert(isNaN(selections[questionCounter])+"  qc= "+questionCounter);
          // If no user selection, progress is stopped
          if (isNaN(selections[questionCounter])) {
            //alert("null");
            msgTitle = resources.assessmentHead;
            msgBtnValue = resources.btnYesNo;
            msgStr = resources.questionNotAnsweredOTA;
            //msgStr = "Do you want to select an answer?";
            navigator.notification.confirm(msgStr, actionOTA, msgTitle, msgBtnValue);
            function actionOTA(choice){
              //alert(choice);

              //alert(testdata);
              if(choice==2){
                var testdata=$('input[name="OTAnswer"]:checked').val();
                submitota(testdata);
                //console.log(questionCounter);
                questionCounter++;
                questionCounter1++;
                displayNext();
              }
              else{

              }
            }
            //navigator.notification.alert('Please make a selection!');
          } else {
            //alert(questionCounter +"  "+ questions.length)
            //alert(j+"   "+ates.length);
            questionCounter++;
            questionCounter1++;
            displayNext();
          }
        }
    }
    //alert("quiz left");
  });

  $('#next').on('click', function (e) {
  console.log(lendataNew);
    var receiveDate = (new Date()).getTime();
    var difference  = receiveDate - stuResTime;

    daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24;

    hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60;

    minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60;

    secondsDifference = Math.floor(difference/1000);

    if(hoursDifference<10){
        hoursDifference="0"+hoursDifference;
    }
    if(minutesDifference<10){
        minutesDifference="0"+minutesDifference;
    }
    if(secondsDifference<10){
        secondsDifference="0"+secondsDifference;
    }

    //console.log('difference = ' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ');

    checkTureAns = 1;

    if( questionCounter ==  questions.length - 1){
      //console.log("next if");
      if(j == ates.length - 1 ){
        var testdata=$('input[name="OTAnswer"]:checked').val();


        if(testdata!=undefined){
            submitota(testdata);
        }
        else{

        }
        if(minutes!="00" && seconds !="00" ){
            msgTitle = resources.assessmentHead;
            msgBtnValue = resources.btnOk;
            //msgStr = 'No More Questions in this OTA!';
            msgStr = resources.nomreQsn;
            navigator.notification.confirm(msgStr,function() { console.log("done")}, msgTitle, msgBtnValue);
        }

        else if(minutes=="00" && seconds !="00" ){
            msgTitle = resources.assessmentHead;
            msgBtnValue = resources.btnOk;
            //msgStr = 'No More Questions in this OTA!';
            msgStr = resources.nomreQsn;
            navigator.notification.confirm(msgStr,function() { console.log("done")}, msgTitle, msgBtnValue);
        }

          else{
            var testdata=$('input[name="OTAnswer"]:checked').val();
            submitota(testdata);
            msgTitle = resources.assessmentHead;
            msgBtnValue = resources.btnYesNo;
            msgStr = resources.beforeSubmitOTA;
            navigator.notification.confirm(msgStr, actionBeforeOTAsub, msgTitle, msgBtnValue);

            function actionBeforeOTAsub(choice){
                if(choice==2){
                    //alert("no");
                }
                else{
                    msgTitle = resources.assessmentHead;
                    msgBtnValue = resources.btnYesNo;
                    //msgStr = "Do you want to submit OTA?";
                    msgStr = resources.sbmOTA;
                    navigator.notification.confirm(msgStr, actionOTAsub, msgTitle, msgBtnValue);
                }
            }
            //msgTitle = resources.assessmentHead;
            //msgBtnValue = resources.btnYesNo;
            //msgStr = "Do you want to submit OTA?";
            //msgStr = resources.sbmOTA;
            //navigator.notification.confirm(msgStr, actionOTAsub, msgTitle, msgBtnValue);
            function actionOTAsub(choice){
              //alert(choice);

              //alert(testdata);
              if(choice==1){
                //alert("no");
              }
              else{
                //navigator.notification.alert(JSON.stringify(questions));
                //alert("in");
                e.preventDefault();
                //alert("in");
                // Suspend click listener during fade animation

                if(minutes!="00" && seconds !="00" ){
                  //alert("if");
                  // if(quiz.is(':animated')) {
                  //   return false;
                  // }
                  // choose();
                  questionCounter++;
                  questionCounter1++;
                  //console.log(answeruser);
                  displayNext();
                  //choose();
                }

                else if(minutes=="00" && seconds !="00" ){
                    //alert("if");
                    // if(quiz.is(':animated')) {
                    //   return false;
                    // }
                    // choose();
                    questionCounter++;
                    questionCounter1++;
                    //console.log(answeruser);
                    displayNext();
                    //choose();
                }

                else{
                  if(quiz.is(':animated')) {
                    return false;
                  }
                  choose();
                  //alert(isNaN(selections[questionCounter])+"  qc= "+questionCounter);
                  // If no user selection, progress is stopped
                  if (isNaN(selections[questionCounter])) {
                    //alert("null");
                    msgTitle = resources.assessmentHead;
                    msgBtnValue = resources.btnYesNo;
                    //msgStr = "Do you want to select an answer?";
                    msgStr = resources.questionNotAnsweredOTA;
                    navigator.notification.confirm(msgStr, actionOTA, msgTitle, msgBtnValue);
                    function actionOTA(choice){
                      //alert(choice);

                      //alert(testdata);
                      if(choice==2){
                        var testdata=$('input[name="OTAnswer"]:checked').val();
                        submitota(testdata);
                        //console.log(questionCounter);
                        questionCounter++;
                        questionCounter1++;
                        displayNext();
                      }
                      else{

                      }
                    }
                    //navigator.notification.alert('Please make a selection!');
                  } else {
                    //alert(questionCounter +"  "+ questions.length)
                    //alert(j+"   "+ates.length);
                    questionCounter++;
                    questionCounter1++;
                    displayNext();
                  }
                }
              }
            }
          }
      }
      else{
        //alert(checkTureAns);
        //console.log("next if else");
        //navigator.notification.alert(JSON.stringify(questions));
        //alert("in");
        e.preventDefault();
        //alert("in");
        // Suspend click listener during fade animation

        if(minutes!="00" && seconds !="00" ){
          choose();
          questionCounter++;
          questionCounter1++;
          displayNext();
        }

        else if(minutes=="00" && seconds !="00" ){
            choose();
            questionCounter++;
            questionCounter1++;
            displayNext();
        }

        else{
          if(quiz.is(':animated')) {
            return false;
          }
          choose();
          //alert(isNaN(selections[questionCounter])+"  qc= "+questionCounter);
          // If no user selection, progress is stopped
          if (isNaN(selections[questionCounter])) {
            //alert("null");
            msgTitle = resources.assessmentHead;
            msgBtnValue = resources.btnYesNo;
            //msgStr = "Do you want to select an answer?";
            msgStr = resources.questionNotAnsweredOTA;
            navigator.notification.confirm(msgStr, actionOTA, msgTitle, msgBtnValue);
            function actionOTA(choice){
              //alert(choice);

              //alert(testdata);
              if(choice==2){
                var testdata=$('input[name="OTAnswer"]:checked').val();
                submitota(testdata);
                //console.log(questionCounter);
                questionCounter++;
                questionCounter1++;
                displayNext();
              }
              else{

              }
            }
            //navigator.notification.alert('Please make a selection!');
          } else {
            //alert(questionCounter +"  "+ questions.length)
            //alert(j+"   "+ates.length);
            questionCounter++;
            questionCounter1++;
            displayNext();
          }
        }
      }
    }
    else{
      //console.log("next else");
      //navigator.notification.alert(JSON.stringify(questions));
        //alert("in");
        e.preventDefault();
        //alert("in");
        // Suspend click listener during fade animation

        if(minutes!="00" && seconds !="00" ){
          choose();
          questionCounter++;
          questionCounter1++;
          displayNext();
        }

        else if(minutes=="00" && seconds !="00" ){
            choose();
            questionCounter++;
            questionCounter1++;
            displayNext();
        }

        else{
          if(quiz.is(':animated')) {
            return false;
          }
          choose();
          //alert(isNaN(selections[questionCounter])+"  qc= "+questionCounter);
          // If no user selection, progress is stopped
          if (isNaN(selections[questionCounter])) {
            //alert("null");
            msgTitle = resources.assessmentHead;
            msgBtnValue = resources.btnYesNo;
            msgStr = resources.questionNotAnsweredOTA;
            //msgStr = "Do you want to select an answer?";
            navigator.notification.confirm(msgStr, actionOTA, msgTitle, msgBtnValue);
            function actionOTA(choice){
              //alert(choice);

              //alert(testdata);
              if(choice==2){
                var testdata=$('input[name="OTAnswer"]:checked').val();
                submitota(testdata);
                //console.log(questionCounter);
                questionCounter++;
                questionCounter1++;
                displayNext();
              }
              else{

              }
            }
            //navigator.notification.alert('Please make a selection!');
          } else {
            //alert(questionCounter +"  "+ questions.length)
            //alert(j+"   "+ates.length);
            questionCounter++;
            questionCounter1++;
            displayNext();
          }
        }
    }

  });

  $('#prev').on('click', function (e) {
    checkTureAns = 1;
    //alert(questionCounter);
    //alert(j+" len= "+questions.length +" quesqua="+questionCounter);
    //console.log(sectiontsarray);
    useransqu = useransqu - 1;
    if(questionCounter ==0 && j!=0){
        checkTureAns = 1;
                var prevQuestionInd = j - 1;
                if(typeof sectiontsarray[prevQuestionInd] == "undefined"){
                //console.log("if= "+sectiontsarray)
                selections=[];
                }
                else{
                selections=sectiontsarray[prevQuestionInd];
                //console.log("else= "+sectiontsarray)
                }

                j = prevQuestionInd;
                questionCounter = ates[j].length - 1;
                questions = ates[j];
                quest(j);
      /*answeruser=tstarray[tstarray.length - 1];
      selections=sectiontsarray[sectiontsarray.length - 1]

      answeruser.pop();
      j--;
      questionCounter=ates[j].length - 1;
      questions= ates[j];
      answerusernew.pop();


      displayNext();*/

      //console.log(selections);
      //sectiontsarray.pop();
      //tstarray.pop();
      //console.log(answeruser);
      //alert(j+" len= "+questions.length +" quesqua="+questionCounter);
      //console.log(questions);

    }
    else{
      if(questionCounter==0){

      }

      else{
        e.preventDefault();

        if(quiz.is(':animated')) {
          return false;
        }
        //choose();
        answeruser.pop();

        //console.log("pop "+selections);
        questionCounter--;
        displayNext();
        //selections.pop();
      }
    }


  });


  function displayNext() {

      if(questionCounter < questions.length){
        quiz.fadeOut(30,function() {
            $('#question').remove();
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn(30);
                if (!(isNaN(selections[questionCounter]))) {
                  $('input[value='+selections[questionCounter]+']').prop('checked', true);
                }

                // Controls display of 'prev' button
                if(questionCounter === 1){
                  $('#prev').show();
                } else if(questionCounter === 0){
                  $('#prev').show();
                  $('#next').show();
                }
        });

      }else {
        //alert("else");
        if(j<ates.length - 1){
          //alert("if");
          j++;
          questionCounter=0;
          selections = [];
          questions= ates[j];
          quest(j);
        }
        else{
          //alert(questionCounter1);
          $("#OtaQuestionPage").append(mloadingGif);
          var scoreElem = displayScore();
        }
      }

  }

  function createQuestionElement(index) {
    stuResTime = (new Date()).getTime();
    var qElement = $('<div>', {
      id: 'question',
      class: 'ui-field-contain',
      style : 'margin:0px'
    });

    var sectionno = parseInt(j) + 1;
    var ques1 =index + 1;
    var ttitle = '<div class=worksheettitle style="font-size:1em !important;padding: 10px 0px 0px 10px;background-color: #e9e9e9 !important;text-align: left !important;">'+resources.sectionOTA+' <b>'+ sectionno +'</b>'+resources.of+' <b>' + ates.length +'</b></div>';
    qElement.append(ttitle);

    var sectionlist= createsectionlist(sectionno,index);
    qElement.append('<div style="width:100%;background: #e9e9e9;"><ul class="art-vmenu" style="margin:0px;background-color: #e9e9e9;padding: 0px 0px 0px 10px;width:60%;">'+sectionlist+'</ul></div>');

    var questtitle='<div class=worksheettitle style="background-color: #e9e9e9;padding: 20px 0px 0px 10px;font-size: 1em !important;text-align: left !important;">'+resources.question+' <b>' + ques1+ '</b>'+resources.of+' <b>' + ates[j].length + '</b></div>'
    qElement.append(questtitle);

    var queslist= createQuestionlist(ques1,ates[j].length);
    qElement.append('<ul style="margin:0px;background-color: #e9e9e9;padding: 0px 0px 0px 10px;height: auto;">'+queslist+'</ul>');

    var question = $('<p class=wslegend style=text-align:left;margin-top:0px;>').append(ques1+". "+questions[index].OtaQuestion);
    qElement.append(question);



    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;

  }

  var checkTureAns = 1;
  function createsectionlist(sectionno,index){
    var slist='';
    var idforli;
    //alert(lendataNew.length);
    var itemnew;

   //alert(lendataNew[j].OTAQuestion.length);

    for(var jk=0;jk<lendataNew[j].OTAQuestion.length;jk++){
      if(lendataNew[j].OTAQuestion[jk].Is_UserAnswerd == "True"){
        checkTureAns++;
        //console.log(checkTureAns);
        //alert(jk);
      }

    }

    if(lendataNew[j].OTAQuestion.length == checkTureAns){
      //console.log(checkTureAnsArray[j]);
      if(checkTureAnsArray[j]==null || checkTureAnsArray[j]==0){
        //checkTureAnsArray.push(checkTureAns);
        checkTureAnsArray[j] = checkTureAns;
      }
      else{

      }

    }
    //console.log(checkTureAnsArray);

    //console.log(lendataNew[j].OTAQuestion.length + "  "+ checkTureAns );

    //$("#8").removeClass("list-Full-Square").addClass("list-Full-Square-green");
    for(var jd=0;jd<ates.length;jd++){
      idforli= jd;
      //alert(jd)
      //alert(idforli)
      if(jd == sectionno - 1){

        slist += '<li onClick="sectionLiClick(this.id)" id='+ idforli + '  class="list-Full-Square"></li>';
      }
      else{
        //slist += '<li onClick="sectionLiClick(this.id)" id='+ idforli +'  class="list-Halo-Square-red">'+lendataNew[idforli].OTAQuestion.length+'</li>';

        if(checkTureAnsArray[jd] == lendataNew[jd].OTAQuestion.length){
          slist += '<li onClick="sectionLiClick(this.id)" id='+ idforli +'  class="list-Full-Square-green"></li>';
          //slist += '<li onClick="sectionLiClick(this.id)" id='+ idforli +'  class="list-Halo-Square-red"></li>';
        }
        else{
          slist += '<li onClick="sectionLiClick(this.id)" id='+ idforli +'  class="list-Halo-Square-red"></li>';
        }

      }

    }
    checkTureAns = 1;
    return slist;
  }

function sectionLiClick(ele){
  checkTureAns = 1;
  /*console.log(checkTureAnsArray[j]);
  if(checkTureAnsArray[j]==null || checkTureAnsArray[j]==0 || typeof checkTureAnsArray[j] == 'undefined' ){

    if(checkTureAnsArray[j] >= 0 ){

    }
    else{
      checkTureAnsArray.push(0);
    }
  }
  else{

  }*/


  /*console.log(ele);
  console.log(lendataNew[ele]);
  for(var m = 0; m<lendataNew[ele].OTAQuestion.length; m++ ){
   console.log(lendataNew[ele].OTAQuestion[m].Is_UserAnswerd );

    if(lendataNew[ele].OTAQuestion[m].Is_UserAnswerd == "True"){
      UperUl = UperUl + 1;
    }
    else{

    }
    console.log(UperUl);
  }*/
  if(typeof sectiontsarray[ele] == "undefined"){
    //console.log("if= "+sectiontsarray)
    selections=[];
  }
  else{
    selections=sectiontsarray[ele];
    //console.log("else= "+sectiontsarray)
  }

  j = ele;
  questionCounter = 0;
  questions = ates[j]
  quest(j);
  //alert($(this).attr("id"));
}


var rightansw = 0;
var rightclickansw = 0;
var totlaques=0;
function createQuestionlist(ques1,index){
  var slist='';
  var idforquesli;
  var itemnew;
  //console.log(j);
  //alert("create");
  //console.log(lendataNew[j].OTAQuestion[questionCounter].Is_UserAnswerd)
  //console.log(lendataNew[0].OTAQuestion.length)
  //console.log(lendataNew);
  for(var jk=0;jk<lendataNew[j].OTAQuestion.length;jk++){
    idforquesli = jk;
    //console.log(lendataNew[j].OTAQuestion[jk]);
    //console.log(lendataNew[j].OTAQuestion.length);
    if(jk == ques1 - 1){
      //console.log("if");
      slist += '<li onClick="sectionLiQuestClick(this.id)" id='+ idforquesli +' class="list-Full-Square"></li>';
    }
    else if(lendataNew[j].OTAQuestion[jk].Is_UserAnswerd =="True"){
      //rightansw++;
      //console.log("else");
      //console.log("else if  "+selections[j] );
      //alert(lendataNew[j].OTAQuestion[jk].Is_UserAnswerd.length);

      slist += '<li onClick="sectionLiQuestClick(this.id)" id='+ idforquesli +' class="list-Full-Square-green"></li>';
    }
    else if (lendataNew[j].OTAQuestion[jk].Is_UserAnswerd=="False"){
      //console.log("else if");
      slist += '<li onClick="sectionLiQuestClick(this.id)" id='+ idforquesli +' class="list-Halo-Square-red"></li>';
    }
    //slist += '<li class="list-Halo-Square-red"></li>';
  }
  return slist;
}


function sectionLiQuestClick(ele){
  checkTureAns = 1;
  questionCounter = parseInt(ele);
  quest(j);
  //var testdata1=$('input[name="OTAnswer"]:checked').val();
  //submitota(testdata1);
  //console.log(questions[questionCounter]);
  //alert($(this).attr("id"));
}


function createRadios(index) {

 //console.log(lendataNew[j].OTAQuestion[index]);
 //  console.log(index);

  /*for(var x = 0; x<lendataNew.length;x++){
    //console.log(lendataNew[x]);
    for(var t =0;t<lendataNew[x].OTAQuestion.length;t++){
      console.log(lendataNew[x].OTAQuestion[t]);
      for(var w=0;w<lendataNew[x].OTAQuestion[t].OTAOptions.length;w++){
        //console.log(lendataNew[x].OTAQuestion[t].OTAOptions[w]);
        if(lendataNew[x].OTAQuestion[t].OTAOptions[w].IsChecked == "True"){
          if(lendataNew[x].OTAQuestion[t].OTAOptions[w].IsCorrectAnswer == "True"){
            rightansw = rightansw + 1;
            console.log(rightansw);
          }
        }
      }
    }
  }*/
  var radioList = $('<form id="OTARadioFrom" style="padding-left:0.7em !important;margin-bottom: 120px;" class=ui-btn-icon-left>');
  var item;
  var input = '';
  for (var i = 0; i < questions[index].OTAOptions.length; i++) {
    item = $('<div style="padding:0.5em !important;" data-role=controlgroup data-theme=h>');
    var ans=questions[index].OTAOptions[i].OTAOptionName;
    var newans=ans.replace(/ /g,"_");
    if(lendataNew[j].OTAQuestion[index].OTAOptions[i].IsChecked=="True"){
      input = '<label ><input  class=OTARadio onchange="SaveSelection()"  type="radio" checked name="OTAnswer" value=' + i + ' >  '+lendataNew[j].OTAQuestion[index].OTAOptions[i].OTAOptionName+'</lable>';
    }
    else{
      input = '<label ><input  class=OTARadio onchange="SaveSelection()"  type="radio" name="OTAnswer" value=' + i + ' >  '+lendataNew[j].OTAQuestion[index].OTAOptions[i].OTAOptionName+'</lable>';
    }

    item.append(input);
    radioList.append(item);
  }
  return radioList;
}

function SaveSelection(){
    var receiveDate = (new Date()).getTime();
    var difference  = receiveDate - stuResTime;

    daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24;

    hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60;

    minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60;

    secondsDifference = Math.floor(difference/1000);

    if(hoursDifference<10){
        hoursDifference="0"+hoursDifference;
    }
    if(minutesDifference<10){
        minutesDifference="0"+minutesDifference;
    }
    if(secondsDifference<10){
        secondsDifference="0"+secondsDifference;
    }
    var curruntQuestionValue=$('input[name="OTAnswer"]:checked').val();
    if(curruntQuestionValue!=undefined){
        submitota(curruntQuestionValue);
    }
}

// Reads the user selection and pushes the value to an array
function choose() {

  selections[questionCounter] = +$('input[name="OTAnswer"]:checked').val();
  //alert(selections);
  var UserChachakedValue=$('input[name="OTAnswer"]:checked').val();
  if(typeof UserChachakedValue === "undefined"){
    //alert("undefined");
    if(minutes!="00" && seconds !="00" ){
      submitota(UserChachakedValue);
    }

    else{

    }

  }
  else{
    //function call for save user answer
    submitota(UserChachakedValue);
  }

}


function submitota(testdata){
  //alert(testdata);
  //console.log(questionCounter);
  //alert(questions[questionCounter].OTAOptions[testdata]);


  //console.log(lendataNew[j].OTAQuestion[questionCounter]);


  var optionvalue;
  var otaqid;
  if(typeof testdata === "undefined")
  {
    //alert("if");
    optionvalue="";
    otaqid='{IsChecked":"False"}';
  }
  else{
    //alert("else");
    optionvalue=questions[questionCounter].OTAOptions[testdata].OTAOptionName;
    otaqid={"OTAQuestionOptionID":'+questions[questionCounter].OTAOptions[testdata].OTAQuestionOptionID+',"IsChecked":"True"};
  }
  var items= "["+JSON.stringify(questions[questionCounter])+"]";
  //console.log(items)
  var itemn= JSON.parse(items);


  var itemsnew = "["+JSON.stringify(lendataNew[j].OTAQuestion[questionCounter])+"]";
  var itemnew = JSON.parse(itemsnew);

  var newItem = {"OtaQuestionId":questions[questionCounter].OtaQuestionId,
                "UserAnswer_OptionName":optionvalue,
                "OTAOptions":otaqid
                };
  var ansiscorrect;


  for(var ChngFlase = 0;ChngFlase < lendataNew[j].OTAQuestion[questionCounter].OTAOptions.length; ChngFlase++){
       lendataNew[j].OTAQuestion[questionCounter].OTAOptions[ChngFlase].IsChecked = "False";
  }


  lendataNew.forEach(function(item) {
    if (newItem.OtaQuestionId === lendataNew[j].OTAQuestion[questionCounter].OtaQuestionId) {
      if(typeof testdata == "undefined"){
        ansiscorrect="False";

      }
      else{
        ansiscorrect="True";
        useransqu = useransqu + 1;

        lendataNew[j].OTAQuestion[questionCounter].OTAOptions[testdata].IsChecked=newItem.OTAOptions.IsChecked;
        if(lendataNew[j].OTAQuestion[questionCounter].OTAOptions[testdata].IsCorrectAnswer=="True"){
          //rightansw = rightansw + 1;
          //totoalquest = totoalquest + 1;
        }
        else{
          //totoalquest = totoalquest + 1;
        }

        /*if (item.OTACorrectAnswer == questions[questionCounter].OTAOptions[testdata].OTAOptionName){
          //alert("true");
          ansiscorrect="True"
        }
        else{
          ansiscorrect="False"
        }*/
      }


      lendataNew[j].OTAQuestion[questionCounter].UserAnswer_OptionName = newItem.UserAnswer_OptionName;
      lendataNew[j].OTAQuestion[questionCounter].OtaResponseTime = minutesDifference+":"+secondsDifference;
      //item.Is_UserAnswerd = newItem.Is_UserAnswerd;
      //alert(item.OTAOptions[testdata]);
      lendataNew[j].OTAQuestion[questionCounter].Is_UserAnswerd = ansiscorrect;
      /*if(item.OTAOptions[testdata]==="undefined"){
        alert("if");
        item.OTAOptions[testdata].IsChecked=newItem.OTAOptions.IsChecked  ;
      }
      else{
        alert("else");

      }*/

      //delete item.OTAOptions; for showing all options that question have
      //item.OTAOptions=[];
    }
  });

  //console.log(itemnew);
  //console.log(rightansw)
  //console.log(lendataNew);



/*
  var answerrbyuser=JSON.stringify(itemn);
  var removebrac= answerrbyuser.substring(1, answerrbyuser.length-1);

  answeruser.push(removebrac);

  var unique = answeruser.filter(function(elem, index, self) {
    return index === self.indexOf(elem);
  });*/

  //console.log(unique);

  /*var newansweruser = [];
  for(var k =0;k<answeruser.length;k++){
    var testt2= JSON.parse(removebrac);
    var testt= JSON.parse(answeruser[k]);
    console.log(testt.OtaQuestionId  +" ts= "+testt2.OtaQuestionId);

    if(testt.OtaQuestionId == testt2.OtaQuestionId){
      //console.log("if");

    }
    else{
      //console.log("else");
      newansweruser.push(testt);
    }
    //if(testt.OtaQuestionId)
  }

  console.log(newansweruser);*/



  //console.log("useransqu= "+useransqu);
  //alert(answeruser);
  //alert(questionCounter +" questlen= "+ questions.length);


 /* var newquestlen = questions.length - 1;

  if(questionCounter == newquestlen){
    //console.log("bottom if");
    tstarray.push(answeruser);
    sectiontsarray.push(selections);
    //alert(tstarray.length+"  "+j);
    //console.log(sectiontsarray);
    answeruser=[];
    //SaveOTAResponse(tstarray)
  }
  else{
    //console.log("bottom else");
  }
  */
  //console.log(answeruser);


}
var finfaland;
function SaveOTAResponse(datastore)
  {
    answerusernew.push('{"OtaSectionId":"'+lendata[j].OtaSectionId
      +'","AwardingBodyID":"'+lendata[j].AwardingBodyID
      +'","OtaSectionTitle":"'+lendata[j].OtaSectionTitle
      +'","OTASectionQuestions":"'+lendata[j].OTASectionQuestions
      +'","OTASectionPassMark":"'+lendata[j].OTASectionPassMark
      +'","OTAStudentExamSectionID":"'+lendata[j].OTAStudentExamSectionID
      +'","OTAQuestion":['+datastore+']}');
    //console.log(answerusernew)
    tstarray=[];
    //console.log(tstarray);
  }
  // Displays next requested element
  //var quescount = -1;

   /*     $("#headercourseiconlhsnew").on("click", function(event) {
                                     event.preventDefault();
                                     event.stopPropagation();
                                     showMenu=true;
                                     if (menubtnOk===true) {
                                     if (menuGroupScroller != undefined) {
                                     setPagePadderDiv("menuGroupScroller", false);
                                     }
                                     changeMenu("groups");
                                     }
                                     });*/


  // Computes score and returns a paragraph element to be displayed

  function finishClick(){
       // questionCounter++;
         //                   questionCounter1++;
        var curruntQuestionValue=$('input[name="OTAnswer"]:checked').val();


        if(curruntQuestionValue!=undefined){
            submitota(curruntQuestionValue);
        }
        else{

        }
      msgTitle = resources.assessmentHead;
      msgBtnValue = resources.btnYesNo;
      msgStr = resources.beforeSubmitOTA;
      navigator.notification.confirm(msgStr, actionBeforeOTAsubFinish, msgTitle, msgBtnValue);

      function actionBeforeOTAsubFinish(choice){
          if(choice==2){
              //alert("no");
             // questionCounter--;
               //                   questionCounter1--;
          }
          else{
              msgTitle = resources.assessmentHead;
              msgBtnValue = resources.btnYesNo;
              //msgStr = "Do you want to submit OTA?";
              msgStr = resources.sbmOTA;
              navigator.notification.confirm(msgStr, finishOTA, msgTitle, msgBtnValue);
          }
      }
      function finishOTA(choice){
          if(choice==1){
              //alert("no");
             // questionCounter--;
               //                   questionCounter1--;
          }
          else{
//              $("#quiz").hide();
//              $("#supportfooter1").hide();
//              $(".myButton2").hide();
//              $('#next').hide();
//              $('#prev').hide();
//              $('#start').show();
              $("#OtaQuestionPage").append(mloadingGif);
              displayScore();
          }
      }
    }

  var failedSaveOTA = 0;
  function displayScore() {
    //alert(failedSaveOTA);
    //$("#quiz").hide();
    var TotalQuestionsLength= answeruser.length;
    //console.log(rightans +" from "+lendss);

    //var score = $('<p>',{id: 'question'});

    /*var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      //alert(selections[i]+" "+questions[i].OTACorrectAnswer)
      var ans=questions[i].OTACorrectAnswer;
      //alert(ans);
      var newans=ans.replace(/ /g,"_");
      if (selections[i] == newans) {
        numCorrect++;
      }
    }*/
    for(i=0;i<=tstarray.length-1;i++){
      answerusernew.push('{"OtaSectionId":"'+lendata[i].OtaSectionId
      +'","AwardingBodyID":"'+lendata[i].AwardingBodyID
      +'","OtaSectionTitle":"'+lendata[i].OtaSectionTitle
      +'","OTASectionQuestions":"'+lendata[i].OTASectionQuestions
      +'","OTASectionPassMark":"'+lendata[i].OTASectionPassMark
      +'","OTAStudentExamSectionID":"'+lendata[i].OTAStudentExamSectionID
      +'","OTAQuestion":['+tstarray[i]+']}');
    }

    finfaland ='{"?xml": {"version": "1.0","encoding": "utf-16"},"OtaWorksheet": {"OTAStudentExamID":"'+OtaWorksheetJSON.OTAStudentExamID+'","TotalAnsweredOTAQue": "'+rightclickansw+'","Status": null,"OtaSectionsDetails": '+JSON.stringify(lendataNew)+'}}';
    saveOTA(false, finfaland,IsLiveOTA,activeModule.basemoduleid, function(ret) {
        $("#mloader").remove();
        var ReturnSuceess = ret;

        if(ReturnSuceess.IsAllOtaWorksheetAnswersSavedResult == true || ReturnSuceess.IsAllOtaWorksheetAnswersSavedResult == "true"){
            $("#quiz").hide();
                    $('#question').remove();
                      $("#supportfooter1").hide();
                      $(".myButton2").hide();
                      $('#next').hide();
                      $('#prev').hide();
                      $('#start').show();
            var checkSecPassMarks = 0;
            var checkSecPassMarksarray = [];
            for(var x = 0; x<lendataNew.length;x++){
              //console.log(lendataNew[x]);
              //console.log(lendataNew[x].OTAQuestion.length);
              //alert(lendataNew[x].OTASectionPassMark);
              for(var t =0;t<lendataNew[x].OTAQuestion.length;t++){
                totlaques = totlaques + 1 ;
                //console.log(totlaques)
                //totlaques = totlaques + lendataNew[x].OTAQuestion.lengths;
                //console.log(totlaques);
                for(var w=0;w<lendataNew[x].OTAQuestion[t].OTAOptions.length;w++){
                  //console.log(lendataNew[x].OTAQuestion[t].OTAOptions[w]);
                  if(lendataNew[x].OTAQuestion[t].OTAOptions[w].IsChecked == "True"){
                    rightclickansw = rightclickansw + 1;
                    //console.log(rightansw);
                    if(lendataNew[x].OTAQuestion[t].OTAOptions[w].IsCorrectAnswer == "True"){
                      rightansw = rightansw + 1;
                      checkSecPassMarks = checkSecPassMarks + 1;
                      //alert(rightansw);
                    }
                    else{
                      checkSecPassMarks = checkSecPassMarks;
                    }
                  }
                }
              }
              //alert("outer= "+checkSecPassMarks);
              checkSecPassMarksarray.push(checkSecPassMarks);
              //console.log(checkSecPassMarksarray);
              checkSecPassMarks = 0;
            }



            var OverAllMarksCheckResult = window.localStorage.getItem("OverAllMarks");
            var statusofPass = 0;
            //console.log(OverAllMarksCheckResult);

            for(var x = 0; x<lendataNew.length;x++){
              if(lendataNew[x].OTASectionPassMark <= checkSecPassMarksarray[x]){
                //alert("pass");
              }
              else{
                statusofPass = 1;
                //alert("fail");
              }
            }

            if(OverAllMarksCheckResult <= rightansw){

              if(statusofPass == 0){
                msgTitle = resources.assessmentresultsOTA;
                msgBtnValue = resources.btnOk;
                /*msgStr = 'You achieved ' + rightansw + ' right out of ' +
                            totlaques + ' questions!!!';*/
                var SecWithMarks = "";

                /*for(var x = 0; x<lendataNew.length;x++){

                    SecWithMarks += "<br><span>"+lendataNew[x].OtaSectionTitle +":</span><br>     <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Required Marks :"+lendataNew[x].OTASectionPassMark+"/"+lendataNew[x].OTASectionQuestions+".</span> <br>    <span style=color:red>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You scored: "+ checkSecPassMarksarray[x]+"/"+lendataNew[x].OTASectionQuestions+"</span><br>";
                }
                var OverAllMarksFinal = window.localStorage.getItem("OverAllMarks");
                var OverallTotalQuestionsfinal = window.localStorage.getItem("OverallTotalQuestions");


                var OTAresultDiv = '<span><b>Assessment Results:</b></span><br>'+SecWithMarks+' <br><span>Overall Mark Required: '+OverAllMarksFinal+'/'+OverallTotalQuestionsfinal+'</span><br><span>You achieved:  <span style=color:red;>' + rightansw + '/'+ OverallTotalQuestionsfinal+'</span>. You have <span style=color:red;>passed</span> this assessment</span>';*/

                for(var x = 0; x<lendataNew.length;x++){
                    SecWithMarks += "<br><span><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+lendataNew[x].OtaSectionTitle +":</b></span><br>     <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+resources.OTARquiredMarks+" :<span style=color:red>"+lendataNew[x].OTASectionPassMark+"/"+lendataNew[x].OTASectionQuestions+"</span></span> <br>    <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+resources.OTAScored+": <span style=color:red>"+ checkSecPassMarksarray[x]+"/"+lendataNew[x].OTASectionQuestions+"</span></span><br>";
                    //SecWithMarks += "<br><span><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+lendataNew[x].OtaSectionTitle +":</b></span><br>     <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Required Marks :"+lendataNew[x].OTASectionPassMark+"/"+lendataNew[x].OTASectionQuestions+".</span> <br>    <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You scored: <span style=color:red>"+ checkSecPassMarksarray[x]+"/"+lendataNew[x].OTASectionQuestions+"</span></span><br>";
                }
                var OverAllMarksFinal = window.localStorage.getItem("OverAllMarks");
                var OverallTotalQuestionsfinal = window.localStorage.getItem("OverallTotalQuestions");

                var CheckUserResult = "";
                var OtaIdForQuestions = window.localStorage.getItem("OTAId");
                if(IsLiveOTA == 1){
                    CheckUserResult += '<span style=font-size:14px;>'+resources.OTALive+activeUser.userId+'-'+OtaWorksheetJSON.OTAStudentExamID+'</span><br>';
                }
                else{
                    CheckUserResult += '<span style=font-size:14px;>'+resources.OTAPractice+activeUser.userId+'-'+OtaWorksheetJSON.OTAStudentExamID+'</span><br>';
                }

                var OTAresultDiv = CheckUserResult+'<br><span style=font-size:21px;>'+resources.OTAAchieved+':<span style=color:red;>' + rightansw + '/'+ OverallTotalQuestionsfinal+'</span>.&nbsp;&nbsp;'+resources.OTAYou+' <span style=color:red;>'+resources.OTAPassed+'</span> '+resources.OTATheAssessment+'</span><br><br><span><b>'+resources.sections+':</b></span><br>'+SecWithMarks+' <br><br><span><b>'+resources.ovlpassmarks+' </b></span><span style=color:red;>'+OverAllMarksFinal+'/'+OverallTotalQuestionsfinal+'</span></span><br><span><b>'+resources.OTAAchieved+': </b></span><span style=color:red;>' + rightansw + '/'+ OverallTotalQuestionsfinal+'</span></span>';
                //var OTAresultDiv = '<span style=font-size:21px;>You achieved:<span style=color:red;>' + rightansw + '/'+ OverallTotalQuestionsfinal+'</span>.&nbsp;&nbsp;You have <span style=color:red;>passed</span> this assessment</span><br><br><span><b>Sections:</b></span><br>'+SecWithMarks+' <br><br><span><b>Overall Mark: </b></span><span style=color:red;>'+OverAllMarksFinal+'/'+OverallTotalQuestionsfinal+'</span></span><span>&nbsp;&nbsp;<b>You achieved: </b></span><span style=color:red;>' + rightansw + '/'+ OverallTotalQuestionsfinal+'</span></span>';

                /*for(var x = 0; x<lendataNew.length;x++){
                    //console.log(lendataNew[x].OtaSectionTitle+"   ----   "+ lendataNew[x].OTASectionPassMark +"    ----     "+ checkSecPassMarksarray[x]);
                    SecWithMarks += lendataNew[x].OtaSectionTitle +":\n     Required Marks :"+lendataNew[x].OTASectionPassMark+"/"+lendataNew[x].OTASectionQuestions+". \n     You scored: "+ checkSecPassMarksarray[x]+"/"+lendataNew[x].OTASectionQuestions+"\n";
                }
                var OverAllMarksFinal = window.localStorage.getItem("OverAllMarks");
                var OverallTotalQuestionsfinal = window.localStorage.getItem("OverallTotalQuestions");
                msgStr = 'Sections:\n'+SecWithMarks+' \nOverall Mark Required: '+OverAllMarksFinal+'/'+OverallTotalQuestionsfinal+'\nYou achieved: ' + rightansw + '/'+ totlaques+'. You have passed this assessment';*/
                //msgStr = 'You achieved ' + rightansw + '/'+ totlaques+'. You have passed this assessment';
                clearInterval(timeinterval);
                clearInterval(timerIntervalAssement);
                clearInterval(tts);
                ates = [];
                rightans = 0;
                totoalquest=0;
                useransqu = 0;
                questionCounter = 0; //Tracks question number
                questionCounter1 = 0;
                selections = []; //Array containing user choices
                quiz = $('#quiz'); //OTA div object
                answeruser = [];
                answerusernew = [];
                finfaland="";
                sectiontsarray = [];
                checkTureAns = 1;
                checkTureAnsArray = [];
                heckTureAnsArray = [];
                progress(0, 0, $('#progressBar'));
                i=0;
                j=0;
                rightansw=0;
                rightclickansw = 0;
                totlaques=0;
                questions="";
                objdata="";
                lendata="";
                seconds="";
                minutes="";
                hours="";
                days="";
                lendataNew = "";
                failedSaveOTA = 0;
                CheckForPassNotShowSCOS = "True";
                $("#progressBar2").css("display","none");
                $("#progressBar").css("display","none");
                $("#quizResult").css("display","block");
                $("#quizResult").append(OTAresultDiv);
                $("#goBack").css("display","block");
                $("#goBack").off("click");
                $("#goBack").click(function(){
                    if(activeModule.actionIdNew == "1" && IsLiveOTA == "1"){
                        var id = "module-" + activeModule.courseid + "-" + activeModule.basemoduleid;
                        console.log( activeModule.courseid + "-" + activeModule.basemoduleid);
                        var classStatus = "status1 statuscp";
                        var modDiv = $("#" + id);
                        if ($("#" + id) != undefined) {
                            $("#" + id).children(".limodtitleactive").children(".statuslock").addClass(classStatus);
                        }
                        var status = courseStatus.Completed;
                        completeBookingOTA(status);
                    }

                    else if(activeModule.practiceisoptional == true && IsLiveOTA == "1"){
                        var id = "module-" + activeModule.courseid + "-" + activeModule.basemoduleid;
                        console.log( activeModule.courseid + "-" + activeModule.basemoduleid);
                        var classStatus = "status1 statuscp";
                        var modDiv = $("#" + id);
                        if ($("#" + id) != undefined) {
                            $("#" + id).children(".limodtitleactive").children(".statuslock").addClass(classStatus);
                        }
                        var status = courseStatus.Completed;
                        completeBookingOTA(status);
                    }

                    else{
                        activeModule.actionIdNew = "1";
                        activeModule.otaTypeId = "4";
                    }
                    console.log(activeModule);
                    goToPage("#coursepage");
                    $('#quizResult').html('');
                    $("#quizResult").css("display","none");
                    $("#goBack").css("display","none");
                });
                //navigator.notification.confirm(msgStr,function() { goToPage("#coursepage")}, msgTitle, msgBtnValue);
              }
              else{
                msgTitle = resources.assessmentresultsOTA;
                msgBtnValue = resources.btnOk;
                /*msgStr = 'You achieved ' + rightansw + ' right out of ' +
                          totlaques + ' questions!!!';*/
                var SecWithMarks = "";

                /*for(var x = 0; x<lendataNew.length;x++){
                    SecWithMarks += "<br><span>"+lendataNew[x].OtaSectionTitle +":</span><br>     <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Required Marks :"+lendataNew[x].OTASectionPassMark+"/"+lendataNew[x].OTASectionQuestions+".</span> <br>    <span style=color:red>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You scored: "+ checkSecPassMarksarray[x]+"/"+lendataNew[x].OTASectionQuestions+"</span><br>";
                }
                var OverAllMarksFinal = window.localStorage.getItem("OverAllMarks");
                var OverallTotalQuestionsfinal = window.localStorage.getItem("OverallTotalQuestions");


                var OTAresultDiv = '<span><b>Assessment Results:</b></span><br>'+SecWithMarks+' <br><span>Overall Mark Required: '+OverAllMarksFinal+'/'+OverallTotalQuestionsfinal+'</span><br><span>You achieved:  <span style=color:red;>' + rightansw + '/'+ OverallTotalQuestionsfinal+'</span>. You have <span style=color:red;>referred</span> this assessment</span>';*/

                for(var x = 0; x<lendataNew.length;x++){

                    //SecWithMarks += "<br><span><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+lendataNew[x].OtaSectionTitle +":</b></span><br>     <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Required Marks :<span style=color:red>"+lendataNew[x].OTASectionPassMark+"/"+lendataNew[x].OTASectionQuestions+"</span></span> <br>    <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You scored: <span style=color:red>"+ checkSecPassMarksarray[x]+"/"+lendataNew[x].OTASectionQuestions+"</span></span><br>";
                    SecWithMarks += "<br><span><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+lendataNew[x].OtaSectionTitle +":</b></span><br>     <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+resources.OTARquiredMarks+" :<span style=color:red>"+lendataNew[x].OTASectionPassMark+"/"+lendataNew[x].OTASectionQuestions+"</span></span> <br>    <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+resources.OTAScored+": <span style=color:red>"+ checkSecPassMarksarray[x]+"/"+lendataNew[x].OTASectionQuestions+"</span></span><br>";
                }
                var OverAllMarksFinal = window.localStorage.getItem("OverAllMarks");
                var OverallTotalQuestionsfinal = window.localStorage.getItem("OverallTotalQuestions");

                var CheckUserResult = "";
                var OtaIdForQuestions = window.localStorage.getItem("OTAId");
                if(IsLiveOTA == 1){
                    CheckUserResult += '<span style=font-size:14px;>'+resources.OTALive+activeUser.userId+'-'+OtaWorksheetJSON.OTAStudentExamID+'</span><br>';
                }
                else{
                    CheckUserResult += '<span style=font-size:14px;>'+resources.OTAPractice+activeUser.userId+'-'+OtaWorksheetJSON.OTAStudentExamID+'</span><br>';
                }
                //var OTAresultDiv = '<span style=font-size:21px;>You achieved:<span style=color:red;>' + rightansw + '/'+ OverallTotalQuestionsfinal+'</span>.&nbsp;&nbsp;You have <span style=color:red;>referred</span> this assessment</span><br><br><span><b>Sections:</b></span><br>'+SecWithMarks+' <br><br><span><b>Overall Mark: </b></span><span style=color:red;>'+OverAllMarksFinal+'/'+OverallTotalQuestionsfinal+'</span></span><span>&nbsp;&nbsp;<b>You achieved: </b></span><span style=color:red;>' + rightansw + '/'+ OverallTotalQuestionsfinal+'</span></span>';
                var OTAresultDiv = CheckUserResult+'<br><span style=font-size:21px;>'+resources.OTAAchieved+':<span style=color:red;>' + rightansw + '/'+ OverallTotalQuestionsfinal+'</span>.&nbsp;&nbsp;'+resources.OTAYou+' <span style=color:red;>'+resources.OTAFailed+'</span> '+resources.OTATheAssessment+'</span><br><br><span><b>'+resources.sections+':</b></span><br>'+SecWithMarks+' <br><br><span><b>'+resources.ovlpassmarks+' </b></span><span style=color:red;>'+OverAllMarksFinal+'/'+OverallTotalQuestionsfinal+'</span></span><br><span><b>'+resources.OTAAchieved+': </b></span><span style=color:red;>' + rightansw + '/'+ OverallTotalQuestionsfinal+'</span></span>';
                /*for(var x = 0; x<lendataNew.length;x++){
                    //console.log(lendataNew[x].OtaSectionTitle+"   ----   "+ lendataNew[x].OTASectionPassMark +"    ----     "+ checkSecPassMarksarray[x]);
                    SecWithMarks += lendataNew[x].OtaSectionTitle +":\n     Required Marks :"+lendataNew[x].OTASectionPassMark+"/"+lendataNew[x].OTASectionQuestions+". \n     You scored: "+ checkSecPassMarksarray[x]+"/"+lendataNew[x].OTASectionQuestions+"\n";
                }
                var OverAllMarksFinal = window.localStorage.getItem("OverAllMarks");
                        var OverallTotalQuestionsfinal = window.localStorage.getItem("OverallTotalQuestions");
                        msgStr = 'Sections:\n'+SecWithMarks+' \nOverall Mark Required: '+OverAllMarksFinal+'/'+OverallTotalQuestionsfinal+'\nYou achieved: ' + rightansw + '/'+ totlaques+'. You have referred this assessment';*/
                //msgStr = 'Sections:\n'+SecWithMarks+' \nYou achieved: ' + rightansw + '/'+ totlaques+ '. You have referred this assessment';
                //msgStr = 'You achieved ' + rightansw + '/'+ totlaques+ '. You have referred this assessment';

                clearInterval(timeinterval);
                clearInterval(timerIntervalAssement);
                progress(0, 0, $('#progressBar'));
                ates = [];
                rightans = 0;
                totoalquest=0;
                useransqu = 0;
                questionCounter = 0; //Tracks question number
                questionCounter1 = 0;
                selections = []; //Array containing user choices
                quiz = $('#quiz'); //OTA div object
                answeruser = [];
                answerusernew = [];
                finfaland="";
                sectiontsarray = [];
                checkTureAns = 1;
                clearInterval(tts);
                checkTureAnsArray = [];
                heckTureAnsArray = [];
                i=0;
                j=0;
                rightansw=0;
                rightclickansw = 0;
                totlaques=0;
                questions="";
                objdata="";
                lendata="";
                seconds="";
                minutes="";
                hours="";
                days="";
                lendataNew = "";
                failedSaveOTA = 0;
                $("#progressBar2").css("display","none");
                $("#progressBar").css("display","none");
                $("#quizResult").css("display","block");
                $("#quizResult").append(OTAresultDiv);
                $("#goBack").css("display","block");
                $("#goBack").off("click");
                $("#goBack").click(function(){

                    goToPage("#coursepage");
                    $('#quizResult').html('');
                    $("#quizResult").css("display","none");
                    $("#goBack").css("display","none");
                });
                //navigator.notification.confirm(msgStr,function() { goToPage("#coursepage")}, msgTitle, msgBtnValue);
              }

            }
            else{
                msgTitle = resources.assessmentresultsOTA;
                msgBtnValue = resources.btnOk;
                /*msgStr = 'You achieved ' + rightansw + ' right out of ' +
                          totlaques + ' questions!!!';*/
                var SecWithMarks = "";

                /*for(var x = 0; x<lendataNew.length;x++){
                    SecWithMarks += "<br><span>"+lendataNew[x].OtaSectionTitle +":</span><br>     <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Required Marks :"+lendataNew[x].OTASectionPassMark+"/"+lendataNew[x].OTASectionQuestions+".</span> <br>    <span style=color:red>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You scored: "+ checkSecPassMarksarray[x]+"/"+lendataNew[x].OTASectionQuestions+"</span><br>";
                }
                var OverAllMarksFinal = window.localStorage.getItem("OverAllMarks");
                var OverallTotalQuestionsfinal = window.localStorage.getItem("OverallTotalQuestions");


                var OTAresultDiv = '<span><b>Assessment Results:</b></span><br>'+SecWithMarks+' <br><br><span>Overall Mark Required: '+OverAllMarksFinal+'/'+OverallTotalQuestionsfinal+'</span><br><span>You achieved: <span style=color:red;>' + rightansw + '/'+ OverallTotalQuestionsfinal+'</span>. You have <span style=color:red;>referred</span> this assessment</span>';*/
                for(var x = 0; x<lendataNew.length;x++){
                    SecWithMarks += "<br><span><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+lendataNew[x].OtaSectionTitle +":</b></span><br>     <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+resources.OTARquiredMarks+" :<span style=color:red>"+lendataNew[x].OTASectionPassMark+"/"+lendataNew[x].OTASectionQuestions+"</span></span> <br>    <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+resources.OTAScored+": <span style=color:red>"+ checkSecPassMarksarray[x]+"/"+lendataNew[x].OTASectionQuestions+"</span></span><br>";
                    //SecWithMarks += "<br><span><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+lendataNew[x].OtaSectionTitle +":</b></span><br>     <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Required Marks :<span style=color:red>"+lendataNew[x].OTASectionPassMark+"/"+lendataNew[x].OTASectionQuestions+"</span></span> <br>    <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You scored: <span style=color:red>"+ checkSecPassMarksarray[x]+"/"+lendataNew[x].OTASectionQuestions+"</span></span><br>";
                    //SecWithMarks += "<br><span><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+lendataNew[x].OtaSectionTitle +":</b></span><br>     <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Required Marks :<span style=color:red>"+lendataNew[x].OTASectionPassMark+"/"+lendataNew[x].OTASectionQuestions+"</span></span> <br>    <span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You scored: <span style=color:red>"+ checkSecPassMarksarray[x]+"/"+lendataNew[x].OTASectionQuestions+"</span></span><br>";
                }
                var OverAllMarksFinal = window.localStorage.getItem("OverAllMarks");
                var OverallTotalQuestionsfinal = window.localStorage.getItem("OverallTotalQuestions");

                var CheckUserResult = "";
                var OtaIdForQuestions = window.localStorage.getItem("OTAId");
                if(IsLiveOTA == 1){
                    CheckUserResult += '<span style=font-size:14px;>'+resources.OTALive+activeUser.userId+'-'+OtaWorksheetJSON.OTAStudentExamID+'</span><br>';
                }
                else{
                    CheckUserResult += '<span style=font-size:14px;>'+resources.OTAPractice+activeUser.userId+'-'+OtaWorksheetJSON.OTAStudentExamID+'</span><br>';
                }

                var OTAresultDiv = CheckUserResult+'<br><span style=font-size:21px;>'+resources.OTAAchieved+':<span style=color:red;>' + rightansw + '/'+ OverallTotalQuestionsfinal+'</span>.&nbsp;&nbsp;'+resources.OTAYou+' <span style=color:red;>'+resources.OTAFailed+'</span> '+resources.OTATheAssessment+'</span><br><br><span><b>'+resources.sections+':</b></span><br>'+SecWithMarks+' <br><br><span><b>'+resources.ovlpassmarks+' </b></span><span style=color:red;>'+OverAllMarksFinal+'/'+OverallTotalQuestionsfinal+'</span></span><br><span><b>'+resources.OTAAchieved+': </b></span><span style=color:red;>' + rightansw + '/'+ OverallTotalQuestionsfinal+'</span></span>';
                /*for(var x = 0; x<lendataNew.length;x++){
                    //console.log(lendataNew[x].OtaSectionTitle+"   ----   "+ lendataNew[x].OTASectionPassMark +"    ----     "+ checkSecPassMarksarray[x]);
                    SecWithMarks += lendataNew[x].OtaSectionTitle +":\n     Required Marks :"+lendataNew[x].OTASectionPassMark+"/"+lendataNew[x].OTASectionQuestions+". \n     You scored: "+ checkSecPassMarksarray[x]+"/"+lendataNew[x].OTASectionQuestions+"\n";
                }

                var OverAllMarksFinal = window.localStorage.getItem("OverAllMarks");
                                var OverallTotalQuestionsfinal = window.localStorage.getItem("OverallTotalQuestions");
                                msgStr = 'Sections:\n'+SecWithMarks+' \nOverall Mark Required: '+OverAllMarksFinal+'/'+OverallTotalQuestionsfinal+'\nYou achieved: ' + rightansw + '/'+ totlaques+'. You have referred this assessment';*/
                //console.log("Secmrks = "+ SecWithMarks);
                //msgStr = 'Sections:\n'+SecWithMarks+' \nYou achieved: ' + rightansw + '/'+ totlaques+ '. You have referred this assessment';
                //msgStr = 'You achieved ' + rightansw + '/'+ totlaques+ '. You have referred this assessment';
                clearInterval(timeinterval);
                clearInterval(timerIntervalAssement);
                clearInterval(tts);
                progress(0, 0, $('#progressBar'));
                ates = [];
                rightans = 0;
                totoalquest=0;
                useransqu = 0;
                questionCounter = 0; //Tracks question number
                questionCounter1 = 0;
                selections = []; //Array containing user choices
                quiz = $('#quiz'); //OTA div object
                answeruser = [];
                answerusernew = [];
                finfaland="";
                sectiontsarray = [];
                checkTureAns = 1;
                checkTureAnsArray = [];
                heckTureAnsArray = [];
                i=0;
                j=0;
                rightansw=0;
                rightclickansw = 0;
                totlaques=0;
                questions="";
                objdata="";
                lendata="";
                seconds="";
                minutes="";
                hours="";
                days="";
                lendataNew = "";
                failedSaveOTA = 0;
                $("#progressBar2").css("display","none");
                $("#progressBar").css("display","none");
                $("#quizResult").css("display","block");
                $("#quizResult").append(OTAresultDiv);
                $("#goBack").css("display","block");
                $("#goBack").off("click");
                $("#goBack").click(function(){

                    goToPage("#coursepage");
                    $('#quizResult').html('');
                    $("#quizResult").css("display","none");
                    $("#goBack").css("display","none");
                });
                //navigator.notification.confirm(msgStr,function() { goToPage("#coursepage")}, msgTitle, msgBtnValue);
            }
            console.log(lendataNew);


            //finfaland ='{"?xml": {"version": "1.0","encoding": "utf-16"},"OtaWorksheet": {"TotalAnsweredOTAQue": "'+rightclickansw+'","Status": null,"OtaSectionsDetails": '+JSON.stringify(lendataNew)+'}}';
            //console.log("hi save : "+finfaland);
            //var OTAStartEndIDSave = window.localStorage.getItem("OTAStartEndId");
            $("#finishClick").css("display","none");


            //console.log("hi save : "+finfaland);
            var OTASectionIDs = window.localStorage.getItem("OTASectionIDs");
            var OtaIdForQuestions = window.localStorage.getItem("OTAId");

            if(IsLiveOTA == "1"){
                OTAStartEndWSCall(OtaIdForQuestions,OtaWorksheetJSON.LiveAssessmentScheduleID,1,OTASectionIDs,IsLiveOTA);
            }
            else{
                OTAStartEndWSCall(OtaIdForQuestions,activeModule.assessmentscheduleid,1,OTASectionIDs,IsLiveOTA);
            }



            //console.log("save ota==  "+ret)
            //lendataNew = "";
            if(IsLiveOTA == 0 && CheckForPassNotShowSCOS == "False"){
                getSCOListLinkedToOTAExam(OtaWorksheetJSON.OTAStudentExamID);
            }
        }
        else if(ret == "-1" || ret == -1){

            if(failedSaveOTA > 0){
                if(failedSaveOTA > 30 && failedSaveOTA < 32){
                    msgStr = "Sorry, are still unable to submit your results due to a poor internet connection, would you like us to continue to try or do you wish to cancel?";
                    msgTitle = "Assessment";
                    msgBtnValue = "Continue,Cancel";
                    navigator.notification.confirm(msgStr, UpdateApp, msgTitle, msgBtnValue);
                    function UpdateApp(choice){
                        if(choice == "1"){
                            failedSaveOTA++;
                            $("#OtaQuestionPage").append(mloadingGif);
                            displayScore();
                        }
                        else{
                            clearInterval(timeinterval);
                            clearInterval(timerIntervalAssement);
                            clearInterval(tts);
                            progress(0, 0, $('#progressBar'));
                            ates = [];
                            rightans = 0;
                            totoalquest=0;
                            useransqu = 0;
                            questionCounter = 0; //Tracks question number
                            questionCounter1 = 0;
                            selections = []; //Array containing user choices
                            quiz = $('#quiz'); //OTA div object
                            answeruser = [];
                            answerusernew = [];
                            finfaland="";
                            sectiontsarray = [];
                            checkTureAns = 1;
                            checkTureAnsArray = [];
                            heckTureAnsArray = [];
                            i=0;
                            j=0;
                            rightansw=0;
                            rightclickansw = 0;
                            totlaques=0;
                            questions="";
                            objdata="";
                            lendata="";
                            seconds="";
                            minutes="";
                            hours="";
                            days="";
                            lendataNew = "";
                            failedSaveOTA = 0;
                            goToPage("#coursepage");
                        }
                    }
                }
                else if(failedSaveOTA > 60){
                    msgStr = "Sorry, are still unable to submit your results due to a poor internet connection, would you like us to continue to try or do you wish to cancel?";
                    msgTitle = "Assessment";
                    msgBtnValue = "Continue,Cancel";
                    navigator.notification.confirm(msgStr, UpdateApp, msgTitle, msgBtnValue);
                    function UpdateApp(choice){
                        if(choice == "1"){
                            $("#OtaQuestionPage").append(mloadingGif);
                            displayScore();
                        }
                        else{
                            clearInterval(timeinterval);
                            clearInterval(timerIntervalAssement);
                            clearInterval(tts);
                            progress(0, 0, $('#progressBar'));
                            ates = [];
                            rightans = 0;
                            totoalquest=0;
                            useransqu = 0;
                            questionCounter = 0; //Tracks question number
                            questionCounter1 = 0;
                            selections = []; //Array containing user choices
                            quiz = $('#quiz'); //OTA div object
                            answeruser = [];
                            answerusernew = [];
                            finfaland="";
                            sectiontsarray = [];
                            checkTureAns = 1;
                            checkTureAnsArray = [];
                            heckTureAnsArray = [];
                            i=0;
                            j=0;
                            rightansw=0;
                            rightclickansw = 0;
                            totlaques=0;
                            questions="";
                            objdata="";
                            lendata="";
                            seconds="";
                            minutes="";
                            hours="";
                            days="";
                            lendataNew = "";
                            failedSaveOTA = 0;
                            goToPage("#coursepage");
                        }
                    }
                }
                else{
                    failedSaveOTA++;
                    $("#OtaQuestionPage").append(mloadingGif);
                    displayScore();
                }

            }
            else{
                questionCounter--;
                questionCounter1--;
                msgStr = "We are having problems submitting your assessment. Please wait and we will try again shortly. Please do not close the app and wait for a response.";
                msgTitle = resources.assessmentHead;
                msgBtnValue = resources.btnOk;
                navigator.notification.confirm(msgStr, function() {
                    questionCounter++;
                    questionCounter1++;
                    failedSaveOTA++;
                    $("#OtaQuestionPage").append(mloadingGif);
                    displayScore();
                }, msgTitle, msgBtnValue);
            }
        }
        else{
            if(failedSaveOTA > 0){
                if(failedSaveOTA > 30 && failedSaveOTA < 32){
                    msgStr = "Sorry, are still unable to submit your results due to a poor internet connection, would you like us to continue to try or do you wish to cancel?";
                    msgTitle = "Assessment";
                    msgBtnValue = "Continue,Cancel";
                    navigator.notification.confirm(msgStr, UpdateApp, msgTitle, msgBtnValue);
                    function UpdateApp(choice){
                        if(choice == "1"){
                            failedSaveOTA++;
                            $("#OtaQuestionPage").append(mloadingGif);
                            displayScore();
                        }
                        else{
                            clearInterval(timeinterval);
                            clearInterval(timerIntervalAssement);
                            clearInterval(tts);
                            progress(0, 0, $('#progressBar'));
                            ates = [];
                            rightans = 0;
                            totoalquest=0;
                            useransqu = 0;
                            questionCounter = 0; //Tracks question number
                            questionCounter1 = 0;
                            selections = []; //Array containing user choices
                            quiz = $('#quiz'); //OTA div object
                            answeruser = [];
                            answerusernew = [];
                            finfaland="";
                            sectiontsarray = [];
                            checkTureAns = 1;
                            checkTureAnsArray = [];
                            heckTureAnsArray = [];
                            i=0;
                            j=0;
                            rightansw=0;
                            rightclickansw = 0;
                            totlaques=0;
                            questions="";
                            objdata="";
                            lendata="";
                            seconds="";
                            minutes="";
                            hours="";
                            days="";
                            lendataNew = "";
                            failedSaveOTA = 0;
                            goToPage("#coursepage");
                        }
                    }
                }
                else if(failedSaveOTA > 60){
                    msgStr = "Sorry, are still unable to submit your results due to a poor internet connection, would you like us to continue to try or do you wish to cancel?";
                    msgTitle = "Assessment";
                    msgBtnValue = "Continue,Cancel";
                    navigator.notification.confirm(msgStr, UpdateApp, msgTitle, msgBtnValue);
                    function UpdateApp(choice){
                        if(choice == "1"){
                            $("#OtaQuestionPage").append(mloadingGif);
                            displayScore();
                        }
                        else{
                            clearInterval(timeinterval);
                            clearInterval(timerIntervalAssement);
                            clearInterval(tts);
                            progress(0, 0, $('#progressBar'));
                            ates = [];
                            rightans = 0;
                            totoalquest=0;
                            useransqu = 0;
                            questionCounter = 0; //Tracks question number
                            questionCounter1 = 0;
                            selections = []; //Array containing user choices
                            quiz = $('#quiz'); //OTA div object
                            answeruser = [];
                            answerusernew = [];
                            finfaland="";
                            sectiontsarray = [];
                            checkTureAns = 1;
                            checkTureAnsArray = [];
                            heckTureAnsArray = [];
                            i=0;
                            j=0;
                            rightansw=0;
                            rightclickansw = 0;
                            totlaques=0;
                            questions="";
                            objdata="";
                            lendata="";
                            seconds="";
                            minutes="";
                            hours="";
                            days="";
                            lendataNew = "";
                            failedSaveOTA = 0;
                            goToPage("#coursepage");
                        }
                    }
                }
                else{
                    failedSaveOTA++;
                    $("#OtaQuestionPage").append(mloadingGif);
                    displayScore();
                }

            }
            else{
                questionCounter--;
                questionCounter1--;
                msgStr = "We are having problems submitting your assessment. Please wait and we will try again shortly. Please do not close the app and wait for a response.";
                msgTitle = resources.assessmentHead;
                msgBtnValue = resources.btnOk;
                navigator.notification.confirm(msgStr, function() {
                    questionCounter++;
                    questionCounter1++;
                    failedSaveOTA++;
                    $("#OtaQuestionPage").append(mloadingGif);
                    displayScore();
                }, msgTitle, msgBtnValue);
            }

        }

    });


  }

function OTAStartEndWSCall(OtaIdForQuestions,assessmentscheduleid,isEndStart, OTASectionIDs,IsLiveOTA){
    coController.InsertUpdateOtaExamStartEndDetails(OtaIdForQuestions,assessmentscheduleid,isEndStart,OTASectionIDs,IsLiveOTA,function(ret){
        //console.log(ret);
        window.localStorage.removeItem("OTAStartEndId");
        window.localStorage.setItem("OTAStartEndId",ret.InsertUpdateOtaExamStartEndDetailsResult);
        //alert(ret);
    });
}

function quest(data){



  // Display initial question
  displayNext();


  
  // Click handler for the 'next' button
  
  
  // Click handler for the 'prev' button
  
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });

  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  
  
  // Creates a list of the answer choices as radio inputs
  

  //submit user answer
  

}