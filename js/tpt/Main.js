var ptjq = jQuery.noConflict();
var $ = ptjq;

$(document).bind("ready", function(){
	$("#ShowChangeLog").mousedown(function(){
		$("#ChangeLogHidden").slideDown("fast");
		$("#ChangeLogHidden").fadeIn("fast");
		return false;
	});
	$("#ShowOtherDownloads").mousedown(function(){
		$("#OtherDownloadsHidden").slideDown("fast");
		$("#OtherDownloadsHidden").fadeIn("fast");
		return false;
	});
	$("#ShowSuggestionForm").mousedown(function(){
		$("#SuggestionFormHidden").slideDown("fast");
		$("#SuggestionFormHidden").fadeIn("fast");
		$("#ShowSuggestionForm").slideUp("fast");
		$("#ShowSuggestionForm").fadeOut("fast");
		return false;
	});
	$("#HideSuggestionForm").mousedown(function(){
		$("#SuggestionFormHidden").slideUp("fast");
		$("#SuggestionFormHidden").fadeOut("fast");
		$("#ShowSuggestionForm").slideDown("fast");
		$("#ShowSuggestionForm").fadeIn("fast");
		return false;
	});
	$(".LabelledField").focus(function(){
		if(this.value==$(this).attr("label")){
			this.value = "";
			this.style.color = null;
		}
	});
	$(".LabelledField").blur(function(){
		if(this.value==""){
			this.value = $(this).attr("label");
			this.style.color = "#AAAAAA";
		}
	});
	$(".LabelledField").each(function(){
		if(this.value==""){
			this.value = $(this).attr("label");
			this.style.color = "#AAAAAA";
		}
	});
	$(".SearchField").focus(function(){
		if(this.value=="Search"){
			this.value = "";
			this.style.color = null;
		}
	});
	$(".SearchField").blur(function(){
		if(this.value==""){
			this.value = "Search";
			this.style.color = "#AAAAAA";
		}
	});
	$("input[type='text']").on("focus", function(){
		cThis = $(this);
		if(cThis.attr("title")!=null){
			if(this.value==cThis.attr("title")){
				this.value = "";
				this.style.color = null;
			}
		}
	});
	$("input[type='text']").on("blur", function(){
		cThis = $(this);
		if(cThis.attr("title")!=null){
			if(this.value==""){
				this.value = cThis.attr("title");
				this.style.color = "#AAAAAA";
			}
		}
	});
	$("input[type='text']").each(function(){
		cThis = $(this);
		if(cThis.attr("title")!=null){
			if(this.value==""){
				this.value = cThis.attr("title");
				this.style.color = "#AAAAAA";
			}
		}
	});
	$(".TabContainer").each(function(){
		ParseTabs($(this));
	});
	$("form.SaveDownloadDo").on("submit", function(){
		$("#SaveDownloadButton").attr("disabled", "disabled");
		Link = $(this).attr("action").replace(/\.html/, ".json");
		$.post(Link, $(this).serialize(), function(data){
			PopupUtility(data.HTML);
			//$("#SaveDownloadButton").removeAttr("disabled", "disabled");
			//$("#SaveDownloadButton").val("Queued");
			$("#SaveDownloadButton").removeAttr("disabled");
		}, "json");
		return false;
	})
	if($(".ad-container").height()==0){
		$(".ad-container").replaceWith("<div style=\"font-size: 18px; margin: 10px; text-align: center;\">Please don't block the ads :(</div>");
	} else {
		//$(".TopAdContainer").replaceWith("<a>:(</a>");
	}
});
function PopupUtility(HTML){
	UtilityBg = $("<div class=\"UtilityBg\"></div>").prependTo(document.body);
	UtilityBg.click(function(){
		//$(this).remove();
	});
	UtilityPopup = $("<div class=\"UtilityPopup\"></div>").prependTo(UtilityBg);
	UtilityPopupData = $("<div class=\"UtilityPopupData\"></div>").prependTo(UtilityPopup);
	UtilityPopupControls = $("<div class=\"UtilityPopupControls\"></div>").appendTo(UtilityPopup);
	UtilityCloseButton = $("<input type=\"button\" value=\"Close\"/>").appendTo(UtilityPopupControls);
	UtilityCloseButton.click(function(){
		$(this).parents(".UtilityBg").remove();
	});
	UtilityPopupData.html(HTML);
	UtilityPopupData.children(".TabContainer").each(function(){
		ParseTabs($(this));
	});
}
function ajaxTooltip(element, location){
	$(".popover").remove();
	/*Tooltip = $("<div class=\"ToolTip\">Loading</div>");
		Tooltip.prependTo(document.body);
	Tooltip.css("position", "absolute");
	Tooltip.css("left", element.offset().left - (Tooltip.width()/2) + (element.width()/2));
	Tooltip.css("top", element.offset().top + element.height());
	Tooltip.css("opacity", "0");
	Tooltip.animate({"opacity": 1, "top":element.offset().top + element.height()+20}, 200);
	$.get(location, function(data){
		Tooltip.html(data);
	}, "html");*/
	var popOver = $('<div class="popover fade bottom in" style="display: block;"></div>');
	popOver.appendTo(document.body);
	var arrow = $('<div class="arrow"></div>').appendTo(popOver);
	var inner = $('<div class="popover-inner"></div>').appendTo(popOver);
	var title = $('<h3 class="popover-title">Tag Info</h3>').appendTo(inner);
	var content = $('<div class="popover-content">Loading...</div>').appendTo(inner);
	popOver.css("left", element.offset().left - (popOver.width()/2) + (element.width()/2));
	popOver.css("top", element.offset().top + element.height());
	$.get(location, function(data){
		content.html(data);
	}, "html");
}
function ParseTabs(Container){
	ContainerParent = Container.parent();
	Tabs = ContainerParent.children(".TabbingTab");
	Tabs.each(function(){
		NewElement = $("<a href=\"#\"></a>").prependTo(Container);
		NewElement.attr("id", $(this).attr("id"));
		NewElement.attr("class", $(this).attr("class"));
		NewElement.text($(this).text());
		NewElement.click(function(){
			ContentID = $(this).attr("id").replace(/Tab_([A-Za-z]+)/g, "TabC_$1");
			ContentContainer = $("#"+ContentID);
			ContentContainer.parent().children(".TabbingContent").hide();
			ContentContainer.show();
		});
		NECID = NewElement.attr("id").replace(/Tab_([A-Za-z]+)/g, "TabC_$1");
		$("#"+NECID).hide();
		$(this).remove();
	});
}

