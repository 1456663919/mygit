var DOM={};//�����ռ䣬���ӿռ䣬����ģʽ
//���eleԪ�ص�����ֵ
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
//��������ֵ�Ԫ��
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
//������еĸ��Ԫ�ؽڵ�
DOM.prevSiblings=function(ele){
    /*var nodes=ele.parentNode.childNodes;
     var a=[];
     for(var i=0;i<nodes.length;i++){
     var node=nodes[i];
     if(node==ele)return a;//���Լ��ģ���û�и���ˣ�ֹͣ���ҷ���
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
    //a.reverse();//�����ݷ�תһ��

    return a;
}
//������еĵܵܽڵ�
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
//���ele�����ڵĵ�һ��Ԫ�صܵܽڵ�
DOM.next=function(ele){
    /*var next=DOM.nextSiblings(ele)[0];
     return next?next:null;//������Ʒ��*/
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
//������ڵĵ�һ��Ԫ�ظ��ڵ�
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
//���parent��Ԫ���ӽڵ�
DOM.children=function(parent,strTagName){
//����еڶ�����������ʾ���ָ�ñ�ǩ����Ԫ�أ��ڶ���������ѡ��
    var nodes=parent.childNodes;
    var a=[];
    if(typeof strTagName=="string"){//������˵ڶ����������Ҵ�����
        strTagName=strTagName.toUpperCase();
        for(var i=0;i<nodes.length;i++){
            var node=nodes[i];
            if(node.tagName==strTagName){
                a.push(node);
            }
        }
    }else if(typeof strTagName=="undefined")//���û�д��ڶ�������
        for(var i=0;i<nodes.length;i++){
            var node=nodes[i];
            if(node.nodeType===1){
                a.push(node)
            }
        }
    else{
        throw new Error("�ڶ����������Ͳ���ȷ");
    }
    return a;
}

//������ݺ�Ļ�ȡ�����ڵ�
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
//�������
DOM.addClass=function(ele,strClass){
    var reg=new RegExp("(?:^| )"+strClass+"(?: |$)");
    if(!reg.test(ele.className))
        ele.className+=" "+strClass;
}
//�Ƴ�����
DOM.removeClass=function(ele,strClass){
    var reg=new RegExp("(?:^| )"+strClass+"(?: |$)","g");
    ele.className=ele.className.replace(reg,"");

}
//���Է�����
//F11����䣬F8��ϵ㣬F10�𷽷������ǵ�ǰ����������з������������˷�����

//�����飨arguments��ת��Ϊ����
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
//��õ�һ������Ԫ��
DOM.firstChild=function (curEle, tagName) {
    var children = this.children(curEle, tagName);
    return children.length > 0 ? children[0] : null;
};
//������һ������Ԫ��
DOM.lastChild = function (curEle, tagName) {
    var children = this.children(curEle, tagName);
    return children.length > 0 ? children[children.length - 1] : null;
};
//���½ڵ����Ϊ���ڵ���׸��ڵ�
DOM.prepend=function (newEle, container) {
    var firstEle = this.firstChild(container);
    firstEle ? container.insertBefore(newEle, firstEle) : container.appendChild(newEle);
};
//���½ڵ���뵽�Ͻڵ�֮ǰ��һ��Ԫ�ؽڵ�
DOM.insertAfter=function (newEle, oldEle) {
    var next = this.next(oldEle), parent = oldEle.parentNode;
    next ? parent.insertBefore(newEle, next) : parent.appendChild(newEle);
};
//���һ��Ԫ�ؽڵ�����ԣ�û������ֵ����������ֵ��������ֵ����������ֵ��
DOM.attr=function (curEle, property, value) {
    if (typeof value === "undefined") {
        return curEle[property];
    } else {
        curEle[property] = value;
    }
};
//������ݣ���ȡbody������ֵ
DOM.getWin = function (attr) {
    return document.documentElement[attr] || document.body[attr];
};
//������ݣ���ȡԪ�ؾ���body�ĸ߻��
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






