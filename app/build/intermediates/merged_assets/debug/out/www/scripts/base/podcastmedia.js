var currentDownloadPodItem = 0;
var currentDownloadVidItem = 0;
var currentDownloadAudItem = 0;
var podcastThumbnailDefaultUrl = "";
swipedelementid="";
var Podcast = function(id, courseid, moduleid, coursetitle, moduletitle, thumbnail, alldownloaded, haspdf, isdefaultthumbnail, localthumbnail, itemcount) {
    try {
        this.init(id, courseid, moduleid, coursetitle, moduletitle, thumbnail, alldownloaded, haspdf, isdefaultthumbnail, localthumbnail, itemcount);
    } catch (e) {
        errorHandler("Podcast", e);
    }
};
Podcast.prototype = {
init: function(id, courseid, moduleid, coursetitle, moduletitle, thumbnail, alldownloaded, haspdf, isdefaultthumbnail, localthumbnail, itemcount) {
    try {
        if (id === undefined) {
            id = 0;
        }
        if (courseid === undefined) {
            courseid = 0;
        }
        if (moduleid === undefined) {
            moduleid = 0;
        }
        if (thumbnail === undefined) {
            thumbnail = "";
        }
        if (localthumbnail === undefined) {
            localthumbnail = "";
        }
        if (coursetitle === undefined) {
            coursetitle = "";
        }
        if (moduletitle === undefined) {
            moduletitle = "";
        }
        if (alldownloaded === undefined) {
            alldownloaded = false;
        }
        if (haspdf === undefined) {
            haspdf = false;
        }
        if (isdefaultthumbnail === undefined) {
            isdefaultthumbnail = true;
        }
        if (itemcount === undefined) {
            itemcount = 0;
        }
        this.id = id;
        this.courseid = courseid;
        this.moduleid = moduleid;
        this.coursetitle = coursetitle;
        this.moduletitle = moduletitle;
        if (thumbnail !== undefined && thumbnail.length > 0) {
            if (thumbnail.length > 0 && thumbnail.indexOf("www.") > -1 && (thumbnail.indexOf("http://") < 0 || thumbnail.indexOf("https://") < 0)) {
                thumbnail =  thumbnail;
            }
        } else {
            this.thumbnail = thumbnail;
        }
        this.thumbnail = thumbnail;
        this.localthumbnail = localthumbnail;
        this.alldownloaded = alldownloaded;
        this.haspdf = haspdf;
        this.itemcount = itemcount;
        this.items = new Array();
        this.isdefaultthumbnail = isdefaultthumbnail;
        if (podcastThumbnailDefaultUrl.length > 0 && this.isdefaultthumbnail === true) {
            this.localthumbnail = podcastThumbnailDefaultUrl;
        }
        return this;
    } catch (e) {
        errorHandler("Podcast.init", e);
        return undefined;
    }
},
getPodcastLi: function(returnFunction) {
    try {
        var podcastStr = "";
        if (this.items != undefined && this.items.length > 0) {
            podcastStr += "<li class='catli podcastli ui-list-divider downloadallli' data-theme='h'><div class='podcastlidiv'>";
            
            if (this.alldownloaded === true) {
                
                podcastStr += "<a id='deleteallpoditems-" + this.id + "' href='#' class='deleteallpodsbtn'>";
                podcastStr += "<div class='podcastitemdivdownload' id='podcastitemdiv-" + this.id + "'>";
                podcastStr += resources.deleteallmedia + "</div></a>";
            } else {
                podcastStr += "<a  id='downloadallpods-" + this.id + "' href='#' class='downloadallpodsbtn'>";
                podcastStr += "<div class='podcastitemdivdownload' id='podcastitemdiv-" + this.id + "'>";
                podcastStr += resources.downloadallmedia + "</div></a>";
            }
            podcastStr += "</div></li>";
            for (var i = 0; i < this.items.length; i++) {
                var podItem = this.items[i];
                if (i === 0 && this.haspdf === true) {
                    podcastStr += podItem.getPodcastItemPDFLi(i + 1);
                } else {
                    podcastStr += podItem.getPodcastItemLi(i + 1);
                }
            }
        }
        returnFunction(podcastStr);
    } catch (e) {
        errorHandler("Podcast.getPodcastLi", e);
        returnFunction("");
    }
},
getPodcastItemById: function(podcastItemId) {
    try {
        var podcastItem;
        if (this.items != undefined) {
            for (var i = 0; i < this.items.length; i++) {
                var p = this.items[i];
                if (p.id === podcastItemId) {
                    podcastItem = p;
                    return podcastItem;
                }
            }
        }
        return podcastItem;
    } catch (e) {
        errorHandler("Podcast.getPodcastItemById", e);
        return undefined;
    }
},
setItems: function(poditems) {
    try {
        this.items = new Array();
        var podcastItem;
        var podcastItemObj;
        for (var i = 0; i < poditems.length; i++) {
            podcastItemObj = poditems[i];
            if (podcastItemObj.Type === "pdf") {
                this.haspdf = true;
            }
            podcastItem = new PodcastItem(this.id, podcastItemObj.PodcastItemId, podcastItemObj.Link, podcastItemObj.Title, podcastItemObj.Type, podcastItemObj.Length, false, "", podcastItemObj.FileName, -1, i);
            this.items.push(podcastItem);
        }
        return true;
    } catch (e) {
        errorHandler("setItems", e);
        return undefined;
    }
},
downloadAllPodcastItems: function(setProgress, returnFunction) {
    try {
        if (this.items != undefined && this.items.length > 0) {
            var i = 0;
            var podcastitem;
            if (this.alldownloaded === true) {
                returnFunction(true);
            } else {
                var podId = this.id;
                if ($("#podcastitemdiv-" + podId).hasClass("downloadingfiles")){
                    returnFunction(true);
                }else{
                    $("#podcastitemdiv-" + podId).addClass("downloadingfiles");
                    $("#podcastitemdiv-" + podId).html(resources.downloadingall);
   
               
                    for (i = 0; i < this.items.length; i++) {
                        podcastitem = this.items[i];
                        if (podcastitem.isdownloaded === false && podcastitem.downloading === -1) {
                            if (setProgress) {
                                podcastitem.setDownloadPodcastItem(function() {});
                            }
                            podcastitem.downloading = 0;
                            podcastitem.downloadPodcastItem(function(ret) {});
                        }
                            
                     }
                    
                    activeUser.saveFilesList(undefined, "podcasts", false, function() {});
                    setTimeout(function(){$("#podcastitemdiv-" + podId).removeClass("downloadingfiles");}, 600);
                }
            }
        } else {
            returnFunction(true);
        }
    } catch (e) {
        errorHandler("Podcast.downloadAllPodcastItems", e);
        returnFunction(false);
    }
},
deleteAllPodcastItems: function(returnFunction) {
    try {
        if (this.items != undefined) {
            for (var i = 0; i < this.items.length; i++) {
                var p = this.items[i];
                var that = this;
                p.deletePodcastItem(function(ret) {});
            }
            if (this.alldownloaded === true) {
                this.alldownloaded = false;
            }
            activeUser.saveFilesList(undefined, "podcasts", false, function() {});
            var podBtnId = "deleteallpoditems-" + this.id;
            var newDeleteBtnId = podBtnId.replace("deleteallpoditems-", "downloadallpods-");
            $("#" + podBtnId).attr("id", newDeleteBtnId);
            $("#" + newDeleteBtnId).removeClass("ui-btn-active").removeClass("downloadallpodsbtn").addClass("deleteallpodsbtn");
            $("#podcastitemdiv-" + this.id).html(resources.downloadallmedia);
        }
        returnFunction(true);
    } catch (e) {
        errorHandler("Podcast.deleteAllPodcastItems", e);
        returnFunction(false);
    }
}
};
var PodcastItem = function(podcastid, id, link, title, type, length, isdownloaded, fileuri, filename, downloading, index) {
    try {
        this.init(podcastid, id, link, title, type, length, isdownloaded, fileuri, filename, downloading, index);
    } catch (e) {
        errorHandler("PodcastItem", e);
    }
};
PodcastItem.prototype = {
init: function(podcastid, id, link, title, type, length, isdownloaded, fileuri, filename, downloading, index) {
    try {
        if (id === undefined) {
            id = 0;
        }
        if (podcastid === undefined) {
            podcastid = 0;
        }
        if (title === undefined) {
            title = "";
        }
        if (link === undefined) {
            link = "";
        }
        if (type === undefined) {
            type = "";
        }
        if (length === undefined) {
            length = 0;
        }
        if (index === undefined) {
            index = 0;
        }
        if (isdownloaded === undefined) {
            isdownloaded = "false";
        }
        if (fileuri === undefined) {
            fileuri = "";
        }
        if (filename === undefined) {
            filename = "";
        }
        if (downloading === undefined) {
            downloading = -1;
        }
        this.id = id;
        this.podcastid = podcastid;
        this.title = title;
        this.link = link;
        this.type = type;
        this.length = length;
        this.isdownloaded = isdownloaded;
        this.fileuri = fileuri;
        this.filename = filename;
        this.index = index;
        this.downloading = downloading;
        if (this.isdownloaded === false && this.downloading === -1 && mediaInit === true) {
            var ids = this.podcastid.split("-");
            var moduleDir = ids[0].toString() + "-" + ids[1].toString();
            var localFileName = this.filename;
            var that = this;
            localFileExists(theoryMediaDir, moduleDir, localFileName, that, "podcasts", false, false, false, function(ret) {
                            if (ret === true) {
                            activeUser.saveFilesList(undefined, "podcasts", false, function() {});
                            }
                            });
        }
        return this;
    } catch (e) {
        errorHandler("PodcastItem.init", e);
        return undefined;
    }
},
getPodcastItemPDFLi: function(itemNo) {
    try {
        var itemId = this.podcastid + "-" + this.id;
        var itemsStr = "<li class='catli podcastli' data-theme='h'><div class='podcastlidiv'>";
        var icontype = "podcastpdfdiv";
        var typeStr = "<div class='icontypediv " + icontype + "'></div>";
        itemsStr += "<a  id='playpoditem-" + itemId + "' href='#' class='playpdfpoditembtn'>";
        itemsStr += "<div class='playitembtn'></div>";
        itemsStr += "<div class='podcastitemdiv podtitlesingleline' id='theoryitemdiv-" + itemId + "'>" + this.title + "</div></a>";
        itemsStr += typeStr;
        var divProgressbar = "<div id='podprogressbarwrapper-" + itemId + "' class='progressbarwrapper ";
        if (this.downloading === -1) {
            divProgressbar += " nodisplay";
        }
        divProgressbar += "'><div id='podprogressbar-" + itemId + "' class='mediaprogressbar'><div class='progressbardetail' id='podprogressbarspan-" + itemId + "'>";
        if (this.downloading !== -1) {
            divProgressbar += this.downloading + resources.percent;
        }
        divProgressbar += "</div></div></div>";
        if (this.isdownloaded === true) {
            itemsStr += "<div class='mediabuttonsdiv' style='width: 10.4%'>";
            itemsStr += divProgressbar;
            itemsStr += "<a  id='deletepoditem-" + itemId + "' href='#' class='deletepdfpoditembtn'><div class='videolistbtn'></div></a>";
            itemsStr += "</div>";
        } else {
            itemsStr += "<div class='mediabuttonsdiv' style='width: 10.4%'>";
            itemsStr += divProgressbar;
            itemsStr += "<a  id='downloadpoditem-" + itemId + "' href='#' class='downloadpdfpoditembtn ";
            if (this.downloading !== -1) {
                itemsStr += " nodisplay";
            }
            itemsStr += "'><div class='videolistbtn'></div></a>";
            itemsStr += "</div>";
        }
        itemsStr += "</div></li>";
        return itemsStr;
    } catch (e) {
        errorHandler("Podcast.getPodcastItemPDFLi", e);
        return "";
    }
},
getPodcastItemLi: function(itemNo) {
    try {
        var itemId = this.podcastid + "-" + this.id;
        var itemsStr = "<li class='catli podcastli' data-theme='h'><div class='podcastlidiv'>";
        var icontype = this.type === "audio" ? "podcastmp3div" : "podcastvideodiv";
        var typeStr = "<div class='icontypediv " + icontype + "'></div>";
        itemsStr += "<a  id='playpoditem-" + itemId + "' href='#' class='playpoditembtn'>";
        itemsStr += "<div class='playitembtn'></div>";
        var title = (this.title.length > 90) ? this.title.substring(0, 86) + " ..." : this.title;
        var titleSingleLine = tablet === true ? (title.length > 70 ? false : true) : (title.length > 40 ? false : true);
        itemsStr += "<div class='podcastitemdiv ";
        itemsStr += titleSingleLine === true ? " podtitlesingleline" : "";
        itemsStr += "' id='theoryitemdiv-" + itemId + "'>" + title + "</div></a>";
        itemsStr += typeStr;
        var divProgressbar = "<div id='podprogressbarwrapper-" + itemId + "' class='progressbarwrapper ";
        if (this.downloading === -1) {
            divProgressbar += " nodisplay";
        }
        divProgressbar += "'><div id='podprogressbar-" + itemId + "' class='mediaprogressbar'><div class='progressbardetail' id='podprogressbarspan-" + itemId + "'>";
        if (this.downloading !== -1) {
            divProgressbar += this.downloading + resources.percent;
        }
        divProgressbar += "</div></div></div>";
        if (this.isdownloaded === true) {
            itemsStr += "<div class='mediabuttonsdiv' style='width: 10.4%'>";
            itemsStr += divProgressbar;
            itemsStr += "<a  id='deletepoditem-" + itemId + "' href='#' class='deletepoditembtn'><div class='videolistbtn'></div></a>";
            itemsStr += "</div>";
        } else {
            itemsStr += "<div class='mediabuttonsdiv' style='width: 10.4%'>";
            itemsStr += divProgressbar;
            itemsStr += "<a  id='downloadpoditem-" + itemId + "' href='#' class='downloadpoditembtn ";
            if (this.downloading !== -1) {
                itemsStr += " nodisplay";
            }
            itemsStr += "'><div class='videolistbtn'></div></a>";
            itemsStr += "</div>";
        }
        itemsStr += "</div></li>";
        return itemsStr;
    } catch (e) {
        errorHandler("PodcastItem.getPodcastItemLi", e);
        return "";
    }
},
setDownloadPodcastItem: function(returnFunction) {
    try {
        var btnId = "downloadpoditem-" + this.podcastid + "-" + this.id;
        $("#" + btnId).addClass("ui-btn-active");
        var progressId = btnId.replace("downloadpoditem-", "podprogressbarwrapper-");
        var progressBarId = btnId.replace("downloadpoditem-", "podprogressbar-");
        var progressSpanId = btnId.replace("downloadpoditem-", "podprogressbarspan-");
        $("#" + btnId).hide();
        $("#" + progressId).show();
        $("#" + progressBarId).show();
        $("#" + progressSpanId).show();
        var percpercent = "0" + resources.percent;
        $("#" + progressSpanId).html(percpercent);
    } catch (e) {
        errorHandler("Podcast.setDownloadPodcastItem", e);
        returnFunction(false);
    }
},
downloadPodcastItem: function(returnFunction) {
    try {
        var ignoreDownload = false;
        var ids = this.podcastid.split("-");
        var moduleDir = ids[0].toString() + "-" + ids[1].toString();
        var localFileName = this.filename;
        var remoteUrl = (this.link.indexOf("https:") < 0) ? "https://" + this.link : this.link;
        for (var x = 0; x < mediaToDownload.length; x++) {
            var item = mediaToDownload[x];
            if (item.fileListType === "podcasts") {
                if (item.localFileName === localFileName && item.itemDirStr === moduleDir && item.remoteMediaFileUrl === remoteUrl) {
                    ignoreDownload = true;
                    break;
                }
            }
        }
        var btnId = "downloadpoditem-" + this.podcastid + "-" + this.id;
        $("#" + btnId).addClass("ui-btn-active");
        var progressId = btnId.replace("downloadpoditem-", "podprogressbarwrapper-");
        var progressBarId = btnId.replace("downloadpoditem-", "podprogressbar-");
        var progressSpanId = btnId.replace("downloadpoditem-", "podprogressbarspan-");
        var newBtnId = btnId.replace("downloadpoditem-", "deletepoditem-");
        $("#" + btnId).hide();
        $("#" + progressId).show();
        $("#" + progressBarId).show();
        $("#" + progressSpanId).show();
        $("#" + progressSpanId).html("0" + resources.percent);
        if (ignoreDownload === false) {
            this.downloading = 0;
            var mediadownload = {};
            mediadownload.rootMediaDir = theoryMediaDir;
            mediadownload.itemDirStr = moduleDir;
            mediadownload.localFileName = localFileName;
            mediadownload.remoteMediaFileUrl = remoteUrl;
            mediadownload.showProgress = true;
            mediadownload.btnId = btnId;
            mediadownload.newBtnId = newBtnId;
            mediadownload.progressId = progressId;
            mediadownload.progressBarId = progressBarId;
            mediadownload.progressStatusId = "";
            mediadownload.progressSpanId = progressSpanId;
            mediadownload.fileListType = "podcasts";
            mediadownload.item = this;
            mediadownload.downloading = 0;
            mediaToDownload.push(mediadownload);
            downloadMediaItems(function(ret) {
                               returnFunction(ret);
                               });
        }
    } catch (e) {
        errorHandler("Podcast.downloadPodcastItem", e);
        returnFunction(false);
    }
    returnFunction(true);
},
deletePodcastItem: function(returnFunction) {
    try {
        var ids = this.podcastid.split("-");
        var moduleDir = ids[0].toString() + "-" + ids[1].toString();
        var localFileName = this.filename;
        var btnId = "deletepoditem-" + this.podcastid + "-" + this.id;
        var newBtnId = "downloadpoditem-" + this.podcastid + "-" + this.id;
        var that = this;
        if (theoryMediaDir != undefined) {
            theoryMediaDir.getDirectory(moduleDir, {
                                        create: false,
                                        exclusive: false
                                        }, function(itemDir) {
                                        itemDir.getFile(localFileName, {
                                                        create: false,
                                                        exclusive: true
                                                        }, function(fileEntry) {
                                                        var newClass = that.type === "pdf" ? "downloadpdfpoditembtn" : "downloadpoditembtn";
                                                        $("#" + btnId).removeClass("ui-btn-active").removeClass("deletepoditembtn").removeClass("deletepdfpoditembtn").addClass(newClass);
                                                        $("#" + btnId).attr("id", newBtnId);
                                                        
                                                        that.isdownloaded = false;
                                                        that.downloading = -1;
                                                        that.fileuri = "";
                                                        activeUser.saveFilesList(undefined, "podcasts", false, function() {});
                                                        fileEntry.remove();
                                                        returnFunction(true);
                                                        }, function() {
                                                        var newClass = that.type === "pdf" ? "downloadpdfpoditembtn" : "downloadpoditembtn";
                                                        $("#" + btnId).removeClass("ui-btn-active").removeClass("deletepoditembtn").removeClass("deletepdfpoditembtn").addClass(newClass);
                                                        $("#" + btnId).attr("id", newBtnId);
                                                        that.isdownloaded = false;
                                                        that.downloading = -1;
                                                        that.fileuri = "";
                                                        activeUser.saveFilesList(undefined, "podcasts", false, function() {});
                                                        returnFunction(true);
                                                        });
                                        }, function() {
                                        var newClass = that.type === "pdf" ? "downloadpdfpoditembtn" : "downloadpoditembtn";
                                        $("#" + btnId).removeClass("ui-btn-active").removeClass("deletepoditembtn").removeClass("deletepdfpoditembtn").addClass(newClass);
                                        $("#" + btnId).attr("id", newBtnId);
                                        
                                        that.isdownloaded = false;
                                        that.downloading = -1;
                                        that.fileuri = "";
                                        activeUser.saveFilesList(undefined, "podcasts", false, function() {});
                                        returnFunction(true);
                                        });
        }
    } catch (e) {
        errorHandler("User.deletePodcastItem", e);
        returnFunction(false);
    }
}
};
var VideoCategory = function(tabid, categorytitle, categoryid, seriesid, category, categoryname, videocount, vieworder, alldownloaded, thumbnail, localthumbnail, videonoteurl, hasvideonotes) {
    try {
        this.init(tabid, categorytitle, categoryid, seriesid, category, categoryname, videocount, vieworder, alldownloaded, thumbnail, localthumbnail, videonoteurl, hasvideonotes);
    } catch (e) {
        errorHandler("VideoCategory", e);
    }
};
VideoCategory.prototype = {
init: function(tabid, categorytitle, categoryid, seriesid, category, categoryname, videocount, vieworder, alldownloaded, thumbnail, localthumbnail, videonoteurl, hasvideonotes) {
    try {
        if (tabid === undefined) {
            tabid = 0;
        }
        if (categorytitle === undefined) {
            categorytitle = "";
        }
        if (categoryid === undefined) {
            categoryid = 0;
        }
        if (category === undefined) {
            category = "";
        }
        if (categoryname === undefined) {
            categoryname = "";
        }
        if (videocount === undefined) {
            videocount = 0;
        }
        if (vieworder === undefined) {
            vieworder = "";
        }
        if (alldownloaded === undefined) {
            alldownloaded = false;
        }
        if (seriesid === undefined) {
            seriesid = 0;
        }
        if (localthumbnail === undefined) {
            localthumbnail = "";
        }
        if (thumbnail === undefined) {
            thumbnail = "";
        }
        if (thumbnail !== undefined && thumbnail.length > 0) {
            if (thumbnail.length > 0 && (thumbnail.indexOf("http://") < 0 || thumbnail.indexOf("https://") < 0) && thumbnail.indexOf("www.") > -1) {
                thumbnail = thumbnail;
            }
        } else {
            this.thumbnail = thumbnail;
        }
        if (videonoteurl === undefined) {
            videonoteurl = "";
        }
        if (hasvideonotes === undefined) {
            hasvideonotes = false;
        }
        this.tabid = tabid;
        this.categorytitle = categorytitle;
        this.categoryid = categoryid;
        this.seriesid = seriesid;
        this.category = category;
        this.categoryname = categoryname;
        this.videocount = videocount;
        this.vieworder = vieworder;
        this.alldownloaded = alldownloaded;
        this.thumbnail = thumbnail;
        this.localthumbnail = localthumbnail;
        this.videonoteurl = videonoteurl;
        this.hasvideonotes = hasvideonotes;
        this.videocategories = new Array();
        this.videos = new Array();
        var extension = "mp4";
        return this;
    } catch (e) {
        errorHandler("VideoCategory.init", e);
    }
},
setVideos: function(videosObj) {
    try {
        this.videos = new Array();
        if (videosObj != undefined) {
            var video;
            var videoObj;
            var isDownloaded = false;
            var filePath = "";
            var extension = "mp4";
            var fileid = "";
            var remoteMediaFileUrl = "";
            var thumbnailPath = "";
            if (videosObj.length === undefined) {
                videoObj = videosObj;
                fileid = videoObj.VideoId + extension;
                isDownloaded = false;
                filePath = videoObj.H264VideoPath;
                thumbnailPath = videoObj.Thumbnail;
                if ((thumbnailPath.indexOf("http://") < 0 || thumbnailPath.indexOf("https://") < 0) && thumbnailPath.indexOf("www.") > -1) {
                    thumbnailPath = thumbnailPath;
                }
                var vidid = this.tabid + "-" + videoObj.CategoryId;
                video = new VideoItem(fileid, videoObj.VideoId + "." + extension, vidid, videoObj.Title, videoObj.Length, videoObj.AspectRatio, filePath, thumbnailPath, this.seriesid, 1, isDownloaded, -1, "");
                this.videos.push(video);
                if (this.thumbnail.length === 0 && thumbnailPath.length > 0) {
                    this.thumbnail = thumbnailPath;
                }
                return true;
            } else {
                for (var i = 0; i < videosObj.length; i++) {
                    videoObj = videosObj[i];
                    fileid = videoObj.VideoId + extension;
                    isDownloaded = false;
                    thumbnailPath = videoObj.Thumbnail;
                    if ((thumbnailPath.indexOf("http://") < 0 || thumbnailPath.indexOf("https://") < 0) && thumbnailPath.indexOf("www.") > -1) {
                        thumbnailPath = thumbnailPath;
                    }
                    filePath = videoObj.H264VideoPath;
                    var vidid1 = this.tabid + "-" + videoObj.CategoryId;
                    video = new VideoItem(fileid, videoObj.VideoId + "." + extension, vidid1, videoObj.Title, videoObj.Length, videoObj.AspectRatio, filePath, thumbnailPath, this.seriesid, (i + 1), isDownloaded, -1, "");
                    this.videos.push(video);
                    if (this.thumbnail.length === 0 && thumbnailPath.length > 0) {
                        this.thumbnail = thumbnailPath;
                    }
                }
                return true;
            }
        } else {
            return true;
        }
    } catch (e) {
        errorHandler("VideoCategory.setVideos", e);
        return false;
    }
},
getVideoCategoryLi: function(videoType, returnFunction) {
    try {
        var podcastStr = "";
        var downloadAllClass = videoType==="videocategories" ? "downloadallvideosbtn" : "downloadalleclassbtn";
        var deleteAllClass = videoType==="videocategories" ? "deleteallvideosbtn" : "deletealleclassbtn";
        if (this.videos != undefined && this.videos.length > 0) {
            podcastStr += "<li class='catli podcastli ui-list-divider downloadallli' data-theme='h'><div class='podcastlidiv'>";
            podcastStr += "<div class='podcastitemdiv podcastitemdivdownload' style='width: 100% !important;padding-left: 0% !important;' id='podcastitemdiv-" + this.tabid + "-" + this.categoryid + "'>";
            var itemId = this.tabid + "-" + this.categoryid + "-" + this.seriesid;
            var videoDownloading=false;
            if (this.alldownloaded === false) {
                var allDownloadedUpdate = true;
                for (var x = 0; x < this.videos.length; x++) {
                    var vid = this.videos[x];
                    if(vid.downloading > -1){
                        videoDownloading=true;
                        allDownloadedUpdate = false;
                        break;
                    }
                    if (vid.isdownloaded === false) {
                        allDownloadedUpdate = false;
                    }
                }
                if (allDownloadedUpdate !== this.alldownloaded) {
                    this.alldownloaded = allDownloadedUpdate;
                    activeUser.saveFilesList(undefined, videoType, false, function() {});
                }
            }
            var downloadString = videoDownloading===true ? resources.downloadingall : resources.downloadallvideos;
            if (this.alldownloaded === true) {
                
                podcastStr += "<a id='" + deleteAllClass + "-" + itemId + "' href='#' class='" + deleteAllClass + "'>";
                podcastStr += "<div style='padding:left:0% !important;' class='podcastitemdivdownload' id='podcastitemdiv-" + itemId + "'>";
                podcastStr += resources.deleteallvideos + "</div></a>";
            } else {
                podcastStr += "<a  id='" + downloadAllClass + "-" + itemId + "' href='#' class='" + downloadAllClass + "'>";
                podcastStr += "<div style='padding-left:0% !important;' class='podcastitemdivdownload' id='podcastitemdiv-" + itemId + "'>";
                podcastStr += downloadString + "</div></a>";
            }
            podcastStr += "</div></li>";
            
            if(videoType==="videocategories" && this.videonoteurl!==undefined && this.videonoteurl.length > 5){
                
                podcastStr += "<li class='catli podcastli ui-list-divider downloadnotesli' data-theme='h'><div class='podcastlidiv'>";
                podcastStr += "<div style='width: 100% !important;padding-left: 0% !important;'  class='podcastitemdiv videonotesdivdownload' id='podcastitemnotesdiv-" + this.tabid + "-" + this.categoryid + "'>";
                podcastStr += "<a  id='downloadnotesbtn-" + itemId + "' href='#' class='downloadnotesbtn'>";
                podcastStr += "<div style='padding-left:0% !important;' class='podcastitemdivnotes' id='podcastitemdiv-" + itemId + "'>";
                podcastStr += resources.viewnotes + "</div></a>";
                podcastStr += "</div></li>";
            }
            
            for (var i = 0; i < this.videos.length; i++) {
                var video = this.videos[i];
                podcastStr += video.getVideoItemLi(videoType);
            }
        }
    } catch (e) {
        errorHandler("VideoCategory.getVideoCategoryLi", e);
    }
    returnFunction(podcastStr);
},
deleteAllVideoItems: function(videoType, returnFunction) {
    try {
        var deleteAllClassId = videoType==="videocategories" ? "deleteallvideosbtn-" : "deletealleclassbtn-";
        var downloadAllClassId = videoType==="videocategories" ? "downloadallvideosbtn-" : "downloadalleclassbtn-";
        var deleteAllClass = videoType==="videocategories" ? "deleteallvideosbtn" : "deletealleclassbtn";
        var downloadAllClass = videoType==="videocategories" ? "downloadallvideosbtn" : "downloadalleclassbtn";
        
        if (this.videos != undefined) {
            for (var i = 0; i < this.videos.length; i++) {
                var v = this.videos[i];
                v.deleteVideoItem(videoType, function(ret) {});
            }
            if (this.alldownloaded === true) {
                this.alldownloaded = false;
                activeUser.saveFilesList(undefined, videoType, false, function() {});
            }
            var videoBtnId = deleteAllClassId + this.tabid + "-" + this.categoryid + "-" + this.seriesid;
            var newDeleteBtnId = downloadAllClassId + this.tabid + "-" + this.categoryid + "-" + this.seriesid;
            $("#" + videoBtnId).attr("id", newDeleteBtnId);
            $("#" + newDeleteBtnId).removeClass("ui-btn-active").removeClass(deleteAllClass).addClass(downloadAllClass);
            $("#podcastitemdiv-" + this.tabid + "-" + this.categoryid).html(resources.downloadallvideos);
        }
        returnFunction(true);
    } catch (e) {
        errorHandler("VideoCategory.deleteAllVideoItems", e);
    }
},
downloadAllVideoItems: function(setProgress, videoType, returnFunction) {
    try {
        if (this.videos != undefined && this.videos.length > 0) {
            var i = 0;
            var viditem;
            if (this.alldownloaded === true) {
                returnFunction(true);
            } else {
                
                var vidCatId = this.tabid + "-" + this.categoryid + "-" + this.seriesid;
                if ($("#podcastitemdiv-" + vidCatId).hasClass("downloadingfiles")){
                    returnFunction(true);
                }else{
                    $("#podcastitemdiv-" + vidCatId).addClass("downloadingfiles");
                    $("#podcastitemdiv-" + vidCatId).html(resources.downloadingall);
                    for (i = 0; i < this.videos.length; i++) {
                        viditem = this.videos[i];
                        if (viditem.isdownloaded === false && viditem.downloading === -1) {
                            viditem.downloading = 0;
                            viditem.downloadVideoItem(setProgress, videoType, function(ret) {});
                        }
                    }
                    activeUser.saveFilesList(undefined, videoType, false, function() {});
                    returnFunction(true);
                }
            }
        } else {
            returnFunction(true);
        }
    } catch (e) {
        errorHandler("VideoCategory.downloadAllVideoItems", e);
        returnFunction(false);
    }
},
getVideoPlaylist: function(returnFunction) {
    try {
        var playlist = [];
        if (this.videos != undefined && this.videos.length > 0) {
            for (var i = 0; i < this.videos.length; i++) {
                var playlistItem = {};
                var video = this.videos[i];
                playlistItem.id = video.categoryid + "-" + video.seriesid + "-" + video.videoid;
                playlistItem.videoid = video.videoid;
                playlistItem.url = (video.isdownloaded === true) ? video.fileuri : video.videopath;
                playlistItem.title = video.title;
                playlist.push(playlistItem);
            }
        }
        returnFunction(playlist);
    } catch (e) {
        errorHandler("VideoCategory.getVideoPlaylist", e);
    }
},
getVideoItemById: function(videoItemId) {
    try {
        var videoItem;
        if (this.videos != undefined) {
            for (var i = 0; i < this.videos.length; i++) {
                var p = this.videos[i];
                if (p.videoid === videoItemId) {
                    videoItem = p;
                    break;
                }
            }
        }
        return videoItem;
    } catch (e) {
        errorHandler("VideoCategory.getVideoItemById", e);
    }
}
};
var VideoItem = function(videoid, filename, categoryid, title, length, aspectratio, videopath, thumbnail, seriesid, seriesindex, isdownloaded, downloading, fileuri) {
    try {
        this.init(videoid, filename, categoryid, title, length, aspectratio, videopath, thumbnail, seriesid, seriesindex, isdownloaded, downloading, fileuri);
    } catch (e) {
        errorHandler("VideoItem", e);
    }
};
VideoItem.prototype = {
init: function(videoid, filename, categoryid, title, length, aspectratio, videopath, thumbnail, seriesid, seriesindex, isdownloaded, downloading, fileuri) {
    try {
        if (videoid === undefined) {
            videoid = "";
        }
        if (filename === undefined) {
            filename = "";
        }
        if (categoryid === undefined) {
            categoryid = 0;
        }
        if (title === undefined) {
            title = "";
        }
        if (length === undefined) {
            length = 0;
        }
        if (aspectratio === undefined) {
            aspectratio = "";
        }
        if (length === undefined) {
            length = 0;
        }
        if (videopath === undefined) {
            videopath = "";
        }
        if (fileuri === undefined) {
            fileuri = "";
        }
        if (thumbnail === undefined) {
            thumbnail = "";
        }
        if (seriesid === undefined) {
            seriesid = 0;
        }
        if (seriesindex === undefined) {
            seriesindex = 0;
        }
        if (isdownloaded === undefined) {
            isdownloaded = false;
        }
        if (downloading === undefined) {
            downloading = -1;
        }
        this.videoid = videoid;
        this.filename = filename;
        this.categoryid = categoryid;
        this.seriesid = seriesid;
        this.title = title;
        this.length = length;
        this.aspectratio = aspectratio;
        this.length = length;
        if (videopath.length > 0 && (videopath.indexOf("http://") < 0 || videopath.indexOf("https://") < 0) && videopath.indexOf("www.") > -1) {
            videopath = videopath;
        }
        this.videopath = videopath;
        this.fileuri = fileuri;
        if (thumbnail !== undefined && thumbnail.length > 0) {
            this.thumbnail = ((thumbnail.indexOf("http://") === -1 || thumbnail.indexOf("https://") === -1) && thumbnail.indexOf("www.") > -1) ?  thumbnail : thumbnail;
        } else {
            this.thumbnail = thumbnail;
        }
        this.seriesindex = seriesindex;
        this.isdownloaded = isdownloaded;
        this.downloading = downloading;
        return this;
    } catch (e) {
        errorHandler("VideoItem.init", e);
    }
},
getVideoItemLi: function(videoType) {
    try {
        var playVidClass = videoType==="videocategories" ? "playvideobtn" : "playeclassbtn";
        var deleteVidClass = videoType==="videocategories" ? "deletevideobtn" : "deleteeclassbtn";
        var downloadVidClass = videoType==="videocategories" ? "downloadvideobtn" : "downloadeclassbtn";
        var itemId = this.categoryid + "-" + this.seriesid + "-" + this.videoid;
        var itemsStr = "<li class='catli podcastli' data-theme='h'><div class='podcastlidiv'>";
        var itemNo = this.seriesindex;
        itemsStr += "<a  id='playvideo-" + itemId + "' href='#' class='" + playVidClass + "'>";
        itemsStr += "<div class='playitembtn'></div>";
        var title = $.trim(this.title);
        title = this.title;
        itemsStr += "<div class='podcastitemdiv";
        itemsStr += "' id='podcastitemdiv-" + itemId + "'>" + title + "</div></a>";
        var divProgressbar = "<div id='progressbarwrapper-" + itemId + "' class='progressbarwrapper ";
        if (this.downloading === -1) {
            divProgressbar += " nodisplay";
        }
        divProgressbar += "'><div id='progressbar-" + itemId + "' class='mediaprogressbar'><div class='progressbardetail' id='progressbarspan-" + itemId + "'>";
        if (this.downloading !== -1) {
            divProgressbar += this.downloading + resources.percent;
        }
        divProgressbar += "</div></div></div>";
        var deleteitemid = videoType==="videocategories" ? "deletevideo-" : "deleteeclass-";
        var downloaditemid = videoType==="videocategories" ? "downloadvideo-" : "downloadeclass-";
        if (this.isdownloaded === true) {
            itemsStr += "<div class='mediabuttonsdiv'>";
            itemsStr += divProgressbar;
            itemsStr += "<a  id='"+ deleteitemid + itemId + "' href='#' class='" + deleteVidClass + "'><div class='videolistbtn'></div></a>";
            itemsStr += "</div>";
        } else {
            itemsStr += "<div class='mediabuttonsdiv'>";
            itemsStr += divProgressbar;
            itemsStr += "<a  id='"  + downloaditemid + itemId + "' href='#' class='" + downloadVidClass + " ";
            if (this.downloading !== -1) {
                itemsStr += " nodisplay";
            }
            itemsStr += "'><div class='videolistbtn'></div></a>";
            itemsStr += "</div>";
        }
        itemsStr += "</div></li>";
        return itemsStr;
    } catch (e) {
        errorHandler("VideoItem.getVideoItemLi", e);
    }
},
setDownloadVideoItem: function(videoType, returnFunction) {
    try {
        var downloadClassId = videoType==="videocategories" ? "downloadvideo-" : "downloadeclass-";
        
        var btnId = downloadClassId + this.categoryid + "-" + this.seriesid + "-" + this.videoid;
        var progressId = btnId.replace(downloadClassId, "progressbarwrapper-");
        var progressBarId = btnId.replace(downloadClassId, "progressbar-");
        var progressSpanId = btnId.replace(downloadClassId, "progressbarspan-");
        $("#" + btnId).hide();
        $("#" + progressId).show();
        $("#" + progressBarId).show();
        $("#" + progressSpanId).show();
        var percpercent = "0" + resources.percent;
        $("#" + progressSpanId).html(percpercent);
    } catch (e) {
        errorHandler("Video.setDownloadVideoItem", e);
        returnFunction(false);
    }
},
downloadVideoItem: function(setProgress, videoType, returnFunction) {
    try {
        var ignoreDownload = false;
        var categoryDirectory = this.categoryid.toString();
        var localFileName = this.filename;
        var remoteVideoUrl = (this.videopath.indexOf("http:") < 0 || this.videopath.indexOf("https:") < 0) ? this.videopath : this.videopath;
        for (var x = 0; x < mediaToDownload.length; x++) {
            var item = mediaToDownload[x];
            if (item.fileListType === "videocategories"  || item.fileListType === "eclasses") {
                if (item.localFileName === localFileName && item.itemDirStr === categoryDirectory && item.remoteMediaFileUrl === remoteVideoUrl) {
                    ignoreDownload = true;
                    break;
                }
            }
        }
        if (setProgress) {
            this.setDownloadVideoItem(videoType, function() {});
        }
        var downloadClassId = videoType==="videocategories" ? "downloadvideo-" : "downloadeclass-";
        var deleteClassId = videoType==="videocategories" ? "deletevideo-" : "deleteeclass-";
        var btnId = downloadClassId + this.categoryid + "-" + this.seriesid + "-" + this.videoid;
        var progressId = btnId.replace(downloadClassId, "progressbarwrapper-");
        var progressBarId = btnId.replace(downloadClassId, "progressbar-");
        var progressSpanId = btnId.replace(downloadClassId, "progressbarspan-");
        var newBtnId = btnId.replace(downloadClassId, deleteClassId);
        if (ignoreDownload === false) {
            this.downloading = 0;
            var mediadownload = {};
            mediadownload.rootMediaDir = videoMediaDir;
            mediadownload.itemDirStr = categoryDirectory;
            mediadownload.localFileName = localFileName;
            mediadownload.remoteMediaFileUrl = remoteVideoUrl;
            mediadownload.showProgress = true;
            mediadownload.btnId = btnId;
            mediadownload.newBtnId = newBtnId;
            mediadownload.progressId = progressId;
            mediadownload.progressBarId = progressBarId;
            mediadownload.progressStatusId = "";
            mediadownload.progressSpanId = progressSpanId;
            mediadownload.fileListType = videoType;
            mediadownload.item = this;
            mediadownload.downloading = 0;
            mediaToDownload.push(mediadownload);
            downloadMediaItems(function(ret) {
                               returnFunction(ret);
                               });
        }
    } catch (e) {
        errorHandler("Video.downloadVideoItem", e);
        returnFunction(false);
    }
},
deleteVideoItem: function(videoType, returnFunction) {
    try {
        
        var downloadClassId = videoType==="videocategories" ? "downloadvideo-" : "downloadeclass-";
        var deleteClassId = videoType==="videocategories" ? "deletevideo-" : "deleteeclass-";
        var downloadClass = videoType==="videocategories" ? "downloadvideobtn" : "downloadeclassbtn";
        var deleteClass = videoType==="videocategories" ? "deletevideobtn" : "deleteeclassbtn";
        
        var btnId = deleteClassId + this.categoryid + "-" + this.seriesid + "-" + this.videoid;
        var newBtnId = downloadClassId + this.categoryid + "-" + this.seriesid + "-" + this.videoid;
        var localFileName = this.filename;
        if (videoMediaDir != undefined) {
            var categoryDirectory = this.categoryid.toString();
            var that = this;
            videoMediaDir.getDirectory(categoryDirectory, {
                                       create: false,
                                       exclusive: false
                                       }, function(vidDir) {
                                       vidDir.getFile(localFileName, {
                                                      create: false,
                                                      exclusive: true
                                                      }, function(vidEntry) {
                                                      $("#" + btnId).removeClass("ui-btn-active").removeClass(deleteClass).addClass(downloadClass);
                                                      $("#" + btnId).attr("id", newBtnId);
                                                      that.isdownloaded = false;
                                                      that.downloading = -1;
                                                      that.fileuri = "";
                                                      activeUser.saveFilesList(undefined, videoType, false, function() {});
                                                      vidEntry.remove();
                                                      returnFunction(true);
                                                      }, function() {
                                                      $("#" + btnId).removeClass("ui-btn-active").removeClass(deleteClass).addClass(downloadClass);
                                                      $("#" + btnId).attr("id", newBtnId);
                                                      that.isdownloaded = false;
                                                      that.downloading = -1;
                                                      that.fileuri = "";
                                                      activeUser.saveFilesList(undefined, videoType, false, function() {});
                                                      returnFunction(true);
                                                      });
                                       }, function() {
                                       $("#" + btnId).removeClass("ui-btn-active").removeClass(deleteClass).addClass(downloadClass);
                                       $("#" + btnId).attr("id", newBtnId);
                                       that.isdownloaded = false;
                                       that.downloading = -1;
                                       that.fileuri = "";
                                       activeUser.saveFilesList(undefined, videoType, false, function() {});
                                       returnFunction(true);
                                       });
        }
    } catch (e) {
        errorHandler("Video.deleteVideoItem", e);
        returnFunction(false);
    }
}
};
var AudioCategory = function(tabid, categorytitle, categoryid, category, description, audiocount, vieworder, thumbnail, alldownloaded, audiomix, audiomixdownloaded, audiomixurl, audiomixremoteurl, audioisdownloading, localthumbnail) {
    try {
        this.init(tabid, categorytitle, categoryid, category, description, audiocount, vieworder, thumbnail, alldownloaded, audiomix, audiomixdownloaded, audiomixurl, audiomixremoteurl, audioisdownloading, localthumbnail);
    } catch (e) {
        errorHandler("AudioCategory", e);
    }
};
AudioCategory.prototype = {
init: function(tabid, categorytitle, categoryid, category, description, audiocount, vieworder, thumbnail, alldownloaded, audiomix, audiomixdownloaded, audiomixurl, audiomixremoteurl, audioisdownloading, localthumbnail) {
    try {
        if (tabid === undefined) {
            tabid = 0;
        }
        if (categorytitle === undefined) {
            categorytitle = "";
        }
        if (categoryid === undefined) {
            categoryid = 0;
        }
        if (category === undefined) {
            category = "";
        }
        if (description === undefined) {
            description = "";
        }
        if (audiocount === undefined) {
            audiocount = 0;
        }
        if (vieworder === undefined) {
            vieworder = "";
        }
        if (thumbnail === undefined) {
            thumbnail = "";
        }
        if (thumbnail.length > 0 && (thumbnail.indexOf("http://") < 0 || thumbnail.indexOf("https://") < 0) && thumbnail.indexOf("www.") > -1) {
            thumbnail = thumbnail;
            //thumbnail = "http://" + thumbnail;
        }
        if (alldownloaded === undefined) {
            alldownloaded = false;
        }
        if (audiomix === undefined) {
            audiomix = false;
        }
        if (audiomixdownloaded === undefined) {
            audiomixdownloaded = false;
        }
        if (audiomixurl === undefined) {
            audiomixurl = "";
        }
        if (audiomixremoteurl === undefined) {
            audiomixremoteurl = "";
        }
        if (audioisdownloading === undefined) {
            audioisdownloading = -1;
        }
        if (localthumbnail === undefined) {
            localthumbnail = "";
        }
        this.tabid = tabid;
        this.categorytitle = categorytitle;
        this.categoryid = categoryid;
        this.category = category;
        this.description = description;
        this.audiocount = audiocount;
        this.vieworder = vieworder;
        if (thumbnail !== undefined && thumbnail.length > 0) {
            this.thumbnail = ((thumbnail.indexOf("http:") < 0 || thumbnail.indexOf("https:") < 0) && thumbnail.indexOf("file:") < 0) ? thumbnail : thumbnail;
        } else {
            this.thumbnail = thumbnail;
        }
        this.alldownloaded = alldownloaded;
        this.localthumbnail = localthumbnail;
        this.audiomixdownloaded = audiomixdownloaded;
        this.audiomixurl = audiomixurl;
        this.audiomixremoteurl = audiomixremoteurl;
        this.audiomix = this.audiomixremoteurl.length > 0 ? true : false;
        this.audioisdownloading = audioisdownloading;
        this.audiocategories = new Array();
        this.audios = new Array();
        this.audiotracks = new Array();
        var categoryDirectory = "";
        return this;
    } catch (e) {
        errorHandler("AudioCategory.init", e);
    }
},
setAudios: function(audiosObj) {
    try {
        this.audios = new Array();
        this.audiotracks = new Array();
        var audiotrackitem = {};
        if (audiosObj != undefined) {
            var audio;
            var audioObj;
            var filePath = "";
            var extension = "mp3";
            var fileid = "";
            var description = "";
            var isDownloaded = false;
            var audioid = "";
            if (audiosObj.length === undefined) {
                audioObj = audiosObj;
                fileid = audioObj.AudioTrackId + extension;
                filePath = audioObj.TrackUrl;
                audioid = this.tabid + "-" + this.categoryid;
                audio = new AudioItem(fileid, audioObj.AudioTrackId + "." + extension, audioid, audioObj.TrackTitle, audioObj.TrackDuration, filePath, audioObj.AudioSeriesId, 0, isDownloaded, -1, filePath, audioObj.AudioTitle, audioObj.Artist, this.audiomixdownloaded);
                this.audios.push(audio);
                audiotrackitem = {};
                audiotrackitem.duration = parseFloat(audio.length);
                audiotrackitem.start = 0;
                audiotrackitem.end = durationToSeconds(parseFloat(audio.length));
                audiotrackitem.loadedreset = false;
                this.audiotracks.push(audiotrackitem);
            } else {
                var previousItem = {};
                for (var i = 0; i < audiosObj.length; i++) {
                    audioObj = audiosObj[i];
                    fileid = audioObj.AudioTrackId + extension;
                    filePath = audioObj.TrackUrl;
                    audioid = this.tabid + "-" + this.categoryid;
                    audio = new AudioItem(fileid, audioObj.AudioTrackId + "." + extension, audioid, audioObj.TrackTitle, audioObj.TrackDuration, filePath, audioObj.AudioSeriesId, i, isDownloaded, -1, filePath, audioObj.AudioTitle, audioObj.Artist, this.audiomixdownloaded);
                    this.audios.push(audio);
                    audiotrackitem = {};
                    audiotrackitem.duration = durationToSeconds(parseFloat(audio.length));
                    if (i === 0) {
                        audiotrackitem.start = 0;
                        audiotrackitem.end = durationToSeconds(parseFloat(audio.length));
                    } else {
                        audiotrackitem.start = parseFloat(previousItem.end);
                        audiotrackitem.end = parseFloat(previousItem.end) + audiotrackitem.duration;
                    }
                    audiotrackitem.loadedreset = false;
                    previousItem = audiotrackitem;
                    this.audiotracks.push(audiotrackitem);
                }
            }
        }
    } catch (e) {
        errorHandler("AudioCategory.setAudios", e);
    }
},
setAudioMixFile: function(returnFunction) {
    try {
        var allAudioDownloaded = true;
        if (this.audios !== undefined && this.audios.length > 0) {
            for (var y = 0; y < this.audios.length; y++) {
                var aud = this.audios[y];
                if (aud.isdownloaded === false) {
                    allAudioDownloaded = false;
                    break;
                }
            }
            var localFileName = "alltracks.mp3";
            var categoryDirectory = this.tabid.toString() + "-" + this.categoryid.toString();
            //var thatall = this;
            if (allAudioDownloaded === true) {
                if (this.audiomixdownloaded === false && this.audiomix === true && mediaInit === true) {
                    localFileExists(audioMediaDir, categoryDirectory, localFileName, this, "audiocategories", true, false, false, function(ret) {
                                    if (ret === true) {
                                    activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                                    }
                                    });
                }
            } else {
                localFileExists(audioMediaDir, categoryDirectory, localFileName, this, "audiocategories", true, false, false, function(ret) {
                                if (ret === true) {
                                activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                                }
                                });
            }
        } else {
            returnFunction(true);
        }
    } catch (e) {
        errorHandler("AudioCategory.setAudioMixFile", e);
    }
},
setDownloadStatus: function(returnFunction) {
    try {
        var allAudioDownloaded = true;
        var isMixDownloaded = this.audiomixdownloaded;
        if (this.audios !== undefined && this.audios.length > 0) {
            for (var y = 0; y < this.audios.length; y++) {
                var aud = this.audios[y];
                aud.mixdownloaded=isMixDownloaded;
                if (aud.isdownloaded === false){
                    allAudioDownloaded = false;
                    if (aud.downloading === -1 && isMixDownloaded===true) {
                        aud.downloadAudioItem(true, false, function(ret) {});
                    }
                }
            }
            
        }
        this.alldownloaded=allAudioDownloaded;
        returnFunction( true);
    } catch (e) {
        returnFunction( false);
    }
},
getAudioCategoryLi: function(returnFunction) {
    try {
        var itemId = this.tabid + "-" + this.categoryid;
        var audioStr = "";
        if (this.audios != undefined && this.audios.length > 0) {
            
            var allAudiosDownloaded = true;
            var audioDownloading = false;
            if(this.audioisdownloading > -1){
                audioDownloading = true;
            }
            for (var x=0; x < this.audios.length; x++){
                var audItem = this.audios[x];
                if (audItem.isdownloaded===false){
                    allAudiosDownloaded=false;
                    break;
                }
                if(audItem.downloading > -1){
                    audioDownloading=true;
                }
            }
            var downloadString = audioDownloading===true ? resources.downloadingall : resources.downloadallaudios;
			 if (allAudiosDownloaded === true) {
			audioStr += "<span class='onall nodisplay' id='ondeleteaudioall-" + itemId + "'>"+resources.deletesingletrack+"</span><li id='msdeleteall' class='catli podcastli ui-list-divider downloadallli swipedeleteall' data-theme='h'><div class='podcastlidiv'>";
            audioStr += "<div style='width: 100% !important;padding-left: 0% !important;padding-top: 2%;' class='podcastitemdiv podcastitemdivdownload' id='podcastitemdivmain-"  + itemId + "'>";
			 }
			else
			{
            audioStr += "<span class='onall nodisplay' id='ondeleteaudioall-" + itemId + "'>"+resources.deletesingletrack+"</span><li id='tmsdeleteall' class='catli podcastli ui-list-divider downloadallli' data-theme='h'><div class='podcastlidiv'>";
            audioStr += "<div style='width: 100% !important;padding-left: 0% !important;padding-top: 2%;' class='podcastitemdiv podcastitemdivdownload' id='podcastitemdivmain-"  + itemId + "'>";
            }
            if (allAudiosDownloaded === true) {
				audioStr += "<a id='deleteallaudiosbtn-" + itemId + "' href='#' class='deleteallaudiosbtn'>";
                audioStr += "<div class='podcastitemdivdownload' style='padding-left:0% !important;' id='podcastitemdiv-" + itemId + "'>";
                audioStr += "<div class='mixdownloadtitle' style='width: 100%;margin-left: 0%;'>" + resources.deleteallaudios + "</div><div id='mixdiv-" + itemId + "' class='mixdownloaddiv'></div></div></a>";
            } else {
                audioStr += "<a  id='downloadallaudiosbtn-" + itemId + "' href='#' class='downloadallaudiosbtn'>";
                audioStr += "<div class='podcastitemdivdownload' style='padding-left:0% !important;' id='podcastitemdiv-" + itemId + "'>";
                audioStr += "<div class='mixdownloadtitle' style='width: 100%;margin-left: 0%;'>" + downloadString + "</div><div id='mixdiv-" + itemId + "' class='mixdownloaddiv'></div></div></a>";
            }
            audioStr += "</div></li>";
            for (var i = 0; i < this.audios.length; i++) {
                var audio = this.audios[i];
                audio.mixdownloaded = this.audiomixdownloaded;
                audioStr += audio.getAudioItemLi(i + 1, this.audiomixdownloaded, this.audioisdownloading > -1 ? true : false);
            }
        }
        returnFunction(audioStr);
    } catch (e) {
        errorHandler("AudioCategory.getAudioCategoryLi", e);
    }
},
deleteAllAudioItems: function(returnFunction) {
    try {
        
        var that = this;
        that.deleteAudioMixFile(function(ret) {
                                that.alldownloaded = false;
                                if (that.audios != undefined) {
                                for (var i = 0; i < that.audios.length; i++) {
                                var a = that.audios[i];
                                a.mixdownloaded = false;
                                if (that.audiotracks !== undefined) {
                                var track = that.audiotracks[i];
                                if (track !== undefined) {
                                track.loadedreset = false;
                                }
                                }
                                a.deleteAudioItem(function(ret) {});
                                }
                                }
                                activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                                });
        returnFunction(true);
    } catch (e) {
        errorHandler("AudioCategory.deleteAllAudioItems", e);
    }
},
deleteAudioMixFile: function(returnFunction) {
    try {
        if (audioMediaDir != undefined) {
            var categoryDirectory = this.tabid.toString() + "-" + this.categoryid.toString();
            var localFileName = "alltracks.mp3";
            var that = this;
            audioMediaDir.getDirectory(categoryDirectory, {
                                       create: false,
                                       exclusive: false
                                       }, function(audDir) {
                                       audDir.getFile(localFileName, {
                                                      create: false,
                                                      exclusive: true
                                                      }, function(audEntry) {
                                                      audEntry.remove();
                                                      that.audiomixdownloaded = false;
                                                      that.audioisdownloading = -1;
                                                      that.audiomixurl = "";
                                                      that.alldownloaded = false;
                                                      var audioBtnId = "deleteallaudiosbtn-" + that.tabid + "-" + that.categoryid;
                                                      var newDeleteBtnId = "downloadallaudiosbtn-" + that.tabid + "-" + that.categoryid;
                                                      $("#" + audioBtnId).attr("id", newDeleteBtnId);
                                                      
                                                      $("#" + newDeleteBtnId).removeClass("ui-btn-active").removeClass("deleteallaudiosbtn").addClass("downloadallaudiosbtn");
                                                      $("#" + newDeleteBtnId + " .mixdownloadtitle").html(resources.downloadallaudios);
                                                      activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                                                      returnFunction(true);
                                                      }, function() {
                                                      that.audiomixdownloaded = false;
                                                      that.audioisdownloading = -1;
                                                      that.audiomixurl = "";
                                                      that.alldownloaded = false;
                                                      var audioBtnId = "deleteallaudiosbtn-" + that.tabid + "-" + that.categoryid;
                                                      var newDeleteBtnId = "downloadallaudiosbtn-" + that.tabid + "-" + that.categoryid;
                                                      $("#" + audioBtnId).attr("id", newDeleteBtnId);
                                                      
                                                      $("#" + newDeleteBtnId).removeClass("ui-btn-active").removeClass("deleteallaudiosbtn").addClass("downloadallaudiosbtn");
                                                      $("#podcastitemdiv-" + that.categoryid + " .mixdownloadtitle").html(resources.downloadallaudios);
                                                      activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                                                      returnFunction(true);
                                                      });
                                       });
        }
    } catch (e) {
        errorHandler("AudioCategory.deleteAudioMixFile", e);
        returnFunction(false);
    }
},
downloadAudioMixItem: function(returnFunction) {
    try {
        var ignoreDownload = false;
        var localFileName = "alltracks.mp3";
        var categoryDirectory = this.tabid.toString() + "-" + this.categoryid.toString();
        var remoteAudioUrl = this.audiomixremoteurl;
        var itemId = this.tabid + "-" + this.categoryid;
        for (var x = 0; x < audioMixToDownload.length; x++) {
            var item = audioMixToDownload[x];
            if (item.fileListType === "audiomix") {
                if (item.localFileName === localFileName && item.itemDirStr === categoryDirectory && item.remoteMediaFileUrl === remoteAudioUrl) {
                    ignoreDownload = true;
                    break;
                }
            }
        }
        if (ignoreDownload === false) {
            var btnId = "downloadallaudiosbtn-" + itemId;
            $("#" + btnId).addClass("ui-btn-active");
            var newBtnId = btnId.replace("downloadallaudiosbtn-", "deleteallaudiosbtn-");
            this.audioisdownloading = 0;
            var mixdownload = {};
            mixdownload.rootMediaDir = audioMediaDir;
            mixdownload.itemDirStr = categoryDirectory;
            mixdownload.localFileName = localFileName;
            mixdownload.remoteMediaFileUrl = remoteAudioUrl;
            mixdownload.showProgress = true;
            mixdownload.btnId = btnId;
            mixdownload.newBtnId = newBtnId;
            mixdownload.progressId = "";
            mixdownload.progressBarId = "";
            mixdownload.progressStatusId = "mixdiv-" + itemId;
            mixdownload.progressSpanId = "";
            mixdownload.fileListType = "audiomix";
            mixdownload.item = this;
            mixdownload.audioisdownloading = 0;
            audioMixToDownload.push(mixdownload);
            downloadAudioMixItems(function(ret) {
                                  returnFunction(ret);
                                  });
        }
    } catch (e) {
        returnFunction(false);
    }
    returnFunction(true);
},
downloadAllAudioItems: function(setProgress, returnFunction) {
    try {
        var audCatId = this.tabid + "-" + this.categoryid;
        var downloadingItems = false;
        if($("#podcastitemdiv-" + audCatId).hasClass("downloadingfiles")){
            downloadingItems=true;
        }
        if (this.audios != undefined && this.audios.length > 0 && downloadingItems===false) {
            var i = 0;
            var alldownloaded = true;
            
            for (i = 0; i < this.audios.length; i++) {
                auditem = this.audios[i];
                if (auditem.isdownloaded === false && auditem.downloading === -1) {
                    auditem.downloadAudioItem(true, false, function(ret) {});
                    alldownloaded= false;
                }
            }
            if (this.audiomix === true && this.audiomixdownloaded === false && this.audioisdownloading === -1) {
                this.audioisdownloading = 0;
                alldownloaded=false;
                activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                this.downloadAudioMixItem(function(ret) {
                                          returnFunction(true);
                                          });
                if(alldownloaded===false){
                    $("#podcastitemdiv-" + audCatId).addClass("downloadingfiles");
                    $("#podcastitemdiv-" + audCatId + " .mixdownloadtitle").html(resources.downloadingall);
                }
            }
            returnFunction(true);
        } else {
            returnFunction(true);
        }
    } catch (e) {
        errorHandler("AudioCategory.downloadAllAudioItems", e);
        returnFunction(false);
    }
},
getAudioPlaylist: function(returnFunction) {
    try {
        var playlist = [];
        if (this.audios != undefined && this.audios.length > 0) {
            for (var i = 0; i < this.audios.length; i++) {
                var playlistItem = {};
                var audio = this.audios[i];
                playlistItem.id = audio.categoryid + "-" + audio.seriesid + "-" + audio.audioid;
                playlistItem.audioid = audio.audioid;
                playlistItem.url = (audio.isdownloaded === true) ? audio.fileuri : audio.audiopath;
                playlistItem.title = audio.audiotitle + " : " + audio.tracktitle;
                playlist.push(playlistItem);
            }
        }
        returnFunction(playlist);
    } catch (e) {
        errorHandler("AudioCategory.getAudioPlaylist", e);
    }
},
getAudioItemById: function(audioItemId) {
    try {
        var audioItem;
        if (this.audios != undefined) {
            for (var i = 0; i < this.audios.length; i++) {
                var p = this.audios[i];
                if (p.audioid === audioItemId) {
                    audioItem = p;
                    break;
                }
            }
        }
        return audioItem;
    } catch (e) {
        errorHandler("AudioCategory.getAudioItemById", e);
    }
},
setAudioCategoryThumbnail: function(returnFunction) {
    try {
        if (deviceIsOnline === true && this.localthumbnail === "") {
            var remoteMediaFileUrl = this.thumbnail;
            var localThumbNail = this.categoryid.toString() + "mp3.jpg";
            localThumbNail = localThumbNail.replace("-", "_");
            if (remoteMediaFileUrl.indexOf("www.") > -1 && (remoteMediaFileUrl.indexOf("http://") < 0 || remoteMediaFileUrl.indexOf("https://") < 0)) {
                remoteMediaFileUrl = remoteMediaFileUrl;
            }
            var localDirectory = this.tabid.toString() + "-" + this.categoryid.toString();
            var ignoreThumb = false;
            var thumbnail = {};
            for (var i = 0; i < thumbnailsToDownload.length; i++) {
                var p = thumbnailsToDownload[i];
                if (p.localFileName === localThumbNail) {
                    ignoreThumb = true;
                    break;
                }
            }
            if (ignoreThumb === false) {
                thumbnail.rootMediaDir = audioMediaDir;
                thumbnail.itemDirStr = localDirectory;
                thumbnail.localFileName = localThumbNail;
                thumbnail.remoteMediaFileUrl = remoteMediaFileUrl;
                thumbnail.fileListType = "audiocategories";
                thumbnail.item = this;
                thumbnail.downloading = 0;
                if (thumbnailsToDownload.length === 0) {
                    thumbnailsToDownload[thumbnailsToDownload.length] = thumbnail;
                }
                thumbnailsToDownload.push(thumbnail);
                downloadThumbnailItems(function(ret) {
                                       returnFunction(ret);
                                       });
            }
        } else {
            returnFunction(true);
        }
    } catch (e) {
        errorHandler("AudioCategory.setAudioCategoryThumbnail", e);
        returnFunction(false);
    }
    returnFunction(true);
}
};
var AudioItem = function(audioid, filename, categoryid, audiotitle, length, audiopath, seriesid, seriesindex, isdownloaded, downloading, fileuri, tracktitle, artist) {
    try {
        this.init(audioid, filename, categoryid, audiotitle, length, audiopath, seriesid, seriesindex, isdownloaded, downloading, fileuri, tracktitle, artist);
    } catch (e) {
        errorHandler("AudioItem", e);
    }
};
AudioItem.prototype = {
init: function(audioid, filename, categoryid, audiotitle, length, audiopath, seriesid, seriesindex, isdownloaded, downloading, fileuri, tracktitle, artist, mixdownloaded) {
    try {
        if (audioid === undefined) {
            audioid = "";
        }
        if (filename === undefined) {
            filename = "";
        }
        if (categoryid === undefined) {
            categoryid = 0;
        }
        if (audiotitle === undefined) {
            audiotitle = "";
        }
        if (length === undefined) {
            length = 0;
        }
        if (tracktitle === undefined) {
            tracktitle = "";
        }
        if (artist === undefined) {
            artist = "";
        }
        if (audiopath === undefined) {
            audiopath = "";
        }
        if (fileuri === undefined) {
            fileuri = "";
        }
        if (seriesid === undefined) {
            seriesid = 0;
        }
        if (seriesindex === undefined) {
            seriesindex = 0;
        }
        if (isdownloaded === undefined) {
            isdownloaded = false;
        }
        if (downloading === undefined) {
            downloading = -1;
        }
        if (mixdownloaded === undefined) {
            mixdownloaded = false;
        }
        this.audioid = audioid;
        this.filename = filename;
        this.categoryid = categoryid;
        this.audiotitle = audiotitle;
        this.length = length;
        this.tracktitle = tracktitle;
        this.audiopath = audiopath;
        this.fileuri = fileuri;
        this.artist = artist;
        this.seriesid = seriesid;
        this.seriesindex = seriesindex;
        this.isdownloaded = isdownloaded;
        this.downloading = downloading;
        this.mixdownloaded = mixdownloaded;
        return this;
    } catch (e) {
        errorHandler("AudioItem.init", e);
    }
},
getAudioItemLi: function(itemNo, audioMixItemDownloaded, audioMixIsDownloading) {
    try {
        
        var itemId = this.categoryid + "-" + this.audioid;
		if (this.isdownloaded === true) {
        var itemsStr = "<span class='on nodisplay' id='ondeleteaudio-" + itemId + "'>"+resources.deletesingletrack+"</span><li class='catli podcastli swipeallow' id='mdeleteaudio-" + itemId + "' data-theme='h'></div><div id='podcastlidiv-" + itemId + "' class='podcastlidiv'>";
		}
		else
		{
			 var itemsStr = "<li class='catli podcastli' id='mdeleteaudio-" + itemId + "' data-theme='h'></div><div id='podcastlidiv-" + itemId + "' class='podcastlidiv'>";
		}
        itemsStr += "<a  id='playaudio-" + itemId + "' href='#' class='playaudiobtn'>";
        itemsStr += "<div class='playitembtn'></div>";
        var title = this.tracktitle + " - " + this.artist + " : " + this.length;
        itemsStr += "<div class='podcastitemdiv podcastitemaudiodiv";
        itemsStr += "' id='podcastitemdiv-" + itemId + "'>" + title + "</div></a>";
        
        var divProgressbar = "<div id='progressbaraudiowrapper-" + itemId + "' class='progressbarwrapper ";
        if (this.downloading === -1) {
            divProgressbar += " nodisplay";
        }
        divProgressbar += "'><div id='progressbaraudio-" + itemId + "' class='mediaprogressbar'><div class='progressbardetail' id='progressbaraudiospan-" + itemId + "'>";
        if (this.downloading !== -1) {
            divProgressbar += this.downloading + resources.percent;
        }
        divProgressbar += "</div></div></div>";
        
        
        if (this.isdownloaded === true) {
            itemsStr += "<div class='mediabuttonsdiv'>";
            itemsStr += divProgressbar;
            itemsStr += "<a  id='deleteaudio-" + itemId + "' href='#' class='deleteaudiobtn'><div class='audiolistbtn'></div></a>";
            itemsStr += "</div></li>";
        } else {
            itemsStr += "<div class='mediabuttonsdiv'>";
            itemsStr += divProgressbar;
            itemsStr += "<a  id='downloadaudio-" + itemId + "' href='#' class='downloadaudiobtn ";
            if (this.downloading !== -1) {
                itemsStr += " nodisplay";
            }
            itemsStr += "'><div class='audiolistbtn'></div></a>";
            itemsStr += "</div></li>";
        }
        itemsStr += "</div>";
        return itemsStr;
    } catch (e) {
        errorHandler("AudioItem.getAudioItemLi", e);
        return "";
    }
},
setDownloadAudioItem: function(returnFunction) {
    try {
        var btnId = "downloadaudio-" + this.categoryid + "-" + this.audioid;
        var progressId = btnId.replace("downloadaudio-", "progressbaraudiowrapper-");
        var progressBarId = btnId.replace("downloadaudio-", "progressbaraudio-");
        var progressSpanId = btnId.replace("downloadaudio-", "progressbaraudiospan-");
        $("#" + btnId).hide();
        $("#" + progressId).show();
        $("#" + progressBarId).show();
        $("#" + progressSpanId).show();
        var percpercent = "0" + resources.percent;
        $("#" + progressSpanId).html(percpercent);
    } catch (e) {
        errorHandler("Audio.setDownloadAudioItem", e);
        returnFunction(false);
    }
},
setDownloadPlaylistAudioItem: function(returnFunction) {
    try {
        var btn = ".playlistdownloaditembtn-" + this.audioid;
        var btnId = $(btn).attr("id");
        var progressId = btnId.replace("downloadaudio-", "progressbaraudiowrapper-");
        var progressBarId = btnId.replace("downloadaudio-", "progressbaraudio-");
        var progressSpanId = btnId.replace("downloadaudio-", "progressbaraudiospan-");
		$(btn).hide();
        $("#" + progressId).show();
        $("#" + progressBarId).show();
        $("#" + progressSpanId).show();
        var percpercent = "0" + resources.percent;
        $("#" + progressSpanId).html(percpercent);
    } catch (e) {
        errorHandler("Audio.setDownloadPlaylistAudioItem", e);
        returnFunction(false);
    }
},
setDownloadPlaylistItem: function() {
    try {
        if(activeUser.userplaylists!==undefined && activeUser.userplaylists.length>0){
            var itemId;
            var audioId=this.audioid;
            var pl;
            for(var y = 0; y < activeUser.userplaylists.length; y++){
                pl= activeUser.userplaylists[y];
                for (var x = 0; x < pl.playlistitems.length; x++) {
                    var pli = pl.playlistitems[x];
                    if(pli.audioid + "mp3"===this.audioid){
                        pli.downloading=this.downloading;
                        pli.isdownloaded=this.isdownloaded;
                        pli.fileuri = this.isdownloaded===true ? this.fileuri : "";
                    }
                }
            }
            var percpercent = "0" + resources.percent;
            if(this.isdownloaded===true){
                $(".btn-" + audioId).hide();
                $(".pbw-" + audioId).hide();
                $(".pba-" + audioId).hide();
                $(".pbd-" + audioId).hide();
            }else if(this.downloading > -1){
                $(".btn-" + audioId).hide();
                $(".pbw-" + audioId).show();
                $(".pba-" + audioId).show();
                $(".pbd-" + audioId).show();
                percpercent = this.downloading + resources.percent;
                $(".pbd-" + audioId).html(percpercent);
                $(".pbs-" + audioId).css("width", percpercent);
            }else{
                $(".btn-" + audioId).show();
                $(".pbw-" + audioId).hide();
                $(".pba-" + audioId).hide();
                $(".pbd-" + audioId).hide();
            }
        }
        return true;
    } catch (e) {
        return false;
    }
},
downloadAudioItem: function(showProgress, isPlaylist, returnFunction) {
    try {
        var ignoreDownload = false;
        var categoryDirectory = this.categoryid.toString();
        var localFileName = this.filename;
        var remoteAudioUrl = (this.audiopath.indexOf("http:") < 0 || this.audiopath.indexOf("https:") < 0) ? this.audiopath : this.audiopath;
        for (var x = 0; x < mediaToDownload.length; x++) {
            var item = mediaToDownload[x];
            if (item.fileListType === "audiocategories") {
                if (item.localFileName === localFileName && item.itemDirStr === categoryDirectory && item.remoteMediaFileUrl === remoteAudioUrl) {
                    ignoreDownload = true;
                    break;
                }
            }
        }
        if (showProgress) {
            if(isPlaylist===false){
                this.setDownloadAudioItem(function() {});
            }else{
                this.setDownloadPlaylistAudioItem(function() {});
            }
        }
        var btnId, progressId, progressBarId, progressSpanId, newBtnId;
        
        btnId = "downloadaudio-" + this.categoryid + "-" + this.audioid;
        progressId = btnId.replace("downloadaudio-", "progressbaraudiowrapper-");
        progressBarId = btnId.replace("downloadaudio-", "progressbaraudio-");
        progressSpanId = btnId.replace("downloadaudio-", "progressbaraudiospan-");
        newBtnId = btnId.replace("downloadaudio-", "deleteaudio-");
        
        if (ignoreDownload === false) {
            
            this.downloading = 0;
            this.setDownloadPlaylistItem();
            var mediadownload = {};
            mediadownload.rootMediaDir = audioMediaDir;
            mediadownload.itemDirStr = categoryDirectory;
            mediadownload.localFileName = localFileName;
            mediadownload.remoteMediaFileUrl = remoteAudioUrl;
            mediadownload.showProgress = showProgress;
            mediadownload.btnId = btnId;
            mediadownload.newBtnId = newBtnId;
            mediadownload.progressId = progressId;
            mediadownload.progressBarId = progressBarId;
            mediadownload.progressStatusId = "";
            mediadownload.progressSpanId = progressSpanId;
            mediadownload.fileListType = "audiocategories";
            mediadownload.item = this;
            mediadownload.downloading = 0;
            mediaToDownload.push(mediadownload);
            downloadMediaItems(function(ret) {
                               returnFunction(ret);
                               });
        }
    } catch (e) {
        errorHandler("Audio.downloadAudioItem", e);
        returnFunction(false);
    }
},
deleteAudioItem: function(returnFunction) {
    try {
        var btnId = "deleteaudio-" + this.categoryid + "-" + this.audioid;
        var newBtnId = "downloadaudio-" + this.categoryid + "-" + this.audioid;
        var localFileName = this.filename;
        var itemId ="";
        if (audioMediaDir != undefined) {
            var categoryDirectory = this.categoryid.toString();
            itemId = "#deleteallaudiosbtn-" + this.categoryid;
            if($(itemId).length > 0){
                $(itemId).removeClass("deleteallaudiosbtn").addClass("downloadallaudiosbtn");
                $(itemId).attr("id").replace("deleteallaudiosbtn-", "downloadallaudiosbtn-");
                itemId = itemId + " .mixdownloadtitle";
                $(itemId).html(resources.downloadallaudios);
                itemId = "#mixdiv-" + this.categoryid;
                $(itemId).addClass("nodisplay");
            }
            var that = this;
            audioMediaDir.getDirectory(categoryDirectory, {
                                       create: false,
                                       exclusive: false
                                       }, function(audDir) {
                                       audDir.getFile(localFileName, {
                                                      create: false,
                                                      exclusive: true
                                                      }, function(audEntry) {
                                                      audEntry.remove();
                                                      $("#" + btnId).removeClass("ui-btn-active").removeClass("deleteaudiobtn").addClass("downloadaudiobtn");
                                                      $("#" + btnId).attr("id", newBtnId);
                                                      that.isdownloaded = false;
                                                      that.downloading = -1;
                                                      that.fileuri = "";
                                                      activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                                                      that.setDownloadPlaylistItem();
                                                      var id = "#podcastlidiv-" + that.categoryid + "-" + that.audioid + " .mediabuttonsdiv";
                                                      $(id).removeClass(" nodisplay");
                                                      returnFunction(true);
                                                      }, function() {
                                                      $("#" + btnId).removeClass("ui-btn-active").removeClass("deleteaudiobtn").addClass("downloadaudiobtn");
                                                      $("#" + btnId).attr("id", newBtnId);
                                                      that.isdownloaded = false;
                                                      that.downloading = -1;
                                                      that.fileuri = "";
                                                      activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                                                      that.setDownloadPlaylistItem();
                                                      returnFunction(true);
                                                      });
                                       }, function() {
                                       $("#" + btnId).removeClass("ui-btn-active").removeClass("deleteaudiobtn").addClass("downloadaudiobtn");
                                       $("#" + btnId).attr("id", newBtnId);
                                       that.isdownloaded = false;
                                       that.downloading = -1;
                                       that.fileuri = "";
                                       activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                                       returnFunction(true);
                                       });
        }
    } catch (e) {
        returnFunction(false);
    }
}
};

