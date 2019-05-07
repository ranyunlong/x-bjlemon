import html2Md from 'html2markdown';
import htmlMd from 'html-markdown';

export function htmlToMarkdown(html: string) {
    return html2Md(html);
}


export function htmlToMarkdown2(html: string) {
    return htmlMd.html2mdFromString(html);
}
