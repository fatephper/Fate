<?php

	var_dump($_POST);	
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <link href="themes/default/css/umeditor.css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="third-party/jquery.min.js"></script>
    <script type="text/javascript" charset="utf-8" src="umeditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="umeditor.min.js"></script>
    <script type="text/javascript" src="lang/zh-cn/zh-cn.js"></script>
</head>
<body>

<!--style给定宽度可以影响编辑器的最终宽度-->
<form action="" method="post">
<textarea id="myEditor" style="width:1000px;height:240px;" name="myEditor">
    <p>这里我可以写一些输入提示</p>
</textarea>
<input type='submit'>
</form>
<script type="text/javascript">
    //实例化编辑器
    var um = UM.getEditor('myEditor');
</script>

</body>
</html>