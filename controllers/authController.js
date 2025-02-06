const path = require('path');
const users = require('../data/users');

exports.showLogin = (req, res) => {
    if (req.session.user) {
        return res.json({ message: 'Ya estás logueado', user: req.session.user });
    }
    res.status(200).sendFile(path.join(__dirname, '../public/login.html'));
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }

    req.session.user = user;
    res.json({ message: 'Login exitoso', user });
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.json({ message: 'Sesión cerrada' });
    });
};
