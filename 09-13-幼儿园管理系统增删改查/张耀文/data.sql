CREATE TABLE vueproject;
USE vueproject;

-- 部门表
CREATE TABLE `department` (
  `DeptNo` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,-- 部门id
  `DeptName` VARCHAR(50) NOT NULL,-- 部门名称
  `DeptDescript` VARCHAR(250) DEFAULT NULL,-- 部门的描述
  `Status` INT(11) DEFAULT '1',-- 部门状态，1：有效，0：删除
  `CreateDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- 创建时间
) ENGINE=INNODB DEFAULT CHARSET=utf8;

-- 职工表
CREATE TABLE `staff` (
  `StaffNo` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,-- 职工id
  `StaffName` VARCHAR(50) NOT NULL,-- 职工姓名
  `Pwd` VARCHAR(50) NOT NULL,-- 密码
  `Phone` VARCHAR(11) NOT NULL,-- 手机号
  `Job` VARCHAR(50) NOT NULL,-- 职务
  `DeptNo` INT(11) NOT NULL,-- 所属部门编号
  `BirthDay` DATE DEFAULT NULL,-- 出身年月
  `Sex` VARCHAR(2) DEFAULT NULL,-- 性别
  `Status` INT(11) DEFAULT '1',-- 员工状态，1：有效，0：删除，2：留岗
  `CreateDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP -- 创建时间
) ENGINE=INNODB DEFAULT CHARSET=utf8;




SELECT * FROM department ORDER BY createdate;

INSERT INTO department(deptname,deptdescript) VALUES ('11','22');

UPDATE department SET deptname = '22',deptdescript = '22',STATUS = '2' WHERE deptno = '5';

UPDATE department SET STATUS = '0' WHERE deptno = '5';


