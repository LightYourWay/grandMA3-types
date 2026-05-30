<script lang="ts">
  import { data, navigate } from '../lib/store';

  let { value = '', ref = null }: { value?: string; ref?: string | null } = $props();

  const PRIMITIVES = new Set(['string', 'number', 'boolean', 'any', 'never', 'void', 'undefined', 'null', 'unknown', 'object', 'symbol', 'bigint']);

  function colorOf(token: string): string {
    if (PRIMITIVES.has(token)) return '#60a5fa';
    if (/^["'`]|^\d/.test(token)) return '#4ade80';
    if ($data?.items?.[token] || $data?.enums?.[token]) return '#a78bfa';
    return '#dce1f0';
  }

  function tokenise(s: string): string[] {
    const tokens: string[] = [];
    let cur = '', inStr = false, strChar = '';
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (!inStr && (c === '"' || c === "'" || c === '`')) { inStr = true; strChar = c; cur += c; continue; }
      if (inStr) { cur += c; if (c === strChar) { tokens.push(cur); cur = ''; inStr = false; } continue; }
      if (/[\s|&<>,\[\]\(\){}?:;]/.test(c)) {
        if (cur) { tokens.push(cur); cur = ''; }
        tokens.push(c);
      } else {
        cur += c;
      }
    }
    if (cur) tokens.push(cur);
    return tokens;
  }

  const tokens = $derived(tokenise(value));

  function isClickable(tok: string): boolean {
    return !!($data && ($data.items?.[tok] || $data.enums?.[tok]));
  }
</script>

<span class="font-mono text-sm">
  {#if ref && isClickable(ref)}
    <button class="hover:underline transition-colors" style="color:#a78bfa" onclick={() => navigate(ref!)}>
      {value}
    </button>
  {:else}
    {#each tokens as tok}
      {#if isClickable(tok)}
        <button class="hover:underline transition-colors" style="color:#a78bfa" onclick={() => navigate(tok)}>
          {tok}
        </button>
      {:else}
        <span style="color:{colorOf(tok)}">{tok}</span>
      {/if}
    {/each}
  {/if}
</span>
