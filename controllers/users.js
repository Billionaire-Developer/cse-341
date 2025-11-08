const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async(req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createUser = async(req, res) => {
    const user = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        favoriteColor : req.body.favoriteColor,
        birthday : req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if(response.acknowledged){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || `some error occurred while updating the user.`);
    }
};

const updateUser = async(req, res) =>{
    const userID = new ObjectId(req.params.id);
    const user = {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userID}, user);
    if(response.modifiedCount > 0){
        res.send(204).send();
    }else{
        res.send(500).json(response.error || `some error occurred while updating the user.`);
    }
}

const deleteUser = async(req, res) => {
    const userID = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userID});
    if(response.deleteCount > 0) {
        res.send(204).send()
    }else{
        res.send(500).json(response.error || `some error occurred while updating the user.`)
    }
}

module.exports = {
    getAll, 
    getSingle,
    createUser,
    updateUser,
    deleteUser
};