<center>
	<caption><h1>like  420万&nbsp;条数据演示</h1></caption>
	<form action='like.php' method='post'>
	<input type='text' name='keyword'>
	<input type='submit' value='搜索'>
	</form>
</center>
<?php	
	if($_POST['keyword']){
	$keyword=$_POST['keyword'];
	//连接数据库
	$mysqli=new mysqli("localhost", "root", "caida", "test");
	//组装sql语句
	$sql="select title,content,date_added from documents where title like '%{$keyword}%'";
	//设置开始查询时间
	$a=microtime(true);
	//发送sql语句
	$result=$mysqli->query($sql);
	//解析结果
		while($row=$result->fetch_assoc()){
			echo $row['title']."<br>";
			echo $row['content']."<br>";
			echo $row['date_added']."<br><br>";			
		}
	//获取总数
		$con=$mysqli->affected_rows;
		echo "本次查询共<font size=5 color=green>".$con.'</font>条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	//结束查询时间
	$b=microtime(true);
	//输出查询时间，保留4位
	echo '共用时<font size=5 color=green>'.round(($b-$a),4).'</font>秒';
}else{
	return;
}


?>
