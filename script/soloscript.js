var dataUrl= "https://shenjiec.github.io/json/solodata.json"
var save = "";

function menushow(){
	var menu = document.getElementById('menu');
	menu.classList.toggle('active');
	
	var bd = document.getElementById('bd');
	bd.classList.toggle('active');
}
function getTable(){
	return "<tr><td>編號</td><td>名稱</td><td>部位</td><td>類型</td><td>方法</td><td>主屬</td><td>來源</td></tr>";
}
function saveSol(){
	var array = save.split('-');
	if(array.length > 12){
		alert("最多暫存12件");
		return;
	}
	for(i = 0; i < array.length-1; i++){
		if(array[i] == event.target.id){
			alert("該編號已暫存...");
			return;
		}
	}	
	alert("已新增編號 " + event.target.id + " 至暫存\r\n目前共" + array.length + "件");
	save = save + event.target.id + "-";	
}
function deleteSol(){
	var array = save.split('-');
	var temp = "";
	for(i = 0; i < array.length-1; i++){
		if(array[i] == event.target.id){
			continue;
		}
		temp = temp + array[i] + "-";
	}	
	save = temp;
	readSolSave();
}
function readSol() {
	var name = document.getElementById("inputname").value
	var part = mypart.options[mypart.selectedIndex].text;
	var type = mytype.options[mytype.selectedIndex].text;
	var use = myuse.options[myuse.selectedIndex].text;
	var main = mymain.options[mymain.selectedIndex].text;
	var rune = document.getElementById("rune").value;
	var effect = document.getElementById("effect").value;
	var source = mysource.options[mysource.selectedIndex].text;
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
					if(part != "" && res[i].part != part){
						continue;
					}
					if(type != "" && res[i].type != type){
						continue;
					}
					if(use != "" && res[i].use != use){
						continue;
					}
					if(main != "" && res[i].main != main){
						continue;
					}
					if(rune != "" && !res[i].rune.includes(rune)){
						continue
					}
					if(effect != "" && !res[i].effect.includes(effect)){
						continue
					}
					if(source != "" && res[i].source != source){
						continue;
					}
					count++;					
					temp += "<tr><td id=\"" + res[i].id + "\" onclick=\"saveSol()\">" + res[i].id + "</td><td onclick=\"readDetail('"+res[i].name+"','"+res[i].use+"','"+res[i].main+"','"+res[i].rune+"','"+res[i].effect+"','"+res[i].enc1+"','"+res[i].enc2+"')\">" + res[i].name + "</td><td>" + res[i].part + "</td><td>" + res[i].type + "</td><td>" + res[i].use + "</td><td>" + res[i].main + "</td><td>" + res[i].source + "</td></tr>";
				}
				document.getElementById("mytable").innerHTML = temp;
				document.getElementById("output1").innerText = count + " 符合結果";
				document.getElementById("output2").innerText = "點擊裝備編號新增至暫存";
				document.getElementById("output3").innerText = "點擊裝備名稱查看詳細資料";
			},
		error: err =>{
				console.log(err)
			},
	});
}
function readSolSave() {
	if(save==""){
		alert("尚無暫存...\r\n點擊裝備編號即可暫存");
		document.getElementById("mytable").innerHTML = "";
		document.getElementById("output1").innerText = "";
		document.getElementById("output2").innerText = "";
		document.getElementById("output3").innerText = "";
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
						if(res[i].id == array[a]){
							judge = true;
							break;
						}
					}
					if(!judge){continue;}
					temp += "<tr><td id=\"" + res[i].id + "\" onclick=\"deleteSol()\">" + res[i].id + "</td><td onclick=\"readDetail('"+res[i].name+"','"+res[i].use+"','"+res[i].main+"','"+res[i].rune+"','"+res[i].effect+"','"+res[i].enc1+"','"+res[i].enc2+"')\">" + res[i].name + "</td><td>" + res[i].part + "</td><td>" + res[i].type + "</td><td>" + res[i].use + "</td><td>" + res[i].main + "</td><td>" + res[i].source + "</td></tr>";
					count++;
				}
				document.getElementById("mytable").innerHTML = temp;
				document.getElementById("output1").innerText = count + " 符合結果";
				document.getElementById("output2").innerText = "點擊裝備編號移除暫存";
				document.getElementById("output3").innerText = "點擊裝備名稱查看詳細資料";
			},
		error: err =>{
				console.log(err)
			},
	});
}
function readDetail(name, use, main, rune, effect, enc1, enc2){
	alert(name + "\r\n主屬性：" + main + "\r\n使用方法："+ use + "\r\n\r\n符文標籤：" + rune + "\r\n\r\n裝備效果：" + effect + "\r\n\r\n附魔1效果：" + enc1 + "\r\n附魔2效果：" + enc2);
}
function clr(){
	document.getElementById("inputname").value = "";
	document.getElementById("mypart").selectedIndex = 0;
	document.getElementById("mytype").selectedIndex = 0;
	document.getElementById("myuse").selectedIndex = 0;
	document.getElementById("mymain").selectedIndex = 0;
	document.getElementById("rune").value = "";
	document.getElementById("effect").value = "";
	document.getElementById("mysource").selectedIndex = 0;
	document.getElementById("mytable").innerHTML = "";
	document.getElementById("output1").innerText = "";
	document.getElementById("output2").innerText = "";
	document.getElementById("output3").innerText = "";
}