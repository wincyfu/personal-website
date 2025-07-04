'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-6 mt-8" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mb-4 mt-6" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-bold mb-3 mt-5" {...props} />,
          p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4"
              {...props}
            />
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="relative my-4">
                <pre className="rounded bg-gray-100 dark:bg-gray-800 p-4 overflow-x-auto">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            ) : (
              <code
                className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
          img: ({ node, ...props }) => (
            <img
              className="max-w-full h-auto my-4 rounded shadow-md"
              alt={props.alt || ""}
              {...props}
            />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left font-bold border border-gray-300 dark:border-gray-700"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="px-4 py-2 border border-gray-300 dark:border-gray-700"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer; 