/**
 * Created by qf on 2015/5/16.
 */
//先创建一个空的bbs.js文件，并修改其属性为utf-8，才能保存中文。
var xmlHttp;                        //用于保存XMLHttpRequest对象的全局变量
var groupName;                       //用于保存姓名
var leader;
var leaderId;                                   //用于保存标题
var testName;                        //用于保存内容
var timeS;                       //用于保存主题编号
var introduce;

var memberName0;
var memberName1;
var memberName2;
var memberName3;
var memberName4;

var memberName_0;
var memberName_1;
var memberName_2;
var memberName_3;
var memberName_4;

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
    groupName = document.getElementById("groupName").value;
    leader = document.getElementById("leader").value;
    leaderId = document.getElementById("leaderId").value;
    testName = document.getElementById("testName").value;
    timeS = document.getElementById("timeS").value;
    introduce=document.getElementById("introduce").value;

    memberName0 = document.getElementById("memberName0").value;
    memberName1 = document.getElementById("memberName1").value;
    memberName2= document.getElementById("memberName2").value;
    memberName3 = document.getElementById("memberName3").value;
    memberName4 = document.getElementById("memberName4").value;

    memberName_0 = document.getElementById("member0").value;
    memberName_1= document.getElementById("member1").value;
    memberName_2= document.getElementById("member2").value;
    memberName_3 = document.getElementById("member3").value;
    memberName_4 = document.getElementById("member4").value;
    if (checkForm()) {
        createXmlHttp();                                    //创建XMLHttpRequest对象
        xmlHttp.onreadystatechange = submitPostCallBack;    //设置回调函数
        xmlHttp.open("POST", "bbspost.php", true);         //发送POST请求
        //设置POST请求体类型
        xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlHttp.send("groupName=" + encodeURI(groupName) +"&leader=" + encodeURI(leader) +
            "&leaderId=" + encodeURI(leaderId) +
            "&testName=" + encodeURI(testName) +
            "&timeS=" + encodeURI(timeS)+
            "&introduce=" + encodeURI(introduce) +
            "&memberName=" + encodeURI(memberName)+
            "&memberId=" + memberId);           //发送包含四个参数的请求体体
    }
}
//检查表单是否内容已填写完毕
function checkForm() {
 var myPhoneReg=/^\d{12}$/ ;
    if (groupName  == "") {
        alert("请填写小组名称");
        return false;
    }else if (leader== "") {
        alert("请填写组长姓名");
        return false;
    }else if (leaderId== "") {
        alert("请填写组长学号");
        return false;
    }else if (testName == "") {
        alert("请填写实验题目");
        return false;
    }else if(!myPhoneReg.test(leaderId)){
        alert("学号为12位数字");
        return false;
    }else if(myReg.test(leaderId))
        return true;

}
//获取查询选项的回调函数
function submitPostCallBack() {
    if (xmlHttp.readyState == 4) {
        createNewPost(xmlHttp.responseText);
    }
}