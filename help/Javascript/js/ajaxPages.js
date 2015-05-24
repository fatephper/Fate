	(function($){
	$.fn.extend({
		ajaxPages:function(options){
			var params={
					url:"show.php",
					page:1,
					listNum:8,
					contentId:"#ajax_content",
					pageId:".ajax_page",
					countId:"#count",
			};
			$.fn.extend(params,options);
			
			return this.each(function(){
					
				var obj=$(this);
				var obj_content=$(params.contentId);
				var obj_page=$(params.pageId);
				var records=null;
				var page=null;
				var ajaxPages={
					init:function(){
						this.getContentHtml(params.page);
					},
					getContentHtml:function(_p){
						(function(t){
							page=(_p==undefined)?1:parseInt(_p);
							page = (page<0)?1:page;
							//records=ajax('get',params.url,'rd='+Math.random(),'text');
							var content = _ajax('get',params.url,'page='+page+'&rd='+Math.random(),'html');
							obj_content.html(content);
							records= parseInt($(params.countId).text());
							obj_page.html(t.getPageHtml())
							obj_page.find("p a").click(function(){
										t.getContentHtml(parseInt($(this).attr('page')));
							});
							obj_page.find("button").click(function(){
										t.getContentHtml(parseInt(obj_page.find("input").val()));
							})
						})(this);
					},
					
					getPageCounts:function(){
						var pageCounts=(records%params.listNum==0)?	(records/params.listNum) : parseInt(records /params.listNum)+1
						return pageCounts;
					},
					
					getPageHtml:function(){
						
										
						var pageHtml="<p style='padding-left:5px;'>";
						var pageCounts = this.getPageCounts();
						if (pageCounts >= 1)
						{
							  var forMin = '';
							  var forMax = '';
							  if((page-1)%5==0&& page==1){
							  		forMin = page;	
							 }else if(page%5==0){
							  		forMin = page-4;
							  }else{
							  		var bs = parseInt(page/5);
							  		forMin = (page>5)?(5*bs)+1:1;
							  }
							  forMax = forMin+4;
							  forMax = (forMax>pageCounts)?pageCounts:forMax;
							  if(forMin>5){
							 	 pageHtml+=" <a href='javascript:void(0);' page='"+(forMin-5)+"'>上5页</a>";
								}
								pageHtml+=" <a href='javascript:void(0);' page='1'>首页</a>";
								for (var i=forMin;i<=forMax;i++){
									var sty = (i==page)?'style=\'color:#0066CC\'':'';
									pageHtml+=" <a href='javascript:void(0);' page='"+i+"' "+sty+">"+i+"</a>";
								}
								if((forMax*30)<records){
									var ding = forMax+5 ;
									if(ding>pageCounts){
										ding = 	pageCounts;
									}
									pageHtml+=" <a href='javascript:void(0);' page='"+(forMax+1)+"'>...."+ding+"</a>";
									pageHtml+=" <a href='javascript:void(0);' page='"+(forMax+1)+"'>下5页</a>";
								}
								pageHtml+=" <a href='javascript:void(0);' page='"+pageCounts+"'>末页</a>";
								pageHtml+=" <span>跳至</span><input type='text' style='width:25px;' />页<button id='go'>Go</button>";
								
								
						 }
						 pageHtml+="</p>";
						 return pageHtml;
						 
					}
				};
				
				ajaxPages.init();
			});
		}
	});
})(jQuery)