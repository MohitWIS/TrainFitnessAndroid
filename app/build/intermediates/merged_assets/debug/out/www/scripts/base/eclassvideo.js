var podcastsOK = true;
var currentPodPlaylistNo = 0;
var videoPodSourceList = "";
var eClassSourceList;
var podcastsFirstLoad = true;
var getUserPodcastsOk = true;
$(document).on("pagecreate", "#eclassvideopage", function() {
               mediaRefreshing = false;
               $(".ui-header").on("touchmove",function(e){e.preventDefault();});
               $(".ui-footer").on("touchmove",function(e){e.preventDefault();});
               var height = $(window).height() - $("header", $("body").pagecontainer("getActivePage")).height();
               $("#eclasscontent").css("height", height);
               if (fileMainDir != undefined && mediaDataDir === undefined) {
               getUserRootDir(function(ret) {
                              if (mediaDataDir !== undefined && theoryMediaDir === undefined) {
                              mediaDataDir.getDirectory("TheoryMedia", {
                                                        create: true
                                                        }, getTheoryMediaDataDir, onError);
                              }
                              
                              });
               
               }
               
               activeTab = "eclass";
               $("#eclasstab").addClass("fronttab");
               
               });
$(document).on("pagebeforeshow", "#eclassvideopage", function(e) {
               try {
               loadCoursePage = false;
               startupPageid = "#eclassvideopage";
               setUserPosition(false, "#eclassvideopage", false);
               pageLoad = "#eclassvideopage";
               
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
               $("#eclassvideopage").addClass("etpmobile");
               $(".ui-content").addClass("etpmobile");
               }
               $("#eclassvideopage").removeClass("playlistview");
               if (iphone5 === true) {
               $(".ui-page").addClass("iphone5");
               $(".ui-content").addClass("iphone5");
               $(".ui-panel").addClass("iphone5");
               $(".ui-panel-content-wrap-closed").addClass("iphone5");
               $("#eclasscontent").addClass("iphone5");
               $("#eclasscontent").addClass("iphone5");
               $(".coursemenupadderdiv").addClass("iphone5");
               $("#eclasstabcontainer").addClass("iphone5");
               $("#eclasseclassplaylistheaderbar").addClass("iphone5");
               $("#eclasseclassplaylistheader").addClass("iphone5");
               $(".playlistuldiv").addClass("iphone5");
               $("#eclassplaycontainerdiv").addClass("iphone5");
               }
               $("#eclasstabcontainer").removeClass("plshowed");
               if (tablet === false) {
               $(".ui-panel-content-wrap").addClass("fullscreenmobile");
               }
               
               var height = $(window).height() - $("header", $("body").pagecontainer("getActivePage")).height();
               $("#eclasscontent").css("height", height);
               
               $("#eclassplaycontainerdiv").show();
               
               $(".tabscontentitem").removeClass("fronttab");
               rotation = 180;
               var contentHeight = $(window).height() - $("header", $("body").pagecontainer("getActivePage")).height();
               $("#eclasstab").css("height", contentHeight);
               setTimeout(function() {
                          eClassScroller = new IScroll("#eclassvideodiv", {
                                                       bounce: false
                                                       });
                          }, 0);
               setTimeout(function() {
                          eClassPlaylistScroller = new IScroll("#eclassplaylistdiv", {
                                                               bounce: false
                                                               });
                          }, 0);
               
               $("#eclasstab").removeClass("fronttab");
               pageLoad = "#eclassvideopage";
               
               $("#noeclassdiv").show();
               $("#noeclassdiv").html(resources.downloadingeclasses);
               
               showPleaseWait();
               var mediaListSet = $.Deferred();
               
               if (mediaInit === true && mediaRefreshing === false) {
                resetFileDownload(true);
                mediaRefreshing = true;
               }
               mediaListSet.then(function() {
                                 activeUser.getStoredFilesListAsync("eclasses", mediaInit, function(retVal) {
                                                                    if(deviceIsOnline===false && retVal===false && ignoreWarnings===false){
                                                                    ignoreWarnings = true;
                                                                    msgStr = resources.refreshmedia;
                                                                    msgTitle = resources.connError;
                                                                    msgBtnValue = resources.btnOk;
                                                                    navigator.notification.confirm(msgStr, function() {getEClassesForUserAsync();}, msgTitle, msgBtnValue);
                                                                    }else{
                                                                    getEClassesForUserAsync();
                                                                    }
                                                                    setTimeout(function() {
                                                                               setPagePadderDiv("eClassScroller", true);
                                                                               ignoreWarnings = false;
                                                                               }, 600);
                                                                    
                                                                    });
                                 
                                 }).then(seteClassInitialTabs).then(function() {
                                                                    mediaRefreshing = false;
                                                                    });
               mediaListSet.resolve();
               
               } catch (e) {
               errorHandler("eclassvideopage.pagebeforeshow", e);
               }
               });
