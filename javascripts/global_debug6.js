var notificationajaxcall =function (event) {console.log('abc1->var notificationajaxcall =function (event) {');
	if($("#evoucher_loadurl").length > 0)
	{  
		var notificationurl  = $("#evoucher_loadurl").val();
		if(typeof(event) !="undefined"){
			if(event.type=='click'){
				notificationurl  +=  "&close=true";
			}
		}
		$.ajax({
			type: 'POST',
			url: notificationurl,
			cache:false,
			async:true,
			xhrFields: {'withCredentials': true},
			dataType : 'html',
			success: function(data) {console.log('abc17->			success: function(data) {');
				$('#child').html(jQuery(data).find('#evoucher').html());
			},
			error: function(XMLHttpRequest,textStatus,errorThrown) {console.log('abc20->			error: function(XMLHttpRequest,textStatus,errorThrown) {');
			} 
		});
	}
};
var annoucement_call =function (event) {console.log('abc25->var annoucement_call =function (event) {');
					if($("#announcement_loadurl").length > 0)
			{  
		var	notificationurl  = $("#announcement_loadurl").val() + '?ajax=true';
		/*
		if(notificationurl.indexOf('http://')==-1){
			notificationurl = 'https://' + location.hostname + notificationurl;
		} else {
			notificationurl = notificationurl.replace('http://','https://');
		}*/
		if(typeof(event) !="undefined")
		notificationurl  +=  "&close=true";
 			$.ajax({
			type: 'POST',
			url: notificationurl,
			cache:false,
			async:true,
			dataType : 'html',
			success: function(data) {console.log('abc43->			success: function(data) {');
				  $('#annmain').html(jQuery(data).find('#announcement').clone());	
			},
			error: function(XMLHttpRequest,textStatus,errorThrown) {console.log('abc46->			error: function(XMLHttpRequest,textStatus,errorThrown) {');
			} 
			});
			}
    };
