var arr_num = new Array(16);
var arr_blank = new Array();



function getdate( ) {

    arr_blank = [];
    for (var i = 0 ; i < 16; i++) {
        var el=document.getElementById(i);
        if ( el.textContent == "" ){
            arr_blank.push(i);
            arr_num[i] = "";

        }else{
            arr_num[i]=el.textContent;
        }
    }

  

}

//获取数值之后就应该对数值进行计算，首先应该除去所有的空白节点，然后补全前面节点。
//补全之后就可以对数值进行判断是否相等，如果相等则相加，不等继续判断。
//由于我们显示时应该是下面的相等数值先进行计算。
function empty(index) {
    var num =new Array();
    for(var i = 3; i >= 0;i--){
        if(arr_num[index[i]] != 0 ){
            num.push(arr_num[index[i]])
        }
    }
    while(num.length != 4){
        num.push("");
    }

    return  num.reverse();

}


function add(index) {

    var num=empty(index);

    if(num[3] == 0)
        return num;

    if(num[2] == num[3]){
        num[2]=num[1];
        num[1]=num[0];
        num[0]="";
        num[3]= 2*num[3];

        if(num[0]== num[1]){
            num[0]= "";
            num[1]= 2*num[1];
            if(num[1]!=""){ return num;}

        }

    }

    if(num[1] == num[2]){
        num[1]=num[0];
        num[0]="";
        num[2]= 2*num[2];
        if(num[2]!=""){ return num;}
    }

    if(num[0]== num[1]){
        num[0]= "";
        num[1]= 2*num[1];
        if(num[1]!=""){ return num;}

    }
    return num;
}


function move(date,addnum) {
    var index = new Array(4);
    for(var i = 0; i < 4;i++){

        
        for(var m = 0; m < 4;m++){
            if(m == 0){
                index[m]= date[i];
            }else{
                index[m]= index[m-1]+ addnum;
            }
        }
        
         num = add(index);
        for( m = 0; m < 4;m++){
            arr_num[index[m]] = num[m];

        }

    }


    arr_blank = [];
    for(i = 0; i < 16 ;i++) {
        if (arr_num[i] == 0 ) {
            arr_num [i] = "";
            arr_blank.push(i);
        }
    }



}


// 随机获取一个空白节点位置，然后给其按照一定概率生成2或4；
function randpos(){

    //这里的num只是表示数组id，而我们在arr_num中需要的是元素id，元素id存储在数组id对应的值中
    var num = Math.floor(Math.random()*arr_blank.length);/*随机获取数组id*/
    var index=arr_blank[num]; /*获取数组id中对应的元素id、*/


    //获取到元素id之后就应该将其在数组中删除。
    
    arr_blank.splice(num,1);
    

    if (Math.random() < 0.8) {


        arr_num[index] =  2;

    } else {

        arr_num[index] = 4 ;

    }
}


//将数值渲染到页面中去。
function render(){

    for (var i = 0 ; i < 16; i++){
        if(arr_num[i] == undefined)
            arr_num[i]="";
        document.getElementById(i).textContent = arr_num[i] ;
        document.getElementById(i).style.color = getTextColor(arr_num[i]);

    }
}


//开始事件
document.querySelector("#start").addEventListener(
    "click",function(){
        arr_num=[];
        render();
        getdate();

        randpos();
        randpos();
        render();

    },false
);





//PC端上下左右事件
document.addEventListener(
    "keydown",function () {
        if(event.keyCode==37){
            getdate();
            move([3,7,11,15],-1);
            randpos();
            render();
            getHighSore();
        }
        if(event.keyCode==38){
            getdate();
            move([12,13,14,15],-4);
            randpos();
            render();
            getHighSore();

        }
        if(event.keyCode==39){
            getdate();
            move([0,4,8,12],1);
            randpos();
            render();
            getHighSore();
        }
        if(event.keyCode==40){
            getdate();
            move([0,1,2,3],4);
            randpos();
            render();
            getHighSore();
        }
    },false
);



//手机端触屏事件
(function(){
    var  startX,
         startY,
        moveEndX,
        moveEndY,
        X,
        Y;

document.querySelector(".wraper").addEventListener("touchstart", function(e) {
    e.preventDefault();
    startX = e.changedTouches[0].pageX;
    startY = e.changedTouches[0].pageY;
},{ passive: false })


document.querySelector(".wraper").addEventListener("touchend", function(e) {
    e.preventDefault();
    moveEndX = e.changedTouches[0].pageX;
        moveEndY = e.changedTouches[0].pageY;
        X = moveEndX - startX;
        Y = moveEndY - startY;

    if (  Math.abs(X) > Math.abs(Y) && X > 0 ) {
            getdate();
            move([0,4,8,12],1);
            randpos();
            render();
    }
    else if (Math.abs(X) > Math.abs(Y) && X < 0 ) {
            getdate();
            move([3,7,11,15],-1);
            randpos();
            render();
    }
    else if (  Math.abs(Y) > Math.abs(X) && Y > 0) {
            getdate();
            move([0,1,2,3],4);
            randpos();
            render();
    }
    else if( Math.abs(Y) > Math.abs(X) && Y < 0){
            getdate();
            move([12,13,14,15],-4);
            randpos();
            render();
    }

},{ passive: false })
})();



function getHighSore() {

    num = arr_num.slice();
    num.sort(function (a,b) {
        if(a=="")
            a=0;
        if(b=="")
            b=0;
      return (parseInt(a) - parseInt(b))
    })
    console.log(num[15]);
}


function getTextColor (num) {
    switch(parseInt(num, 10)){
        case 2  : return "blue";
        case 4  : return "yellow";
        case 8  : return "cyan";
        case 16 : return "#00BFFF"
        case 32 : return "#54FF9F"
        case 64 : return "#F4A460"
        case 128: return "#FF69B4"
        case 256: return "#DA70D6"
        case 512: return "#9370DB"
        case 1024: return "#4876FF"
        case 2048: return "#00C5CD"
        default : return "red";
    }
}