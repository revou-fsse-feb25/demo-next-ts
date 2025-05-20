"use client";

import { useState, useEffect } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({
  code,
  language = "javascript",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only showing copy button after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 px-4 py-2 flex justify-between items-center"
        style={{
          backgroundColor: "var(--code-bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span className="text-xs font-semibold text-secondary">{language}</span>
        {mounted && (
          <button
            onClick={handleCopy}
            className="bg-opacity-80 hover:bg-opacity-100 text-secondary hover:text-primary px-2 py-1 rounded text-xs transition-all flex items-center"
            style={{
              backgroundColor: "var(--card-bg)",
            }}
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 mr-1 text-success"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 mr-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.988 3.012A2.25 2.25 0 0118 5.25v6.5A2.25 2.25 0 0115.75 14H13.5V7A2.5 2.5 0 0011 4.5H8.128a2.252 2.252 0 011.884-1.488A2.25 2.25 0 0112.25 1h1.5a2.25 2.25 0 012.238 2.012zM11.5 3.25a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v.25h-3v-.25z"
                  />
                  <path d="M2 7.25A2.25 2.25 0 014.25 5h3.5A2.25 2.25 0 0110 7.25v9.5A2.25 2.25 0 017.75 19h-3.5A2.25 2.25 0 012 16.75v-9.5z" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>
      <pre
        className={`language-${language} p-4 pt-12 rounded overflow-auto max-h-[500px] text-sm`}
        style={{
          backgroundColor: "var(--code-bg)",
          color: "var(--code-text)",
          border: "1px solid var(--border)",
        }}
      >
        <code className="block whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}
