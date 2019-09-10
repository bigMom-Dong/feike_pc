;(function(){
    class GetDate{
        constructor(){
            this.hot2Obj = document.querySelector("#hot_2");
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
            for(var i=2;i<4;i++){
                str +=`<li class="items-1">
                            <div class="msg">
                                <p class="title">${this.res[i].name}</p>
                                <p class="month-num">${this.res[i].title}<span>${this.res[i].number}</span></p>
                                <p class="price">${this.res[i].new_price}</p>
                            </div>
                            <div class="figure">
                                <a href="http://localhost/feike_pc/detail.html?id=${this.res[i].id}" target="_blank">
                                    <img src="${this.res[i].url}"/>
                                </a>
                            </div>
                        </li>`;
            }
            this.hot2Obj.innerHTML = str;
        }
    }
    new GetDate();
})()