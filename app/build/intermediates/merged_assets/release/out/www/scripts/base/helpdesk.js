var newfileissueid="";
$(document).on("pagecreate", "#helpdeskpage", function(e) {
               try {
               
               $(".ui-header").on("touchmove",function(e){e.preventDefault();});
               $(".ui-footer").on("touchmove",function(e){e.preventDefault();});
 
               $("#helpdeskheader").html(resources.helpdeskimgtxt);
               $("#helpdeskhead1").html(resources.helpdeskitemtitleadd);
               $("helpdeskitemtitlecurrent").html(resources.helpdeskitemtitlecurrent);
               $("#messageprevlink").html(resources.prevlink);
               $("#messagenextlink").html(resources.nextlink);
               $(".issuetitletxt").html(resources.issuetitletxt);
               $(".issuecategorytxt").html(resources.issuecategorytxt);
               $(".issuecommentaddtxt").html(resources.issuecommentaddtxt);
               $(".addissuefilebtntxt").html(resources.addfiletxt);
               $(".removeissuefilebtntxt").html(resources.removefiletxt);
               $(".sendbtntxt").html(resources.sendbtntxt);
               $(".cancelbtntxt").html(resources.cancelbtntxt);
               $("#searchissuelabel").html(resources.searchissuelabel);
               $(".issueidtxt").html(resources.issueidtxt);
               $(".issuecreatedatetxt").html(resources.issuecreatedatetxt);
               $("#settingspodmenuheader").html(resources.settingsmenuhead);
               $("#helphelpdeskimgtxt").html(resources.helpdeskimgtxt);
               $("#helphelpdeskimgtxt").addClass("liitemdisabled");
               
               issuesFirstShow = true;
               if (pixelx2 === true) {
               $("#helpdeskmaincontent").addClass("pixelx2");
               }
               if (retinaDisplay === true) {
               $("#helpdeskmaincontent").addClass("retina");
               }
               issuesPerPage = configs.getCustom("CS_MESSAGES_PAGE");
               if (tablet === false) {
               issuesPerPage = issuesPerPage - 2;
               }
               if (iphone5 === true) {
               $(".ui-page").addClass("iphone5");
               $(".ui-content").addClass("iphone5");
               $(".ui-panel").addClass("iphone5");
               $(".ui-panel-content-wrap-closed").addClass("iphone5");
               $("#supportmessagediv").addClass("iphone5");
               $(".padderdiv").addClass("iphone5");
               $("#helpdeskpadderdiv").addClass("iphone5");
               $("#mobilepadderdiv").addClass("iphone5");
               $(".coursemenupadderdiv").addClass("iphone5");
               $("#helpdeskmainadd").addClass("iphone5");
               $("#supportfieldsadd").addClass("iphone5");
               $("#supportmessagesdiv").addClass("iphone5");
               }
               if (tablet === false) {
               $("#messagesearch").attr("placeholder", "Search for issue ...");
               $(".ui-page").addClass("etpmobile");
               $(".ui-content").addClass("etpmobile");
               $(".ui-panel").addClass("etpmobile");
               $("#supportmessagediv").addClass("etpmobile");
               $("#helpdeskpage").addClass("etpmobile");
               }
               
               if (tablet === false) {
               $(".ui-panel-content-wrap").addClass("fullscreenmobile");
               }
               $("#supportfieldsadd").on("touch", function(event) {
                                         event.preventDefault();
                                         });
               $("#messagesupportfields").on("touch", function(event) {
                                             event.preventDefault();
                                             });
               } catch (e) {
               errorHandler("helpdeskpage.pagecreate", e);
               }
               });
