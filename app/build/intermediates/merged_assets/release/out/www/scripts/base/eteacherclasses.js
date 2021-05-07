var scoContentOK = true;
var Courses = function() {
    try {
        this.init();
    } catch (e) {
        errorHandler("Courses", e);
    }
};
Courses.prototype = {
init: function() {
    try {
        this.coursesDB = openDatabase("Database", "1.0", "ETEACHER", 10000);
        this.coursesDB.transaction(function(tx) {
                                   tx.executeSql("CREATE TABLE IF NOT EXISTS ETEACHER_COURSE (id unique, courseid, title, status, coursestatusid)");
                                   });
        this.courses = new Array();
        this.loadCourses();
    } catch (e) {
        errorHandler("Courses.init", e);
    }
},
loadCourses: function() {
    try {
        this.coursesDB.transaction(function(tx) {
          tx.executeSql("SELECT * FROM ETEACHER_COURSE", [], function(tx, results) {
            var len = results.rows.length;
            for (var i = 0; i < len; i++) {
              var savedCourse = new Course(results.rows.item(i).courseid, results.rows.item(i).title, results.rows.item(i).status, results.rows.item(i).coursestatusid);
              this.courses.push(savedCourse);
            }
          }, null);
        });
    } catch (e) {
        errorHandler("Courses.loadCourses", e);
    }
},
refreshCourses: function(updatePostion, returnFunction) {
    try {
        this.courses = new Array();
        var that = this;
        coController.coGetCourses(function(ret) {
                                  try {
                                  if (ret == undefined || ret == -1) {
                                  msgTitle = resources.connError;
                                  msgBtnValue = resources.btnOk;
                                  msgStr = resources.connectionFail;
                                  navigator.notification.alert(msgStr, function() {
                                                               hidePleaseWait();
                                                               returnFunction(false);
                                                               }, msgTitle, msgBtnValue);
                                  } else {
                                  if (ret == 0) {
                                  returnFunction(false);
                                  } else {
                                  var coursesObj = ret;
                                  that.courses = new Array();
                                  var usercourses;
                                  if (coursesObj.Data !== undefined) {
                                  usercourses = coursesObj.Data;
                                  }
                                  var userPositionObj;
                                  if (coursesObj.UserPosition !== undefined) {
                                  userPositionObj = coursesObj.UserPosition;
                                  }
                                  if (userPositionObj !== undefined && updatePostion === true) {
                                  updateUserPosition(userPositionObj, function(retVal) {});
                                  }
                                  if (usercourses != undefined) {
                                  var courseobj;
                                  var course;
                                  if (usercourses.length == undefined) {
                                  courseobj = usercourses;
                                  course = new Course(courseobj.CourseId, courseobj.Title, courseobj.Status, courseobj.CourseStatusId, courseobj.Display, courseobj.Accessible, courseobj.InAccessibleFunction);
                                  that.courses.push(course);
                                  //if (course.accessible) {
                                  //course.setCourseModuleList(course.status, courseobj);
                                  course.setCourseModuleGroupList(course.status, courseobj);
                                  //}
                                  } else {
                                  for (var i = 0; i < usercourses.length; i++) {
                                  courseobj = usercourses[i];
                                  course = new Course(courseobj.CourseId, courseobj.Title, courseobj.Status, courseobj.CourseStatusId, courseobj.Display, courseobj.Accessible, courseobj.InAccessibleFunction);
                                  that.courses.push(course);
                                  //if (course.accessible) {
                                  //course.setCourseModuleList(course.status, courseobj);
                                  course.setCourseModuleGroupList(course.status, courseobj);
                                  //}
                                  }
                                  }
                                  }
                                  }
                                  }
                                  returnFunction(true);
                                  } catch (e) {
                                  errorHandler("Courses.getCoursesCallback", e);
                                  }
                                  });
    } catch (e) {
        errorHandler("Courses.refreshCourses", e);
        return 0;
    }
},
getCoursesListView: function(status) {
    try {
        var courseStr = "";
        if (this.courses.length > 0) {
            var classStatus = "";
            courseStr ="<div data-role='collapsible-set' data-theme='h' data-content-theme='h' id='coursescollapsibleset' class='coursescollapsibleset'>";
            var courseid;
            $.each(this.courses, function(i, course) {
                   classStatus = setStatusClass(course.status, true);
                   var title = course.title;
                   var coursesingleline = "";
                   if(tablet===false && course.title.length < 42){
                   coursesingleline = "coursesingleline";
                   }
                   courseid = "course-" + course.courseid;
                   if (course.accessible) {
                   courseStr += "<div id='" + courseid + "' data-role='collapsible' class='coursesli " + course.inaccessiblefunction + "' data-theme='h' data-content-theme='h' data-iconpos='right'>";
                   courseStr += "<h3 class='divider clientheader'><div class='coursetitlediv'><div id='cert" + courseid + "' class='certificateicon";
                   courseStr += course.setCertificationStatus(course.status);
                   courseStr += "'><div class='coursetitle " + coursesingleline;
                   courseStr += "'>" + title + "</div>";
                   courseStr += "</div></h3>";
                   courseStr += "<div class='modulegroupsli'><ul data-role='listview' class='ulgroups' data-theme='h' data-inset='false'>";
                   courseStr += course.getModuleGroupListView(course.status);
                   courseStr += "</div></ul></div>";
                   
                   } else {
                   
                   courseStr += "<div id='" + courseid + "' data-role='collapsible' class='coursesli " + course.inaccessiblefunction + "'  data-theme='h' data-content-theme='h' data-iconpos='right'>";
                   courseStr += "<h3 class='divider clientheader'><div class='coursetitlediv'><div id='cert" + courseid + "' class='";
                   courseStr += "'><div class='coursetitle " + coursesingleline;
                   courseStr += "'>" + title + "</div>";
                   courseStr += "</div></h3>";
                   courseStr += "<div class='modulegroupsli'><ul data-role='listview' class='ulgroups' data-theme='h' data-inset='false'>";
                   courseStr += course.getModuleGroupListView(course.status);
                   courseStr += "</div></ul></div>";
                   
                   }
                   
                   });
            courseStr += " </div>";
            
        }
        return courseStr;
    } catch (e) {
        errorHandler("Courses.getCoursesListView", e);
        return "";
    }
},
save: function(course) {
    try {
        if (course.courseid == undefined) {
            course.courseid = 0;
        }
        if (course.title == undefined) {
            course.title = "";
        }
        if (course.status == undefined) {
            course.status = "";
        }
        if (course.coursestatusid == undefined) {
            course.coursestatusid = "";
        }
        this.usersDB.transaction(function(tx) {
                                 tx.executeSql("DELETE * FROM ETEACHER_COURSE WHERE courseid=" + course.courseid);
                                 tx.executeSql("INSERT INTO ETEACHER_COURSE(courseid, title, status, coursestatusid) VALUES (course.courseid, course.title, course.status, course.coursestatusid)");
                                 });
    } catch (e) {
        errorHandler("Courses.save", e);
    }
},
count: function() {
    try {
        return this.courses.length;
    } catch (e) {
        errorHandler("Courses.count", e);
        return 0;
    }
},
getCourseById: function(courseid) {
    try {
        for (var i = 0; i < this.courses.length; i++) {
            var c = this.courses[i];
            if (c.courseid == courseid) {
                return c;
            }
        }
    } catch (e) {
        errorHandler("Courses.getCourseById", e);
        return 0;
    }
},
getCourseByStatus: function(courseStatus) {
    try {
        var courselist = [];
        for (var i = 0; i < this.courses.length; i++) {
            var course = this.courses[i];
            if (course.status == courseStatus) {
                courselist.push(course);
            }
        }
        return courselist;
    } catch (e) {
        errorHandler("Courses.getCourseByStatus", e);
    }
},
getCourses: function(courseStatus) {
    try {
        return this.courses;
    } catch (e) {
        errorHandler("Courses.getCourses", e);
    }
},
getFirstCourse: function() {
    try {
        var courses = this.getCourses();
        var returnCourse;
        var firstCompletedCourse;
        if (courses != undefined) {
            $.each(courses, function(i, course) {
              if (course.display && course.accessible) {
                if (course.status == courseStatus.Completed && firstCompletedCourse == undefined) {
                  firstCompletedCourse = course;
                } else {
                  returnCourse = course;
                  return false;
                }
              }
            });
            if (returnCourse != undefined) {
                return returnCourse;
            } else {
                if (firstCompletedCourse != undefined) {
                    return firstCompletedCourse;
                } else {
                    return (courses[0]);
                }
            }
        } else {
            return (courses);
        }
    } catch (e) {
        errorHandler("Courses.getFirstCourse", e);
    }
},
getNextCourse: function(courseId) {
    try {
        var courses = this.getCourses();
        var returnCourse;
        var firstCompletedCourse;
        var found = false;
        if (courses != undefined) {
            $.each(courses, function(i, course) {
                   if (found) {
                   if (course.display && course.accessible) {
                   if (course.status == courseStatus.Completed && firstCompletedCourse == undefined) {
                   firstCompletedCourse = course;
                   } else {
                   returnCourse = course;
                   return false;
                   }
                   }
                   }
                   if (course.courseid == courseId) {
                   found = true;
                   }
                   });
            if (returnCourse != undefined) {
                return returnCourse;
            } else {
                if (firstCompletedCourse != undefined) {
                    return firstCompletedCourse;
                } else {
                    return (courses[0]);
                }
            }
        } else {
            return (courses[0]);
        }
    } catch (e) {
        errorHandler("Courses.getNextCourse", e);
    }
}
};
var Course = function(courseid, title, status, coursestatusid, display, accessible, inaccessiblefunction) {
    try {
        this.init(courseid, title, status, coursestatusid, display, accessible, inaccessiblefunction);
    } catch (e) {
        errorHandler("Course", e);
    }
};
Course.prototype = {
init: function(courseid, title, status, coursestatusid, display, accessible, inaccessiblefunction) {
    try {
        this.modulegroups = [];
        if (courseid == undefined) {
            courseid = 0;
        }
        if (title == undefined) {
            title = "";
        }
        if (status == undefined) {
            status = "";
        }
        switch (status) {
            case -2:
                status = "Suspended";
                break;
            case -1:
                status = "No Record";
                break;
            case 0:
                status = "Completed";
                break;
            case 1:
                status = "In Progress";
                break;
            case 2:
                status = "Payment Pending";
                break;
            case 3:
                status = "Payment Required";
                break;
            case 4:
                status = "Not Started";
                break;
            case 5:
                status = "Exempt";
                break;
        }
        if (coursestatusid == undefined) {
            coursestatusid = 0;
        }
        if (display == undefined) {
            display = true;
        }
        if (accessible == undefined) {
            accessible = true;
        }
        if (inaccessiblefunction == undefined) {
            inaccessiblefunction = "";
        }
        if (inaccessiblefunction.indexOf("coursePaymentRequired") > -1) {
            inaccessiblefunction = "coursepaymentrequired";
        }
        this.courseid = courseid;
        this.title = title;
        this.status = status;
        this.coursestatusid = coursestatusid;
        this.display = display;
        this.accessible = accessible;
        this.inaccessiblefunction = inaccessiblefunction;
        return this;
    } catch (e) {
        errorHandler("Course.init", e);
    }
},
setCourseModuleGroupList: function(courseStatus, courseObj) {
    try {
        this.modulegroups = new Array();
        var userModuleGroups = courseObj.ModuleGroups;
        if (userModuleGroups != undefined) {
            var modGrpObj;
            var moduleGroup;
            if (userModuleGroups.length == undefined || userModuleGroups.length == 0) {
                modGrpObj = userModuleGroups;
                moduleGroup = new ModuleGroup(this.courseid,  modGrpObj.ModuleGroupId, modGrpObj.GroupTitle, modGrpObj.Status, modGrpObj.Accessible);
                this.modulegroups.push(moduleGroup);
                if (modGrpObj.Modules!==undefined && modGrpObj.Modules.length > 0){
                    moduleGroup.setCourseModuleList(courseStatus, modGrpObj);
                }else{
                    moduleGroup.modules= new Array();
                }
                
            } else {
                for (var x = 0; x < userModuleGroups.length; x++) {
                    modGrpObj = userModuleGroups[x];
                    moduleGroup = new ModuleGroup(this.courseid, modGrpObj.ModuleGroupId, modGrpObj.GroupTitle, modGrpObj.Status, modGrpObj.Accessible);
                    this.modulegroups.push(moduleGroup);
                    if (modGrpObj.Modules!==undefined && modGrpObj.Modules.length > 0){
                        moduleGroup.setCourseModuleList(courseStatus, modGrpObj);
                    }else{
                        moduleGroup.modules= new Array();
                    }
                }
            }
        }
    } catch (e) {
        errorHandler("Course.setCourseModuleGroupList", e);
    }
},
getFirstModuleGroup: function() {
    try {
        
        if (this.modulegroups != undefined) {
            var returnModGroup;
            var firstCompletedModGroup;
            var firstInProgressModGroup;
            var firstModGroup;
            for (var i =0; i < this.modulegroups.length; i++) {
                var modGroup = this.modulegroups[i];
                if (firstModGroup == undefined) {
                    firstModGroup = modGroup;
                }
                if(modGroup.status == courseStatus.Completed && firstCompletedModGroup==undefined ){
                    firstCompletedModGroup = modGroup;
                }
                if(modGroup.modules!==undefined && modGroup.modules.length > 0 ){
                    var moduleFirst = modGroup.getFirstModule();
                    if (moduleFirst!==undefined){
                        if (moduleFirst.display && moduleFirst.accessible && moduleFirst.status == courseStatus.InProgress)
                        {
                            firstModGroup = modGroup;
                            break;
                        }
                        if(moduleFirst.status == courseStatus.Completed && firstCompletedModGroup==undefined ){
                            firstCompletedModGroup = modGroup;
                        }
                    }
                }
                
            }
            if (firstModGroup != undefined) {
                return firstModGroup;
            } else  if (firstCompletedModGroup != undefined) {
                return (firstCompletedModGroup);
            }else{
                return (firstModGroup);
            }
        } else {
            return (undefined);
        }
    } catch (e) {
        errorHandler("Course.getFirstModuleGroup", e);
    }
},
updateCourseStatus: function(newStatus, returnFunction) {
    try {
        var that = this;
        coController.coUpdateCourseStatus(this.courseid, this.coursestatusid, newStatus, function(ret) {
                                          if (ret == undefined || ret == -1) {
                                          returnFunction(false);
                                          } else {
                                          if (ret == 0) {
                                          returnFunction(false);
                                          } else {
                                          that.status = "Completed";
                                          returnFunction(true);
                                          }
                                          }
                                          });
    } catch (e) {
        errorHandler("Course.updateCourseStatus", e);
    }
},
getAssessmentSummary: function(returnFunction) {
    try {
        var that = this;
        coController.coGetAssessmentSummary(this.courseid, function(ret) {
                                            if ((ret == undefined || ret == 0 || ret == -1) && isDeviceOnline() === false) {
                                            returnFunction("offline");
                                            } else {
                                            if (ret == undefined) {
                                            returnFunction("<div class='noschedules'>" + resources.assessmentsfail + "</div>");
                                            } else {
                                            if (ret == 0) {
                                            returnFunction("<div class='noschedules'>" + resources.assessmentsfail + "</div>");
                                            } else {
                                            var resultString = "";
                                            var resultObj = ret;
                                            if (resultObj != undefined) {
                                            resultString = resultObj.Summary;
                                            }
                                            }
                                            }
                                            }
                                            returnFunction(resultString);
                                            });
    } catch (e) {
        errorHandler("Course.getAssessmentSummary", e);
    }
},
emailAssessmentSummary: function(fromEmailAddress, toEmailAddress, emailMessage, returnFunction) {
    try {
        var that = this;
        coController.coEmailAssessmentSummary(this.courseid, fromEmailAddress, toEmailAddress, emailMessage, function(ret) {
                                              var message = resources.emailsuccess;
                                              if (ret == undefined) {
                                              returnFunction();
                                              } else {
                                              if (ret == 0) {
                                              returnFunction(resources.emailfailure);
                                              } else {
                                              if (ret.Success == false) {
                                              returnFunction(resources.emailfailure + " - " + ret.Messages[0]);
                                              } else {
                                              var pdfFile = new FileObject(ret.FileName, ret.FileSize, ret.FileType, "");
                                              returnFunction(pdfFile);
                                              }
                                              }
                                              }
                                              });
    } catch (e) {
        errorHandler("Course.emailAssessmentSummary", e);
    }
},
pdfFileGet: function(courseDir, fileName) {
    try {
        var that = this;
        if (courseDir != undefined) {
            courseDir.getFile(fileName, {
                              create: true,
                              exclusive: false
                              }, function(pdfEntry) {
                              var localPath = device.platform === "Android" ? pdfEntry.toURL() : pdfEntry.toURL();
                              var remoteUrl = configs.getCustom("CS_SITE_URL_BASE") + configs.getCustom("CS_SITE_URL_PDFTEMP");
                              remoteUrl += fileName;
                              remoteFile = encodeURI(remoteUrl);
                              var ft = new FileTransfer();
                              var onSuccess = function(entry) {
                              that.removeFileFromServer(fileName);
                              };
                              var onError = function(error) {
                              if (error.code == 3) {
                              that.removeFileFromServer(fileName);
                              } else {
                              pdfEntry.remove(function() {}, function(error) {});
                              }
                              };
                              ft.download(remoteFile, localPath, onSuccess, onError);
                              }, function(error) {
                              that.removeFileFromServer(fileName);
                              });
        }
    } catch (e) {
        errorHandler("Course.pdfFileGet", e);
    }
},
removeFileFromServer: function(filename) {
    try {
        coController.coPDFFileRemove(filename, function(ret) {});
    } catch (e) {
        errorHandler("Course.removeFileFromServer", e);
    }
},
getModuleGroupByGroupId: function(moduleGroupId) {
    var activeModuleGroup;
    try {
        moduleGroupId = parseInt(moduleGroupId,10);
        if (this.modulegroups !== undefined && this.modulegroups.length > 0){
            for (var i = 0; i < this.modulegroups.length ; i++){
                var group =this.modulegroups[i];
                if (group.modulegroupid===moduleGroupId){
                    activeModuleGroup = group;
                    break;
                }
            }
        }
    } catch (e) {
        errorHandler("Course.getModuleGroupByGroupId", e);
    }
    return activeModuleGroup;
},
getModuleGroupByModuleId: function(moduleId) {
    var moduleGroup;
    try {
        if (this.modulegroups !== undefined && this.modulegroups.length > 0){
            var moduleGroupFound = false;
            for (var i = 0; i < this.modulegroups.length ; i++){
                var group =this.modulegroups[i];
                if ( group !== undefined && group.modules!==undefined && group.modules.length > 0){
                    for (var x = 0; x < group.modules.length ; x++){
                        var currentModule = group.modules[x];
                        if ( currentModule !== undefined && currentModule.basemoduleid == moduleId){
                            moduleGroup = group;
                            moduleGroupFound = true;
                            break;
                        }
                    }
                    
                }
                if (moduleGroupFound===true){
                    break;
                }
            }
        }
    } catch (e) {
        errorHandler("Course.getModuleGroupByModuleId", e);
    }
    return moduleGroup;
},
getModuleGroupListView: function(status) {
    try {
        var modlistStr = "";
        var moduleGroups = this.modulegroups;
        var summaryModuleGroup = "";
        if (moduleGroups != undefined) {
            var groups = [];
            groups[0] = true;
            var modulegroup;
            for (var i=0; i< moduleGroups.length; i++){
                modulegroup=moduleGroups[i];
                if ( modulegroup.title != undefined) {
                    var id = "modulegroup-" + modulegroup.courseid + "-" + modulegroup.modulegroupid;
                    var liId = "modulegroupli-" + modulegroup.courseid + "-" + modulegroup.modulegroupid;
                    var modStatus = (status===courseStatus.Suspended || status===courseStatus.Payment || status===courseStatus.PaymentPending) ? status : modulegroup.status;
                    
                    var classStatus = setStatusClass(modStatus, false);
                    var title = modulegroup.title;
                    if (title==="Assessment Summary"){title=resources.assessmentsummary;}
                    if(modulegroup.modulegroupid===0 && status===courseStatus.Completed && title===resources.assessmentsummary){
                        //This is an assessment summary dummy ModuleGroup so add additional class to handle the navigation
                        summaryModuleGroup=" coursesummary";
                    }else{
                        summaryModuleGroup="";
                    }
                    
                    var singleClass = "";
                   
                    if(title.length < 58 && tablet===false && iphone5===false){
                        title = title.substring(0, 37) + "...";
                        singleClass=" groupsingleline";
                    }else if(title.length < 68){
						// older 041018 else if(title.length < 38 && tablet===false && iphone5===true)
                        singleClass=" groupsinglelinenew";
                    }else if(title.length < 92 && tablet===true){
                        singleClass=" modsingleline";
                    }
                    var modStatusDisplay="";
                    if (status===courseStatus.Suspended || status===courseStatus.Payment || status===courseStatus.PaymentPending){
                        modStatusDisplay="coursepaymentrequired";
                    }
                    modlistStr += "<li style='padding: 0px;' id='" + liId + "' class='modulegroupli" + modStatusDisplay + summaryModuleGroup + "'>";
                    modlistStr += "<div class='limodtitleactive'><div class='statuslock " + classStatus + "'></div>";
                    modlistStr += "<div class='modulegroupdiv'><a id='" + id + "' class='modulegroups ui-alt-icon'>";
                    modlistStr += "<div class='limodtitlediv" + singleClass + "'>" + title  + "</div>";
                    modlistStr += "</a>";
                    modlistStr += "</div>";
                    modlistStr += "<div class='navarrow nav'></div>";
                    modlistStr += "</div></li>";
                }
            }
        }
        return modlistStr;
    } catch (e) {
        errorHandler("Course.getModuleGroupListView", e);
        return "";
    }
},
setCertificationStatus: function(courseStatus){
    try{
        var statusReturn="statusdisabled";
        if(courseStatus === "Completed"){
            if(this.modulegroups!==undefined && this.modulegroups.length > 0){
                for(var i = 0; i< this.modulegroups.length; i++){
                    var moduleGroup = this.modulegroups[i];
                    if(moduleGroup.modules!==undefined && moduleGroup.modules.length > 0){
                        for(var x = 0; x< moduleGroup.modules.length; x++){
                            var module = moduleGroup.modules[x];
                            if (module.basemoduletypeid===6){
                                if(module.status===courseStatus.InProgress){
                                    statusReturn="statusip";
                                }else{
                                    statusReturn="statuscp";
                                }
                                break;
                            }
                        }
                    }
                }
            }
        }
        return statusReturn;
    } catch (e) {
        //errorHandler("Course.setCertificationStatus", e);
        return "statusdisabled";
    }
}
};
var ModuleGroup = function(courseid, modulegroupid, title, status, accessible) {
    try {
        this.init(courseid, modulegroupid, title, status, accessible);
    } catch (e) {
        errorHandler("ModuleGroup", e);
    }
};
ModuleGroup.prototype = {
init: function(courseid, modulegroupid, title, status, accessible) {
    try {
        this.modules = [];
        if (courseid == undefined) {
            courseid = 0;
        }
        if (title == undefined) {
            title = "";
        }
        if (title === "Assessment Summary") {
            title = resources.assessmentsummary;
        }
        if (status == undefined) {
            status = "";
        }
        if (modulegroupid == undefined) {
            modulegroupid = -1;
        }
        if (accessible == undefined) {
            accessible = true;
        }
        switch (status) {
            case -2:
                status = "Suspended";
                break;
            case -1:
                status = "No Record";
                break;
            case 0:
                status = "Completed";
                break;
            case 1:
                status = "In Progress";
                break;
            case 2:
                status = "Payment Pending";
                break;
            case 3:
                status = "Payment Required";
                break;
            case 4:
                status = "Not Started";
                break;
            case 5:
                status = "Exempt";
                break;
            default:
                status = "Completed";
                break;
        }
        if (modulegroupid == undefined) {
            modulegroupid = 0;
        }
        this.courseid = courseid;
        this.title = title;
        this.status = status;
        this.accessible = accessible;
        this.modulegroupid = modulegroupid;
        return this;
    } catch (e) {
        errorHandler("ModuleGroup.init", e);
    }
},
setCourseModuleList: function(courseStatus, moduleGrpObj) {
    try {
        this.modules = new Array();
        var userModules = moduleGrpObj.Modules;
        if (userModules != undefined) {
            var modObj;
            var module;
            if (userModules.length == undefined || userModules.length == 0) {
                modObj = userModules;
                module = new Module(this.courseid, modObj.BaseModuleId, modObj.Title, modObj.Status, modObj.BaseModuleTypeId, modObj.ModuleOrder, modObj.Enabled, modObj.Action, modObj.EventName, modObj.ActionId,modObj.actionId,modObj.PracticeIsOptional,modObj.otaTypeId, modObj.EventId, modObj.AssessmentScheduleId, modObj.AssessmentBookingId, modObj.Display, modObj.Accessible, modObj.InAccessibleFunction, modObj.ModuleDescription, "", modObj.ModuleUrl, modObj.ModuleGrouping, modObj.IsRequiresBooking);
                this.modules.push(module);
            } else {
                for (var x = 0; x < userModules.length; x++) {
                    modObj = userModules[x];
                    module = new Module(this.courseid, modObj.BaseModuleId, modObj.Title, modObj.Status, modObj.BaseModuleTypeId, modObj.ModuleOrder, modObj.Enabled, modObj.Action, modObj.EventName, modObj.ActionId,modObj.actionId,modObj.PracticeIsOptional,modObj.otaTypeId, modObj.EventId, modObj.AssessmentScheduleId, modObj.AssessmentBookingId, modObj.Display, modObj.Accessible, modObj.InAccessibleFunction, modObj.ModuleDescription, "", modObj.ModuleUrl, modObj.ModuleGrouping, modObj.IsRequiresBooking);
                    this.modules.push(module);
                }
            }
        }
    } catch (e) {
        errorHandler("ModuleGroup.setCourseModuleList", e);
    }
},
getModules: function() {
    try {
        return this.modules.sort(this.compareModuleOrder);
    } catch (e) {
        errorHandler("ModuleGroup.getModules", e);
    }
},
getModuleById: function(basemoduleid) {
    try {
        for (var i = 0; i < this.modules.length; i++) {
            var m = this.modules[i];
            if (m.basemoduleid == basemoduleid) {
                return m;
            }
        }
    } catch (e) {
        errorHandler("ModuleGroup.getModule", e);
    }
},
getModuleByOrder: function(orderNo) {
    try {
        var mods = this.modules.sort(this.compareModuleOrder);
        for (var i = 0; i < mods.length; i++) {
            var m = mods[i];
            if (m.moduleorder == orderNo) {
                return m;
            }
        }
    } catch (e) {
        errorHandler("ModuleGroup.getModule", e);
    }
},
getFirstModule: function() {
    try {
        var mods = this.modules.sort(this.compareModuleOrder);
        if (mods != undefined) {
            var returnMod;
            var firstCompletedMod;
            var firstInaccessibleMod;
            var firstMod;
            
        $.each(mods, function(i, mod) {
               if (mod.display && firstMod == undefined) {
                   firstMod = mod;
               }
               if (mod.display && mod.accessible && (mod.status == courseStatus.Completed || mod.status == courseStatus.InProgress || mod.status == courseStatus.NotStarted)) {
                   if (mod.inaccessiblefunctionlength == 0) {
                       if (mod.status == courseStatus.Completed && firstCompletedMod == undefined) {
                           firstCompletedMod = mod;
                       }
                       if (mod.status == courseStatus.NotStarted && mod.inaccessiblefunction.length===0) {
                           mod.updateModuleStatus(courseStatus.InProgress, function() {
                                                  returnMod = mod;
                                                  return returnMod;
                                                  });
                       } else {
                           if (mod.status == courseStatus.InProgress) {
                               returnMod = mod;
                               return returnMod;
                           }
                       }
                   } else {
                       if (firstInaccessibleMod == undefined) {
                           firstInaccessibleMod = mod;
                       }
                   }
               }
           });
            if (returnMod !== undefined) {
                return returnMod;
            } else {
                if (firstCompletedMod != undefined) {
                    return (firstCompletedMod);
                } else {
                    if (firstMod != undefined) {
                        return (firstInaccessibleMod);
                    } else {
                        return (firstMod);
                    }
                }
            }
        } else {
            return (undefined);
        }
    } catch (e) {
        errorHandler("ModuleGroup.getFirstModule", e);
    }
},
getNextModule: function(direction, currentOrder, sameGroup) {
    try {
        var mods = this.getModules();
        if (mods == undefined || mods.length < 2) {
            return undefined;
        }
        if(sameGroup===undefined){sameGroup=false;}
        mods = mods.sort(this.compareModuleOrder);
        if (direction == "prev") {
            mods.reverse();
        }
        var newMod;
        var currentPos = 0;
        var currentModule;
        for (var i = 0; i < mods.length; i++) {
            var mNew = mods[i];
            if (mNew.moduleorder === currentOrder) {
                currentModule = mNew;
            }
            if (mNew.moduleorder >= currentOrder) {
                currentPos = i + 1;
                var nextMod = mods[currentPos];
                if(nextMod===undefined){
                    showMenu=true;
                }else{
                    if (nextMod.status == courseStatus.Completed && nextMod !== undefined) {
                        newMod = nextMod;
                    } else {
                        if (nextMod.status == courseStatus.InProgress || nextMod.status == courseStatus.NotStarted) {
                            newMod = nextMod;
                            if(currentModule===undefined || sameGroup === false){
                                break;
                            }else if(sameGroup===true && nextMod.modulegrouping === currentModule.modulegrouping){
                                break;
                            }
                        }
                    }
                }
            }
        }
        return newMod;
    } catch (e) {
        errorHandler("ModuleGroup.getNextModule", e);
    }
},
getMaxModuleOrder: function() {
    try {
        var mods = this.getModules();
        if (mods != undefined) {
            mods = mods.sort(this.compareModuleOrder);
            mods = mods.reverse();
            var m = secs[0];
            return (m == undefined) ? 0 : m.moduleorder;
        } else {
            return 0;
        }
    } catch (e) {
        errorHandler("ModuleGroup.getMaxModuleOrder", e);
        return 0;
    }
},
getMinModuleOrder: function() {
    try {
        var mods = this.getModules();
        if (mods != undefined) {
            mods = mods.sort(this.compareModuleOrder);
            var m = mods[0];
            return (m == undefined) ? 0 : m.moduleorder;
        } else {
            return 0;
        }
    } catch (e) {
        errorHandler("ModuleGroup.getMinModuleOrder", e);
        return 0;
    }
},
compareModuleOrder: function(a, b) {
    return a.moduleorder - b.moduleorder;
},
compareModuleGroupingOrder: function(a, b) {
    return a.modulegrouping - b.modulegrouping;
},
getModulesListView: function(status, returnFunction) {
    try {
        var modlistStr = "";
        var modules;
        modlistStr ="<div data-role='collapsible-set' data-theme='h' data-content-theme='h' id='groupscollapsibleset' class='groupscollapsibleset'>";
        for (var x= 1; x < 5; x++){
            
            modules = this.getModulesByGrouping(x);
            if( modules!==undefined && modules.length > 0){
                var title = getModuleGroupTitle(x);
                var modulegroupingid = "modulegrouping-" + this.modulegroupid + "-" + x;
                modlistStr += "<div id='" + modulegroupingid + "' data-role='collapsible' class='modgroupsli' data-theme='h' data-content-theme='h' data-iconpos='right'>";
                modlistStr += "<h3 class='divider clientheader'><div class='coursetitlediv'><div class='grouptitle";
                modlistStr += "'>" + title + "</div>";
                modlistStr += "</div></h3>";
                modlistStr += "<div class='modulelilist'><ul data-role='listview' class='ulmodules' data-theme='h' data-inset='false'>";
                
                $.each(modules, function(i, module) {
                       if (module.display && module.title != undefined) {
                       var id = "module-" + module.courseid + "-" + module.basemoduleid;
                       var classStatus = setModuleStatusClass(module.status, module.accessible, false);
                       
                       var title = module.title;
                       var singleClass = "";
                       if(title.length < 58 && tablet===false && iphone5===false){
                       title = title.substring(0, 32) + "...";
                       singleClass=" groupsingleline";
                       }else if(title.length < 68){
						  // older121018 if(title.length < 38 && tablet===false && iphone5===true){
                       singleClass=" groupsinglelineNew";
                       }else if(title.length < 92 && tablet===true){
                       singleClass=" modsingleline";
                       }
                       
                       //console.log(module.isRequiresBooking);
                       if (module.accessible === false) {
                       
                         modlistStr += "<li id='" + id + "' class='moduleli " + module.inaccessiblefunction;
                         modlistStr += "'>";
                         modlistStr += "<div class='limodtitleactive'><div class='statuslock " + classStatus + "'></div>";
                         modlistStr += "<div class='modulegroupdiv'><a id='btn-" + id + "' class='modules ui-alt-icon'>";
                         modlistStr += "<div class='limodtitlediv" + singleClass + "'>" + title + "</div>";
                         modlistStr += "</a>";
                         modlistStr += "</div>";
                         modlistStr += "<div class='navarrow nav'></div>";
                         modlistStr += "</div></li>";
                       
                       } else {
                            if(module.modulegrouping == 3 && !module.isRequiresBooking){
                                modlistStr += "<li id='" + id + "' class='moduleli RequiresBooking'>";
                                modlistStr += "<div class='limodtitleactive'><div class='statuslock " + classStatus + "'></div>";
                                modlistStr += "<div class='modulegroupdiv'><a id='btn-" + id + "' class='modules ui-alt-icon'>";
                                modlistStr += "<div class='limodtitlediv" + singleClass + "'>" + title + "</div>";
                                modlistStr += "</a>";
                                modlistStr += "</div>";
                                modlistStr += "<div class='navarrow nav'></div>";
                                modlistStr += "</div></li>";
                            }
                            else{
                                modlistStr += "<li id='" + id + "' class='moduleli'>";
                                modlistStr += "<div class='limodtitleactive'><div class='statuslock " + classStatus + "'></div>";
                                modlistStr += "<div class='modulegroupdiv'><a id='btn-" + id + "' class='modules ui-alt-icon'>";
                                modlistStr += "<div class='limodtitlediv" + singleClass + "'>" + title + "</div>";
                                modlistStr += "</a>";
                                modlistStr += "</div>";
                                modlistStr += "<div class='navarrow nav'></div>";
                                modlistStr += "</div></li>";
                            }
                         /*modlistStr += "<li id='" + id + "' class='moduleli'>";
                         modlistStr += "<div class='limodtitleactive'><div class='statuslock " + classStatus + "'></div>";
                         modlistStr += "<div class='modulegroupdiv'><a id='btn-" + id + "' class='modules ui-alt-icon'>";
                         modlistStr += "<div class='limodtitlediv" + singleClass + "'>" + title + "</div>";
                         modlistStr += "</a>";
                         modlistStr += "</div>";
                         modlistStr += "<div class='navarrow nav'></div>";
                         modlistStr += "</div></li>";*/
                       }
                       }
                       });
                
                modlistStr += "</div></ul></div>";
            }
        }
        modlistStr +="</div>";
        returnFunction( modlistStr);
    } catch (e) {
        errorHandler("ModuleGroup.getModulesListView", e);
        returnFunction("");
    }
},
getModulesByGrouping: function(moduleGroupingId){
    var groupingModules = new Array();
    try {
        if (this.modules !== undefined && this.modules.length > 0){
            for (var i = 0; i < this.modules.length; i++){
                var module = this.modules[i];
                if(module.modulegrouping===moduleGroupingId){
                    groupingModules.push(module);
                }
            }
            if(groupingModules.length > 0){
                groupingModules = groupingModules.sort(this.compareModuleOrder);
            }
        }
    } catch (e) {
        errorHandler("ModuleGroup.getModulesByGrouping", e);
        return new Array();
    }
    return groupingModules;
}
};
var Module = function(courseid, basemoduleid, title, status, basemoduletypeid, moduleorder, enabled, action, eventname, actionid,actionIdNew,practiceisoptional,otaTypeId, eventid, assessmentscheduleid, assessmentbookingid, display, accessible, inaccessiblefunction, description, thumbnail, moduleurl, modulegrouping, isRequiresBooking) {
    try {
        this.init(courseid, basemoduleid, title, status, basemoduletypeid, moduleorder, enabled, action, eventname, actionid,actionIdNew,practiceisoptional,otaTypeId, eventid, assessmentscheduleid, assessmentbookingid, display, accessible, inaccessiblefunction, description, thumbnail, moduleurl, modulegrouping, isRequiresBooking);
    } catch (e) {
        errorHandler("Module", e);
    }
};
Module.prototype = {
init: function(courseid, basemoduleid, title, status, basemoduletypeid, moduleorder, enabled, action, eventname, actionid, actionIdNew,practiceisoptional,otaTypeId,eventid, assessmentscheduleid, assessmentbookingid, display, accessible, inaccessiblefunction, description, thumbnail, moduleurl, modulegrouping, isRequiresBooking) {
    try {
        if (courseid == undefined) {
            courseid = 0;
        }
        if (basemoduleid == undefined) {
            basemoduleid = 0;
        }
        if (title == undefined) {
            title = "";
        }
        if (title === "Assessment Summary") {
            title = resources.assessmentsummary;
        }
        if (status == undefined) {
            status = "";
        }
        switch (status) {
            case -1:
                status = "No Record";
                break;
            case 0:
                status = "Completed";
                break;
            case 1:
                status = "In Progress";
                break;
            case 2:
                status = "Payment Pending";
                break;
            case 3:
                status = "Exempt";
                break;
            case 4:
                status = "Not Started";
                break;
            case 5:
                status = "Payment Required";
                break;
            default:
                status = "Completed";
                break;
        }
        if (basemoduletypeid == undefined) {
            basemoduletypeid = 0;
        }
        if (moduleorder == undefined) {
            moduleorder = 0;
        }
        if (enabled == undefined) {
            enabled = false;
        }
        if (action == undefined) {
            action = "";
        }
        if (eventname == undefined) {
            eventname = "";
        }
        if (actionid == undefined) {
            actionid = 0;
        }
        if(practiceisoptional == undefined){
            practiceisoptional = false;
        }

        if(isRequiresBooking == undefined){
            isRequiresBooking = false;
        }

        if (eventid == undefined) {
            eventid = 0;
        }
        if (assessmentscheduleid == undefined) {
            assessmentscheduleid = 0;
        }
        if (assessmentbookingid == undefined) {
            assessmentbookingid = 0;
        }
        if (display == undefined) {
            display = true;
        }
        if (accessible == undefined) {
            accessible = true;
        }
        if (inaccessiblefunction == undefined) {
            inaccessiblefunction = "";
        }
        if (inaccessiblefunction.indexOf("prevModulesIncomplete") > -1) {
            inaccessiblefunction = "prevmodulesincomplete";
        } else {
            if (inaccessiblefunction.indexOf("modulePaymentRequired") > -1) {
                inaccessiblefunction = "modulepaymentrequired";
            } else {
                if (inaccessiblefunction.indexOf("showModuleGetGuidelines") > -1) {
                    inaccessiblefunction = "showmodulegetguidelines";
                } else {
                    if (inaccessiblefunction.indexOf("showModuleCertificate") > -1) {
                        inaccessiblefunction = "";
                    } else {
                        if (inaccessiblefunction.indexOf("showModuleExempt") > -1) {
                            inaccessiblefunction = "showmoduleexempt";
                        } else {
                            if (inaccessiblefunction.indexOf("showPracticumModule") > -1) {
                                inaccessiblefunction = "showpracticummodule";
                            } else {
                                if ((inaccessiblefunction.indexOf("showModuleBook") > -1)) {
                                    inaccessiblefunction = "showmodulebook";
                                }
                            }
                        }
                    }
                }
            }
        }
        if (description == undefined) {
            description = "";
        }
        if (moduleurl == undefined) {
            moduleurl = "";
        }
        if (thumbnail == undefined) {
            thumbnail = "https://www.eteacher.pro/portals/0/fb_images/pt.jpg";
        }
        if (modulegrouping == undefined) {
            modulegrouping = 0;
        }
        this.courseid = courseid;
        this.title = title;
        this.status = status;
        this.basemoduleid = basemoduleid;
        this.basemoduletypeid = basemoduletypeid;
        this.moduleorder = moduleorder;
        this.enabled = enabled;
        this.action = action;
        this.eventname = eventname;
        this.actionid = actionid;
        this.actionIdNew = actionIdNew;
        this.practiceisoptional = practiceisoptional;
        this.otaTypeId = otaTypeId;
        this.eventid = eventid;
        this.assessmentscheduleid = assessmentscheduleid;
        this.assessmentbookingid = assessmentbookingid;
        this.hassections = true;
        this.display = display;
        this.accessible = accessible;
        this.inaccessiblefunction = inaccessiblefunction;
        this.description = description;
        this.podcasturl = "";
        this.theoryModule = new TheoryModule();
        this.assessmentschedules = new Array();
        
        this.PayToBookAction = "";
        
        this.PayToBookPhoneNumber= "";
        this.scheduledates = new Array();
        this.schedulefulldates = new Array();
        this.hasbooking = false;
        this.thumbnail = thumbnail;
        this.moduleurl = moduleurl;
        this.modulegrouping = modulegrouping;
        this.isRequiresBooking = isRequiresBooking;
        this.testData = new Array();
        return this;
    } catch (e) {
        errorHandler("Module.init", e);
    }
},
getTheoryModule: function() {
    return this.theoryModule;
},
getTheoryModulePodcastUrl: function() {
    if (this.theoryModule != undefined) {
        return this.theoryModule.podcasturl;
    } else {
        return "";
    }
},
refreshLessons: function(returnFunction) {
    try {
        var that = this;
        coController.coGetLessonStructure(this.basemoduleid, function(ret) {
                                          if (ret == undefined) {
                                          msgTitle = resources.connError;
                                          msgBtnValue = resources.btnOk;
                                          msgStr = resources.connectionFail;
                                          navigator.notification.alert(msgStr, function() {
                                                                       hidePleaseWait();
                                                                       returnFunction(false);
                                                                       }, msgTitle, msgBtnValue);
                                          } else {
                                          if (ret == 0) {
                                          if (isDeviceOnline() === false) {
                                          returnFunction("offline");
                                          } else {
                                          this.hassections = false;
                                          returnFunction(false);
                                          }
                                          } else {
                                          var theoryModObj = ret;
                                          if (theoryModObj != undefined) {
                                          that.theoryModule = new TheoryModule(that.courseid, that.basemoduleid, theoryModObj.HasPodcast, theoryModObj.PDFUrl, theoryModObj.PodcastUrl, theoryModObj.LSURLIsYUDU, theoryModObj.YUDUID);
                                          if (theoryModObj.PodcastUrl != undefined) {
                                          that.podcasturl = theoryModObj.PodcastUrl;
                                          }
                                          var sectionObjList = theoryModObj.Sections;
                                          var section;
                                          var sectionObj;
                                          if (sectionObjList != undefined) {
                                          if (sectionObjList.length == undefined || sectionObjList.length == 0) {
                                          sectionObj = sectionObjList;
                                          section = new Section(that.courseid, that.basemoduleid, sectionObj.TheoryModuleSectionId, sectionObj.SectionOrder, sectionObj.Title, sectionObj.Display, sectionObj.Accessible, sectionObj.InaccessibleFunction);
                                          that.theoryModule.sections.push(section);
                                          section.setSCOs(that.courseid, that.basemoduleid, sectionObj);
                                          } else {
                                          for (var i = 0; i < sectionObjList.length; i++) {
                                          sectionObj = sectionObjList[i];
                                          section = new Section(that.courseid, that.basemoduleid, sectionObj.TheoryModuleSectionId, sectionObj.SectionOrder, sectionObj.Title, sectionObj.Display, sectionObj.Accessible, sectionObj.inaccessiblefunction);
                                          that.theoryModule.sections.push(section);
                                          section.setSCOs(that.courseid, that.basemoduleid, sectionObj);
                                          }
                                          }
                                          }
                                          }
                                          returnFunction(true);
                                          }
                                          }
                                          });
    } catch (e) {
        errorHandler("Module.refreshLessons", e);
        returnFunction(false);
    }
},
getModuleSections: function() {
    try {
        if (this.theoryModule == undefined) {
            this.theoryModule = new TheoryModule();
            return this.theorymodule.sections;
        } else {
            var secs = this.theoryModule.getSections();
            return (secs == undefined || secs.length == 0) ? new Array() : secs.sort(this.compareSectionOrder);
        }
    } catch (e) {
        errorHandler("TModule.getSections", e);
    }
},
getSectionById: function(sectionId, returnFunction) {
    try {
        var sections = this.getModuleSections();
        var continueOk = true;
        if (sections != undefined && sections.length == 1) {
            var sec = sections[0];
            if (sec.theorymodulesectionid == sectionId) {
                continueOk = false;
                returnFunction(sec);
            }
        }
        if (continueOk === true && (sections == undefined || sections.length == 0)) {
            this.getFirstSection(function(ret) {
                                 if (this.theoryModule == undefined) {
                                 this.theoryModule = new TheoryModule();
                                 }
                                 if (this.theoryModule.sections != undefined) {
                                 for (var i = 0; i < this.theoryModule.sections.length; i++) {
                                 var s = this.theoryModule.sections[i];
                                 if (s.theorymodulesectionid == sectionId) {
                                 returnFunction(s);
                                 }
                                 }
                                 }
                                 });
        } else {
            if (continueOk === true) {
                for (var i = 0; i < sections.length; i++) {
                    var s = sections[i];
                    if (s.theorymodulesectionid == sectionId) {
                        returnFunction(s);
                    }
                }
            }
        }
    } catch (e) {
        errorHandler("TModule.getSectionById", e);
    }
},
getSectionByOrder: function(orderNo) {
    try {
        var secs = this.theoryModule.getSections();
        secs = secs.sort(this.compareSectionOrder);
        for (var i = 0; i < secs.length; i++) {
            var s = secs[i];
            if (s.sectionorder == orderNo) {
                return s;
            }
        }
    } catch (e) {
        errorHandler("TModule.getSectionById", e);
    }
},
getNextSection: function(direction, currentOrder) {
  //alert(direction);
    try {
        var sections = this.getModuleSections();
        if (sections == undefined || sections.length < 2) {
            return undefined;
        } else {
            sections = sections.sort(this.compareSectionOrder);
            var s = this.getSectionByOrder(currentOrder);
            if (s == undefined) {
                return s;
            }
            if (direction == "prev") {
                sections.reverse();
            }
            var currentPos = 0;
            for (var i = 0; i < sections.length; i++) {
                var sNew = sections[i];
                if (sNew.sectionorder == currentOrder) {
                    currentPos = (i + 1);
                    break;
                }
            }
            return sections[currentPos];
        }
    } catch (e) {
        errorHandler("Section.getNextSection", e);
    }
},
isLastSection: function(sectionId) {
    try {
        var sections = this.getModuleSections();
        if (sections.length > 0) {
            var sectionList = sections.sort(this.compareSectionOrder);
            sectionList.reverse();
            for (var i = 0; i < sectionList.length; i++) {
                var lastSection = sectionList[i];
                if (lastSection.theorymodulesectionid == sectionId) {
                    return true;
                } else {
                    if (lastSection.worksheet.status != worksheetStatus.Completed) {
                        return false;
                    }
                }
            }
        }
        return false;
    } catch (e) {
        errorHandler("Module.isLastSection", e);
    }
},
getFirstSection: function(returnFunction) {
    try {
        var sections = this.getModuleSections();
        var firstSectionCompleted;
        if (sections == undefined || sections.length == 0) {
            var that = this;
            this.refreshLessons(function(ret) {
                                if (ret === "offline") {
                                returnFunction("offline");
                                } else {
                                var sectionListNew = that.getModuleSections();
                                if (sectionListNew != undefined) {
                                sectionListNew = sectionListNew.sort(that.compareSectionOrder);
                                var retSection;
                                secToReturn = sectionListNew[0];
                                for (var i = 0; i < sectionListNew.length; i++) {
                                var sec = sectionListNew[i];
                                if (sec.display && sec.accessible && sec.worksheet.status != worksheetStatus.Completed) {
                                retSection = sec;
                                break;
                                } else {
                                if (sec.display && sec.accessible && sec.worksheet.status == worksheetStatus.Completed && firstSectionCompleted == undefined) {
                                firstSectionCompleted = sec;
                                }
                                }
                                }
                                if (secToReturn != undefined) {
                                returnFunction(secToReturn);
                                } else {
                                if (firstSectionCompleted != undefined) {
                                returnFunction(firstSectionCompleted);
                                } else {
                                returnFunction(sectionListNew[0]);
                                }
                                }
                                }
                                }
                                });
        } else {
            var secToReturn;
            if (sections != undefined) {
                sections = sections.sort(this.compareSectionOrder);
                secToReturn = sections[0];
                for (var i = 0; i < sections.length; i++) {
                    var sec = sections[i];
                    if (sec.display && sec.accessible && sec.worksheet.status != worksheetStatus.Completed) {
                        secToReturn = sec;
                        break;
                    } else {
                        if (sec.display && sec.accessible && sec.worksheet.status == worksheetStatus.Completed && firstSectionCompleted == undefined) {
                            firstSectionCompleted = sec;
                        }
                    }
                }
                if (secToReturn != undefined) {
                    returnFunction(secToReturn);
                } else {
                    if (firstSectionCompleted != undefined) {
                        returnFunction(firstSectionCompleted);
                    } else {
                        returnFunction(sections[0]);
                    }
                }
            }
        }
    } catch (e) {
        errorHandler("Module.getFirstSection", e);
    }
},
getMaxSectionOrder: function() {
    try {
        var secs = this.theoryModule.getSections();
        if (secs != undefined) {
            secs = secs.sort(this.compareSectionOrder);
            secs = secs.reverse();
            var s = secs[0];
            return (s == undefined) ? 0 : s.sectionorder;
        } else {
            return 0;
        }
    } catch (e) {
        errorHandler("Module.getMaxSectionOrder", e);
        return 0;
    }
},
getMinSectionOrder: function() {
    try {
        var secs = this.theoryModule.getSections();
        if (secs != undefined) {
            secs = secs.sort(this.compareSectionOrder);
            var s = secs[0];
            return (s == undefined) ? 0 : s.sectionorder;
        } else {
            return 0;
        }
    } catch (e) {
        errorHandler("Module.getMinSectionOrder", e);
        return 0;
    }
},
compareSectionOrder: function(a, b) {
    return a.sectionorder - b.sectionorder;
},
setSectionVisibility: function() {
    try {
        var secs = this.getModuleSections();
        if (secs != undefined) {
            var accessible = true;
            var prevOrder = parseInt((secs[0]).sectionorder, 10);
            var currentOrder = 0;
            var inaccessiblefunction = "prevSectionsIncomplete(event);";
            $.each(secs, function(i, section) {
                   section.accessible = true;
                   section.inaccessiblefunction = "";
                   currentOrder = parseInt(section.sectionorder, 10);
                   if (accessible == false) {
                   section.accessible = accessible;
                   section.inaccessiblefunction = inaccessiblefunction;
                   }
                   if (currentOrder != prevOrder) {
                   if (accessible) {
                   var ws = section.worksheet;
                   if (ws != undefined) {
                   if (ws.status != worksheetStatus.Completed) {
                   accessible = false;
                   }
                   }
                   }
                   prevOrder == currentOrder;
                   }
                   });
        }
    } catch (e) {
        errorHandler("Module.setSectionVisibility", e);
    }
},
getSectionsListView: function(refresh, returnFunction) {
    try {
        var sectionList = this.getModuleSections();
        if (sectionList == undefined || sectionList.length == 0 || refresh) {
            var that = this;
            this.refreshLessons(function(ret) {
                                if (ret === "offline") {
                                returnFunction("offline");
                                } else {
                                var sectionListNew = that.getModuleSections();
                                if (sectionListNew == undefined || sectionListNew.length == 0) {
                                returnFunction("");
                                }
                                that.generateListView(sectionListNew, function(ret) {
                                                      returnFunction(ret);
                                                      });
                                }
                                });
        } else {
            this.generateListView(sectionList, function(ret) {
                                  returnFunction(ret);
                                  });
        }
    } catch (e) {
        errorHandler("Module.getSectionsListView", e);
        returnFunction("");
    }
},
generateListView: function(sectionList, returnFunction) {
    try {
        var sectionListStr = "";
        if (sectionList != undefined) {
            if (sectionList.length == 0) {
                var id = "nosection-" + this.moduleid;
                sectionListStr = "<div id='" + id + "' data-theme='h' data-content-theme='h' data-role='collapsible' class='sections ui-alt-icon' >";
                sectionListStr += "<h3><div class='sectiontitle'>" + resources.nolessonstructure + "</div></h3>";
                sectionListStr += "</div>";
                returnFunction(sectionListStr);
            } else {
                $.each(sectionList, function(i, section) {
                       section.getSectionLi(function(ret) {
                                            sectionListStr += ret;
                                            });
                       });
                returnFunction(sectionListStr);
            }
        }
    } catch (e) {
        errorHandler("Module.generateListView", e);
        return "";
    }
},
getGuidelinesContent: function(returnFunction) {
    try {
        this.setGuidelineViews(function(ret) {
                               returnFunction(ret);
                               });
    } catch (e) {
        errorHandler("Module.getGuildelinesContent", e);
    }
},
updateGuidelinesStatus: function(returnFunction) {
    try {
        var status = this.basemoduletypeid == 3 ? "In Progress" : "Completed";
        var that = this;
        coController.coUpdateModuleStatus(this.courseid, this.basemoduleid, status, function(ret) {
                                          if (ret == undefined || ret == -1) {
                                          returnFunction(false);
                                          } else {
                                          if (ret == 0) {
                                          returnFunction(false);
                                          } else {
                                          that.status = status;
                                          returnFunction(true);
                                          }
                                          }
                                          });
    } catch (e) {
        errorHandler("Module.updateGuidelinesStatus", e);
    }
},
updateModuleStatus: function(newStatus, returnFunction) {
    try {
        if (this.status == newStatus) {
            returnFunction(true);
        } else {
            var that = this;
            coController.coUpdateModuleStatus(this.courseid, this.basemoduleid, newStatus, function(ret) {
                                              if (ret == undefined || ret == -1) {
                                              returnFunction(false);
                                              } else {
                                              if (ret == 0) {
                                              returnFunction(false);
                                              } else {
                                              that.status = newStatus;
                                              returnFunction(true);
                                              }
                                              }
                                              });
        }
    } catch (e) {
        errorHandler("Module.updateModuleStatus", e);
    }
},
requestCertificate: function(returnFunction) {
    try {
        var that = this;
        coController.coRequestCertificate(this.courseid, this.basemoduleid, function(ret) {
                                          if (ret == undefined || ret == -1) {
                                          returnFunction(false);
                                          } else {
                                          if (ret == 0) {
                                          returnFunction(false);
                                          } else {
                                          returnFunction(true);
                                          }
                                          }
                                          });
    } catch (e) {
        errorHandler("Module.requestCertificate", e);
    }
},
setGuidelineViews: function(returnFunction) {
    try {
        if (this.description != undefined && this.description.length > 0) {
            returnFunction(this.description);
        }
        var that = this;
        coController.coGetGuidelines(this.courseid, this.basemoduleid, function(ret) {
                                     if ((ret == undefined || ret == -1 || ret == 0) && isDeviceOnline() === false) {
                                     returnFunction("offline");
                                     } else {
                                     if (ret == undefined || ret == -1) {
                                     msgTitle = resources.connError;
                                     msgBtnValue = resources.btnOk;
                                     msgStr = resources.connectionFail;
                                     navigator.notification.alert(msgStr, function() {
                                                                  hidePleaseWait();
                                                                  returnFunction("");
                                                                  }, msgTitle, msgBtnValue);
                                     } else {
                                     if (ret == 0) {
                                     returnFunction("");
                                     } else {
                                     var modObj = ret;
                                     if (modObj != undefined) {
                                     var description = formatDescription(modObj.AssetContent);
                                     that.description = description;
                                     returnFunction(description);
                                     } else {
                                     returnFunction("");
                                     }
                                     }
                                     }
                                     }
                                     });
    } catch (e) {
        errorHandler("Module.setGuidelineViews", e);
    }
},
getAssessmentSchedules: function(returnFunction) {
    try {

        if (this.assessmentschedules != undefined && this.assessmentschedules.length == 0) {
            var that = this;
            coController.coGetAssessmentSchedules(this.courseid, this.basemoduleid, function(ret) {
                                                  if ((ret == undefined || ret == -1 || ret == 0) && isDeviceOnline() === false) {
                                                  returnFunction("offline");
                                                  } else {
                                                  if (ret == 0) {
                                                  returnFunction(false);
                                                  } else {
                                                  that.assessmentschedules = new Array();
                                                  that.testData = new Array();
                                                  that.schedulefulldates = new Array();
                                                  that.scheduledates = new Array();
                                                  var schedulesObj = ret.AssessmentScheduleDetailList;
                                                  //window.localStorage.removeItem("GetAssessmentSchedules");
                                                  //window.localStorage.setItem("GetAssessmentSchedules",JSON.stringify(ret));
                                                  that.PayToBookAction= ret.PayToBookAction;
                                                  that.PayToBookPhoneNumber = ret.PhoneNumber;
                                                  //window.localStorage.removeItem("BookingMessage");
                                                  //window.localStorage.setItem("BookingMessage",ret.BookingMessage);
                                                  
                                                  if (schedulesObj != undefined) {
                                                  var schedule;
                                                  var scheduleObj;
                                                  var bookingItem;
                                                  var bookingObj;
                                                  if (schedulesObj.length == undefined || schedulesObj.length == 0) {
                                                  scheduleObj = schedulesObj;
                                                  schedule = new AssessmentSchedule(that.courseid, that.basemoduleid, scheduleObj.AssessmentScheduleID, scheduleObj.AssessmentItemID, scheduleObj.Duration, scheduleObj.VenueRoomID, scheduleObj.ScheduledDate, scheduleObj.StartTime, scheduleObj.EndTime, scheduleObj.VenueName, scheduleObj.VenueTelNo, scheduleObj.Directions, scheduleObj.Street1, scheduleObj.Street2, scheduleObj.City, scheduleObj.Region, scheduleObj.PostCode, scheduleObj.TotalBookings, scheduleObj.RoomName, scheduleObj.ActualCapacity, scheduleObj.AssessmentBookingID, scheduleObj.ScheduledDateString, scheduleObj.HighLightDates, scheduleObj.VenueID, scheduleObj.Latitude, scheduleObj.Longitude, scheduleObj.RestrictBooking,scheduleObj.ZoomJoinURL, scheduleObj.ShowAttendButton, scheduleObj.ZoomMeetingPassword);
                                                  schedule.booking = new BookingItem();
                                                  that.assessmentschedules.push(schedule);
                                                  that.testData.push(ret);
                                                  bookingObj = scheduleObj.BookingItem;
                                                  if (bookingObj != undefined && bookingObj.length != 0) {
                                                  bookingItem = new BookingItem(bookingObj.AssessmentItemId, bookingObj.AssessmentScheduleId, bookingObj.AssessmentBookingId, bookingObj.OTAGUID, bookingObj.EmailNotificationStatus, bookingObj.BookingDate, bookingObj.BookingDateString, bookingObj.AllowCancel, bookingObj.ResultPending);
                                                  schedule.booking = bookingItem;
                                                  that.hasbooking = true;
                                                  }
                                                  } else {
                                                    that.testData.push(ret);
                                                  for (var i = 0; i < schedulesObj.length; i++) {
                                                  scheduleObj = schedulesObj[i];
                                                  schedule = new AssessmentSchedule(that.courseid, that.basemoduleid, scheduleObj.AssessmentScheduleID, scheduleObj.AssessmentItemID, scheduleObj.Duration, scheduleObj.VenueRoomID, scheduleObj.ScheduledDate, scheduleObj.StartTime, scheduleObj.EndTime, scheduleObj.VenueName, scheduleObj.VenueTelNo, scheduleObj.Directions, scheduleObj.Street1, scheduleObj.Street2, scheduleObj.City, scheduleObj.Region, scheduleObj.PostCode, scheduleObj.TotalBookings, scheduleObj.RoomName, scheduleObj.ActualCapacity, scheduleObj.AssessmentBookingID, scheduleObj.ScheduledDateString, scheduleObj.HighLightDates, scheduleObj.VenueID, scheduleObj.Latitude, scheduleObj.Longitude, scheduleObj.RestrictBooking,scheduleObj.ZoomJoinURL, scheduleObj.ShowAttendButton, scheduleObj.ZoomMeetingPassword);
                                                  schedule.booking = new BookingItem();
                                                  that.assessmentschedules.push(schedule);
                                                  
                                                  bookingObj = scheduleObj.BookingItem;
                                                  if (bookingObj != undefined && bookingObj.length != 0) {
                                                  bookingItem = new BookingItem(bookingObj.AssessmentItemId, bookingObj.AssessmentScheduleId, bookingObj.AssessmentBookingId, bookingObj.OTAGUID, bookingObj.EmailNotificationStatus, bookingObj.BookingDate, bookingObj.BookingDateString, bookingObj.AllowCancel, bookingObj.ResultPending);
                                                  schedule.booking = bookingItem;
                                                  that.hasbooking = true;
                                                  }
                                                  }
                                                  }
                                                  }
                                                  if (that.assessmentschedules.length > 0) {
                                                  that.getScheduleDates();
                                                  }
                                                  }
                                                  }
                                                  returnFunction(true);
                                                  });
        } else {
            returnFunction(true);
        }
    } catch (e) {
        errorHandler("Module.getAssessmentSchedules", e);
    }
},
getAssessmentResult: function(returnFunction) {
    try {
        var that = this;
        coController.coGetAssessmentResult(this.courseid, this.basemoduleid, function(ret) {
                                           if ((ret == undefined || ret == 0 || ret == 0) && isDeviceOnline() === false) {
                                           returnFunction("offline");
                                           } else {
                                           if (ret == undefined) {
                                           returnFunction("<div class='noschedules'>" + resources.assessmentresultfail + "</div>");
                                           } else {
                                           if (ret == 0) {
                                           returnFunction("<div class='noschedules'>" + resources.assessmentresultfail + "</div>");
                                           } else {
                                           var resultString = "";
                                           var resultObj = ret;
                                           if (resultObj != undefined) {
                                           resultString = resultObj.Result;
                                           }
                                           }
                                           }
                                           }
                                           returnFunction(resultString);
                                           });
    } catch (e) {
        errorHandler("Module.getAssessmentResult", e);
    }
},
assessmentBookingCreate: function(assessmentItemId, assessmentScheduleId, returnFunction) {
    try {
        var that = this;
        coController.coAssessmentBookingCreate(this.courseid, this.basemoduleid, assessmentScheduleId, assessmentItemId, function(ret) {
                                               if (ret == undefined) {
                                               msgTitle = resources.connError;
                                               msgBtnValue = resources.btnOk;
                                               msgStr = resources.connectionFail;
                                               navigator.notification.alert(msgStr, function() {
                                                                            hidePleaseWait();
                                                                            returnFunction(false);
                                                                            }, msgTitle, msgBtnValue);
                                               } else {
                                               if (ret == 0) {
                                               returnFunction(false);
                                               } else {
                                               var bookingItem;
                                               var bookingObj;
                                               var schedule = that.getAssessmentScheduleById(assessmentScheduleId);
                                               if (schedule != undefined) {
                                               schedule.booking = new BookingItem();
                                               bookingObj = ret;
                                               if (bookingObj != undefined && bookingObj.length != 0) {
                                               bookingItem = new BookingItem(bookingObj.AssessmentItemId, bookingObj.AssessmentScheduleId, bookingObj.AssessmentBookingId, bookingObj.OTAGUID, bookingObj.EmailNotificationStatus, bookingObj.BookingDate, bookingObj.BookingDateString, bookingObj.AllowCancel, bookingObj.ResultPending);
                                               schedule.booking = bookingItem;
                                               that.hasbooking = true;
                                               returnFunction(true);
                                               } else {
                                               returnFunction(false);
                                               }
                                               }
                                               }
                                               }
                                               });
    } catch (e) {
        errorHandler("Module.assessmentBookingCreate", e);
        returnFunction(false);
    }
},
assessmentBookingDelete: function(assessmentItemId, assessmentScheduleId, bookingId, returnFunction) {
    try {
        var that = this;
        coController.coAssessmentBookingDelete(this.courseid, this.basemoduleid, assessmentScheduleId, assessmentItemId, bookingId, function(ret) {
                                               if (ret == undefined) {
                                               msgTitle = resources.connError;
                                               msgBtnValue = resources.btnOk;
                                               msgStr = resources.connectionFail;
                                               navigator.notification.alert(msgStr, function() {
                                                                            hidePleaseWait();
                                                                            returnFunction(false);
                                                                            }, msgTitle, msgBtnValue);
                                               } else {
                                               if (ret == 0) {
                                               returnFunction(false);
                                               } else {
                                               var schedule = that.getAssessmentScheduleById(assessmentScheduleId);
                                               if (schedule != undefined) {
                                               schedule.assessmentbookingid = 0;
                                               schedule.booking = new BookingItem();
                                               returnFunction(true);
                                               } else {
                                               returnFunction(false);
                                               }
                                               }
                                               }
                                               });
    } catch (e) {
        errorHandler("Module.assessmentBookingDelete", e);
        returnFunction(false);
    }
},
getAssessmentSchedulesListView: function(returnFunction) {
   /* try {

        var schedulesStr = "";
        if (this.assessmentschedules == undefined || this.assessmentschedules.length == 0) {
            schedulesStr = resources.nobookingdates;
        } else {
            if (this.hasbooking) {
                schedulesStr = this.getBookingListView();
            } else {
                var bkDate = "";
                var scheduleFirst = this.assessmentschedules[0];
                var highLightDates = scheduleFirst.highlightdates;
                var hd = 0;
                //console.log(this.PayToBookPhoneNumber);

                var MobNo = this.PayToBookPhoneNumber;
                var CalltoPay= MobNo.replace(/ /g,"");

                for (var i = 0; i < this.assessmentschedules.length; i++) {
                  if(this.PayToBookAction==1){
                    var schedule = this.assessmentschedules[i];
                    var id = $.trim(highLightDates[hd]);
                    if (bkDate != schedule.scheduleddatestring) {
                        if (i == 0) {
                            schedulesStr += "<li data-theme='h' class='ui-bar-h bookingdivider clientheader ui-li ui-li-divider' id='libook-" + id + "'>";
                        } else {
                            schedulesStr += "<li data-theme='h' class='ui-bar-h bookingdivider clientheader ui-li ui-li-divider' id='libook-" + id + "'>";
                        }
                        schedulesStr += "<div class='bookingdatehead' id='schedule-" + id + "'>" + schedule.scheduleddatestring + "</div>";
                        bkDate = schedule.scheduleddatestring;
                        schedulesStr += "</li>";
                        hd += 1;
                    }
                    var schedulesId = "schedules-" + $.trim(highLightDates[(hd - 1)]);
                    schedulesStr += "<li class='scheduleitem  " + schedulesId + "' data-theme='h'><div class='scheduleitemmain'>";
                    schedulesStr += "<div class='scheduleitemhead'>";
                    //schedulesStr += this.title + ", " + schedule.starttime + ", " + schedule.venuename;
                    schedulesStr += schedule.starttime + ", " + schedule.venuename;
                    schedulesStr += "</div>";
                    schedulesStr += "<div class='viewbookbtn'><a class='viewschedulebookbtn ui-btn ui-btn-h' data-theme='h' href='#' id='viewbook-" + schedule.assessmentscheduleid + "-" + schedule.assessmentitemid + "'>" + resources.detailsbtntxt + "</a></div>";
                    schedulesStr += "<div class='bookbtn' id="+CalltoPay+"><a class='schedulebookbtn paynbook ";
                    schedulesStr += schedule.restrictbooking===true ? 'restrictbooking' : '';
                    schedulesStr += " ui-btn ui-btn-h' data-theme='h' href='#' id='book-" + schedule.assessmentscheduleid + "-" + schedule.assessmentitemid + "'>" + resources.bookbtntxtPayToBook + "</a></div>";
                    schedulesStr += "</li>";
                  }
                  else{
                    var schedule = this.assessmentschedules[i];
                    var id = $.trim(highLightDates[hd]);
                    if (bkDate != schedule.scheduleddatestring) {
                        if (i == 0) {
                            schedulesStr += "<li data-theme='h' class='ui-bar-h bookingdivider clientheader ui-li ui-li-divider' id='libook-" + id + "'>";
                        } else {
                            schedulesStr += "<li data-theme='h' class='ui-bar-h bookingdivider clientheader ui-li ui-li-divider' id='libook-" + id + "'>";
                        }
                        schedulesStr += "<div class='bookingdatehead' id='schedule-" + id + "'>" + schedule.scheduleddatestring + "</div>";
                        bkDate = schedule.scheduleddatestring;
                        schedulesStr += "</li>";
                        hd += 1;
                    }
                    var schedulesId = "schedules-" + $.trim(highLightDates[(hd - 1)]);
                    schedulesStr += "<li class='scheduleitem  " + schedulesId + "' data-theme='h'><div class='scheduleitemmain'>";
                    schedulesStr += "<div class='scheduleitemhead'>";
                    //schedulesStr += this.title + ", " + schedule.starttime + ", " + schedule.venuename;
                    schedulesStr += schedule.starttime + ", " + schedule.venuename;
                    schedulesStr += "</div>";
                    schedulesStr += "<div class='viewbookbtn'><a class='viewschedulebookbtn ui-btn ui-btn-h' data-theme='h' href='#' id='viewbook-" + schedule.assessmentscheduleid + "-" + schedule.assessmentitemid + "'>" + resources.detailsbtntxt + "</a></div>";
                    schedulesStr += "<div class='bookbtn'><a class='schedulebookbtn ";
                    schedulesStr += schedule.restrictbooking===true ? 'restrictbooking' : '';
                    schedulesStr += " ui-btn ui-btn-h' data-theme='h' href='#' id='book-" + schedule.assessmentscheduleid + "-" + schedule.assessmentitemid + "'>" + resources.bookbtntxt + "</a></div>";
                    schedulesStr += "</li>";
                  }
                    
                }
            }
        }
        //alert(schedulesStr);
        returnFunction(schedulesStr);
    } catch (e) {
        errorHandler("Module.getAssessmentSchedulesListView", e);
    }*/
    try {
        //console.log(this.testData[0].BookingMessage);
        window.localStorage.removeItem("GetAssessmentSchedules");
        window.localStorage.setItem("GetAssessmentSchedules",JSON.stringify(this.testData[0]));
        window.localStorage.removeItem("BookingMessage");
        window.localStorage.setItem("BookingMessage",this.testData[0].BookingMessage);
        
        var schedulesStr = "";
        if (this.assessmentschedules == undefined || this.assessmentschedules.length == 0) {
            schedulesStr = resources.nobookingdates;
        } else {
            if (this.hasbooking) {
                schedulesStr = this.getBookingListView();
            } else {
                var bkDate = "";
                var scheduleFirst = this.assessmentschedules[0];
                var highLightDates = scheduleFirst.highlightdates;
                var hd = 0;
                //console.log(this.PayToBookPhoneNumber);

                var MobNo = this.PayToBookPhoneNumber;
                var CalltoPay= MobNo.replace(/ /g,"");
                //alert(this.BookingMessage);
                var GetAssessmentSchedules = window.localStorage.getItem("GetAssessmentSchedules");
                var GetAssessmentSchedulesParse = JSON.parse(GetAssessmentSchedules);
                //alert(GetAssessmentSchedulesParse.CourseOverridePayToBook);

                console.log(this.PayToBookAction);
                for (var i = 0; i < this.assessmentschedules.length; i++) {
                  if(GetAssessmentSchedulesParse.PayToBook == true && GetAssessmentSchedulesParse.CourseOverridePayToBook == false && GetAssessmentSchedulesParse.ModulePayToBookStatusID == 2){
                      
                    var schedule = this.assessmentschedules[i];
                    var id = $.trim(highLightDates[hd]);
                    if (bkDate != schedule.scheduleddatestring) {
                        if (i == 0) {
                            schedulesStr += "<li data-theme='h' class='ui-bar-h bookingdivider clientheader ui-li ui-li-divider' id='libook-" + id + "'>";
                        } else {
                            schedulesStr += "<li data-theme='h' class='ui-bar-h bookingdivider clientheader ui-li ui-li-divider' id='libook-" + id + "'>";
                        }
                        schedulesStr += "<div class='bookingdatehead' id='schedule-" + id + "'>" + schedule.scheduleddatestring + "</div>";
                        bkDate = schedule.scheduleddatestring;
                        schedulesStr += "</li>";
                        hd += 1;
                    }
                    var schedulesId = "schedules-" + $.trim(highLightDates[(hd - 1)]);
                    schedulesStr += "<li class='scheduleitem  " + schedulesId + "' data-theme='h'><div class='scheduleitemmain'>";
                    schedulesStr += "<div class='scheduleitemhead'>";
                    //schedulesStr += this.title + ", " + schedule.starttime + ", " + schedule.venuename;
                    schedulesStr += schedule.starttime + ", " + schedule.venuename;
                    schedulesStr += "</div>";
                    schedulesStr += "<div class='viewbookbtn'><a class='viewschedulebookbtn ui-btn ui-btn-h' data-theme='h' href='#' id='viewbook-" + schedule.assessmentscheduleid + "-" + schedule.assessmentitemid + "'>" + resources.detailsbtntxt + "</a></div>";
                    schedulesStr += "<div class='bookbtn' style='background-color:#079469;' id="+CalltoPay+"><a class='schedulebookbtn paynbook ";
                    schedulesStr += schedule.restrictbooking===true ? 'restrictbooking' : '';
                    schedulesStr += " ui-btn ui-btn-h' data-theme='h' href='#' id='book-" + schedule.assessmentscheduleid + "-" + schedule.assessmentitemid + "'>" + resources.bookbtntxtPayToBook + "</a></div>";
                    schedulesStr += "</li>";
                  }

                  else if(GetAssessmentSchedulesParse.CourseOverridePayToBook == false && GetAssessmentSchedulesParse.PayToBook == false){
                  //else if(GetAssessmentSchedulesParse.CourseOverridePayToBook == true){
                    var schedule = this.assessmentschedules[i];
                    var id = $.trim(highLightDates[hd]);
                    if (bkDate != schedule.scheduleddatestring) {
                        if (i == 0) {
                            schedulesStr += "<li data-theme='h' class='ui-bar-h bookingdivider clientheader ui-li ui-li-divider' id='libook-" + id + "'>";
                        } else {
                            schedulesStr += "<li data-theme='h' class='ui-bar-h bookingdivider clientheader ui-li ui-li-divider' id='libook-" + id + "'>";
                        }
                        schedulesStr += "<div class='bookingdatehead' id='schedule-" + id + "'>" + schedule.scheduleddatestring + "</div>";
                        bkDate = schedule.scheduleddatestring;
                        schedulesStr += "</li>";
                        hd += 1;
                    }
                    var schedulesId = "schedules-" + $.trim(highLightDates[(hd - 1)]);
                    schedulesStr += "<li class='scheduleitem  " + schedulesId + "' data-theme='h'><div class='scheduleitemmain'>";
                    schedulesStr += "<div class='scheduleitemhead'>";
                    //schedulesStr += this.title + ", " + schedule.starttime + ", " + schedule.venuename;
                    schedulesStr += schedule.starttime + ", " + schedule.venuename;
                    schedulesStr += "</div>";
                    schedulesStr += "<div class='viewbookbtn'><a class='viewschedulebookbtn ui-btn ui-btn-h' data-theme='h' href='#' id='viewbook-" + schedule.assessmentscheduleid + "-" + schedule.assessmentitemid + "'>" + resources.detailsbtntxt + "</a></div>";
                    schedulesStr += "<div class='bookbtn' style='background-color:#079469;'><a class='schedulebookbtn wthMsg";
                    schedulesStr += schedule.restrictbooking===true ? 'restrictbooking' : '';
                    schedulesStr += " ui-btn ui-btn-h' data-theme='h' href='#' id='book-" + schedule.assessmentscheduleid + "-" + schedule.assessmentitemid + "'>" + resources.bookbtntxt + "</a></div>";
                    schedulesStr += "</li>";
                  }
                  else{
                    var schedule = this.assessmentschedules[i];
                    var id = $.trim(highLightDates[hd]);
                    if (bkDate != schedule.scheduleddatestring) {
                        if (i == 0) {
                            schedulesStr += "<li data-theme='h' class='ui-bar-h bookingdivider clientheader ui-li ui-li-divider' id='libook-" + id + "'>";
                        } else {
                            schedulesStr += "<li data-theme='h' class='ui-bar-h bookingdivider clientheader ui-li ui-li-divider' id='libook-" + id + "'>";
                        }
                        schedulesStr += "<div class='bookingdatehead' id='schedule-" + id + "'>" + schedule.scheduleddatestring + "</div>";
                        bkDate = schedule.scheduleddatestring;
                        schedulesStr += "</li>";
                        hd += 1;
                    }
                    var schedulesId = "schedules-" + $.trim(highLightDates[(hd - 1)]);
                    schedulesStr += "<li class='scheduleitem  " + schedulesId + "' data-theme='h'><div class='scheduleitemmain'>";
                    schedulesStr += "<div class='scheduleitemhead'>";
                    //schedulesStr += this.title + ", " + schedule.starttime + ", " + schedule.venuename;
                    schedulesStr += schedule.starttime + ", " + schedule.venuename;
                    schedulesStr += "</div>";
                    schedulesStr += "<div class='viewbookbtn'><a class='viewschedulebookbtn ui-btn ui-btn-h' data-theme='h' href='#' id='viewbook-" + schedule.assessmentscheduleid + "-" + schedule.assessmentitemid + "'>" + resources.detailsbtntxt + "</a></div>";
                    schedulesStr += "<div class='bookbtn' style='background-color:#079469;'><a class='schedulebookbtn ";
                    schedulesStr += schedule.restrictbooking===true ? 'restrictbooking' : '';
                    schedulesStr += " ui-btn ui-btn-h' data-theme='h' href='#' id='book-" + schedule.assessmentscheduleid + "-" + schedule.assessmentitemid + "'>" + resources.bookbtntxt + "</a></div>";
                    schedulesStr += "</li>";
                  }
                    
                }
            }
        }
        //alert(schedulesStr);
        returnFunction(schedulesStr);
    } catch (e) {
        errorHandler("Module.getAssessmentSchedulesListView", e);
    }
},
getBookingListView: function() {
    try {
        var schedulesStr = "";
        var showPassowrd = "NotPassowrd";
        var showPassowrdStar = "NotStar";
        var lesswidth = "";
        for (var y = 0; y < this.assessmentschedules.length; y++) {
            var scheduleBook = this.assessmentschedules[y];
            //console.log(scheduleBook);
            if (scheduleBook.booking != undefined && scheduleBook.booking.assessmentbookingid > 0) {
                console.log(scheduleBook);
                if(scheduleBook.showattendbutton == true){
                       lesswidth = "scheduleitemheadlessWidth";
                }
                else{
                    lesswidth = "";
                }
                schedulesStr += "<li data-role='list-divider' data-theme='h' class='bookingdivider'>";
                schedulesStr += "<div class='bookingitemli'><div class='bookingitemdatehead'>" + scheduleBook.scheduleddatestring + "</div>";
                schedulesStr += "<div class='bookingmodtype'></div></div>";
                schedulesStr += "</li>";
                schedulesStr += "<li class='scheduleitem scheduleitembook'><div class='scheduleitemmain'>";
                schedulesStr += "<div class='scheduleitemhead "+lesswidth+"'>";
                
                schedulesStr += scheduleBook.starttime + ", " + scheduleBook.venuename;
                // schedulesStr += scheduleBook.starttime + ", " + scheduleBook.venuename;
                schedulesStr += "</div>";
                if (scheduleBook.booking.resultpending === false) {

                    if (scheduleBook.booking.allowcancel == true) {
                        schedulesStr += "<div class='viewbookbtn' style='width: 13%;'><a  class='viewschedulebookbtn ui-btn ui-btn-h' data-theme='h' href='#' id='viewbook-" + scheduleBook.assessmentscheduleid + "-" + scheduleBook.assessmentitemid + "'>" + resources.detailsbtntxt + "</a></div>";
                        schedulesStr += "<div class='cancelbookbtn' style='padding-top: 12.1px;margin-left: 0px !important;width: 14%;background-color: #ef5351 !important;'><a style='background-color: #ef5351 !important;' class='cancelschedulebookbtn ui-btn ui-btn-h' data-theme='h' href='#' id='cancelbook-" + scheduleBook.assessmentscheduleid + "-" + scheduleBook.assessmentitemid + "-" + scheduleBook.assessmentbookingid + "'>" + resources.cancelbtntxt + "</a></div>";
                    } else {
                        if(scheduleBook.showattendbutton == true){
                            showPassowrd = 'showPassowrdBooking';
                            showPassowrdStar = "ShowStarBooking";
                            schedulesStr += "<div id=hidebooking-"+scheduleBook.assessmentbookingid+" style='float:left;font-size: 0.8em;padding-top: 13px;letter-spacing: 3px;display:none;' class='"+showPassowrdStar+"'>******</div><img id='"+scheduleBook.assessmentbookingid+"' alt='"+scheduleBook.zoommeetingpassword+"' style='display:none;height: 21px;float: left;padding-top: 7px;' class='"+showPassowrd+"' src='css/client/images/passwordHide.png' >";
                            schedulesStr += "<div class='cancelbookbtn' style='background-color: #079469 !important;padding-top: 11px;'><a style='background-color: #079469 !important;' class='attendschedulebookbtn ui-btn ui-btn-h' data-theme='h' href='#' id='"+scheduleBook.zoomjoinURL+"'>" + resources.AttendBtn + "</a></div>";/* zoommeetingpassword*/
                            showPassowrd = "NotPassowrd";
                            showPassowrdStar = "NotStar";
                        }
                        else{
                            schedulesStr += "<div class='viewbookbtn' style='width: 13%;'><a  class='viewschedulebookbtn ui-btn ui-btn-h' data-theme='h' href='#' id='viewbook-" + scheduleBook.assessmentscheduleid + "-" + scheduleBook.assessmentitemid + "'>" + resources.detailsbtntxt + "</a></div>";
                            schedulesStr += "<div class='cancelbookbtn' style='padding-top: 12.1px;margin-left: 0px !important;width: 14%;background-color: #ef5351 !important;'><a style='background-color: #ef5351 !important;' class='nocancelschedulebookbtn ui-btn ui-btn-h' data-theme='h' href='#' id='cancelbook-" + scheduleBook.assessmentscheduleid + "-" + scheduleBook.assessmentitemid + "-" + scheduleBook.assessmentbookingid + "'>" + resources.cancelbtntxt + "</a></div>";
                        }

                    }
                    schedulesStr += "</li>";
                    $("#bookingdisclaimerdiv").removeClass("nodisplayimp");
                    $("#bookingdisclaimerdiv").html(resources.bookingDisclaimerDiv);
                } else {
                    //schedulesStr += "<div class='awaitingresults'>" + resources.bookingAwaitingResult + "</div></li>";
                    schedulesStr += "<div style='width:21% !important;text-align:center;margin-left: 6% !important;padding-top: 11px;' class='cancelbookbtn greyColorButton'>"+ resources.bookingAwaitingResult +"</div></li>";
                    $("#bookingdisclaimerdiv").addClass("nodisplayimp");
                }
                break;
            }
        }
        return schedulesStr;
    } catch (e) {
        errorHandler("Module.getBookingListView", e);
    }
},
getScheduleDates: function() {
    try {
        this.schedulefulldates = new Array();
        this.scheduledates = new Array();
        if (this.assessmentschedules != undefined && this.assessmentschedules.length > 0) {
            var schedule = this.assessmentschedules[0];
            if (schedule != undefined && schedule.highlightdates != undefined) {
                for (var i = 0; i < schedule.highlightdates.length; i++) {
                    var scheduledDate = $.trim(schedule.highlightdates[i]);
                    var checkSchedule = this.assessmentschedules[i];
                    if (checkSchedule.totalbookings == checkSchedule.actualcapacity) {
                        this.schedulefulldates.push(scheduledDate);
                    } else {
                        this.scheduledates.push(scheduledDate);
                    }
                }
            }
        }
    } catch (e) {
        errorHandler("Module.getScheduleDates", e);
    }
},
getAssessmentScheduleById: function(assessmentScheduleId) {
    try {
        var assessmentSchedule = new AssessmentSchedule();
        if (this.assessmentschedules != undefined || this.assessmentschedules.length > 0) {
            for (var i = 0; i < this.assessmentschedules.length; i++) {
                var checkSchedule = this.assessmentschedules[i];
                if (checkSchedule.assessmentscheduleid == assessmentScheduleId) {
                    return checkSchedule;
                }
            }
        }
        return assessmentSchedule;
    } catch (e) {
        errorHandler("Module.getAssessmentScheduleById", e);
    }
}
};
var TheoryModule = function(courseid, basemoduleid, haspodcast, pdfurl, podcasturl, LSURLIsYUDU, YUDUID) {
    try {
        this.init(courseid, basemoduleid, haspodcast, pdfurl, podcasturl, LSURLIsYUDU, YUDUID);
    } catch (e) {
        errorHandler("TheoryModule", e);
    }
};
TheoryModule.prototype = {
init: function(courseid, basemoduleid, haspodcast, pdfurl, podcasturl, LSURLIsYUDU, YUDUID) {
    try {
        this.sections = new Array();
        if (courseid == undefined) {
            courseid = 0;
        }
        if (basemoduleid == undefined) {
            basemoduleid = 0;
        }
        if (haspodcast == undefined) {
            haspodcast = false;
        }
        if (pdfurl == undefined) {
            pdfurl = "";
        }
        if (podcasturl == undefined) {
            podcasturl = "";
        }
        if (LSURLIsYUDU == undefined) {
            LSURLIsYUDU = "";
        }
        if (YUDUID == undefined) {
            YUDUID = "";
        }
        this.courseid = courseid;
        this.basemoduleid = basemoduleid;
        this.haspodcast = haspodcast;
        this.pdfurl = pdfurl;
        this.podcasturl = podcasturl;
        this.LSURLIsYUDU = LSURLIsYUDU;
        this.YUDUID = YUDUID;
        return this;
    } catch (e) {
        errorHandler("TheoryModule.init", e);
    }
},
getSections: function() {
    try {
        return this.sections;
    } catch (e) {
        errorHandler("TheoryModule.getSections", e);
    }
}
};
var Section = function(courseid, basemoduleid, theorymodulesectionid, sectionorder, title, display, accessible, inaccessiblefunction) {
    try {
        this.init(courseid, basemoduleid, theorymodulesectionid, sectionorder, title, display, accessible, inaccessiblefunction);
    } catch (e) {
        errorHandler("Section", e);
    }
};
Section.prototype = {
init: function(courseid, basemoduleid, theorymodulesectionid, sectionorder, title, display, accessible, inaccessiblefunction) {
    try {
        this.scos = new Array();
        this.worksheet = new Worksheet();
        this.worksheetresult = new Worksheet();
        if (courseid == undefined) {
            courseid = 0;
        }
        if (basemoduleid == undefined) {
            basemoduleid = 0;
        }
        if (theorymodulesectionid == undefined) {
            theorymodulesectionid = 0;
        }
        if (sectionorder == undefined) {
            sectionorder = 0;
        }
        if (title == undefined) {
            title = "";
        }
        if (display == undefined) {
            display = true;
        }
        if (accessible == undefined) {
            accessible = true;
        }
        if (inaccessiblefunction == undefined) {
            inaccessiblefunction = "";
        }
        this.courseid = courseid;
        this.basemoduleid = basemoduleid;
        this.theorymodulesectionid = theorymodulesectionid;
        this.sectionorder = sectionorder;
        this.title = title;
        this.display = display;
        this.accessible = accessible;
        this.inaccessiblefunction = inaccessiblefunction;
        return this;
    } catch (e) {
        errorHandler("Section.init", e);
    }
},
getScos: function() {
    try {
        return this.scos.sort(this.compareScoOrder);
    } catch (e) {
        errorHandler("Section.getScos", e);
    }
},
getFirstSCO: function() {
    try {
        if (this.scos.length > 0) {
            var scosList = this.scos.sort(this.compareScoOrder);
            return scosList[0];
        }
        return new SCO();
    } catch (e) {
        errorHandler("Section.getFirstSCO", e);
    }
},
isLastSCO: function(scoAssetId) {
    try {
        if (this.scos.length > 0) {
            var scosList = this.scos.sort(this.compareScoOrder);
            scosList.reverse();
            var lastSCO = scosList[0];
            if (lastSCO.assetid == scoAssetId) {
                return true;
            }
        }
        return false;
    } catch (e) {
        errorHandler("Section.isLastSCO", e);
    }
},
getSCOById: function(assetid) {
    try {
        var scos = this.scos.sort(this.compareScoOrder);
        for (var i = 0; i < scos.length; i++) {
            var s = scos[i];
            if (s.assetid == assetid) {
                return s;
            }
        }
    } catch (e) {
        errorHandler("SCO.getSCOById", e);
    }
},
getSCOByOrder: function(orderNo) {
    try {
        var scos = this.getScos();
        scos = scos.sort(this.compareScoOrder);
        for (var i = 0; i < scos.length; i++) {
            var s = scos[i];
            if (s.sectionorder == orderNo) {
                return s;
            }
        }
    } catch (e) {
        errorHandler("Section.getSCOByOrder", e);
    }
},
getNextSCO: function(direction, currentOrder) {
  //alert(direction);
    try {
        var scos = this.getScos();
        scos = scos.sort(this.compareScoOrder);
        var s = this.getSCOByOrder(currentOrder);
        if (s == undefined) {
            return s;
        }
        var currentPos = 0;
        for (var i = 0; i < scos.length; i++) {
            var sNew = scos[i];
            if (sNew.sectionorder == currentOrder) {
                if (direction == "next") {
                    currentPos = (i + 1);
                } else {
                    currentPos = (i - 1);
                }
                break;
            }
        }
        if (currentPos < 0) {
            currentPos = 0;
        } else {
            if (currentPos == scos.length) {
                currentPos = (currentPos - 1);
            }
        }
        return scos[currentPos];
    } catch (e) {
        errorHandler("Section.getNextSCO", e);
    }
},
compareScoOrder: function(a, b) {
    return a.sectionorder - b.sectionorder;
},
setSCOs: function(courseid, basemoduleid, sectionObj) {
    try {
        var scosList = sectionObj.SCOs;
        if (scosList != undefined) {
            var scoorder;
            var sco;
            var scoObj;
            if (scosList.length == undefined || scosList.length == 0) {
                scoObj = scosList;
                scoorder = scoObj.SectionOrder == 0 ? x + 1 : scoObj.SectionOrder;
                sco = new SCO(courseid, basemoduleid, this.theorymodulesectionid, scoObj.Title, scoorder, scoObj.SCOID, scoObj.AssetId, scoObj.UserChoice);
                this.scos.push(sco);
            } else {
                for (var x = 0; x < scosList.length; x++) {
                    scoObj = scosList[x];
                    scoorder = scoObj.SectionOrder == 0 ? x + 1 : scoObj.SectionOrder;
                    sco = new SCO(courseid, basemoduleid, this.theorymodulesectionid, scoObj.Title, scoorder, scoObj.SCOID, scoObj.AssetId, scoObj.UserChoice);
                    this.scos.push(sco);
                }
            }
        }
        var wsObj = sectionObj.Worksheet;
        if (wsObj != undefined) {
            var ws = new Worksheet(courseid, basemoduleid, this.theorymodulesectionid, wsObj.Title, wsObj.WorksheetStatus, wsObj.Result, wsObj.NumberOfCorrectResponses, wsObj.isWorksheetCompleted, wsObj.isAllSectionsComplete, wsObj.WorksheetStatusId, wsObj.AllowToAttempt, wsObj.IsStudentPass, wsObj.DateCompleted,wsObj.ViewWorksheetResults);
            this.worksheet = ws;
        }
    } catch (e) {
        errorHandler("Section.setSCOs", e);
    }
},
getSectionLi: function(returnFunction) {
    try {
        
        var liStr = "";
        var id = "section-" + this.theorymodulesectionid;
        var classStatus = setSectionStatusClass(this.accessible, this.worksheet.status);
        var title = this.title;
        
        //var wviewWorksheetresults=JSON.stringify(this.worksheet.viewWorksheetresults);
        //alert(this.worksheet.viewWorksheetresults);
        if (this.accessible ) {
            //alert(wviewWorksheetresults);
            liStr = "<div id='" + id + "' data-role='collapsible' class='sections' data-theme='h' data-content-theme='h' data-iconpos='right'>";
            liStr += "<h3 class='divider clientheader'><div class='statuslock " + classStatus + "'></div>";
            liStr += "<div class='sectiontitlediv'><div class='sectiontitle";
            liStr += "'>" +title + "</div></div></h3>";
            liStr += "<div class='ulscodiv'><ul data-role='listview' class='ulscos' data-theme='h' data-inset='false'>";
            if (this.scos.length > 0) {
              liStr += this.getSCOsListView();
            }
              //alert(JSON.stringify(this.worksheet.status)+" "+ JSON.stringify(this.worksheet.status) +" "+ JSON.stringify(this.worksheet.viewWorksheetresults))
            if(this.worksheet.status=="Completed"  && this.worksheet.viewWorksheetresults==false){
              //alert("if"); 
            }
            else{
              //alert("else");
              liStr += this.getWorksheetListView();
            }
            liStr += "</div></ul></div>";
        }

        else {
            //alert(JSON.stringify(this.worksheet.status)+" "+ JSON.stringify(this.worksheet.status) +" "+ JSON.stringify(this.worksheet.viewWorksheetresults))
            if (this.inaccessiblefunction == "") {
              this.inaccessiblefunction = "prevSectionsIncomplete(event); false;";
            }
            liStr = "<div id='" + id + "' data-role='collapsible' data-theme='h' data-content-theme='h' class='sections sectionsincomplete prevSectionsIncomplete' data-iconpos='right'>";
            liStr += "<h3 class='divider clientheader'><div class='statuslock " + classStatus + "'></div>";
            liStr += "<div class='sectiontitlediv'><div class='sectiontitle";
            liStr += "'>" + title + "</div></div></h3>";
            liStr += "<div class='ulscodiv'><ul data-role='listview' class='ulscos' data-theme='h' data-inset='false'>";
            if (this.scos.length > 0) {
              liStr += this.getSCOsListView();
            }
            //liStr += this.getWorksheetListView();
            if(this.worksheet.status=="Completed" && this.worksheet.viewWorksheetresults==false){
              //alert("if"); 
            }
            else{
              //alert("else");
              liStr += this.getWorksheetListView();
            }
            liStr += "</div></ul></div>";
        }
        returnFunction(liStr);
    } catch (e) {
        errorHandler("Section.getSectionLi", e);
        return "";
    }
},
getSCOsListView: function() {
    try {
        var scoListViewStr = "";
        var scos = this.getScos();
        if (scos != undefined) {
            $.each(scos, function(i, sco) {
              scoListViewStr += sco.getSCOLi();
            });
        }
        return scoListViewStr;
    } catch (e) {
        errorHandler("Section.getSCOsListView", e);
        return "";
    }
},
getWorksheetListView: function() {
    try {
        var wsListViewStr = "";
        var ws = this.worksheet;
        //alert(JSON.stringify(this.worksheet));
        if (ws.ispass == "false") {
            return;
        }
        //alert(ws.viewWorksheetresults);
        var classStatus = setWorksheetStatusClass(ws.status);
        var id = "ws-" + ws.theorymodulesectionid;
        
        wsListViewStr += "<li id='li-" + id + "' class='scoli wssectionli' >";
        wsListViewStr += "<div class='scolidiv'><div class='statuslocksco " + classStatus + "'></div>";
        wsListViewStr += "<div class='scolititlediv'><a id='" + id + "' class='wsitem'>";
        wsListViewStr += "<div class='scolititle scosingleline'>" + resources.worksheet + "</div>";
        wsListViewStr+= "</a></div>";
        wsListViewStr += "<div class='navarrow nav'></div>";
        wsListViewStr += "</div></li>";
        return wsListViewStr;
        
    } catch (e) {
        errorHandler("Section.getWorksheetListView", e);
        return "";
    }
},
getWorksheetData: function(returnFunction) {
    try {
        if (this.worksheet.questions.length == 0) {
            var that = this;
            coController.coGetWorksheetData(this.theorymodulesectionid, function(ret) {
                                            if (ret == undefined || ret == -1) {
                                            msgTitle = resources.connError;
                                            msgBtnValue = resources.btnOk;
                                            msgStr = resources.connectionFail;
                                            navigator.notification.alert(msgStr, function() {
                                                                         hidePleaseWait();
                                                                         returnFunction(undefined);
                                                                         }, msgTitle, msgBtnValue);
                                            } else {
                                            if (ret == 0) {
                                            returnFunction(undefined);
                                            } else {
                                            var wsObj = ret;
                                            if (wsObj != undefined) {
                                            that.worksheet = new Worksheet(that.courseid, that.basemoduleid, that.theorymodulesectionid, wsObj.Title, wsObj.WorksheetStatus, wsObj.Result, wsObj.NumberOfCorrectResponses, wsObj.isWorksheetCompleted, wsObj.isAllSectionsComplete, wsObj.WorksheetStatusId, wsObj.AllowToAttempt, wsObj.IsStudentPass, wsObj.DateCompleted,wsObj.ViewWorksheetResults);
                                            if (that.worksheet != undefined) {
                                            var questionsObj = wsObj.WorksheetQuestions;
                                            if (questionsObj != undefined) {
                                            var questionObj;
                                            var question;
                                            for (var x = 0; x < questionsObj.length; x++) {
                                            questionObj = questionsObj[x];
                                            question = new WorksheetQuestion(questionObj.WorksheetId, questionObj.Question, questionObj.QuestionWithImage, questionObj.QuestionType, questionObj.CorrectAnswer, questionObj.UserAnswer, questionObj.IsUserAnswerCorrect, x + 1);
                                            if (question != undefined) {
                                            if (questionObj.Answers != undefined) {
                                            var answerObj;
                                            var answer;
                                            var answersObj = questionObj.Answers;
                                            if (answersObj != undefined) {
                                            for (var y = 0; y < answersObj.length; y++) {
                                            answerObj = answersObj[y];
                                            answer = new WorksheetAnswer(answerObj.WorksheetId, answerObj.Answer, answerObj.CorrectAnswer);
                                            question.answers.push(answer);
                                            }
                                            }
                                            }
                                            that.worksheet.questions.push(question);
                                            }
                                            }
                                            }
                                            }
                                            }
                                            }
                                            }
                                            returnFunction(that.worksheet);
                                            });
        }
        returnFunction(this.worksheet);
    } catch (e) {
        errorHandler("Section.getWorksheetData", e);
    }
},
getWorksheetView: function(justCompleted, returnFunction) {
    try {
        this.getWorksheetViewContent(justCompleted, function(ret) {
                                     returnFunction(ret);
                                     });
    } catch (e) {
        errorHandler("Section.getWorksheetView", e);
    }
},
getWorksheetViewContent: function(completedResult, returnFunction) {
    try {
        var worksheetObj;
        if (completedResult) {
            worksheetObj = this.worksheetresult;
        } else {
            worksheetObj = this.worksheet;
        }

        var wsStr = "<div class='datacontent'><div class='worksheetfullcontent'>";
        wsStr += "<div class='wsfulltitle'>" + resources.worksheetreview + "</div>";
        wsStr += "<div class='wsfullinfo'>" + this.title + "</div>";
        wsStr += "<div class='wsfulldate'>" + worksheetObj.datecomplete + "</div>";
        wsStr += "<div class='wsfullhead";
        var passStr = resources.worksheetpass + worksheetObj.result;
        var failStr = resources.worksheetfailure + worksheetObj.result;
        if (worksheetObj.status == worksheetStatus.Completed) {
            wsStr += " wspassedhead'>" + passStr;
        } else {
            wsStr += " wsfailedhead'>" + failStr;
        }
        wsStr += "</div>";
        wsStr += "<div class='wsfullqs'>";
        var questionlist = worksheetObj.questions;
        for (var i = 0; i < questionlist.length; i++) {
            var question = questionlist[i];
            var qno = i + 1;
            wsStr += "<div class='wsqdiv'><div class='wsrow'><div class='wsqno'><b>" + resources.question + qno + "</b></div>";
            wsStr += "<div class='wsq'>" + question.question + "</div></div>";
            wsStr += "<div class='wsrow'><div class='wsqno'>" + resources.questionoptions + "</div>";
            wsStr += "<div class='wsq wsqnormal'>";
            for (var x = 0; x < question.answers.length; x++) {
                var answer = question.answers[x];
                wsStr += answer.answer;
                if (x < question.answers.length - 1) {
                    wsStr += ", ";
                }
            }
            wsStr += "</div></div>";
            wsStr += "<div class='wsrow wsqnormal'><div class='wsqno'>" + resources.correctanswer + "</div>";
            wsStr += "<div class='wsq wsqnormal'>" + question.correctanswer + "</div></div>";
            wsStr += "<div class='wsrow'><div class='wsqno";
            if (question.isanswercorrect) {
                wsStr += " wsanswercorrect";
            } else {
                wsStr += " wsincorrect";
            }
            wsStr += "'>" + resources.youranswer + "</div>";
            wsStr += "<div class='wsq";
            if (question.isanswercorrect) {
                wsStr += " wsanswercorrect";
            } else {
                wsStr += " wsincorrect";
            }
            wsStr += "'>" + question.useranswer + "</div></div></div>";
        }
        wsStr += "</div>";
        if (worksheetObj.status == worksheetStatus.Completed) {
            wsStr += "<div data-role='controlgroup' data-type='horizontal' class='nextprevbtndiv wsnxtbuttondiv' data-theme='h'><a id='wsend-" + this.theorymodulesectionid + "' class='ui-btn ui-btn-h wsendbutton wsnxtbutton wsnxtcomplete ui-btn-icon-right' href='#' data-theme='h' data-icon='custom'>" + resources.nextsection + "</a></div></div></div>";
        } else {
            wsStr += "<div data-role='controlgroup' data-type='horizontal' class='nextprevbtndiv wsnxtbuttondiv' data-theme='f'><a id='wsend-" + this.theorymodulesectionid + "' class='ui-btn ui-btn-h wsendbutton wsnxtbutton ui-btn-icon-right' href='#'  data-theme='h' data-icon='custom'>" + resources.viewtheory + "</a></div></div></div><div class='padderdiv'></div>";
        }
        //alert(wsStr);
        returnFunction(wsStr);
    } catch (e) {
        errorHandler("Section.getWorksheetViewContent", e);
    }
},
getWorksheetResult: function(returnFunction) {
    try {
        this.worksheetresult = this.worksheet;
        this.worksheetresult.submitWorksheet(function(ret) {
                                             returnFunction(ret);
                                             });
    } catch (e) {
        errorHandler("Section.getWorksheetResult", e);
    }
}
};
var SCO = function(courseid, basemoduleid, theorymodulesectionid, title, sectionorder, scoid, assetid, status) {
    try {
        this.init(courseid, basemoduleid, theorymodulesectionid, title, sectionorder, scoid, assetid, status);
    } catch (e) {
        errorHandler("Section", e);
    }
};
SCO.prototype = {
init: function(courseid, basemoduleid, theorymodulesectionid, title, sectionorder, scoid, assetid, status) {
    try {
        if (courseid == undefined) {
            courseid = 0;
        }
        if (basemoduleid == undefined) {
            basemoduleid = 0;
        }
        if (theorymodulesectionid == undefined) {
            theorymodulesectionid = 0;
        }
        if (title == undefined) {
            title = "";
        }
        if (sectionorder == undefined) {
            sectionorder = 0;
        }
        if (assetid == undefined) {
            assetid = 0;
        }
        if (scoid == undefined) {
            scoid = "";
        }
        if (status == undefined || status == 0) {
            status = courseStatus.InProgress;
        }else {
            status = courseStatus.Completed;
        }
        this.courseid = courseid;
        this.basemoduleid = basemoduleid;
        this.theorymodulesectionid = theorymodulesectionid;
        this.sectionorder = sectionorder;
        this.title = title;
        this.assetid = assetid;
        this.scoid = scoid;
        this.status = status;
        this.asset = new TheoryAsset();
        return this;
    } catch (e) {
        errorHandler("SCO.init", e);
    }
},
getSCOLi: function() {
    try {
        var liStr = "";
        var classStatus = setSCOStatusClass(this.status);
        var id = "sco-" + this.theorymodulesectionid + "-" + this.assetid;
        var title = this.title;
        title = title.replace("&#160", "");
        //alert(title);
        var titleclass="";
        if(title.length < 45 && tablet===false && iphone5===true){
            titleclass=" scosingleline";
        }else if(title.length < 44 && tablet===false && iphone5==false){
            titleclass=" scosingleline";
        }else if(title.length < 50 && tablet===false && iphone5==false){
             titleclass=" scosinglelineNew";
        }
        liStr += "<li id='li-" + id + "' class='scoli'>";
        liStr += "<div class='scolidiv'><div class='statuslocksco " + classStatus + "'></div>";
        liStr += "<div class='scolititlediv'><a id='" + id + "' class='scoitem ui-alt-icon'>";
        liStr += "<div class='scolititle "  +  titleclass + "'>" + title + "</div>";
        liStr+= "</a>";
        liStr += "</div>";
        liStr += "<div class='navarrow nav'></div>";
        liStr += "</div></li>";
        
        return liStr;
    } catch (e) {
        errorHandler("SCO.getSCOLi", e);
        return "";
    }
},
getSCOContent: function(returnFunction) {
    try {
        if (scoContentOK === true) {
            scoContentOK = false;
            this.setTheoryViews(function(ret) {
                                scoContentOK = true;
                                returnFunction(ret);
                                });
        }
    } catch (e) {
        errorHandler("SCO.getSCOContent", e);
    }
},
assetHasPodCast: function() {
    try {
        if (this.asset.haspodcast == true && this.asset.podcasturl !== undefined && this.asset.podcasturl.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        errorHandler("SCO.assetHasPodCast", e);
    }
},
getSCOPodCast: function() {
    try {
        return this.asset.podcasturl;
    } catch (e) {
        errorHandler("SCO.getSCOPodCast", e);
    }
},
setTheoryViews: function(returnFunction) {
    try {
        if (this.asset != undefined && this.asset.assetid > 0 && this.asset.assetcontent.length > 0) {
            returnFunction(this.asset.assetcontent);
        }else{
            var isUnderstood = false;
            var that = this;
            coController.coGetTheoryAsset(this.theorymodulesectionid, this.assetid, this.sectionorder, isUnderstood, function(ret) {
                                          if (ret == undefined || ret == -1) {
                                          if (isDeviceOnline() === false) {
                                          returnFunction("offline");
                                          } else {
                                          returnFunction(ret);
                                          }
                                          } else {
                                          if (ret == 0) {
                                          if (isDeviceOnline() === false) {
                                          returnFunction("offline");
                                          } else {
                                          returnFunction(ret);
                                          }
                                          } else {
                                          var thViewObj = ret;
                                          if (thViewObj != undefined) {
                                          var assetItem = new TheoryAsset(that.courseid, that.basemoduleid, that.theorymodulesectionid, thViewObj.AssetId, thViewObj.HasPodcast, thViewObj.AudioUrl, thViewObj.VideoUrl, thViewObj.AssetContent, thViewObj.PodcastUrl);
                                          that.asset = assetItem;
                                          } else {
                                          returnFunction("");
                                          }
                                          that.asset.assetcontent = that.asset.assetcontent.replace("<video id='vidplayer1'", "<video id='vidplayer1' poster='css/client/images/videoposter.png' ");
                                          returnFunction(that.asset.assetcontent);
                                          }
                                          }
                                          });
        }
    } catch (e) {
        errorHandler("SCO.setTheoryViews", e);
    }
},
setSCOStatus: function(status) {
    try {
        this.status = status;
        var isUnderstood = status;
        coController.coUpdateSCOStatus(this.assetid, isUnderstood, function(ret) {
                                       if (ret == undefined) {} else {
                                       if (ret == 0) {} else {}
                                       }
                                       });
    } catch (e) {
        errorHandler("SCO.setSCOStatus", e);
    }
}
};
var Worksheet = function(courseid, basemoduleid, theorymodulesectionid, title, status, result, noofcorrectresponses, isworksheetcompleted, isallsectionscomplete, worksheetstatusid, allowtoattept, ispass, datecomplete,viewWorksheetresults) {
    try {
        this.init(courseid, basemoduleid, theorymodulesectionid, title, status, result, noofcorrectresponses, isworksheetcompleted, isallsectionscomplete, worksheetstatusid, allowtoattept, ispass, datecomplete,viewWorksheetresults);
    } catch (e) {
        errorHandler("Worksheet", e);
    }
};
Worksheet.prototype = {
init: function(courseid, basemoduleid, theorymodulesectionid, title, status, result, noofcorrectresponses, isworksheetcompleted, isallsectionscomplete, worksheetstatusid, allowtoattept, ispass, datecomplete,viewWorksheetresults) {
    try {
        if (courseid == undefined) {
            courseid = 0;
        }
        if (basemoduleid == undefined) {
            basemoduleid = 0;
        }
        if (theorymodulesectionid == undefined) {
            theorymodulesectionid = 0;
        }
        if (title == undefined) {
            title = "";
        }
        if (status == undefined) {
            status = worksheetStatus.InProgress;
        }
        if (result == undefined) {
            result = "";
        }
        if (noofcorrectresponses == undefined) {
            noofcorrectresponses = 0;
        }
        if (isworksheetcompleted == undefined) {
            isworksheetcompleted = false;
        }
        if (isallsectionscomplete == undefined) {
            isallsectionscomplete = false;
        }
        if (worksheetstatusid == undefined) {
            worksheetstatusid = 0;
        }
        if (allowtoattept == undefined) {
            allowtoattept = false;
        }
        if (ispass == undefined) {
            ispass = false;
        }
        if (datecomplete == undefined) {
            datecomplete = "";
        }
        this.courseid = courseid;
        this.basemoduleid = basemoduleid;
        this.theorymodulesectionid = theorymodulesectionid;
        this.title = title;
        if (status == 1) {
            status = worksheetStatus.Completed;
        }
        if (status == 0 && worksheetstatusid > 0) {
            status = worksheetStatus.InProgress;
        }
        if (status == 0 && worksheetstatusid == 0) {
            status = worksheetStatus.NotComplete;
        }
        this.status = status;
        this.result = result;
        this.noofcorrectresponses = noofcorrectresponses;
        this.isworksheetcompleted = isworksheetcompleted;
        this.isallsectionscomplete = isallsectionscomplete;
        this.worksheetstatusid = worksheetstatusid;
        this.allowtoattept = allowtoattept;
        this.ispass = ispass;
        this.datecomplete = datecomplete;
        this.questions = [];
        this.viewWorksheetresults=viewWorksheetresults;
        return this;
    } catch (e) {
        errorHandler("Worksheet.init", e);
    }
},
getFirstQuestion: function(returnFunction) {
    try {
        if (this.questions.length > 0) {
            qId = this.questions[0].worksheetid;
            //alert(qId);
            this.getWorksheetQuestionContent(qId, function(ret) {
                                             returnFunction(ret);
                                             });
        }
    } catch (e) {
        errorHandler("Worksheet.getFirstQuestion", e);
    }
},
getFirstQuestionUserAnswer: function(returnFunction) {
    try {
        if (this.questions.length > 0) {
            qId = this.questions[0].worksheetid;
            var answer = this.getWorksheetQuestionUserAnswer(qId);
            returnFunction(answer);
        }
    } catch (e) {
        errorHandler("Worksheet.getFirstQuestion", e);
    }
},
getNextQuestion: function(direction, qId, returnFunction) {
    try {
        //alert(direction+" "+qId);
        if (this.questions.length > 0) {
            if (direction == "next" && this.isLastQuestion(qId)) {
                returnFunction("result");
            } else {
                var q = this.getQuestion(qId, direction);
                if (q == undefined) {
                    this.getFirstQuestion(function(ret) {
                                          returnFunction(ret);
                                          });
                } else {
                    this.getWorksheetQuestionContent(q.worksheetid, function(ret) {
                                                     returnFunction(ret);
                                                     });
                }
            }
        }
    } catch (e) {
        errorHandler("Worksheet.getNextQuestion", e);
    }
},
getNextQuestionUserAnswer: function(direction, qId, returnFunction) {
    try {
        var q = this.getQuestion(qId, direction);
        if (q != undefined) {
            var answer = this.getWorksheetQuestionUserAnswer(q.worksheetid);
            returnFunction(answer);
        } else {
            returnFunction("");
        }
    } catch (e) {
        errorHandler("Worksheet.getNextQuestionUserAnswer", e);
    }
},
getQuestion: function(qId, prevNext) {
    try {
        var qm;
        if (this.questions.length > 0) {
            for (var i = 0; i < this.questions.length; i++) {
                qm = this.questions[i];
                if (qm.worksheetid == qId) {
                    var no = i;
                    if (prevNext == "next") {
                        no = (no + 1);
                    } else {
                        if (prevNext == "same") {
                            no = no;
                        } else {
                            no = no - 1;
                        }
                    }
                    qm = this.questions[no];
                    return qm;
                }
            }
        }
        return qm;
    } catch (e) {
        errorHandler("Worksheet.getQuestion", e);
    }
},
setQuestionAnswer: function(qNo, answer) {
    try {
        if (this.questions.length > 0) {
            qm = this.getQuestion(qNo, "same");
            if (qm != undefined) {
                if (answer != undefined && answer.length > 0) {
                    qm.useranswer = escapeHtml(answer);
                    if(answer.indexOf('&amp;')){
                        var parser = new DOMParser;
                        var dom = parser.parseFromString(
                            '<!doctype html><body>' + qm.useranswer,
                            'text/html');
                        qm.useranswer = dom.body.textContent;
                    }
                    if (qm.useranswer.toLowerCase() == qm.correctanswer.toLowerCase()) {
                        qm.isanswercorrect = true;
                        qm.useranswer = qm.correctanswer;
                    } else {
                        qm.isanswercorrect = false;
                    }
                }
            }
        }
    } catch (e) {
        errorHandler("Worksheet.setQuestionAnswer", e);
    }
},
isLastQuestion: function(qId) {
    try {
        var qm;
        if (this.questions.length > 0) {
            qm = this.questions[this.questions.length - 1];
            if (qm.worksheetid == qId) {
                return true;
            }
        }
        return false;
    } catch (e) {
        errorHandler("Worksheet.isLastQuestion", e);
    }
},
getWorksheetQuestionContent: function(qId, returnFunction) {
    try {
        var q = "";
        if (qId == 0) {
            q = "<div class='datacontent'><div class='worksheetcontent'><div class='datacontentdiv'>" + resources.noquestionsforworksheet + "</div></div></div>";
        } else {
            var question = this.getQuestion(qId, "same");
            if (question != undefined) {
                var qInputType = false;
                if (question.answers.length === 1) {
                    qInputType = true;
                }
                var qTitle = resources.worksheetquestion + " " + question.questionnumber + resources.of + this.questions.length;
                q = '<div class="datacontent"><div id="wsq-' + qId + '" class="worksheetcontent';
                if (qInputType === true) {
                    q += " qinputtype";
                }
                q += '"><div class="datacontentdiv"><div class="ui-field-contain">';
                q += '<div class="worksheettitle">' + qTitle + "</div>";
                q += '<div class="wslegend">' + question.question + "</div>";
                q += "<fieldset class='ui-btn-icon-left'><div id='wsquestions' data-role='controlgroup' data-theme='h'>";
                var answer = "";
                if (qInputType === true) {
                    answer = question.answers[0];
                    q += "<input type='text' class='qtextinput' name='wsqinput-0' data-clear-btn='true' placeholder='" + resources.questioninputplaceholder + "' id='wsqinput-0' value='";
                    if (question.useranswer == answer.answer) {
                        q += answer.answer + "'/>";
                    } else {
                        q += "'/>";
                    }
                } else {
                    for (var x = 0; x < question.answers.length; x++) {
                        answer = question.answers[x];
                        q += "<input type='radio' name='worksheet-choice' id='wsradio-choice-" + x + "' value='wschoice-" + x + "'";
                        if (question.useranswer == answer.answer) {
                            q += " checked='true'/>";
                        } else {
                            q += "/>";
                        }
                        q += '<label for="wsradio-choice-' + x + '"><div id="wsq-' + x + '" class="wsqinput">' + answer.answer + "</div></label>";
                    }
                }
                q += "</div></fieldset>";
                q += "</div></div></div>";
            }
        }
        returnFunction(q);
    } catch (e) {
        errorHandler("Worksheet.getWorksheetQuestionContent", e);
    }
},
getWorksheetQuestionUserAnswer: function(qId) {
    try {
        if (qId != 0) {
            var question = this.getQuestion(qId, "same");
            if (question != undefined) {
                return question.useranswer;
            }
        }
        return "";
    } catch (e) {
        errorHandler("Worksheet.getWorksheetQuestionUserAnswer", e);
    }
},
submitWorksheet: function(returnFunction) {
    try {
        var totalQuestions = this.questions.length;
        var correctAnswers = 0;
        console.log(this.questions);
        for (var i = 0; i < this.questions.length; i++) {
            var q = this.questions[i];
            if (q.isanswercorrect) {
                correctAnswers += 1;
            }
        }
        this.noofcorrectresponses = correctAnswers;
        this.result = correctAnswers + "/" + totalQuestions;
        var returnResult = "";
        if ((correctAnswers / totalQuestions * 100) >= 80) {
            this.ispass = true;
            this.status = worksheetStatus.Completed;
            returnResult = resources.worksheetpass + this.result;
        } else {
            this.ispass = false;
            this.status = worksheetStatus.InProgress;
            returnResult = resources.worksheetfailure + this.result;
        }
        var that = this;
        var returnWorksheet = new Worksheet();
        returnWorksheet = that;
        for (i = 0; i < returnWorksheet.questions.length; i++) {
            var question = returnWorksheet.questions[i];
            question.question = "";
            question.answers = [];
        }
        coController.coSaveWorksheetData(returnWorksheet, function(ret) {
                                         if (ret == undefined || ret == -1) {
                                         msgTitle = resources.connError;
                                         msgBtnValue = resources.btnOk;
                                         msgStr = resources.connectionFail;
                                         navigator.notification.alert(msgStr, function() {
                                                                      hidePleaseWait();
                                                                      returnFunction(returnResult);
                                                                      }, msgTitle, msgBtnValue);
                                         } else {
                                         if (ret == 0) {
                                         returnFunction(returnResult);
                                         } else {
                                         that.result = ret.Result;
                                         that.noofcorrectresponses = ret.NumberOfCorrectResponses;
                                         that.isworksheetcompleted = ret.isWorksheetCompleted;
                                         that.isallsectionscomplete = ret.isAllSectionsComplete;
                                         that.worksheetstatusid = ret.WorksheetStatusId;
                                         that.allowtoattept = ret.AllowToAttempt;
                                         that.ispass = ret.IsStudentPass;
                                         that.datecomplete = ret.DateCompleted;
                                         var qsList = ret.WorksheetQuestions;
                                         if (qsList != undefined && qsList.length > 0) {
                                         that.loadWorksheetData(qsList, function(ret) {
                                                                that = ret;
                                                                });
                                         }
                                         returnFunction(returnResult);
                                         }
                                         }
                                         });
    } catch (e) {
        errorHandler("Worksheet.submitWorksheet", e);
    }
},
loadWorksheetData: function(qsList, returnFunction) {
    try {
        if (qsList != undefined) {
            var questionObj;
            var question;
            this.questions = [];
            for (var x = 0; x < qsList.length; x++) {
                questionObj = qsList[x];
                question = new WorksheetQuestion(questionObj.WorksheetId, questionObj.Question, questionObj.QuestionWithImage, questionObj.QuestionType, questionObj.CorrectAnswer, questionObj.UserAnswer, questionObj.IsUserAnswerCorrect, x + 1);
                if (question != undefined) {
                    if (questionObj.Answers != undefined) {
                        var answerObj;
                        var answer;
                        var answersObj = questionObj.Answers;
                        if (answersObj != undefined) {
                            for (var y = 0; y < answersObj.length; y++) {
                                answerObj = answersObj[y];
                                answer = new WorksheetAnswer(answerObj.WorksheetId, answerObj.Answer, answerObj.CorrectAnswer);
                                question.answers.push(answer);
                            }
                        }
                    }
                    //alert(question);
                    console.log(question);
                    this.questions.push(question);
                }
            }
            returnFunction(this);
        }
    } catch (e) {
        errorHandler("Worksheet.loadWorksheetData", e);
    }
}
};
var WorksheetQuestion = function(worksheetid, question, questionwithimage, questiontype, correctanswer, useranswer, isanswercorrect, questionnumber) {
    try {
        this.init(worksheetid, question, questionwithimage, questiontype, correctanswer, useranswer, isanswercorrect, questionnumber);
    } catch (e) {
        errorHandler("WorksheetQuestion", e);
    }
};
WorksheetQuestion.prototype = {
init: function(worksheetid, question, questionwithimage, questiontype, correctanswer, useranswer, isanswercorrect, questionnumber) {
    try {
        if (worksheetid == undefined) {
            worksheetid = 0;
        }
        if (question == undefined) {
            question = "";
        }
        while (question.indexOf("&amp;quot;") > 0) {
            question = question.replace("&amp;quot;", '"');
        }
        if (questionwithimage == undefined) {
            questionwithimage = "";
        }
        if (questiontype == undefined) {
            questiontype = 0;
        }
        if (correctanswer == undefined) {
            correctanswer = "";
        }
        if (useranswer == undefined) {
            useranswer = "";
        }
        if (isanswercorrect == undefined) {
            isanswercorrect = false;
        }
        if (questionnumber == undefined) {
            questionnumber = 0;
        }
        this.worksheetid = worksheetid;
        this.question = question;
        this.questionwithimage = questionwithimage;
        this.questiontype = questiontype;
        this.correctanswer = correctanswer;
        this.useranswer = useranswer;
        this.isanswercorrect = isanswercorrect;
        this.questionnumber = questionnumber;
        this.answers = [];
        return this;
    } catch (e) {
        errorHandler("WorksheetQuestion.init", e);
    }
}
};
var WorksheetAnswer = function(worksheetid, answer, correctanswer) {
    try {
        this.init(worksheetid, answer, correctanswer);
    } catch (e) {
        errorHandler("WorksheetAnswer", e);
    }
};
WorksheetAnswer.prototype = {
init: function(worksheetid, answer, correctanswer) {
    try {
        if (worksheetid == undefined) {
            worksheetid = 0;
        }
        if (answer == undefined) {
            answer = "";
        }
        if (correctanswer == undefined) {
            correctanswer = false;
        }
        this.worksheetid = worksheetid;
        this.answer = answer;
        this.correctanswer = correctanswer;
        return this;
    } catch (e) {
        errorHandler("WorksheetAnswer.init", e);
    }
}
};
var TheoryAsset = function(courseid, basemoduleid, theorymodulesectionid, assetid, haspodcast, audiourl, videourl, assetcontent, podcasturl) {
    try {
        this.init(courseid, basemoduleid, theorymodulesectionid, assetid, haspodcast, audiourl, videourl, assetcontent, podcasturl);
    } catch (e) {
        errorHandler("TheoryAsset", e);
    }
};
TheoryAsset.prototype = {
init: function(courseid, basemoduleid, theorymodulesectionid, assetid, haspodcast, audiourl, videourl, assetcontent, podcasturl) {
    try {
        if (courseid == undefined) {
            courseid = 0;
        }
        if (basemoduleid == undefined) {
            basemoduleid = 0;
        }
        if (theorymodulesectionid == undefined) {
            theorymodulesectionid = 0;
        }
        if (audiourl == undefined) {
            audiourl = "";
        }
        if (videourl == undefined) {
            videourl = "";
        }
        if (assetid == undefined) {
            assetid = 0;
        }
        if (haspodcast == undefined) {
            haspodcast = false;
        } else {
            if (haspodcast == "True") {
                haspodcast = true;
            } else {
                haspodcast = false;
            }
        }
        if (assetcontent == undefined) {
            assetcontent = "";
        }
        if (podcasturl == undefined) {
            podcasturl = "";
        }
        this.courseid = courseid;
        this.basemoduleid = basemoduleid;
        this.theorymodulesectionid = theorymodulesectionid;
        this.audiourl = audiourl;
        this.assetid = assetid;
        this.haspodcast = haspodcast;
        this.videourl = videourl;
        this.assetcontent = assetcontent;
        this.podcasturl = podcasturl;
        return this;
    } catch (e) {
        errorHandler("TheoryAsset.init", e);
    }
},
getTheoryAssetData: function() {
    try {
        return this.assetcontent;
    } catch (e) {
        errorHandler("TheoryAsset.getTheoryAssetData", e);
    }
}
};
var AssessmentSchedule = function(courseid, basemoduleid, assessmentscheduleid, assessmentitemid, duration, venueroomid, scheduleddate, starttime, endtime, venuename, venuetelno, directions, street1, street2, city, region, postcode, totalbookings, roomname, actualcapacity, assessmentbookingid, scheduleddatestring, highlightdates, venueid, latitude, longitude, restrictbooking, zoomjoinURL, showattendbutton, zoommeetingpassword) {
    try {
        this.init(courseid, basemoduleid, assessmentscheduleid, assessmentitemid, duration, venueroomid, scheduleddate, starttime, endtime, venuename, venuetelno, directions, street1, street2, city, region, postcode, totalbookings, roomname, actualcapacity, assessmentbookingid, scheduleddatestring, highlightdates, venueid, latitude, longitude, restrictbooking, zoomjoinURL, showattendbutton, zoommeetingpassword);
    } catch (e) {
        errorHandler("AssessmentSchedule", e);
    }
};
AssessmentSchedule.prototype = {
init: function(courseid, basemoduleid, assessmentscheduleid, assessmentitemid, duration, venueroomid, scheduleddate, starttime, endtime, venuename, venuetelno, directions, street1, street2, city, region, postcode, totalbookings, roomname, actualcapacity, assessmentbookingid, scheduleddatestring, highlightdates, venueid, latitude, longitude, restrictbooking, zoomjoinURL, showattendbutton, zoommeetingpassword) {
    try {
        this.booking = new BookingItem();
        if (courseid == undefined) {
            courseid = 0;
        }
        if (basemoduleid == undefined) {
            basemoduleid = 0;
        }
        if (assessmentscheduleid == undefined) {
            assessmentscheduleid = 0;
        }
        if (assessmentitemid == undefined) {
            assessmentitemid = 0;
        }
        if (duration == undefined) {
            duration = 0;
        }
        if (venueroomid == undefined) {
            venueroomid = 0;
        }
        if (scheduleddate == undefined) {
            scheduleddate = "";
        }
        if (starttime == undefined) {
            starttime = "";
        }
        if (endtime == undefined) {
            endtime = "";
        }
        if (venuename == undefined) {
            venuename = "";
        }
        if (venuetelno == undefined) {
            venuetelno = "";
        }
        if (directions == undefined) {
            directions = "";
        } else {
            if (directions.indexOf("https://maps.google") > -1) {
                directions = directions.substring(0, directions.indexOf("https://maps.google"));
            }
            if (tablet === false) {
                directions = "";
            }
        }
        if (street1 == undefined) {
            street1 = "";
        }
        if (street2 == undefined) {
            street2 = "";
        }
        if (city == undefined) {
            city = "";
        }
        if (region == undefined) {
            region = "";
        }
        if (postcode == undefined) {
            postcode = "";
        }
        if (totalbookings == undefined) {
            totalbookings = 0;
        }
        if (roomname == undefined) {
            roomname = "";
        }
        if (actualcapacity == undefined) {
            actualcapacity = 0;
        }
        if (assessmentbookingid == undefined) {
            assessmentbookingid = 0;
        }
        if (scheduleddatestring == undefined) {
            scheduleddatestring = "";
        }
        if (highlightdates == undefined) {
            highlightdates = new Array();
        }
        if (venueid == undefined) {
            venueid = 0;
        }
        if (latitude == undefined) {
            latitude = 0;
        }
        if (longitude == undefined) {
            longitude = 0;
        }
        if (restrictbooking == undefined) {
            restrictbooking = false;
        }
        if (zoomjoinURL == undefined || zoomjoinURL == null) {
            zoomjoinURL = "";
        }

        if (zoommeetingpassword == undefined || zoommeetingpassword == null) {
            zoommeetingpassword = "";
        }
        this.courseid = courseid;
        this.basemoduleid = basemoduleid;
        this.assessmentscheduleid = assessmentscheduleid;
        this.assessmentitemid = assessmentitemid;
        this.duration = duration;
        this.venueroomid = venueroomid;
        this.scheduleddate = scheduleddate;
        this.starttime = starttime;
        this.endtime = endtime;
        this.venuename = venuename;
        this.venuetelno = venuetelno;
        this.directions = directions;
        this.street1 = street1;
        this.street2 = street2;
        this.city = city;
        this.region = region;
        this.postcode = postcode;
        this.totalbookings = totalbookings;
        this.roomname = roomname;
        this.actualcapacity = actualcapacity;
        this.assessmentbookingid = assessmentbookingid;
        this.scheduleddatestring = scheduleddatestring;
        this.highlightdates = highlightdates;
        this.venueid = venueid;
        this.latitude = latitude;
        this.longitude = longitude;
        var address = "";
        if (this.street1.length > 0) {
            address += this.street1;
        }
        if (this.street2.length > 0) {
            address += (address.length > 0) ? ", " + this.street2 : this.street2;
        }
        if (this.city.length > 0) {
            address += (address.length > 0) ? ", " + this.city : this.city;
        }
        if (this.postcode.length > 0) {
            address += (address.length > 0) ? ", " + this.postcode : this.postcode;
        }
        this.address = address;
        this.restrictbooking = restrictbooking;
        this.zoomjoinURL = zoomjoinURL;
        this.showattendbutton = showattendbutton;
        this.zoommeetingpassword = zoommeetingpassword;
        return this;
    } catch (e) {
        errorHandler("AssessmentSchedule.init", e);
    }
},
getScheduleDetails: function() {
    try {
        var detailsStr = "<div class='bookdetailheader'>" + this.venuename + "</div>";
        detailsStr += "<div class='scheduledetailmain'>";
        detailsStr += "<div class='scheduledetailrow'><div class='scheduledetailline'>" + resources.starttime + "</div><div class='scheduledetailitem' >" + this.starttime + "</div></div>";
        if (this.roomname.length > 0) {
            detailsStr += "<div class='scheduledetailrow'></div><div class='scheduledetailline'>" + resources.roomname + "</div><div class='scheduledetailitem' >" + this.roomname + "</div>";
        }
        detailsStr += "<div class='scheduledetailrow'><div class='scheduledetailline'>" + resources.address + "</div>";
        detailsStr += "<div class='scheduledetailitem' >" + this.street1;
        if (this.street2.length > 0) {
            detailsStr += "<br/>" + this.street2;
        }
        if (this.city.length > 0) {
            detailsStr += "<br/>" + this.city;
        }
        if (this.region.length > 0) {
            detailsStr += "<br/>" + this.region;
        }
        if (this.postcode.length > 0) {
            detailsStr += "<br/>" + this.postcode;
        }
        detailsStr += "</div></div>";
        if (this.venuetelno.length > 0) {
            detailsStr += "<div class='scheduledetailrow'><div class='scheduledetailline'>" + resources.telephone + "</div><div class='scheduledetailitem' >" + this.venuetelno + "</div></div>";
        }
        if (this.directions.length > 0) {
            var directions = "";
            if (this.directions.indexOf("http://") > -1) {
                directions = "<a href='#' onclick='openWebView(\"" + this.directions.substring(this.directions.indexOf("http://")) + "\"); false;'>Venue Map</a>";
            } else {
                directions = this.directions;
                detailsStr += "<div class='scheduledetailrow'><div class='scheduledetailline'>" + resources.directions + "</div><div class='scheduledetailitem' >" + directions + "</div></div>";
            }
        }
        detailsStr += "</div>";
        return detailsStr;
    } catch (e) {
        errorHandler("AssessmentSchedule.getScheduleDetails", e);
    }
}
};
var BookingItem = function(assessmentitemid, assessmentscheduleid, assessmentbookingid, otaguid, emailnotificationstatus, bookingdate, bookingdatestring, allowcancel, resultpending) {
    try {
        this.init(assessmentitemid, assessmentscheduleid, assessmentbookingid, otaguid, emailnotificationstatus, bookingdate, bookingdatestring, allowcancel, resultpending);
    } catch (e) {
        errorHandler("BookingItem", e);
    }
};
BookingItem.prototype = {
init: function(assessmentitemid, assessmentscheduleid, assessmentbookingid, otaguid, emailnotificationstatus, bookingdate, bookingdatestring, allowcancel, resultpending) {
    try {
        if (assessmentitemid == undefined) {
            assessmentitemid = 0;
        }
        if (assessmentscheduleid == undefined) {
            assessmentscheduleid = 0;
        }
        if (assessmentbookingid == undefined) {
            assessmentbookingid = 0;
        }
        if (otaguid == undefined) {
            otaguid = "";
        }
        if (emailnotificationstatus == undefined) {
            emailnotificationstatus = 0;
        }
        if (bookingdate == undefined) {
            bookingdate = "";
        }
        if (bookingdatestring == undefined) {
            bookingdatestring = "";
        }
        if (allowcancel == undefined) {
            allowcancel = false;
        }
        if (resultpending == undefined) {
            resultpending = false;
        }
        this.assessmentitemid = assessmentitemid;
        this.assessmentscheduleid = assessmentscheduleid;
        this.assessmentbookingid = assessmentbookingid;
        this.otaguid = otaguid;
        this.emailnotificationstatus = emailnotificationstatus;
        this.bookingdate = bookingdate;
        this.bookingdatestring = bookingdatestring;
        this.allowcancel = allowcancel;
        this.resultpending = resultpending;
        return this;
    } catch (e) {
        errorHandler("BookingItem.init", e);
    }
}
};
var FileObject = function(filename, filesize, filetype, filedata) {
    try {
        this.init(filename, filesize, filetype, filedata);
    } catch (e) {
        errorHandler("FileObject", e);
    }
};
FileObject.prototype = {
init: function(filename, filesize, filetype, filedata) {
    try {
        if (filename == undefined) {
            filename = "";
        }
        if (filesize == undefined) {
            filesize = 0;
        }
        if (filetype == undefined) {
            filetype = 0;
        }
        if (filedata == undefined) {
            filedata = "";
        }
        this.filename = filename;
        this.filesize = filesize;
        this.filetype = filetype;
        this.filedata = filedata;
        return this;
    } catch (e) {
        errorHandler("FileObject.init", e);
    }
}
};
function setSCOStatusClass(status){
    var classStatus = "";
    if (status == courseStatus.Completed) {
        classStatus += "statusu statussco";
    } else {
        classStatus += "statusnu statussco";
        
    }
    return classStatus;
}
function setStatusClass(status, divider) {
    var classStatus = "status3 statuscp";
    if (status == courseStatus.InProgress) {
        classStatus = "status1 statusip";
    } else {
        if (status == courseStatus.NotStarted) {
            classStatus = "status2 statusns";
        } else {
            if (status == courseStatus.Completed) {
                classStatus = "status3 statuscp";
            } else {
                if (status == courseStatus.Payment || status == courseStatus.PaymentPending || status==courseStatus.Suspended) {
                    classStatus = "status4 statusns";
                }
            }
        }
    }
    if (divider) {
        classStatus += " statusclass classdivider";
    } else {
        classStatus += " statusclass";
    }
    return classStatus;
}
function setModuleStatusClass(status, accessible, divider) {
    //alert(status);
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
        if (status == courseStatus.Exempt && accessible===false) {
            classStatus = "status2 statusns";
        }else{
            if (status == courseStatus.Completed) {
                classStatus = "status1 statuscp";
            } else {
                if (status == courseStatus.Payment || status == courseStatus.PaymentPending || status == "No Record") {
                    classStatus = "status4 statusns";
                }
            }
        }
    }
    if (divider) {
        classStatus += " statusclass classdivider";
    } else {
        classStatus += " statusclass";
    }
    return classStatus;
}
function setSectionStatusClass(accessible, status) {
    var classStatus = "";
    if (status == worksheetStatus.Completed) {
        classStatus += "status3 statuscp";
    } else {
        if (accessible == false) {
            classStatus += "status2 statusns";
        } else {
            classStatus += "status1 statusip";
        }
    }
    
    classStatus += " statusclass";
    return classStatus;
}

