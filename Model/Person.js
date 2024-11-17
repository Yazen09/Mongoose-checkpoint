const mongoose = require('mongoose');

// Person SCHEMA
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    favoriteFoods: { type: [String] },
});

// Model person
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