$(document).on("pagebeforeshow", "#helpdeskpage", function(e) {
               try {
               //refreshMenu("refresh");
               //alert("in");
               $(".extramenupanel").panel("close");
               rhsMenuOpen = false;
               mediaSetRefresh();
               checkASDUserPodState(false, function(ret) {});
               //refreshMenu("refresh");
               pageLoad = "#helpdeskpage";
               startupPageid = "#coursepage";
               if (iphone5 === true) {
               $(".ui-page").addClass("iphone5");
               $(".ui-content").addClass("iphone5");
               $(".ui-panel").addClass("iphone5");
               $(".ui-panel-content-wrap-closed").addClass("iphone5");
               $("#supportmessagediv").addClass("iphone5");
               $(".padderdiv").addClass("iphone5");
               $("#helpdeskpadderdiv").addClass("iphone5");
               $("#mobilepadderdiv").addClass("iphone5");
               $(".coursemenupadderdiv").addClass("iphone5");
               $("#helpdeskmainadd").addClass("iphone5");
               $("#supportfieldsadd").addClass("iphone5");
               }
               if (tablet === false) {
               $(".ui-page").addClass("etpmobile");
               $(".ui-content").addClass("etpmobile");
               $(".ui-panel").addClass("etpmobile");
               $("#supportmessagediv").addClass("etpmobile");
               $("#helpdeskpage").addClass("etpmobile");
               }
               $(".removefilesitemdiv").hide();
               $(".addfilesitemdiv").show();
               if (tablet === false) {
               $(".ui-panel-content-wrap").addClass("fullscreenmobile");
               }
               helpdeskFirstLoad = false;
               /*$("#helpdeskmaincontent").on("vclick", function(event) {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            });
               setTimeout(function() {
                          helpdeskScroller = new IScroll("#helpdeskmaincontent", {
                                                         bounce: false
                                                         });
                          }, 100);*/
               if (device.platform === "Android") {
               var selectField = document.getElementById("select-issue");
               selectField.addEventListener("touchstart", function(e) {
                                            e.stopPropagation();
                                            }, false);
               }
               activeUser.getHelpdeskCategoryOptions(function(ret) {
                                                     if ($("#select-issue") != undefined) {
                                                     $("#select-issue").html(ret);
                                                     $("#select-issue").selectmenu("refresh");
                                                     }
                                                     });
               /*  PANEL BUTTONS */
               $("#helpdeskheader").html(resources.helpdeskimgtxt);
               $("#helpdeskhead1").html(resources.helpdeskitemtitleadd);
               $("helpdeskitemtitlecurrent").html(resources.helpdeskitemtitlecurrent);
               $("#messageprevlink").html(resources.prevlink);
               $("#messagenextlink").html(resources.nextlink);
               $(".issuetitletxt").html(resources.issuetitletxt);
               $(".issuecategorytxt").html(resources.issuecategorytxt);
               $(".issuecommentaddtxt").html(resources.issuecommentaddtxt);
               $(".addissuefilebtntxt").html(resources.addfiletxt);
               $(".removeissuefilebtntxt").html(resources.removefiletxt);
               $(".sendbtntxt").html(resources.sendbtntxt);
               $(".cancelbtntxt").html(resources.cancelbtntxt);
               $("#searchissuelabel").html(resources.searchissuelabel);
               $(".issueidtxt").html(resources.issueidtxt);
               $(".issuecreatedatetxt").html(resources.issuecreatedatetxt);
               $("#settingspodmenuheader").html(resources.settingsmenuhead);
               $("#helphelpdeskimgtxt").html(resources.helpdeskimgtxt);

               $(".coursesimgtxt").html(resources.coursesimgtxt);
               $(".supportimgtxt").html(resources.supportimgtxt);
               $(".logoutimgtxt").html(resources.logoutimgtxt);
               $(".refreshimgtxt").html(resources.refreshimgtxt);
               $(".closehelpimgtxt").html(resources.closehelpimgtxt);
               $(".videobtnimgtxt").html(resources.myvideos);
               $(".audiobtnimgtxt").html(resources.mymusic);
               $("#helphelpdeskimgtxt").html(resources.helpdeskimgtxt);
               $("#helphelpdeskimgtxt").addClass("liitemdisabled");
               $(".plbtnimgtxt").html(resources.myplaylist);
               $("#footersettingsmenubtn").off("vclick");
               $("#footersettingsmenubtn").on("vclick", function(event) {
                                              event.preventDefault();
                                              $("#helpextramenupanel").panel("open");
                                              });
               $("#helpsettingspanelrhs").on("vclick", function(event) {
                                             event.preventDefault();
                                             $("#helpextramenupanel").panel("close");
                                             });


                $(function () {
                        $("#file-uploader").dxFileUploader({
                            name: "file",
                            accept: "*",
                            uploadUrl: "https://upload.eteacher.pro/ChunkUploadLatest.aspx?userId="+activeUser.userId+"&portalId=40&fileCount="+filecount.counter+"&fileName=",
                            chunkSize: 200000,
                            allowedFileExtensions:[".doc",".docx",".xls",".xlsx",".ppt",".pptx",".txt",".pdf",".mp4",".mov",".jpg",".jpeg",".png",".gif"],
                            onUploadStarted: onUploadStarted,
                            onProgress: onUploadProgress,
                            onUploaded: onUploadComplete,
                             onValueChanged: onValueChanged,
                            onUploadError: onUploadError,
                            onUploadAborted: onUploadAborted
                        });
                    });

            function onUploadAborted(e) {
                if (e.file) {
                    document.getElementsByClassName("dx-fileuploader-button")[0].style.display = 'block';
                    document.getElementsByClassName("dx-fileuploader-files-container")[0].style.display = 'none';
                    //console.log(e.file);
                    //console.log(e.file.name);
                    deleteHelpdeskFile(false,e.file.name,function(ret){
                        if(ret.deleteAzureFileResult){
                            for(var i = 0; i < HelpDeskFiles.length; i++) {
                                  if(HelpDeskFiles[i].name == e.file.name) {
                                      HelpDeskFiles.splice(i, 1);
                                      break;
                                  }
                            }
                        }
                        else{
                            msgStr = resources.multiFileDelete;
                            msgTitle = resources.helpdeskimgtxt;
                            msgBtnValue = resources.btnOk;
                            navigator.notification.confirm(msgStr, function() {

                            }, msgTitle, msgBtnValue)
                         }
                    });
                }
            }


                    function onValueChanged(e) {
                        if(e.value == ""){
                            HelpDeskFiles.splice(HelpDeskFiles.length - 1, 1);
                        }
                        else{
                            var count = 0;
                            var lastIndex = e.value[0].name.lastIndexOf(".");
                            var prefixName = e.value[0].name.substring(0, lastIndex);
                            var stringToReplace = prefixName.replace(/[^\w\s]/gi, '');
                            console.log(stringToReplace);
                            var currentItem = { name: '', type: '' };
                            if(HelpDeskFiles.length > 0){
                                for (var i = 0; i < HelpDeskFiles.length; i++) {
                                   if (HelpDeskFiles[i].name.includes(stringToReplace)) {
                                       count++;
                                   }
                                }
                            }

                            if (count > 0) {
                               currentItem.name = stringToReplace + count + "." + e.value[0].name.substring(lastIndex+ 1);
                            } else {
                                //console.log(prefixName +"   ------   "+  e.value[0].name.substring(lastIndex+ 1))
                               currentItem.name = stringToReplace+"."+e.value[0].name.substring(lastIndex+ 1);
                               //currentItem.name = e.value[0].name;
                            }
                            currentItem.type = e.value[0].type;
                            HelpDeskFiles.push(currentItem);
                            console.log(HelpDeskFiles);
                            e.component.option("uploadUrl", 'https://upload.eteacher.pro/ChunkUploadLatest.aspx' + "?userId=" + activeUser.userId + "&portalId=40&fileCount=" + filecount.counter+ "&fileName="+ HelpDeskFiles[HelpDeskFiles.length - 1].name);
                        }

                     }
                    function onUploadStarted(e) {
                        document.getElementsByClassName("dx-fileuploader-files-container")[0].style.display = 'block';
                        getChunkPanel().innerHTML = '';
                    }
                    function onUploadProgress(e) {
                        //getChunkPanel().appendChild(addChunkInfo(e.segmentSize, e.bytesLoaded, e.bytesTotal));
                    }

                    function onUploadComplete(e){
                        //console.log(HelpDeskFiles.length - 1);
                        document.getElementsByClassName("dx-fileuploader-files-container")[0].style.display = 'none';
                        filecount.counter++;
                        $("#filename").append('<p class="deleteImages" style="margin:0px;"  id='+ HelpDeskFiles[HelpDeskFiles.length - 1].name + ' >'+HelpDeskFiles[HelpDeskFiles.length - 1].name+'<span  id='+ HelpDeskFiles[HelpDeskFiles.length - 1].name + ' style=color:#ef5351; >  &#10006;</span></p><br>');
                        // console.log(activeUser);
                        // console.log(e.file.name);
                        // console.log(e.file.size);
                        // console.log(e.file.name);
                        // console.log(e.file.name);
                    }

                    function onUploadError(e){
                        //filecount.counter = filecount.counter - 1;
                        console.log("error");
                    }

                    function addChunkInfo(segmentSize, loaded, total) {
                        var result = document.createElement("DIV");

                        result.appendChild(createSpan("Chunk size:"));
                        result.appendChild(createSpan(getValueInKb(segmentSize), 'segment-size'));
                        result.appendChild(createSpan(", Uploaded:"));
                        result.appendChild(createSpan(getValueInKb(loaded), 'loaded-size'));
                        result.appendChild(createSpan("/"));
                        result.appendChild(createSpan(getValueInKb(total), 'total-size'));

                        return result;
                    }
                    function getValueInKb(value) {
                        return (value / 1024).toFixed(0) + "kb";
                    }
                    function createSpan(text, className) {
                        var result = document.createElement("SPAN");
                        if (className)
                        result.className = className + " dx-theme-accent-as-text-color";
                        result.innerText = text;
                        return result;
                    }
                    function getChunkPanel() {
                        return document.querySelector('.chunk-panel');
                    }

               /*  HELPDESK BUTTONS */
               $(".helpdeskcollapsible").off("vclick");
               $(".helpdeskcollapsible").on("vclick", function(event) {
                                           try {

                                           if (issuesParentOK === true || helpdeskFirstLoad === true) {
                                           event.preventDefault();
                                           var id = $(event.currentTarget).parent().attr("id");
                                           //var id = $(event.currentTarget).attr("id");
                                           $("#issueitemtextarea").val("");
                                           $("#support-subject").val("");
                                           fileUploadUri = "";
                                           if ($("#select-issue") != undefined) {
                                           $("#select-issue").val($("#select-issue option:first").val());
                                           $("#select-issue").selectmenu("refresh");
                                           }
                                           if (id === "helpdeskmainadd") {
                                           if ($("#" + id).hasClass("ui-collapsible-collapsed") || helpdeskFirstLoad === true) {
                                           helpdeskFirstLoad = false;
                                           //console.log("if");
                                           $("#helpdeskmaincurrent").children('div.ui-collapsible-content').slideUp(300);

                                           $("#" + id).children('div.ui-collapsible-content').slideDown(300);

                                           $("#" + id).collapsible("expand");
                                           $("#helpdeskmaincurrent").collapsible("collapse");
                                           } else {
                                               $("#helpdeskmaincurrent").children('div.ui-collapsible-content').slideDown(300);

                                               $("#" + id).children('div.ui-collapsible-content').slideUp(300);

                                           $("#" + id).collapsible("collapse");
                                           $("#helpdeskmaincurrent").collapsible("expand");
                                           }
                                           } else {
                                           if ($("#" + id).hasClass("ui-collapsible-collapsed") || helpdeskFirstLoad === true) {

                                               $("#helpdeskmainadd").children('div.ui-collapsible-content').slideUp(300);

                                           $("#helpdeskmaincurrent").children('div.ui-collapsible-content').slideDown(300);


                                           $("#helpdeskmaincurrent").collapsible("expand");
                                           $("#helpdeskmainadd").collapsible("collapse");
                                           }else{

                                               $("#helpdeskmainadd").children('div.ui-collapsible-content').slideDown(300);

                                               $("#helpdeskmaincurrent").children('div.ui-collapsible-content').slideUp(300);

                                           $("#helpdeskmaincurrent").collapsible("collapse");
                                           $("#helpdeskmainadd").collapsible("expand");
                                           }
                                           }
                                           setPagePadderDiv("helpdeskScroller");
                                           }
                                           } catch (e) {
                                           errorHandler("helpdeskcollapsible vclick", e);
                                           }
                                           });
              /* $(".helpdeskcollapsible").on("vclick", function(event) {
                                            try {
                                            if (issuesParentOK === true || helpdeskFirstLoad === true) {
                                            event.preventDefault();
                                            var id = $(event.currentTarget).attr("id");
                                            $("#issueitemtextarea").val("");
                                            $("#support-subject").val("");
                                            fileUploadUri = "";
                                            if ($("#select-issue") != undefined) {
                                            $("#select-issue").val($("#select-issue option:first").val());
                                            $("#select-issue").selectmenu("refresh");
                                            }
                                            if (id === "helpdeskmainadd") {
                                            if ($("#" + id).hasClass("ui-collapsible-collapsed") || helpdeskFirstLoad === true) {
                                            helpdeskFirstLoad = false;
                                            $("#" + id).collapsible("expand");
                                            $("#helpdeskmaincurrent").collapsible("collapse");
                                            } else {
                                            $("#" + id).collapsible("collapse");
                                            $("#helpdeskmaincurrent").collapsible("expand");
                                            }
                                            } else {
                                            if ($("#" + id).hasClass("ui-collapsible-collapsed") || helpdeskFirstLoad === true) {
                                            $("#helpdeskmaincurrent").collapsible("expand");
                                            $("#helpdeskmainadd").collapsible("collapse");
                                            }else{
                                            $("#helpdeskmaincurrent").collapsible("collapse");
                                            $("#helpdeskmainadd").collapsible("expand");
                                            }
                                            }
                                            setPagePadderDiv("helpdeskScroller");
                                            }
                                            } catch (e) {
                                            errorHandler("helpdeskcollapsible vclick", e);
                                            }
                                            });*/
               $("#issueitemtextarea").val("");
               $("#support-subject").val("");
               fileUploadUri = "";
               $("#messagesupportfields").off("vclick");
               $("#messagesupportfields").on("vclick", function(ev) {
                                             ev.preventDefault();
                                             ev.stopPropagation();
                                             });
               refreshIssueList(0, function() {
                                issuesFirstShow = false;
                                hidePleaseWait();
                                });
               $("#messagesupportfields").off("swiperight");
               $("#messagesupportfields").off("swipeleft");
               $("#messagesupportfields").on("swiperight", function(event) {
                                             getMessages(event, "prev");
                                             setPagePadderDiv("helpdeskScroller", true);
                                             event.preventDefault();
                                             });
               $("#messagesupportfields").on("swipeleft", function(event) {
                                             getMessages(event, "next");
                                             setPagePadderDiv("helpdeskScroller", true);
                                             event.preventDefault();
                                             });
               $("#messageprevlink").off("vclick");
               $("#messagenextlink").off("vclick");
               $("#messageprevlink").on("vclick", function(event) {
                                        getMessages(event, "prev");
                                        setPagePadderDiv("helpdeskScroller", true);
                                        event.preventDefault();
                                        });
               $("#messagenextlink").on("vclick", function(event) {
                                        getMessages(event, "next");
                                        setPagePadderDiv("helpdeskScroller", true);
                                        event.preventDefault();
                                        });
               $("#select-issue").removeClass("ui-shadow-inset");
               $("#select-issue").off("vclick");
               $("#select-issue").on("vclick", function(event, ui) {
                                     event.preventDefault();
                                     event.stopPropagation();
                                     $("#select-issue").focus();
                                     });
               $("#support-subject").off("vclick");
               $("#support-subject").on("vclick", function(event, ui) {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        $("#support-subject").focus();
                                        if (device.platform === "Android") {
                                        showAndroidKeyboard();
                                        }
                                        });
               $("#messagesearch").off("vclick");
               $("#messagesearch").on("vclick", function(event, ui) {
                                      event.preventDefault();
                                      event.stopPropagation();
                                      $("#messagesearch").focus();
                                      if (device.platform === "Android") {
                                      showAndroidKeyboard();
                                      }
                                      });

               $("#issueitemtextarea").off("vclick");
               $("#issueitemtextarea").on("vclick", function(event, ui) {

				    var helpdeskheight = $(window).height() - $("header", $("body").pagecontainer("getActivePage")).height();
												helpdeskheight=helpdeskheight+((helpdeskheight*25)/100);

												 $("#helpdeskmaincontent").css("height", helpdeskheight);
										$("#issueitemtextarea").focus();
                                          event.preventDefault();
                                          event.stopPropagation();
                                          var id = $(event.currentTarget).attr("id");
                                          var ids = id.split("-");
                                          if (device.platform === "Android") {
                                          if (helpdeskScroller !== undefined) {

                                          setTimeout(function() {
                                                     showAndroidKeyboard();
                                                     $("#" + id).focus();
                                                     }, 300);
                                          } else {
                                          showAndroidKeyboard();
                                          }
                                          } else {
                                          $("#" + id).focus();
                                          }
                                          });

               $("#addnewfilebtn").off("vclick");
               $("#addnewfilebtn").on("vclick", function(event) {
                                      event.preventDefault();
                                      event.stopPropagation();
                                      hideKeyboard(event, false);
                                      if (deviceIsOnline === false) {
                                      msgStr = resources.functionConnError;
                                      msgTitle = resources.connError;
                                      msgBtnValue = resources.btnOk;
                                      navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                                      } else {
                                      uploadNewIssueFile();
                                      }
                                      });
               $("#cancelsupportbtn").off("vclick");
               $("#cancelsupportbtn").on("vclick", function(event) {
                                         event.preventDefault();
                                         event.stopPropagation();
                                         hideKeyboard(event, false);
                                         $("#issueitemtextarea").val("");
                                         $("#support-subject").val("");
                                         $("#select-issue").val($("#select-issue option:first").val());
                                         $("#select-issue").selectmenu("refresh");
                                         fileUploadUri = "";
                                         $("#removenewfilesitemdiv").hide();
                                         $("#addnewfilesitemdiv").show();

                                         });
               $("#sendsupportbtn").off("vclick");
               $("#sendsupportbtn").on("vclick", function(event) {
                                       event.preventDefault();
                                       event.stopPropagation();
                                       hideKeyboard(event, false);
                                       if (deviceIsOnline === false) {
                                       msgStr = resources.functionConnError;
                                       msgTitle = resources.connError;
                                       msgBtnValue = resources.btnOk;
                                       navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                                       } else {
                                       addIssue();
                                       }
                                       });

               $("#removenewfilebtn").off("vclick");
               $("#removenewfilebtn").on("vclick", function(event) {
                                           event.preventDefault();
                                           event.stopPropagation();
                                           $(this).focus();
                                           hideKeyboard(event, false);
                                           fileUploadUri="";
                                           $("#removenewfilesitemdiv").hide();
                                           $("#addnewfilesitemdiv").show();
                                           });
               if (device.platform === "Android") {
               $("#issueitemtextarea").off("focusout");
               $("#issueitemtextarea").on("focusout", function(event) {
                                          hideKeyboard(event, false);
                                          });
               $("#support-subject").off("focusout");
               $("#support-subject").on("focusout", function(event) {
                                        hideKeyboard(event, false);
                                        });
               $("#messagesearch").off("focusout");
               $("#messagesearch").on("focusout", function(event) {
                                      hideKeyboard(event, false);
                                      });
               }
               $("#helpfooterleftbckbtn").off("vclick");
               $("#helpfooterleftbckbtn").on("vclick", function(event) {
                     event.preventDefault();
                     hideKeyboard(event, false);
                     audioPaused = true;
                     videoPaused = true;
                     //mediaInit = false;
                     if (prevPage === "#helpdeskpage") {
                         if (activeUser.hascourses === true) {
                             prevPage = "#coursepage";
                         } else {
                             if (activeUser.hasvideos === true || activeUser.hasaudio === true) {
                                 prevPage = "#podcastpage";
                             }
                         }
                     }
                     pageLoad = prevPage;
                     prevPage = "#helpdeskpage";
                     $.mobile.back();
                     //refreshMenu("refresh");
                     //goToPage("#coursepage");

                 });
               $("#helpclosebtn").off("vclick");
               $("#helpclosebtn").on("vclick", function(event) {
                                       if(menubtnOk===true){
                                   $("#helpfooterleftbckbtn").trigger("vclick");
                                     setTimeout(function(){menubtnOk=true;},300);
                                     }

                                   });
               $("#searchmessagediv .ui-input-clear").off("vclick");
               $("#searchmessagediv .ui-input-clear").on("vclick", function(event) {
                                                         $("#messagesearch").val("");
                                                         $("#searchmessagediv a.ui-input-clear").addClass("ui-input-clear-hidden");
                                                         showPleaseWait();
                                                         refreshIssueList(0, function() {
                                                                          issuesFirstShow = false;
                                                                          hidePleaseWait();
                                                                          });
                                                         });

               $(".addfileslistdiv").hide();

               showPleaseWait();
               setUserPosition(false, "#helpdeskpage", false);
               } catch (e) {
               errorHandler("helpdeskpage.pagebeforeshow", e);
               }
               });
