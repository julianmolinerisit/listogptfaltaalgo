import express from 'express';
import { makeRequest } from './operations.js';
import config from './config.js';
import ejs from 'ejs';

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/historia', async (req, res) => {
  try {
    const nombre = req.query.nombre;
    const escenario = req.query.escenario;
    const prompt = `Construye una historia de no mas de tres oraciones con ${nombre} y... ${escenario}.`;
    const response = await makeRequest(prompt);
    res.render('historia', { prompt, response });
  } catch (error) {
    res.send(error.message);
  }
});




app.get('/data', (req, res) => {
  const latestSubmissions = submissions.slice(Math.max(submissions.length - 5, 0));
  res.render('data', { data: latestSubmissions });
});

app.post('/submit', async (req, res) => {
  const nombre = req.body.nombre;
  const escenario = req.body.escenario;

  const prompt = `Construye una historia de no mas de tres oraciones con ${nombre} y... ${escenario}.`;

  try {
    const response = await makeRequest(prompt);
    res.render('submit', { prompt, response });
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
