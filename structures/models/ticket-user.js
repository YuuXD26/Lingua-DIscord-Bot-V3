const {
    Schema,
    model
} = require('mongoose');

const Ticket = new Schema({
    guildID: String,
    userID: String,
    channelID: String,
    channelIndex: Number,
    closed: Boolean,
    locked: Boolean,
    claimed: Boolean,
    claimedBy: String,
    OpenTime: String,
})

module.exports = model("ticket-user", Ticket);