$(document).on("pagecontainershow", "#eclassvideopage", function(e) {
               try {
               pageLoad = "#eclassvideopage";
               showPleaseWait();
               if ($("#eclasscategories").children().length > 0) {
               $("#noeclassdiv").hide();
               } else {
               $("#noeclassdiv").show();
               showPleaseWait();
               }
               
               setTimeout(function() {
                          setUserPosition(false, "#eclassvideopage", false);
                          }, 300);
               } catch (e) {
               errorHandler("eclassvideopage.pageshow", e);
               }
               });
function seteClassInitialTabs() {
    try {
        
        if (eClassVideoPlayer !== undefined) {
            eClassVideoPlayer.pause();
        }
        $("#eclassplaycontainerdiv").hide();
        if ($("#eclasstabcontainer").hasClass("plshowing")) {
            $("#eclasstabcontainer").removeClass("plshowing");
            $("#eclassplaylistclosebtn").trigger("vclick");
        }
        
        activeTab = "eclass";
        $("#eclasstab").show();
        $("#eclasstab").addClass("fronttab");
        $(".podheadbck").removeClass("headerhide");
        $("#eclasscontent").removeClass("noheaderbar");
        setTimeout(function() {
                   setPagePadderDiv("eClassScroller", true);
                   }, 300);
        $("html,body").animate({
                               scrollTop: 0
                               }, 300);
        
        setTimeout(function() {
                   setPagePadderDiv("eClassScroller", true);
                   }, 300);
        $("#eclassviewheader").html(resources.eclasses);
        $("#eclassplaycontainerdiv").hide();
        
        $("#vidfooterleftbckbtn").off("vclick");
        $("#vidfooterleftbckbtn").on("vclick", function(event) {
                                     event.preventDefault();
                                     audioPaused = true;
                                     videoPaused = true;
                                     destroyPlayers();
                                     if($("#eclasstabcontainer").hasClass("plshowing")){
                                     $("#eclassvideopage").removeClass("playlistview");
                                     $("#eclassplaylisttab").show();
                                     $(".podheadbck").removeClass("headerhide");
                                     $("#eclasscontent").removeClass("noheaderbar");
                                     $("#eclasstabcontainer").removeClass("plshowing");
                                     $("div.flipper").css("transform", "rotateY(0deg)");
                                     $("html,body").animate({
                                                            scrollTop: 0
                                                            }, 300);
                                     seteClassesBtn();
                                     setPagePadderDiv("eClassScroller", true);
                                     }else{
                                     setPagePadderDiv("eClassScroller", true);
                                     $("#eclassvideopage").removeClass("playlistview");
                                     $.mobile.back();
                                     }
                                     });
        
        $("#ecclosebtn").off("vclick");
        $("#ecclosebtn").on("vclick", function(event) {
                            if(menubtnOk===true){
                            $("#vidfooterleftbckbtn").trigger("vclick");
                            setTimeout(function(){menubtnOk=true;},300);
                            }
                            
                            });
        
        
        
        $("#eclassplaycontainerdiv").hide();
        
        setUserPosition(false, "#eclassvideopage", false);
        if (activeTab === undefined || activeTab.length === 0 || activeTab === "course") {
            activeTab = "eclass";
        }
        
    } catch (e) {}
}