var UserPlaylist = function(userplaylistid, title, audiocount, vieworder, thumbnail, alldownloaded, localthumbnail, updatepending, audioisdownloading, tempid) {
    try {
        this.init(userplaylistid, title, audiocount, vieworder, thumbnail, alldownloaded, localthumbnail, updatepending, audioisdownloading, tempid);
    } catch (e) {
        errorHandler("UserPlaylist", e);
    }
};
UserPlaylist.prototype = {
init: function(userplaylistid, title, audiocount, vieworder, thumbnail, alldownloaded, localthumbnail, updatepending, audioisdownloading, tempid) {
    try {
        if (userplaylistid === undefined) {
            userplaylistid = 0;
        }
        if (title === undefined) {
            title = "";
        }
        if (audiocount === undefined) {
            audiocount = 0;
        }
        if (vieworder === undefined) {
            vieworder = "";
        }
        if (thumbnail === undefined) {
            thumbnail = "";
        }
        if (thumbnail.length > 0 && (thumbnail.indexOf("http://") < 0 || thumbnail.indexOf("https://") < 0) && thumbnail.indexOf("www.") > -1) {
            thumbnail =  thumbnail;
        }
        if (alldownloaded === undefined) {
            alldownloaded = false;
        }
        if (updatepending === undefined) {
            updatepending = false;
        }
        if (audioisdownloading === undefined) {
            audioisdownloading = false;
        }
        if (localthumbnail === undefined) {
            localthumbnail = "";
        }
        if (localthumbnail.length===0){
            if (userPlaylistIconFile.length > 0){
                localthumbnail = userPlaylistIconFile;
            }
        }
        if (tempid === undefined) {
            tempid = 0;
        }
        this.userplaylistid = userplaylistid;
        this.title = title;
        this.audiocount = audiocount;
        this.vieworder = vieworder;
        if (thumbnail !== undefined && thumbnail.length > 0) {
            this.thumbnail = ((thumbnail.indexOf("http:") < 0 || thumbnail.indexOf("https:") < 0) && thumbnail.indexOf("file:") < 0) ? thumbnail : thumbnail;
        } else {
            this.thumbnail = thumbnail;
        }
        this.alldownloaded = alldownloaded;
        this.updatepending = updatepending;
        this.localthumbnail = localthumbnail;
        this.tempid = tempid;
        this.playlistitems = new Array();
        return this;
    } catch (e) {
        errorHandler("UserPlaylist.init", e);
    }
},
getPlaylistItemById: function(playlistItemId) {
    try {
        var userplaylistItem;
        if (!(this.playlistitems === undefined && this.playlistitems.length === 0)) {
            for (var i = 0; i < this.playlistitems.length; i++) {
                var pl = this.playlistitems[i];
                if (pl.playlistitemid == playlistItemId){
                    userplaylistItem = pl;
                    break;
                }else if (pl.playlistitemid===0 && playlistItemId.indexOf("temp") > -1 && pl.tempid==playlistItemId.replace("temp","")){
                    userplaylistItem = pl;
                    break;
                }
            }
            return userplaylistItem;
        } else {
            return undefined;
        }
    } catch (e) {
        errorHandler("UserPlaylist.getPlaylistItemById", e);
        return undefined;
    }
},
resetAllDownloaded: function() {
    try {
        if (!(this.playlistitems === undefined && this.playlistitems.length === 0)) {
            var allDownloaded = true;
            var existingAllDownloaded = this.alldownloaded;
            var categoryRef="";
            for (var i = 0; i < this.playlistitems.length; i++) {
                var pl = this.playlistitems[i];
                if (pl.categoryref!==undefined && pl.categoryref.length>0){
                    categoryRef = pl.categoryref;
                    var ids = categoryRef.split("-");
                    var tabId = ids[0];
                    var audiocategoryid = ids[1] + "-" + ids[2];
                    var category = activeUser.getAudiocategoryById(tabId, audiocategoryid);
                    if (category!==undefined && category.audios!==undefined && category.audios.length>0){
                        var audioRef =pl.audioid ;
                        var audio = category.getAudioItemById(audioRef + "mp3");
                        if(audio!==undefined){
                            pl.isdownloaded = audio.isdownloaded;
                            pl.downloading = audio.downloading;
                        }
                    }
                }
                if (pl.isdownloaded === false){
                    allDownloaded=false;
                }
            }
            if(allDownloaded!==existingAllDownloaded){
                this.alldownloaded=allDownloaded;
                activeUser.saveFilesList(undefined, "userplaylists", true, function() {});
            }
            return true;
        } else {
            return true;
        }
    } catch (e) {
        errorHandler("UserPlaylist.resetAllDownloaded", e);
        return false;
    }
},
setPlaylistItems: function(playlistItemsObj) {
    try {
        this.playlistitems = new Array();
        var playlistitem;
        var playlistItemObj;
        var filePath = "";
        var artist = "";
        var tracktitle = "";
        var isdownloaded = false;
        var downloading = -1;
        var length = 0;
        var ids;
        var tabId=0;
        var audiocategoryid;
        var category;
        var audioid;
        var audio;
        if (activeUser.audiocategories===undefined||activeUser.audiocategories.length===0){
            activeUser.audiocategories=activeUser.existAuds;
        }
        if (playlistItemsObj != undefined) {
            if (playlistItemsObj.length === undefined) {
                playlistItemObj = playlistItemsObj;
                tracktitle="";
                artist="";
                length=0;
                isdownloaded=false;
                filePath="";
                downloading=-1;
                ids = playlistItemObj.CategoryRef.split("-");
                tabId = ids[0];
                audiocategoryid = ids[1] + "-" + ids[2];
                category = activeUser.getAudiocategoryById(tabId, audiocategoryid);
                if (category!==undefined && category.audios!==undefined && category.audios.length>0){
                    audioid =playlistItemObj.AudioTrackId + "mp3";
                    audio = category.getAudioItemById(audioid);
                    if(audio!==undefined){
                        filePath = audio.fileuri.length > 0 ? audio.fileuri : audio.audiopath;
                        isdownloaded = audio.isdownloaded;
                        tracktitle = audio.tracktitle;
                        artist = audio.artist;
                        length = audio.length;
                        downloading = audio.downloading;
                        playlistitem = new PlaylistItem(this.userplaylistid, playlistItemObj.AudioPlaylistItemId, playlistItemObj.CategoryRef, playlistItemObj.AudioTrackId, playlistItemObj.OrderNo, tracktitle, artist, length, isdownloaded, filePath, downloading, 0);
                        this.playlistitems.push(playlistitem);
                    }
                }
            } else {
                for (var i = 0; i < playlistItemsObj.length; i++) {
                    playlistItemObj = playlistItemsObj[i];
                    tracktitle="";
                    artist="";
                    length=0;
                    isdownloaded=false;
                    filePath="";
                    downloading=-1;
                    
                    ids = playlistItemObj.CategoryRef.split("-");
                    tabId = ids[0];
                    audiocategoryid = ids[1] + "-" + ids[2];
                    category = activeUser.getAudiocategoryById(tabId, audiocategoryid);
                    if (category!==undefined && category.audios!==undefined && category.audios.length>0){
                        audioid =playlistItemObj.AudioTrackId + "mp3";
                        audio = category.getAudioItemById(audioid);
                        if(audio!==undefined){
                            filePath = audio.fileuri.length > 0 ? audio.fileuri : audio.audiopath;
                            isdownloaded = audio.isdownloaded;
                            tracktitle = audio.tracktitle;
                            artist = audio.artist;
                            length = audio.length;
                            downloading = audio.downloading;
                            playlistitem = new PlaylistItem(this.userplaylistid, playlistItemObj.AudioPlaylistItemId, playlistItemObj.CategoryRef, playlistItemObj.AudioTrackId, playlistItemObj.OrderNo, tracktitle, artist, length, isdownloaded, filePath, downloading,0);
                            this.playlistitems.push(playlistitem);
                        }
                    }else{
                        playlistitem = new PlaylistItem(this.userplaylistid, playlistItemObj.AudioPlaylistItemId, playlistItemObj.CategoryRef, playlistItemObj.AudioTrackId, playlistItemObj.OrderNo, tracktitle, artist, length, isdownloaded, filePath, downloading, 0);
                        this.playlistitems.push(playlistitem);
                    }
                }
            }
        }
    } catch (e) {
        errorHandler("UserPlaylist.setPlaylistItems", e);
    }
},
comparePlaylistItemOrder: function(a, b) {
    if(a.itemorder < b.itemorder) {return -1;}
    if(a.itemorder > b.itemorder) {return 1;}
    return 0;
},
getPlaylistLi: function(returnFunction) {
    
    var playlistStr = "";
    try{
        
        if (this.playlistitems != undefined && this.playlistitems.length > 0) {
            this.playlistitems = this.playlistitems.sort(this.comparePlaylistItemOrder);
            this.resetAllDownloaded();
            
            var itemsDownloading = false;
            for (var x = 0; x < this.playlistitems.length; x++) {
                var item = this.playlistitems[x];
                if(item.downloading > -1){
                    itemsDownloading=true;
                    break;
                }
            }
            
            var itemsDownloadStr = itemsDownloading===false ? resources.downloadallaudios : resources.downloadingall;
            
            playlistStr += "<li class='catli podcastli ui-list-divider downloadallli' data-theme='h'><div class='podcastlidiv'>";
            var itemId = this.userplaylistid;
            if (this.userplaylistid===0 && this.userplaylistid.tempid > 0){
                itemId = "temp" + this.userplaylistid.tempid;
            }
            if (this.alldownloaded === true) {
				playlistStr += "<a id='downloadallplaylist-" + itemId + "' href='#' class='deleteallplaylistbtn'>";
                playlistStr += "<div class='plitemdiv podcastitemdivdownload' id='podcastitemdiv-" + itemId + "'>";
                playlistStr += resources.deleteallaudios + "</div></a>";
            } else {
                playlistStr += "<a  id='downloadallplaylist-" + itemId + "' href='#' class='downloadallplaylistbtn'>";
                playlistStr += "<div class='plitemdiv podcastitemdivdownload' id='podcastitemdiv-" + itemId + "'>";
                playlistStr += itemsDownloadStr + "</div></a>";
            }
            playlistStr += "</div></li>";
            
            var playlistItemStr="";
            for (var i = 0; i < this.playlistitems.length; i++) {
                var playlistitem = this.playlistitems[i];
                if (playlistitem!==undefined){
                    if ((playlistitem.tracktitle===undefined || playlistitem.tracktitle.length===0) || (playlistitem.artist===undefined || playlistitem.artist.length===0) || (playlistitem.length===undefined || playlistitem.length===0)){
                        
                        if (playlistitem.categoryref!==undefined && playlistitem.categoryref.length>0){
                            var ids = playlistitem.categoryref.split("-");
                            var tabId = ids[0];
                            var audiocategoryid = ids[1] + "-" + ids[2];
                            var category = activeUser.getAudiocategoryById(tabId, audiocategoryid);
                            if (category!==undefined && category.audios!==undefined && category.audios.length>0){
                                var audio = category.getAudioItemById(playlistitem.audioid + "mp3");
                                if(audio!==undefined){
                                    if(playlistitem.tracktitle !== audio.tracktitle || playlistitem.artist !== audio.artist|| playlistitem.length !== audio.length){
                                        playlistitem.tracktitle = audio.tracktitle;
                                        playlistitem.artist = audio.artist;
                                        playlistitem.length = audio.length;
                                        activeUser.saveFilesList(undefined, "userplaylists", true, function() {});
                                    }
                                }
                            }
                        }
                    }
                    playlistItemStr += playlistitem.getPlaylistItemLi();
                }
            }
            playlistStr +=playlistItemStr;
            
        }
        
        returnFunction(playlistStr);
    } catch (e) {
        errorHandler("UserPlaylist.getPlaylistLi", e);
        returnFunction(playlistStr);
    }
}
};
var PlaylistItem = function(userplaylistid, playlistitemid, categoryref, audioid, itemorder, tracktitle, artist, length, isdownloaded, fileuri, downloading, tempid) {
    try {
        this.init(userplaylistid, playlistitemid, categoryref, audioid, itemorder, tracktitle, artist, length, isdownloaded, fileuri, downloading, tempid);
    } catch (e) {
        errorHandler("PlaylistItem", e);
    }
};
PlaylistItem.prototype = {
init: function(userplaylistid, playlistitemid, categoryref, audioid, itemorder, tracktitle, artist, length, isdownloaded, fileuri, downloading, tempid) {
    
    try {
        if (audioid === undefined) {
            audioid = "";
        }
        if (userplaylistid === undefined) {
            userplaylistid = 0;
        }
        if (playlistitemid === undefined) {
            playlistitemid = 0;
        }
        if (categoryref === undefined) {
            categoryref = "";
        }
        if (itemorder === undefined) {
            itemorder = 0;
        }
        if (tracktitle === undefined) {
            tracktitle = "";
        }
        if (artist === undefined) {
            artist = "";
        }
        if (length === undefined) {
            length = 0;
        }
        if (isdownloaded === undefined) {
            isdownloaded = false;
        }
        if (fileuri === undefined) {
            fileuri = "";
        }
        if (downloading === undefined) {
            downloading = -1;
        }
        if (tempid === undefined) {
            tempid = 0;
        }
        this.userplaylistid = userplaylistid;
        this.audioid = audioid;
        this.playlistitemid = playlistitemid;
        this.categoryref = categoryref;
        this.itemorder = itemorder;
        this.artist = artist;
        this.tracktitle = tracktitle;
        this.length = length;
        this.isdownloaded = isdownloaded;
        this.fileuri = fileuri;
        this.downloading = downloading;
        this.tempid = tempid;
        return this;
    } catch (e) {
        errorHandler("PlaylistItem.init", e);
    }
},
getPlaylistItemLi: function() {
    try {
        var itemidtemp = this.playlistitemid===0 ? "temp" + this.tempid : this.playlistitemid;
        var audioId = this.audioid + "mp3";
        var itemId = this.userplaylistid + "-" + itemidtemp;
        var itemsStr = "<li id='plitemli-" + itemId + "' class='catli podcastli' data-theme='h'><div id='userplaylistli-" + itemId + "' class='podcastlidiv'>";
        
        var divProgressbar = "<div id='progressbaraudiowrapper-" + itemId + "' class='progressbarwrapper pbw-" + audioId;
        if (this.downloading === -1) {
            divProgressbar += " nodisplay";
        }
        divProgressbar += "'><div id='progressbaraudio-" + itemId + "' class='mediaprogressbar pba-" + audioId + "'><div class='progressbardetail pbd-" + audioId + "' id='progressbaraudiospan-" + itemId + "'>";
        if (this.downloading !== -1) {
            divProgressbar += this.downloading + resources.percent;
        }
        divProgressbar += "</div></div></div>";
        
        var title = this.tracktitle + " (" + this.artist + ") : " + this.length;
        itemsStr += "<a  id='playaudio-" + itemId + "' href='#' class='playlistaudiobtn'>";
        itemsStr += "<div class='playitembtn'></div>";
        itemsStr += "<div class='podcastitemdiv podcastitemaudiodiv plitemdiv ";
        itemsStr += "' id='podcastitemdiv-" + itemId + "'>" + title + "</div></a>";
        if (this.isdownloaded === true) {
            itemsStr += "<div class='mediabuttonsdiv'>";
            itemsStr += divProgressbar;
            itemsStr += "<a  id='downloadaudio-" + itemId + "' href='#' class='playlistdeleteitem playlistdownloaditem playlistdownloaditembtn-" + audioId;
            itemsStr += "'><div class='audiolistbtn'></div></a>";
            itemsStr += "</div>";
        } else {
            itemsStr += "<div class='mediabuttonsdiv'>";
            itemsStr += divProgressbar;
            itemsStr += "<a  id='downloadaudio-" + itemId + "' href='#' class='downloadaudiobtn playlistdownloaditem playlistdownloaditembtn-" + audioId;
            if (this.downloading !== -1 || this.isdownloaded===true) {
                itemsStr += " nodisplay";
            }
            itemsStr += "'><div class='audiolistbtn'></div></a>";
            itemsStr += "</div>";
        }
        itemsStr +="<div class='plhandle'></div>";
        itemsStr += "<div id='playlistcheck-" + itemId + "' class='playlistcheck playlistcheckdelete'></div>";
        
        itemsStr += "</div></li>";
        return itemsStr;
    } catch (e) {
        errorHandler("PlaylistItem.getPlaylistItemLi", e);
        return "";
    }
},
downloadPlaylistItem: function() {
    try {
        var ids = this.categoryref.split("-");
        var tabId = ids[0];
        var audiocategoryid = ids[1] + "-" + ids[2];
        var category = activeUser.getAudiocategoryById(tabId, audiocategoryid);
        if (category!==undefined && category.audios!==undefined && category.audios.length>0){
            var audio = category.getAudioItemById(this.audioid + "mp3");
            if(audio!==undefined){
                if(audio.isdownloaded===false){
                    audio.downloadAudioItem(true, true, function(ret) {});
                }
            }
        }
    } catch (e) {
        errorHandler("PlaylistItem.downloadPlaylistItem", e);
        return "";
    }
}
};
function downloadAudioMixItems(returnFunction) {
    try {
        var mediaDownloading = 0;
        var media;
        if (audioMixToDownload !== undefined && audioMixToDownload.length > 0) {
            media = audioMixToDownload[0];
            if (media !== undefined && media.audioisdownloading === 0 && isDeviceOnline() === true) {
                media.audioisdownloading = 1;
                checkDownloadItems(function() {});
                downloadMediaMixFileItem(media.rootMediaDir, media.itemDirStr, media.localFileName, media.remoteMediaFileUrl, media.showProgress, media.btnId, media.newBtnId, media.progressId, media.progressBarId, media.progressStatusId, media.progressSpanId, media.item, media.fileListType, function(ret) {
                                         try {
                                         for (var y = 0; y < audioMixToDownload.length; y++) {
                                         var mediaItem = audioMixToDownload[y];
                                         if (mediaItem.localFileName === media.localFileName && mediaItem.itemDirStr === media.itemDirStr) {
                                         var newmedia = mediaItem.item;
                                         var newDeleteBtnId = "";
                                         if (ret === false) {
                                         newmedia.audioisdownloading = -1;
                                         newmedia.audiomixdownloaded = false;
                                         newmedia.audiomixurl = "";
                                         localFileExists(media.rootMediaDir, media.itemDirStr, media.localFileName, newmedia, "audiocategories", true, true, false, function(ret) {});
                                         }else{
                                         newmedia.setDownloadStatus(function(){
                                                                    activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                                                                    });
                                         var aItemId = newmedia.tabid + "-" + newmedia.categoryid;
                                         var audBtnId = "#podcastitemdiv-" + aItemId;
                                         var alldownloaded=true;
                                         for (d = 0; d < newmedia.audios.length; d++) {
                                         var audItem = newmedia.audios[d];
                                         if (audItem.isdownloaded === false) {
                                         alldownloaded=false;
                                         break;
                                         }
                                         }
                                         if (alldownloaded===true) {
                                         $(audBtnId).removeClass("downloadingfiles");
                                         $(audBtnId + " .mixdownloadtitle").html(resources.deleteallaudios);
                                         var middivid = audBtnId.replace("podcastitemdiv", "mixdiv");
                                         $(middivid).html("");
                                         $("#" + media.progressStatusId).html("");
                                         $("#" + media.btnId).removeClass("downloadallaudiosbtn").addClass("deleteallaudiosbtn");
                                         $("#" + media.btnId).attr("id", media.newBtnId);
										  $("#tmsdeleteall").addClass("swipedeleteall");
                                         newmedia.alldownloaded = true;
                                         setDeleteAudioBtn();
                                         setDeleteAllAudiosBtn();
                                         }
                                         }
                                         
                                         activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                                         audioMixToDownload.splice(y, 1);
                                         break;
                                         }
                                         }
                                         if (audioMixToDownload.length > 0) {
                                         downloadAudioMixItems(function(ret) {});
                                         returnFunction(true);
                                         } else {
                                         checkDownloadItems(function() {});
                                         returnFunction(true);
                                         }
                                         } catch (e) {
                                         returnFunction(false);
                                         }
                                         });
            }
        } else {
            checkDownloadItems(function() {});
            returnFunction(true);
        }
    } catch (e) {
        errorHandler("downloadAudioMixItems", e);
        returnFunction(false);
    }
}

