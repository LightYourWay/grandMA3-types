<script lang="ts">
  import TypeStr from './TypeStr.svelte';
  import SourceLink from './SourceLink.svelte';
  import SectionHeader from './SectionHeader.svelte';
  import Markdown from './Markdown.svelte';
  import type { FunctionItem } from '../lib/types';

  let { item }: { item: FunctionItem } = $props();

  const isObjMethod = $derived(item.group === 'LUA Functions - Object API');
</script>

<article class="py-6 px-4 lg:py-10 lg:px-10 max-w-[720px]">

  <!-- ── Header ──────────────────────────────────────────────────── -->
  <header class="mb-8">
    <div class="flex items-start justify-between gap-4 mb-3">
      <div class="flex items-center gap-3">
        <h1 class="text-[28px] font-bold tracking-tight leading-none" style="color:#dce1f0">{#if isObjMethod}<span style="color:#5a6490">Obj.</span>{/if}{item.name}</h1>
        <span class="badge-fn">function</span>
      </div>
      <SourceLink sourceFile={item.sourceFile} sourceLine={item.sourceLine} class="mt-1 max-lg:hidden" />
    </div>

    {#if item.description}
      <Markdown source={item.description} class="description-text mb-4" />
    {/if}
  </header>

  <!-- ── Signatures ─────────────────────────────────────────────── -->
  {#each item.signatures as sig, si}
    <section class="mb-8">
      {#if item.signatures.length > 1}
        <SectionHeader title="Overload {si + 1}" />
      {/if}

      <!-- Signature code block -->
      <div class="sig-block mb-5">
        {#if isObjMethod}<span class="obj-prefix">Obj.</span>{/if}<span class="fn-name">{item.name}</span><span class="punct">(</span><wbr>{#each sig.params as p, pi}<span class="param-name">{p.name}</span>{#if p.optional}<span class="optional-mark">?</span>{/if}<span class="punct">: </span><TypeStr value={p.typeStr} />{#if pi < sig.params.length - 1}<span class="punct">, </span>{/if}{/each}<span class="punct">)</span><span class="punct">: </span><TypeStr value={sig.returnType} />
      </div>

      {#if sig.description && sig.description !== item.description}
        <Markdown source={sig.description} class="description-text mb-5" />
      {/if}

      <!-- Parameters -->
      {#if sig.params.length > 0}
        <div class="mb-4">
          <SectionHeader title="Parameters" />
          <div class="member-list">
            {#each sig.params as p, i}
              <div class="member-row" style="{i > 0 ? 'border-top:1px solid #141620' : ''}">
                <div class="flex items-center gap-2 flex-wrap">
                  <code class="text-sm font-bold" style="color:#dce1f0">{p.name}{p.optional ? '?' : ''}</code>
                  {#if p.optional}
                    <span class="badge-optional">optional</span>
                  {/if}
                  <span style="color:#2a2d3d;font-size:12px">:</span>
                  <TypeStr value={p.typeStr} />
                </div>
                {#if p.description}
                  <Markdown source={p.description} class="mt-1.5 leading-relaxed" style="font-size:13px;color:#707aaa" />
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Return value -->
      <div class="return-block">
        <span class="return-label">Returns</span>
        <TypeStr value={sig.returnType} />
      </div>
    </section>
  {/each}

  <div class="lg:hidden flex justify-end pt-4 mt-2">
    <SourceLink sourceFile={item.sourceFile} sourceLine={item.sourceLine} />
  </div>

</article>

<style>
  .sig-block {
    font-family: monospace;
    font-size: 14px;
    padding: 16px 20px;
    border-radius: 8px;
    background: #0d0f16;
    border: 1px solid #252838;
    line-height: 1.6;
    overflow-x: auto;
  }
  .obj-prefix { color: #5a6490; }
  .fn-name    { color: #fb923c; }
  .punct      { color: #5a6490; }
  .param-name { color: #dce1f0; }
  .optional-mark { color: #6b7194; }

  .return-block {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    border-radius: 8px;
    background: #161820;
    border: 1px solid #1e2130;
  }
  .return-label {
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #505870;
    flex-shrink: 0;
  }
</style>
