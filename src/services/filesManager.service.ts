import * as fs from 'fs';
import * as vscode from 'vscode';

import { config } from './../resources/config';

const pathsToIgnore: Array<String> = ['node_modules'];

export class FilesManager {
  static getFiles(
    dirname?: string,
    allFiles?: { [file: string]: { content: string } }
  ) {
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

        _allFiles[path] = { content };
      }

      return _allFiles;
    } catch (e) {
      console.log(e);
    }
  }
}
