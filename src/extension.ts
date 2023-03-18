import * as vscode from 'vscode';

function removeStrings() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const document = editor.document;
  const text = document.getText();

  const newText = text.replace(/console\.log\(.+\);/g, '');

  if (newText !== text) {
    const edit = new vscode.WorkspaceEdit();
    const fullRange = new vscode.Range(0, 0, document.lineCount, 0);
    edit.replace(document.uri, fullRange, newText);
    vscode.workspace.applyEdit(edit);
  }
}

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('regression-omitter.removeStrings', removeStrings);
	context.subscriptions.push(disposable);
}
