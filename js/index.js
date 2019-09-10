;(function(){
    class Index{
        constructor(){
            this.allGoodsObj = document.getElementById("allGoods");
            this.show();
        }
        show(){
            this.allGoodsObj.onclick = (eve)=>{
                var e = eve || window.event;
                var tar = e.target || e.srcElement;
                console.log(tar.parentNode.parentNode.parentNode);
                this.name = tar.parentNode.parentNode.parentNode.getAttribute("id");
                this.setLocal();
                window.location.href="http://localhost/feike_pc/detail.html";
            }
        }
        setLocal(){
            this.allGoods = localStorage.getItem("allGoods") ? JSON.parse(localStorage.getItem("allGoods")) : [] ;
            if(this.allGoods.length < 1){
                this.allGoods.push({
                    id:this.name
                })
            }else{
                var i;
                console.log(this.allGoods);
                var bol = this.allGoods.some((value,index)=>{
                    i = index;
                    return this.allGoods[i].id == this.name;
                })
                if(!bol){
                    this.allGoods.push({
                        id:this.name
                    })
                }
            }
            localStorage.setItem("allGoods",JSON.stringify(this.allGoods));
        }
    }
    new Index();
})()