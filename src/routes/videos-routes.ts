import { Request, Response, Router } from 'express';
import { videosRepository } from '../repositories/videos-repository';
import { body } from 'express-validator';
import { inputValidatorMiddleware } from '../middlewares/input-validator-middleware';

export const videosRouter = Router({});

videosRouter
  .get('/', (req: Request, res: Response) => {
    res.send(videosRepository.getVideos());
  })
  .get('/:id', (req: Request, res: Response) => {
    const idVideo = req.params.id;
    res.send(videosRepository.getVideoById(+idVideo) ?? 404);
  })
  .delete('/:id', (req: Request, res: Response) => {
    const idVideo = req.params.id;
    if (videosRepository.deleteVideoById(+idVideo)) {
      res.send(204);
    } else {
      res.send(404);
    }
  })
  .put('/:id', (req: Request, res: Response) => {
    const idVideo = req.params.id;
    const isDeleted = videosRepository.updateVideoById(+idVideo, req.body.title);

    res.sendStatus(isDeleted ? 204 : 404);
  })
  .post(
    '/',
    body('title')
      .isLength({ max: 15 })
      .withMessage('Max 15 symbols')
      .matches(/^[\w ]*$/),
    inputValidatorMiddleware,
    (req: Request<{}, {}, { title: string }>, res: Response) => {
      const newVideo = videosRepository.createVideo(req.body.title);
      res.status(201).send(newVideo);
    }
  );
