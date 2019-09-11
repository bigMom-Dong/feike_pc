;(function(){
    class Detail{
        constructor(){
            this.goodsBox = document.getElementsByClassName("goodsDetailBox")[0];
            this.detailLeft = document.querySelector(".detailLeft");
            this.goodsMainPic = document.querySelector(".goodsMainPic");
            this.detailMain = document.querySelector(".detail");
            this.big = document.querySelector(".bigImg");
            this.url = "http://localhost/feike_pc/json/goods.json";
            this.id = document.location.href.split("?")[1].split("=")[1];
            this.baison = document.getElementById("baison-out");
            this.closeObj = document.getElementById("close");
            this.goShopping = document.getElementById("go_shopping");
            this.t = false;
            this.getInfo();
            this.addEvent();
            // this.bigImg();
        }
        getInfo(){
            ajax({
                url:this.url,
                success:(res)=>{
                    this.res = JSON.parse(res);
                    this.display();
                }
            })
        }
        display(){
            var str = "";
            var big = "";
            var right = "";
            for(var i=0;i<this.res.length;i++){
                if(this.res[i].id == this.id){
                    str +=`<a href="#" class="bc">
                                <img id="current_img" name="current_img" src="${this.res[i].url}"/>
                            </a>
                            <p id="move"></p>`   
                    big += `<img id="big_img" name="big_img" class="big_img" src="${this.res[i].url}"/>`;     
                    right +=`<h1 class="detailTitle">${this.res[i].name}</h1>
                            <div class="detailInfo">
                                    ${this.res[i].intr}
                                <div class="goods_price">
                                    <p class="pt10">
                                        到手价:
                                        <em class="orange">￥</em>
                                        <span class="fb pr orange">${this.res[i].new_price}</span>
                                    </p>
                                </div>
                                <div class="sale-info">
                                    <p class="pt10">客户评价:
                                        <span class="color9 f12">${this.res[i].eva}人评价</span>
                                    </p>
                                    <p class="pt10 pb10">
                                        商品累计月销量  
                                        <span class="orange">${this.res[i].sales}</span>
                                    </p>
                                </div>
                                <div class="choose-num oh">					
                                    <div class="clearfix mt20">
                                        <span class="fl mr20">购买数量：</span>
                                        <div class="fl number mr20">
                                            <a href="javascript:void(0);" class="in_b fl reduce tc f16">-</a>								
                                            <input type="text" id="choose_num" class="fl" style="text-align:center" value="1" onkeyup="value = value.replace(/[^\d]/g, '')" name="choose_num">
                                            <a href="javascript:;" class="in_b fl add tc f16">+</a>
                                        </div>
                                        <span class="fl">库存<span class="fa" id="actual_number">96825</span>件</span>
                                    </div>
                                </div>
                                <div class="detail_btn clearfix mt12">
                                    <button class="fl in_b mr10">立即购买</button>
                                    <button class="fl in_b">加入购物车</button>
                                </div>
                                <div class="promo_info mt20">
                                    <p id="goods_promo_desc" class="dLoading" original="javascript:loadData.goods_promo_desc();">
                                        <ul class="activity f14">	
                                            <li style="margin-bottom: 5px;">全场免运费（部分配件除外）</li>       
                                        </ul>
                                    </p>	
                                </div>
                            </div>`;
                }else{
                    console.error("数据解析不匹配!");
                }
            }
            this.goodsMainPic.innerHTML = str;
            this.big.innerHTML = big;
            this.detailMain.innerHTML = right;
        }
        addEvent(){
            this.detailMain.addEventListener("click",(eve)=>{
                var e = eve || window.event;
                var tar = e.target || e.srcElement;
                this.setLocal();
            })
            this.closeObj.onclick = ()=>{
                this.baison.style.display = "none";
            }
            this.goShopping.onclick = ()=>{
                window.location.href = "http://localhost/feike_pc/cart.html";
            }
            // 放大镜效果
            
        }
        setLocal(){
            this.byGoods = localStorage.getItem("byGoods") ? JSON.parse(localStorage.getItem("byGoods")) : [];
            if(this.byGoods.length < 1){
                this.byGoods.push({
                    id : this.id,
                    num : 1
                })
                this.t = true;
            }else{
                var i;
                var bol = this.byGoods.some((value,index)=>{
                    i = index;
                    return this.byGoods[i].id == this.id;
                })
                if(bol){
                    this.byGoods[i].num++;
                }else{
                    this.byGoods.push({
                        id : this.id,
                        num : 1
                    })
                }
                this.t = true;
            }
            this.baison.style.display = "block";
            localStorage.setItem("byGoods",JSON.stringify(this.byGoods));
        }
        // 放大
        // bigImg(){
        //     this.goodsMainPic.onmousemove =(eve)=>{
        //         var e = eve || window.event;
        //         var mousex = e.clientX;
        //         var mousey = e.clientY;
        //         // console.log(mousex,mousey);
        //         var mouseLeft = mousex - this.bigImg.offsetLeft - 50;
        //         var mouseTop = mousey - this.bigImg.offsetTop - 50;
        //         mouseLeft = mouseLeft < 0 ? 0 : mouseLeft;
        //         mouseTop = mouseTop < 0 ? 0 :mouseTop;
        //         mouseLeft = mouseLeft > (this.bigImg.offsetWidth - 50) ? (this.bigImg.offsetWidth - 50) : mouseLeft;
        //         mouseTop = mouseTop > (this.bigImg.offsetHeight - 50) ? (this.bigImg.offsetHeight - 50) : mouseTop;
        //         // big.style.top = this.offsetTop + 'px';
        //         // big.style.left = this.offsetLeft + this.offsetWidth +'px';
        //         this.big.style.display = "block";
        //     }
        // }
    }
    new Detail();
    $('.goodsMainPic').hover(function(){
        $('.bigImg').show();
        $('.detailLeft').on('mousemove',function(e){
            let x = e.pageX - 50 - $('.goodsMainPic').offset().left;
            let y = e.pageY - 50 - $('.goodsMainPic').offset().top;
            if(x<=0){
                x = 0;
            }
            if(x>=372){
                x = 372;
            }
            if(y<=110){y=100;}
            if(y>=368){y = 368;}
            console.log(x,y);
        })
    },function(){
        $('.bigImg').hide();
    })
})();