import { Request, Response } from 'express';
import PageResolver from '../Resolver/PageResolver';

export default class HomeController {
  public get(req: Request, res: Response) {

    const pageResolver = new PageResolver('home');
    const page = pageResolver.getPageData();

    res.status(200).render('home', {
      title: page.title,
    });
  }
}
