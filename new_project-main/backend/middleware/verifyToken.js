const jwt = require('jsonwebtoken')

function verifyToken(...role) {
    return (req, res, next) => {
        const authHeader = req.header('authorization');
        const token = authHeader && authHeader.split(' ')[1];
        // console.log(authHeader)
        // console.log(token)
        if (!token) {
            return res.status(401).json({
                status: false,
                message: 'กรุณาเข้าสู่ระบบ'
            })
        }
        try {
            const decode = jwt.verify(token, 'KEY')
            req.user = decode
            if (role.length > 0 && !role.includes(req.user.role)) {
                return res.status(401).json({
                    status: false,
                    message: 'ไม่มีสิทธ์เข้านะ'
                })
            }
            next();
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'เกิดข้อผิดพลาด'
            })
        }
        // console.log(authHeader)
        ;
    }
}


module.exports = verifyToken;