function downloadMediaMixFileItem(rootMediaDir, itemDirStr, localFileName, remoteMediaFileUrl, showProgress, btnId, newBtnId, progressId, progressBarId, progressStatusId, progressSpanId, item, fileListType, returnFunction) {
    try {
        var that = this;
        var currentPercentage = 0;
        if (rootMediaDir != undefined) {
            rootMediaDir.getDirectory(itemDirStr, {
                                      create: true,
                                      exclusive: false
                                      }, function(itemDir) {
                                      itemDir.getFile(localFileName, {
                                                      create: true,
                                                      exclusive: true
                                                      }, function(fileEntry) {
                                                      var localMediaPath = fileEntry.toURL();
                                                      remoteMediaFileUrl = encodeURI("remoteMediaFileUrl");
                                                      var ft = new FileTransfer();
                                                      var onFileDownloadSuccess = function(entry) {
                                                      try {
                                                      item.audioisdownloading = -1;
                                                      item.audiomixdownloaded = false;
                                                      ft = null;
                                                      returnFunction(false);
                                                      } catch (e) {
                                                      returnFunction(false);
                                                      }
                                                      };
                                                      var onFileDownloadError = function(error) {
                                                      try {
                                                      isCheckDeviceOnline();
                                                      $("#" + btnId).show();
                                                      $("#" + btnId).removeClass("ui-btn-active");
                                                      if (fileListType.length > 0 && item !== undefined) {
                                                      item.audioisdownloading = -1;
                                                      item.audiomixdownloaded = false;
                                                      item.audiomixurl = "";
                                                      var alldownloadedcheck = true;
                                                      var resetMediaDownloading = false;
                                                      if(item.audios!==undefined && item.audios.length>0){
                                                      for (var a = 0; a < item.audios.length; a++){
                                                      var itemA = item.audios[a];
                                                      if(itemA!==undefined){
                                                      
                                                      if(itemA.isdownloaded===false){
                                                      alldownloadedcheck=false;
                                                      if( itemA.downloading > 0){
                                                      // Delete any pending file transfers for audios for this alltracks category
                                                      if (fileTransfers !== undefined && fileTransfers.length > 0) {
                                                      for (var y = 0; y < fileTransfers.length; y++) {
                                                      var ftItemA = fileTransfers[y];
                                                      if (ftItemA.localname === itemA.filename && ftItemA.dirname === itemA.categoryid) {
                                                      try{
                                                      fileTransfers[y].ftitem.abort();
                                                      }catch(ex){
                                                      
                                                      }
                                                      fileTransfers.splice(y, 1);
                                                      break;
                                                      }
                                                      }
                                                      }
                                                      itemA.downloading = 0;
                                                      if (mediaToDownload !== undefined && mediaToDownload.length > 0) {
                                                      for (var b = 0; b < mediaToDownload.length; b++) {
                                                      var mediaA = mediaToDownload[b];
                                                      if (mediaA.downloading > 0 && mediaA.localFileName===itemA.filename && mediaA.itemDirStr === itemA.categoryid) {
                                                      mediaA.downloading = 0;
                                                      localFileExists(mediaA.rootMediaDir, mediaA.itemDirStr, mediaA.localFileName, mediaA.item, mediaA.fileListType, false, true, false, function(ret) {});
                                                      resetMediaDownloading=true;
                                                      
                                                      
                                                      }
                                                      mediaA.showProgress=true;
                                                      }
                                                      }
                                                      break;
                                                      }
                                                      }
                                                      }
                                                      }
                                                      }
                                                      if(resetMediaDownloading===true){
                                                      if (mediaToDownload.length > 0) {
                                                      downloadMediaItems(function(ret) {});
                                                      }
                                                      }
                                                      item.alldownloaded = alldownloadedcheck;
                                                      activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                                                      if (fileTransfers !== undefined && fileTransfers.length > 0) {
                                                      for (var x = 0; x < fileTransfers.length; x++) {
                                                      var ftItem = fileTransfers[x];
                                                      if (ftItem.localname === localFileName && ftItem.dirname === itemDirStr) {
                                                      fileTransfers.splice(x, 1);
                                                      break;
                                                      }
                                                      }
                                                      }
                                                      }
                                                      if (fileEntry !== undefined) {
                                                      try {
                                                      fileEntry.remove();
                                                      } catch (e) {}
                                                      }
                                                      ft = null;
                                                      returnFunction(false);
                                                      } catch (e) {
                                                      returnFunction(false);
                                                      }
                                                      };
                                                      /*  Show Progress but only complete progress indicator if all files are also downloaded in the category */
                                                      
                                                      if (showProgress === true) {
                                                      ft.onprogress = function(progressEvent) {
                                                      if (progressEvent.lengthComputable) {
                                                      var perc = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                                                      if (perc > 0) {
                                                      if(perc < 99){
                                                      var percpercent = perc + resources.percent;
                                                      $("#" + progressStatusId).html(percpercent);
                                                      }
                                                      }
                                                      }
                                                      };
                                                      }
													  ft.download(remoteMediaFileUrl, localMediaPath, onFileDownloadSuccess, onFileDownloadSuccess, true);
                                                      if (fileTransfers !== undefined) {
                                                      var fileDownloadItem = {};
                                                      fileDownloadItem.dirname = itemDirStr;
                                                      fileDownloadItem.localname = localFileName;
                                                      fileDownloadItem.ftitem = ft;
                                                      fileDownloadItem.file = fileEntry;
                                                      fileDownloadItem.item = item;
                                                      fileDownloadItem.type = "audiomix";
                                                      fileDownloadItem.spanid = progressSpanId;
                                                      fileDownloadItem.statusid = progressStatusId;
                                                      fileDownloadItem.progressid = progressId;
                                                      fileDownloadItem.barid = progressBarId;
                                                      fileDownloadItem.btnid = btnId;
                                                      
                                                      if(fileTransfers.length===0){
                                                      fileTransfers.push(fileDownloadItem);
                                                      }else{
                                                      fileTransfers.splice(0, 0, fileDownloadItem);
                                                      
                                                      }
                                                      }
                                                      }, function() {
                                                      try {
                                                      $("#" + btnId).show();
                                                      $("#" + btnId).removeClass("ui-btn-active");
                                                      if (fileListType.length > 0 && item !== undefined) {
                                                      item.audioisdownloading = -1;
                                                      item.audiomixdownloaded = false;
                                                      item.audiomixurl = "";
                                                      }
                                                      activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                                                      } catch (e) {
                                                      returnFunction(false);
                                                      }
                                                      returnFunction(false);
                                                      });
                                      }, function() {
                                      try {
                                      $("#" + btnId).show();
                                      $("#" + btnId).removeClass("ui-btn-active");
                                      if (fileListType.length > 0 && item !== undefined) {
                                      item.audioisdownloading = -1;
                                      item.audiomixdownloaded = false;
                                      item.audiomixurl = "";
                                      }
                                      activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                                      returnFunction(false);
                                      } catch (e) {
                                      returnFunction(false);
                                      }
                                      });
        }
    } catch (e) {
        errorHandler("downloadMediaMixFileItem", e);
        returnFunction(false);
    }
}
function downloadMediaItems(returnFunction) {
    try {
        var mediaDownloading = 0;
        var media;
        
        checkDownloadItems(function() {});
        if (mediaToDownload !== undefined && mediaToDownload.length > 0) {
            for (var i = 0; i < mediaToDownload.length; i++) {
                media = mediaToDownload[i];
                if (media.downloading > 0) {
                    mediaDownloading += 1;
                }
                if (mediaDownloading >= 2) {
                    break;
                }
            }
            if (mediaDownloading < 2) {
                var totalToDownload = mediaToDownload.length > mediaDownloading ? (mediaDownloading + 1) : mediaToDownload.length;
                if (totalToDownload > 2) {
                    totalToDownload = 2;
                }
                for (var x = 0; x < totalToDownload; x++) {
                    media = mediaToDownload[x];
                    if (media !== undefined && media.downloading === 0) {
                        break;
                    }
                }
                
                if (media !== undefined && media.downloading === 0 && isDeviceOnline() === true) {
                    media.downloading = 1;
                    media.item.downloading = 1;
                    checkDownloadItems(function() {});
                    if(media.fileListType==="audiocategories" && activeUser.userplaylists!==undefined && activeUser.userplaylists.length>0){
                        updatePlaylistItemStatus(media.item, function(ret){});
                    }
                    downloadMediaFileItem(media.rootMediaDir, media.itemDirStr, media.localFileName, media.remoteMediaFileUrl, media.showProgress, media.btnId, media.newBtnId, media.progressId, media.progressBarId, media.progressStatusId, media.progressSpanId, media.item, media.fileListType, function(ret) {
                                          if (ret !== undefined) {
                                          var mediaName = ret.localfilename;
                                          
                                          if (mediaName !== undefined && mediaName.length > 0) {
                                          for (var y = 0; y < mediaToDownload.length; y++) {
                                          var mediaItem = mediaToDownload[y];
                                          if (mediaItem.localFileName === mediaName && mediaItem.itemDirStr === media.itemDirStr) {
                                          var newmedia = mediaItem.item;
                                          var newDeleteBtnId = "";
                                          var ids ;
                                          var tabId;
                                          var catId ;
                                          var category;
                                          var itemId;
                                          var vidBtnId, vidItem, b;
                                          if (mediaItem.showProgress === true) {
                                          $("#" + mediaItem.progressId).hide();
                                          $("#" + mediaItem.progressBarId).hide();
                                          $("#" + mediaItem.btnId).show();
                                          $("#" + mediaItem.btnId).removeClass("active-state").removeClass("ui-btn-active");
                                          
                                          }
                                          var totalDownloaded = 0;
                                          if (ret.success === true) {
                                          if (mediaItem.fileListType === "podcasts") {
                                          var podcast = activeUser.getPodcastById(newmedia.podcastid);
                                          if (podcast !== undefined) {
                                          
                                          $("#" + mediaItem.btnId).attr("id", mediaItem.newBtnId);
                                          
                                          
                                          totalDownloaded = 0;
                                          for (var a = 0; a < podcast.items.length; a++) {
                                          var podItem = podcast.items[a];
                                          if (podItem.isdownloaded === true) {
                                          totalDownloaded += 1;
                                          }
                                          if(podItem.type==="pdf"){
                                          var pdfId = "#downloadpoditem-" + podItem.podcastid + "-" + podItem.id;
                                          if( $(pdfId)){
                                          $(pdfId).removeClass("downloadpdfpoditembtn").addClass("deletepdfpoditembtn");
                                          }
                                          }else{
                                          $("#" + mediaItem.newBtnId).addClass("deletepoditembtn");
                                          $("#" + mediaItem.newBtnId).removeClass("downloadpoditembtn");
                                          }
                                          }
                                          
                                          var podBtnId = "downloadallpods-" + podcast.id;
                                          newDeleteBtnId = podBtnId.replace("downloadallpods-", "deleteallpoditems-");
                                          $(".podcastitemsul").listview("refresh");
                                          if (totalDownloaded === podcast.items.length) {
                                          $("#" + podBtnId).attr("id", newDeleteBtnId);
                                          $("#" + newDeleteBtnId).removeClass("ui-btn-active").removeClass("downloadallpodsbtn").addClass("deleteallpodsbtn");
                                          $("#podcastitemdiv-" + podcast.id).html(resources.deleteallmedia);
                                          podcast.alldownloaded = true;
                                          $(".podcastitemsul").listview("refresh");
                                          if (playlistPodcastScroller !== null && playlistPodcastScroller != undefined) {
                                          setTimeout(function() {
                                                     playlistPodcastScroller.refresh();
                                                     }, 100);
                                          }
                                          }
                                          activeUser.saveFilesList(undefined, "podcasts", false, function() {});
                                          }
                                          } else if (mediaItem.fileListType === "videocategories") {
                                          ids = newmedia.categoryid.split("-");
                                          tabId = ids[0];
                                          catId = ids[1];
                                          if (mediaItem.showProgress === true) {
                                          $("#" + mediaItem.btnId).attr("id", mediaItem.newBtnId);
                                          $("#" + mediaItem.newBtnId).addClass("deletevideobtn");
                                          $("#" + mediaItem.newBtnId).removeClass("downloadvideobtn");
                                          }
                                          category = activeUser.getVideocategoryById(tabId, catId, newmedia.seriesid);
                                          if (category !== undefined) {
                                          itemId = category.tabid + "-" + category.categoryid + "-" + category.seriesid;
                                          vidBtnId = "downloadallvideosbtn-" + itemId;
                                          newDeleteBtnId = vidBtnId.replace("downloadallvideosbtn-", "deleteallvideosbtn-");
                                          totalDownloaded = 0;
                                          for (b = 0; b < category.videos.length; b++) {
                                          vidItem = category.videos[b];
                                          if (vidItem.isdownloaded === true) {
                                          totalDownloaded += 1;
                                          }
                                          }
                                          if (totalDownloaded === category.videos.length) {
                                          $("#" + vidBtnId).removeClass("downloadingfiles");
                                          $("#podcastitemdiv-" + category.tabid + "-" + category.categoryid).html(resources.deleteallvideos);
                                          $("#" + vidBtnId).removeClass("downloadallvideosbtn").addClass("deleteallvideosbtn");
                                          $("#" + vidBtnId).attr("id", newDeleteBtnId);
                                          $("#" + newDeleteBtnId).removeClass("ui-btn-active");
                                          category.alldownloaded = true;
                                          activeUser.saveFilesList(undefined, "videocategories", false, function() {});
                                          }
                                          $(".podcastitemsul").listview("refresh");
                                          if (playlistPodcastScroller !== null && playlistPodcastScroller != undefined) {
                                          setTimeout(function() {
                                                     playlistPodcastScroller.refresh();
                                                     }, 100);
                                          }
                                          }
                                          }else if (mediaItem.fileListType === "eclasses") {
                                          ids = newmedia.categoryid.split("-");
                                          tabId = ids[0];
                                          catId = ids[1];
                                          category = activeUser.getVideocategoryById(tabId, catId, newmedia.seriesid);
                                          if (category !== undefined) {
                                          $("#" + mediaItem.btnId).attr("id", mediaItem.newBtnId);
                                          $("#" + mediaItem.newBtnId).removeClass("ui-btn-active");
                                          $("#" + mediaItem.newBtnId).addClass("deleteeclassbtn");
                                          $("#" + mediaItem.newBtnId).removeClass("downloadeclassbtn");
                                          itemId = category.tabid + "-" + category.categoryid + "-" + category.seriesid;
                                          vidBtnId = "downloadalleclassbtn-" + itemId;
                                          newDeleteBtnId = vidBtnId.replace("downloadalleclassbtn-", "deletealleclassbtn-");
                                          totalDownloaded = 0;
                                          for (b = 0; b < category.videos.length; b++) {
                                          vidItem = category.videos[b];
                                          if (vidItem.isdownloaded === true) {
                                          totalDownloaded += 1;
                                          }
                                          }
                                          if (totalDownloaded === category.videos.length) {
                                          $("#" + vidBtnId).attr("id", newDeleteBtnId);
                                          $("#" + newDeleteBtnId).removeClass("ui-btn-active").removeClass("downloadalleclassbtn").addClass("deletealleclassbtn");
                                          $("#podcastitemdiv-" + category.tabid + "-" + category.categoryid).html(resources.deleteallvideos);
                                          category.alldownloaded = true;
                                          activeUser.saveFilesList(undefined, "eclasses", false, function() {});
                                          }
                                          $(".podcastitemsul").listview("refresh");
                                          if (playlistPodcastScroller !== null && playlistPodcastScroller != undefined) {
                                          setTimeout(function() {
                                                     playlistPodcastScroller.refresh();
                                                     }, 100);
                                          }
                                          }
                                          } else {
                                          if (mediaItem.fileListType === "audiocategories") {
                                          
                                          ids = newmedia.categoryid.split("-");
                                          tabId = ids[0];
                                          catId = ids[1] + "-" + ids[2];
                                          $("#" + mediaItem.btnId).attr("id", mediaItem.newBtnId);
                                          $("#" + mediaItem.newBtnId).removeClass("ui-btn-active");
                                          $("#" + mediaItem.newBtnId).addClass("deleteaudiobtn");
                                          $("#" + mediaItem.newBtnId).removeClass("downloadaudiobtn");
										  setDeleteAudioBtn();
										  
										  var mbtnId = "mdeleteaudio-" + newmedia.categoryid + "-" + newmedia.audioid;
										  $("#" + mbtnId).addClass("swipeallow");
										  var newmbtnId=mbtnId.replace("mdeleteaudio", "ondeleteaudio");
										  var addswipe="<span class='on' id='"+newmbtnId+"'>"+resources.deletesingletrack+"</span>";
										  $(addswipe).insertBefore( "#" + mbtnId );
										  
										  
										  
										  
                                          setAudioCategoryStatus(tabId, catId, function(){});
                                          setPlaylistDownloadTrack(newmedia.fileuri, newmedia.audioid, false, function(){});
                                          
                                          if (playlistPodcastScroller !== null && playlistPodcastScroller !== undefined) {
                                          setTimeout(function() {
                                                     playlistPodcastScroller.refresh();
                                                     }, 100);
                                          }
                                          }
                                          }
                                          activeUser.saveFilesList(undefined, mediaItem.fileListType, false, function() {});
                                          if(mediaItem.fileListType==="audiocategories"){
                                          
                                          activeUser.saveFilesList(undefined, "userplaylists", false, function() {});
                                          }
                                          } else {
                                          newmedia.isdownloaded = false;
                                          newmedia.fileuri = "";
                                          newmedia.downloading = -1;
                                          activeUser.saveFilesList(undefined, mediaItem.fileListType, false, function() {});
                                          if(mediaItem.fileListType==="audiocategories"){
                                          
                                          activeUser.saveFilesList(undefined, "userplaylists", false, function() {});
                                          }
                                          localFileExists(media.rootMediaDir, media.itemDirStr, media.localFileName, media.item, media.fileListType, false, false, false, function(ret) {});
                                          }
                                          mediaToDownload.splice(y, 1);
                                          break;
                                          }
                                          }
                                          }
                                          }
                                          if (mediaToDownload.length > 0) {
                                          downloadMediaItems(function(ret) {});
                                          } else {
                                          checkDownloadItems(function() {});
                                          }
                                          });
                    returnFunction(true);
                }
            }else{
                returnFunction(true);
            }
        } else {
            checkDownloadItems(function() {});
            returnFunction(true);
        }
    } catch (e) {
        errorHandler("downloadMediaItems", e);
        returnFunction(false);
    }
}
function downloadMediaFileItem(rootMediaDir, itemDirStr, localFileName, remoteMediaFileUrl, showProgress, btnId, newBtnId, progressId, progressBarId, progressStatusId, progressSpanId, item, fileListType, returnFunction) {
    try {
        var that = this;
        if (rootMediaDir != undefined) {
            rootMediaDir.getDirectory(itemDirStr, {
                                      create: true,
                                      exclusive: false
                                      }, function(itemDir) {
                                      itemDir.getFile(localFileName, {
                                                      create: true,
                                                      exclusive: true
                                                      }, function(fileEntry) {
                                                      var localMediaPath = fileEntry.toURL();
                                                      remoteMediaFileUrl = encodeURI(remoteMediaFileUrl);
                                                      var ft = new FileTransfer();
                                                      var onFileDownloadSuccess = function(entry) {
                                                      var downloadFileName = entry.toURL() === undefined ? "" : entry.toURL();
                                                      entry = null;
                                                      if (fileListType.length > 0 && item !== undefined) {
                                                      item.isdownloaded = true;
                                                      item.fileuri = downloadFileName;
                                                      item.downloading = -1;
                                                      if(fileListType==="audiocategories"){
                                                      updatePlaylistItemStatus(item, function(){});
                                                      setAudioDownloadStatus(item, function(){});
                                                      }
                                                      activeUser.saveFilesList(undefined, fileListType, false, function() {});
                                                          if(fileListType=="videocategories"){
                                                       cordova.plugins.disusered.safe.encrypt(item.fileuri, '1234', VideoEnryptionSuccess, VideoEnryptionError); 
													  
                                                          }
													  
                                                      
                                                      }
                                                      if (fileTransfers !== undefined && fileTransfers.length > 0) {
                                                      for (var x = 0; x < fileTransfers.length; x++) {
                                                      var ftItem = fileTransfers[x];
                                                      if (ftItem.localname === localFileName && ftItem.dirname === itemDirStr) {
                                                      fileTransfers.splice(x, 1);
                                                      break;
                                                      }
                                                      }
                                                      }
                                                      ft = null;
                                                      returnFunction({
                                                                     filename: downloadFileName,
                                                                     success: true,
                                                                     localfilename: localFileName
                                                                     });
                                                      };
                                                      var onFileDownloadError = function(error) {
                                                      isCheckDeviceOnline();
                                                      if (fileTransfers !== undefined && fileTransfers.length > 0) {
                                                      for (var x = 0; x < fileTransfers.length; x++) {
                                                      var ftItem = fileTransfers[x];
                                                      if (ftItem.localname === localFileName && ftItem.dirname === itemDirStr) {
                                                      fileTransfers.splice(x, 1);
                                                      break;
                                                      }
                                                      }
                                                      }
                                                      ft = null;
                                                      if (fileListType.length > 0 && item !== undefined) {
                                                      item.isdownloaded = false;
                                                      item.fileuri = "";
                                                      item.downloading = -1;
                                                      activeUser.saveFilesList(undefined, fileListType, false, function() {});
                                                      if(fileListType==="audiocategories"){
                                                      updatePlaylistItemStatus(item, function(){});
                                                      }
                                                      }
                                                      if (fileEntry !== undefined) {
                                                      try {
                                                      fileEntry.remove();
                                                      } catch (e) {}
                                                      }
                                                      returnFunction({
                                                                     filename: "",
                                                                     success: false,
                                                                     localfilename: localFileName
                                                                     });
                                                      };
                                                      if (showProgress === true || (fileListType==="audiocategories" && $(".pbd-" + item.audioid)!==undefined)) {
                                                      ft.onprogress = function(progressEvent) {
                                                      if (progressEvent.lengthComputable) {
                                                      var perc = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                                                      if (perc > 0) {
                                                      var percpercent = perc + resources.percent;
                                                      if (showProgress === true|| (fileListType==="audiocategories" && $(".pbd-" + item.audioid)!==undefined)) {
                                                      $("#" + progressSpanId).html(percpercent);
                                                      if(fileListType==="audiocategories"){
                                                      var audioId = item.audioid;
                                                      $(".pbd-" + audioId).html(percpercent);
                                                      $(".pbs-" + audioId).css("width", percpercent);
                                                      }
                                                      }
                                                      if (fileListType.length > 0) {
                                                      item.downloading = perc;
                                                      if(fileListType==="audiocategories"){
                                                      updatePlaylistItemStatus(item, function(ret){});
                                                      }
                                                      }
                                                      }
                                                      }
                                                      };
                                                      }
                                                      ft.download(remoteMediaFileUrl, localMediaPath, onFileDownloadSuccess, onFileDownloadError);
                                                      if (fileTransfers !== undefined) {
                                                      var fileDownloadItem = {};
                                                      fileDownloadItem.dirname = itemDirStr;
                                                      fileDownloadItem.localname = localFileName;
                                                      fileDownloadItem.ftitem = ft;
                                                      fileDownloadItem.file = fileEntry;
                                                      fileDownloadItem.item = item;
                                                      fileDownloadItem.type = fileListType;
                                                      fileDownloadItem.spanid = progressSpanId;
                                                      fileDownloadItem.progressid = progressId;
                                                      fileDownloadItem.barid = progressBarId;
                                                      fileDownloadItem.btnid = btnId;
                                                      fileTransfers.push(fileDownloadItem);
                                                      }
                                                      },
                                                      function(error) {
                                                      if(error.code===12){
                                                      // File exists
                                                      var existingFile = itemDir.nativeURL + localFileName;
                                                      if (fileListType.length > 0 && item !== undefined) {
                                                      item.isdownloaded = true;
                                                      item.fileuri = existingFile;
                                                      item.downloading = -1;
                                                      if(fileListType==="audiocategories"){
                                                      updatePlaylistItemStatus(item, function(){});
                                                      setAudioDownloadStatus(item, function(){});
                                                      }
                                                      activeUser.saveFilesList(undefined, fileListType, false, function() {});
                                                      
                                                      }
                                                      
                                                      ft = null;
                                                      returnFunction({
                                                                     filename: existingFile,
                                                                     success: true,
                                                                     localfilename: localFileName
                                                                     });
                                                      }else{
                                                      returnFunction({
                                                                     filename: "",
                                                                     success: false,
                                                                     localfilename: localFileName
                                                                     });
                                                      }
                                                      });
                                      }, function(error) {
                                      returnFunction({
                                                     filename: "",
                                                     success: false,
                                                     localfilename: localFileName
                                                     });
                                      });
        }
    } catch (e) {
        errorHandler("downloadMediaFileItem", e);
        returnFunction({
                       filename: "",
                       success: false,
                       localfilename: ""
                       });
    }
}

