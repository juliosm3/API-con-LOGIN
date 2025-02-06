const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const characterRoutes = require('./routes/characterRoutes');

const app = express();
const PORT = 3000;

app.use(
    session({
        secret: 'tu_secreto_super_secreto',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRoutes);
app.use('/characters', characterRoutes);

app.listen(PORT, () => {
    console.log(`El servidor está escuchando en http://localhost:${PORT}`);
});
