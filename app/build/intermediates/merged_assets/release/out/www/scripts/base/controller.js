var userCache;
var userInfoCache;
var networkAvailable = true;
var checkedExtended = false;
var isExtended = true;
var states = {};
var networkState = "";
var Controller = function() {
    try {
        this.init();
    } catch (e) {
        errorHandler("Controller", e);
    }
};
Controller.prototype = {
init: function() {},
coBackgroundProcessing: function() {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     if (activeUser.requiresLogin == false) {
                                     activeUser.setCounts();
                                     }
                                     }
                                     });
    } catch (e) {}
},
coCheckNetworkAvaliable: function(noShowError, returnFunction) {
    try {
        states[Connection.UNKNOWN] = "Unknown connection";
        states[Connection.ETHERNET] = "Ethernet connection";
        states[Connection.WIFI] = "WiFi connection";
        states[Connection.CELL_2G] = "Cell 2G connection";
        states[Connection.CELL_3G] = "Cell 3G connection";
        states[Connection.CELL_4G] = "Cell 4G connection";
        states[Connection.CELL] = "Cell generic connection";
        states[Connection.NONE] = "No network connection";
        networkState = navigator.connection.type;
        if (states[networkState] == "No network connection" || states[networkState] == "Unknown connection") {
            hidePleaseWait();
            if (connectionErrorVisible == false && noShowError == false) {
                connectionErrorVisible = true;
            }
            networkAvailable = false;
            deviceIsOnline = false;
            returnFunction(networkAvailable);
        } else {
            if (states[networkState] == "Cell generic connection" && iosDevice === true) {
                var testUrl = (configs !== undefined) ? configs.getCustom("CS_SITE_URL_CHECK") : "";
                if (testUrl.length > 0) {
                    if (testUrl.indexOf("http://") < 0) {
                        testUrl = "http://" + testUrl;
                    }
                    this.coCheckUrlExists(testUrl, function(status) {
                                          if (status !== 200) {
                                          networkAvailable = false;
                                          //resetFileDownload(function(ret) {});
                                          } else {
                                          networkAvailable = true;
                                          }
                                          deviceIsOnline = networkAvailable;
                                          returnFunction(networkAvailable);
                                          });
                } else {
                    returnFunction(networkAvailable);
                }
            } else {
                if (device.platform === "Android") {
                    deviceIsOnlineCheck();
                    setTimeout(function() {
                               networkAvailable = deviceIsOnline;
                               returnFunction(networkAvailable);
                               }, 0);
                } else {
                    networkAvailable = true;
                    deviceIsOnline = true;
                    returnFunction(networkAvailable);
                }
            }
        }
    } catch (e) {
        errorHandler("checkNetworkAvaliable", e);
        returnFunction(networkAvailable);
    }
},
coCheckUrlExists: function(url, callbackFunction) {
    try {
        jQuery.ajax({
                    url: url,
                    dataType: "text",
                    type: "GET",
                    complete: function(xhr) {
                    if (typeof callbackFunction === "function") {
                    callbackFunction.apply(this, [xhr.status]);
                    }
                    }
                    });
    } catch (e) {
        return false;
    }
},
coCheckCountryLocation: function(lat, lng, callbackFunction) {
    try {
        var urlMethod = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyA2eOQSbXtH1DMTAcHWcVjpKFfEl4rATEc";
        var countryLoc;
        var countryCode = "";
        var countryName = "";
        $.ajax({
               url: urlMethod,
               dataType: "json",
               type: "GET",
               async: true,
               success: function(data, textStatus, jqXHR) {
               countryLoc = data;
               if (countryLoc != undefined && countryLoc.results != undefined) {
               locCountryObj = countryLoc.results;
               var countrySet = false;
               for (var i = 0; i < locCountryObj.length; i++) {
               if (countrySet === true) {
               break;
               }
               var locItem = locCountryObj[i];
               for (var x = 0; x < locItem.address_components.length; x++) {
               var locItemObj = locItem.address_components[x];
               if ($.inArray("country", locItemObj["types"]) > -1) {
               countryCode = locItemObj["short_name"];
               countryName = locItemObj["long_name"];
               countrySet = true;
               break;
               }
               }
               }
               callbackFunction(countryCode);
               } else {
               callbackFunction(countryCode);
               }
               },
               error: function(msg) {
               callbackFunction("");
               }
               });
    } catch (e) {
        callbackFunction("");
    }
},
coNetworkOk: function() {
    return networkAvailable;
},
coSectionsGet: function(filter) {
    try {
        return getSectionsData(true, filter);
    } catch (e) {
        errorHandler("coSectionsGet", e);
    }
},
coCheckLoginAllows: function(item) {
    try {
        if (activeUser.requiresLogin == false) {
            return true;
        }
        var allow = false;
        switch (item) {
            case "index.html":
                allow = true;
                break;
            case "#coursespage":
                break;
            case "loginpage.html":
                allow = true;
                break;
            case "courses.html":
                break;
            case "helpdesk.html":
                break;
            default:
                allow = true;
                break;
        }
        return allow;
    } catch (e) {
        errorHandler("coCheckLoginAllows", e);
    }
},
coLogin: function(autoLogin, returnFunction) {
    try {
        
        this.coCheckNetworkAvaliable(autoLogin, function(retval) {
                                     if (networkAvailable === true) {
                                     getLoginData(false, function(ret) {
                                                  returnFunction(ret);
                                                  });
                                     } else {
                                     getLoginData(true, function(ret) {
                                                  returnFunction(ret);
                                                  });
                                     }
                                     });
    } catch (e) {
        errorHandler("coLogin", e);
    }
},
coFirstTimeLogin: function(autoLogin, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(autoLogin, function(retval) {
                                     if (networkAvailable === true) {
                                     getFirstLoginData(false, function(ret) {
                                                  returnFunction(ret);
                                                  });
                                     } else {
                                     getFirstLoginData(true, function(ret) {
                                                  returnFunction(ret);
                                                  });
                                     }
                                     });
    } catch (e) {
        errorHandler("coLogin", e);
    }
},
coGetCourses: function(returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     getCoursesData(false, function(ret) {
                                                    returnFunction(ret);
                                                    });
                                     } else {
                                     getCoursesData(true, function(ret) {
                                                    returnFunction(ret);
                                                    });
                                     }
                                     });
    } catch (e) {
        errorHandler("coGetCourses", e);
    }
},
coGetLessonStructure: function(moduleId, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     getLessonsData(false, moduleId, function(ret) {
                                                    returnFunction(ret);
                                                    });
                                     } else {
                                     getLessonsData(true, moduleId, function(ret) {
                                                    returnFunction(ret);
                                                    });
                                     }
                                     });
    } catch (e) {
        errorHandler("coGetLessonStructure", e);
    }
},
coGetTheoryAsset: function(sectionId, assetId, sectionOrder, isUnderstood, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     getTheoryAsset(false, sectionId, assetId, sectionOrder, isUnderstood, function(ret) {
                                                    returnFunction(ret);
                                                    });
                                     } else {
                                     getTheoryAsset(true, sectionId, assetId, sectionOrder, isUnderstood, function(ret) {
                                                    returnFunction(ret);
                                                    });
                                     }
                                     });
    } catch (e) {
        errorHandler("coGetTheoryAsset", e);
    }
},
coUserSyncPosition: function(courseId, moduleId, sectionId, assetId, nodekey, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     getTheoryAsset(false, courseId, moduleId, sectionId, assetId, nodekey, function(ret) {
                                                    returnFunction(ret);
                                                    });
                                     } else {
                                     getTheoryAsset(true, courseId, moduleId, sectionId, assetId, nodekey, function(ret) {
                                                    returnFunction(ret);
                                                    });
                                     }
                                     });
    } catch (e) {
        errorHandler("coUserSyncPosition", e);
    }
},
coGetGuidelines: function(courseId, basemoduleId, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     getGuidelines(false, courseId, basemoduleId, function(ret) {
                                                   returnFunction(ret);
                                                   });
                                     } else {
                                     getGuidelines(true, courseId, basemoduleId, function(ret) {
                                                   returnFunction(ret);
                                                   });
                                     }
                                     });
    } catch (e) {
        errorHandler("coGetGuidelines", e);
    }
},
coGetHelpdeskIssues: function(returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     getHelpdeskIssues(false, function(ret) {
                                                       returnFunction(ret);
                                                       });
                                     } else {
                                     getHelpdeskIssues(true, function(ret) {
                                                       returnFunction(ret);
                                                       });
                                     }
                                     });
    } catch (e) {
        errorHandler("coGetHelpdeskIssues", e);
    }
},
coAddHelpdeskIssue: function(projectId, issueTitle, issueCategoryId, comment, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
										 
										  setTimeout(function() {
                               
                              
										 
										 
										 
                                     addHelpdeskIssue(false, projectId, issueTitle, issueCategoryId, comment, function(ret) {
                                                      returnFunction(ret);
                                                      }); 
													  }, 300);
                                     } else {
                                     if (connectionErrorVisible == false) {
                                     connectionErrorVisible = true;
                                     msgStr = resources.noNetwork;
                                     msgTitle = resources.connError;
                                     msgBtnValue = resources.btnOk;
                                     navigator.notification.confirm(msgStr, connectionError, msgTitle, msgBtnValue);
                                     }
									 
									  setTimeout(function() {
                               
                              
									 
									 
									 
                                     addHelpdeskIssue(true, projectId, issueTitle, issueCategoryId, comment, function(ret) {
                                                      returnFunction(ret);
                                                      }); 
													  }, 300);
                                     }
                                     });
    } catch (e) {
        errorHandler("coAddHelpdeskIssue", e);
    }
},
coUpdateHelpdeskIssue: function(projectId, issueId, issueTitle, issueCategoryId, comment, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     updateHelpdeskIssue(false, projectId, issueId, issueTitle, issueCategoryId, comment, function(ret) {
                                                         returnFunction(ret);
                                                         });
                                     } else {
                                     if (connectionErrorVisible == false) {
                                     connectionErrorVisible = true;
                                     msgStr = resources.noNetwork;
                                     msgTitle = resources.connError;
                                     msgBtnValue = resources.btnOk;
                                     navigator.notification.confirm(msgStr, connectionError, msgTitle, msgBtnValue);
                                     }
                                     updateHelpdeskIssue(true, projectId, issueId, issueTitle, issueCategoryId, comment, function(ret) {
                                                         returnFunction(ret);
                                                         });
                                     }
                                     });
    } catch (e) {
        errorHandler("coUpdateHelpdeskIssue", e);
    }
},
coAddHelpdeskComment: function(projectId, issueId, issueTitle, issueCategoryId, comment, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     helpdeskIssueAddComment(false, projectId, issueId, issueTitle, issueCategoryId, comment, function(ret) {
                                                             returnFunction(ret);
                                                             });
                                     } else {
                                     if (connectionErrorVisible == false) {
                                     connectionErrorVisible = true;
                                     msgStr = resources.noNetwork;
                                     msgTitle = resources.connError;
                                     msgBtnValue = resources.btnOk;
                                     navigator.notification.confirm(msgStr, connectionError, msgTitle, msgBtnValue);
                                     }
                                     helpdeskIssueAddComment(true, projectId, issueId, issueTitle, issueCategoryId, comment, function(ret) {
                                                             returnFunction(ret);
                                                             });
                                     }
                                     });
    } catch (e) {
        errorHandler("coAddHelpdeskComment", e);
    }
},
coDeleteHelpdeskFile: function(issueId, fileId, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     helpdeskIssueFileDelete(false, issueId, fileId, function(ret) {
                                                             returnFunction(ret);
                                                             });
                                     } else {
                                     if (connectionErrorVisible == false) {
                                     connectionErrorVisible = true;
                                     msgStr = resources.noNetwork;
                                     msgTitle = resources.connError;
                                     msgBtnValue = resources.btnOk;
                                     navigator.notification.confirm(msgStr, connectionError, msgTitle, msgBtnValue);
                                     }
                                     helpdeskIssueFileDelete(true, issueId, fileId, function(ret) {
                                                             returnFunction(ret);
                                                             });
                                     }
                                     });
    } catch (e) {
        errorHandler("coDeleteHelpdeskFile", e);
    }
},
coUploadHelpdeskFile: function(issueId, fileName, fileSize, fileType, fileData, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     helpdeskFileUpload(false, issueId, fileName, fileSize, fileType, fileData, function(ret) {
                                                        returnFunction(ret);
                                                        });
                                     } else {
                                     if (connectionErrorVisible == false) {
                                     connectionErrorVisible = true;
                                     msgStr = resources.noNetwork;
                                     msgTitle = resources.connError;
                                     msgBtnValue = resources.btnOk;
                                     navigator.notification.confirm(msgStr, connectionError, msgTitle, msgBtnValue);
                                     }
                                     helpdeskFileUpload(true, issueId, fileName, fileSize, fileType, fileData, function(ret) {
                                                        returnFunction(ret);
                                                        });
                                     }
                                     });
    } catch (e) {
        errorHandler("coUploadHelpdeskFile", e);
    }
},
coDownloadHelpdeskFile: function(issueId, fileId, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     helpdeskFileDownload(false, issueId, fileId, function(ret) {
                                                          returnFunction(ret);
                                                          });
                                     } else {
                                     if (connectionErrorVisible == false) {
                                     connectionErrorVisible = true;
                                     msgStr = resources.noNetwork;
                                     msgTitle = resources.connError;
                                     msgBtnValue = resources.btnOk;
                                     navigator.notification.confirm(msgStr, connectionError, msgTitle, msgBtnValue);
                                     }
                                     helpdeskFileDownload(true, issueId, fileId, function(ret) {
                                                          returnFunction(ret);
                                                          });
                                     }
                                     });
    } catch (e) {
        errorHandler("coDownloadHelpdeskFile", e);
    }
},
coDownloadHelpdeskImageFile: function(issueId, fileId, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     helpdeskImageFileDownload(false, issueId, fileId, function(ret) {
                                                               returnFunction(ret);
                                                               });
                                     } else {
                                     if (connectionErrorVisible == false) {
                                     connectionErrorVisible = true;
                                     msgStr = resources.noNetwork;
                                     msgTitle = resources.connError;
                                     msgBtnValue = resources.btnOk;
                                     navigator.notification.confirm(msgStr, connectionError, msgTitle, msgBtnValue);
                                     }
                                     helpdeskImageFileDownload(true, issueId, fileId, function(ret) {
                                                               returnFunction(ret);
                                                               });
                                     }
                                     });
    } catch (e) {
        errorHandler("coDownloadHelpdeskImageFile", e);
    }
},
coUpdateSCOStatus: function(assetId, isUnderstood, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     setSCOStatus(false, assetId, isUnderstood, function(ret) {
                                                  returnFunction(ret);
                                                  });
                                     } else {
                                     if (connectionErrorVisible == false) {
                                     connectionErrorVisible = true;
                                     msgStr = resources.noNetwork;
                                     msgTitle = resources.connError;
                                     msgBtnValue = resources.btnOk;
                                     navigator.notification.confirm(msgStr, connectionError, msgTitle, msgBtnValue);
                                     }
                                     setSCOStatus(true, assetId, isUnderstood, function(ret) {
                                                  returnFunction(ret);
                                                  });
                                     }
                                     });
    } catch (e) {
        errorHandler("coUpdateSCOStatus", e);
    }
},
coUpdateModuleStatus: function(courseId, basemoduleId, status, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     setModuleStatus(false, courseId, basemoduleId, status, function(ret) {
                                                     returnFunction(ret);
                                                     });
                                     } else {
                                     if (connectionErrorVisible == false) {
                                     connectionErrorVisible = true;
                                     msgStr = resources.noNetwork;
                                     msgTitle = resources.connError;
                                     msgBtnValue = resources.btnOk;
                                     navigator.notification.confirm(msgStr, connectionError, msgTitle, msgBtnValue);
                                     }
                                     setModuleStatus(true, courseId, basemoduleId, status, function(ret) {
                                                     returnFunction(ret);
                                                     });
                                     }
                                     });
    } catch (e) {
        errorHandler("coUpdateModuleStatus", e);
    }
},
coUpdateCourseStatus: function(courseId, courseStatusId, status, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     setCourseStatus(false, courseId, courseStatusId, status, function(ret) {
                                                     returnFunction(ret);
                                                     });
                                     } else {
                                     if (connectionErrorVisible == false) {
                                     connectionErrorVisible = true;
                                     msgStr = resources.noNetwork;
                                     msgTitle = resources.connError;
                                     msgBtnValue = resources.btnOk;
                                     navigator.notification.confirm(msgStr, connectionError, msgTitle, msgBtnValue);
                                     }
                                     setCourseStatus(true, courseId, courseStatusId, status, function(ret) {
                                                     returnFunction(ret);
                                                     });
                                     }
                                     });
    } catch (e) {
        errorHandler("coUpdateCourseStatus", e);
    }
},
coGetWorksheetData: function(sectionId, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     getWorksheetData(false, sectionId, function(ret) {
                                                      returnFunction(ret);
                                                      });
                                     } else {
                                     if (connectionErrorVisible == false) {
                                     connectionErrorVisible = true;
                                     msgStr = resources.noNetwork;
                                     msgTitle = resources.connError;
                                     msgBtnValue = resources.btnOk;
                                     navigator.notification.confirm(msgStr, connectionError, msgTitle, msgBtnValue);
                                     }
                                     getWorksheetData(true, sectionId, function(ret) {
                                                      returnFunction(ret);
                                                      });
                                     }
                                     });
    } catch (e) {
        errorHandler("coGetWorksheetData", e);
    }
},
coSaveWorksheetData: function(worksheet, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     saveWorksheetData(false, worksheet, function(ret) {
                                                       returnFunction(ret);
                                                       });
                                     } else {
                                     saveWorksheetData(true, worksheet, function(ret) {
                                                       returnFunction(ret);
                                                       });
                                     }
                                     });
    } catch (e) {
        errorHandler("coSaveWorksheetData", e);
    }
},
coGetAssessmentSchedules: function(courseId, basemoduleId, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     getAssessmentSchedules(false, courseId, basemoduleId, function(ret) {
                                                            returnFunction(ret);
                                                            });
                                     } else {
                                     getAssessmentSchedules(true, courseId, basemoduleId, function(ret) {
                                                            returnFunction(ret);
                                                            });
                                     }
                                     });
    } catch (e) {
        errorHandler("coGetAssessmentSchedules", e);
    }
},
coGetAssessmentResult: function(courseId, basemoduleId, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     getAssessmentResult(false, courseId, basemoduleId, function(ret) {
                                                         returnFunction(ret);
                                                         });
                                     } else {
                                     getAssessmentResult(true, courseId, basemoduleId, function(ret) {
                                                         returnFunction(ret);
                                                         });
                                     }
                                     });
    } catch (e) {
        errorHandler("coGetAssessmentResult", e);
    }
},
coAssessmentBookingCreate: function(courseId, basemoduleId, assessmentScheduleId, assessmentItemId, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     createAssessmentBooking(false, courseId, basemoduleId, assessmentScheduleId, assessmentItemId, function(ret) {
                                                             returnFunction(ret);
                                                             });
                                     } else {
                                     createAssessmentBooking(true, courseId, basemoduleId, assessmentScheduleId, assessmentItemId, function(ret) {
                                                             returnFunction(ret);
                                                             });
                                     }
                                     });
    } catch (e) {
        errorHandler("coAssessmentBookingCreate", e);
    }
},
coAssessmentBookingDelete: function(courseId, basemoduleId, assessmentScheduleId, assessmentItemId, bookingId, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     deleteAssessmentBooking(false, courseId, basemoduleId, assessmentScheduleId, assessmentItemId, bookingId, function(ret) {
                                                             returnFunction(ret);
                                                             });
                                     } else {
                                     deleteAssessmentBooking(true, courseId, basemoduleId, assessmentScheduleId, assessmentItemId, bookingId, function(ret) {
                                                             returnFunction(ret);
                                                             });
                                     }
                                     });
    } catch (e) {
        errorHandler("coAssessmentBookingDelete", e);
    }
},
coGetAssessmentSummary: function(courseId, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     getAssessmentSummary(false, courseId, function(ret) {
                                                          returnFunction(ret);
                                                          });
                                     } else {
                                     getAssessmentSummary(true, courseId, function(ret) {
                                                          returnFunction(ret);
                                                          });
                                     }
                                     });
    } catch (e) {
        errorHandler("coGetAssessmentSummary", e);
    }
},
coEmailAssessmentSummary: function(courseId, fromEmailAddress, toEmailAddress, emailMessage, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     emailAssessmentSummary(false, courseId, fromEmailAddress, toEmailAddress, emailMessage, function(ret) {
                                                            returnFunction(ret);
                                                            });
                                     } else {
                                     emailAssessmentSummary(true, courseId, fromEmailAddress, toEmailAddress, emailMessage, function(ret) {
                                                            returnFunction(ret);
                                                            });
                                     }
                                     });
    } catch (e) {
        errorHandler("coGetAssessmentSummary", e);
    }
},
coPDFFileRemove: function(fileName, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     PDFFileRemove(false, fileName, function(ret) {
                                                   returnFunction(ret);
                                                   });
                                     } else {
                                     PDFFileRemove(true, fileName, function(ret) {
                                                   returnFunction(ret);
                                                   });
                                     }
                                     });
    } catch (e) {
        errorHandler("coGetAssessmentSummary", e);
    }
},
coPodcastXMLGet: function(podcastUrl, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     podcastXMLGet(false, podcastUrl, function(ret) {
                                                   returnFunction(ret);
                                                   });
                                     } else {
                                     podcastXMLGet(true, podcastUrl, function(ret) {
                                                   returnFunction(ret);
                                                   });
                                     }
                                     });
    } catch (e) {
        errorHandler("coPodcastXMLGet", e);
    }
},
coUserPodcastsGet: function(courseid, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true){
                                     if (useExistingMedia === true){
                                     podcastsGetForUser(true, courseid, function(ret) {
                                                        if(ret===0){
                                                        podcastsGetForUser(false, courseid, function(ret) {
                                                                           returnFunction(ret);
                                                                           });
                                                        }else{
                                                        returnFunction(ret);
                                                        }
                                                        });
                                     }else{
                                     podcastsGetForUser(false, courseid, function(ret) {
                                                        returnFunction(ret);
                                                        });
                                     }
                                     } else {
                                     podcastsGetForUser(true, courseid, function(ret) {
                                                        returnFunction(ret);
                                                        });
                                     }
                                     });
    } catch (e) {
        errorHandler("coUserPodcastsGet", e);
    }
},
coThumbnailFileDownload: function(moduleid, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     thumbnailFileDownload(false, moduleid, function(ret) {
                                                           returnFunction(ret);
                                                           });
                                     } else {
                                     thumbnailFileDownload(true, moduleid, function(ret) {
                                                           returnFunction(ret);
                                                           });
                                     }
                                     });
    } catch (e) {
        errorHandler("coThumbnailFileDownload", e);
        returnFunction(0);
    }
},
coAudioGroupCategoriesGet: function(returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true){
                                     if (useExistingMedia === true){
                                     audioGroupCategoriesGet(true, function(ret) {
                                                             if(ret===0){
                                                             audioGroupCategoriesGet(false, function(ret) {
                                                                                     returnFunction(ret);
                                                                                     });
                                                             }else{
                                                             returnFunction(ret);
                                                             }
                                                             });
                                     }else{
                                     audioGroupCategoriesGet(false, function(ret) {
                                                             returnFunction(ret);
                                                             });
                                     }
                                     } else {
                                     audioGroupCategoriesGet(true, function(ret) {
                                                             returnFunction(ret);
                                                             });
                                     }
                                     });
    } catch (e) {
        errorHandler("coAudioGroupCategoriesGet", e);
    }
},
coVideoGroupCategoriesGet: function(libraryId, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true){
                                     if (useExistingMedia === true){
                                     videoGroupCategoriesGet(true, libraryId, function(ret) {
                                                             if(ret===0){
                                                             videoGroupCategoriesGet(false, libraryId, function(ret) {
                                                                                     returnFunction(ret);
                                                                                     });
                                                             }else{
                                                             returnFunction(ret);
                                                             }
                                                             });
                                     }else{
                                     videoGroupCategoriesGet(false, libraryId, function(ret) {
                                                             returnFunction(ret);
                                                             });
                                     }
                                     } else {
                                     videoGroupCategoriesGet(true, libraryId, function(ret) {
                                                             returnFunction(ret);
                                                             });
                                     }
                                     });
    } catch (e) {
        errorHandler("coVideoGroupCategoriesGet", e);
    }
},
coVideoDetailsGet: function(tabId, videoCatRef, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true){
                                     videoDetailsGet(false, videoCatRef, function(ret) {
                                                     returnFunction(ret);
                                                     });
                                     }else{
                                     videoDetailsGet(true,  videoCatRef,function(ret) {
                                                     returnFunction(ret);
                                                     });
                                     }
                                     });
    } catch (e) {
        errorHandler("coVideoDetailsGet", e);
    }
},
coUserPlaylistsGet: function(returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true){
                                     userPlaylistsGet(false, function(ret) {
                                                      returnFunction(ret);
                                                      });
                                  
                                     } else {
                                     userPlaylistsGet(true, function(ret) {
                                                      returnFunction(ret);
                                                      });
                                     }
                                     });
    } catch (e) {
        errorHandler("coUserPlaylistsGet", e);
    }
},
coUserPlaylistSave: function(playlist, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     savePlaylistData(false, playlist, function(ret) {
                                                      returnFunction(ret);
                                                      });
                                     } else {
                                     returnFunction(false);
                                     }
                                     });
    } catch (e) {
        errorHandler("coUserPlaylistSave", e);
    }
},
    
