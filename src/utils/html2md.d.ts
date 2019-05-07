declare module 'html2markdown' {
    export default (html: string): string => {}
}

declare module 'html-markdown' {
    export  const  html2mdFromString: (value: string) => string;
    export  const  html2mdFromURL: (url: string, value: string) => string;
    export  const  html2mdFromPath: (url: string, value: string) => string;
}