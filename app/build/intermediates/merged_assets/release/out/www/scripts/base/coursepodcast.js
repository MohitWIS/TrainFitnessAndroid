var podcastsOK = true;
var currentPodPlaylistNo = 0;
var videoPodSourceList = "";
var podcastVideoPlayer;
var podcastAudioPlayer;
var playListPodcastSourceList;
var podcastsFirstLoad = true;
var getUserPodcastsOk = true;
var currentPodcastItem;
var pdfItemviewFile="";
var itemPdfFile="";
var pdfItemDirectory="";
$(document).on("pagecreate", "#coursepodcastpage", function() {
               mediaRefreshing = false;
               
               $(".ui-header").on("touchmove",function(e){e.preventDefault();});
               $(".ui-footer").on("touchmove",function(e){e.preventDefault();});
               
               $("#coursepodcastviewheader").html(resources.mypodcasts);
               $(".nopodcastsdiv").html(resources.nopodcastsdiv);
               $(".nopodcastsdiv").hide();
               
               $(".hidebtntxt").html(resources.hidebtntxt);
               $(".coursesimgtxt").html(resources.coursesimgtxt);
               $(".helpdeskimgtxt").html(resources.helpdeskimgtxt);
               $(".supportimgtxt").html(resources.supportimgtxt);
               $(".logoutimgtxt").html(resources.logoutimgtxt);
               $(".refreshimgtxt").html(resources.refreshimgtxt);
               $(".closehelpimgtxt").html(resources.closehelpimgtxt);
               
               var height = $(window).height() - $("header", $("body").pagecontainer("getActivePage")).height();
               $("#coursepodcastcontent").css("height", height);
               if (fileMainDir != undefined && mediaDataDir === undefined) {
               getUserRootDir(function(ret) {
                              if (mediaDataDir !== undefined && theoryMediaDir === undefined) {
                              mediaDataDir.getDirectory("TheoryMedia", {
                                                        create: true
                                                        }, getTheoryMediaDataDir, onError);
                              }
                              
                              });
               
               }
               
               activeTab = "podcast";
               $("#podcasttab").addClass("fronttab");
               
               });
$(document).on("pagebeforeshow", "#coursepodcastpage", function(e) {
               try {
               refreshMenu("refresh");
               loadCoursePage = false;
               startupPageid = "#coursepage";
               setUserPosition(false, "#coursepodcastpage", false);
               pageLoad = "#coursepodcastpage";
               
               getUserPodcastsOk = true;
               if (mediaDataDir !== undefined && theoryMediaDir === undefined) {
               mediaDataDir.getDirectory("TheoryMedia", {
                                         create: true
                                         }, getTheoryMediaDataDir, onError);
               }
               if (docsFileSystem !== undefined && docsFileDir === undefined) {
               docsFileSystem.root.getDirectory(resources.companyname, {
                                                create: true
                                                }, getDocsFileRootDir, onError);
               }
               
               if (tablet === false) {
               $("#coursepodcastpage").addClass("etpmobile");
               $(".ui-content").addClass("etpmobile");
               }
               $("#coursepodcastpage").removeClass("playlistview");
               if (iphone5 === true) {
               $(".ui-page").addClass("iphone5");
               $(".ui-content").addClass("iphone5");
               $(".ui-panel").addClass("iphone5");
               $(".ui-panel-content-wrap-closed").addClass("iphone5");
               $("#coursepodcontenticonsdivright").addClass("iphone5");
               $("#coursepodcastcontent").addClass("iphone5");
               $(".coursemenupadderdiv").addClass("iphone5");
               $("#coursetabcontainer").addClass("iphone5");
               $("#courseplaylistheaderbar").addClass("iphone5");
               $("#courseplaylistheader").addClass("iphone5");
               $(".playlistuldiv").addClass("iphone5");
               $("#mediaplaycontainerdiv").addClass("iphone5");
               }
               $("#coursetabcontainer").removeClass("plshowed");
               if (tablet === false) {
               $(".ui-panel-content-wrap").addClass("fullscreenmobile");
               }
               
               var height = $(window).height() - $("header", $("body").pagecontainer("getActivePage")).height();
               $("#coursepodcastcontent").css("height", height);
               
               $("#mediaplaycontainerdiv").show();
               
               $(".tabscontentitem").removeClass("fronttab");
               rotation = 180;
               var contentHeight = $(window).height() - $("header", $("body").pagecontainer("getActivePage")).height();
              
               $("#podcasttab").css("height", contentHeight);
              
               $("#podcasttab").removeClass("fronttab");
               pageLoad = "#coursepodcastpage";
               
               $("#nopodpodcastdiv").show();
               $("#nopodpodcastdiv").html(resources.downloadingpodcasts);
               
               showPleaseWait();
               var mediaListSet = $.Deferred();
               
               if (mediaInit === true && mediaRefreshing === false) {
               resetFileDownload(true);
               mediaRefreshing = true;
               }
               mediaListSet.then(function() {
                                 activeUser.getStoredFilesListAsync("podcasts", mediaInit, function(foundPodcasts) {
                                                                    if(deviceIsOnline===false && foundPodcasts===false  && ignoreWarnings===false){
                                                                    ignoreWarnings = true;
                                                                    msgStr = resources.refreshmedia;
                                                                    msgTitle = resources.connError;
                                                                    msgBtnValue = resources.btnOk;
                                                                    navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                                                                    }else{
                                                                    getPodcastsForUserAsync(foundPodcasts);
                                                                    }
                                                                    setTimeout(function() {
                                                                               setPagePadderDiv("theoryPodcastScroller", true);
                                                                               ignoreWarnings = false;
                                                                               }, 1200);
                                                                    });
                                 }).then(setCourseInitialTabs).then(function() {
                                                                    mediaRefreshing = false;
                                                                    });
               mediaListSet.resolve();
              	if(device.platform==="Android"|| device.platform==='iOS'){
               document.addEventListener("remote-event", function(event) {
                                         try{
                                         if(remoteControlsOk===true){
                                         remoteControlsOk=false;
                                         if(event.remoteEvent.subtype==="prevTrack" || event.remoteEvent.subtype==="nextTrack"){
                                         if(currentAudioCategory !== undefined && currentAudioCategory.audios !== undefined && currentAudioCategory.audios.length > 0 && playListAudioSourceList!==undefined){
                                         var audioItemNo = event.remoteEvent.subtype==="prevTrack" ? currentAudioPlaylistNo - 1 : nextAudioLoadTrackNo;
                                         audioItemNo = (audioItemNo < 0) ? 0 : (audioItemNo === currentAudioCategory.audios.length) ? 0 : audioItemNo;
                                         playAudioAudio(playListAudioSourceList[audioItemNo], currentAudioCategory, true);
                                         }
                                         }
                                         setTimeout(function(){remoteControlsOk=true;
                                                    
                                                    
                                                    },300);
                                         }
                                         }catch(e){}
                                         });
               }
               
               } catch (e) {
               errorHandler("podcastpage.pagebeforeshow", e);
               }
               });
