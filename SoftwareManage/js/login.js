/**
 * Created by qf on 2015/5/16.
 */
//先创建一个空的bbs.js文件，并修改其属性为utf-8，才能保存中文。
var xmlHttp;                        //用于保存XMLHttpRequest对象的全局变量
var username;                       //用于保存姓名
var pass;


//用于创建XMLHttpRequest对象
function createXmlHttp() {
    //根据window.XMLHttpRequest对象是否存在使用不同的创建方式
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();                  //FireFox、Opera等浏览器支持的创建方式
    } else {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");//IE浏览器支持的创建方式
    }
}


//提交回帖到服务器
function submitPost() {
    username = document.getElementById("username").value;
    passr= document.getElementById("pass").value;
    if (checkForm()) {
        createXmlHttp();                                    //创建XMLHttpRequest对象
        xmlHttp.onreadystatechange = submitPostCallBack;    //设置回调函数
        xmlHttp.open("POST", "bbspost.php", true);         //发送POST请求
        //设置POST请求体类型
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlHttp.send("uaername=" + encodeURI(username) +"&pass=" + encodeURI(pass));           //发送包含四个参数的请求体体
    }
}
//检查表单是否内容已填写完毕
function checkForm() {
    var myPhoneReg=/^\d{12}$/;
    var pass=/^\d{6}$/;
    if (username== "") {
        alert("请填写账号");
        return false;
    }else if (pass== "") {
        alert("请填写密码");
        return false;
    }else
    return true;

}
//获取查询选项的回调函数
function submitPostCallBack() {
    if (xmlHttp.readyState == 4) {
        createNewPost(xmlHttp.responseText);
    }
}/**
 * Created by qf on 2015/5/16.
 */
