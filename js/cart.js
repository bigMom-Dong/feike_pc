;(function(){
    "use strict";
    class Cart{
        constructor(){
            this.url = "http://localhost/feike_pc/json/goods.json";
            this.tbodyObj = document.querySelector("tbody");
            this.totalObj = document.querySelector("#total_price");
            this.qxObj = document.querySelector(".qx");
            this.clearAll = document.querySelector(".cart_empty");

            this.num = 0;//记录商品数量
            this.sum = 0;//记录商品总价
            this.money = 0;//记录选中商品的总价钱
            this.getInfo();
            this.setNumber();
        }
        getInfo(){
            ajax({
                url:this.url,
                success:(res)=>{
                    this.res = JSON.parse(res);
                    this.getLocal();
                }
            })
        }
        getLocal(){
            this.byGoods = localStorage.getItem("byGoods") ? JSON.parse(localStorage.getItem("byGoods")) : [];
            this.display();
        }
        display(){
            var str = "";
            for(var i=0;i<this.res.length;i++){
                for(var j=0;j<this.byGoods.length;j++){
                    if(this.res[i].id == this.byGoods[j].id){
                        str +=`<tr index = "${this.byGoods[j].id}">
                                    <td>
                                        <input type="checkbox" checked class="check" name="check" value="1063444">
                                    </td>
                                    <td>
                                        <div class="clearfix cart_proItem">
                                            <a style="padding-left: 25px;" href="/goods-FS2000.html" class="in_b fl cartImg">
                                                <img src="${this.res[i].url}" width="120" height="120" alt="${this.res[i].name}">
                                            </a>
                                            <div class="fl color6 cart_name tc">${this.res[i].name}</div>
                                        </div>
                                    </td>
                                    <td class="color6">￥${this.res[i].new_price}</td>
                                    <td>
                                        <div class="cartNum bc clearfix">
                                            <a href="javascript:void(0)" class="in_b fl tc reduce">-</a>
                                            <input id="number" type="text" class="fl number tc" value="${this.byGoods[j].num}" min="1">
                                            <a href="javascript:void(0)" class="in_b fl tc add">+</a>
                                        </div>
                
                                    </td>
                                    <td class="blue">￥${parseInt(this.res[i].new_price) * this.byGoods[j].num}</td>
                                    <td><a href="javascript:void(0)" class="del">删除</a></td>
                                </tr>`;
                    }
                }
            }
            this.tbodyObj.innerHTML = str;
            this.count(this.tbodyObj);
        }
        setNumber(){
            this.tbodyObj.addEventListener("click",(eve)=>{
                var e = eve || window.event;
                var tar = e.target || e.srcElement;
                var n = 0;
                var obj = tar.parentNode.parentNode.parentNode;
                if(tar.className == "del"){
                    tar.parentNode.parentNode.remove();
                    this.setLocal(tar);
                    for(var i=0;i<this.byGoods.length;i++){
                        n += parseInt(obj.children[i].children[4].innerHTML.split("￥")[1])
                    }
                    this.totalObj.innerHTML = n;
                }
                // 增删商品数量
                if(tar.className.search("add") !=-1){
                    this.count(tar);
                    this.setLocal(tar);
                }
                if(tar.className.search("reduce") != -1){
                    this.count(tar);
                    this.setLocal(tar);
                }
                if(tar.className == "check"){
                    this.td = tar.parentNode.parentNode.children;
                    if(this.td[0].children[0].checked == true){
                        this.money += parseInt(this.td[4].innerHTML.split("￥")[1]);
                        this.totalObj.innerHTML = this.money
                    }else{
                        this.qxObj.checked = false;
                        this.money -= parseInt(this.td[4].innerHTML.split("￥")[1]);
                        this.totalObj.innerHTML = this.money;
                    }
                }
            })
            this.checkAll();
            this.clear();
        }
        
        count(ele){
            if(ele.className == "tb"){
                var m =0;
                for(var i =0;i<ele.children.length;i++){
                    if(ele.children[i].children[0].children[0].checked == true){
                        m += parseInt(ele.children[i].children[4].innerHTML.split("￥")[1].split("元")[0]);
                        this.totalObj.innerHTML = m;
                    }
                }
            }
            // 增加商品数量
            if(ele.className.search("add") != -1){
                var obj = ele.parentNode.parentNode.parentNode;
                obj.children[4].innerHTML = "￥"+ parseInt(obj.children[2].innerHTML.split("￥")[1].split("元")[0]) * (parseInt(obj.children[3].children[0].children[1].value)+1);
                this.allPrice(ele);
            }
            if(ele.className.search("reduce") != -1){
                var obj = ele.parentNode.parentNode.parentNode;
                obj.children[4].innerHTML = "￥"+ parseInt(obj.children[2].innerHTML.split("￥")[1].split("元")[0]) * (parseInt(obj.children[3].children[0].children[1].value)-1);
                this.allPrice(ele);
            }
            if(ele.className == "check"){
                if(ele.getAttribute("class") == "qx" && tar.checked == false){
                    for(var i=0;i < this.tbodyObj.children.length;i++){
                        this.tbodyObj.children[i].children[0].children[0].checked = false;
                    }
                    this.totalObj.innerHTML = 0;
                }else if(ele.getAttribute("class") == "qx" && ele.checked == true){
                    for(var i=0;i < this.tbodyObj.children.length;i++){
                        this.tbodyObj.children[i].children[0].children[0].checked = true;
                    }
                    this.count(this.tbodyObj);
                }
            }
        }
        setLocal(ele){
            var obj = ele;
            if(ele.className.search("add") != -1){
                for(var i=0;i<this.byGoods.length;i++){
                    if(obj.parentNode.parentNode.parentNode.getAttribute("index") == this.byGoods[i].id){
                        this.byGoods[i].num = parseInt(ele.previousElementSibling.value);
                        this.byGoods[i].num++;
                        ele.previousElementSibling.value = this.byGoods[i].num;
                    }
                }
                localStorage.setItem("byGoods",JSON.stringify(this.byGoods));
            }
            if(ele.className.search("reduce") != -1){
                for(var i=0;i<this.byGoods.length;i++){
                    if(obj.parentNode.parentNode.parentNode.getAttribute("index") == this.byGoods[i].id){
                        if(this.byGoods[i].num > 1){
                            this.byGoods[i].num = parseInt(ele.nextElementSibling.value);
                            this.byGoods[i].num--;
                            ele.nextElementSibling.value = this.byGoods[i].num;
                        }else{
                            alert("最少存在一件商品!");
                        }
                        
                    }
                }
                localStorage.setItem("byGoods",JSON.stringify(this.byGoods));
            }
            if(ele.className == "del"){
                console.log("ss");
                for(var i=0;i < this.byGoods.length;i++){
                    console.log(obj.parentNode.parentNode.getAttribute("index"));
                    if(obj.parentNode.parentNode.getAttribute("index") == this.byGoods[i].id){
                        this.byGoods.splice(i,1);
                    }
                }
                localStorage.setItem("byGoods",JSON.stringify(this.byGoods));
            }
        }
        allPrice(ele){
            var obj = ele.parentNode.parentNode.parentNode.parentNode;
            var n = 0;
            // 计算总价钱
            for(var i=0;i<this.byGoods.length;i++){
                n += parseInt(obj.children[i].children[4].innerHTML.split("￥")[1]);
            }
            this.totalObj.innerHTML = n;
        }
        checkAll(){
            this.qxObj.onclick = (eve)=>{
                var e = eve || window.event;
                var tar = e.target || e.srcElement;
                if(tar.className == "qx"){
                    if(tar.getAttribute("class") == "qx" && tar.checked == false){
                        for(var i=0;i < this.tbodyObj.children.length;i++){
                            this.tbodyObj.children[i].children[0].children[0].checked = false;
                        }
                        this.totalObj.innerHTML = 0;
                    }else if(tar.getAttribute("class") == "qx" && tar.checked == true){
                        for(var i=0;i < this.tbodyObj.children.length;i++){
                            this.tbodyObj.children[i].children[0].children[0].checked = true;
                        }
                        this.count(this.tbodyObj);
                    }
                }
            }
        }
        clear(){
            this.clearAll.onclick = ()=>{
                this.tbodyObj.innerHTML = "";
                this.totalObj.innerHTML = "";
                localStorage.removeItem("byGoods");
            }
        }
    }   
    new Cart();
})();