$(document).on("pagecontainershow", "#coursepodcastpage", function(e) {
               try {
               pageLoad = "#coursepodcastpage";
               showPleaseWait();
               if ($("#podcastcategories").children().length > 0) {
               $("#nopodpodcastdiv").hide();
               } else {
               $("#nopodpodcastdiv").show();
               showPleaseWait();
               }
               
               setTimeout(function() {
                          setUserPosition(false, "#coursepodcastpage", false);
                          }, 300);
               } catch (e) {
               errorHandler("podcastpage.pageshow", e);
               }
               });
function setCourseInitialTabs() {
    try {
        
        if (podcastVideoPlayer != undefined) {
            podcastVideoPlayer.pause();
        }
        $("#mediaplaycontainerdiv").hide();
        if ($("#coursetabcontainer").hasClass("plshowing")) {
            $("#coursetabcontainer").removeClass("plshowing");
            $("#courseplaylistclosebtn").trigger("vclick");
        }
        
        activeTab = "podcast";
        $("#podcasttab").show();
        $("#podcasttab").addClass("fronttab");
        $(".podheadbck").removeClass("headerhide");
        $("#coursepodcastcontent").removeClass("noheaderbar");
        setTimeout(function() {
                   setPagePadderDiv("theoryPodcastScroller", true);
                   }, 300);
        $("html,body").animate({
                               scrollTop: 0
                               }, 300);
        
        setTimeout(function() {
                   setPagePadderDiv("theoryPodcastScroller", true);
                   }, 300);
        $("#coursepodcastviewheader").html(resources.mypodcasts);
        $("#mediaplaycontainerdiv").hide();
        
        $("#podfooterleftbckbtn").off("vclick");
        $("#podfooterleftbckbtn").on("vclick", function(event) {
                                     event.preventDefault();
                                     audioPaused = true;
                                     videoPaused = true;
                                     //mediaInit = false;
                                     $("#podcasttab").css("display","block");
                                     if($("#coursetabcontainer").hasClass("plshowing")){
                                     $("#courseplaylistclosebtn").trigger("vclick");
                                     }else{
                                     $("#cpodclosebtn").trigger("vclick");
                                     }
                                     });
        
        $("#cpodclosebtn").off("vclick");
        $("#cpodclosebtn").on("vclick", function(event) {
                              event.preventDefault();
                              if(menubtnOk===true){
                              menubtnOk=false;
                              hidePleaseWait();
                              setPagePadderDiv("theoryPodcastScroller", true);
                              $("#coursepodcastpage").removeClass("playlistview");
                              $.mobile.back();
                              setTimeout(function(){
                                $("#headercourseiconlhs").trigger("vclick");
                              },2000);
                              setTimeout(function(){menubtnOk=true; showPleaseWait();},300);
                              }
                              
                              });
        $("#courseplaylistclosebtn").off("vclick");
        $("#courseplaylistclosebtn").on("vclick", function(event) {
                                        event.preventDefault();
                                        if(menubtnOk===true){
                                        menubtnOk=false;
                                        
                                        audioPaused = true;
                                        videoPaused = true;
                                        destroyPlayers();

                                        $("#podcasttab").css("display","block");
                                        $("#coursepodcastpage").removeClass("playlistview");
                                        $("#courseplaylisttab").show();
                                        $("#coursetabcontainer").removeClass("plshowing");
                                        $(".podheadbck").removeClass("headerhide");
                                        $("#coursepodcastcontent").removeClass("noheaderbar");
                                        $("div.flipper").css("transform", "rotateY(0deg)");
                                        $("html,body").animate({
                                                               scrollTop: 0
                                                               }, 300);
                                        setPodcastSeriesBtn();
                                        setPagePadderDiv("theoryPodcastScroller", false);
                                        setTimeout(function(){menubtnOk=true;},300);
                                        }
                                        });
        
        $("#btnpodvidplayerhide").off("vclick");
        $("#btnpodvidplayerhide").on("vclick", function(event) {
                                     try {
                                     event.preventDefault();
                                     $("#audiopodplayerdiv").hide();
                                     $("#videopodplayerdiv").hide();
                                     $("#mediaplaycontainerdiv").hide(200);
                                     var containertype = tablet === false ? "podcast" : "podcast";
                                     setTimeout(function() {
                                                setPagePadderDiv("playlistPodcastScroller", true, containertype);
                                                }, 300);
                                     } catch (e) {
                                     errorHandler("btnpodvidplayerhide vclick", e);
                                     }
                                     });
        
        $("#mediaplaycontainerdiv").hide();
        
        setUserPosition(false, "#coursepodcastpage", false);
        if (activeTab === undefined || activeTab.length === 0 || activeTab === "course") {
            activeTab = "podcast";
        }
        var triggerId = "";
        triggerId = "#coursepodcastimg";
        $(triggerId).trigger("vclick");
        setTimeout(function() {
                   setPagePadderDiv("theoryPodcastScroller", true);
                   hidePleaseWait();
                   }, 300);
    } catch (e) {}
}
function playPodcastTheory(podcastItem) {
    try {
        podcastAudioPlayer.pause();
        podcastVideoPlayer.pause();
        if (podcastItem.isdownloaded === false && deviceIsOnline === false) {
            msgStr = resources.mediaconnectionfileerror;
            msgTitle = resources.connError;
            msgBtnValue = resources.btnOk;
            
            navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
        } else {
            var podUrl = podcastItem.isdownloaded ? podcastItem.fileuri : podcastItem.link;
            if (podcastItem.link.indexOf("https:") < 0) {
                podUrl = "https://" + podcastItem.link;
				        //navigator.notification.alert(podUrl, succall);
            }
            currentPodPlaylistNo = podcastItem.index;
            var podBtnId = "theoryitemdiv-" + podcastItem.podcastid + "-" + podcastItem.id;
            $("#mediaplaycontainerdiv").slideDown(300, function() {});
            setPodcastSource(podUrl, podcastItem.title, podBtnId, podcastItem.type, podcastItem.index);
        }
        
        
        globalaudiourl=podUrl;
                 var getextinaudio=podcastItem.link;
        var maudext = getextinaudio.substr(getextinaudio.lastIndexOf(".") + 1);
    
        console.log('podcast path', podUrl);
        if(maudext=="mp4"){
          runTest();  
        }
        
        
        
        
        
    } catch (e) {
        errorHandler("playPodcastTheory", e);
    }
}
function setPodcastSource(podUrl, title, btnId, type, index) {
    try {
		
		 var moptions = {
			 
        successCallback: function() {
			navigator.notification.activityStart(resources.pleaseWaitonly, loadingData);
          cordova.plugins.disusered.safe.encrypt(moptions.prop, '1234');
		  navigator.notification.activityStop();
        },
        errorCallback: function(mvidUrl) {
			 navigator.notification.activityStart(resources.pleaseWaitonly, loadingData);
			cordova.plugins.disusered.safe.encrypt(moptions.prop, '1234');
			navigator.notification.activityStop();
          
        },
		orientation: 'landscape',
		
    };
		
        podPlaylistActive(false, "", "");
        podPlaylistActive(true, btnId, "podcast");
        if (type === "audio") {
            $("#videopodplayerdiv").hide();
            $("#audiopodplayerdiv").slideDown(300, function() {});
            if (podcastAudioPlayer !== null && podcastAudioPlayer !== undefined && podUrl.length > 0) {
                if (podUrl.indexOf("https://") > -1) {
                    $("#audiopodplayerdiv .mejs-time span.mejs-currenttime").html("00:00");
                    $("#audiopodplayerdiv .mejs-time span.mejs-duration").html("00:00");
                    $("#audiopodplayerdiv .mejs-time-current").css("width", 0);
                    $("#audiopodplayerdiv .mejs-time-handle").css("width", 0);
                    $("#audiopodplayerdiv .mejs-time-handle").css("left", 0);
                    $("#audiopodplayerdiv .mejs-time-loaded").css("width", 0);
                    $("#audiopodplayerdiv .mejs-time-float").css("display", "none");
                    $("#audiopodplayerdiv .mejs-playpause-button button").addClass("audioloading");
                }
                podcastAudioPlayer.setSrc(podUrl);
                podcastAudioPlayer.load();
                
                
                
                
                
                
                setTimeout(function() {
                           podcastAudioPlayer.play();
                           }, 100);
            }
        } else {
            if (device.platform !== "Android") {
                $("#audiopodplayerdiv").hide();
                if (tablet === true || (iosDevice === true && podUrl.indexOf("https://") === -1)) {
                    $("#videopodplayerdiv").slideDown(300, function() {});
                } else {
                    $("#videopodplayerdiv").show();
                    $("#videopoddiv").show();
                    hidePodVideoPlayer();
                }
                if (podcastVideoPlayer !== null && podcastVideoPlayer !== undefined && podUrl.length > 0) {
                    podcastVideoPlayer.setSrc(podUrl);
                    podcastVideoPlayer.load();
                    setTimeout(function() {
                               podcastVideoPlayer.play();
                               }, 200);
                }
            } else {
                if (podUrl.indexOf("file:///") > -1) {
                    var filepath = podUrl;
                    var filename = filepath.substring(filepath.lastIndexOf("/") + 1, filepath.length);
                    filepath = filepath.replace("/" + filename, "");
                    var dirStr = filepath.substring(filepath.lastIndexOf("/") + 1, filepath.length);
                    podUrl = theoryMediaDir.toURL() + dirStr + "/" + filename;
                }
                if (videoPlaying === false) {
					moptions.prop=podUrl;
                    videoPlaying = true;
					
					 if (podUrl.indexOf("file:///") > -1) {
						 navigator.notification.activityStart("Please Wait", "Its loading.....");
			cordova.plugins.disusered.safe.decrypt(podUrl, '1234');
			navigator.notification.activityStop();
		  window.plugins.streamingMedia.playVideo(podUrl,moptions);
					 }else
					 {
                     window.plugins.streamingMedia.playVideo(podUrl);
					 }
                }
                setTimeout(function() {
                           videoPlaying = false;
                           }, 300);
            }
        }
        if (playlistPodcastScroller != undefined) {
            setTimeout(function() {
                       setPagePadderDiv("playlistPodcastScroller", false, "podcast");
                       playlistPodcastScroller.scrollToElement("#" + btnId);
                       }, 600);
        }
    } catch (e) {
        errorHandler("setPodcastSource", e);
    }
}
function getPodcastsForUserAsync(podcastsExist) {
    try {
        var deferred = $.Deferred();
        getPodcastsForUser(podcastsExist, function(retVal) {
                           deferred.resolve(retVal);
                           });
        return deferred.promise();
    } catch (e) {
        errorHandler("getPodcastsForUserAsync", e);
    }
}
function getPodcastsForUser(podcastsExist, returnFunction) {
    try {
        if (getUserPodcastsOk === true) {
            getUserPodcastsOk = false;
            var podcast;
            var courseId, moduleId;
            var contentHeight = 0;
            if (portalCourses == undefined || portalCourses.count() == 0) {
                portalCourses.refreshCourses(false, function(ret) {
                                             getPodcastInformation(podcastsExist, function() {
                                                                   setPagePadderDiv("theoryPodcastScroller", true);
                                                                   returnFunction(true);
                                                                   });
                                             });
            } else {
                getPodcastInformation(podcastsExist, function() {
                                      setPagePadderDiv("theoryPodcastScroller", true);
                                      returnFunction(true);
                                      });
            }
            setTimeout(function() {
                       getUserPodcastsOk = true;
                       }, 600);
        } else {
            returnFunction(true);
        }
    } catch (e) {
        errorHandler("getPodcastsForUser", e);
        getUserPodcastsOk = true;
        returnFunction(false);
    }
}
function getPodcastInformation(podcastsExist, returnFunction) {
    try {
        if (portalCourses.count() > 0) {
            $("#nopodpodcastdiv").html(resources.downloadingpodcasts);
            showPleaseWait();
            activeUser.getAllUserPodcasts(podcastsExist, 0, function(ret) {
                                          if (ret !== undefined && ret !== false) {
                                          loadPodcastsForUser(ret);
                                          } else {
                                          $("#nopodpodcastdiv").html(resources.noavailablepodcasts);
                                          $("#nopodpodcastdiv").show();
                                          returnFunction(ret);
                                          }
                                          });
        } else {
            setPagePadderDiv("theoryPodcastScroller", true);
            returnFunction(true);
        }
    } catch (e) {
        errorHandler("getPodcastInformation", e);
        returnFunction(true);
    }
}
function loadPodcastsForUser(loadcourseId) {
    try {
        var contentHeight = 0;
        activeUser.getUserPodcasts(loadcourseId, function(ret) {
                                   if (ret == undefined || ret.length == 0) {
                                   return true;
                                   } else {
                                   $("#nopodpodcastdiv").hide();
                                   hidePleaseWait();
                                   if (loadcourseId === 0) {
                                   $("#podcastcategories").html(ret);
                                   $("#podcastcategories").trigger("create");
                                   $("#podcastcategories").listview();
                                   
                                   setTimeout(function() {
                                              $(".videocategorymedia").off("vclick");
                                              $(".videocategorymedia").on("vclick", function(event) {
                                                                          try {
                                                                          if (medialistingOK === true) {
                                                                          medialistingOK = false;
                                                                          event.preventDefault();
                                                                          var id = $(event.currentTarget).attr("id");
                                                                          var current = $(this).closest(".ui-collapsible");
                                                                          if ($(this).hasClass("ui-collapsible-collapsed") === true) {
                                                                          $(".ui-collapsible").not(".ui-collapsible-collapsed").find("ui-collapsible-heading-toggle").click();
                                                                                                          $(".ui-collapsible-content", current).slideDown(300);
                                                                          $(this).collapsible("expand");
                                                                          setTimeout(function() {
                                                                                     medialistingOK = true;
                                                                                     setPagePadderDiv("theoryPodcastScroller", false);
                                                                                     }, 300);
                                                                          } else {
                                                                           $(".ui-collapsible-content", current).slideUp(300);
                                                                            setTimeout(function() {
                                                                              $("#" + id).collapsible("collapse");
                                                                            }, 300);
                                                                            //$("#" + id).collapsible("collapse");
                                                                          setTimeout(function() {
                                                                                     medialistingOK = true;
                                                                                     setPagePadderDiv("theoryPodcastScroller", false);
                                                                                     }, 300);
                                                                          }
                                                                          }
                                                                          } catch (e) {
                                                                          errorHandler("podmediacollapsible", e);
                                                                          }
                                                                          });
                                              }, 600);
                                   } else {
                                   if (loadcourseId > 0) {
                                   var index = 0;
                                   for (var y = 0; y < portalCourses.count(); y++) {
                                   var c = portalCourses.courses[y];
                                   if (c.courseid === loadcourseId) {
                                   index = y;
                                   break;
                                   }
                                   }
                                   var podBefore;
                                   var podAfter;
                                   var podBeforeId = 0;
                                   var podBeforeCourseId = 0;
                                   var podAfterId = 0;
                                   var pods = $(".podcollapse");
                                   if (pods !== undefined) {
                                   if (pods.length > 1) {
                                   var insertedDiv = false;
                                   for (var x = 0; x < pods.length; x++) {
                                   podBefore = pods[x];
                                   if (podBefore === undefined) {
                                   break;
                                   }
                                   var podBeforeIdStr = (podBefore.id).replace("podcategory-", "");
                                   var idIndex = podBeforeIdStr.indexOf("-");
                                   podBeforeId = parseInt(podBeforeIdStr.substring(0, idIndex), 10);
                                   podBeforeCourseId = parseInt(podBeforeIdStr.replace(podBeforeId + "-theory-", ""), 10);
                                   var insertId = "#podcategory-" + podBeforeId + "-theory-" + podBeforeCourseId;
                                   if (index < podBeforeId && x === 0) {
                                   insertedDiv = true;
                                   $(insertId).before(ret);
                                   break;
                                   }
                                   if (x + 1 === pods.length) {
                                   insertedDiv = true;
                                   $("#podcastcategories").append(ret);
                                   break;
                                   } else {
                                   podAfter = pods[x + 1];
                                   if (podAfter === undefined) {
                                   break;
                                   }
                                   var podAfterIdStr = (podAfter.id).replace("podcategory-", "");
                                   var idAfterIndex = podAfterIdStr.indexOf("-");
                                   podAfterId = parseInt(podAfterIdStr.substring(0, idAfterIndex), 10);
                                   if (index > podBeforeId && index < podAfterId) {
                                   insertedDiv = true;
                                   $(insertId).after(ret);
                                   break;
                                   }
                                   }
                                   }
                                   if (insertedDiv === false) {
                                   $("#podcastcategories").append(ret);
                                   
                                   $(".podcollapse").trigger("create");
                                   $(".podcollapse").collapsible();
                                   } else {
                                   $(".podcollapse").trigger("create");
                                   $(".podcollapse").collapsible();
                                   }
                                   
                                   } else {
                                   $("#podcastcategories").append(ret);
                                   $(".podcollapse").trigger("create");
                                   $(".podcollapse").collapsible();
                                   
                                   }
                                   } else {
                                   $("#podcastcategories").append(ret);
                                   $(".podcollapse").trigger("create");
                                   $(".podcollapse").collapsible();
                                   }
                                   $("#podcastcategories").trigger("create");
                                   $("#podcastcategories").listview();
                                   
                                   } else {
                                   $("#podcastcategories").append(ret);
                                   $(".podcollapse").trigger("create");
                                   $(".podcollapse").collapsible();
                                   
                                   }
                                   }
                                   
                                   $(".progressbarwrapper").on("vclick", function(event) {
                                                               event.preventDefault();
                                                               });
                                   setPodcastSeriesBtn();
                                   $("#nopodpodcastdiv").hide();
                                   setTimeout(function() {
                                              setPagePadderDiv("theoryPodcastScroller", false);
                                              }, 600);
                                   }
                                   return true;
                                   });
    } catch (e) {
        errorHandler("loadPodcastsForUser", e);
        return false;
    }
}
function setPodcastSeriesBtn() {
    try {
        $(".podseriesbtn").off("vclick");
        $(".podseriesbtn").on("vclick", function(event) {
                              try {
                              if (mediaSeriesBtnOk === true) {
                              mediaSeriesBtnOk = false;

                              var height = $(window).height() - $("header", $("body").pagecontainer("getActivePage")).height() - 100;

                              $("#podplaylistdiv").css("height", height);
                              $("#coursepodcastpage").addClass("playlistview");
                              var id = $(event.currentTarget).attr("id");
                              var podCatId = id.replace("podcategory-", "");
                              event.preventDefault();
                              currentPlayListCategory = id;
                              $("#coursepodcategoryul").empty();
                              $("#mediaplaycontainerdiv").show();
                              if (podcastVideoPlayer != undefined) {
                              podcastVideoPlayer.pause();
                              }
                              if (podcastAudioPlayer != undefined) {
                              podcastAudioPlayer.pause();
                              }
                              
                              if (activeUser.podcasts !== undefined && activeUser.podcasts.length === 0) {
                              if (activeUser.existPods !== undefined && activeUser.existPods.length > 0) {
                              activeUser.podcasts = activeUser.existPods;
                              }
                              }
                              var podcast = activeUser.getPodcastById(podCatId);
                              if (podcast !== undefined) {
                              var allItemsDownloaded = true;
                              for (var p = 0; p < podcast.items.length; p++){
                              var pdItem = podcast.items[p];
                              if (pdItem.isdownloaded===false){
                              allItemsDownloaded=false;
                              break;
                              }
                              }
                              
                              podcast.alldownloaded =allItemsDownloaded;
                              activeUser.saveFilesList(undefined, "podcasts", true, function() {});
                              var moduleTitle = podcast.moduletitle;
                              podcast.getPodcastLi(function(ret) {
                                                   
                                                   var title = moduleTitle;
                                                   
                                                   $("#courseplaylistheader").html(title);
                                                   $("#coursepodcategoryul").html(ret);
                                                   $("#podplaylistdiv").trigger("refresh");
                                                   $("#coursepodcategoryul").trigger("create");
                                                   $("#coursepodcategoryul").listview();
                                                   $("#coursepodcategoryul").listview("refresh");
                                                   
                                                   setPlayPodcastBtnItem();
                                                   setPlayPDFPodcastBtnItem();
                                                   setDeletePodcastBtnItem();
                                                   setDeletePDFPodcastBtnItem();
                                                   currentPodPlaylistNo = 0;
                                                   
                                                   playListPodcastSourceList = podcast.items;
                                                   $("#mediaplaycontainerdiv").show();
                                                   $("#videopodplayerdiv").show();
                                                   $("#audiopodplayerdiv").show();
                                                   $("#videopodplayer .mejs-controls").addClass("etpaudio");
                                                   $("#audiopodplayerdiv .mejs-controls").removeClass("etpaudio");
                                                   var localVidSrc = "";
                                                   var localAudSrc = "";
                                                   if (playListPodcastSourceList != undefined && playListPodcastSourceList.length > 0) {
                                                   for (var i = 0; i < playListPodcastSourceList.length; i++) {
                                                   if (playListPodcastSourceList[i].type === "video" && localVidSrc.length === 0) {
                                                   localVidSrc = playListPodcastSourceList[i].isdownloaded === true ? playListPodcastSourceList[i].fileuri : playListPodcastSourceList[i].link;
                                                   } else {
                                                   if (playListPodcastSourceList[i].type === "audio" && localAudSrc.length === 0) {
                                                   localAudSrc = playListPodcastSourceList[i].isdownloaded === true ? playListPodcastSourceList[i].fileuri : playListPodcastSourceList[i].link;
                                                   }
                                                   }
                                                   if (localAudSrc.length > 0 && localVidSrc.length > 0) {
                                                   break;
                                                   }
                                                   }
                                                   }
                                                   var tag = '<audio id="audiopodplayer" src="' + localAudSrc + '" class="audiopodplayer" controls="controls" preload="auto"></audio>';
                                                   $("#audiopodplayerdiv").html(tag);
                                                   podcastAudioPlayer = new MediaElementPlayer("#audiopodplayer", {
                                                                                               iPadUseNativeControls: false,
                                                                                               iPhoneUseNativeControls: false,
                                                                                               AndroidUseNativeControls: false,
                                                                                               pauseOtherPlayers: false,
                                                                                               features: ["playpause", "progress", "current", "duration"],
                                                                                               success: function(audplay, node) {
                                                                                               audplay.addEventListener("ended", function(e) {
                                                                                                                        podcastPlayNext(e.target, "audio");
                                                                                                                        }, false);
                                                                                               audplay.addEventListener("play", function(e) {
                                                                                                                        $("#audiopodplayerdiv .mejs-playpause-button button").removeClass("audioloading");
                                                                                                                        }, false);
                                                                                               audplay.addEventListener("loadedmetadata", function(e) {
                                                                                                                        $("#audiopodplayerdiv .mejs-playpause-button button").removeClass("audioloading");
                                                                                                                        }, false);
                                                                                               audplay.addEventListener("error", function(e) {}, false);
                                                                                               }
                                                                                               });
                                                   $("#audiopodplayerdiv .mejs-play").off("vclick");
                                                   $("#audiopodplayerdiv .mejs-play").on("vclick", function(event) {
                                                                                         try {
                                                                                         event.preventDefault();
                                                                                         if ($(this).hasClass("mejs-pause")) {
                                                                                         podcastAudioPlayer.pause();
                                                                                         } else {
                                                                                         podcastAudioPlayer.play();
                                                                                         }
                                                                                         } catch (e) {
                                                                                         errorHandler("mejs vclick", e);
                                                                                         }
                                                                                         });
                                                   var videoPosterImg = tablet === true ? "css/client/images/videoposter.png" : "css/client/images/videoposter1.png";
                                                   var vidtag = '<video id="videopodplayer" class="videoplayer"  poster="' + videoPosterImg + '"  preload="auto" src="' + localVidSrc + '" type="video/mp4"></video>';
                                                   $("#videopoddiv").html(vidtag);
                                                   if (device.platform !== "Android") {
                                                   podcastVideoPlayer = new MediaElementPlayer("#videopodplayer", {
                                                                                               iPadUseNativeControls: false,
                                                                                               iPhoneUseNativeControls: false,
                                                                                               AndroidUseNativeControls: false,
                                                                                               pauseOtherPlayers: true,
                                                                                               alwaysShowControls: true,
                                                                                               features: ["playpause", "progress", "current", "duration", "volume", "fullscreen"],
                                                                                               success: function(vidpay, node) {
                                                                                               vidpay.addEventListener("ended", function(e) {
                                                                                                                       podcastPlayNext(e.target, "video");
                                                                                                                       }, false);
                                                                                               vidpay.addEventListener("error", function(e) {}, false);
                                                                                               }
                                                                                               });
                                                   setTimeout(function() {
                                                              if (podcastVideoPlayer !== null && podcastVideoPlayer != undefined && localVidSrc.length > 0) {
                                                              podcastVideoPlayer.setSrc(localVidSrc);
                                                              podcastVideoPlayer.load();
                                                              }
                                                              if (podcastAudioPlayer !== null && podcastAudioPlayer != undefined && localAudSrc.length > 0) {
                                                              podcastAudioPlayer.setSrc(localAudSrc);
                                                              podcastAudioPlayer.load();
                                                              }
                                                              }, 1600);
                                                   } else {
                                                   podcastVideoPlayer = document.getElementById("videopodplayer");
                                                   }
                                                   setDownloadAllPodItemBtn();
                                                   setDownloadPodItemBtn();
                                                   setDeleteAllPodItemBtn();
                                                   if (tablet === false) {
                                                   var vidPlayer1 = document.getElementById("videopodplayer");
                                                   vidPlayer1.addEventListener("webkitendfullscreen", function() {
                                                                               $("#audiopodplayerdiv").hide();
                                                                               $("#videopodplayerdiv").hide();
                                                                               $("#mediaplaycontainerdiv").hide();
                                                                               setPagePadderDiv("playlistPodcastScroller", false, "video");
                                                                               }, false);
                                                   }
                                                   });
                              }
                              setTimeout(function() {
                                         $("#courseplaylisttab").show();
                                         $("#mediaplaycontainerdiv").hide();
                                         $("#videopodplayerdiv").hide();
                                         $("#audiopodplayerdiv").hide();
                                         $("#coursetabcontainer").addClass("plshowing");
                                         $("#coursetabcontainer").addClass("plshowed");
                                         $(".podheadbck").addClass("headerhide");
                                         
                                         $("div.flipper").css("transform", "rotateY(-180deg)");
                                         $("html,body").animate({
                                                                scrollTop: 0
                                                                }, 300);
                                         setPagePadderDiv("playlistPodcastScroller", true, "podcast");
                                         
                                         $("#courseplaylistclosebtn").off("vclick");
                                         $("#courseplaylistclosebtn").on("vclick", function(event) {
                                                                         event.preventDefault();
                                                                         audioPaused = true;
                                                                         videoPaused = true;
                                                                         destroyPlayers();
                                                                          $("#podcasttab").css("display","block");
                                                                         $("#courseplaylisttab").show();
                                                                         $("#coursetabcontainer").removeClass("plshowing");
                                                                         $(".podheadbck").removeClass("headerhide");
                                                                         $("#coursepodcastcontent").removeClass("noheaderbar");
                                                                         $("div.flipper").css("transform", "rotateY(0deg)");
                                                                         $("html,body").animate({
                                                                                                scrollTop: 0
                                                                                                }, 300);
                                                                         setUserMediaPosition("*", "*", "*", "");
                                                                         setPodcastSeriesBtn();
                                                                         setTimeout(function() {
                                                                                    if (theoryPodcastScroller !== undefined) {
                                                                                    setPagePadderDiv("playlistPodcastScroller", true, "podcast");
                                                                                    if ($("#" + currentPlayListCategory)) {
                                                                                    theoryPodcastScroller.scrollToElement("#" + currentPlayListCategory);
                                                                                    }
                                                                                    }
                                                                                    }, 600);
                                                                         });
                                         setPagePadderDiv("playlistPodcastScroller", true, "podcast");
                                         }, 300);

                                         setTimeout(function(){
                                            $("#podcasttab").css("display","none");
                                            },300)
                              event.stopPropagation();
                              }
                              } catch (e) {
                              errorHandler("podseries vclick", e);
                              }
                              setTimeout(function() {
                                         mediaSeriesBtnOk = true;
                                         }, 400);
                              });
    } catch (e) {
        errorHandler("setPodcastSeriesBtn", e);
    }
}

