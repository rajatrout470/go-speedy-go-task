Question:
You are tasked with implementing the following CRUD operations in a Node.js/Express application using MongoDB as the database:
1. Fetch All Users: Create an API endpoint to fetch all users from the collection.
2. Fetch a Single User by userId: Create an API endpoint to fetch a specific user by userId.
3. Update User Details: Create an API endpoint to update a user's information (such as name, age, userImage, and salary) based on their userId.
4. Delete a User by userId: Create an API endpoint to delete a user based on their userId.
Instructions:
You are provided with a MongoDB collection named users that stores documents with the following fields:
json


{
 "userId": "123",
 "name": "John Doe",
 "userImage": "https://example.com/johndoe.jpg",
 "age": 30,
 "salary": 50000
}
Implement the required CRUD operations using Node.js, Express.js, and MongoDB.
1. Fetch All Users:
Create an API to fetch all users from the users collection. The API should return the entire user list.
2. Fetch a User by userId:
Create an API to fetch a user by their userId. If no user is found with the given userId, return a suitable error message.
3. Update User Details:
Create an API to update a user’s details based on userId. The following fields can be updated: name, userImage, age, and salary. Make sure to validate that the userId exists before attempting to update it.
4. Delete a User:
Create an API to delete a user based on their userId. If the user is successfully deleted, return a success message. If the user does not exist, return an appropriate error message.
Bonus:
- Ensure the API is well-documented using Swagger or similar tools.
- Add input validation for the user data (e.g., age should be a positive integer, salary should be a positive number, and userImage should be a valid URL).
- Write efficient code that handles large amounts of data.