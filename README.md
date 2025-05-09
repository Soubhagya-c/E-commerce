# 🛒 E-Commerce - Product Search Bar

A full-stack e-commerce application featuring a **Spring Boot** and **Hibernate** backend connected to a **PostgreSQL** database, and a modern **React.js** frontend with a dynamic product search bar.

---

## 📁 Project Structure


---



### 🔧 Backend (Spring Boot + Hibernate + PostgreSQL)
- RESTful API for product search
- Hibernate ORM for seamless DB operations
- PostgreSQL integration
- Cross-Origin Resource Sharing (CORS) enabled

### 🎨 Frontend (React JS)
- Live product search 
- Responsive design
- Fetches data from backend via API

---



### 1. Clone the repository
```bash
git clone https://github.com/Soubhagya-c/E-commerce.git
cd e-commerce
1. Backend Setup
cd application
# Configure PostgreSQL credentials in application.properties
./mvnw spring-boot:run


2.Frontend Setup
cd ../product-search-app
npm install
npm run dev
