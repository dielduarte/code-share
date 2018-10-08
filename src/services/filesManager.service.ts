import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import { config } from './../resources/config';
import { PackageJson } from './definitions/packageJson.interface';

export class FilesManager {
  static get PackageJson(): PackageJson {
    const packageJsonPath = path.join(
      vscode.workspace.rootPath || '',
      config.packageJson
    );
    return JSON.parse(
      fs.readFileSync(packageJsonPath, { encoding: config.defaultEncondig })
    );
  }
}