function SaveBlock(Element){
		//Element = $(this);
		SaveID = $(Element).children("b").html();
		ptjq.getJSON('/Browse/View.json?ID='+SaveID, function(data){
			SaveElement = ptjq("<div class=\"savegame\"></div>");
			ImgElement = ptjq("<a href=\"/Browse/View.html?ID="+data.ID+"\"><img height=\"96\" width=\"153\" src=\"//static.powdertoy.co.uk/"+data.ID+"_small.png\"/></a>").appendTo(SaveElement);
			ImgElement.on("mouseover", function(){
				CImgElement = ptjq(this);
				if(CImgElement.hasClass("active") == false)
				{
					CImgElement.addClass("active");
					ImgOverlay = ptjq('<div class="overlay"></div>').prependTo(CImgElement.parent());
					ImgOverlay.css({"opacity": 0, "top": "28px"});
					//FormElement = ptjq('<form class="SaveDownloadDo" method="POST" action="/Browse/View.html?ID='+data.ID+'"><input type="hidden" name="DoDownload" value="'+data.ID+'"/></form>').appendTo(ImgOverlay);
					FormElement = ptjq('<form class="SaveDownloadDo" method="POST" action="/Browse/View.html?ID='+data.ID+'"></form>').appendTo(ImgOverlay);
					ptjq('<a class="btn btn-primary" href="/Browse/View.html?ID='+data.ID+'">View</a>').appendTo(FormElement);
					var OpenButton = ptjq('<a class="btn btn-inverse">Open</a>').appendTo(FormElement);
					OpenButton.attr("href", "ptsave:"+data.ID+"#"+data.Name);
					/*if(CImgElement.queued == true) {
						ptjq('<input type="submit" class="btn-submit btn btn-success disabled" value="Queue"/>').appendTo(FormElement);
					} else {
						ptjq('<input type="submit" class="btn-submit btn btn-inverse" value="Queue"/>').appendTo(FormElement);
					}
					FormElement.submit(function(){
						Form = $(this);
						Form.children(".btn-submit").addClass("disabled");
						Form.children(".btn-submit").val("Queueing");
						Link = Form.attr("action").replace(/\.html/, ".json");
						ptjq.post(Link, $(this).serialize(), function(data){
							//PopupUtility(data.HTML);
							if(data.Status=="1"){
								CDownloadElement = Form.children(".btn-submit");
								CDownloadElement.val("Queued");
								CDownloadElement.addClass("btn-success");
								CDownloadElement.addClass("disabled");
								CDownloadElement.removeClass("btn-inverse");
							} else {
								PopupUtility(data.HTML);
							}
						}, "json");
						return false;
					});*/


					ImgOverlay.animate({"opacity": 1, "top": "3px"}, 200);

					ImgOverlay.on("mouseleave", function(){
						CImgOverlay = $(this);
						CImgElement = CImgOverlay.parent().children("a");
						CImgOverlay.animate({"opacity": 0, "top": "-23px"}, 200, function(){
							CImgOverlay.remove();
							CImgElement.removeClass("active");
						});
					});
				}
			});

			SaveInfoElement = ptjq("<div class=\"caption\"></div>").appendTo(SaveElement);
				TitleElement = ptjq("<h5 title=\"\"><a href=\"/Browse/View.html?ID="+data.ID+"\"></a></h5>").appendTo(SaveInfoElement);
				TitleElement.attr("title", data.Name);
				TitleElement.find("a").text(data.ShortName);
				AuthorElement = ptjq("<span class=\"author\"></span>").appendTo(SaveInfoElement);
				AuthorElement.text(data.Username);
				CommentsElement = ptjq("<span class=\"comments\">"+data.Comments+" comments</span>").appendTo(SaveInfoElement);
				ClearElement = ptjq("<div class=\"Clear\"></div>").appendTo(SaveInfoElement);
				/*FormElement = $("<form class=\"SaveDownloadDo\" method=\"POST\" action=\"/Browse/View.html?ID="+data.ID+"\"></form>").appendTo(SaveInfoElement);
					DownloadElement = $("<input type=\"submit\" class=\"btn\" id=\"fDB"+data.ID+"\" value=\"Download\"/>").appendTo(FormElement);
					HiddenIDElement = $("<input type=\"hidden\" name=\"DoDownload\" value=\""+data.ID+"\"/>").appendTo(FormElement);
				FormElement.submit(function(){
					Link = $(this).attr("action").replace(/\.html/, ".json");
					$.post(Link, $(this).serialize(), function(data){
						//PopupUtility(data.HTML);
						if(data.Status=="1"){
							CDownloadElement = $("#fDB"+data.SaveID);
							CDownloadElement.val("Queued");
							CDownloadElement.attr("disabled", "disabled");
						} else {
							PopupUtility(data.HTML);
						}
					}, "json");
					return false;
				});*/
			ptjq(Element).replaceWith(SaveElement);
		});
}