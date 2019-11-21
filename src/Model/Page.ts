import 'reflect-metadata';
import { jsonObject, jsonMember } from 'typedjson';

@jsonObject
export default class Page {
  @jsonMember
  public title: string;

  @jsonMember
  public path: string;
}