function getEClassesForUserAsync() {
    try {
        var deferred = $.Deferred();
        getEClassesForUser(function(retVal) {
                           deferred.resolve(retVal);
                           });
        return deferred.promise();
    } catch (e) {
        errorHandler("getEClassesForUserAsync", e);
    }
}

function getEClassesForUser(returnFunction) {
    try {
        if (getUserVideosOk === true) {
            getUserVideosOk = false;
            var contentHeight = 0;
            var libraryId = eClassLibraryID;
            activeUser.getUserVideos(libraryId, coursesInit, function(ret) {
                                     if (ret == undefined || ret.length == 0) {
                                     $("#noeclassdiv").html(resources.noavailablevideos);
                                     $("#noeclassdiv").show();
                                     } else {
                                     $("#noeclassdiv").html(resources.noavailablevideos);
                                     $("#noeclassdiv").hide();
                                     $("#eclasscategories").html(ret);
                                     $("#eclasscategories").trigger("create");
                                     $("#eclasscategories").listview();
                                     setTimeout(function() {setPagePadderDiv("eClassScroller", true);},1200);
                                     setTimeout(function() {
                                                $(".videocategorymedia").off("vclick");
                                                $(".videocategorymedia").on("vclick", function(event) {
                                                                            try {
                                                                            if (medialistingOK === true) {
                                                                            medialistingOK = false;
                                                                            event.preventDefault();
                                                                            var current = $(this).closest(".ui-collapsible");
                                                                            var id = $(event.currentTarget).attr("id");
                                                                            if ($(this).hasClass("ui-collapsible-collapsed") === true) {
                                                                             $(".ui-collapsible").not(".ui-collapsible-collapsed").find("ui-collapsible-heading-toggle").click();
                                                                                                            $(".ui-collapsible-content", current).slideDown(300);
                                                                            $(this).collapsible("expand");
                                                                            setTimeout(function() {
                                                                                       medialistingOK = true;
                                                                                       setPagePadderDiv("eClassScroller", false);
                                                                                       }, 300);
                                                                            } else {
                                                                            $(".ui-collapsible-content", current).slideUp(300);
                                                                            setTimeout(function() {
                                                                                $("#" + id).collapsible("collapse");
                                                                            }, 300);
                                                                            //$("#" + id).collapsible("collapse");
                                                                            setTimeout(function() {
                                                                                       medialistingOK = true;
                                                                                       setPagePadderDiv("eClassScroller", false);
                                                                                       }, 300);
                                                                            }
                                                                            }
                                                                            } catch (e) {
                                                                            errorHandler("videocategorymedia", e);
                                                                            }
                                                                            });
                                                seteClassesBtn();
                                                setPagePadderDiv("eClassScrollerr", true);
                                                }, 300);
                                     seteClassesBtn();
                                     }
                                     
                                     setTimeout(function() {
                                                getUserVideosOk = true;
                                                setPagePadderDiv("eClassScrollerr", true);
                                                }, 300);
                                     returnFunction(true);
                                     });
        } else {
            returnFunction(true);
        }
    } catch (e) {
        errorHandler("getEClassesForUser", e);
        getUserVideosOk = true;
        returnFunction(false);
    }
}
function seteClassesBtn() {
    try {
        $(".videoseriesbtn").off("vclick");
        $(".videoseriesbtn").on("vclick", function(event) {
                                try {
                                if (mediaSeriesBtnOk === true) {
                                mediaSeriesBtnOk = false;
                                $("#eclassvideopage").addClass("playlistview");
                                var id = $(event.currentTarget).attr("id");
                                var ids = id.split("-");
                                var tabId = ids[1];
                                var catId = ids[2];
                                var seriesId = ids[3];
                                currentPlayListCategory = id;
                                event.preventDefault();
                                $("#eclassul").empty();
                                $("#eclasscategoryul").removeClass("playlistsortable");
                                $("#eclasscategoryul").removeClass("ui-sortable");
                                $(".mejs-controls").removeClass("etpaudio");
                                hideEVideoPlayer();
                                videoPlayerPlay = false;
                                if (activeUser.eclasses !== undefined && activeUser.eclasses.length === 0) {
                                if (activeUser.existeClasses !== undefined && activeUser.existeClasses.length > 0) {
                                activeUser.eclasses = activeUser.existeClasses;
                                }
                                }
                                var category = activeUser.getVideocategoryById(tabId, catId, seriesId);
                                $("#eclassplaycontainerdiv").hide();
                                
                                if (category !== undefined) {
                                saveFilesListAll();
                                var categoryTitle = category.category;
                                category.getVideoCategoryLi("eclasses",function(ret) {
                                                            
                                                            $("#eclassplaylistheader").html(category.category);
                                                            
                                                            setUserMediaPosition("video", category.tabid.toString(), category.categoryid.toString(), "");
                                                            $("#eclasscategoryul").html(ret);
                                                            $("#eclasscategoryul").trigger("create");
                                                            $("#eclasscategoryul").listview();
                                                            $("#eclasscategoryul").listview("refresh");
                                                            
                                                            setPlayEclassBtn();
                                                            setDeleteEclassBtn();
                                                            setDownloadEclassBtn();
                                                            setDownloadAllEclassesBtn();
                                                            setDeleteAllEclassesBtn();
                                                            
                                                            var vidUrl = "";
                                                            if (category.videos !== undefined && category.videos.length > 0) {
                                                            playListVideoSourceList = category.videos;
                                                            var video = playListVideoSourceList[0];
                                                            vidUrl = video.isdownloaded === false ? video.videopath : video.fileuri;
                                                            if (video.isdownloaded === false && (vidUrl.indexOf("http:") < 0 || vidUrl.indexOf("https:") < 0)) {
                                                                //console.log('1');
                                                            vidUrl = vidUrl;
                                                            //vidUrl = "http://" + vidUrl;
                                                            }
                                                            $("#eclassplayer").attr("src", vidUrl);
                                                            var videoPosterImg = tablet === true ? "css/client/images/videoposter.png" : "css/client/images/videoposter1.png";
                                                            var vidtag = '<video id="eclassplayer" class="videoplayer"  poster="' + videoPosterImg + '" preload="metadata" src="' + vidUrl + '" type="video/mp4"></video>';
                                                            $("#eclassplayerdiv").html(vidtag);
                                                            if (device.platform !== "Android") {
                                                            eClassVideoPlayer = new MediaElementPlayer("#eclassplayer", {
                                                                                                      iPadUseNativeControls: false,
                                                                                                      iPhoneUseNativeControls: false,
                                                                                                      AndroidUseNativeControls: false,
                                                                                                      pauseOtherPlayers: true,
                                                                                                      alwaysShowControls: true,
                                                                                                      features: ["playpause", "progress", "current", "duration", "fullscreen"],
                                                                                                      success: function(vidpay, node) {
                                                                                                      vidpay.addEventListener("ended", function(e) {
                                                                                                                              videoPaused = true;
                                                                                                                              videoPlayNext(e.target);
                                                                                                                              }, false);
                                                                                                      vidpay.addEventListener("loadedmetadata", function(e) {
                                                                                                                              $("#eclassplayerdiv .mejs-playpause-button button").removeClass("audioloading");
                                                                                                                              $(".videoplayer .mejs-overlay-loading").show();
                                                                                                                              if (videoPlayerPlay === true) {
                                                                                                                              videoPlayerPlay = false;
                                                                                                                              vidpay.play();
                                                                                                                              }
                                                                                                                              }, false);
                                                                                                      vidpay.addEventListener("timeupdate", function(e) {}, false);
                                                                                                      vidpay.addEventListener("pause", function(e) {
                                                                                                                              if (videoPaused === false) {
                                                                                                                              $(".videoplayer .mejs-overlay-loading").show();
                                                                                                                              /* setTimeout(function() {
                                                                                                                               if (videoPaused === false) {
                                                                                                                               vidpay.play();
                                                                                                                               }
                                                                                                                               }, 10000);
                                                                                                                               */
                                                                                                                              }
                                                                                                                              }, false);
                                                                                                      vidpay.addEventListener("play", function(e) {
                                                                                                                              $(".videoplayer .mejs-overlay-loading").hide();
                                                                                                                              $("#eclassplayerdiv .mejs-playpause-button button").removeClass("audioloading");
                                                                                                                              videoPaused = false;
                                                                                                                              videoPlayerPlay = false;
                                                                                                                              var videoPlaylistItem = playListVideoSourceList[currentVideoPlaylistNo];
                                                                                                                              }, false);
                                                                                                      if (vidUrl !== undefined && vidUrl.length > 0) {
                                                                                                      vidpay.setSrc(vidUrl);
                                                                                                      vidpay.load();
                                                                                                      }
                                                                                                      }
                                                                                                      });
                                                            } else {
                                                            eClassVideoPlayer = document.getElementById("eclassplayer");
                                                            }
                                                            if (tablet === false) {
                                                            var vidPlayer3 = document.getElementById("eclassplayer");
                                                            if (vidPlayer3 !== undefined) {
                                                            vidPlayer3.addEventListener("webkitendfullscreen", function() {
                                                                                        videoPlayerPlay = false;
                                                                                        videoPaused = true;
                                                                                        eClassVideoPlayer.pause();
                                                                                        eClassVideoPlayer.setSrc("");
                                                                                        if (tablet === false) {
                                                                                        $("#eclassplaycontainerdiv").hide();
                                                                                        }
                                                                                        setPagePadderDiv("eClassPlaylistScroller", false, "video");
                                                                                        }, false);
                                                            }
                                                            }
                                                            $(".videoplayer .mejs-play").off("vclick");
                                                            $(".videoplayer .mejs-play").on("vclick", function(event) {
                                                                                            try {
                                                                                            if ($(this).hasClass("mejs-pause")) {
                                                                                            videoPaused = true;
                                                                                            } else {
                                                                                            videoPaused = false;
                                                                                            }
                                                                                            } catch (e) {
                                                                                            errorHandler("mejs vclick", e);
                                                                                            }
                                                                                            });
                                                            }
                                                            setTimeout(function() {
                                                                       $("#eclasstabcontainer").addClass("plshowing");
                                                                       $("#eclasstabcontainer").addClass("plshowed");
                                                                       $("#eclassplaylisttab").show();
                                                                       $(".podheadbck").addClass("headerhide");
                                                                       $("div.flipper").css("transform", "rotateY(-180deg)");
                                                                       $("html,body").animate({
                                                                                              scrollTop: 0
                                                                                              }, 300);
                                                                       setPagePadderDiv("eClassPlaylistScroller", true, "video");
                                                                       setPlaylistCloseBtn();
                                                                       setPagePadderDiv("eClassPlaylistScroller", true, "video");
                                                                       }, 300);
                                                            });
                                }
                                }
                                event.stopPropagation();
                                } catch (e) {}
                                setTimeout(function() {
                                           mediaSeriesBtnOk = true;
                                           }, 300);
                                });
        
        $("#btnpodvidplayerhide").off("vclick");
        $("#btnpodvidplayerhide").on("vclick", function(event) {
                                     try {
                                     event.preventDefault();
                                     if (device.platform !== "Android") {
                                     $("#eclassplaycontainerdiv").hide(200);
                                     var containertype = tablet === true ? "video" : "video";
                                     setTimeout(function() {
                                                setPagePadderDiv("eClassPlaylistScroller", true, containertype);
                                                }, 300);
                                     }
                                     } catch (e) {
                                     errorHandler("btnpodvidplayerhide vclick", e);
                                     }
                                     });
        
        setTimeout(function() {setPagePadderDiv("eClassScroller", false);},600);
    } catch (e) {
        errorHandler("seteClassesBtn", e);
    }
}
function setPlayEclassBtn() {
    $(".playeclassbtn").off("vclick");
    $(".playeclassbtn").on("vclick", function(event) {
                           try {
                           event.preventDefault();
                           videoPaused = false;
                           var id = $(event.currentTarget).attr("id");
                           var ids = id.split("-");
                           var tabId = ids[1];
                           var videocategoryid = ids[2];
                           var seriesid = ids[3];
                           var videoid = ids[4];
                           var category = activeUser.getVideocategoryById(tabId, videocategoryid, seriesid);
                           if (category !== undefined) {
                           var video = category.getVideoItemById(videoid);
                           if (video != undefined) {
                           if (video.isdownloaded === false && deviceIsOnline === false) {
                           msgStr = resources.mediaconnectionfileerror;
                           msgTitle = resources.connError;
                           msgBtnValue = resources.btnOk;
                           navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                           } else {
                           if (device.platform !== "Android") {
                           playVideoEclass(video);
                           } else {
                           playEclassAndroid(video);
                           }
                           setUserMediaPosition("video", category.tabid.toString(), category.categoryid.toString(), videoid);
                           }
                           }
                           }
                           } catch (e) {
                           errorHandler("playvideobtn vclick", e);
                           }
                           });
}

