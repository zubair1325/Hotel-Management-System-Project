# How to can I this web application on  my local meachine?

steps
1. You can use git clone https://github.com/zubair1325/Hotel-Management-System-Project.git
2. Make sure you are on the root directory then use cmd npm i to install all the dependences
3. Your system must have mySQL installed to perform CRUD operations, and you need to change
      const connection = mysql.createConnection({
          host: process.env.DB_HOST,
          port: 4000, // <--- MUST ADD THIS
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          ssl: {
            minVersion: 'TLSv1.2',
            ca: process.env.CA
          }
        });

   ************ if you are not using TiDB to store data then remove this **************
   4. finally you can run the project using node 'index.js'
  

# What did I use on this Project?
1. HTML, CSS, JS, GSAP
2. Node, Express
3. mySQL
