import * as fs from 'fs';
import { TypedJSON } from 'typedjson';
import RootPath from 'app-root-path';
import * as path from 'path';
import Page from '../Model/Page';
import Logger from '../Infrastructure/Decorator/Logger';

export default class PageResolver {
  private readonly pageName: string;

  public page: Page = new Page();

  private readonly logger: Logger = new Logger();

  constructor(pageName: string) {
    this.pageName = pageName;
    this.setup();
  }

  private setup() {
    try {
      const fileName = `${this.pageName}.json`;
      const filePath = path.join(RootPath.toString(), 'cms', 'pages', fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const serializer = new TypedJSON(Page);
      const page = serializer.parse(fileContents);

      if (!(page instanceof Page)) {
        throw Error('Error on Page Setup');
      }

      this.page = page;
    } catch (err) {
      this.logger.addError(err);
    }
  }

  async resolve() {
    const promises = this.page.components.map(async (component) => {
      await component.loadContent();
    });

    await Promise.all(promises);
  }
}
