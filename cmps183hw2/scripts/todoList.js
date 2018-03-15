//set todolist item in sessionStorage
if (sessionStorage.getItem("todoList") === null){
	var todoList = [];
	//set a few initial items
	var item1 = {}
	item1.title = "CMPS183 Homework";
	item1.notes = "Complete the third assignment for CMPS183"; 
	item1.dueDate =  "2018-02-25";
	item1.isCompleted = false; 
	item1.datePosted = getDate() + getTime(); 
	item1.lastUpdated = getDate() + getTime();
	item1.editMode = false;
	todoList.push(item1);

	var item2 = {}
	item2.title = "Take Out Trash";
	item2.notes = "Remember recycling"; 
	item2.dueDate =  "2018-02-23";
	item2.isCompleted = false; 
	item2.datePosted = getDate() + getTime(); 
	item2.lastUpdated = getDate() + getTime();
	item2.editMode = false;
	todoList.push(item2);

	var item3 = {}
	item3.title = "Grocery Shopping";
	item3.notes = "Bread, milk, eggs, spinach"; 
	item3.dueDate =  "2018-02-24";
	item3.isCompleted = false; 
	item3.datePosted = getDate() + getTime(); 
	item3.lastUpdated = getDate() + getTime();
	item3.editMode = false;
	todoList.push(item3);

	var item4 = {}
	item4.title = "CMPS183 Homework Grading";
	item4.notes = "Complete the peer reviews on crowdgrader for homework 2"; 
	item4.dueDate =  "2018-02-22";
	item4.isCompleted = false; 
	item4.datePosted = getDate() + getTime(); 
	item4.lastUpdated = getDate() + getTime();
	item4.editMode = false;
	todoList.push(item4);

	sessionStorage.setItem("todoList", JSON.stringify(todoList));
}
var todoList = JSON.parse(sessionStorage.getItem("todoList"));


function addItem(title, notes, dueDate){
	var todoList = JSON.parse(sessionStorage.getItem("todoList"));
	var item = {};
	item.title = title;
	item.notes = notes; 
	item.dueDate =  dueDate;
	item.isCompleted = false; 
	item.datePosted = getDate() + getTime(); 
	item.lastUpdated = getDate() + getTime();
	item.editMode = false;
	todoList.push(item);
	sessionStorage.setItem("todoList", JSON.stringify(todoList));
}

function deleteItem(itemNum){
	var todoList = JSON.parse(sessionStorage.getItem("todoList"));
	var i = 0;
	while(todoList[i] != null){
    	if(i == itemNum){
       		todoList.splice(i,1);
       		sessionStorage.setItem("todoList", JSON.stringify(todoList));
       		updateList()
       		break;
   		}
   		i++;
	}
}

function editItem(itemNum){
	updateList()
	var todoList = JSON.parse(sessionStorage.getItem("todoList"));
	var i = 0;
	while(todoList[i] != null){
		if(i == itemNum){
			todoList[i].editMode = true;
		}
		i++;	 
	}
	sessionStorage.setItem("todoList", JSON.stringify(todoList));
	updateList();
}

function finishEdit(itemNum){
	var todoList = JSON.parse(sessionStorage.getItem("todoList"));
	var i = 0;
	while(todoList[i] != null){
		if(i == itemNum){
			form = document.getElementById("item"+i);
        	name = form.elements[0].value;
        	notes = form.elements[1].value;
        	date = form.elements[2].value;
        	if (date < getDate()){
            	alert("Invalid Due Date"); 
            	return;
        	}
        	todoList[i].editMode = false;
        	todoList[i].title = name;
        	todoList[i].notes = notes;
        	todoList[i].dueDate = date;
        	todoList[i].lastUpdated = getDate() + getTime();
        	break;
		}
		i++;	 
	}
	sessionStorage.setItem("todoList", JSON.stringify(todoList));
	sortList();
}

