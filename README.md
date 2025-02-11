# 🏡 AI-Powered Real Estate Platform

🚀 **AI-enhanced property search & recommendations** using **Next.js, MongoDB Atlas Vector Search, and OpenAI embeddings**.

## 📌 Features
✅ AI-powered **semantic search** for properties  
✅ **Vector embeddings** for intelligent property matching  
✅ **MongoDB Atlas Vector Search** for fast and scalable retrieval  
✅ **Next.js API routes** for backend processing  
✅ **Postman-ready API endpoints** for testing  
✅ **Secure authentication** and **user favorites management**  

---

## 📁 **Project Structure**
```
/realestatewebapp
│── /components          # Reusable React components
│── /models              # Mongoose models for MongoDB
│── /pages
│   ├── /api             # Next.js API routes
│   │   ├── search.ts    # AI-powered property search API
│   │   ├── properties.ts # Fetch property details
│   │   ├── addProperty.ts # Add new properties with embeddings
│── /scripts             # Scripts for vector embedding generation
│── /dbConfig            # Database connection configuration
│── .env.local           # Environment variables
│── package.json         # Dependencies and scripts
│── README.md            # Project documentation
```

---

## 🔥 **Tech Stack**
### **Frontend**
- ⚛ **Next.js** (React Framework)
- 🎨 **Tailwind CSS** (UI Styling)

### **Backend & Database**
- 🌎 **Next.js API Routes** (Server-side processing)
- 🏦 **MongoDB Atlas Vector Search** (AI-powered search)
- 🛠 **Mongoose** (ODM for MongoDB)
- 🔐 **JWT Authentication** (User login/signup)

### **AI & Search**
- 🧠 **OpenAI Embeddings** (Text-to-vector conversion)
- 🔍 **MongoDB Atlas Vector Indexing** (Fast property retrieval)
- 🚀 **LangChain** (AI-powered recommendations)

---

## ⚙️ **Installation & Setup**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/yourusername/realestatewebapp.git
cd realestatewebapp
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env.local` file:
```
MONGODB_URI=your_mongodb_atlas_uri
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
```

### **4️⃣ Run the Development Server**
```bash
npm run dev
```
Your app will be live at:  
📍 `http://localhost:3000`

---

## 🏡 **How AI-Powered Search Works**
### **📌 1️⃣ Generate Property Embeddings**
```bash
ts-node scripts/generate_embeddings.ts
```
- Converts **property descriptions into vector embeddings** using OpenAI.
- Stores **embeddings in MongoDB** for **fast retrieval**.

### **📌 2️⃣ Perform AI Search via API**
🔹 **Request Example (POST)**
```json
{
  "query": "3-bedroom apartment near downtown"
}
```
🔹 **Response Example**
```json
{
  "properties": [
    {
      "_id": "65b2c8f40a12345678d9e123",
      "name": "Luxury 3-Bedroom Apartment",
      "embedding": [0.23, 0.54, -0.11, ...]
    }
  ]
}
```
🔹 **Test in Postman**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/search`
- **Headers:** `{ "Content-Type": "application/json" }`
- **Body:**
  ```json
  { "query": "Luxury villa in Toronto" }
  ```

---

## 🛠 **Available API Routes**
### **🔍 AI Property Search**
```http
POST /api/search
```
- **Description:** AI-powered search based on user queries.
- **Request Body:**
  ```json
  { "query": "3-bedroom apartment in New York" }
  ```
- **Response:** Returns the **top 5 most relevant properties**.

### **🏡 Get Property Details**
```http
POST /api/properties
```
- **Description:** Fetch property details based on slug or ID.
- **Request Body:**
  ```json
  { "slug": "modern-loft-downtown" }
  ```
- **Response:** Returns **property details**.

### **➕ Add New Property**
```http
POST /api/addProperty
```
- **Description:** Adds a new property and generates AI embeddings.
- **Request Body:**
  ```json
  {
    "name": "Luxury Villa",
    "streetaddress": "123 Main St",
    "city": "Toronto",
    "state": "ON",
    "description": "Beautiful home with pool and garden.",
    "price": 1200000,
    "bedrooms": 4,
    "bathrooms": 3
  }
  ```
- **Response:** Property added successfully with **AI embeddings**.

---

## 📸 **Image Upload for Listings**
This project supports **Cloudinary** for property image uploads.
- **Setup Cloudinary** in `.env.local`
  ```
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
  ```
- **Upload Images via Dropzone** (`components/ImageUpload.tsx`)

---

## 🔐 **User Authentication**
- 🛠 **Signup & Login using JWT**
- ❤️ **"Favorite" Properties (Save for Later)**
- 🔐 **User authentication state is managed via Redux**

---

## 🚀 **Deployment**
### **1️⃣ Build for Production**
```bash
npm run build
```
### **2️⃣ Deploy on Vercel**
```bash
vercel
```
### **3️⃣ Deploy on Railway**
- Connect to **MongoDB Atlas**
- Deploy using `railway up`

---

## 📌 **Future Improvements**
- ✅ **AI-powered recommendations** based on user behavior  
- ✅ **Auto-price predictions** for properties  
- ✅ **Multi-user property listings**  

---

## ❤️ **Contributing**
Contributions are welcome! Open an issue or submit a pull request.
