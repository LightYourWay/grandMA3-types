<script lang="ts">
  import SvelteMarkdown from '@humanspeak/svelte-markdown';
  import hljs from 'highlight.js/lib/core';
  import lua from 'highlight.js/lib/languages/lua';
  import typescript from 'highlight.js/lib/languages/typescript';
  import javascript from 'highlight.js/lib/languages/javascript';
  import bash from 'highlight.js/lib/languages/bash';
  import xml from 'highlight.js/lib/languages/xml';
  import 'highlight.js/styles/atom-one-dark.css';

  hljs.registerLanguage('lua', lua);
  hljs.registerLanguage('typescript', typescript);
  hljs.registerLanguage('ts', typescript);
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('js', javascript);
  hljs.registerLanguage('bash', bash);
  hljs.registerLanguage('sh', bash);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('html', xml);

  let { source, class: className = '', style: styleProp = '' }: {
    source: string;
    class?: string;
    style?: string;
  } = $props();

  const options = { breaks: true };

  function highlight(text: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(text, { language: lang }).value;
    }
    return hljs.highlightAuto(text).value;
  }
</script>

<div class="md {className}" style={styleProp}>
  <SvelteMarkdown {source} {options}>
    {#snippet code({ lang, text }: { lang: string; text: string })}
      <pre class="hljs"><code>{@html highlight(text, lang)}</code></pre>
    {/snippet}
  </SvelteMarkdown>
</div>

<style>
  .md :global(p) { margin: 0; line-height: inherit; }
  .md :global(p + p) { margin-top: 0.6em; }

  .md :global(code) {
    font-family: monospace; font-size: 0.875em;
    color: #e8aa00; background: #0d0f16;
    border: 1px solid #252838; border-radius: 3px;
    padding: 1px 4px;
  }

  /* code blocks — override inline-code styles and hljs theme background */
  .md :global(pre.hljs) {
    background: #1a1d28; border: 1px solid #252838;
    border-radius: 6px; padding: 12px 16px;
    overflow-x: auto; margin: 0.6em 0;
    font-size: 13px; line-height: 1.6;
  }
  .md :global(pre.hljs code) {
    background: none; border: none;
    padding: 0; color: inherit; font-size: inherit;
  }

  .md :global(a) { color: #60a5fa; text-decoration: underline; text-underline-offset: 2px; }
  .md :global(a:hover) { color: #93c5fd; }
  .md :global(strong) { font-weight: 700; }
  .md :global(em) { font-style: italic; }

  /* restore list markers stripped by Tailwind preflight */
  .md :global(ul) { list-style-type: disc; padding-left: 1.4em; margin: 0.3em 0; }
  .md :global(ol) { list-style-type: decimal; padding-left: 1.4em; margin: 0.3em 0; }
  .md :global(li) { margin: 0.15em 0; }
  .md :global(li > ul) { margin: 0.1em 0; }

  .md :global(blockquote) {
    border-left: 3px solid #2a2d3d; padding-left: 0.75em;
    margin: 0.5em 0; color: #707aaa; font-style: italic;
  }
</style>
