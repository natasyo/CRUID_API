export class User {
    constructor(name, userName, age) {
        this.age = age;
        this.name = name
        this.userName = userName
    }
    static users = []
    static addUser(user) {
        if (user.name && user.userName && user.age) {
            this.users.push(new User(user.name, user.userName, user.age))
            return 201
        }
        return 400

    }
}