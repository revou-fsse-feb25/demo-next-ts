"use client";

import { useState } from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "typescript",
  title,
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
      {title && (
        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 font-mono text-sm text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
          {title}
        </div>
      )}
      <div className="relative">
        <Highlight
          theme={isDark ? themes.nightOwl : themes.github}
          code={code.trim()}
          language={language as Language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} p-4 overflow-x-auto text-sm`}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {showLineNumbers && (
                    <span className="inline-block w-6 mr-4 text-right opacity-50 select-none">
                      {i + 1}
                    </span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
};

export default CodeBlock;
