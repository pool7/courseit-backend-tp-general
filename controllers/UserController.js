const bcrypt = require('bcrypt-nodejs')

class UserController {
    constructor(userService){
        this.userService = userService
    }

    async getUsers(req, res){
        let page = req.query.page ? req.query.page : 1
        const users = await this.userService.getUsers(page)
        return res.json(users)
    }

    async getUserById(req, res){
        const id = req.params.id
        if(id.length != 24) {
            return res.send("Invalid ID length")
        }
        const user = await this.userService.getUserById(id)
        if(!user){
            return res.send("Invalid ID")
        } else {
        return res.json(user)
        }
    }

    async getUserByHandle(req, res){
        const handle = req.params.handle
        const user = await this.userService.getUserByHandle(handle)
        return res.json(user)
    }

    async addUser(req, res) {
        const body = req.body
        const username = await this.userService.getUserByHandle(body.user)

        if (!username) {
            const newBody = {
             ...body, password: bcrypt.hashSync(body.password)
            }

            if (body) {
                const user = await this.userService.addUser(newBody)
                return res.sendStatus(200)
            } else {
                return res.sendStatus(400)
            }
        }
        
        else if (body.user == username.user)
        {
            return res.send('User already exists.')
        }
    }
}

module.exports = UserController