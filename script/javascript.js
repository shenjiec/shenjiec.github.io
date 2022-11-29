function menushow(){
	var menu = document.getElementById('menu');
	menu.classList.toggle('active');
	
	var bd = document.getElementById('bd');
	bd.classList.toggle('active');
}
function clr(){
	document.getElementById("myPokemon1").value = "";
	document.getElementById("myPokemon2").value = "";
	document.getElementById("output0").innerText = "";
	document.getElementById("output1").innerText = "";
	document.getElementById("output2").innerText = "";
	document.getElementById("output3").innerText = "";
}
function cal(){
	document.getElementById("output0").innerText = "";
	var array  = new Array();
	array[0] = [1,1,1,1,1,0.5,1,0,0.5,1,1,1,1,1,1,1,1,1];
	array[1] = [2,1,0.5,0.5,1,2,0.5,0,2,1,1,1,1,0.5,2,1,2,0.5];
	array[2] = [1,2,1,1,1,0.5,2,1,0.5,1,1,2,0.5,1,1,1,1,1];
	array[3] = [1,1,1,0.5,0.5,0.5,1,0.5,0,1,1,2,1,1,1,1,1,2];
	array[4] = [1,1,0,2,1,2,0.5,1,2,2,1,0.5,2,1,1,1,1,1];
	array[5] = [1,0.5,2,1,0.5,1,2,1,0.5,2,1,1,1,1,2,1,1,1];
	array[6] = [1,0.5,0.5,0.5,1,1,1,0.5,0.5,0.5,1,2,1,2,1,1,2,0.5];
	array[7] = [0,1,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,1];
	array[8] = [1,1,1,1,1,2,1,1,0.5,0.5,0.5,1,0.5,1,2,1,1,2];
	array[9] = [1,1,1,1,1,0.5,2,1,2,0.5,0.5,2,1,1,2,0.5,1,1];
	array[10] = [1,1,1,1,2,2,1,1,1,2,0.5,0.5,1,1,1,0.5,1,1];
	array[11] = [1,1,0.5,0.5,2,2,0.5,1,0.5,0.5,2,0.5,1,1,1,0.5,1,1];
	array[12] = [1,1,2,1,0,1,1,1,1,1,2,0.5,0.5,1,1,0.5,1,1];
	array[13] = [1,2,1,2,1,1,1,1,0.5,1,1,1,1,0.5,1,1,0,1];
	array[14] = [1,1,2,1,2,1,1,1,0.5,0.5,0.5,2,1,1,0.5,2,1,1];
	array[15] = [1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,2,1,0];
	array[16] = [1,0.5,1,1,1,1,1,2,1,1,1,1,1,2,1,1,0.5,0.5];
	array[17] = [1,2,1,0.5,1,1,1,1,0.5,0.5,1,1,1,1,1,2,2,1];
	var a1 = document.getElementById("myPokemon1").value;
	var a2 = document.getElementById("myPokemon2").value;	
	var v1 = getValue(a1);
	var v2 = getValue(a2);
	var temp0 = "";
	var temp1 = "";
	var temp2 = "";
	var temp3 = "";
	if(v1 == -1 && v2 == -1){//無	
		return;		
	}
	if(v1 != -1 && v2 != -1 && v1 != v2){//雙屬			
		for( i = 0; i < 18; i++){
			var value = array[i][v1] * array[i][v2];
			if(value == 0){
				temp3 = temp3 + getValue2(i) + "傷害無效 傷害: " + value + " 倍" + "\r\n";
			}
			else if(value > 2){
				temp0 = temp0 + "弱點 " + getValue2(i) + " 屬性 傷害: " + value + " 倍" + "\r\n";
			}
			else if(value > 1){
				temp1 = temp1 + "弱點 " + getValue2(i) + " 屬性 傷害: " + value + " 倍" + "\r\n";
			}
			else if(value < 1){
				temp2 = temp2 + "抵抗 " + getValue2(i) + " 屬性 傷害: " + value + " 倍" + "\r\n";
			}		
		}		
		document.getElementById("output0").innerText = temp0;
		document.getElementById("output1").innerText = temp1;
		document.getElementById("output2").innerText = temp2;
		document.getElementById("output3").innerText = temp3;
		return;
	}
	//單屬
	if(v1 == -1){v1 = v2;}
	for( i = 0; i < 18; i++){
		if(array[i][v1] == 0){
			temp3 = temp3 + getValue2(i) + "傷害無效 傷害: " + array[i][v1] + " 倍" + "\r\n";
		}
		else if(array[i][v1] > 1){
			temp1 = temp1 + "弱點 " + getValue2(i) + " 屬性 傷害: " + array[i][v1] + " 倍" + "\r\n";
		}
		else if(array[i][v1] < 1){
			temp2 = temp2 + "抵抗 " + getValue2(i) + " 屬性 傷害: " + array[i][v1] + " 倍" + "\r\n";
		}
	}
	document.getElementById("output1").innerText = temp1;
	document.getElementById("output2").innerText = temp2;
	document.getElementById("output3").innerText = temp3;
}
function getValue(a){
	switch(a)
	{
		case "一般":		
			return 0;
		case "格鬥":		
			return 1;
		case "飛行":		
			return 2;
		case "毒":		
			return 3;
		case "地面":		
			return 4;
		case "岩石":		
			return 5;
		case "蟲":		
			return 6;
		case "幽靈":		
			return 7;
		case "鋼":		
			return 8;
		case "火":		
			return 9;
		case "水":		
			return 10;
		case "草":		
			return 11;
		case "電":		
			return 12;
		case "超能力":		
			return 13;
		case "冰":		
			return 14;
		case "龍":		
			return 15;
		case "惡":		
			return 16;
		case "妖精":		
			return 17;
	}	
	return -1;	
}
function getValue2(a){
	switch(a)
	{
		case 0:		
			return "一般";
		case 1:		
			return "格鬥";
		case 2:		
			return "飛行";
		case 3:		
			return "毒";
		case 4:		
			return "地面";
		case 5:		
			return "岩石";
		case 6:		
			return "蟲";
		case 7:		
			return "幽靈";
		case 8:		
			return "鋼";
		case 9:		
			return "火";
		case 10:		
			return "水";
		case 11:		
			return "草";
		case 12:		
			return "電";
		case 13:		
			return "超能力";
		case 14:		
			return "冰";
		case 15:		
			return "龍";
		case 16:		
			return "惡";
		case 17:		
			return "妖精";
	}	
	return "";	
}
