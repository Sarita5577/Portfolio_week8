const mongoose = require('mongoose');

// MongoDB connection string
const MONGO_URI = 'mongodb://127.0.0.1:27017/lab_Week8'; // Explicit IPv4

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log(`Connected to ${MONGO_URI}`))
  .catch(err => console.error("Error occurred during connection:", err));

// Schema definition
const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  salary: Number
});

// Model creation
const Person = mongoose.model('Person', PersonSchema, 'personCollection');

// Create a document
const doc1 = new Person({ name: 'Jacky', age: 36, gender: "Male", salary: 3456 });

// Save the document
doc1.save()
  .then(doc => console.log("New document has been added to your database:", doc))
  .catch(err => console.error(err));

manypersons=[{ name: 'Simon',age:42,Gender:"Male",Salary:3456 },
    { name: 'Neesha',age:23,Gender:"Female",Salary:1000 },
    { name: 'Mary',age:27,Gender:"Female",Salary:5402 },
    { name: 'Mike',age:40,Gender:"Male",Salary:4519 }]
    Person.insertMany(manypersons).then(function()
    {
        console.log("Data inserted") // Success
    })
    .catch(function(error)
    {
        console.log(error) // Failure
    }); 

//finding all the documents in the collection

Person.find({})//find all users
   .sort({Salary:1})
   .select('name Salary age')
   .limit(10)
   .exec()
   .then(docs=>{
    console.log('Showing multiple Documents')
    docs.forEach(function(Doc)
{
    console.log(Doc.age, Doc.name)
})
   })
   .catch(err => {
    console.error(err)
   })

   //Aggregate fucntion for female and age is greater than some given number
var givenage=30
Person.find({Gender:"Female", age:{$gte:givenage}})//find all users
   .sort({Salary:1})//sort ascending by firsrName
   .select('name Salary Age')//Name and Salary only
   .exec(10)//execute the query
   .then(docs=>{
    console.log("showing age greater than 15" .givenage)
    docs.forEach(function(Doc){
        console.log(Doc.age, Doc.name);
    })
   })
   .catch(err =>{
    console.error(err)
   })

   //counting all the documents
   Person.countDocuments().exec()
         .then(count=>{
            console.log("The documents Count:" .count)
         })
         .catch(err=>{
            console.error(err)
         })

    Person.deleteMany({age:{$gte:25}})
         .exec()
         .then(docs=>{
            console.log("deleted Documents are:", docs)
         })
         .catch(function(error)
        {
            console.log(error);
        })


    Person.updateMany({Gender:"Female"},{Salary:5555})
         .exec()
         .then(docs=>{
            console.log("update")
            console.log(docs);//Success
         })
         .catch(function(error)
        {
            console.log(error); //Failure
        })