const User = require('../models/User')

class UserService {
    constructor() {
        this.limit = 5
    }

    getUsers(page){
        const skip = (page - 1) * this.limit
        const query = User.find().skip(skip).limit(this.limit).exec()
        return query
    }
    
    getUserById(id){
        const query = User.findOne({_id: id}).exec()
        return query
    }

    getUserByHandle(handle){
        const query = User.findOne({user: handle}).exec()
        return query
    }

    addUser(data){
        const newUser = new User(data)
        return newUser.save()
    }
}

module.exports = UserService