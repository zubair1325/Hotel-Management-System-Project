require("dotenv").config()

const { faker, tr } = require("@faker-js/faker");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mysql = require("mysql2");
const { error } = require("console");
const fs = require("fs")

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

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

// connection.query('SELECT DATABASE(), CURRENT_USER(), VERSION();', (err, rows) => {
//   console.log("--- Debug Info ---");
//   console.log("Connected to DB:", rows[0]['DATABASE()']);
//   console.log("Authenticated as:", rows[0]['CURRENT_USER()']);
//   console.log("------------------");
// });

let p = "/";
app.use((req,res,next)=>{
  if(req.path != "/menu"){
    p = req.path
  }
  next()
})

function allStaticRoute() {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "landing.html"));
  });
  app.get("/menu", (req, res) => {
    res.render("nav.ejs",{p});
  });
  app.get("/rooms", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "bookRoom.html"));
  });
  app.get("/dinin", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "diningOption.html"));
  });
  app.get("/wellness", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "wellness.html"));
  });
  app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "contactUs.html"));
  });
  app.get("/discoverMljet", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "discoverMljet.html"));
  });
  // app.get("/login", (req, res) => {
  //   res.sendFile(path.join(__dirname, "views", "login.html"));
  // });

  // app.post("/admin", (req, res) => {
  //   console.log("Request body:", req.body); // Debugging
  //   const { username, password } = req.body;

  //   console.log("Username:", username);
  //   console.log("Password:", password);

  //   try {
  //     const query = `
  //           SELECT pass
  //           FROM employee_login
  //           WHERE employee_id = (
  //               SELECT employee_id
  //               FROM employees
  //               WHERE email = ?
  //           )
  //       `;

  //     connection.query(query, [username], (error, results) => {
  //       const hashedPassword = results[0].pass;
  //       if (hashedPassword === password) {
  //         console.log("password  match");
  //         res.send("welcome");
  //       }

  //       if (hashedPassword !== password) {
  //         res.sendFile(path.join(__dirname, "views", "notMatch.html"));
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
}
allStaticRoute();

