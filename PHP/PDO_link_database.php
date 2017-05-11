<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class dbconfig {

    private static $dbms = "mysql";
    private static $host = 'localhost';
    private static $port = '3306';
    private static $username = 'root';
    private static $password = '111111';
    private static $dbname = 'yanzi';
    private static $charset = 'utf-8';
    private static $dsn;

    /**
     * @return   返回pdo dsn配置 
     */
    public static function getdsn() {
        if (!isset(self::$dsn)) {
            self::$dsn = self::$dbms . ':host=' . self::$host . ';port=' .
                    self::$port . ';dbname=' . self::$dbname;
            if (strlen(self::$charset) > 0) {
                //self::$dsn = self::$dsn . ';charset=' . self::$charset;
                self::$dsn = self::$dsn;
            }
        }

        return self::$dsn;
    }

    public static function getusername() {
        return self::$username;
    }

    public static function getpassword() {
        return self::$password;
    }

    /**
     * 设置mysql数据库服务器主机 
     * @param  $host 主机的ip地址 
     */
    public static function sethost($host) {

        if (isset($host) && strlen($host) > 0)
            self::$host = trim($host);
    }

    /**

     * 设置mysql数据库服务器的端口 

     * @param  $port 端口 

     */
    public static function setport($port) {

        if (isset($port) && strlen($port) > 0)
            self::$port = trim($port);
    }

    /**

     * 设置mysql数据库服务器的登陆用户名 

     * @param  $username 

     */
    public static function setusername($username) {
        if (isset($username) && strlen($username) > 0)
            self::$username = $username;
    }

    /**

     * 设置mysql数据库服务器的登陆密码 
     * @param  $password 

     */
    public static function setpassword($password) {

        if (isset($password) && strlen($password) > 0)
            self::$password = $password;
    }

    /**

     * 设置mysql数据库服务器的数据库实例名 
     * @param  $dbname 数据库实例名 
     */
    public static function setdbname($dbname) {

        if (isset($dbname) && strlen($dbname) > 0)
            self::$dbname = $dbname;
    }

    /**

     * 设置数据库编码 
     * @param  $charset 

     */
    public static function setcharset($charset) {

        if (isset($charset) && strlen($charset) > 0)
            self::$charset = $charset;
    }

}

/**
 * 一个数据库操作工具类 
 */
class dbtemplate {

    /**

     * 返回多行记录 
     * @param  $sql 
     * @param  $parameters 

     * @return  记录数据 

     */
    public function queryrows($sql, $parameters = null) {

        return $this->exequery($sql, $parameters);
    }

    /**

     * 返回为单条记录 

     * @param  $sql 

     * @param  $parameters 

     * @return 

     */
    public function queryrow($sql, $parameters = null) {

        $rs = $this->exequery($sql, $parameters);

        if (count($rs) > 0) {

            return $rs[0];
        } else {

            return null;
        }
    }

    /**

     * 查询单字段，返回整数 

     * @param  $sql 

     * @param  $parameters 

     * @return 

     */
    public function queryforint($sql, $parameters = null) {

        $rs = $this->exequery($sql, $parameters);

        if (count($rs) > 0) {

            return intval($rs[0][0]);
        } else {

            return null;
        }
    }

    /**

     * 查询单字段，返回浮点数(float) 

     * @param  $sql 

     * @param  $parameters 

     * @return 

     */
    public function queryforfloat($sql, $parameters = null) {

        $rs = $this->exequery($sql, $parameters);

        if (count($rs) > 0) {

            return floatval($rs[0][0]);
        } else {

            return null;
        }
    }

    /**

     * 查询单字段，返回浮点数(double) 

     * @param  $sql 

     * @param  $parameters 

     * @return 

     */
    public function queryfordouble($sql, $parameters = null) {

        $rs = $this->exequery($sql, $parameters);

        if (count($rs) > 0) {

            return doubleval($rs[0][0]);
        } else {

            return null;
        }
    }

    /**

     * 查询单字段，返回对象，实际类型有数据库决定 

     * @param  $sql 

     * @param  $parameters 

     * @return 

     */
    public function queryforobject($sql, $parameters = null) {

        $rs = $this->exequery($sql, $parameters);

        if (count($rs) > 0) {

            return $rs[0][0];
        } else {

            return null;
        }
    }

    /**

     * 执行一条更新语句.insert / upadate / delete 
     * @param  $sql 
     * @param  $parameters 
     * @return  影响行数 
     */
    public function update($sql, $parameters = null) {

        return $this->exeupdate($sql, $parameters);
    }

    private function getconnection() {
        $conn = new PDO(dbconfig::getdsn(), dbconfig::getusername(), dbconfig::getpassword());
        //$conn->setattribute(pdo::attr_case, pdo::case_upper);
        return $conn;
    }

    private function exequery($sql, $parameters = null) {
        $conn = $this->getconnection();
        $stmt = $conn->prepare($sql);
        $stmt->execute($parameters);
        $rs = $stmt->fetchall();
        $stmt = null;
        $conn = null;
        return $rs;
    }

    private function exeupdate($sql, $parameters = null) {

        $conn = $this->getconnection();

        $stmt = $conn->prepare($sql);

        $stmt->execute($parameters);

        $affectedrows = $stmt->rowcount();

        $stmt = null;

        $conn = null;

        return $affectedrows;
    }

}
