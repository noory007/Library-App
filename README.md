*Noory Library* is an application which is built in (MongoDB, Express.js, React, Node.js). You can add, edit and delete books.

- *Frontend*: React, CSS
- *Backend*: Node.js, Express.js
- *Database*: MongoDB Atlas

## Instructions

### 1.	Clone the Repository

- git clone https://github.com/noory007/Library-App.git
- cd Library-App
- npm install

### 2.	Backend

- cd Backend 
- npm install
- #### Create .env file in the Backend (I have sent you the link or credential in your direct message in slack).
- npm start 

### 3.	Frontend

- cd frontend
- npm install
- npm start

### 4.	Accessibility and SEO

- I have used semantic html form, label, input, button, and header and Keyboard navigation, users can tab through the form fields, submit the form, and interact with buttons without needing a mouse. Descriptive Button and Link Text. 
The <meta name="description" ... /> tag in your HTML head provides a concise summary of your app’s purpose. Descriptive Title; The <title>Noory Library</title> tag gives your app a clear, relevant name, which is important for both SEO and user orientation. The app is responsive. Using lighthouse, I checked the SEO and Accessibility of my App.

### 5.	Tracking

- I have used Google Analytic for tracking and also the logs. When you add, edit, delete a book from the database, it shows the record in the terminal and also it is saved in the logs collection in the database. 

### 6.	Security

- For security purose, firstly my database was in my local computer and I thought that it is not secure my data, then I moved my database to MongoDB Atlas to prevent data loss from local crashes or disconnections. Now my data is secure that you can access it from cloud. I also added form validation to ensure no blank or incomplete data can be submitted to the database.