var pageLevelComponents = {
    tabs: function() {console.log('abc52->    tabs: function() {');
	 function filltabs(elementt)
        {
            var active_idxx;
            $('ul.tabbed-nav.tabs.hidden-phone li', $(elementt)).each(function(i, element) {console.log('abc56->            $(\'ul.tabbed-nav.tabs.hidden-phone li\', $(elementt)).each(function(i, element) {');
                if ($(element).hasClass('active')) {
                    active_idxx = i;
                }
                $(this).attr('data-index', i);
            });
            var totalLi = $(".tabs.hidden-phone li", $(elementt)).size();
            var prevLi = active_idxx - 1;
            if (prevLi < 0) {
                prevLi = totalLi - 1;
            }
            var nextLi = active_idxx + 1;
            if (nextLi == totalLi) {
                nextLi = 0;
            }
            if (totalLi >= 1) {
                $('ul.tabbed-nav.tabs.visible-phone', $(elementt)).empty();
                $prev_button = $('ul.hidden-phone li', $(elementt)).eq(prevLi);
                $prev_button_index = $prev_button.attr("data-index");
                $centerbutton = $('ul.tabbed-nav.tabs.hidden-phone li', $(elementt)).eq(active_idxx);
                $right_button = $('ul.tabbed-nav.tabs.hidden-phone li', $(elementt)).eq(nextLi);
                $right_button_index = $right_button.attr("data-index");
                $prev_button.clone(true).attr('class', 'prev').empty().append('<a class="icn-phone-tabbed-nav-leftarrow" data-index=' + $prev_button_index + '></a>').appendTo($('ul.tabbed-nav.tabs.visible-phone', $(elementt)));
                $centerbutton.clone(true).attr('class', 'active').appendTo($('ul.tabbed-nav.tabs.visible-phone', $(elementt)));
                $right_button.clone(true).attr('class', 'last-child next').empty().append('<a class="icn-phone-tabbed-nav-rightarrow" data-index=' + $right_button_index + '></a>').appendTo($('ul.tabbed-nav.tabs.visible-phone', $(elementt)));
            }
        }
        function filltabs_productinfo(elementt)
        {
            var active_idxx;
            $('ul.tabbed-nav.tabs li', $(elementt)).each(function(i, element) {console.log('abc86->            $(\'ul.tabbed-nav.tabs li\', $(elementt)).each(function(i, element) {');
                if ($(element).hasClass('active')) {
                    active_idxx = i;
                }
                $(this).attr('data-index', i);
            });
            var totalLi = $(".tabs li", $(elementt)).size();
            var prevLi = active_idxx - 1;
            if (prevLi < 0) {
                prevLi = totalLi - 1;
            }
            var nextLi = active_idxx + 1;
            if (nextLi == totalLi) {
                nextLi = 0;
            }
            if (totalLi > 1) {
                $('ul.tabbed-nav.tabs.visible-phone', $(elementt)).empty();
                $prev_button = $('ul li', $(elementt)).eq(prevLi);
                $prev_button_index = $prev_button.attr("data-index");
                $centerbutton = $('ul.tabbed-nav.tabs li', $(elementt)).eq(active_idxx);
                $right_button = $('ul.tabbed-nav.tabs li', $(elementt)).eq(nextLi);
                $right_button_index = $right_button.attr("data-index");
                $prev_button.clone(true).attr('class', 'prev').empty().append('<a class="icn-phone-tabbed-nav-leftarrow" data-index=' + $prev_button_index + '></a>').appendTo($('ul.tabbed-nav.tabs.visible-phone', $(elementt)));
                $centerbutton.clone(true).attr('class', 'active').appendTo($('ul.tabbed-nav.tabs.visible-phone', $(elementt)));
                $right_button.clone(true).attr('class', 'last-child next').empty().append('<a class="icn-phone-tabbed-nav-rightarrow" data-index=' + $right_button_index + '></a>').appendTo($('ul.tabbed-nav.tabs.visible-phone', $(elementt)));
            }
        }
        $(".product-browser .product li").click(function (eventObject) {console.log('abc113->        $(".product-browser .product li").click(function (eventObject) {');
            $('.product-browser .product li.active').removeClass('active');
            var $selectedLi = $(this);
            $('.product-browser .show').addClass('hide');
            $('.product-browser .show').removeClass('show');
            var category = $selectedLi.data('category').replace(/([ #;?&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
            $('.product-browser .product [data-category="' + category + '"]').addClass('active');
            var active_idx;
            $('.product-browser ul.tabbed-nav.product.hidden-phone li').each(function (i, element) {console.log('abc121->            $(\'.product-browser ul.tabbed-nav.product.hidden-phone li\').each(function (i, element) {');
                if ($(element).hasClass('active')) {
                    active_idx = i;
                }
            });
            var totalLi = $(".product-browser .product.hidden-phone li").size();
            var prevLi = active_idx - 1;
            if (prevLi < 0) {
                prevLi = totalLi - 1;
            }
            var nextLi = active_idx + 1;
            if (nextLi == totalLi) {
                nextLi = 0;
            }
            if (totalLi > 1) {
                $('.product-browser ul.tabbed-nav.product.visible-phone').empty();
                $('.product-browser ul.tabbed-nav.product.hidden-phone li').eq(prevLi).clone(true).attr('class', 'prev').empty().append('<div class="icn-phone-tabbed-nav-leftarrow"></div>').appendTo($('.product-browser ul.tabbed-nav.product.visible-phone'));
                $('.product-browser ul.tabbed-nav.product.hidden-phone li').eq(active_idx).clone(true).attr('class', 'active').appendTo($('.product-browser ul.tabbed-nav.product.visible-phone'));
                $('.product-browser ul.tabbed-nav.product.hidden-phone li').eq(nextLi).clone(true).attr('class', 'last-child next').empty().append('<div class="icn-phone-tabbed-nav-rightarrow"></div>').appendTo($('.product-browser ul.tabbed-nav.product.visible-phone'));
            }
            $('.product-browser .' + category).addClass('show');
            $('.product-browser .' + category).removeClass('hide');
        });
        // if ($('.tabbed-content ul.visible-phone').css("display") != "none") {
        $(".tabbed-content.product-info").each(function(ii, elementt) {console.log('abc145->        $(".tabbed-content.product-info").each(function(ii, elementt) {');
            filltabs_productinfo(elementt);
        });
        //  }
        /* [29-05-2013] Added by Ravi - iPhone to display the tabs for visible phone - END */
        $(".tabbed-content.product-info .tabbed-nav.tabs li").click(function(eventObject) {console.log('abc150->        $(".tabbed-content.product-info .tabbed-nav.tabs li").click(function(eventObject) {');
			$thislink = $(this).find("a").attr("href");
			if(($thislink==undefined)||($thislink.match("#tab")))
			{ 
				var $selectedLi = $(this);
				$(this).addClass('active');
				$upperdiv = $(this).closest('.tabbed-content');
				$('.tabbed-nav.tabs li.active', $upperdiv).removeClass('active');
				//var currenthref = $(this).find("a").attr("href");
				var current_index = $(this).attr('data-index');
				//alert(console.dir
				$(this).addClass('active');
				$($upperdiv).find("ul [data-index=" + current_index + "]").addClass('active');
				//$activetext=$.trim($(this).find(".active").text());
				filltabs($upperdiv);
				$('.tabcontent', $upperdiv).hide();
				//var activeTab = $(this).find("a").attr("href");
				//alert(current_index);
				//console.log($upperdiv.find(".tabcontent").eq(1).attr("class"));
				var activeTab = $upperdiv.find(".tabcontent").eq(current_index).show();
				$(activeTab).show();
				eventObject.preventDefault();
			}
        });
		  $('.tabbed-content:not(.product-info)').each(function(ii, elementt) {console.log('abc174->		  $(\'.tabbed-content:not(.product-info)\').each(function(ii, elementt) {');
            //$h2element = $(this).find("h2");
            //$('<ul class="tabs tabbed-nav visible-phone"></ul>').insertAfter($h2element);
            $h2element = $(this).find(".tabcontent").first();
            $('<ul class="tabs tabbed-nav visible-phone"></ul>').insertBefore($h2element);
        });
		   $('.tabbed-content:not(.product-info)').each(function(ii, elementt) {console.log('abc180->		   $(\'.tabbed-content:not(.product-info)\').each(function(ii, elementt) {');
            filltabs(elementt);
        });
		 $(".tabbed-content:not(.product-info) .tabbed-nav.tabs li").click(function(eventObject) {console.log('abc183->		 $(".tabbed-content:not(.product-info) .tabbed-nav.tabs li").click(function(eventObject) {');
            var $selectedLi = $(this);
            $(this).addClass('active');
            $upperdiv = $(this).closest('.tabbed-content');
            $('.tabbed-nav.tabs li.active', $upperdiv).removeClass('active');
            //var currenthref = $(this).find("a").attr("href");
            var current_index = $(this).attr('data-index');
            //alert(console.dir
            $(this).addClass('active');
            $($upperdiv).find("ul.hidden-phone [data-index=" + current_index + "]").addClass('active');
            //$activetext=$.trim($(this).find(".active").text());
			$activetext= $upperdiv.find('.active').text();
			$viewallbutton=$(this).parent().parent().find(".section-title").find("button");	
			$viewhref=$(this).parent().parent().find(".row-fluid").find(".launch");	
			$viewAllValue=$("#viewall").val();		
			if($viewAllValue !=null){
				$viewallbuttononclick_finaltext="javascript:window.location.assign('"+$viewAllValue+"?ct="+$activetext+"')";
				$viewallbutton.attr("onclick",$viewallbuttononclick_finaltext);
				$viewhref.attr("href",$viewallbuttononclick_finaltext);
			}
            filltabs($upperdiv);
            $('.tabcontent', $upperdiv).hide();
            //var activeTab = $(this).find("a").attr("href");
            //alert(current_index);
            //console.log($upperdiv.find(".tabcontent").eq(1).attr("class"));
            var activeTab = $upperdiv.find(".tabcontent").eq(current_index).show();
            $(activeTab).show();
            eventObject.preventDefault();
        });
		$(".tabbed-content:not(.product-info) .tabbed-nav.hidden-phone").each(function(){console.log('abc212->		$(".tabbed-content:not(.product-info) .tabbed-nav.hidden-phone").each(function(){');
			$activetext=$.trim($(this).find(".active").text());							
			$viewallbutton=$(this).parent().find(".section-title").find("button");
			$viewhref=$(this).parent().find(".row-fluid").find(".launch");
			$viewAllValue=$("#viewall").val();
			if($viewAllValue !=null){
				$viewallbuttononclick_finaltext="javascript:window.location.assign('"+$viewAllValue+"?ct="+$activetext+"')";
				$viewallbutton.attr("onclick",$viewallbuttononclick_finaltext);
				$viewhref.attr("href",$viewallbuttononclick_finaltext);
			}
		});
        $('.tabcontent').hide();
        $(".tabbed-content").find(".tabcontent:eq(0)").show();
    },
    getInTouch: function() {console.log('abc226->    getInTouch: function() {');
        /***** Enabling Chat Link in GetInTouch Module - Starts here ******/
        var pageURL = window.location.href;
        var pageSegments = pageURL.split('/');
        var pageSegment = "";
        if (pageSegments != null && pageSegments != "")
        {
            if (pageSegments[3] == "in")
                pageSegment = pageSegments[4];
            else if (pageSegments[3] == "id")
                pageSegment = pageSegments[4];
            else
                pageSegment = pageSegments[3];
        }
        //Hariharan D for TPC top Menu Image Section
        if (pageSegment == 'treasures-private-client' || pageSegment == 'treasures-private-client-zh') {
            $("#header .header-menu").find('>li>div>a>img').attr("src", "/iwov-resources/images/arrow-down.png");
            // Date: 18-10-2013 add Ravi
            $("a.dropdown-toggle").click(function() {console.log('abc244->            $("a.dropdown-toggle").click(function() {');
                $(".dropdown.highlightable").find('> a > img').attr("src", "/iwov-resources/images/arrow-down.png")
                if ($(this).parent().hasClass('open')) {
                    $(this).find('> img').attr("src", "/iwov-resources/images/git-arrow-down.png")
                } else {
                    $(this).find('> img').attr("src", "/iwov-resources/images/arrow-down.png")
                }
            });
            $('html').on("click", function() {console.log('abc252->            $(\'html\').on("click", function() {');
                $(".dropdown.highlightable").find('> a > img').attr("src", "/iwov-resources/images/arrow-down.png")
            });
            $('body').on("click", function() {console.log('abc255->            $(\'body\').on("click", function() {');
                $(".dropdown.highlightable").find('> a > img').attr("src", "/iwov-resources/images/arrow-down.png")
            });
        }
        var arrValues = ["treasures", "treasures-private-client", "private-banking", "treasures-zh", "treasures-private-client-zh", "private-banking-zh", "treasures-id", "treasures-sc", "sme"];
		//pageSegment="treasures";
        arrValues.forEach(function(entry) {console.log('abc261->        arrValues.forEach(function(entry) {');
            if (pageSegment == entry)
            {
                $("#chatwithUs").css('display', 'block');
            }
        });
        /***** Enabling Chat Link in GetInTouch Module - Ends here ******/
        function showChat() {console.log('abc268->        function showChat() {');
            $('.get-in-touch .git-container').addClass('hidden');
            $('.get-in-touch .chat').removeClass('hidden');
            // The event triggered on click of this is written in Livechat JS, cs.js
        }
        function showDisclaimer() {console.log('abc273->        function showDisclaimer() {');
            $('.get-in-touch .git-container').addClass('hidden');
            if ($(".col4-module.get-in-touch div.chat-disclaimer").length) {
                $(".col4-module.get-in-touch div.chat-disclaimer").removeClass("hidden");
            } else {
                // Following method is called from livechat JS,  cs.js
                showDisclaimerBody();
                // Handler when user click on 'X' on disclaimer
                $(".icn-white-x").click(function() {console.log('abc281->                $(".icn-white-x").click(function() {');
                    $(".col4-module.get-in-touch div.chat-disclaimer").addClass("hidden");
                    $(".col4-module.get-in-touch div.git-container").removeClass("hidden");
                });
                // Handler when user click on 'button' on disclaimer	 		  
                $('.col4-module.get-in-touch div.chat-disclaimer .chat-ok').unbind('click').click(function(event) {console.log('abc286->                $(\'.col4-module.get-in-touch div.chat-disclaimer .chat-ok\').unbind(\'click\').click(function(event) {');
                    event.stopPropagation();
                    event.preventDefault();
                    if (!$('#disclaimerCheck').attr('checked'))
                        return false;
                    $('#disclaimerCheck').prop('checked', false);
                    $(".col4-module.get-in-touch div.chat-disclaimer").addClass("hidden");
                    $(".col4-module.get-in-touch div.git-container").removeClass("hidden");
                    if (!isChatStarted()) { // [Date: 30-09-2013] add Amit Madhukar - Ravi
                        showChat();
                    }
                });
            }
        }
        if ($('.get-in-touch').length > 0) {
            $('.get-in-touch .chat-link').click(function(event) {console.log('abc301->            $(\'.get-in-touch .chat-link\').click(function(event) {');
                event.preventDefault();
                // Following methods are written in livechat JS,  cs.js
                if (isChaton() && validateOutOfOffice()) {
                    showDisclaimer();
                }
            });
            $('.get-in-touch .chat .icn-white-x').click(function(event) {console.log('abc308->            $(\'.get-in-touch .chat .icn-white-x\').click(function(event) {');
                event.preventDefault();
                $('.get-in-touch .git-container').removeClass('hidden');
                $('.get-in-touch .chat').addClass('hidden');
            });
            $('.get-in-touch .chat #toggleEmailInput').click(function(event) {console.log('abc313->            $(\'.get-in-touch .chat #toggleEmailInput\').click(function(event) {');
                if ($(this).attr('checked')) {
                    $('.get-in-touch #inputEmail').show();
                } else {
                    $('.get-in-touch #inputEmail').hide();
                }
            });
        }
    },
    HeroBanner: function() {console.log('abc322->    HeroBanner: function() {');
      var   interval = undefined,
                pointer = 0;
        var show = function(direction) {console.log('abc325->        var show = function(direction) {');
            var $content = $('#myCarousel .item').eq(pointer);
	var $active   =  $('#myCarousel  .item').eq(pointer);
  $('#myCarousel .carousel-inner ').animate({left: (direction == 'right' ? '100%' : '-100%')}, 300, function(){ console.log('abc328->  $(\'#myCarousel .carousel-inner \').animate({left: (direction == \'right\' ? \'100%\' : \'-100%\')}, 300, function(){ ');
  $('#myCarousel .carousel-inner .item').hide();
   $('#myCarousel  .item').eq(pointer).show();
$('#myCarousel .carousel-inner').attr('style','left:0;');
			var temp=0; 
			  $('#myCarousel .item').eq(pointer).next().addClass('active');
			  var $next = $('#myCarousel .item').removeClass('active').next();
if ($next.length) {
    $next.addClass('active'); 
}
else {
    $(".item:first").addClass('active');
}
        });
		 $('.landing-page-hero-tiles.mobile-controls  div').animate({left: (direction == 'right' ? '100%' : '-100%')}, 300, function(){ console.log('abc342->		 $(\'.landing-page-hero-tiles.mobile-controls  div\').animate({left: (direction == \'right\' ? \'100%\' : \'-100%\')}, 300, function(){ ');
		  var text = $('#myCarouselNav .item').eq(pointer).find("span").text();
            $('.landing-page-hero-tiles.mobile-controls .tile.text').text(text);
			$('.landing-page-hero-tiles.mobile-controls .tile.text').attr('style','left:0;');
			  var text = $('#myCarouselNav .item').eq(pointer).find("p").text();
            $('.landing-page-hero-tiles.mobile-controls .tile.text+p').text(text);
			$('.landing-page-hero-tiles.mobile-controls .tile.text+p').attr('style','left:0;');
			});
        };
        var timefunc;
        function resetInterval() {console.log('abc352->        function resetInterval() {');
            var t = $('.carNav .item').eq(pointer).attr('data-timeout') * 1000;
			//alert($('.landing-page-hero-tiles .item').eq(pointer).attr('data-timeout'));
			if(isNaN(t)||(t==0))
			t=5000;
             //console.log("t----------"+t+"-"+pointer);
			// t=60000;
            timefunc = setTimeout(function() {console.log('abc359->            timefunc = setTimeout(function() {');
				console.log("pta->"+pointer);
                pointer++;
				// if (pointer == $(".landing-page-hero-content a").length) {
                if (pointer == $("#myCarouselNav .item").length ) {
                    pointer = 0;
                }
					console.log("pta1->"+pointer);
                show('left');
					console.log("pta2->"+pointer);
                resetInterval();
            }, t);
        }
        ;
        // initial state for background image, delayed by $(window).load()
        resetInterval();
        $('.landing-page-hero-tiles.mobile-controls .tile:not(.text)').click(function(eventObject) {console.log('abc375->        $(\'.landing-page-hero-tiles.mobile-controls .tile:not(.text)\').click(function(eventObject) {');
            // hide();
            var $selectedTile = $(this);
            if ($selectedTile.hasClass('next')) {
                pointer++;
                if (pointer > $("#myCarouselNav .item").length-1) {
                    pointer = 0;
                }
            } else if ($selectedTile.hasClass('prev')) {
                pointer--;
                if (pointer < 0) {
                    pointer = $("#myCarouselNav .item").length-1;
                }
            }
            clearTimeout(timefunc);
			if ($selectedTile.hasClass('next')) {
            show('left');
			}
			else
			{
			show('right');
			}
            resetInterval();
        });
    },
    Navigation: function() {console.log('abc400->    Navigation: function() {');
        //--------------
        (function() {console.log('abc402->        (function() {');
            $(function() {console.log('abc403->            $(function() {');
                $('.main-navigation-phone').each(function() {console.log('abc404->                $(\'.main-navigation-phone\').each(function() {');
                    $(".main-navigation-phone a[href='" + $(this).data("currentpage") + "'] > li").first().addClass('active');
                });
                $('.mobile-trigger').click(function() {console.log('abc407->                $(\'.mobile-trigger\').click(function() {');
                    var targetId = $(this).attr("data-target");
                    var targetObject = $('#' + targetId);
                    var height = $("#" + targetId + ".mobile-dropdown ul").height();
                    $(".mobile-dropdown").not("#" + targetId).removeClass('expanded').animate({
                        height: 0
                    }, 300);
                    $(".mobile-dropdown-searchbox").not("#" + targetId).removeClass('expanded').animate({
                        height: 0
                    }, 300);
                    if (!targetObject.hasClass('expanded')) {
                        targetObject.addClass('expanded').animate({
                            height: height
                        }, 300);
                    } else {
                        targetObject.removeClass('expanded').animate({
                            height: 0
                        }, 300);
                    }
                });
                //change done by Sheetal for mobile devices search box
                $('.mobile-trigger-searchbox').click(function() {console.log('abc428->                $(\'.mobile-trigger-searchbox\').click(function() {');
                    var targetId = $(this).attr("data-target");
                    var targetObject = $('#' + targetId);
                    var height = $("#" + targetId + ".mobile-dropdown-searchbox ul").height();
                    $(".mobile-dropdown-searchbox").not("#" + targetId).removeClass('expanded').animate({
                        height: 0
                    }, 300);
                    $(".mobile-dropdown").not("#" + targetId).removeClass('expanded').animate({
                        height: 0
                    }, 300);
                    if (!targetObject.hasClass('expanded')) {
                        targetObject.addClass('expanded').animate({
                            height: height
                        }, 300);
                    } else {
                        targetObject.removeClass('expanded').animate({
                            height: 0
                        }, 300);
                    }
                });
                // put the option selected into the country field and submit
                $("#language-country-dropdown li.unselected a").on("click", function() {console.log('abc449->                $("#language-country-dropdown li.unselected a").on("click", function() {');
                    $("#languageForm #language").val($(this).attr("data-value"));
                    $("#languageForm").attr('action', $("#languageForm").attr('action') + location.search); // Howell Changes 27 Sep
                    $("#languageForm").submit();
                });
            });
        })();
        //------------------- 
        var setCookie = function(c_name, value)
        {
            var now = new Date();
            var time = now.getTime();
            time += (30 * 1000);
            now.setTime(time);
            document.cookie = c_name + "=" + value + '; expires=' + now.toGMTString() + '; path=/';
            /* 			var exdate=new Date();
             exdate.setDate(exdate.getDate() + exdays);
             var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString()) + ";path=" +urlPath;
             document.cookie=c_name + "=" + c_value; */
        };
        var getCookie = function(c_name)
        {
            var c_value = document.cookie;
            var c_start = c_value.indexOf(" " + c_name + "=");
            if (c_start == -1) {
                c_start = c_value.indexOf(c_name + "=");
            }
            if (c_start == -1) {
                c_value = null;
            }
            else {
                c_start = c_value.indexOf("=", c_start) + 1;
                var c_end = c_value.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = c_value.length;
                }
                c_value = unescape(c_value.substring(c_start, c_end));
            }
            return c_value;
        };
        (function dropdown1() {console.log('abc489->        (function dropdown1() {');
            if ($('.dropdown-toggle').length > 0)
            {
                // bootstrap stuff
                $('.dropdown-toggle').dropdown();
                $('.dropdown-menu').on("click", "input", function(event) {console.log('abc494->                $(\'.dropdown-menu\').on("click", "input", function(event) {');
                    event.stopPropagation();
                });
                //Updated for Language toggling in header skin - rajeev 13th nov
                if ($(".dropdown #SelectedLanguageVal").length == 0)
                {
                    $("#languages-dropdown > li.unselected > a").on("click", function() {console.log('abc500->                    $("#languages-dropdown > li.unselected > a").on("click", function() {');
                        $("#languageForm #language").val($(this).attr("data-value"));
                        $("#languageForm").attr('action', $("#languageForm").attr('action') + location.search); // Howell Changes 27 Sep
                         $("#languageForm").submit();
                    });
                } else {
                    $(".dropdown #SelectedLanguageVal").on("click", function() { //Updated for Language toggling in header skin - rajeev 13th nov
                        $("#unSelectedLanguage").val();                           //Updated for Language toggling in header skin - rajeev 13th nov
                        $("#languageForm").attr('action', $("#languageForm").attr('action') + location.search);  // Howell Changes 27 Sep
						 $("#languageForm").submit();
                    });
                }
            }
        })();
        //----------------
        if ($(".main-navigation").length == 0) {
            return;
        } else {
            var cookieCounter = 0;
            var activeMenuValue = $('.main-navigation-container li').index($('.active')[0]);
            var showToolTipCookieValue = getCookie('cookieforShowtooltip');
            "console" in window && console.log(activeMenuValue + "::::::::::::::activeMenuValue")
            "console" in window && console.log(showToolTipCookieValue + "::::::::::::::showToolTipCookieValue")
            if (activeMenuValue != 1 && showToolTipCookieValue == 'true') {
                $('.main-navigation').attr('data-showtooltipcomplete', 'true');
            }
            else {
                $('.main-navigation').attr('data-showtooltipcomplete', 'false');
                setCookie("cookieforShowtooltip", 'false');
            }
            var $mainNav = $('.main-navigation');
            if ($mainNav.is(":visible")) {
                $mainNav.each(function() {console.log('abc532->                $mainNav.each(function() {');
                    $(".main-navigation a[href='" + $(this).data("currentpage") + "'] > li").first().addClass('active');
                });
                var showToolTipComplete = ($mainNav.data("showtooltipcomplete").toString() === 'true');
                if (showToolTipComplete) {
                    //var toolTipIndex = $mainNav.data("tooltipindex");
                    var toolTipIndex = 2;
                    toolTipIndex = parseInt(toolTipIndex, 10);
                    var toolTipTitle = $mainNav.data("tooltiptitle");// for Heading in the bubble
                    var toolTipDescription = $mainNav.data("tooltipdescription");//for description on the bubble
                    var toolTipTimer = $mainNav.data("tooltiptimer");// for timer the bubble exists
                    toolTipTimer = toolTipTimer * 1000;
                    var nthItem = $mainNav.find("ul li:eq(" + (toolTipIndex - 1) + ")");
                    // var nthItem = $mainNav.find('li:contains("Your DBS")');
                    // alert(nthItem);
                    //"console" in window && console.log(toolTipDescription+":::::::::::::: toolTipDescription");
                    //"console" in window && console.log(toolTipTitle+":::::::::::::: toolTipTitle");
                    if ((toolTipDescription != 'undefined' & toolTipDescription != null & toolTipDescription != '') | (toolTipTitle != 'undefined' & toolTipTitle != null & toolTipTitle != ''))
                    {
                        //"console" in window && console.log(toolTipTitle+":::::::::::::: inside if");
                        nthItem.tooltip1({
                            html: true,
                            title: "<h5>" + toolTipTitle + "</h5><p>" + toolTipDescription + "</p>",
                            placement: "bottom",
                            trigger: "manual"
                        }).tooltip1("show");
                    }
                    setCookie("cookieforShowtooltip", 'false');
                    if (navigator.userAgent.indexOf("MSIE") > -1) { //[Date: 30-09-2013]IE compatible hack - add Ravi
                        $(".tooltip.fade.bottom").css("opacity", 1);
                    }
                    setTimeout(function() {console.log('abc563->                    setTimeout(function() {');
                        nthItem.tooltip1("hide");
                    }, toolTipTimer);
                }
            }
        }
    }
    ,
    setTabHeight: function() {console.log('abc571->    setTabHeight: function() {');
        //Set all the tabbed nav items to the size of the largest tab
        if ($(window).width() > 767) {
            /* [Date: 05-09-2013] commented - Ravi */
            /* $('.tabbed-nav.hidden-phone').each(function () {console.log('abc575->            /* $(\'.tabbed-nav.hidden-phone\').each(function () {');
             var greatestWidth = 0;
             $('li', $(this)).each(function () {console.log('abc577->             $(\'li\', $(this)).each(function () {');
             var width = $(this).width();
             if (width > greatestWidth) {
             greatestWidth = width;
             }
             });
             if (greatestWidth > 0) {
             $('li', $(this)).width(greatestWidth);
             }
             }); */
        }
        //Force scale to 1 on orientation change on iPad and iPhone
        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
            var viewportmeta = document.querySelector('meta[name="viewport"]');
            if (viewportmeta) {
                window.addEventListener('orientationchange', function() {console.log('abc592->                window.addEventListener(\'orientationchange\', function() {');
                    viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
                }, false);
                document.body.addEventListener('gesturestart', function() {console.log('abc595->                document.body.addEventListener(\'gesturestart\', function() {');
                    viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
                }, false);
            }
        }
        var performAdjust = true;
        var previousWidth = 0;
        $(window).resize(function() {console.log('abc602->        $(window).resize(function() {');
            var currentWidth = $(window).width();
            if (previousWidth != currentWidth) {
                performAdjust = true;
            }
            previousWidth = currentWidth;
        });
        $.fn.checkForAdjust = function() {console.log('abc609->        $.fn.checkForAdjust = function() {');
            if (performAdjust) {
                // [Date: 21-10-2013] - Commented by Ravi
                /* if ($.fn.adjustTestimonialHeight && $(".testimonial-block").length > 0) {
                 $.fn.adjustTestimonialHeight(); 
                 } */
                if ($.fn.adjustPromoHeights && $(".module-promo.collapsed .module-promo-container").length > 0) {
                    $.fn.adjustPromoHeights();
                }
                if ($.fn.adjustHeroSizes && $(".landing-page-hero .landing-page-hero-content").length > 0) {
                    $.fn.adjustHeroSizes();
                }
                if ($.fn.fixModalHeight && $(".help-you-choose").length > 0) {
                    $.fn.fixModalHeight();
                }
                //Set all the tabbed nav items to the size of the largest tab
                /* [Date: 05-09-2013] commented - Ravi */
                /*  $('.tabbed-nav.hidden-phone').each(function () {console.log('abc626->                /*  $(\'.tabbed-nav.hidden-phone\').each(function () {');
                 var greatestWidth = 0;
                 $('li', $(this)).each(function () {console.log('abc628->                 $(\'li\', $(this)).each(function () {');
                 var width = $(this).width();
                 if (width > greatestWidth) {
                 greatestWidth = width;
                 }
                 });
                 if (greatestWidth > 0) {
                 $('li', $(this)).width(greatestWidth);
                 }
                 }); */
                performAdjust = false;
            }
        }
        setInterval('$.fn.checkForAdjust()', 500);
    },
    currencyConverter: function() {console.log('abc643->    currencyConverter: function() {');
        function isEmpty(str) {console.log('abc644->        function isEmpty(str) {');
            return (!str || str == $('.currency-converter #firstCurrencyInput').attr('placeholder') || 0 === str.length);
        }
        function getCurrencyData() {console.log('abc647->        function getCurrencyData() {');
            var ContentId = $('.currency-converter #CCContentId').val();
            var ajaxURL = $('.currency-converter #CCRefreshDataURL').val();
			//console.log(ajaxURL);
            if (ContentId == '' || ajaxURL == '') {
                alert("Could not able to refresh currencies, Please try later.");
                return false;
            }
            $.ajax({
                url: ajaxURL,
                type: 'POST',
                data: ({
                    Content: ContentId
                }),
                dataType: 'html',
                success: function(content) {console.log('abc662->                success: function(content) {');
                    $("#tempDiv").html(content);
					//console.log(content);
                    $("#buyingTT").html($("#buyingTTResult").html());
                    $("#midMarketDate").html($("#midMarketLatestDate").html());
                    var firstCurrency = document.getElementById('firstCurrency');
                    var firstCurrencyResult = document.getElementById('firstCurrencyResult');
                    var firstCurrencyLength = firstCurrency.length;
                    /* [Date:14-08-2013] Commented and modified by Ravi  */
                    /* var firstCurrencyResultLength = firstCurrencyResult.length; */
                    var firstCurrencyResultLength
                    if (firstCurrencyResult) {
                        firstCurrencyResultLength = firstCurrencyResult.length;
                    } else {
                        firstCurrencyResultLength = 0;
                    }
                    var secondCurrency = document.getElementById('secondCurrency');
                    var secondCurrencyResult = document.getElementById('secondCurrencyResult');
                    /* [Date:14-08-2013] Commented and modified by Ravi  */
                    /* var secondCurrencyLength = secondCurrency.length; */
                    var secondCurrencyLength
                    if (secondCurrency) {
                        secondCurrencyLength = secondCurrency.length;
                    } else {
                        secondCurrencyLength = 0;
                    }
                    var secondCurrencyResultLength = secondCurrencyResult.length;
                    if (firstCurrencyResultLength == 0 || secondCurrencyResultLength == 0) {
                        return false;
                    }
                    var firstCurrencyText, firstCurrencyResultText, secondCurrencyText, secondCurrencyResultText, firstCurrencySelected, secondCurrencySelected;
                    for (var i = 0; i < firstCurrencyLength; i++) {
                        firstCurrencyText = firstCurrency.options[i].text;
                        for (var j = 0; j < firstCurrencyResultLength; j++) {
                            if (firstCurrencyText == firstCurrencyResult.options[j].text) {
                                firstCurrency.options[i].value = firstCurrencyResult.options[j].value;
                                break;
                            }
                        }
                        firstCurrencySelected = firstCurrencyResult.options[firstCurrencyResult.selectedIndex].text;
                        if (firstCurrencySelected == firstCurrencyText) {
                            firstCurrency.selectedIndex = i;
                        }
                    }
                    for (var i = 0; i < secondCurrencyLength; i++) {
                        secondCurrencyText = secondCurrency.options[i].text;
                        for (var j = 0; j < secondCurrencyResultLength; j++) {
                            if (secondCurrencyText == secondCurrencyResult.options[j].text) {
                                secondCurrency.options[i].value = secondCurrencyResult.options[j].value;
                                break;
                            }
                        }
                        secondCurrencySelected = secondCurrencyResult.options[secondCurrencyResult.selectedIndex].text;
                        if (secondCurrencySelected == secondCurrencyText) {
                            secondCurrency.selectedIndex = i;
                        }
                    }
                    $("#tempDiv").html('');
                    updateAmounts('');
                },
                error: function(xhr, ajaxOptions, thrownError) {console.log('abc722->                error: function(xhr, ajaxOptions, thrownError) {');
                    //alert(xhr.status);
                    //alert(thrownError.responseText);
                }
            });
        }
        function updateAmounts(e) {console.log('abc728->        function updateAmounts(e) {');
            var firstCurrency = $('.currency-converter #firstCurrency :selected').text();
            var secondCurrency = $('.currency-converter #secondCurrency :selected').text();
            if (typeof (firstCurrency) == 'undefined' || firstCurrency == null || firstCurrency == '') {
                "console" in window && console.log("Found firstCurrency null")
                return false;
            }
            if (typeof (secondCurrency) == 'undefined' || secondCurrency == null || secondCurrency == '') {
                "console" in window && console.log("Found secondCurrency null")
                return false;
            }
            var amount = 1;
            var firstCurrencyAmount = $('.currency-converter #firstCurrencyInput').val();
            var secondCurrencyAmount = $('.currency-converter #secondCurrencyInput').val();
            var firstCurrencyUnit = $('.currency-converter #' + firstCurrency + '_unit').val();
            var secondCurrencyUnit = $('.currency-converter #' + secondCurrency + '_unit').val();
            if (e == 'firstCurrency' || (!isEmpty(firstCurrencyAmount) && e != 'secondCurrency')) {
                amount = firstCurrencyAmount.replace(/[^0-9\.]/g, '');
            } else if (e == 'secondCurrency' || !isEmpty(secondCurrencyAmount)) {
                amount = secondCurrencyAmount.replace(/[^0-9\.]/g, '');
            }
            var baseCountry = $('.currency-converter #CCCountryCode').val();
            var decValue = 4;
            var firstToDollar, secondToDollar;
            /* if (baseCountry.toLowerCase() == 'id') { */
            /* [Date:14-08-2013] Commented and modified by Ravi */
            if (baseCountry && (baseCountry.toLowerCase() == 'id')) {
                decValue = 8;
                firstToDollar = parseFloat($('.currency-converter #firstCurrency :selected').val());
                secondToDollar = parseFloat($('.currency-converter #secondCurrency :selected').val());
            } else {
                firstToDollar = parseFloat($('.currency-converter #firstCurrency :selected').val().replace(/[^0-9\.]/g, ''));
                secondToDollar = parseFloat($('.currency-converter #secondCurrency :selected').val().replace(/[^0-9\.]/g, ''));
            }
            firstToDollar = (firstToDollar / firstCurrencyUnit).toFixed(decValue);
            secondToDollar = (secondToDollar / secondCurrencyUnit).toFixed(decValue);
            var convertTotal = parseFloat((amount * firstToDollar) / secondToDollar).toFixed(decValue).replace(/(\.[0-9]*?)0+$/, "$1").replace(/\.$/, "");
            var convertTotalInverse = parseFloat((amount * secondToDollar) / firstToDollar).toFixed(decValue).replace(/(\.[0-9]*?)0+$/, "$1").replace(/\.$/, "");
            var firstConverted = parseFloat(firstToDollar / secondToDollar).toFixed(decValue).replace(/(\.[0-9]*?)0+$/, "$1").replace(/\.$/, "");
            var secondConverted = parseFloat(secondToDollar / firstToDollar).toFixed(decValue).replace(/(\.[0-9]*?)0+$/, "$1").replace(/\.$/, "");
            /*            var convertTotal = parseFloat((amount * firstToDollar) / secondToDollar).toFixed(2);
             //            var convertTotalInverse = parseFloat((amount * secondToDollar) / firstToDollar).toFixed(2);
             //            var firstConverted = parseFloat(firstToDollar / secondToDollar).toFixed(2);
             //            var secondConverted = parseFloat(secondToDollar / firstToDollar).toFixed(2);
             var convertTotal = parseFloat((amount * firstToDollar) / secondToDollar).toFixed(4);
             var convertTotalInverse = parseFloat((amount * secondToDollar) / firstToDollar).toFixed(4);
             var firstConverted = parseFloat(firstToDollar / secondToDollar).toFixed(4);
             var secondConverted = parseFloat(secondToDollar / firstToDollar).toFixed(4);
             */
            if (e == 'firstCurrency' || (!isEmpty(firstCurrencyAmount) && e != 'secondCurrency')) {
                $('.currency-converter #secondCurrencyInput').val(convertTotal);
                $('.currency-converter #firstCurrencyInput').removeClass('placeholder');
                $('.currency-converter #secondCurrencyInput').removeClass('placeholder');
            } else if (e == 'secondCurrency') {
                $('.currency-converter #firstCurrencyInput').val(convertTotalInverse);
                $('.currency-converter #firstCurrencyInput').removeClass('placeholder');
                $('.currency-converter #secondCurrencyInput').removeClass('placeholder');
            }
            if (e == 'firstCurrency' && firstCurrencyAmount == '') {
                $('.currency-converter #secondCurrencyInput').val('');
                $('.currency-converter #secondCurrencyInput').trigger('blur');
            } else if (e == 'secondCurrency' && secondCurrencyAmount == '') {
                $('.currency-converter #firstCurrencyInput').val('');
                $('.currency-converter #firstCurrencyInput').trigger('blur');
            }
            $('.currency-converter #firstCurrencyConversion').text("1 " + firstCurrency + " = " + firstConverted + " " + secondCurrency);
            $('.currency-converter #reverseCurrencyConversion').text("1 " + secondCurrency + " = " + secondConverted + " " + firstCurrency);
        }
        if ($('.currency-converter').length > 0) {
          //  getCurrencyData();
            $('.currency-converter #firstCurrency').data('oldVal', $('.currency-converter #firstCurrency :selected').text());
            $('.currency-converter #secondCurrency').data('oldVal', $('.currency-converter #secondCurrency :selected').text());
            updateAmounts('');
            $('.currency-converter #firstCurrency').change(function() {console.log('abc801->            $(\'.currency-converter #firstCurrency\').change(function() {');
                /*if ($('.currency-converter #firstCurrency :selected').text() == $('.currency-converter #secondCurrency :selected').text()) {
                 $('.currency-converter #secondCurrency option').each(function () { if (this.text == $('.currency-converter #firstCurrency').data('oldVal')) { this.selected = true; $('.currency-converter #secondCurrency').data('oldVal', this.text); } });
                 }*/
                updateAmounts('');
                $('.currency-converter #firstCurrency').data('oldVal', $('.currency-converter #firstCurrency :selected').text());
            });
           // $('#mid-market-refresh').click(function() {console.log('abc808->           // $(\'#mid-market-refresh\').click(function() {');
           //     getCurrencyData();
           // });
            $('.currency-converter #secondCurrency').change(function() {console.log('abc811->            $(\'.currency-converter #secondCurrency\').change(function() {');
                /*if ($('.currency-converter #secondCurrency :selected').text() == $('.currency-converter #firstCurrency :selected').text()) {
                 $('.currency-converter #firstCurrency option').each(function () { if (this.text == $('.currency-converter #secondCurrency').data('oldVal')) { this.selected = true; $('.currency-converter #firstCurrency').data('oldVal', this.text); } });
                 }*/
                updateAmounts('');
                $('.currency-converter #secondCurrency').data('oldVal', $('.currency-converter #secondCurrency :selected').text());
            });
            $('.currency-converter #firstCurrencyInput').keyup(function() {console.log('abc818->            $(\'.currency-converter #firstCurrencyInput\').keyup(function() {');
                updateAmounts('firstCurrency');
            });
            $('.currency-converter #secondCurrencyInput').keyup(function() {console.log('abc821->            $(\'.currency-converter #secondCurrencyInput\').keyup(function() {');
                updateAmounts('secondCurrency');
            });
        }
		function midMarketAjaxCall(){console.log('abc825->		function midMarketAjaxCall(){');
			 //alert("ajaxCall");
				var loadUrl=document.getElementById("currencyRefreshURL").value;
				//alert(loadUrl.trim());
				if(loadUrl!=""){ 
					$('#mid-market-refresh').css('background','none');
					$('#mid-market-refresh').html('<img src="/iwov-resources/images/ajax-loader.gif"/>');
					$.ajax({
									type: 'POST',
									url: loadUrl,
									cache:false,
									async:true,
									dataType : 'html',
									success: function(data) {console.log('abc838->									success: function(data) {');
													var currecyHtml = $(data).find('#currencyConverter').html();
														//alert('currecyHtml is '+currecyHtml);
														$('#currencyConverter').html('');
														$('#currencyConverter').html(currecyHtml);
													//	console.log("ff");
														 pageLevelComponents.currencyConverter();
														  pageLevelComponents.placeholderModernizr();
/*												
												if ($('.currency-converter').length > 0) {
            $('.currency-converter #firstCurrency').data('oldVal', $('.currency-converter #firstCurrency :selected').text());
            $('.currency-converter #secondCurrency').data('oldVal', $('.currency-converter #secondCurrency :selected').text());
            updateAmounts('');
            $('.currency-converter #firstCurrency').change(function() {console.log('abc851->            $(\'.currency-converter #firstCurrency\').change(function() {');
                updateAmounts('');
                $('.currency-converter #firstCurrency').data('oldVal', $('.currency-converter #firstCurrency :selected').text());
            });
            $('.currency-converter #secondCurrency').change(function() {console.log('abc855->            $(\'.currency-converter #secondCurrency\').change(function() {');
                updateAmounts('');
                $('.currency-converter #secondCurrency').data('oldVal', $('.currency-converter #secondCurrency :selected').text());
            });
            $('.currency-converter #firstCurrencyInput').keyup(function() {console.log('abc859->            $(\'.currency-converter #firstCurrencyInput\').keyup(function() {');
                updateAmounts('firstCurrency');
            });
            $('.currency-converter #secondCurrencyInput').keyup(function() {console.log('abc862->            $(\'.currency-converter #secondCurrencyInput\').keyup(function() {');
                updateAmounts('secondCurrency');
            });
        }	*/											
									},
									error: function(XMLHttpRequest,textStatus,errorThrown) {console.log('abc867->									error: function(XMLHttpRequest,textStatus,errorThrown) {');
												//	alert("error while loading the page");
									},
									complete: function(XMLHttpRequest, status) {console.log('abc870->									complete: function(XMLHttpRequest, status) {');
									}
					});
				}
		}
		$("#mid-market-refresh").off("click").on("click",midMarketAjaxCall);
    }
    ,
    topNavSearch: function() {console.log('abc878->    topNavSearch: function() {');
        $("#search")
                .keypress(
                        function(e) {console.log('abc881->                        function(e) {');
                            var searchQ = document
                                    .getElementById('search');
                            var query = searchQ.value;
                            query = query
                                    .replace(
                                            /&/g,
                                            '&amp;')
                                    .replace(
                                            /</g,
                                            '&lt;')
                                    .replace(
                                            />/g,
                                            '&gt;');
                            if (window.console) {
                                window.console
                                        .log('Search Key Value ---> '
                                                + query);
                            }
                            var code = (e.keyCode ? e.keyCode
                                    : e.which);
                            if (code == 13) {
                                googleSearch(query,'header')
                            }
                        });
        $("#hsearchbutton")
                .click(
                        function() {console.log('abc908->                        function() {');
                            var searchQ = document
                                    .getElementById('search');
                            var query = searchQ.value;
                            query = query
                                    .replace(
                                            /&/g,
                                            '&amp;')
                                    .replace(
                                            /</g,
                                            '&lt;')
                                    .replace(
                                            />/g,
                                            '&gt;');
                            if($(searchQ).attr('placeholder')!=searchQ.value){
								googleSearch(query,'header');
							}
                        });
					var selectedCountry=	$("#selectedCountry").val();
					var googleFooterLang=	$("#googleFooterLang").val();
					var country=	$("#country").val();
					//alert(selectedCountry);
        if (typeof selectedCountry !== 'undefined') {
            /**JS API**/
            if (selectedCountry == 'cn'
                    || selectedCountry.search('china') != -1)
                googleJSApiURL = 'https://www.google.cn/jsapi';
            else
                googleJSApiURL = 'https://www.google.com/jsapi';
            /**GOOGLE LANGUAGE**/
		var googleLanguage=	$("#googleLanguage_input").val();
            //Hong Kong
            if (selectedCountry == 'hk'
                    || selectedCountry.search('hong') != -1) {
                if (googleFooterLang != 'en')
                    googleLanguage = 'zh-TW';
                //China
            } else if (selectedCountry == 'cn'
                    || selectedCountry.search('china') != -1) {
                if (googleFooterLang != 'en')
                    googleLanguage = 'zh-CN';
                //Taiwan
            } else if (selectedCountry == 'tw'
                    || selectedCountry.search('taiwan') != -1) {
                if (googleFooterLang != 'en')
                    googleLanguage = 'zh-TW';
                //Indonesia
            } else if (selectedCountry == 'id'
                    || selectedCountry.search('indo') != -1) {
                if (googleFooterLang != 'en')
                    googleLanguage = 'id';
            }
            /**EVENT: On Textbox click**/
            $('#geocodeInputFooter')
                    .one(
                            "focus",
                            function() {console.log('abc964->                            function() {');
								if(document.documentMode<9){
									$(this).keydown(function(){console.log('abc966->									$(this).keydown(function(){');
										if($(this).prop('placeholder')==$(this).val()){
											$(this).val('');
										}
									});
								}
                                var testGooglePlaces;
                                try {
                                    testGooglePlaces = google.maps.places;
                                } catch (e) {
                                    testGooglePlaces = false;
                                }
                                if (testGooglePlaces == false) {
                                    $
                                            .getScript(
                                                    googleJSApiURL,
                                                    function(
                                                            data,
                                                            textStatus,
                                                            jqxhr) {
                                                        if (window.console) {
                                                            window.console
                                                                    .log("Google JSAPI Loaded.");
                                                        }
                                                        //TODO: Language
                                                        google
                                                                .load(
                                                                        "maps",
                                                                        "3",
                                                                        {
                                                                            callback: "initializeFooter",
                                                                            other_params: "sensor=false&libraries=geometry,places&client=gme-dbsbankltd&channel=footer_"
                                                                                    + getRegion()
                                                                                    + "&language="
                                                                                    + googleLanguage
                                                                        });
                                                        if (window.console) {
                                                            window.console
                                                                    .log("Google Maps loaded for Footer.");
                                                        }
                                                    });
                                } else {
                                    log("Found google Maps already loaded. Loading Google Maps skipped...");
                                    initializeFooter();
                                }
                            });
        }
    }
    ,
    mobileSearch: function()
    {
        function googleSearchmobile(query) {console.log('abc1017->        function googleSearchmobile(query) {');
			if($("#searchurl").length > 0)
			url  = $("#searchurl").val();
			else 
			url = '/treasures/searchresult.page';
			if($("#gsaSearchCollection").length > 0)
			 url = url + '?Site=' + $("#gsaSearchCollection").val();
            if (window.console) {
                window.console.log('Search URL ----> ' + url);
            }
            if (query.replace(/\s/g, "") != "") {
                var keyword = query.toLowerCase().replace(
                        /^\s+|\s+$/g, "");
                //  var height = $(".ss-gac-m").height();
                //  alert("height is" +height);
                window.location = url + "?Query_String=" + query;
            }
        }
        $("#searchmobile")
                .keypress(
                        function(e) {console.log('abc1037->                        function(e) {');
                            var searchQ = document
                                    .getElementById('searchmobile');
                            var query = searchQ.value;
                            if (window.console) {
                                window.console
                                        .log('Search Key Value ---> '
                                                + query);
                            }
                            var code = (e.keyCode ? e.keyCode
                                    : e.which);
                            if (code == 13) {
                                googleSearchmobile(query);
                            }
                        });
        $("#hsearchbuttonmobile")
                .click(
                        function() {console.log('abc1054->                        function() {');
                            var searchQ = document
                                    .getElementById('searchmobile');
                            var query = searchQ.value;
                            googleSearchmobile(searchQ.value);
                        });
    },
    placeholderModernizr: function() {console.log('abc1061->    placeholderModernizr: function() {');
        if (!Modernizr.input.placeholder) {
            function add() {console.log('abc1063->            function add() {');
                if ($(this).val() === '') {
                    $(this).val($(this).attr('placeholder')).addClass('placeholder');
                }
            }
            function remove() {console.log('abc1068->            function remove() {');
                if ($(this).val() === $(this).attr('placeholder')) {
                    $(this).val('').removeClass('placeholder');
                }
            }
            // Create a dummy element for feature detection
            if (!('placeholder' in $('<input>')[0])) {
                // Select the elements that have a placeholder attribute
                $('input[placeholder], textarea[placeholder]').blur(add).focus(remove).each(add);
                // Remove the placeholder text before the form is submitted
                $('form').submit(function() {console.log('abc1078->                $(\'form\').submit(function() {');
                    $(this).find('input[placeholder], textarea[placeholder]').each(remove);
                });
            }
        }
    }
    ,
    miniCarousel: function() {console.log('abc1085->    miniCarousel: function() {');
        $(function() {console.log('abc1086->        $(function() {');
            if ($(".promo-hero-block").length == 0) {
                return;
            } else {
                $("#hero-promo-carousel").carousel();
            }
        });
 	  var PromotionIntervalTiming = $('#promotion.carousel').data("interval");
	  $('#promotion.carousel').carousel({
        interval: PromotionIntervalTiming,
        wrap: true,
    });
	var PromotionIntervalTiming = $('#promotion-mobile').data("interval");
	$('#promotion-mobile').carousel({
        interval: PromotionIntervalTiming,
        wrap: true,
    });
	 /*
     var $carousel = $('.heroMainCarousel.carousel').carousel({
		  interval: $('#myCarousel').data('interval')
		 });
		 var $carousel = $('.carNav').carousel({
		  interval: $('#myCarousel').data('interval'),
		  pause:'off'
		 });
		 */
/* SLIDE ON CLICK */ 
$('.carousel-indicators > li ').click(function() {console.log('abc1113->$(\'.carousel-indicators > li \').click(function() {');
    // grab href, remove pound sign, convert to number
    var item = Number($(this).attr('data-slide-to'));
	$($(this).parent().parent()[0]).carousel(item);
	//$("#"+ $(this).parent().parent().attr('id')).carousel(item);
    // remove current active class
    //$('.carousel-indicators .active').removeClass('active');	
	$(this).parent().children().removeClass('active');
    // add active class to just clicked on item
    // don't follow the link
    return false;
});
$('.overlay-promo-widget > a').click(function() {console.log('abc1125->$(\'.overlay-promo-widget > a\').click(function() {');
	var carouseDirection=$(this).attr('data-slide');
	var scope=this;
	$(this).prev().prev().children().each(function(i,val){console.log('abc1128->	$(this).prev().prev().children().each(function(i,val){');
		if($(val).hasClass('active')){
			if(carouseDirection=='next'){
				$(scope).prev().prev().prev().children().removeClass('active');
			}else if(carouseDirection=='prev'){
				$(scope).prev().prev().children().removeClass('active');
			}
			$($(this).parent().parent()[0]).carousel(carouseDirection);
		}
	});
});
 }
    ,
    footer: function() {console.log('abc1141->    footer: function() {');
        $(function() {console.log('abc1142->        $(function() {');
            $('.back-to-top').click(function() {console.log('abc1143->            $(\'.back-to-top\').click(function() {');
                $('body,html').scrollTop(1);
                return false;
            });
            //[2013-11-13 Howell] Added - BEGIN
            if (status == "recognized" && $(".your-dbs-hero-block").length > 0) {
                $("#manageYourProfile").show();
                $("#forget-modal-trigger").click(function() {console.log('abc1150->                $("#forget-modal-trigger").click(function() {');
                    $("#forgetModal").modal('show');
                });
            } else {
                $("#manageYourProfile").empty();
            }
            //[2013-11-13 Howell] Added - END			
        });
    }
    ,
    siteButton: function() {console.log('abc1160->    siteButton: function() {');
        $("a > button.btn").on('click', function() {console.log('abc1161->        $("a > button.btn").on(\'click\', function() {');
            location.href = $(this).closest("a").attr("href");
        });
    },
    businessSegmentTabIndex: function() {console.log('abc1165->    businessSegmentTabIndex: function() {');
        var tabindex = 1;
        $(".business-segment")
                .each(
                        function() {console.log('abc1169->                        function() {');
                            // alert($(this).text());
                            $(
                                    ".business-segment a")
                                    .attr(
                                            "tabindex",
                                            tabindex);
                            // alert($(this).attr("tabindex"));
                            tabindex++;
                        });
    },
    splitter: function() {console.log('abc1180->    splitter: function() {');
        $('.splitter-panel').each(function(index, element) {console.log('abc1181->        $(\'.splitter-panel\').each(function(index, element) {');
            $('.splitter-tile').bind('mouseover', function(e) {console.log('abc1182->            $(\'.splitter-tile\').bind(\'mouseover\', function(e) {');
                if ($(this).find('.splitter-tile-overlay').hasClass('open')) {
                    return false;
                }
                $('.splitter-tile-overlay.open').removeClass('open').animate({
                    opacity: '1'
                }, 300).show();
                $(this).find('.splitter-tile-overlay').addClass('open').animate({
                    opacity: '0'
                }, 300).hide();
                return false;
            });
            $('body').bind('mouseover', function() {console.log('abc1194->            $(\'body\').bind(\'mouseover\', function() {');
                $('.splitter-tile-overlay.open').delay(30).clearQueue();
                $('.splitter-tile-overlay.open').delay(30).stop();
                $('.splitter-tile-overlay.open').removeClass('open').animate({
                    opacity: '1'
                }, 300).show();
            });
        });
    },
    addBodyClass: function() {console.log('abc1203->    addBodyClass: function() {');
        var pageURL = window.location.href;
        var pageSegments = pageURL.split('/');
        var pageSegment = "";
        if (pageSegments != null && pageSegments != "")
        {
            if (pageSegments[3] == "in")
                pageSegment = pageSegments[4];
            else if (pageSegments[3] == "id")
                pageSegment = pageSegments[4];
            else
                pageSegment = pageSegments[3];
        }
        switch (pageSegment)
        {
            case "treasures":
                $("body").addClass("treasures");
                break;
            case "personal":
                $("body").addClass("dbs");
                break;
            case "treasures-private-client":
                $("body").addClass("tpc");
                break;
            case "private-banking":
                $("body").addClass("private-bank");
                break;
            case "sme":
                $("body").addClass("dbs");
                break;
            case "corporate":
                $("body").addClass("dbs");
                break;
            default:
                $("body").addClass("treasures");
        }
    },
    articleBrowser: function() {console.log('abc1240->    articleBrowser: function() {');
        /* [29-05-2013] Added by Ravi - iPhone to display the tabs for visible phone - START */
        if ($('.article-browser ul.visible-phone').css("display") != "none") {
            var active_idx;
            $('.article-browser ul.tabbed-nav.article.hidden-phone li').each(function(i, element) {console.log('abc1244->            $(\'.article-browser ul.tabbed-nav.article.hidden-phone li\').each(function(i, element) {');
                if ($(element).hasClass('active')) {
                    active_idx = i;
                }
            });
            var totalLi = $(".article-browser .article.hidden-phone li").size();
            var prevLi = active_idx - 1;
            if (prevLi < 0) {
                prevLi = totalLi - 1;
            }
            var nextLi = active_idx + 1;
            if (nextLi == totalLi) {
                nextLi = 0;
            }
            if (totalLi > 1) {
                $('.article-browser ul.tabbed-nav.article.visible-phone').empty();
                $('.article-browser ul.tabbed-nav.article.hidden-phone li').eq(prevLi).clone(true).attr('class', 'prev').empty().append('<div class="icn-phone-tabbed-nav-leftarrow"></div>').appendTo($('.article-browser ul.tabbed-nav.article.visible-phone'));
                $('.article-browser ul.tabbed-nav.article.hidden-phone li').eq(active_idx).clone(true).attr('class', 'active').appendTo($('.article-browser ul.tabbed-nav.article.visible-phone'));
                $('.article-browser ul.tabbed-nav.article.hidden-phone li').eq(nextLi).clone(true).attr('class', 'last-child next').empty().append('<div class="icn-phone-tabbed-nav-rightarrow"></div>').appendTo($('.article-browser ul.tabbed-nav.article.visible-phone'));
            }
        }
        /* [29-05-2013] Added by Ravi - iPhone to display the tabs for visible phone - END */
        $(".article-browser .article.tabbed-nav li").click(function(eventObject) {console.log('abc1266->        $(".article-browser .article.tabbed-nav li").click(function(eventObject) {');
            $('.article-browser .article li.active').removeClass('active');
            var $selectedLi = $(this);
            $('.article-browser .show').addClass('hide');
            $('.article-browser .show').removeClass('show');
            var category = $selectedLi.data('category').replace(/([ #;?&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
            $('.article-browser .article [data-category="' + category + '"]').addClass('active');
            var active_idx;
            $('.article-browser ul.tabbed-nav.article.hidden-phone li').each(function(i, element) {console.log('abc1274->            $(\'.article-browser ul.tabbed-nav.article.hidden-phone li\').each(function(i, element) {');
                if ($(element).hasClass('active')) {
                    active_idx = i;
                }
            });
            var totalLi = $(".article-browser .article.hidden-phone li").size();
            var prevLi = active_idx - 1;
            if (prevLi < 0) {
                prevLi = totalLi - 1;
            }
            var nextLi = active_idx + 1;
            if (nextLi == totalLi) {
                nextLi = 0;
            }
            if (totalLi > 1) {
                $('.article-browser ul.tabbed-nav.article.visible-phone').empty();
                $('.article-browser ul.tabbed-nav.article.hidden-phone li').eq(prevLi).clone(true).attr('class', 'prev').empty().append('<div class="icn-phone-tabbed-nav-leftarrow"></div>').appendTo($('.article-browser ul.tabbed-nav.article.visible-phone'));
                $('.article-browser ul.tabbed-nav.article.hidden-phone li').eq(active_idx).clone(true).attr('class', 'active').appendTo($('.article-browser ul.tabbed-nav.article.visible-phone'));
                $('.article-browser ul.tabbed-nav.article.hidden-phone li').eq(nextLi).clone(true).attr('class', 'last-child next').empty().append('<div class="icn-phone-tabbed-nav-rightarrow"></div>').appendTo($('.article-browser ul.tabbed-nav.article.visible-phone'));
            }
            $('.article-browser .' + category).addClass('show');
            $('.article-browser .' + category).removeClass('hide');
        });
    },
		mainNavURLPrefix:function(){console.log('abc1298->		mainNavURLPrefix:function(){');
			$(".main-navigation-container li,.breadcrumb li a").on("click",function (e) { e.preventDefault();
        	//alert("in url prefix");
			if($(this).parent().parent().hasClass("main-navigation-container"))
			var $link =$(this).find("a"); 
			else
			var $link =$(this);
			var url =$link.data("url");
			var requrl=window.location.href;
			var loadUrl;
			if (requrl.indexOf("/in/") !=-1) {
				loadUrl = "/in"+url;
			}else if(requrl.indexOf("/id/") !=-1){
				loadUrl = "/id"+url;
			}else{
				loadUrl = url;
			} 
			$link.attr('href',loadUrl); 
			//alert(loadUrl);
			window.location.href =loadUrl;
			});
			//$(".breadcrumb li").click(function(e){e.preventDefault();alert("jo")});
		},
		aicsHero:function () {console.log('abc1321->		aicsHero:function () {');
	  if ($('.homepage-hero-module ul.visible-phone').css("display") != "none") {
		  var active_idx;
		  $('.homepage-hero-module ul.tabbed-nav.block.hidden-phone li').each(function (i, element) {console.log('abc1324->		  $(\'.homepage-hero-module ul.tabbed-nav.block.hidden-phone li\').each(function (i, element) {');
			if ($(element).hasClass('active')) {
			  active_idx = i;
			}
		  });
		  var totalLi = $(".homepage-hero-module .block.hidden-phone li").size();
		  var prevLi = active_idx - 1;
		  if (prevLi < 0) { prevLi = totalLi - 1; }
		  var nextLi = active_idx + 1;
		  if (nextLi == totalLi) { nextLi = 0; }
		  if (totalLi > 1) { 
			$('.homepage-hero-module ul.tabbed-nav.block.visible-phone').empty();
			$('.homepage-hero-module ul.tabbed-nav.block.hidden-phone li').eq(prevLi).clone(true).attr('class', 'prev').empty().append('<div class="icn-phone-tabbed-nav-leftarrow"></div>').appendTo($('.homepage-hero-module ul.tabbed-nav.block.visible-phone'));
			$('.homepage-hero-module ul.tabbed-nav.block.hidden-phone li').eq(active_idx).clone(true).attr('class', 'active').appendTo($('.homepage-hero-module ul.tabbed-nav.block.visible-phone'));
			$('.homepage-hero-module ul.tabbed-nav.block.hidden-phone li').eq(nextLi).clone(true).attr('class', 'last-child next').empty().append('<div class="icn-phone-tabbed-nav-rightarrow"></div>').appendTo($('.homepage-hero-module ul.tabbed-nav.block.visible-phone'));
		  }  
       }	
    $(".homepage-hero-module .block li").click(function (eventObject) {console.log('abc1341->    $(".homepage-hero-module .block li").click(function (eventObject) {');
      $('.homepage-hero-module .block li.active').removeClass('active');
      var $selectedLi = $(this);
      $('.homepage-hero-module .show').addClass('hide');
      $('.homepage-hero-module .show').removeClass('show');
      var category = $selectedLi.data('category').replace(/([ #;?&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
      $('.homepage-hero-module .block [data-category="' + category + '"]').addClass('active');
      var active_idx;
      $('.homepage-hero-module ul.tabbed-nav.block.hidden-phone li').each(function (i, element) {console.log('abc1349->      $(\'.homepage-hero-module ul.tabbed-nav.block.hidden-phone li\').each(function (i, element) {');
        if ($(element).hasClass('active')) {
          active_idx = i;
        }
      });
      var totalLi = $(".homepage-hero-module .block.hidden-phone li").size();
      var prevLi = active_idx - 1;
      if (prevLi < 0) { prevLi = totalLi - 1; }
      var nextLi = active_idx + 1;
      if (nextLi == totalLi) { nextLi = 0; }
      if (totalLi > 1) {
        $('.homepage-hero-module ul.tabbed-nav.block.visible-phone').empty();
        $('.homepage-hero-module ul.tabbed-nav.block.hidden-phone li').eq(prevLi).clone(true).attr('class', 'prev').empty().append('<div class="icn-phone-tabbed-nav-leftarrow"></div>').appendTo($('.homepage-hero-module ul.tabbed-nav.block.visible-phone'));
        $('.homepage-hero-module ul.tabbed-nav.block.hidden-phone li').eq(active_idx).clone(true).attr('class', 'active').appendTo($('.homepage-hero-module ul.tabbed-nav.block.visible-phone'));
        $('.homepage-hero-module ul.tabbed-nav.block.hidden-phone li').eq(nextLi).clone(true).attr('class', 'last-child next').empty().append('<div class="icn-phone-tabbed-nav-rightarrow"></div>').appendTo($('.homepage-hero-module ul.tabbed-nav.block.visible-phone'));
      }
      $('.homepage-hero-module .' + category).addClass('show');
      $('.homepage-hero-module .' + category).removeClass('hide');
	  if ($(window).width()<768 && active_idx==totalLi-1){ //For mobile devices. because the last tab is short
		 $('body,html').scrollTop(1);
	  }
    });
  },
  disclaimerCheck:function () {//updated for disclaimer check - Hariharan D - 19 Sep
            if ($(".subscribe-block").length == 0) {
                return;
            } else {
				var checkBoxRange1 = $('#YourDBSdisclaimerCheckBox_SubscribeBlock').length;
                var emailTest = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                // bind enter to trigger submit
                $("#email-address").on("keypress", function (e) {console.log('abc1379->                $("#email-address").on("keypress", function (e) {');
                    var code = (e.keyCode ? e.keyCode : e.which);
                    if (code == 13) {
                        $(".subscribe-block #subscribe-submit").trigger('click');
                    }
                });
				$('#YourDBSdisclaimerCheckBox_SubscribeBlock').on('click',function () {console.log('abc1385->				$(\'#YourDBSdisclaimerCheckBox_SubscribeBlock\').on(\'click\',function () {');
				$('#YourDBSdisclaimerCheckBox_SubscribeBlock').removeClass('error')
				});
                $(".subscribe-block #subscribe-submit").on('click', function () {console.log('abc1388->                $(".subscribe-block #subscribe-submit").on(\'click\', function () {');
				if (checkBoxRange1 > 0)
					{ 
						if ($('#YourDBSdisclaimerCheckBox_SubscribeBlock').is(':checked') == true)
						{
						$('#YourDBSdisclaimerCheckBox_SubscribeBlock').removeClass('error')
						if (!emailTest.test($("#email-address").val())) {
								$("#subscribeModal_email-error").removeClass('hide');
								return false;
							}
							$("#subscribeModal_email-error").addClass('hide');
							var param = "email";
							var email = $(".subscribe-block #email-address").val();
							var actionParam = "action";
							var action = "LoginRegister";
							var $button = $(this);
							var request = new AjaxRequest(formUrl, function (xmlDoc) {console.log('abc1404->							var request = new AjaxRequest(formUrl, function (xmlDoc) {');
								var result = xmlDoc.documentElement.getElementsByTagName("result")[0].childNodes[0].nodeValue;
								if (result == "login") {
									$("#loginModal").modal({
										show: true
									});
								} else if (result == "register") {
									$("#registeredModal").modal({
										show: true
									});
								}
								$button.removeAttr('disabled');
							});
							request.setParameter(param, email);
							request.setParameter(actionParam, action);
							request.submit();
							//$button.attr('disabled', 'disabled');
						}
						else
						{
							$('#YourDBSdisclaimerCheckBox_SubscribeBlock').addClass('error');
							$("#subscribeModal_email-error").removeClass('hide');
							return false;
						}
					}
				else
					{
						if (!emailTest.test($("#email-address").val())) {
								$("#subscribeModal_email-error").removeClass('hide');
								return false;
							}
							$("#subscribeModal_email-error").addClass('hide');
							var param = "email";
							var email = $(".subscribe-block #email-address").val();
							var actionParam = "action";
							var action = "LoginRegister";
							var $button = $(this);
							var request = new AjaxRequest(formUrl, function (xmlDoc) {console.log('abc1441->							var request = new AjaxRequest(formUrl, function (xmlDoc) {');
								var result = xmlDoc.documentElement.getElementsByTagName("result")[0].childNodes[0].nodeValue;
								if (result == "login") {
									$("#loginModal").modal({
										show: true
									});
								} else if (result == "register") {
									$("#registeredModal").modal({
										show: true
									});
								}
								$button.removeAttr('disabled');
							});
							request.setParameter(param, email);
							request.setParameter(actionParam, action);
							request.submit();
							$button.attr('disabled', 'disabled');
					}
                });
            }
        },
			 profileAnalytics:function (){console.log('abc1462->			 profileAnalytics:function (){');
					var browserHostname = window.location.hostname;
					var url = window.location.href;
					var allowAnalytics = false;
					"console" in window
							&& console
									.log("[Product Profile Analytics] browserHostname: "
											+ browserHostname);
					"console" in window
							&& console
									.log("[Product Profile Analytics] url            : "
											+ url);
					//Skip TeamSite & Dev/SIT LiveSite
					if (browserHostname.indexOf("-dev-") > -1
							|| browserHostname.indexOf("-sit-") > -1
							|| browserHostname.indexOf("localhost") > -1
							|| browserHostname.indexOf("1bank") > -1) {
						allowAnalytics = true;
						//UAT/Production Staging & LiveSite
					} else {
						//HK & SG
						if (browserHostname.indexOf(".sg") > -1
								|| browserHostname.indexOf("-sg") > -1
								|| browserHostname.indexOf(".hk") > -1
								|| browserHostname.indexOf("-hk") > -1) {
							//TPC/PB/Treasures
							if (url.indexOf("/treasures") > -1
									|| url.indexOf("/private-banking") > -1) {
								allowAnalytics = true;
							}
							//Other countries
						} else {
							//Treasures
							if (url.indexOf("/treasures") > -1
									&& url.indexOf("/treasures-private") == -1) {
								allowAnalytics = true;
							}
						}
					}
					"console" in window
							&& console
									.log("[Product Profile Analytics] allowAnalytics: "
											+ allowAnalytics);
					if (allowAnalytics) {
						"console" in window
								&& console
										.log("[Product Profile Analytics] AJAX Call - BEGIN");
						var ajaxUrl = $("#profile_analytics_ajaxurl").val();
						"console" in window
								&& console
										.log("[Product Profile Analytics] ajaxUrl: "
												+ ajaxUrl);
						/**Change Ajax URL to HTTPS protocol**/
						//Note: Should only apply to Staging & LiveSite
						//Skip TeamSite Preview
						if (browserHostname.indexOf("1bank") == -1
								&& browserHostname.indexOf("localhost") == -1) {
							ajaxUrl = 'https://' + browserHostname + ajaxUrl;
							"console" in window
									&& console
											.log("[Product Profile Analytics] NEW ajaxUrl: "
													+ ajaxUrl);
						}
						$
								.ajax({
									url : ajaxUrl,
									xhrFields : {
										withCredentials : true
									},
									type : 'POST',
									dataType : 'xml',
									data : {
										'action' : 'read',
										'productId' : "hfnegj5s"
									},
									success : function(data) {console.log('abc1537->									success : function(data) {');
										"console" in window
												&& console
														.log("[Product Profile Analytics] AJAX Success!");
										var $xml = $(data);
										var $profileAnalyticsEnabled = $xml
												.find("profileanalyticsenabled");
												var $isUserLoggedIn = $xml
												.find("isUserLoggedIn");
										"console" in window
												&& console
														.log("[Article Profile Analytics] isUserLoggedIn: "
																+ $isUserLoggedIn
																		.text());
										"console" in window
												&& console
														.log("[Product Profile Analytics] profileAnalyticsEnabled: "
																+ $profileAnalyticsEnabled
																		.text());
										/**PROFILE ANALYTICS - ENABLED**/
										if ($profileAnalyticsEnabled.text() == "true") {
										if($("#read-later").length >0)
										{
										if ($isUserLoggedIn.text() == "true") {
												//Article Action
												$("#read-later").removeClass(
														"hide-readLater");
												$("div.article-actions")
														.removeClass("hide");
												//Subscribe
												$("#hide-subscribeDefault")
														.addClass("hide");
												/**LOGGED-OUT**/
											} else {
												//Article Action
												$("#read-later").addClass(
														"hide-readLater");
												$("div.article-actions")
														.removeClass("hide");
												//Subscribe
												$("#hide-subscribeDefault")
														.removeClass("hide");
											}
											}
											"console" in window
													&& console
															.log("[Product Profile Analytics] Completed.");
											/**PROFILE ANALYTICS - DISABLED**/
										} else {
											if($("#read-later").length >0)
										{
											//Article Action
											$("#read-later").addClass(
													"hide-readLater");
											$("div.article-actions")
													.removeClass("hide");
											//Subscribe
											$("#hide-subscribeDefault")
													.addClass("hide");
										}
											"console" in window
													&& console
															.log("[Product Profile Analytics] No action performed.");
										}
									},
									error : function() {console.log('abc1602->									error : function() {');
									if($("#read-later").length >0)
										{
										//Article Action
										$("#read-later").addClass(
												"hide-readLater");
										$("div.article-actions").removeClass(
												"hide");
										//Subscribe
										$("#hide-subscribeDefault")
												.removeClass("hide");
										}
										"console" in window
												&& console
														.log("[Product Profile Analytics] AJAX Failed!");
									}
								});
					}
					else {
														if($("#read-later").length >0){
							//Article Action
							$("#read-later").addClass("hide-readLater");
							$("div.article-actions").removeClass("hide");
						}
					}
					},
					addFreeText:function(){console.log('abc1628->					addFreeText:function(){');
					 if ($("#unSelectedLanguage").length > 0)
    {
    var selectedLanguage = document.getElementById("unSelectedLanguage").value;
	var free_text_class = '.free-text-block-'+selectedLanguage;
	 if ($(free_text_class).length > 0)
    {
	$(free_text_class).removeClass('hide');
    }
	}
},
articeDetailSignup:function () {console.log('abc1639->articeDetailSignup:function () {');
		//$('#registeredModal div.modal-header button.close').click( function(){$('button.close').parent().siblings('.modal-footer').children('a#dropout-no-thanks').click()})
		$('#registeredModal div.modal-header button.close').click( function(event){console.log('abc1641->		$(\'#registeredModal div.modal-header button.close\').click( function(event){');
		  if(navigator.userAgent.match(/iPhone|Android|BlackBerry|Mobile/i)){
		    $('body').css({'position' : '', 'overflow' : ''}); // [Date: 17-10-2013] add Ravi Samsung Fix 
		  }
		  event.stopImmediatePropagation();window.scrollTo(0, 0);location.reload();
		})
		$('div.modal-backdrop').click( function(event){console.log('abc1647->		$(\'div.modal-backdrop\').click( function(event){');
		  if(navigator.userAgent.match(/iPhone|Android|BlackBerry|Mobile/i)){
		    $('body').css({'position' : '', 'overflow' : ''}); // [Date: 17-10-2013] add Ravi Samsung Fix 
		  }
		  event.stopImmediatePropagation();window.scrollTo(0, 0);location.reload();
		})
            if ($(".subscribe").length == 0) {
                return;
            } else {
				var checkBoxRange3 = $('#YourDBSdisclaimerCheckBox_Subscribe').length;
                var emailTest = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                // bind enter to trigger submit
                $("#email-address").on("keypress", function (e) {console.log('abc1659->                $("#email-address").on("keypress", function (e) {');
                    var code = (e.keyCode ? e.keyCode : e.which);
                    if (code == 13) {
                        $("#subscribe-submit").trigger('click');
                    }
                });
				$('#YourDBSdisclaimerCheckBox_Subscribe').on('click',function () {console.log('abc1665->				$(\'#YourDBSdisclaimerCheckBox_Subscribe\').on(\'click\',function () {');
				$('#YourDBSdisclaimerCheckBox_Subscribe').removeClass('error')
				});
                $("#subscribe-submit").on('click', function () {console.log('abc1668->                $("#subscribe-submit").on(\'click\', function () {');
				if (checkBoxRange3 > 0)
					{ 
						if ($('#YourDBSdisclaimerCheckBox_Subscribe').is(':checked') == true)
						{
							$('#YourDBSdisclaimerCheckBox_Subscribe').removeClass('error')
								if (!emailTest.test($("#email-address").val())) {
								$("#email-error").show();
								return false;
							}
							$("#email-error").hide();
							var param = "email";
							var email = $("#email-address").val();
							if (email === "") {
								return false
							}
							var actionParam = "action";
							var action = "LoginRegister";
							var $button = $(this);
								var formUrl = $("#profile_analytics_ajaxurl").val();
							var request = new AjaxRequest(formUrl, function (xmlDoc) {console.log('abc1688->							var request = new AjaxRequest(formUrl, function (xmlDoc) {');
							var result = xmlDoc.documentElement.getElementsByTagName("result")[0].childNodes[0].nodeValue;
								if (result == "login") {
									$("#loginModal").modal({
										show: true
									});
								} else if (result == "register") {
									$("#registeredModal").modal({
										show: true
									});
								}
								$button.removeAttr('disabled');
							});
							request.setParameter(param, email);
							request.setParameter(actionParam, action);
							request.submit();
							$button.attr('disabled', 'disabled'); 
						}
						else
						{
							$('#YourDBSdisclaimerCheckBox_Subscribe').addClass('error');
							$("#email-error").show();
							return false;
						}
					}
				else
				{
					 if (!emailTest.test($("#email-address").val())) {
							$("#email-error").show();
							return false;
						}
						$("#email-error").hide();
						var param = "email";
						var email = $("#email-address").val();
						if (email === "") {
							return false
						}
						var actionParam = "action";
						var action = "LoginRegister";
						var $button = $(this);
						var request = new AjaxRequest(formUrl, function (xmlDoc) {console.log('abc1728->						var request = new AjaxRequest(formUrl, function (xmlDoc) {');
							var result = xmlDoc.documentElement.getElementsByTagName("result")[0].childNodes[0].nodeValue;
							if (result == "login") {
								$("#loginModal").modal({
									show: true
								});
							} else if (result == "register") {
								$("#registeredModal").modal({
									show: true
								});
							}
							$button.removeAttr('disabled');
						});
						request.setParameter(param, email);
						request.setParameter(actionParam, action);
						request.submit();
						$button.attr('disabled', 'disabled');  
				}
                });
            }
        },
		splitterSearchModel: function(){console.log('abc1749->		splitterSearchModel: function(){');
						$("a#modal-click1").on("click",function() {console.log('abc1750->						$("a#modal-click1").on("click",function() {');
							$("#overlay").fadeIn();
							$("div#modal-dialog1").fadeIn(500);
						});
						$("a#modal-click2").on("click",function() {console.log('abc1754->						$("a#modal-click2").on("click",function() {');
							$("#overlay").fadeIn();
							$("div#modal-dialog2").fadeIn(500);
						});
						$("a#modal-click3").on("click",function() {console.log('abc1758->						$("a#modal-click3").on("click",function() {');
							$("#overlay").fadeIn();
							$("div#modal-dialog3").fadeIn(500);
						});
						$("div#modalCloseBtn img").on("click",function() {console.log('abc1762->						$("div#modalCloseBtn img").on("click",function() {');
							$("#overlay").fadeOut(500);
							$("div.modal-dialog").fadeOut();
						});
						$("#search-shb")
												.keypress(
														function(e) {console.log('abc1768->														function(e) {');
															var searchQ = document
																	.getElementById('search-shb');
															var query = searchQ.value;
															query = query
																	.replace(
																			/&/g,
																			'&amp;')
																	.replace(
																			/</g,
																			'&lt;')
																	.replace(
																			/>/g,
																			'&gt;');
															var code = (e.keyCode ? e.keyCode
																	: e.which);
															if (window.console) {
																window.console
																		.log('Splitter Hero Block: '
																				+ code);
															}
															if (code == 13) {
																googleSearch(query,'splitter')
															}
														});
										$("#psearchbutton")
												.click(
														function() { console.log('abc1795->														function() { ');
															var searchQ = document
																	.getElementById('search-shb');
															var query = searchQ.value;
															query = query
																	.replace(
																			/&/g,
																			'&amp;')
																	.replace(
																			/</g,
																			'&lt;')
																	.replace(
																			/>/g,
																			'&gt;');
															googleSearch(query,'splitter');
														});
									},
									searchnewValidation:function (){console.log('abc1812->									searchnewValidation:function (){');
var MonthFrom = $('#monthFromSelect');
var MonthTo = $('#monthToSelect');
var YearFrom = $('#yearFromSelect');
var YearTo = $('#yearToSelect');
MonthFrom.change(function() {console.log('abc1817->MonthFrom.change(function() {');
 if(MonthFrom.val() >= MonthTo.val() && YearFrom.val() == YearTo.val())
 {
MonthTo.val($(this).val());
}
});
MonthTo.change(function() {console.log('abc1823->MonthTo.change(function() {');
if(MonthTo.val() <= MonthFrom.val() && YearFrom.val() == YearTo.val())
 {
 MonthFrom.val($(this).val());
 }
 });
YearFrom.change(function() {console.log('abc1829->YearFrom.change(function() {');
 if(YearFrom.val() > YearTo.val())
 {
YearTo.val($(this).val());
}
 if(MonthFrom.val() >= MonthTo.val() && YearFrom.val() == YearTo.val())
{
MonthTo.val($(MonthFrom).val());
 }
});
 YearTo.change(function() {console.log('abc1839-> YearTo.change(function() {');
if(YearTo.val() < YearFrom.val())
 {
  YearFrom.val($(this).val());
 }
if(MonthTo.val() <= MonthFrom.val() && YearFrom.val() == YearTo.val())
 {
MonthFrom.val($(MonthTo).val());
     }
   });
},
setTabwidth:function()
{
$("ul.tabs").each(function(){var $li =$(this).find("li"); var lilength= $li.length;  $li.css('width',85/lilength+'%'); });
},
setMainNavigationWidth:function()
{
$navli=$(".main-navigation-container > ul    > li");var lilength= $navli.length; $navli.css('width',100/lilength+'%');
 if ($("#product-nav").length > 0)  {			
	var itemCount = $('#product-nav li').length;
var number=980/itemCount;
//var number1=parseFloat(number.toPrecision(12));
		if(!navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|webOS|Mobile/i)){
		$('#product-nav li').css('width', Math.floor(number)+'px').css('width', '-=1px');
	}
	else {
		if ((navigator.userAgent.match(/Android/i)))
		{
			$('#product-nav li').css('width', 100/itemCount+'%').css('width', '-=1px');
			if(itemCount==4)
			{ 
				$('#product-nav li:last').css('width', 100/itemCount+'%').css('width', '+=1px');
			}			
			if(itemCount>5)
			{
				$('#product-nav li:last').css('width', 100/itemCount+'%').css('width', '+=2px');
			}
		}
		else
		{
			if(itemCount>4)
			{
				$('#product-nav li').css('width', 100/itemCount+'%').css('width', '-=1px');
			}
			else {
				$('#product-nav li').css('width', 99.8/itemCount+'%').css('width', '-=1px');
			}
		}
	}
}
},
removeDesktopCSSforPrinterFriendly:function()
{
if($("div").hasClass("print_header"))
{$("link[href*='desktop.css']").attr("disabled", "disabled");$("link[href*='devices.css']").attr("disabled", "disabled");$("link[href*='desktop_continue.css']").attr("disabled", "disabled");$("link[href*='default-layout.css']").attr("disabled", "disabled");}
},
tabArticleBrowserMarkets:function () {console.log('abc1895->tabArticleBrowserMarkets:function () {');
	  if ($('.article-browser-markets ul.visible-phone').css("display") != "none") {
		  var active_idx;
		  $('.article-browser-markets ul.tabbed-nav.article.hidden-phone li').each(function (i, element) {console.log('abc1898->		  $(\'.article-browser-markets ul.tabbed-nav.article.hidden-phone li\').each(function (i, element) {');
			if ($(element).hasClass('active')) {
			  active_idx = i;
			}
		  });
		  var totalLi = $(".article-browser-markets .article.hidden-phone li").size();
		  var prevLi = active_idx - 1;
		  if (prevLi < 0) { prevLi = totalLi - 1; }
		  var nextLi = active_idx + 1;
		  if (nextLi == totalLi) { nextLi = 0; }
		  if (totalLi > 1) {
			$('.article-browser-markets ul.tabbed-nav.article.visible-phone').empty();
			$('.article-browser-markets ul.tabbed-nav.article.hidden-phone li').eq(prevLi).clone(true).attr('class', 'prev').empty().append('<div class="icn-phone-tabbed-nav-leftarrow"></div>').appendTo($('.article-browser-markets ul.tabbed-nav.article.visible-phone'));
			$('.article-browser-markets ul.tabbed-nav.article.hidden-phone li').eq(active_idx).clone(true).attr('class', 'active').appendTo($('.article-browser-markets ul.tabbed-nav.article.visible-phone'));
			$('.article-browser-markets ul.tabbed-nav.article.hidden-phone li').eq(nextLi).clone(true).attr('class', 'last-child next').empty().append('<div class="icn-phone-tabbed-nav-rightarrow"></div>').appendTo($('.article-browser-markets ul.tabbed-nav.article.visible-phone'));
		  }  
       }	
    $(".article-browser-markets .article.tabbed-nav li").click(function (eventObject) {console.log('abc1915->    $(".article-browser-markets .article.tabbed-nav li").click(function (eventObject) {');
      $('.article-browser-markets .article li.active').removeClass('active');
      var $selectedLi = $(this);
      $('.article-browser-markets .show').addClass('hide');
      $('.article-browser-markets .show').removeClass('show');
      var category = $selectedLi.data('category').replace(/([ #;?&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
      $('.article-browser-markets .article [data-category="' + category + '"]').addClass('active');
      var active_idx;
      $('.article-browser-markets ul.tabbed-nav.article.hidden-phone li').each(function (i, element) {console.log('abc1923->      $(\'.article-browser-markets ul.tabbed-nav.article.hidden-phone li\').each(function (i, element) {');
        if ($(element).hasClass('active')) {
          active_idx = i;
        }
      });
      var totalLi = $(".article-browser-markets .article.hidden-phone li").size();
      var prevLi = active_idx - 1;
      if (prevLi < 0) { prevLi = totalLi - 1; }
      var nextLi = active_idx + 1;
      if (nextLi == totalLi) { nextLi = 0; }
      if (totalLi > 1) {
        $('.article-browser-markets ul.tabbed-nav.article.visible-phone').empty();
        $('.article-browser-markets ul.tabbed-nav.article.hidden-phone li').eq(prevLi).clone(true).attr('class', 'prev').empty().append('<div class="icn-phone-tabbed-nav-leftarrow"></div>').appendTo($('.article-browser-markets ul.tabbed-nav.article.visible-phone'));
        $('.article-browser-markets ul.tabbed-nav.article.hidden-phone li').eq(active_idx).clone(true).attr('class', 'active').appendTo($('.article-browser-markets ul.tabbed-nav.article.visible-phone'));
        $('.article-browser-markets ul.tabbed-nav.article.hidden-phone li').eq(nextLi).clone(true).attr('class', 'last-child next').empty().append('<div class="icn-phone-tabbed-nav-rightarrow"></div>').appendTo($('.article-browser-markets ul.tabbed-nav.article.visible-phone'));
      }
      $('.article-browser-markets .' + category).addClass('show');
      $('.article-browser-markets .' + category).removeClass('hide');
    });
  },
  tabArticleBrowserInsights:function () {console.log('abc1943->  tabArticleBrowserInsights:function () {');
	  if ($('.article-browser-insights ul.visible-phone').css("display") != "none") {
		  var active_idx;
		  $('.article-browser-insights ul.tabbed-nav.article.hidden-phone li').each(function (i, element) {console.log('abc1946->		  $(\'.article-browser-insights ul.tabbed-nav.article.hidden-phone li\').each(function (i, element) {');
			if ($(element).hasClass('active')) {
			  active_idx = i;
			}
		  });
		  var totalLi = $(".article-browser-insights .article.hidden-phone li").size();
		  var prevLi = active_idx - 1;
		  if (prevLi < 0) { prevLi = totalLi - 1; }
		  var nextLi = active_idx + 1;
		  if (nextLi == totalLi) { nextLi = 0; }
		  if (totalLi > 1) {
			$('.article-browser-insights ul.tabbed-nav.article.visible-phone').empty();
			$('.article-browser-insights ul.tabbed-nav.article.hidden-phone li').eq(prevLi).clone(true).attr('class', 'prev').empty().append('<div class="icn-phone-tabbed-nav-leftarrow"></div>').appendTo($('.article-browser-insights ul.tabbed-nav.article.visible-phone'));
			$('.article-browser-insights ul.tabbed-nav.article.hidden-phone li').eq(active_idx).clone(true).attr('class', 'active').appendTo($('.article-browser-insights ul.tabbed-nav.article.visible-phone'));
			$('.article-browser-insights ul.tabbed-nav.article.hidden-phone li').eq(nextLi).clone(true).attr('class', 'last-child next').empty().append('<div class="icn-phone-tabbed-nav-rightarrow"></div>').appendTo($('.article-browser-insights ul.tabbed-nav.article.visible-phone'));
		  }  
       }	
    $(".article-browser-insights .article li").click(function (eventObject) {console.log('abc1963->    $(".article-browser-insights .article li").click(function (eventObject) {');
      $('.article-browser-insights .article li.active').removeClass('active');
      var $selectedLi = $(this);
      $('.article-browser-insights .show').addClass('hide');
      $('.article-browser-insights .show').removeClass('show');
      var category = $selectedLi.data('category').replace(/([ #;?&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
      $('.article-browser-insights .article [data-category="' + category + '"]').addClass('active');
      var active_idx;
      $('.article-browser-insights ul.tabbed-nav.article.hidden-phone li').each(function (i, element) {console.log('abc1971->      $(\'.article-browser-insights ul.tabbed-nav.article.hidden-phone li\').each(function (i, element) {');
        if ($(element).hasClass('active')) {
          active_idx = i;
        }
      });
      var totalLi = $(".article-browser-insights .article.hidden-phone li").size();
      var prevLi = active_idx - 1;
      if (prevLi < 0) { prevLi = totalLi - 1; }
      var nextLi = active_idx + 1;
      if (nextLi == totalLi) { nextLi = 0; }
      if (totalLi > 1) {
        $('.article-browser-insights ul.tabbed-nav.article.visible-phone').empty();
        $('.article-browser-insights ul.tabbed-nav.article.hidden-phone li').eq(prevLi).clone(true).attr('class', 'prev').empty().append('<div class="icn-phone-tabbed-nav-leftarrow"></div>').appendTo($('.article-browser-insights ul.tabbed-nav.article.visible-phone'));
        $('.article-browser-insights ul.tabbed-nav.article.hidden-phone li').eq(active_idx).clone(true).attr('class', 'active').appendTo($('.article-browser-insights ul.tabbed-nav.article.visible-phone'));
        $('.article-browser-insights ul.tabbed-nav.article.hidden-phone li').eq(nextLi).clone(true).attr('class', 'last-child next').empty().append('<div class="icn-phone-tabbed-nav-rightarrow"></div>').appendTo($('.article-browser-insights ul.tabbed-nav.article.visible-phone'));
      }
      $('.article-browser-insights .' + category).addClass('show');
      $('.article-browser-insights .' + category).removeClass('hide');
    });
  },
   tabArticleBrowserEconomics:function () {console.log('abc1991->   tabArticleBrowserEconomics:function () {');
	  if ($('.article-browser-economics ul.visible-phone').css("display") != "none") {
		  var active_idx;
		  $('.article-browser-economics ul.tabbed-nav.article.hidden-phone li').each(function (i, element) {console.log('abc1994->		  $(\'.article-browser-economics ul.tabbed-nav.article.hidden-phone li\').each(function (i, element) {');
			if ($(element).hasClass('active')) {
			  active_idx = i;
			}
		  });
		  var totalLi = $(".article-browser-economics .article.hidden-phone li").size();
		  var prevLi = active_idx - 1;
		  if (prevLi < 0) { prevLi = totalLi - 1; }
		  var nextLi = active_idx + 1;
		  if (nextLi == totalLi) { nextLi = 0; }
		  if (totalLi > 1) {
			$('.article-browser-economics ul.tabbed-nav.article.visible-phone').empty();
			$('.article-browser-economics ul.tabbed-nav.article.hidden-phone li').eq(prevLi).clone(true).attr('class', 'prev').empty().append('<div class="icn-phone-tabbed-nav-leftarrow"></div>').appendTo($('.article-browser-economics ul.tabbed-nav.article.visible-phone'));
			$('.article-browser-economics ul.tabbed-nav.article.hidden-phone li').eq(active_idx).clone(true).attr('class', 'active').appendTo($('.article-browser-economics ul.tabbed-nav.article.visible-phone'));
			$('.article-browser-economics ul.tabbed-nav.article.hidden-phone li').eq(nextLi).clone(true).attr('class', 'last-child next').empty().append('<div class="icn-phone-tabbed-nav-rightarrow"></div>').appendTo($('.article-browser-economics ul.tabbed-nav.article.visible-phone'));
		  }  
       }	
    $(".article-browser-economics .article li").click(function (eventObject) {console.log('abc2011->    $(".article-browser-economics .article li").click(function (eventObject) {');
      $('.article-browser-economics .article li.active').removeClass('active');
      var $selectedLi = $(this);
      $('.article-browser-economics .show').addClass('hide');
      $('.article-browser-economics .show').removeClass('show');
      var category = $selectedLi.data('category').replace(/([ #;?&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
      $('.article-browser-economics .article [data-category="' + category + '"]').addClass('active');
      var active_idx;
      $('.article-browser-economics ul.tabbed-nav.article.hidden-phone li').each(function (i, element) {console.log('abc2019->      $(\'.article-browser-economics ul.tabbed-nav.article.hidden-phone li\').each(function (i, element) {');
        if ($(element).hasClass('active')) {
          active_idx = i;
        }
      });
      var totalLi = $(".article-browser-economics .article.hidden-phone li").size();
      var prevLi = active_idx - 1;
      if (prevLi < 0) { prevLi = totalLi - 1; }
      var nextLi = active_idx + 1;
      if (nextLi == totalLi) { nextLi = 0; }
      if (totalLi > 1) {
        $('.article-browser-economics ul.tabbed-nav.article.visible-phone').empty();
        $('.article-browser-economics ul.tabbed-nav.article.hidden-phone li').eq(prevLi).clone(true).attr('class', 'prev').empty().append('<div class="icn-phone-tabbed-nav-leftarrow"></div>').appendTo($('.article-browser-economics ul.tabbed-nav.article.visible-phone'));
        $('.article-browser-economics ul.tabbed-nav.article.hidden-phone li').eq(active_idx).clone(true).attr('class', 'active').appendTo($('.article-browser-economics ul.tabbed-nav.article.visible-phone'));
        $('.article-browser-economics ul.tabbed-nav.article.hidden-phone li').eq(nextLi).clone(true).attr('class', 'last-child next').empty().append('<div class="icn-phone-tabbed-nav-rightarrow"></div>').appendTo($('.article-browser-economics ul.tabbed-nav.article.visible-phone'));
      }
      $('.article-browser-economics .' + category).addClass('show');
      $('.article-browser-economics .' + category).removeClass('hide');
    });
  },
   viewAllAICSButtonClass:function(){console.log('abc2039->   viewAllAICSButtonClass:function(){');
   $("h2.section-title").each(function(){$(this).find("button").removeClass("btn-primary").addClass("btn-small");});
   },
  tempQAGITIconChange:function(){console.log('abc2042->  tempQAGITIconChange:function(){');
			if(($("html").hasClass('dbs'))||($("html").hasClass('private-bank'))) {
				var $git_opendbs_src = $("img[src$='arrow.png'][alt='Open a DBS Account']")
				$git_opendbs_src.attr('src','images/get-in-touch/sg-private-banking/arrow.png');
				var $git_opendbs_src = $("img[src$='phone.png'][alt='Contact me']")
				$git_opendbs_src.attr('src','images/get-in-touch/sg-private-banking/call.png');
				var $git_opendbs_src = $("img[src$='calendar.png'][alt='Make an appointment']")
				$git_opendbs_src.attr('src','images/get-in-touch/sg-private-banking/calendar.png');
				var $git_opendbs_src = $("img[src$='location.png'][alt='Our Branches and ATMs']")
				$git_opendbs_src.attr('src','images/get-in-touch/sg-private-banking/location.png');
				var $git_opendbs_src = $("img[src$='git-chat.png'][alt='Chat with us']")
				$git_opendbs_src.attr('src','images/get-in-touch/sg-private-banking/git-chat-white.png');
			}
  }
  ,
 fitTabContent:function(){console.log('abc2057-> fitTabContent:function(){');
    $(".tabbed-content").each(function() {console.log('abc2058->    $(".tabbed-content").each(function() {');
        $thiselement = $(this);
        $(this).parents().each(function() {console.log('abc2060->        $(this).parents().each(function() {');
            if ($(this).attr('class') == 'span8')
            {
                $thiselement.find(".tabcontent").each(function(i) {console.log('abc2063->                $thiselement.find(".tabcontent").each(function(i) {');
                    if ($(this).find('.span4').length == 0)
                    {
                        $(this).find('.span8').removeClass('span8').addClass('span12');
                    }
                });
            }
        });
    });
},
 alertajaxCall:function ()
{
 $("#annmain").on("click","#announcement", {
	  close: "true"
	},annoucement_call);
},
FlyGIT:function () {console.log('abc2079->FlyGIT:function () {');
	var isPhone = true;
	if ($('.hidden-phone').is(":visible")) {
		isPhone = false;
	}
	var dataIntervalGIT = $('.GIT-container').data("interval");
		$.loginHomeMenu = function(minWidth,maxWidth,dataIntervalGIT){console.log('abc2085->		$.loginHomeMenu = function(minWidth,maxWidth,dataIntervalGIT){');
		var loginWrap = $('.GIT-container.flyoutGIT');
		var loginTouch = $('.GIT-container.flyoutGIT .col4-module.get-in-touch');
		loginWrap.on('mouseover', function() {console.log('abc2088->		loginWrap.on(\'mouseover\', function() {');
			showGIT();
		}).on('mouseout', function() {console.log('abc2090->		}).on(\'mouseout\', function() {');
			hideGIT();
		}).find('img').on('click', function(e) {console.log('abc2092->		}).find(\'img\').on(\'click\', function(e) {');
			 e.stopPropagation();
			//showGIT();
			 //return false;
		});
		if(isPhone && $(window).width()>768){
			$('body').on({ 'touchstart' : function(e){ console.log('abc2098->			$(\'body\').on({ \'touchstart\' : function(e){ ');
				if(e.originalEvent.touches[0].pageX<670 || e.originalEvent.touches[0].pageY>379){
					hideGIT();
				}
			} 
			});
		}				
		function hideGIT() {console.log('abc2105->		function hideGIT() {');
			if(dataIntervalGIT!=undefined && parseInt(dataIntervalGIT)!=NaN && parseInt(dataIntervalGIT)>0){
				loginTouch.animate({ width: minWidth }, { duration: 500, queue: false }, 'swing') 
				.find('.span8')
				.animate({ opacity: 0, width: 0,paddingLeft: 0}, { duration: 500, queue: false });
			}
		}
		function showGIT() {/* alert('showGIT'); */
			if($(".cardMenu").is(":visible")){
				$(".cardMenu").slideUp(400);
			}
			if(navigator.userAgent.match(/iPad|Android|Mobile/i) && $(window).width()<1000 && $(window).width()>760){ 
			loginTouch.animate({ width: maxWidth }, { duration: 500, queue: false }, 'swing')
			.find('.span8')
			.animate({ opacity: 1,width: "280",paddingLeft: 0,  display: 'block'}, { duration: 500, queue: false }).find('a').css('display','inline-block');
			}
			else{ 
			loginTouch.animate({ width: maxWidth }, { duration: 500, queue: false }, 'swing')
			.find('.span8')
			.animate({ opacity: 1,width: "280",paddingLeft: 15,  display: 'block'}, { duration: 500, queue: false }).find('a').css('display','inline-block');
			}
		}
		if(dataIntervalGIT!=0)
		{
		setTimeout(function() {console.log('abc2129->		setTimeout(function() {');
			loginWrap.data('width', '');
			//hideGIT(); /*commented for IE8 issue and added mouseover and mouseout events*/
			loginWrap.mouseover();
			loginWrap.mouseout();
		}, dataIntervalGIT);
		}
	}
	$.loginHomeMenu(40,330,dataIntervalGIT);
	}
	,
	borrowHero:function()
	{
	function populateDropdownQuestion1(obj) {console.log('abc2142->	function populateDropdownQuestion1(obj) {');
		if (obj == undefined) {
			obj = $('.cardMenu.dropdown-menu li:first');
		}
		loansDropdown = $('.loansMenu'),
		options = $(obj).data('options');
		loanOptions = '<option value="">' + $('.loansMenu option:first').html() + '</option>';
		$(options).each(function(index, option) {console.log('abc2149->		$(options).each(function(index, option) {');
			loanOptions += '<option value="index" data-link=' + JSON.stringify(option.link) + ' data-target=' + JSON.stringify(option.target) + ' data-placeholder1=' + JSON.stringify(option.placeholder-1) + ' data-placeholder2=' + JSON.stringify(option.placeholder-2)  + ' data-sub-options=\'' + JSON.stringify(option.subOptions) + '\'>' + option.label + '</option>';
		});
		loansDropdown.html('');
		loansDropdown.append(loanOptions);
		loansSubMenuFirstLabel = $('.loansSubMenu option:first').html();
		loansSubMenu = $('.loansSubMenu');
		loansSubMenu.html('<option value="" >' + loansSubMenuFirstLabel + '</option>');
	    loansSubMenu.attr('disabled', 'disabled');
	    loansSubMenu.closest('.customDropdown').addClass('disabled');    
	} 
	$('.loansdropdownvariant .cardMenu.dropdown-menu li,.loanstextvariant .cardMenu.dropdown-menu li').on('click',function() {console.log('abc2160->	$(\'.loansdropdownvariant .cardMenu.dropdown-menu li,.loanstextvariant .cardMenu.dropdown-menu li\').on(\'click\',function() {');
		var _this = $(this),
		val = _this.attr('data-name'),
		className = '',
		defaultClass = 'tabbed-content page-module clearfix tabbed-content-back',
		sectionCls = _this.parents('.tabbed-content-back'),
		pageHeroBanner = $('.pagehero .hero-page-banner');
		$("#question1").attr('placeholder','');
		$("#question2").attr('placeholder','');
		$("#question1").val("");
		$("#question2").val("");
		$(".loansSubMenu").closest('.customDropdown').addClass('hidden');  
		var items = $(this).parent().find('.active');
		$(items).toggleClass("active");
		$(this).toggleClass("active");
		var text = $(this).data('name');
		 //$(".loanstextvariant .dropdown-cards .displayTitle,.loansdropdownvariant .dropdown-cards .displayTitle").text(text).append($("<i/>").addClass("arrow-down-white"));
		$('.dropdown-menu').fadeOut();
		if(val != null || val.length != 0) {
			className = val.toLowerCase().replace(/\s/g, "");
			pageHeroBanner.find('img').hide();
			pageHeroBanner.find('#heroBanner-'+className).show();
			populateDropdownQuestion1(_this);
		}
		$("#question1").attr('placeholder',_this.data('placeholder1'));
		$("#question2").attr('placeholder',_this.data('placeholder2'));
		$(".findloans").attr('href',_this.data('link'));
		$(".findloans").attr('target',_this.data('target'));
		if(_this.data('placeholder2')=="")
		{$("#question2").hide();}
		else
		{$("#question2").show();}
		_this.parent().parent().parent().removeClass().addClass("header-2").addClass(_this.data('headcolor'));
		_this.parent().parent() .find(".displayTitle").removeClass().addClass("displayTitle").addClass(_this.data('dropcolor'));
		 $(".findloans").removeClass().attr('class','btn findloans disabled').addClass(_this.data('buttontext'));
		 $(".findloans").addClass(_this.data('buttoncolor'));
	//if(q1empty || q2empty)
	//$(".findloans").
	//if(q1 && 
	pageLevelComponents.placeholderModernizr();
	});
	//if( $("#question1").length 
	$('#question1,#question2').on("propertychange keyup input paste", function(event){console.log('abc2202->	$(\'#question1,#question2\').on("propertychange keyup input paste", function(event){');
	if($(".loanstextvariant").length > 0)
	{
		var q1notempty =$("#question1").is(":visible") && $("#question1").val().replace(/^\s+|\s+$/g, "").length;
	var q2notempty =$("#question2").is(":visible") && $("#question2").val().replace(/^\s+|\s+$/g, "").length;
	//console.log("vvvvvvvvv->"+q1notempty);
	//console.log("vvvvvvvvva->"+q2notempty);
		if(q1notempty || q2notempty)
		{ 
		$(".findloans").removeAttr('disabled');
		$(".findloans").removeClass('disabled');
		$('.loanstextvariant  .findloans').unbind("click");
		}
		else
		{
		 $(".findloans").attr('disabled','disabled');
		$(".findloans").addClass('disabled');
		$('.loanstextvariant  .findloans').bind("click",function(e){e.preventDefault()});
		}
	}
	});
	$('.loanstextvariant  .findloans').addClass('disabled');
	$('.loanstextvariant  .findloans').bind("click",function(e){e.preventDefault()});
	$('.cardMenu.dropdown-menu li:first').click();
	$('.loansdropdownvariant  .findloans').addClass('disabled');
	/*
	$('.loans-items input').on('keyup', function() {console.log('abc2228->	$(\'.loans-items input\').on(\'keyup\', function() {');
		areFieldsEmpty = false;
		$('.loans-items input').each(function(index, obj) {console.log('abc2230->		$(\'.loans-items input\').each(function(index, obj) {');
			if ($(obj).val() == '') areFieldsEmpty = true;
		})
		if (areFieldsEmpty) {
			$('.pagehero .btn-primary').addClass('disabled');
		}
		else {
			$('.pagehero .btn-primary').removeClass('disabled');
		}
	});
	*/
	$('.loansMenu').on('change', function () {console.log('abc2241->	$(\'.loansMenu\').on(\'change\', function () {');
		var currentLink = $(this).find(':selected').data('link'); 
		if((currentLink=="undefined")||($('.loansMenu').val()==""))
		{
		$('.loansdropdownvariant .findloans').addClass('disabled');
		loansSubMenu.closest('.customDropdown').addClass('hidden');    
			$('.loansMenu').parent().next().removeAttr('style');
			var loansSubMenuFirstLabel = $('.loansSubMenu option:first').html();
			var loansValue = $(this).val(); 
			var subOptions = $(this).find(':selected').data('sub-options');
			$('.loans-items').next().find('button').addClass('disabled');
			if (loansValue != '') {
			loansSubMenu.closest('.customDropdown').removeClass('hidden');    
				loanSubOptions = '<option value="">' + loansSubMenuFirstLabel + '</option>';
				$(subOptions).each(function(index, subOption) {console.log('abc2255->				$(subOptions).each(function(index, subOption) {');
					loanSubOptions += '<option value="' + subOption.link + '"data-target=' + JSON.stringify(subOption.target) +'>' + subOption.label + '</option>';
				});
				loansSubMenu = $('.loansSubMenu');
				loansSubMenu.html('');
				loansSubMenu.append(loanSubOptions);
				loansSubMenu.removeAttr('disabled');
				loansSubMenu.closest('.customDropdown').removeClass('disabled');
				$('.loansSubMenu').on('change', function () {console.log('abc2263->				$(\'.loansSubMenu\').on(\'change\', function () {');
					var loansSubMenuValue = $(this).val();
					if (loansSubMenuValue != '') {
						$('.pagehero .btn').removeClass('disabled');
					}
					else {
						$('.pagehero .btn').addClass('disabled');
					}
				});
			}
			else {
				loansSubMenu.html('<option value="">' + loansSubMenuFirstLabel + '</option>');
				loansSubMenu.attr('disabled', 'disabled');
				loansSubMenu.closest('.customDropdown').addClass('disabled');    
			}
		}
		else
		{ 
			$('.loansMenu').parent().next().attr('style','display:none !important');
			$('.pagehero .btn').removeClass('disabled');
		}
	});
	$('.pagehero .btn ').on('click', function(e) {console.log('abc2285->	$(\'.pagehero .btn \').on(\'click\', function(e) {');
	if($('.loansMenu').length)
	{
		if (! $(this).hasClass('disabled')) {
			var link="";
			link = $('.loansMenu').find(':selected').data('link');
			var link_target= $('.loansMenu').find(':selected').data('target');
			if(link!="undefined")
			{
			window.open(link, link_target);
			}
			else
			{
				link = $('.loansSubMenu').find(':selected').val();
			window.open(link, link_target);
			}
		}
	} 
		//e.stopPropogation();
	});
	$('.displayTitle ').on('click',function(){console.log('abc2305->	$(\'.displayTitle \').on(\'click\',function(){');
		var headerMenu = $('.dropdown.open');
		if(headerMenu.length != 0 && headerMenu.hasClass('open')){
			headerMenu.removeClass('open');
		}
	});
	$('.dropdown-toggle').on('click',function(){console.log('abc2311->	$(\'.dropdown-toggle\').on(\'click\',function(){');
		$('.cardMenu').hide()
	});
	  populateDropdownQuestion1();
	}
	,
	megaMenu:function()
	{
	$('.mydropdown-menu').on('mouseover', 'a', function (e) { console.log('abc2319->	$(\'.mydropdown-menu\').on(\'mouseover\', \'a\', function (e) { ');
         $(this).parent().addClass('activeLink').siblings().removeClass('activeLink');
        var linkId = $(this).attr('id');
          linkId = linkId.substring(4);
		//console.log("linkid->"+linkId);
        $('#' + linkId).show().siblings().hide().first('span3').show();
		e.stopPropagation();
    });
	$("ul.megamenu > li .megapanel").on('mouseover',  function (e) {e.stopPropagation(); });
	$(".megapanel").on("mouseleave", function () {console.log('abc2328->	$(".megapanel").on("mouseleave", function () {');
		  $(this).find('.mydropdown-menu li').removeClass('activeLink').first().addClass('activeLink');
         //   $(this).stop().fadeOut()
        });
		$.fn.megamenu = function (e) {console.log('abc2332->		$.fn.megamenu = function (e) {');
    function r() {console.log('abc2333->    function r() {');
        $(".megamenu").find("li, a").unbind();
		 u();
            i();
		/*	
        if (window.innerWidth <= 768) {
		console.log("v");
            o();
            s();
            if (n == 0) {
                $(".megamenu > li:not(.showhide)").hide(0)
            }
        } else {
		console.log("s");
            u();
            i();
        }*/
    }
    function i() {console.log('abc2351->    function i() {');
        $("ul.megamenu > li").bind("mouseover", function () {console.log('abc2352->        $("ul.megamenu > li").bind("mouseover", function () {');
		$('.megapanel').hide();
            //if ($('.megapanel').is(':hidden')) {
               //  $('.mydropdown-menu li').removeClass('activeLink');
               // $('.mydropdown-menu li:first-child').addClass('activeLink');
                  $(this).find('.megapanel .span9:first').show().siblings().hide().first('span3').show();
				//   $('#savingsAccounts').show().siblings().hide().first('span3').show();
           // }
		 	 //$(this).children(".dropdown, .megapanel").stop().fadeIn(t.interval)
			if(!navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|webOS|Mobile/i)){  
				$(this).children(".dropdown, .megapanel").show();
			}
			// add below if condition to set opacity 1.
		// 	if($(this).children(".dropdown, .megapanel").css('opacity') < 1)
		//	 {
		// 		$(this).children(".dropdown, .megapanel").css("opacity",1);
		//	 }
        }) 
		 .bind("mouseleave", function () {console.log('abc2370->		 .bind("mouseleave", function () {');
            $(this).children(".dropdown, .megapanel").stop().fadeOut(t.interval)
        }) 
    }
    function s() {console.log('abc2374->    function s() {');
        $(".megamenu > li > a").bind("click", function (e) {console.log('abc2375->        $(".megamenu > li > a").bind("click", function (e) {');
            if ($(this).siblings(".dropdown, .megapanel").css("display") == "none") {
                $(this).siblings(".dropdown, .megapanel").slideDown(t.interval);
                $(this).siblings(".dropdown").find("ul").slideDown(t.interval);
			    n = 1
            } else {
                $(this).siblings(".dropdown, .megapanel").slideUp(t.interval)
            }
        })
    }
    function o() {console.log('abc2385->    function o() {');
        $(".megamenu > li.showhide").show(0);
        $(".megamenu > li.showhide").bind("click", function () {console.log('abc2387->        $(".megamenu > li.showhide").bind("click", function () {');
            if ($(".megamenu > li").is(":hidden")) {
                $(".megamenu > li").slideDown(300)
            } else {
                $(".megamenu > li:not(.showhide)").slideUp(300);
				$(".megamenu > li.showhide").show(0)
            }
        })
    }
    function u() {console.log('abc2396->    function u() {');
        $(".megamenu > li").show(0);
        $(".megamenu > li.showhide").hide(0)
    }
    var t = {
        interval: 100
    };
    var n = 0;
    $(".megamenu").prepend("<li class='showhide'><span class='title'>MENU</span><span class='icon1'></span><span class='icon2'></span></li>");
     r();
    $(window).resize(function () {console.log('abc2406->    $(window).resize(function () {');
       // r()
    })
	}
	$(".megamenu").megamenu();
	},
	creditcardHomeBanner:function()
	{
	if (isPhone){
		$("#FindOffersDrp").on('change', function(){console.log('abc2415->		$("#FindOffersDrp").on(\'change\', function(){');
			var selectedVal = $("#FindOffersDrp option:selected").attr("id");
			$(".latestoffers-default-mobile").find("div[data-name]").removeClass("show").addClass("hide");
			$(".latestoffers-default-mobile").find("div[data-name="+selectedVal+"]").addClass("show");
		});
		var $mobileLatest = $('#latestoffers-mobile.carousel').carousel();
	  /*
		$('#latestoffers-mobile').on('swipeleft', function(e) {console.log('abc2422->		$(\'#latestoffers-mobile\').on(\'swipeleft\', function(e) {');
			$mobileLatest.carousel('next');
		});
		$('#latestoffers-mobile').on('swiperight', function(e) {console.log('abc2425->		$(\'#latestoffers-mobile\').on(\'swiperight\', function(e) {');
			$mobileLatest.carousel('prev');
		});
		*/
		/*
		if(document.getElementById('latestoffers-mobile')!=null)
		{ 
		document.getElementById('latestoffers-mobile').addEventListener('swl',function() {console.log('abc2432->		document.getElementById(\'latestoffers-mobile\').addEventListener(\'swl\',function() {');
			$mobileLatest.carousel('next');
		},false);
		}
		if(document.getElementById('latestoffers-mobile')!=null)
		{
		document.getElementById('latestoffers-mobile').addEventListener('swr',function() {console.log('abc2438->		document.getElementById(\'latestoffers-mobile\').addEventListener(\'swr\',function() {');
			$mobileLatest.carousel('prev');
		},false);
		}
		*/
		var $mobileHero = $('#mobileCarousel.carousel').carousel({
			interval: false, wrap: true
		});
	  /*
		$('#mobileCarousel').on('swipeleft', function(e) {console.log('abc2447->		$(\'#mobileCarousel\').on(\'swipeleft\', function(e) {');
			$mobileHero.carousel('next');
		});
		$('#mobileCarousel').on('swiperight', function(e) {console.log('abc2450->		$(\'#mobileCarousel\').on(\'swiperight\', function(e) {');
			$mobileHero.carousel('prev');
		});
	*/
	/*
	if(document.getElementById('mobileCarousel')!=null)
	{
	document.getElementById('mobileCarousel').addEventListener('swl',function() {console.log('abc2457->	document.getElementById(\'mobileCarousel\').addEventListener(\'swl\',function() {');
			$mobileHero.carousel('next');
		},false);
	}
	if(document.getElementById('mobileCarousel')!=null)
	{
	document.getElementById('mobileCarousel').addEventListener('swr',function() {console.log('abc2463->	document.getElementById(\'mobileCarousel\').addEventListener(\'swr\',function() {');
			$mobileHero.carousel('prev');
		},false);
	}
	*/
		var $mobilelatestoffers = $('#latestoffers.carousel').carousel();
	/*	
		if(document.getElementById('latestoffers')!=null)
	{
	document.getElementById('latestoffers').addEventListener('swl',function() {console.log('abc2472->	document.getElementById(\'latestoffers\').addEventListener(\'swl\',function() {');
			$mobilelatestoffers.carousel('next');
		},false);
	}
	if(document.getElementById('latestoffers')!=null)
	{
	document.getElementById('latestoffers').addEventListener('swr',function() {console.log('abc2478->	document.getElementById(\'latestoffers\').addEventListener(\'swr\',function() {');
			$mobilelatestoffers.carousel('prev');
		},false);
	}
	*/
	}
	$.latestOffersMenuInit = function(){ console.log('abc2484->	$.latestOffersMenuInit = function(){ ');
			$('#subnav').children('li').on('click',function(){console.log('abc2485->			$(\'#subnav\').children(\'li\').on(\'click\',function(){');
				var _this = $(this);
				var targetName = _this.find('a').data('target');
				var activeLi = _this.parents('#subnav').find('li.active');
				var searchGroup = $('.card-options');
				var loansMore = _this.parent('#subnav').find('#loans-more');
				if(!_this.hasClass('active')){
					_this.addClass('active');
					$.toggleIconClass(activeLi);
					activeLi.removeClass('active');
					loansMore.removeClass('open');
					$.toggleIconClass(_this);
					if(targetName !='more'){
									$.toggleLoansSearch(searchGroup,targetName);
					}
				}
			});
			var loanMoreAddFlag = true;
			$('#loans-more') .on('click','.dropdown-menu li', function() {console.log('abc2503->			$(\'#loans-more\') .on(\'click\',\'.dropdown-menu li\', function() {');
				var _this = $(this);
				_this.removeClass('open');
				_this.parents('.loans-dropdown').removeClass('open');
				var activeLi = _this.parents('li.active');                                    
				var searchGroup = $('.card-options');
				var targetName = _this.find('a').data('target');
				activeLi.removeClass('active');
				$.toggleLoansSearch(searchGroup,targetName);
				return false;
			});
			$('#loans-more ul.dropdown-menu li').click(function(e){console.log('abc2514->			$(\'#loans-more ul.dropdown-menu li\').click(function(e){');
			e.stopPropagation();
			  var loansAdded= $('#loans-wrap');
				var subNavActiveLi = $('#subnav').find('li.active');
				subNavActiveLi.removeClass('active');
				var loansCurrent = loansAdded.html();
				//loansAdded.addClass('active');
				loansAdded.html($(this).html());
				$(this).html(loansCurrent);
				var loansMore =$(this).parents('#subnav').find('#loans-more');
				loansAdded.addClass('active');
				loansMore.removeClass('open');
			});                     
	}
	$.latestOffersMenuInit();
		$( ".card-options" ).on("click", ".btn", function() {console.log('abc2529->		$( ".card-options" ).on("click", ".btn", function() {');
	  if (!$(".latestoffers-flyout").is(":visible")) {
		$(".latestoffers-flyout").flyInorOut();
		/*$('html, body').animate({
		scrollTop: $("#latest-offers-flyout").offset().top
		}, 800);*/
	  }
	});
	/*
	$("a.cursor-hand").on('click', function (){console.log('abc2538->	$("a.cursor-hand").on(\'click\', function (){');
		$('html, body').animate({
			scrollTop: $(".latestoffers-default-mobile").offset().top
		}, 800);
	});
	*/
	$(".latestoffers-flyout .hide-switch a").on("click", function() {console.log('abc2544->	$(".latestoffers-flyout .hide-switch a").on("click", function() {');
	  $(".latestoffers-flyout").flyInorOut();
	});
	},
	pageHero:function()
	{
	var noofitems=$('.navigation.carousel .carousel-inner .item').length;
		var isPhone = true;
		if ($('.hidden-phone').is(":visible")) {
			isPhone = false;
		}
		var dataIntervalTiming = $('.pagehero .secondtabactivevariant.tabbed-content').data("interval");
		var navigationInterval, navigationTimeout;
		var id = 0;
		var $carousel = $('.pagehero .content.carousel').carousel({
			interval: false,
			wrap: true
		});
		$('.caption-back-left').on('click',function() { console.log('abc2562->		$(\'.caption-back-left\').on(\'click\',function() { ');
			$('#myCarousel').carousel('prev');
			$('#myCarouselNav').carousel('prev');
		});
		$('.caption-back-right').on('click',function() {console.log('abc2566->		$(\'.caption-back-right\').on(\'click\',function() {');
			$('#myCarousel').carousel('next');
			$('#myCarouselNav').carousel('next'); 
		});
var exec_a1 = true;
function animateEle(e) {    console.log('abc2571->function animateEle(e) {    ');
			 $('.navigation.carousel .item').each(function () {console.log('abc2572->			 $(\'.navigation.carousel .item\').each(function () {');
			 $(this).off('click touchstart', animateEle);
			 });  
				e.stopPropagation(); clearAllTimers(); 
				if(!$('.navigation.carousel .carousel-inner').is(':animated')){
					$(this).parent().children('.active').removeClass('active');
					$(this).addClass('active');
					slidingNav( $(this).index(),e);
					 navigationInterval = setInterval(slidingNav, dataIntervalTiming);
						setTimeout(function () { console.log('abc2581->						setTimeout(function () { ');
				   $('.navigation.carousel .item').each(function () { console.log('abc2582->				   $(\'.navigation.carousel .item\').each(function () { ');
		 	 $(this).on('click touchstart', animateEle); 
			 }); 
			 }, speed+200); 
				} 
			}
		$('.navigation.carousel .item').each(function () {console.log('abc2588->		$(\'.navigation.carousel .item\').each(function () {');
		$(this).show()
			.data('id', id)
			.on('dblclick', function (e) {return;});
		$(this).show()
			.data('id', id)
			.on('click touchstart', animateEle);
		id++;
		});
		if (isPhone) { 
			$('.navigation.carousel').on('touchstart', function (e) {console.log('abc2598->			$(\'.navigation.carousel\').on(\'touchstart\', function (e) {');
				//prevents scrolling
				e.preventDefault();
			});
			$('.navigation.carousel').on('tap', function (e) {console.log('abc2602->			$(\'.navigation.carousel\').on(\'tap\', function (e) {');
				startTimeout();
				slidingNav();
				e.stopPropagation();
				e.preventDefault();
			});
		}
		   $('#secondtabcarousel')
        .on('mouseover', function () {console.log('abc2610->        .on(\'mouseover\', function () {');
            clearAllTimers();
        })
        .on('mouseout', function () {console.log('abc2613->        .on(\'mouseout\', function () {');
            //startTimeout();
			navigationInterval = setInterval(slidingNav, dataIntervalTiming);
        });
		/* the following deals with the sliding hero block */
		var speed =0;
		function slidingNav(pos,e) { console.log('abc2619->		function slidingNav(pos,e) { ');
			var isPhone = true;
			if ($('.hidden-phone').is(":visible")) {
				isPhone = false;
			}
			var first = $('.navigation.carousel .item').first();
			var last = $('.navigation.carousel .item').last();
			var id;
			//alert(pos);
			if (typeof (pos) === 'undefined') { 
				first.parent().children('.active').removeClass('active');
				if (isPhone) {
					first.next().addClass('active');
					id = $(first).next().data('id');
				} else {
					var tl = $($('.navigation.carousel .item').get(2));
					tl.addClass('active');
					id = tl.data('id');
				}
			} else if (pos == -1) {
				first.parent().children('.active').removeClass('active');
				first.addClass('active');
				id = $(first).data('id');
			} else {
				id = $($('.navigation.carousel .item').get(pos)).data('id');
			}
			// $('.pagehero .content.carousel').find('.active').trigger($.support.transition.end);
			if(id!=null)
			{
				if(pos!=undefined && !isPhone){
					if(pos==0){
						$carousel.carousel('prev');
					}else if(pos==1){
						return false;
					}else if(pos==2){ 
						$carousel.carousel('next');
					}else if(pos>2){
						var parentCls=$('.pagehero .content.carousel .carousel-inner');
						var activeCarosel=parentCls.children('.active').index();
						var lastElement=$('#secondtabcarousel .carousel-inner >div ').length-1;
						var secondLastElement=$('#secondtabcarousel .carousel-inner >div ').length-2;
						//alert($('#secondtabcarousel .carousel-inner >div ').length);
						if(activeCarosel==lastElement){
							$carousel.carousel(1);
						}else if(activeCarosel==secondLastElement){
							$carousel.carousel(0);
						}else{
							$carousel.carousel(activeCarosel+2);
						}
					}else{
						$carousel.carousel(id);
					}
	//								startTimeout();
				}else{ 
					$carousel.carousel('next');
				}
				$('.navigation.carousel .item').each(function () {console.log('abc2675->				$(\'.navigation.carousel .item\').each(function () {');
				});
			}
			var left,right;
			var dir = 'left';
			speed=500;
			if (typeof (pos) === 'undefined') {
				left = first.outerWidth(true);
			} else if (pos == 3) {
				left = first.outerWidth(true) * 2;
				speed = speed * 2;
			} else if (pos == 2) {
				left = first.outerWidth(true);
			} else if (pos == 1) {
				right = 0;
				dir = 'none';
			} else if (pos == 0) {
				right = first.outerWidth(true);
				dir = 'right';
			} else if (pos == -1) {
				right = first.outerWidth(true);
				dir = 'right';
			}
			if (dir === 'none') {
				/* this logic is just a blank placeholder */
			} else if (dir === 'left') {
				if($('.navigation.carousel .carousel-inner .item').length<=noofitems)
				 $('.navigation.carousel .carousel-inner').append($(first).clone(true));
				if(pos == 3){
					 $('.navigation.carousel .carousel-inner').append($(first).next().clone(true));
				}
				if(!$('.navigation.carousel .carousel-inner').is(':animated')){
				$('.navigation.carousel .carousel-inner') 
					.stop().animate({
						'left': -left
					}, speed, function () {console.log('abc2710->					}, speed, function () {');
						/****Commented for white space issue in Carousel tabs 
						var item1 = $(first).clone(true);
						if (pos == 3) {
							var item2 = $(first).next().clone(true);
							$(this).append(item1).append(item2);
							$(first).next().remove();
							$(first).remove();
						} else {
							$(this).append(item1);
							$(first).remove();
						}*/
						$(this).css({
							'left': 0
						});
						$($('.navigation.carousel .carousel-inner .active').prev()).prevAll().remove();
					   }); 
					}
			} else { 
				/* scroll right */
				var item1 = $(last).clone(true);
				if (isPhone) {
					$(first).parent().children('.active').removeClass('active');
					item1.addClass('active');
				}
				$('.navigation.carousel .carousel-inner')
					.css({
						'left': -right
					})
					.prepend(item1)
					.stop().animate({
						'left': 0
					}, speed, function () {console.log('abc2742->					}, speed, function () {');
					 $(last).remove();
					});
			}
		}
		function startSlider() {console.log('abc2747->		function startSlider() {');
			 clearAllTimers();
			 slidingNav(); //call it straight away
			 navigationInterval = setInterval(slidingNav, dataIntervalTiming);
		}
		function startTimeout() {console.log('abc2752->		function startTimeout() {');
			 clearAllTimers();
			navigationTimeout = setTimeout(startSlider, dataIntervalTiming);
		}
		function clearAllTimers() {console.log('abc2756->		function clearAllTimers() {');
			clearInterval(navigationInterval);
			clearTimeout(navigationTimeout);
		}
		if(!isPhone){
			startTimeout();
		}
		$(window).on("orientationchange resize", function(event) {console.log('abc2763->		$(window).on("orientationchange resize", function(event) {');
			var isPhone = true;
			if ($('.hidden-phone').is(":visible")) {
				isPhone = false;
			}
			if(!isPhone){
				$('.navigation.carousel .item').each(function () {console.log('abc2769->				$(\'.navigation.carousel .item\').each(function () {');
		$(this).show()
			.data('id', id)
			.on('dblclick', function (e) {return;});
		id++;
				});
				startTimeout();
			}
			else{
				clearAllTimers();
				$('#myCarousel div.item').removeClass('left');
				$('#myCarouselNav div.item').removeClass('left');
			}
		});
		HeroBannerMobile=function() {console.log('abc2783->		HeroBannerMobile=function() {');
      var   interval = undefined,
                pointer = 0;
        var show = function(direction) {console.log('abc2786->        var show = function(direction) {');
            var $content = $('#myCarousel .item').eq(pointer);
	var $active   =  $('#myCarousel  .item').eq(pointer);
  $('#myCarousel .carousel-inner ').animate({left: (direction == 'right' ? '100%' : '-100%')}, 300, function(){ console.log('abc2789->  $(\'#myCarousel .carousel-inner \').animate({left: (direction == \'right\' ? \'100%\' : \'-100%\')}, 300, function(){ ');
  $('#myCarousel .carousel-inner .item').hide();
   $('#myCarousel  .item').eq(pointer).show();
$('#myCarousel .carousel-inner').attr('style','left:0;');
			var temp=0; 
			  $('#myCarousel .item').eq(pointer).next().addClass('active');
			  var $next = $('#myCarousel .item').removeClass('active').next();
if ($next.length) {
    $next.addClass('active'); 
}
else {
    $(".item:first").addClass('active');
}
        });
		console.log("diret->"+direction);
		/*
		 $('.landing-page-hero-tiles.mobile-controls  div').animate({left: (direction == 'right' ? '100%' : '-100%')}, 300, function(){ console.log('abc2805->		 $(\'.landing-page-hero-tiles.mobile-controls  div\').animate({left: (direction == \'right\' ? \'100%\' : \'-100%\')}, 300, function(){ ');
		 */
		  
		/*	});*/
        };
        var timefunc;
        function resetInterval() {console.log('abc2816->        function resetInterval() {');
            var t = $('.carNav .item').eq(pointer).attr('data-timeout') * 1000;
			//alert($('.landing-page-hero-tiles .item').eq(pointer).attr('data-timeout'));
			if(isNaN(t)||(t==0))
			t=5000;
             //console.log("t----------"+t+"-"+pointer);
			// t=60000;
            timefunc = setTimeout(function() {console.log('abc2823->            timefunc = setTimeout(function() {');
				console.log("pta->"+pointer);
                pointer++;
				// if (pointer == $(".landing-page-hero-content a").length) {
                if (pointer == $("#myCarouselNav .item").length ) {
                    pointer = 0;
                }
					console.log("pta1->"+pointer);
                show('left');
					console.log("pta2->"+pointer);
                resetInterval();
            }, t);
        }
        ;
        // initial state for background image, delayed by $(window).load()
        resetInterval();
        $('  .preva').click(function(eventObject) {console.log('abc2839->        $(\'  .preva\').click(function(eventObject) {');
            // hide();
            var $selectedTile = $(this);
            if ($selectedTile.hasClass('nexta')) {
                pointer++;
                if (pointer > $("#myCarouselNav .item").length-1) {
                    pointer = 0;
                }
            } else if ($selectedTile.hasClass('preva')) {
                pointer--;
                if (pointer < 0) {
                    pointer = $("#myCarouselNav .item").length-1;
                }
            }
            clearTimeout(timefunc);
             console.log($selectedTile.attr("class"));
			show('right');
            resetInterval();
        });
		 $('   .nexta').click(function(eventObject) {console.log('abc2858->		 $(\'   .nexta\').click(function(eventObject) {');
            // hide();
            var $selectedTile = $(this);
			alert('next');
            if ($selectedTile.hasClass('nexta')) {
                pointer++;
                if (pointer > $("#myCarouselNav .item").length-1) {
                    pointer = 0;
                }
            } else if ($selectedTile.hasClass('preva')) {
                pointer--;
                if (pointer < 0) {
                    pointer = $("#myCarouselNav .item").length-1;
                }
            }
            clearTimeout(timefunc);
             console.log($selectedTile.attr("class"));
            show('left');
            resetInterval();
        });
    }
	HeroBannerMobile();
	}
	,
	cardsMenu:function()
	{
	},
	notification:function()
	{
		$('.notification-header').click(function () {console.log('abc2887->		$(\'.notification-header\').click(function () {');
        showNotification();
    });
    $('.close-button').click(function () {console.log('abc2890->    $(\'.close-button\').click(function () {');
        closeNotification();
    });
	 $('.notificaton-close').on("click",notificationajaxcall);
    $('#slideDownLink').click(function () {console.log('abc2894->    $(\'#slideDownLink\').click(function () {');
        hideNotification();
    });
	function showNotification() {console.log('abc2897->	function showNotification() {');
       $('.notification-container').slideDown('slow');	
}
function hideNotification() {console.log('abc2900->function hideNotification() {');
      $('.notification-container').slideUp();
}
function closeNotification()
{  
	$('.notification').hide();
}
    var dTime = $('#notification-slider').attr("data-delay-time");
	if(dTime!="")
    {
	//clearTimeout(showNotification);
	 setTimeout(showNotification, dTime);
	}
	else
	 hideNotification();
$(window).scroll(function () {console.log('abc2915->$(window).scroll(function () {');
var dTime = $('#notification-slider').attr("data-delay-time");
	if(dTime!="")
    $('.notification-container').slideUp();
	else
	 showNotification(); 
	//hideNotification();
	// closeNotification();
});
	}
	,
	creditCardBanner:function () {console.log('abc2926->	creditCardBanner:function () {');
/*
	* @Description: Homepage cards dropdown menu trigger
	* @Element: displayTitle, cardMenu
	*/
	$.cardMenuInit = function(isPhone){console.log('abc2931->	$.cardMenuInit = function(isPhone){');
		$('  .dropdown-cards ').on("click", ".displayTitle", function(e) { console.log('abc2932->		$(\'  .dropdown-cards \').on("click", ".displayTitle", function(e) { ');
			var _this = $(this);
			_this.parent().find('.cardMenu.dropdown-menu').find('li').show();
			var cardMenuWidth = _this.closest('.dropdown-cards').width();
			_this.parent().find('.cardMenu.dropdown-menu').css('width', cardMenuWidth);
			_this.addClass("active");
			_this.parent().find('.cardMenu.dropdown-menu').find('li.active').hide();
			   _this.find("i").removeClass().addClass("arrow-down-white");
			_this.parent().find(".cardMenu").fadeIn();
			$('.header-container').find('.dropdown').removeClass('open');
			if (!isPhone){
				e.stopPropagation();
			}
		    //hide Login Home menu slider
		    $('.GIT-container .col4-module.get-in-touch').animate({ width: 40 }, { duration: 500, queue: false }, 'swing')
			.find('.span8')
			.animate({ opacity: 0, filter: 'alpha(opacity=100)' }, { duration: 500, queue: false });
		});
		$('.cardMenu.dropdown-menu').on("click", "li", function() {console.log('abc2950->		$(\'.cardMenu.dropdown-menu\').on("click", "li", function() {');
			var _this = $(this);
			_this.parent().find('.active').toggleClass("active");
			_this.toggleClass("active");
			var text = $(this).data('name').replace("_"," ");
			  $(" .displayTitle ").text(text).append($("<i/>").addClass("arrow-down"));
			$('.dropdown-menu').fadeOut();
			if (isPhone){
				$('.mobile-hero .cardMenu').fadeOut();
				$(".displayTitle.active").removeClass("active").find("i").removeClass().addClass("arrow-down");
				$('#mobileCarousel').fadeOut(500, function() {console.log('abc2960->				$(\'#mobileCarousel\').fadeOut(500, function() {');
					$(this).fadeIn(500);
				});
			}
				var cardId = $('.cardMagicmain li:first').attr('data-id'),
				cardName = $('.cardMagicmain li:first').data("name"),
				cardNameSub = $('.cardMagicmain li:first').data("namesub"),
				cardItem =$('.cardMagicmain li:first').data("items");
				cardHrefVal =$('.cardMagicmain li:first').data("hrefval");
				mobilelink =$('.cardMagicmain li:first').data("mobilelink");
				findoutLinkText =$('.cardMagicmain li:first').data("findoutlinktext");
				cardItem =cardsDescription[cardId];	
					$('.cardDetails div.h3-mimic').stop().fadeOut("fast").html(cardName).fadeIn("slow");
					$('.cardDetails div.h5-mimic').stop().fadeOut("fast").html(cardNameSub).fadeIn("slow");
					$('.cardDetails .details').stop().fadeOut("fast").html(cardItem).fadeIn("slow");
					$('#cardsmodelopen').attr('href','');
					$('#cardsmodelopen').attr('href',cardHrefVal);
					$('#cardsmodelopen').text(findoutLinkText);
					$('#cardsmodelopen').append('<span class="icn-arrow-red launch"></span>');
						if(navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|webOS|Mobile/i)){ 
					 $('.cardDetails a').hide();
					$('.cardDetails .details').after('<a href="'+mobilelink+'" class="launch ui-link btn-link hidden-phone"   role="button">'+findoutLinkText+'<span class="icn-arrow-red launch"></span></a>');
					}
		}).on('mouseleave', function() {console.log('abc2983->		}).on(\'mouseleave\', function() {');
			$(this).fadeOut();
			$(".displayTitle.active").removeClass("active").find("i").removeClass().addClass("arrow-down");
		});
	}
	$.cardMenuInit(isPhone);
/* quick check if we're on a phone */
var isPhone = true;
if ($('.hidden-phone').is(":visible")) {
	isPhone = false;
} 
$("body").on("click",".container", function(e) { console.log('abc2994->$("body").on("click",".container", function(e) { ');
	$('.cardMenu').fadeOut();
	$(".displayTitle.active").removeClass("active").find("i").removeClass().addClass("arrow-down");
	//e.stopPropagation();
}); 
var labels = {};
var compareLabels = {};
var labelId = {};
var labelTextHead = {};
/*@Title: Cards manipulations
 *@Description: Swap cards and move cards
 */ 
var defaultCards = [];
var displayable = ['everyone']; //placeholder
 var cardsDescription=[];
 if($('#cardxml').length)
{
 $cardcomparexml= $("#cardxml").val();
$.ajax({
    type: "GET",
    url:  $cardcomparexml,
    dataType: "html",
	contentType: "application/html;charset=utf-8",
    success: function (xml) {console.log('abc3017->    success: function (xml) {');
		$xml=$(xml).find("#cardxmlval").html();
		 if($.browser.msie && (parseInt($.browser.version, 10) < 10))
			xml= $.parseXML($xml);
		else 
			xml=$xml;
		var itemList='',cardsArr=[];
        var cardCarouselTemplate = 
            [
              '<div class="span3 positionrelative">', '<div class="card_tick"><img src="images/tick_bullet_red.png" /></div>',
              ' <img id="{{id}}" data-applyLink="{{applyLink}}" data-cardLink="{{cardLink}}" data-tagline="{{tagline}}" data-minIncome="{{minIncome}}" data-foreignIncome="{{foreignIncome}}" data-waiver="{{waiver}}" data-rewardsHeading="{{RewardsHeading}}" data-item="{{item}}" data-RewardsItem="{{RewardsItem}}" data-type="{{type}}"  data-dbsshopper="{{dbsshopper}}" data-shoppingOthers="{{shoppingOthers}}"  data-spc="{{spc}}" data-esso="{{esso}}" data-motoringOthers="{{motoringOthers}}" data-indulge="{{indulge}}" data-amex="{{amex}}"  data-gv="{{gv}}" data-shaw="{{shaw}}" data-cathay="{{cathay}}"  data-privileges="{{privileges}}" data-excl="{{excl}}" data-dbshealthcare="{{dbshealthcare}}" data-rewardpoints="{{rewardpoints}}" data-additinoalpoints="{{additinoalpoints}}" src="images/cards/{{imgurl}}" data-cardname="{{cardName}}" data-imgurl= "images/cards/{{imgSrc}}" class="cursor-hand">',
              ' <div class="addCard" >',
              '    <div class="h3-mimic">{{name}}</div>',  
              ' </div>',  
              '</div>'
            ].join('\n'),
            cardContainerTemplate =
            [
              '<div class="item">',
              ' {{cards}}',
              '</div>'
            ].join('\n'),
            cards = $(xml).find('card'),
            totalCards = cards.length,
            cardsPerContainer = 4,
            activeContainerClass = 'active',
            cardIndex = -1, 
            cardContainerIndex = -1, 
            cardPartial = ''; 
			$(xml).find('label').each(function() {console.log('abc3046->			$(xml).find(\'label\').each(function() {');
				labelId = $(this).attr('id');
				labelText = $(this).find('text[lang="'+language+'"]').text();
				labels[labelId] = labelText;
			});
		var heroDropdownVal = [];
			$(xml).find('herodropdownmenu').find('item').each(function() {console.log('abc3052->			$(xml).find(\'herodropdownmenu\').find(\'item\').each(function() {');
				var dataId = $(this).attr('id');
				var dropDownText = $(this).text();
				heroDropdownVal += "<li data-name='"+dataId+"'><a>"+dropDownText+"</a></li>";
			});
		$('.creditcards ul.cardMenu').html(heroDropdownVal);
		$('ul.cardMenu li:first').addClass("active");	
		$('.mobile-hero ul.cardMenu').html(heroDropdownVal);	
		$('.mobile-hero ul.cardMenu li:first').addClass("active");	
			var heroText = labels.find_a_card;
			var findOutMore = labels.find_out_more;
			var everyoneText = labels.everyone;
			    var findOutMoreHref = labels.find_out_more_href;
				$('.heroBannerText').html(heroText);
				$('.displayTitle').html(everyoneText + "<i class='arrow-down'></i>");
			//$('.cardDetails a').html(findOutMore + "<span class='icn-arrow-red launch'></span>");
                //$('.cardDetails a').attr('href', findOutMoreHref);
		$(cards).each(function() {    console.log('abc3069->		$(cards).each(function() {    ');
                var itemList = '';             
				var id = $(this).attr('id'),
				name = $(this).find('name').text(),
				categoryList = $(this).find('categorylist').children(),
                cardName = $(this).find('name').text(),
                cardLink = $(this).find('cardlink').text(),
                applyLink = $(this).find('applylink').text(),
                item = $(this).find('keypoints').find('item').text();
				var itemList = $(this).find('keypoints').find('item').text();
				var tagline = $(this).find('tagline').text(),
				hrefVal = $(this).find('hrefVal').text(),
				mobilelink = $(this).find('mobilelink').text(),
				findoutLinkText = $(this).find('findoutlinktext').text(),
				rewardsHeading = $(this).find('rewards').find('dbs').text(),
				rewardsItem = $(this).find('rewards').find('item').text(),
				imgurl = $(this).find('imgurl').text(),			
				minIncome = $(this).find('details').find('mincome').text(),
				foreignIncome = $(this).find('details').find('fmincome').text(),
				waiver = $(this).find('details').find('waiver').text(),
				type = $(this).find('details').find('type').text(),
				dbsshopper = $(this).find('shopping').find('dbsshopper').text(),
				shoppingOthers = $(this).find('shopping').find('others').text(),
				spc = $(this).find('motoring').find('spc').text(),
				esso = $(this).find('motoring').find('esso').text(),			   
				motoringOthers = $(this).find('motoring').find('others').text(),	
				indulge = $(this).find('dining').find('indulge').text(),
				amex = $(this).find('dining').find('amex').text(),
				gv = $(this).find('movies').find('gv').text(),
				shaw = $(this).find('movies').find('shaw').text(),
				cathay = $(this).find('movies').find('cathay').text(),
				privileges = $(this).find('travel').find('privileges').text(),
				excl = $(this).find('travel').find('excl').text(),
				dbshealthcare = $(this).find('healthcare').find('dbs').text(),
				rewardpoints = $(this).find('cardBenefits').find('rewardpoints').text(),
				additinoalpoints = $(this).find('cardBenefits').find('additinoalpoints').text(),
				cardContent = cardCarouselTemplate
								.replace('{{name}}', name)
								.replace('{{id}}', id)
								.replace('{{imgurl}}', imgurl)
								.replace('{{imgSrc}}', imgurl)
								.replace('{{cardLink}}', cardLink)
								.replace('{{applyLink}}', applyLink)
								.replace('{{item}}', item)
								.replace('{{tagline}}', tagline)
								.replace('{{cardName}}', cardName)							  
								.replace('{{RewardsHeading}}', rewardsHeading)
								.replace('{{minIncome}}', minIncome)
								.replace('{{foreignIncome}}', foreignIncome)
								.replace('{{waiver}}', waiver)
								.replace('{{RewardsItem}}', rewardsItem)
								.replace('{{type}}', type)
								.replace('{{dbsshopper}}', dbsshopper)
								.replace('{{shoppingOthers}}', shoppingOthers)
								.replace('{{spc}}', spc)
								.replace('{{esso}}', esso)
								.replace('{{motoringOthers}}', motoringOthers)
								.replace('{{indulge}}', indulge)
								.replace('{{amex}}', amex)
								.replace('{{gv}}', gv)
								.replace('{{shaw}}', shaw)
								.replace('{{cathay}}', cathay)
								.replace('{{privileges}}', privileges)
								.replace('{{excl}}', excl)							
								.replace('{{dbshealthcare}}', dbshealthcare)
								.replace('{{rewardpoints}}', rewardpoints)							
								.replace('{{additinoalpoints}}', additinoalpoints)
			cardPartial += cardContent;
			if (((++cardIndex + 1) % cardsPerContainer === 0) || (cardIndex === totalCards - 1)) {
				cardContainerContent = cardContainerTemplate.replace('{{cards}}', cardPartial);
				//$(cardContainerContent).addClass((++cardContainerIndex === 0)? activeContainerClass : '').appendTo('#comparecards .carousel-inner');
				cardPartial = '';
			}
			var imgPath = imgurl;
			CardHeroMobile =
            [
           '<div class="item"  data-target="everyone">',
		  '<img src="'+imgPath+'" />',
            '<div class="carousel-caption">',
              '<div class="h3-mimic">'+name+'</div>',
				'<div class="h5-mimic">'+tagline+'</div>',
              '<div class="details">' +itemList+'</div>',
              '<a href="'+mobilelink+'"    class="launch ui-link btn-link cardsmodelopen_mobile">'+findoutLinkText+'<span class="icn-arrow-red launch"></span></a>',
			  '</div>',
          '</div>'
            ].join('\n');
		//console.log("gg->"+CardHeroMobile)
			$('#mobileCarousel .carousel-inner').append(CardHeroMobile);
			var category = $.getCategoryList(categoryList);
			cardsArr.push({ 'name' : cardName, 'nameSub' : tagline, 'id': id,  'src' : imgPath,  'category': category,'hrefVal': hrefVal,'findoutLinkText': findoutLinkText,'mobilelink':mobilelink});
				cardsDescription[id]=itemList;
        });
		$('#mobileCarousel .carousel-inner .item').eq(0).addClass('active').end();
		$.displayCardsHero(cardsArr);
		$("#comparecards .carousel-inner .item img").addClass("cardsBorder");
		   	var cardId = $('.cardMagicmain li:first').attr('data-id'),
				cardName = $('.cardMagicmain li:first').data("name"),
				cardNameSub = $('.cardMagicmain li:first').data("namesub");
				//cardItem =cardsArr (attr('data-id')
				cardItem=cardsDescription[cardId];
				cardHrefVal =$('.cardMagicmain li:first').data("hrefval");
				mobilelink =$('.cardMagicmain li:first').data("mobilelink");
				findoutLinkText =$('.cardMagicmain li:first').data("findoutlinktext");
					$('.cardDetails div.h3-mimic').stop().fadeOut("fast").html(cardName).fadeIn("slow");
					$('.cardDetails div.h5-mimic').stop().fadeOut("fast").html(cardNameSub).fadeIn("slow");
					$('.cardDetails .details').stop().fadeOut("fast").html(cardItem).fadeIn("slow");
					$('.cardDetails a').attr('href','');
					$('.cardDetails a').attr('href',cardHrefVal);
					$('.cardDetails a').text(findoutLinkText).append('<span class="icn-arrow-red launch"></span>');
					if(navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|webOS|Mobile/i)){ 
					 $('.cardDetails a').hide();
					$('.cardDetails .details').after('<a href="'+mobilelink+'" class="launch ui-link btn-link hidden-phone"   role="button">'+findoutLinkText+'<span class="icn-arrow-red launch"></span></a>');
					}
		$('.mobile-hero .dropdown-cards .dropdown-menu li,.creditcards .dropdown-cards .dropdown-menu li').on("click", function(e) { console.log('abc3182->		$(\'.mobile-hero .dropdown-cards .dropdown-menu li,.creditcards .dropdown-cards .dropdown-menu li\').on("click", function(e) { ');
			var _this = $(this),filteredCards=[],categoryByCardArr=[];
			$('#mobileCarousel .carousel-inner').html("");
			if(cardsArr.length !=0){
				var categoryName = _this.attr('data-name');
				 if(_this.index()==0){
				for(var i=0;i<=cardsArr.length-1;i++)
				{
					CardHeroMobile =
					[
					'<div class="item">',
					'<img src="'+cardsArr[i].src+'" />',
					'<div class="carousel-caption">',
					'<div class="h3-mimic">'+cardsArr[i].name+'</div>',
					'<div class="h5-mimic">'+cardsArr[i].nameSub+'</div>',
					'<div class="details">'+cardsDescription[cardsArr[i].id]+'</div>',
					'<a href="'+cardsArr[i].mobilelink+'" target="_new" class="launch ui-link btn-link">'+cardsArr[i].findoutLinkText+'<span class="icn-arrow-red launch"></span></a>',
					'</div>',
					'</div>'
					].join('\n');
					$('#mobileCarousel .carousel-inner').append(CardHeroMobile);
					$('#mobileCarousel .carousel-inner .item').eq(0).addClass('active').end();
				}
				 	$.displayCardsHero(cardsArr);
				 }else{
					filteredCards = $.filterCategoryCards(cardsArr,categoryName);
					for(var i=0;i<=filteredCards.length-1;i++)
					{
						CardHeroMobile =
						[
						'<div class="item">',
						'<img src="'+filteredCards[i].src+'" />',
						'<div class="carousel-caption">',
						'<div class="h3-mimic">'+filteredCards[i].name+'</div>',
						'<div class="h5-mimic">'+filteredCards[i].nameSub+'</div>',
						'<div class="details">'+cardsDescription[filteredCards[i].id]+'</div>',
						'<a href="'+filteredCards[i].mobilelink+'" target="_new" class="launch ui-link btn-link">'+filteredCards[i].findoutLinkText+'<span class="icn-arrow-red launch"></span></a>',
						'</div>',
						'</div>'
						].join('\n');
						$('#mobileCarousel .carousel-inner').append(CardHeroMobile);
					}
				$('#mobileCarousel .carousel-inner .item').eq(0).addClass('active').end();
					//console.log("cards found:"+ filteredCards.length);
					$.displayCardsHero(filteredCards);
				 }
			}
		});
    }
});
}
	  $('.dropdown-toggle').on('click',function(){console.log('abc3233->	  $(\'.dropdown-toggle\').on(\'click\',function(){');
		$(".cardMenu").fadeOut();
	});
	/*
	* @Description: Find a card that's best section
	* @Param: cards - Display cards lists based on the category selected (Shopping,fuel, travel,dining, etc..) --- Updated for static card list
	*/
	$.displayCardsHero = function(cards){console.log('abc3240->	$.displayCardsHero = function(cards){');
	 $('.card').remove();
		var cardsCmp = $("#cardMagic1");
		for (var i = 0; i < (cardsLength = cards.length); i++) {
			invisibleClass = (i > 3)? 'hidden' : '';	
			var temp=cards[i].item;
			//temp=temp.replace("\"","𢩻
			//temp=temp.replace("'","󢩻
			//temp=temp.replace("&lt;","򢩻
			//temp=temp.replace("&gt;","񢩻
			$('#cardMagic1').append('<li data-id="'+cards[i].id+'" data-name="'+cards[i].name+'" data-namesub="'+cards[i].nameSub+'"   data-mobilelink="'+cards[i].mobilelink+'"   data-hrefval="'+cards[i].hrefVal+'"  data-findoutLinkText="'+cards[i].findoutLinkText+'" class="card '+invisibleClass+'"><img src="'+cards[i].src+'" /></li>');
		} 
			$("#cardMagic1 li:nth-child(1)").addClass("fourthLI");
			$("#cardMagic1 li:nth-child(2)").addClass("thirdLI");
			$("#cardMagic1 li:nth-child(3)").addClass("secondLI");
			$("#cardMagic1 li:nth-child(4)").addClass("firstLI"); 	
		if ($.browser.msie && $.browser.version <= '9.0'){
			$("#cardMagic1 li").find("img").hover(function(){console.log('abc3257->			$("#cardMagic1 li").find("img").hover(function(){');
				$(this).closest("li").stop().animate({
					top : "-30px",
					left : "-5px"
				},200);
			});
			$("#cardMagic1 li").find("img").mouseout(function(){console.log('abc3263->			$("#cardMagic1 li").find("img").mouseout(function(){');
				$(this).closest("li").stop().animate({
					top : "0px",
					left: "0px"
				},200);
			});
		}else{
			$("#cardMagic1 li").find("img").hover(function(){ console.log('abc3270->			$("#cardMagic1 li").find("img").hover(function(){ ');
			$("#cardMagic1 li:nth-child(4)").css('width','200px'); 
				$(this).closest("li").stop().animate({
					top : "-30px",
					left : "-5px",  
				},500,'swing');
			});
			$("#cardMagic1 li").find("img").mouseout(function(){console.log('abc3277->			$("#cardMagic1 li").find("img").mouseout(function(){');
				$(this).closest("li").stop().animate({
					top : "-10px",
					left: "0" , 
				},500,'swing');
			});
		}
		$('.card').on('click', function() {console.log('abc3284->		$(\'.card\').on(\'click\', function() {');
			var _this =$(this);
			if(!$(_this).hasClass('fourthLI')){
				var cardId = _this.attr('data-id'),
				cardContainers = $('.card'),
				cardName = _this.data("name"),
				cardNameSub = _this.data("namesub"),
				cardItem=cardsDescription[cardId];
				cardHrefVal = _this.data("hrefval");
				mobilelink = _this.data("mobilelink");
						findoutLinkText =_this.data("findoutlinktext");
					$('.cardDetails div.h3-mimic').stop().fadeOut("fast").html(cardName).fadeIn("slow");
					$('.cardDetails div.h5-mimic').stop().fadeOut("fast").html(cardNameSub).fadeIn("slow");
					$('.cardDetails .details').stop().fadeOut("fast").html(cardItem).fadeIn("slow");
					$('#cardsmodelopen').attr('href','');
					$('#cardsmodelopen').attr('href',cardHrefVal);
					$('#cardsmodelopen').text(findoutLinkText);
					$('#cardsmodelopen').append('<span class="icn-arrow-red launch"></span>');
						if(navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|webOS|Mobile/i)){ 
					 $('.cardDetails a').hide();
					$('.cardDetails .details').after('<a href="'+mobilelink+'" class="launch ui-link btn-link hidden-phone"   role="button">'+findoutLinkText+'<span class="icn-arrow-red launch"></span></a>');
					}
				for (var i = 0; i < cardContainers.length; i++) {
					if ($(cardContainers[i]).attr('data-id') == cardId) {
						clickedCardPosition = i;
					}
				}
				var cards1 = cards.slice(clickedCardPosition);
				var cards2 = cards.slice(0, clickedCardPosition);
				cards = cards1.concat(cards2);
				$.displayCardsHero(cards);
			}
		});
	};
	/*
	* @Description: Find a card that's best section
	* @Param: cardsArr, categoryName - CardsArr consists of all the lists of cards, and categoryName
	* is the category we need to filter.
	* @return: filtered array of categoryName
	*/
	$.filterCategoryCards = function(cardsArr,categoryName){console.log('abc3324->	$.filterCategoryCards = function(cardsArr,categoryName){');
		var cards=[];
		if(cardsArr.length!=0 && categoryName.length!=0)
		$.each(cardsArr, function( index, obj ) {console.log('abc3327->		$.each(cardsArr, function( index, obj ) {');
			//Loop in to the category list items
			$.each(obj.category,function(j,categoryObj){console.log('abc3329->			$.each(obj.category,function(j,categoryObj){');
				if(categoryObj===categoryName){
					cards.push(obj);	
				}
			});
		});
		return cards;
	}
	/*
	* @Description: Find a card that's best section
	* @Param: cardCategory - Based on the card category get its lists under it 
	*/
	$.getCategoryList=function(cardCategory){console.log('abc3341->	$.getCategoryList=function(cardCategory){');
		var categoryListArr = [];
		cardCategory.each(function(){console.log('abc3343->		cardCategory.each(function(){');
			categoryListArr.push($(this).text());
		});
		return categoryListArr;
	}
	/*
	* @Description: Find the Latest Offers Menu
	* @Param: _element - On click of tab menu; toggle icons to active state.
	*/
	$.toggleIconClass = function(_element){console.log('abc3352->	$.toggleIconClass = function(_element){');
		var classes = _element.find('i').attr('class');
		var data = _element.find('i').data('toggle');
		_element.find('i:first').removeClass().addClass(data).data('toggle',classes);
	}
	/*
	* @Description: Find the Latest Offers Menu
	* @Param: _element, targetName - On click of tab menu; search box information
	* toggles based on the selection
	*/
	$.toggleLoansSearch = function(_element,targetName){console.log('abc3362->	$.toggleLoansSearch = function(_element,targetName){');
		_element.children('div[data-name]').addClass('hide');
		_element.find('div[data-name="'+targetName+'"]').toggleClass('hide');
	}
/*
 *@Title: Creditcards Flyout 
 *@Description: On click of the sub-tab navigation, "Compare Cards" content animation effect to be shown.
 */
  $.fn.flyInorOut = function(speed, offset) {console.log('abc3370->  $.fn.flyInorOut = function(speed, offset) {');
      var that = this;
      speed = speed || 500;
      offset = offset || 10;
      var height = offset;
      //$(that).css({'margin-top': -parseInt(offset)});
      $(that).slideToggle(speed);
  };
/*
 *@Title: Exchange Position Width
 *@Description: Swapping of cards and reloading it.
 */
	$.fn.exchangePositionWith = function(selector) {console.log('abc3382->	$.fn.exchangePositionWith = function(selector) {');
		var other = $(selector);
		var that = this;
		$('#cardMagic .card').reverse().each(function(i) {console.log('abc3385->		$(\'#cardMagic .card\').reverse().each(function(i) {');
		   var that = this;
			setTimeout(function() {console.log('abc3387->			setTimeout(function() {');
			  $(that).fadeOut(200, function() {console.log('abc3388->			  $(that).fadeOut(200, function() {');
				var l = $('#cardMagic .card').length;
				setTimeout(function() {console.log('abc3390->				setTimeout(function() {');
					$(that).fadeIn(200);
				}, 100*(l-(i+1)));
			  });
			}, 50*(i+1))
		  });
	};
/*
 *@Title: Array reverse
 *@Description: Sort Array Descending or in reverse mode.
 */
	$.fn.reverse = [].reverse;
	/*
	$("#mobileCarousel").on("click",".cardsmodelopen_mobile",function(e){console.log('abc3403->	$("#mobileCarousel").on("click",".cardsmodelopen_mobile",function(e){');
	  e.preventDefault();
				$.ajax({
			type: 'POST',
			url: $(this).attr('href'),
			cache:false,
			async:true,
			dataType : 'html',
			success: function(data) {console.log('abc3411->			success: function(data) {');
				$('#cards').html($(data).find('#cards').html());
				  $('#cards').modal({show:true});
			},
			error: function(XMLHttpRequest,textStatus,errorThrown) {console.log('abc3415->			error: function(XMLHttpRequest,textStatus,errorThrown) {');
			} 
			});
	  e.preventDefault();
});*/
	$("#cardsmodelopen").on("click",function(e){console.log('abc3420->	$("#cardsmodelopen").on("click",function(e){');
	  e.preventDefault();
				$.ajax({
			type: 'POST',
			url: $(this).attr('href'),
			cache:false,
			async:true,
			dataType : 'html',
			success: function(data) {console.log('abc3428->			success: function(data) {');
				$('#cards').html($(data).find('#cards').html());
				  $('#cards').modal({show:true});
			},
			error: function(XMLHttpRequest,textStatus,errorThrown) {console.log('abc3432->			error: function(XMLHttpRequest,textStatus,errorThrown) {');
			} 
			});
	  e.preventDefault();
});
 $('body').append('<section id="cards" class="modal hide fade row span10" tabindex="-1" role="dialog" aria-labelledby="aNameToReferenceByLabel" aria-hidden="true"></section>');
 }
 ,
creditCardCompare:function () {console.log('abc3440->creditCardCompare:function () {');
var allCards = [],
	categories = {},
	labels = {},
	compareLabels = {},
	labelId = {},
	labelTextHead = {},
	cardsPerContainer = 4;
	$.filterCategoryCards = function(cardsArr,categoryName){ console.log('abc3448->	$.filterCategoryCards = function(cardsArr,categoryName){ ');
		var cards=[];
		if(cardsArr.length!=0 && categoryName.length!=0)
		$.each(cardsArr, function( index, obj ) { console.log('abc3451->		$.each(cardsArr, function( index, obj ) { ');
			//Loop in to the category list items
			$.each(obj.category,function(j,categoryObj){ console.log('abc3453->			$.each(obj.category,function(j,categoryObj){ ');
				if(categoryObj===categoryName){
					cards.push(obj);	
				}
			});
		});
		return cards;
	}
	/*
	* @Description: Find a card that's best section
	* @Param: cardCategory - Based on the card category get its lists under it 
	*/
	$.getCategoryList=function(cardCategory){ console.log('abc3465->	$.getCategoryList=function(cardCategory){ ');
		var categoryListArr = [];
		cardCategory.each(function(){ console.log('abc3467->		cardCategory.each(function(){ ');
			categoryListArr.push($(this).text());
		});
		return categoryListArr;
	}
/*@Title: Cards manipulations
 *@Description: Swap cards and move cards
 */ 
var defaultCards = [];
var displayable = ['everyone']; //placeholder
function moveCard($this, event) { console.log('abc3477->function moveCard($this, event) { ');
	var position = 0;
	if (event.type == "mouseover") {
	   position = parseInt(-20);
	} else {
	   position = 0;
	}
	var t = parseInt( $($this).data('id')  ) ;
	$('#cardMagic .card').eq(t).animate({'top': position }, 200);
}
function swapCard(target) { console.log('abc3487->function swapCard(target) { ');
	var that = target;
	var t = parseInt( $(that).data('id') ) ;
	$('#cardMagic .card').eq(t).animate({'top': 0 }, 200);
	$('#cardMagic .card').eq(0).exchangePositionWith($('#cardMagic .card').eq(t));
	$(".cardselection").find("[data-target]:visible").fadeOut('fast', function() { console.log('abc3492->	$(".cardselection").find("[data-target]:visible").fadeOut(\'fast\', function() { ');
		  setCardVisibleState(t);
	});
}
function setCardVisibleState(id) { console.log('abc3496->function setCardVisibleState(id) { ');
	$(".cardselection").find("[data-target]:visible").hide();
	var group = [];
	id = id || 0;
	$.each(displayable, function( index, value ) { console.log('abc3500->	$.each(displayable, function( index, value ) { ');
		for(var i = 0; i<2; i++) {
			var item = $(".cardselection").find("[data-target='"+value+"']")[i];
			group.push( $(item) );
		}	
	});
	$(group[id]).fadeIn('fast');
}
//setCardVisibleState();
$("button.compare").on("click", function() { console.log('abc3509->$("button.compare").on("click", function() { ');
	$("[data-category='compare']").click();
});
	$(".notice-flyouthidden").on("click", "a", function() { console.log('abc3512->	$(".notice-flyouthidden").on("click", "a", function() { ');
	  $(".comparison-flyout").flyInorOut();
	  $('#comparecards div.item').removeClass('left').removeClass('next');
	  $(".notice-flyouthidden").slideUp();
	});
/*
* @Title: Compare cards menu
* @Description: Removing of cards trigger initialization
*/ 
	$cardcomparexml= $("#cardxml_comparecards").val();
$.ajax({
    type: "GET",
    url: $cardcomparexml,
    dataType: "xml",
    success: function (xml) { console.log('abc3526->    success: function (xml) { ');
		var itemList='',cardsArr=[];
        var cardCarouselTemplate = 
			[
			'<div class="span3 positionrelative" data-category="{{categories}}">', '<div class="card_tick"><img src="images/tick_bullet_red.png" /></div>',
			' <img id="{{id}}" data-applyLink="{{applyLink}}" data-cardLink="{{cardLink}}" data-tagline="{{tagline}}" data-minIncome="{{minIncome}}" data-foreignIncome="{{foreignIncome}}" data-waiver="{{waiver}}" data-rewardsHeading="{{RewardsHeading}}" data-item="{{item}}" data-RewardsItem="{{RewardsItem}}" data-type="{{type}}"  data-dbsshopper="{{dbsshopper}}" data-shoppingOthers="{{shoppingOthers}}"  data-spc="{{spc}}" data-esso="{{esso}}" data-motoringOthers="{{motoringOthers}}" data-indulge="{{indulge}}" data-amex="{{amex}}"  data-gv="{{gv}}" data-shaw="{{shaw}}" data-cathay="{{cathay}}"  data-privileges="{{privileges}}" data-excl="{{excl}}" data-dbshealthcare="{{dbshealthcare}}" data-rewardpoints="{{rewardpoints}}" data-additionalpoints="{{additionalpoints}}" src="images/cards/{{imgurl}}" data-cardname="{{cardName}}" data-imgurl= "images/cards/{{imgSrc}}" class="cursor-hand cardsBorder">',
			' <div class="addCard" >',
			  '    <div class="h3-mimic">{{name}}</div>',  
			' </div>',  
			'</div>'
			].join('\n'),
            cardContainerTemplate =
            [
              '<div class="item">',
              ' {{cards}}',
              '</div>'
            ].join('\n'),
            cards = $(xml).find('card'),
            totalCards = cards.length,
            // cardsPerContainer = 4,
            // activeContainerClass = 'active',
            cardIndex = -1, 
            cardContainerIndex = -1, 
            cardPartial = ''; 
			$(xml).find('label').each(function() { console.log('abc3550->			$(xml).find(\'label\').each(function() { ');
				labelId = $(this).attr('id');
				labelText = $(this).find('text[lang="'+language+'"]').text();
				labels[labelId] = labelText;
			});
			var heroCategories = '', filterCategories = '',
				innerCarousel = $('<div>').append($('div[id^="comparecards"]').clone()).html();
			$(xml).find('categories').find('category').each(function(index, category) { console.log('abc3557->			$(xml).find(\'categories\').find(\'category\').each(function(index, category) { ');
				categoryId = $(category).attr('id');
				heroCategoryText = $(this).find('text[lang="'+language+'"][component="hero"]').text();
				filterCategoryText = $(this).find('text[lang="'+language+'"][component="filter"]').text();
				heroCategories += "<li data-name='"+heroCategoryText.toLowerCase()+"'><a>"+heroCategoryText+"</a></li>";
				filterCategories += "<li data-category='"+categoryId+"'><a>"+filterCategoryText+"</a></li>";
			});
			//$('ul.cardMenu').html(heroCategories);
			//$('ul.cardMenu li:first').addClass("active");	
			$('#comparenav').html(filterCategories);
			$('#comparenav li:first').addClass("active");	
			//$('.heroBannerText').html(labels.find_a_card);
			//$('.displayTitle').html($('ul.cardMenu li:first').text() + "<i class='arrow-down'></i>");
			//$('.cardDetails a').html(labels.find_out_more + "<span class='icn-arrow-red launch'></span>");
			$('section[data-flyout="compare"] span.seo-h2-section-title').html(labels.comparison_header);
			$('.hide-switch-label').html(labels.hide_switch);
			$('.comparecards span.seo-h2-section-title').html(labels.comparison_table_header);
			$('.comparecards .notice span.h3-mimic').html(labels.no_cards_added_warning);
			$('.cards-limit').html(labels.cards_limit_warning);
			$('.notice-flyouthidden .notice-message').html(labels.add_more_cards);
			$(xml).find('comparelabels').find('section').each(function() { console.log('abc3577->			$(xml).find(\'comparelabels\').find(\'section\').each(function() { ');
				var sectionId = $(this).attr('id');
				var sectionHeader = $(this).find('header[lang="'+language+'"]').text();
				var sectionSubHeaders = $(this).find('subheader[lang="'+language+'"]');
				var subHeaders = {};
				if (sectionSubHeaders.length > 0) {
					$(sectionSubHeaders).each(function(index, subheader) { console.log('abc3583->					$(sectionSubHeaders).each(function(index, subheader) { ');
						 subHeaders[$(subheader).attr('id')] = $(subheader).text();
					});
				}
				compareLabels[sectionId] = { 'header': sectionHeader, 'subheaders': subHeaders };
			});
		displayCardLabel();
		var slides = '';
		var CardHeroMobile=[];
		$(cards).each(function() {     console.log('abc3592->		$(cards).each(function() {     ');
                var itemList = '';             
				var id = $(this).attr('id'),
				name = $(this).find('name').text(),
				categoryList = $(this).find('categorylist').children(),
                cardName = $(this).find('name').text(),
                cardLink = $(this).find('cardlink').text(),
                applyLink = $(this).find('applylink').text(),
                item = $(this).find('keypoints').find('item').text(),
                itemContainer = $(this).find('keypoints').find('item');
				var itemList = '';
				for (var i = 0; i < itemContainer.length; i++) {
					itemList +=  $(itemContainer[i]).text()  ;
				}
				var tagline = $(this).find('tagline').text(),
				hrefVal = $(this).find('hrefVal').text(),
				rewardsHeading = $(this).find('rewards').find('dbs').text(),
				rewardsItem = $(this).find('rewards').find('item').text(),
				imgurl = $(this).find('imgurl').text(),			
				minIncome = $(this).find('details').find('mincome').text(),
				foreignIncome = $(this).find('details').find('fmincome').text(),
				waiver = $(this).find('details').find('waiver').text(),
				type = $(this).find('details').find('type').text(),
				dbsshopper = $(this).find('shopping').find('dbsshopper').text(),
				shoppingOthers = $(this).find('shopping').find('others').text(),
				spc = $(this).find('motoring').find('spc').text(),
				esso = $(this).find('motoring').find('esso').text(),			   
				motoringOthers = $(this).find('motoring').find('others').text(),	
				indulge = $(this).find('dining').find('indulge').text(),
				amex = $(this).find('dining').find('amex').text(),
				gv = $(this).find('movies').find('gv').text(),
				shaw = $(this).find('movies').find('shaw').text(),
				cathay = $(this).find('movies').find('cathay').text(),
				privileges = $(this).find('travel').find('privileges').text(),
				excl = $(this).find('travel').find('excl').text(),
				dbshealthcare = $(this).find('healthcare').find('dbs').text(),
				rewardpoints = $(this).find('cardBenefits').find('rewardpoints').text(),
				additionalpoints = $(this).find('cardBenefits').find('additionalpoints').text(),
				cardContent = cardCarouselTemplate
								.replace('{{categories}}', $.getCategoryList(categoryList))
								.replace('{{name}}', name)
								.replace('{{id}}', id)
								.replace('{{imgurl}}', imgurl)
								.replace('{{imgSrc}}', imgurl)
								.replace('{{cardLink}}', cardLink)
								.replace('{{applyLink}}', applyLink)
								.replace('{{item}}', item)
								.replace('{{tagline}}', tagline)
								.replace('{{cardName}}', cardName)							  
								.replace('{{RewardsHeading}}', rewardsHeading)
								.replace('{{minIncome}}', minIncome)
								.replace('{{foreignIncome}}', foreignIncome)
								.replace('{{waiver}}', waiver)
								.replace('{{RewardsItem}}', rewardsItem)
								.replace('{{type}}', type)
								.replace('{{dbsshopper}}', dbsshopper)
								.replace('{{shoppingOthers}}', shoppingOthers)
								.replace('{{spc}}', spc)
								.replace('{{esso}}', esso)
								.replace('{{motoringOthers}}', motoringOthers)
								.replace('{{indulge}}', indulge)
								.replace('{{amex}}', amex)
								.replace('{{gv}}', gv)
								.replace('{{shaw}}', shaw)
								.replace('{{cathay}}', cathay)
								.replace('{{privileges}}', privileges)
								.replace('{{excl}}', excl)							
								.replace('{{dbshealthcare}}', dbshealthcare)
								.replace('{{rewardpoints}}', rewardpoints)							
								.replace('{{additionalpoints}}', additionalpoints)
			cardPartial += cardContent;
			allCards.push(cardContent);
			if (((++cardIndex + 1) % cardsPerContainer === 0) || (cardIndex === totalCards - 1)) {
				cardContainerContent = cardContainerTemplate.replace('{{cards}}', cardPartial);
				slides += cardContainerContent;
				cardPartial = '';
			}
			var imgPath = imgurl;
					 CardHeroMobile =
            [
           '<div class="item"  data-target="everyone">',
		  '<img src="'+imgPath+'" />',
            '<div class="carousel-caption">',
              '<div class="h3-mimic">'+name+'</div>',
              '<div class="h5-mimic">'+tagline+'</div>',
              '<div class="details">' +itemList+'</div>',
              '<a href="'+cardLink+'" target="_new" class="launch ui-link btn-link">'+labels.find_out_more+'<span class="icn-arrow-red launch"></span></a>',
			  '</div>',
          '</div>'
            ].join('\n');
		//console.log("ggv->"+CardHeroMobile)
			$('#mobileCarousel .carousel-inner').append(CardHeroMobile);
			var category = $.getCategoryList(categoryList);
			cardsArr.push({ 'name' : cardName, 'nameSub' : tagline, 'id': id,  'src' : imgPath, 'item': itemList,'category': category,'hrefVal': hrefVal});				
        });
		$('#mobileCarousel .carousel-inner .item').eq(0).addClass('active').end();
		//$('#comparecards .carousel-inner').addClass('hidden');
		//$('#comparecards').carousel('pause').removeData();
		$('#comparecards .carousel-inner').html(slides);
		if($("html").hasClass("posb")){
			$(".card_tick img").attr("src","/iwov-resources/images/posb_tick_bullet_red.png");
		}
		if (Math.ceil(totalCards / cardsPerContainer) === 1) {
			$('#comparecards .carousel-control').hide();
		}
		else {
			$('#comparecards .carousel-control').show();
		}
		 //$('#comparecards .carousel-inner').carousel('next');
		// $('#comparecards').carousel("pause").removeData();
		  //console.trace();
		  //$("#comparecards").carousel("pause").removeData();
		   $('#comparecards .carousel-inner > div:nth-child(1)').addClass('active');
		   $("#comparecards").carousel();
		//$('#comparecards .carousel-inner').removeClass('hidden');
		//$.displayCardsHero(cardsArr);
		/*
		$("#comparecards .carousel-inner .item img").addClass("cardsBorder");
		   	var cardId = $('.cardMagicmain li:first').attr('data-id'),
				cardName = $('.cardMagicmain li:first').data("name"),
				cardNameSub = $('.cardMagicmain li:first').data("namesub"),
				cardItem =$('.cardMagicmain li:first').data("items");
				cardHrefVal =$('.cardMagicmain li:first').data("hrefval");
					$('.cardDetails h3').stop().fadeOut("fast").html(cardName).fadeIn("slow");
					$('.cardDetails h5').stop().fadeOut("fast").html(cardNameSub).fadeIn("slow");
					$('.cardDetails ul').stop().fadeOut("fast").html(cardItem).fadeIn("slow");
					$('.cardDetails a').attr('href','');
					$('.cardDetails a').attr('href',cardHrefVal);
					*/
    }
});
function displayCardLabel(){ console.log('abc3723->function displayCardLabel(){ ');
	cardLabelName =
            [
              '<div class="span3 heading-compare hide">',
			  '<div class="creditcard_name">'+compareLabels.main.header+'</div>',
			 ' </div>'
            ].join('\n'),
	 cardLabelBestfor =
            [
			'<div class="span3 heading-compare hide">',
			'<div class="creditcard_name min-height40">'+compareLabels.best_for.header+'</div>',
			  '<div class="subheading-compare marginLeft">'+compareLabels.best_for.subheaders.card_type+'</div>',
			  '<div class="subheading-compare marginLeft">'+compareLabels.best_for.subheaders.min_income_per_annum+'</div>',
			  '<div class="subheading-compare marginLeft">'+compareLabels.best_for.subheaders.min_income_per_annum_foreigners+'</div>',
			  '<div class="subheading-compare marginLeft">'+compareLabels.best_for.subheaders.annual_fee_waiver+'</div>',
			'</div>'
            ].join('\n'),
	 cardLabelCardBenefit =
            [
			'<div class="span3 heading-compare hide">',
			'<div class="creditcard_name">'+compareLabels.card_benefits.header+'</div>',
			'<div class="subheading-compare marginLeft">'+compareLabels.card_benefits.subheaders.dbs_rewards_points+'</div>',
			'<div class="subheading-compare marginLeft">'+compareLabels.card_benefits.subheaders.additional_awards+'</div>',
			'</div>'
            ].join('\n'),
	 cardLabelCardRewards =
            [
			'<div class="span3 heading-compare hide">',
			'<div class="creditcard_name min-height40">'+compareLabels.card_rewards.header+'</div>',
			'</div>'
            ].join('\n'),
	cardLabelCardShopping =
            [
			'<div class="span3 heading-compare hide">',
			'<div class="creditcard_name">'+compareLabels.shoppers.header+'</div>',
				'<div class="subheading-compare marginLeft"><strong>'+compareLabels.shoppers.subheaders.dbs_shopper+'</strong><br>'+compareLabels.shoppers.subheaders.exclusive_disounts+'</div>',
				'<div class="subheading-compare marginLeft"><strong>'+compareLabels.shoppers.subheaders.other_shopping_privileges+'</strong></div>',
			'</div>'
            ].join('\n'),
	cardLabelCardMotoring =
            [
			'<div class="span3 heading-compare hide">',
			'<div class="creditcard_name">'+compareLabels.motoring.header+'</div>',
				'<div class="subheading-compare marginLeft"><strong>'+compareLabels.motoring.subheaders.spc+'</strong><br/>'+compareLabels.motoring.subheaders.spc_savings+'</div>',
				'<div class="subheading-compare marginLeft"><span class="bold">'+compareLabels.motoring.subheaders.esso+'</span><br/>'+compareLabels.motoring.subheaders.total_fuel+'</div>',
				'<div class="subheading-compare marginLeft"><strong>'+compareLabels.motoring.subheaders.others+'</strong></div>',
			'</div>'
            ].join('\n'),
	cardLabelCardDining =
            [
			'<div class="span3 heading-compare hide">',
			'<div class="creditcard_name">'+compareLabels.dining.header+'</div>',
				'<div class="subheading-compare marginLeft"><strong>'+compareLabels.dining.subheaders.dbs_indulge+'</strong><br/>'+compareLabels.dining.subheaders.dinning_deals+'</div>',
				'<div class="subheading-compare marginLeft"><strong>'+compareLabels.dining.subheaders.american_express+'</strong> <br/>'+compareLabels.dining.subheaders.dining_privileges+'</div>',
			'</div>'
            ].join('\n'),
	cardLabelCardMovies =
            [
			'<div class="span3 heading-compare hide">',
			'<div class="creditcard_name">'+compareLabels.movies.header+'</div>',
				'<div class="subheading-compare marginLeft"><strong>'+compareLabels.movies.subheaders.golden_village+'</strong><br/>'+compareLabels.movies.subheaders.exclusive_discounts+'</div>',
			'</div>'
            ].join('\n'),
	cardLabelCardTravel =
            [
			'<div class="span3 heading-compare hide">',
			'<div class="creditcard_name">'+compareLabels.travel.header+'</div>',
				'<div class="subheading-compare marginLeft"><strong>'+compareLabels.travel.subheaders.travel_privileges+'</strong><br/>',
				'<ul><li>'+compareLabels.travel.subheaders.special_airline_fares+'</li><li>'+compareLabels.travel.subheaders.complimentary_hotel+'</li><li>'+compareLabels.travel.subheaders.off_car_rentals+'</li></ul>',
				'</div>',
			'</div>'
            ].join('\n'),
	cardLabelCardHealthcare =
            [
			'<div class="span3 heading-compare hide">',
			'<div class="creditcard_name">'+compareLabels.healthcare.header+'</div>',
				 '<div class="subheading-compare marginLeft"><strong>'+compareLabels.healthcare.subheaders.dbs_health_privileges+'</strong><br />'+compareLabels.healthcare.subheaders.special_rates+'</div>',
			'</div>'
            ].join('\n');
		$(cardLabelName).insertBefore('.insertcard1');
		$(cardLabelBestfor).insertBefore('.insertcard2');
		$(cardLabelCardBenefit).insertBefore('.insertcard3');
		$(cardLabelCardRewards).insertBefore('.insertcard4');
		$(cardLabelCardShopping).insertBefore('.insertcard5');
		 $(cardLabelCardMotoring).insertBefore('.insertcard6');
		$(cardLabelCardDining).insertBefore('.insertcard7');
		$(cardLabelCardMovies).insertBefore('.insertcard8');
		$(cardLabelCardTravel).insertBefore('.insertcard9');
		$(cardLabelCardHealthcare).insertBefore('.insertcard10');
	}
	$('section[id^="cards"] .modal-body .span8 a span').on("click", function() { console.log('abc3813->	$(\'section[id^="cards"] .modal-body .span8 a span\').on("click", function() { ');
		if($(this).html() == labels.card_added){			
			 $("button.close").click();
			 $("[data-category='compare']").click();		 		  
		}else{
			getCardDetail($(this),'popup'); 
		}
	});
$("button.close").click(function(){ console.log('abc3821->$("button.close").click(function(){ ');
	$(".alert_message").hide();
});
 var $compareCards = $('#comparecards').carousel({
	interval: 3000, wrap: true
}).on('slid', function(e) { console.log('abc3826->}).on(\'slid\', function(e) { ');
	var i = $(this).find('.active').index();
	var count = $(this).find('.item').length -1;
});
$('#comparenav').on('click', "li:not(.active)", function() { console.log('abc3830->$(\'#comparenav\').on(\'click\', "li:not(.active)", function() { ');
	var selectedCards = [],
		// cardsPerContainer = 4,
		cardIndex = -1, 
		cardContainerIndex = -1, 
		cardPartial = '', 
		cardContainerTemplate =
		[
		'<div class="item">',
		' {{cards}}',
		'</div>'
		].join('\n');
	if ($(this).index() === 0) {
		//display all
		$(allCards).each(function(index, cardPartial) { console.log('abc3844->		$(allCards).each(function(index, cardPartial) { ');
			selectedCards.push(cardPartial);
		});
	}
	else {
		//display only selected category
		var selectedCategory = $(this).data('category');
		$(allCards).each(function(index, cardPartial) { console.log('abc3851->		$(allCards).each(function(index, cardPartial) { ');
			var partialCategories = $(cardPartial).data('category').split(',');
			if ($.inArray(selectedCategory, partialCategories) !== -1) {
				selectedCards.push(cardPartial);
			}
		});
	}
	var totalCards = selectedCards.length;
	var slides = '';
	$(selectedCards).each(function() { console.log('abc3860->	$(selectedCards).each(function() { ');
		cardPartial += this;
		if (((++cardIndex + 1) % cardsPerContainer === 0) || (cardIndex === totalCards - 1)) {
			slides += cardContainerTemplate.replace('{{cards}}', cardPartial);
			cardPartial = '';
		}
	});
	//$('#comparecards .carousel-inner').addClass('hidden');
	$('#comparecards .carousel-inner').html(slides);
	if($("html").hasClass("posb")){
		$(".card_tick img").attr("src","/iwov-resources/images/posb_tick_bullet_red.png");
	}
	if (Math.ceil(totalCards / cardsPerContainer) === 1) {
		$('#comparecards .carousel-control').hide();
	}
	else {
		$('#comparecards .carousel-control').show();
	}
	//$('#comparecards .carousel-inner').carousel('next');
	//$('#comparecards .carousel-inner').removeClass('hidden');
	 $(this).parent().find('.active').removeClass();
	 $(this).addClass('active');
	//$('#comparecards').carousel("pause").removeData();
	//$(document).off('.typeahead.data-api');
	$('#comparecards .carousel-inner > div:nth-child(1)').addClass('active');
	if(!slides){$('#comparecards').carousel('pause');}
	if(slides){
		$('#comparecards').carousel();
		$('#comparecards').carousel('cycle');
	}
 $('.cursor-hand').each(function(){console.log('abc3890-> $(\'.cursor-hand\').each(function(){');
		//if($(this).attr('id') in selected_card)
		if($.inArray($(this).attr('id'), selected_card) > -1)
		{  
 			$(this).removeClass('cardsBorder');
			$(this).addClass('card-selected').prev().show();
			$(this).fadeTo( 200, 0.4 );
		}	
});
});
var selected_card = [];
$( "#comparecards" ).on("click", "img", function() { console.log('abc3901->$( "#comparecards" ).on("click", "img", function() { ');
	if($(this).hasClass("card-selected") ){	
		var clickedId = $(this).attr("id");
		//$(this).removeClass('card-selected');	
		$(this).removeClass('card-selected').prev().hide();
		$(this).addClass('cardsBorder');
		$(this).fadeTo( 200, 1 );	
		$("#"+clickedId + "_name").remove();
        $("#" + clickedId + "_Bestfor").remove();
        $("#" + clickedId + "_Rewards").remove();
		$("#"+clickedId + "_cardBenefits").remove();
        $("#" + clickedId + "_Shopping").remove();
        $("#" + clickedId + "_Motoring").remove();
        $("#" + clickedId + "_Movies").remove();  
		$("#" + clickedId + "_Travel").remove();		
		$("#" + clickedId + "_Healthcare").remove();	
		$("#" + clickedId + "_Dining").remove();	
		//cardCounting();
		$('.alert_message').css('display','none'); 
		$('section[id^="cards"] span[id='+clickedId+']').parent().find("i").removeClass().addClass('icon_add-red');
		$('section[id^="cards"] span[id='+clickedId+']').html(labels.add_card_to_comparison);
		selected_card.splice($.inArray(clickedId, selected_card),1);
		return;
	}	
	if( $('.cardItem').length <= 20){
		selected_card.push($(this).attr("id"));
	}
	getCardDetail($(this),'img');
});
function getCardDetail(clickedObj,callFrm){ console.log('abc3930->function getCardDetail(clickedObj,callFrm){ ');
		var cardId = clickedObj.attr("id");
		if( $('.cardItem').length <= 20){
			displayCompareCards(clickedObj);			
			if(callFrm =="popup"){
				$('.container').find("[data-page='compare']").show();
			}
			$('.comparecards .notice').parent().hide();
			$('.comparecards .heading-compare').show();
			$('section[id^="cards"] span[id='+cardId+']').parent().find("i").removeClass().addClass('icon_add-tick');
			$('section[id^="cards"] span[id='+cardId+']').html(labels.card_added);
			$( '#comparecards img[id="'+cardId+'"]').removeClass('cardsBorder');
			$( '#comparecards img[id="'+cardId+'"]').addClass('card-selected').prev().show();
			$( '#comparecards img[id="'+cardId+'"]').fadeTo( 200, 0.4 );
			cardCounting(); 
			if(callFrm =="popup"){
				$('.container').find("[data-page='compare']").hide();
			}
		 }
		 else{	
			$('.alert_message').css('display','block');
		 }	
	}
	function displayCompareCards(clickedObj){ console.log('abc3953->	function displayCompareCards(clickedObj){ ');
		var cardId = clickedObj.attr("id"),
		cardLink = clickedObj.attr("data-cardLink");
		cardApplyLink = clickedObj.attr("data-applyLink");
		cardTagline = clickedObj.attr("data-tagline"),
		cardRewardsHeading = clickedObj.attr("data-rewardsHeading"),
		dataRewardsItem = clickedObj.attr("data-rewardsItem"),	
		cardDataItem = clickedObj.attr("data-item"),
		cardMinIncome = clickedObj.attr("data-minIncome"),
		cardForeignIncome = clickedObj.attr("data-foreignIncome"),
		cardDataWaiver = clickedObj.attr("data-waiver"),
		cardImgUrl = clickedObj.attr("data-imgurl"),
		cardDataName = clickedObj.attr("data-cardname"),
		type = clickedObj.attr("data-type"),
		dbsshopper = clickedObj.attr("data-dbsshopper"),
		shoppingOthers = clickedObj.attr("data-shoppingOthers"),
		spc = clickedObj.attr("data-spc"),
		esso = clickedObj.attr("data-esso"),
		motoringOthers = clickedObj.attr("data-motoringOthers"),
		indulge = clickedObj.attr("data-indulge"),
		amex = clickedObj.attr("data-amex"),
		gv = clickedObj.attr("data-gv"),
		shaw = clickedObj.attr("data-shaw"),
		cathay = clickedObj.attr("data-cathay"),
		privileges = clickedObj.attr("data-privileges"),
		excl = clickedObj.attr("data-excl"),
		dbshealthcare = clickedObj.attr("data-dbshealthcare"),
		rewardpoints = clickedObj.attr("data-rewardpoints"),
		additionalpoints = clickedObj.attr("data-additionalpoints");
		var imgPath ='images/';
		var imgname = 'tick_bullet.png';
		var dbsshopperImg = (dbsshopper == 'yes')?'<img src="'+imgPath+imgname+'" />':'',
			spcImg = (spc == 'yes')?'<img src="'+imgPath+imgname+'" />':'',
			essoImg = (esso == 'yes')?'<img src="'+imgPath+imgname+'" />':'',
			indulgeImg = (indulge == 'yes')?'<img src="'+imgPath+imgname+'" />':'',
			amexImg = (amex == 'yes')?'<img src="'+imgPath+imgname+'" />':'',
			gvImg = (gv == 'yes')?'<img src="'+imgPath+imgname+'" />':'',
			shawImg = (shaw == 'yes')?'<img src="'+imgPath+imgname+'" />':'',
			cathayImg = (cathay == 'yes')?'<img src="'+imgPath+imgname+'" />':'',
			privilegesImg = (privileges == 'yes')?'<img src="'+imgPath+imgname+'" />':'',
			exclImg = (excl == 'yes')?'<img src="'+imgPath+imgname+'" />':'',
			dbshealthcareImg = (dbshealthcare == 'yes')?'<img src="'+imgPath+imgname+'" />':'',
			rewardpointsImg = (rewardpoints == 'yes')?'<img src="'+imgPath+imgname+'" />':'',
			additionalpointsImg = (additionalpoints == 'yes')?'<img src="'+imgPath+imgname+'" />':'';
        var cardContainerTemplate =
            [
              '<div class="item">',
              ' {{cards}}',
              '</div>'
            ].join('\n'),
            cardCompareTemplateName =
            [
				'<div id="'+cardId+'_name" class="span3 cardItem subheading-compare hide ci1">',
				'<div class="block-1">',		
				'<div class="col2header">',
				'<h3>'+cardDataName+'</h3>',
				'</div>',
				'<div style=" padding-bottom:10px;"><img src="'+cardImgUrl+'"></div>',
				'<div class="card-compare-apply">',
				'	<div class="col2header">',
				'		<a href="'+cardApplyLink+'" class="btn btn-primary" onclick="cc_applynow(\''+cardDataName+'\')">' + labels.apply + '</a>',
				'	</div>',
				'	<a href="http://www.dbs.com.sg/personal/ib-anchor/redirect-cardstp.html" class="launch ui-link" onclick="cc_applyibanking(\''+cardDataName+'\')">' + labels.apply_ibanking + '<span class="icn-arrow-red launch"></span></a>',
				'</div>',
				'<div class="btn-minus cursor-hand btn-remove card-compare-remove"> <i  data-id="'+cardId+'" class="icon_cross-gray"></i>' + labels.remove + '</div>',
				'</div>',
			'</div>'
            ].join('\n'),
			 cardCompareTemplateBestfor =
            [
			 '<div id="'+cardId+'_Bestfor" class="span3 subheading-compare cardItem hide ci2">',
				'<div class="block-1">',
				'<div class="col2header">',
				  '<i class="icon_tag-large-gray"></i>',
				  '<h3>'+cardTagline+'</h3>',
				'</div>',
				'<p class="">'+type+'</p>',
				'<p class="">'+cardMinIncome+'</p>',
				'<p class="min-height40 ">'+cardForeignIncome+'</p>',
				'<p class="">'+cardDataWaiver+'</p>',
				'<p >'+cardDataItem+'</p>',
				'<a href="'+cardLink+'" class="launch nomargin ui-link">' + labels.more_details + ' <span class="icn-arrow-red launch"></span></a>',
				'</div>',
			'</div>'
            ].join('\n'),
			 cardCompareTemplateCardBenefits =
            [
			 '<div id="'+cardId+'_cardBenefits" class="span3 subheading-compare cardItem hide ci3">',		
				'<div class="block-1">',
				'<div class="creditcard_name">',				 
				  '&nbsp;',
				'</div>',			 
				'<p>'+rewardpointsImg+'</p>',
				'<p>'+additionalpointsImg+'</p>',
				'<p></p>',				
				'</div>',
			'</div>'
            ].join('\n'),
			 cardCompareTemplateShopping =
            [
			 '<div id="'+cardId+'_Shopping" class="span3 subheading-compare cardItem hide ci2">',
				'<div class="block-1">',
				'<div class="creditcard_name">',				 
				  '&nbsp;',
				'</div>',			
				'<p class="min-height90">'+dbsshopperImg+'</p>',
				'<p >'+shoppingOthers+'</p>',				
				'</div>',
			'</div>'
            ].join('\n'),
			 cardCompareTemplateMotoring =
            [
			 '<div id="'+cardId+'_Motoring" class="span3 subheading-compare cardItem hide ci2">',
				'<div class="block-1">',
				'<div class="creditcard_name">',				 
				  '&nbsp;',
				'</div>',				
				'<p class="min-height80">'+spcImg+'</p>',
				'<p class="min-height90">'+essoImg+'</p>',				
				'<p >'+motoringOthers+'</p>',	
				'</div>',
			'</div>'
            ].join('\n'),
			 cardCompareTemplateDining =
            [
			 '<div id="'+cardId+'_Dining" class="span3 subheading-compare cardItem hide ci2">',
				'<div class="block-1">',
				'<div class="creditcard_name">',				 
				  '&nbsp;',
				'</div>',				
				'<p class="min-height60">'+indulgeImg+'</p>',
				'<p>'+amexImg+'</p>',
				'</div>',
			'</div>'
            ].join('\n'),
			 cardCompareTemplateMovies =
            [
			 '<div id="'+cardId+'_Movies" class="span3 subheading-compare cardItem hide ci2">',
				'<div class="block-1">',
				'<div class="creditcard_name">',				 
				  '&nbsp;',
				'</div>',				
				'<p>'+gvImg+'</p>',											
				'</div>',
			'</div>'
            ].join('\n'),
			 cardCompareTemplateTravel =
            [
			 '<div id="'+cardId+'_Travel" class="span3 subheading-compare cardItem hide ci2">',
				'<div class="block-1">',
				'<div class="creditcard_name">',				 
				  '&nbsp;',
				'</div>',				
				'<p>'+privilegesImg+'</p>',
				'</div>',
			'</div>'
            ].join('\n'),
			 cardCompareTemplateHealthcare =
            [
			 '<div id="'+cardId+'_Healthcare"  class="span3 subheading-compare cardItem hide ci2">',
				'<div class="block-1">',
				'<div class="creditcard_name">',				 
				  '&nbsp;',
				'</div>',				
				'<p class="min-height90">'+dbshealthcareImg+'</p>',
				'</div>',
				'<div class="card-compare-apply">',
				'	<div class="col2header">',
				'		<a href="'+cardApplyLink+'" class="btn btn-primary" onclick="cc_applynow(\''+cardDataName+'\')">' + labels.apply + '</a>',
				'	</div>',
				'	<a href="http://www.dbs.com.sg/personal/ib-anchor/redirect-cardstp.html" class="launch ui-link" onclick="cc_applyibanking(\''+cardDataName+'\')">' + labels.apply_ibanking + '<span class="icn-arrow-red launch"></span></a>',
				'</div>',
			'</div>'
            ].join('\n'),
			 cardCompareTemplateRewards =
            [
			  '<div id="'+cardId+'_Rewards" class="span3 subheading-compare cardItem hide ci4">',
				'<div class="block-1">',
					'<div class="col2header clearfix">',
					 '<h3>'+cardRewardsHeading+'</h3>',
					'</div>',
					'<p>'+dataRewardsItem+'</p>',
					'<a href="'+cardLink+'" class="launch nomargin ui-link">' + labels.more_details + '<span class="icn-arrow-red launch"></span></a>',
				'</div>',
			 '</div>'
            ].join('\n');
			 $(cardCompareTemplateName).insertBefore('.insertcard1').show();
			 $(cardCompareTemplateBestfor).insertBefore('.insertcard2').show();
			 $(cardCompareTemplateCardBenefits).insertBefore('.insertcard3').show();
			 $(cardCompareTemplateRewards).insertBefore('.insertcard4').show();
			 $(cardCompareTemplateShopping).insertBefore('.insertcard5').show();	
			 $(cardCompareTemplateMotoring).insertBefore('.insertcard6').show();
			 $(cardCompareTemplateDining).insertBefore('.insertcard7').show();	
			 $(cardCompareTemplateMovies).insertBefore('.insertcard8').show();
			 $(cardCompareTemplateTravel).insertBefore('.insertcard9').show();
			 $(cardCompareTemplateHealthcare).insertBefore('.insertcard10').show();			
	}
	function cardCounting() { console.log('abc4150->	function cardCounting() { ');
	var cardItemLen = $('.comparecards .cardItem:visible').length;
	if (cardItemLen == 0 ) {
	  $('.comparecards .notice').parent().show();
	  $('.comparecards .heading-compare').hide();
	  $('.alert_message').css('display', 'none');
	  $("#cardCnt").html(cardItemLen);
	}else{
	  var cardCnt = 0;
	  if(cardItemLen == 10){
	  cardCnt = 1;
	  }else if(cardItemLen == 20){
	  cardCnt = 2;
	  }else if(cardItemLen == 30){
	  cardCnt = 3;
	  }	
	  $("#cardCnt").html(cardCnt);
	}
	$('.comparecards .cardItem').removeClass('last-child').last().addClass("last-child");
}
$( ".comparecards" ).on("click", ".btn-minus", function() {	 console.log('abc4170->$( ".comparecards" ).on("click", ".btn-minus", function() {	 ');
		var clickedId = $(this).children().attr("data-id");	
		$('.carousel-inner').find('#'+clickedId).removeClass('card-selected');
		$('section[id^="cards"] span[id='+clickedId+']').parent().find("i").removeClass().addClass('icon_add-red');
		$('section[id^="cards"] span[id='+clickedId+']').html(labels.add_card_to_comparison);
		$( '#comparecards img[id="'+clickedId+'"]').removeClass('card-selected').prev().hide();
		$('.carousel-inner').find('#'+clickedId).fadeTo(200, 1);
		$("#" +clickedId + "_name").remove();
		$("#" + clickedId + "_Bestfor").remove();
		$("#" + clickedId + "_Rewards").remove();
		$("#" +clickedId + "_cardBenefits").remove();
		$("#" + clickedId + "_Shopping").remove();
		$("#" + clickedId + "_Motoring").remove();
		$("#" + clickedId + "_Movies").remove();  
		$("#" + clickedId + "_Travel").remove();		
		$("#" + clickedId + "_Healthcare").remove();	   
		$("#" + clickedId + "_Dining").remove();	
		cardCounting();
		$(".alert_message").hide();
		selected_card.splice($.inArray($(this).children().attr("data-id"), selected_card),1);
	});
	$(".comparison-flyout .hide-switch a").on("click", function() { console.log('abc4191->	$(".comparison-flyout .hide-switch a").on("click", function() { ');
	  $(".comparison-flyout").flyInorOut();
	  $(".notice-flyouthidden").slideDown();
	  $('.alert_message').css('display', 'none');
	});
	  $.fn.flyInorOut = function(speed, offset) { console.log('abc4196->	  $.fn.flyInorOut = function(speed, offset) { ');
      var that = this;
      speed = speed || 500;
      offset = offset || 10;
      var height = offset;
      //$(that).css({'margin-top': -parseInt(offset)});
      $(that).slideToggle(speed);
  };
	},
	customDropDown:function(){console.log('abc4205->	customDropDown:function(){');
        $(".customSelect").each(function(){console.log('abc4206->        $(".customSelect").each(function(){');
			var _wrapperWidth;
			if($(this).hasClass('customSelectSmall')) _wrapperWidth=102;
			else if($(this).hasClass('customSelectMedium')) _wrapperWidth=220;
			else if($(this).hasClass('customSelectLarge')) _wrapperWidth=320;			
            $(this).wrap("<span class='select-wrapper' style='width:"+ _wrapperWidth +"px'></span>");
            $(this).after("<span class='holder'></span>");
        });
        $(".customSelect").change(function(){console.log('abc4214->        $(".customSelect").change(function(){');
            var selectedOption = $(this).find(":selected").text();
            $(this).next(".holder").text(selectedOption);
        }).trigger('change');
    }
};
 var isPhone = true;
if ($('.hidden-phone').is(":visible")) {
	isPhone = false;
} 
$(document).ready(function() {console.log('abc4224->$(document).ready(function() {');
pageLevelComponents.customDropDown();
annoucement_call();
notificationajaxcall();
googleSearch = function (query,pageblock) {console.log('abc4228->googleSearch = function (query,pageblock) {');
var url ='';
		if(pageblock=='splitter')
		{
			if($("#searchurl_splitter").length > 0)
			url  = $("#searchurl_splitter").val();
			else 
			url = '/treasures/searchresult.page';
		}
		else
		{
			if($("#searchurl").length > 0)
			url  = $("#searchurl").val();
			else 
			url = '/treasures/searchresult.page';
		}
			var ifnewwindow='';
			if($("#issearchnewwindow").length > 0)
           ifnewwindow  = $("#issearchnewwindow").val();
			else 
			ifnewwindow = 'false';
            if (window.console) {
                window.console.log('Search URL ----> ' + url);
            }
            if (query.replace(/\s/g, "") != "") {
                var keyword = query.toLowerCase().replace(
                        /^\s+|\s+$/g, "");
				if(ifnewwindow=='false')
                {
				window.location = url + "?Query_String=" + query;
				}
				else
				{
				window.open(url + "?Query_String=" + query,'_blank');
				}
            }
        };
    if ($(".landing-page-hero").length > 0)
    {
          // pageLevelComponents.HeroBanner();
    }
  pageLevelComponents.Navigation();
    pageLevelComponents.getInTouch();
    pageLevelComponents.tabs();
   // pageLevelComponents.setTabHeight();
    pageLevelComponents.currencyConverter();
    pageLevelComponents.topNavSearch();
    pageLevelComponents.mobileSearch();
    pageLevelComponents.placeholderModernizr();
    pageLevelComponents.footer();
    pageLevelComponents.siteButton();
    pageLevelComponents.businessSegmentTabIndex();
    pageLevelComponents.miniCarousel();
    pageLevelComponents.articleBrowser();
	pageLevelComponents.viewAllAICSButtonClass();
	// pageLevelComponents.setTabwidth();
    // pageLevelComponents.addBodyClass();
    if ($(".splitter-panel").length > 0)
    {
          pageLevelComponents.splitter();
    }
if ($(".homepage-hero-module").length > 0)
    {
        pageLevelComponents.aicsHero();
    }
	   // pageLevelComponents.disclaimerCheck();
//pageLevelComponents.mainNavURLPrefix();
    $(window).on("orientationchange", function(event) {console.log('abc4295->    $(window).on("orientationchange", function(event) {');
        var stageWidthImg = $('img#teacupImage').width();
        if (stageWidthImg > 0) {
            var leftStyle = (stageWidthImg - 300) / 2;
            $('button#viewResults').css('left', leftStyle); /* [Date: 15-09-2013] add - Ravi  */
        }
		/*
			if (navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|webOS|Mobile/i)) {
			var windowsize = $(window).width();
			if (windowsize < 767) {
			$('.herocontrol').addClass('landing-page-hero');
			$('.heroblock').removeClass('landing-page-hero');
			}
			}
			pageLevelComponents.HeroBanner();
			*/
    });
	/*
		var addEvent =  window.attachEvent||window.addEventListener;
	var event = window.attachEvent ? 'onorientationchange' : 'orientationchange';
	addEvent(event, function() {console.log('abc4315->	addEvent(event, function() {');
	if (navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|webOS|Mobile/i)) {
			var windowsize = $(window).width();
			if (windowsize < 767) {
			$('.herocontrol').addClass('landing-page-hero');
			$('.heroblock').removeClass('landing-page-hero');
			}
			}
			pageLevelComponents.HeroBanner();
 }, false);
*/
	if ($("#profile_analytics_ajaxurl").length > 0)
    {
	 pageLevelComponents.profileAnalytics();
	 pageLevelComponents.addFreeText();
}
 pageLevelComponents.articeDetailSignup();
pageLevelComponents.splitterSearchModel();
pageLevelComponents.searchnewValidation();
 pageLevelComponents.setMainNavigationWidth();
pageLevelComponents.removeDesktopCSSforPrinterFriendly();
pageLevelComponents.tabArticleBrowserMarkets();
pageLevelComponents.tempQAGITIconChange();
//pageLevelComponents.fitTabContent();
pageLevelComponents.tabArticleBrowserInsights();
pageLevelComponents.tabArticleBrowserEconomics();
pageLevelComponents.alertajaxCall();
if($('.GIT-container')){
	pageLevelComponents.FlyGIT();
}
pageLevelComponents.borrowHero();
pageLevelComponents.megaMenu();
pageLevelComponents.creditcardHomeBanner();
 if ($(".secondtabactivevariant").length > 0)
    {
        //  pageLevelComponents.pageHero();
    }
if ($(".dropdown-cards")){
pageLevelComponents.cardsMenu();
}
 if($(".creditcards.tabbed-content")){
 pageLevelComponents.creditCardBanner();
 }
 if($("#comparecards")){
	pageLevelComponents.creditCardCompare();
  }
 //pageLevelComponents.notification();
 //pageLevelComponents.cardMenuv();
$(".carousel-indicators li").click(function(){$(this).addClass('active')});	  
$('.megamenu').mouseover(function(){$('.loansMenu').blur();$('.loansSubMenu').blur()});	
	// select tab and respective div in OrganizationMembersSummary Page
	var hash = window.location.hash,
		targetTab = hash.substring(1,hash.length),
		flag = false;
	if (targetTab != "") {
		var wrapperDiv = $(".tabbed-content.product-info");
		$(".tabbed-content.product-info .tabbed-nav.tabs li").each(function(){console.log('abc4371->		$(".tabbed-content.product-info .tabbed-nav.tabs li").each(function(){');
			var currentTab = $(this).data('target');
			$(this).removeClass('active');
			if (targetTab === currentTab){
				$(this).addClass('active');
				$('.tabbed-content.product-info .tabcontent').each(function(){console.log('abc4376->				$(\'.tabbed-content.product-info .tabcontent\').each(function(){');
					var currentDiv = $(this).data('landing');
					$(this).hide();
					if (targetTab === currentDiv){
						$(this).show();
						flag = true;
					}
				});
			}
		});
		if (!(flag)) {
			$('.tabbed-nav li').removeClass('active');
			$('.containerDiv div').hide();
			$($('.tabbed-nav li').get(0)).addClass('active');
			$($('.containerDiv div').get(0)).show();
		}
	}
	if($('#myCarousel').children().hasClass('carousel-indicators') && $(window).width()<768){
		var swipeFunc = {
			touches : {
				"touchstart": {"x":-1, "y":-1}, 
				"touchmove" : {"x":-1, "y":-1}, 
				"touchend"  : false,
				"direction" : "undetermined"
			},
			touchHandler: function(event) {console.log('abc4401->			touchHandler: function(event) {');
				var touch;
				if(typeof($(event.target).parent().attr("href"))=="undefined") {
					if (typeof event !== 'undefined'){	
						event.preventDefault(); 
						if (typeof event.touches !== 'undefined') {
							touch = event.touches[0];
							switch (event.type) {
								case 'touchstart':
								case 'touchmove':
									swipeFunc.touches[event.type].x = touch.pageX;
									swipeFunc.touches[event.type].y = touch.pageY;
									break;
								case 'touchend':
									swipeFunc.touches[event.type] = true;
									swipeFunc.touches.direction = swipeFunc.touches.touchstart.x < swipeFunc.touches.touchmove.x ? $('.pagehero #myCarousel').carousel('prev') : $('.pagehero #myCarousel').carousel('next');
								default:
									break;
							}
						}
					}
				}
				else
				{ 
					var targt;
					if (typeof($(event.target).parent().attr("target"))=="undefined")
					targt="_self";
					else
					targt=$(event.target).parent().attr("target");
					window.open($(event.target).parent().attr("href"),targt);
				}
			},
			init: function() {console.log('abc4433->			init: function() {');
				document.getElementById("myCarousel").addEventListener('touchstart', swipeFunc.touchHandler, false);	
				document.getElementById("myCarousel").addEventListener('touchmove', swipeFunc.touchHandler, false);	
				document.getElementById("myCarousel").addEventListener('touchend', swipeFunc.touchHandler, false);
			}
		};
		swipeFunc.init();
	}
/*
 setTimeout(function () {console.log('abc4442-> setTimeout(function () {');
	var itemCount = $('#product-nav li').length;
	//alert(itemCount);
var wrapperWidth = $('.main-navigation-container').width();
//alert(wrapperWidth);
//if(itemCount >= 5)
//$('#product-nav li').width((wrapperWidth/itemCount)-1).addClass('itemSmall');
//else
//alert(wrapperWidth);
//alert(itemCount);
$('#product-nav li').width((wrapperWidth/itemCount)-1);
  //if (navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|webOS|Mobile/i)) {
                var windowsize = $(window).width() ;
//if ((navigator.userAgent.match(/Android/i))&&(windowsize==800))
	if ((navigator.userAgent.match(/Android/i)))
	{
		$('#product-nav li:last').width((wrapperWidth/itemCount)+5);
	}
	 }, 100);
	*/
});
 (function() {console.log('abc4463-> (function() {');
    var pageURL = window.location.href;
    var pageSegments = pageURL.split('/');
    var pageSegment = "";
    if (pageSegments != null && pageSegments != "")
    {
        if (pageSegments[3] == "in")
            pageSegment = pageSegments[4];
        else if (pageSegments[3] == "id")
            pageSegment = pageSegments[4];
        else
            pageSegment = pageSegments[3];
    }
   if ((pageSegments[0] == "file:")||(pageSegments[2] == "localhost:8080")) {
        var filename = pageSegments[pageSegments.length - 1].split('_')[0];
        switch (filename)
        {
            case "treasures":
                $("html").addClass("treasures");
                break;
            case "personal":
                $("html").addClass("dbs");
                break;
            case "tpc":
                $("html").addClass("tpc");
                break;
            case "privatebank":
                $("html").addClass("private-bank");
                break;
            case "sme":
                $("html").addClass("dbs");
                break;
            case "dbs":
                $("html").addClass("dbs");
                break;
			case "posb":
				$("html").addClass("posb");
			break;
            default:
                $("html").addClass("dbs");
        }
    }
    else
    {
	if (pageSegments[2].toLowerCase().indexOf("posb") >= 0){
		$("html").addClass("posb");
	}
	else
	{
        switch (pageSegment)
        {
            case "treasures":
                $("html").addClass("treasures");
                break;
            case "personal":
                $("html").addClass("dbs");
                break;
            case "treasures-private-client":
                $("html").addClass("tpc");
                break;
            case "private-banking":
                $("html").addClass("private-bank");
                break;
            case "sme":
                $("html").addClass("dbs");
                break;
            case "corporate":
                $("html").addClass("dbs");
                break;
            default:
                $("html").addClass("dbs");
        }
	}
    }
    $("body").attr('class','');
	 //  pageLevelComponents.HeroBanner();
	 /*
	 (function(d){console.log('abc4540->	 (function(d){');
	 if
 var
 ce=function(e,n){var a=document.createEvent("CustomEvent");a.initCustomEvent(n,true,true,e.target);e.target.dispatchEvent(a);a=null;return false},
 nm=true,sp={x:0,y:0},ep={x:0,y:0},
 touch={
  touchstart:function(e){sp={x:e.touches[0].pageX,y:e.touches[0].pageY}},
  touchmove:function(e){nm=false;ep={x:e.touches[0].pageX,y:e.touches[0].pageY}},
  touchend:function(e){if(nm){ce(e,'fc')}else{var x=ep.x-sp.x,xr=Math.abs(x),y=ep.y-sp.y,yr=Math.abs(y);if(Math.max(xr,yr)>20){ce(e,(xr>yr?(x<0?'swl':'swr'):(y<0?'swu':'swd')))}};nm=true},
  touchcancel:function(e){nm=false}
 };
 for(var a in touch){d.addEventListener(a,touch[a],false);}
})(document);*/  
})();
 /*
    !function ($) {console.log('abc4555->    !function ($) {');
$(function() {console.log('abc4556->$(function() {');
   $("#pageHeroCarousel").carousel(); 
});
}(window.jQuery);
 */
 /*
 $(window).load(function () {console.log('abc4562-> $(window).load(function () {');
  if ($('#product-nav').length){
	var itemCount = $('#product-nav li').length;
var wrapperWidth = $('.main-navigation-container').width();
//if(itemCount >= 5)
//$('#product-nav li').width((wrapperWidth/itemCount)-1).addClass('itemSmall');
//else
//alert(wrapperWidth);
//alert(itemCount);
$('#product-nav li').width((wrapperWidth/itemCount)-1);
  //if (navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|webOS|Mobile/i)) {
                var windowsize = $(window).width() ;
//if ((navigator.userAgent.match(/Android/i))&&(windowsize==800))
	if ((navigator.userAgent.match(/Android/i)))
	{
		$('#product-nav li:last').width((wrapperWidth/itemCount)+5);
	}
}
});*/
 /*
 $(window).on('resize', function(){console.log('abc4582-> $(window).on(\'resize\', function(){');
      var win = $(this); //this = window
      console.log(win.width());
});
  $(window).load(function () {console.log('abc4586->  $(window).load(function () {');
   var win = $(this); //this = window
      console.log(win.width());
  });
 */
$(window).on("orientationchange", function(event) {console.log('abc4591->$(window).on("orientationchange", function(event) {');
	 setTimeout(function () { console.log('abc4592->	 setTimeout(function () { ');
	  if ($('#product-nav').length){  
		var itemCount = $('#product-nav li').length;
		if ($('#product-nav').length){
		var itemCount = $('#product-nav li').length;
		var wrapperWidth = $('.main-navigation-container').width();
		$('#product-nav li').width((wrapperWidth/itemCount)-1);
		var windowsize = $(window).width() ;
		if ((navigator.userAgent.match(/Android/i)))
		{
			$('#product-nav li:last').width((wrapperWidth/itemCount)+5);
		}
		}
		}
		 }, 500);
	if($('.GIT-container')){
		pageLevelComponents.FlyGIT();
	}
 });
