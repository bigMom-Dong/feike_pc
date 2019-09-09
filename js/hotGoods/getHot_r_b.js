;(function(){
    class GetDate{
        constructor(){
            this.hot4Obj = document.querySelector("#hot_4");
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
            for(var i=4;i<10;i++){
                str +=`<li class="items-1">
                            <div class="msg">
                                <p class="title">${this.res[i].name}</p>
                                <p class="month-num">${this.res[i].title}&nbsp;<span>${this.res[i].number}</span></p>
                                <p class="price">${this.res[i].price}</p>
                            </div>
                            <div class="figure">
                                <a href="#" target="_blank">
                                    <img src="${this.res[i].url}">
                                </a>
                            </div>
                        </li>`;
            }
            this.hot4Obj.innerHTML = str;
        }
    }
    new GetDate();
})()