function podcastPlayNext(podplayer, playertype) {
    try {
        currentPodPlaylistNo += 1;
        if (currentPodPlaylistNo >= playListPodcastSourceList.length) {
            currentPodPlaylistNo = 0;
        }
        var currentPlayListItem = playListPodcastSourceList[currentPodPlaylistNo];
        if (currentPlayListItem.isdownloaded === false && deviceIsOnline === false) {
            currentPodPlaylistNo -= 1;
            msgStr = resources.mediaconnectionfileerror;
            msgTitle = resources.connError;
            msgBtnValue = resources.btnOk;
            navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
        } else {
            var nextUrl = currentPlayListItem.isdownloaded === false ? currentPlayListItem.link : currentPlayListItem.fileuri;
            podPlaylistActive(false, "", "");
            var podBtnId = "theoryitemdiv-" + currentPlayListItem.podcastid + "-" + currentPlayListItem.id;
            
            podPlaylistActive(true, "#" + podBtnId, "podcast");
            
            if (currentPlayListItem.type !== playertype) {
                podplayer.pause();
                setPodcastSource(nextUrl, currentPlayListItem.title, podBtnId, currentPlayListItem.type, currentPlayListItem.index);
                if (playertype === "video") {
                    $("#videopodplayer")[0].webkitExitFullScreen();
                }
                if (playlistPodcastScroller != undefined) {
                    setTimeout(function() {
                               setPagePadderDiv("playlistPodcastScroller", false, "podcast");
                               playlistPodcastScroller.scrollToElement("#" + podBtnId);
                               }, 300);
                }
            } else {
                podplayer.pause();
                if (nextUrl !== undefined && nextUrl.length > 0) {
                    podplayer.setSrc(nextUrl);
                    podplayer.load();
                    podplayer.play();
                }
            }
        }
    } catch (e) {
        errorHandler("podcastPlayNext", e);
    }
}
function setDownloadAllPodItemBtn() {
    $(".downloadallpodsbtn").off("vclick");
    $(".downloadallpodsbtn").on("vclick", function(event) {
                                try {
                                event.preventDefault();
                                if (deviceIsOnline === false) {
                                msgStr = resources.mediadownloadconnerror;
                                msgTitle = resources.connError;
                                msgBtnValue = resources.btnOk;
                                navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                                
                                } else {
                                var id = $(event.currentTarget).attr("id");
                                var ids = id.split("-");
                                var podcastid = ids[1] + "-" + ids[2];
                                var podcast = activeUser.getPodcastById(podcastid);
                                if (podcast !== undefined) {
                                podcast.downloadAllPodcastItems(true, function(ret) {
                                                                $(".podcastitemsul").listview("refresh");
                                                                setDeleteAllPodItemBtn();
                                                                setDeletePodcastBtnItem();
                                                                setDeletePDFPodcastBtnItem();
                                                                setPagePadderDiv("playlistPodcastScroller", true, "podcast");
                                                                });
                                }
                                }
                                } catch (e) {
                                errorHandler("downloadallpodsbtn vclick", e);
                                }
                                });
}
function setDeleteAllPodItemBtn() {
    $(".deleteallpodsbtn").off("vclick");
    $(".deleteallpodsbtn").on("vclick", function(event) {
                              try {
                              event.preventDefault();
                              var id = $(event.currentTarget).attr("id");
                              var ids = id.split("-");
                              var podcastid = ids[1] + "-" + ids[2];
                              var podcast = activeUser.getPodcastById(podcastid);
                              if (podcast !== undefined) {
                              podcast.deleteAllPodcastItems(function(ret) {
                                                            $(".podcastitemsul").listview("refresh");
                                                            setDownloadAllPodItemBtn();
                                                            setDownloadPodItemBtn();
                                                            setPagePadderDiv("playlistPodcastScroller", false, "podcast");
                                                            });
                              }
                              } catch (e) {
                              errorHandler("deleteallpodsbtn vclick", e);
                              }
                              });
}

