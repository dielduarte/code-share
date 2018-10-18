import uploadFiles from 'codesandbox/lib/utils/parse-sandbox/upload-files';

import { config } from '../../resources/config';
import { ShareService } from '../definitions/shareServices.interface';
import { FilesManager } from '../filesManager.service';
import { Http } from './../http.service';
import { UtilsService } from './../utils.service';
import { CodeSandBoxApi } from './definitions/codeSandBox.api.interface';

const SANDBOX_ID = 'sandbox_id';

export class CodeSandBox implements ShareService {
  private apiUrl: string = config.codeSandBox.apiUrl;

  public async shareProject() {
    FilesManager.getFiles().then(files => {
      if (files && files.files) {
        uploadFiles(files.uploads).then(resultUpload => {
          this.sendToCodeSandbox(files);
        });
      } else {
        UtilsService.showMessage('No files found. Please, try again.');
      }
    });
  }

  public shareFile(): void | boolean {
    const projectFile = FilesManager.getCurrentFile();
    if (!projectFile) {
      UtilsService.showMessage('No file found. Please, try again.');

      return;
    }

    const parameterApi: any = { files: { ...projectFile } };

    this.sendToCodeSandbox(parameterApi);
  }

  async sendToCodeSandbox(parameterApi: any) {
    try {
      UtilsService.setStatusBarMessage('sending your code to CodeSandbox...');

      const response = await Http.post<CodeSandBoxApi>(
        this.apiUrl,
        parameterApi
      );
      UtilsService.setStatusBarMessage(
        'Your code was sent to CodeSandbox with success!'
      );
      UtilsService.openProject(
        `${config.codeSandBox.shareUrl}${response.data[SANDBOX_ID]}`
      );
    } catch (err) {
      throw Error(err);
      UtilsService.showMessage(
        'Something bad happened trying to create the project. Please, try again.'
      );
      UtilsService.showMessage(err.message);
    }
  }
}