function setDeleteEclassBtn() {
    $(".deleteeclassbtn").off("vclick");
    $(".deleteeclassbtn").on("vclick", function(event) {
                             try {
                             event.preventDefault();
                             var id = $(event.currentTarget).attr("id");
                             var ids = id.split("-");
                             var tabId = ids[1];
                             var videocategoryid = ids[2];
                             var seriesId = ids[3];
                             var videoid = ids[4];
                             var category = activeUser.getVideocategoryById(tabId, videocategoryid, seriesId);
                             if (category !== undefined) {
                             var video = category.getVideoItemById(videoid);
                             if (video != undefined) {
                             video.deleteVideoItem("eclasses", function(ret) {
                                                   if (ret === true) {
                                                   $(".podcastitemsul").listview("refresh");
                                                   activeUser.saveFilesList(undefined, "eclasses", false, function(){});
                                                   setDownloadEclassBtn();
                                                   setPagePadderDiv("eClassScroller", false);
                                                   }
                                                   });
                             }
                             }
                             } catch (e) {
                             errorHandler("deletevideobtn vclick", e);
                             }
                             });
}
function setDownloadEclassBtn() {
    $(".downloadeclassbtn").off("vclick");
    $(".downloadeclassbtn").on("vclick", function(event) {
                               try {
                               event.preventDefault();
                               if (deviceIsOnline === false) {
                               msgStr = resources.mediaconnectionfileerror;
                               msgTitle = resources.connError;
                               msgBtnValue = resources.btnOk;
                               navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                               } else {
                               var id = $(event.currentTarget).attr("id");
                               var ids = id.split("-");
                               var tabId = ids[1];
                               var videocategoryid = ids[2];
                               var seriesId = ids[3];
                               var videoid = ids[4];
                               var category = activeUser.getVideocategoryById(tabId, videocategoryid, seriesId);
                               if (category !== undefined) {
                               var video = category.getVideoItemById(videoid);
                               if (video != undefined) {
                               video.downloadVideoItem(true, "eclasses", function(ret) {
                                                       if (ret === true) {
                                                       $(".podcastitemsul").listview("refresh");
                                                       activeUser.saveFilesList(undefined, "eclasses", true, function(){});
                                                       setDeleteEclassBtn();
                                                       playListVideoSourceList = category.videos;
                                                       setPagePadderDiv("eClassScroller", false);
                                                       }
                                                       });
                               }
                               }
                               }
                               } catch (e) {
                               errorHandler("downloadvideobtn vclick", e);
                               }
                               });
}
function setDownloadAllEclassesBtn() {
    $(".downloadalleclassbtn").off("vclick");
    $(".downloadalleclassbtn").on("vclick", function(event) {
                                  try {
                                  event.preventDefault();
                                  if (deviceIsOnline === false) {
                                  msgStr = resources.mediaconnectionfileerror;
                                  msgTitle = resources.connError;
                                  msgBtnValue = resources.btnOk;
                                  navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                                  } else {
                                  var btnId = $(event.currentTarget).attr("id");
                                  var ids = btnId.split("-");
                                  var tabId = ids[1];
                                  var categoryId = ids[2];
                                  var seriesId = ids[3];
                                  var category = activeUser.getVideocategoryById(tabId, categoryId, seriesId);
                                  if (category !== undefined) {
                                  msgStr = resources.downloadallvideosinfo;
                                  msgTitle = resources.myvideos;
                                  msgBtnValue = resources.btnOk;
                                  navigator.notification.confirm(msgStr, function() {
                                                                 category.downloadAllVideoItems(true, "eclasses", function(ret) {
                                                                                                $(".podcastitemsul").listview("refresh");
                                                                                                setDeleteAllEclassesBtn();
                                                                                                setDeleteEclassBtn();
                                                                                                playListVideoSourceList = category.videos;
                                                                                                setPagePadderDiv("eClassScroller", true);
                                                                                                });
                                                                 }, msgTitle, msgBtnValue);
                                  }
                                  }
                                  } catch (e) {
                                  errorHandler("setDownloadAllEclassesBtn vclick", e);
                                  }
                                  });
}
function setDeleteAllEclassesBtn() {
    $(".deletealleclassbtn").off("vclick");
    $(".deletealleclassbtn").on("vclick", function(event) {
                                try {
                                event.preventDefault();
                                var id = $(event.currentTarget).attr("id");
                                $("#" + id).attr("disabled", "disabled");
                                var ids = id.split("-");
                                var tabId = ids[1];
                                var videocategoryid = ids[2];
                                var seriesId = ids[3];
                                var category = activeUser.getVideocategoryById(tabId, videocategoryid, seriesId);
                                if (category !== undefined) {
                                category.deleteAllVideoItems("eclasses", function(ret) {
                                                             $(".podcastitemsul").listview("refresh");
                                                             setDownloadAllEclassesBtn();
                                                             setDownloadEclassBtn();
                                                             playListVideoSourceList = category.videos;
                                                             });
                                }
                                } catch (e) {
                                errorHandler("deleteallvideosbtn vclick", e);
                                }
                                });
}
function playVideoEclass(video) {
    try {
        var vidUrl = video.isdownloaded === false ? video.videopath : video.fileuri;
        if (video.isdownloaded === false && (vidUrl.indexOf("http:") < 0 || vidUrl.indexOf("https:") < 0)) {
            //console.log('2');
            vidUrl =  vidUrl;
            //vidUrl = "http://" + vidUrl;
        }
        if (tablet === true || (iosDevice === true && video.isdownloaded === true)) {
            $("#eclassplaycontainerdiv").slideDown(300, function() {
                                                   setPagePadderDiv("eClassPlaylistScroller", false, "video");
                                                   });
        } else {
            $("#eclassplaycontainerdiv").show();
            $("#eclassplayerdiv").show();
            hideEVideoPlayer();
            videoPlayerPlay = true;
            setPagePadderDiv("eClassPlaylistScroller", false, "video");
        }
        currentVideoPlaylistNo = video.seriesindex - 1;
        $("#eclassplayerdiv .mejs-time span.mejs-currenttime").html("00:00");
        $("#eclassplayerdiv .mejs-time span.mejs-duration").html("00:00");
        $("#eclassplayerdiv .mejs-time-current").css("width", 0);
        $("#eclassplayerdiv .mejs-time-handle").css("width", 0);
        $("#eclassplayerdiv .mejs-time-handle").css("left", 0);
        $("#eclassplayerdiv .mejs-time-loaded").css("width", 0);
        $("#eclassplayerdiv .mejs-time-float").css("display", "none");
        videoPlayerPlay = true;
        if (vidUrl !== undefined && vidUrl.length > 0) {
            eClassVideoPlayer.setSrc(vidUrl);
            eClassVideoPlayer.load();
        }
        setTimeout(function() {
                   var videoId = (video.videoid).replace("mp4", "");
                   activeUser.updateVideoViews(videoId, function(ret) {});
                   }, 300);
        if (vidUrl.indexOf("http://") > -1 || vidUrl.indexOf("https://") > -1) {
            //console.log('3');
            $("#eclassplayerdiv .mejs-playpause-button button").addClass("audioloading");
        }
        $(".videoplayer .mejs-overlay-loading").show();
        vidPlaylistActive(false, "", "");
        vidPlaylistActive(true, "#playvideo-" + video.categoryid + "-" + video.seriesid + "-" + video.videoid, "video");
        
    } catch (e) {
        errorHandler("playVideoEclass", e);
    }
}

