;(function(){
    class GetDate{
        constructor(){
            this.disObj = document.querySelector("#dis_goods");
            this.getDate();
        }
        getDate(){
            ajax({
                url:"http://localhost/feike_pc/json/goods.json",
                success:(res)=>{
                    this.res = JSON.parse(res);
                    this.display();
                }
            })
        }
        display(){
            var str = "";
            for(var i=17;i<this.res.length;i++){
                if(i == 17){
                    str +=`<li class="goods-item" style="background: #fffce7">
                            <div class="msg">
                                <p class="title">${this.res[i].name}</p>
                                <p class="desc">${this.res[i].desc}</p>
                                <p class="dis_price">
                                    <span class="new-price">${this.res[i].new_price}</span>元
                                    <span class="old-price">${this.res[i].old_price}</span>
                                </p>
                            </div>
                            <div class="figure" style="position:relative;top:-25px;">
                                <a href="#" target="_blank">
                                    <img src="${this.res[i].url}" alt="图片"/>
                                </a>
                            </div>
                        </li>`;
                }else if(i ==21){
                    str +=`<li class="goods-item" style="background: #ffecef">
                            <div class="msg">
                                <p class="title">${this.res[i].name}</p>
                                <p class="desc">${this.res[i].desc}</p>
                                <p class="dis_price">
                                    <span class="new-price">${this.res[i].new_price}</span>元
                                    <span class="old-price">${this.res[i].old_price}</span>
                                </p>
                            </div>
                            <div class="figure" style="position:relative;top:-25px;">
                                <a href="#" target="_blank">
                                    <img src="${this.res[i].url}" alt="图片"/>
                                </a>
                            </div>
                        </li>`;
                }else{
                    str += `<li class="goods-item" style="background:#fff">
                                <div class="msg">
                                    <p class="dis">
                                        <span class="cal-dis">${this.res[i].cal_dis}</span>折</p>
                                    <p class="dis_desc">
                                        ${this.res[i].desc}</p>
                                    <p class="dis_pri">
                                        <font color="#171f25">${this.res[i].color}</font> 
                                        <span class="new-price">${this.res[i].new_price}</span>元 
                                        <span class="old-price">
                                            <span class="cal-market-price FS362">${this.res[i].old_price}</span>元</span></p>
                                </div>
                                <div class="dis_figure">
                                    <a href="#" target="_blank"><img src="${this.res[i].url}"></a></div>
                                <div class="dis_hover" style="height:50px;">
                                    <a>
                                        <span class="review">内外兼修&nbsp;奢宠经典</span>
                                        <span class="comment">浮动三刀头&nbsp;/&nbsp;双环极速贴面刀网&nbsp;/&nbsp;超长待机</span>
                                    </a>
                                </div>
                            </li>`;
                }
                
            }
            this.disObj.innerHTML = str;
        }
    }
    new GetDate();
})()