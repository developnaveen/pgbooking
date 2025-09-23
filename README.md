🏠 PG Booking System

A full-stack PG (Paying Guest) room booking system built with React (frontend) and Spring Boot (backend). The application allows users to book PG rooms online while providing an admin interface to manage rooms, bookings, and payments.

🚀 Features
User Panel

🔑 User authentication & profile management

📅 Search and book available rooms

📄 View booking history and booking status

💳 Payment tracking

📧 Booking confirmation notifications

Admin Panel

👤 Admin login & profile management

🏘 Manage PG details (rooms, facilities, availability)

📊 Track and update booking status

💰 Manage payment records & rent details

📢 Newsletter/promotions management

🛠️ Tech Stack

Frontend: React.js (with Material UI)

Backend: Spring Boot (Java, REST API)

Database: MySQL

Tools: Maven, Axios, Git, VS Code / IntelliJ IDEA

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/pg-booking.git
cd pg-booking

2. Backend (Spring Boot) Setup

Navigate to backend folder

cd backend


Configure MySQL in application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/pg_booking
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update


Run the backend

mvn spring-boot:run

3. Frontend (React) Setup

Navigate to frontend folder

cd frontend


Install dependencies

npm install


Start React app

npm start