$(document).on("pageshow", "#helpdeskpage", function(e) {
               try {
               //refreshMenu("refresh");
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
               if (activeUser.savedMediaPosition !== undefined && activeUser.savedMediaPosition.tabname !== undefined && activeUser.savedMediaPosition.tabname > 0) {
               mediaLoadIds = {
               tabname: activeUser.savedMediaPosition.tabname == undefined ? "" : activeUser.savedMediaPosition.tabname,
               tabid: activeUser.savedMediaPosition.tabid == undefined ? "" : activeUser.savedMediaPosition.tabid,
               categoryid: activeUser.savedMediaPosition.categoryid == undefined ? "" : activeUser.savedMediaPosition.categoryid,
               itemid: activeUser.savedMediaPosition.itemid == undefined ? "" : activeUser.savedMediaPosition.itemid
               };
               }
               if (loadIds.issuetab !== undefined && loadIds.issuetab.length > 0) {
               var mainId = loadIds.issuetab;
               helpdeskFirstLoad = true;
               $("#" + mainId).trigger("vclick");
               if (helpdeskFirstLoad === true) {
               if (loadIds.issueid !== undefined) {
               var mainIssueId = loadIds.issueid;
               if (mainIssueId.length > 0) {
               setTimeout(function() {
                          var triggerId = "#issue-" + mainIssueId;
                          setTimeout(function() {
                                     $(triggerId).collapsible("expand");
                                     setPagePadderDiv("helpdeskScroller");
                                     helpdeskScroller.scrollToElement(triggerId, 200);
                                     helpdeskFirstload = false;
                                     }, 300);
                          }, 300);
               } else {
               helpdeskFirstload = false;
               }
               } else {
               helpdeskFirstload = false;
               }
               }
               } else {
               helpdeskFirstLoad = false;
               }
               } catch (e) {
               errorHandler("helpdeskpage.pageshow", e);
               }
               });

var iUpload = 0;
var iLen = 10;

function refreshIssueList(issueId, returnFunction) {
    try {
        if (device.platform === "Android" && tablet === false) {
            $(".scrollpadderdiv").hide();
        }
        $("#messagesearch").off("change");
        $("#messagesearch").on("change", function(event, ui) {
                               hideKeyboard(event, false);
                               showPleaseWait();
                               var searchValue = $("#messagesearch").val();
                               if (searchValue == undefined || searchValue.length === 0) {
                               refreshIssueList(0, function() {});
                               } else {
                               messagePage = 1;
                               activeUser.getSearchIssuesListView(searchValue, messagePage, issuesPerPage, function(ret) {
                                                                  setIssuesVClick(ret);
                                                                  hidePleaseWait();
                                                                  });
                               }
                               });
        messagePage = 1;
        activeUser.getIssuesListView(messagePage, issuesPerPage, function(ret) {
                                     setIssuesVClick(ret);
                                     if (issuesPerPage >= activeUser.issues.length) {
                                     $("#messagenavdiv").hide();
                                     }
                                     if (issueId > 0) {
                                     var idIssue = "issue-" + currentIssueId;
                                     if ($("#" + idIssue)) {
                                     $("#" + idIssue).on("expand").collapsible("expand");
                                     $("#helpdeskmainadd").collapsible("collapse");
                                     $("#helpdeskmaincurrent").collapsible("expand");
                                     if (helpdeskScroller != undefined) {
                                     setPagePadderDiv("helpdeskScroller", false);
                                     helpdeskScroller.scrollToElement("#" + idIssue, 200);
                                     }
                                     } else {
                                     setPagePadderDiv("helpdeskScroller", true);
                                     hidePleaseWait();
                                     }
                                     } else {
                                     setPagePadderDiv("helpdeskScroller", true);
                                     }

                                     if(issuesPerPage == 1){
                                          iUpload = 0;
                                          iLen= 10;
                                     }

                                     else if(issuesPerPage == 2){
                                         iUpload = 11;
                                          iLen= 20;
                                     }

                                     for(var j=0;j< activeUser.issues.length;j++){
                                                                              //console.log(j);
                                         //console.log(activeUser.issues.length);
                                         var idUpload= "#file-uploader-"+activeUser.issues[j].issueid;
                                         $(idUpload).dxFileUploader({
                                             name: "file",
                                             accept: "*",
                                             uploadUrl: "https://upload.eteacher.pro/ChunkUploadLatest.aspx?userId="+activeUser.userId+"&portalId=40&fileCount="+filecount.counter+ "&fileName=",
                                             //uploadUrl: "https://studentdesktop.eteacher.pro/data/ChunkUpload.aspx?userId=152781&portalId=40&fileCount=0",
                                             chunkSize: 200000,
                                             allowedFileExtensions:[".doc",".docx",".xls",".xlsx",".ppt",".pptx",".txt",".pdf",".mp4",".mov",".jpg",".jpeg",".png",".gif"],
                                             onUploadStarted: onUploadStarted,
                                             onProgress: onUploadProgress,
                                             onUploaded: onUploadComplete,
                                              onValueChanged: onValueChanged,
                                             onUploadError: onUploadError,
                                             onUploadAborted: onUploadAborted
                                         });
                                     }
                                     function onUploadAborted(e) {
                                         if (e.file) {
                                             document.getElementsByClassName("dx-fileuploader-button")[0].style.display = 'block';
                                             document.getElementsByClassName("dx-fileuploader-files-container")[0].style.display = 'none';
                                             //console.log(e.file);
                                             //console.log(e.file.name);
                                             deleteHelpdeskFile(false,e.file.name,function(ret){
                                                 if(ret.deleteAzureFileResult){
                                                    for(var i = 0; i <= HelpDeskFiles.length; i++) {
                                                          if(HelpDeskFiles[i].name == e.file.name) {
                                                              HelpDeskFiles.splice(i, 1);
                                                              break;
                                                          }
                                                      }
                                                 }
                                                 else{
                                                     msgStr = resources.multiFileDelete;
                                                     msgTitle = resources.helpdeskimgtxt;
                                                     msgBtnValue = resources.btnOk;
                                                     navigator.notification.confirm(msgStr, function() {

                                                     }, msgTitle, msgBtnValue)
                                                  }
                                             });
                                         }
                                     }

                                     function onValueChanged(e) {
                                        if(e.value == ""){
                                            HelpDeskFiles.splice(HelpDeskFiles.length - 1, 1);
                                        }
                                        else{
                                            var count = 0;
                                            var lastIndex = e.value[0].name.lastIndexOf(".");
                                            var prefixName = e.value[0].name.substring(0, lastIndex);
                                            var stringToReplace = prefixName.replace(/[^\w\s]/gi, '');
                                            console.log(stringToReplace);
                                            var currentItem = { name: '', type: '' };
                                            if(HelpDeskFiles.length > 0){
                                                for (var i = 0; i < HelpDeskFiles.length; i++) {
                                                   if (HelpDeskFiles[i].name.includes(stringToReplace)) {
                                                       count++;
                                                   }
                                                }
                                            }

                                            if (count > 0) {
                                               currentItem.name = stringToReplace + count + "." + e.value[0].name.substring(lastIndex+ 1);
                                            } else {
                                                //console.log(prefixName +"   ------   "+  e.value[0].name.substring(lastIndex+ 1))
                                               currentItem.name = stringToReplace+"."+e.value[0].name.substring(lastIndex+ 1);
                                               //currentItem.name = e.value[0].name;
                                            }
                                            currentItem.type = e.value[0].type;
                                            HelpDeskFiles.push(currentItem);
                                            console.log(HelpDeskFiles);
                                            e.component.option("uploadUrl", 'https://upload.eteacher.pro/ChunkUploadLatest.aspx' + "?userId=" + activeUser.userId + "&portalId=40&fileCount=" + filecount.counter+ "&fileName="+ HelpDeskFiles[HelpDeskFiles.length - 1].name);
                                        }

                                        //e.component.option("uploadUrl", 'https://upload.eteacher.pro/ChunkUpload.aspx' + "?userId=" + activeUser.userId + "&portalId=40&fileCount=" + filecount.counter);
                                     }

                                     function onUploadStarted(e) {
                                         document.getElementsByClassName("dx-fileuploader-files-container")[0].style.display = 'block';
                                         getChunkPanel().innerHTML = '';
                                     }
                                     function onUploadProgress(e) {
                                         //getChunkPanel().appendChild(addChunkInfo(e.segmentSize, e.bytesLoaded, e.bytesTotal));
                                     }

                                     function onUploadComplete(e){
                                        document.getElementsByClassName("dx-fileuploader-files-container")[0].style.display = 'none';
                                         var id = $(e.element).attr("id");
                                         var ids = id.split("-");
                                         var newfileissueid = ids[2];
                                         var filenameOld = "#filenameOld"+newfileissueid;
                                         $(filenameOld).append('<p class="deleteImages-'+newfileissueid+'" style="margin:0px;"  id='+ HelpDeskFiles[HelpDeskFiles.length - 1].name + ' >'+HelpDeskFiles[HelpDeskFiles.length - 1].name+'<span  id='+ HelpDeskFiles[HelpDeskFiles.length - 1].name + ' style=color:#ef5351; >  &#10006;</span></p><br>');
                                         filecount.counter++;

                                     }

                                     function onUploadError(e){
                                        setTimeout(function() {
                                            document.getElementsByClassName("dx-fileuploader-files-container")[0].style.display = 'none';
                                        }, 3000);

                                         //filecount.counter = filecount.counter - 1;
                                         console.log("error");
                                     }

                                     function addChunkInfo(segmentSize, loaded, total) {
                                         var result = document.createElement("DIV");

                                         result.appendChild(createSpan("Chunk size:"));
                                         result.appendChild(createSpan(getValueInKb(segmentSize), 'segment-size'));
                                         result.appendChild(createSpan(", Uploaded:"));
                                         result.appendChild(createSpan(getValueInKb(loaded), 'loaded-size'));
                                         result.appendChild(createSpan("/"));
                                         result.appendChild(createSpan(getValueInKb(total), 'total-size'));

                                         return result;
                                     }
                                     function getValueInKb(value) {
                                         return (value / 1024).toFixed(0) + "kb";
                                     }
                                     function createSpan(text, className) {
                                         var result = document.createElement("SPAN");
                                         if (className)
                                         result.className = className + " dx-theme-accent-as-text-color";
                                         result.innerText = text;
                                         return result;
                                     }
                                     function getChunkPanel() {
                                         return document.querySelector('.chunk-panel');
                                     }
                                     returnFunction(true);
                                     });
    } catch (e) {
        errorHandler("refreshIssueList", e);
    }
}