function setDownloadPodItemBtn() {
    $(".downloadpoditembtn").off("vclick");
    $(".downloadpoditembtn").on("vclick", function(event) {
                                try {
                                event.preventDefault();
                                if (deviceIsOnline === false) {
                                msgStr = resources.mediadownloadconnerror;
                                msgTitle = resources.connError;
                                msgBtnValue = resources.btnOk;
                                navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                                } else {
                                var id = $(event.currentTarget).attr("id");
                                var ids = id.split("-");
                                var podcastid = ids[1] + "-" + ids[2];
                                var podcastitemid = ids[3];
                                var podcast = activeUser.getPodcastById(podcastid);
                                if (podcast !== undefined) {
                                var podcastItem = podcast.getPodcastItemById(podcastitemid);
                                if (podcastItem != undefined) {
                                podcastItem.downloadPodcastItem(function(ret) {
                                                                if (ret === true) {
                                                                $(".podcastitemsul").listview("refresh");
                                                                setDeletePodcastBtnItem();
                                                                setDeletePDFPodcastBtnItem();
                                                                playListPodcastSourceList = podcast.items;
                                                                setPagePadderDiv("playlistPodcastScroller", false, "podcast");
                                                                }
                                                                });
                                }
                                }
                                }
                                } catch (e) {
                                errorHandler("downloadpoditembtn vclick", e);
                                }
                                });
}

