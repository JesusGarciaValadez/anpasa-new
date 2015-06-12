var paginacion_interface={
	show:function(page){
		switch(page){
			case 1:
			paginacion_interface.show1();
			break;
			case 2:
			paginacion_interface.show2();
			break;
			case 3:
			paginacion_interface.show3();
			break;
		}
	},
	show1:function(){
		paginacion_interface.change_top("#_top1");
		paginacion_interface.change_articulo("#_main");
	},
	show2:function(){
		paginacion_interface.change_top("#_top2");
		paginacion_interface.change_articulo("#_bancaEmpresas");
	},
	show2:function(){
		paginacion_interface.change_top("#_top2");
		paginacion_interface.change_articulo("#_bancaEmpresas");
	},
	show3:function(){
		paginacion_interface.change_top("#_top3");
		paginacion_interface.change_articulo("#_bancaprivada");
	},
	initTops:function(){
			var top1="#_top1";
			var top2="#_top2";
			var top3="#_top3";
			$(top2).css("opacity","0");
			$(top2).css("display","none");
			$(top3).css("opacity","0");
			$(top3).css("display","none");
	},
	change_top:function(cont){
		if ($.browser.msie){
			var transicion=0;
		}
		else {
			var transicion=1000;
		}
		var top1="#_top1";
		var top2="#_top2";
		var top3="#_top3";
		if(cont!=top1&&$(top1).css("display")=="block"){
			$(top1).animate({opacity:0},transicion,function(){$("#_top1").css("display","none");});
		}
		if(cont!=top2&&$(top2).css("display")=="block"){
			$(top2).animate({opacity:0},transicion,function(){$("#_top2").css("display","none");});
		}
		if(cont!=top3&&$(top3).css("display")=="block"){
			$(top3).animate({opacity:0},transicion,function(){$("#_top3").css("display","none");});
		}
		$(cont).css("display","block");
		$(cont).css("opacity","0");
		$(cont).css("visibility","visible");
		$(cont).animate({opacity:1},transicion);
	},
	change_articulo:function(cont){
		if ($.browser.msie){
			var transicion=0;
		}
		else {
			var transicion=1000;
		}
		var art1="#_main";
		var art2="#_bancaEmpresas";
		var art3="#_bancaprivada";
		if(cont!=art1&&$(art1).css("display")=="block"){
			$(art1).css("position","absolute");
			$(art1).css("z-index","0");
			$(art1).animate({opacity:0,margin:"700px 0 0 0"},transicion,function(){$("#_main").css("display","none");});
		}
		if(cont!=art2&&$(art2).css("display")=="block"){
			$(art2).css("position","absolute");
			$(art2).css("z-index","0");
			$(art2).animate({opacity:0,margin:"700px 0 0 0"},transicion,function(){$("#_bancaEmpresas").css("display","none");});
		}
		if(cont!=art3&&$(art3).css("display")=="block"){
			$(art3).css("position","absolute");
			$(art3).css("z-index","0");
			$(art3).animate({opacity:0,margin:"700px 0 0 0"},transicion,function(){$("#_bancaprivada").css("display","none");});
		}
		$(cont).css("display","block");
		$(cont).css("position","absolute");
		$(cont).css("opacity","0");
		$(cont).css("z-index","100");
		$(cont).css("margin","700px 0 0 0");
		$(cont).animate({opacity:1,margin:"0"},transicion,function(){
			$("#_main").css("position","relative");
			$("#_bancaEmpresas").css("position","relative");
			$("#_bancaprivada").css("position","relative")
			$("#_main").css("z-index","0");
			$("#_bancaEmpresas").css("z-index","0");
			$("#_bancaprivada").css("z-index","0")
			;});
	}
}