function displayList(){
	var todoList = JSON.parse(sessionStorage.getItem("todoList"));	
	var content = document.getElementById('content');
	var i = 0;
	while(todoList[i] != null){
		if(todoList[i].editMode){
			content.insertAdjacentHTML('beforeend',
				"<form style='background-color: #DAF2FF;' id='item" + i + "'>" +
			      "<h4 style='background-color: #34495E; color: white;'> Task Title: <input type='text' value='"+ todoList[i].title +"' name='taskName'></h4>" +
			      "Notes: <input type='text' value='"+ todoList[i].notes +"' name='notes' size='170'><br><br>" +
			      "Due Date: <input type='date' value='"+ todoList[i].dueDate +"' name='date'> --- Date Posted: " + todoList[i].datePosted +
						" --- Last Updated: " + todoList[i].lastUpdated + "<br><br>" +
			      "Completed?<input type='checkbox' id='check" + i + "' " + (todoList[i].isCompleted? "checked ": "") + "onchange='filterList()'></input><br><br>" +
			      "<input type='button' onclick='finishEdit("+ i +")' value='Submit Edit'>" +
			      "<input type='button' id='button" + i +"' value='Delete' " +
						"onclick='deleteItem("+i+")'>"+ "</input>" +
			    "</form>");
		}else{
			content.insertAdjacentHTML('beforeend', 
				"<div style='background-color: #DAF2FF;' id='item" + i + "'>" +
					"<h4 style='background-color: #34495E; color: white;'> Task Title: "+ todoList[i].title + "</h4>" +
					"<p>Notes: " + todoList[i].notes + "</p>" +
					"<p>Due Date: " + todoList[i].dueDate + " --- Date Posted: " + todoList[i].datePosted +
						" --- Last Updated: " + todoList[i].lastUpdated + "</p>" +
					"<p>Completed?<input type='checkbox' id='check" + i + "' " + (todoList[i].isCompleted? "checked ": "") + "onchange='filterList()'></input></p>" +
					"<input type='button' id='ebutton" + i +"' value='Edit' " +
						"onclick='editItem("+i+")'>"+ "</input>" +
					"<input type='button' id='button" + i +"' value='Delete' " +
						"onclick='deleteItem("+i+")'>"+ "</input>" +
				"</div>");
		}
		i++;
	}
}

function updateList(){
	var i = 0;
	while(todoList[i] != null){
		item = document.getElementById("item"+i);
       	if (!(item === null)) 
       		item.parentNode.removeChild(item);
		i++;
	}
	displayList();
	filterList();
}

function filterList(){
	var todoList = JSON.parse(sessionStorage.getItem("todoList"));
	var option = document.getElementById("option").value;
	var i = 0;
	while(todoList[i] != null){
		item = document.getElementById("item" + i);
		isChecked = document.getElementById("check" + i).checked;
		if (isChecked) todoList[i].isCompleted = true;
		else todoList[i].isCompleted = false;
		if(option == "all"){
			item.style.display = 'block';
		}else if(option == "completed"){
			if(isChecked)
            	item.style.display = 'block';
        	else 
            	item.style.display = 'none';
		}else if(option == "todo"){
			if(isChecked)
            	item.style.display = 'none';
        	else 
            	item.style.display = 'block';
		}
		i++;
		sessionStorage.setItem("todoList", JSON.stringify(todoList));
	}
}

function sortList(){
	var todoList = JSON.parse(sessionStorage.getItem("todoList"));
	var sort = document.getElementById("sort").value;
	var order = document.getElementById("order").value;
	if(sort == "posted"){
		todoList.sort(
			function(a,b){
				if(order == "ascending")
					return new Date(a.datePosted) - new Date(b.datePosted);
				if(order == "descending")
					return new Date(b.datePosted) - new Date(a.datePosted);
			}
		);	
	}else if(sort == "updated"){
		todoList.sort(
			function(a,b){
				if(order == "ascending")
					return new Date(a.lastUpdated) - new Date(b.lastUpdated);
				if(order == "descending")
					return new Date(b.lastUpdated) - new Date(a.lastUpdated);
			}
		);	
	}else if(sort == "due"){
		todoList.sort(
			function(a,b){
				if(order == "ascending")
					return new Date(a.dueDate) - new Date(b.dueDate);
				if(order == "descending")
					return new Date(b.dueDate) - new Date(a.dueDate);
			}
		);		
	}
	sessionStorage.setItem("todoList", JSON.stringify(todoList));
	updateList();
}

function getDate(){
	var date = new Date();
	var dd = date.getDate();
	var mm = date.getMonth() + 1; //January is 0!
	var yyyy = date.getFullYear();

	if(dd < 10){
	    dd = '0' + dd;
	} 
	if(mm<10){
	    mm = '0' + mm;
	} 

	return yyyy + '-' + mm + '-' + dd;
}

function getTime(){
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();

	if(h<10){
	    h = '0' + h;
	} 
	if(m<10){
	    m = '0' + m;
	} 
	if(s<10){
	    s = '0' + s;
	} 
	return ", " + h + ":" + m + ":" + s;
}




