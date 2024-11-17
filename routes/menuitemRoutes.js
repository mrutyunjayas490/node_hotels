const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

//post Method to add a menu Item
router.post('/', async(req,res)=>{
    try{
        const data = req.body
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();
        console.log('Data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
});

//Get Method to get the Menu Items
router.get('/', async (req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:tasteType', async(req, res)=>{
    try{
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType =='sour'){
            const response = await MenuItem.find({taste: tasteType});
            console.log('Response fetched');
            res.status(200).json(response);

        }else{
            res.status(404).json({error: 'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Server Error'});
    }
})

module.exports = router;