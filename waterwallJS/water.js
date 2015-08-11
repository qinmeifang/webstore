 window.onload=function(){
        waterfall("greatWall","box");
        var dataInt={"data":[
            {"src":"img/1.jpg"},
            {"src":"img/2.jpg"},
            {"src":"img/3.jpg"},
            {"src":"img/4.jpg"},
            {"src":"img/5.jpg"},
            {"src":"img/6.jpg"},
            {"src":"img/7.jpg"},
            {"src":"img/0.jpg"}
        ]
    }
       function loadImage(url,callback) {
    	var img = new Image();
    
    	img.src = url;
 
    	if(img.complete) {  // 如果图片已经存在于浏览器缓存，直接调用回调函数
        
        callback.call(img);
        return; // 直接返回，不用再处理onload事件
    	}
 
    	img.onload = function(){
        img.onload = null;
        callback.call(img);
    	}
	}


        window.onscroll=function(){
         if(checkScrollSlide()){
             var oParent=document.getElementById("greatWall");
            for(var i=0;i<dataInt.data.length;i++){
            	loadImage(dataInt.data[i].src,callback)
            	function callback(img){
            	var oBox=document.createElement("div");
                oBox.className="box";
                oParent.appendChild(oBox);
                var oPic=document.createElement("div");
                oPic.className="pic";
                oBox.appendChild(oPic);
                //创建Image对象，保证所有图片都能被浏览器缓存
                //var oImg=new  Image();
                //oImg.src=dataInt.data[i].src;
                oPic.appendChild(img);
            	}
               
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