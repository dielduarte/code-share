import * as fs from 'fs';
import * as vscode from 'vscode';

import { config } from './../resources/config';
import { IFiles } from 'codesandbox-import-utils/lib/api/define';

const pathsToIgnore: Array<String> = ['node_modules'];

export class FilesManager {
  static getFiles(dirname?: string, allFiles?: IFiles) {
    try {
      const dir = dirname ? dirname : vscode.workspace.rootPath || '';
      const files = fs.readdirSync(dir);
      const _allFiles = allFiles || {};

      for (const file of files) {
        const path = dir + '/' + file;

        if (pathsToIgnore.includes(file)) continue;

        if (fs.statSync(path).isDirectory()) {
          this.getFiles(path, _allFiles);
          continue;
        }

        const content = JSON.stringify(
          fs.readFileSync(path, {
            encoding: config.defaultEncondig,
          })
        );

        //TODO check if the file is binary
        _allFiles[path] = { content, isBinary: false };
      }

      return _allFiles;
    } catch (e) {
      console.log(e);
    }
  }
}
