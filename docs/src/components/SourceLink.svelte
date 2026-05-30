<script lang="ts">
  let { sourceFile, sourceLine, class: className = '' }: {
    sourceFile?: string;
    sourceLine?: number;
    class?: string;
  } = $props();

  const displayPath = $derived((sourceFile ?? '').replace(/^typings\//, ''));
  const label = $derived(displayPath + (sourceLine ? ':' + sourceLine : ''));
  const href = $derived(
    sourceFile
      ? `https://github.com/LightYourWay/grandMA3-types/blob/main/${sourceFile}${sourceLine ? '#L' + sourceLine : ''}`
      : ''
  );
</script>

{#if sourceFile}
  <a {href} target="_blank" rel="noopener" class="source-badge {className}" title={label}>
    {label}
  </a>
{/if}

<style>
  .source-badge {
    font-size: 11px;
    font-family: monospace;
    padding: 2px 8px;
    border-radius: 4px;
    background: #1a1d2e;
    color: #3a4060;
    border: 1px solid #252838;
    white-space: nowrap;
    text-decoration: none;
    transition: color 0.15s, border-color 0.15s;
  }
  .source-badge:hover { color: #9aa4bf; border-color: #3a4060; }
</style>
