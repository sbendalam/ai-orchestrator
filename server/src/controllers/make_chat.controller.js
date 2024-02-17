require('dotenv').config()

const make_chat = async (req,res) => {
    try {
        const empId = req.params.empId
        
    } catch (error) {
        console.log("Error in task assign")
        res.status(500).json({status:false,data:"Error in makeChat"})
    }
}

module.exports = {
    make_chat
}