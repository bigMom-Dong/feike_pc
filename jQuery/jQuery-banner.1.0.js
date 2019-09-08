;(function($){
    "use strict";
    $.fn.banner = function(options){
        var obj = {};
        var {items,right,list,autoPlay,moveTime,delayTime,index} = options;
        list = list===false ? false : true;
        autoPlay = autoPlay===false ? false : true;
        moveTime = moveTime || 200;
        delayTime = delayTime || 3000;
        index = index || 0;
        obj.iPrev = items.length-1;
        items.css({
            left:items.eq(0).width()
        }).eq(index).css({
            left:0
        })
        if(list){
            var str = "";
            for(var i=0;i<items.length;i++){
                str += `<span>${i+1}</span>`;
            }
            obj.div = $("<div>").html(str);
            this.append(obj.div);
            obj.div.css({
                width:260,
                display:"block",
                position:"absolute",
                zIndex:3,
                bottom:"22px",
                right:"22px"

            }).children("span").css({
                float:"left",
                width:"28px",
                height:"18px",
                lineHeight:"18px",
                border:"1px solid #ccc",
                marginRight:"10px",
                marginBottom:"1px",
                position:"relative",
                background:"#999",
                textAlign:"center",
                opacity:"0.8"
            }).eq(index).css({
                background:"#333",
                color:"#fff"
            })
            obj.div.children("span").on("mouseenter",function(){
                if($(this).index() > index){
                    obj.listMove($(this).index(),1)
                }
                if($(this).index() < index){
                    obj.listMove($(this).index(),-1)
                }
                obj.div.children("span").css({
                    background:"",
                    color:""
                }).eq($(this).index()).css({
                    background:"#333",
                    color:"#fff"
                })
                index = $(this).index();
            })
        }
        obj.listMove = function(iNow,type){
            items.eq(index).css({
                left:0
            }).stop().animate({
                left:-items.eq(0).width() * type
            }).end().eq(iNow).css({
                left:items.eq(0).width() * type
            }).stop().animate({
                left:0
            })
        }

        // 左右按钮的功能
        obj.rightClick = function(){
            if(index == items.length-1){
                index = 0;
                obj.iPrev = items.length-1
            }else{
                index ++;
                obj.iPrev = index-1
            }
            obj.btnMove(-1)
        }
        if(right != undefined && right.length > 0){
            right.on("click",obj.rightClick)
        }

        obj.btnMove = function(type){
            items.eq(this.iPrev).css({
                left:0
            }).stop().animate({
                left:items.eq(0).width() * type
            },moveTime).end().eq(index).css({
                left:-items.eq(0).width() * type
            }).stop().animate({
                left:0
            },moveTime)

            if(!list) return;
            this.div.children("span").css({
                background:"",
                color:""
            }).eq(index).css({
                background:"#333",
                color:"#fff"
            })
        }
        if(autoPlay){
            var t = setInterval(() => {
                obj.rightClick()
            }, delayTime);          
            this.hover(function(){
                clearInterval(t)
            },function(){
                t = setInterval(() => {
                    obj.rightClick()
                }, delayTime);
            })

        }
    }
})(jQuery);