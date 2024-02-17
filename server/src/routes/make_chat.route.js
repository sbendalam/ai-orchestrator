module.exports = (app) => {
    app.route('/sendmail').get(sendmail)
}