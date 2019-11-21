import * as fs from 'fs';
import Page from '../Model/Page';
import { TypedJSON } from 'typedjson';

export default class PageResolver {
  pageName: string;
  page: Page = new Page();

  constructor(pageName: string) {
    this.pageName = pageName;
    this.readConfiguration();
  }

  private readConfiguration() {
    const appRoot = require('app-root-path');
    const fileContents = fs.readFileSync(appRoot + '/cms/pages/' + this.pageName + '.json', 'utf8');
    const serializer = new TypedJSON(Page);

    let page = serializer.parse(fileContents);

    if (page instanceof Page) {
      this.page = page;
    }
  }

  public getPageData(): Page {
    return this.page
  }
}
