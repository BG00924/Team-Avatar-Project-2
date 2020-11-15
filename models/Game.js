const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            game_id: body.game_id
        }).then(() => {
            return Game.fineOne({
                where: {
                    id: body.game_id
                },
                attributes: [
                    'id',
                    'title',
                    'genre',
                    'score',
                    'description',
                    'user_id'
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE game.id = vote.game_id)'),
                        'vote_count'
                    ]
                ]
            })
        })
    }
}

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'game'
    }
)

module.exports = Game