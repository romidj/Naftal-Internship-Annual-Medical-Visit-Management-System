# Naftal – Annual Medical Visit Management System

A full-stack web application developed during my internship at **Naftal** to manage annual medical visits for company employees.  
The system allows administrators, nurses, and doctors to coordinate convocations, track appointment statuses, and manage medical visit data efficiently.

---

## 🚀 Features

- **Role-based Access**
  - Administrator - Nurse: Generate and send convocations, track employee attendance.
  - Doctor: Update medical visit results, generate medical prescription, check emplye details.
  - Gestionnaire: View employee data and reports 'not finished yet'.

- **Convocation Management**
  - Generate convocations for selected employees.
  - Automatic email notifications for appointments.
  - Track convocation status (sent / not sent).

- **Medical Appointment Tracking**
  - Update visit status: pending, completed, or missed.
  - View statistics for each department (direction).

- **Dynamic Dashboard**
  - Real-time statistics (total employees, convocations sent, completed visits).
  - Data visualizations for better monitoring.

- **Multi-direction Support**
  - Manage employees grouped by department.
  - Drill-down view for each department's employees.

---

## 🛠️ Tech Stack

**Frontend:**  
- React.js  
- Axios (API calls)  
- SCSS / Material UI (for styling)  

**Backend:**  
- Node.js + Express.js  
- JWT Authentication & Role-based Authorization  
- Nodemailer (email service)  

**Database:**  
- MySQL (with phpMyAdmin for management)


## 📸 Screenshots

### Authentification
![Dashboard](./screenshots/Authentification.png)


### Dashboard Admin - Nurse -
![Dashboard](./screenshots/dashboard.png)

### Convocation Management
### company's Services
![list of services](./screenshots/list_direction_admin.png)
### Employees per Service
![List of employees](./screenshots/employees.png)
### One emplyee details
![Details Employe](./screenshots/detail_emp.png)
### Convocation form
![Convocation Form](./screenshots/sendEMail.png)

### state changes after sending email
![State changes](./screenshots/statechangeRDV.png)

### Email Notification
![Email Notification](./screenshots/Email.png)

### Doctors' dashboard
![Email Notification](./screenshots/doctordashboard.png)

### List of appointments
![Email Notification](./screenshots/convocation.png)
### prescription generation
![Email Notification](./screenshots/prescription.png)
---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/romidj/Naftal-Internship-Annual-Medical-Visit-Management-System.git
   cd Naftal-Internship-Annual-Medical-Visit-Management-System