function downloadThumbnailItems(returnFunction) {
    try {
        var thumbsDownloading = 0;
        var thumb;
        if (thumbnailsToDownload !== undefined && thumbnailsToDownload.length > 0) {
            for (var i = 0; i < thumbnailsToDownload.length; i++) {
                thumb = thumbnailsToDownload[i];
                if (thumb.downloading === 1) {
                    thumbsDownloading += 1;
                }
                if (thumbsDownloading >= 1) {
                    break;
                }
            }
            if (thumbsDownloading < 1) {
                for (var x = 0; x < thumbnailsToDownload.length; x++) {
                    thumb = thumbnailsToDownload[x];
                    if (thumb.downloading === 0) {
                        break;
                    }
                }
                thumb.downloading = 1;
                downloadMediaThumbnailItem(thumb.rootMediaDir, thumb.itemDirStr, thumb.localFileName, thumb.remoteMediaFileUrl, thumb.fileListType, thumb.item, function(ret) {
                                           var mediaThumbnailName = ret.localfilename;
                                           if (mediaThumbnailName !== undefined && mediaThumbnailName.length > 0) {
                                           for (var y = 0; y < thumbnailsToDownload.length; y++) {
                                           var thumbItem = thumbnailsToDownload[y];
                                           if (thumbItem.localFileName === mediaThumbnailName) {
                                           if (mediaThumbnailName === "DefaultThumbnail.png") {
                                           podcastThumbnailDefaultUrl = ret.filename;
                                           }
                                           thumbnailsToDownload.splice(y, 1);
                                           if (y === 0 && thumbnailsToDownload.length > 0) {
                                           thumbItem = thumbnailsToDownload[y];
                                           if (thumbItem.localFileName === mediaThumbnailName) {
                                           thumbnailsToDownload.splice(y, 1);
                                           }
                                           }
                                           break;
                                           }
                                           }
                                           }
                                           if (thumbnailsToDownload.length > 0) {
                                           downloadThumbnailItems(function(ret) {});
                                           } else {
                                           checkDownloadItems(function() {});
                                           }
                                           });
                returnFunction(true);
            } else {
                returnFunction(true);
            }
        } else {
            checkDownloadItems(function() {});
        }
    } catch (e) {
        errorHandler("downloadThumbnailItems", e);
        returnFunction(false);
    }
}

