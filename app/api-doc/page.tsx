"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, Code2, MessageSquare, Terminal, Brain, Users, Copy, Check, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/language-provider";

export default function ApiDocPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const isRTL = language === 'fa';
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    toast({
      title: t('copied'),
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const typescriptExample = `import axios from 'axios';

interface GenerateRequest {
  prompt: string;
  width?: number;
  height?: number;
}

interface GenerateResponse {
  imageData: string;
  translatedPrompt: string;
}

const response = await axios.post<GenerateResponse>("${apiUrl}/api/generate", {
  prompt: "A beautiful sunset over mountains",
  width: 1024,
  height: 768
});

console.log(response.data);`;

  const jsExample = `const response = await fetch("${apiUrl}/api/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    prompt: "A beautiful sunset over mountains",
    width: 1024,
    height: 768
  })
});

const data = await response.json();
console.log(data);`;

  const pythonExample = `import requests

url = "${apiUrl}/api/generate"
headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}
data = {
    "prompt": "A beautiful sunset over mountains",
    "width": 1024,
    "height": 768
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`;

  const htmlExample = `<!DOCTYPE html>
<html>
<head>
    <title>Dog AI Image Generator</title>
</head>
<body>
    <div id="result"></div>
    <script>
        async function generateImage() {
            const response = await fetch("${apiUrl}/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: "A beautiful sunset over mountains",
                    width: 1024,
                    height: 768
                })
            });
            
            const data = await response.json();
            const img = document.createElement('img');
            img.src = 'data:image/png;base64,' + data.imageData;
            document.getElementById('result').appendChild(img);
        }
    </script>
    <button onclick="generateImage()">Generate Image</button>
</body>
</html>`;

  const curlExample = `curl -X POST "${apiUrl}/api/generate" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -d '{
    "prompt": "A beautiful sunset over mountains",
    "width": 1024,
    "height": 768
  }'`;

  const enhanceTypescriptExample = `import axios from 'axios';

interface EnhanceRequest {
  prompt: string;
}

interface EnhanceResponse {
  enhancedPrompt: string;
}

const response = await axios.post<EnhanceResponse>("${apiUrl}/api/prompt", {
  prompt: "A beautiful sunset over mountains"
});

console.log(response.data);`;

  const enhanceJsExample = `const response = await fetch("${apiUrl}/api/prompt", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    prompt: "A beautiful sunset over mountains"
  })
});

const data = await response.json();
console.log(data);`;

  const enhancePythonExample = `import requests

url = "${apiUrl}/api/prompt"
headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}
data = {
    "prompt": "A beautiful sunset over mountains"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`;

  const enhanceCurlExample = `curl -X POST "${apiUrl}/api/prompt" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  -d '{
    "prompt": "A beautiful sunset over mountains"
  }'`;

  return (
    <div className="container mx-auto py-4 sm:py-8 px-4 max-w-4xl">
      <div dir={isRTL ? "rtl" : "ltr"} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-8 sm:mb-12">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent break-words" dir={isRTL ? "rtl" : "ltr"}>
            {t('apiDoc')}
          </h1>
        </div>
      </div>

      {/* Image Generation API */}
      <Card className="mb-8 border-2">
        <CardHeader className="border-b bg-muted/50">
          <CardTitle className="text-xl sm:text-2xl flex items-center gap-2" dir={isRTL ? "rtl" : "ltr"}>
            <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
            {t('imageGenerationApi')}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base" dir={isRTL ? "rtl" : "ltr"}>
            {t('imageGenerationApiDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <div dir={isRTL ? "rtl" : "ltr"} className="flex items-center gap-2 mb-2">
                <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                <h3 className="text-base sm:text-lg font-semibold" dir={isRTL ? "rtl" : "ltr"}>{t('endpoint')}</h3>
              </div>
              <div className="bg-muted p-3 sm:p-4 rounded-lg">
                <div dir="ltr" className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-green-500 text-white text-xs sm:text-sm rounded font-mono">POST</span>
                  <code className="text-xs sm:text-sm font-mono break-all" dir="ltr">{apiUrl}/api/generate</code>
                </div>
                <div dir="ltr" className="mt-2">
                  <h4 className="text-xs sm:text-sm font-semibold mb-1" dir={isRTL ? "rtl" : "ltr"}>{t('requiredHeaders')}</h4>
                  <div className="bg-background p-2 rounded">
                    <code className="text-xs sm:text-sm font-mono" dir="ltr">Content-Type: application/json</code>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div dir={isRTL ? "rtl" : "ltr"} className="flex items-center gap-2 mb-2">
                <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                <h3 className="text-base sm:text-lg font-semibold" dir={isRTL ? "rtl" : "ltr"}>{t('requestBody')}</h3>
              </div>
              <div className="bg-muted p-3 sm:p-4 rounded-lg">
                <pre className="text-xs sm:text-sm font-mono" dir="ltr">
                  {JSON.stringify({
                    prompt: "string",
                    width: "number (optional, default: 1024)",
                    height: "number (optional, default: 768)"
                  }, null, 2)}
                </pre>
              </div>
            </div>

            <div>
              <div dir={isRTL ? "rtl" : "ltr"} className="flex items-center gap-2 mb-2">
                <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                <h3 className="text-base sm:text-lg font-semibold" dir={isRTL ? "rtl" : "ltr"}>{t('exampleRequests')}</h3>
              </div>
              <Tabs defaultValue="typescript" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-4">
                  <TabsTrigger value="typescript" className="text-xs sm:text-sm">TypeScript</TabsTrigger>
                  <TabsTrigger value="javascript" className="text-xs sm:text-sm">JavaScript</TabsTrigger>
                  <TabsTrigger value="python" className="text-xs sm:text-sm">Python</TabsTrigger>
                  <TabsTrigger value="html" className="text-xs sm:text-sm">HTML</TabsTrigger>
                  <TabsTrigger value="curl" className="text-xs sm:text-sm">cURL</TabsTrigger>
                </TabsList>
                <TabsContent value="typescript" className="mt-0">
                  <div dir="ltr" className="rounded-lg overflow-hidden border relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6 sm:h-8 sm:w-8"
                      onClick={() => copyToClipboard(typescriptExample)}
                    >
                      {copied === typescriptExample ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                    <SyntaxHighlighter 
                      language="typescript" 
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.25rem'
                      }}
                    >
                      {typescriptExample}
                    </SyntaxHighlighter>
                  </div>
                </TabsContent>
                <TabsContent value="javascript" className="mt-0">
                  <div dir="ltr" className="rounded-lg overflow-hidden border relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6 sm:h-8 sm:w-8"
                      onClick={() => copyToClipboard(jsExample)}
                    >
                      {copied === jsExample ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                    <SyntaxHighlighter 
                      language="javascript" 
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.25rem'
                      }}
                    >
                      {jsExample}
                    </SyntaxHighlighter>
                  </div>
                </TabsContent>
                <TabsContent value="python" className="mt-0">
                  <div dir="ltr" className="rounded-lg overflow-hidden border relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6 sm:h-8 sm:w-8"
                      onClick={() => copyToClipboard(pythonExample)}
                    >
                      {copied === pythonExample ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                    <SyntaxHighlighter 
                      language="python" 
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.25rem'
                      }}
                    >
                      {pythonExample}
                    </SyntaxHighlighter>
                  </div>
                </TabsContent>
                <TabsContent value="html" className="mt-0">
                  <div dir="ltr" className="rounded-lg overflow-hidden border relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6 sm:h-8 sm:w-8"
                      onClick={() => copyToClipboard(htmlExample)}
                    >
                      {copied === htmlExample ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                    <SyntaxHighlighter 
                      language="html" 
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.25rem'
                      }}
                    >
                      {htmlExample}
                    </SyntaxHighlighter>
                  </div>
                </TabsContent>
                <TabsContent value="curl" className="mt-0">
                  <div dir="ltr" className="rounded-lg overflow-hidden border relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6 sm:h-8 sm:w-8"
                      onClick={() => copyToClipboard(curlExample)}
                    >
                      {copied === curlExample ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                    <SyntaxHighlighter 
                      language="bash" 
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.25rem'
                      }}
                    >
                      {curlExample}
                    </SyntaxHighlighter>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prompt Enhancement API */}
      <Card className="mb-8 border-2">
        <CardHeader className="border-b bg-muted/50">
          <CardTitle className="text-xl sm:text-2xl flex items-center gap-2" dir={isRTL ? "rtl" : "ltr"}>
            <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
            {t('promptEnhancementApi')}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base" dir={isRTL ? "rtl" : "ltr"}>
            {t('promptEnhancementApiDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <div dir={isRTL ? "rtl" : "ltr"} className="flex items-center gap-2 mb-2">
                <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                <h3 className="text-base sm:text-lg font-semibold" dir={isRTL ? "rtl" : "ltr"}>{t('endpoint')}</h3>
              </div>
              <div className="bg-muted p-3 sm:p-4 rounded-lg">
                <div dir="ltr" className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-green-500 text-white text-xs sm:text-sm rounded font-mono">POST</span>
                  <code className="text-xs sm:text-sm font-mono break-all" dir="ltr">{apiUrl}/api/prompt</code>
                </div>
                <div dir="ltr" className="mt-2">
                  <h4 className="text-xs sm:text-sm font-semibold mb-1" dir={isRTL ? "rtl" : "ltr"}>{t('requiredHeaders')}</h4>
                  <div className="bg-background p-2 rounded">
                    <code className="text-xs sm:text-sm font-mono" dir="ltr">Content-Type: application/json</code>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div dir={isRTL ? "rtl" : "ltr"} className="flex items-center gap-2 mb-2">
                <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                <h3 className="text-base sm:text-lg font-semibold" dir={isRTL ? "rtl" : "ltr"}>{t('requestBody')}</h3>
              </div>
              <div className="bg-muted p-3 sm:p-4 rounded-lg">
                <pre className="text-xs sm:text-sm font-mono" dir="ltr">
                  {JSON.stringify({
                    prompt: "string"
                  }, null, 2)}
                </pre>
              </div>
            </div>

            <div>
              <div dir={isRTL ? "rtl" : "ltr"} className="flex items-center gap-2 mb-2">
                <Code2 className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                <h3 className="text-base sm:text-lg font-semibold" dir={isRTL ? "rtl" : "ltr"}>{t('exampleRequests')}</h3>
              </div>
              <Tabs defaultValue="typescript" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4">
                  <TabsTrigger value="typescript" className="text-xs sm:text-sm">TypeScript</TabsTrigger>
                  <TabsTrigger value="javascript" className="text-xs sm:text-sm">JavaScript</TabsTrigger>
                  <TabsTrigger value="python" className="text-xs sm:text-sm">Python</TabsTrigger>
                  <TabsTrigger value="curl" className="text-xs sm:text-sm">cURL</TabsTrigger>
                </TabsList>
                <TabsContent value="typescript" className="mt-0">
                  <div dir="ltr" className="rounded-lg overflow-hidden border relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6 sm:h-8 sm:w-8"
                      onClick={() => copyToClipboard(enhanceTypescriptExample)}
                    >
                      {copied === enhanceTypescriptExample ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                    <SyntaxHighlighter 
                      language="typescript" 
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.25rem'
                      }}
                    >
                      {enhanceTypescriptExample}
                    </SyntaxHighlighter>
                  </div>
                </TabsContent>
                <TabsContent value="javascript" className="mt-0">
                  <div dir="ltr" className="rounded-lg overflow-hidden border relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6 sm:h-8 sm:w-8"
                      onClick={() => copyToClipboard(enhanceJsExample)}
                    >
                      {copied === enhanceJsExample ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                    <SyntaxHighlighter 
                      language="javascript" 
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.25rem'
                      }}
                    >
                      {enhanceJsExample}
                    </SyntaxHighlighter>
                  </div>
                </TabsContent>
                <TabsContent value="python" className="mt-0">
                  <div dir="ltr" className="rounded-lg overflow-hidden border relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6 sm:h-8 sm:w-8"
                      onClick={() => copyToClipboard(enhancePythonExample)}
                    >
                      {copied === enhancePythonExample ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                    <SyntaxHighlighter 
                      language="python" 
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.25rem'
                      }}
                    >
                      {enhancePythonExample}
                    </SyntaxHighlighter>
                  </div>
                </TabsContent>
                <TabsContent value="curl" className="mt-0">
                  <div dir="ltr" className="rounded-lg overflow-hidden border relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6 sm:h-8 sm:w-8"
                      onClick={() => copyToClipboard(enhanceCurlExample)}
                    >
                      {copied === enhanceCurlExample ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                    <SyntaxHighlighter 
                      language="bash" 
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.75rem',
                        lineHeight: '1.25rem'
                      }}
                    >
                      {enhanceCurlExample}
                    </SyntaxHighlighter>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 