coUserPlaylistUpdate: function(playlist, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     updatePlaylistData(false, playlist, function(ret) {
                                                        returnFunction(ret);
                                                        });
                                     } else {
                                     returnFunction(false);
                                     }
                                     });
    } catch (e) {
        errorHandler("coUserPlaylistUpdate", e);
    }
},
coUserPlaylistsDelete: function(userPlaylistIds, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     userPlaylistsDelete(false, userPlaylistIds, function(ret) {
                                                         returnFunction(ret);
                                                         });
                                     } else {
                                     returnFunction(false);
                                     }
                                     });
    } catch (e) {
        errorHandler("coUserPlaylistsDelete", e);
    }
},
coVideoViewsUpdate: function(videoId, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     videoViewsUpdate(false, videoId, function(ret) {
                                                      returnFunction(ret);
                                                      });
                                     } else {
                                     videoViewsUpdate(true, videoId, function(ret) {
                                                      returnFunction(ret);
                                                      });
                                     }
                                     });
    } catch (e) {
        errorHandler("coVideoViewsUpdate", e);
    }
},
coRequestCertificate: function(courseId, baseModuleId, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     requestCertificateForModule(false, courseId, baseModuleId, function(ret) {
                                                                 returnFunction(ret);
                                                                 });
                                     } else {
                                     returnFunction(-1);
                                     }
                                     });
    } catch (e) {
        errorHandler("coRequestCertificate", e);
    }
},
coDownloadCertificate: function(fileName, courseId, baseModuleId, returnFunction) {
  //alert(fileName);
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     certificateDownload(false, fileName, courseId, baseModuleId, function(ret) {
                                                         returnFunction(ret);
                                                         });
                                     } else {
                                     returnFunction(-1);
                                     }
                                     });
    } catch (e) {
        errorHandler("coDownloadCertificate", e);
    }
},