function downloadMediaThumbnailItem(rootMediaDir, itemDirStr, localFileName, remoteMediaFileUrl, fileListType, item, returnFunction) {
    try {
        if (rootMediaDir != undefined) {
            rootMediaDir.getDirectory(itemDirStr, {
                                      create: true,
                                      exclusive: false
                                      }, function(itemDir) {
                                      itemDir.getFile(localFileName, {
                                                      create: false,
                                                      exclusive: false
                                                      }, function(fileE) {
                                                      if (item !== undefined) {
                                                      item.localthumbnail = fileE.toURL();
                                                      }
                                                      var url = fileE.toURL();
                                                      returnFunction({
                                                                     filename: url,
                                                                     success: true,
                                                                     localfilename: localFileName
                                                                     });
                                                      }, function() {
                                                      if (deviceIsOnline === true) {
                                                      itemDir.getFile(localFileName, {
                                                                      create: true,
                                                                      exclusive: true
                                                                      }, function(fileEntry) {
                                                                      var localMediaPath = fileEntry.toURL();
                                                                      remoteMediaFileUrl = encodeURI(remoteMediaFileUrl);
                                                                      var ft = new FileTransfer();
                                                                      var fileNameURL = "";
                                                                      var onFileDownloadSuccess = function(entry) {
                                                                      if (item !== undefined) {
                                                                      item.localthumbnail = entry.toURL();
                                                                      }
                                                                      fileNameURL = entry.toURL();
                                                                      if (thumbnailTransfers !== undefined && thumbnailTransfers.length > 0) {
                                                                      for (var x = 0; x < thumbnailTransfers.length; x++) {
                                                                      var ftItem = thumbnailTransfers[x];
                                                                      if (ftItem.localname === localFileName && ftItem.dirname === itemDirStr) {
                                                                      thumbnailTransfers.splice(x, 1);
                                                                      break;
                                                                      }
                                                                      }
                                                                      }
                                                                      ft = null;
                                                                      returnFunction({
                                                                                     filename: fileNameURL,
                                                                                     success: true,
                                                                                     localfilename: localFileName
                                                                                     });
                                                                      };
                                                                      var onFileDownloadError = function(error) {
                                                                      if (thumbnailTransfers !== undefined && thumbnailTransfers.length > 0) {
                                                                      for (var x = 0; x < thumbnailTransfers.length; x++) {
                                                                      var ftItem = thumbnailTransfers[x];
                                                                      if (ftItem.localname === localFileName && ftItem.dirname === itemDirStr) {
                                                                      thumbnailTransfers.splice(x, 1);
                                                                      break;
                                                                      }
                                                                      }
                                                                      }
                                                                      ft = null;
                                                                      if (fileEntry !== undefined) {
                                                                      try {
                                                                      fileEntry.remove();
                                                                      } catch (e) {}
                                                                      }
                                                                      returnFunction({
                                                                                     filename: "",
                                                                                     success: false,
                                                                                     localfilename: localFileName
                                                                                     });
                                                                      };
                                                                      ft.download(remoteMediaFileUrl, localMediaPath, onFileDownloadSuccess, onFileDownloadError, true);
                                                                      if (thumbnailTransfers !== undefined) {
                                                                      var thumbDownloadItem = {};
                                                                      thumbDownloadItem.dirname = itemDirStr;
                                                                      thumbDownloadItem.localname = localFileName;
                                                                      thumbDownloadItem.ftitem = ft;
                                                                      thumbDownloadItem.file = fileEntry;
                                                                      thumbnailTransfers.push(thumbDownloadItem);
                                                                      }
                                                                      }, function(error) {
                                                                      returnFunction({
                                                                                     filename: "",
                                                                                     success: false,
                                                                                     localfilename: localFileName
                                                                                     });
                                                                      });
                                                      }
                                                      });
                                      }, function(error) {
                                      returnFunction({
                                                     filename: "",
                                                     success: false,
                                                     localfilename: localFileName
                                                     });
                                      });
        }
    } catch (e) {
        returnFunction({
                       filename: "",
                       success: false,
                       localfilename: localFileName
                       });
    }
}

