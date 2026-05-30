<script lang="ts">
  import { data, currentId } from '../lib/store';
  import TypeDetail from './TypeDetail.svelte';
  import FunctionDetail from './FunctionDetail.svelte';
  import EnumDetail from './EnumDetail.svelte';
  import type { AnyItem } from '../lib/types';

  const item = $derived(($currentId && $data
    ? ($data.items[$currentId] ?? $data.functions[$currentId] ?? $data.enums[$currentId])
    : null) as AnyItem | null);
</script>

{#if !item}
  <div class="flex flex-col items-center justify-center h-full gap-4" style="color:#6b7194">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="24" cy="24" r="20" />
      <path d="M24 16v8M24 32v.5" stroke-linecap="round" />
    </svg>
    <p>Select an item from the sidebar</p>
  </div>
{:else if item.kind === 'type' || item.kind === 'interface' || item.kind === 'variable'}
  <TypeDetail {item} />
{:else if item.kind === 'function'}
  <FunctionDetail {item} />
{:else if item.kind === 'enum'}
  <EnumDetail {item} />
{/if}
