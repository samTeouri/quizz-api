import { app } from './app';
import * as database from './config/database';
import * as http from 'http';

database.connect();
const httpServer = http.createServer(app);
const port = process.env.PORT;

httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
})