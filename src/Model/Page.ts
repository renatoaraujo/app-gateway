import 'reflect-metadata';
import { jsonObject, jsonMember, jsonArrayMember } from 'typedjson';
import Component from "./Component";

@jsonObject
export default class Page {
  @jsonMember({ constructor: String })
  public title: string = '';

  @jsonMember({ constructor: String })
  public path: string = '';

  @jsonArrayMember(Component)
  public components: Component[] = [];
}
