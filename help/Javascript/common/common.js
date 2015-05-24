/**
*获取form表单字段值
*formId 表单Id  fields要获取值的字段数组  returnType 数据返回类型
*/
function formVals(formId,fields,returnType){    

			var  data;
			var  formArr = new Array();

			if (returnType == 'str' && fields == ''){
				 	 data = $("#"+formId).serialize();
					 return data;
			}

		  data = $("#"+formId).serializeArray();

			$.each( data, function(i, field){
				 var key = field.name;
				 var value = field.value;
				 formArr[key] = value;
			});

			if (returnType == 'str' && fields != ''){

					var strVal='' ;

					for(i=0;i<fields.length;i++){
						 strVal+=fields[i]+'='+formArr[fields[i]]+'&';
					}
					return strVal.substr(0,strVal.length-1);
			}


			if (returnType == 'arr' && fields == ''){

					return formArr;
			}

			if (returnType == 'arr' && fields != ''){

					var arrVal = new Array();

					for(i=0;i<fields.length;i++){
						 key = fields[i];
						 arrVal[key] = formArr[key];
					}
					return  arrVal;
			}
}

/**
*初始化form表单 
*/
function formClear(){
	  $("input[type=reset]").trigger("click");
}

/**
*Input 添加readOnly属性 type true or false
*/
function readonly(id,type){
	
		if(type){
			document.getElementById(id).readOnly="readOnly";
		}else{
			document.getElementById(id).readOnly=false;
		}	
}

/**
*跳转 url 路径
*/
function redirect(url){
		location.href=url;
}

/**
*动态显示时分秒  onload="startTime()"
*/
function startTime()
{
var today=new Date()
var h=today.getHours()
var m=today.getMinutes()
var s=today.getSeconds()
// add a zero in front of numbers<10
m=checkTime(m)
s=checkTime(s)
document.getElementById('txt').innerHTML=h+":"+m+":"+s
t=setTimeout('startTime()',500)
}

function checkTime(i)
{
if (i<10) 
  {i="0" + i}
  return i
}


/**
*测试时间
*/
function universalTime(){
		
		alert(123);
}
