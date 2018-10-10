import * as vscode from 'vscode';

import { CodeSandBox } from './services/codeSandBox/codeSandBox.service';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "code-share" is now active!');
  let disposable = vscode.commands.registerCommand(
    'codeshare.shareProject',
    () => {
      const shareService = new CodeSandBox();
      shareService.shareProject();
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
