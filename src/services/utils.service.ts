import * as vscode from 'vscode';

import { messages } from './../resources/messages';
import { vscommands } from './../resources/vscode.commands';

export class UtilsService {
  static openProject(url: string) {
    UtilsService.showMessage(messages.project_successful_created);
    vscode.commands.executeCommand(
      vscommands.vscode.open,
      vscode.Uri.parse(url)
    );
  }

  static showMessage(message: string) {
    vscode.window.showInformationMessage(message);
  }

  static getFinalPath(
    currentPath: string,
    rootPath: string | undefined
  ): string {
    const currentPathSplited = currentPath.split('/');
    const rootPathSplited = rootPath && rootPath.split('/');

    return currentPathSplited
      .filter(fileName => {
        if (rootPathSplited) {
          return !rootPathSplited.includes(fileName);
        }

        return false;
      })
      .join('/');
  }
}
