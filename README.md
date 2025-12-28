# Hotel Management System Web Application

This project is a simple **Hotel Management System** developed as part of a **Database Management Course**.  
The application allows basic CRUD operations using a MySQL database.  
The UI design was inspired by [Hotel Odisej](https://hotelodisej.com/).

---

## How to Run This Web Application on Your Local Machine

### Prerequisites
- Node.js (v16 or later recommended)
- MySQL installed and running
- Git

---

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/zubair1325/Hotel-Management-System-Project.git
Navigate to the project root directory


cd Hotel-Management-System-Project
Install dependencies


npm install
Configure Database

Make sure MySQL is running on your system.
Update the database connection settings in your project:


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 4000, // required only if you are using TiDB
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
🔴 If you are NOT using TiDB, remove the port and ssl configuration.

You may also create a .env file:

env
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hotel_db
Run the project


node index.js
Open your browser and visit:


http://localhost:4000
Technologies Used
Frontend: HTML, CSS, JavaScript, GSAP

Backend: Node.js, Express.js

Database: MySQL (****stoerd into TiDB cloud*****)

Limitations of the Project
Not fully responsive for all screen sizes

Frontend–database integration can be improved

No authentication, authorization, or input validation implemented
(This makes the application vulnerable and unsuitable for production use)

Live Demo
🔗 https://hotelodisej-ohrd.onrender.com/





## 3.Feature of the Web Application 
The website has both Customer and Employees Side where, employees are divided into three catagories 1. HR 2. Reception 3. Other(room services, cleaner, driver and etc...) by login using email and password the employee will be redirected to their won portal, where access are given to them acccording to their job post. Employees can see their personal info, update them, change password, apply for leave and there is more... accooding to their duty.

I am providing you some sample account 
HR=>
email: robert.johnson@hotel.com
pass: 12345

Receptionist=>
email: jane.smith@hotel.com
pass: 12345

Other=>
email: michael.davis@hotel.com
pass: 12345



while on the customer side, customer can look into the available rooms and theif information.  Add booking , cancel booking, and there is more ...


