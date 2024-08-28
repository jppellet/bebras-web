function toggle_class(id){
   //console.log(id);
   if(document.getElementById(id).className == "state0"){
      document.getElementById(id).className = "state1";
	  arr[id] = 1;
	  return;
   }//if
   arr[id] = 0;
   document.getElementById(id).className = "state0";
}//toggle_class
function reset(){
	//console.log("reset");
   for(i = 0; i < 10; i++){
	  //console.log(i.toString() + " " + document.getElementById(i).className);
      document.getElementById(i).className = "state0"
	  arr[i] = 0;
   }//for
   return false;
}//reset
function load(arr_arg){
   for(i = 0; i < 10; i++){
	  if (arr_arg[i] == 0) {
		  document.getElementById(i).className = "state0";
		  arr[i] = 0;
	  }//if
	  else {
		  document.getElementById(i).className = "state1"
		  arr[i] = 1;
	  }//else
   }//for
}//load
//---
task = null;
$(function () {
	$('#task-container').append("<div id=\"task-area\"></div>");
	createTask();
	task.load();
});
function createTask() {
    var params = {
		width: "550",
		height: "110",
    };
    params.loaded = function() {
		var containers = [];
		$.each(containers, function() {
			var cont = this[0];
			$.each(this[1], function () {
				cont.add(task.get(this))
			})
		});
		str = "";
		str += "<table class=\"cust_cursor\" border=0 id=\"HTMLSucks\">";
		str += "   <tr>";
		str += "   <!-- 12112233321 -->";
		str += "      <td>1</td>";
		str += "	  <td id=\"0\" class=\"state0\" onclick=\"toggle_class(0)\"></td>";
		str += "	  <td>2</td>";
		str += "	  <td id=\"1\" class=\"state0\" onclick=\"toggle_class(1)\"></td>";
		str += "	  <td>1</td>";
		str += "	  <td id=\"2\" class=\"state0\" onclick=\"toggle_class(2)\"></td>";
		str += "	  <td>1</td>";
		str += "	  <td id=\"3\" class=\"state0\" onclick=\"toggle_class(3)\"></td>";
		str += "	  <td>2</td>";
		str += "	  <td id=\"4\" class=\"state0\" onclick=\"toggle_class(4)\"></td>";
		str += "	  <td>2</td>";
		str += "	  <td id=\"5\" class=\"state0\" onclick=\"toggle_class(5)\"></td>";
		str += "	  <td>3</td>";
		str += "	  <td id=\"6\" class=\"state0\" onclick=\"toggle_class(6)\"></td>";
		str += "	  <td>3</td>";
		str += "	  <td id=\"7\" class=\"state0\" onclick=\"toggle_class(7)\"></td>";
		str += "	  <td>3</td>";
		str += "	  <td id=\"8\" class=\"state0\" onclick=\"toggle_class(8)\"></td>";
		str += "	  <td>2</td>";
		str += "	  <td id=\"9\" class=\"state0\" onclick=\"toggle_class(9)\"></td>";
		str += "	  <td>1</td>";
		str += "   </tr>";
		str += "</table>";
		str += "<br /><a href=\"#\" onclick=\"return reset();\" style=\"background-color: #fabe4e; padding: 5px; color: #fff; border: 0px; border-radius: 0px; font-weight: 600;\">"+ i18n_strings.reset +"</a><br />";
        //Write the code for the task itself here.
        //new task.HTML({content: "<table><tr><td onclick=\"alert('xyz');\">abc</td></tr></table>"});
        new task.HTML({content: str});
        document.getElementById("HTMLSucks").parentElement.style.height = "120px";
        // There is a function called task.getAnswer() which you can redefine to return a more personalised answer. For example an answer using strings instead of numbers.        
        // answerEl gets the escaped value of the given answer
		arr = [0,0,0,0,0,0,0,0,0,0];
		task.getAnswer = function(){ return JSON.stringify(arr); };
        var answerEl = document.getElementById('answer');
        //Use the answerEl variable shown below to test answers locally. If you want to test the answerEl just remove 
        // and put in the correct values.
		//answerEl = {value:"[1,0,1,0,1,0,1,0,1,0]"};
		//answerEl = {value:"[0,1,0,1,0,1,0,1,0,1]"};
		//answerEl = {value:"[1,1,1,1,1,1,1,1,1,1]"};
     	//correct result:
		//1 21 1 22 33 321, {value:"[1,0,1,1,0,1,0,1,0,0]"};
        if (answerEl) {
            var iniAnswer = answerEl.value;
            if (iniAnswer != "") {
                iniAnswer = eval(unescape(iniAnswer));
                //code to recreate the given answer
				load(iniAnswer);		
            }
        }
    };
	task = new Task('#task-area', params);
}