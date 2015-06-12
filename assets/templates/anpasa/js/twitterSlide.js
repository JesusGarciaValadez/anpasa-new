var twitter_interface={
		load:function(){
			var url="https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=true&screen_name="+this.params.user+"&count="+this.params.max+"&callback=twitterDDBB."+this.params.key+".parse";
			var script=document.createElement("script");
			script.type="text/javascript";
			script.src=url;
			document.getElementsByTagName("head")[0].appendChild(script);
	},
		parse:function(entradas){
		  var totalW=0;
			$(this.params.contenedor).empty();
		   for(i in entradas)
		    {
			var div=document.createElement("div");
			div.className="entry";
			div.appendChild(document.createTextNode(entradas[i].text));
			var width=Math.round(entradas[i].text.length*7);
			div.style.width=width+"px";
			totalW+=width;
			$(this.params.contenedor).append(div);
			}
			$(this.params.contenedor).width(totalW);
		},
		scroll:function(){
			$(this.params.contenedor).stop();
			$(this.params.contenedor).css("margin","0 0 0 0");
			var width=$(this.params.contenedor).width();
			var velocidad=width*this.params.velocidad_scroll*1;
			$(this.params.contenedor).animate({"margin":"0 0 0 -"+width+"px"},velocidad,function(){
				var clase=this.className;
				clase=clase.split(" ");
				var match=/twitterKey_/i;
				var key=null;
				for(var i=0;i<clase.length;i++){
					if(match.test(clase[i])){
						key=clase[i];
					}
				}
				if(key){
					key=key.split("_");
					key=key[1];
					twitterDDBB[key].scroll();
				}
				});
		}
	}
	
	
var twitterDDBB={};


var twitter_class=function(params){
	twitterDDBB[params.key]=this;
	this.params=params;
	this.loadInteval=null;
	this.load=twitter_interface.load;
	this.parse=twitter_interface.parse;
	this.scroll=twitter_interface.scroll;
	$(this.params.contenedor).addClass("twitterKey_"+this.params.key);
	if(this.params.load){
		this.load();
		this.loadInteval=setInterval("twitterDDBB."+this.params.key+".load()",this.params.load_time);
	}
	if(this.params.scroll){
		this.scroll();
	}
}
$(document).ready(function(){
twitterSlide=new twitter_class({
	contenedor:".twitter_slider>.wrapper>.container",
	key:"slider1",
	user:"invexbanco",
	max:30,
	load:true,
	load_time:600000,
	scroll:true,
	velocidad_scroll:50
});})
