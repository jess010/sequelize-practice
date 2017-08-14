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


});

User.prototype.haveBirthday = function () {
    return this.update({
        age: this.age + 1
    })
    .catch(new Error('haveBirthday function non-operational'))
}


module.exports = User;
