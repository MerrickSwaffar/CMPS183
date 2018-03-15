import sqlite3

con = sqlite3.connect('todo.db')
con.execute("CREATE TABLE todo (id INTEGER PRIMARY KEY, title TEXT, description TEXT, posted DATE, due DATE, updated DATE, status BOOL)")
con.execute("INSERT INTO todo (title, description, posted, due, updated, status) VALUES ('First item', 'This is the first item in my database', '1970-01-01 00:00:00.000', '1970-01-01 00:00:00.000', '1970-01-01 00:00:00.000', 1)")
con.commit()