function cancelSupport() {
    try {
        $("#issueitemtextarea").val("");
        $("#support-subject").val("");
        $("#select-issue").val($("#select-issue option:first").val());
        $("#select-issue").selectmenu("refresh");
        fileUploadUri = "";
        $(".removefilesitemdiv").hide();
        $(".addfilesitemdiv").show();


    } catch (e) {
        errorHandler("cancelSupport", e);
    }
}

function setIssuesVClick(ret) {
    try {
        $(".removenewfilesitemdiv").hide();
        $(".addnewfilesitemdiv").show();

        if ((ret === undefined || ret.length === 0) && deviceIsOnline === false) {
            msgStr = resources.connHelpDeskIssues;
            msgTitle = resources.connError;
            msgBtnValue = resources.btnOk;
            navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
        } else {
            $("#issuescollapsibleset").html(ret);
            $("#issuescollapsibleset").trigger("create");
            $("#issuescollapsibleset").collapsibleset();
            $("#issuescollapsibleset").trigger("refresh");
            $(".issues").trigger("create");
            $(".issues").collapsible();
            $(".issues").trigger("refresh");
            $(".addissuefilebtntxt").html(resources.addfiletxt);
            $(".removeissuefilebtntxt").html(resources.removefiletxt);

            var moreIssues = messagePage > 0 ? activeUser.issues.length - (messagePage * issuesPerPage) : 1;
            if (messagePage === 1) {
                $("#messageprevlink").addClass("btndisabled");
            } else {
                $("#messageprevlink").removeClass("btndisabled");
            }
            if (moreIssues <= 0) {
                $("#messagenextlink").addClass("btndisabled");
            } else {
                $("#messagenextlink").removeClass("btndisabled");
            }

            $(".removenewfilesitemdiv").hide();
            $(".addnewfilesitemdiv").show();

            $(".issues").off("vclick");
            $(".issues").on("vclick", function(event) {
                            try {
                            event.preventDefault();
                            if (device.platform === "Android") {
                            hideKeyboard(event, false);
                            }
                            $(".issues").children('div.ui-collapsible-content').slideUp(300);
                            var current = $(this).closest(".ui-collapsible");
                            var id = $(event.currentTarget).attr("id");
                            var ids = id.split("-");
                            currentIssueId = ids[1];
                            if ($(this).hasClass("ui-collapsible-collapsed") === true || helpdeskFirstLoad === true) {
                            helpdeskFirstLoad = false;
                            $("#issueitemtextarea").val("");
                            $("#support-subject").val("");
                            fileUploadUri = "";
                            $(".ui-collapsible").not(".ui-collapsible-collapsed").find("ui-collapsible-heading-toggle").click();
                            $(".ui-collapsible-content", current).slideDown(300);
                            $(this).collapsible("expand");
                            if (helpdeskScroller != undefined) {
                            setTimeout(function() {
                                       setPagePadderDiv("helpdeskScroller", false);
                                       helpdeskScroller.scrollToElement("#" + id, 300);
                                       hidePleaseWait();
                                       issuesParentOK = true;
                                       }, 300);
                            }
                            } else {
                                $(".ui-collapsible-content", current).slideUp(300);
                                setTimeout(function() {
                                    $("#" + id).collapsible("collapse");
                                }, 300);
                                //$("#" + id).collapsible("collapse");
                                setTimeout(function() {
                                       issuesParentOK = true;
                                }, 300);
                            }
                            event.preventDefault();
                            helpdeskFirstLoad = false;
                            } catch (e) {
                            errorHandler("issues vclick", e);
                            }
                            });
            $(".issuebodyNew").off("vclick");
            $(".issuebodyNew").on("vclick", function(event) {
                               try {
                               hideKeyboard(event, false);
                               event.preventDefault();
                               event.stopPropagation();
                               } catch (e) {
                               errorHandler("issues vclick", e);
                               }
                               });

            $("#filename").off("vclick");
            $("#filename").on("vclick","p", function(event) {
                                     try {
                                     var idimg = $(this).children().attr("id");
                                     //alert($(idimg).text());
                                     var thisEle = $(this);
                                     deleteHelpdeskFile(false,idimg,function(ret){
                                        if(ret.deleteAzureFileResult){
                                          //var removePTag = "#"+idimg;
                                          for(var i = 0; i < HelpDeskFiles.length; i++) {
                                              if(HelpDeskFiles[i].name == idimg) {
                                                  HelpDeskFiles.splice(i, 1);
                                                  break;
                                              }
                                          }

                                          filecount.counter = filecount.counter - 1;
                                          thisEle.remove();
                                        }
                                        else{
                                            msgStr = resources.multiFileDelete;
                                            msgTitle = resources.helpdeskimgtxt;
                                            msgBtnValue = resources.btnOk;
                                            navigator.notification.confirm(msgStr, function() {

                                            }, msgTitle, msgBtnValue)
                                         }
                                     });
                                     } catch (e) {
                                     errorHandler("file delete vclick", e);
                                     }
                                     });
            $(".deleteImageOld").off("vclick");
            $(".deleteImageOld").on("vclick","p", function(event) {
                                   try {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        var Deleteid = $(event.currentTarget).children().attr("id");
                                        var thisEle = $(event.currentTarget);
                                        deleteHelpdeskFile(false,Deleteid,function(ret){
                                           if(ret.deleteAzureFileResult){
                                             //var removePTag = "#"+idimg;
                                             for(var i = 0; i < HelpDeskFiles.length; i++) {
                                                   if(HelpDeskFiles[i].name == Deleteid) {
                                                       HelpDeskFiles.splice(i, 1);
                                                       break;
                                                   }
                                             }
                                             filecount.counter = filecount.counter - 1;
                                             thisEle.remove();
                                           }
                                            else{
                                               msgStr = resources.multiFileDelete;
                                               msgTitle = resources.helpdeskimgtxt;
                                               msgBtnValue = resources.btnOk;
                                               navigator.notification.confirm(msgStr, function() {

                                               }, msgTitle, msgBtnValue);
                                            }
                                        });

                                   } catch (e) {
                                   errorHandler("issues vclick", e);
                                   }
                                   });
            $(".issuefiledownload").off("vclick");
            $(".issuefiledownload").on("vclick", function(event) {
                                       try {
                                       event.preventDefault();
                                       event.stopPropagation();
                                       openIssueFile(event);
                                       hidePleaseWait();
                                       } catch (e) {
                                       errorHandler("issues vclick", e);
                                       }
                                       });
            $(".addnewissuefilebtn").off("vclick");
            $(".addnewissuefilebtn").on("vclick", function(event) {
                                        try {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        hideKeyboard(event, true);
                                        uploadIssueFile(event);
                                        hidePleaseWait();
                                        } catch (e) {
                                        errorHandler("issues vclick", e);
                                        }
                                        });
            $(".sendsupportupdatebtn").off("vclick");
            $(".sendsupportupdatebtn").on("vclick", function(event) {
                                          try {
                                          event.preventDefault();
                                          event.stopPropagation();
                                          showPleaseWait();
                                          hideKeyboard(event, true);
                                          hideLoadingOK = false;
                                          if (deviceIsOnline === false) {
                                          msgStr = resources.functionConnError;
                                          msgTitle = resources.connError;
                                          msgBtnValue = resources.btnOk;
                                          navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                                          } else {
                                          addComment(event);
                                          setPagePadderDiv("helpdeskScroller");
                                          }
                                          hidePleaseWait();
                                          } catch (e) {
                                          errorHandler("issues vclick", e);
                                          }
                                          });
            $(".cancelsupportupdatebtn").off("vclick");
            $(".cancelsupportupdatebtn").on("vclick", function(event) {
                                            try {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            hideKeyboard(event, true);
                                            cancelSupportComment(event);
                                            hidePleaseWait();
                                            } catch (e) {
                                            errorHandler("cancelsupportupdatebtn vclick", e);
                                            }
                                            });
            $(".removenewissuefilebtn").off("vclick");
            $(".removenewissuefilebtn").on("vclick", function(event) {
                                           try {
                                           event.preventDefault();
                                           event.stopPropagation();
                                           $(this).focus();
                                           hideKeyboard(event, false);
                                           fileUploadUri="";
                                           var id = $(event.currentTarget).attr("id");
                                           var ids = id.split("-");
                                           var issueid = ids[1];
                                           $("#removenewfilesitemdiv-" + issueid).hide();
                                           $("#addnewfilesitemdiv-" + issueid).show();

                                           } catch (e) {
                                           errorHandler("deleteissuenewfilebtn vclick", e);
                                           }
                                           });
            $(".commenttextarea").off("vclick");
            $(".commenttextarea").on("vclick", function(event) {
                                     try {
										 $(".commenttextarea").focus();
                                     var id = $(event.currentTarget).attr("id");
                                     var ids = id.split("-");
                                     currentIssueId = ids[1];
                                     commentTextAreaResize = true;
                                     event.preventDefault();
                                     event.stopPropagation();
                                     if (device.platform === "Android") {
                                     if (helpdeskScroller !== undefined) {
                                     if (tablet === false) {
                                     $(".scrollpadderdiv").show();
                                     }
                                     setPagePadderDiv("helpdeskScroller", false);
                                     helpdeskScroller.scrollToElement("#" + id, 300);
                                     setTimeout(function() {
                                                showAndroidKeyboard();
                                                $("#" + id).focus();
                                                }, 300);
                                     } else {
                                     showAndroidKeyboard();
                                     }
                                     } else {
                                     $("#" + id).focus();
                                     }
                                     } catch (e) {
                                     errorHandler("commenttextarea vclick", e);
                                     }
                                     });
            $(".removefilebtn").off("vclick");
            $(".removefilebtn").on("vclick", function(event) {
                                   try {
                                   event.preventDefault();
                                   event.stopPropagation();
                                   hideKeyboard(event, true);
                                   if (deviceIsOnline === false) {
                                   msgStr = resources.functionConnError;
                                   msgTitle = resources.connError;
                                   var msgmsgBtnValue = resources.btnOk;
                                   navigator.notification.confirm(msgStr, function() {}, msgTitle, msgmsgBtnValue);
                                   } else {
                                   deleteCommentIssueFile(event);
                                   }
                                   } catch (e) {
                                   errorHandler("removefilebtn vclick", e);
                                   }
                                   });
            $(".commenttextarea").on("focus", function(event) {
                                     setTimeout(function() {
                                                if (device.platform === "Android" && tablet === false) {
                                                window.scrollTo(0, 0);
                                                document.body.scrollTop = 0;
                                                setPagePadderDiv("helpdeskScroller");
                                                }
                                                }, 300);
                                     });
            $(".supportfields").off("vclick");
            $(".supportfields").on("vclick", function(event) {
                                   event.preventDefault();
                                   event.stopPropagation();
                                   hideKeyboard(event, false);
                                   });
            $(".issuefields").off("vclick");
            $(".issuefields").on("vclick", function(event) {
                                 event.preventDefault();
                                 event.stopPropagation();
                                 hideKeyboard(event, false);
                                 });
            $(".issuescollapsibleset").off("vclick");
            $(".issuescollapsibleset").on("vclick", function(event) {
                                          hideKeyboard(event, false);
                                          });
            $("textarea").on("blur", function(e) {
                             window.scrollTo(0, 0);
                             });
            setPagePadderDiv("helpdeskScroller");
        }
    } catch (e) {
        errorHandler("setIssuesVClick", e);
    }
}

