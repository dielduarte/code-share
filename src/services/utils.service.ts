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
}
