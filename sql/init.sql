-- 用户表
create table if not exists user (
  id int unsigned auto_increment primary key,
  account varchar(32) default null,
  email varchar(64) default null,
  telphone varchar(11) default null,
  password varchar(32) default null,
  name varchar(32) default null,
  avatar varchar(1024) default null,
  profile varchar(255) default null,
  role varchar(32) default '',
  money int default 100,
  used_money int default 0,
  port int default 0,
  invite int default 0,
  create_at timestamp default current_timestamp,
  unique key user_account_unique (account),
  unique key user_email_unique (email),
  unique key user_telphone_unique (telphone)
) auto_increment=1024;

-- 验证码表
create table if not exists verify (
  id int unsigned auto_increment primary key,
  title varchar(64) default null,
  code varchar(16) default null,
  rest int(11) default '10',
  update_at bigint not null default 0
);

-- 文件表
create table if not exists file (
  id int unsigned auto_increment primary key,
  create_id int(11) default null,
  name varchar(128) default null,
  ext varchar(32) default null,
  md5 varchar(32) default null,
  create_at timestamp default current_timestamp
);

-- 记录表
create table if not exists history (
  id int unsigned auto_increment primary key,
  method varchar(32) default "",
  url varchar(1024) default "",
  req_header text,
  req_body longtext,
  code int unsigned,
  res_header text,
  res_body longtext,
  port int unsigned not null,
  create_at timestamp default current_timestamp
);

-- 记录备份表
create table if not exists history_backup (
  id int unsigned auto_increment primary key,
  method varchar(32) default "",
  url varchar(1024) default "",
  req_header text,
  req_body longtext,
  code int unsigned,
  res_header text,
  res_body longtext,
  port int unsigned not null,
  create_at timestamp default current_timestamp
);

-- 任务表
create table if not exists task (
  id int unsigned auto_increment primary key,
  title varchar(64) default "",
  method varchar(32) default "",
  url varchar(1024) default "",
  req_header text,
  req_body longtext,
  code int unsigned,
  res_header text,
  res_body longtext,
  uid int unsigned not null,
  lastrun_at bigint default 0,
  enable tinyint default 1,
  run_num int default 0,
  create_at timestamp default current_timestamp
);