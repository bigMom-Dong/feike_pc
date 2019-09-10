;(function(){
    class Detail{
        constructor(){
            this.goodsBox = document.getElementsByClassName("goodsDetailBox")[0];
            this.url = "http://localhost/feike_pc/json/goods.json";
            this.id = document.location.href.split("?")[1].split("=")[1];
            this.baison = document.getElementById("baison-out");
            this.closeObj = document.getElementById("close");
            this.goShopping = document.getElementById("go_shopping");
            this.t = false;
            this.getInfo();
            this.addEvent();
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
            for(var i=0;i<this.res.length;i++){
                if(this.res[i].id == this.id){
                    str +=`<div class="detailLeft fl">
                                    <div class="goodsMainPic">
                                        <a href="#" class="bc">
                                            <img id="current_img" name="current_img" src="${this.res[i].url}"/>
                                        </a>
                                    </div>
                                </div>
                                <div class="detailRight fr">
                                    <div class="detailMain fl">
                                        <div class="detailMain mt30">
                                            <h1 class="detailTitle">${this.res[i].name}</h1>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                }else{
                    console.error("数据解析不匹配!");
                }
            }
            this.goodsBox.innerHTML = str;
        }
        addEvent(){
            this.goodsBox.addEventListener("click",(eve)=>{
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
        
    }
    new Detail();
})();