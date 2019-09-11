;(function(){
    "use strict";
    window.onload = function(){
    class Login{
        constructor(){
            this.login = document.querySelector(".login");
            this.zhuxiao = document.querySelector(".zhuxiao");
            this.span = document.querySelector(".zhuxiao li span");
            this.em = document.querySelector(".zhuxiao em");
            this.getLocal();
        }
        getLocal(){
            this.goods = localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")) : [];
            this.i = 0;
            var o = this.goods.some((value,index)=>{
                this.i = index;
                return value.onOff == 1;
            })
            if(o){
                console.log(this.login);
                console.log(this.zhuxiao);
                this.login.style.display = "none";
                this.zhuxiao.style.display = "block";
                this.span.innerHTML = this.goods[this.i].name;   
            }
            // this.em.onclick = ()=>{
            //     this.goods[this.i].onOff = 0;
            //     localStorage.setItem("goods",JSON.stringify(this.goods));
            //     this.login.style.display = "block";
            //     this.zhuxiao.style.display = "none";
            //     this.span.innerHTML = "";
            //     this.em.innerHTML = "";
            // }
        }
    }
    new Login();
}
})()