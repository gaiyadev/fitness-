import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

@Injectable()
export class EmailTemplateProvider {
  async renderTemplate(templatePath: string, data: any): Promise<string> {
    const template = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = handlebars.compile(template);
    return compiledTemplate(data);
  }
}
