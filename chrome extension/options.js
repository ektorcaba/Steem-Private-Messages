
function save_options(){
	localStorage.setItem("username", document.getElementById("username").value);
}	


document.getElementById('save').addEventListener('click',save_options);
