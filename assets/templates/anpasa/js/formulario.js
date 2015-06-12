var formulario={
	revisar:function(form){
		var nombre=$(form).find(".nombre>input").val();
		var tel=$(form).find(".tel>input").val();
		var email=$(form).find(".email>input").val();
		
			$(form).removeClass("error");
			$(form).find(".nombre").removeClass("error");
			$(form).find(".tel").removeClass("error");
			$(form).find(".email").removeClass("error");
			
		if(nombre.length<0||nombre=="Nombre*"){
			$(form).addClass("error");
			$(form).find(".nombre").addClass("error");
			return false;
		}
		if(tel.length<0||tel=="Apellido*"){
			$(form).addClass("error");
			$(form).find(".tel").addClass("error");
			return false;
		}
		if(email.length<0||email=="E-mail*"){
			$(form).addClass("error");
			$(form).find(".email").addClass("error");
			return false;
		}
		return true;
	},
	outfocus:function(objeto,texto){
		if(objeto.value.length>0){
			$(objeto).addClass("modificado");
		}
		else {
			$(objeto).removeClass("modificado");
			objeto.value=texto;
		}
	},
	focus:function(objeto,texto){
		if(objeto.value==texto){
			objeto.value="";
		}
	}	
}
