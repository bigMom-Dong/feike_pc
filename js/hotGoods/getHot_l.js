;(function(){
    class GetDate{
        constructor(){
            this.hotlObj = document.querySelector("#hot_1");
            this.getDate();
        }
        getDate(){
            ajax({
                url:"http://localhost/feike_pc/json/hot_goods/hot_goods_l_t.json",
                success:(res)=>{
                    this.res = JSON.parse(res);
                    this.display();
                }
            })
        }
        display(){
            var str = "";
            for(var i=0;i<this.res.length;i++){
                str +=`<ul>
                            <li class="goods-item-l-2">
                                <div class="msg">
                                    <h3 class="title">
                                        <a href="#" target="_blank">${this.res[i].name}</a>
                                    </h3>
                                    <p class="desc">
                                            ${this.res[i].title}
                                    </p>
                                    <p class="price">
                                        <span class="new-price">${this.res[i].new_price}<b>元</b></span>
                                        <span class="old-price">${this.res[i].old_price}</span>
                                    </p>
                                </div>
                                <div class="figure">
                                    <a href="#" target="_blank">
                                        <img src="${this.res[i].url}"/>
                                    </a>
                                </div>
                            </li>
                        </ul>`;
            }
            this.hotlObj.innerHTML = str;
        }
    }
    new GetDate();
})()