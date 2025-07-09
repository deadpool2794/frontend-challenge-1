# Claims Data Uploader

## The Application Flow

Here's a step-by-step look at how you'll use this application:

### 1\. Home Page

- When you first open the app, you'll see the **Home Page**.
- It has a **header** at the top and a place to **upload your claims data file** (a "File Input"). There's also an **Upload button**.
- **To upload files, you need to be logged in.** If you're not, hovering over the "Upload" button will show a message telling you to log in.
- The header also has a **Login button**. Click it to go to the **Login Page**.

### 2\. Logging In

- The **Login Page** (found at `/login`) is where you'll sign in.
- **Your email address is your unique identifier** here. This helps the system keep track of your files.
- Once you're logged in, the "Upload" button on the Home Page won't show the "log in" message anymore.

### 3\. Uploading Your File

- After logging in, select a csv file and then click the **Upload button**.
- This will take you to the **File Preview Page** (`/file_preview`).

### 4\. File Preview and Approval

- On the **File Preview Page**:
  - Your CSV file is parsed using Papaparse and validated against a defined schema using Zod to make sure it's in the correct format.
  - The **rows of your file are displayed in a table** (using AG-Grid) so you can see them.
  - If everything looks good, click the **Approve button**.
- **Approving the file sends it to the system's "backend"** (the server side). Your file will be saved in a special folder named after your email address (e.g., `uploads/<your email>/`).
- If there's an issue with the upload, you'll see an **error message**.
- If the upload is successful, the table will disappear, and you'll see a link to **"Upload more files"**. Clicking this takes you back to the Home Page (`/`).
- File Display logic is handled by a custom hook in hooks/useParsedCsvData.ts

### 5\. Viewing Your Files

- On the header, there's a **"View Files" button**.
- If you're **logged in**, clicking it will take you to **My Files Page** (`/my_files`). If you're **not logged in**, it does nothing.
- On the **My Files Page**, you'll see a list of **all the files you've uploaded**.
- Each file will have a **download option** to get a JSON version of your original CSV file.
- Fetching files is handled by a custom hook in hooks/useUserFiles.ts

### How the System Talks (Backend APIs)

The system uses three main "APIs" :

- `/uploads`: This is for uploading your CSV files.
- `/my_files`: This is for showing you all the files you've uploaded.
- `/download`: This lets you download a specific file you've uploaded.

---

## Getting Started: Local Setup

To run locally, follow these steps:

### 1\. Clone the Repository

Open your terminal or command prompt and run this command:

```bash
git clone https://github.com/deadpool2794/frontend-challenge-1.git
```

Then, move into the project folder:

```bash
cd frontend-challenge-1
```

### 2\. Install Dependencies

Run `npm install` in these three locations:

- `frontend-challenge-1`
- `frontend-challenge-1/frontend`
- `frontend-challenge-1/backend`

So, your commands will look like this:

```bash
npm install
cd frontend
npm install
cd ../backend
npm install
cd .. # Go back to the main directory
```

### 3\. Start the Backend

While still in the `frontend-challenge-1/backend` directory, start the server:

```bash
npm run dev
```

### 4\. Start the Frontend

Open a **new terminal window**. Navigate to the `frontend-challenge-1/frontend` directory and start the frontend:

```bash
cd frontend-challenge-1/frontend
npm run dev
```

Now you should be able to access the application in your web browser\!

Note: While I understand my backend design is not as per industry standards and best practices, I tried my best with whatever knowledge I have and I hope you understand.

**Note:** While I understand my backend design is not as per industry standards and best practices, I tried my best with whatever knowledge I have and I hope you understand.
