function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
var sections=[];
//$cardcomparexml= $("#cardxml_comparecards").val()  || "";
$cardcomparexml= "javascripts/compare_new2.xml";
  if ($cardcomparexml != "") {
$.ajax({
    type: "GET",
    url: $cardcomparexml,
    dataType: "xml",
    success: function (xml) { var itemList='',cardsArr=[];
        var cardCarouselTemplate = 
			[
			'<div class="span3 positionrelative" data-category="{{categories}}">', '<div class="card_tick"><img src="images/tick_bullet_red.png" /></div>',
			' <img id="{{id}}"  class="cursor-hand cardsBorder">',
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
			var heroCategories = '', filterCategories = '',
				innerCarousel = $('<div>').append($('div[id^="comparecards"]').clone()).html();
			$(xml).find('categories').find('category').each(function(index, category) { 
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
					sections[i].subheaders[y].id = $(this)[0].id;
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
			 var cardCarouselTemplate = "";
			 var no_of_cards=0;
			$(cards).each(function() {
//console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
			
                var itemList = '';             
				var id = $(this).attr('id'),
				
				categoryList = $(this).find('categorylist').children(),
                cardName = $(this).find('name').text(),
                cardLink = $(this).find('cardlink').text(),
				imgurl = $(this).find('imgurl').text(),			
                applyLink = $(this).find('applylink').text();
                //console.log(name);
				
				   
			//console.log("----------");
			cardContent = cardCarouselTemplate
								.replace('{{categories}}', $.getCategoryList(categoryList))
								.replace('{{name}}', name)
								.replace('{{id}}', id)
								.replace('{{imgurl}}', imgurl);
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
			
			 //console.log(sections.length);
				for(var i=0;i<sections.length;i++)
				{
					name = $(this).find(sections[i].id).find('header').text();
					//console.log("gg->"+name);console.log(sections[i]);
					   //cardCarouselTemplate +=  ' data-name-'+sections[i].id+'="'+htmlEntities($(this).find(sections[i].id).find("header").text())+'"';
					    cardCarouselTemplate +=  ' data-name-'+sections[i].id+'="'+htmlEntities($(this).find(sections[i].id).find("header").text())+'"';
						
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
						 
						   cardCarouselTemplate +=  ' data-'+sections[i].subheaders[y].id+'="'+htmlEntities($(this).find(sections[i].subheaders[y].id).text())+'"';
						   
						   sections[i].subheaders[y].val[no_of_cards]={};
						   if($.trim($(this).find(sections[i].subheaders[y].id).text())!=""){
						   sections[i].subheaders[y].val[no_of_cards].card_id=id;
						    sections[i].subheaders[y].val[no_of_cards].text=$(this).find(sections[i].subheaders[y].id).text();}
						   
					}
					
					 items = $(this).find(sections[i].id).find('item');
					 	console.log(items);
					 	 sections[i].items.val[no_of_cards]={};
					$(items).each(function(g) { console.log("g->"+g);
						

						 cardCarouselTemplate +=  ' data-item-'+sections[i].id+'-'+g+'="'+htmlEntities($(this).text())+'"';
						 if($.trim($(this).text())!=""){

					sections[i].items.val[no_of_cards].card_id=id;
					sections[i].items.val[no_of_cards].item=$(this).text();
					}
					});
					
					 cardCarouselTemplate +=  ' data-moredetails-'+sections[i].id+'="'+htmlEntities($(this).find(sections[i].id).find("moredetails").text())+'"';
					 sections[i].moredetails[no_of_cards]={};
					  if($.trim($(this).find(sections[i].id).find("moredetails").text())!=""){
					 sections[i].moredetails[no_of_cards].card_id=id;
					  sections[i].moredetails[no_of_cards].val=$(this).find(sections[i].id).find("moredetails").text();
					  }
					  
					   
				}
				
				cardCarouselTemplate += [' class="cursor-hand cardsBorder">',
			' <div class="addCard" >',
			  '    <div class="h3-mimic">'+htmlEntities(name)+'</div>',  
			' </div>',  
			'</div>]'].join('\n');
			
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
			 
			$(document).ready(function(){
			$("#temp").on("click",function(){
				var selected_card=[3,1,2];
				var table_data="";
var template=' <div id="{{id}}" class="span3 cardItem subheading-compare" ><div class="block-1"><div class="col2header"><h3>{{name}}</h3></div><div style=" padding-bottom:10px;"><img src="{{card_image}}"/></div><div class="card-compare-apply"><div class="col2header"><a href="{{apply_link}}" class="btn btn-primary" onclick="cc_applynow(\'{{name}}\')">Apply now</a></div><a href="http://www.dbs.com.sg/personal/ib-anchor/redirect-cardstp.html" class="launch ui-link" onclick="cc_applyibanking(\'{{name}}\')">Apply via iBanking<span class="icn-arrow-red launch"></span></a></div><div class="btn-minus cursor-hand btn-remove card-compare-remove"> <i data-id="{{id}}" class"icon_cross-gray"></i>Remove</div></div></div>';
//console.log(sections);
console.log(sections)

//------------------------section1 Main card details
				var temp= sections[0];
				
					// console.log(temp.header.val);
					// console.log("bbbb->"+temp.header.val.length);
					 
					 var table_data1=[];
					 var present_count=0;
					for (var zz=0;zz<temp.header.val.length;zz++) {
						//console.log("zz->"+zz);
					  	var table_data_label="";
					
					
					table_data_label  = '<div class="span3 heading-compare"><div class="creditcard_name">'+temp.header.heading+'</div></div>';
						 if(typeof(temp.header.val[zz].card_id)!="undefined"){
						 //	console.log($.inArray(parseInt(temp.header.val[zz].card_id), selected_card));
						 var position = $.inArray(parseInt(temp.header.val[zz].card_id), selected_card);
						if( position != -1)
						{  //console.log("bbba->"+temp.header.val[zz].card_id);
							 
							 
							
							
							 
							
							 table_data1[position] = template.replace(/{{id}}/g,temp.header.val[zz].card_id)
												.replace(/{{name}}/g,temp.header.val[zz].text)
												.replace(/{{card_image}}/g,temp.header.val[zz].imgurl)
												.replace(/{{apply_link}}/g,temp.header.val[zz].applylink);
												 
											 
							
							
							// console.log("--------------------");
					 
							//console.log(table_data1);
					//console.log("--------------------");
					present_count++;
						}
						} 
					}
					var tempff="";
					if(present_count>0)
					{
						for(var pos=0;pos<table_data1.length;pos++)
						{
							tempff+=table_data1[pos];
							if(typeof(table_data1[pos])=="undefined"||(table_data1[pos]==""))
								tempff+='<div class="span3"></div>';

						}

					 table_data =table_data_label+tempff;
}
					table_data +='<div class="dottedline insertcard2"></div>';

				//	 $("#aa").html(table_data)
			 		
						var table_data1="";
					console.log(sections)
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
						 var position =$.inArray(parseInt(temp.header.val[zz].card_id), selected_card);
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
					 subheading ='<div class="row-fluid"><div class="span3 heading-compare creditcard_name min-height40"><div class="" >'+temp.header.heading+'</div></div>';
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
						console.log("z->"+z);
//------------------------other sections subheaders value						
							for (var y=0;y<temp.subheaders[z].val.length;y++) {
							if(typeof(temp.subheaders[z].val[y].card_id)!="undefined"){

									console.log("zz->"+temp.subheaders[z].val[y].card_id);
var position =$.inArray(parseInt(temp.subheaders[z].val[y].card_id), selected_card);
							if(position!= -1)
							{ console.log("y->"+temp.subheaders[z].val[y].card_id);
															
								
								
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

							console.log("t->"+tempff);
						}



									temp1 +=heading+tempff+'</div>';
							}
							
									
						}
//------------------------other sections moredetails
						var moredetails=[];
var tempff="",present_count2=0;

						for (var z=0;z<temp.moredetails.length;z++) {
						 
					 if(typeof(temp.moredetails[z].card_id)!="undefined"){
					 	var position =$.inArray(parseInt(temp.moredetails[z].card_id), selected_card);
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
							  var data_present=false;console.log("z->"+z);
						console.log(temp.items.val[z]);
						 
							if(typeof(temp.items.val[z].card_id)!="undefined"){

								 
var position =$.inArray(parseInt(temp.items.val[z].card_id), selected_card);
							if(position!= -1)
							{  
															
								
								
								data_present=true;
								 
								 tablelayout[position] += '<li>'+temp.items.val[z].item+'</li>';
 console.log( tablelayout[position]);
								 
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

							console.log("t->"+tempff1);
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
				//console.log(table_data);
			$("#aa").html(table_data); 

			});

			});
			/*
			 $(document).ready(function(){
			 console.log($("#a3"));
			 var selected=[];
			 selected[0]={};
			 	 selected[1]={};
  $.each($("#a3")[0].attributes, function(i, attrib){
     var name = attrib.name;
     var value = attrib.value;
	 selected[0][name]=value;
	 
	 if($.trim(selected[1][name])!="" && $.trim(selected[1][name]) !="")
   	console.log(name+"->"+value);
  });
  
    $.each($("#a4")[0].attributes, function(i, attrib){
     var name = attrib.name;
     var value = attrib.value;
	  selected[1][name]=value;
   	console.log(name+"->"+value);
  });
  
  console.log(selected[0]);
  console.log(selected[1]);
  
  });
 
*/