function dynamicRoute() {
  app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
  });
  app.post("/admin", (req, res) => {
    const { username, password } = req.body;

    try {
      const query = `SELECT e.employee_id, e.department, el.pass FROM employees e JOIN employee_login el ON e.employee_id = el.employee_id WHERE e.email = ?`;

      connection.query(query, [username], (error, results) => {
        if (error || results.length === 0) {
          console.error("Error fetching user data or user not found", error);
          return res.sendFile(path.join(__dirname, "views", "notMatch.html"));
        }

        const { employee_id, department, pass: hashedPassword } = results[0];

        if (hashedPassword === password) {
          console.log("Password matched!");
          console.log(department);

          // Redirect to specific portal based on the department
          if (department === "hr") {
            return res.redirect(`/hr?employee_id=${employee_id}`);
          } else if (department === "receptionist") {
            return res.redirect(`/receptionist?employee_id=${employee_id}`);
          } else {
            console.log("hua");
            return res.redirect(`/other?employee_id=${employee_id}`);
          }
        } else {
          console.log("Incorrect password");
          return res.sendFile(path.join(__dirname, "views", "notMatch.html"));
        }
      });
    } catch (error) {
      console.error("Error in admin login:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get("/allemployees", (req, res) => {
    const query = "SELECT * FROM employees where status = 'active'";

    connection.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching employees");
      } else {
        res.render("allEmployee", { employees: results });
      }
    });
  });
  app.get("/other", (req, res) => {
    const { employee_id } = req.query;
    console.log(employee_id);
    res.render("other.ejs", { employee_id });
  });
  app.get("/receptionist", (req, res) => {
    const { employee_id } = req.query;
    console.log(employee_id);
    res.render("reception.ejs", { employee_id });
  });

  app.get("/personal-info", (req, res) => {
    const { employee_id } = req.query;

    if (!employee_id) {
      return res.status(400).send("Employee ID is required");
    }

    // SQL Query to fetch employee details
    const query = `SELECT * FROM employees WHERE employee_id = ?`;
    connection.query(query, [employee_id], (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length === 0) {
        return res.status(404).send("Employee not found");
      }

      const employee = results[0]; // Assuming one result since employee_id is unique
      res.render("myInfo", { employee });
    });
  });



  app.get("/hr", (req, res) => {
    const { employee_id } = req.query;
    console.log(employee_id);
    res.sendFile(path.join(__dirname, "views", "hr.html"));
  });
  app.get("/addEmployee", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "addNewEmployee.html"));
  });

  app.post("/employees", (req, res) => {
    const sql = `
        INSERT INTO employees 
        (name, job_title, department, hire_date, salary, phone_number, email, address, status, date_of_birth, gender, emergency_contact) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      req.body.name,
      req.body.job_title,
      req.body.department || null,
      req.body.hire_date || null,
      req.body.salary,
      req.body.phone_number || null,
      req.body.email,
      req.body.address || null,
      req.body.status || "active",
      req.body.date_of_birth || null,
      req.body.gender || "male",
      req.body.emergency_contact || null,
    ];
    try {
      connection.query(sql, values, (err) => {
        if (err) throw error;
        res.redirect("/allemployees");
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/deleteEmployee", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "deleteEmployee.html"));
  });

  app.patch("/delete", (req, res) => {
    console.log(req.body);
    let { employee_id: id } = req.body;
    try {
      connection.query(
        "update employees set status = 'inactive' where employee_id = ?",
        [id],
        (error, result) => {
          if (error) throw error;
          res.redirect("/allemployees");
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/updateEmployee", (req, res) => {
    console.log("UpdateEmployee");
    res.sendFile(path.join(__dirname, "views", "updateEmployee.html"));
  });

  app.get("/updateEmployeeInfo", (req, res) => {
    let { employee_id } = req.query;
    // console.log(employee_id);
    try {
      connection.query(
        "select * from employees where employee_id = ?",
        [employee_id],
        (error, result) => {
          if (error) throw error;
          const employee = result[0];

          res.render("updateEmployeeInfo.ejs", {
            result: employee,
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
  app.patch("/update/:employee_id", (req, res) => {
    let { employee_id } = req.params;
    console.log(employee_id);
    let {
      name,
      job_title,
      department,
      hire_date,
      salary,
      phone_number,
      email,
      address,
      status,
      date_of_birth,
      gender,
      emergency_contact,
    } = req.body; // Extract updated data from the request body

    // Prepare the SQL query to update the employee details
    let q = `
        UPDATE employees 
        SET 
            name = ?, 
            job_title = ?, 
            department = ?, 
            hire_date = ?, 
            salary = ?, 
            phone_number = ?, 
            email = ?, 
            address = ?, 
            status = ?, 
            date_of_birth = ?, 
            gender = ?, 
            emergency_contact = ?
        WHERE employee_id = ?`;
    try {
      connection.query(
        q,
        [
          name,
          job_title,
          department,
          hire_date,
          salary,
          phone_number,
          email,
          address,
          status,
          date_of_birth,
          gender,
          emergency_contact,
          employee_id,
        ],
        (error, result) => {
          if (error) throw error;
          res.redirect("/allemployees");
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/leaverequests", (req, res) => {
    const query = "SELECT * FROM leave_requests";
    connection.execute(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error fetching leave requests");
      }
      res.render("leaveReq.ejs", { leaveRequests: results });
    });
  });

  // Route: Submit a New Leave Request
  app.post("/leaverequests", (req, res) => {
    const { employee_id, leave_type, start_date, end_date, reason } = req.body;

    const query = `
      INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, reason)
      VALUES (?, ?, ?, ?, ?)
    `;
    connection.execute(
      query,
      [employee_id, leave_type, start_date, end_date, reason],
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error submitting leave request");
        }
        res.redirect("/leaverequests");
      }
    );
  });

  // Admin Route: Display All Leave Requests
  app.get("/admin/leave-requests", (req, res) => {
    const query = "SELECT * FROM leave_requests";
    connection.execute(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error fetching leave requests");
      }
      res.render("leaveReqStatus.ejs", { leaveRequests: results });
    });
  });

  // Admin Route: Approve or Reject Leave Request
  app.patch("/leave-requests/:id", (req, res) => {
    const requestId = req.params.id;
    const { status } = req.body;

    const query = "UPDATE leave_requests SET status = ? WHERE request_id = ?";
    connection.execute(query, [status, requestId], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating leave request status");
      }
      res.redirect("/admin/leave-requests");
    });
  });

  app.get("/rooms-update", (req, res) => {
    const query = "SELECT * FROM Rooms";
    connection.query(query, (err, rooms) => {
      if (err) throw err;
      res.render("roomStatus.ejs", { rooms });
    });
  });

  // Route to add a new room
  app.post("/rooms-update", (req, res) => {
    const { room_type, price_per_night } = req.body;
    const query =
      "INSERT INTO Rooms (room_type, price_per_night) VALUES (?, ?)";
    connection.query(query, [room_type, price_per_night], (err) => {
      if (err) throw err;
      res.redirect("/rooms-update");
    });
  });

  // Route to update room details
  app.put("/rooms-update/:id", (req, res) => {
    const { id } = req.params;
    const { room_type, room_status, price_per_night, availability } = req.body;
    const query = `
        UPDATE Rooms 
        SET room_type = ?, room_status = ?, price_per_night = ?, availability = ? 
        WHERE room_id = ?
    `;
    connection.query(
      query,
      [room_type, room_status, price_per_night, availability, id],
      (err) => {
        if (err) throw err;
        res.redirect("/rooms-update");
      }
    );
  });

  // Route to delete a room
  app.delete("/rooms-update/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM Rooms WHERE room_id = ?";
    connection.query(query, [id], (err) => {
      if (err) throw err;
      res.redirect("/rooms-update");
    });
  });

  app.get("/change-password", (req, res) => {
    res.render("changePass.ejs", { error: null, success: null });
  });

  app.post("/change-password", (req, res) => {
    const { employee_id, old_password, new_password, confirm_password } =
      req.body;

    if (new_password !== confirm_password) {
      return res.render("changePass.ejs", {
        error: "Passwords do not match!",
        success: null,
      });
    }

    connection.query(
      "SELECT * FROM employee_login WHERE employee_id = ? AND pass = ?",
      [employee_id, old_password],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.render("changePass.ejs", {
            error: "An error occurred!",
            success: null,
          });
        }

        if (results.length === 0) {
          return res.render("changePass.ejs", {
            error: "Invalid employee ID or old password!",
            success: null,
          });
        }

        connection.query(
          "UPDATE employee_login SET pass = ?, password_created = CURRENT_TIMESTAMP WHERE employee_id = ?",
          [new_password, employee_id],
          (err) => {
            if (err) {
              console.error(err);
              return res.render("changePass.ejs", {
                error: "An error occurred while updating!",
                success: null,
              });
            }

            res.render("changePass.ejs", {
              error: null,
              success: "Password changed successfully!",
            });
          }
        );
      }
    );
  });

  app.get("/customer", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "customerChoiseC.html"));
  });

  app.post("/create-booking", (req, res) => {
    const { email, room_id, check_in, check_out, total_cost, status } =
      req.body;

    // Step 1: Get the customer_id using the email
    const getCustomerQuery = `
        SELECT customer_id FROM Customers WHERE email = ?
    `;

    connection.query(getCustomerQuery, [email], (err, results) => {
      if (err) {
        console.error("Error fetching customer_id:", err);
        return res
          .status(500)
          .send("An error occurred while processing the booking.");
      }

      if (results.length === 0) {
        return res
          .status(404)
          .send("Customer with the provided email does not exist.");
      }

      const customer_id = results[0].customer_id;

      // Step 2: Insert booking into the Bookings table
      const insertBookingQuery = `
            INSERT INTO Bookings (customer_id, room_id, check_in, check_out, total_cost, status)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

      connection.query(
        insertBookingQuery,
        [customer_id, room_id, check_in, check_out, total_cost, status],
        (err, result) => {
          if (err) {
            console.error("Error inserting booking:", err);
            return res
              .status(500)
              .send("An error occurred while creating the booking.");
          }

          // Step 3: Update room status to 'occupied'
          const updateRoomQuery = `
                UPDATE Rooms SET availability = 'occupied'
                WHERE room_id = ?
            `;

          connection.query(updateRoomQuery, [room_id], (err, result) => {
            if (err) {
              console.error("Error updating room status:", err);
              return res
                .status(500)
                .send("An error occurred while updating room status.");
            }

            res.sendFile(path.join(__dirname, "views", "customerChoiseC.html"));
          });
        }
      );
    });
  });

  app.post("/add-customer", (req, res) => {
    const { name, email, phone_number, address } = req.body;

    // SQL query to insert customer data into the Customers table
    const sql = `
        INSERT INTO Customers (name, email, phone_number, address)
        VALUES (?, ?, ?, ?)
    `;

    // Execute query with parameterized inputs
    connection.query(
      sql,
      [name, email, phone_number, address],
      (err, result) => {
        if (err) {
          console.error("Error inserting customer data:", err);
          return res
            .status(500)
            .send("An error occurred while adding the customer.");
        }
        res.redirect("/customer");
      }
    );
  });

  app.post("/cancel-booking", (req, res) => {
    const { email } = req.body;

    // Step 1: Retrieve the customer_id and active booking details using the email
    const getCustomerBookingQuery = `
      SELECT b.booking_id, b.room_id 
      FROM Bookings b
      JOIN Customers c ON b.customer_id = c.customer_id
      WHERE c.email = ? AND b.status = 'booked'
  `;

    connection.query(getCustomerBookingQuery, [email], (err, results) => {
      if (err) {
        console.error("Error fetching booking details:", err);
        return res
          .status(500)
          .send("An error occurred while processing the cancellation.");
      }

      if (results.length === 0) {
        return res
          .status(404)
          .send("No active booking found for the provided email.");
      }

      const booking_id = results[0].booking_id;
      const room_id = results[0].room_id;

      // Step 2: Update the booking status to 'cancelled'
      const cancelBookingQuery = `
          UPDATE Bookings 
          SET status = 'cancelled'
          WHERE booking_id = ?
      `;

      connection.query(cancelBookingQuery, [booking_id], (err, result) => {
        if (err) {
          console.error("Error updating booking status:", err);
          return res
            .status(500)
            .send("An error occurred while cancelling the booking.");
        }

        // Step 3: Update the room's status to 'clean'
        const updateRoomQuery = `
              UPDATE Rooms 
              SET availability = 'available', room_status = 'clean'
              WHERE room_id = ?
          `;

        connection.query(updateRoomQuery, [room_id], (err, result) => {
          if (err) {
            console.error("Error updating room status:", err);
            return res
              .status(500)
              .send("An error occurred while updating room status.");
          }

          res.redirect("/customer");
        });
      });
    });
  });

  // Route to handle feedback submission
  app.post("/submit-feedback", (req, res) => {
    const { email, rating, comments } = req.body;

    // Step 1: Retrieve customer_id using email
    const getCustomerQuery = `SELECT customer_id FROM Customers WHERE email = ?`;

    connection.query(getCustomerQuery, [email], (err, customerResult) => {
      if (err) {
        console.error("Error retrieving customer:", err);
        return res
          .status(500)
          .send("An error occurred while processing the feedback.");
      }

      if (customerResult.length === 0) {
        return res
          .status(404)
          .send("No customer found with the provided email.");
      }

      const customer_id = customerResult[0].customer_id;

      // Step 2: Get the max booking_id for this customer
      const getLatestBookingQuery = `
          SELECT MAX(booking_id) AS latest_booking_id 
          FROM Bookings 
          WHERE customer_id = ?  and status ='checked_out'
      `;

      connection.query(
        getLatestBookingQuery,
        [customer_id],
        (err, bookingResult) => {
          if (err) {
            console.error("Error retrieving booking:", err);
            return res
              .status(500)
              .send("An error occurred while retrieving booking information.");
          }

          if (!bookingResult[0].latest_booking_id) {
            return res.status(404).send("No booking found for this customer.");
          }

          const latest_booking_id = bookingResult[0].latest_booking_id;

          // Step 3: Insert feedback into the Feedback table
          const insertFeedbackQuery = `
              INSERT INTO Feedback (customer_id, booking_id, rating, comments)
              VALUES (?, ?, ?, ?)
          `;

          connection.query(
            insertFeedbackQuery,
            [customer_id, latest_booking_id, rating, comments],
            (err, feedbackResult) => {
              if (err) {
                console.error("Error inserting feedback:", err);
                return res
                  .status(500)
                  .send("An error occurred while submitting your feedback.");
              }

              res.redirect("/customer");
            }
          );
        }
      );
    });
  });

  app.get("/available-rooms", (req, res) => {
    const query = `
        SELECT room_id, room_type, room_status, price_per_night 
        FROM Rooms 
        WHERE room_status = 'clean' AND availability = 'available'
    `;

    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching available rooms:", err);
        return res
          .status(500)
          .send("An error occurred while retrieving available rooms.");
      }

      // Render the EJS template with the results
      res.render("availableRoom", { rooms: results });
    });
  });

  app.get("/checked-in-customers", (req, res) => {
    const query = `
        SELECT
            b.booking_id,
            c.customer_id,
            c.name AS customer_name,
            r.room_id,
            r.room_type,
            b.check_in,
            b.check_out
        FROM
            Bookings b
        JOIN
            Customers c ON b.customer_id = c.customer_id
        JOIN
            Rooms r ON b.room_id = r.room_id
        WHERE
            b.status = 'checked_in'
    `;

    connection.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Database error");
      }

      // Render the EJS template and pass the results
      res.render("checkedInCustomers.ejs", { customers: results });
    });
  });

  app.post("/find-booking", (req, res) => {
    const { email, paid_amount } = req.body;

    // Query to find booking details based on email
    const query = `
      SELECT b.booking_id, b.check_in, b.check_out, r.price_per_night 
      FROM Bookings b
      JOIN Customers c ON b.customer_id = c.customer_id
      JOIN Rooms r ON b.room_id = r.room_id
      WHERE c.email = ? AND b.status = 'booked'
  `;

    connection.query(query, [email], (err, results) => {
      if (err) {
        return res
          .status(500)
          .send(
            "<p>Error fetching booking details. Please try again later.</p>"
          );
      }

      if (results.length === 0) {
        return res
          .status(404)
          .send(
            "<p>No booking found for this email or already checked in.</p>"
          );
      }

      const booking = results[0];
      const checkIn = new Date(booking.check_in);
      const checkOut = new Date(booking.check_out);
      const diffTime = Math.abs(checkOut - checkIn);
      const daysStayed = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const totalCost = daysStayed * booking.price_per_night;

      // Update booking status and generate invoice
      const updateBookingQuery = `
          UPDATE Bookings
          SET status = 'checked_in'
          WHERE booking_id = ?`;

      const insertInvoiceQuery = `
          INSERT INTO Invoices (booking_id, total_amount, paid_amount)
          VALUES (?, ?, ?)`;

      connection.query(updateBookingQuery, [booking.booking_id], (err) => {
        if (err) {
          return res
            .status(500)
            .send(
              "<p>Error updating booking status. Please try again later.</p>"
            );
        }

        connection.query(
          insertInvoiceQuery,
          [booking.booking_id, totalCost, paid_amount],
          (err) => {
            if (err) {
              return res
                .status(500)
                .send(
                  "<p>Error generating invoice. Please try again later.</p>"
                );
            }

            // Render a success message
            res.send(`
                  <p><strong>Check-in successful!</strong></p>
                  <p>Booking ID: ${booking.booking_id}</p>
                  <p>Check-In Date: ${booking.check_in}</p>
                  <p>Check-Out Date: ${booking.check_out}</p>
                  <p>Total Cost: $${totalCost}</p>
                  <p>Paid Amount: $${paid_amount}</p>
                  <p>Due Amount: $${(totalCost - paid_amount).toFixed(2)}</p>
                  
              `);
          }
        );
      });
    });
  });

  app.get("/service-requests", (req, res) => {
    const query = `
        SELECT 
            sr.request_id, 
            s.service_name, 
            sr.quantity, 
            b.room_id, 
            sr.booking_id, 
            sr.request_date
        FROM ServiceRequests sr
        JOIN Services s ON sr.service_id = s.service_id
        JOIN Bookings b ON sr.booking_id = b.booking_id
        WHERE sr.status = 'pending'
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching service requests:", err);
            return res.status(500).send("Error fetching service requests.");
        }
        res.render("customerReq.ejs", { requests: results });
    });
});


  app.post("/service-requests/:id", (req, res) => {
    const requestId = req.params.id;
    const { action } = req.body;

    const updateQuery = `
        UPDATE ServiceRequests
        SET status = ?
        WHERE request_id = ?
    `;

    const findServiceQuery = `
        SELECT sr.booking_id, s.cost, sr.quantity
        FROM ServiceRequests sr
        JOIN Services s ON sr.service_id = s.service_id
        WHERE sr.request_id = ?
    `;

    connection.query(findServiceQuery, [requestId], (err, results) => {
      if (err || results.length === 0) {
        return res.status(500).send("Error processing service request.");
      }

      const { booking_id, cost, quantity } = results[0];
      const totalCost = cost * quantity;

      if (action === "approve") {
        const updateInvoiceQuery = `
                UPDATE Invoices
                SET total_amount = total_amount + ?
                WHERE booking_id = ?
            `;

        connection.query(updateInvoiceQuery, [totalCost, booking_id], (err) => {
          if (err) {
            return res.status(500).send("Error updating invoice.");
          }

          connection.query(updateQuery, ["completed", requestId], (err) => {
            if (err) {
              return res.status(500).send("Error approving request.");
            }
            res.redirect("/service-requests");
          });
        });
      } else if (action === "reject") {
        connection.query(updateQuery, ["rejected", requestId], (err) => {
          if (err) {
            return res.status(500).send("Error rejecting request.");
          }
          res.redirect("/service-requests");
        });
      }
    });
  });

  app.post("/checkout", (req, res) => {
    const { email } = req.body;

    // Step 1: Fetch the booking details for the customer
    const fetchBookingQuery = `
      SELECT b.booking_id, b.total_cost, b.status, i.invoice_id, i.total_amount, i.paid_amount, i.due_amount
      FROM Bookings b
      JOIN Customers c ON b.customer_id = c.customer_id
      JOIN Invoices i ON b.booking_id = i.booking_id
      WHERE c.email = ? AND b.status = 'checked_in'
  `;
    console.log(1);
    connection.query(fetchBookingQuery, [email], (err, bookingResults) => {
      if (err) {
        console.error("Error fetching booking details:", err);
        return res.status(500).send("Error fetching booking details");
      }

      if (bookingResults.length === 0) {
        return res.status(404).send("No active booking found for this email");
      }
      console.log(1);
      const booking = bookingResults[0];
      const bookingId = booking.booking_id;
      const totalCost = booking.total_cost;
      const invoiceId = booking.invoice_id;
      const totalAmount = booking.total_amount;
      const paidAmount = booking.paid_amount;
      const dueAmount = booking.due_amount;
      console.log(1);
      // Step 2: Update booking status to 'checked_out'
      const updateBookingQuery = `
          UPDATE Bookings
          SET status = 'checked_out'
          WHERE booking_id = ?
      `;
      console.log(1);
      // Step 3: Cancel pending service requests
      const updateServiceRequestsQuery = `
          UPDATE ServiceRequests
          SET status = 'canceled'
          WHERE booking_id = ? AND status = 'pending'
      `;
      console.log(1);
      // Step 4: Update invoice with the due amount logic
      let updatedTotalAmount = totalAmount;
      let updatedDueAmount = dueAmount;

      if (paidAmount < totalCost) {
        updatedDueAmount = totalCost - paidAmount;
      } else if (paidAmount > totalCost) {
        updatedTotalAmount = totalCost;
        updatedDueAmount = 0;
      }
      console.log(1);
      // Update the invoice with new total and due amount
      const updateInvoiceQuery = `
          select due_amount from  Invoices
          WHERE invoice_id = ?
      `;

      // Step 5: Execute the queries
      connection.query(updateBookingQuery, [bookingId], (err) => {
        if (err) {
          console.error("Error updating booking status:", err);
          return res.status(500).send("Error updating booking status");
        }

        connection.query(
          updateServiceRequestsQuery,
          [bookingId],
          (err, serviceResult) => {
            if (err) {
              console.error("Error updating service requests:", err);
              return res.status(500).send("Error updating service requests");
            }

            // Log the values being passed into the updateInvoiceQuery
            console.log(
              "Updating invoice with: ",
              updatedTotalAmount,
              updatedDueAmount,
              invoiceId
            );

            connection.query(updateInvoiceQuery, [invoiceId], (err, result) => {
              if (err) {
                console.error("Error updating invoice:", err);
                return res.status(500).send("Error updating invoice");
              }

              // Check if result contains at least one row
              if (result.length > 0) {
                const dueAmount = result[0].due_amount; // Access the first row's due_amount
                console.log(`Due Amount: ${dueAmount}`);
                res.send(`Total Due: ${dueAmount}`);
              } else {
                res.send("No invoice found");
              }
            });
          }
        );
      });
    });
  });

  app.get("/services", (req, res) => {
    const query = `SELECT * FROM Services WHERE service_name NOT IN ('Parking', 'Airport Shuttle', 'Car Rental')`;

    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching services:", err);
        return res
          .status(500)
          .send("An error occurred while retrieving services.");
      }

      // Render services page with available services and query parameters
      res.render("services", { services: results, query: req.query });
    });
  });

  // Route to handle service requests (change booking_id to room_id)
  app.post("/services/request", (req, res) => {
    const { room_id, service_id, quantity } = req.body;

    const bookingQuery = `SELECT booking_id FROM Bookings WHERE room_id = ? AND status = 'checked_in'`;

    connection.query(bookingQuery, [room_id], (err, results) => {
        if (err) {
            console.error("Error finding booking:", err);
            return res
                .status(500)
                .send("An error occurred while retrieving the booking.");
        }

        if (results.length === 0) {
            return res
                .status(400)
                .send("No active booking found for the given room.");
        }

        const booking_id = results[0].booking_id;

        const insertQuery = `
            INSERT INTO ServiceRequests (booking_id, service_id, quantity)
            VALUES (?, ?, ?)
        `;

        connection.query(
            insertQuery,
            [booking_id, service_id, quantity],  // ✅ Fixed this line
            (err) => {
                if (err) {
                    console.error("Error creating service request:", err);
                    return res
                        .status(500)
                        .send("An error occurred while requesting the service.");
                }

                res.redirect("/services?success=true");
            }
        );
    });
});


  app.get("/fetch-requests", (req, res) => {
    const query = `
      SELECT sr.*
      FROM ServiceRequests sr
      WHERE sr.status = 'pending'
  `;

    connection.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Database error");
      }
      res.render("serviceStatus.ejs", { requests: results });
    });
  });

  // POST route to filter by room_id
  app.post("/fetch-requests", (req, res) => {
    const roomId = req.body.room_id;

    const query = `
      SELECT sr.*
      FROM ServiceRequests sr
      JOIN Bookings b ON sr.booking_id = b.booking_id
      WHERE b.room_id = ? AND sr.status = 'pending'
  `;

    connection.query(query, [roomId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Database error");
      }
      res.render("serviceStatus.ejs", { requests: results });
    });
  });
  app.get("/rsearch", (req, res) => { 
    res.render("searchCustomer.ejs", { searched: false });
});

  app.get("/search-customer", (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.render("searchCustomer", { searched: false });
    }

    const query = `SELECT * FROM Customers WHERE email = ?`;

    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error("Error searching customer:", err);
            return res.status(500).send("Internal server error");
        }

        if (results.length > 0) {
            res.render("searchCustomer", { searched: true, customer: results[0] });
        } else {
            res.render("searchCustomer", { searched: true, customer: null });
        }
    });
});

  // Route to cancel a service request
  app.post("/cancel-request", (req, res) => {
    const requestId = req.body.request_id;

    const query = `
      UPDATE ServiceRequests
      SET status = 'canceled'
      WHERE request_id = ?
  `;

    connection.query(query, [requestId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Database error");
      }

      // Redirect back to the Service Status page
      res.redirect("/fetch-requests");
    });
  });
}

dynamicRoute();

app.listen(process.env.PORT, () => {
  console.log("server online");
});
