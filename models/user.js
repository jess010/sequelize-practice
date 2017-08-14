const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/sequelize_practice', { logging: false });

const User = db.define('user', {
  first: {
    type: Sequelize.STRING,
  },

  last: {
    type: Sequelize.STRING,
  },

  age: {
    type: Sequelize.INTEGER,
    validation: {
        min: 18
    }
  },

  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    validation: {
        isEmail: true,
    }
  },

  bio: {
    type: Sequelize.TEXT,
  }
}, {
// ...AND HERE
getterMethods: {
    fullName() {
      return this.first + ' ' + this.last
    },
},

// setterMethods: {
//     yearOlder(age) {
//         return age + 1;
//     }
// }

});

User.prototype.haveBirthday = function () {
    //this.setDataValue(this.age, this.age + 1)

    return User.findOne({
        where: {
            id: this.id
        }
    })
}


module.exports = User;
