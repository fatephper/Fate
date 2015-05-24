/**
 *------------------------------ 图片轮播jQuery插件---------------------------------
 *	@author Fate
 *  @param  autoPlay   自动播放 默认为false
 *  @param  speed      播放速度 默认为5秒 单位为毫秒
 *  @param  list       画廊dom节点 class名称
 *  @param  repeat     画廊走向 x代表横向 y代表纵向 为空则为样式控制默认走向
 *  @param  prev       画廊向前按钮 class名称  （鼠标点击触发）
 *  @param  next       画廊向后按钮 class名称  （鼠标点击触发）
 *  @param  num        一次点击画廊图片移动个数
 *  @param  focus      焦点图ID名称
 *  @param  focusPrev  焦点图向前按钮 class 名称 （鼠标点击触发）
 *  @param  focusNext  焦点图向后按钮 class 名称 （鼠标点击触发）
 *  @param  focusEvent 焦点图切换绑定事件  1.ALL 点击 鼠标上移都触发 2.over 鼠标上移触发 3.click 鼠标点击触发
 *  @param  opacity    画廊透明度  1为不透明 越小越透明
 **/

(function($){
	$.fn.extend({
						 gallery:function(options){
						 			
						 			//默认参数列表
						  		var params = {
						  				autoPlay:false,  					
						  				speed:5000,      					 
						  				list:'gallery_list',	 		 	
						  				repeat:'x',								 
						  				prev:'prev',					 		 
						  				next:'next',					 		 
						  				num:1,                 	
						  				focus:'gallery_focus', 							
						  				focusPrev:'focus_prev',		           
						  				focusNext:'focus_next',             
						  				focusEvent:'all',					 
						  				opacity:1
						  		}	
							  		
							  	$.fn.extend(params,options || {});
							  	
							  	return this.each(function(){
							  		
							  		var obj = $(this);
							  		var list_obj = $('.'+params.list,obj);	 			//画廊对象
							  		var list_ul  = $('.'+params.list+' ul',obj);  //画廊UL对象
							  		var list_li  = $('.'+params.list+' li',obj)   //画廊LI对象
							  	  var list_width = list_obj.width();    				//画廊宽度
							  		var li_len = list_li.length;   					      //画廊LI数量
										var li_width  = list_li.width()+14;  					//画廊LI宽度      若有magin 和li边框请自动计算 该插件现无自动计算
										var li_height = list_li.height(); 					  //画廊LI高度
										var focusIndex = 0;							 					    //画廊焦点图索引
										var listIndex = 0;												    //画廊索引
										var listMaxIndex =parseInt((li_len*li_width)/(params.num*li_width))+1  //画廊索引最大值 请自动计算 该插件现无自动计算
										
										var gallery = {
												
												//初始化函数
												init:function(r){
													
													if(r=='x'){  						   //若画廊为x轴走向 则设置UL宽度
														  this.setWidth();
													}
													
													if(r=='y'){
															this.setHeight();		   //若画廊为Y轴走向 则设置UL高度
													}
													
													this.setFocus(); 					 //初始化焦点图
													
													this.setPrev();				     //绑定画廊向前点击事件按钮
													
													this.setNext();					   //绑定画廊向后点击事件按钮
												},
												
												//设置画廊高度
												setHeight:function(){
													list_ul.css({height:li_height*li_len});
												},
												
												
												//设置画廊宽度
												setWidth:function(){
													list_ul.css({width:li_width*li_len});
												},
												
												//自动播放函数
												autoPlay:function(){
													
												},
												
												//绑定画廊焦点图切换事件
												setEvent:function(){
													
												},
												
												//画廊向前翻页
												setPrev:function(){
													  (function(f){
														  $('.'+params.prev,obj).click(function(){
														  	
														  		listIndex = listIndex-1;	
														  	  if(listIndex<0){
													 	  				listIndex=listMaxIndex-1;
													 				}
													 				focusIndex = listIndex*params.num;
														 	    f.setOffset();
														 	    f.setFocus();
														 	})
													   })(this);
												},
												
												//画廊向后翻页
												setNext:function(){
													  (function(f){
															$('.'+params.next,obj).click(function(){
																	listIndex  = listIndex+1;
																	if(listIndex>=listMaxIndex){
												 	  				listIndex=0;
												 					}
												 		
												 					focusIndex = listIndex*params.num;
															    f.setOffset();
															    f.setFocus();
															})
														 })(this);
												},
																								
												//显示焦点图
												setFocus:function(){
													
													  var li_obj = list_li.eq(focusIndex);
													  if($('#'+params.focus).length>0){ 
																var focus_obj = $('#'+params.focus);
															 	li_obj.addClass('curent').siblings().removeClass('curent');
															  var focus_url = $('img',li_obj).attr('src');
															  $('img',focus_obj).css('display','block');
															  $('img',focus_obj).css('z-index',99);
																$('img',focus_obj).attr('src',focus_url);
																$('img',focus_obj).fadeIn(500);
														}
												},
												
												//画廊偏移量
												setOffset:function(){

														var move_x = params.num*li_width*listIndex;
	
														if(move_x>=list_ul.width()){
																move_x = 0;
														}									
														list_ul.stop().animate({"margin-left":-(move_x)},500,function(){});
														
												}
										}
										
										gallery.init(params.repeat);
							  		
							  	});
				
						 }
	});
	
	
	
})(jQuery)