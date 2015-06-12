var slider_interface={
	width:1000,
	height:800,
	animlock:false,
	sliders:[],
	item2_pos:2,
	resizeHandler:function(){
		var nw=$(window).width();
		var nh=$(window).height();
		var pnw=(nw*100)/slider_interface.width;
		var nh=Math.round((pnw*slider_interface.height)/100);
		for(var i = 0; i<slider_interface.sliders.length;i++){
			slider_interface.sliders[i].resize(nw,nh);
		}
	},
	resize:function(width,height){
	$(this.contenedor).css("width",width+"px");
	//$(this.contenedor).css("height",height+"px");
	$(this.contenedor).find(".wrap").css("width",width+"px");
	$(this.contenedor).find(".wrap").css("height",height+"px");
	},
	slider1_handler:function(layer){
		if(slider_interface.animlock){
		//	return false;
		}
		slider_interface.animlock=true;
		$("#_slider").find(".item_2").stop();
		$("#_slider").find(".item_3").stop();
		$("#_slider").find(".item_2").animate({left:"45%"},1000,function(){slider_interface.item2_pos=3});
		$("#_slider").find(".item_3").animate({left:"70%"},1000,function(){slider_interface.animlock=false});
	},
	slider2_handler:function(){
		if(slider_interface.animlock){
			//return false;
		}
		slider_interface.animlock=true;
		$("#_slider").find(".item_2").stop();
		$("#_slider").find(".item_3").stop();
		$("#_slider").find(".item_2").animate({left:"20%"},1000,function(){slider_interface.animlock=false});
		$("#_slider").find(".item_3").animate({left:"76%"},1000);
	},
	slider3_handler:function(){
		if(slider_interface.animlock){
			//return false;
		}
		slider_interface.animlock=true;
		$("#_slider").find(".item_2").stop();
		$("#_slider").find(".item_3").stop();
		$("#_slider").find(".item_2").animate({left:"10%"},1000,function(){slider_interface.animlock=false});
		$("#_slider").find(".item_3").animate({left:"30%"},1000);
	},
	reset_handler:function(){
		if(slider_interface.animlock==true){
			//return false;
		}
		var cont=this;
		slider_interface.animlock=true;
		$("#_slider").find(".item_2").stop();
		$("#_slider").find(".item_3").stop();
		$("#_slider").find(".item_2").animate({left:"15%"},1000,function(){slider_interface.animlock=false});
		$("#_slider").find(".item_3").animate({left:"50%"},1000);
	}
};










var slider_class=function(contenedor){
	this.contenedor=contenedor;
	slider_interface.sliders.push(this);
	this.id=slider_interface.sliders.length-1;
	$(contenedor).addClass("__slider_"+this.id);
	
	//$(window).resize(slider_interface.resizeHandler);
	
	this.resize=slider_interface.resize;
	
	$(this.contenedor).find(".item_1").mouseover(slider_interface.slider1_handler);
	$(this.contenedor).find(".item_2").mouseover(slider_interface.slider2_handler);
	$(this.contenedor).find(".item_3").mouseover(slider_interface.slider3_handler);
	$(this.contenedor).find(".wrap").mouseout(slider_interface.reset_handler);
};










var slider;



$(document).ready(function(){
	slider=new slider_class("#_slider");
	//slider_interface.resizeHandler();
});
