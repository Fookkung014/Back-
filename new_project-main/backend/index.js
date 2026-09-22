


const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());

//  เรียกใช้งาน Route
const authRoute = require('./router/auth');
app.use('/api', authRoute);

const user = require('./router/user')
app.use('/api',user)


//  เริ่มต้น Server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
