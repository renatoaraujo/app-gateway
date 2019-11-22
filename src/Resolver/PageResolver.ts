import * as fs from 'fs';
import Page from '../Model/Page';
import { TypedJSON } from 'typedjson';
import * as appRoot from 'app-root-path';

export default class PageResolver {
  pageName: string;
  page: Page = new Page();

  constructor(pageName: string) {
    this.pageName = pageName;
    this.readConfiguration();
  }

  private readConfiguration() {
    const fileContents = fs.readFileSync(appRoot + '/cms/pages/' + this.pageName + '.json', 'utf8');

    try {
      const serializer = new TypedJSON(Page);
      const page = serializer.parse(fileContents);
      if (page instanceof Page) {
        this.page = page;
      }
    } catch(err) {
      console.error(err);
    }
  }

  public getPageData(): Page {
    return this.page
  }
}
