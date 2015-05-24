<center>
					<h1>sphinxSE 420万&nbsp;条数据演示</h1>
					<form action='sphinxSE.php' method='post'>
					<input type='text' name='keyword'>
					<input type='submit' value='搜索'>
					</form>
</center>
<?php
	if($_POST['keyword']){
	$keyword=$_POST['keyword'];
	//连接数据库
	$mysqli = new mysqli("localhost","root","caida","test");
	//拼装sql语句，按sphinxSE的形式
	$sql="select d.title,d.content,d.date_added from t1 join documents as d on t1.id = d.id and t1.query='{$keyword};index=delta'";
	//发送sql语句
	$result=$mysqli->query($sql);
	//解析结果
	while($row=$result->fetch_assoc()){
		echo $row['title']."<br />";
		echo $row['content']."<br />";
		echo $row['date_added']."<br /><br />";
		}

	}else{
		return;
	}
?>
