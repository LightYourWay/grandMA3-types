<script lang="ts">
  import type { EnumItem } from '../lib/types';
  import SourceLink from './SourceLink.svelte';
  import SectionHeader from './SectionHeader.svelte';
  import Markdown from './Markdown.svelte';

  let { item }: { item: EnumItem } = $props();

  let filter = $state('');
  const members = $derived(filter
    ? item.members.filter((m) => m.name.toLowerCase().includes(filter.toLowerCase()))
    : item.members);

  const hasValues = $derived(item.members.some(m => m.value !== null));
  const hasDescriptions = $derived(item.members.some(m => m.description));
</script>

<article class="py-6 px-4 lg:py-10 lg:px-10 max-w-[720px]">

  <!-- ── Header ──────────────────────────────────────────────────── -->
  <header class="mb-8">
    <div class="flex items-start justify-between gap-4 mb-3">
      <div class="flex items-center gap-3 flex-wrap">
        <h1 class="text-[28px] font-bold tracking-tight leading-none" style="color:#dce1f0">{item.name}</h1>
        <span class="badge-enum">enum</span>
        <span class="badge-fullname">{item.fullName}</span>
      </div>
      <SourceLink sourceFile={item.sourceFile} sourceLine={item.sourceLine} class="mt-1 max-lg:hidden" />
    </div>

    {#if item.description}
      <Markdown source={item.description} class="description-text mb-4" />
    {/if}
  </header>

  <!-- ── Members ─────────────────────────────────────────────────── -->
  <section>
    <div class="flex items-center justify-between mb-3">
      <SectionHeader title="Members" count={item.members.length} style="flex:1;margin-bottom:0" />
      {#if item.members.length > 8}
        <input
          bind:value={filter}
          placeholder="Filter…"
          class="filter-input"
        />
      {/if}
    </div>

    <div class="member-list" style="margin-top:12px">
      {#each members as m, i}
        <div class="member-row" style="{i > 0 ? 'border-top:1px solid #141620' : ''}">
          <div class="flex items-baseline gap-3 flex-wrap">
            <code class="text-sm font-bold" style="color:#dce1f0">{m.name}</code>
            {#if hasValues && m.value !== null}
              <span class="value-chip">{m.value}</span>
            {/if}
            {#if m.description && !hasDescriptions}
              <span class="text-xs" style="color:#707aaa">{m.description}</span>
            {/if}
          </div>
          {#if m.description && hasDescriptions}
            <Markdown source={m.description} class="text-xs mt-1 leading-relaxed" style="color:#5a6285" />
          {/if}
        </div>
      {:else}
        <div class="px-4 py-6 text-center text-sm" style="color:#3a4060">No members match "{filter}"</div>
      {/each}
    </div>
  </section>

  <div class="lg:hidden flex justify-end pt-4 mt-2">
    <SourceLink sourceFile={item.sourceFile} sourceLine={item.sourceLine} />
  </div>

</article>

<style>
  .filter-input {
    padding: 4px 10px;
    font-size: 12px;
    border-radius: 6px;
    background: #161820;
    color: #dce1f0;
    border: 1px solid #252838;
    outline: none;
    width: 150px;
    transition: border-color 0.15s;
  }
  .filter-input:focus { border-color: #3a4060; }
</style>
