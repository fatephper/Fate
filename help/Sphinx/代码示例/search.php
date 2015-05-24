<center>
					<h1>sphinx 420万&nbsp;条数据演示</h1>
					<form action='search.php' method='post'>
							<input type='text' name='keyword'>
							<input type='submit' value='搜索'>
					</form>
</center>

<?php
	if($_POST['keyword']){
	//把关键字赋值给变量
	$keyword=$_POST['keyword'];	
	// 包含Sphinx的api文件
	include 'sphinxapi.php';
	//创建sphinx对象
	$sphinx=new SphinxClient;
	// 与sphinx建立连接
	$sphinx->SetServer('localhost',9312);
	//排序模式，安时间排序	
	$sphinx->setSortMode("SPH_SORT_ATTR_DESC");
	//发送sphinx查询
	$res=$sphinx->query($keyword);
	//连接数据库
	$mysqli = new mysqli("localhost","root","caida","test");
	//根据查询返回数组的格式，循环提取匹配文件ID。
	$ids= join(',',array_keys($res['matches']));
	
	$sql = "select title,content,date_added from documents where id in({$ids})";
	$result=$mysqli->query($sql);

	echo "共用时<font color=green size=5>".$res['time']."</font>秒&nbsp&nbsp&nbsp&nbsp&nbsp";
	echo "本次查询共有<font color=green size=5>".$res['total']."$nbsp$nbsp$nbsp$nbsp$nbsp</font>条记录<br />";

	//高亮显示格式化
	$opts = array(
	"before_match"  => "<span style='font-weight:bold;color:red'>",
	"after_match"  => "</span>",
	"chunk_separator" => " ... ",
	"limit"    => 60,
	"around"   => 3,
	) ;
	
	//解析结果 循环开始
	while($row=$result->fetch_assoc()){
	//摘要，高亮显示函数，buildExcerpts
        //第一个参数是从数据库中查询的结果集。
	//第二个参数是索引的名字。
	//第三个参数是要高亮显示的关键字。
	//第四个参数是显示的字 格式化。
	$resu=$sphinx->buildExcerpts($row,main,$keyword,$opts);
	echo "<font size=4><a href=''>".$resu[0]."</font></a></br>"; //标题
	echo "<font size=2>".$resu[1]."</font></br>";  //摘要
	echo $resu[2]."</p>"; // 添加时间
		
	}//循环结束

}else{
	return;	
}
?>