function playEclassAndroid(video) {
    try {
        var vidUrl = video.isdownloaded === false ? video.videopath : video.fileuri;
        if (video.isdownloaded === false && (vidUrl.indexOf("http:") < 0 || vidUrl.indexOf("https:") < 0)) {
            //console.log('4');
            vidUrl =  vidUrl;
            //vidUrl = "http://" + vidUrl;
        }
        /*
         if (video.isdownloaded === true) {
         vidUrl = externalStorageVideoDir.toURL() + video.categoryid + "/" + video.filename;
         }
         */
        $("#eclassplayerdiv video").attr("sVidrorc", vidUrl);
        if (videoPlaying === false) {
            videoPlaying = true;
             window.plugins.streamingMedia.playVideo(vidUrl);
        }
        setTimeout(function() {
                   var videoId = (video.videoid).replace("mp4", "");
                   activeUser.updateVideoViews(videoId, function(ret) {});
                   videoPlaying = false;
                   }, 300);
        currentVideoPlaylistNo = video.seriesindex - 1;
        videoPlayerPlay = true;
        if (vidUrl.indexOf("http://") > -1 || vidUrl.indexOf("https://") > -1) {
            //console.log('5');
            $("#eclassplayerdiv .mejs-playpause-button button").addClass("audioloading");
        }
        $(".videoplayer .mejs-overlay-loading").show();
        vidPlaylistActive(false, "", "");
        vidPlaylistActive(true, "#podcastitemdiv-" + video.categoryid + "-" + video.seriesid + "-" + video.videoid, "video");
    } catch (e) {
        errorHandler("playEclassAndroid", e);
    }
}
function hideEVideoPlayer() {
    try {
        if (device.platform !== "Android") {
            $("#eclassplaycontainerdiv").hide(200);
            var containertype = tablet === true ? "video" : "video";
            setTimeout(function() {
                       setPagePadderDiv("eClassPlaylistScroller", true, containertype);
                       }, 300);
        }
    } catch (e) {
        errorHandler("hideEVideoPlayer", e);
    }
}
function vidPlaylistActive(isActive, className, type){
    if(isActive===true){
        $(".playeclassbtn").removeClass("playing");
        if(className.substring(0,1)!=="#"){
            className="#" + className;
        }
        $(className).addClass("playing");
        var playingClassName = "";
        playingClassName = className.replace("podcastitemdiv", "playvideo");
        $(playingClassName + " div.playitembtn").addClass("playbtnactive");
    } else{
        $(".podcastitemdiv").removeClass("playing");
        $(".playitembtn").removeClass("playbtnactive");
    }
    
}
function setPlaylistCloseBtn(){
    try{
        $("#eclassplaylistclosebtn").off("vclick");
        $("#eclassplaylistclosebtn").on("vclick", function(event) {
                                        event.preventDefault();
                                        audioPaused = true;
                                        videoPaused = true;
                                        destroyPlayers();
                                        $("#eclassplaylisttab").show();
                                        $("#eclasstabcontainer").removeClass("plshowing");
                                        $(".podheadbck").removeClass("headerhide");
                                        $("#eclasscontent").removeClass("noheaderbar");
                                        $("div.flipper").css("transform", "rotateY(0deg)");
                                        $("html,body").animate({
                                                               scrollTop: 0
                                                               }, 300);
                                        setUserMediaPosition("*", "*", "*", "");
                                        seteClassesBtn();
                                        setTimeout(function() {
                                                   if (eClassScroller !== undefined) {
                                                   setPagePadderDiv("eClassScroller", true);
                                                   if ($("#" + currentPlayListCategory)) {
                                                   eClassScroller.scrollToElement("#" + currentPlayListCategory);
                                                   }
                                                   }
                                                   }, 600);
                                        
                                        });
        return true;
    } catch (e) {
        return false;
    }
}