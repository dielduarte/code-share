import * as fs from 'fs';
import * as vscode from 'vscode';

import { config } from './../resources/config';
import { IFiles } from 'codesandbox-import-utils/lib/api/define';
import { UtilsService } from './utils.service';

const pathsToIgnore: Array<String> = ['node_modules', '.git'];
const projectFiles: IFiles = {};

export class FilesManager {
  static getFiles(relativePath?: string) {
    try {
      const rootPath = vscode.workspace.rootPath;

      const dir = relativePath ? relativePath : rootPath || '';
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const path = dir + '/' + file;

        if (pathsToIgnore.includes(file)) continue;

        if (fs.statSync(path).isDirectory()) {
          this.getFiles(path);
          continue;
        }

        const content = fs.readFileSync(path, {
          encoding: config.defaultEncondig,
        });

        const finalPath = UtilsService.getFinalPath(path, rootPath);
        projectFiles[finalPath] = { content, isBinary: false };
      }

      return projectFiles;
    } catch (e) {
      console.log(e);
    }
  }
}
