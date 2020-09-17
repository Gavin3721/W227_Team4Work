//引入模块
const myexpress = require('express'); //引入express框架
const mysql = require("mysql"); //引入mysql包
const bodyParser = require('body-parser'); //post传参const useRouter = require('./router/useRouter');//后缀名可省略

const app = myexpress(); //express框架

//配置


//bodyParser的配置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(myexpress.static(__dirname + '/public'));
//定义接口
app.post("/userLogin", (req, res) => {
    //1.接收用户传递的参数
    var username = req.body.UserName;
    var pwd = req.body.Pwd;
    console.log(username);
    console.log(pwd);
    //2.去数据库进行验证，返回相应的结果给用户
    //创建数据库连接
    var connect = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "manage"
    });
    //3.打开连接
    connect.connect();
    //4.操作数据库
    connect.query("select * from Staff where StaffName=? and Pwd=?", [username, pwd], function(err, data) {
            //err：null，表示没有错误
            if (err) {
                console.log(err);
                res.send({ code: 500, message: "数据库异常" });
            } else {
                if (data.length > 0) {
                    res.send({ code: 200, message: "登录成功", staffInfo: data[0] });
                } else {
                    res.send({ code: 200, message: "用户名或密码错误" });
                }
            }
        })
        //5.关闭连接
    connect.end();
})

//部门列表
app.post("/deptList", (req, res) => {
    //1、去数据库查询部门信息
    //2、创建数据库连接
    var connect = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "manage"
    });
    //3.打开连接
    connect.connect();
    //4.操作数据库
    connect.query("select * from department", [], function(err, data) {
            //err：null，表示没有错误
            if (err) {
                console.log(err);
                res.send({ code: 500, message: "数据库异常" });
            } else {
                res.send({ code: 200, data: data });
            }
        })
        //5.关闭连接
    connect.end();
})

//添加部门
app.post("/addDept", (req, res) => {
    //1、接收参数
    var deptname = req.body.deptName;
    var descript = req.body.deptDescript;
    //去数据库添加部门
    //2、创建数据库连接
    var connect = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "manage"
    });
    //3.打开连接
    connect.connect();
    //4.操作数据库
    connect.query("insert into department(DeptName,DeptDeScript) values (?,?)", [deptname, descript], function(err, data) {
            //err：null，表示没有错误
            if (err) {
                console.log(err);
                res.send({ code: 500, message: "数据库异常" });
            } else {
                //注:添加，删除，修改，都不会返回数据列表，返回的数据，当前一个受影响的行数
                if (data.affectedRows > 0) {
                    res.send({ code: 200, message: "添加成功" });
                } else {
                    res.send({ code: 200, message: "添加失败" });
                }
            }
        })
        //5.关闭连接
    connect.end();
})

//删除部门
app.get("/delDept", (req, res) => {
    //1、接收参数
    var DeptNo = req.query.DeptNo;
    //去数据库添加部门
    //2、创建数据库连接
    var connect = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "manage"
    });
    //3.打开连接
    connect.connect();
    //4.操作数据库
    connect.query("update department set Status = 0 where DeptNo = ?", [DeptNo], function(err, data) {
            //err：null，表示没有错误
            if (err) {
                console.log(err);
                res.send({ code: 500, message: "数据库异常" });
            } else {
                //注:添加，删除，修改，都不会返回数据列表，返回的数据，当前一个受影响的行数
                if (data.affectedRows > 0) {
                    res.send({ code: 200, message: "删除成功" });
                } else {
                    res.send({ code: 200, message: "删除失败" });
                }
            }
        })
        //5.关闭连接
    connect.end();
})

//修改部门
app.post("/editDept", (req, res) => {
    //1、接收参数
    var deptno = req.body.deptNo;
    var deptname = req.body.deptName;
    var descript = req.body.deptDescript;
    var status = req.body.status;
    //2、创建数据库连接
    var connect = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "manage"
    });
    //3.打开连接
    connect.connect();
    //4.操作数据库
    connect.query("update department set DeptName = ?, DeptDescript = ?, Status = ? where DeptNo = ?", [deptname, descript, status, deptno], function(err, data) {
            //err：null，表示没有错误
            if (err) {
                console.log(err);
                res.send({ code: 500, message: "数据库异常" });
            } else {
                //注:添加，删除，修改，都不会返回数据列表，返回的数据，当前一个受影响的行数
                if (data.affectedRows > 0) {
                    res.send({ code: 200, message: "修改成功" });
                } else {
                    console.log(obj);
                    res.send({ code: 200, message: "修改失败" });
                }
            }
        })
        //5.关闭连接
    connect.end();
})

app.listen(8888, function() {
    console.log('启动服务');
});