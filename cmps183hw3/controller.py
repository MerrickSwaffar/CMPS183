import sqlite3
from bottle import route, run, static_file, template, get, post, request, redirect
import datetime

HOST = 'localhost'

@route('/css/<filename>')
def static(filename):
    if filename:
        return static_file(filename, root='./css')
    else:
        return '<script>alert("File " + filename " not found")</script>'

@route('/images/<filename>')
def static(filename):
    if filename:
        return static_file(filename, root='./images')
    else:
        return '<script>alert("File " + filename " not found")</script>'

@route('/scripts/<filename>')
def static(filename):
    if filename:
        return static_file(filename, root='./scripts')
    else:
        return '<script>alert("File " + filename " not found")</script>'

@route('/')
@route('/home')
@route('/index')
def serve_index():
    return template('templates/index.tpl')

@route("/list", method="GET")
def list_page():
    result = None
    selected = None
    sort = None
    order = None
    if request.GET.get("filter", "").strip():
        show_status = request.GET.get("show_status", "").strip()
        sort = request.GET.get("sort", "").strip()
        order = request.GET.get("order", "").strip()
        if order == "Ascending":
        	order = 'ASC'
        else:
        	order = 'DESC'
        selected = show_status
        if sort == "Due Date":
            sort = 'due'
        elif sort == "Posted Date":
            sort = 'posted'
        else:
            sort = 'updated'
        if show_status == 'All':
            conn = sqlite3.connect("todo.db")
            c = conn.cursor()
            c.execute("SELECT * FROM todo ORDER BY "+sort+" " +order)
            result = c.fetchall()
            c.close()
        elif show_status == 'Completed':
            conn = sqlite3.connect("todo.db")
            c = conn.cursor()
            c.execute("SELECT * FROM todo WHERE status LIKE ? ORDER BY "+sort+" "+order, (str(1)))
            result = c.fetchall()
            c.close()
        else:
            conn = sqlite3.connect("todo.db")
            c = conn.cursor()
            c.execute("SELECT * FROM todo WHERE status LIKE ? ORDER BY "+sort+" " +order, (str(0)))
            result = c.fetchall()
            c.close()
    else:
        conn = sqlite3.connect("todo.db")
        c = conn.cursor()
        c.execute("SELECT * FROM todo")
        result = c.fetchall()
        c.close()

    output = template("templates/list.tpl", rows=result, selected=selected, sort=sort, order=order)
    return output

@route("/new", method="GET")
def new_page():
    if request.GET.get("submit", "").strip():
        title = request.GET.get("title", "").strip()
        description = request.GET.get("description", "").strip()
        due = request.GET.get("due", "").strip()
        posted = datetime.datetime.now()
        updated = datetime.datetime.now()

        print(title)

        conn = sqlite3.connect("todo.db")
        c = conn.cursor()
        c.execute("INSERT INTO todo (title, description, posted, due, updated, status) VALUES (?,?,?,?,?,?)", (title, description, posted, due, updated, 0))
        new_id = c.lastrowid

        conn.commit()
        c.close()

        redirect("/list")
    else:
        return template("templates/new.tpl")

@route('/edit/:no', method='GET')
def edit_page(no):
    if request.GET.get("submit", "").strip():
        title = request.GET.get("title", "").strip()
        description = request.GET.get("description", "").strip()
        due = request.GET.get("due", "").strip()
        status = request.GET.get("status", "").strip()
        updated = datetime.datetime.now()

        if status == 'Completed':
            status = 1
        else:
            status = 0

        conn = sqlite3.connect("todo.db")
        c = conn.cursor()
        c.execute("UPDATE todo SET title = ?, description = ?, due = ?, updated = ?, status = ? WHERE id LIKE ?", (title, description, due, updated, status, no))
        conn.commit()

        redirect("/list")
    else:
        conn = sqlite3.connect("todo.db")
        c = conn.cursor()
        c.execute("SELECT title FROM todo WHERE id LIKE ?", (str(no)))
        title = c.fetchone()
        c.execute("SELECT description FROM todo WHERE id LIKE ?", (str(no)))
        description = c.fetchone()
        c.execute("SELECT due FROM todo WHERE id LIKE ?", (str(no)))
        due = c.fetchone()
        c.execute("SELECT status FROM todo WHERE id LIKE ?", (str(no)))
        status = c.fetchone()

        return template("templates/edit.tpl", title=title, description=description, due=due, status=status, no=no)

@route('/delete/:id', method='GET')
def delete_page(id):
    conn = sqlite3.connect("todo.db")
    c = conn.cursor()
    c.execute("DELETE FROM todo WHERE id LIKE ?", (str(id)))

    conn.commit()
    c.close()

    redirect("/list")


run(host=HOST, port=8080, reloader=True, debug=True)