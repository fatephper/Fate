/**
*��ȡform���ֶ�ֵ
*formId ��Id  fieldsҪ��ȡֵ���ֶ�����  returnType ���ݷ�������
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
*��ʼ��form�� 
*/
function formClear(){
	  $("input[type=reset]").trigger("click");
}

/**
*Input ���readOnly���� type true or false
*/
function readonly(id,type){
	
		if(type){
			document.getElementById(id).readOnly="readOnly";
		}else{
			document.getElementById(id).readOnly=false;
		}	
}

/**
*��ת url ·��
*/
function redirect(url){
		location.href=url;
}

/**
*��̬��ʾʱ����  onload="startTime()"
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
*����ʱ��
*/
function universalTime(){
		
		alert(123);
}
