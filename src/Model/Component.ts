import 'reflect-metadata';
import { jsonObject, jsonMember } from 'typedjson';
import fetch from 'node-fetch';

@jsonObject
export default class Component {
  @jsonMember({ constructor: String })
  public name: string = '';

  @jsonMember({ constructor: String })
  public uri: string = '';

  public content: string = '';

  async loadContent() {
    await fetch(this.uri)
      .then((response) => {
        return response.text();
      })
      .then((content) => {
        this.content = content;
      });
  }
}
