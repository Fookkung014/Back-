
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        // สร้างตัวแปรรับค่าข้อมูล
        const { username, password } = req.body;

        // 1. ตรวจสอบข้อมูลที่ส่งมา
        if (!username || !password) {
            return res.status(400).json({
                status: false,
                message: 'กรุณากรอก Username และ password'
            });
        }

        // 2. ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        const [row] = await db.query(`SELECT * FROM user WHERE username = ?`, [username]);
        if (row.length === 0) {
            return res.status(400).json({
                status: false,
                message: 'ไม่พบผู้ใช้งาน'
            });
        }

        // 3. ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, row[0].password);
        if (!isMatch) {
            return res.status(400).json({
                status: false,
                message: 'รหัสผ่านไม่ถูกต้อง'
            });
        } 

        // 4. เตรียมข้อมูล Payload
        const payload = {
            id: row[0].id,
            username: row[0].username,
            fname: row[0].fname,
            address: row[0].address,
            email: row[0].email,
            role: row[0].role,
            status: row[0].status,
        };

        // 5. สร้าง JWT Token (ใช้ jwt.sign และ expiresIn: '1d')
        const token = jwt.sign(payload, 'KEY', { expiresIn: '1d' });

        // 6. ส่ง Response กลับเมื่อสำเร็จ
        return res.status(200).json({
            status: true,
            data: payload,
            token: token
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์'
        });
    }
};

