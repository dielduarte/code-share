import { config } from '../../resources/config';
import { ShareService } from '../definitions/shareServices.interface';
import { FilesManager } from '../filesManager.service';
import { Http } from './../http.service';
import { UtilsService } from './../utils.service';
import { CodeSandBoxApi } from './definitions/codeSandBox.api.interface';
import { getParameters } from 'codesandbox/lib/api/define';

const SANDBOX_ID = 'sandbox_id';

export class CodeSandBox implements ShareService {
  private apiUrl: string = config.codeSandBox.apiUrl;

  public shareProject(): void | boolean {
    const files = FilesManager.getFiles();
    if (!files) {
      UtilsService.showMessage('No files found. Please, try again.');

      return;
    }

    const parameterApi: any = getParameters({
      files,
    });

    Http.post<CodeSandBoxApi>(this.apiUrl, parameterApi)
      .then(response => {
        UtilsService.openProject(
          `${config.codeSandBox.shareUrl}${response.data[SANDBOX_ID]}`
        );
      })
      .catch(err => {
        UtilsService.showMessage(
          'Something bad happened trying to create the project. Please, try again.'
        );
      });
  }
}
