%include('templates/head.tpl')

<div id="content" class="main">
    <h1 style="text-align: center;">To Do List</h1>
    <form name="filter">
    Show:
    <select name="show_status">
        <option 
        %if selected == 'All':
            selected="true" 
        %end
        >All</option>
        <option 
        %if selected == 'Completed':
            selected="true" 
        %end
        >Completed</option>
        <option 
        %if selected == 'Not Completed':
            selected="true" 
        %end
        >Not completed</option>
    </select>
    Sort By:
    <select name="sort">
        <option 
        %if sort == "posted":
            selected="true" 
        %end
        >Posted Date</option>
        <option 
        %if sort == "updated":
            selected="true"
        %end
        >Last Updated</option>
        <option
        %if sort =="due":
            selected="true"
        %end
        >Due Date</option>
    </select>
    Order:
    <select name="order">
        <option 
        %if order == "ASC":
            selected="true" 
        %end
        >Ascending</option>
        <option 
        %if order == "DESC":
            selected="true" 
        %end
        >Descending</option>
    </select>

    <input type="submit" value="Enter" name="filter"><br><br>
    </form>
    <table>
    <th style="background-color:#34495E;color:white;">Task Title</th>
    <th style="background-color:#34495E;color:white;">Notes</th>
    <th style="background-color:#34495E;color:white;">Posted Date</th>
    <th style="background-color:#34495E;color:white;">Due Date</th>
    <th style="background-color:#34495E;color:white;">Last Updated</th>
    <th style="background-color:#34495E;color:white;">Status</th>
    <th style="background-color:#34495E;color:white;"></th>
    <th style="background-color:#34495E;color:white;"></th>
    %for row in rows:
        %id, title, description, posted, due, updated, status = row
        <tr>
        %posted = posted[:-7]
        %updated = updated[:-7]
        <td style="background-color:#34495E;color:white;">{{title}}</td>
        <td style="background-color:#DAF2FF">{{description}}</td>
        <td style="background-color:#34495E;color:white;">{{posted}}</td>
        <td style="background-color:#DAF2FF">{{due}}</td>
        <td style="background-color:#34495E;color:white;">{{updated}}</td>
        <td style="background-color:#DAF2FF">
        %if status == 1:
            Completed
        %else:
            Not Completed
        %end
        </td>
        
        <td style="background-color:#34495E"><a style="color:white;text-decoration:none" href="/edit/{{id}}">Edit</a></td>
        <td style="background-color:#34495E"><a style="color:white;text-decoration:none"href="/delete/{{id}}">Delete</a></td>
        </tr>
    %end
    </table>
    <input type="button" value="Add A New Task" name="new" onclick="window.location.href='./new'">
</div>

%include('templates/foot.tpl')