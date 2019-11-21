import { Request, Response } from 'express';

export default class HomeController {
  public get(req: Request, res: Response) {
    res.status(200).render('home', {
      title: 'Home',
    });
  }
}
