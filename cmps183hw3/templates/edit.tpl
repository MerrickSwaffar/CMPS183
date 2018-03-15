<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="../css/style.css" rel="stylesheet" type="text/css">
</head>
<body>

<header>
	<h1>
		CMPS183: Homework 3
	</h1>
</header>

<ul>
  <li><a href="../index">Home</a></li>
  <li><a href="../list">To Do List</a></li>
  <li><a href="../new">To Do Form</a></li>
</ul>

<div class="sidebar">
	<h3>Challenges:</h3>
	<p>My main challenges with this assignment were learning how to use the bottle framework and learning how to use the sql database. I Feel like this assignment required the use of a lot of technologies that I hadn't used before, which made it pretty difficult considering the short amount of time we were given.</p>
	<h3>Resources:</h3>
	<a href="https://www.w3schools.com">www.w3schools.com</a><br><br>
    <a href="https://developer.mozilla.org">developer.mozilla.org</a><br><br>
    <a href="https://bottlepy.org/docs/dev/">bottlepy.org/docs/dev/</a>
</div>

<div class="main">
	<h1 style="text-align: center;">Edit Task</h1>
	<form action="/edit/{{no}}" method="GET">
	    Task Title:<br>
	    <input type="text" name="title" value="{{title[0]}}"><br>
	    Notes:<br>
	    <input type="text" name="description" value="{{description[0]}}"><br>
	    Due Date: (Previously :{{due[0]}})<br>
	    <input type="date" name="due" value="{{due[0]}}">
	    <br>
	    Status: (Previously
	    %print(status[0])
	    %if status[0] == 1:
	        "Completed"
	    %else:
	        "Not Completed"
	    %end
	    )
	    <br>
	    <select name="status">
	        <option value="" disabled selected hidden>
	        %if status[0] == 1:
	            Completed
	        %else:
	            Not Completed
	        %end
	        </option>
	        <option>Completed</option>
	        <option>Not Completed</option>
	    </select><br><br>
	    <input type="submit" value="Confirm" name="submit">
	</form>
</div>

%include('templates/foot.tpl')