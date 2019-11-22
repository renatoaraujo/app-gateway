import { Request, Response, NextFunction } from 'express';
import PageResolver from '../Resolver/PageResolver';

export default class HomeController {
  async get(req: Request, res: Response, next: NextFunction) {

    try {
      const pageResolver = new PageResolver('home');
      await pageResolver.resolve();
      const page = pageResolver.page;

      res.status(200).render('home', {
        title: page.title,
        components: page.components
      });
    } catch (e) {
      next(e)
    }
  }
}
