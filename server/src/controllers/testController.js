const getFromTest = (req, res) => {
    try {
        res.status(200).send({message:"test controller is working you can use /api/echo to test post request"})

    } catch (error) {
        res.status(400).send({message:"this error is created to test"})
    }
};
const postEcho = (req,res)=>{
    try {
        res.status(200).send({message:`Received: ${req.body.message}`})
    } catch (error) {
        
    }
}
module.exports = {
    getFromTest,
    postEcho
}