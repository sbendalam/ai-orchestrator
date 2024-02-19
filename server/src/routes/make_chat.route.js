const { createChat, make_chat } = require("../controllers/make_chat.controller")
const { send_remainder, sendmail } = require("../controllers/send_remainder.controller")

module.exports = (app) => {
    app.route('/createchat/:employId').get(createChat)
    app.route('/makechat').post(make_chat)
    app.route('/sendremainder').get(sendmail)
}