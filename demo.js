window.onload = function() {
    //window.open("ZikkouButton.html", "subWin", 'width=500,toolbar=yes,menubar=yes,scrollbars=yes');
    console.log("開始");
};

function change(){
    change_parts = [];
    str_list = "";
    cmtBodies = document.getElementsByClassName("message");
    for(i = 0; i < cmtBodies.length; i++){
        e = cmtBodies[i];
        if(e.textContent.match(/面白くない/) || e.textContent.match(/面白くない/) || e.textContent.match(/馬鹿/) || e.textContent.match(/死ね/) ||e.textContent.match(/嫌い/)){
            change_parts.push(e);
            console.log(e.textContent);
            if(str_list != "")
                str_list += ",";
            str_list += e.textContent;
        }
    }
    console.log("unchi");
    console.log("対象"+change_parts.length+"個");
    xhr = new XMLHttpRequest();


    
    // サーバからのデータ受信を行った際の動作
    xhr.onload = function (e) {
        alert("変換完了");
        console.log(xhr);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                results = xhr.responseText.split(',');
                console.log(results.length);
                for(var i=0;i<change_parts.length;i++){
                    console.log(results[i]);
                    change_parts[i].innerHTML = results[i];
                }
                
            }
        }
    };

    //xhr.open('POST', 'http://192.168.0.108:5000/document', true);
    xhr.open('POST', 'http://127.0.0.1:5000/document', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    // フォームに入力した値をリクエストとして設定
    var request = "document=" + str_list;
    xhr.send(request);
}