/*getOTAQuestions: function(OtaIdForQuestions,basemoduleid,courseid, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
               if (networkAvailable === true) {
                getOtaQuestions(false, OtaIdForQuestions,basemoduleid,courseid, function(ret) {
                                   returnFunction(ret);
                });
               } else {
               returnFunction(0);
               }
               });
    } catch (e) {
        errorHandler("getOTAQuestions", e);
    }
},*/

getOTAQuestions: function(OtaIdForQuestions,basemoduleid,courseid,assessmentscheduleid,OTASectionIDsOTA,IsOTALive, returnFunction) {
    try {
      //alert("hi 2");
        this.coCheckNetworkAvaliable(false, function(retval) {
          //alert( networkAvailable);
               if (networkAvailable === true) {
                //getOtaQuestions(false,OtaIdForQuestions,basemoduleid,courseid, OtaQuestionDisplay);
                getOtaQuestions(false, OtaIdForQuestions,basemoduleid,courseid,assessmentscheduleid,OTASectionIDsOTA,IsOTALive, function(ret) {
                  //console.log("Controller= "+ret);
                                   returnFunction(ret);
                });
               } else {
               returnFunction(0);
               }
               });
    } catch (e) {
        errorHandler("getOTAQuestions", e);
    }
},


InsertUpdateOtaExamStartEndDetails: function(OtaIdForQuestions,assessmentscheduleid,IsExamEnd,OTASectionIDs,IsLiveOTA, returnFunction){
    try{
        this.coCheckNetworkAvaliable(false, function(retval) {
            //alert( networkAvailable);
            //console.log(OtaIdForQuestions+" assessmentscheduleid= "+assessmentscheduleid+" IsExamEnd= "+IsExamEnd+" OTASectionIDs= "+OTASectionIDs);
                 if (networkAvailable === true) {
                  InsertUpdateOtaExamStartEndDetailsWS(false, OtaIdForQuestions,assessmentscheduleid,IsExamEnd,OTASectionIDs,IsLiveOTA, function(ret) {
                        returnFunction(ret);
                  });
                 } else {
                 returnFunction(0);
                 }
                 });
      } catch (e) {
          errorHandler("getOTAQuestions", e);
      }
},

