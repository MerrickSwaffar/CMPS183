%include('templates/head.tpl')

<div class="main">
	<h1 style="text-align: center;">New Task</h1>
	<form action="/new" method="GET">
	    Task Title:<br>
	    <input type="text" name="title" placeholder="title"><br>
	    Notes:<br>
	    <input type="text" name="description" placeholder="notes"><br>
	    Due Date:<br>
	    <input type="date" name="due" placeholder="Due Date">
	    <br><br>
	    <input type="submit" value="Add Item" name="submit">
	</form>
</div>

%include('templates/foot.tpl')
