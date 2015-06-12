var autochanger_c={
	changer:function(){
		
		switch(location.hash){
			case "#empresas":
				paginacion_interface.show(2);
				cargacaptcha(2);
			break;
			case "#privada":
				paginacion_interface.show(3);
				cargacaptcha(3);
			break;
			default:
				
			break;
		}
	}
}

