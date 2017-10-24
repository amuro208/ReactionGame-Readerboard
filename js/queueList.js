var ql = {}
ql.totalItems = 10;
ql.itemHeight = 65;
ql.newitem;
ql.refitem;
ql.userlist;
ql.newuserScore;
ql.newuserInfo;
ql.refindex = -1;
ql.refitem;

ql.init = function(){
  document.addEventListener("onSocketMessage",rb.onSocketMessage);
  document.addEventListener("onSocketClose",rb.onSocketClose);
  document.addEventListener("onSocketError",rb.onSocketError);
  document.addEventListener("onSocketOpen",rb.onSocketOpen);

  for(var i = 0;i<this.totalItems;i++){
    var item = document.createElement("DIV");
    item.id = "qitem"+i;
    item.className = "item-wrapper";
    item.innerHTML = '<div class="queue-item"><div class="arrow"></div><div class="team"><img class="team-flag-none" src = "./img/blank.png"></div><div class="uname"></div></div>';
    $$("queuePanelContainer").appendChild(item);
  }
  //ql.showQueueList('{"userqueues":[{"uname":" ","flag":"-1"},{"uname":"Marcus Joy","flag":"3"}]}');

  //ql.showQueueList('{"userqueues":[{"uname":"Marcus Joy","flag":"3"},{"uname":"Marcus Joy","flag":"3"},{"uname":"Luis Youn","flag":"4"},{"uname":"Miyoung Kang","flag":"2"},{"uname":"Luis Youn","flag":"4"},{"uname":"Amuro Lee","flag":"1"},{"uname":"Marcus Joy","flag":"3"},{"uname":"Marcus Joy","flag":"3"},{"uname":"Miyoung Kang","flag":"2"},{"uname":"Amuro Lee","flag":"1"}]}');


}

ql.showQueueList = function(msg){
  rb.footer.style.display = "none";
  	var list = JSON.parse(msg);
  	var cnt = 0;
  	for(var i = 0;i<this.totalItems;i++){
  		var item = $$("qitem"+i);
  		if(item){
        var info = list.userqueues[i];
        if(i<list.userqueues.length){
          info = list.userqueues[i];
        }else{
          info = {"uname":" ","flag":-1};
        }

  			var flag = parseInt(info.flag);
  			var img = item.getElementsByTagName("IMG")[0];
  			if(flag<0){
  				img.className = "team-flag-none";
  				img.src = "./img/blank.png";

  			}else{
  				img.className = "team-flag";
  				img.src   = "./img/flags/flag"+(parseInt(info.flag)+1)+".png";
  			}

  			item.getElementsByClassName("uname")[0].innerHTML = ""+info.uname;
  			cnt++;
  		}
  	}
  	$$("queuePanelContainer").style.top = "0px";
  	var h = this.itemHeight*this.totalItems+65;
  	TweenMax.to($$("queuePanel"),0.3,{height:h+"px",ease:Power2.easeOut});
  	TweenMax.to($$("queuePanelContainer"),0.3,{delay:0.6,top:"-"+64+"px",ease:Power2.easeOut});

  	setTimeout(function(){
  		ql.hideQueueList();
  	},3000);

}
ql.hideQueueList = function(){
	TweenMax.to($$("queuePanel"),0.3,{height:"0px",ease:Power2.easeOut,onComplete:function(){
    rb.footer.style.display = "block";
  }});
}
