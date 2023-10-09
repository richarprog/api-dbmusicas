const { Sequelize } = require('sequelize');
const Musica = require('../models/musicamissaModel');

module.exports = class musicaController {
  //Create - Cadastrar música
  static async MusicaCreate(req, res) {
    let titulo = req.body.titulo.toUpperCase();
    let autor = req.body.autor;
    let estrofe1 = req.body.estrofe1;
    let estrofe2 = req.body.estrofe2;
    let estrofe3 = req.body.estrofe3; 
    let estrofe4 = req.body.estrofe4;
    let estrofe5 = req.body.estrofe5;
    let refrao = req.body.refrao;
    let momento = req.body.momento;

    const musica = {
      titulo: titulo,
      autor: autor,
      estrofe1: estrofe1,
      estrofe2: estrofe2,
      estrofe3: estrofe3,
      estrofe4: estrofe4,
      estrofe5: estrofe5,
      refrao: refrao,
      momento: momento
    }
    await Musica.create(musica);
    res.json({ message: "Música cadastrada com sucesso" });
  };

  //Read - Listar /musicas
  static async mostrarMusicasComPalavraChave(req, res) {
    try {
      const palavrasChave = req.query.palavrasChave;
  
      if (!palavrasChave) {
        return res.status(404).json({ message: 'Por favor, forneça palavras-chave para a busca.' });
      }
  
      const musicas = await Musica.findAll({
        where: {
          [Sequelize.Op.or]: [
            { titulo: { [Sequelize.Op.like]: `%${palavrasChave}%` } },
            { autor: { [Sequelize.Op.like]: `%${palavrasChave}%` } },
            { estrofe1: { [Sequelize.Op.like]: `%${palavrasChave}%` } },
            { estrofe2: { [Sequelize.Op.like]: `%${palavrasChave}%` } },
            { estrofe3: { [Sequelize.Op.like]: `%${palavrasChave}%` } },
            { estrofe4: { [Sequelize.Op.like]: `%${palavrasChave}%` } },
            { estrofe5: { [Sequelize.Op.like]: `%${palavrasChave}%` } },
            { refrao: { [Sequelize.Op.like]: `%${palavrasChave}%` } },
            { momento: { [Sequelize.Op.like]: `%${palavrasChave}%` } },
          ]
        }
      });
  
      if (!musicas || musicas.length === 0) {
        return res.status(404).json({ message: 'Nenhuma música encontrada para as palavras-chave fornecidas.' });
      }
  
      // Renderize os detalhes das músicas em HTML
      const html = `
  <html>
    <head>
      <title>Músicas com Palavra-chave: ${palavrasChave}</title>
    </head>
    <body>
      <h1>Músicas com a Palavra-chave: ${palavrasChave}</h1>
      <ul>
        ${musicas.map(musica => `
          <li>
            <h2 id="titulo">${musica.titulo}</h2>
            ${musica.autor ? `<p id="autor"><strong>Autor:</strong> ${musica.autor}</p>` : ''}
            ${musica.estrofe1 ? `<p id="estrofe1"><strong>Estrofe 1:</strong> ${musica.estrofe1}</p>` : ''}
            ${musica.estrofe2 ? `<p id="estrofe2"><strong>Estrofe 2:</strong> ${musica.estrofe2}</p>` : ''}
            ${musica.estrofe3 ? `<p id="estrofe3"><strong>Estrofe 3:</strong> ${musica.estrofe3}</p>` : ''}
            ${musica.estrofe4 ? `<p id="estrofe4"><strong>Estrofe 4:</strong> ${musica.estrofe4}</p>` : ''}
            ${musica.estrofe5 ? `<p id="estrofe5"><strong>Estrofe 5:</strong> ${musica.estrofe5}</p>` : ''}
            ${musica.refrao ? `<p id="refrao"><strong>Refrão:</strong> ${musica.refrao}</p>` : ''}
            ${musica.momento ? `<p id="momento"><strong>Momento:</strong> ${musica.momento}</p>` : ''}
          </li>
        `).join('')}
      </ul>      
    </body>
  </html>`;

  
      // Defina o cabeçalho Content-Type como text/html
      res.setHeader('Content-Type', 'text/html');
  
      // Envie a página HTML como resposta
      res.send(html);
    } catch (error) {
      console.error('Erro ao mostrar músicas com palavra-chave:', error);
      res.status(500).json({ message: 'Erro ao mostrar músicas com palavra-chave.' });
    }
  }


  //Delete - Excluir música
  static async MusicaDelete(req, res) {
    const id_musica = req.params.id;
    await Musica.destroy({ where: { id_musica: id_musica } });
    res.json({ message: "Música excluída com sucesso!" });
  }  
};
