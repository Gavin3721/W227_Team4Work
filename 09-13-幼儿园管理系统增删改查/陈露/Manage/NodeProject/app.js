
const myExpress=require('express');//引入express模块
const mysql=require("mysql");//引入mysql包
const bodyParser=require('body-parser');//post请求需要body接收参数，要引入包
const app=myExpress();//执行全局函数，返回一个服务
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(myExpress.static(__dirname+"/public"));
//定义登录接口
app.post("/userLogin",function (request,response) {
   // 1.接收用户传入的参数
    var username=request.body.UserName;
    var pwd=request.body.pwd;
    console.log(username);
    console.log(pwd);
    //2.去数据库验证，返回相应的结果给用户
    var  connect=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        port:3306,
        database:'Manage'
    });
  //3.打开连接
    connect.connect();
  //4.操作数据库
    connect.query("select * from Staff where StaffName=? and Pwd=?",[username,pwd],function (err,data) {

        if(err){
            console.log(err);
            response.send({code:500,message:"数据库异常"});
        }else{
            if(data.length>0){
                response.send({code:200,message:"登录成功",staffInfo:data[0]});
            }else {
                response.send({code:200,message:"用户或密码错误"});
            }
        }
    });
   //5.关闭连接
   connect.end();
})
//部门列表
app.post("/deptList",function (request,response) {
//  1.去数据库查询信息
    //2.去数据库验证，返回相应的结果给用户
    var connect=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        port:3306,
        database:'Manage'
    });
    //3.打开连接
    connect.connect();
    //4.操作数据库
    connect.query('select * from department',[],function (err,data) {
        if(err){
            console.log(err);
            response.send({code:500,message:"数据库异常"});
        }else{
            response.send({code:200,data:data});
        }
    });
    //5.关闭连接
    connect.end();
})
//添加部门
app.post("/addDept",function (request,response) {
//  1.接受参数
    //2.去数据库添加部门
    var deptname=request.body.DeptName;
    var descrip=request.body.DeptDescript;
    var connect=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        port:3306,
        database:'Manage'
    });
    //3.打开连接
    connect.connect();
    //4.操作数据库
    connect.query("insert into department(DeptName,DeptDescript) values(?,?)",[deptname,descrip],function (err,data) {
        if(err){
            console.log(err);
            response.send({code:500,message:"数据库异常"});
        }else{
            //注：添加、删除、修改都不会返回数据列表，返回的数据是当前受影响的行数
            if(data.affectedRows>0){
                response.send({code:200,message:'添加成功'});
            }else {
                response.send({code:200,message:'添加失败'});
            }

        }
    });
    //5.关闭连接
    connect.end();
})
//删除部门
app.get("/delDept",function (request,response) {
//  1.接受参数
    //2.去数据库添加部门
    var deptNo=request.query.deptNo;
    var connect=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        port:3306,
        database:'Manage'
    });
    //3.打开连接
    connect.connect();
    //4.操作数据库
    connect.query("update department set Status=0 where DeptNo=?",[deptNo],function (err,data) {
        if(err){
            console.log(err);
            response.send({code:500,message:"数据库异常"});
        }else{
            //注：添加、删除、修改都不会返回数据列表，返回的数据是当前受影响的行数
            if(data.affectedRows>0){
                response.send({code:200,message:'删除成功'});
            }else {
                response.send({code:200,message:'删除失败'});
            }

        }
    });
    //5.关闭连接
    connect.end();
})
//修改部门
app.post("/alterDept",function (request,response) {
//  1.接受参数
    //2.去数据库添加部门
    var deptNo=request.body.DeptNo;
    var deptName=request.body.DeptName;
    var deptDescript=request.body.DeptDescript;
    var Status=request.body.Status;
    var connect=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        port:3306,
        database:'Manage'
    });
    //3.打开连接
    connect.connect();
    //4.操作数据库
    connect.query("update department set DeptName=?,DeptDescript=?,Status=? where DeptNo=?",[deptName,deptDescript,Status,deptNo],function (err,data) {
        if(err){
            console.log(err);
            response.send({code:500,message:"数据库异常"});
        }else{
            //注：添加、删除、修改都不会返回数据列表，返回的数据是当前受影响的行数
            if(data.affectedRows>0){
                response.send({code:200,message:'修改成功'});
            }else {
                response.send({code:200,message:'修改失败'});
            }

        }
    });
    //5.关闭连接
    connect.end();
})
//修改后的数据保存

app.listen(8888);
console.log("服务启动");
/**
 * Created by cl on 2020/8/21.
 */
