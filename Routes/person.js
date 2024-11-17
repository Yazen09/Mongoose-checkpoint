const express = require('express');
const router = express.Router();
const Person = require('../Model/Person');

// add
router.post('/add', async (req, res) => {
    const { name, age, favoriteFoods } = req.body;

    try {
        const newPerson = new Person({ name, age, favoriteFoods });
        const savedPerson = await newPerson.save();
        res.status(201).json(savedPerson);
    } catch (error) {
        res.status(500).json({ message: 'Error creating person', error: error.message });
    }
});

// addMany
router.post('/addMany', async (req, res) => {
    const arrayOfPeople = req.body;

    try {
        const createdPeople = await Person.create(arrayOfPeople);
        res.status(201).json(createdPeople);
    } catch (error) {
        res.status(500).json({ message: 'Error creating people', error: error.message });
    }
});

// Findbyname
router.get('/findByName/:name', async (req, res) => {
    try {
        const people = await Person.find({ name: req.params.name });
        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching people', error: error.message });
    }
});

// Findbyfood
router.get('/findByFood/:food', async (req, res) => {
    try {
        const person = await Person.findOne({ favoriteFoods: req.params.food });
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching person', error: error.message });
    }
});

// FindbyID
router.get('/findById/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching person', error: error.message });
    }
});

// update : Hamburger to favorite food
router.put('/addFood/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) return res.status(404).json({ message: 'Person not found' });

        person.favoriteFoods.push('hamburger');
        await person.save();

        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ message: 'Error updating person', error: error.message });
    }
});

// Update age to name
router.put('/updateAge/:name', async (req, res) => {
    try {
        const updatedPerson = await Person.findOneAndUpdate(
            { name: req.params.name },
            { age: 20 },
            { new: true }
        );
        res.status(200).json(updatedPerson);
    } catch (error) {
        res.status(500).json({ message: 'Error updating age', error: error.message });
    }
});

// Delete By ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedPerson = await Person.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedPerson);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting person', error: error.message });
    }
});

// Delete Mary name
router.delete('/deleteByName/:name', async (req, res) => {
    try {
        const result = await Person.deleteMany({ name: req.params.name });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting people', error: error.message });
    }
});

// Recherche complexe : filtrer, trier, limiter et sélectionner  Filter


router.get('/search', async (req, res) => {
    try {
        const people = await Person.find({ favoriteFoods: 'burritos' })
            .sort({ name: 1 })
            .limit(2)
            .select('-age')
            .exec();
        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({ message: 'Error searching people', error: error.message });
    }
});

module.exports = router;
