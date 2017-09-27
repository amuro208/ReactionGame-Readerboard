var rb = {}

try{
  var ipcRender = require('electron').ipcRenderer;
      ipcRender.on('arduinoData', function(event, data){
        console.log("arduinoData : "+data);
      });
    ipcRender.send("arduinoCommand","STRAT :: ");
}catch(e){
    console.log(e);
}

rb.totalItems = 20;
rb.newitem;
rb.userlist;
rb.userScore;
rb.isGameRunning = false;
rb.init = function(){
  document.addEventListener("onSocketMessage",rb.onSocketMessage);
  document.addEventListener("onSocketClose",rb.onSocketClose);
  document.addEventListener("onSocketError",rb.onSocketError);
  document.addEventListener("onSocketOpen",rb.onSocketOpen);

  window.addEventListener("keydown", rb.keyboardlistener);



  for(var i = 0;i<this.totalItems;i++){
    var item = document.createElement("DIV");
    item.id = "item"+i;
    item.innerHTML = '<div class="board-item"><div class="pos"></div><div class="team"><img class="team-flag" src = ""></div><div class="uname"></div><div class="score"></div></div>';
    $$("mContainerWrapper").appendChild(item);
  }

  rb.queryRanking();
}

rb.newuserInfo;
rb.addNewUser = function(obj){
  var userinfo = obj.split("|")[0].split(",");
  rb.newitem = document.createElement("DIV");
  rb.newitem.id = "newitem";

  rb.newuserInfo = {"pos":0,"uname":userinfo[0],"flag":userinfo[1],"score":0,"user":1,"item":rb.newitem};
  rb.userlist.push(rb.newuserInfo);
  rb.userScore = 0;

  rb.newitem.innerHTML = '<div class="board-item"><div class="pos">0</div><div class="team"><img class="team-flag" src = "./img/flags/flag'+userinfo[1]+'.png"></div><div class="uname">'+userinfo[0]+'</div><div class="score">0</div></div>';
  $$("mContainerWrapper").appendChild(rb.newitem);
}


rb.addScore = function(){
  rb.userScore++;
  rb.newuserInfo.score = rb.userScore;
  rb.newitem.getElementsByClassName("score")[0].innerHTML = ""+rb.userScore;
  rb.userlist.sort(rb.sortOption);
  rb.display();
//
//   var nindex = rb.userlist.indexOf(rb.newuserInfo);
// if(rb.userlist.length>1 && nindex<rb.userlist.length-1){
//
//   console.log("nindex :: "+nindex);
//   var bitem = rb.userlist[nindex+1].item;
//   $$("mContainerWrapper").insertBefore(rb.newitem,bitem);
// }


}


rb.sortOption = function(a,b){
		var comparison1 = Number(b.score)-Number(a.score);
		if(comparison1 == 0){
			var comparison2 = a.uname.toLowerCase().localeCompare(b.uname.toLowerCase());
			if(comparison2 == 0){return b.uname.localeCompare(a.uname)};
			return comparison2;
		}else{
			return comparison1;
		}
}

rb.display= function(){
  for(var i = 0;i<this.totalItems;i++){
    var item = $$("item"+i);
    var info = null;
    if(rb.userlist.length>i){
      info = rb.userlist[i];
    }
    if(info == null){
      item.getElementsByClassName("pos")[0].innerHTML   = "";
      item.getElementsByClassName("team-flag")[0].src   = "";
      item.getElementsByClassName("score")[0].innerHTML = "";
      item.getElementsByClassName("uname")[0].innerHTML = "";
    }else{
      item.getElementsByClassName("pos")[0].innerHTML   = ""+rb.userlist[i].pos;
      item.getElementsByClassName("team-flag")[0].src   = ""+"./img/flags/flag"+rb.userlist[i].flag+".png";
      item.getElementsByClassName("score")[0].innerHTML = ""+rb.userlist[i].score;
      item.getElementsByClassName("uname")[0].innerHTML = ""+rb.userlist[i].uname;
    }

  }
}

rb.keyboardlistener = function(e){
  switch (event.key) {
    case "r":
      rb.addNewUser("Donghoon Lee,2,12223344|");
    break;
    case "s":
      tcssocket.send("ALL","START","-");
    break;
    case "s":
      tcssocket.send("ALL","TIMEOUT","-");
    break;
    case "ArrowUp":
      rb.addScore();
      tcssocket.send("ALL","ADDPOINT","-");
    break;

  }
}



rb.onSocketOpen = function(e){

}
rb.onSocketError = function(e){

}
rb.onSocketClose = function(e){

}
rb.onSocketMessage = function(e){
  console.log("e.detail.cmd : "+e.detail.cmd+":"+e.detail.msg);
  if(e.detail.cmd == "READY"){
    if(rb.isGameRunning)return;
      rb.addNewUser(e.detail.msg);

    }else if(e.detail.cmd == "START"){
       rb.isGameRunning = true;
    }else if(e.detail.cmd == "STOP"){
      rb.isGameRunning = false;
    }else if(e.detail.cmd == "TIMEOUT"){
      b.isGameRunning = false;
    }
}

rb.queryRanking = function(){
  var cmsURL = "http://"+conf.CMS_IP;
  var cmsUpload = conf.CMS_LIST;
    postAjax("http://192.168.0.2:81/qsrank.html", userData, function(readyState,status,data){
      log("readyState : "+readyState);
      log("status : "+status);
      log("data : "+data);
      if(readyState == 4){
          if(status == 200){
              rb.onResponseXML(data);
          }else if(status == 404){
              alert("Page Not Found");
              log("404");
          }else if(status == 500){
              alert("Server Error");
              log("500");
          }
      }
    });
}



rb.onResponseXML = function(data){
  var xml = parseXml(data);
  var list = xml.getElementsByTagName("rank");
  rb.userlist = new Array();//xml.getElementsByTagName("rank");
  for(var i = 0;i<list.length;i++){
      if(i<this.totalItems)
      rb.userlist[i] = {"pos":list[i].getAttribute("no"),"uname":list[i].getAttribute("name"),"flag":list[i].getAttribute("country"),"score":list[i].getAttribute("score"),"user":0,item:$$("item"+i)};
  }
  rb.userlist.sort(rb.sortOption);

  rb.display();

}
