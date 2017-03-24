var arr_num = new Array(16);
var arr_blank = new Array();


/*
 * arr_blank存储的是空白节点的id，通过随机获取空白节点id
 *arr-num[16]存储的是对应节点的数字值。
 * */
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

    // console.log("取值时：arr_blank="+ arr_blank );
    // console.log("取值时：arr_num="+ arr_num );

}


// 随机获取一个空白节点位置，然后给其按照一定概率生成2或4；
function randpos(){

    //这里的num只是表示数组id，而我们在arr_num中需要的是元素id，元素id存储在数组id对应的值中
    var num = Math.floor(Math.random()*arr_blank.length);/*随机获取数组id*/
    var index=arr_blank[num]; /*获取数组id中对应的元素id、*/

    //获取到元素id之后就应该将其在数组中删除。
    // console.log(arr_blank);
    arr_blank.splice(num,1);
    // console.log(arr_blank);

    if (Math.random() < 0.8) {

        // arr_num[num] = 2 ;这是错误的，元素id不对应
        arr_num[index] =  2;

    } else {

        arr_num[index] = 4 ;

    }

    // console.log("随机位置：arr_blank="+ arr_blank );
    // console.log("随机位置：arr_num="+ arr_num );
}

//将数值渲染到页面中去。
function render(){

     for (var i = 0 ; i < 16; i++){

        document.getElementById(i).textContent = arr_num[i] ;

     }
    // console.log("渲染时：arr_blank="+ arr_blank );
    // console.log("渲染时：arr_num="+ arr_num );
}

function move(date,addnum) {
    var index = new Array(4);
    for(var i = 0; i < 4;i++){

        /*取出一行或者一列元素id*/
        for(var m = 0; m < 4;m++){
            if(m == 0){
                index[m]= date[i];
            }else{
                index[m]= index[m-1]+ addnum;
            }
        }
        /*对一行或者一列进行计算*/
         num = add(index);
        for( m = 0; m < 4;m++){
            arr_num[index[m]] = num[m];

        }

    }


    for(i = 0; i < 16 ;i++) {
        if (arr_num[i] == 0) {
            arr_num [i] = "";
        }
    }



}


function empty(index) {

    var num =new Array();
    for(var i = 3; i >= 0;i--){
        if(arr_num[index[i]] != 0){
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



    if(num[0]== num[1]){
        num[0]= "";
        num[1]= 2*num[1];
        if(num[1]!=""){ return num;}

    }
    if(num[1] == num[2]){
        num[1]=num[0];
        num[0]="";
        num[2]= 2*num[2];
        if(num[2]!=""){ return num;}
    }
    if(num[2] == num[3]){
        num[2]=num[1];
        num[1]=num[0];
        num[3]= 2*num[3];
        if(num[3]!=""){ return num;}
    }




    return num;
}


// function move(date,addnum) {
//         var index = new Array(4);
//     for (var i = 0 ; i < 4; i++){
//             index[0] = date[i];
//             index[1] = index[0] + addnum;
//             if(arr_num[index[0]] == arr_num [index[1]]){
//                 arr_num[index[0]] = "";
//                 arr_num[index[1]] = arr_num[index[1]] * 2 ;
//                 index[2] = index [1] + addnum ;
//
//            }else if (arr_num[index[1]] == arr_num [index[2]]){
//                 arr_num[index[0]] = "";
//                 arr_num[index[1]] =arr_num[index[0]];
//                 arr_num[index[2]] = arr_num[index[2]] * 2 ;
//                 index[3] = index [3] + addnum ;
//             }else if(arr_num[index[2]] == arr_num [index[3]]){
//                 arr_num[index[0]] = "";
//                 arr_num[index[1]] =arr_num[index[0]];
//                 arr_num[index[2]] = arr_num[index[1]];
//                 arr_num[index[3]] = arr_num[index[3]] * 2 ;
//                 index[3] = index [3] + addnum ;
//             }
//
//         }
//     for(i = 0; i < 16 ;i++){
//
//         if(arr_num[i] == 0){
//             arr_num [i] = "";
//         }
//
//     }
//
//
//
// }

document.addEventListener(
    "keydown",function () {
        if(event.keyCode==37){
            getdate();
            move([3,7,11,15],-1);
            randpos();
            render();
        }
        if(event.keyCode==38){
            getdate();
            move([12,13,14,15],-4);
            randpos();
            render();

        }
        if(event.keyCode==39){
            getdate();
            move([0,4,8,12],1);
            randpos();
            render();
        }
        if(event.keyCode==40){
            getdate();
            move([0,1,2,3],4);
            randpos();
            render();
        }
    },false
)


document.querySelector("#start").addEventListener(
    "click",function(){

        arr_num=[];
        arr_blank=[];
        render();

        getdate();
        move([0,1,2,3],4);
        randpos();
        render();
        getdate();
        move([0,1,2,3],4);
        randpos();
        render();


    },false


 )








