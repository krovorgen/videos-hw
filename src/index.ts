import express, { Request, Response } from 'express';
import cors from 'cors';

import { videosRouter } from './routes/videos-routes';

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello: World!');
});

app.use('/api/videos', videosRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
