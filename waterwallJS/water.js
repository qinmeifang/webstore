 window.onload=function(){
        waterfall("greatWall","box");
        var dataInt={"data":[
            {"src":"1.jpg"},
            {"src":"2.jpg"},
            {"src":"3.jpg"},
            {"src":"4.jpg"},
            {"src":"5.jpg"},
            {"src":"6.jpg"},
            {"src":"7.jpg"},
            {"src":"0.jpg"}
        ]}
        window.onscroll=function(){
         if(checkScrollSlide()){
             var oParent=document.getElementById("greatWall");
            for(var i=0;i<dataInt.data.length;i++){
                var oBox=document.createElement("div");
                oBox.className="box";
                oParent.appendChild(oBox);
                var oPic=document.createElement("div");
                oPic.className="pic";
                oBox.appendChild(oPic);
                var oImag=document.createElement("img");
                oImag.src="img/"+dataInt.data[i].src;
                oPic.appendChild(oImag);
            }
            waterfall("greatWall","box");
         }
        }
    }
    function waterfall(parent,box){
        var oParent=document.getElementById(parent);
        var oBoxs=getByClass(oParent,box);
        var oBoxW=oBoxs[0].offsetWidth;
        var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
        oParent.style.cssText="width:"+oBoxW*cols+"px;margin:0 auto;";
        var hArr=[];
        for(var i=0;i<oBoxs.length;i++){
            if(i<cols){
                hArr.push(oBoxs[i].offsetHeight);
            }
            else{
                var minH=Math.min.apply(null,hArr);
                var index=getMinhIndex(hArr,minH);
                oBoxs[i].style.position="absolute";
                oBoxs[i].style.top=minH+"px";
                oBoxs[i].style.left=oBoxs[index].offsetLeft+"px";
                hArr[index]+=oBoxs[i].offsetHeight;
            }
        }
    }
    function getByClass(parent,clsName){
        var boxArr=new Array();
        var oElements=parent.getElementsByTagName("*");
        for(var i=0;i<oElements.length;i++){
            if(oElements[i].className==clsName){
                boxArr.push(oElements[i]);
            }
        }
        return boxArr;
    }
    function getMinhIndex(hArr,minH){
        for(var i in hArr){
            if(hArr[i]==minH){
                return i;
            }
        }
    }
    function checkScrollSlide(){
        var oParent=document.getElementById("greatWall");
        var oBox=getByClass(oParent,"box");
        var lastBoxH=oBox[oBox.length-1].offsetTop+Math.floor(oBox[oBox.length-1].offsetHeight/2);
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        var height=document.body.clientHeight||document.documentElement.clientHeight;
        return (lastBoxH<(scrollTop+height))?true:false;

    }