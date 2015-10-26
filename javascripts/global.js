   /*****************************************************************************
     * AjaxRequest Javascript Object
     *
     * Author: Rex Staples
     * Date:   27-January-2006
     *
     * Copyright 2006 Interwoven, Inc. All Rights Reserved.
     *
     * Interwoven trademarks, service marks, logos, and taglines are
     * exclusively owned by Interwoven, Inc.
     *
     *
     * OVERVIEW
     *
     * The AjaxRequest object encapsulates an XMLHttpRequest delivering a simple
     * framework for dispatching both synchronous and asynchronous requests to
     * the server. The various complexities of configuring a request handler or
     * monitoring the request to completion are all handled behind the scenes.
     *
     * The object is designed to simplify handling of request parameters which
     * may either be added one at a time, or by digesting an entire form. In both
     * of these cases all url-encoding is done automatically by the object.
     *
     * There is support for specialized data formats (xml, csv, home-grown) by
     * exposing the request body. If you go this route be sure to read the notes
     * in the comments of the setRequestBody definition further down the page.
     *
     * At its simplest, the AjaxRequest object needs nothing more than a url and
     * a response handler function(1). The request will be sent to the specified
     * url as a POST, and the handler function will be invoked when the response
     * completes.
     *
     * The handler function is passed two parameters from the response. The first
     * is a W3C DOM Document object and the second is a string representation of
     * the response data. If the response data is not well-formed XML, or if the
     * Content-Type response header from the server is not "text/xml" then the
     * Document object will be empty(2). The response text always contains the
     * data from the response -- perfect for applications where simple data is
     * sufficient and well-formed xml is overkill.
     *
     * If the request is set as synchronous, the call to submit the request will
     * block until the response returns.  For synchronous calls there is no need
     * to setup a handler function since the reponse xml and response text are
     * available as soon as the request completes.
     *
     * INTERFACE
     *
     * Each function listed below along with its parameters is documented further
     * down the page with its implementation.  This is a fluent interface, so all
     * the Configuration functions below return an object reference to promote
     * method chaining.  Example: req.setMethod('GET').setUrl(url).submit();
     *
     * Creation
     *
     *       AjaxRequest(url, handlerFunction);
     *
     * Configuration
     *
     *       setUrl(url)
     *       setMethod(method)
     *       setHandler(handlerFunction)
     *
     *       setAsynchronous(true|false)
     *       setContentType(contentType)
     *       setRequestBody(data)
    *
     *       setParameter(key, value)
     *       setParameters(form)
     *       clearParameters()
     *
     * Execution
     *
     *       submit()
     *
     *
     * USAGE
     *
     * Example of instantiating an AjaxRequest where the url and handler are
     * passed in the constructor, a single request parameter is set, and the
     * request is submitted.  The handler function extracts a value from the
     * first node in the response Document.
     *
     *       function handleShippingQuery(xmlDoc, text)
     *       {
     *         setShippingCost(xmlDoc.documentElement.firstChild.nodeValue);
     *       }
     *
     *       var req = new AjaxRequest('shipCalc.jsp', handleShippingQuery);
     *       req.setParameter('zipcode', '94086');
     *       req.submit();
     *
     * NOTES
     *
     * (1) If the server response is unimportant the handler function need not be
     *     configured. The response is monitored through completion for errors,
     *     but no handler is invoked.
     *
     * (2) Firefox creates an error document with a single <parsererror/> node.
     *
     *****************************************************************************/
    /**
     * CONSTANTS
     *
     * These constants are defined without the prototype keyword so they can be
     * referenced without requiring an object instantiation (mainly for the ready
     * state change handler). They are globals scoped to window.AjaxRequest.
     *
     */
    /**
     * request method
     */
    AjaxRequest.METHOD_POST = 'POST';
    /**
     * request method
     */
    AjaxRequest.METHOD_GET = 'GET';
    /**
     * request method
     */
    AjaxRequest.METHOD_PUT = 'PUT';
    /**
     * request ready state
     */
    AjaxRequest.READY_STATE_UNINITIALIZED = 0;
    /**
     * request ready state
     */
    AjaxRequest.READY_STATE_LOADING = 1;
    /**
     * request ready state
     */
    AjaxRequest.READY_STATE_LOADED = 2;
    /**
     * request ready state
     */
    AjaxRequest.READY_STATE_INTERACTIVE = 3;
    /**
     * request ready state
     */
    AjaxRequest.READY_STATE_COMPLETE = 4;
    /**
     * request status
     */
    AjaxRequest.STATUS_OK = 200;
    /**
     * request status
     */
    AjaxRequest.STATUS_NOT_FOUND = 404;
    /**
     * content type request header
     */
    AjaxRequest.CONTENT_TYPE = 'Content-Type';
    /**
     * content type for form url-encoded key/value data
     */
    AjaxRequest.CONTENT_TYPE_URL_ENCODED = 'application/x-www-form-urlencoded';
    /**
     * ActiveX application/classname for newer IE browsers
     */
    AjaxRequest.ACTIVEX_MSXML2_XMLHTTP = "Msxml2.XMLHTTP";
    /**
     * ActiveX application/classname for legacy IE browser
     */
    AjaxRequest.ACTIVEX_LEGACY_XMLHTTP = "Microsoft.XMLHTTP";
    /**
     * form field type
     */
    AjaxRequest.FORM_FIELD_BUTTON = 'button';
    /**
     * form field type
     */
    AjaxRequest.FORM_FIELD_SUBMIT = 'submit';
    /**
     * form field type
     */
    AjaxRequest.FORM_FIELD_TEXT = 'text';
    /**
     * form field type
     */
    AjaxRequest.FORM_FIELD_HIDDEN = 'hidden';
    /**
     * form field type
     */
    AjaxRequest.FORM_FIELD_TEXTAREA = 'textarea';
    /**
     * form field type
    */
    AjaxRequest.FORM_FIELD_RADIO = 'radio';
    /**
     * form field type
     */
    AjaxRequest.FORM_FIELD_CHECKBOX = 'checkbox';
    /**
     * form field type
     */
    AjaxRequest.FORM_FIELD_SELECT_ONE = 'select-one';
    /**
     * form field type
     */
    AjaxRequest.FORM_FIELD_SELECT_MULTIPLE = 'select-multiple';
    /**
     * query string delimiter
     */
    AjaxRequest.DELIM_QS = '?';
    /**
     * request parameter delimiter
     */
    AjaxRequest.DELIM_PARAM = '&';
    /**
     * parameter key/value delimiter
     */
    AjaxRequest.DELIM_KEY_VALUE = '=';
    /**
     * error message
     */
    AjaxRequest.ERROR_CREATE_REQUEST = 'Unable to create ActiveX XMLHttpRequest.'
    /**
     * error message (tokens replaced at run-time)
     */
    AjaxRequest.ERROR_REQUEST_STATE = 'Error in XMLHttpRequest [$code/$text]';
    /**
     * Constructor creates an encapsulated XMLHttpRequest object. Both parameters
     * to the constructor are optional, and may be configured later.
     *
     * @param url             the url to which the request is sent
     * @param handlerFunction the function to invoke and pass the response
     *                        xml dom and the response text
     */

    function AjaxRequest(url, handlerFunction) {
        // Object properties
        this.mUrl = url;
        this.mHandler = handlerFunction;
        this.mMethod = AjaxRequest.METHOD_POST;
        this.mContentType = null;
        this.mRequestBody = null;
        this.mDebug = false;
        this.mAsynchronous = true;
        this.clearParameters();
    }
    /**
     * Sets whether to enable debug mode. When enabled, after the request is made
     * the responseText will be printed in a new browser window.
     *
     * @param isDebugMode whether to enable debug mode
     * @return a self-reference for method chaining
     */
    AjaxRequest.prototype.setDebug = function (isDebugMode) {
        this.mDebug = isDebugMode;
        return this;
    }
    /**
     * Sets the url to which the request is sent.
     *
     * @param url the url to which the request is sent
     * @return a self-reference for method chaining
     */
    AjaxRequest.prototype.setUrl = function (url) {
        this.mUrl = url;
        return this;
    }
    /**
     * Sets the ready state change handler for the XMLHttpRequest. Once the
     * request completes, the handler is invoked and passed the response data.
     *
     * @param handlerFunction the function to invoke and pass the response
     *                        xml dom and the response text
     * @return a self-reference for method chaining
     */
    AjaxRequest.prototype.setHandler = function (handlerFunction) {
        this.mHandler = handlerFunction;
        return this;
    }
    /**
     * Sets the type of server request to send. The default is POST.
     *
     * @param method the type of server request
     * @return a self-reference for method chaining
     */
    AjaxRequest.prototype.setMethod = function (method) {
        this.mMethod = method;
        return this;
    }
    /**
     * Sets the content type of the data in the request body. The default is
     * application/x-www-form-urlencoded.
     *
     * @param contentType the type of data to send in the request body
     * @return a self-reference for method chaining
     */
    AjaxRequest.prototype.setContentType = function (contentType) {
        this.mContentType = contentType;
        return this;
    }
    /**
     * Sets the data to send in the request body. This function is only needed
     * to send non-url-encoded data in the request (for example, an xml block).
     *
     * If you are sending normal url-encoded form data, use the setParameter
     * function to set key/value pairs or use the setParameters function to
     * digest an entire html form.
     *
     * Caveat: If the request method is POST and the request body has been set,
     * then any parameters that have been set will appear in the query string
     * of the url.
     *
     * Note: A default content type (url form encoded) is used in the request if
     * the request body is not set.  If the body is set, then only an explicit
     * call to setContentType will cause a content type header to be sent.
     *
     * @param data the data to send in the request body
     * @return a self-reference for method chaining
     */
    AjaxRequest.prototype.setRequestBody = function (data) {
        this.mRequestBody = data;
        return this;
    }
    /**
     * Sets whether the request should be asynchronous. Request are asynchronous
     * by default.
     *
     * @param isAsynchronous true if the request should be asynchronous
     * @return a self-reference for method chaining
     */
    AjaxRequest.prototype.setAsynchronous = function (isAsynchronous) {
        this.mAsynchronous = isAsynchronous;
        return this;
    }
    /**
     * Clears the request parameter list.
     *
     * @return a self-reference for method chaining
     */
    AjaxRequest.prototype.clearParameters = function () {
        this.mParams = new Array();
        return this;
    }
    /**
     * Sets a request parameter. The key and value are automatically url-encoded.
     *
     * @param key   the request parameter key
     * @param value the request parameter value
     * @return a self-reference for method chaining
     */
    AjaxRequest.prototype.setParameter = function (key, value) {
        this.mParams[this.mParams.length] = encodeURIComponent(key) + AjaxRequest.DELIM_KEY_VALUE + encodeURIComponent(value);
        return this;
    }
    /**
     * Builds the request parameters from the elements in the passed form.
     * Button, submit, and disabled form fields are automatically skipped.
     *
     * @param form the form to build the request parameters from
     * @return a self-reference for method chaining
     */
    AjaxRequest.prototype.setParameters = function (form) {
        var fields = form.elements;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].disabled) continue;
            var name = fields[i].name;
            switch (fields[i].type) {
            case AjaxRequest.FORM_FIELD_TEXT:
            case AjaxRequest.FORM_FIELD_HIDDEN:
            case AjaxRequest.FORM_FIELD_TEXTAREA:
                this.setParameter(name, fields[i].value);
                break;
            case AjaxRequest.FORM_FIELD_RADIO:
            case AjaxRequest.FORM_FIELD_CHECKBOX:
                if (fields[i].checked) {
                    this.setParameter(name, fields[i].value);
                }
                break;
            case AjaxRequest.FORM_FIELD_SELECT_ONE:
            case AjaxRequest.FORM_FIELD_SELECT_MULTIPLE:
                var options = fields[i].options;
                for (var j = 0; j < options.length; j++) {
                    if (options[j].selected) {
                        this.setParameter(name, options[j].value);
                    }
                }
                break;
            }
        }
        return this;
    }
    /**
     * Submits the request to the url using the data configured in the object.
     */
    AjaxRequest.prototype.submit = function () {
        var request = null;
        // INSTANTIATE THE XMLHttpRequest
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        } else if (window.ActiveXObject) // MSIE 6 and older
        {
            try {
                request = new ActiveXObject(AjaxRequest.ACTIVEX_MSXML2_XMLHTTP);
            } catch (errorActiveX) {
                try {
                    // older versions of MSIE
                    request = new ActiveXObject(AjaxRequest.ACTIVEX_LEGACY_XMLHTTP);
                } catch (errorLegacyActiveX) {
                    "console" in window && console.log(AjaxRequest.ERROR_CREATE_REQUEST);
                }
            }
        }
        // SET THE READY STATE CHANGE HANDLER
        // cannot reference object member from the anonymous function
        var handlerFunction = this.mHandler;
        var showResponseText = this.mDebug;
        var readyStateChangeFunction = function () {
            if (AjaxRequest.READY_STATE_COMPLETE == request.readyState) {
                if (AjaxRequest.STATUS_OK == request.status) {
                    if (showResponseText) {
                        window.open().document.write('<xmp>' + request.responseText + '</xmp>');
                    }
                    if (handlerFunction) // only invoke if defined
                    {
                        handlerFunction(request.responseXML, request.responseText);
                    }
                } else {
                    "console" in window && console.log(AjaxRequest.ERROR_REQUEST_STATE
                        .replace(/\$code/, request.status)
                        .replace(/\$text/, request.statusText));
                }
            }
        }
        // PREPARE THE REQUEST PROPERTIES AND ANY DEFAULTS
        var url = this.mUrl;
        var body = this.mRequestBody;
        var type = this.mContentType;
        var params = this.mParams.join(AjaxRequest.DELIM_PARAM);
        // if no parameters are set, then there is no need to dispatch them
        if (params.length > 0) {
            var paramDelim = (0 > url.indexOf("?")) // if a url already has a query
            ? AjaxRequest.DELIM_QS // string delimiter (?), use an
            : AjaxRequest.DELIM_PARAM // ampersand (&) instead
            if (body != null) // User-set request body, all params go in
            { // the query string for both POST and GET.
                url += paramDelim + params;
            } else // no request body
            {
                if (this.mMethod == AjaxRequest.METHOD_GET) {
                    url += paramDelim + params;
                } else {
                    body = params;
                    if (type == null) // assign default if no type is set
                    {
                        type = AjaxRequest.CONTENT_TYPE_URL_ENCODED;
                    }
                }
            }
        }
        // SUBMIT THE REQUEST
        if (this.mAsynchronous) {
            request.onreadystatechange = readyStateChangeFunction;
        }
        request.open(this.mMethod, url, this.mAsynchronous);
        if (type != null) {
            request.setRequestHeader(AjaxRequest.CONTENT_TYPE, type);
        }
        request.send(body);
        return request;
    };
var notificationajaxcall =function (event) {
	if($("#evoucher_loadurl").length > 0)
	{  
		var notificationurl  = $("#evoucher_loadurl").val();
		if(typeof(event) !="undefined"){

			if(event.type=='click'){
				notificationurl  +=  "&close=true";
			}
		}

		$.ajax({
			type: 'GET',
			url: notificationurl,
			cache:false,
			async:true,
			xhrFields: {'withCredentials': true},
			dataType : 'html',
			success: function(data) {
				$('#child').html(jQuery(data).find('#evoucher').html());
			},
			error: function(XMLHttpRequest,textStatus,errorThrown) {
			} 
		});
	}
};
	
	
var annoucement_call =function (event) {
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
			type: 'GET',
			url: notificationurl,
			cache:false,
			async:true,
			dataType : 'html',

			success: function(data) {
				  $('#annmain').html(jQuery(data).find('#announcement').clone());	
				 
			},
			error: function(XMLHttpRequest,textStatus,errorThrown) {

			} 

			});
			
			}
    };
