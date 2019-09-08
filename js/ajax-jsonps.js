function ajax(options){
    var {type,url,success,error,data} = options;
    type = type || "get";
    data = data || {};
    var str = "";
    for(var i in data){
        str += `${i}=${data[i]}&`;
    }
    if(type == "get" || type == "jsonp"){
        var d = new Date();
        url = url + "?" + str + "_xdd=" + d.getTime(); 
    }
    if(type == "jsonp"){
        var script = document.createElement("script");
        script.src = url;
        document.body.appendChild(script);
        window[data[data.column]] = function(res){
            success && success(res);
            error = null;
        }
        setTimeout(function(res){
            error && error(res);
            success = null;
        },2000)
    }else{
        var xhr = new XMLHttpRequest();
        xhr.open(type,url,true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                success && success(xhr.responseText);
            }else if(xhr.readyState == 4 && xhr.status != 200){
                error && error(xhr.status);
            }
        }
        if(type == "get"){
            xhr.send();
        }else if(type == "post"){
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.send(str);
        }
    }
    
}