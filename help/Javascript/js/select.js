/**
 *@brief:  ȫѡ-��ѡ-ȫ��ѡ ���
 *@param:  type ѡ������ all ȫѡ reverse ��ѡ none ȫ��ѡ
 *@author: Fate
 **/
(function($){
	
		$.fn.extend({
			
					select:function(options){
						
							var params={
									type:"all",
							}
							
							$.fn.extend(params,options);
							
							return this.each(function(){
								
									switch (params.type){
										
											case 'all':
											
													$(this).prop('checked',true);
													
											break;
											
											case 'reverse':
											
													if($(this).prop('checked')==true){
																	
														 $(this).prop('checked',false);
													}else{
														
														 $(this).prop('checked',true);
													}
													
											break;
											
											case 'none':
											
													$(this).prop('checked',false);
													
											break;	
										
									}

							})
						
					}
		
		})
		
})(jQuery)