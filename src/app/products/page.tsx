import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// Define metadata for this page
export const metadata: Metadata = {
  title: "TypeScript Features | Next.js Demo",
  description: "Examples of TypeScript features in Next.js",
};

// Type-safe examples with proper interfaces
interface FeatureDemo {
  id: string;
  title: string;
  description: string;
  codeExample: string;
  linkUrl: string;
  linkText: string;
}

// Sample data with TypeScript examples
const typescriptDemos: FeatureDemo[] = [
  {
    id: "type-safe-props",
    title: "Type-Safe Props",
    description: "Components with strictly typed props ensure correct usage and prevent errors.",
    codeExample: `interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({ 
  text, 
  onClick, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  // Implementation
}`,
    linkUrl: "/posts/type-safe-props",
    linkText: "Learn more about type-safe props",
  },
  {
    id: "typed-routing",
    title: "Type-Safe Routing",
    description: "Define and enforce type safety for route parameters in Next.js.",
    codeExample: `// Define parameter types
interface PostParams {
  params: {
    slug: string;
  };
}

// Use typed parameters
export default function Post({ 
  params 
}: PostParams) {
  const { slug } = params;
  // Implementation
}`,
    linkUrl: "/posts/type-safe-routing-in-nextjs",
    linkText: "Learn more about type-safe routing",
  },
  {
    id: "image-optimization",
    title: "Image Optimization with TypeScript",
    description: "Properly typed Image components with all required properties.",
    codeExample: `import Image from 'next/image';

// Type-safe Image component usage
<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority
  quality={85}
  placeholder="blur"
/>`,
    linkUrl: "/posts/image-optimization",
    linkText: "Learn about Image optimization",
  },
  {
    id: "seo-metadata",
    title: "TypeScript with SEO Metadata",
    description: "Type-safe metadata API for better SEO in Next.js.",
    codeExample: `import { Metadata } from 'next';

// Typed metadata export
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    images: '/og-image.jpg',
  },
};`,
    linkUrl: "/posts/seo-metadata",
    linkText: "Learn about SEO with TypeScript",
  },
];

// Type-safe component with interface
interface CodeBlockProps {
  code: string;
  language?: string;
}

function CodeBlock({ code, language = "typescript" }: CodeBlockProps) {
  return (
    <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-sm">
      <code>{code}</code>
    </pre>
  );
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className="text-blue-400 hover:text-blue-300">
          ← Back to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">TypeScript Features in Next.js</h1>
      <p className="text-gray-300 mb-8 max-w-3xl">
        This page demonstrates type-safety features in Next.js with TypeScript, 
        showing practical examples of how TypeScript improves development
        experience and code quality.
      </p>

      <div className="space-y-12">
        {typescriptDemos.map((demo) => (
          <section key={demo.id} className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{demo.title}</h2>
            <p className="text-gray-300 mb-6">{demo.description}</p>
            
            <CodeBlock code={demo.codeExample} />
            
            <div className="mt-6">
              <Link 
                href={demo.linkUrl} 
                className="text-blue-400 hover:text-blue-300"
              >
                {demo.linkText} →
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
