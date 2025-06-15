
**Step 2: Install Dependencies**
The `insert_books.js` script requires the official MongoDB Node.js driver. Install it using `npm` or your preferred package manager.


npm install mongodb


**Step 3: Start the MongoDB Service**
Ensure your local MongoDB server is running. If not, start it with the following command:


sudo systemctl start mongod


Verify its status to make sure it's active:


sudo systemctl status mongod


### Running the Scripts

#### Populating the Database

The `insert_books.js` script will:

1. Connect to your local MongoDB instance.

2. Create a database named `plp_bookstore`.

3. Create a collection named `books`.

4. Insert 12 sample book documents into the collection.

To run the script, execute the following command in your terminal:


node insert_books.js


You will see a confirmation message listing the books that were successfully inserted.

#### Executing the Queries

The `queries.js` file contains all the queries for Tasks 2, 3, 4, and 5. To run them, you can load the script directly into `mongosh`.

**Step 1: Open the MongoDB Shell**


mongosh


**Step 2: Switch to the Database**
Inside `mongosh`, make sure you are using the correct database:


use plp_bookstore;


**Step 3: Load and Run the Queries Script**
You can load the entire `queries.js` file into `mongosh` from your system terminal using the `--file` flag:


mongosh --file queries.js


Alternatively, if you are already inside `mongosh`, you can use the `load()` function. Make sure you are in the correct directory in your system terminal *before* starting `mongosh`.


// Inside mongosh
load("queries.js");


This will execute all the commands in the script sequentially and print the results for each query in your terminal.

### MongoDB Queries Overview

The `queries.js` file is structured to match the assignment tasks:

* **Task 2 (CRUD):** Demonstrates finding, updating, and deleting documents.

* **Task 3 (Advanced Queries):** Covers multi-condition filtering, projection, sorting, and pagination.

* **Task 4 (Aggregation):** Includes pipelines to calculate averages, find top authors, and group data by decade.

* **Task 5 (Indexing):** Shows how to create single and compound indexes and how to use the `.explain()` method to analyze query performance.
