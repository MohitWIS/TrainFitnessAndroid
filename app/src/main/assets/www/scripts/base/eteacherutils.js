function removeHTMLTags(htmlString) {
    try {
        if (htmlString) {
            var mydiv = document.createElement("div");
            mydiv.innerHTML = htmlString;
            if (document.all) {
                return mydiv.innerText;
            } else {
                return mydiv.textContent;
            }
        }
    } catch (e) {
        errorHandler("removeHTMLTags", e);
    }
}
function destroyScrollers() {
    try {
        if (menuScroller !== null && menuScroller !== undefined) {
            menuScroller.destroy();
            menuScroller = null;
        }
        if (menuGroupScroller !== null && menuGroupScroller !== undefined) {
            menuGroupScroller.destroy();
            menuGroupScroller = null;
        }
        
        if (scoMenuScroller !== null && scoMenuScroller !== undefined) {
            scoMenuScroller.destroy();
            scoMenuScroller = null;
        }
        if (contentScroller !== null && contentScroller !== undefined) {
            contentScroller.destroy();
            contentScroller = null;
        }
        if (supportScroller !== null && supportScroller !== undefined) {
            supportScroller.destroy();
            supportScroller = null;
        }
        if (helpdeskScroller !== null && helpdeskScroller !== undefined) {
            helpdeskScroller.destroy();
            helpdeskScroller = null;
        }
        if (scheduleScroller !== null && scheduleScroller !== undefined) {
            scheduleScroller.destroy();
            scheduleScroller = null;
        }
        if (mapScroller !== null && mapScroller !== undefined) {
            mapScroller.destroy();
            mapScroller = null;
        }
        if (rhsMenuScroller !== null && rhsMenuScroller !== undefined) {
            rhsMenuScroller.destroy();
            rhsMenuScroller = null;
        }
        if (eClassScroller !== null && eClassScroller !== undefined) {
            eClassScroller.destroy();
            eClassScroller = null;
        }
        if (eClassPlaylistScroller !== null && eClassPlaylistScroller !== undefined) {
            eClassPlaylistScroller.destroy();
            eClassPlaylistScroller = null;
        }
    } catch (e) {
        errorHandler("destroyScrollers", e);
    }
}

