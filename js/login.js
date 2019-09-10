;(function(){
    // 选项卡
    $(".login_tab a").click(function(){
        $(this).addClass("current").siblings().removeClass("current");
        $(".login_form form").css({display:"none"});
        $(".login_form form").eq($(this).index()).css("display","block");
    })
    class Login{
        constructor(){
            // 邮箱登录
            this.emailObj = document.querySelector("#d_user_email");
            this.pwdObj = document.querySelector("#password");
            // 手机号码登录
            this.phoneObj = document.querySelector("#d_user_phone");
            this.passObj = document.querySelector("#d_password");
            this.btnLogin = document.querySelector("#loginBtn");
            this.emailBtn = document.querySelector("#email");
            this.phoneBtn = document.querySelector("#phone");
            // this.forgetObj = document.querySelector("#forget");
            this.status =0;
            this.setBtn();
            this.forget();
        }
        setBtn(){
            this.btnLogin.onclick = ()=>{
                this.emailLogin();
                this.phoneLogin();
                this.getLocal();
            }
            this.emailBtn.onclick = ()=>{
                this.status = 0;
            }
            this.phoneBtn.onclick = ()=>{
                this.status = 1;
            }
        }
        emailLogin(){
            this.reg_email();
        }
        reg_email(){
            var emailVal = this.emailObj.value;
            if(emailVal == ""){ 
                this.emailObj.nextElementSibling.innerHTML = "用户邮箱不能为空";
                this.emailObj.nextElementSibling.style.color = "red";
            }else{
                this.emailObj.nextElementSibling.innerHTML = "";
                this.reg_pwd();
            }
        }
        reg_pwd(){
            var pwdVal = this.pwdObj.value;
            if(pwdVal == ""){ 
                this.pwdObj.nextElementSibling.innerHTML = "密码不能为空";
                this.pwdObj.nextElementSibling.style.color = "red";
            }else{
                this.pwdObj.nextElementSibling.innerHTML = "";
            }
        }
        phoneLogin(){
            this.reg_phone();
        }
        reg_phone(){
            var phoneVal = this.phoneObj.value;
            if(phoneVal == ""){
                this.phoneObj.nextElementSibling.innerHTML = "手机号码不能为空";
                this.phoneObj.nextElementSibling.style.color = "red";
            }else{
                this.phoneObj.nextElementSibling.innerHTML = "";
                this.reg_pass();
            }
        }
        reg_pass(){
            var passVal = this.passObj.value;
            if(passVal == ""){
                this.passObj.nextElementSibling.innerHTML = "密码不能为空";
                this.passObj.nextElementSibling.style.color = "red";
            }else{
                this.passObj.nextElementSibling.innerHTML = "";
            }
        }
        getLocal(){
            this.goods = localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")) : [];
            console.log(this.goods);
            //是否新增状态值判断邮箱或者手机号码登录
            if(this.goods == ""){
                // console.log("信息为空");
                alert("用户信息不存在!,请先注册");
            }else{
                var i;
                var bol = this.goods.some((value,index)=>{
                    i = index;
                    if(this.status ==0){
                        return this.goods[i].email == this.emailObj.value && this.goods[i].pass == this.pwdObj.value;
                    }else if(this.status ==1){
                        return this.goods[i].phone == this.phoneObj.value && this.goods[i].pass == this.passObj.value;
                    }
                })
                if(bol){
                    window.location.href = "http://localhost/feike_pc/index.html";
                }else{
                    alert("请检查输入信息!");
                    window.location.href = "http://localhost/feike_pc/login.html";
                }
            }
        }
        // 忘记密码
        // forget(){
        //     console.log(this.forgetObj);
        //     this.forgetObj.onclick = function(){
        //         localStorage.pass = "";
        //     }
        // }
    }
    new Login();
})();