function failError(error) {}

function localFileExists(rootMediaDir, itemDirStr, localFileName, item, fileListType, isAudioMix, deletefile, isThumbnail, returnFunction) {
    try {
        if (rootMediaDir != undefined) {
            var updatedFile = false;
            rootMediaDir.getDirectory(itemDirStr, {
                                      create: true,
                                      exclusive: false
                                      },
                                      function(itemDir) {
                                      itemDir.getFile(localFileName, {
                                                      create: false,
                                                      exclusive: true
                                                      },
                                                      function(fileE) {
                                                      if (isAudioMix === true && item !== undefined) {
                                                      if (deletefile === true) {
                                                      item.audiomixdownloaded = false;
                                                      item.alldownloaded = false;
                                                      item.audioisdownloading = -1;
                                                      item.audiomixurl = "";
                                                      fileE.remove();
                                                      updatedFile = true;
                                                      } else {
                                                      if (item.audiomixurl !== fileE.toURL()) {
                                                      updatedFile = true;
                                                      }
                                                      item.audiomixdownloaded = true;
                                                      item.audiomixurl = fileE.toURL();
                                                      item.audioisdownloading = -1;
                                                      }
                                                      } else {
                                                      if (isThumbnail === true && item !== undefined) {
                                                      if (deletefile === true) {
                                                      item.localthumbnail = "";
                                                      fileE.remove();
                                                      updatedFile = true;
                                                      } else {
                                                      if (item.localthumbnail !== fileE.toURL()) {
                                                      updatedFile = true;
                                                      }
                                                      item.localthumbnail = fileE.toURL();
                                                      }
                                                      } else {
                                                      if (item !== undefined) {
                                                      if (deletefile === true) {
                                                      item.isdownloaded = false;
                                                      item.downloading = -1;
                                                      item.fileuri = "";
                                                      fileE.remove();
                                                      updatedFile = true;
                                                      } else {
                                                      if (item.fileuri !== fileE.toURL()) {
                                                      updatedFile = true;
                                                      }
                                                      item.isdownloaded = true;
                                                      item.downloading = -1;
                                                      item.fileuri = fileE.toURL();
                                                      }
                                                      }
                                                      }
                                                      }
                                                      returnFunction(updatedFile);
                                                      },
                                                      function(error) {
                                                      if (isAudioMix === true && item !== undefined) {
                                                      if (item.audiomixurl.length > 0) {
                                                      updatedFile = true;
                                                      }
                                                      item.audiomixdownloaded = false;
                                                      item.audiomixurl = "";
                                                      item.alldownloaded = false;
                                                      item.audioisdownloading = -1;
                                                      } else {
                                                      if (isThumbnail === true && item !== undefined) {
                                                      if (item.localthumbnail.length > 0) {
                                                      updatedFile = true;
                                                      }
                                                      item.localthumbnail = "";
                                                      } else {
                                                      if (item !== undefined) {
                                                      item.isdownloaded = false;
                                                      item.downloading = -1;
                                                      if (item.fileuri.length > 0) {
                                                      updatedFile = true;
                                                      }
                                                      item.fileuri = "";
                                                      }
                                                      }
                                                      }
                                                      returnFunction(updatedFile);
                                                      });
                                      },
                                      function() {
                                      returnFunction(false);
                                      });
        } else {
            returnFunction(false);
        }
    } catch (e) {
        errorHandler("localFileExists", e);
        returnFunction(false);
    }
}

