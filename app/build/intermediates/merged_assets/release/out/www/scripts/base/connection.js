var authObj;
var coursesObj;
var xmlFile;
var key;
var assetno = 0;
var aesMode = "ECB";
var aesKey;
var authKey;
var portalKey;
var serviceKey;
uploadfiledata="";
helpdeskuploadfilename="";
helpuploadfiletype= "";
helpdekuploadfileSize= "";
var authParamsObj = {
username: "",
password: "",
deviceid:"",
firstlogin:"",
isandroid:""
};
var keyParamsObj = {
studentid: "",
portalid: "",
appversion: ""
};
var otherParamsObj = {
basemoduleid: 0,
sectionid: 0,
assetid: 0,
status: "",
courseid: 0,
projectid: 0,
issueid: 0,
issuetitle: "",
issuecategoryid: 0,
comment: "",
fileid: 0,
filename: "",
filesize: 0,
filetype: "",
coursestatusid: 0,
coursestatus: "",
modulestatus: "",
portalname: "",
scheduleid: 0,
assessmentitemid: 0,
bookingid: 0,
emailaddressfrom: "",
emailaddressto: "",
emailmessage: "",
nodekey: "",
libraryid: 0,
OtaType: ""
};
var debug = false;
mayaval="";

autologoutstring="";
function getLoginData(getLocal, returnFunction) {
    try {
        if (debug == true) {
            getLocal = true;
        }
        setupLocalData(function(ret) {});
        if (getLocal) {
            getLocalData("UserAuthenticate", "", function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         authObj = JSON.parse(returnStr);
                         if (authObj != undefined && authObj.PortalUserAuthenticateResult.IsAuthenticated == true) {
                         var userObj = authObj.PortalUserAuthenticateResult;
                         returnFunction(userObj.Data);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_LOGIN");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey);
           urlMethod += params;
			     var logindata="";
            $.ajax({
				      beforeSend: function() { 	 $("#popupcontainer").append(mloadingGif); }, 
					    complete: function() {	 $("#mloader").remove();  },
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
					         logindata=data;
					    if(data.PortalUserAuthenticateResult.Success == false && activeUser.requireslogin == true)
					    {
						    returnFunction(-1); 
					    }
					   else
					   {
					   
			authObj = data;
      
			if(authObj==undefined || authObj == null || authObj.PortalUserAuthenticateResult.Success == false){
        
				msgStr = resources.noNetworkLimited;
        msgTitle = resources.connError;
        msgBtnValue = resources.btnOk;
        navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue); //uncomment this
					   getLocalData("UserAuthenticate", "", function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         authObj = JSON.parse(returnStr);
                         if (authObj != undefined && authObj.PortalUserAuthenticateResult.IsAuthenticated == true) {
                         var userObj = authObj.PortalUserAuthenticateResult;
                         returnFunction(userObj.Data);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
				
			}
			else
			{
				
				 saveLocalDataStore("UserAuthenticate", "", JSON.stringify(authObj), function(ret) {});
                   if (authObj != undefined && authObj.PortalUserAuthenticateResult.IsAuthenticated == true) {
					   if(authObj.PortalUserAuthenticateResult.IsMultiSession == true)
					   {
						   var userObj = authObj.PortalUserAuthenticateResult;
						   mayaval= userObj.Data;
						   returnFunction(-3);
					   }
					   else
					   {
						if(authObj.PortalUserAuthenticateResult.IsUserLogoutByOtherDevice == true)  
						{
							if (activeUser.requireslogin != true)
							{
								autologoutstring=1;
							  logoutUser();
							
							}
							else
														 {	

urlMethod = getBaseUrl();
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
				   
                   
                   });
							 
						   
                    }
							
							
						}						   
						 else
						 {							 
						   
                   var userObj = authObj.PortalUserAuthenticateResult;
                   if (authObj.PortalUserAuthenticateResult.UserPosition !== null) {
                   console.log("2");
                   updateUserPosition(authObj.PortalUserAuthenticateResult.UserPosition, function(retVal) {});
                   }
						mtermsagreed=userObj.Data.hasTermsConditionsAgreed;
						
					   returnFunction(userObj.Data); }
					   }
                   } else {
                   returnFunction(0);
                   }
                 
				
			}
				   
					   
				   }
					   
					    },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
            
            setTimeout(function(){
                //alert("data:"+JSON.stringify(logindata));
                if(typeof JSON.stringify(logindata)== "undefined" || logindata==""){
                  //alert("if");
                    getLoginData(true, function(ret) {
                        returnFunction(ret);
                    });
                }
                else{
                  //alert("else");
                  //do nothing
                }
            }, 3000);
        }
    } catch (e) {}
}


function getFirstLoginData(getLocal, returnFunction) {
    try {
        if (debug == true) {
            getLocal = true;
        }
        
        setupLocalData(function(ret) {});
        if (getLocal) {
            getLocalData("UserAuthenticate", "", function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         authObj = JSON.parse(returnStr);
                         if (authObj != undefined && authObj.PortalUserAuthenticateResult.IsAuthenticated == true) {
                         var userObj = authObj.PortalUserAuthenticateResult;
                         returnFunction(userObj.Data);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_LOGIN");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey);
            urlMethod += params;
            var logindata="";
           //console.log(urlMethod);
            $.ajax({
                   beforeSend: function() {   $("#popupcontainer").append(mloadingGif); }, 
                   complete: function() {  $("#mloader").remove();  },
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   logindata=data;
                   //alert(logindata);
                   //if(data.PortalUserAuthenticateResult.Success != false && activeUser.requireslogin == true) use before go live
                   //for testing
             if(data.PortalUserAuthenticateResult.Success== false && activeUser.requireslogin == true)
             {
              returnFunction(-1); 
             }
             else
             {
             
      authObj = data;
      
      if(authObj==undefined || authObj == null || authObj.PortalUserAuthenticateResult.Success == false){

        msgStr = resources.noNetworkLimited;
        msgTitle = resources.connError;
        msgBtnValue = resources.btnOk;
        navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
             getLocalData("UserAuthenticate", "", function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         authObj = JSON.parse(returnStr);
                         if (authObj != undefined && authObj.PortalUserAuthenticateResult.IsAuthenticated == true) {
                         var userObj = authObj.PortalUserAuthenticateResult;
                         returnFunction(userObj.Data);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        
      }
      else
      {
        var uids=JSON.stringify(data.PortalUserAuthenticateResult.Data.UserId)
        var urlMethod1 = getBaseUrl();

            urlMethod1 += configs.getCustom("CS_SITE_URL_COURSES");
            var authKey1 = getAuthKeyUnencrypt();
            var portalKey1 = getPortalKeyUnencrypt();
            var params1 = "?auth=" + JSON.stringify(authKey1) + '&key={"studentid":'+uids+',"portalid":40,"appversion":"9.13"}';
            urlMethod1 += params1;
            $.ajax({
                   url: urlMethod1,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   var coursesResponseObj = data;
                   if (coursesResponseObj != undefined && coursesResponseObj.CoursesGetForUserResult != undefined) {
                   saveLocalDataStore("UserCourses", "", JSON.stringify(coursesResponseObj), function(ret) {});
                   } else {
                   //returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   //returnFunction(-1);
                   }
            });

         saveLocalDataStore("UserAuthenticate", "", JSON.stringify(authObj), function(ret) {});
                   if (authObj != undefined && authObj.PortalUserAuthenticateResult.IsAuthenticated == true) {
             if(authObj.PortalUserAuthenticateResult.IsMultiSession == true)
             {
               var userObj = authObj.PortalUserAuthenticateResult;
               mayaval= userObj.Data;
               returnFunction(-3);
             }
             else
             {
            if(authObj.PortalUserAuthenticateResult.IsUserLogoutByOtherDevice == true)  
            {
              if (activeUser.requireslogin != true)
              {
                autologoutstring=1;
              logoutUser();
              
              }
              else
                             {  

urlMethod = getBaseUrl();
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
           
                   
                   });
               
               
                    }
              
              
            }              
             else
             {               
               
                   var userObj = authObj.PortalUserAuthenticateResult;
                   if (authObj.PortalUserAuthenticateResult.UserPosition !== null) {
                   console.log("3");
                   updateUserPosition(authObj.PortalUserAuthenticateResult.UserPosition, function(retVal) {});
                   }
            mtermsagreed=userObj.Data.hasTermsConditionsAgreed;
            
             returnFunction(userObj.Data); }
             }
                   } else {
                   returnFunction(0);
                   }
                 
        
      }
           
             
           }
             
              },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}





function getCoursesData(getLocal, returnFunction) {
    try {
        if (debug == true) {
            getLocal = true;
        }
        var coursesResultObj;
        var coursesResponseObj;
        var coursesObj;
        if (getLocal) {
          
            getLocalData("UserCourses", "", function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         coursesResponseObj = JSON.parse(returnStr);
                         if (coursesResponseObj != undefined && coursesResponseObj.CoursesGetForUserResult != undefined) {
                         coursesObj = coursesResponseObj.CoursesGetForUserResult;
                         returnFunction(coursesObj);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        } else {

            var urlMethod = getBaseUrl();

            urlMethod += configs.getCustom("CS_SITE_URL_COURSES");
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
                   coursesResponseObj = data;
                   if (coursesResponseObj != undefined && coursesResponseObj.CoursesGetForUserResult != undefined) {
                   saveLocalDataStore("UserCourses", "", JSON.stringify(coursesResponseObj), function(ret) {});
                   coursesObj = coursesResponseObj.CoursesGetForUserResult;
                   returnFunction(coursesObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
            });
            setTimeout(function(){
             
                  if( typeof JSON.stringify(coursesResponseObj) == "undefined" ){
                      msgStr = resources.weakNetwork;
                      msgTitle = resources.WeakconnError;
                      msgBtnValue = resources.btnOk;
                      navigator.notification.confirm(msgStr, function() {}, msgTitle, msgBtnValue);
                      getCoursesData(true, function(ret) {
                        returnFunction(ret);
                      });
                  }
                  else{
                    //do nothing
                  }

            }, 5000);
        }
    } catch (e) {}
}


function getFirstCoursesData(getLocal, returnFunction) {
    try {
        if (debug == true) {
            getLocal = true;
        }
        var coursesResultObj;
        var coursesResponseObj;
        var coursesObj;
        if (getLocal) {
          
            getLocalData("UserCourses", "", function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         coursesResponseObj = JSON.parse(returnStr);
                         if (coursesResponseObj != undefined && coursesResponseObj.CoursesGetForUserResult != undefined) {
                         coursesObj = coursesResponseObj.CoursesGetForUserResult;
                         returnFunction(coursesObj);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        } else {

            var urlMethod = getBaseUrl();

            urlMethod += configs.getCustom("CS_SITE_URL_COURSES");
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
                   coursesResponseObj = data;
                   if (coursesResponseObj != undefined && coursesResponseObj.CoursesGetForUserResult != undefined) {
                   saveLocalDataStore("UserCourses", "", JSON.stringify(coursesResponseObj), function(ret) {});
                   coursesObj = coursesResponseObj.CoursesGetForUserResult;
                   returnFunction(coursesObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
            });
            
        }
    } catch (e) {}
}

function getSectionsData(getLocal, inputVal) {
    try {
        if (debug == true) {
            getLocal = true;
        }
        var sectionsResultObj;
        var urlMethod = getBaseUrl();
        urlMethod += configs.getCustom("CS_SITE_URL_SECTIONS");
        var authKey = getAuthKeyUnencrypt();
        var portalKey = getPortalKeyUnencrypt();
        var additionalParams = resetParams();
        additionalParams.filename = inputVal;
        var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
        urlMethod += params;
        return urlMethod;
    } catch (e) {}
}

function getLessonsData(getLocal, moduleId, returnFunction) {
    try {
        if (debug == true) {
            getLocal = true;
        }
        var lessonsResultObj;
        var lessonsObj;
        var fileLessonsName = "LessonStructureGet_" + moduleId + ".txt";
        if (getLocal) {
            getLocalData("UserLessons", moduleId.toString(), function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         lessonsResultObj = JSON.parse(returnStr);
                         //alert(JSON.stringify(lessonsResultObj));
                         if (lessonsResultObj != undefined && lessonsResultObj.LessonStructureGetResult != undefined) {
                         lessonsObj = lessonsResultObj.LessonStructureGetResult;
                         returnFunction(lessonsObj.Data);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_LESSONS");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.basemoduleid = moduleId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            //console.log(urlMethod);
            $.ajax({
                   url: urlMethod,
                   beforeSend: function() {   $("#coursepage").append(mloadingGif); }, 
                   complete: function() {  $("#mloader").remove();  },
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   lessonsResultObj = data;
                   //console.log(data);
                   //alert(JSON.stringify(lessonsResultObj));
                   if (lessonsResultObj.LessonStructureGetResult != undefined) {
                   saveLocalDataStore("UserLessons", moduleId.toString(), JSON.stringify(lessonsResultObj), function(ret) {});
                   lessonsObj = lessonsResultObj.LessonStructureGetResult;
                   returnFunction(lessonsObj.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function getTheoryAsset(getLocal, sectionId, assetId, sectionOrder, isUnderstood, returnFunction) {
    try {
        var theoryResultObj;
        if (debug == true) {
            getLocal = true;
        }
        var theoryObj;
        if (getLocal) {
            getLocalData("SCOTheoryView", assetId.toString(), function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         theoryResultObj = JSON.parse(returnStr);
                         if (theoryResultObj != undefined && theoryResultObj.TheoryViewGetResult != undefined) {
                         theoryObj = theoryResultObj.TheoryViewGetResult;
                         returnFunction(theoryObj.Data);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_THEORY");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.sectionid = sectionId;
            additionalParams.assetid = assetId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            //console.log(urlMethod);
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   theoryResultObj = data;
                   if (theoryResultObj.TheoryViewGetResult != undefined) {
                   saveLocalDataStore("SCOTheoryView", assetId.toString(), JSON.stringify(theoryResultObj), function(ret) {});
                   theoryObj = theoryResultObj.TheoryViewGetResult;
                   returnFunction(theoryObj.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function getGuidelines(getLocal, courseId, basemoduleId, returnFunction) {
    try {
        var modResultObj;
        var modObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            getLocalData("Guidelines", courseId.toString() + "-" + basemoduleId.toString(), function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         modResultObj = JSON.parse(returnStr);
                         if (modResultObj != undefined && modResultObj.GuidelinesGetResult != undefined) {
                         modObj = modResultObj.GuidelinesGetResult;
                         returnFunction(modObj.Data);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_GUIDELINES");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.courseid = courseId;
            additionalParams.basemoduleid = basemoduleId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   modResultObj = data;
                   if (modResultObj.GuidelinesGetResult != undefined) {
                   modObj = modResultObj.GuidelinesGetResult;
                   saveLocalDataStore("Guidelines", courseId.toString() + "-" + basemoduleId.toString(), JSON.stringify(modResultObj), function(ret) {});
                   returnFunction(modObj.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function setSCOStatus(getLocal, assetId, isUnderstood, returnFunction) {
    try {
        var assetResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_THEORYVIEWUPDATE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.assetid = assetId;
            additionalParams.status = isUnderstood;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   theoryResultObj = data;
                   if (theoryResultObj.TheoryViewStatusUpdateResult != undefined) {
                   var theoryObj = theoryResultObj.TheoryViewStatusUpdateResult;
                   returnFunction(theoryObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function setModuleStatus(getLocal, courseId, basemoduleId, status, returnFunction) {
    try {
        var modResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_MODULESTATUSUPDATE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.courseid = courseId;
            additionalParams.basemoduleid = basemoduleId;
            additionalParams.modulestatus = status;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   modResultObj = data;
                   if (modResultObj.ModuleStatusUpdateResult != undefined) {
                   var modObj = modResultObj.ModuleStatusUpdateResult;
                   returnFunction(modObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function setCourseStatus(getLocal, courseId, courseStatusId, status, returnFunction) {
    try {
        var courseResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_COURSESTATUSUPDATE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.courseid = courseId;
            additionalParams.coursestatusid = courseStatusId;
            additionalParams.coursestatus = status;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   courseResultObj = data;
                   if (courseResultObj.CourseStatusUpdateResult != undefined) {
                   var courseObj = courseResultObj.CourseStatusUpdateResult;
                   returnFunction(courseObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function getWorksheetData(getLocal, sectionId, returnFunction) {
    try {
        if (debug == true) {
            getLocal = true;
        }
        var worksheetObj;
        var worksheetResultObj;
        var fileWorksheetName = "WorksheetGet_" + sectionId + ".txt";
        if (getLocal) {
            getLocalData("WorksheetData", sectionId.toString(), function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         worksheetResultObj = JSON.parse(returnStr);
                         if (worksheetResultObj != undefined && worksheetResultObj.WorksheetGetResult != undefined) {
                         worksheetObj = worksheetResultObj.WorksheetGetResult;
                         returnFunction(worksheetObj.Data);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_WORKSHEET");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.sectionid = sectionId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   worksheetResultObj = data;
                   //alert(JSON.stringify(worksheetResultObj));
                   if (worksheetResultObj.WorksheetGetResult != undefined) {
                   worksheetObj = worksheetResultObj.WorksheetGetResult;
                   saveLocalDataStore("WorksheetData", sectionId.toString(), JSON.stringify(worksheetResultObj), function(ret) {});
                   returnFunction(worksheetObj.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function saveWorksheetData(getLocal, worksheet, returnFunction) {
    try {
        var worksheetObj;
        var worksheetResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal === true) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_WORKSHEET_SAVE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=''";
            var worksheetData = JSON.stringify(worksheet);
            console.log(worksheetData);

            urlMethod += params;
            $.ajax({
                url: urlMethod,
                type: "POST",
                async: true,
                data: worksheetData,
                success: function(data, textStatus, jqXHR) {
                  worksheetResultObj = data;
                  if (worksheetResultObj.WorksheetSaveResult != undefined) {
                    worksheetObj = worksheetResultObj.WorksheetSaveResult;
                    returnFunction(worksheetObj.Data);
                  } else {
                    returnFunction(0);
                  }
                },
                error: function(msg) {
                  returnFunction(-1);
                }
            });
        }
    } catch (e) {}
}

function getHelpdeskIssues(getLocal, returnFunction) {
    try {
        var issuesResultObj;
        var issuesObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            getLocalData("HelpdeskIssues", "", function(returnStr) {
              if (returnStr === undefined || returnStr.length === 0) {
                 returnFunction(0);
              } else {
                issuesResultObj = JSON.parse(returnStr);
                if (issuesResultObj != undefined && issuesResultObj.HelpdeskIssuesGetByRequesterResult != undefined) {
                  issuesObj = issuesResultObj.HelpdeskIssuesGetByRequesterResult;
                  returnFunction(issuesObj.Data);
                } else {
                  returnFunction(0);
                }
              }
            });
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_HELPDESKISSUES_V2");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   issuesResultObj = data;
                   if (issuesResultObj.HelpdeskIssuesGetByRequesterResult != undefined) {
                   issuesObj = issuesResultObj.HelpdeskIssuesGetByRequesterResult;
                   saveLocalDataStore("HelpdeskIssues", "", JSON.stringify(issuesResultObj), function(ret) {});
                   returnFunction(issuesObj.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function addHelpdeskIssue(getLocal, projectId, issueTitle, issueCategoryId, comment, returnFunction) {
    try {
        var issueResultObj;
        var issueObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
			
      			var d = new Date();
      			//var customhelpdeskfilename = d.getUTCMilliseconds();
      			//var helpdeskfilefirstname=helpdeskuploadfilename.split('.')[0];
      			//var helpdeskfileext = helpdeskuploadfilename.substr(helpdeskuploadfilename.lastIndexOf(".") + 1);
      	
      			//var finalhelpdeskfilename="file_"+customhelpdeskfilename+"_"+helpdeskfilefirstname+"."+helpdeskfileext;
      			//var mfinalhelpdeskfilename="file_"+customhelpdeskfilename;
      			//var finalhelpdeskfilename=mfinalhelpdeskfilename.concat(helpdeskuploadfilename);
      			//var finalhelpdeskfilename=helpdeskuploadfilename;
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_HELPDESKISSUECREATE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.projectid = projectId;
            additionalParams.issuetitle = issueTitle;
            additionalParams.issuecategoryid = issueCategoryId;
            additionalParams.comment = comment;
			      additionalParams.filename = helpdeskuploadfilename;
            additionalParams.filesize = helpdekuploadfileSize;
            additionalParams.filetype = helpuploadfiletype;
            additionalParams.filecount = filecount.counter;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
			//navigator.notification.alert(uploadfiledata);
            urlMethod += params;
            console.log(urlMethod);
            $.ajax({
                   url: urlMethod,
				    beforeSend: function() { 	 $("#helpdeskpage").append(mloadingGif); }, 
					 complete: function() {	 $("#mloader").remove();  },
                   dataType: "json",
                   type: "POST",
                   async: true,
				   //data: uploadfiledata,
				   //data: null,
                   success: function(data, textStatus, jqXHR) {
                   issueResultObj = data;
				   fileUploadUri="";
                   if (issueResultObj != undefined) {
                   returnFunction(issueResultObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function updateHelpdeskIssue(getLocal, projectId, issueId, issueTitle, issueCategoryId, comment, returnFunction) {
    try {
        var issueResultObj;
        var issueObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_HELPDESKISSUEUPDATE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.projectid = projectId;
            additionalParams.issueid = issueId;
            additionalParams.issuetitle = issueTitle;
            additionalParams.issuecategoryid = issueCategoryId;
            additionalParams.comment = comment;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   issueResultObj = data;
                   if (issueResultObj.HelpdeskIssueUpdateResult != undefined) {
                   issueObj = issuesResultObj.HelpdeskIssueUpdateResult;
                   returnFunction(issueObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function helpdeskIssueAddComment(getLocal, projectId, issueId, issueTitle, issueCategoryId, comment, returnFunction) {
    try {
        var issueResultObj;
        var issueObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_HELPDESKISSUEADDCOMMENT");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.projectid = projectId;
            additionalParams.issueid = issueId;
            additionalParams.issuetitle = issueTitle;
            additionalParams.issuecategoryid = issueCategoryId;
			      additionalParams.filename = helpdeskuploadfilename;
            additionalParams.filesize = helpdekuploadfileSize;
            additionalParams.filetype = helpuploadfiletype;
            additionalParams.comment = comment;
            additionalParams.filecount = filecount.counter;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
				    beforeSend: function() { 	 $("#helpdeskpage").append(mloadingGif); }, 
					  complete: function() {	 $("#mloader").remove();  },
                   dataType: "json",
                   type: "POST",
                   async: true,
				   //data: uploadfiledata,
                   success: function(data, textStatus, jqXHR) {
                   issueResultObj = data;
				    fileUploadUri="";
                   if (issueResultObj != undefined) {
                   returnFunction(issueResultObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function helpdeskIssueFileDelete(getLocal, issueId, fileId, returnFunction) {
    try {
        var issueResultObj;
        var issueObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_HELPDESKISSUEFILEDELETE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.issueid = issueId;
            additionalParams.fileid = fileId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   issueResultObj = data;
                   if (issueResultObj != undefined) {
                   returnFunction(issueResultObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function helpdeskFileUpload(getLocal, issueId, fileName, fileSize, fileType, fileData, returnFunction) {
    try {	
  		//uploadfiledata=fileData;
  		fileData=uploadfiledata;
  		returnFunction(fileData)
  	} catch (e) {}
}

function helpdeskFileDownload(getLocal, issueId, fileId, returnFunction) {
    try {
        var issueResultObj;
        var issueObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_HELPDESKISSUEFILEDOWNLOAD");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.issueid = issueId;
            additionalParams.fileid = fileId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
				   beforeSend: function() { 	 $("#helpdeskpage").append(mloadingGif); }, 
					 complete: function() {	 $("#mloader").remove();  },
                   type: "POST",
                   async: true,
                   data: "",
                   success: function(data, textStatus, jqXHR) {
                   issueResultObj = data;
				   issueResultObj.HelpdeskFileDownloadResult.Data.FileType = getfiletype(issueResultObj.HelpdeskFileDownloadResult.Data.FileName);
				  
                   if (issueResultObj != undefined) {
                   returnFunction(issueResultObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function certificateDownload(getLocal, fileName, courseId, moduleId, returnFunction) {
    try {
        var resultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_DOWNLOADCERTIFICATE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.filename = fileName;
            additionalParams.basemoduleid = moduleId;
            additionalParams.courseid = courseId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   type: "POST",
                   async: true,
                   data: "",
                   success: function(data, textStatus, jqXHR) {
                   resultObj = data;
                   if (resultObj != undefined && resultObj.CertificateDownloadResult != undefined) {
                   returnFunction(resultObj.CertificateDownloadResult.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function pdfFileDownload(getLocal, fileName, returnFunction) {
    try {
        var resultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_DOWNLOADPDFFILE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.filename = fileName;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   type: "POST",
                   async: true,
                   data: "",
                   success: function(data, textStatus, jqXHR) {
                   resultObj = data;
                   if (resultObj != undefined && resultObj.PDFFileDownloadResult != undefined) {
					  
                   returnFunction(resultObj.PDFFileDownloadResult.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function pdfFileDownloadGet(getLocal, fileName, returnFunction) {
    try {
        var resultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_DOWNLOADPDFFILEGET");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.filename = fileName;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   resultObj = data;
                   if (resultObj != undefined && resultObj.PDFFileDownloadResult != undefined) {
                   returnFunction(resultObj.PDFFileDownloadResult.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function requestCertificateForModule(getLocal, courseId, moduleId, returnFunction) {
    try {
        var resultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
			if(iscertificatedgenetated== false){
				iscertificatedgenetated== true;
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_REQUESTCERTIFICATE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.basemoduleid = moduleId;
            additionalParams.courseid = courseId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            //console.log(urlMethod);
            $.ajax({
                   url: urlMethod,
				           beforeSend: function() { 	 $("#coursepanel").append(mloadingGif); }, 
			             complete: function() {	 $("#mloader").remove();  iscertificatedgenetated=false;},
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   resultObj = data;
                   if (resultObj != undefined) {
                   returnFunction(resultObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
		}
    } catch (e) {}
}

function helpdeskImageFileDownload(getLocal, issueId, fileId, returnFunction) {
    try {
        var issueResultObj;
        var issueObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_HELPDESKIMAGEFILEDOWNLOAD");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.issueid = issueId;
            additionalParams.fileid = fileId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
				    beforeSend: function() { 	 $("#helpdeskpage").append(mloadingGif); }, 
					 complete: function() {	 $("#mloader").remove();  },
                   type: "POST",
                   async: true,
                   data: "",
                   success: function(data, textStatus, jqXHR) {
                   issueResultObj = data;
				  
				   issueResultObj.HelpdeskFileGetResult.Data.FileType = getfiletype(issueResultObj.HelpdeskFileGetResult.Data.FileName);
				  
                   if (issueResultObj != undefined) {
                   returnFunction(issueResultObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function getAssessmentSchedules(getLocal, courseId, basemoduleId, returnFunction) {
    try {
        var assessmentsResultObj;
        if (debug == true) {
            getLocal = true;
        }
        var fileAssessmentName = "AssessmentSchedulesGet_" + basemoduleId + ".txt";
        if (getLocal) {
            getLocalData("AssessmentSchedule", courseId.toString() + "-" + basemoduleId.toString(), function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         assessmentsResultObj = JSON.parse(returnStr);
                         if (assessmentsResultObj != undefined && assessmentsResultObj.GetAssessmentSchedulesResult != undefined) {
                         returnFunction(assessmentsResultObj.GetAssessmentSchedulesResult.Data);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_ASSESSMENTSCHEDULES");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.courseid = courseId;
            additionalParams.basemoduleid = basemoduleId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            console.log(urlMethod);
            $.ajax({
                   url: urlMethod,
                   beforeSend: function() {   $("#bookingcontent").append(mloadingGif); }, 
                   complete: function() {  $("#mloader").remove();  },
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   assessmentsResultObj = data;
                   //console.log(data);
                   if (assessmentsResultObj.GetAssessmentSchedulesResult.Data != undefined) {
                   saveLocalDataStore("AssessmentSchedule", courseId.toString() + "-" + basemoduleId.toString(), JSON.stringify(assessmentsResultObj), function(ret) {});
                   returnFunction(assessmentsResultObj.GetAssessmentSchedulesResult.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function createAssessmentBooking(getLocal, courseId, basemoduleId, assessmentScheduleId, assessmentItemId, returnFunction) {
    try {
        var assessmentsResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_ASSESSMENTBOOKING_CREATE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.courseid = courseId;
            additionalParams.basemoduleid = basemoduleId;
            additionalParams.scheduleid = assessmentScheduleId;
            additionalParams.assessmentitemid = assessmentItemId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            //console.log(urlMethod);
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   assessmentsResultObj = data;
                   if (assessmentsResultObj.AssessmentBookingCreateResult != undefined) {
                   returnFunction(assessmentsResultObj.AssessmentBookingCreateResult.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function deleteAssessmentBooking(getLocal, courseId, basemoduleId, assessmentScheduleId, assessmentItemId, bookingId, returnFunction) {
    try {
        var assessmentsResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_ASSESSMENTBOOKING_DELETE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.courseid = courseId;
            additionalParams.basemoduleid = basemoduleId;
            additionalParams.scheduleid = assessmentScheduleId;
            additionalParams.assessmentitemid = assessmentItemId;
            additionalParams.bookingid = bookingId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   assessmentsResultObj = data;
                   if (assessmentsResultObj.AssessmentBookingDeleteResult != undefined) {
                   returnFunction(assessmentsResultObj.AssessmentBookingDeleteResult);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function getAssessmentResult(getLocal, courseId, basemoduleId, returnFunction) {
    try {
        var assessmentsResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            getLocalData("AssessmentResult", courseId.toString() + "-" + basemoduleId.toString(), function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         assessmentsResultObj = JSON.parse(returnStr);
                         if (assessmentsResultObj != undefined && assessmentsResultObj.GetAssessmentResultResult != undefined) {
                         returnFunction(assessmentsResultObj.GetAssessmentResultResult.Data);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_ASSESSMENTRESULT");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.courseid = courseId;
            additionalParams.basemoduleid = basemoduleId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   assessmentsResultObj = data;
                   if (assessmentsResultObj.GetAssessmentResultResult != undefined) {
                   saveLocalDataStore("AssessmentResult", courseId.toString() + "-" + basemoduleId.toString(), JSON.stringify(assessmentsResultObj), function(ret) {});
                   returnFunction(assessmentsResultObj.GetAssessmentResultResult.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function getAssessmentSummary(getLocal, courseId, returnFunction) {
    try {
        var assessmentsSummaryObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            getLocalData("AssessmentSummary", courseId.toString(), function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         assessmentsSummaryObj = JSON.parse(returnStr);
                         if (assessmentsSummaryObj != undefined && assessmentsSummaryObj.GetAssessmentSummaryResult != undefined) {
                         returnFunction(assessmentsSummaryObj.GetAssessmentSummaryResult.Data);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_ASSESSMENTSUMMARY");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.courseid = courseId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   assessmentsSummaryObj = data;
                   if (assessmentsSummaryObj.GetAssessmentSummaryResult != undefined) {
                   saveLocalDataStore("AssessmentSummary", courseId.toString(), JSON.stringify(assessmentsSummaryObj), function(ret) {});
                   returnFunction(assessmentsSummaryObj.GetAssessmentSummaryResult.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function emailAssessmentSummary(getLocal, courseId, fromEmailAddress, toEmailAddress, emailMessage, returnFunction) {
    try {
        var assessmentsSummaryObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_EMAILASSESSMENTSUMMARY");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.courseid = courseId;
            additionalParams.emailaddressfrom = fromEmailAddress;
            additionalParams.emailaddressto = toEmailAddress;
            additionalParams.emailmessage = emailMessage;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   type: "GET",
                   async: true,
                   data: "",
                   success: function(data, textStatus, jqXHR) {
                   assessmentsResultObj = data;
                   if (assessmentsResultObj.AssessmentSummaryEmailResult != undefined) {
                   returnFunction(assessmentsResultObj.AssessmentSummaryEmailResult);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function PDFFileRemove(getLocal, fileName, returnFunction) {
    try {
        var fileObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_FILEREMOVE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.filename = fileName;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   type: "GET",
                   async: true,
                   data: "",
                   success: function(data, textStatus, jqXHR) {
                   fileObj = data;
                   if (fileObj.PDFFileRemoveResult != undefined) {
                   returnFunction(fileObj.PDFFileRemoveResult.Success);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function podcastXMLGet(getLocal, podcastUrl, returnFunction) {
    try {
        var podCastResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            $.ajax({
                   url: podcastUrl,
                   type: "GET",
                   async: true,
                   dataType: "text",
                   success: function(data, textStatus, jqXHR) {
                   podCastResultObj = data;
                   if (podCastResultObj != undefined) {
                   returnFunction(podCastResultObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function videoGroupCategoriesGet(getLocal, libraryId, returnFunction) {
    try {
        var videosResultObj;
        var localStore = "VideoCategoryData";
        if(libraryId!==5){localStore="EClassesData";}
        
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            getLocalData(localStore, "", function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         videosResultObj = JSON.parse(returnStr);
                         if (videosResultObj != undefined && videosResultObj.VideoCategoriesListGetResult != undefined) {
                         returnFunction(videosResultObj.VideoCategoriesListGetResult.Data);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_VIDEOGROUPS");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.libraryid = libraryId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   videosResultObj = data;
                   if (videosResultObj != undefined) {
                   saveLocalDataStore(localStore, "", JSON.stringify(videosResultObj), function(ret) {});
                   returnFunction(videosResultObj.VideoCategoriesListingGetResult.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}
function videoDetailsGet(getLocal, videoRef, returnFunction) {
    try {
        var videosResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_VIDEODETAILS");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.nodekey = videoRef;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   videosResultObj = data;
                   //alert(JSON.stringify(data));
                   if (videosResultObj != undefined) {
                   returnFunction(videosResultObj.VideoDetailsListGetResult.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}
function podcastsGetForUser(getLocal, courseid, returnFunction) {
    try {
        var podcastsResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            getLocalData("PodcastData", courseid.toString(), function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         podcastsResultObj = JSON.parse(returnStr);
                         if (podcastsResultObj != undefined && podcastsResultObj.GetPodcastsForUserResult != undefined) {
                         returnFunction(podcastsResultObj.GetPodcastsForUserResult.Data);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_PODCASTS");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.courseid = courseid;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            console.log(urlMethod);
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   podcastsResultObj = data;
                   if (podcastsResultObj != undefined) {
                   saveLocalDataStore("PodcastData", courseid.toString(), JSON.stringify(podcastsResultObj), function(ret) {});
                   returnFunction(podcastsResultObj.GetPodcastsForUserResult.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function videoFileDownload(getLocal, videoId, returnFunction) {
    try {
        var videoResultObj;
        var videoObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_VIDEOFILEDOWNLOAD");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.fileid = videoId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   type: "POST",
                   async: true,
                   data: "",
                   success: function(data, textStatus, jqXHR) {
                   videoResultObj = data;
                   if (videoResultObj != undefined) {
                   returnFunction(videoResultObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function videoViewsUpdate(getLocal, fileId, returnFunction) {
    try {
        var videoUpdateResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_VIDEOVIEWPDATE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.fileid = fileId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   videoUpdateResultObj = data;
                   if (videoUpdateResultObj != undefined) {
                   returnFunction(videoUpdateResultObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function audioGroupCategoriesGet(getLocal, returnFunction) {
    try {
        var audiosResultObj;
        if (debug == true) {
            getLocal = true;
        }
        var fileAudioName = "AudiosGet.txt";
        if (getLocal) {
            getLocalData("AudioCategoryData", "", function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         audiosResultObj = JSON.parse(returnStr);
                         if (audiosResultObj != undefined && audiosResultObj.AudioCategoriesListGetResult != undefined) {
                         returnFunction(audiosResultObj.AudioCategoriesListGetResult.Data);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_AUDIOGROUPS");
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
                   audiosResultObj = data;
                   if (audiosResultObj !== undefined) {
                   if (audiosResultObj.AudioCategoriesListGetResult.Data !== undefined) {
                   saveLocalDataStore("AudioCategoryData", "", JSON.stringify(audiosResultObj), function(ret) {});
                   returnFunction(audiosResultObj.AudioCategoriesListGetResult.Data);
                   } else {
                   returnFunction(0);
                   }
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}
function userPlaylistsGet(getLocal, returnFunction) {
    try {
        var playlistsResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            getLocalData("UserPlaylistData", "", function(returnStr) {
                         if (returnStr === undefined || returnStr.length === 0) {
                         returnFunction(0);
                         } else {
                         playlistsResultObj = JSON.parse(returnStr);
                         if (playlistsResultObj != undefined && playlistsResultObj.UserPlaylistsGetResult != undefined && playlistsResultObj.UserPlaylistsGetResult.Data!==undefined) {
                         returnFunction(playlistsResultObj.UserPlaylistsGetResult.Data);
                         } else {
                         returnFunction(0);
                         }
                         }
                         });
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_PLAYLISTS");
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
                   playlistsResultObj = data;
                   if (playlistsResultObj !== undefined) {
                   if (playlistsResultObj.UserPlaylistsGetResult.Data !== undefined) {
                   saveLocalDataStore("UserPlaylistData", "", JSON.stringify(playlistsResultObj), function(ret) {});
                   returnFunction(playlistsResultObj.UserPlaylistsGetResult.Data);
                   } else {
                   returnFunction(0);
                   }
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}
function userPlaylistsDelete(getLocal, userPlaylistIds, returnFunction) {
    try {
        var playlistsResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_PLAYLIST_DELETE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.nodekey = userPlaylistIds;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   playlistsResultObj = data;
                   if (playlistsResultObj !== undefined) {
                   if (playlistsResultObj.UserPlaylistDeleteResult.Data !== undefined) {
                   returnFunction(true);
                   } else {
                   returnFunction(0);
                   }
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}
function savePlaylistData(getLocal, playlist, returnFunction) {
    try {
        var playlistObj;
        var playlistResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal === true) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_PLAYLIST_SAVE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=''";
            var playListData = JSON.stringify(playlist);
            urlMethod += params;
		
            $.ajax({
                   url: urlMethod,
                   type: "POST",
                   async: true,
                   data: playListData,
                   success: function(data, textStatus, jqXHR) {
                   playlistResultObj = data;
                   if (playlistResultObj.UserPlaylistSaveResult != undefined) {
                   playlistObj = playlistResultObj.UserPlaylistSaveResult;
                   returnFunction(playlistObj.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {
        returnFunction(-1);
    }
}
function updatePlaylistData(getLocal, playlist, returnFunction) {
    try {
        var playlistObj;
        var playlistResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal === true) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_PLAYLIST_UPDATE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=''";
            var playListData = JSON.stringify(playlist);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   type: "POST",
                   async: true,
                   data: playListData,
                   success: function(data, textStatus, jqXHR) {
                   playlistResultObj = data;
                   if (playlistResultObj.UserPlaylistUpdateResult != undefined) {
                   playlistObj = playlistResultObj.UserPlaylistUpdateResult;
                   returnFunction(playlistObj.Data);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {
        returnFunction(-1);
    }
}
function thumbnailFileDownload(getLocal, moduleid, returnFunction) {
    try {
        var thumbnailResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_PODCASTTHUMBNAIL");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.basemoduleid = moduleid;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   thumbnailResultObj = data;
                   if (thumbnailResultObj != undefined) {
                   returnFunction(thumbnailResultObj);
                   } else {
                   returnFunction("");
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function updatePodState(getLocal, courseid, moduleid, sectionid, assetid, nodekey, returnFunction) {
    try {
        var setSyncPositionObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_SETUSERSYNCPOSITION");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.courseid = courseid;
            additionalParams.basemoduleid = moduleid;
            additionalParams.sectionid = sectionid;
            additionalParams.assetid = assetid;
            additionalParams.nodekey = nodekey;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            //console.log(urlMethod);
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                    //console.log(data);
                   setSyncPositionObj = data;
                   if (setSyncPositionObj != undefined) {
                   returnFunction(setSyncPositionObj);
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function getUserPodState(getLocal, returnFunction) {
    try {
        var getSyncPositionObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_SITE_URL_GETUSERSYNCPOSITION");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey);
            urlMethod += params;
            console.log(urlMethod);
            $.ajax({
                   url: urlMethod,
                   dataType: "json",
                   type: "GET",
                   async: true,
                   success: function(data, textStatus, jqXHR) {
                   getSyncPositionObj = data;
                   if (getSyncPositionObj != undefined && getSyncPositionObj.UserSyncPositionGetResult != undefined) {
                   if (getSyncPositionObj.UserSyncPositionGetResult.UserPosition !== null) {
                   console.log("1");
                   returnFunction(getSyncPositionObj.UserSyncPositionGetResult.UserPosition);
                   } else {
                   returnFunction(0);
                   }
                   } else {
                   returnFunction(0);
                   }
                   },
                   error: function(msg) {
                   returnFunction(-1);
                   }
                   });
        }
    } catch (e) {}
}

function xmlToJson(xml) {
    var obj = {};
    if (xml.nodeType == 1) {
        if (xml.attributes.length > 0) {
            obj = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj[attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else {
        if (xml.nodeType == 3) {
            obj = xml.nodeValue;
        }
    }
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}

function convertXmlToJson(xml) {
    try {
        var attr, child, attrs = xml.attributes,
        children = xml.childNodes,
        key = xml.nodeType,
        objx = {},
        i = -1;
        if (key == 1 && attrs.length) {
            objx = {};
            while (attr = attrs.item(++i)) {
                objx[attr.nodeName] = attr.nodeValue;
            }
            i = -1;
        } else {
            if (key == 3) {
                objx = xml.nodeValue;
            }
        }
        while (child == children.item(++i)) {
            key = child.nodeName;
            if (objx.hasOwnProperty(key)) {
                if (objx.toString.call(objx[key]) != "[object Array]") {
                    objx[key] = [objx[key]];
                }
                objx[key].push(xmlToJson(child));
            } else {
                objx[key] = xmlToJson(child);
            }
        }
        return objx;
    } catch (e) {}
}

function logObject(obj) {}

function getLocalData(dataType, params, returnFunction) {
    var returnData = "";
    try {
        if (allowOffline === true) {
            var sqlStr = "SELECT * FROM " + dataType;
            if (params.length > 0) {
                sqlStr += " WHERE params='" + params + "'";
            }
            activeUser.userDB.transaction(function(tx) {
                                          tx.executeSql(sqlStr, [], function(tx, sqlResults) {
                                                        if (sqlResults !== undefined && sqlResults.rows.length > 0) {
                                                        returnData = sqlResults.rows.item(0).data;
                                                        returnFunction(unEscapeHtml(returnData));
                                                        } else {
                                                        returnFunction(returnData);
                                                        }
                                                        },
                                                        function(error){
                                                        returnFunction("");
                                                        });
                                          }, function( err) {
                                          returnFunction("");
                                          });
        } else {
            returnFunction(returnData);
        }
    } catch (e) {
        returnFunction(returnData);
    }
}

function customgetLocalData(dataType, params) {
    var returnData = "";
    try {
        if (allowOffline === true) {
            var sqlStr = "SELECT * FROM " + dataType;
            if (params.length > 0) {
                sqlStr += " WHERE params='" + params + "'";
            }
            activeUser.userDB.transaction(function(tx) {
                                          tx.executeSql(sqlStr, [], function(tx, sqlResults) {
                                                        if (sqlResults !== undefined && sqlResults.rows.length > 0) {
                                                         returnData = sqlResults.rows.item(0).data;
                                                         customdata=unEscapeHtml(returnData);
                                                        } else {
                                                         customdata=returnData;
                                                        }
                                                        },
                                                        function(error){
                                                         customdata="";
                                                        });
                                          }, function( err) {
                                           customdata="";
                                          });
        } else {
            customdata=returnData;
        }
    } catch (e) {
        customdata=returnData;
    }
}






function setupLocalData(returnFunction) {
    var returnData = "";
    try {
        if (allowOffline === true) {
            
            activeUser.userDB.transaction(function(tx) {
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS UserAuthenticate (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS UserCourses (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS UserLessons (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS SCOTheoryView  (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS Guidelines  (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS WorksheetData (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS HelpdeskIssues (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS AssessmentSchedule (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS AssessmentResult (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS AssessmentSummary (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS EClasses (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS EClassesData (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS PodcastItems (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS PodcastData (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS AudioCategoryItems (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS AudioCategoryData (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS VideoCategoryItems (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS VideoCategoryData (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS UserPlaylists (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS UserPlaylistData (id integer primary key autoincrement, params text, data text)");
                                          }, function(tx, err) {
                                          returnFunction(true);
                                          });
        } else {
            returnFunction(false);
        }
    } catch (e) {
        returnFunction(false);
    }
}

function saveLocalDataStore(tableName, tableParams, tableValue, returnFunction) {
    var dbSuccess = true;
    try {
        if (allowOffline === true) {
            var sqlStr = "DELETE FROM " + tableName;
            if (tableParams.length > 0) {
                sqlStr += " WHERE params='" + tableParams + "'";
            }
            tableValue = escapeHtml(tableValue);
            var insertStr = "INSERT INTO " + tableName + " ('params', 'data') VALUES ('" + tableParams + "', '" + tableValue + "')";
            activeUser.userDB.transaction(function(tx) {
                                          tx.executeSql("CREATE TABLE IF NOT EXISTS " + tableName + " (id integer primary key autoincrement, params text, data text)");
                                          tx.executeSql(sqlStr, [], function(){});
                                          tx.executeSql(insertStr, [], function(tx, result){
                                                        returnFunction(result);
                                                        });
                                          
                                          }, function(err) {
                                          returnFunction(err);
                                          });
            
        } else {
            returnFunction(true);
        }
    } catch (e) {
        returnFunction(false);
    }
}

function errorDB(tx, err) {}

function getLocalXMLFile(file) {
    try {
        var that = this;
        $.ajax({
               type: "GET",
               url: file,
               dataType: "xml",
               cache: true,
               async: false,
               success: function(data) {
               that.xmlFile = data;
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
               that.xmlFile = doc;
               }
               } catch (e) {
               errorHandler("get xml file error", e);
               }
               } else {
               navigator.notification.alert("Failed: " + textStatus + " " + errorThrown);
               }
               }
               });
    } catch (e) {}
}

function getBaseUrl() {
    try {
        var baseurl = configs.getCustom("CS_SITE_URL_BASE");
        return baseurl;
    } catch (e) {}
}

function getAuthKeyUnencrypt() {
    try {
        var authKey = authParamsObj;
        authKey.username = "";
        authKey.password = "";
		    authKey.deviceid = "";
        authKey.username = activeUser.username;
        //authKey.password = activeUser.pwdHash;
        authKey.password = encodeURIComponent(activeUser.pwdHash);
		    authKey.deviceid = device.uuid;
		    authKey.firstlogin=activeUser.requireslogin.toString();
		    authKey.isandroid="true";
        return authKey;
    } catch (e) {}
}

function getAuthKey() {
    try {
        var authKey = "";
        authKey = "username=" + activeUser.username;
        authKey += "&password=" + activeUser.pwdHash;
        return encryptString(authKey);
    } catch (e) {}
}

function getPortalKeyUnencrypt() {
    try {
        var keyparam = keyParamsObj;
        keyparam.studentid = "";
        keyparam.portalid = "";
        keyparam.studentid = activeUser.userId;
        keyparam.portalid = configs.getCustom("CS_PORTAL_ID");
        if (userPortalId !== undefined && userPortalId > 0 && userPortalId !== keyparam.portalid) {
            keyparam.portalid = userPortalId;
        }
        keyparam.appversion = configs.getCustom("CS_VERSION_NO");
        return keyparam;
    } catch (e) {}
}

function getPortalKey() {
    try {
        var keyparam = "StudentId=" + (activeUser == undefined) ? 0 : activeUser.userId;
        var appPortalId = configs.getCustom("CS_PORTAL_ID");
        if (userPortalId !== undefined && userPortalId > 0 && userPortalId !== appPortalId) {
            appPortalId = userPortalId;
        }
        keyparam += "&PortalId=" + appPortalId;
        keyparam += "&TPContext=" + configs.getCustom("CS_SITE_URL");
        return encryptString(keyparam);
    } catch (e) {}
}

function resetParams() {
    try {
        var params = otherParamsObj;
        params.basemoduleid = "";
        params.sectionid = "";
        params.assetid = "";
        params.status = "";
        params.courseid = "0";
        params.projectid = 0;
        params.issueid = 0;
        params.issuetitle = "";
        params.issuecategoryid = 0;
        params.comment = "";
        params.fileid = 0;
        params.filename = "";
        params.filesize = 0;
        params.filetype = "";
        params.coursestatusid = 0;
        params.coursestatus = "";
        params.modulestatus = "";
        params.portalname = "";
        params.scheduleid = 0;
        params.assessmentitemid = 0;
        params.bookingid = 0;
        params.emailaddressfrom = "";
        params.emailaddressto = "";
        params.emailmessage = "";
        params.nodekey = "";
        params.libraryid = 0;
		    params.OtaType= "";
        return params;
    } catch (e) {}
}

function encryptString(paramStr) {
    try {
        aesKey = aesKey == undefined ? configs.getCustom("CS_ENCRYPT_KEY") : aesKey;
        return crypted;
    } catch (e) {}
}
var entityMapEscape = {
    "'": "&#39;"
};

function escapeHtml(replaceStr) {
    var newStr = replaceStr.replace("'", "&#39;");
    if (newStr.indexOf("'") > -1) {
        return escapeHtml(newStr);
    } else {
        return newStr;
    }
}

function unEscapeHtml(replaceStr) {
    var newStr = replaceStr.replace("&#39;", "'");
    if (newStr.indexOf("&#39;") > -1) {
        return unEscapeHtml(newStr);
    } else {
        return newStr;
    }
}


function getOtaGuidliness(getLocal, moduleId,otaTypeId,IsLiveOTA,returnFunction) {
    try {
        var lessonsResultObj;
        var lessonsObj;
        var urlMethod = getBaseUrl();
        urlMethod += configs.getCustom("CS_OTA_GUIDLINES");
        var authKey = getAuthKeyUnencrypt();
        var portalKey = getPortalKeyUnencrypt();
        var additionalParams = resetParams();
        additionalParams.basemoduleid = moduleId;
	    additionalParams.OtaType=otaTypeId;
	    additionalParams.IsOtaLive=IsLiveOTA;
        var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
        urlMethod += params;
        //console.log(urlMethod);
        //navigator.notification.alert(urlMethod);
        $.ajax({
            beforeSend: function() {   $("#OtaDetailPage").append(mloadingGif); }, 
            complete: function() {  $("#mloader").remove();  },
              url: urlMethod,
              dataType: "json",
              type: "GET",
              async: true,
              success: function(data, textStatus, jqXHR) {
  					   //navigator.notification.alert(data);
                if(data!= undefined){
                  returnFunction(data);
                }
               //console.log(data);
  					    else {
                  returnFunction(0);
                }
  					  },
            error: function(msg) {
		           returnFunction(0);
            }
        });
        
    } catch (e) {}
}

/*function getOtaQuestions(getLocal, OtaIdForQuestions,moduleId,courseId,returnFunction) {
    try {

        var lessonsResultObj;
        var lessonsObj;
        var urlMethod = getBaseUrl();
        urlMethod += configs.getCustom("CS_OTA_QUESTIONS");
        var authKey = getAuthKeyUnencrypt();
        var portalKey = getPortalKeyUnencrypt();
        var additionalParams = resetParams();
        additionalParams.basemoduleid = moduleId;
        additionalParams.courseid = courseId;
        additionalParams.OtaId=OtaIdForQuestions;
        additionalParams.IsOtaLive="0";
        var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
        urlMethod += params;
        //navigator.notification.alert(urlMethod);
        console.log(urlMethod);
        $.ajax({
          beforeSend: function() {   $("#OtaQuestionPage").append(mloadingGif); },
          complete: function() {  $("#mloader").remove();  },
          url: urlMethod,
          dataType: "json",
          type: "GET",
          async: true,
          success: function(data, textStatus, jqXHR) {
            //console.log(JSON.stringify(data));
            if(data!= undefined){
              returnFunction(data);
            }
            else{
              returnFunction(0);
            }
          },
          error: function(msg) {
            returnFunction(0);
             //navigator.notification.alert("OTA Error");
          }
        });

    } catch (e) {}
}*/

function getOtaQuestions(getLocal, OtaIdForQuestions,moduleId,courseId,assessmentscheduleid,OTASectionIDsOTA,IsOTALive,returnFunction) {
    try {

        var lessonsResultObj;
        var lessonsObj;
        var urlMethod = getBaseUrl();
        urlMethod += configs.getCustom("CS_OTA_QUESTIONS");
        var authKey = getAuthKeyUnencrypt();
        var portalKey = getPortalKeyUnencrypt();
        var additionalParams = resetParams();
        additionalParams.basemoduleid = moduleId;
                additionalParams.courseid = courseId;
                additionalParams.OtaId=OtaIdForQuestions;
                additionalParams.AssessmentScheduleId = assessmentscheduleid;
                additionalParams.OTASectionIDs = OTASectionIDsOTA;
                additionalParams.IsOtaLive=IsOTALive;
        var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
        urlMethod += params;
        console.log(urlMethod);
        $.ajax({
          beforeSend: function() {   $("#OtaQuestionPage").append(mloadingGif); },
          complete: function() {  $("#mloader").remove();  },
          url: urlMethod,
          dataType: "json",
          type: "GET",
          async: true,
          success: function(data, textStatus, jqXHR) {
            console.log(JSON.stringify(data));
            if(data!= undefined){
              returnFunction(data);
            }
            else{
              returnFunction(0);
            }
          },
          error: function(msg) {
            returnFunction(0);
             //navigator.notification.alert("OTA Error");
          }
        });

    } catch (e) {}
}

function InsertUpdateOtaExamStartEndDetailsWS(getLocal, OtaIdForQuestions,assessmentscheduleid,IsExamEnd,OTASectionIDs,IsLiveOTA,returnFunction) {
    try {

        var lessonsResultObj;
        var lessonsObj;
        var urlMethod = getBaseUrl();
        urlMethod += configs.getCustom("CS_OTAStartEnd_Insert");
        var authKey = getAuthKeyUnencrypt();
        var portalKey = getPortalKeyUnencrypt();
        var additionalParams = resetParams();
        additionalParams.AssessmentScheduleId = assessmentscheduleid;
                        additionalParams.OtaId=OtaIdForQuestions;
                        additionalParams.IsExamEnd=IsExamEnd;
                        additionalParams.OTASectionIDs=OTASectionIDs;
        additionalParams.IsOtaLive = IsLiveOTA;


        var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
        urlMethod += params;
        //console.log(urlMethod);
        $.ajax({
          //beforeSend: function() {   $("#OtaQuestionPage").append(mloadingGif); },
          //complete: function() {  $("#mloader").remove();  },
          url: urlMethod,
          dataType: "json",
          type: "GET",
          async: true,
          success: function(data, textStatus, jqXHR) {
            //console.log(JSON.stringify(data));
            if(data!= undefined){
              returnFunction(data);
            }
            else{
              returnFunction(0);
            }
          },
          error: function(msg) {
            returnFunction(0);
             //navigator.notification.alert("OTA Error");
          }
        });

    } catch (e) {}
}


function saveOTA(getLocal, ota, IsLiveOTA,basemoduleid, returnFunction) {
    try {
      //console.log(ota);
        var worksheetObj;
        var worksheetResultObj;
        if (debug == true) {
            getLocal = true;
        }
        if (getLocal === true) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            var additionalParams = resetParams();
            urlMethod += configs.getCustom("CS_SITE_URL_OTA_SAVE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            additionalParams.IsOtaLive=IsLiveOTA;
                        additionalParams.basemoduleid = basemoduleid;
                        additionalParams.StudentId = activeUser.userId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey)+ "&param=" + JSON.stringify(additionalParams);
            
            urlMethod += params;
            //console.log(urlMethod);
            //var otaData = JSON.stringify(ota);
            //console.log(otaData);
            //console.log(ota);
            $.ajax({
                type: "POST",
                url: urlMethod,
                //dataType:'text',
                contentType: 'text/plain',
                async: true,
                data: ota,
                success: function(data, textStatus, jqXHR) {
                  //console.log(data);
                  //alert(JSON.stringify(data));
                  returnFunction(data);
                  //worksheetResultObj = data;
                  /*if (worksheetResultObj.WorksheetSaveResult != undefined) {
                    worksheetObj = worksheetResultObj.WorksheetSaveResult;
                    returnFunction(worksheetObj.Data);
                  } else {
                    returnFunction(0);
                  }*/
                },
                error: function(msg) {
                  returnFunction(-1);
                }
            });
        }
    } catch (e) {}
}

function getSCOListLinkedToOTAExamWS(getLocal,OTAStudentExamID,returnFunction){
    try {

        if (debug == true) {
            getLocal = true;
        }
        if (getLocal === true) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            var additionalParams = resetParams();
            urlMethod += configs.getCustom("CS_OTA_GetSCOListLinkedToOTAExam");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            additionalParams.OTAStudentExamID=OTAStudentExamID;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey)+ "&param=" + JSON.stringify(additionalParams);
            //var otaData = JSON.stringify(ota);

            urlMethod += params;
            console.log(urlMethod);
            $.ajax({
                url: urlMethod,
                dataType: "json",
                type: "GET",
                async: true,
                success: function(data, textStatus, jqXHR) {
                    //console.log(data);
                  returnFunction(data);
                },
                error: function(msg) {
                  returnFunction(-1);
                }
            });
        }
    } catch (e) {}
}

function getYuduURL(getLocal,yuduId,returnFunction){
    try {

        if (debug == true) {
            getLocal = true;
        }
        if (getLocal === true) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            var additionalParams = resetParams();
            urlMethod += configs.getCustom("CS_OTA_getYuduPath");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            additionalParams.YuduId=yuduId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey)+ "&param=" + JSON.stringify(additionalParams);
            //var otaData = JSON.stringify(ota);

            urlMethod += params;
            console.log(urlMethod);
            $.ajax({
                url: urlMethod,
                dataType: "json",
                type: "GET",
                async: true,
                success: function(data, textStatus, jqXHR) {
                    //console.log(data);
                  returnFunction(data);
                },
                error: function(msg) {
                  returnFunction(0);
                }
            });
        }
    } catch (e) {}
}

function uploadHelpdeskMultiImageOld(fileURL,filecount,newfileissueid){
    var greyBtn = "#addcommentbtn-"+newfileissueid;
        $(greyBtn).attr("style","background: #a3a2a2 !important; pointer-events: none ");
    var filenameOld = "#filenameOld"+newfileissueid;
    var barOld = ".barOld"+newfileissueid;
    var fileNoSupportError = "#fileNoSupportError"+newfileissueid;

    filecount.counter = filecount.counter + 1;
    var uriURL = "https://studentdesktop.eteacher.pro/data/ChunkUpload.aspx?userId="+activeUser.userId+"&portalId="+ configs.getCustom("CS_PORTAL_ID")+"&fileCount="+filecount.counter;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    var d = new Date();
    var RandomNo = d.getTime();
    HelpDeskfileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
        var fileNameWOSpace = HelpDeskfileName.replace(/ /g,'');
        //var fileFormat = fileNameWOSpace.substr(fileNameWOSpace.lastIndexOf('.')+1);
          //  var FilenameNew = RandomNo +"."+ fileFormat;

            options.httpMethod = "POST";
                options.chunkedMode = false;
                options.headers = {
                    Connection: "close"
                }
        options.fileName = fileNameWOSpace;
    var ft = new FileTransfer();
    ft.onprogress = function(progressEvent) {
        if (progressEvent.lengthComputable) {
            var loadingPercent =100 * (progressEvent.loaded / progressEvent.total);
            var loadingPercentwithStyle = Math.ceil(loadingPercent) + "%";
            console.log(loadingPercent);
            $(barOld).css("width",loadingPercentwithStyle);
            $(barOld).html(loadingPercentwithStyle);


            //loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
        } else {
            //loadingStatus.increment();
        }
    };

    ft.upload(fileURL, uriURL, onSuccess, onError, options);

    function onSuccess(r) {
        var responseString = JSON.stringify(r);
        var checkRes = responseString.includes("FormatNotSupported");
        if(checkRes){
            var responsed = JSON.parse(r.response);
            filecount.counter = filecount.counter - 1;
            $(fileNoSupportError).append('It looks like you are trying to upload an unauthorised file type. Please note, you may only upload files with the following extensions:'+responsed.SuportedFormats+'<br>If you are trying to upload a video, please ensure it is in .mp4 or .mov format. You may use an online converter if necessary e.g. <a href="https://convert-video-online.com/">https://convert-video-online.com/</a>');
            $(barOld).css("width","0%");
            $(barOld).html("");
            $(greyBtn).attr("style","background: #079469 !important; pointer-events: unset ");
        }
        else{
            $(filenameOld).append('<p class="deleteImages-'+newfileissueid+'" style="margin:0px;"  id='+ fileNameWOSpace + ' >'+fileNameWOSpace+'<span  id='+ fileNameWOSpace + ' style=color:#ef5351; >  &#10006;</span></p><br>');
            $(barOld).css("width","0%");
            $(barOld).html("");
            $(greyBtn).attr("style","background: #079469 !important; pointer-events: unset ");
        }

        /*if(responsed.ErrorCode == 2 || responsed.ErrorCode == 2){

        }
        else{

        }*/

        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    }

    /*function onSuccess(r) {
       $(filenameOld).append('<p class="deleteImages-'+newfileissueid+'" style="margin:0px;"  id='+ fileNameWOSpace + ' >'+fileNameWOSpace+'<span  id='+ fileNameWOSpace + ' style=color:#ef5351; >  &#10006;</span></p><br>');
        $(barOld).css("width","0%");
        $(barOld).html("");
        $(greyBtn).attr("style","background: #079469 !important; pointer-events: unset ");
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    }*/


    function onError(error) {
           msgTitle = resources.connError;
          msgBtnValue = resources.btnOk;
          msgStr = resources.functionConnError;

          navigator.notification.confirm(msgStr, function() {
                                         //hidePleaseWait();
                                         }, msgTitle, msgBtnValue);
        $(greyBtn).attr("style","background: #079469 !important; pointer-events: unset ");
        $('.bar').css("width","0%");
                $('.bar').html("");
                filecount.counter = filecount.counter - 1;
                console.log("An error has occurred: Code = " + error);
        console.log("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }
}


function uploadHelpdeskMultiImage(fileURL,filecount){
    $(".supportbtndiv").attr("style","background: #a3a2a2 !important");
        $("#sendsupportbtn").attr("style","background: #a3a2a2 !important; pointer-events: none ");
    filecount.counter = filecount.counter + 1;
    var uriURL = "https://studentdesktop.eteacher.pro/data/ChunkUpload.aspx?userId="+activeUser.userId+"&portalId="+ configs.getCustom("CS_PORTAL_ID")+"&fileCount="+filecount.counter;
    console.log(uriURL);
    var options = new FileUploadOptions();
    options.fileKey = "file";
    //var fourdigitsrandom = Math.floor(1000 + Math.random() * 9000);
    var d = new Date();
    var RandomNo = d.getTime();
    HelpDeskfileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
    var fileNameWOSpace = HelpDeskfileName.replace(/ /g,'');
    //var fileFormat = fileNameWOSpace.substr(fileNameWOSpace.lastIndexOf('.')+1);
    //var FilenameNew = RandomNo +"."+ fileFormat;
    //options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
    options.httpMethod = "POST";
    options.chunkedMode = false;
    options.headers = {
        Connection: "close"
    }
    options.fileName = fileNameWOSpace;
    //options.fileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
    //options.mimeType = "image/jpeg";
    //HelpDeskfileName = fileURL.substr(fileURL.lastIndexOf('/')+1);
    //var headers = {'headerParam':'headerValue'};
    //options.headers = headers;
    var ft = new FileTransfer();
    ft.onprogress = function(progressEvent) {
        if (progressEvent.lengthComputable) {
            var loadingPercent =100 * (progressEvent.loaded / progressEvent.total);
            var loadingPercentwithStyle = Math.ceil(loadingPercent) + "%";
            console.log(loadingPercent);
            $('.bar').css("width",loadingPercentwithStyle);
            $('.bar').html(loadingPercentwithStyle);


            //loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
        } else {
            //loadingStatus.increment();
        }
    };

    ft.upload(fileURL, uriURL, onSuccess, onError, options);

    function onSuccess(r) {

        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        var responseString = JSON.stringify(r);
        var checkRes = responseString.includes("FormatNotSupported");
        if(checkRes){
            var responsed = JSON.parse(r.response);
            filecount.counter = filecount.counter - 1;
            $("#fileNoSupportError").append('It looks like you are trying to upload an unauthorised file type. Please note, you may only upload files with the following extensions:'+responsed.SuportedFormats+'<br>If you are trying to upload a video, please ensure it is in .mp4 or .mov format. You may use an online converter if necessary e.g. <a href="https://convert-video-online.com/">https://convert-video-online.com/</a>');
            $('.bar').css("width","0%");
            $('.bar').html("");
            //filecount = filecount + 1;
            //filecount.counter = filecount.counter + 1;
            $(".supportbtndiv").attr("style","background: #079469 !important");
            $("#sendsupportbtn").attr("style","background: #079469 !important; pointer-events: unset ");
        }
        else{
            $("#filename").append('<p class="deleteImages" style="margin:0px;"  id='+ fileNameWOSpace + ' >'+fileNameWOSpace+'<span  id='+ fileNameWOSpace + ' style=color:#ef5351; >  &#10006;</span></p><br>');
            $('.bar').css("width","0%");
            $('.bar').html("");
            //filecount = filecount + 1;
            //filecount.counter = filecount.counter + 1;
            $(".supportbtndiv").attr("style","background: #079469 !important");
            $("#sendsupportbtn").attr("style","background: #079469 !important; pointer-events: unset ");
        }


        console.log("Sent = " + r.bytesSent);
    }
    /*function onSuccess(r) {
       $("#filename").append('<p class="deleteImages" style="margin:0px;"  id='+ fileNameWOSpace + ' >'+fileNameWOSpace+'<span  id='+ fileNameWOSpace + ' style=color:#ef5351; >  &#10006;</span></p><br>');
        $('.bar').css("width","0%");
        $('.bar').html("");
        //filecount = filecount + 1;
        //filecount.counter = filecount.counter + 1;
         $(".supportbtndiv").attr("style","background: #079469 !important");
                $("#sendsupportbtn").attr("style","background: #079469 !important; pointer-events: unset ");
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    }*/


    function onError(error) {
        $(".supportbtndiv").attr("style","background: #079469 !important");
            $("#sendsupportbtn").attr("style","background: #079469 !important; pointer-events: unset ");
            msgTitle = resources.connError;
          msgBtnValue = resources.btnOk;
          msgStr = resources.functionConnError;

          navigator.notification.confirm(msgStr, function() {
                                         //hidePleaseWait();
                                         }, msgTitle, msgBtnValue);
                                         filecount.counter = filecount.counter - 1;
        $('.bar').css("width","0%");
                $('.bar').html("");
                 console.log("An error has occurred: Code = " + JSON.stringify(error));
                        console.log("An error has occurred: Code = " + error.code);
                        console.log("upload error source " + error.source);
                        console.log("upload error target " + error.target);
        //alert("An error has occurred: Code = " + error.code);
        //console.log("upload error source " + error.source);
        //console.log("upload error target " + error.target);
    }
}



function deleteHelpdeskFile(getLocal,fileName,returnFunction){
    try {

        if (debug == true) {
            getLocal = true;
        }
        if (getLocal === true) {
            returnFunction(0);
        } else {
            var urlMethod = getBaseUrl();
            var additionalParams = resetParams();
            urlMethod += configs.getCustom("CS_DELETE_HELPDESKMULTIPLEFILE");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            additionalParams.filename=fileName;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey)+ "&param=" + JSON.stringify(additionalParams);
            //var otaData = JSON.stringify(ota);

            urlMethod += params;
            console.log(urlMethod);
            $.ajax({
                url: urlMethod,
                dataType: "json",
                type: "GET",
                async: true,
                success: function(data, textStatus, jqXHR) {
                    //console.log(data);
                  returnFunction(data);
                },
                error: function(msg) {
                  returnFunction(0);
                }
            });
        }
    } catch (e) {}
}

function downloadHDImages(fileName, downloadIssueid){
    $("#helpdeskpage").append(mloadingGif);
    var fileTransfer = new FileTransfer();
    //var uri = "https://studentdesktop.eteacher.pro/data/DownloadIssueFile.aspx?FId=-1&UId="+activeUser.userId+"&PId="+ configs.getCustom("CS_PORTAL_ID")+"&FName="+fileName+"&IsId="+downloadIssueid;
    var uri = "https://upload.eteacher.pro/DownloadIssueFile.aspx?FId=-1&UId="+activeUser.userId+"&PId="+ configs.getCustom("CS_PORTAL_ID")+"&FName="+fileName+"&IsId="+downloadIssueid;
    var folderurl = "file:///storage/emulated/0/Download/"+fileName;

    fileTransfer.download(
    uri,
    folderurl,
    function(entry) {
        $("#mloader").remove();
        msgStr = resources.downloadCompelete;
        msgTitle = resources.downloadFile;
        msgBtnValue = resources.btnOk;
        navigator.notification.confirm(msgStr, function() {
            msgTitle = resources.eclassesNew;
            msgBtnValue = resources.btnViewCancel;
            msgStr = resources.downloadFolder;
            navigator.notification.confirm(msgStr, function(choice) {
                if (choice == 2) {

                }
                else{
                    window.plugins.fileOpener.open(folderurl);
                }
            }, msgTitle, msgBtnValue);
        }, msgTitle, msgBtnValue);
        //console.log("download complete: " + entry.toURL());
    },
    function(error) {
        $("#mloader").remove();
        msgStr = resources.downloadFail;
        msgTitle = resources.downloadFile;
        msgBtnValue = resources.btnOk;
        navigator.notification.confirm(msgStr, function() {

        }, msgTitle, msgBtnValue);
        //alert(JSON.stringify(error));
        //alert(error);
        //alert("download error source " + error.source);
        //console.log("download error target " + error.target);
        //console.log("download error code" + error.code);
    }
    );
}


function getMyAvailableEClasses(getLocal,UTC_offset,isStudentDTS,currentStudentOffset,getTimezoneAbbreviationFn,returnFunction) {
    try {
        var lessonsResultObj;
        var lessonsObj;
        var urlMethod = getBaseUrl();
        urlMethod += configs.getCustom("CS_GET_MYAVAILABLEECLASSES");
        //urlMethod += "CourseService.svc/getMyAvailableEClassesNew";
        var authKey = getAuthKeyUnencrypt();
        var portalKey = getPortalKeyUnencrypt();
        var additionalParams = resetParams();
        additionalParams.UTC_offset = UTC_offset;
        additionalParams.isStudentDTS = isStudentDTS;
        additionalParams.currentStudentOffset = currentStudentOffset;
        additionalParams.getTimezoneAbbreviationFn = getTimezoneAbbreviationFn;
        var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
        urlMethod += params;
        //console.log(urlMethod +"  ----   "+activeUser.userId);
        $.ajax({
            beforeSend: function() {   $("#eClasse").append(mloadingGif); },
            complete: function() {  $("#mloader").remove();  },
            url: urlMethod,
            dataType: "json",
            type: "GET",
            async: true,
            success: function(data, textStatus, jqXHR) {
                if(data!= undefined){
                    //navigator.notification.alert(data);
                    //console.log(data);
                    if(data.getMyAvailableEClassesNewResult.Data == null){
                        returnFunction(0);
                    }
                    else{
                        returnFunction(data);
                    }
                }
                else {
                    returnFunction(0);
                }
            },
            error: function(msg) {
		           returnFunction(0);
            }
        });

    } catch (e) {}
}


function getMyCurrentBookingSchedule(getLocal,returnFunction){
    try {
            var lessonsResultObj;
            var lessonsObj;
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_GET_MYCURRENTBOOKING");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            console.log(urlMethod +"  ----   "+activeUser.userId);
            $.ajax({
                beforeSend: function() {   $("#bookingPage").append(mloadingGif); },
                complete: function() {  $("#mloader").remove();  },
                url: urlMethod,
                dataType: "json",
                type: "GET",
                async: true,
                success: function(data, textStatus, jqXHR) {
                    if(data!= undefined){
                        //navigator.notification.alert(data);
                        //console.log(data);
                        if(data.getCurrentBookingsResult.Data == null){
                            returnFunction(0);
                        }
                        else{
                            returnFunction(data);
                        }
                    }
                    else {
                        returnFunction(0);
                    }
                },
                error: function(msg) {
    		           returnFunction(0);
                }
            });

        } catch (e) {
            returnFunction(0);
        }
}


function deleteCurrentBookingSchedule(AssessmentItemId,AssessmentBookingId,returnFunction){
    try {
            var lessonsResultObj;
            var lessonsObj;
            var urlMethod = getBaseUrl();
            urlMethod += configs.getCustom("CS_GET_MYCURRENTBOOKINGCANCEL");
            var authKey = getAuthKeyUnencrypt();
            var portalKey = getPortalKeyUnencrypt();
            var additionalParams = resetParams();
            additionalParams.assessmentitemid = AssessmentItemId;
            additionalParams.bookingid = AssessmentBookingId;
            var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
            urlMethod += params;
            console.log(urlMethod +"  ----   "+activeUser.userId);
            $.ajax({
                beforeSend: function() {   $("#bookingPage").append(mloadingGif); },
                complete: function() {  $("#mloader").remove();  },
                url: urlMethod,
                dataType: "json",
                type: "GET",
                async: true,
                success: function(data, textStatus, jqXHR) {
                    if(data!= undefined){
                        //navigator.notification.alert(data);
                        console.log(data);
                        if(data.cancelMyCurrentBookingResult == null){
                            returnFunction(0);
                        }
                        else{
                            returnFunction(data);
                        }
                    }
                    else {
                        returnFunction(0);
                    }
                },
                error: function(msg) {
    		           returnFunction(0);
                }
            });

        } catch (e) {
            returnFunction(0);
        }
}
function getMyCurrentEClassSchedule(getLocal,UTC_offset,isStudentDTS,currentStudentOffset,getTimezoneAbbreviationFn,returnFunction) {
    try {
        var lessonsResultObj;
        var lessonsObj;
        var urlMethod = getBaseUrl();
        urlMethod += configs.getCustom("CS_GET_MYCURRENTECLASSES");
        var authKey = getAuthKeyUnencrypt();
        var portalKey = getPortalKeyUnencrypt();
        var additionalParams = resetParams();
        additionalParams.UTC_offset = UTC_offset;
        additionalParams.isStudentDTS = isStudentDTS;
        additionalParams.currentStudentOffset = currentStudentOffset;
        additionalParams.getTimezoneAbbreviationFn = getTimezoneAbbreviationFn;
        var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
        urlMethod += params;
        console.log(urlMethod +"  ----   "+activeUser.userId);
        $.ajax({
            beforeSend: function() {   $("#eClasse").append(mloadingGif); },
            complete: function() {  $("#mloader").remove();  },
            url: urlMethod,
            dataType: "json",
            type: "GET",
            async: true,
            success: function(data, textStatus, jqXHR) {
                if(data!= undefined){
                    //navigator.notification.alert(data);
                    //console.log(data);
                    if(data.GetMyCurrentEClassScheduleResult.Data == null){
                        returnFunction(0);
                    }
                    else{
                        returnFunction(data);
                    }
                }
                else {
                    returnFunction(0);
                }
            },
            error: function(msg) {
		           returnFunction(0);
            }
        });

    } catch (e) {}
}


function bookMyAvailableEClasses(getLocal,eClassScheduleID,returnFunction) {
    try {
        var lessonsResultObj;
        var lessonsObj;
        var urlMethod = getBaseUrl();
        urlMethod += configs.getCustom("CS_GET_BOOKCLASSES");
        var authKey = getAuthKeyUnencrypt();
        var portalKey = getPortalKeyUnencrypt();
        var additionalParams = resetParams();
        additionalParams.eClassScheduleID =eClassScheduleID;
        var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
        urlMethod += params;
        console.log(urlMethod +"  ----   "+activeUser.userId);
        $.ajax({
            beforeSend: function() {   $("#eClasse").append(mloadingGif); },
            complete: function() {  $("#mloader").remove();  },
            url: urlMethod,
            dataType: "json",
            type: "GET",
            async: true,
            success: function(data, textStatus, jqXHR) {
                if(data!= undefined){
                    //navigator.notification.alert(data);
                    console.log(data);

                    returnFunction(data);
                    // }
                }
                else {
                    returnFunction(0);
                }
            },
            error: function(msg) {
		           returnFunction(0);
            }
        });

    } catch (e) {}
}


function cancelMyCurrentClasses(getLocal,eClassBookingId,returnFunction) {
    try {
        var lessonsResultObj;
        var lessonsObj;
        var urlMethod = getBaseUrl();
        urlMethod += configs.getCustom("CS_GET_CANCELBOOKCLASSES");
        var authKey = getAuthKeyUnencrypt();
        var portalKey = getPortalKeyUnencrypt();
        var additionalParams = resetParams();
        additionalParams.eClassBookingId =eClassBookingId;
        var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
        urlMethod += params;
        console.log(urlMethod +"  ----   "+activeUser.userId);
        $.ajax({
            beforeSend: function() {   $("#eClasse").append(mloadingGif); },
            complete: function() {  $("#mloader").remove();  },
            url: urlMethod,
            dataType: "json",
            type: "GET",
            async: true,
            success: function(data, textStatus, jqXHR) {
                if(data!= undefined){
                    //navigator.notification.alert(data);
                    console.log(data);

                    returnFunction(data);
                    // }
                }
                else {
                    returnFunction(0);
                }
            },
            error: function(msg) {
		           returnFunction(0);
            }
        });

    } catch (e) {}
}


function getUpdatedEClassAttendence(getLocal,eClassBookingId,returnFunction) {
    try {
        var lessonsResultObj;
        var lessonsObj;
        var urlMethod = getBaseUrl();
        urlMethod += configs.getCustom("CS_GET_ATTENDBOOKCLASSES");
        var authKey = getAuthKeyUnencrypt();
        var portalKey = getPortalKeyUnencrypt();
        var additionalParams = resetParams();
        additionalParams.eClassBookingId =eClassBookingId;
        var params = "?auth=" + JSON.stringify(authKey) + "&key=" + JSON.stringify(portalKey) + "&param=" + JSON.stringify(additionalParams);
        urlMethod += params;
        console.log(urlMethod +"  ----   "+activeUser.userId);
        $.ajax({
            beforeSend: function() {   $("#eClasse").append(mloadingGif); },
            complete: function() {  $("#mloader").remove();  },
            url: urlMethod,
            dataType: "json",
            type: "GET",
            async: true,
            success: function(data, textStatus, jqXHR) {
                if(data!= undefined){
                    console.log(data);
                    returnFunction(data);

                }
                else {
                    returnFunction(0);
                }
            },
            error: function(msg) {
		           returnFunction(0);
            }
        });

    } catch (e) {}
}