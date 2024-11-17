const express = require('express');
const router = express.Router();
const Person = require('./../models/person'); // Ensure this path and file name are correct

// POST route to add a new person
router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains person data

        // Create a new Person document
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('Data saved successfully');
        res.status(200).json(response);
    } catch (err) {
        console.error('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET all persons
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetched successfully');
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET persons by work type
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType.toLowerCase();
        const validWorkTypes = ['chef', 'manager', 'waiter'];

        if (validWorkTypes.includes(workType)) {
            const response = await Person.find({ work: workType });
            console.log('Response fetched successfully');
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: 'Invalid work type. Valid types are: chef, manager, waiter' });
        }
    } catch (err) {
        console.error('Error fetching data by work type:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT (Update) a person's details
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true,
        });

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data updated successfully');
        res.status(200).json(response);
    } catch (err) {
        console.error('Error updating person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a person
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndRemove(personId);

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data deleted successfully');
        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
        console.error('Error deleting person:', err)
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
