import * as vscode from 'vscode';

import { CodeSandBox } from './services/codeSandBox/codeSandBox.service';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "code-share" is now active!');
  let shareProject = vscode.commands.registerCommand(
    'codeshare.shareProject',
    () => {
      const shareService = new CodeSandBox();
      shareService.shareProject();
    }
  );
  let shareFile = vscode.commands.registerCommand('codeshare.shareFile', () => {
    const shareService = new CodeSandBox();
    shareService.shareFile();
  });

  context.subscriptions.push(shareProject);
  context.subscriptions.push(shareFile);
}

export function deactivate() {}