function setWorksheetStatusClass(status) {
    var classStatus = "";
    if (status == worksheetStatus.Completed) {
        classStatus += "statusclassws";
    } else {
        if (status == worksheetStatus.InProgress) {
            classStatus += "statusclasswsip";
        } else {
            classStatus += "statusclasswsnc";
        }
    }
    classStatus += " statussco";
    return classStatus;
}

function setCourseAccessibility(course) {
    try {
        course.display = true;
        course.inaccessiblefunction = "";
        if (course.status == courseStatus.Payment || course.status == courseStatus.PaymentPending) {
            course.accessible = false;
            course.inaccessiblefunction = "coursePaymentRequired();";
        } else {
            if (course.status == courseStatus.Exempt || course.status == courseStatus.PendingExemption || course.status == courseStatus.NotStarted) {
                course.display = false;
                course.accessible = false;
            } else {
                course.accessible = true;
            }
        }
    } catch (e) {
        errorHandler("setCourseAccessibility", e);
    }
    return course;
}

function setModuleAccessibility(status, module) {
    try {
        var modType = getModuleType(module.basemoduletypeid);
        module.inaccessiblefunction = "";
        module.display = true;
        module.accessible = true;
        if (module.status == courseStatus.Exempt) {
            module.accessible == false;
            module.display = true;
            module.inaccessiblefunction = "showmoduleexempt";
        } else {
            if (module.basemoduletypeid == 6) {
                if (status == courseStatus.Completed || status == courseStatus.InProgress || status == courseStatus.NotStarted) {
                    module.accessible = true;
                }
                module.display = true;
            } else {
                if (modType == "Book") {
                    if (status == courseStatus.Completed || status == courseStatus.InProgress) {
                        module.accessible = true;
                    } else {
                        module.accessible = false;
                        module.inaccessiblefunction = "showmodulebook";
                    }
                    module.display = true;
                } else {
                    if (module.basemoduletypeid == 13) {
                        module.accessible = false;
                        module.inaccessiblefunction = "showmodulegetguidelines";
                        module.display = true;
                    } else {
                        if (module.basemoduletypeid == 4 || module.basemoduletypeid == 5 || module.basemoduletypeid == 8 || module.basemoduletypeid == 9 || module.basemoduletypeid == 10 || module.basemoduletypeid == 11 || module.basemoduletypeid == 12 || module.basemoduletypeid == 14) {
                            module.accessible = false;
                            module.inaccessiblefunction = "";
                            module.display = true;
                        } else {
                            if (status == courseStatus.Completed) {
                                if (module.basemoduletypeid == 2) {
                                    module.accessible = true;
                                    module.display = true;
                                } else {
                                    module.accessible = false;
                                    module.display = false;
                                }
                            } else {
                                if (status == courseStatus.InProgress) {
                                    if (module.status == courseStatus.Payment || module.status == courseStatus.PaymentPending) {
                                        module.accessible = false;
                                        module.inaccessiblefunction = "modulepaymentrequired";
                                    }
                                } else {
                                    module.accessible = false;
                                    module.display = false;
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (e) {
        errorHandler("setModuleAccessibility", e);
    }
    return module;
}

function formatDescription(content) {
    try {
        var returnDescription = "";
        if (content != undefined) {
            returnDescription = '<div class="datacontent">' + content + "</div>";
        }
        return returnDescription;
    } catch (e) {
        errorHandler("formatDescription", e);
    }
}

function formatHeading(str) {
    try {
        var rtnStr = "";
        if (str != undefined) {
            rtnStr = str.replace("'", "");
            rtnStr = rtnStr.replace('"', '"');
        }
        return rtnStr;
    } catch (e) {
        errorHandler("formatHeading", e);
        return "";
    }
}

function logJsonObject(obj) {}

function getModuleTypeDescription(basemoduletypeid) {
    try {
        var type;
        if (basemoduletypeid == 1) {
            type = "Lesson";
        } else {
            if (basemoduletypeid == 2) {
                type = "Theory Assessment Module";
            } else {
                if (basemoduletypeid == 3) {
                    type = "Practicum Module";
                } else {
                    if (basemoduletypeid == 4) {
                        type = "Training Day Module";
                    } else {
                        if (basemoduletypeid == 5) {
                            type = "Workplace Assessment Module";
                        } else {
                            if (basemoduletypeid == 6) {
                                type = "Certification Module";
                            } else {
                                if (basemoduletypeid == 8) {
                                    type = "Theory Assessment Module";
                                } else {
                                    if (basemoduletypeid == 9) {
                                        type = "Practical Assessment Module";
                                    } else {
                                        if (basemoduletypeid == 10) {
                                            type = "Portfolio Assessment Module";
                                        } else {
                                            if (basemoduletypeid == 11) {
                                                type = "Case Study Assessment Module";
                                            } else {
                                                if (basemoduletypeid == 12) {
                                                    type = "Video Assessment Module";
                                                } else {
                                                    if (basemoduletypeid == 13) {
                                                        type = "Portfolio Guidance Module";
                                                    } else {
                                                        if (basemoduletypeid == 14) {
                                                            type = "Online Theory";
                                                        } else {
                                                            if (basemoduletypeid == 15) {
                                                                type = "Log Book Module";
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
function getModuleGroupTitle(grouping) {
    var returnTitle = "";
    try {
        
        if (grouping != undefined) {
            switch (grouping) {
                case 1:
                    returnTitle = resources.theorymodules;
                    break;
                case 2:
                    returnTitle = resources.portfoliomodules;
                    break;
                case 3:
                    returnTitle = resources.assessmentmodules;
                    break;
                case 4:
                    returnTitle = resources.certificatemodules;
                    break;
                    
                default:
                    break;
            }
        }
        
    } catch (e) {
        errorHandler("getModuleGroupTitle", e);
    }
    return returnTitle;
}
