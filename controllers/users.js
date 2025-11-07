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
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        favoriteColor : req.body.favoriteColor,
        birthday : req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId}, user);
};

module.exports = {
    getAll, 
    getSingle,
    createUser,
    updateUser,
    deleteUser
};