function setPagePadderDiv(scrollerName, scrollTop, headerHide) {
    try {
        var padderHeight = 100;
        var wrapperHeight = 0;
        var contentHeight = 0;
        headerHide = headerHide===undefined ? false : headerHide;
        scrollTop = scrollTop === undefined ? false : scrollTop;
        var windowheight = window.innerHeight;
        var windowwidth = window.innerWidth;
        var coursePageFooter = $("#pagefooter").height();
        var menuHeader = $("#lhsmenupageheader").height();
        var contentHeader = $("#contentheader").height();
        if(headerHide===true){
            contentHeader = 0;
            menuHeader = 0;
        }
        var adjustHeight = 0;
        switch (scrollerName) {
            case "scoMenuScroller":
                if (scoMenuScroller !== null && scoMenuScroller !== undefined) {
                    $("#menucontentsectionscroller").css("height", (windowheight-coursePageFooter-menuHeader));
                    setTimeout(function() {
                               if (scoMenuScroller !== null && scoMenuScroller !== undefined) {
                               scoMenuScroller.refresh();
                               if (scrollTop) {
                               scoMenuScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            case "menuScroller":
                if (menuScroller !== null && menuScroller !== undefined) {
                    $("#menucontentcoursescroller").css("height", (windowheight-coursePageFooter-menuHeader)); //make it comment
                    setTimeout(function() {
                               if (menuScroller !== null && menuScroller !== undefined) {
                               menuScroller.refresh();
                               if (scrollTop) {
                               menuScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            case "menuGroupScroller":
                if (menuGroupScroller !== null && menuGroupScroller !== undefined) {
                    $("#menucontentgroupscroller").css("height", (windowheight-coursePageFooter-menuHeader));
                    setTimeout(function() {
                               if (menuGroupScroller !== null && menuGroupScroller !== undefined) {
                               menuGroupScroller.refresh();
                               if (scrollTop) {
                               menuGroupScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            case "contentScroller":
                if (contentScroller !== null && contentScroller !== undefined) {
                    $("#coursepagecontentwrapper").css("height", (windowheight-coursePageFooter-contentHeader));
                    setTimeout(function() {
                               if (contentScroller !== null && contentScroller !== undefined) {
                               contentScroller.refresh();
                               zoomContentScroller.refresh();
                               if (scrollTop) {
                               contentScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            case "helpdeskScroller":
                if (helpdeskScroller !== null && helpdeskScroller !== undefined) {
                    $("#helpdeskmaincontent").css("height", windowheight -  $(".podheadbck").height() - $("#helpdeskfooter").height());
                    setTimeout(function() {
                               if (helpdeskScroller !== null && helpdeskScroller !== undefined) {
                               helpdeskScroller.refresh();
                               if (scrollTop) {
                               helpdeskScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            case "videoPodcastScroller":
                if (videoPodcastScroller !== null && videoPodcastScroller !== undefined) {
                    $("#podcastcontent").css("height", windowheight - $(".podheadbck").height() - $("#podcastfooter").height());
                    $("#videopodcastdiv").css("height", windowheight);
                    setTimeout(function() {
                               if (videoPodcastScroller !== null && videoPodcastScroller !== undefined) {
                               videoPodcastScroller.refresh();
                               if (scrollTop) {
                               videoPodcastScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            case "userPlaylistScroller":
                if (userPlaylistScroller !== null && userPlaylistScroller !== undefined) {
                    $("#userplaylistdiv").css("height", windowheight - $(".podheadbck").height() - $("#podcastfooter").height());
                    setTimeout(function() {
                               if (userPlaylistScroller !== null && userPlaylistScroller !== undefined) {
                               userPlaylistScroller.refresh();
                               if (scrollTop) {
                               userPlaylistScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            case "playlistItemScroller":
                if (playlistItemScroller !== null && playlistItemScroller !== undefined) {
                    $("#playlisttrackdiv").css("height", windowheight  - $(".podheadbck").height() - $("#playlisttracksfooter").height());
                    setTimeout(function() {
                               if (playlistItemScroller !== null && playlistItemScroller !== undefined) {
                               playlistItemScroller.refresh();
                               if (scrollTop) {
                               $("#playlistheaderbar").show();
                               playlistItemScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            case "theoryPodcastScroller":
                if (theoryPodcastScroller !== null && theoryPodcastScroller !== undefined) {
                    $("#coursetheorypodcastdiv").css("height", windowheight - $(".podheadbck").height() -  $("#podcastfooter").height());
                    setTimeout(function() {
                               if (theoryPodcastScroller !== null && theoryPodcastScroller !== undefined) {
                               theoryPodcastScroller.refresh();
                               if (scrollTop) {
                               theoryPodcastScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            case "playlistPodcastScroller":
                if (playlistPodcastScroller !== null && playlistPodcastScroller !== undefined) {
                    if ($("#mediaplaycontainerdiv").is(":visible")) {
                        adjustHeight = $("#mediaplaycontainerdiv").height();
                    }
                    $("#podplaylistdiv").css("height", windowheight - $("#podcastfooter").height() - adjustHeight - $("#courseplaylistheaderbar").height() );
                    setTimeout(function() {
                               playlistPodcastScroller.refresh();
                               if (scrollTop) {
                               playlistPodcastScroller.scrollTo(0, 0);
                               }
                               }, 300);
                }
                break;
            case "audioPodcastScroller":
                if (audioPodcastScroller !== null && audioPodcastScroller !== undefined) {
                    $("#podcastcontent").css("height", windowheight - $(".podheadbck").height());
                    $("#audiopodcastdiv").css("height", windowheight);
                    setTimeout(function() {
                               if (audioPodcastScroller !== null && audioPodcastScroller !== undefined) {
                               audioPodcastScroller.refresh();
                               if (scrollTop) {
                               audioPodcastScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            case "eClassScroller":
                if (eClassScroller !== null && eClassScroller !== undefined) {
                    $("#eclassvideodiv").css("height", windowheight - $(".podheadbck").height() - $(".footerbar").height());
                    setTimeout(function() {
                               if (eClassScroller !== null && eClassScroller !== undefined) {
                               eClassScroller.refresh();
                               if (scrollTop) {
                               eClassScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            case "eClassPlaylistScroller":
                
                if (eClassPlaylistScroller !== null && eClassPlaylistScroller !== undefined) {
                    if ($(".mediaplaycontainerdiv").is(":visible")) {
                        adjustHeight = $(".mediaplaycontainerdiv").height();
                    }
                    $("#eclassplaylistdiv").css("height", windowheight -  adjustHeight  - $(".footerbar").height() - $("#eclassplaylistheaderbar").height());
                    setTimeout(function() {
                               if (eClassPlaylistScroller !== null && eClassPlaylistScroller !== undefined) {
                               eClassPlaylistScroller.refresh();
                               if (scrollTop) {
                               eClassPlaylistScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            case "playlistScroller":
                if (playlistScroller !== null && playlistScroller !== undefined) {
                    if ($("#userplaylistpodcastdiv").is(":visible")) {
                        adjustHeight = $("#userplaylistpodcastdiv").height() + 10;
                    } else {
                        if ($("#videoplaycontainerdiv").is(":visible")) {
                            adjustHeight = $("#videoplaycontainerdiv").height() + 10;
                        } else {
                            if ($("#audioplaycontainerdiv").is(":visible")) {
                                adjustHeight = $("#audioplaycontainerdiv").height() + 10;
                            }
                        }
                    }
                    $("#playlistdiv").css("height", "auto");
                    //$("#playlistdiv").css("height", windowheight - adjustHeight - $("#mediafooter").height());
                    setTimeout(function() {
                               playlistScroller.refresh();
                               if (scrollTop) {
                               $("#playlistheaderbar").show();
                               
                               playlistScroller.scrollTo(0, 0);
                               }
                               }, 300);
                }
                break;
            case "rhsMenuScroller":
                if (rhsMenuScroller !== null && rhsMenuScroller !== undefined) {
                    $("#rhsmenuscrollbar").css("height", windowheight);
                    setTimeout(function() {
                               if (rhsMenuScroller !== null && rhsMenuScroller !== undefined) {
                               rhsMenuScroller.refresh();
                               if (scrollTop) {
                               rhsMenuScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            case "supportScroller":
                if (supportScroller !== null && supportScroller !== undefined) {
                    $("#supportmaincontentwrapper").css("height", windowheight);
                    setTimeout(function() {
                               if (supportScroller !== null && supportScroller !== undefined) {
                               supportScroller.refresh();
                               if (scrollTop) {
                               supportScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            case "scheduleScroller":
                if (scheduleScroller !== null && scheduleScroller !== undefined) {
                    var newHeight = windowheight - $("#bookingcontent").height();
                    $("#bookingdetaildiv").css("height", newHeight);
                    setTimeout(function() {
                               if (scheduleScroller !== null && scheduleScroller !== undefined) {
                               scheduleScroller.refresh();
                               if (scrollTop) {
                               scheduleScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            case "mapScroller":
                if (mapScroller !== null && mapScroller !== undefined && tablet === false) {
                    $("#bookingpopupcontent").css("height", windowheight);
                    setTimeout(function() {
                               if (mapScroller !== null && mapScroller !== undefined) {
                               mapScroller.refresh();
                               if (scrollTop) {
                               mapScroller.scrollTo(0, 0);
                               }
                               }
                               }, 300);
                }
                break;
            default:
                break;
        }
        return true;
    } catch (e) {
        return true;
    }
}

function durationToSeconds(duration) {
    try {
        var result = 0;
        if (duration > 0) {
            var minutes = parseInt(duration, 10);
            var seconds = (duration - minutes);
            if (seconds > 0) {
                seconds = seconds * 10;
            }
            result = (minutes * 60) + seconds;
        }
        return result;
    } catch (e) {
        return 0;
    }
}

function durationToMinutes(currentDuration) {
    try {
        var result = "00:00";
        if (currentDuration > 0) {
            currentDuration = currentDuration * 1000;
            var milliseconds = parseInt((currentDuration % 1000) / 100, 10),
            seconds = parseInt((currentDuration / 1000) % 60, 10),
            minutes = parseInt((currentDuration / (1000 * 60)) % 60, 10);
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            result = minutes + ":" + seconds;
        }
        return result;
    } catch (e) {
        return 0;
    }
}