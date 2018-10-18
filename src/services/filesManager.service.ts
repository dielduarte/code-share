import { IFiles } from 'codesandbox-import-utils/lib/api/define';
import parseSandbox from 'codesandbox/lib/utils/parse-sandbox/';
import * as fs from 'fs';
import * as vscode from 'vscode';

import { config } from './../resources/config';

export class FilesManager {
  static projectFiles: IFiles = {};

  static async getFiles(relativePath?: string) {
    try {
      const rootPath = vscode.workspace.rootPath || '';
      return await parseSandbox(rootPath);
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
