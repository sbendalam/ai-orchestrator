const { createChat, make_chat } = require("../controllers/make_chat.controller")

module.exports = (app) => {
    app.route('/createchat/:employId').get(createChat)
    app.route('/makechat').post(make_chat)
}