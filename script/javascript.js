var dataUrl= "https://shenjiec.github.io/json/data.json"
var save = "";

function menushow(){
	var menu = document.getElementById('menu');
	menu.classList.toggle('active');
	
	var bd = document.getElementById('bd');
	bd.classList.toggle('active');
}
function getTable(){
	return "<tr><td style=\"width:46px\">編號</td><td style=\"width:80px\">名稱</td><td colspan=2 style=\"width:120px\">屬性</td><td style=\"width:22px\">H</td><td style=\"width:22px\">A</td><td style=\"width:22px\">B</td><td style=\"width:22px\">C</td><td style=\"width:22px\">D</td><td style=\"width:22px\">S</td><td style=\"width:22px\">T</td></tr>";
}
function savePok(){
	var array = save.split('-');
	if(array.length > 12){
		alert("最多暫存12隻");
		return;
	}
	for(i = 0; i < array.length-1; i++){
		if(array[i] == event.target.id){
			alert("該編號已暫存...");
			return;
		}
	}	
	alert("已新增編號 " + event.target.id + " 至暫存\r\n目前共" + array.length + "隻");
	save = save + event.target.id + "-";	
}
function deletePok(){
	var array = save.split('-');
	var temp = "";
	for(i = 0; i < array.length-1; i++){
		if(array[i] == event.target.id){
			continue;
		}
		temp = temp + array[i] + "-";
	}	
	save = temp;
	readPokSave();
}
function readPok() {
	var name = document.getElementById("inputname").value
	var c1 = myPokemon1.options[myPokemon1.selectedIndex].text;
	var c2 = myPokemon2.options[myPokemon2.selectedIndex].text;
	var hp1 = document.getElementById("inputhp1").value;
	var hp2 = document.getElementById("inputhp2").value;
	var atk1 = document.getElementById("inputatk1").value;
	var atk2 = document.getElementById("inputatk2").value;
	var def1 = document.getElementById("inputdef1").value;
	var def2 = document.getElementById("inputdef2").value;
	var spa1 = document.getElementById("inputspa1").value;
	var spa2 = document.getElementById("inputspa2").value;
	var spd1 = document.getElementById("inputspd1").value;
	var spd2 = document.getElementById("inputspd2").value;
	var spe1 = document.getElementById("inputspe1").value;
	var spe2 = document.getElementById("inputspe2").value;
	var tot1 = document.getElementById("inputtot1").value;
	var tot2 = document.getElementById("inputtot2").value;	
	$.ajax({
		url: dataUrl,
		method: 'GET',
		dataType: 'json',
		data: '',
		async: true,
	   
		success: res =>{
				//console.log(res)
				var count = 0;
				var temp = getTable();
				for (i = 0; i < res.length; i++) {
					if(name != "" && !res[i].name.includes(name)){
						continue
					}
					if(c1 != "" && res[i].c1 != c1 && res[i].c2 != c1){
						continue;
					}
					if(c2 != "" && res[i].c1 != c2 && res[i].c2 != c2){
						continue;
					}
					if(hp1 != "" && res[i].hp < hp1){
						continue;
					}
					if(hp2 != "" && res[i].hp > hp2){
						continue;
					}
					if(atk1 != "" && res[i].atk < atk1){
						continue;
					}
					if(atk2 != "" && res[i].atk > atk2){
						continue;
					}
					if(def1 != "" && res[i].def < def1){
						continue;
					}
					if(def2 != "" && res[i].def > def2){
						continue;
					}
					if(spa1 != "" && res[i].spa < spa1){
						continue;
					}
					if(spa2 != "" && res[i].spa > spa2){
						continue;
					}
					if(spd1 != "" && res[i].spd < spd1){
						continue;
					}
					if(spd2 != "" && res[i].spd > spd2){
						continue;
					}
					if(spe1 != "" && res[i].spe < spe1){
						continue;
					}
					if(spe2 != "" && res[i].spe > spe2){
						continue;
					}
					if(tot1 != "" && res[i].tot < tot1){
						continue;
					}
					if(tot2 != "" && res[i].tot > tot2){
						continue;
					}
					count++;
					temp += "<tr><td><button id=\"" + res[i].no + "\" style=\"width:46px; height:32px; color:black; background-Color:white\" onclick=\"savePok()\">" + res[i].no + "</button></td><td>" + res[i].name + "</td>" + getAttribute(res[i].c1, res[i].c2) + "<td>" + res[i].hp + "</td><td>" + res[i].atk + "</td><td>" + res[i].def + "</td><td>" + res[i].spa + "</td><td>" + res[i].spd + "</td><td>" + res[i].spe + "</td><td>" + res[i].tot + "</td></tr>";
				}
				document.getElementById("mytable").innerHTML = temp;
				document.getElementById("output1").innerText = count + " 符合結果";
				document.getElementById("output2").innerText = "點擊寶可夢編號新增至暫存";
			},
		error: err =>{
				console.log(err)
			},
	});
}
function readPokSave() {
	if(save==""){
		alert("尚無暫存...\r\n點擊寶可夢編號即可暫存");
		document.getElementById("mytable").innerHTML = "";
		document.getElementById("output1").innerText = "";
		document.getElementById("output2").innerText = "";
		return;
	}
	var array = save.split('-');
	$.ajax({
		url: dataUrl,
		method: 'GET',
		dataType: 'json',
		data: '',
		async: true,
	   
		success: res =>{
				//console.log(res)
				var count = 0;
				var temp = getTable();
				for (i = 0; i < res.length; i++) {
					var judge = false;
					for(a = 0; a < array.length-1; a++){
						if(res[i].no == array[a]){
							judge = true;
							break;
						}
					}
					if(!judge){continue;}
					temp += "<tr><td><button id=\"" + res[i].no + "\" style=\"width:46px; height:32px; color:black; background-Color:white\" onclick=\"deletePok()\">" + res[i].no + "</button></td><td>" + res[i].name + "</td>" + getAttribute(res[i].c1, res[i].c2) + "<td>" + res[i].hp + "</td><td>" + res[i].atk + "</td><td>" + res[i].def + "</td><td>" + res[i].spa + "</td><td>" + res[i].spd + "</td><td>" + res[i].spe + "</td><td>" + res[i].tot + "</td></tr>";
					count++;
				}
				document.getElementById("mytable").innerHTML = temp;
				document.getElementById("output1").innerText = count + " 符合結果";
				document.getElementById("output2").innerText = "點擊寶可夢編號移除暫存";
			},
		error: err =>{
				console.log(err)
			},
	});
}
function clr(){
	document.getElementById("myPokemon1").selectedIndex = 0;
	document.getElementById("myPokemon2").selectedIndex = 0;
	document.getElementById("output0").innerText = "";
	document.getElementById("output1").innerText = "";
	document.getElementById("output2").innerText = "";
	document.getElementById("output3").innerText = "";
}
function clr2(){
	document.getElementById("myPokemon1").selectedIndex = 0;
	document.getElementById("myPokemon2").selectedIndex = 0;
	document.getElementById("inputname").value = "";
	document.getElementById("inputhp1").value = "";
	document.getElementById("inputhp2").value = "";
	document.getElementById("inputatk1").value = "";
	document.getElementById("inputatk2").value = "";
	document.getElementById("inputdef1").value = "";
	document.getElementById("inputdef2").value = "";
	document.getElementById("inputspa1").value = "";
	document.getElementById("inputspa2").value = "";
	document.getElementById("inputspd1").value = "";
	document.getElementById("inputspd2").value = "";
	document.getElementById("inputspe1").value = "";
	document.getElementById("inputspe2").value = "";
	document.getElementById("inputtot1").value = "";
	document.getElementById("inputtot2").value = "";
	document.getElementById("mytable").innerHTML = "";
	document.getElementById("output1").innerText = "";
	document.getElementById("output2").innerText = "";
	save = "";
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
	var v1 = document.getElementById("myPokemon1").value;
	var v2 = document.getElementById("myPokemon2").value;
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
				temp3 = temp3 + getValue(i) + "傷害無效 傷害: " + value + " 倍" + "\r\n";
			}
			else if(value > 2){
				temp0 = temp0 + "弱點 " + getValue(i) + " 屬性 傷害: " + value + " 倍" + "\r\n";
			}
			else if(value > 1){
				temp1 = temp1 + "弱點 " + getValue(i) + " 屬性 傷害: " + value + " 倍" + "\r\n";
			}
			else if(value < 1){
				temp2 = temp2 + "抵抗 " + getValue(i) + " 屬性 傷害: " + value + " 倍" + "\r\n";
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
			temp3 = temp3 + getValue(i) + "傷害無效 傷害: " + array[i][v1] + " 倍" + "\r\n";
		}
		else if(array[i][v1] > 1){
			temp1 = temp1 + "弱點 " + getValue(i) + " 屬性 傷害: " + array[i][v1] + " 倍" + "\r\n";
		}
		else if(array[i][v1] < 1){
			temp2 = temp2 + "抵抗 " + getValue(i) + " 屬性 傷害: " + array[i][v1] + " 倍" + "\r\n";
		}
	}
	document.getElementById("output1").innerText = temp1;
	document.getElementById("output2").innerText = temp2;
	document.getElementById("output3").innerText = temp3;
}
function getValue(a){
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
function getAttribute(a, b){
	if(b == ""){		
		return "<td colspan=2 style=\"" + getColor(a) + "\">" + a + "</td>";
	}
	else{
		return "<td style=\"" + getColor(a) + "\">" + a + "</td><td style=\"" + getColor(b) + "\">" + b + "</td>";		
	}
}
function getColor(a){
	switch(a)
	{
		case "一般":
			return "background-Color:#9fa19f; color:white;";
		case "格鬥":
			return "background-Color:#DD9988; color:white;";
		case "飛行":
			return "background-Color:#81b9ef; color:white;";
		case "毒":
			return "background-Color:#9141cb; color:white;";
		case "地面":
			return "background-Color:#915121; color:white;";
		case "岩石":
			return "background-Color:#afa981; color:white;";
		case "蟲":
			return "background-Color:#91a119; color:white;";
		case "幽靈":
			return "background-Color:#704170; color:white;";
		case "鋼":
			return "background-Color:#60a1b8; color:white;";
		case "火":
			return "background-Color:#e62829; color:white;";
		case "水":
			return "background-Color:#2980ef; color:white;";
		case "草":
			return "background-Color:#3fa129; color:white;";
		case "電":
			return "background-Color:#fac000; color:white;";
		case "超能力":
			return "background-Color:#ef4179; color:white;";
		case "冰":
			return "background-Color:#3fd8ff; color:white;";
		case "龍":
			return "background-Color:#5060e1; color:white;";
		case "惡":
			return "background-Color:#50413f; color:white;";
		case "妖精":
			return "background-Color:#ef70ef; color:white;";
	}
	return "";	
}
/*function getColor(a){
	switch(a)
	{
		case "一般":
			return "background-Color:lightgray; color:black;";
		case "格鬥":
			return "background-Color:coral; color:white;";
		case "飛行":
			return "background-Color:lightblue; color:black;";
		case "毒":
			return "background-Color:orchid; color:white;";
		case "地面":
			return "background-Color:chocolate; color:white;";
		case "岩石":
			return "background-Color:tan; color:white;";
		case "蟲":
			return "background-Color:darkkhaki; color:white;";
		case "幽靈":
			return "background-Color:mediumpurple; color:white;";
		case "鋼":
			return "background-Color:steelblue; color:white;";
		case "火":
			return "background-Color:red; color:white;";
		case "水":
			return "background-Color:dodgerblue; color:white;";
		case "草":
			return "background-Color:mediumseagreen; color:white;";
		case "電":
			return "background-Color:gold; color:white;";
		case "超能力":
			return "background-Color:lightcoral; color:white;";
		case "冰":
			return "background-Color:cyan; color:black;";
		case "龍":
			return "background-Color:royalblue; color:white;";
		case "惡":
			return "background-Color:saddlebrown; color:white;";
		case "妖精":
			return "background-Color:hotpink; color:white;";
	}
	return "";	
}*/
