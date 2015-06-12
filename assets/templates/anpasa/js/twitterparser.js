/**
 * @author paynalton
 */

 
	var twitterparser={
	wrapper:"twitterwrap",
	 object_fetched:false,
	 fech:function() {
	 	this.wrapper=document.getElementById(this.wrapper);
	  },
	 parse:function(entradas) {
	  if(!this.object_fetched)this.fech();
	  var totalW=0;
	   for(i in entradas)
	    {
		var div=document.createElement("div");
		div.className="entry";
		div.appendChild(document.createTextNode(entradas[i].text));
		var width=Math.round(entradas[i].text.length*7);
		div.style.width=width+"px";
		totalW+=width;
		this.wrapper.appendChild(div);
		}
		this.wrapper.style.width=totalW+"px";
		setInterval("twitterparser.scroll()",10);
	  },
	  scroll:function() {
	  	var cont=this.wrapper.parentNode;
		var newscroll=cont.scrollLeft+2	;
		cont.scrollLeft=newscroll;
		if(cont.scrollLeft!=newscroll) {
		 cont.scrollLeft=0;
		 }
	  }
	 }