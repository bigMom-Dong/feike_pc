$(".floor").children("li").click(function(){
    var index = $(this).index();
    var t = $(".box").eq(index)[0].offsetTop;
    $("html").animate({
        scrollTop:t
    })
})