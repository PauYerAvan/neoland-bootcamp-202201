const { models: { User } } = require('data')

function updateUser(id, { name, email }) {
    return User.findById(id)
    .then((user) => {
      user.name = name || user.name;
      user.email = email || user.email;
  
      return user.save();
    })
}

// function updateUser(id, {name, email}) {

//     return User.findById(id)
//         .then(user => user.updateOne({ name, email }))

// }

// function updateUser(id, {name, email}) {
    
//     return User.updateOne({_id: id}, { name, email })

// }


module.exports = updateUser