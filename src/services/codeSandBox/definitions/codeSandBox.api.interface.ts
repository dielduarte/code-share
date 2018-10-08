export interface CodeSandBoxApi {
    files: { 
        [key: string]: {
            content: any;
            [key: string]: any;
        } 
    };
}