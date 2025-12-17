import express from 'express';

import { AppContext } from './Shared/Infrastructure/AppContext';


const app = express();
app.use(express.json());

const userController     = AppContext.getUserController();

app.post('/users', (req, res) => userController.create(req, res));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});