saveOTACont: function(finfaland, returnFunction) {
    try {
      //alert("hi 2");
        this.coCheckNetworkAvaliable(false, function(retval) {
          //alert( networkAvailable);
               if (networkAvailable === true) {
                //getOtaQuestions(false,OtaIdForQuestions,basemoduleid,courseid, OtaQuestionDisplay);

                saveOTA(false, finfaland, function(ret) {
                  //console.log("Controller= "+ret);
                                   returnFunction(ret);
                });
               } else {
               returnFunction(-1);
               }
               });
    } catch (e) {
        errorHandler("saveOTAAnswers", e);
    }
},

coDownloadPDFFile: function(fileName, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     pdfFileDownload(false, fileName, function(ret) {
                                                     returnFunction(ret);
                                                     });
                                     } else {
                                     returnFunction(-1);
                                     }
                                     });
    } catch (e) {
        errorHandler("coDownloadPDFFile", e);
    }
},
coUpdatePodState: function(courseid, moduleid, sectionid, assetid, nodekey, returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     updatePodState(false, courseid, moduleid, sectionid, assetid, nodekey, function(ret) {
                                                    returnFunction(ret);
                                                    });
                                     } else {
                                     returnFunction(0);
                                     }
                                     });
    } catch (e) {
        errorHandler("coUpdatePodState", e);
    }
},
coGetUserPodState: function(returnFunction) {
    try {
        this.coCheckNetworkAvaliable(false, function(retval) {
                                     if (networkAvailable === true) {
                                     getUserPodState(false, function(ret) {
                                                     returnFunction(ret);
                                                     });
                                     } else {
                                     returnFunction(0);
                                     }
                                     });
    } catch (e) {
        errorHandler("coGetUserPodState", e);
    }
},
 getSCOListLinkedToOTAExam: function(OTAStudentExamID,returnFunction){
     try {
         this.coCheckNetworkAvaliable(false, function(retval) {
                                      if (networkAvailable === true) {
                                         getSCOListLinkedToOTAExamWS(false,OTAStudentExamID, function(ret) {
                                                      returnFunction(ret);
                                         });
                                      } else {
                                         returnFunction(0);
                                      }
                                      });
     } catch (e) {
         errorHandler("coGetUserPodState", e);
     }

 },
  cogetYuduURL: function(yuduId,returnFunction){
      try {
          this.coCheckNetworkAvaliable(false, function(retval) {
                                       if (networkAvailable === true) {
                                          getYuduURL(false,yuduId, function(ret) {
                                                       returnFunction(ret);
                                          });
                                       } else {
                                          returnFunction(0);
                                       }
                                       });
      } catch (e) {
          errorHandler("coGetUserPodState", e);
      }

  }
};

function connectionError() {
    connectionErrorVisible = false;
    hidePleaseWait();
}

function UrlExists(url) {
    try {
        var http = new XMLHttpRequest();
        http.open("HEAD", url, false);
        http.send();
        return http.status != 404;
    } catch (e) {
        return false;
    }
}

function deviceIsOnlineCheck() {
    var aeroplaneModeIsOn = deviceIsOnline;
    if (device.platform === "Android") {
        // aeroplaneModeIsOn = AeroplaneMode.checkMode(function(ret) {}, function() {});
    }
}

function successMode(returnVal) {
    var retvalueRet = returnVal;
    if (returnVal === 0) {
        deviceIsOnline = true;
    } else {
        deviceIsOnline = false;
    }
}