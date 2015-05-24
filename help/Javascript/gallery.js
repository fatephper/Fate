/**
 *------------------------------ ͼƬ�ֲ�jQuery���---------------------------------
 *
 *  @param autoPlay   �Զ����� Ĭ��Ϊfalse
 *  @param speed      �����ٶ� Ĭ��Ϊ5�� ��λΪ����
 *  @param list       ����dom�ڵ� class����
 *  @param repeat     �������� x������� y�������� Ϊ����Ϊ��ʽ����Ĭ������
 *  @param prev       ������ǰ��ť class����  �������������
 *  @param next       �������ť class����  �������������
 *  @param num        һ�ε������ͼƬ�ƶ�����
 *  @param focusMap   ����ͼ class����
 *  @param focusPrev  ����ͼ��ǰ��ť class ���� �������������
 *  @param focusNext  ����ͼ���ť class ���� �������������
 *  @param focusEvent ����ͼ�л����¼�  1.ALL ��� ������ƶ����� 2.over ������ƴ��� 3.click ���������
 *  @param opacity    ����͸����  1Ϊ��͸�� ԽСԽ͸��
 */

(function($){
	$.fn.extend({
						 gallery:function(options){
						 			
						 			//Ĭ�ϲ����б�
						  		var params = {
						  				autoPlay:false,  					
						  				speed:5000,      					 
						  				list:'gallery_list',	 		 	
						  				repeat:'',								 
						  				prev:'prev',					 		 
						  				next:'next',					 		 
						  				num:1,                 	
						  				focusMap:'', 							
						  				focusPrev:'',		           
						  				focusNext:'',             
						  				focusEvent:'all',					 
						  				opacity:1
						  		}	
							  		
							  	$.fn.extend(params,options || {});
							  	
							  	return this.each(function(){
							  		
							  		var obj = $(this);
							  		var list_obj = $('.'+params.list,obj);	 			//���ȶ���
							  		var list_ul  = $('.'+params.list+' ul',obj);  //����UL����
							  		var list_li  = $('.'+params.list+' li',obj)   //����LI����
							  	  var list_width = list_obj.width();    				//���ȿ��
							  		var li_len = list_li.length;   					      //����LI����
										var li_width  = list_li.width();  					  //����LI��� ����magin ��li�߿����Զ�����
										var li_height = list_li.height(); 					  //����LI�߶�
										var focusIndex = 0;							 					    //���Ƚ���ͼ����
										var listIndex = 0;												    //��������
										var listMaxIndex =''                          //�����������ֵ
										
										var gallery = {
												
												//��ʼ������
												init:function(r){
													
													if(r=='x'){
														  this.setWidth();
													}
													
													if(r=='y'){
															this.setHeight();
													}
													
													if(focusMap!=''){
															this.setFocus();
													}
													
													this.setPrev();
													this.setNext();
												},
												
												//���û��ȸ߶�
												setHeight:function(){
													list_ul.css({height:li_height*li_len});
												},
												
												
												//���û��ȿ��
												setWidth:function(){
													list_ul.css({width:li_width*li_len});
												},
												
												//�Զ����ź���
												autoPlay:function(){
													
												},
												
												//�󶨻��Ƚ���ͼ�л��¼�
												setEvent:function(){
													
												},
												
												//������ǰ��ҳ
												setPrev:function(){
													  (function(f){
														  $('.'+params.prev,obj).click(function(){
														  		listIndex = listIndex-1;	
														  	  if(listIndex<0){
													 	  				listIndex=listMaxIndex-1;
													 				}
													 				focusIndex = focusIndex-listIndex*num;
														 	    f.setOffset();
														 	})
													   })(this);
												},
												
												//�������ҳ
												setNext:function(){
													  (function(f){
															$('.'+params.next,obj).click(function(){
																	listIndex  = listIndex+1;
																	if(listIndex>=listMaxIndex){
												 	  				listIndex=0;
												 					}
												 					focusIndex = focusIndex-+listIndex*num;
															    f.setOffset();
															})
														 })(this);
												},
																								
												//��ʾ����ͼ
												setFocus:function(){
														
													 var li_obj = list_li.eq(num);
													 if(params.focusName!=''){
															var focus_obj = $('#'+params.focusName);
														 	li_obj.addClass('curent').siblings().removeClass('curent');
														  var focus_url = $('a',li_obj).attr('href');
														  $('img',focus_obj).css('display','none');
														  $('img',focus_obj).css('z-index',99);
															$('img',focus_obj).attr('src',focus_url);
															$('img',focus_obj).fadeIn(500);
													  }
												},
												
												//����ƫ����
												setOffset:function(){
														
														var move_x = params.num*li_width*listIndex;
														if(move_x>=list_ul.width()){
																move_x = 0;
														}									
														list_ul.stop().animate({"margin-left":-move_x},500,function(){});
												}
										}
										
										gallery.init(params.repeat);
							  		
							  	});
				
						 }
	});
	
	
	
})(jQuery)