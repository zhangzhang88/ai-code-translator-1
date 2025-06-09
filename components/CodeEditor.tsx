import { FC } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { php } from '@codemirror/lang-php';
import { rust } from '@codemirror/lang-rust';
import { sql } from '@codemirror/lang-sql';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { xml } from '@codemirror/lang-xml';
import { markdown } from '@codemirror/lang-markdown';

interface Props {
  code: string;
  language: string;
  loading?: boolean;
  onChange?: (value: string) => void;
}

const languageMap: { [key: string]: any } = {
  'JavaScript': javascript,
  'TypeScript': () => javascript({ typescript: true }),
  'JSX': () => javascript({ jsx: true }),
  'TSX': () => javascript({ jsx: true, typescript: true }),
  'Python': python,
  'Java': java,
  'C': cpp,
  'C++': cpp,
  'PHP': php,
  'Rust': rust,
  'SQL': sql,
  'HTML': html,
  'CSS': css,
  'JSON': json,
  'XML': xml,
  'Vue': xml,
  'Markdown': markdown,
  // 对于其他语言，我们暂时使用 javascript 作为默认的语法高亮
  'Go': javascript,
  'C#': javascript,
  'Ruby': javascript,
  'Swift': javascript,
  'Kotlin': javascript,
  'R': javascript,
  'Perl': javascript,
  'Scala': javascript,
  'Dart': javascript,
  'Haskell': javascript,
  'Lua': javascript,
  'Julia': javascript,
  'Bash': javascript,
  'PowerShell': javascript,
  'Natural Language': markdown
};

export const CodeEditor: FC<Props> = ({
  code,
  language,
  loading = false,
  onChange = () => {},
}) => {
  // 获取语言对应的扩展，如果没有找到对应的语言，使用 javascript
  const getLanguageExtension = (lang: string) => {
    const langFunction = languageMap[lang];
    if (!langFunction) return [javascript()];
    
    try {
      return [langFunction()];
    } catch {
      return [javascript()];
    }
  };

  return (
    <div className="min-h-[500px] w-full overflow-hidden rounded-md border border-gray-700">
      <CodeMirror
        value={code}
        theme={tokyoNight}
        extensions={getLanguageExtension(language)}
        onChange={onChange}
        editable={!loading}
        placeholder={loading ? "Translating..." : "Enter your code here..."}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
}; 