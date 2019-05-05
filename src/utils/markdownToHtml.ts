import MarkdownIt from 'markdown-it'

export function markdownToHtml(str: string) {
    const md = new MarkdownIt()
    return md.render(str)
}