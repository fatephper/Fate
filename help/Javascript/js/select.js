/**
 *@brief:  全选-反选-全不选 插件
 *@param:  type 选择类型 all 全选 reverse 反选 none 全不选
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