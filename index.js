const express = require('express');
const cors = require('cors');
const sessionsRouter = require('./routes/sessions');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', sessionsRouter); // Įkeliamas maršrutų failas

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
