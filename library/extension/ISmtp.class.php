<?php  defined('IN_FATE') or die('access denied!');

        /**
         *@brief SMTP邮件发送类
         *@param $host  SMTP服务器地址
         *@param $port; 端口号
         *@param $type; 内置 还是用其他SMTP服务器
         *@param $user; 用户名
         *@param $pass; 密码
         *@param $auth  是否身份验证
         *@param $debug 是否调试信息
         **/

	 class ISmtp {
			 		
                private $host;
                private $port;
                private $type;
                private $user;
                private $pass;
                private $auth;
                private $socket;
                private $debug; 
                private $timeout = 40;
                private $local = 'localhost';
					 
                /**
                 * @brief 构造函数 
                 **/
                public function __construct($host,$user=false,$pass=false,$port=25){

                        $this->host = $host;
                        $this->port = $port;
                        $this->user = $user;
                        $this->pass = $pass;
                        $this->auth = ($user||$pass)? true:false;
                }
                
                /**
                 * @brief 过滤掉小括号内的内容 
                 **/
                private function stripAddress($address){

                        $comment = "\\([^()]*\\)";
                        while (preg_match('/'.$comment.'/i', $address))
                        {
                                $address = preg_replace('/'.$comment.'/i', "", $address);
                        }

                        return $address;
                }
					 
                /**
                 * @brief 过滤邮件发送地址
                 **/
                private function getAddress($address){

                        $address = preg_replace("/([ \t\r\n])+/i", "", $address);
                        $address = preg_replace("/^.*<(.+)>.*$/i", "\\1", $address);

                        return $address;
                }
					 
                /**
                 * @brief 发送邮件
                 **/
		public function sendMail($from='',$to='',$subject='',$body='',$additional_header='',$cc='',$bcc=''){
					 	
                        $from = $this->getAddress($this->stripAddress($from));
                        $body = preg_replace("/(^|(\r\n))(\\.)/i", "\\1.\\3", $body);
                        $header  = "MIME-Version:1.0\r\n";
                        $header.="To: $to\r\n";
                        $header.="From: $from<{$from}>\r\n";
                        $header.="Subject: $subject\r\n";
                        if(is_array($additional_header)){
                            foreach($additional_header as $k => $v){
                                $header.="{$k}: $v"."\r\n";
                            }
                        }else{
                            $header.=$additional_header;
                        }
                        $TO = explode(",",$this->stripAddress($to));
                        if(!empty($cc)){
                            $header.="Cc: $cc\r\n"; 
                            $TO = array_merge($TO,explode(",",$this->stripAddress($cc)));
                        }
                        !empty($darkcc) && $TO = array_merge($TO,explode(",",$this->stripAddress($darkcc)));
                        $sent = TRUE;

                        foreach ($TO as $mailTo){

                             if(empty($this->host)){  

                                    return mail($mailTo,'',$body,$header);
                             }

                             $mailTo = $this->getAddress($mailTo);

                             if(!$this->socketOpen($mailTo)){

                                     //此处添加日志记录打开失败
                                     $sent = false;
                                     continue;
                             }

                             if($this->smtpSend($this->local,$from,$mailTo,$header,$body)){

                                             //此处日志记录发送邮件成功
                              }else{

                                             //此处日志记录发送邮件失败
                                             $sent = false;
                              }
                              fclose($this->socket);
                        }
                        return $sent;
                  }
					 
                    /**
                     * @brief SMTP服务器发送
                     * @param $helo 服务器SMTP地址
                     * @param $from 发送地址
                     * @param $to   收件地址
                     * @param $header header头信息
                     * @param $body   邮件内容
                     **/
                    public function smtpSend($helo, $from, $to, $header, $body = ""){

                            if (!$this->smtp_putcmd("HELO", $helo))
                            {
                                    return $this->smtp_error("sending HELO command");
                            }

                            if($this->auth)
                            {
                                    if (!$this->smtp_putcmd("AUTH LOGIN", base64_encode($this->user)))
                                    {
                                            return $this->smtp_error("sending HELO command");
                                    }

                                    if (!$this->smtp_putcmd("", base64_encode($this->pass)))
                                    {
                                            return $this->smtp_error("sending HELO command");
                                    }
                            }
                            if (!$this->smtp_putcmd("MAIL", "FROM:<".$from.">"))
                            {
                                    return $this->smtp_error("sending MAIL FROM command");
                            }

                            if (!$this->smtp_putcmd("RCPT", "TO:<".$to.">"))
                            {
                                    return $this->smtp_error("sending RCPT TO command");
                            }

                            if (!$this->smtp_putcmd("DATA"))
                            {
                                    return $this->smtp_error("sending DATA command");
                            }

                            if (!$this->smtp_message($header, $body))
                            {
                                    return $this->smtp_error("sending message");
                            }

                            if (!$this->smtp_eom())
                            {
                                    return $this->smtp_error("sending <CR><LF>.<CR><LF> [EOM]");
                            }

                            if (!$this->smtp_putcmd("QUIT"))
                            {
                                    return $this->smtp_error("sending QUIT command");
                            }

                            return TRUE;
                    }
					 
                    /**
                     *@brief 链接socket
                     **/
                    public function socketOpen($address){

                            //if(!empty($this->host)){

                                    return $this->socketOpenLocal();
                            //}else{
                            //      return $this->socketOpenHost($address);
                            //}
                    }
					 
                    public function socketOpenLocal(){

                             $this->socket = @fsockopen($this->host,$this->port,$errno,$errstr,$this->timeout);

                                   if(!($this->socket && $this->socketOk())){
                                      //此处日志记录错误
                                      return false;
                                   }
                                   return true;
                    }
					 
                    public function socketOpenHost($address){

                        $domain = preg_replace("/^.+@([^@]+)$/i", "\\1", $address);
                        if (!@getmxrr($domain, $MXHOSTS))
                        {
                                //$this->log_write("Error: Cannot resolve MX \"".$domain."\"\n");
                                return FALSE;
                        }

                        foreach ($MXHOSTS as $host)
                        {
                                //$this->log_write("Trying to ".$host.":".$this->smtp_port."\n");
                                $this->socket = @fsockopen($host, $this->port, $errno, $errstr, $this->timeout);
                                if (!($this->socket && $this->socketOk())) {
                                        //$this->log_write("Warning: Cannot connect to mx host ".$host."\n");
                                        //$this->log_write("Error: ".$errstr." (".$errno.")\n");
                                        continue;
                                }
                                //$this->log_write("Connected to mx host ".$host."\n");
                                return TRUE;
                        }

                        //$this->log_write("Error: Cannot connect to any mx hosts (".implode(", ", $MXHOSTS).")\n");
                        return FALSE;
                    }
					 
                    public function socketOk(){

                                   $response = str_replace("\r\n", "", fgets($this->socket, 512));
                                   //$this->smtp_debug($response."\n");

                                   if (!preg_match("/^[23]/i", $response))
                                   {
                                           fputs($this->socket, "QUIT\r\n");
                                           fgets($this->socket, 512);
                                           //$this->log_write("Error: Remote host returned \"".$response."\"\n");
                                           return FALSE;
                                   }
                                   return TRUE;
                    }
					 
                    private function smtp_eom(){
                            fwrite($this->socket, "\r\n.\r\n");
                            $this->smtp_debug(". [EOM]\n");

                            return $this->socketOk();
                    }
					
                    private function smtp_debug($message){
                            if ($this->debug)
                            {
                                    echo $message."<br>";
                            }
                    }
					
                    private function smtp_putcmd($cmd, $arg = ""){

                            if ($arg != "")
                            {
                                    if($cmd=="") $cmd = $arg;
                                    else $cmd = $cmd." ".$arg;
                            }

                            fwrite($this->socket, $cmd."\r\n");
                            $this->smtp_debug("> ".$cmd."\n");

                            return $this->socketOk();
                    }

                    private function smtp_error($string){
                            //$this->log_write("Error: Error occurred while ".$string.".\n");
                            return FALSE;
                    }
					
                    /**
                     * @brief 邮件的信息处理
                     * @param string $header 头信息
                     * @param string $body 内容
                     * @return bool 信息处理状态
                     */

                    private function smtp_message($header, $body){

                            fwrite($this->socket, $header."\r\n".$body);
                            $this->smtp_debug("> ".str_replace("\r\n", "\n"."> ", $header."\n> ".$body."\n> "));
                            return TRUE;
                    }
				
			 
	}


?>