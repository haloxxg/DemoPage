$(window).scroll(function() {//窗口滚动的时候（鼠标滚轮的时候。。）
  $('img').each(function() {//把以下的方法作用到每一个img标签，可自行加限定条件
    var $imgSrc = $(this).attr('data-src');//获取每张图片对应地址
    var $imgTop = $(this).offset().top;//获取每张图片对应距离document顶部的高度
    var scrollT = $(window).scrollTop();//获取滚轮滚动的距离
    var halfDoc = $(window).height();//获取浏览器窗口可视高度
    var ifElse = (scrollT+halfDoc)>=$imgTop;//如果滚动距离加上窗口可视高度大于该图片距离document顶部的高度
    var _this=this;//保存this的作用域以便于在其它作用域上使用这个作用域
    if(ifElse){//如果条件成立
      setTimeout(function(){$(_this).attr('src',$imgSrc);},1000);//把图片的src地址改成data-src的值（前面已经获取了）
    }
  })//end object 'img'
})//end object window