import express from 'express';

import { AppContext } from './Shared/Infrastructure/AppContext';


const app = express();
app.use(express.json());


AppContext.eventSetup();

const userController = AppContext.getUserController();
const autController  = AppContext.getAuthController();



/**
 * RUTAS PÚBLICAS
 */
app.post('/users', (req, res) => userController.create(req, res));
app.post('/auth/login', (req,res) => autController.login(req,res));

/**
 * RUTAS PRIVADAS
 */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});