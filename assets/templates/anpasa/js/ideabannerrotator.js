/**
 * @author paynalton
 */
idea_bannerRotator=
	{
		carpeta:"",
		modelo:null,
		contenedor:null,
		indicador:null,
		width:0,
		height:0,
		units:"px",
		banners:[],
		bannersobjects:[],
		actual:0,
		velocidad:50,
		detalle:2,
		load:function(jsonURL)
		  {
	   		var script=document.createElement("script");
			script.type="text/javascript"
			script.src=idea_bannerRotator.carpeta+jsonURL;
			document.body.appendChild(script);
		  },
		loadCallback:function(banners){
			if(!idea_bannerRotator.modelo)
			  {
			  	return false;
			  }
			if(!idea_bannerRotator.contenedor)
			  {
			  	return false;
			  }
			for (var i = 0; i < banners.length; i++) {
				if (banners[i].imagen) {
					var banner = idea_bannerRotator.modelo.cloneNode(true);
					banner.id = banner.id + "_" + i;
					banner.className = banner.className + " banner_" + i;
					banner.style.width = idea_bannerRotator.width + idea_bannerRotator.units;
					banner.style.cssFloat = "left";
					banner.style.height = idea_bannerRotator.height + idea_bannerRotator.units;
					var links = banner.getElementsByTagName("a");
					for (var j = 0; j < links.length; j++) {
						if (banners[i].activarlink && links[j].title == "linkholder") {
							if(banners[i].linktarget=="colorbox"){
							links[j].href = banners[i].link;
							links[j].target = "_self";
							links[j].title = banners[i].titulo;
							$(links[j]).colorbox({href:banners[i].link,inline:true,title:"",close:"X"});
							}
							else{
							links[j].href = banners[i].link;
							links[j].target = banners[i].linktarget;
							links[j].title = banners[i].titulo;
							}
						}
						else 
							if (links[j].title == "linkholder") {
								links[j].href = "#";
								links[j].target = "_self";
								links[j].title = banners[i].titulo;
							}
					}
					
					var imagenes = banner.getElementsByTagName("img");
					for (var j = 0; j < imagenes.length; j++) {
						if (imagenes[j].title == "bannerholder") {
							imagenes[j].title = banners[i].titulo;
							imagenes[j].src = idea_bannerRotator.carpeta + banners[i].imagen;
							imagenes[j].style.width = idea_bannerRotator.width + idea_bannerRotator.units;
							imagenes[j].style.height = idea_bannerRotator.height + idea_bannerRotator.units;
						}
					}
					
					var spans = banner.getElementsByTagName("span");
					for (var j = 0; j < spans.length; j++) {
						if (spans[j].title == "descripcionholder") {
							spans[j].title = banners[i].titulo;
							spans[j].appendChild(document.createTextNode(banners[i].texto));
						}
					}
					if (i == 0) {
						idea_bannerRotator.contenedor.appendChild(banner);
					}
					idea_bannerRotator.banners.push(banner);
					idea_bannerRotator.contenedor.style.width = (idea_bannerRotator.width) + idea_bannerRotator.units;
					idea_bannerRotator.contenedor.style.height = (idea_bannerRotator.height) + idea_bannerRotator.units;
					idea_bannerRotator.contenedor.style.overflow = "hidden";
				}
			}
			idea_bannerRotator.setAguja();
			
		},
		setAguja:function() {
			idea_bannerRotator.indicador.style.width=(14*(idea_bannerRotator.banners.length))+"px";
			
			
				while(idea_bannerRotator.indicador.firstChild)
				  {
				  	idea_bannerRotator.indicador.removeChild(idea_bannerRotator.indicador.firstChild);
				  }
				for(var i=0; i<idea_bannerRotator.banners.length;i++)
				   {
				   	var aguja=idea_bannerRotator.indicadorAguja.cloneNode(true);
					aguja.id="aguja_"+i;
					if(i==idea_bannerRotator.actual)
					  {
					  	aguja.className=aguja.className+" actual";
					  }
					idea_bannerRotator.indicador.appendChild(aguja);
					
			        if(document.addEventListener)
			                {
			                aguja.addEventListener("click", function(){var i=this.id.split("_",2);idea_bannerRotator.actual=i[1]*1;idea_efectos.clean();idea_bannerRotator.setAguja();}, false);
			                }
			        else
			                {
			                aguja.attachEvent("onclick", function(){alert(this.id.split("_",2));idea_bannerRotator.actual=i[1]*1;idea_efectos.clean();idea_bannerRotator.setAguja();});
			                }
				   }
		},
		prev:function(efecto)
		  {
			if(!idea_efectos.lock)
			  {
		  	var actual=idea_bannerRotator.actual;
			var siguiente=actual-1;
			if(siguiente<0) {
				siguiente=idea_bannerRotator.banners.length-1;
			}
			idea_bannerRotator.actual=siguiente;
			actual=idea_bannerRotator.banners[actual];
			siguiente=idea_bannerRotator.banners[siguiente];
			  	idea_efectos[efecto](actual, siguiente);
			idea_bannerRotator.setAguja();
			  }
			else 
			  {
			  //	idea_efectos.clean();
			//idea_bannerRotator.setAguja();
			  }
		  },
		next:function(efecto)
		  {
			if(!idea_efectos.lock)
			  {
		  	var actual=idea_bannerRotator.actual;
			var siguiente=actual+1;
			if(siguiente>idea_bannerRotator.banners.length-1) {
				siguiente=0;
			}
			idea_bannerRotator.actual=siguiente;
			
			actual=idea_bannerRotator.banners[actual];
			
			siguiente=idea_bannerRotator.banners[siguiente];
			  	idea_efectos[efecto](actual, siguiente);
			idea_bannerRotator.setAguja();
			  }
			else 
			  {
			  //	idea_efectos.clean();
			//idea_bannerRotator.setAguja();
			  }
		  }
	};

	idea_efectos={
		lock:false,
		timeOuts:[],
		clean:function() {
			
		  	idea_efectos.lock=false;
			for(var i=0;i<idea_efectos.timeOuts.length;i++)
			  {
			  	clearTimeout(idea_efectos.timeOuts[i]);
			  }
			while(idea_bannerRotator.contenedor.firstChild)
			  {
			  	idea_bannerRotator.contenedor.removeChild(idea_bannerRotator.contenedor.firstChild);
			  }
			idea_bannerRotator.contenedor.appendChild(idea_bannerRotator.banners[idea_bannerRotator.actual]);
			idea_bannerRotator.contenedor.scrollLeft=0;
			idea_bannerRotator.contenedor.style.width = (idea_bannerRotator.width) + idea_bannerRotator.units;
			idea_bannerRotator.contenedor.style.height = (idea_bannerRotator.height) + idea_bannerRotator.units;
			idea_bannerRotator.contenedor.style.overflow = "hidden";
		},
		slideLeft:function(actual,siguiente)
		  {
		  	idea_efectos.lock=true;
		  	var riel=document.createElement("div");
			riel.appendChild(siguiente);
			riel.appendChild(actual);
			
		  	riel.style.width=(idea_bannerRotator.width*2)+idea_bannerRotator.units;
			
			idea_bannerRotator.contenedor.appendChild(riel);
			idea_bannerRotator.contenedor.scrollLeft=1600;
			
			var pasos=100/idea_bannerRotator.detalle;
			var distancia=Math.round((idea_bannerRotator.width)/pasos);
			
		  
			for(var i=0; i<=100;i+=idea_bannerRotator.detalle)
			  {
			  	idea_efectos.timeOuts.push(setTimeout("idea_bannerRotator.contenedor.scrollLeft=idea_bannerRotator.contenedor.scrollLeft-"+distancia,i*idea_bannerRotator.velocidad*.1));
				if(i>=100)
				  {
				  	idea_efectos.timeOuts.push(setTimeout("idea_efectos.clean()",i*idea_bannerRotator.velocidad*.1));
					break;
				  }
			  }
		  },
		slideRight:function(actual,siguiente)
		  {
		  	idea_efectos.lock=true;
		  	var riel=document.createElement("div");
			riel.appendChild(actual);
			riel.appendChild(siguiente);
			
		  	riel.style.width=(idea_bannerRotator.width*2)+idea_bannerRotator.units;
			
		  	idea_bannerRotator.contenedor.appendChild(riel);
			idea_bannerRotator.contenedor.scrollLeft=0;
			
			var pasos=100/idea_bannerRotator.detalle;
			var distancia=Math.round((idea_bannerRotator.width)/pasos);
			
			for(var i=0; i<=100;i+=idea_bannerRotator.detalle)
			  {
			  	idea_efectos.timeOuts.push(setTimeout("idea_bannerRotator.contenedor.scrollLeft=idea_bannerRotator.contenedor.scrollLeft+"+distancia,i*(idea_bannerRotator.velocidad)*.1));
				if(i>=100)
				  {
				  	idea_efectos.timeOuts.push(setTimeout("idea_efectos.clean()",i*idea_bannerRotator.velocidad*.1));
					break;
				  }
			  }
		  }
	}