function checkDownloadItems(returnFunction) {
    try {
        if(device.platform==="iOS"){
            if ((mediaToDownload !== undefined && mediaToDownload.length > 0) || (audioMixToDownload !== undefined && audioMixToDownload.length > 0) || (thumbnailsToDownload !== undefined && thumbnailsToDownload.length > 0)) {
                window.plugins.insomnia.keepAwake();
            } else {
                window.plugins.insomnia.allowSleepAgain();
            }
        }
        returnFunction( true);
    } catch (e) {
        errorHandler("checkDownloadItems", e);
        returnFunction( false);
    }
}
function setPlaylistDownloadTrack(fileUri, audioId, isDeleted, returnFunction) {
    try {
        var updatePlaylist=false;
        var plAudioId = audioId.replace("mp3", "");
        var playlistDownloaded=true;
        var playlistStillDownloading=false;
        if(activeUser.userplaylists!==undefined && activeUser.userplaylists.length>0){
            var pl, pli;
            for (var y=0; y<activeUser.userplaylists.length; y++){
                pl =activeUser.userplaylists[y];
                playlistDownloaded=true;
                var itemId = pl.userplaylistid;
                if (pl.userplaylistid===0 && pl.userplaylistid.tempid > 0){
                    itemId = "temp" + pl.userplaylistid.tempid;
                }
                if(pl.playlistitems!==undefined && pl.playlistitems.length > 0){
                    for (var x=0; x<pl.playlistitems.length; x++){
                        pli =pl.playlistitems[x];
                        
                        if(pli.audioid===parseInt(plAudioId,10)){
                            if(isDeleted===true){
                                updatePlaylist=true;
                                pli.isdownloaded=false;
                                pli.fileuri="";
                                pli.downloading=-1;
                                $(".pba-" + audioId).hide();
                                $(".pbw-" + audioId).hide();
                                $(".btn-" + audioId).show();
                                $(".playlistdownloaditembtn-" + audioId).removeClass("playlistdeleteitem").addClass("downloadaudiobtn");
                            }else{
                                updatePlaylist=true;
                                pli.isdownloaded=true;
                                pli.fileuri=fileUri;
                                pli.downloading=-1;
                                $(".pba-" + audioId).hide();
                                $(".pbw-" + audioId).hide();
                                $(".btn-" + audioId).hide();
                                
                                $(".playlistdownloaditembtn-" + audioId).removeClass("downloadaudiobtn").addClass("playlistdeleteitem");
                                $(".playlistdownloaditembtn-" + audioId).show();
                            }
                        }
                        if(pli.isdownloaded===false){
                            playlistDownloaded=false;
                        }
                        if(pli.downloading!==-1){
                            playlistStillDownloading=true;
                        }
                    }
                    if(playlistDownloaded===true){
                        $("#downloadallplaylist-" + itemId).addClass("deleteallplaylistbtn");
                        $("#downloadallplaylist-" + itemId).removeClass("downloadallplaylistbtn");
                        $("#downloadallplaylist-" + itemId).hide();
                        var middivid = "#mixdiv-" + itemId;
                        activeUser.saveFilesList(undefined, "userplaylists", true, function() {});
                        $(middivid).html("");
                        setDeleteAudioBtn();
                        setDeleteAllAudiosBtn();
                    }else{
                        $("#downloadallplaylist-" + itemId).removeClass("deleteallplaylistbtn");
                        $("#downloadallplaylist-" + itemId).addClass("downloadallplaylistbtn");
                        if(playlistStillDownloading===false){
                            $("#downloadallplaylist-" + itemId).show();
                            $("#podcastitemdiv-" + itemId).show();
                            $("#podcastitemdiv-" + itemId).html(resources.downloadallaudios);
                        }
                    }
                }
            }
        }
        
        if(updatePlaylist===true){
            activeUser.saveFilesList(undefined, "userplaylists", true, function() {});}
        
        returnFunction(true);
    } catch (e) {
        errorHandler("setPlaylistDownloadTrack", e);
        returnFunction(false);
    }
}
function updatePlaylistItemStatus(audioItem, returnFunction){
    try{
        var updatePlaylists = false;
        if (activeUser.userplaylists !== undefined && activeUser.userplaylists.length > 0
            && ($("#userplaylisttab").css("display")==="none")===false){
            if(audioItem!==undefined){
                var audioId = audioItem.audioid.replace("mp3", "");
                var pl, pli;
                for (var y=0; y<activeUser.userplaylists.length; y++){
                    pl =activeUser.userplaylists[y];
                    if(pl.playlistitems!==undefined && pl.playlistitems.length > 0){
                        for (var x=0; x<pl.playlistitems.length; x++){
                            pli =pl.playlistitems[x];
                            if(pli.audioid===parseInt(audioId,10)){
                                updatePlaylists=true;
                                pli.isdownloaded=audioItem.isdownloaded;
                                pli.downloading=audioItem.downloading;
                                pli.fileuri = audioItem.fileuri;
                            }
                        }
                    }
                }
            }
        }
        returnFunction(true);
    } catch (e) {
        errorHandler("updatePlaylistItemStatus", e);
        returnFunction(false);
    }
}