var pageLevelComponents = {
    tabs: function() {
	
	 function filltabs(elementt)
        {
            var active_idxx;
            $('ul.tabbed-nav.tabs.hidden-phone li', $(elementt)).each(function(i, element) {
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
            $('ul.tabbed-nav.tabs li', $(elementt)).each(function(i, element) {
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
        $(".product-browser .product li").click(function (eventObject) {
            $('.product-browser .product li.active').removeClass('active');
            var $selectedLi = $(this);
            $('.product-browser .show').addClass('hide');
            $('.product-browser .show').removeClass('show');
            var category = $selectedLi.data('category').replace(/([ #;?&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
            $('.product-browser .product [data-category="' + category + '"]').addClass('active');
            var active_idx;
            $('.product-browser ul.tabbed-nav.product.hidden-phone li').each(function (i, element) {
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
        $(".tabbed-content.product-info").each(function(ii, elementt) {
            filltabs_productinfo(elementt);
        });
		
		
        //  }
        /* [29-05-2013] Added by Ravi - iPhone to display the tabs for visible phone - END */
        $(".tabbed-content.product-info .tabbed-nav.tabs li").click(function(eventObject) {
		 
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
		
		  $('.tabbed-content:not(.product-info)').each(function(ii, elementt) {
            //$h2element = $(this).find("h2");
            //$('<ul class="tabs tabbed-nav visible-phone"></ul>').insertAfter($h2element);
            $h2element = $(this).find(".tabcontent").first();
            $('<ul class="tabs tabbed-nav visible-phone"></ul>').insertBefore($h2element);
        });
		
		   $('.tabbed-content:not(.product-info)').each(function(ii, elementt) {
            filltabs(elementt);
        });

		 $(".tabbed-content:not(.product-info) .tabbed-nav.tabs li").click(function(eventObject) {
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
		
		$(".tabbed-content:not(.product-info) .tabbed-nav.hidden-phone").each(function(){
		  
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
    getInTouch: function() {
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
            $("a.dropdown-toggle").click(function() {
                $(".dropdown.highlightable").find('> a > img').attr("src", "/iwov-resources/images/arrow-down.png")
                if ($(this).parent().hasClass('open')) {
                    $(this).find('> img').attr("src", "/iwov-resources/images/git-arrow-down.png")
                } else {
                    $(this).find('> img').attr("src", "/iwov-resources/images/arrow-down.png")
                }
            });
            $('html').on("click", function() {
                $(".dropdown.highlightable").find('> a > img').attr("src", "/iwov-resources/images/arrow-down.png")
            });
            $('body').on("click", function() {
                $(".dropdown.highlightable").find('> a > img').attr("src", "/iwov-resources/images/arrow-down.png")
            });
        }
        var arrValues = ["treasures", "treasures-private-client", "private-banking", "treasures-zh", "treasures-private-client-zh", "private-banking-zh", "treasures-id", "treasures-sc", "sme"];
		 
		//pageSegment="treasures";
        arrValues.forEach(function(entry) {
		
            if (pageSegment == entry)
             {
                $("#chatwithUs").css('display', 'block');
             }
        });
        /***** Enabling Chat Link in GetInTouch Module - Ends here ******/
        function showChat() {
            $('.get-in-touch .git-container').addClass('hidden');
            $('.get-in-touch .chat').removeClass('hidden');
            // The event triggered on click of this is written in Livechat JS, cs.js
        }
        function showDisclaimer() {
            $('.get-in-touch .git-container').addClass('hidden');
            if ($(".col4-module.get-in-touch div.chat-disclaimer").length) {
                $(".col4-module.get-in-touch div.chat-disclaimer").removeClass("hidden");
            } else {
                // Following method is called from livechat JS,  cs.js
                showDisclaimerBody();
                // Handler when user click on 'X' on disclaimer
                $(".icn-white-x").click(function() {
                    $(".col4-module.get-in-touch div.chat-disclaimer").addClass("hidden");
                    $(".col4-module.get-in-touch div.git-container").removeClass("hidden");
                });
                // Handler when user click on 'button' on disclaimer	 		  
                $('.col4-module.get-in-touch div.chat-disclaimer .chat-ok').unbind('click').click(function(event) {
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
            $('.get-in-touch .chat-link').click(function(event) {
                event.preventDefault();
                // Following methods are written in livechat JS,  cs.js
                if (isChaton() && validateOutOfOffice()) {
                    showDisclaimer();
                }
            });
            $('.get-in-touch .chat .icn-white-x').click(function(event) {
                event.preventDefault();
                $('.get-in-touch .git-container').removeClass('hidden');
                $('.get-in-touch .chat').addClass('hidden');
            });
            $('.get-in-touch .chat #toggleEmailInput').click(function(event) {
                if ($(this).attr('checked')) {
                    $('.get-in-touch #inputEmail').show();
                } else {
                    $('.get-in-touch #inputEmail').hide();
                }
            });
        }
    },
   HeroBanner: function() {
	
	 
	 $hero_tile=$(".landing-page-hero-tiles.hidden-phone .tile");var hero_tile_length= $hero_tile.length;$hero_tile.css('width',100/hero_tile_length+'%');
	 /*
	$(".intro-text").each(function() {
	//$introwidth=$(".innerintro").outerWidth( true );
	//console.log($introwidth);
	//$(this).find(".shadow-text").css('width',$introwidth);
	$paratext = $(this)
    .clone()    //clone the element
    .children() //select all the children
    .remove()   //remove all the children
    .end()  //again go back to selected element
    .text();
	$boldtext =$(this).find("b").text();
	$(this).html($paratext+" <b>"+$boldtext+"</b>");
	
	});
	 */
 
 

 
	 
	   $('.landing-page-hero .landing-page-hero-content .content').hide();
        // added [Date: 25-09-2013] Ravi - Bhanu - Start
        if (navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|webOS|Mobile/i)) {
            $('.landing-page-hero .landing-page-hero-content .content').find('.imageHolder').siblings(".textHolder").find("span").css("left", "130px");
            $('.landing-page-hero .landing-page-hero-content .content').find('.imageHolder').siblings(".textHolder").find("p.shadow-text").css("left", "130px");
        } else {
            $('.landing-page-hero .landing-page-hero-content .content').find('.imageHolder').siblings(".textHolder").find("span").css("left", "149px");
            $('.landing-page-hero .landing-page-hero-content .content').find('.imageHolder').siblings(".textHolder").find("p.shadow-text").css("left", "149px");
        }
        // added [Date: 25-09-2013] Ravi - Bhanu - end
        var textshadow = $('.lt-ie10 .landing-page-hero .landing-page-hero-content .content h1, .lt-ie10 .landing-page-hero .landing-page-hero-content .content .intro-text');
        textshadow.append("<em></em> ");
        textshadow.each(function() {
            var dupeText = $(this).text();
            $(this).find("em").width($(this).parent().width()).text(dupeText);
        });
        $.fn.equalizeHeights = function() {
            var maxHeight = this.map(function(i, e) {
                return $(e).height();
            }).get();
            return this.height(Math.max.apply(this, maxHeight));
        }
        $.fn.adjustHeroSizes = function() {
		
	 	
	$(".introtextmaindiv").each(function() { 
 	$introtextwidth =$(this).find(".intro-text").text().length;
	$shadowtextwidth =$(this).find(".shadow-text").text().length;
	$textdiff=($(this).find(".intro-text").text().length-$(this).find(".shadow-text").text().length)+1;
 	var scraptext=Array($textdiff).join("&nbsp;");
 	 $shadowtextwidth =$(this).find(".shadow-text").append(scraptext);
	});
	  
            if (navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|webOS|Mobile/i)) {

                var windowsize = $(window).width()+15;
				//console.log("winsize->"+windowsize);
				//alert(windowsize);
                if (windowsize >= 767)
                {
                    $('.herocontrol').removeClass('landing-page-hero');

                    $('.heroblock').addClass('landing-page-hero');

                }
                else
                {
                    $('.herocontrol').addClass('landing-page-hero');
                    $('.heroblock').removeClass('landing-page-hero');
                }
            }
 
            var content = $('.lt-ie10 .landing-page-hero .landing-page-hero-content .content').filter(':visible');
            $(content).find("h1 em").width($(content).width());
            $(content).find(".intro-text em").width($(content).parent().width());
            $('.landing-page-hero .landing-page-hero-tiles .tile').height('auto');
            $('.landing-page-hero .landing-page-hero-tiles .tile').equalizeHeights();
            $('.landing-page-hero-tiles.mobile-controls .tile').height('auto');
            $('.landing-page-hero-tiles.mobile-controls .tile').equalizeHeights();
        }
        $('.landing-page-hero-tiles .tile').eq(0).addClass('active');
       
		$('.landing-page-hero .landing-page-hero-content:visible .content').eq(0).show();
		 
        var hero_tiles = [],
                interval = undefined,
                pointer = 0;
		//var text = $('.landing-page-hero-tiles .tile').eq(pointer).text();
		//$('.landing-page-hero-tiles.mobile-controls .tile.text').text(text);
		
		var text = $('.landing-page-hero-tiles .tile').eq(pointer).html();//vadivelu
		$('.landing-page-hero-tiles.mobile-controls .tile.text').html(text);//vadivelu
		
        $('.landing-page-hero-tiles .tiles').each(function(i, tile) {
            hero_tiles.push(tile);
        });
        var hide = function() {
            $('.landing-page-hero-tiles .tile').removeClass('active');
            $('.landing-page-hero .hero-image img').fadeOut(300);
            $('.landing-page-hero .landing-page-hero-content .content').hide();
        };
        var show = function() {

            $('.landing-page-hero-tiles .tile').eq(pointer).addClass('active');
            $('.landing-page-hero .hero-image img').eq(pointer).fadeIn(300);
            var $content = $('.landing-page-hero .landing-page-hero-content:visible .content').eq(pointer);
            // added [Date: 25-09-2013] Ravi - Bhanu - Starts
            if (navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|webOS|Mobile/i)) {
                if ($content.find('.imageHolder').length) {
                    $content.find("span").css("left", "130px");
                    $content.find("p.shadow-text").css("left", "130px");
                }
            } else {
                if ($content.find('.imageHolder').length) {
                    $content.find("span").css("left", "149px");
                    $content.find("p.shadow-text").css("left", "149px");
                }
            }// added [Date: 25-09-2013] Ravi - Bhanu - end
            $content.css('left', '20px').css('opacity', '0').show();
            $content.animate({
                left: '0px',
                opacity: '1'
            }, 500);
			
			var $content1 = $('.non-compact .landing-page-hero .landing-page-hero-content:visible .content .innerContent').eq(pointer); 
			$content1.css('left', '20px').css('opacity', '0').show();
			 $content1.animate({
			left: '0px',
			opacity: '1'
			}, 500); 
			
		 
			
            // update mobile controls, active tile
			//var text = $('.landing-page-hero-tiles .tile').eq(pointer).text();
			//$('.landing-page-hero-tiles.mobile-controls .tile.text').text(text);
			
			if ($('.tabcontrol.landing-page-hero-tiles.hidden-phone .tile a').length > 0){// if tab control is set to rotate carousel
				$('.landing-page-hero-tiles.mobile-controls .tile.text').text($('.landing-page-hero-tiles .tile').eq(pointer).text());
			} else { // if tab control is set to go to tab URL
				$('.landing-page-hero-tiles.mobile-controls .tile.text').html($('.landing-page-hero-tiles .tile').eq(pointer).html());
			}
            $.fn.adjustHeroSizes();
        };


        var timefunc;
        function resetInterval() {
            var t = $('.landing-page-hero-tiles .tile').eq(pointer).attr('data-interval') * 1000;
			if(isNaN(t)){
				show();
				return;
			}
 
             //console.log("t----------"+t+"-"+pointer);
			// t=60000;
            timefunc = setTimeout(function() {
                hide();
                pointer++;
				// if (pointer == $(".landing-page-hero-content a").length) {
				 
                if (pointer == $(".landing-page-hero-tiles.hidden-phone .tile").length) {
                    pointer = 0;
                }
                show();
                resetInterval();
            }, t);




        }
        ;
        // initial state for background image, delayed by $(window).load()
        $('.landing-page-hero .hero-image img').eq(0).fadeIn(300);
        resetInterval();
        $('.landing-page-hero-tiles.mobile-controls .tile:not(.text)').click(function(eventObject) {
            // hide();
            var $selectedTile = $(this);
            if ($selectedTile.hasClass('next')) {
                pointer++;
                if (pointer > $(".landing-page-hero-tiles.hidden-phone .tile").length-1) {
                    pointer = 0;
                }
            } else if ($selectedTile.hasClass('prev')) {
                pointer--;
                if (pointer < 0) {
                    pointer = $(".landing-page-hero-tiles.hidden-phone .tile").length-1;
                }
            }
            clearTimeout(timefunc);
            hide();
            show();
            resetInterval();
        });
		

		 $('.tabcontrol.landing-page-hero-tiles.hidden-phone .tile').click(function(eventObject) { 
			if(!$(this).hasClass('active')) { 
				pointer=$(this).index();
				clearTimeout(timefunc);
				hide();
				show();
				resetInterval();
			}
			});
        $('.tabcontrol.landing-page-hero-tiles.hidden-phone .tile a').click(function(event) { 
            event.preventDefault();
        });
		
	 
		
    },
	Navigation: function() {
        //--------------
        (function() {
            $(function() {
                $('.main-navigation-phone').each(function() {
                    $(".main-navigation-phone a[href='" + $(this).data("currentpage") + "'] > li").first().addClass('active');
                });
                $('.mobile-trigger').click(function() {
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
                $('.mobile-trigger-searchbox').click(function() {
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
                $("#language-country-dropdown li.unselected a").on("click", function() {
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
        (function dropdown1() {

            if ($('.dropdown-toggle').length > 0)
            {
                // bootstrap stuff
                $('.dropdown-toggle').dropdown();
                $('.dropdown-menu').on("click", "input", function(event) {
                    event.stopPropagation();
                });
                //Updated for Language toggling in header skin - rajeev 13th nov
                if ($(".dropdown #SelectedLanguageVal").length == 0)
                {
                    $("#languages-dropdown > li.unselected > a").on("click", function() {
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
		$(".langdropdown a").on("click", function () {
			var currhref=$(this).attr("href");
			if(currhref.indexOf('?') == -1){
			currhref=$(this).attr("href")+location.search;
			}
			location.href=currhref;
		});
		$(".mobile-language-item a").on("click", function () {
			var currhref=$(this).attr("href");
			if(currhref.indexOf('?') == -1){
			currhref=$(this).attr("href")+location.search;
			}
			location.href=currhref;
		});
		
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
                $mainNav.each(function() {
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
                    setTimeout(function() {

                        nthItem.tooltip1("hide");
                    }, toolTipTimer);
                }
            }
        }
    }
    ,
    setTabHeight: function() {
        //Set all the tabbed nav items to the size of the largest tab
        if ($(window).width() > 767) {
            /* [Date: 05-09-2013] commented - Ravi */
            /* $('.tabbed-nav.hidden-phone').each(function () {
             var greatestWidth = 0;
             $('li', $(this)).each(function () {
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
                window.addEventListener('orientationchange', function() {
                    viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
                }, false);
                document.body.addEventListener('gesturestart', function() {
                    viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
                }, false);
            }
        }
        var performAdjust = true;
        var previousWidth = 0;
        $(window).resize(function() {
            var currentWidth = $(window).width();
            if (previousWidth != currentWidth) {
                performAdjust = true;
            }
            previousWidth = currentWidth;
        });
        $.fn.checkForAdjust = function() {
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
                /*  $('.tabbed-nav.hidden-phone').each(function () {
                 var greatestWidth = 0;
                 $('li', $(this)).each(function () {
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
    currencyConverter: function() {
        function isEmpty(str) {

            return (!str || str == $('.currency-converter #firstCurrencyInput').attr('placeholder') || 0 === str.length);
        }
        function getCurrencyData() {
            var ContentId = $('.currency-converter #CCContentId').val();
			 
			 
            var ajaxURL = $('.currency-converter #CCRefreshDataURL').val();
			//console.log(ajaxURL);
            if((ajaxURL =='' && ajaxURL == 'undefined' && ajaxURL == null) || (ContentId =='' && ContentId == 'undefined' && ContentId == null)){
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
                success: function(content) {
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
                error: function(xhr, ajaxOptions, thrownError) {
                    //alert(xhr.status);
                    //alert(thrownError.responseText);
                }
            });
        }
        function updateAmounts(e) {

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
            $('.currency-converter #firstCurrency').change(function() {
                /*if ($('.currency-converter #firstCurrency :selected').text() == $('.currency-converter #secondCurrency :selected').text()) {
                 $('.currency-converter #secondCurrency option').each(function () { if (this.text == $('.currency-converter #firstCurrency').data('oldVal')) { this.selected = true; $('.currency-converter #secondCurrency').data('oldVal', this.text); } });
                 }*/
                updateAmounts('');
                $('.currency-converter #firstCurrency').data('oldVal', $('.currency-converter #firstCurrency :selected').text());
            });
           // $('#mid-market-refresh').click(function() {
           //     getCurrencyData();
           // });
            $('.currency-converter #secondCurrency').change(function() {
                /*if ($('.currency-converter #secondCurrency :selected').text() == $('.currency-converter #firstCurrency :selected').text()) {
                 $('.currency-converter #firstCurrency option').each(function () { if (this.text == $('.currency-converter #secondCurrency').data('oldVal')) { this.selected = true; $('.currency-converter #firstCurrency').data('oldVal', this.text); } });
                 }*/
                updateAmounts('');
                $('.currency-converter #secondCurrency').data('oldVal', $('.currency-converter #secondCurrency :selected').text());
            });
            $('.currency-converter #firstCurrencyInput').keyup(function() {
                updateAmounts('firstCurrency');
            });
            $('.currency-converter #secondCurrencyInput').keyup(function() {
                updateAmounts('secondCurrency');
            });
        }
		
		function midMarketAjaxCall(){
			 //alert("ajaxCall");

				var loadUrl=document.getElementById("currencyRefreshURL").value;
				//alert(loadUrl.trim());
				if(loadUrl !='' && loadUrl != 'undefined' && loadUrl != null){
					$('#mid-market-refresh').css('background','none');
					$('#mid-market-refresh').html('<img src="/iwov-resources/images/ajax-loader.gif"/>');

					$.ajax({
									type: 'POST',
									url: loadUrl,
									cache:false,
									async:true,
									dataType : 'html',
									success: function(data) {
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
            $('.currency-converter #firstCurrency').change(function() {
                updateAmounts('');
                $('.currency-converter #firstCurrency').data('oldVal', $('.currency-converter #firstCurrency :selected').text());
            });

            $('.currency-converter #secondCurrency').change(function() {
                updateAmounts('');
                $('.currency-converter #secondCurrency').data('oldVal', $('.currency-converter #secondCurrency :selected').text());
            });
            $('.currency-converter #firstCurrencyInput').keyup(function() {
                updateAmounts('firstCurrency');
            });
            $('.currency-converter #secondCurrencyInput').keyup(function() {
                updateAmounts('secondCurrency');
            });
        }	*/											
									},
									error: function(XMLHttpRequest,textStatus,errorThrown) {
												//	alert("error while loading the page");
									},
									complete: function(XMLHttpRequest, status) {
									}
					});
				}
		}
		$("#mid-market-refresh").off("click").on("click",midMarketAjaxCall);

    }
    ,
	
		
    topNavSearch: function() {
       
        $("#search")
                .keypress(
                        function(e) {
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
                        function() {
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
                            function() {
								if(document.documentMode<9){
									$(this).keydown(function(){
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
        function googleSearchmobile(query) {
		
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
                        function(e) {
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
                        function() {
                            var searchQ = document
                                    .getElementById('searchmobile');
                            var query = searchQ.value;
                            googleSearchmobile(searchQ.value);
                        });
    },
    placeholderModernizr: function() {
 
        if (!Modernizr.input.placeholder) {
            function add() {
                if ($(this).val() === '') {
                    $(this).val($(this).attr('placeholder')).addClass('placeholder');
                }
            }
            function remove() {
                if ($(this).val() === $(this).attr('placeholder')) {
                    $(this).val('').removeClass('placeholder');
                }
            }
            // Create a dummy element for feature detection
            if (!('placeholder' in $('<input>')[0])) {
                // Select the elements that have a placeholder attribute
                //$('input[placeholder], textarea[placeholder]').blur(add).focus(remove).each(add);
				//JAYARAJ : changed to support the future elements
                $('input[placeholder], textarea[placeholder]').each(add);
                $('body').delegate('input[placeholder], textarea[placeholder]',"blur", add);
                $('body').delegate('input[placeholder], textarea[placeholder]',"focus", remove);
                // Remove the placeholder text before the form is submitted
                $('form').submit(function() {
                    $(this).find('input[placeholder], textarea[placeholder]').each(remove);
                });
            }
        }
    }
    ,
    miniCarousel: function() {

        $(function() {
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

$('.carousel-indicators > li ').click(function() {

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

$('.overlay-promo-widget > a').click(function() {
	
	var carouseDirection=$(this).attr('data-slide');
	var scope=this;
	$(this).prev().prev().children().each(function(i,val){
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

	/* IN689805 - BAU fix - Scrolling bug on POSB mobile site - start */
	/* if ($(window).width() < 768){
		$('#promotion-mobile').on('touchend', function(){
		pageLevelComponents.miniCarousel();
		});
	} */
	
	/*if ($(window).width() < 768){
        $('#promotion-mobile').on('touchstart', function(){
                return false;
        });
	}*/
/* IN513505 - BAU fix - end */
	/* IN689805 - BAU fix - Scrolling bug on POSB mobile site - end */

 }
    ,
    footer: function() {
			//alert($('#footer-content').width());
			//alert($('#footer-content .right-section').width());
			 //$('#footer-content .left-section').width((($('#footer-content').width()-$('#footer-content .right-section').width())-1)+'px');
			 //alert($('#footer-content').css('width'));
			 var footerWidth = ((parseInt($('#footer-content').css('width'))-parseInt($('#footer-content .right-section').css('width')))-1)+'px';
			$('#footer-content .left-section').css('width', footerWidth);
			//$('#footer-content .left-section').width('100px');
			//alert($('#footer-content .left-section').width());
            $('.back-to-top').click(function() {
                $('body,html').scrollTop(1);
                return false;
            });
            //[2013-11-13 Howell] Added - BEGIN
            if (status == "recognized" && $(".your-dbs-hero-block").length > 0) {
				$("#footer-rightSection").hide();
                $("#manageYourProfile").show();
                $("#forget-modal-trigger").click(function() {
					$("#forgetModal").modal('show');
                });
            } else {
				$("#manageYourProfile").empty().hide();
				$("#footer-rightSection").show();
                
            }
            //[2013-11-13 Howell] Added - END			
        
    }
    ,
    siteButton: function() {
        $("a > button.btn").on('click', function() {
            location.href = $(this).closest("a").attr("href");
        });
    },
    businessSegmentTabIndex: function() {


        var tabindex = 1;
        $(".business-segment")
                .each(
                        function() {


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
    splitter: function() {
        $('.splitter-panel').each(function(index, element) {
            $('.splitter-tile').bind('mouseover', function(e) {
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
            $('body').bind('mouseover', function() {
                $('.splitter-tile-overlay.open').delay(30).clearQueue();
                $('.splitter-tile-overlay.open').delay(30).stop();
                $('.splitter-tile-overlay.open').removeClass('open').animate({
                    opacity: '1'
                }, 300).show();
            });
        });
    },
    addBodyClass: function() {



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
    articleBrowser: function() {
        /* [29-05-2013] Added by Ravi - iPhone to display the tabs for visible phone - START */
        if ($('.article-browser ul.visible-phone').css("display") != "none") {
            var active_idx;
            $('.article-browser ul.tabbed-nav.article.hidden-phone li').each(function(i, element) {
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
        $(".article-browser .article.tabbed-nav li").click(function(eventObject) {
            $('.article-browser .article li.active').removeClass('active');
            var $selectedLi = $(this);
            $('.article-browser .show').addClass('hide');
            $('.article-browser .show').removeClass('show');
            var category = $selectedLi.data('category').replace(/([ #;?&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');
            $('.article-browser .article [data-category="' + category + '"]').addClass('active');
            var active_idx;
            $('.article-browser ul.tabbed-nav.article.hidden-phone li').each(function(i, element) {
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
        
		mainNavURLPrefix:function(){
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
		aicsHero:function () {
  
	  	
	  if ($('.homepage-hero-module ul.visible-phone').css("display") != "none") {
		  var active_idx;

		  $('.homepage-hero-module ul.tabbed-nav.block.hidden-phone li').each(function (i, element) {
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
  	   

    $(".homepage-hero-module .block li").click(function (eventObject) {

      $('.homepage-hero-module .block li.active').removeClass('active');

      var $selectedLi = $(this);

      $('.homepage-hero-module .show').addClass('hide');
      $('.homepage-hero-module .show').removeClass('show');

      var category = $selectedLi.data('category').replace(/([ #;?&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');

      $('.homepage-hero-module .block [data-category="' + category + '"]').addClass('active');

      var active_idx;

      $('.homepage-hero-module ul.tabbed-nav.block.hidden-phone li').each(function (i, element) {
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
                $("#email-address").on("keypress", function (e) {
                    var code = (e.keyCode ? e.keyCode : e.which);
                    if (code == 13) {
                        $(".subscribe-block #subscribe-submit").trigger('click');
                    }
                });
				$('#YourDBSdisclaimerCheckBox_SubscribeBlock').on('click',function () {
				$('#YourDBSdisclaimerCheckBox_SubscribeBlock').removeClass('error')
				});
                $(".subscribe-block #subscribe-submit").on('click', function () {
			 
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
							var request = new AjaxRequest(formUrl, function (xmlDoc) {
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
							var request = new AjaxRequest(formUrl, function (xmlDoc) {
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
		 
			 profileAnalytics:function (){
			 
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
									success : function(data) {
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
									error : function() {
									
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
					addFreeText:function(){
					
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
articeDetailSignup:function () {
		//$('#registeredModal div.modal-header button.close').click( function(){$('button.close').parent().siblings('.modal-footer').children('a#dropout-no-thanks').click()})
		$('#registeredModal div.modal-header button.close').click( function(event){
		  if(navigator.userAgent.match(/iPhone|Android|BlackBerry|Mobile/i)){
		    $('body').css({'position' : '', 'overflow' : ''}); // [Date: 17-10-2013] add Ravi Samsung Fix 
		  }
		  event.stopImmediatePropagation();window.scrollTo(0, 0);location.reload();
		})
		$('div.modal-backdrop').click( function(event){
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
                $("#email-address").on("keypress", function (e) {
                    var code = (e.keyCode ? e.keyCode : e.which);
                    if (code == 13) {
                        $("#subscribe-submit").trigger('click');
                    }
                });
				$('#YourDBSdisclaimerCheckBox_Subscribe').on('click',function () {
				$('#YourDBSdisclaimerCheckBox_Subscribe').removeClass('error')
				});
                $("#subscribe-submit").on('click', function () {
				
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
							var request = new AjaxRequest(formUrl, function (xmlDoc) {
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
						var request = new AjaxRequest(formUrl, function (xmlDoc) {
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
		splitterSearchModel: function(){
						$("a#modal-click1").on("click",function() {
							$("#overlay").fadeIn();
							$("div#modal-dialog1").fadeIn(500);
						});

						$("a#modal-click2").on("click",function() {
							$("#overlay").fadeIn();
							$("div#modal-dialog2").fadeIn(500);
						});

						$("a#modal-click3").on("click",function() {
							$("#overlay").fadeIn();
							$("div#modal-dialog3").fadeIn(500);
						});

						$("div#modalCloseBtn img").on("click",function() {
							$("#overlay").fadeOut(500);
							$("div.modal-dialog").fadeOut();
						});
						
						$("#search-shb")
												.keypress(
														function(e) {
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
														function() { 
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
									searchnewValidation:function (){
var MonthFrom = $('#monthFromSelect');
var MonthTo = $('#monthToSelect');
var YearFrom = $('#yearFromSelect');
var YearTo = $('#yearToSelect');
MonthFrom.change(function() {
 if(MonthFrom.val() >= MonthTo.val() && YearFrom.val() == YearTo.val())
 {
MonthTo.val($(this).val());
}
});
                                                                                                                                                
MonthTo.change(function() {
if(MonthTo.val() <= MonthFrom.val() && YearFrom.val() == YearTo.val())
 {
 MonthFrom.val($(this).val());
 }
 });
                                                                                                                                                                
YearFrom.change(function() {
 if(YearFrom.val() > YearTo.val())

 {
YearTo.val($(this).val());
}
                                                                                                                                                                                
 if(MonthFrom.val() >= MonthTo.val() && YearFrom.val() == YearTo.val())
{
MonthTo.val($(MonthFrom).val());
 }
});
                                                                                                                                                
 YearTo.change(function() {
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
			$('#product-nav li').css('width', 100/itemCount+'%').css('width', '-=1.4px');
			if(itemCount==4)
			{ 
				$('#product-nav li:last').css('width', 100/itemCount+'%').css('width', '-=1.4px');
			}			

			if(itemCount>5)
			{
				$('#product-nav li:last').css('width', 100/itemCount+'%').css('width', '-=2px');
			}
		}
		else
		{
			if(itemCount>4)
			{
				$('#product-nav li').css('width', 100/itemCount+'%').css('width', '-=1.4px');
			}
			else {
				$('#product-nav li').css('width', 99.8/itemCount+'%').css('width', '-=1.4px');
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
tabArticleBrowserMarkets:function () {
  
	  	
	  if ($('.article-browser-markets ul.visible-phone').css("display") != "none") {
		  var active_idx;

		  $('.article-browser-markets ul.tabbed-nav.article.hidden-phone li').each(function (i, element) {
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
  	   

    $(".article-browser-markets .article.tabbed-nav li").click(function (eventObject) {

      $('.article-browser-markets .article li.active').removeClass('active');

      var $selectedLi = $(this);

      $('.article-browser-markets .show').addClass('hide');
      $('.article-browser-markets .show').removeClass('show');

      var category = $selectedLi.data('category').replace(/([ #;?&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');

      $('.article-browser-markets .article [data-category="' + category + '"]').addClass('active');

      var active_idx;

      $('.article-browser-markets ul.tabbed-nav.article.hidden-phone li').each(function (i, element) {
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
  tabArticleBrowserInsights:function () {
	  if ($('.article-browser-insights ul.visible-phone').css("display") != "none") {
		  var active_idx;

		  $('.article-browser-insights ul.tabbed-nav.article.hidden-phone li').each(function (i, element) {
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
  	   

    $(".article-browser-insights .article li").click(function (eventObject) {

      $('.article-browser-insights .article li.active').removeClass('active');

      var $selectedLi = $(this);

      $('.article-browser-insights .show').addClass('hide');
      $('.article-browser-insights .show').removeClass('show');

      var category = $selectedLi.data('category').replace(/([ #;?&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');

      $('.article-browser-insights .article [data-category="' + category + '"]').addClass('active');

      var active_idx;

      $('.article-browser-insights ul.tabbed-nav.article.hidden-phone li').each(function (i, element) {
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
   tabArticleBrowserEconomics:function () {
  
	  	
	  if ($('.article-browser-economics ul.visible-phone').css("display") != "none") {
		  var active_idx;

		  $('.article-browser-economics ul.tabbed-nav.article.hidden-phone li').each(function (i, element) {
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
  	   

    $(".article-browser-economics .article li").click(function (eventObject) {

      $('.article-browser-economics .article li.active').removeClass('active');

      var $selectedLi = $(this);

      $('.article-browser-economics .show').addClass('hide');
      $('.article-browser-economics .show').removeClass('show');

      var category = $selectedLi.data('category').replace(/([ #;?&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1');

      $('.article-browser-economics .article [data-category="' + category + '"]').addClass('active');

      var active_idx;

      $('.article-browser-economics ul.tabbed-nav.article.hidden-phone li').each(function (i, element) {
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
   viewAllAICSButtonClass:function(){
   
   $("h2.section-title").each(function(){$(this).find("button").removeClass("btn-primary").addClass("btn-small");});
   
   },
  tempQAGITIconChange:function(){
  

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
 fitTabContent:function(){


    $(".tabbed-content").each(function() {
        $thiselement = $(this);
        $(this).parents().each(function() {
           
            if ($(this).attr('class') == 'span8')
            {
                
                $thiselement.find(".tabcontent").each(function(i) {
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
FlyGIT:function () {

	var isPhone = true;
	if ($('.hidden-phone').is(":visible")) {
		isPhone = false;
	}

	var dataIntervalGIT = $('.GIT-container').data("interval");

		$.loginHomeMenu = function(minWidth,maxWidth,dataIntervalGIT){
		var loginWrap = $('.GIT-container.flyoutGIT');
		var loginTouch = $('.GIT-container.flyoutGIT .col4-module.get-in-touch');
		loginWrap.on('mouseover', function() {
			showGIT();
		}).on('mouseout', function() {
			hideGIT();
		}).find('img').on('click', function(e) {
			 e.stopPropagation();
			//showGIT();
			 //return false;
		});
		
		if(isPhone && $(window).width()>768){
			$('body').on({ 'touchstart' : function(e){ 
				if(e.originalEvent.touches[0].pageX<670 || e.originalEvent.touches[0].pageY>379){
					hideGIT();
				}
			} 
			});
		}				

		
		function hideGIT() {
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
		setTimeout(function() {
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
	function populateDropdownQuestion1(obj) {
		if (obj == undefined) {
			obj = $('.cardMenu.dropdown-menu li:first');
		}

		loansDropdown = $('.loansMenu'),
		options = $(obj).data('options');
		loanOptions = '<option value="">' + $('.loansMenu option:first').html() + '</option>';
		$(options).each(function(index, option) {
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

	$('.loansdropdownvariant .cardMenu.dropdown-menu li,.loanstextvariant .cardMenu.dropdown-menu li').on('click',function() {
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
	

	$('#question1,#question2').on("propertychange keyup input paste", function(event){

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
	$('.loans-items input').on('keyup', function() {
		areFieldsEmpty = false;
		$('.loans-items input').each(function(index, obj) {
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
	$('.loansMenu').on('change', function () {
	
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
				$(subOptions).each(function(index, subOption) {
					loanSubOptions += '<option value="' + subOption.link + '"data-target=' + JSON.stringify(subOption.target) +'>' + subOption.label + '</option>';
				});
				loansSubMenu = $('.loansSubMenu');
				loansSubMenu.html('');
				loansSubMenu.append(loanSubOptions);
				loansSubMenu.removeAttr('disabled');
				loansSubMenu.closest('.customDropdown').removeClass('disabled');
				$('.loansSubMenu').on('change', function () {
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

	$('.pagehero .btn ').on('click', function(e) {
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
		

	$('.displayTitle ').on('click',function(){
		var headerMenu = $('.dropdown.open');
		if(headerMenu.length != 0 && headerMenu.hasClass('open')){
			headerMenu.removeClass('open');
		}
	});
	$('.dropdown-toggle').on('click',function(){
		$('.cardMenu').hide()
	});
	  populateDropdownQuestion1();
	
 
	}
	,
	megaMenu:function()
	{
	
 
	$('.mydropdown-menu').on('mouseover', 'a', function (e) { 
         $(this).parent().addClass('activeLink').siblings().removeClass('activeLink');
        var linkId = $(this).attr('id');
          linkId = linkId.substring(4);
		//console.log("linkid->"+linkId);
        $('#' + linkId).show().siblings().hide().first('span3').show();
	 
		e.stopPropagation();
    });
	$("ul.megamenu > li .megapanel").on('mouseover',  function (e) {e.stopPropagation(); });
	$(".megapanel").on("mouseleave", function () {
			
		  $(this).find('.mydropdown-menu li').removeClass('activeLink').first().addClass('activeLink');
         //   $(this).stop().fadeOut()
        });
		
		$.fn.megamenu = function (e) {
    function r() {
	 
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

    function i() {
		
		 
		 
		  
        $("ul.megamenu > li").bind("mouseover", function () {
		
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
		
		 .bind("mouseleave", function () {
			
			
            $(this).children(".dropdown, .megapanel").stop().fadeOut(t.interval)
        }) 
		 
		  
    }

    function s() {
        $(".megamenu > li > a").bind("click", function (e) {
            if ($(this).siblings(".dropdown, .megapanel").css("display") == "none") {
                $(this).siblings(".dropdown, .megapanel").slideDown(t.interval);
                $(this).siblings(".dropdown").find("ul").slideDown(t.interval);
			    n = 1
            } else {
                $(this).siblings(".dropdown, .megapanel").slideUp(t.interval)
            }
        })
    }

    function o() {
        $(".megamenu > li.showhide").show(0);
        $(".megamenu > li.showhide").bind("click", function () {
            if ($(".megamenu > li").is(":hidden")) {
                $(".megamenu > li").slideDown(300)
            } else {
                $(".megamenu > li:not(.showhide)").slideUp(300);
				$(".megamenu > li.showhide").show(0)
            }
        })
    }

    function u() {
        $(".megamenu > li").show(0);
        $(".megamenu > li.showhide").hide(0)
    }
    var t = {
        interval: 100
    };
    var n = 0;
    $(".megamenu").prepend("<li class='showhide'><span class='title'>MENU</span><span class='icon1'></span><span class='icon2'></span></li>");
     r();
    $(window).resize(function () {
       // r()
    })
	}
	$(".megamenu").megamenu();
	
	 
	},
	creditcardHomeBanner:function()
	{
	
	if (isPhone){
 
		$("#FindOffersDrp").on('change', function(){
			var selectedVal = $("#FindOffersDrp option:selected").attr("id");
			$(".latestoffers-default-mobile").find("div[data-name]").removeClass("show").addClass("hide");
			$(".latestoffers-default-mobile").find("div[data-name="+selectedVal+"]").addClass("show");
		});
			

		var $mobileLatest = $('#latestoffers-mobile.carousel').carousel();
	  /*
		$('#latestoffers-mobile').on('swipeleft', function(e) {
			$mobileLatest.carousel('next');
		});
		$('#latestoffers-mobile').on('swiperight', function(e) {
			$mobileLatest.carousel('prev');
		});
		*/
		/*
		if(document.getElementById('latestoffers-mobile')!=null)
		{ 
		document.getElementById('latestoffers-mobile').addEventListener('swl',function() {
			$mobileLatest.carousel('next');
		},false);
		}
		
		if(document.getElementById('latestoffers-mobile')!=null)
		{
		document.getElementById('latestoffers-mobile').addEventListener('swr',function() {
			$mobileLatest.carousel('prev');
		},false);
		}
		*/
		
	  
		var $mobileHero = $('#mobileCarousel.carousel').carousel({
			interval: false, wrap: true
		});
	  /*
		$('#mobileCarousel').on('swipeleft', function(e) {
			$mobileHero.carousel('next');
		});
		$('#mobileCarousel').on('swiperight', function(e) {
			$mobileHero.carousel('prev');
		});
	*/
	/*
	if(document.getElementById('mobileCarousel')!=null)
	{
	document.getElementById('mobileCarousel').addEventListener('swl',function() {
			$mobileHero.carousel('next');
		},false);
	}
	
	if(document.getElementById('mobileCarousel')!=null)
	{
	document.getElementById('mobileCarousel').addEventListener('swr',function() {
			$mobileHero.carousel('prev');
		},false);
	}
	*/
	
		var $mobilelatestoffers = $('#latestoffers.carousel').carousel();
	/*	
		if(document.getElementById('latestoffers')!=null)
	{
	document.getElementById('latestoffers').addEventListener('swl',function() {
			$mobilelatestoffers.carousel('next');
		},false);
	}
	
	if(document.getElementById('latestoffers')!=null)
	{
	document.getElementById('latestoffers').addEventListener('swr',function() {
			$mobilelatestoffers.carousel('prev');
		},false);
	}
	*/
		
	}
	 

	
	$.latestOffersMenuInit = function(){ 
			$('#subnav').children('li').on('click',function(){
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
			$('#loans-more') .on('click','.dropdown-menu li', function() {
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
			$('#loans-more ul.dropdown-menu li').click(function(e){
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
	
		$( ".card-options" ).on("click", ".btn", function() {
	  if (!$(".latestoffers-flyout").is(":visible")) {
		$(".latestoffers-flyout").flyInorOut();
		/*$('html, body').animate({
		scrollTop: $("#latest-offers-flyout").offset().top
		}, 800);*/

	  }
	});
	/*
	$("a.cursor-hand").on('click', function (){
		$('html, body').animate({
			scrollTop: $(".latestoffers-default-mobile").offset().top
		}, 800);
	});
	*/
	
	
	$(".latestoffers-flyout .hide-switch a").on("click", function() {
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


		$('.caption-back-left').on('click',function() { 
			$('#myCarousel').carousel('prev');
			$('#myCarouselNav').carousel('prev');
		});
		$('.caption-back-right').on('click',function() {
			$('#myCarousel').carousel('next');
			$('#myCarouselNav').carousel('next'); 
		});
		
var exec_a1 = true;

function animateEle(e) {    
			 $('.navigation.carousel .item').each(function () {
		 
			 $(this).off('click touchstart', animateEle);
			 });  
				e.stopPropagation(); clearAllTimers(); 
				if(!$('.navigation.carousel .carousel-inner').is(':animated')){
					$(this).parent().children('.active').removeClass('active');
					$(this).addClass('active');
					slidingNav( $(this).index(),e);
					 navigationInterval = setInterval(slidingNav, dataIntervalTiming);
					
						setTimeout(function () { 
				   $('.navigation.carousel .item').each(function () { 
				   
		 	 $(this).on('click touchstart', animateEle); 
			 }); 
			 }, speed+200); 
				} 
				 
			
			}
 		
		$('.navigation.carousel .item').each(function () {

		$(this).show()
			.data('id', id)
			.on('dblclick', function (e) {return;});
		$(this).show()
			.data('id', id)
			.on('click touchstart', animateEle);
		id++;
		});
		
		if (isPhone) { 
			$('.navigation.carousel').on('touchstart', function (e) {
				//prevents scrolling
				e.preventDefault();
			});
			$('.navigation.carousel').on('tap', function (e) {
				startTimeout();
				slidingNav();
				e.stopPropagation();
				e.preventDefault();
			});
		}
		
		   $('#secondtabcarousel')
        .on('mouseover', function () {
            clearAllTimers();
        })
        .on('mouseout', function () {
            //startTimeout();
			navigationInterval = setInterval(slidingNav, dataIntervalTiming);
		 
        });
		
		/* the following deals with the sliding hero block */
		var speed =0;
		function slidingNav(pos,e) { 
	 
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
				$('.navigation.carousel .item').each(function () {
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
				
				//added for bau change 25-06-15--Start
				$('.navigation.carousel .item').each(function () {  
				   $(this).off('click touchstart', animateEle);
				}); 
				//added for bau change 25-06-15--End
				
				$('.navigation.carousel .carousel-inner') 
					.stop().animate({
						'left': -left
					}, speed, function () {
					
						//added for bau change 25-06-15--Start
						$('.navigation.carousel .item').each(function () {  
                            $(this).on('click touchstart', animateEle);
						});
						//added for bau change 25-06-15--End

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
					}, speed, function () {
					 $(last).remove();
					});
			}
		
		}
		function startSlider() {
			 clearAllTimers();
			 slidingNav(); //call it straight away
			 navigationInterval = setInterval(slidingNav, dataIntervalTiming);
			 
		}
		function startTimeout() {
			 clearAllTimers();
			navigationTimeout = setTimeout(startSlider, dataIntervalTiming);
		 
		}
		function clearAllTimers() {
		 
			 
			clearInterval(navigationInterval);
			 
			clearTimeout(navigationTimeout);
		}
		
		if(!isPhone){
			startTimeout();
		}
	 
	 
		$(window).on("orientationchange", function(event) { 
			var isPhone = true;
			if ($('.hidden-phone').is(":visible")) {
				isPhone = false;
			}
			if(!isPhone){
				$('.navigation.carousel .item').each(function () {
				 
				 
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
		
		
		HeroBannerMobile=function() {
			var   interval = undefined,
				pointer = 0;
			var show = function(direction) {
			var $content = $('#myCarousel .item').eq(pointer);
			var $active   =  $('#myCarousel  .item').eq(pointer);
			$('#myCarousel .carousel-inner ').animate({left: (direction == 'right' ? '100%' : '-100%')}, 200, function(){ 
				$('#myCarousel .item').removeClass('active');
				$('#myCarousel .item').eq(pointer) .addClass('active');
				$('#myCarousel .carousel-inner').attr('style','left:0;');
			});

			$('.landing-page-hero-tiles.mobile-controls  div').animate({left: (direction == 'right' ? '100%' : '-100%')}, 200, function(){ 
				var text = $('#myCarouselNav .item').eq(pointer).find("span").text();
				$('.landing-page-hero-tiles.mobile-controls .tile.text').text(text);
				$('.landing-page-hero-tiles.mobile-controls .tile.text').attr('style','left:0;');
				var text = $('#myCarouselNav .item').eq(pointer).find("p").text();
				$('.landing-page-hero-tiles.mobile-controls .tile.text+p').text(text);
				$('.landing-page-hero-tiles.mobile-controls .tile.text+p').attr('style','left:0;');
			});
			};
			var timefunc;
			function resetInterval() {
				var t = $('#myCarousel').data('interval');
				if(isNaN(t)||(t==0))
				{t=5000;}

				timefunc = setTimeout(function() {
					pointer++;
					if (pointer == $("#myCarouselNav .item").length ) {
						pointer = 0;
					}
					show('left');
					resetInterval();
				}, t);
			}


				resetInterval();
			$('.landing-page-hero-tiles.mobile-controls .tile:not(.text)').click(function(eventObject) {
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
			}
			
			if($("#pageHeroCarousel").length == 0) {
				HeroBannerMobile();
			}
			else
			{
				var $carousel = $('.heroMainCarousel.carousel').carousel({
				interval: $('#myCarousel').data('interval')
				});
			}

		}
	,
	cardsMenu:function()
	{
	
	},
	notification:function()
	{
		$('.notification-header').click(function () {
        showNotification();
    });
    $('.close-button').click(function () {
        closeNotification();
    });
	

			 
	 $('.notificaton-close').on("click",notificationajaxcall);
	
	
    $('#slideDownLink').click(function () {
        hideNotification();
    });
	function showNotification() {
       $('.notification-container').slideDown('slow');	
}
function hideNotification() {
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
	 
$(window).scroll(function () {

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
	creditCardBanner:function () {
/*
	* @Description: Homepage cards dropdown menu trigger
	* @Element: displayTitle, cardMenu
	*/
	$.cardMenuInit = function(isPhone){
		$('  .dropdown-cards ').on("click", ".displayTitle", function(e) { 
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
	
		$('.cardMenu.dropdown-menu').on("click", "li", function() {
			var _this = $(this);
			_this.parent().find('.active').toggleClass("active");
			_this.toggleClass("active");
			var text = $(this).data('name').replace("_"," ");
			  $(" .displayTitle ").text(text).append($("<i/>").addClass("arrow-down"));
			$('.dropdown-menu').fadeOut();
		  
			if (isPhone){
				$('.mobile-hero .cardMenu').fadeOut();
				$(".displayTitle.active").removeClass("active").find("i").removeClass().addClass("arrow-down");
				$('#mobileCarousel').fadeOut(500, function() {
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
						
		}).on('mouseleave', function() {
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

$("body").on("click",".container", function(e) { 
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
    success: function (xml) {
	
		$xml=$(xml).find("#cardxmlval").html();
		 if($.browser.msie && (parseInt($.browser.version, 10) < 10))
			xml= $.parseXML($xml);
		else 
			xml=$xml;
			
			 
		var itemList='',cardsArr=[];
        var cardCarouselTemplate = 
            [

              '<div class="span3 positionrelative">', '<div class="card_tick"><img  src="images/tick_bullet_red.png" /></div>',
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
			
			$(xml).find('label').each(function() {
				labelId = $(this).attr('id');
				labelText = $(this).find('text[lang="'+language+'"]').text();
				labels[labelId] = labelText;
				
			});
		var heroDropdownVal = [];
		
			$(xml).find('herodropdownmenu').find('item').each(function() {
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








			 
		
		$(cards).each(function() {    
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
			
		$('.mobile-hero .dropdown-cards .dropdown-menu li,.creditcards .dropdown-cards .dropdown-menu li').on("click", function(e) { 
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

 
	
	 
	  $('.dropdown-toggle').on('click',function(){
		$(".cardMenu").fadeOut();
	});
 


 

 
	/*
	* @Description: Find a card that's best section
	* @Param: cards - Display cards lists based on the category selected (Shopping,fuel, travel,dining, etc..) --- Updated for static card list
	*/
	$.displayCardsHero = function(cards){
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
			/* IN527110 Fix for IOS 8 Safari Browser issue for display of cards - START*/
			// $("#cardMagic1 li:nth-child(1)").addClass("fourthLI");
			// $("#cardMagic1 li:nth-child(2)").addClass("thirdLI");
			// $("#cardMagic1 li:nth-child(3)").addClass("secondLI");
			// $("#cardMagic1 li:nth-child(4)").addClass("firstLI");
			if(isIOS8()){
				$("#cardMagic1 li:nth-of-type(1)").addClass("fourthLI");
				$("#cardMagic1 li:nth-of-type(2)").addClass("thirdLI");
				$("#cardMagic1 li:nth-of-type(3)").addClass("secondLI");
				$("#cardMagic1 li:nth-of-type(4)").addClass("firstLI");    
			}else{
				$("#cardMagic1 li:nth-child(1)").addClass("fourthLI");
				$("#cardMagic1 li:nth-child(2)").addClass("thirdLI");
				$("#cardMagic1 li:nth-child(3)").addClass("secondLI");
				$("#cardMagic1 li:nth-child(4)").addClass("firstLI");                                          
			}
			/* IN527110 Fix for IOS 8 Safari Browser issue for display of cards - END*/	
			 	
			
		if ($.browser.msie && $.browser.version <= '9.0'){
			$("#cardMagic1 li").find("img").hover(function(){
				$(this).closest("li").stop().animate({
					top : "-30px",
					left : "-5px"
				},200);
			});
			$("#cardMagic1 li").find("img").mouseout(function(){
				$(this).closest("li").stop().animate({
					top : "0px",
					left: "0px"
				},200);
			});
		}else{
			$("#cardMagic1 li").find("img").hover(function(){ 
			$("#cardMagic1 li:nth-child(4)").css('width','200px'); 
				$(this).closest("li").stop().animate({
					top : "-30px",
					left : "-5px",  
				},500,'swing');
			});
			$("#cardMagic1 li").find("img").mouseout(function(){
				$(this).closest("li").stop().animate({
					top : "-10px",
					left: "0" , 
				},500,'swing');
			});
		}
		
		$('.card').on('click', function() {
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
	$.filterCategoryCards = function(cardsArr,categoryName){
		var cards=[];
		if(cardsArr.length!=0 && categoryName.length!=0)
		$.each(cardsArr, function( index, obj ) {
			//Loop in to the category list items
			$.each(obj.category,function(j,categoryObj){
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
	$.getCategoryList=function(cardCategory){
		var categoryListArr = [];
		cardCategory.each(function(){
			categoryListArr.push($(this).text());
		});
		return categoryListArr;
	}
	/*
	* @Description: Find the Latest Offers Menu
	* @Param: _element - On click of tab menu; toggle icons to active state.
	*/
	$.toggleIconClass = function(_element){
		var classes = _element.find('i').attr('class');
		var data = _element.find('i').data('toggle');
		_element.find('i:first').removeClass().addClass(data).data('toggle',classes);
	}
	/*
	* @Description: Find the Latest Offers Menu
	* @Param: _element, targetName - On click of tab menu; search box information
	* toggles based on the selection
	*/
	$.toggleLoansSearch = function(_element,targetName){
		_element.children('div[data-name]').addClass('hide');
		_element.find('div[data-name="'+targetName+'"]').toggleClass('hide');
	}
	 
	
	 
	 
 
/*
 *@Title: Creditcards Flyout 
 *@Description: On click of the sub-tab navigation, "Compare Cards" content animation effect to be shown.
 */
 
  $.fn.flyInorOut = function(speed, offset) {
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
 
	$.fn.exchangePositionWith = function(selector) {
		var other = $(selector);
		var that = this;
		$('#cardMagic .card').reverse().each(function(i) {
		   var that = this;
			setTimeout(function() {
			  $(that).fadeOut(200, function() {
				var l = $('#cardMagic .card').length;
	
				setTimeout(function() {
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
	$("#mobileCarousel").on("click",".cardsmodelopen_mobile",function(e){

   
	  e.preventDefault();
				$.ajax({
			type: 'POST',
			url: $(this).attr('href'),
			cache:false,
			async:true,
			dataType : 'html',

			success: function(data) {
 
				$('#cards').html($(data).find('#cards').html());
				  $('#cards').modal({show:true});
			},
			error: function(XMLHttpRequest,textStatus,errorThrown) {

			} 

			});
			
	  
	 
	  e.preventDefault();
});*/

	$("#cardsmodelopen").on("click",function(e){

   
	  e.preventDefault();
				$.ajax({
			type: 'GET',
			url: $(this).attr('href'),
			cache:false,
			async:true,
			dataType : 'html',

			success: function(data) {
 
				$('#cards').html($(data).find('#cards').html());
				  $('#cards').modal({show:true});
			},
			error: function(XMLHttpRequest,textStatus,errorThrown) {

			} 

			});
			
	  
	 
	  e.preventDefault();
});


 $('body').append('<section id="cards" class="modal hide fade row span10" tabindex="-1" role="dialog" aria-labelledby="aNameToReferenceByLabel" aria-hidden="true"></section>');

 }
 ,
creditCardCompare:function () {
 
 
  
 
var allCards = [],
	categories = {},
	labels = {},
	compareLabels = {},
	labelId = {},
	labelTextHead = {},
	cardsPerContainer = 4;
	
	$.filterCategoryCards = function(cardsArr,categoryName){ 
		var cards=[];
		if(cardsArr.length!=0 && categoryName.length!=0)
		$.each(cardsArr, function( index, obj ) { 
			//Loop in to the category list items
			$.each(obj.category,function(j,categoryObj){ 
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
	$.getCategoryList=function(cardCategory){ 
		var categoryListArr = [];
		cardCategory.each(function(){ 
			categoryListArr.push($(this).text());
		});
		return categoryListArr;
	}
 
 
 
/*@Title: Cards manipulations
 *@Description: Swap cards and move cards
 */ 
var defaultCards = [];
var displayable = ['everyone']; //placeholder
function moveCard($this, event) { 
	var position = 0;
	if (event.type == "mouseover") {
	   position = parseInt(-20);
	} else {
	   position = 0;
	}
	var t = parseInt( $($this).data('id')  ) ;
	$('#cardMagic .card').eq(t).animate({'top': position }, 200);
}
function swapCard(target) { 
	var that = target;
	var t = parseInt( $(that).data('id') ) ;
	$('#cardMagic .card').eq(t).animate({'top': 0 }, 200);
	$('#cardMagic .card').eq(0).exchangePositionWith($('#cardMagic .card').eq(t));
	$(".cardselection").find("[data-target]:visible").fadeOut('fast', function() { 
		  setCardVisibleState(t);
	});
}
function setCardVisibleState(id) { 
	$(".cardselection").find("[data-target]:visible").hide();
	var group = [];
	id = id || 0;
	$.each(displayable, function( index, value ) { 
		for(var i = 0; i<2; i++) {
			var item = $(".cardselection").find("[data-target='"+value+"']")[i];
			group.push( $(item) );
		}	
	});
	$(group[id]).fadeIn('fast');
}
//setCardVisibleState();
 
$("button.compare").on("click", function() { 
	$("[data-category='compare']").click();
});


  
 
 
	
	$(".notice-flyouthidden").on("click", "a", function() { 
	  $(".comparison-flyout").flyInorOut();
	  $('#comparecards div.item').removeClass('left').removeClass('next');
	  $(".notice-flyouthidden").slideUp();
	});
/*
* @Title: Compare cards menu
* @Description: Removing of cards trigger initialization
*/ 
	$cardcomparexml= $("#cardxml_comparecards").val()  || "";
	var sections=[];
  if ($cardcomparexml != "") {
$.ajax({
    type: "GET",
    url: $cardcomparexml,
    dataType: "xml",
    success: function (xml) { var itemList='',cardsArr=[];
        var cardCarouselTemplate = 
			[
			'<div class="span3 positionrelative" data-category="{{categories}}">', '<div class="card_tick"><img src="images/tick_bullet_red.png" /></div>',
			' <img id="{{id}}" src="{{imgurl}}" class="cursor-hand cardsBorder">',
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
			$(xml).find('label').each(function() { 
				labelId = $(this).attr('id');
				labelText = $(this).find('text[lang="'+language+'"]').text();
				labels[labelId] = labelText;
			});
			$('section[data-flyout="compare"] span.seo-h2-section-title').html(labels.comparison_header);
			$('.hide-switch-label').html(labels.hide_switch);
			$('.comparecards span.seo-h2-section-title').html(labels.comparison_table_header);
			$('.comparecards .notice span.h3-mimic').html(labels.no_cards_added_warning);
			$('.cards-limit').html(labels.cards_limit_warning);
			$('.notice-flyouthidden .notice-message').html(labels.add_more_cards);
			
			
			var heroCategories = '', filterCategories = '',
				innerCarousel = $('<div>').append($('div[id^="comparecards"]').clone()).html();
			$(xml).find('categories').find('category').each(function(index, category) { 
				categoryId = $(category).attr('id');
				heroCategoryText = $(this).text();
			 
				 
				filterCategories += "<li data-category='"+categoryId+"'><a>"+heroCategoryText+"</a></li>";
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
			$(xml).find('comparelabels').find('section').each(function() { 
				var sectionId = $(this).attr('id');
				var sectionHeader = $(this).find('header[lang="'+language+'"]').text();
				var sectionSubHeaders = $(this).find('subheader[lang="'+language+'"]');
				var subHeaders = {};
				if (sectionSubHeaders.length > 0) {
					$(sectionSubHeaders).each(function(index, subheader) { 
						 subHeaders[$(subheader).attr('id')] = $(subheader).text();
					});
				}
				compareLabels[sectionId] = { 'header': sectionHeader, 'subheaders': subHeaders };
			});
		 
		var slides = '';
		var CardHeroMobile=[];
		
			$(xml).find('section').each(function(i) { 
			//console.log($(this));
			 
				sections[i]={};
				sections[i].id = $(this).attr('id');
				labelText = $(this).find('mainheader').text();
				//console.log("ttt->"+i);
				//console.log(sections[i]);
				  sections[i].subheaders=[];
				  var tempy=0;
				$(this).find('subheader').each(function(y) { 
				//console.log($(this)[0].id);
				sections[i].subheaders[y]={};
					sections[i].subheaders[y].id = $(this).attr("id");
					 sections[i].subheaders[y].header = $(this).find('header').text();
					sections[i].subheaders[y].bold = $(this).find('header').attr("bold");
					sections[i].subheaders[y].desc = $(this).find('desc').text();
					sections[i].subheaders[y].val=[];
					
						labelText1 = $(this).text();
						//console.log("fffffffff");
						//console.log(sections[i][y] );
						tempy=y;
				});
				//sections[i].header = $(this).find('mainheader').text();
				sections[i].header = {};
				sections[i].header.heading = $(this).find('mainheader').text();
				sections[i].header.val=[];
				sections[i].items={};
				sections[i].items.val=[];
				sections[i].moredetails=[];
				sections[i].cardlink={};
				sections[i].applylink={};
				sections[i].imgurl={};
			});
			 //console.dir(cards);
			  
			 var no_of_cards=0;
			$(cards).each(function() {
//console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
			
                var itemList = '';             
				var id = $(this).attr('id'),
				
				categoryList = $(this).find('categorylist').children(),
                cardName = $(this).find('section_1').find('header').text(),
                cardLink = $(this).find('section_1').find('cardlink').text(),
				imgurl = $(this).find('section_1').find('imgurl').text(),			
                applyLink = $(this).find('section_1').find('applylink').text();
                //console.log(name);
				
				   
			console.log("----------"+cardCarouselTemplate);
			cardContent = cardCarouselTemplate
								.replace('{{categories}}', $.getCategoryList(categoryList))
								.replace('{{name}}', cardName)
								.replace('{{id}}', id)
								.replace('{{imgurl}}', imgurl);
								console.log("cardContent->"+cardContent);
			cardPartial += cardContent;
			allCards.push(cardContent);
			console.log(allCards);
			if (((++cardIndex + 1) % cardsPerContainer === 0) || (cardIndex === totalCards - 1)) {
				cardContainerContent = cardContainerTemplate.replace('{{cards}}', cardPartial);
				slides += cardContainerContent;
				cardPartial = '';
			}
			var imgPath = imgurl;
			/*
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
			*/
			 //console.log(sections.length);
				for(var i=0;i<sections.length;i++)
				{
					name = $(this).find(sections[i].id).find('header').text();
					//console.log("gg->"+name);console.log(sections[i]);
					   //cardCarouselTemplate +=  ' data-name-'+sections[i].id+'="'+htmlEntities($(this).find(sections[i].id).find("header").text())+'"';
					   
						
						sections[i].header.val[no_of_cards]={};
						//console.log("avg->"+no_of_cards+"-"+$(this).find(sections[i].id).find("header").text());
						if($.trim($(this).find(sections[i].id).find("header").text())!=""){
					   sections[i].header.val[no_of_cards].card_id=id;
					    sections[i].header.val[no_of_cards].text=$(this).find(sections[i].id).find("header").text();
						}
					     sections[i].header.val[no_of_cards].cardlink=cardLink;
					 sections[i].header.val[no_of_cards].applylink=applyLink;
					 sections[i].header.val[no_of_cards].imgurl=imgurl;
					   
					for(var y=0;y<sections[i].subheaders.length;y++)
					{//console.log("yy");
						 
						   
						   
						   sections[i].subheaders[y].val[no_of_cards]={};
						   if($.trim($(this).find(sections[i].subheaders[y].id).text())!=""){
						   sections[i].subheaders[y].val[no_of_cards].card_id=id;
						    sections[i].subheaders[y].val[no_of_cards].text=$(this).find(sections[i].subheaders[y].id).text();}
						   
					}
					
					 items = $(this).find(sections[i].id).find('item');
					 	console.log(items);
					 	 sections[i].items.val[no_of_cards]={};
					$(items).each(function(g) { console.log("g->"+g);
						

						 
						 if($.trim($(this).text())!=""){

					sections[i].items.val[no_of_cards].card_id=id;
					sections[i].items.val[no_of_cards].item=$(this).text();
					}
					});
					
					 
					 sections[i].moredetails[no_of_cards]={};
					  if($.trim($(this).find(sections[i].id).find("moredetails").text())!=""){
					 sections[i].moredetails[no_of_cards].card_id=id;
					  sections[i].moredetails[no_of_cards].val=$(this).find(sections[i].id).find("moredetails").text();
					  }
					  
					   
				}
				
			 
			
				no_of_cards++;
			});
			//console.log(cardCarouselTemplate);
			
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
		   
			}
			
			
			});
}
 
	
	
	$('section[id^="cards"] .modal-body .span8 a span').on("click", function() { 
		if($(this).html() == labels.card_added){			
			 $("button.close").click();
			 $("[data-category='compare']").click();		 		  
		}else{
			getCardDetail($(this),'popup'); 
		}
	});

$("button.close").click(function(){ 
	$(".alert_message").hide();
});

 
	 
	 
	 
 var $compareCards = $('#comparecards').carousel({
	interval: 3000, wrap: true
}).on('slid', function(e) { 
	var i = $(this).find('.active').index();
	var count = $(this).find('.item').length -1;
});

var nav ="";
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
        $(allCards).each(function(index, cardPartial) { console.log('abc3844->      $(allCards).each(function(index, cardPartial) { ');
            selectedCards.push(cardPartial);
        });
    }
    else {
        //display only selected category
        var selectedCategory = $(this).data('category');
        $(allCards).each(function(index, cardPartial) { console.log('abc3851->      $(allCards).each(function(index, cardPartial) { ');
            var partialCategories = $(cardPartial).data('category').split(',');
            if ($.inArray(selectedCategory, partialCategories) !== -1) {
                selectedCards.push(cardPartial);
            }
        });
    }
    var totalCards = selectedCards.length;
    var slides = '';
    $(selectedCards).each(function() { console.log('abc3860->   $(selectedCards).each(function() { ');
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
$( "body").on("click","#mobile_compare" , function(e) {
    displayCompareCards();  
    
     $(window).on("scroll",function(){
 nav =  $('.fixedheading'); 
 if ($(window).scrollTop() >= 600) {
   
       $(nav).addClass('fixed'); 
    }
    else {  
       $(nav).removeClass('fixed');
    }


})
    e.preventDefault()
    });
$( "body").on("click",".cardsBorder" , function() {
var clickedId = $(this).attr("id");
var mobile=false;
 if(!$(".seo-h2-section-title1").is(':hidden')) {
mobile=true;
 }


      
	if($(this).hasClass("card-selected") ){	
		 
		var clickedId1=clickedId.toString();
		//$(this).removeClass('card-selected');	
		$(this).removeClass('card-selected').prev().hide();
		$(this).addClass('cardsBorder');
		$(this).fadeTo( 200, 1 );	
		 
		//cardCounting();
		$('.alert_message').css('display','none'); 
		$('section[id^="cards"] span[id='+clickedId+']').parent().find("i").removeClass().addClass('icon_add-red');
		$('section[id^="cards"] span[id='+clickedId+']').html(labels.add_card_to_comparison);
		console.log(selected_card);
		console.log($.inArray(clickedId1, selected_card));
		selected_card.splice($.inArray(clickedId1, selected_card),1);
         if((mobile==false)){
		 displayCompareCards();	

        }
	}	
	else if ( selected_card.length <3){ 
		selected_card.push($(this).attr("id"));
					 
			$('.comparecards .notice').parent().hide();
			$('.comparecards .heading-compare').show();
			$('section[id^="cards"] span[id='+clickedId+']').parent().find("i").removeClass().addClass('icon_add-tick');
			$('section[id^="cards"] span[id='+clickedId+']').html(labels.card_added);
			//$( '#comparecards img[id="'+clickedId+'"]').removeClass('cardsBorder');
			$( '#comparecards img[id="'+clickedId+'"]').addClass('card-selected').prev().show();
			$( '#comparecards img[id="'+clickedId+'"]').fadeTo( 200, 0.4 );
			 
			  if((mobile==false)){
			displayCompareCards();	
         }
    }


	  else{	

         

			$('.alert_message').css('display','block');
		 }	

          if((mobile==true)&&($(this).id!="mobile_compare"))
{
            if ( selected_card.length ==3)
                $('.seo-h2-section-title1').html('Selected: '+selected_card.length +' (Max)<a href="" id="mobile_compare" class="btn btn-primary">Compare</a>');

            else if ( selected_card.length <2)
                 $('.seo-h2-section-title1').html('Selected: '+selected_card.length +' <a   class="btn btn-primary  disabled">Compare</a>');
else
              $('.seo-h2-section-title1').html("Selected: "+selected_card.length +' <a href="" id="mobile_compare" class="btn btn-primary">Compare</a>');


      }



        
	//getCardDetail($(this),'img'); 
});

   



function getCardDetail(clickedObj,callFrm){ 
		var cardId = clickedObj.attr("id");
		if( selected_card.length < 4){
			displayCompareCards(clickedObj);			

		 }
		 else{	
			$('.alert_message').css('display','block');
		 }	
	}
	
	function displayCompareCards(){ 
		 		var table_data="";

 console.log(sections);
//console.log("ttt->"+selected_card);

//------------------------section1 Main card details
				var temp= sections[0];
				
					// console.log(temp.header.val);
					// console.log("bbbb->"+temp.header.val.length);
					 
					 var table_data_heading_hiddenphone=[];
                      var table_data_heading_visiblephone=[];
                       var table_data_image=[];
                        var table_data_applylink=[];
                         var table_data_applyibanking=[];
                          var table_data_remove=[];
					 var present_count=0;
					for (var zz=0;zz<temp.header.val.length;zz++) {
						// console.log("zz->"+zz+"-"+temp.header.val[zz].card_id);
					  	var table_data_label="";
					
					
					table_data_label  = '<div class="span3 heading-compare hidden-phone"><div class="creditcard_name">'+temp.header.heading+'</div></div>';
						 if(typeof(temp.header.val[zz].card_id)!="undefined"){
						 //	console.log($.inArray(parseInt(temp.header.val[zz].card_id), selected_card));
						 var position = $.inArray(temp.header.val[zz].card_id, selected_card);
						if( position != -1)
						{  // console.log("bbba->"+temp.header.val[zz].card_id);
							 
							 
table_data_heading_hiddenphone[position] = ' <div id="'+temp.header.val[zz].card_id+'" class="span3 cardItem subheading-compare" ><div class="col2header hidden-phone"><h3>'+temp.header.val[zz].text+'</h3></div></div>';							
table_data_image[position] =	' <div class="span3 subheading-compare" ><div style=" padding-bottom:10px;"><img src="'+temp.header.val[zz].imgurl+'"/></div></div>';					
table_data_heading_visiblephone[position] = ' <div id="'+temp.header.val[zz].card_id+'" class="span3 cardItem subheading-compare  visible-phone " ><div class="col2header "><h3>'+temp.header.val[zz].text+'</h3></div></div>';                            
table_data_applylink[position] =   ' <div class="span3 subheading-compare" ><div class="card-compare-apply"><div class="col2header"><a href="'+temp.header.val[zz].applylink+'" class="btn btn-primary" onclick="cc_applynow(\''+temp.header.val[zz].text+'\')">Apply now</a></div></div></div>';
table_data_applyibanking[position] = 			' <div class="span3 subheading-compare" ><a href="http://www.dbs.com.sg/personal/ib-anchor/redirect-cardstp.html" class="launch ui-link" onclick="cc_applyibanking(\''+temp.header.val[zz].text+'\')">Apply via iBanking<span class="icn-arrow-red launch"></span></a></div>';
table_data_remove[position] =            ' <div class="span3 subheading-compare" ><div class="btn-minus cursor-hand btn-remove card-compare-remove"> <i data-id="'+temp.header.val[zz].card_id+'" class"icon_cross-gray"></i>Remove</div></div>';

                             
												 
											 
							
							
							// console.log("--------------------");
					 
							 //console.log(table_data1[position]);
					//console.log("--------------------");
					present_count++;
						}
						} 
					}
					var tempff_heading_hiddenphone="";
                    var tempff_image="";
                    var tempff_heading_visiblephone="";
                    var tempff_applylink="";
                    var tempff_applyibanking="";
                    var tempff_remove="";
                  

					if(present_count>0)
					{
						for(var pos=0;pos<table_data_heading_hiddenphone.length;pos++)
						{     
                            if(typeof(table_data_heading_hiddenphone[pos])=="table_data_heading_hiddenphone"||(table_data_heading_hiddenphone[pos]==""))
                                    tempff_heading_hiddenphone+='<div class="span3"></div>';
                                else
							tempff_heading_hiddenphone+=table_data_heading_hiddenphone[pos];
                            
if(typeof(table_data_image[pos])=="undefined"||(table_data_image[pos]==""))
     tempff_image+='<div class="span3"></div>';
                                else
                            tempff_image+=table_data_image[pos];
                            
if(typeof(table_data_heading_visiblephone[pos])=="undefined"||(table_data_heading_visiblephone[pos]==""))
     tempff_heading_visiblephone+='<div class="span3"></div>';
                                else
                            tempff_heading_visiblephone+=table_data_heading_visiblephone[pos];
                            
if(typeof(table_data_applylink[pos])=="undefined"||(table_data_applylink[pos]==""))
     tempff_applylink+='<div class="span3"></div>';
                                else
                            tempff_applylink+=table_data_applylink[pos];
                            
if(typeof(table_data_applyibanking[pos])=="undefined"||(table_data_applyibanking[pos]==""))
     tempff_applyibanking+='<div class="span3"></div>';
                                else
                            tempff_applyibanking+=table_data_applyibanking[pos];
                            
if(typeof(table_data_remove[pos])=="undefined"||(table_data_remove[pos]==""))
     tempff_remove+='<div class="span3"></div>';
                                else
                            tempff_remove+=table_data_remove[pos];



 

						}
                              tempff_heading_hiddenphone='<div class="row-fluid">'+tempff_heading_hiddenphone+'</div>';
                              tempff_image='<div class="row-fluid">'+tempff_image+'</div>';
                              tempff_heading_visiblephone='<div class="row-fluid fixedheading">'+tempff_heading_visiblephone+'</div>';
                              tempff_applylink='<div class="row-fluid">'+tempff_applylink+'</div>';
                              tempff_applyibanking='<div class="row-fluid">'+tempff_applyibanking+'</div>';
                              tempff_remove='<div class="row-fluid">'+tempff_remove+'</div>';

                      console.log("a->"+tempff_heading_visiblephone);
                      console.log("a->"+tempff_image);
                           
					 table_data =table_data_label+tempff_heading_hiddenphone+tempff_image+tempff_heading_visiblephone+tempff_applylink+tempff_applyibanking+tempff_remove;
}
					table_data +='<div class="dottedline insertcard2"></div>';
//console.log(table_data);
				//	 $("#aa").html(table_data)
			 		
						var table_data1="";
					//console.log(sections)
				for(var i=1;i<sections.length;i++)
				{
					var temp= sections[i];
					var table_data_label="";
				var subheading="";
					var present_count1=0;
 var temp_heading=[];
 
 //------------------------other sections heading value
for (var zz=0;zz<temp.header.val.length;zz++) {

	 if(typeof(temp.header.val[zz].card_id)!="undefined"){
						 //	console.log($.inArray(parseInt(temp.header.val[zz].card_id), selected_card));
						 var position =$.inArray(temp.header.val[zz].card_id, selected_card);
						if(position != -1)
						{

							temp_heading[position]='<div class="span3 col2header"><h3>'+temp.header.val[zz].text+'</h3></div>'
							present_count1++;
						} 
						} 
					}
					 

 //------------------------other sections heading label
if(present_count1>0)
					{
var tempff="";
					 subheading ='<div class="row-fluid"><div class="span3 heading-compare  creditcard_name min-height40"><div class="" >'+temp.header.heading+'</div></div>';
						for(var pos=0;pos<temp_heading.length;pos++)
						{
							
							if(typeof(temp_heading[pos])=="undefined"||(temp_heading[pos]==""))
								tempff+='<div class="span3"></div>';
							else
								tempff+=temp_heading[pos];
						}

					 table_data +=subheading+tempff+'</div>';
}

 					
					 var tablelayout="";
					
					 var tablelayout1 ='<div class="row-fluid">';	
					 var temp1="";
					for (var z=0;z<temp.subheaders.length;z++) {
							 var tablelayout=[];
							  var heading="";
							  var data_present=false;
					 	
//------------------------other sections subheaders value						
							for (var y=0;y<temp.subheaders[z].val.length;y++) {
							console.log("z->"+typeof(temp.subheaders[z].val[y].card_id));
							
							if(typeof(temp.subheaders[z].val[y].card_id)!="undefined"){

									 console.log("zz->"+temp.subheaders[z].val[y].card_id);
var position =$.inArray(temp.subheaders[z].val[y].card_id, selected_card);
							if(position!= -1)
							{ //console.log("y->"+temp.subheaders[z].val[y].card_id);
															
								
								
								data_present=true;
								 
								 tablelayout[position]= '<div class="span3 subheading-compare "><div class="" >'+temp.subheaders[z].val[y].text+'</div></div>';
 
								 
							}
							 
							}
						}
						
						//------------------------other sections subheaders label	
							if(data_present){
						if(temp.subheaders[z].bold=="true")
								heading += '<div class="row-fluid"><div class="span3 heading-compare" ><div class="subheading-compare marginLeft" ><b>'+temp.subheaders[z].header+'</b>';
								else 
								heading += '<div class="row-fluid"><div class="span3 heading-compare"><div class="subheading-compare marginLeft">'+temp.subheaders[z].header+'';
								 
								 
								heading += '<br/>'+temp.subheaders[z].desc+'</div></div>';

var tempff="";
									for(var pos=0;pos<tablelayout.length;pos++)
						{
							

							if(typeof(tablelayout[pos])=="undefined"||(tablelayout[pos]==""))
								tempff+='<div class="span3"></div>';
							else
								tempff+=tablelayout[pos];

							//console.log("t->"+tempff);
						}



									temp1 +=heading+tempff+'</div>';
							}
							
									
						}
//------------------------other sections moredetails
						var moredetails=[];
var tempff="",present_count2=0;

						for (var z=0;z<temp.moredetails.length;z++) {
						 
					 if(typeof(temp.moredetails[z].card_id)!="undefined"){
					 	var position =$.inArray(temp.moredetails[z].card_id, selected_card);
						if(position!= -1)
						{
							 
							 moredetails[position]= '<div class="span3"><a href="'+temp.moredetails[z].val+'" class="launch nomargin ui-link">More Details <span class="icn-arrow-red launch"></span></a></div>';
							present_count2++;
							 
												 
							
							 
						}
						}}
						if(present_count2>0)
					{
var tempff="";
					 
						for(var pos=0;pos<moredetails.length;pos++)
						{
							
							if(typeof(moredetails[pos])=="undefined"||(moredetails[pos]==""))
								tempff+='<div class="span3"></div>';
							else
								tempff+=moredetails[pos];
						}

					 //table_data +='<div class="row-fluid"><div class="span3"></div>'+tempff+'</div>';
}

//------------------------other sections keypoints
 var tablelayout=[];
 for (var z=0;z<selected_card.length;z++) {
tablelayout[z]='<div class="subheading-compare"><ul>';
 }
					var tempff1="";
					 var tablelayout1 ='<div class="row-fluid">';	
					 
					for (var z=0;z<temp.items.val.length;z++) {
							
							  var heading="";
							  var data_present=false;
							  //console.log("z->"+z);
						//console.log(temp.items.val[z]);
						 
							if(typeof(temp.items.val[z].card_id)!="undefined"){

								 
var position =$.inArray(temp.items.val[z].card_id, selected_card);
							if(position!= -1)
							{  
															
								
								
								data_present=true;
								 
								 tablelayout[position] += '<li>'+temp.items.val[z].item+'</li>';
// console.log( tablelayout[position]);
								 
							}
							 
							}}
				 for (var z=0;z<selected_card.length;z++) {
tablelayout[z]+='</ul></div>';
 }	 
							if(data_present){
						 


									for(var pos=0;pos<tablelayout.length;pos++)
						{
							

							if(typeof(tablelayout[pos])=="undefined"||(tablelayout[pos]==""))
								tempff1+='<div class="span3 heading-compare"></div>';
							else
								tempff1+='<div class="span3">'+tablelayout[pos]+'</div>';

							//console.log("t->"+tempff1);
						}



									 
							}
							
									
						


					 


							table_data += temp1+ '<div class="row-fluid"><div class="span3 heading-compare"></div>'+tempff1+'</div>' + '<div class="row-fluid"><div class="span3 heading-compare"></div>'+tempff+'</div>' +'<div class="dottedline insertcard2"></div>';
							if(temp1!=""){


							}
					
						//console.log("i->"+i);
					//console.log("table->"+table_data1);
					}  
					
						/*for (var z=0;z<temp.moredetails.length;z++) {
						 
					 if(typeof(temp.moredetails[z].card_id)!="undefined"){
						if($.inArray(parseInt(temp.moredetails[z].card_id), selected_card)!= -1)
						{
							 
							//table_data += '<a href="'+temp.moredetails[z].val+'" class="launch nomargin ui-link">More Details <span class="icn-arrow-red launch"></span></a>';
							
							 
												 
							
							 
						}
						} */
					 
					 
					  
							
							
				 
					 
					
				 
			 
				 //console.log("jjjjjjjjjjjj");
				// console.log(table_data);
				if(selected_card.length==0)
			$(".compData").html(""); 
			else
			$(".compData").html(table_data);

	}
	
	function cardCounting() { 
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

$( ".comparecards" ).on("click", ".btn-minus", function() {	 
		var clickedId = $(this).children().attr("data-id");	
		 $('.carousel-inner').find('#'+clickedId).removeClass('card-selected');
 $('section[id^="cards"] span[id='+clickedId+']').parent().find("i").removeClass().addClass('icon_add-red');
		$('section[id^="cards"] span[id='+clickedId+']').html(labels.add_card_to_comparison);
		$( '#comparecards img[id="'+clickedId+'"]').removeClass('card-selected').prev().hide();
		$('.carousel-inner').find('#'+clickedId).fadeTo(200, 1);
		var clickedId1=clickedId.toString();
		//$(this).removeClass('card-selected');	
		$(this).removeClass('card-selected').prev().hide();
		$(this).addClass('cardsBorder');
		$(this).fadeTo( 200, 1 );	
		 
		//cardCounting();
		$('.alert_message').css('display','none'); 
		$('section[id^="cards"] span[id='+clickedId+']').parent().find("i").removeClass().addClass('icon_add-red');
		$('section[id^="cards"] span[id='+clickedId+']').html(labels.add_card_to_comparison);
		console.log(selected_card);
		console.log($.inArray(clickedId1, selected_card));
		selected_card.splice($.inArray(clickedId1, selected_card),1);
		 displayCompareCards();	
	 
	 
	});
	
	$(".comparison-flyout .hide-switch a").on("click", function() { 
	  $(".comparison-flyout").flyInorOut();
	  $(".notice-flyouthidden").slideDown();
	  $('.alert_message').css('display', 'none');
	});
	
	
	  $.fn.flyInorOut = function(speed, offset) { 
      var that = this;
      speed = speed || 500;
      offset = offset || 10;
      var height = offset;
      //$(that).css({'margin-top': -parseInt(offset)});
      $(that).slideToggle(speed);
  };

  
	},
	customDropDown:function(){
        $(".customSelect").each(function(){
			
			var _wrapperWidth;
			if($(this).hasClass('customSelectSmall')) _wrapperWidth=102;
			else if($(this).hasClass('customSelectMedium')) _wrapperWidth=220;
			else if($(this).hasClass('customSelectLarge')) _wrapperWidth=320;			
			
            $(this).wrap("<span class='select-wrapper' style='width:"+ _wrapperWidth +"px'></span>");
            $(this).after("<span class='holder'></span>");
			var selectedOption = $(this).find(":selected").text();
            $(this).next(".holder").text(selectedOption);
        });
        $("body").on("change",".customSelect",function(){
			var selectedOption = $(this).find(":selected").text();
            $(this).next(".holder").text(selectedOption);
        });
		
		
    },
	secureEquityView: function() {


},
survey_sidemodule: function () {
            if ($(".survey_side_module-ajax").length == 0) {
                return;
            } else { 
                /*Callback function once AJAX XSLT is completed*/
                  (function() { 
                    /**Event Driven**/
					/*if ($(".module-promo-docked.left").length > 0) {
						$(".module-promo-docked.left").attr('id',$(".module-promo-docked.left").attr('id')+'_TEMP');
					}*/
					target=$(".survey-sidemodule").attr('id');
                    if ($("#" + target + ".survey-sidemodule.pop-up").length > 0) {
                        //Don't show for devices
                        if(!navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|webOS|Mobile/i)){
                            var survey = $('#' + target);
                            var surveyDock = $('#' + target + '_D');
                            
                            /**Event: Scroll**/
                            if(survey.data('display-type')=='event-scroll') {
                                if(navigator.userAgent.match("MSIE ")){
                                    $( window ).one('scroll', function() {
									/*1. Switch to jQuery's default animation*/
typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/
 survey.slideDown();
                                        surveyDock.show();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});

                                       
                                    });
                                }
                                else{
                                    $( document ).one('scroll', function() {
									/*1. Switch to jQuery's default animation*/
typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/
     survey.slideDown();
                                        surveyDock.show();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});

                                   
                                    });
                                }


                                /**Event: Timer**/
                            } else if(survey.data('display-type')=='event-timer') {
                                var eventTimerDelay = survey.data('event-timer-delay');
                                
                                setTimeout(function(){
								/*1. Switch to jQuery's default animation*/
typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/
  survey.slideDown();
                                    surveyDock.show();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});

                                  
                                }, eventTimerDelay * 1000);
                                
                            /**Event: Referrer**/
                            } else if(survey.data('display-type')=='event-referrer') {
                                var eventReferrerUrl = survey.data('event-referrer-url');
                                var referrer = document.referrer;
                                
                                if(referrer.indexOf(eventReferrerUrl) !== -1) {
								/*1. Switch to jQuery's default animation*/
typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/
 survey.slideDown();
                                    surveyDock.show();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});

                                   
                                }
                            }
                            
                            /**Buttons**/
                            survey.find('.btn-close').on('click', function(e) {
							/*1. Switch to jQuery's default animation*/
typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/
      survey.hide();
                                surveyDock.hide();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});

                          
                            });
                            survey.find('.btn-minimize').on('click', function(e) {
							/*1. Switch to jQuery's default animation*/
typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/

                                survey.slideUp();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});

                            });
                            surveyDock.find('.btn-close').on('click', function(e) {
							/*1. Switch to jQuery's default animation*/
typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/

                                survey.hide();
                                surveyDock.hide();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});

                            });
                            surveyDock.find('.btn-maximize').on('click', function(e) {
							/*1. Switch to jQuery's default animation*/
typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/
    survey.slideDown();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});

                            
                            });
                        }
                    }
                })();
            
                 
            }
        },
    survey:function () {
		if ($("#survey-initial-state").length > 0) {
		$('.module-promo-container').parent().parent().parent().parent().hide();
		$("#survey-continue-btn").on('click', function () {                                                          
		var formData = {};
			$("#survey-initial-state input[type='hidden'], #survey-initial-state input[type='text'], #survey-initial-state input[type='radio']:checked, #survey-initial-state input[type='checkbox']:checked, #survey-initial-state select, #survey-initial-state textarea").each(function(i, obj) {
							
				var name = obj.name;
				if (formData[name]) {
  				  formData[name] = formData[name] + ',' + $(obj).val();
				}
				else {
				  formData[name] = $(obj).val()
				}														   
			});
			//console.log(JSON.stringify(formData));			
			var surveyIdParam = "surveyId";
			var surveyId = $("#surveyId").val();
			var actionParam = "Action";
			var action = "submit";
			var JSONPayloadParam = "JSONPayload";
			var $button = $(this);
			var request = new AjaxRequest(formUrl, function (xmlDoc) {
				var result = xmlDoc.documentElement.getElementsByTagName("result")[0].childNodes[0].nodeValue;
				if (result == "success") {
					$('#survey-initial-state').hide();
					$('#survey-thank-you-state').show();
					/* BAU fix - IN688662 - START*/
					$(document).scrollTop(0);
					/* BAU fix - IN688662 - END*/
					$('.module-promo-container').parent().parent().parent().parent().show();
				}else if (result == "expired" || result == "completed") {
					location.reload();			
				} else if (result == "error") {
								
				}
				$button.removeAttr('disabled');
			});
			request.setParameter(surveyIdParam, surveyId);
			request.setParameter(actionParam, action);
			/* var formDataValue = JSON.stringify(formData).replace(/\\"/g, '\'').replace(/\\n/g, ' '); */
            formData = JSON.stringify(formData);
            formData = formData.replace(/\\u([\d\w]{4})/gi, function(match, grp) {return String.fromCharCode(parseInt(grp, 16))});
            var formDataValue = formData.replace(/\\"/g, '\'').replace(/\\n/g, ' ');			
			request.setParameter(JSONPayloadParam, formDataValue);
			request.submit();
			$button.attr('disabled', 'disabled');
		});
		
		if ($('textarea').length>0){
			$("textarea[maxlength]").bind('input keyup propertychange', function() {  
					var maxLength = $(this).attr('maxlength');  
					if ($(this).val().length > maxLength) {  
						$(this).val($(this).val().substring(0, maxLength));  
					}  
			});  
		}
		
		}

		var surveyValidation = function () {
			var flag1 = true;
			var flag2 = true;
			var flag3 = true;
			var securityCharacters =/[<>\\]/; 
			
		  $(".mandatory").each(function(i, obj) {
			$(this).find('input:text, select, textarea').each(function() {
				var securityCharacters =/[<>\\]/; 
				if($(this).val() == "" || securityCharacters.test($(this).val())){
				  flag1 = false;
				  return false;
			  }
			});							
			
			if ($(".mandatory").find("input[type='radio']").length > 0 ){
			/* if($(".mandatory").find("input[type='radio']").is(":checked") == false){
			  flag2 = false;
			} */
				$(".mandatory").find("input:radio").each(function(){
				  var name = $(this).attr("name");
				  if($("input:radio[name="+name+"]:checked").length == 0)
				  {
					flag2 = false;
				  }
				});						
			}
			if ($(".mandatory").find("input[type='checkbox']").length > 0 ){
			/* if($(".mandatory").find("input[type='checkbox']").is(":checked") == false){
			  flag3 = false;
			} */
				$(".mandatory").find("input:checkbox").each(function(){
				  var name = $(this).attr("name");
				  if($("input:checkbox[name="+name+"]:checked").length == 0)
				  {
					flag3 = false;
				  }
				});			
			}
		  });
		  
			"console" in window && console.log("Last Result( Flag1:  " + flag1 + ", Flag2: " + flag2 + ", Flag3: " + flag3 + " )");
			if(flag1 && flag2 && flag3){
			  $("#survey-continue-btn").removeAttr('disabled');
			}else{
			  $("#survey-continue-btn").attr('disabled', 'disabled'); 
			}										
		}		

		$(".mandatory input[type='radio']").click(function(){
		  surveyValidation();
		});
		$(".mandatory select").change(function(){
		  surveyValidation();
		});
		$(".mandatory input[type='checkbox']").click(function(){
		  surveyValidation();
		});
		
		var securityCharacters =/[<>\\]/;
		$("input[type='text']").keyup(function() {
		  var inputFlag = false;
		  $('input:text, textarea').each(function() {
		    if(securityCharacters.test($(this).val())){
		      $("#survey-continue-btn").attr('disabled', 'disabled'); 
			  inputFlag = true;
			  return false;
		    }
		  });
		  if(inputFlag){
		    return false;
		  }
		  surveyValidation();		  
		});		
		$("textarea").keyup(function() {
		  var inputTextarea = false;
		  $('input:text, textarea').each(function() {
		    if(securityCharacters.test($(this).val())){
		      $("#survey-continue-btn").attr('disabled', 'disabled'); 
			  inputTextarea = true;
			  return false; 
		    }
		  });
		  if(inputTextarea){
		    return false;
		  }
		  surveyValidation();		  
		});	
		
		if ($(".mandatory").length > 0) {
		  surveyValidation()
		}else{
		  $("#survey-continue-btn").removeAttr('disabled');      
		}				
		
      },
    
    
      poll:function () {
		 
		   if ($(".poll-ajax").length == 0) {
                return;
            } else {
                /*Callback function once AJAX XSLT is completed*/
               (function() { 
                    if ($(".poll").length > 0) { 
                        var poll =   $(".poll-ajax");
						var target = $(".poll-ajax").attr('id');
                        /**Enable Submit Button**/
                        poll.find(".poll-radio").on("click", function () {
                        	/**Added by Pooja for Comment Textarea Validation**/
                            var securityCharacters =/[<>\\]/;
 							var voteCommentVal = poll.find(".vote-comment").val();							
 							if((voteCommentVal.length > 500) || (securityCharacters.test(voteCommentVal))){
 								$(".poll a.launch").attr("disabled", "disabled");
 							} else	{
 							/**Added by Pooja for Comment Textarea Validation**/
 								$(".poll a.launch").removeAttr("disabled");
 							/**Added by Pooja for Comment Textarea Validation**/
 							}
 							/**Added by Pooja for Comment Textarea Validation**/
                        });
                        
                        /**Added by Pooja for Comment Textarea Validation**/
						poll.find(".vote-comment").on("keyup", function () {
							var securityCharacters =/[<>\\]/;
							var voteCommentVal = poll.find(".vote-comment").val();
							if(voteCommentVal != "" || voteCommentVal != null){
								if((voteCommentVal.length > 500) || (securityCharacters.test(voteCommentVal))){
									$(".vote-comment").css({"border-color": "#7f0000"});
									$(".disclaimer").css({"color": "#7f0000", "margin-top": "0", "font-size": "85%","margin-bottom": "0"});
									$(".poll a.launch").attr("disabled", "disabled");
								} else {
									$(".vote-comment").css({"border": "1px solid #CCC"});
									$(".disclaimer").css({"color": "#999494", "margin-top": "0", "font-size": "85%","margin-bottom": "0"});
									if(poll.find(".poll-radio").is(':checked')){
										$(".poll a.launch").removeAttr("disabled");
									}
								}
							}
                        });
						/**Added by Pooja for Comment Textarea Validation**/

                        /**Submit Vote**/
                        poll.find("a.launch").on("click", function () {
							                        								
                            var attr = $(this).attr('disabled');

                            if (typeof attr == 'undefined' || attr == false || attr != 'disabled') {
                                if(poll.find(".poll-radio").is(':checked')){
                                    /*Disable Submit Button*/
                                    $(".poll a.launch").attr("disabled", "disabled");

                                    /*Call Ajax*/
                                    var candidateId = poll.find(".poll-radio:checked").val();
                                    var targetSubmitUrl = poll.data("submit-url");
                                    var pollId = poll.data("poll-id");
                                    /**Added by Pooja for Comment Textarea Validation**/
									var voteComment = poll.find(".vote-comment").val();
									voteComment = voteComment.replace(/[\n]/g, ' ');
                                	if(voteComment == "" || voteComment == null)
                                	{
                                		voteComment = " ";
                                	}
                                	/**Added by Pooja for Comment Textarea Validation**/
 function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
	var dcrPath = getParameterByName('dcrPath');
	if(dcrPath!="")
	{targetSubmitUrl=targetSubmitUrl+"?dcrPath="+dcrPath;
	}
                                                                                                                                               var lid=$("#lid").val();
                                                                                                                                               var pId = $("#pUrl").val();
                                    $.ajax({
                                        url: targetSubmitUrl,
                                        type: 'POST',
                                        dataType: 'xml',
                                        data: {'vote' : candidateId, 'pollId' : pollId,'productId':lid,'promoUrl':pId,'voteComment':voteComment},
                                        success: function(data){
                                            "console" in window && console.log("[Poll] AJAX Success!");

                                            var $xml = $(data);

                                            /**Update Result**/
                                            $xml.find("pollOptions").each(function(index) {
                                                var candidateId = $(this).find("pollOptionId").text();
                                                var voteCount = $(this).find("voteCount").text();
                                                var votePercentage = $(this).find("votePercentage").text();

                                                //Update Vote Count
                                                $("#C_" + target + "_candidateDiv_" + candidateId).find(".vote-count").text($("#C_" + target + "_candidateDiv_" + candidateId).find(".vote-count").text().replace(/[0-9]+/,voteCount));

                                                //Update Percentage
                                                $("#C_" + target + "_candidateDiv_" + candidateId).find(".text-background").text($("#C_" + target + "_candidateDiv_" + candidateId).find(".text-background").text().replace(/[0-9]+/,votePercentage));
                                                $("#C_" + target + "_candidateDiv_" + candidateId).find(".ReaderPollPercentageBar").css("width", votePercentage + "%");
                                            });

                                            //Update Total Vote Count
                                            var totalVoteCount = $xml.find("totalVotes").text();
                                            $("C_" + target + "_totalVoteCount").text(totalVoteCount);


                                            /**Show Result**/
                                            $("#C_" + target + "_resultsDiv").show();
                                            $("#C_" + target + "_inputDiv").hide();
                                        },
                                        error: function(){
                                            "console" in window && console.log("[Poll] AJAX Failed!");
                                            $(".poll a.launch").removeAttr("disabled");
                                        }
                                    });
                                }
                            }
						 
                        });
                    }
                    
                   /**Event Driven**/
                    if ($("#" + target + ".poll.pop-up").length > 0) {
                        //Don't show for devices
                        if(!navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|webOS|Mobile/i)){
                            var poll = $('#' + target);
                            var pollDock = $('#' + target + '_D');
                            
                            //Don't show if already voted
                            //if(poll.data('poll-open') == true) {
                                /**Event: Scroll**/
                                if(poll.data('display-type')=='event-scroll') {
                                    if(navigator.userAgent.match("MSIE ")){
                                        $( window ).one('scroll', function() {
                                                                                                                                                                /*1. Switch to jQuery's default animation*/
typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/
    poll.slideDown();
                                            pollDock.show();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});

                                        
                                        });
                                    }
                                    else{
                                        $( document ).one('scroll', function() {
                                                                                                                                                                                                                                                                                                                                /*1. Switch to jQuery's default animation*/
typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/
poll.slideDown();
                                            pollDock.show();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});
                                           
                                        });
                                    }
                                
                                /**Event: Timer**/
                                } else if(poll.data('display-type')=='event-timer') {
                                    var eventTimerDelay = poll.data('event-timer-delay');
                                   
                                    setTimeout(function(){
                                                                                                                                                                                                                                                                                                                /*1. Switch to jQuery's default animation*/
typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/
poll.slideDown();
                                        pollDock.show();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});
                                       
                                    }, eventTimerDelay * 1000);
                                    
                                /**Event: Referrer**/
                                } else if(poll.data('display-type')=='event-referrer') {
                                    var eventReferrerUrl = poll.data('event-referrer-url');
                                    var referrer = document.referrer;
                                   
                                    if(referrer.indexOf(eventReferrerUrl) !== -1) {
                                                                                                                                                                                                                                                                                                                /*1. Switch to jQuery's default animation*/
typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/
poll.slideDown();
                                        pollDock.show();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});
                                       
                                    }
                                }
                                
                                /**Buttons**/
                                poll.find('.btn-close').on('click', function(e) {
                                                                                                                                                                                                                                                                                                /*1. Switch to jQuery's default animation*/
typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/
   poll.hide();
                                    pollDock.hide();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});
                                 
                                });
                                poll.find('.btn-minimize').on('click', function(e) {
                                                                                                                                typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/
    poll.slideUp();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});
                                
                                });
                                pollDock.find('.btn-close').on('click', function(e) {
                                                                                                                                                                                                                                                                                                /*1. Switch to jQuery's default animation*/
typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/
   poll.hide();
                                    pollDock.hide();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});
                                 
                                });
                                pollDock.find('.btn-maximize').on('click', function(e) {
                                                                                                                                                                                                                                                                                                /*1. Switch to jQuery's default animation*/
typeof $.fn.defaultAnimate === 'function' && $.fn.extend({aicsAnimate:$.fn.animate, animate:$.fn.defaultAnimate});

/*2. Do your animation here*/
poll.slideDown();

/*3. Revert back to AICS' custom animation*/
typeof $.fn.aicsAnimate === 'function' && $.fn.extend({animate:$.fn.aicsAnimate});
                                   
                                });
                            //}
                        }
                    }
                })(); 
            }
          
        },article_socialmedia:function() {
		/* AICS QR START */
		function getParameterByName(name, string) {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(string);
			return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}

		function facebookShare(cap, des, img) {
			//get title
			var title = document.title,
				//get URL
				url = document.URL,
				//get pid (if any)
				pid = getParameterByName("pid", location.search),
				//get cid (if any)
				cid = getParameterByName("cid", location.search),
				//setup a page that will auto close itself for after sharing the page
				redirect_url = "http://www.dbs.com.hk/treasures/home/Close.page";
			//setup pid / cid code
			if (pid != "") {
				url = url.replace(pid, "fb_share_" + pid);
			} else if (cid != "") {
				url = url.replace(cid, "fb_share" + cid);
			} else if (cid == "" && pid == "") {
				url = url + "&pid=fb_share";
			}
			var domain=location.protocol+'//'+window.location.host;
			var description = des,
				caption = cap,
				img = img,
				shareURL = "";
			url=url.replace("GenericArticle.page?dcrPath=","");
			url=url.replace("EquityArticle.page?dcrPath=","");
			url=url.replace("recentarticle.page?dcrPath=","");
			url1 = document.URL;
			
			if (typeof($(".facebook_share_url").val()) != "undefined" && $(".facebook_share_url").val() != "")
				shareURL = $(".facebook_share_url").val() + "&link=" + encodeURIComponent(url) + "&name=" + encodeURIComponent(title) + "&caption=" + encodeURIComponent(caption) + "&picture=" + encodeURIComponent(img) + "&description=" + encodeURIComponent(description) + "&redirect_uri=" + encodeURIComponent(redirect_url);
			else
				shareURL = "https://www.facebook.com/dialog/feed?app_id="+appId + "&link=" + encodeURIComponent(url) + "&name=" + encodeURIComponent(title) + "&caption=" + encodeURIComponent(caption) + "&picture=" + encodeURIComponent(img) + "&description=" + encodeURIComponent(description) + "&redirect_uri=" + encodeURIComponent(redirect_url);
 
			//code for open the sharing window
			//window.open(shareURL, '_blank', 'width=900, height=900, toolbar=0,location=0,menubar=0');
			$(".facebookshare").attr("href",shareURL);
		}

		//$(".facebookshare").on("click", function(e) {
			 
			var description = $("#paraid").text(); 
			if (description == "undefined" || description == "")
            {
                description = $("#type2summary").text();
            }
			var articleImage = $("p img.centered").attr("src");
			var domain=location.protocol+'//'+window.location.host;
				 
			if(typeof(articleImage)!="undefined")
			articleImage=domain+articleImage;
			else
			articleImage="";
			
			var caption = $("div.article-summary h1").text();
						if (caption == "undefined" || caption == "")
            {
                caption = $("div.recent-development h1").text();
            }
			facebookShare(caption, description, articleImage);
			//e.preventDefault();
		//});

		 //$(".weiboshare").on("click", function(e) {
			var title = document.title,
				//get URL
				url = document.URL ;
			url=url.replace("GenericArticle.page?dcrPath=","");
			url=url.replace("EquityArticle.page?dcrPath=","");
			url=url.replace("recentarticle.page?dcrPath=","");
		 
			if (typeof($(".weibo_share_url").val()) != "undefined" && $(".weibo_share_url").val() != "")
				shareURL = $(".weibo_share_url").val() + "?" + "url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(caption) + "&pic=" + encodeURIComponent(articleImage);
			else
				shareURL = "http://service.weibo.com/share/share.php?" + "url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(caption) + "&pic=" + encodeURIComponent(articleImage);
			//location.href=shareURL;
			$(".weiboshare").attr("href",shareURL);
			//window.open(shareURL, '_blank', 'width=900, height=900, toolbar=0,location=0,menubar=0');
			//e.preventDefault();

		//});
		
		var mailto_url=document.URL;
		mailto_url=mailto_url.replace("GenericArticle.page?dcrPath=","");
		mailto_url=mailto_url.replace("EquityArticle.page?dcrPath=","");
		mailto_url=mailto_url.replace("recentarticle.page?dcrPath=","");
		$(".mailto").attr("href", "mailto:?subject=Shared from DBS&body=" + encodeURIComponent(mailto_url));

		//$(".twittershare").on("click", function(e) {
			var title = document.title,
				//get URL
				url = document.URL;
			url=url.replace("GenericArticle.page?dcrPath=","");
			url=url.replace("EquityArticle.page?dcrPath=","");
			url=url.replace("recentarticle.page?dcrPath=","");

			if (typeof($(".twitter_share_url").val()) != "undefined" && $(".twitter_share_url").val() != "")
				shareURL = $(".twitter_share_url").val() + "?" + "url=" + encodeURIComponent(url)+ "&text=" + encodeURIComponent(caption);
			else
				shareURL = "https://twitter.com/intent/tweet?" + "url=" + encodeURIComponent(url)+ "&text=" + encodeURIComponent(caption);
			 
			//location.href=shareURL;
			// window.open(shareURL, '_blank', 'width=900, height=900, toolbar=0,location=0,menubar=0');
			$(".twittershare").attr("href",shareURL);
			 //e.preventDefault();
		//});

		//$(".linkedinshare").on("click", function(e) {
			/*

			http://www.linkedin.com/shareArticle?mini=true&url=http://stackoverflow.com/questions/10713542/how-to-make-custom-linkedin-share-button/10737122&title=How%20to%20make%20custom%20linkedin%20share%20button&summary=some%20summary%20if%20you%20want&source=stackoverflow.com
			*/
			var title = document.title,
				//get URL
				url = document.URL;
			url=url.replace("GenericArticle.page?dcrPath=","");
			url=url.replace("EquityArticle.page?dcrPath=","");
			 url=url.replace("recentarticle.page?dcrPath=","");
			 
		 
		
			if (typeof($(".linkedin_share_url").val()) != "undefined" && $(".linkedin_share_url").val() != "")
				shareURL = $(".linkedin_share_url").val() + "&" + "url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(caption) + "&description=" + encodeURIComponent(description) + "&image-url=" + encodeURIComponent(articleImage);
			else
				shareURL = "http://www.linkedin.com/shareArticle?mini=true&" + "url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(caption) + "&description=" + encodeURIComponent(description) + "&image-url=" + encodeURIComponent(articleImage);
				$(".linkedinshare").attr("href",shareURL);
			//location.href=shareURL;
			//window.open(shareURL, '_blank', 'width=900, height=900, toolbar=0,location=0,menubar=0');
			//e.preventDefault();


		//});

		var paneldown = false;
	 
		 $(".shareabout_desc").hide();
		 
		$(".shareabout").on("click", function(event) {
		var parent= $(this).parent().parent();
			if (!$(parent).find(".shareabout_desc").is(':visible')) { 
				var sharedesc_ht = $(parent).find(".shareabout_desc").height();
				$(parent).find(".shareabout_desc").show();
				paneldown = true;
			} else {
				$(parent).find(".shareabout_desc").hide();
				paneldown = false;
			}
			//$(".shareabout_desc").append("<img src='images/icon-close.gif' class='pull-left close'>");
		});
		$(".shareabout").find("a").on("click", function(e) {
			e.preventDefault();
		});
		$(".shareabout_desc .close_icon").on("click", function(event) {
		var parent= $(this).parent().parent().parent();
			event.preventDefault();
			paneldown = false;
			$(parent).find(".shareabout_desc").hide();
		});


		$(".whatsappshare").on("click", function(e) {
			url = document.URL;
			url=url.replace("GenericArticle.page?dcrPath=","");
			url=url.replace("EquityArticle.page?dcrPath=","");
			url=url.replace("recentarticle.page?dcrPath=","");
			var whatapp_url = "";
			if (typeof($(".whatsapp_share_url").val()) != "undefined" && $(".whatsapp_share_url").val() != "")
				whatapp_url = $(".whatsapp_share_url").val() + "?text=" + encodeURIComponent(url);
			else
				whatapp_url = "whatsapp://send?text=" + encodeURIComponent(url);
			window.open(whatapp_url, '_blank');
		});
	
},		
   
   
 
};

 
 var isPhone = true;
if ($('.hidden-phone').is(":visible")) {
	isPhone = false;
} 
 
$(document).ready(function() {
pageLevelComponents.customDropDown();
annoucement_call();
notificationajaxcall();
 
googleSearch = function (query,pageblock) {
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
		
		
 
    if ($("#hero-block-DIV").length > 0)
    {
           pageLevelComponents.HeroBanner();
	  
    }
  if($(".social-media").length)
pageLevelComponents.article_socialmedia();
  pageLevelComponents.Navigation();
    pageLevelComponents.getInTouch();
    pageLevelComponents.tabs();
    pageLevelComponents.setTabHeight();
    pageLevelComponents.currencyConverter();
    pageLevelComponents.topNavSearch();
    pageLevelComponents.mobileSearch();
    pageLevelComponents.placeholderModernizr();
   // pageLevelComponents.footer();

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

    $(window).on("orientationchange", function(event) {
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
			*//*
var windowsize = $(window).width() ;
		var footerWidth = ((parseInt($('#footer-content').css('width'))-parseInt($('#footer-content .right-section').css('width')))-1)+'px';
		 if ((navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|webOS|Mobile/i))&&(windowsize>767))
			 {
			$('#footer-content .left-section').css('width', footerWidth);
			}*/
		
		
			 
			

    });
	/*
		var addEvent =  window.attachEvent||window.addEventListener;
	var event = window.attachEvent ? 'onorientationchange' : 'orientationchange';
	addEvent(event, function() {
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

	  
 //pageLevelComponents.articeDetailSignup();

pageLevelComponents.splitterSearchModel();

pageLevelComponents.searchnewValidation();


 pageLevelComponents.setMainNavigationWidth();
pageLevelComponents.removeDesktopCSSforPrinterFriendly();

pageLevelComponents.tabArticleBrowserMarkets();

//pageLevelComponents.tempQAGITIconChange();
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
          pageLevelComponents.pageHero();
    }
if ($(".dropdown-cards").length > 0){
pageLevelComponents.cardsMenu();
}

 if($(".creditcards.tabbed-content")){
 pageLevelComponents.creditCardBanner();
 
 }
 if($("#comparecards").length > 0){
	pageLevelComponents.creditCardCompare();
  }
  
  pageLevelComponents.secureEquityView();
  
    pageLevelComponents.survey_sidemodule();
	   pageLevelComponents.poll();
	pageLevelComponents.survey();
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
		$(".tabbed-content.product-info .tabbed-nav.tabs li").each(function(){
			
			var currentTab = $(this).data('target');
			$(this).removeClass('active');
			if (targetTab === currentTab){
				$(this).addClass('active');
				$('.tabbed-content.product-info .tabcontent').each(function(){
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
			touchHandler: function(event) {
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
			init: function() {
				document.getElementById("myCarousel").addEventListener('touchstart', swipeFunc.touchHandler, false);	
				document.getElementById("myCarousel").addEventListener('touchmove', swipeFunc.touchHandler, false);	
				document.getElementById("myCarousel").addEventListener('touchend', swipeFunc.touchHandler, false);
				
			}
		};

		swipeFunc.init();
	}
/*
 setTimeout(function () {
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
	
	
	/*Refresh the data for forex component Tiru-*/
	var ajaxURL = $('.span4 #FFRefreshDataURL').val() || "";
	if(ajaxURL!='' && ajaxURL != 'undefined' && ajaxURL != null )
	{
	//alert("ajaxURL"+ajaxURL);
	$.ajax({        
		url: ajaxURL ,
		type: 'POST',
		dataType: 'html',
		success: function (resp) {
		var forex=$(resp).find('.forex');
		"console" in window && console.log(forex.html() + "::::::::::::::forex:");
		var footnote=$(resp).find('.footnote');
		"console" in window && console.log(footnote.html() + "::::::::::::::footnote:");
		$('.forex').html(forex.html());
		$('.footnote').html(footnote.html());
	},
		error: function(e){
			"console" in window && console.log(e + "::::::::::::::Error:");
		}  
	});
	}
	else{
	//alert("Could not able to refresh Forex rates, Please try later.");
	"console" in window && console.log("Could not able to refresh Forex rates, Please try later.");
	return false;
	}
	/* end of forex component*/
	
});
   
 (function() {



    var pageURL = window.location.href;
 
	/*
	var isyourdbs = (/^(.*)(your-dbs|business-tools)(.*)$/).test(pageURL);
	 isyourdbs=true;
	if(isyourdbs==true)
	{
		var fileref=document.createElement('script');
		fileref.setAttribute("type","text/javascript");
		// fileref.setAttribute("src", "/iwov-resources/scripts/web/your-dbs.js");
		 //fileref.setAttribute("src", "javascripts/your-dbs.js");
		//document.getElementsByTagName("head")[0].appendChild(fileref);
	}
	*/
    var pageSegments = pageURL.split('/');
    var pageSegment = "";
	var pageSegmentIndex=0;
    if (pageSegments != null && pageSegments != "")
    {
        if (pageSegments[3] == "in")
            {pageSegment = pageSegments[4];pageSegmentIndex=4;}
        else if (pageSegments[3] == "id")
            {pageSegment = pageSegments[4];pageSegmentIndex=4;}
        else
            {pageSegment = pageSegments[3];pageSegmentIndex=3;}
    }

	var pageSegmentlang = pageSegment.match(/^(.*)(-zh|-sc|-id)$/);
	if(pageSegmentlang != null){
		pageSegment = pageSegmentlang[1];
	}

	String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
		
	if( (pageSegments[2].endsWith("www.dbs.com") && (pageSegments[3]!="id") && (pageSegments[3]!="in") ) || (((pageSegments[2].endsWith(".sg"))||(pageSegments[2].indexOf("-sg")!=-1)) && pageSegments[3]=="personal"))
	{ 
	 $("html").addClass("sg50");
	}
	var aics=false;
	if((pageSegments[pageSegmentIndex+1]!="undefined")&& (pageSegments[pageSegmentIndex+1]=="aics")){
		aics=true;
	}
	 
   if ((pageSegments[0] == "file:")||(pageSegments[2] == "localhost:8080")||(pageSegments[2] == "localhost:9000")) {
   
   $("html").addClass("localenv");
    
        var filename = pageSegments[pageSegments.length - 1].split('_')[0];

		if((filename=="treasures" && aics==false)||filename=="tpc"||filename=="pb"){
			$("html").addClass("compact");
		}else{
			$("html").addClass("non-compact");
		}
	//aics=true;
	if(aics==true){
		$("html").addClass("aics");
	}
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
            case "pb":
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
	
	if((pageSegment=="treasures" && aics==false)||(pageSegment=="treasures-private-client" && aics==false)||(pageSegment=="private-banking" && aics==false)){
		$("html").addClass("compact");
	}else{
		$("html").addClass("non-compact");
	}

	if(aics==true){
		$("html").addClass("aics");
	}
	
	
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
	 (function(d){
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

if(aics==true)
{
function getPrefix( prop ){
	var prefixes = ['Moz','Webkit','Khtml','0','ms'],
	elem     = document.createElement('div'),
	upper      = prop.charAt(0).toUpperCase() + prop.slice(1),
	pref     = "";
	for(var len = prefixes.length; len--;){
		if((prefixes[len] + upper) in elem.style){
			pref = (prefixes[len]);
		}
	}
	if(prop in elem.style){
		pref = (prop);
	}
	return '-' + pref.toLowerCase() + '-';
}
		
$.fn.extend({
	defaultAnimate: $.fn.animate,
	animate: function(props, speed, easing, callback) {
		var options = speed && typeof speed === "object" ? jQuery.extend({}, speed) :{
			complete: callback || !callback && easing ||
			jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: callback && easing || easing && !jQuery.isFunction(easing) && easing
		};   

		return $(this).each(function() {
			var $this = $(this),
			altTransition,
			easing = (options.easing) ? easing : 'ease-in-out',
			prefix = (getPrefix('transition'));
			if (Modernizr.csstransitions) 
			{
				$this.css(prefix + 'transition', 'all ' + speed / 1000 + 's ease-in-out').css(props);
				setTimeout(function() {
				$this.css(prefix + 'transition', altTransition);
				if ($.isFunction(options.complete)) {
					options.complete();
				}
				}, speed);
			}
			else{
				$this.defaultAnimate(props, options); 
			}
		})
	}
})
}
 
})();

 /*
    !function ($) {
$(function() {
   $("#pageHeroCarousel").carousel(); 
});
}(window.jQuery);
 */
 /*
 $(window).load(function () {
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
 $(window).on('resize', function(){
      var win = $(this); //this = window
      console.log(win.width());
	  
});
  $(window).load(function () {
   var win = $(this); //this = window
      console.log(win.width());
  });
 */
 
$(window).on("orientationchange", function(event) {
	 setTimeout(function () { 
	  if ($('#product-nav').length){  
		var itemCount = $('#product-nav li').length;
		if ($('#product-nav').length){
		var itemCount = $('#product-nav li').length;
		var wrapperWidth = $('.main-navigation-container').width();
			
		$('#product-nav li').css('width', 100/itemCount+'%').css('width', '-=1.4px');
		var windowsize = $(window).width() ;
		if ((navigator.userAgent.match(/Android/i)))
		{
			//$('#product-nav li:last').width((wrapperWidth/itemCount)+5);
		}
		}
		}
		 }, 500);
	if($('.GIT-container')){
		pageLevelComponents.FlyGIT();
	}
 });
 
 
/* IN527110 Fix for IOS 8 Safari Browser issue for display of cards - START */
function isIOS8() {
  if ("600.1.4" == $.browser.version || ~navigator.userAgent.indexOf('OS 8_') ){
    return true;
  }
  return false;
}
/* IN527110 Fix for IOS 8 Safari Browser issue for display of cards - END */

 var EquityHoldPeriod=250;
function ReAttachEquity(){
	$('.sector, .status, .stock-info').bind('click',function(){
		if ($(this).parent().parent().attr("clickable")=="yes"){
			var link= "./"+$(this).parent().parent().parent().find('.hiddenlink').attr("href");
			document.location.href= link.replace("//","/");
			
		}
	});
	$('.sector, .status, .stock-info').bind('touchstart',function(){
		if ($(this).parent().parent().attr("clickable")=="yes"){
			var link= "./"+$(this).parent().parent().parent().find('.hiddenlink').attr("href");
			document.location.href= link.replace("//","/");
			
		}
	});
	$('.zoomed-container:parent').bind('touchstart',function(){
		if ($(this).attr("clickable")=="yes"){
			var link= "./"+$(this).parent().find('.hiddenlink').attr("href");
			document.location.href= link.replace("//","/");
		}
	});
	$('.zoomed-container:parent').bind(' click',function(){
		if ($(this).attr("clickable")=="yes"){
			var link= "./"+$(this).parent().find('.hiddenlink').attr("href");
			document.location.href= link.replace("//","/");
		}
	});
	$('.icon162-zoomed').mouseleave(function() {
		$(this).hide();
		
	});
}

$(window).load(function() {
			//alert($('#footer-content').width());
			//alert($('#footer-content .right-section').width());
			 //$('#footer-content .left-section').width((($('#footer-content').width()-$('#footer-content .right-section').width())-1)+'px');
			 var windowsize = $(window).width() ;
			 /*var footerWidth = ((parseInt($('#footer-content').css('width'))-parseInt($('#footer-content .right-section').css('width')))-1)+'px';
			 if ((windowsize>767))
			 {
			$('#footer-content .left-section').css('width', footerWidth);
			}*/
			//$('#footer-content .left-section').width('100px');
			//alert($('#footer-content .left-section').width());
            $('.back-to-top').click(function() {
                $('body,html').scrollTop(1);
                return false;
            });
            //[2013-11-13 Howell] Added - BEGIN
            if (status == "recognized" && $(".your-dbs-hero-block").length > 0) {
				$("#footer-rightSection").hide();
                $("#manageYourProfile").show();
                $("#forget-modal-trigger").click(function() {
					$("#forgetModal").modal('show');
                });
            } else {
				$("#manageYourProfile").empty().hide();
				$("#footer-rightSection").show();
                
            }
            //[2013-11-13 Howell] Added - END			
        
    });
 
 // onload check the max-height of the elements and set it to all menu items in same level
$(window).load(function() {
         var maxHeight = 0;
        if($('.main-navigation-container ul.clearfix>li').length > 0){
               $('.main-navigation-container ul.clearfix>li').each(function(){
                      var currElementHeight = parseInt($(this).css('height').split('px')[0]);
                       if (maxHeight < currElementHeight) {
                               maxHeight = currElementHeight;
                       }
               });
               $('.main-navigation-container ul.clearfix>li').css('height',maxHeight+'px');
        }  
		//Added for Poll Textarea Maxlength
		$("textarea[maxlength].vote-comment").on('keydown blur',function(e) {console.log("a");
		var key = e.which;  // backspace = 8, delete = 46, arrows = 37,38,39,40
		if ( ( key >= 37 && key <= 40 ) || key == 8 || key == 46 ) return;
		return $(this).val().length < $(this).attr( "maxlength" );
				});
				$("textarea[maxlength].vote-comment").bind("paste", function(e){console.log("b");
								var max = $(this).attr( "maxlength");
								if($(this).val().length < max){
								var self = $(this);
								setTimeout(function(e) {
			$(self).val($(self).val().substring(0,max));
		  },0);
								}
								else{
								return false;
								}
				});
		//Added for Poll Textarea Maxlength
		//Added for Poll Textarea Devices Alignment Fix
		$('.vote-comment').each(function(){ $(this).width($(this).closest('.poll-form').width()-33); });
		//Added for Poll Textarea Devices Alignment Fix
});