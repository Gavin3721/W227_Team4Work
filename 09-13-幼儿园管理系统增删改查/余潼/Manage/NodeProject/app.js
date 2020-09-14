/**
 * Created by Administrator on 2020/8/20 0020.
 */
//引用模块
const myexpress = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const app = myexpress();
//配置
//bodyparser 的配置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(myexpress.static(__dirname+'/public'));

//
app.post("/userLogin",function (request,response){
    var username = request.body.UserName;
    var pwd = request.body.Pwd;
    console.log(username);
    console.log(pwd);
    //
    var connect=mysql.createConnection({
        host:"localhost",
        user:"root",
        pwd:"",
        database:"manage"
    });
    //
    connect.connect();
    //
    connect.query("select * from staff where StaffName=? and Pwd=?",[username,pwd],function (err,data){
        if(err){
            console.log(err);
            response.send({code:500,message:"数据库异常"});
        }else {
            if(data.length>0){
                response.send({code:200,message:"登录成功",staffInfo:data[0]});
            }else {
                response.send({code:200,message:"用户名或密码错误"});
            }
        }
    })
    //
    connect.end();
})
//部门列表
app.post("/deptList",function (request,response){
    //去数据库查询

    var connect=mysql.createConnection({
        host:"localhost",
        user:"root",
        pwd:"",
        database:"manage"
    });
    //
    connect.connect();
    //
    connect.query("select * from department",[],function (err,data){
        if(err){
            console.log(err);
            response.send({code:500,message:"数据库异常"});
        }else {
                response.send({code:200,data:data});
        }
    })
    //
    connect.end();
})
//添加部门
app.post("/addDept",function (request,response){
    //接受参数
    var deptname = request.body.deptName;
    var deptscript = request.body.deptDescript
    //取数据库添加部门
    var connect=mysql.createConnection({
        host:"localhost",
        user:"root",
        pwd:"",
        database:"manage"
    });
    //
    connect.connect();
    //
    connect.query("insert into department(DeptName,DeptDescript) values (?,?)",[deptname,deptscript],function (err,data){
        if(err){
            console.log(err);
            response.send({code:500,message:"数据库异常"});
        }else {
            if(data.affectedRows>0){
                response.send({code:500,message:"添加成功"});
            }
            response.send({code:500,message:"添加失败"});
        }
    })
    //
    connect.end();
})

app.listen(8888,function (){
    console.log('服务启动');
});
