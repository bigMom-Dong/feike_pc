;(function(){
    class GetDate{
        constructor(){
            this.new2Obj = document.querySelector("#new_2");
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
            for(var i=11;i<17;i++){
                str +=`<li class="items-1" id="${this.res[i].name}">
                            <div><div><img src="${this.res[i].url}"/></div></div>
                            <div class="msg">
                                <p class="title">${this.res[i].name}
                                    <span class="cal-price">${this.res[i].price}</span>
                                    元
                                </p>
                                <p class="desc" style="text-align:center;">
                                        ${this.res[i].desc}
                                </p>
                            </div>
                        </li>`;
            }
            this.new2Obj.innerHTML = str;
        }
    }
    new GetDate();
})()