function getMessages(event, direction) {
    try {
        showPleaseWait();
        if (direction == "next") {
            messagePage += 1;
        } else {
            if (messagePage > 1) {
                messagePage -= 1;
            }
        }
        var searchValue = $("#messagesearch").val();
        if (searchValue != undefined && searchValue.length > 0) {
            activeUser.getSearchIssuesListView(searchValue, messagePage, issuesPerPage, function(ret) {
                                               $("#imessagesearch").val("");
                                               setIssuesVClick(ret);
                                               hidePleaseWait();
                                               });
        } else {
            activeUser.getIssuesListView(messagePage, issuesPerPage, function(ret) {

                    if(messagePage == 1){
                        iUpload = 0;
                        iLen= 9;
                    }

                    else if(messagePage == 2){
                       iUpload = 10;
                        iLen= 19;
                    }

                    else if(messagePage == 3){
                       iUpload = 30;
                        iLen= 19;
                    }

                    else if(messagePage == 4){
                       iUpload = 40;
                        iLen= 19;
                    }

                    else if(messagePage == 5){
                       iUpload = 50;
                        iLen= 19;
                    }

                    else if(messagePage == 6){
                       iUpload = 60;
                        iLen= 19;
                    }

                    else if(messagePage == 7){
                       iUpload = 70;
                        iLen= 19;
                    }

                    else if(messagePage == 8){
                       iUpload = 80;
                        iLen= 19;
                    }
                                         setIssuesVClick(ret);
                                         hidePleaseWait();


                                         for(var j=iUpload;j< activeUser.issues.length;j++){
                                             //console.log(j);
                                             //console.log(activeUser.issues[i].issueid);
                                            var idUpload= "#file-uploader-"+activeUser.issues[j].issueid;
                                            $(idUpload).dxFileUploader({
                                                name: "file",
                                                accept: "*",
                                                uploadUrl: "https://upload.eteacher.pro/ChunkUploadLatest.aspx?userId="+activeUser.userId+"&portalId=40&fileCount="+filecount.counter+ "&fileName=",
                                                //uploadUrl: "https://studentdesktop.eteacher.pro/data/ChunkUpload.aspx?userId=152781&portalId=40&fileCount=0",
                                                chunkSize: 200000,
                                                allowedFileExtensions:[".doc",".docx",".xls",".xlsx",".ppt",".pptx",".txt",".pdf",".mp4",".mov",".jpg",".jpeg",".png",".gif"],
                                                onUploadStarted: onUploadStarted,
                                                onProgress: onUploadProgress,
                                                onUploaded: onUploadComplete,
                                                onUploadError: onUploadError,
                                                 onValueChanged: onValueChanged,
                                                 onUploadAborted: onUploadAborted
                                            });

                                         }

                                         function onUploadAborted(e) {
                                             if (e.file) {
                                                 document.getElementsByClassName("dx-fileuploader-button")[0].style.display = 'block';
                                                 document.getElementsByClassName("dx-fileuploader-files-container")[0].style.display = 'none';
                                                 //console.log(e.file);
                                                 //console.log(e.file.name);
                                                 deleteHelpdeskFile(false,e.file.name,function(ret){
                                                     if(ret.deleteAzureFileResult){
                                                            for(var i = 0; i < HelpDeskFiles.length; i++) {
                                                                  if(HelpDeskFiles[i].name == e.file.name) {
                                                                      HelpDeskFiles.splice(i, 1);
                                                                      break;
                                                                  }
                                                              }
                                                     }
                                                     else{
                                                         msgStr = resources.multiFileDelete;
                                                         msgTitle = resources.helpdeskimgtxt;
                                                         msgBtnValue = resources.btnOk;
                                                         navigator.notification.confirm(msgStr, function() {

                                                         }, msgTitle, msgBtnValue)
                                                      }
                                                 });
                                             }
                                         }

                                         function onValueChanged(e) {
                                             if(e.value == ""){
                                                 HelpDeskFiles.splice(HelpDeskFiles.length - 1, 1);
                                             }
                                             else{
                                                 var count = 0;
                                                 var lastIndex = e.value[0].name.lastIndexOf(".");
                                                 var prefixName = e.value[0].name.substring(0, lastIndex);
                                                 var stringToReplace = prefixName.replace(/[^\w\s]/gi, '');
                                                 console.log(stringToReplace);
                                                 var currentItem = { name: '', type: '' };
                                                 if(HelpDeskFiles.length > 0){
                                                     for (var i = 0; i < HelpDeskFiles.length; i++) {
                                                        if (HelpDeskFiles[i].name.includes(stringToReplace)) {
                                                            count++;
                                                        }
                                                     }
                                                 }

                                                 if (count > 0) {
                                                    currentItem.name = stringToReplace + count + "." + e.value[0].name.substring(lastIndex+ 1);
                                                 } else {
                                                     //console.log(prefixName +"   ------   "+  e.value[0].name.substring(lastIndex+ 1))
                                                    currentItem.name = stringToReplace+"."+e.value[0].name.substring(lastIndex+ 1);
                                                    //currentItem.name = e.value[0].name;
                                                 }
                                                 currentItem.type = e.value[0].type;
                                                 HelpDeskFiles.push(currentItem);
                                                 console.log(HelpDeskFiles);
                                                 e.component.option("uploadUrl", 'https://upload.eteacher.pro/ChunkUploadLatest.aspx' + "?userId=" + activeUser.userId + "&portalId=40&fileCount=" + filecount.counter+ "&fileName="+ HelpDeskFiles[HelpDeskFiles.length - 1].name);
                                             }

                                             //e.component.option("uploadUrl", 'https://upload.eteacher.pro/ChunkUpload.aspx' + "?userId=" + activeUser.userId + "&portalId=40&fileCount=" + filecount.counter);
                                         }


                                         function onUploadStarted(e) {
                                             document.getElementsByClassName("dx-fileuploader-files-container")[0].style.display = 'block';
                                             getChunkPanel().innerHTML = '';
                                         }
                                         function onUploadProgress(e) {
                                             //getChunkPanel().appendChild(addChunkInfo(e.segmentSize, e.bytesLoaded, e.bytesTotal));
                                         }

                                         function onUploadComplete(e){
                                            console.log(HelpDeskFiles);
                                            document.getElementsByClassName("dx-fileuploader-files-container")[0].style.display = 'none';
                                             var id = $(e.element).attr("id");
                                             var ids = id.split("-");
                                             var newfileissueid = ids[2];
                                             var filenameOld = "#filenameOld"+newfileissueid;
                                             $(filenameOld).append('<p class="deleteImages-'+newfileissueid+'" style="margin:0px;"  id='+ HelpDeskFiles[HelpDeskFiles.length - 1].name + ' >'+HelpDeskFiles[HelpDeskFiles.length - 1].name+'<span  id='+ HelpDeskFiles[HelpDeskFiles.length - 1].name + ' style=color:#ef5351; >  &#10006;</span></p><br>');
                                             filecount.counter++;
                                             // console.log(e.file.name);
                                             // console.log(e.file.size);
                                             // console.log(e.file.name);
                                             // console.log(e.file.name);
                                         }

                                         function onUploadError(e){
                                             //filecount.counter = filecount.counter - 1;
                                             console.log("error");
                                         }

                                         function addChunkInfo(segmentSize, loaded, total) {
                                             var result = document.createElement("DIV");

                                             result.appendChild(createSpan("Chunk size:"));
                                             result.appendChild(createSpan(getValueInKb(segmentSize), 'segment-size'));
                                             result.appendChild(createSpan(", Uploaded:"));
                                             result.appendChild(createSpan(getValueInKb(loaded), 'loaded-size'));
                                             result.appendChild(createSpan("/"));
                                             result.appendChild(createSpan(getValueInKb(total), 'total-size'));

                                             return result;
                                         }
                                         function getValueInKb(value) {
                                             return (value / 1024).toFixed(0) + "kb";
                                         }
                                         function createSpan(text, className) {
                                             var result = document.createElement("SPAN");
                                             if (className)
                                             result.className = className + " dx-theme-accent-as-text-color";
                                             result.innerText = text;
                                             return result;
                                         }
                                         function getChunkPanel() {
                                             return document.querySelector('.chunk-panel');
                                         }
                                         });
        }
        $("#issueitem textarea").val("");
        $("#support-subject").val("");
        if ($("#select-issue") != undefined) {
            $("#select-issue").val($("#select-issue option:first").val());
            $("#select-issue").selectmenu("refresh");
        }
    } catch (e) {
        errorHandler("getMessages", e);
    }
}

