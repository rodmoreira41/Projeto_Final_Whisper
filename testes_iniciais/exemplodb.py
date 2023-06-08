import mysql.connector

# Replace the placeholders with your own MySQL database credentials
db = mysql.connector.connect(
  host="localhost",
  user="root",
  password="12345678",
  database="movies"
)

mycursor = db.cursor()
mycursor.execute("SELECT * FROM actor")
result = mycursor.fetchall()
for row in result:
  print(row)