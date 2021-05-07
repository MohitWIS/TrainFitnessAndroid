
function setPlaylistTracksPopup(event, returnFunction){
    try {
        $("div#userplaylistpage-popup.ui-popup-container.slide.in.ui-popup-active").height($(window).height());
		$("#userplaylistpage-popup").css("position", "fixed");
        setTimeout(function() {
                   playlistItemScroller = new IScroll("#playlisttrackdiv", {
                                                      bounce: false
                                                      });
                   }, 0);
        activeUser.getPlaylistTracks(function(ret) {
                                     if (ret === undefined || ret.length === 0) {
                                     // no tracks found
                                     } else {
                                     
                                     $("#playlistcategoryul").html(ret);
                                     $("#playlisttracksmedia").trigger("refresh");
                                     $("#playlistcategoryul").trigger("create");
                                     $(".pltrackitems").removeClass("plitemexist");
                                     
                                     for(var z=0; z< currentPlaylist.playlistitems.length; z++){
                                         var plitem =currentPlaylist.playlistitems[z];
                                         $(".pldiv-" + plitem.audioid).addClass("plitemexist");
                                    }
                                     
                                     hidePleaseWait();
                                     setPagePadderDiv("playlistItemScroller", true);
                                     
                                     
                                     $(".playlistitemsheaderdiv").off("vclick");
                                     $(".playlistitemsheaderdiv").on("vclick", function(event) {
                                                                     try {
                                                                     if (medialistingOK === true) {
                                                                     medialistingOK = false;
                                                                     event.preventDefault();
                                                                     var id = $(event.currentTarget).attr("id");
                                                                     if ($(this).parent().hasClass("ui-collapsible-collapsed") === true) {
                                                                     $(this).parent().collapsible("expand");
                                                                     setTimeout(function() {
                                                                                medialistingOK = true;
                                                                                setPagePadderDiv("playlistItemScroller", false);
                                                                                }, 300);
                                                                     } else {
                                                                     $(this).parent().collapsible("collapse");
                                                                     setTimeout(function() {
                                                                                medialistingOK = true;
                                                                                setPagePadderDiv("playlistItemScroller", false);
                                                                                }, 300);
                                                                     }
                                                                     }
                                                                     } catch (e) {
                                                                     errorHandler("playlistmedia", e);
                                                                     }
                                                                     });
                                     setTimeout(function() { setPagePadderDiv("playlistItemScroller", true);
                                                }, 600);
                                     
                                 $("#footertracksmenubtn").off("vclick");
                                 $("#footertracksmenubtn").on("vclick", function(event) {
                                                              
                                  var tracksToAdd = $(".pltrackschkbx.checkeditem");
                                                                  
                                    if (tracksToAdd!==undefined && tracksToAdd.length > 0){

                                        msgTitle = resources.myplaylist;
                                        msgBtnValue = resources.btnYesNo;
                                        msgStr = resources.playlistaddconfirmcancel;
                                        navigator.notification.confirm(msgStr, function(choice) {
                                                 if (choice === 1) {
                                                     if(activeUser.userplaylists!==undefined){
                                                     mediaInit=false;
                                                     var aud;
                                                     var tempId=0;
                                                     var pli;
                                                     var itemOrder = 0;
                                                     showPleaseWait();
                                                     if(currentPlaylist !==undefined && currentPlaylist.playlistitems!==undefined && currentPlaylist.playlistitems.length>0){
                                                     for (var x=0; x < currentPlaylist.playlistitems.length; x++){
                                                     pli = currentPlaylist.playlistitems[x];
                                                     if(pli.tempid > 0 && pli.tempid > tempId){
                                                     tempId = pli.tempid;
                                                     }
                                                     }
                                                     itemOrder =currentPlaylist.playlistitems.length;
                                                     }
                                                     tempId+=1;
                                                     for(var i=0; i< tracksToAdd.length; i++){
                                                     aud =tracksToAdd[i];
                                                     var id = aud.id.replace("plchkbx-", "");
                                                     var ids = id.split("-");
                                                     var tabId = ids[0];
                                                     var catId = ids[1] + "-" + ids[2];
                                                     var audioId = ids[3];
                                                     var categoryRef = tabId + "-" + catId;
                                                     var category = activeUser.getAudiocategoryById(tabId, catId);
                                                     if(category!==undefined && currentPlaylist!==undefined){
                                                     
                                                     var audio = category.getAudioItemById(audioId);
                                                     if(audio!==undefined){
                                                     var  filePath = audio.fileuri.length > 0 ? audio.fileuri : audio.audiopath;
                                                     var newPlaylitstItem = new PlaylistItem(currentPlaylist.userplaylistid, 0, categoryRef,audioId.replace("mp3",""), itemOrder,audio.tracktitle,audio.artist,audio.length,audio.isdownloaded,filePath, -1, tempId );
                                                     currentPlaylist.playlistitems.push(newPlaylitstItem);
                                                     tempId+=1;
                                                     itemOrder+=1;
                                                     }
                                                     
                                                     }
                                                     
                                                     }
                                                     currentPlaylist.updatepending=true;
                                                     currentPlaylist.audiocount = currentPlaylist.playlistitems.length;
                                                     activeUser.saveFilesList(undefined, "userplaylists", true, function() {});
                                                     
                                                     activeUser.updateUserPlaylist(currentPlaylist, function(ret){
                                                                                   hidePleaseWait();
                                                                                   $("#userplaylistpage").popup("close");
                                                                                   $(".pltrackschkbx").removeClass("checkeditem");
                                                                                   resetPlaylistButtons("addtracks");
                                                                                   });
                                                     
                                                     }
                                               }else{
                                                   hidePleaseWait();
                                                   $("#userplaylistpage").popup("close");
                                                   $(".pltrackschkbx").removeClass("checkeditem");
                                                   resetPlaylistButtons("addtracks");
                                               }
                                             });
                                        }else{
                                          msgTitle = resources.myplaylist;
                                          msgBtnValue = resources.btnYes;
                                          msgStr = resources.playlistaddsel;
                                          navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                                          }
                                      });
                                     
                                     $("#footerbarleftplbckbtn").off("vclick");
                                     $("#footerbarleftplbckbtn").on("vclick", function(event) {
                                                                    event.preventDefault();
                                                                    $(".pltrackschkbx").removeClass("checkeditem");
                                                                    $("#userplaylistpage").popup("close");
                                                                if(screen!==undefined && screen.unlockOrientation!==undefined ){
                                                                    screen.unlockOrientation();
                                                                    }
                                                                    });
                                     $(".trackitemlink").off("vclick");
                                     $(".trackitemlink").on("vclick", function(event) {
                                                            event.preventDefault();
                                                            event.stopPropagation();
                                                            var id=$(event.currentTarget).attr("id");
                                                            var playlistitemid = id.replace("pl-", "plchkbx-");
                                                            if($("#" + id + " .tracksitemdiv").hasClass("plitemactive")===true){
                                                            $("#" + id + " .tracksitemdiv").removeClass("plitemactive");
                                                            $("#" + playlistitemid).removeClass("checkeditem");
                                                            }else{
                                                            $("#" + id + " .tracksitemdiv").addClass("plitemactive");
                                                            $("#" + playlistitemid).addClass("checkeditem");
                                                            }
                                                            });
                                     $(".pltrackschkbx").off("vclick");
                                     $(".pltrackschkbx").on("vclick", function(event) {
                                            event.stopPropagation();
                                             event.preventDefault();
                                            var id=$(event.currentTarget).attr("id");
                                            var playlistitemid = id.replace("plchkbx-", "pl");
                                            if($("#" + playlistitemid + " .tracksitemdiv").hasClass("plitemactive")===true){
                                                $("#" + playlistitemid + " .tracksitemdiv").removeClass("plitemactive");
                                                $("#" + id).removeClass("checkeditem");
                                            }else{
                                                $("#" + playlistitemid + " .tracksitemdiv").addClass("plitemactive");
                                                $("#" + id).removeClass("checkeditem");
                                            }
                                     });
                                     }
                                     
                                     });
        
        
        
        returnFunction(true);
    } catch (e) {
        returnFunction(false);
    }
}
