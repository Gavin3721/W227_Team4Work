const db = require("./sqlHelper");
const mRoute = require("express").Router();

//用户登录
mRoute.post("/userLogin", function (request, response) {
    let userName = request.body.userName;
    let loginPwd = request.body.loginPwd;
    const sql = "SELECT * FROM staff WHERE StaffName = ? AND Pwd = ?";
    db.mQuery(sql, [userName, loginPwd], function (err, data) {
        if (err) {
            console.log(err);
            response.send({ code: 500, message: "数据库错误，请联系管理员" });
        } else {
            if (data.length > 0) {
                response.send({ code: 200, message: "登录成功", staffInfo: data[0] });
            } else {
                response.send({ code: 200, message: "用户名或密码错误" });
            }
        }
    });
});

//部门列表
mRoute.post("/deptList", function (request, response) {
    let deptNo = request.body.deptNo;
    var param = [];
    let sql = "SELECT * FROM department where 1=1 ";
    if (deptNo) {
        sql += "and deptno = ?";
        param.push(deptNo);
    }
    sql += " ORDER BY createdate";
    db.mQuery(sql, param, function (err, data) {
        if (err) {
            console.log(err);
            response.send({ code: 500, message: "数据库错误，请联系管理员" });
        } else {
            response.send({ code: 200, data: data });
        }
    });
});

//添加部门
mRoute.post("/addDept", function (request, response) {
    let deptName = request.body.deptName;
    let deptDecript = request.body.deptDecript;
    const sql = "INSERT INTO department(deptname,deptdescript) VALUES (?,?)";
    db.mQuery(sql, [deptName, deptDecript], function (err, data) {
        if (err) {
            console.log(err);
            response.send({ code: 500, message: "数据库错误，请联系管理员" });
        } else {
            response.send({ code: 200, data: data });
        }
    });
});

//修改部门
mRoute.post("/updDept", function (request, response) {
    let deptName = request.body.deptName;
    let deptDecript = request.body.deptDecript;
    let status = request.body.status;
    let deptno = request.body.deptno;
    const sql = "UPDATE department SET deptname = ?,deptdescript = ?,status = ? where deptno = ?";
    db.mQuery(sql, [deptName, deptDecript, status, deptno], function (err, data) {
        if (err) {
            console.log(err);
            response.send({ code: 500, message: "数据库错误，请联系管理员" });
        } else {
            response.send({ code: 200, data: data });
        }
    });
});

//删除部门
mRoute.get("/delDept", function (request, response) {
    let deptno = request.query.deptno;
    const sql = "UPDATE department SET status = '0' WHERE deptno = ?";
    db.mQuery(sql, [deptno], function (err, data) {
        if (err) {
            console.log(err);
            response.send({ code: 500, message: "数据库错误，请联系管理员" });
        } else {
            response.send({ code: 200, data: data });
        }
    });
});

module.exports = mRoute;