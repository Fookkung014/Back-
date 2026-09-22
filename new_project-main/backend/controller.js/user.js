const db = require('../db')



exports.getUser = async (req,res)=>{
    try {
        const [row] = await db.query(`SELECT * from user`)
        res.status(200).json({
            status:true,
            data:row
        })
    } catch (error) {
        res.status(500).json({
            status:false,
            message:error.message
        })
    }
}