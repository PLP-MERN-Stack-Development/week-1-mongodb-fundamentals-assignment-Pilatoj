// Find all books in a specific genre (e.g., "Fiction")
print("--- Task 2: Finding all books in the 'Fiction' genre ---");
printjson(db.books.find({ genre: "Fiction" }).toArray());

// Find books published after a certain year (e.g., after 1950)
print("\n--- Task 2: Finding all books published after 1950 ---");
printjson(db.books.find({ published_year: { $gt: 1950 } }).toArray());

// Find books by a specific author (e.g., "George Orwell")
print("\n--- Task 2: Finding all books by George Orwell ---");
printjson(db.books.find({ author: "George Orwell" }).toArray());

// Update the price of a specific book (e.g., "The Hobbit")
print("\n--- Task 2: Updating the price of 'The Hobbit' to 15.99 ---");
db.books.updateOne(
  { title: "The Hobbit" },
  { $set: { price: 15.99 } }
);
// Verification: find the updated book
printjson(db.books.findOne({ title: "The Hobbit" }));


// Delete a book by its title (e.g., "Animal Farm")
print("\n--- Task 2: Deleting the book 'Animal Farm' ---");
db.books.deleteOne({ title: "Animal Farm" });
// Verification: check that the book is deleted (should return null)
printjson(db.books.findOne({ title: "Animal Farm" }));


// ---------------------------------------------------------------- //
// TASK 3: ADVANCED QUERIES
// ---------------------------------------------------------------- //

// Find books that are both in stock and published after 2000
// Note: The provided data doesn't have books after 2010, so we use 1950 for a better example.
print("\n--- Task 3: Finding books in stock AND published after 1950 ---");
printjson(db.books.find({
  in_stock: true,
  published_year: { $gt: 1950 }
}).toArray());

// Use projection to return only the title, author, and price
print("\n--- Task 3: Projecting to show only title, author, and price ---");
printjson(db.books.find(
  {}, // Empty filter to select all documents
  { _id: 0, title: 1, author: 1, price: 1 } // Projection
).toArray());

// Implement sorting to display books by price (ascending)
print("\n--- Task 3: Sorting books by price (ascending) ---");
printjson(db.books.find().sort({ price: 1 }).toArray());

// Implement sorting to display books by price (descending)
print("\n--- Task 3: Sorting books by price (descending) ---");
printjson(db.books.find().sort({ price: -1 }).toArray());

// Implement pagination (e.g., Page 2, 5 books per page)
print("\n--- Task 3: Pagination - Getting Page 2 (skipping 5, limiting to 5) ---");
printjson(db.books.find().skip(5).limit(5).toArray());


// ---------------------------------------------------------------- //
// TASK 4: AGGREGATION PIPELINE
// ---------------------------------------------------------------- //

// Calculate the average price of books by genre
print("\n--- Task 4: Aggregation - Average price by genre ---");
printjson(db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }
]).toArray());

// Find the author with the most books in the collection
print("\n--- Task 4: Aggregation - Author with the most books ---");
printjson(db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { bookCount: -1 }
  },
  {
    $limit: 1
  }
]).toArray());

// Group books by publication decade and count them
print("\n--- Task 4: Aggregation - Count of books by decade ---");
printjson(db.books.aggregate([
  {
    $group: {
      _id: {
        $subtract: [
          "$published_year",
          { $mod: ["$published_year", 10] }
        ]
      },
      count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  },
  {
    $project: {
        _id: 0,
        decade: { $concat: [ { $toString: "$_id" }, "s" ] },
        count: 1
    }
  }
]).toArray());


// ---------------------------------------------------------------- //
// TASK 5: INDEXING
// ---------------------------------------------------------------- //

// Create an index on the 'title' field
print("\n--- Task 5: Creating a single index on 'title' ---");
db.books.createIndex({ title: 1 });
print("Index on 'title' created.");

// Create a compound index on 'author' and 'published_year'
print("\n--- Task 5: Creating a compound index on 'author' and 'published_year' ---");
db.books.createIndex({ author: 1, published_year: -1 });
print("Compound index on 'author' and 'published_year' created.");


// Demonstrate performance improvement with explain()
// The 'executionStats' will show a difference in how the query is run
// An 'IXSCAN' stage indicates the index was used. A 'COLLSCAN' means a full collection scan.

print("\n--- Task 5: Explaining a query on 'title' to show index usage ---");
// This query will use the 'title' index.
printjson(db.books.find({ title: "The Hobbit" }).explain("executionStats"));


print("\n--- Task 5: Explaining a query on 'author' and 'published_year' ---");
// This query will use the compound index.
printjson(db.books.find({
  author: "George Orwell",
  published_year: { $lt: 1950 }
}).explain("executionStats"));

