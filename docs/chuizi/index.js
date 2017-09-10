$(document).ready(function(){
	var add=$("#btnAdd");
		Num=$("#btnNum"),	
		sub=$("#btnSub");
		num=1;
		Num.html(num);
	add.bind('click',function() {
		num+=1;
		Num.html(num);
	});
	add.hover(function() {
		add.addClass('RcolorBtn-on')
	}, function() {
		add.removeClass('RcolorBtn-on')
	});
	sub.bind("click",function(){
		if(num>1)
		num-=1;
		Num.html(num);
	});
	sub.hover(function() {
		sub.addClass('RcolorBtn-on')
	}, function() {
		sub.removeClass('RcolorBtn-on')
	});

	var box=$(".mainBox"),
		list=$(".Rcolor-list>li");
	for(var i=0;i<list.length;i++){
		list[i].id=i;
		list[i].onclick=function(){
			for(var j=0;j<box.length;j++){
				var oli=box[this.id].getElementsByTagName("li");
				box[j].style.display="none";
				list[j].className="";
				{
				box[this.id].style.display="block";
				list[this.id].className='border-on';
				}
				for(var k=0;k<oli.length;k++){
					oli[k].className="";
					oli[0].className="border-on";
					oli[3].style.display="block";
				}
			}
		}
	}
	var spic=$(".mainlist>li"),
		bpic=$(".mainindex>li");
	for(var i=0;i<spic.length;i++){
		spic[i].id=i;
		spic[i].onclick=function(){
			for(var j=0;j<bpic.length;j++){
				spic[j].className="";
				bpic[j].style.display="none";
				bpic[this.id].style.display="block";
				spic[this.id].className="border-on";
			}
		}
	}

	//加入购物车
	$("#rBtn-shopcar").bind("click",function(){
			$("#shopNum").text(parseInt($("#shopNum").text())+1);
			$("#shopNum").css('background-color','#DE4037');
	})

	//个人中心
	$(".headBtn").bind("mouseenter",function(){
		$(".headTit").show();
		$("#arrow").show();
	});
	$(".headBtn").bind("mouseleave",function(){
		$(".headTit").hide();
		$("#arrow").hide();
	})

	//回到顶部
    var timer=null,
        obtn=document.getElementById("goTop"),
        isTop=true,
        clientHeight=document.documentElement.clientHeight;//获取可视区域高度
    window.onscroll=function(){
        var osTop=document.documentElement.scrollTop||document.body.scrollTop;//获取当前距顶部的高度
        if(!isTop){
            clearInterval(timer);
        }
        isTop=false;
        if(clientHeight<=osTop){
            obtn.style.display="block"
        }else{
            obtn.style.display="none";
        }
    }
    obtn.onclick=function(){
        timer=setInterval(function(){
            var osTop=document.documentElement.scrollTop||document.body.scrollTop;
            var oSpeed=Math.floor(-osTop/6);
            isTop= true;
            document.documentElement.scrollTop=document.body.scrollTop=osTop+oSpeed;
            if(osTop==0){
                clearInterval(timer);
            }
        },30)
    }
 
})