// document.getElementById("loginForm").addEventListener("submit", async function (event) {
//     event.preventDefault(); // Prevent form from submitting traditionally

//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     try {
//         const response = await fetch("/admin", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         const data = await response.json();

//         if (response.ok && data.success) {
//             alert(data.message || "Login successful!");
//             // Redirect to dashboard or another page
//             // window.location.href = "/dashboard";
//         } else {
//             alert(data.message || "Login failed. Please try again.");
//         }
//     } catch (error) {
//         console.error("Error during login:", error);
//         alert("An unexpected error occurred. Please try again.");
//     }
// });
