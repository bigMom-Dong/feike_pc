;(function(){
    class Register{
        constructor(){
            this.emailObj = document.querySelector("#reg_email");
            this.phoneObj = document.querySelector("#reg_phone");
            this.nickNameObj = document.querySelector("#reg_nickName");
            this.pwdObj = document.querySelector("#reg_pwd1");
            this.checkNumberObj = document.querySelector("#reg_checkNumber");
            this.formBtnObj = document.querySelector("#reg_btn");
            this.a=0;
            this.b=0;
            this.c=0;
            this.d=0;
            this.e=0;
            this.addEvent();
            this.formBtn();
        }
        addEvent(){
            this.regEmail();
            this.regPhone();
            this.regNick();
            this.regPwd();
            this.regCheck();
            // this.formBtn();
        }
        regEmail(){
            this.emailObj.onblur = ()=>{
                var emailVal = this.emailObj.value;
                if(emailVal == ""){
                    this.emailObj.nextElementSibling.innerHTML = "邮箱不能为空";
                    this.emailObj.nextElementSibling.style.color = "red";
                    this.a = 0;
                }else{
                    var reg = /^[\w-]{3,12}@[a-z\d]{2,9}\.[a-zA-Z]{2,5}$/;
                    var test = reg.test(emailVal);
                    if(test){
                        this.emailObj.nextElementSibling.innerHTML = "格式正确";
                        this.emailObj.nextElementSibling.style.color = "green";
                        this.a = 1;
                    }else{
                        this.emailObj.nextElementSibling.innerHTML = "邮箱格式错误";
                        this.emailObj.nextElementSibling.style.color = "red";
                        this.a = 0;
                    }
                }
            }
        }
        regPhone(){
            this.phoneObj.onblur = ()=>{
                var phoneVal = this.phoneObj.value;
                if(phoneVal == ""){
                    this.phoneObj.nextElementSibling.innerHTML = "手机号码不能为空";
                    this.phoneObj.nextElementSibling.style.color = "red";
                    this.b = 0;
                }else{
                    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
                    var test = reg.test(phoneVal);
                    if(test){
                        this.phoneObj.nextElementSibling.innerHTML = "格式正确";
                        this.phoneObj.nextElementSibling.style.color = "green";
                        this.b = 1;
                    }else{
                        this.phoneObj.nextElementSibling.innerHTML = "手机号码格式错误";
                        this.phoneObj.nextElementSibling.style.color = "red";
                        this.b = 0;
                    }
                }
            }
        }
        regNick(){
            this.nickNameObj.onblur = ()=>{
                var nickNameVal = this.nickNameObj.value;
                if(nickNameVal == ""){
                    this.nickNameObj.nextElementSibling.innerHTML = "昵称不能为空";
                    this.nickNameObj.nextElementSibling.style.color = "red";
                    this.c = 0;
                }else{
                    var reg = /^[\u4e00-\u9fa5]{1,6}|[a-zA-Z]{1,12}$/;
                    var test = reg.test(nickNameVal);
                    if(test){
                        this.nickNameObj.nextElementSibling.innerHTML = "格式正确";
                        this.nickNameObj.nextElementSibling.style.color = "green";
                        this.c = 1;
                    }else{
                        this.nickNameObj.nextElementSibling.innerHTML = "昵称格式错误:中文1-6，英文1-12";
                        this.nickNameObj.nextElementSibling.style.color = "red";
                        this.c = 0;
                    }
                }
            }
        }
        regPwd(){
            this.pwdObj.onblur = ()=>{
                var pwdVal = this.value;
                var f=0,g=0,m=0;
                if(pwdVal == ""){
                    this.pwdObj.nextElementSibling.innerHTML = "密码不能为空";
                    this.pwdObj.nextElementSibling.style.color = "red";
                    this.d = 0;
                }else{
                    if(this.pwdObj.value.length >= 6 && this.pwdObj.value.length <= 20){
                        var numReg = /\d+/g;
                        f = numReg.test(this.value) ? 1 : 0;
                        var aReg = /[a-zA-Z]+/g;
                        g = aReg.test(this.value) ? 1 : 0;
                        var tReg = /[^a-zA-Z\d\w\u4E00-\u9FA5]/;
                        m = tReg.test(this.value) ? 1 : 0;
                        var n = f + g +m;
                        switch(n){
                            case 1:
                                this.pwdObj.nextElementSibling.innerHTML = "格式正确,密码等级低";
                                this.pwdObj.nextElementSibling.style.color = "orange";
                                break;
                            case 2:
                                this.pwdObj.nextElementSibling.innerHTML = "格式正确,密码等级中";
                                this.pwdObj.nextElementSibling.style.color = "yellow";
                                break;
                            case 3:
                                this.pwdObj.nextElementSibling.innerHTML = "格式正确,密码等级高";
                                this.pwdObj.nextElementSibling.style.color = "green";
                                break;
                            default:
                                this.pwdObj.nextElementSibling.innerHTML = "输入错误,请重新输入";
                                this.pwdObj.nextElementSibling.style.color = "red";
                                break;
                        }
                        this.d = 1;
                    }else{
                        this.pwdObj.nextElementSibling.innerHTML = "密码长度必须在6-20位";
                        this.pwdObj.nextElementSibling.style.color = "red";
                        this.d = 0;
                    }
                }
            }
        }
        regCheck(){
            this.checkNumberObj.onblur = ()=>{
                if(this.checkNumberObj.value == this.pwdObj.value){
                    this.checkNumberObj.nextElementSibling.innerHTML = "密码正确";
                    this.checkNumberObj.nextElementSibling.style.color = "green";
                    this.e = 1;
                }else{
                    this.checkNumberObj.nextElementSibling.innerHTML = "两次密码不一致";
                    this.checkNumberObj.nextElementSibling.style.color = "red";
                    this.e = 0;
                }
            }
        }
        formBtn(){
            this.formBtnObj.onclick = ()=>{
                if(this.a==1&&this.b==1&&this.c==1&this.d==1&&this.e==1){
                    this.setLocal();
                }else{
                    alert("注册失败！请重新注册！")
                }
            }
        }
        setLocal(){
            // console.log(this.nickNameObj.value);
            this.goods = localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")) : [];
            if(this.goods.length < 1){
                this.goods.push({
                    name : this.nickNameObj.value,
                    pass : this.pwdObj.value,
                    phone : this.phoneObj.value,
                    email : this.emailObj.value,
                    onOff : 0
                })
                window.location.href="http://localhost/feike_pc/login.html";
            }else{
                var i;
                var bol = this.goods.some((value,index)=>{
                    i = index;
                    return this.goods[i].name == this.nickNameObj.value;
                })
                if(bol){
                    alert("昵称重复!");
                }else{
                    this.goods.push({
                        name : this.nickNameObj.value,
                        pass : this.pwdObj.value,
                        phone : this.phoneObj.value,
                        email : this.emailObj.value
                    })
                    window.location.href="http://localhost/feike_pc/login.html";
                }
            }
            localStorage.setItem("goods",JSON.stringify(this.goods));
        }
    }
    new Register();
})();