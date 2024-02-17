require('dotenv').config()

const emp_analytics = async (req,res) => {
    try {
        
    } catch (error) {
        console.log("Error in task assign")
        res.status(500).json({status:false,data:"Error in emp_analytics"})
    }
}

module.exports = {
    emp_analytics
}