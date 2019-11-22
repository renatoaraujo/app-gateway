import * as fs from 'fs';
import Page from '../Model/Page';
import { TypedJSON } from 'typedjson';
import RootPath from 'app-root-path';
import Logger from "../Infrastructure/Decorator/Logger";
import * as path from "path";

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
      const filePath = path.join(RootPath.toString(), 'cms', 'pages', this.pageName + '.json');
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const serializer = new TypedJSON(Page);
      const page = serializer.parse(fileContents);

      if (page instanceof Page) {
        this.page = page;
      }
    } catch(err) {
      this.logger.addError(err);
    }
  }
}