function setDeletePodcastBtnItem() {
    $(".deletepoditembtn").off("vclick");
    $(".deletepoditembtn").on("vclick", function(event) {
                              try {
                              event.preventDefault();
                              var id = $(event.currentTarget).attr("id");
                              var ids = id.split("-");
                              var podcastid = ids[1] + "-" + ids[2];
                              var podcastitemid = ids[3];
                              var podcast = activeUser.getPodcastById(podcastid);
                              if (podcast !== undefined) {
                              var podcastItem = podcast.getPodcastItemById(podcastitemid);
                              if (podcastItem != undefined) {
                              currentPodcastItem=podcastItem;
                              podcastItem.deletePodcastItem(function(ret) {
                                                            if (ret === true) {
                                                            if(currentPodcastItem!==undefined){
                                                            currentPodcastItem.isdownloaded = false;
                                                            currentPodcastItem.fileuri = "";
                                                            var podId = "#downloadpoditem-" + currentPodcastItem.podcastid + "-" + currentPodcastItem.id;
                                                            activeUser.saveFilesList(undefined, "podcasts", false, function() {});
                                                            if( $(podId)){
                                                            $(podId).removeClass("deletepoditembtn").addClass("downloadpoditembtn");
                                                            }
                                                            }
                                                            $(".podcastitemsul").listview("refresh");
                                                            setDownloadPodItemBtn();
                                                            playListPodcastSourceList = podcast.items;
                                                            setPagePadderDiv("playlistPodcastScroller", false, "podcast");
                                                            }
                                                            });
                              }
                              }
                              } catch (e) {
                              errorHandler("deletepoditembtn vclick", e);
                              }
                              });
}

