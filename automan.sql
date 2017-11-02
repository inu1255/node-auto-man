-- MySQL dump 10.13  Distrib 5.7.17, for osx10.12 (x86_64)
--
-- Host: localhost    Database: automan
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `create_id` int(11) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `ext` varchar(32) DEFAULT NULL,
  `md5` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knex_migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (22,'20170927220439_init_tables.js',1,'2017-10-31 13:55:38');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `knex_migrations_lock` (
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `params`
--

DROP TABLE IF EXISTS `params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `params` (
  `sid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `values` text,
  `active` int(11) DEFAULT '1',
  `lastrun_at` bigint(20) DEFAULT '0',
  `rid` int(11) DEFAULT NULL,
  PRIMARY KEY (`sid`,`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `params`
--

LOCK TABLES `params` WRITE;
/*!40000 ALTER TABLE `params` DISABLE KEYS */;
INSERT INTO `params` VALUES (2,2,'{\"$TOKEN\":\"011A1D4EA3AFAACA23BECFA6DDF27FAC\"}',1,17471,2),(6,2,'{\"$TOKEN\":\"011A1D4EA3AFAACA23BECFA6DDF27FAC\"}',1,17471,4),(8,2,'{\"$TOKEN\":\"shshshfp=272e05baca8dd12fff8ce430aac6162f; shshshfpa=55aad2a3-5181-aab9-53d5-207b53ad2419-1509526040; shshshsID=3735fb7b973b789ce340707f8a69dc65_1_1509526040204; shshshfpb=13a1c94c3af1441a081a4e70100ba81dac454b82fa1dc4b3559f98a184; TrackerID=y6IAcl6mTFV9z_F3Dha1Fc6iXlcAJ0sw00f9te3Z2LZ8wbNdrSQc_-jsUDh5MyHyhvMIa5wpYTFpoUPom40XpQxZEhoEmIs89Srf8Wv9by7mNoWfU4SC4s8cX1ug0t_s; pinId=ABpAHZUANeWehyQCw_pnnLV9-x-f3wj7; pt_key=AAFZ-YozADBnpaNyb7l4Xk3HoVu_KLiPUz2Vb3J-0rYK2wNywPBxBe_JMshRXyuAwMSxZf8E08Y; pt_pin=jd_4b97e4f23a2c1; pt_token=vugg6ttn; pwdt_id=jd_4b97e4f23a2c1; whwswswws=0T7Ip54FtAdA0swuFxf0CiqUY1x9dDtxjpNnQl67RDkvRIgleuUd5g%3D%3D; USER_FLAG_CHECK=040e08970ba695a260923a10c5fdb268; abtest=20171101164749060_04; mobilev=html5; sid=85de4b3da1b7d205e163a5c1a2528e11; __jda=122270672.15095260402471043001396.1509526040.1509526040.1509526070.2; __jdb=122270672.1.15095260402471043001396|2.1509526070; __jdv=122270672|iosapp|t_335139774|appshare|CopyURL|1509526070079; __jdc=122270672; __jdu=15095260402471043001396; mba_muid=15095260402471043001396; mba_sid=1509526040250400004829036400.2\"}',1,17471,6),(12,2,'{\"$COOKIE\":\"uid=8495; email=929909260%40qq.com; key=fb3447c04842acff22df48709014a0dd930e5842e9bee; Hm_lvt_63fa3ca62ddee0299ef59972f9957fae=1508982317; Hm_lpvt_63fa3ca62ddee0299ef59972f9957fae=1509007428; __cfduid=d1f4f70f2fc3537051c17c5956ff2df301509527039\"}',1,17471,8);
/*!40000 ALTER TABLE `params` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `record` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sid` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `params` text,
  `body` text,
  `code` text,
  `msg` text,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record`
--

LOCK TABLES `record` WRITE;
/*!40000 ALTER TABLE `record` DISABLE KEYS */;
INSERT INTO `record` VALUES (2,2,2,'{\"$TOKEN\":\"011A1D4EA3AFAACA23BECFA6DDF27FAC\"}','{\"result\":{\"obj\":null,\"code\":1,\"info\":\"\"}}','0','签到失败或已经签过了','2017-11-01 09:26:51'),(4,6,2,'{\"$TOKEN\":\"011A1D4EA3AFAACA23BECFA6DDF27FAC\"}','{\"dzpDraw\":{\"obj\":null,\"code\":1,\"info\":\"\"}}','0','抽奖失败','2017-11-01 09:27:31'),(6,8,2,'{\"$TOKEN\":\"shshshfp=272e05baca8dd12fff8ce430aac6162f; shshshfpa=55aad2a3-5181-aab9-53d5-207b53ad2419-1509526040; shshshsID=3735fb7b973b789ce340707f8a69dc65_1_1509526040204; shshshfpb=13a1c94c3af1441a081a4e70100ba81dac454b82fa1dc4b3559f98a184; TrackerID=y6IAcl6mTFV9z_F3Dha1Fc6iXlcAJ0sw00f9te3Z2LZ8wbNdrSQc_-jsUDh5MyHyhvMIa5wpYTFpoUPom40XpQxZEhoEmIs89Srf8Wv9by7mNoWfU4SC4s8cX1ug0t_s; pinId=ABpAHZUANeWehyQCw_pnnLV9-x-f3wj7; pt_key=AAFZ-YozADBnpaNyb7l4Xk3HoVu_KLiPUz2Vb3J-0rYK2wNywPBxBe_JMshRXyuAwMSxZf8E08Y; pt_pin=jd_4b97e4f23a2c1; pt_token=vugg6ttn; pwdt_id=jd_4b97e4f23a2c1; whwswswws=0T7Ip54FtAdA0swuFxf0CiqUY1x9dDtxjpNnQl67RDkvRIgleuUd5g%3D%3D; USER_FLAG_CHECK=040e08970ba695a260923a10c5fdb268; abtest=20171101164749060_04; mobilev=html5; sid=85de4b3da1b7d205e163a5c1a2528e11; __jda=122270672.15095260402471043001396.1509526040.1509526040.1509526070.2; __jdb=122270672.1.15095260402471043001396|2.1509526070; __jdv=122270672|iosapp|t_335139774|appshare|CopyURL|1509526070079; __jdc=122270672; __jdu=15095260402471043001396; mba_muid=15095260402471043001396; mba_sid=1509526040250400004829036400.2\"}','{\"errorMessage\":\"您今日已签到\",\"pin\":\"jd****a2c1\",\"code\":\"0\",\"success\":true}','0','签到成功','2017-11-01 09:27:36'),(8,12,2,'{\"$COOKIE\":\"uid=8495; email=929909260%40qq.com; key=fb3447c04842acff22df48709014a0dd930e5842e9bee; Hm_lvt_63fa3ca62ddee0299ef59972f9957fae=1508982317; Hm_lpvt_63fa3ca62ddee0299ef59972f9957fae=1509007428; __cfduid=d1f4f70f2fc3537051c17c5956ff2df301509527039\"}','{\"msg\":\"\\u60a8\\u4f3c\\u4e4e\\u5df2\\u7ecf\\u7b7e\\u5230\\u8fc7\\u4e86...\",\"ret\":1}','0','签到成功','2017-11-01 09:27:41');
/*!40000 ALTER TABLE `record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `service` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `create_by` int(11) DEFAULT NULL,
  `title` varchar(128) DEFAULT NULL,
  `desc` text,
  `url` varchar(1024) DEFAULT NULL,
  `body` text,
  `method` varchar(32) DEFAULT NULL,
  `headers` text,
  `params` text,
  `checks` text,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `service_title_unique` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (2,NULL,'移动掌上营业厅签到','*测试支持四川移动用户*\n\n**需要抓包**\n\n使用步骤\n\n1. 使用服务密码登录掌上营业厅\n2. 开始抓包\n3. 找到header或body中的SSOCookie字段\n4. 填入下面输入框中','http://218.205.252.24:18081/scmccCampaign/signCalendar/sign.do','{\"SSOCookie\":\"$TOKEN\"}','POST','{}','{\"$TOKEN\":\"SSOCookie\"}','{\"code[^\\\\d]+0[^\\\\d]\":\"签到成功\",\"code[^\\\\d]+1[^\\\\d]\":\"签到失败或已经签过了\"}','2017-11-01 07:16:21'),(6,NULL,'移动掌上营业厅大转盘','*测试支持四川移动用户*\n\n**需要抓包**\n\n使用步骤\n\n1. 使用服务密码登录掌上营业厅\n2. 开始抓包\n3. 找到header或body中的SSOCookie字段\n4. 填入下面输入框中','http://218.205.252.24:18081/scmccCampaign/dazhuanpan/dzpDraw.do?t=0.32153932745138225','{\"SSOCookie\":\"$TOKEN\"}','POST','{\"Content-Type\":\"application/x-www-form-urlencoded\"}','{\"$TOKEN\":\"SSOCookie\"}','{\"code[^\\\\d]+0[^\\\\d]\":\"抽奖成功\",\"code[^\\\\d]+1[^\\\\d]\":\"抽奖失败\"}','2017-11-01 08:46:28'),(8,NULL,'京东流量站签到','\n**需要cookie**\n\n使用步骤\n\n1. 访问[此链接](http://fbank.m.jd.com/index/index.action?_ts=1494138303148&resourceType=jdapp_share&resourceValue=CopyURL&utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=CopyURL&sid=85de4b3da1b7d205e163a5c1a2528e11)并登录\n2. 找到请求头中的Cookie字段\n3. 填入下面输入框中','https://fbank.m.jd.com/api.json?functionId=fBankSign&body=%7B%7D&_r=1494326081207','','GET','{\"Cookie\":\"$TOKEN\"}','{\"$TOKEN\":\"SSOCookie\"}','{\"code[^\\\\d]+0[^\\\\d]\":\"签到成功\",\"code[^\\\\d]+1[^\\\\d]\":\"签到失败\"}','2017-11-01 09:01:46'),(12,NULL,'poro签到','**需要Cookie**\n\n使用步骤\n\n1. 访问[此链接](http://www.poro.top/user)并登录\n2. 拿到Cookie\n3. 填入下面输入框中','http://www.poro.top/user/checkin','','POST','{\"Cookie\":\"$COOKIE\"}','{\"$COOKIE\":\"Cookie\"}','{\"ret[^\\\\d]+1[^\\\\d]\":\"签到成功\"}','2017-11-01 09:17:27');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `account` varchar(32) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `telphone` varchar(11) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `avatar` varchar(1024) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `role` varchar(32) DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_account_unique` (`account`),
  UNIQUE KEY `user_email_unique` (`email`),
  UNIQUE KEY `user_telphone_unique` (`telphone`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'inu1255','929909260@qq.com',NULL,'199337',NULL,NULL,NULL,'');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verify`
--

DROP TABLE IF EXISTS `verify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `verify` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(64) DEFAULT NULL,
  `code` varchar(16) DEFAULT NULL,
  `rest` int(11) DEFAULT '10',
  `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verify`
--

LOCK TABLES `verify` WRITE;
/*!40000 ALTER TABLE `verify` DISABLE KEYS */;
INSERT INTO `verify` VALUES (2,'929909260@qq.com','077021',-1,'2017-10-31 13:58:49');
/*!40000 ALTER TABLE `verify` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-02 10:41:23