function setAudioDownloadStatus(audioItem, returnFunction){
    try{
        if(audioItem!==undefined){
            var ids = audioItem.categoryid.split("-");
            var category = activeUser.getAudiocategoryById(ids[0], ids[1] + "-" + ids[2]);
            if(category!==undefined){
                category.setDownloadStatus(function(){
                                           activeUser.saveFilesList(undefined, "audiocategories", false, function() {});
                                           });
            }
        }
        returnFunction(true);
    } catch (e) {
        errorHandler("setAudioDownloadStatus", e);
        returnFunction(false);
    }
}


function setAudioCategoryStatus(tabId, catId, returnFunction){
    try{
        var category = activeUser.getAudiocategoryById(tabId, catId);
        if (category !== undefined) {
            
            if(category.audiomixdownloaded===false){
                var aItemId = category.tabid + "-" + category.categoryid;
                var audBtnId = "#podcastitemdiv-" + aItemId;
                var totalDownloaded = 0;
                for (d = 0; d < category.audios.length; d++) {
                    var audItem = category.audios[d];
                    if (audItem.isdownloaded === true) {
                        totalDownloaded += 1;
                    }
                }
                if (totalDownloaded === category.audios.length) {
                    $(audBtnId).removeClass("downloadingfiles");
                    $(audBtnId + " .mixdownloadtitle").html(resources.deleteallaudios);
                    
                    var middivid = audBtnId.replace("podcastitemdiv", "mixdiv");
                    $(middivid).html("");
                    
                    var btnIdCat = audBtnId.replace("podcastitemdiv", "downloadallaudiosbtn");
                    $(btnIdCat).removeClass("downloadallaudiosbtn").addClass("deleteallaudiosbtn");
                    var newBtnCatId =btnIdCat.replace("#downloadall", "deleteall");
                    $(btnIdCat).attr("id", newBtnCatId);
                    
                    category.alldownloaded = true;
                    setDeleteAudioBtn();
                    setDeleteAllAudiosBtn();
					 $("#tmsdeleteall").addClass("swipedeleteall");
                    $(".podcastitemsul").listview("refresh");
                }
            }
        }
        returnFunction(true);
    } catch (e) {
        errorHandler("setAudioCategoryStatus", e);
        returnFunction(false);
    }
}function VideoEnryptionSuccess() {
 console.log("Encruption Success");
}
function succall()
{
	console.log("success ");
}

function VideoEnryptionError() {
 console.log("Encryption Error ");
}

function failcall()
{
console.log("success ");	
}


$(document).on("click", ".onall", function() {
}).on("swipeleft", ".swipedeleteall", function(e) {
	onlyrestoreswipe(); 
  $(".onall").removeClass("nodisplay");
  $(this).css({
    transform: "translateX(-100px)",
	transition: "transform 300ms ease"
  });
  
    
	
  });

$(document).on("click", ".on", function() {
  
  var retid=this.id;
  
   retid = retid.replace("ondeleteaudio", "mdeleteaudio");
   $("#" + retid).removeClass("swipeallow");
  var deltrtid=retid.replace("mdeleteaudio", "deleteaudio");
  $("#"+retid).css({
    transform: "translateX(0px)"
	
  });
  $("#"+deltrtid+""+".deleteaudiobtn").trigger("vclick");
  //navigator.notification.alert(retid);
setTimeout(function() {
                               $(".on").addClass("nodisplay");
							    $(".onall").addClass("nodisplay");
                               }, 600);	
  
  
  }).on("swipeleft", ".swipeallow", function(e) {
	  onlyrestoreswipe(swipedelementid); 
	var swipeid=this.id;
	swipeid = swipeid.replace("mdeleteaudio", "ondeleteaudio");
	 $("#" + swipeid).removeClass("nodisplay");
  $(this).css({
    transform: "translateX(-100px)",
	transition: "transform 300ms ease"
  });
swipedelementid=this.id;
  });



$(document).on("swiperight", ".swipedeleteall", function(e) {
	
	restoreswipe();
});

$(document).on("swiperight", ".swipeallow", function(e) {
	restoreswipe();
});



$(document).on("click", function(e) {
	restoreswipe();
});


function restoreswipe(){
	$(".swipedeleteall").css({
	transform: "translateX(0px)"

	});
	
 $(".swipeallow").css({
	transform: "translateX(0px)"

	});

setTimeout(function() {
                               $(".on").addClass("nodisplay");
							    $(".onall").addClass("nodisplay");
                               }, 600);	

}


function onlyrestoreswipe(sid){
	$(".swipedeleteall").css({
	transform: "translateX(0px)"

	});
	
 $(".swipeallow").css({
	transform: "translateX(0px)"

	});
	
	setTimeout(function() {
	sid = sid.replace("mdeleteaudio", "ondeleteaudio");
	 $("#" + sid).addClass("nodisplay");
	 $(".onall").addClass("nodisplay");
						}, 600);	
}


            

function getInput(e){
	
	var theEvent = e || window.event;
                var keyPressed = theEvent.keyCode || theEvent.which;
				if (keyPressed == 13) {
                    $('.selplaylistitem').trigger( 'click' );
                }
	
}

  
