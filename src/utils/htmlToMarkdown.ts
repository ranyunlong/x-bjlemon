import html2Md from 'html2markdown';

export function htmlToMarkdown(html: string) {
    return html2Md(html);
}