function cancelSupportComment(event) {
    try {
        var id = $(event.currentTarget).attr("id");
        var ids = id.split("-");
        var issueId = ids[1];
        $("#removenewfilesitemdiv-" + issueId).hide();
        $("#addnewfilesitemdiv-" + issueId).show();
        $("#textarea-" + issueId).val("");
        fileUploadUri = "";

    } catch (e) {
        errorHandler("cancelSupportComment", e);
    }
}
function addIssue() {
    try {
        showPleaseWait();
        var comment = $("#issueitemtextarea").val();
        var subject = $("#support-subject").val();
        var categoryId = $("#select-issue").val();
        if (comment == undefined || comment.length === 0) {
            msgStr = resources.issuesNoComment;
            msgTitle = resources.connError;
            msgBtnValue = resources.btnOk;
            navigator.notification.confirm(msgStr, function() {
                                           $("#issueitemtextarea").focus();
                                           if (device.platform === "Android") {
                                           var id = $("#issueitemtextarea").attr("id");
                                           if (helpdeskScroller !== undefined) {
                                           if ($(id) != undefined) {
                                           if (tablet === false ) {
                                           $(".scrollpadderdiv").show();
                                           }
                                           setPagePadderDiv("helpdeskScroller", false);
                                           helpdeskScroller.scrollToElement("#" + id, 300);
                                           setTimeout(function() {
                                                      showAndroidKeyboard();
                                                      }, 300);
                                           } else {
                                           showAndroidKeyboard();
                                           }
                                           } else {
                                           showAndroidKeyboard();
                                           }
                                           }
                                           hidePleaseWait();
                                           }, msgTitle, msgBtnValue);
        } else {
            if (subject == undefined || subject.length === 0) {
                msgStr = resources.issueNoTitle;
                msgTitle = resources.addComment;
                msgBtnValue = resources.btnOk;
                navigator.notification.confirm(msgTitle, function() {
                                               $("#support-subject").focus();
                                               if (device.platform === "Android") {
                                               if (tablet === false) {
                                               $(".scrollpadderdiv").show();
                                               }
                                               setPagePadderDiv("helpdeskScroller", false);
                                               helpdeskScroller.scrollToElement("#support-subject", 300);
                                               showAndroidKeyboard();
                                               }
                                               hidePleaseWait();
                                               }, msgTitle, msgBtnValue);
            } else {
                var ids = categoryId.split("-");
                var id = ids[1];
                var category = activeUser.getIssueCategory(id);
		if (fileUploadUri.length > 0){
// Convert image
getFileContentAsBase64(fileUploadUri,function(base64Image){


helpdeskuploadfilename = fileUploadUri.substr(fileUploadUri.lastIndexOf("/") + 1);
helpuploadfiletype= getfiletype(helpdeskuploadfilename);
var removefiletype="data:"+helpuploadfiletype+";base64,";

  uploadfiledata=base64Image;
  uploadfiledata = uploadfiledata.replace(removefiletype, "");

  helpdekuploadfileSize = uploadfiledata.length;
 
			}); }
                activeUser.addUserIssue(category.projectid, subject, category.categoryid, comment, function(ret) {
                                        currentIssueId = ret;
                                        if (ret > 0) {

                                        msgStr = resources.issueSaveSuccess;
                                        msgTitle = resources.addIssue;
                                        msgBtnValue = resources.btnOk;
                                        navigator.notification.confirm(msgStr, function() {
                                                                       hidePleaseWait();
                                                                       filecount.counter = 1;
                                                                        $("#filename").html("");
                                                                      $('.bar').css("width","0%");
                                                                        $('.bar').html("");
                                                                       $("#issueitemtextarea").val("");
                                                                       $("#support-subject").val("");
                                                                       fileUploadUri = "";
                                                                       HelpDeskFiles = [];
                                                                       $(".removefilesitemdiv").hide();
                                                                       $(".addfilesitemdiv").show();
                                                                       if ($("#select-issue") != undefined) {
                                                                       $("#select-issue").val($("#select-issue option:first").val());
                                                                       $("#select-issue").selectmenu("refresh");
                                                                       }
                                                                       refreshIssueList(currentIssueId, function() {
                                                                                        hidePleaseWait();
                                                                                        });
                                                                       }, msgTitle, msgBtnValue);
                                        //}
                                        } else {
                                        msgStr = resources.issueSaveFail;
                                        msgTitle = resources.addIssue;
                                        msgBtnValue = resources.btnOk;
                                        navigator.notification.confirm(msgStr, function() {
                                                                       $("#issueitemtextarea").focus();
                                                                       if (device.platform === "Android") {
                                                                       showAndroidKeyboard();
                                                                       }
                                                                       hidePleaseWait();
                                                                       }, msgTitle, msgBtnValue);
                                        }
                                        });
            }
        }
    } catch (e) {
        errorHandler("addIssue", e);
    }
    return true;
}

function addComment(event) {
    try {
        showPleaseWait();
        hideLoadingOK = false;
        var id = $(event.currentTarget).attr("id");
        var ids = id.split("-");
        var issueid = ids[1];
        var commentTextArea = "#textarea-" + issueid;
        var comment = $(commentTextArea).val();
        gImageId = "addissueimg-" + issueid;
        if (comment == undefined || comment.length === 0) {
            msgStr = resources.issuesNoComment;
            msgTitle = resources.addComment;
            msgBtnValue = resources.btnOk;
            navigator.notification.confirm(msgStr, function() {
                                           $(commentTextArea).focus();
                                           if (device.platform === "Android") {
                                           if (tablet === false ) {
                                           $(".scrollpadderdiv").show();
                                           }
                                           setPagePadderDiv("helpdeskScroller", false);
                                           helpdeskScroller.scrollToElement("#" + id, 300);
                                           showAndroidKeyboard();
                                           }
                                           hidePleaseWait();
                                           return false;
                                           }, msgTitle, msgBtnValue);
        } else {
            var issue = activeUser.getIssueById(issueid);
            if (issue != undefined) {
                currentIssueId = issueid;
				if (fileUploadUri.length > 0){
// Convert image
getFileContentAsBase64(fileUploadUri,function(base64Image){


helpdeskuploadfilename = fileUploadUri.substr(fileUploadUri.lastIndexOf("/") + 1);
helpuploadfiletype= getfiletype(helpdeskuploadfilename);
var removefiletype="data:"+helpuploadfiletype+";base64,";
//var removefiletype="data:image/jpeg;base64,";
  //window.open(base64Image);
  uploadfiledata=base64Image;
  uploadfiledata = uploadfiledata.replace(removefiletype, "");

  helpdekuploadfileSize = uploadfiledata.length;
			}); }

			setTimeout(function() {
                issue.addIssueComment(issue.projectid, issueid, issue.issuetitle, issue.issuecategoryid, comment, function(ret) {
                                      msgTitle = resources.addComment;
                                      msgBtnValue = resources.btnOk;
                                      if (ret == true) {
                                      hideLoadingOK = true;
                                      msgStr = resources.commentSaveSuccess;
                                      navigator.notification.confirm(msgStr, function() {
                                                                     $(comment).val("");
                                                                     filecount.counter = 1;
                                                                     fileUploadUri = "";
                                                                     HelpDeskFiles = [];
                                                                     refreshIssueList(currentIssueId, function() {
                                                                                      hidePleaseWait();
                                                                                      });
                                                                     }, msgTitle, msgBtnValue);
                                     // }
                                      } else {
                                      hidePleaseWait();
                                      msgStr = resources.commentSaveFail;
                                      navigator.notification.confirm(msgStr, function() {
                                                                     hidePleaseWait();
                                                                     }, msgTitle, msgBtnValue);
                                      }
                                      });
									 }, 1300);
            }
        }
    } catch (e) {
        errorHandler("addComment", e);
    }
}

function uploadIssueFile(event) {
    try {
        event.preventDefault();
        event.stopPropagation();
        showPleaseWait();
        fileUploadUri = "";
        var id = $(event.currentTarget).attr("id");
        var ids = id.split("-");
        newfileissueid = ids[1];
        var fileNoSupportError = "#fileNoSupportError"+newfileissueid;
                $(fileNoSupportError).empty();
        fileCaptureOld(Camera.PictureSourceType.SAVEDPHOTOALBUM,newfileissueid);
        //fileCapture(Camera.PictureSourceType.SAVEDPHOTOALBUM);
    } catch (e) {
        errorHandler("uploadIssueFile", e);
    }
}

