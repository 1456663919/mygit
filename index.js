var DOM={};//命名空间，名子空间，单例模式
//获得ele元素的索引值
DOM.getIndex=function (ele){
    var index=0;
    var prev=ele.previousSibling;
    while(prev){
        if(prev.nodeType===1){
            index++
        }
        prev=prev.previousSibling;
    }
    return index;
}
//1==true; 0=="";false==0;
//获得所有兄弟元素
DOM.siblings=function(ele){
    var nodes=ele.parentNode.childNodes;
    var a=[];
    for(var i = 0;i<nodes.length;i++){
        var node=nodes[i];
        if(node==ele)continue;
        if(node.nodeType===1){
            a.push(node);
        }
    }
    return a;
}
//获得所有的哥哥元素节点
DOM.prevSiblings=function(ele){
    /*var nodes=ele.parentNode.childNodes;
     var a=[];
     for(var i=0;i<nodes.length;i++){
     var node=nodes[i];
     if(node==ele)return a;//到自己的，就没有哥哥了，停止并且返回
     if(node.nodeType===1){
     a.push(node);
     }
     }*/

    var prev=ele.previousSibling;
    var a=[];
    while(prev){
        if(prev.nodeType===1){
            //a.push(prev);
            a.unshift(prev);
        }
        prev=prev.previousSibling;
    }
    //a.reverse();//把数据反转一下

    return a;
}
//获得所有的弟弟节点
DOM.nextSiblings=function(ele){
    /*var nodes=ele.parentNode.childNodes;
     var a=[];
     for(var i=nodes.length-1;i>=0;i--){
     var node=nodes[i];
     if(node==ele)return a;
     if(node.nodeType===1){
     a.unshift(node);
     }
     }*/

    var next=ele.nextSibling;
    var a=[];
    while(next){
        if(next.nodeType===1){
            a.push(next);
        }
        next=next.nextSibling;
    }
    return a;
}
//获得ele的相邻的第一个元素弟弟节点
DOM.next=function(ele){
    /*var next=DOM.nextSiblings(ele)[0];
     return next?next:null;//保障人品的*/
    if(ele.nextElementSibling){
        return ele.nextElementSibling;//
    }
    var next=ele.nextSibling;
    while(next){
        if(next.nodeType===1){
            return next;

        }
        next=next.nextSibling;
    }
}
//获得相邻的第一个元素哥哥节点
DOM.prev=function(ele){
    if(ele.previousElementSibling){
        return ele.previousElementSibling;
    }
    var prev=ele.previousSibling;
    while(prev){
        if(prev.nodeType===1){
            return prev;
        }
        next=next.previousSibling;
    }
}
//获得parent的元素子节点
DOM.children=function(parent,strTagName){
//如果有第二个参数，表示获得指得标签的子元素（第二个参数可选）
    var nodes=parent.childNodes;
    var a=[];
    if(typeof strTagName=="string"){//如果传了第二个参数并且传对了
        strTagName=strTagName.toUpperCase();
        for(var i=0;i<nodes.length;i++){
            var node=nodes[i];
            if(node.tagName==strTagName){
                a.push(node);
            }
        }
    }else if(typeof strTagName=="undefined")//如果没有传第二个参数
        for(var i=0;i<nodes.length;i++){
            var node=nodes[i];
            if(node.nodeType===1){
                a.push(node)
            }
        }
    else{
        throw new Error("第二参数的类型不正确");
    }
    return a;
}

//处理兼容后的获取类名节点
DOM.getElesByClass=function (strClass){
    strClass=strClass.replace(/^ +| +$/g,"");
    var aClass=strClass.split(/ +/);
    var a=document.getElementsByTagName("*");
    for(var i=0;i<aClass.length;i++){
        //a=byClass(aClass[i],a);
        var reg=new RegExp("(?:^| )"+aClass[i]+"(?: |$)");
        var aResult=[];
        for(var j=0;j<a.length;j++){
            var ele=a[j]
            if(reg.test(ele.className)){
                aResult.push(ele);
            }
        }
        a=aResult;
    }
    return a;
}
//添加类名
DOM.addClass=function(ele,strClass){
    var reg=new RegExp("(?:^| )"+strClass+"(?: |$)");
    if(!reg.test(ele.className))
        ele.className+=" "+strClass;
}
//移除类名
DOM.removeClass=function(ele,strClass){
    var reg=new RegExp("(?:^| )"+strClass+"(?: |$)","g");
    ele.className=ele.className.replace(reg,"");

}
//调试方法：
//F11逐语句，F8逐断点，F10逐方法（就是当前代码里如果有方法，则跳过此方法）

//类数组（arguments）转化为数组
DOM.listToArray=function(likeArray){
    var ary = [];
    try {
        ary = Array.prototype.slice.call(likeArray, 0);
    } catch (e) {
        for (var i = 0; i < likeArray.length; i++) {
            ary[i] = likeArray[i];
        }
    }
    return ary;
};
//获得第一个儿子元素
DOM.firstChild=function (curEle, tagName) {
    var children = this.children(curEle, tagName);
    return children.length > 0 ? children[0] : null;
};
//获得最后一个儿子元素
DOM.lastChild = function (curEle, tagName) {
    var children = this.children(curEle, tagName);
    return children.length > 0 ? children[children.length - 1] : null;
};
//把新节点插入为父节点的首个节点
DOM.prepend=function (newEle, container) {
    var firstEle = this.firstChild(container);
    firstEle ? container.insertBefore(newEle, firstEle) : container.appendChild(newEle);
};
//把新节点插入到老节点之前第一个元素节点
DOM.insertAfter=function (newEle, oldEle) {
    var next = this.next(oldEle), parent = oldEle.parentNode;
    next ? parent.insertBefore(newEle, next) : parent.appendChild(newEle);
};
//获得一个元素节点的属性（没有属性值，返回属性值；有属性值，设置属性值）
DOM.attr=function (curEle, property, value) {
    if (typeof value === "undefined") {
        return curEle[property];
    } else {
        curEle[property] = value;
    }
};
//处理兼容，获取body的属性值
DOM.getWin = function (attr) {
    return document.documentElement[attr] || document.body[attr];
};
//处理兼容，获取元素距离body的高或宽
DOM.offset = function (curEle) {
    var par = curEle.offsetParent, top = 0, left = 0;
    top += curEle.offsetTop;
    left += curEle.offsetLeft;
    while (par) {
        top += par.offsetTop;
        left += par.offsetLeft;
        if (navigator.userAgent.indexOf("MSIE 8.0") < 0) {
            top += par.clientTop;
            left += par.clientLeft;
        }
        par = par.offsetParent;
    }
    return {top: top, left: left};
};






