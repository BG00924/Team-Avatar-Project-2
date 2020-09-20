const User = require('./User')
const Game = require('./Game')
const Vote = require('./Vote')

User.hasMany(Game, {
    foreignKey: "user_id"
})

Game.belongsTo(User, {
    foreignKey: 'user_id'
})

User.belongsToMany(Game, {
    through: Vote,
    as: 'voted_games',
    foreignKey: 'user_id'
})

Game.belongsToMany(User, {
    through: Vote, 
    as: 'voted_games',
    foreignKey: 'game_id'
})

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Vote.belongsTo(Game, {
    foreignKey: 'game_id'
});
  
User.hasMany(Vote, {
    foreignKey: 'user_id'
});
  
Game.hasMany(Vote, {
    foreignKey: 'game_id'
});

module.exports = { User, Game, Vote }