function fileCaptureOld(sourceType,newfileissueid) {
    try {
      hidePleaseWait();
      var HelpDeskfileName;
		  window.plugins.mfilechooser.open([], function (uri) {
        console.log(uri);
        var fileURL = uri;

        uploadHelpdeskMultiImageOld(fileURL,filecount,newfileissueid);



        //onCaptureSuccess(uri);

    }, function (error) {

        alert(error);

    });
    } catch (e) {
        errorHandler("fileCapture", e);
    }
}

function uploadNewIssueFile(event) {
    try {
        hideKeyboard(event, true);
        showPleaseWait();
        fileUploadUri = "";
        var fileNoSupportError = "#fileNoSupportError";
                $(fileNoSupportError).empty();
        fileCapture(Camera.PictureSourceType.SAVEDPHOTOALBUM);
    } catch (e) {
        errorHandler("uploadNewIssueFile", e);
    }
}
function fileCapture(sourceType) {
    try {
      hidePleaseWait();

		  window.plugins.mfilechooser.open([], function (uri) {
              var fileURL = uri;

           uploadHelpdeskMultiImage(fileURL,filecount);


      //onCaptureSuccess(uri);

    }, function (error) {

        alert(error);

    });
    } catch (e) {
        errorHandler("fileCapture", e);
    }
}
function onCaptureSuccess(imageURI) {
    try {
        if (StatusBar !== undefined) {
            setTimeout(function() {
                       StatusBar.hide();
                       }, 300);
        }
        fileUploadUri = imageURI;
        $(".removefilesitemdiv").show();
        $(".addfilesitemdiv").hide();
        $("#removenewfilesitemdiv").show();
        $("#addnewfilesitemdiv").hide();
        hidePleaseWait();
        setTimeout(function(){
                   var removebtn = "#removenewissuefilebtn-" + newfileissueid;
                   $(removebtn).show();
                   $("#removenewfilesitemdiv-" + newfileissueid).show();
                   $("#addnewfilesitemdiv-" + newfileissueid).hide();
                   }, 300);
    } catch (e) {
        errorHandler("capture", e);
    }
}

function onCaptureFail(message) {
    hidePleaseWait();
    if (StatusBar !== undefined) {
        setTimeout(function() {
                   StatusBar.hide();
                   }, 300);
    }
}



function getFileContentAsBase64(path,callback){
	var fullpath="file://"+path;
    window.resolveLocalFileSystemURL(fullpath, gotFile, fail);
    function fail(e) {
          alert('Cannot found requested file');
    }

    function gotFile(fileEntry) {
           fileEntry.file(function(file) {
              var reader = new FileReader();
              reader.onloadend = function(e) {
                   var content = this.result;
                   callback(content);
              };
            
              reader.readAsDataURL(file);
           });
    }
}






function getImageFileData(fileUri, issue, newIssue) {
    try {
        hideLoadingOK = false;
        var lastFileOK = false;
        var dataUri = "";
        var fileName = "";
        var newFileName = "";
        var fileSize = 0;
        var filesToAdd = 0;
        var notificationMessage = newIssue == true ? "Issue successfully saved.  File upload successful." : "Comment successfully saved.  File upload successful.";
        var notificationMessage2 = newIssue == true ? "Issue successfully saved.  File upload failed.  Please try later." : "Comment successfully saved.  File upload failed.  Please try later.";
        var notificationTitle = newIssue == true ? "Add Issue" : "Add Comment";
        var img = document.createElement("img");
        if (newIssue) {
            newFileName="issue_"+issue.issueid + "_0";

        } else {
            newFileName = issue.getNewFileName();
        }

        fileName = newFileName + ".png";

        img.src = fileUri;
        img.style.position = "absolute";
        img.style.left = "0px";
        img.style.top = "-999999em";
        img.style.maxWidth = "none";
        img.style.width = "30%";
        img.style.height = "30%";
        $(img).on("load", function(event) {
                  var canvas = document.createElement("canvas");
                  var imgWidth = img.width;
                  var imgHeight = img.height;
                  var percentScale = 1;
                  canvas.width = imgWidth;
                  canvas.height = imgHeight;
                  var ctx = canvas.getContext("2d");
                  if (imgWidth > 1024 || imgHeight > 1024) {
                  if (imgHeight > imgWidth) {
                  percentScale = Math.floor((1024 / imgWidth) * 100);
                  } else {
                  percentScale = Math.floor((1024 / imgHeight) * 100);
                  }
                  imgWidth = (imgWidth * percentScale) / 100;
                  imgHeight = (imgHeight * percentScale) / 100;
                  }
                  ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
                  dataUri = canvas.toDataURL();
                  $(canvas).remove();
                  dataUri = dataUri.replace("data:image/png;base64,", "");
                  fileSize = dataUri.length;
                  issue.addIssueFile(fileName, fileSize, "image/png", dataUri, function(ret) {
                                     hideLoadingOK = true;
                                     if (ret == true) {
                                     showPleaseWait();
                                     fileUploadUri = "";
                                     navigator.notification.confirm(notificationMessage, function() {
                                                                    if (newIssue) {
                                                                    $("#issueitemtextarea").val("");
                                                                    $("#support-subject").val("");
                                                                    $("#addissueimg").replaceWith(fileUploadImg);
                                                                    if ($("#select-issue") != undefined) {
                                                                    $("#select-issue").val($("#select-issue option:first").val());
                                                                    $("#select-issue").selectmenu("refresh");
                                                                    $(".removefilesitemdiv").hide();
                                                                    $(".addfilesitemdiv").show();
                                                                    }
                                                                    } else {
                                                                    var commentTextArea = "#textarea-" + issue.issueid;
                                                                    $(commentTextArea).val("");
                                                                    $(".addnewfilesitemdiv").show();
                                                                    $(".removenewfilesitemdiv").hide();
                                                                    }
                                                                    $(img).remove();
                                                                    saveLocalImageFile(issue, newFileName, dataUri, function() {});
                                                                    refreshIssueList(currentIssueId, function() {
                                                                                     hidePleaseWait();
                                                                                     });

                                                                    }, notificationTitle, "OK");

                                     } else {
                                     navigator.notification.confirm(notificationMessage2, function() {
                                                                    if (newIssue) {
                                                                    $("#issueitemtextarea").val("");
                                                                    $("#support-subject").val("");
                                                                    if ($("#select-issue") != undefined) {
                                                                    $("#select-issue").val($("#select-issue option:first").val());
                                                                    $("#select-issue").selectmenu("refresh");
                                                                    }
                                                                    $(".removefilesitemdiv").hide();
                                                                    $(".addfilesitemdiv").show();
                                                                    } else {
                                                                    var commentTextArea1 = "#textarea-" + issue.issueid;
                                                                    $(commentTextArea1).val("");
                                                                    $(".addnewfilesitemdiv").show();
                                                                    $(".removenewfilesitemdiv").hide()
                                                                    }
                                                                    refreshIssueList(currentIssueId, function() {
                                                                                     hidePleaseWait();
                                                                                     });
                                                                    hidePleaseWait();
                                                                    $(img).remove();
                                                                    }, notificationTitle, "OK");
                                     }
                                     });
                  });
    } catch (e) {
        errorHandler("getImageFileData", e);
    }
}

function saveLocalImageFile(issue, fileName, fileData, returnFunction) {
    try {
        var issueDirectory = issue.issueid.toString();
        var fileContent = "<!DOCTYPE html><html><title></title><head></head><body>";
        var htmlData = "";
        helpDeskDir.getDirectory(issueDirectory, {
                                 create: true
                                 }, function(dir) {
                                 fileName += ".html";
                                 dir.getFile(fileName, {
                                             create: true,
                                             exclusive: false
                                             }, function(fileEntry) {
                                             htmlData = "data:image/png;base64, " + fileData;
                                             fileContent += "<div class='imagefilediv'><img class='hpfile' src='";
                                             fileContent += htmlData;
                                             fileContent += "' alt=''/></div></body></html>";
                                             fileEntry.createWriter(function(writer) {
                                                                    writer.onwrite = function(evt) {};
                                                                    writer.onerror = fail;
                                                                    writer.write(fileContent);
                                                                    }, fail);
                                             }, fail);
                                 }, fail);
    } catch (e) {
        errorHandler("saveLocalImageFile", e);
    }
}

function deleteCommentIssueFile(event) {
    try {
        showPleaseWait();
        var id = $(event.currentTarget).attr("id");
        var ids = id.split("-");
        downloadIssueid = ids[1];
        downloadFileid = ids[2];
        var fileli = "#filelink-" + id;
        var issueli = "#issue-" + downloadIssueid;
        var issue = activeUser.getIssueById(downloadIssueid);
        if (issue != undefined) {
            currentIssueId = downloadIssueid;
            viewFile = issue.getFile(downloadFileid);
            issue.deleteIssueFile(downloadIssueid, downloadFileid, function(ret) {
                                  if (ret == true) {
                                  msgTitle = resources.deleteimgfile;
                                  msgBtnValue = resources.btnOk;
                                  msgStr = resources.filedeletedsuccess;
                                  navigator.notification.confirm(msgStr, function() {
                                                                 fileUploadUri = "";
                                                                 $("#" + gImageId).replaceWith(fileUploadImg);
                                                                 refreshIssueList(currentIssueId, function() {
                                                                                  hidePleaseWait();
                                                                                  });
                                                                 hidePleaseWait();
                                                                 deleteLocalFile(downloadIssueid, downloadFileid, function() {});
                                                                 }, msgTitle, msgBtnValue);
                                  } else {
                                  msgTitle = resources.deleteimgfile;
                                  msgBtnValue = resources.btnOk;
                                  msgStr = resources.filedeletefail;
                                  navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                                  }
                                  });
        }
    } catch (e) {
        errorHandler("deleteIssueFile", e);
    }
}

function deleteLocalFile(issueId, fileId, returnFunction) {
    try {
        if (viewFile == undefined) {
            returnFunction(false);
        }
        var issueDirectory = issueId.toString();
        if (helpDeskDir != undefined) {
            helpDeskDir.getDirectory(issueDirectory, {
                                     create: false
                                     }, checkExistingFileDirExists, fail);
        }
    } catch (e) {
        errorHandler("deleteLocalFile", e);
    }
}

function checkExistingFileDirExists(dir) {
    try {
        var existingFileName = getIssueFileName(viewFile);
        dir.getFile(existingFileName, {
                    create: false
                    }, localIssueFileDelete, fail);
    } catch (e) {
        errorHandler("checkExistingFileDirExists", e);
    }
}

