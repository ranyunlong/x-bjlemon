import codeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';

import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'

import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/xml/xml'

import 'codemirror/mode/clike/clike'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/jsx/jsx'

import 'codemirror/addon/comment/comment'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/continuelist'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/matchtags'
import 'codemirror/keymap/sublime'

import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'

import 'codemirror/addon/selection/active-line'
import 'codemirror/theme/monokai.css'

import React, { CSSProperties, PureComponent } from 'react'
import PropTypes from 'prop-types'


class CodeMirror extends PureComponent<ICodeMirrorProps, ICodeMirrorState> {

    readonly state: ICodeMirrorState = {
        value: ''
    }

    public editor!: codeMirror.Editor;

    public render() {
        const { style = {}, className } = this.props
        return (
            <div
                style={{
                    lineHeight: '22px',
                    ...style
                }}
                ref="editor"
                className={className}
            >
            </div>
        )
    }

    public componentDidMount() {
        const editorElement = this.refs.editor as HTMLDivElement;
        const { width, height } = this.props
        this.editor = codeMirror(editorElement, {
            mode: 'markdown',                    // 显示模式
            theme: 'monokai',                   // 主题
            styleActiveLine: true,               // 高亮当前输入行
            lineWrapping: true,                 // 自动换行
            lineNumbers: true,                   // 显示行number
            keyMap: 'sublime',                   // sublime快捷键
            autoCloseTags: true,                 // 自动闭合标签
            matchTags: true,                     // 选中标签
            matchBrackets: true,                 // 括号匹配
            autoCloseBrackets: `true`,            // 括号自动补全
            scrollbarStyle:'simple',
            value: this.props.value || '',
            extraKeys:{ "Enter": "newlineAndIndentContinueMarkdownList" }
        })
        this.editor.setSize(width || '100%', height || '100%')
        setTimeout(() => {
            this.editor.refresh()
        }, 0);
        this.editor.on('blur', (editor) => {
            if ( typeof this.props.onBlur === 'function') {
                this.props.onBlur(editor.getValue())
                this.setState({
                    value: editor.getValue()
                })
            }
        })
        this.editor.on('change', (editor) => {
            if ( typeof this.props.onChange === 'function') {
                this.props.onChange(editor.getValue())
                this.setState({
                    value: editor.getValue()
                })
            }
        })
    }

    public componentWillUpdate(nextProps: Readonly<ICodeMirrorProps>, nextState: Readonly<ICodeMirrorState>) {
        if (this.props.value !== nextProps.value) {
            this.editor.setValue(nextProps.value as string);
            setTimeout(() => {
                this.editor.refresh() 
            }, 0);
        }
    }

    static propTypes = {
        width: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        height: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        value: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object
    }

}

export interface ICodeMirrorProps {
    value?: string;
    width?: string | number;
    height?: string | number;
    className?: string;
    onChange?: (value: string) => void;
    onBlur?:  (value: string) => void;
    style?: CSSProperties;
}
export interface ICodeMirrorState {
    value: string;
}
export default CodeMirror