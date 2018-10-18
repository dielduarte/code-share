import { IFiles } from 'codesandbox-import-utils/lib/api/define';
import * as fs from 'fs';
import * as vscode from 'vscode';

import { config } from './../resources/config';
import { UtilsService } from './utils.service';

export class FilesManager {
  static projectFiles: IFiles = {};

  static getFiles(relativePath?: string) {
    try {
      const rootPath = vscode.workspace.rootPath;

      const dir = relativePath ? relativePath : rootPath || '';
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const path = `${dir}/${file}`;

        if (config.ignore.includes(file)) {
          continue;
        }

        if (fs.statSync(path).isDirectory()) {
          this.getFiles(path);
          continue;
        }

        const content = fs.readFileSync(path, {
          encoding: config.defaultEncondig,
        });

        const finalPath = UtilsService.getFinalPath(path, rootPath);
        FilesManager.projectFiles[finalPath] = { content, isBinary: false };
      }

      return FilesManager.projectFiles;
    } catch (e) {
      console.log(e);
    }
  }

  static getCurrentFile() {
    try {
      const currentFilePath =
        vscode.window.activeTextEditor &&
        vscode.window.activeTextEditor.document.fileName;
      const filePath = currentFilePath ? currentFilePath : '';

      const content = fs.readFileSync(filePath, {
        encoding: config.defaultEncondig,
      });

      if (filePath) {
        const filePathSplited = filePath.split('/');
        const lastIndex = filePathSplited.length - 1;
        const fileName = filePathSplited[lastIndex];

        return {
          [fileName]: { content, isBinary: false },
          'package.json': {
            content: { main: `./${fileName}`, dependencies: {} },
          },
        };
      }

      return false;
    } catch (e) {
      console.log(e);
    }
  }
}
