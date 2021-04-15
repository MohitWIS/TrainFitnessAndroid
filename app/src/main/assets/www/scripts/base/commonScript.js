//console.log("in Coomonscript")
function getSCOListLinkedToOTAExam(OTAStudentExamID, ret){
  var coController = new Controller();
  coController.getSCOListLinkedToOTAExam(OTAStudentExamID,function(ret){
    console.log(ret);
    var SCOList = ret.getSCOListLinkedToOTAExamResult.Data.scoListLinkedToOTAExam.scoList;

  
    var SCOListArr = "";
    for(var i = 0 ; i< SCOList.length; i++){
      SCOListArr += "<div style=padding-left:35px>-"+SCOList[i].SCOName +"</div>";
    } 
    var SCOListAppend =  "<br><br><span><b>"+resources.SCOSList+"</b></span><br>"+SCOListArr;
    $("#quizResult").append(SCOListAppend);
  });
}