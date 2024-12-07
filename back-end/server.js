import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json({ limit: "10MB" }));
//app.options('*', middlewares.cors);
//app.use(middlewares.cors);
app.use(morgan('dev'));

// Routes
app.get('/api', (req, res) => {
    res.send([{ msg: 'Hello World Damm son!!'}]);
})



// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})