function setDeletePDFPodcastBtnItem() {
    $(".deletepdfpoditembtn").off("vclick");
    $(".deletepdfpoditembtn").on("vclick", function(event) {
                                 try {
                                 event.preventDefault();
                                 var id = $(event.currentTarget).attr("id");
                                 var ids = id.split("-");
                                 var podcastid = ids[1] + "-" + ids[2];
                                 var podcastitemid = ids[3];
                                 var podcast = activeUser.getPodcastById(podcastid);
                                 if (podcast !== undefined) {
                                 var podcastItem = podcast.getPodcastItemById(podcastitemid);
                                 if (podcastItem != undefined) {
                                 currentPodcastItem=podcastItem;
                                 podcastItem.deletePodcastItem(function(ret) {
                                                               if (ret === true) {
                                                               if(currentPodcastItem!==undefined){
                                                               currentPodcastItem.isdownloaded = false;
                                                               currentPodcastItem.fileuri = "";
                                                               var pdfId = "#downloadpoditem-" + currentPodcastItem.podcastid + "-" + currentPodcastItem.id;
                                                               activeUser.saveFilesList(undefined, "podcasts", false, function() {});
                                                               if( $(pdfId)){
                                                               $(pdfId).removeClass("deletepdfpoditembtn").addClass("downloadpdfpoditembtn");
                                                               }
                                                               }
                                                               $(".podcastitemsul").listview("refresh");
                                                               setPlayPDFPodcastBtnItem();
                                                               setPagePadderDiv("playlistPodcastScroller", false, "podcast");
                                                               }
                                                               });
                                 }else{
                                 currentPodcastItem = undefined;
                                 }
                                 }
                                 } catch (e) {
                                 errorHandler("deletepdfpoditembtn vclick", e);
                                 }
                                 });
}

