export interface CodeSandBoxApi {
  files: {
    [key: string]: {
      content: any;
    };
  };
}
