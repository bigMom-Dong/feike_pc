;(function(){
    class GetDate{
        constructor(){
            this.hot3Obj = document.querySelector("#hot_3");
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
            for(var i=1;i<2;i++){
                str +=`<li class="goods-item-l-2" id="${this.res[i].name}">
                        <div class="msg">
                            <h3 class="title">
                                <a href="#" target="_blank">${this.res[i].name}</a>
                                <p class="desc">${this.res[i].title}</p>
                                <p class="price">
                                    <span class="new-price">${this.res[i].new_price}<b>元</b></span>
                                    <span class="old-price">${this.res[i].old_price}</span>
                                </p>
                            </h3>
                        </div>
                        <div class="figure">
                            <a href="#" target="_blank">
                                <img src="${this.res[i].url}"/>
                            </a>
                        </div>
                    </li>`;
            }
            this.hot3Obj.innerHTML = str;
        }
    }
    new GetDate();
})()