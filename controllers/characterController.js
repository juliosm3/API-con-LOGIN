const axios = require('axios');
const path = require('path');

exports.getAllCharacters = async (req, res) => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los personajes' });
    }
};

exports.searchCharacter = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/search.html'));
};

exports.getCharacterByName = async (req, res) => {
    try {
        const { name } = req.params;
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);

        if (response.data.results.length > 0) {
            res.json(response.data.results[0]);
        } else {
            res.status(404).json({ error: 'Personaje no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el personaje' });
    }
};