function setPlayPodcastBtnItem() {
    try {
        $(".playpoditembtn").off("vclick");
        $(".playpoditembtn").on("vclick", function(event) {
                                try {
                                event.preventDefault();
                                var id = $(event.currentTarget).attr("id");
                                var ids = id.split("-");
                                var podcastid = ids[1] + "-" + ids[2];
                                var podcastitemid = ids[3];
                                var podcast = activeUser.getPodcastById(podcastid);
                                if (podcast !== undefined) {
                                var podcastItem = podcast.getPodcastItemById(podcastitemid);
                                if (podcastItem != undefined) {
                                playPodcastTheory(podcastItem);
                                setUserMediaPosition("podcast", ids[1].toString(), ids[2].toString(), ids[3]);
                                }
                                }
                                } catch (e) {
                                errorHandler("playpoditembtn vclick", e);
                                }
                                });
    } catch (e) {
        errorHandler("setPlayPodcastBtnItem", e);
    }
}

function setPlayPDFPodcastBtnItem() {
    try {
        $(".downloadpdfpoditembtn").off("vclick");
        $(".downloadpdfpoditembtn").on("vclick", function(event) {
                                       try {
                                       event.preventDefault();
                                       showPleaseWait();
                                       var id = $(event.currentTarget).attr("id");
                                       var ids = id.split("-");
                                       var podcastid = ids[1] + "-" + ids[2];
                                       var podcastitemid = ids[3];
                                       var podcast = activeUser.getPodcastById(podcastid);
                                       if (podcast !== undefined) {
                                       var podcastItem = podcast.getPodcastItemById(podcastitemid);
                                       if (podcastItem !== undefined && podcastItem.isdownloaded === false && deviceIsOnline === false) {
                                       hidePleaseWait();
                                       msgStr = resources.mediadownloadpdfconnerror;
                                       msgTitle = resources.connError;
                                       msgBtnValue = resources.btnOk;
                                       navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                                       } else {
                                       if(podcastItem!==undefined){
                                       currentPodcastItem = podcastItem;
                                       currentPodcastItem.downloadPodcastItem(function(ret){
                                                                              if (ret === true) {
                                                                              $(".podcastitemsul").listview("refresh");
                                                                              setDeletePDFPodcastBtnItem();
                                                                              playListPodcastSourceList = podcast.items;
                                                                              setPagePadderDiv("playlistPodcastScroller", false, "podcast");
                                                                              }
                                                                              });
                                       }else{
                                       currentPodcastItem = undefined;
                                       }
                                       var courseid = podcast.courseid;
                                       var moduleid = podcast.moduleid;
                                       pdfItemDirectory = moduleid.toString();
                                       pdfDirectory =pdfItemDirectory;
                                       if (activeCourse === undefined || (activeCourse!==undefined && activeCourse.courseid!==courseid)) {
                                       activeCourse = portalCourses.getCourseById(courseid);
                                       }
                                       
                                       if (activeCourse !== undefined) {
                                       activeModuleGroup=undefined;
                                       if (activeModuleGroup === undefined || (activeModuleGroup!==undefined && activeModuleGroup.courseid!==courseid)){
                                       activeModuleGroup = activeCourse.getModuleGroupByModuleId(moduleid);
                                       }
                                       if(activeModuleGroup!==undefined){
                                       activeModule = activeModuleGroup.getModuleById(moduleid);
                                       
                                       }
                                       if (activeModule != undefined) {
                                       itemPdfFile = "lessonmaterial.pdf";
                                       viewFile = "lessonmaterial.pdf";
                                       if(currentPodcastItem!==undefined  && currentPodcastItem.fileuri.length > 0){
                                       pdfItemviewFile = currentPodcastItem.fileuri;
                                       currentPodcastItem.isdownloaded = true;
                                       
                                       if (device.platform === "Android" || device.platform === "iOS") {
                                       androidPDFView(pdfItemviewFile);
                                       } else {
                                       openWebView(pdfItemviewFile);
                                       }
                                       }else{
                                       
                                       var tm = activeModule.getTheoryModule();
                                       var appName = configs.getCustom("CS_PORTAL_NAME");
                                       tm.pdfurl = "https://lessonstructure.eteacher.pro/default.aspx?basemoduleid=" + activeModule.basemoduleid + "&PortalName=" + appName;
                                       if (theoryMediaDir != undefined) {
                                       viewFile = "lessonmaterial.pdf";
                                       showPleaseWait();
                                       theoryMediaDir.getDirectory(pdfDirectory, {
                                                                   create: true,
                                                                   exclusive: false
                                                                   }, checkPDFPodcastDirExists, fail);
                                       
                                       
                                       }
                                       }
                                       }
                                       }
                                       }
                                       }
                                       } catch (e) {
                                       errorHandler("downloadpdfpoditembtn vclick", e);
                                       }
                                       });
        $(".playpdfpoditembtn").off("vclick");
        $(".playpdfpoditembtn").on("vclick", function(event) {
                                   try {
                                   event.preventDefault();
                                   showPleaseWait();
                                   var id = $(event.currentTarget).attr("id");
                                   var ids = id.split("-");
                                   var podcastid = ids[1] + "-" + ids[2];
                                   var podcastitemid = ids[3];
                                   var podcast = activeUser.getPodcastById(podcastid);
                                   if (podcast !== undefined) {
                                   var podcastItem = podcast.getPodcastItemById(podcastitemid);
                                   if (podcastItem !== undefined && podcastItem.isdownloaded === false && deviceIsOnline === false) {
                                   hidePleaseWait();
                                   msgStr = resources.mediadownloadpdfconnerror;
                                   msgTitle = resources.connError;
                                   msgBtnValue = resources.btnOk;
                                   navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                                   } else {
                                   if(podcastItem!==undefined){
                                   currentPodcastItem = podcastItem;
                                   }else{
                                   currentPodcastItem = undefined;
                                   }
                                   var courseid = podcast.courseid;
                                   var moduleid = podcast.moduleid;
                                   pdfItemDirectory = moduleid.toString();
                                   pdfDirectory =pdfItemDirectory;
                                   if (activeCourse === undefined || (activeCourse!==undefined && activeCourse.courseid!==courseid)) {
                                   activeCourse = portalCourses.getCourseById(courseid);
                                   }
                                   
                                   if (activeCourse !== undefined) {
                                   activeModuleGroup=undefined;
                                   if (activeModuleGroup === undefined || (activeModuleGroup!==undefined && activeModuleGroup.courseid!==courseid)){
                                   activeModuleGroup = activeCourse.getModuleGroupByModuleId(moduleid);
                                   }
                                   if(activeModuleGroup!==undefined){
                                   activeModule = activeModuleGroup.getModuleById(moduleid);
                                   
                                   }
                                   if (activeModule != undefined) {
                                   itemPdfFile = "lessonmaterial.pdf";
                                   viewFile = "lessonmaterial.pdf";
                                   if(currentPodcastItem!==undefined  && currentPodcastItem.fileuri.length > 0){
                                   pdfItemviewFile = currentPodcastItem.fileuri;
                                   currentPodcastItem.isdownloaded = true;
                                   
                                   if (device.platform === "Android" || device.platform === "iOS") {
                                   androidPDFView(pdfItemviewFile);
                                   } else {
                                   openWebView(pdfItemviewFile);
                                   }
                                   }else{
                                   
                                   var tm = activeModule.getTheoryModule();
                                   var appName = configs.getCustom("CS_PORTAL_NAME");
                                   tm.pdfurl = "https://lessonstructure.eteacher.pro/default.aspx?basemoduleid=" + activeModule.basemoduleid + "&PortalName=" + appName;
                                   if (theoryMediaDir != undefined) {
                                   viewFile = "lessonmaterial.pdf";
                                   showPleaseWait();
                                   theoryMediaDir.getDirectory(pdfDirectory, {
                                                               create: true,
                                                               exclusive: false
                                                               }, checkPDFPodcastDirExists, fail);
                                   
                                   
                                   }
                                   }
                                   }
                                   }
                                   }
                                   }
                                   } catch (e) {
                                   errorHandler("playpdfpoditembtn vclick", e);
                                   }
                                   });
    } catch (e) {
        errorHandler("setPlayPDFPodcastBtnItem", e);
        return false;
    }
}
function hidePodVideoPlayer() {
    try {
        $("#audiopodplayerdiv").hide();
        $("#videopodplayerdiv").hide();
        $("#mediaplaycontainerdiv").hide(200);
        var containertype = tablet === false ? "podcast" : "podcast";
        setTimeout(function() {
                   setPagePadderDiv("playlistPodcastScroller", true, containertype);
                   }, 300);
    } catch (e) {
        errorHandler("hidePodVideoPlayer", e);
    }
}
function podPlaylistActive(isActive, className, type){
    if(isActive===true){
        $(".podcastitemdiv").removeClass("playing");
        if(className.substring(0,1)!=="#"){
            className="#" + className;
        }
        $(className).addClass("playing");
        var playingClassName = "";
        playingClassName = className.replace("theoryitemdiv", "playpoditem");
        $(playingClassName + " div.playitembtn").addClass("playbtnactive");
    } else{
        $(".podcastitemdiv").removeClass("playing");
        $(".playitembtn").removeClass("playbtnactive");
    }
}

function checkPDFPodcastDirExists(dir) {
    try {
        var existingFileName = viewFile;
        if(dir !==undefined){
            itemPdfile = "lessonmaterial.pdf";
            dir.getFile(existingFileName, {
                        create: false
                        }, function(fileEntry) {
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
                                    remoteUrl += "?basemoduleid=" + activeModule.basemoduleid + "&PortalName=" + configs.getCustom("CS_PORTAL_NAME");
                                    remoteFile = encodeURI(remoteUrl);
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
                                    $(".podcastitemsul").listview("refresh");
                                    }
                                    if (device.platform === "Android" || device.platform === "iOS") {
                                    androidPDFView(entry.toURL());
                                    } else {
                                    openWebView(entry.toURL());
                                    }
                                    };
                                    var onError = function(error) {
                                    if (error.code == 3) {
                                    if (device.platform === "Android" || device.platform === "iOS") {
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
        }
    } catch (e) {
        errorHandler("checkPDFPodcastDirExists", e);
    }
}
function succall()
{
	console.log("course podcast url");
}