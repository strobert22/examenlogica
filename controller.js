$( document ).ready(function() {

	$(window).keydown(function(event){ //previene que cuando presione ENTER no envie el form
	if( (event.keyCode == 13) ) {
	  event.preventDefault();
	  return false;
	}
	});

	function ChangeView(view_idx){ //funcion que cambia de vista 
		$(".view").each(function(){
			($(this).attr("item-idx")==view_idx) ? $(this).fadeIn():$(this).hide();
		});
		$(".nav-link").each(function(){
			($(this).attr("item-idx")==view_idx) ? $(this).toggleClass("active"):$(this).removeClass("active");
		});
	}

	function MuestraMensaje(msg){ //muestra mensaje de aviso (modal)
		$('#modal_mensaje_texto').html(msg);
		$('#modal_mensaje').modal('show');
	}

	$(".nav-link").click(function(){ // evento click en el sidebar menu
	var idx_view=$(this).attr("item-idx");
		ChangeView(idx_view); //cambia de vista
	});

	/*#########     EJERCICIO 1      #########*/

	var vector_hombres=[];
	var vector_mujeres=[];
	var vector_resultante=[];

	function Imprimir(id_element,vector_){ // funcion que imprime arrays y los inserta en un elemento DOM en la vista
		var html_vector="";
		if(vector_.length==0 || vector_==null || vector_===undefined){
			html_vector+='<tr  >';
            html_vector+='	<td  >...</td>'; 
            html_vector+='</tr>';          
		}else{
			for (var i = 0; i < vector_.length; i++) {
				html_vector+='<tr>';
	            html_vector+='	<td   item-index="'+i+'"  >'+((vector_[i]==undefined) ? 'Vacío' : vector_[i])+'</td>'; 
	            html_vector+='</tr>';
			}			
		}
		$("#"+id_element).html(html_vector);
	}

	function SumarVectores(array1,array2){ //funcion que junta vector_hombres y vector_mujeres, al final muestra el total de caracteres del vector resultante
		vector_resultante=array1.concat(array2); //Concatena los dos vectores
		Imprimir("list_resultado",vector_resultante); //imprime el vector resultante 
		$("#total_chars").html(vector_resultante.join().replace(/,/g,"").length); //cuenta los caracteres del vector resultante y lo agrega a la vista
	}

	function AddHombre(valor){
		var expReg=/^[a-zA-Z]*$/;
		if(expReg.test(valor) && valor != ""){
			vector_hombres.push(valor);
			$("#input_hombre").val("");
			$("#input_hombre").focus();
			Imprimir("list_hombres",vector_hombres); //imprime el vector de hombres
		}else{
			MuestraMensaje("Ingresa un nombre valido (solo letras sin espacios)");
			$("#input_hombre").val("");
			$("#input_hombre").focus();
		}
		
	}

	function AddMujer(valor){
		var expReg=/^[a-zA-Z]*$/;
		if(expReg.test(valor) && valor !=""){
			vector_mujeres.push(valor);
			$("#input_mujer").val("");
			$("#input_mujer").focus();
			Imprimir("list_mujeres",vector_mujeres); //imprime el vector de mujeres
		}else{
			MuestraMensaje("Ingresa un nombre valido (solo letras sin espacios)");
			$("#input_mujer").val("");
			$("#input_mujer").focus();
		}
	}

	function RestartEjercicio1(){ // reinicia los valores de los vectores y campos
		vector_hombres=[];
		vector_mujeres=[];
		vector_resultante=[]; 
		$("#input_hombre").val(""); // limpia el campo
		$("#input_mujer").val(""); // limpia el campo
		$("#total_chars").empty(); //limpia el total de caracteres
		Imprimir("list_hombres",vector_hombres); //imprime el vector de hombres
		Imprimir("list_mujeres",vector_mujeres); //imprime el vector de mujeres
		Imprimir("list_resultado",vector_resultante); //imprime el vector resultante
	}

	$("#input_hombre").keydown(function(event){ //evento ENTER agrega hombres al array 
		if( (event.keyCode == 13) ) {
		  AddHombre($("#input_hombre").val());
		  return false;
		}
	});

	$("#input_mujer").keydown(function(event){ //pevento ENTER agrega mujeres al array 
		if( (event.keyCode == 13) ) {
		  AddMujer($("#input_mujer").val());
		  return false;
		}
	});

	$("#btn_hombre_add").click(function(){ //evento click que agrega nombres al array de hombres
		AddHombre($("#input_hombre").val());
	});

	$("#btn_mujer_add").click(function(){ // evento click que agrega nombres al array de mujeres
		AddMujer($("#input_mujer").val());

	});

	$("#btn_sumar").click(function(){ //evento click que suma los dos vectores hombres y mujeres
 		SumarVectores(vector_hombres,vector_mujeres); //suma los dos vectores
	});

	$("#btn_reiniciar_1").click(function(){ //evento click que reinicia los valores de los vectores y la vista
 		RestartEjercicio1();
	});


	/*#########     EJERCICIO 2      #########*/

	var vector_enteros=[];
	var idx_aux=0;
	var count_idx=0;
	var idx_reversa_aux=0;

	function ImprimirEnteros (vector_) { // imprime el vector de enteros en el orden en el que fueron agregados
		var html_vector="";
		if(vector_.length==0 || vector_==null || vector_===undefined){
			html_vector+='<tr  >';
            html_vector+='	<td  >...</td>'; 
            html_vector+='</tr>';          
		}else{
			var i_reversa_aux=0;
			var i_aux=0;
			for (var i = 0; i < vector_.length; i++) {
				html_vector+='<tr>';
	            html_vector+='	<td   item-index="'+i+'"  >'+((vector_[i]==undefined) ? 'Vacío' : vector_[((i%2==0) ? i_aux : vector_.length-i_reversa_aux )])+'</td>'; 
	            html_vector+='</tr>';
	            i%2==0 ? i_reversa_aux++ : i_aux++;
			}			
		}
		$("#list_enteros_resultado").html(html_vector);
	}

	function AddTotalEnteros(entero){ // inicializa el vector con el numero ingresado y muestra el campo para agregar enteros al vector
		if(isNaN(entero) || entero<=0 ){
			MuestraMensaje("Por favor ingresa un numero entero válido mayor a 0.");
			$("#input_total_enteros").val("");
			$("#input_total_enteros").focus();
		}else{
			vector_enteros.length=parseInt(entero);
			$("#label_enteros").html("Elementos "+count_idx+"/"+vector_enteros.length);
			Imprimir("list_enteros",vector_enteros);
			$(".view_paso1").hide();
			$(".view_paso2").fadeIn('fast');
			$("#input_entero").focus();
		}
	}

	function AddEntero(entero){ // funcion que agrega el entero al array de forma alternada
		if(isNaN(entero)){
			MuestraMensaje("Por favor ingresa un numero entero válido.");
			$("#input_entero").val("");
			$("#input_entero").focus();
		}else{
			if(count_idx<vector_enteros.length){
				vector_enteros[((count_idx%2==0) ? idx_aux : vector_enteros.length-idx_reversa_aux )]=parseInt(entero); //agrega el entero a la poricion de acuerdo al index
				count_idx%2==0 ? idx_reversa_aux++ : idx_aux++;
				count_idx++;
				$("#input_entero").val("");
				$("#input_entero").focus();
				$("#label_enteros").html("Elementos "+count_idx+"/"+vector_enteros.length);
				Imprimir("list_enteros",vector_enteros);
			}else{
				MuestraMensaje("El vector de Enteros està lleno.");
			}
		}
	}

	$("#btn_reiniciar_2").click(function(){ // Reinicia los valores para el ejercicio 2
		$("#input_total_enteros").val("");
		$("#input_entero").val("");
		$(".view_paso2").hide();
		$(".view_paso1").fadeIn('fast');
		vector_enteros=[];
		idx_aux=0;
		idx_reversa_aux=0;
		count_idx=0;
		$("#label_enteros").empty();
		$("#list_enteros").empty();
		$("#list_enteros_resultado").empty();
	});

	$("#input_total_enteros").keydown(function(event){ //evento ENTER agrega el numero total de enteros que llevarà el vector 
		if( (event.keyCode == 13) ) {
		  AddTotalEnteros($("#input_total_enteros").val());
		  return false;
		}
	});

	$("#btn_siguiente").click(function(){ //evento click al ingresar el numero total de enteros que llevarà el vector
 		AddTotalEnteros($("#input_total_enteros").val());
	});

	$("#btn_entero_add").click(function(){ //evento click que que agrega los valores enteros al vector
 		AddEntero($("#input_entero").val());
	});

	$("#input_entero").keydown(function(event){ //pevento ENTER agrega enteros al vector 
		if( (event.keyCode == 13) ) {
		  AddEntero($("#input_entero").val());
		  return false;
		}
	});

	$("#btn_entero_resultado").click(function(){ //evento click para ver el resulado impreso del vector de enteros
 		if(count_idx<vector_enteros.length){
 			MuestraMensaje("Llena primero el vector de enteros.");
 		}else{
 			ImprimirEnteros(vector_enteros); //imprime el vector de enteros
 		}
	});

});