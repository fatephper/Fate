function ajax(type, url, data, dataType, isAsync, isCache){
	
				 var status;
				 var isAsync = arguments[4]?arguments[4]:false;
				 var isCache = arguments[5]?arguments[5]:false;
				 
				 $.ajax({
				 	
					 	type:type,
					 	url:url,
					 	data:data,
					 	datatype:dataType,
					 	async:isAsync,
					 	cache,isCache,
					 	
					  beforeSend: function (XMLHttpRequest) {
	            
	          },
	
	          success: function (result) {
	          				status = result;
	          },
	
	          complete: function (XMLHttpRequest, textStatus) {
	             
	          },
	          
	          error: function (xhr, status, error) {
	               //alert(xhr.responseText);
	          }
				 })
				 
				 return status;		 
}