;(function(){
    "use strict";
    class Menu{
        constructor(){
            this.url = "http://localhost/feike_pc/json/menu.json";
            this.menuList = document.getElementById("category_list");
            this.getInfo();
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
            for(var i =0;i< this.res.length;i++){
                str +=`<div class="category_main">
                            <div class="category_info">
                                <div class="ml25 perfume_list fb" style="height: 25px; line-height: 25px">
                                    <a href="/list_goods/&amp;cat_id=1" target="_blank">${this.res[i].name}<em>&gt;</em></a>
                                </div>
                            </div>
                            <div class=""></div>
                        </div>`;
            }
            this.menuList.innerHTML = str;
        }
    }
    new Menu()
})()