function localIssueFileDelete(fileEntry) {
    try {
        fileEntry.remove();
    } catch (e) {
        errorHandler("localIssueFileDelete", e);
    }
}

function openIssueFile(event) {
    try {
        showPleaseWait();
        var id = $(event.currentTarget).attr("id");
        var ids = id.split("-");
        downloadIssueid = ids[1];
        downloadFileid = ids[2];
        var issue = activeUser.getIssueById(downloadIssueid);
        //var fileName  = event.target.innerText;
        var fileName  = event.target.id;
        if (downloadFileid != "0"){
            if (issue != undefined) {
                viewFile = issue.getFile(downloadFileid);
                if (viewFile != undefined) {
                    if (!allowShowFile(viewFile)) {
                        msgTitle = resources.fileerror;
                        msgBtnValue = resources.btnOk;
                        msgStr = resources.fileviewfail;
                        navigator.notification.confirm(msgStr, function() {
                           hidePleaseWait();
                        }, msgTitle, msgBtnValue);
                    } else {
                        var issueDirectory = issue.issueid.toString();
                        if (helpDeskDir != undefined) {
                            showPleaseWait();
                            helpDeskDir.getDirectory(issueDirectory, {
                              create: true,
                              exclusive: false
                            }, checkETeacherDirExists, fail);
                        }
                    }
                }
            }
        }
        else{

            downloadHDImages(fileName,downloadIssueid);
        }

        /*if (issue != undefined) {
            viewFile = issue.getFile(downloadFileid);
            if (viewFile != undefined) {
                if (!allowShowFile(viewFile)) {
                    msgTitle = resources.fileerror;
                    msgBtnValue = resources.btnOk;
                    msgStr = resources.fileviewfail;
                    navigator.notification.confirm(msgStr, function() {
                       hidePleaseWait();
                    }, msgTitle, msgBtnValue);
                } else {
                    var issueDirectory = issue.issueid.toString();
                    if (helpDeskDir != undefined) {
                        showPleaseWait();
                        helpDeskDir.getDirectory(issueDirectory, {
                          create: true,
                          exclusive: false
                        }, checkETeacherDirExists, fail);
                    }
                }
            }
        }*/
    } catch (e) {
        errorHandler("openIssueFile", e);
    }
}

/*function openIssueFile(event) {
    try {
        showPleaseWait();
        var id = $(event.currentTarget).attr("id");
        var ids = id.split("-");
        downloadIssueid = ids[1];
        downloadFileid = ids[2];
        var issue = activeUser.getIssueById(downloadIssueid);
        if (issue != undefined) {
            viewFile = issue.getFile(downloadFileid);
            if (viewFile != undefined) {
                if (!allowShowFile(viewFile)) {
                    msgTitle = resources.fileerror;
                    msgBtnValue = resources.btnOk;
                    msgStr = resources.fileviewfail;
                    navigator.notification.confirm(msgStr, function() {
                       hidePleaseWait();
                    }, msgTitle, msgBtnValue);
                } else {
                    var issueDirectory = issue.issueid.toString();
                    if (helpDeskDir != undefined) {
                        showPleaseWait();
                        helpDeskDir.getDirectory(issueDirectory, {
                          create: true,
                          exclusive: false
                        }, checkETeacherDirExists, fail);
                    }
                }
            }
        }
    } catch (e) {
        errorHandler("openIssueFile", e);
    }
}*/

function allowShowFile(issueFile) {
    try {
        if (issueFile.filetype === "image/png" || issueFile.filetype === "image/jpg" || issueFile.filetype === "image/jpeg" || issueFile.filetype === "image/gif" || issueFile.filetype === "image/pjpeg" || issueFile.filetype === "image/bmp" || issueFile.filetype === "image/tiff" || issueFile.filetype === "text/plain" || issueFile.filetype === "text/html" || issueFile.filetype === "application/pdf" || issueFile.filetype === "application/rtf" || (issueFile.filetype === "application/octet-stream" && (issueFile.filename.indexOf(".txt") > 0 || issueFile.filename.indexOf(".rtf") > 0 || issueFile.filename.indexOf(".pdf") > 0 || issueFile.filename.toLowerCase().indexOf(".png") > 0))) {
            return true;
        } else {}
    } catch (e) {
        errorHandler("allowShowFile", e);
    }
}

function isImageFile(issueFile) {
    try {
        if (issueFile.filetype === "image/png" || issueFile.filetype === "image/jpg" || issueFile.filetype === "image/jpeg" || issueFile.filetype === "image/gif" || issueFile.filetype === "image/pjpeg" || issueFile.filetype === "image/bmp" || issueFile.filetype === "image/tiff" || (issueFile.filetype === "application/octet-stream" && issueFile.filename.toLowerCase().indexOf(".png") > 0)) {
            return true;
        } else {}
    } catch (e) {
        errorHandler("isImageFile", e);
    }
}

function localIssueFileExists(fileEntry) {
    try {
        helpDeskFileUri = device.platform === "Android" ? fileEntry.toURL() : fileEntry.toURL();
		//helpDeskFileUri=decodeURI(helpDeskFileUri);
		var afterDot = helpDeskFileUri.substr(helpDeskFileUri.lastIndexOf('.')+1).toLowerCase();
		if(afterDot == "pdf"){
			loadHelpdeskPdfFile();

			//loadHelpdeskPdfFile();
		}else{
			loadHelpdeskFile();
		}

    } catch (e) {
        errorHandler("localIssueFileExists", e);
    }
}

function issueFileNotExists() {
    try {
        showPleaseWait();
        var issue = activeUser.getIssueById(downloadIssueid);
        if (issue != undefined) {
            var issueFile = issue.getFile(downloadFileid);
            if (issueFile != undefined) {
                if (isImageFile(issueFile)) {
                    issue.downloadHelpdeskImageFile(downloadIssueid, downloadFileid, function(ret) {
                        if (ret != undefined && ret != false) {
                          viewFile = ret;
                          var issueDirectory = issue.issueid.toString();
                          if (helpDeskDir != undefined) {
                            helpDeskDir.getDirectory(issueDirectory, {
                              create: true,
                              exclusive: false
                            }, saveHelpdeskFile, fail);
                          } else {
                            msgTitle = resources.fileerror;
                            msgBtnValue = resources.btnOk;
                            msgStr = resources.filedownloaderror;
                            navigator.notification.confirm(msgStr, function() {
                              hidePleaseWait();
                            }, msgTitle, msgBtnValue);
                          }
                        } else {
                          msgTitle = resources.fileerror;
                          msgBtnValue = resources.btnOk;
                          msgStr = resources.filedownloaderror;
                          navigator.notification.confirm(msgStr, function() {
                            hidePleaseWait();
                          }, msgTitle, msgBtnValue);
                        }
                    });
                } else {
                    issue.downloadHelpdeskFile(downloadIssueid, downloadFileid, function(ret) {
                                               if (ret != undefined && ret != false) {
                                               showPleaseWait();
                                               viewFile = ret;
                                               var issueDirectory = issue.issueid.toString();
                                               if (helpDeskDir != undefined) {
                                               helpDeskDir.getDirectory(issueDirectory, {
                                                                        create: true,
                                                                        exclusive: false
                                                                        }, saveHelpdeskFile, fail);
                                               } else {
                                               msgTitle = resources.fileerror;
                                               msgBtnValue = resources.btnOk;
                                               msgStr = resources.filedownloaderror;
                                               navigator.notification.confirm(msgStr, function() {
                                                                              hidePleaseWait();
                                                                              }, msgTitle, msgBtnValue);
                                               }
                                               } else {
                                               msgTitle = resources.fileerror;
                                               msgBtnValue = resources.btnOk;
                                               msgStr = resources.filedownloaderror;
                                               navigator.notification.confirm(msgStr, function() {
                                                                              hidePleaseWait();
                                                                              }, msgTitle, msgBtnValue);
                                               }
                                               });
                }
            } else {
                msgTitle = resources.fileerror;
                msgBtnValue = resources.btnOk;
                msgStr = resources.filedownloaderror;
                navigator.notification.confirm(msgStr, function() {
                                               hidePleaseWait();
                                               }, msgTitle, msgBtnValue);
            }
        }
    } catch (e) {
        errorHandler("issueFileNotExists", e);
    }
}

function getIssueFileName(issueFile) {
    try {
        var fileName = "";
        if (issueFile.filetype === "image/png" || issueFile.filetype === "image/jpg" || issueFile.filetype === "image/jpeg" || issueFile.filetype === "image/gif" || issueFile.filetype === "image/tiff" || issueFile.filetype === "text/plain" || (viewFile.filetype === "application/octet-stream" && viewFile.filename.indexOf(".txt") > 0)) {
            fileName = issueFile.filename.substr(0, issueFile.filename.lastIndexOf("."));
            fileName += ".html";
        } else {
            fileName = issueFile.filename;
        }
        return fileName;
    } catch (e) {
        errorHandler("getIssueFileName", e);
    }
}

function saveHelpdeskFile(dir) {
    try {
        var fileName = getIssueFileName(viewFile);
        dir.getFile(fileName, {
                    create: true,
                    exclusive: false
                    }, getHelpdeskFileWriter, fail);
    } catch (e) {
        errorHandler("saveHelpdeskFile", e);
    }
}

function getHelpdeskFileWriter(fe) {
    try {
        helpDeskFileUri = device.platform === "Android" ? fe.toURL() : fe.toURL();
        fe.createWriter(setHelpDeskFile, fail);
    } catch (e) {
        errorHandler("getHelpdeskFileWriter", e);
    }
}

function setHelpDeskFile(writer) {
    try {
        writer.onwrite = function(evt) {
			if(viewFile.filetype=="application/pdf"){
				loadHelpdeskPdfFile();
			}else{
				loadHelpdeskFile();
			}
            
        };
		var filecontent;
		if(viewFile.filetype=="application/pdf"){
			var filecontent = b64toBlob(viewFile.filedata,viewFile.filetype);
		}
		else{
			filecontent=viewFile.filedata;
		}
        writer.write(filecontent);
    } catch (e) {
        errorHandler("setHelpDeskFile", e);
    }
}

function loadHelpdeskFile(evr) {
    try {
		helpDeskFileUri=decodeURI(helpDeskFileUri);
        openWebView(helpDeskFileUri);
        hidePleaseWait();
    } catch (e) {
        errorHandler("loadHelpdeskFile", e);
    }
}

function loadHelpdeskPdfFile(){
	 try {
		androidPDFView(helpDeskFileUri);
		helpDeskFileUri=decodeURI(helpDeskFileUri);
        hidePleaseWait();
    } catch (e) {
        errorHandler("loadHelpdeskFile", e);
    }
	
}

function fail(evt) {}

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}



