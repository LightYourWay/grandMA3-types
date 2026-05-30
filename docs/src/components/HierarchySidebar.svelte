<script lang="ts">
  import { tick, setContext } from 'svelte';
  import { data, currentId, navigate, navigateSource } from '../lib/store';
  import TreeNode from './TreeNode.svelte';
  import type { TreeNode as TreeNodeType } from '../lib/types';

  function nav(id: string) { navigate(id, 'hierarchy'); }
  setContext('hierarchyNav', nav);

  function isInTree(id: string, node: TreeNodeType | null | undefined): boolean {
    if (!node) return false;
    if (node.id === id) return true;
    return (node.children ?? []).some(c => isInTree(id, c));
  }

  let { open = true }: { open?: boolean } = $props();

  $effect(() => {
    const id = $currentId;
    if (!id || $navigateSource === 'hierarchy') return;
    tick().then(() => tick()).then(() => {
      document.querySelector(`[data-hier-id="${CSS.escape(id)}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
</script>

<aside
  class="flex flex-col shrink-0 overflow-hidden {open ? 'max-lg:fixed max-lg:top-[54px] max-lg:left-0 max-lg:bottom-0 max-lg:z-50' : 'max-lg:hidden'} lg:flex"
  style="width:max-content;min-width:180px;background:#0d0f16;border-right:1px solid #1d2033"
>
  <div
    class="shrink-0 flex items-center gap-2 px-4"
    style="height:42px;border-bottom:1px solid #1d2033"
  >
    <div style="width:2px;height:14px;border-radius:2px;background:linear-gradient(180deg,#60a5fa 0%,#818cf8 100%);flex-shrink:0"></div>
    <span style="font-size:10.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#454d6a">Object Tree</span>
  </div>

  <div class="flex-1 overflow-y-auto" style="padding:4px 0">
    {#if $data}
      <TreeNode node={$data.objectTree} />
      {#each ($data.groupLists['Object Hierarchy'] ?? []).filter(id => id !== 'Root') as id}
        {#if !isInTree(id, $data.objectTree)}
          <button
            class="flex w-full text-left hover:bg-white/[0.04] transition-colors"
            data-hier-id={id}
            style="padding:2px 8px 2px 22px;font-size:12.5px;color:{$currentId === id ? '#e8aa00' : '#8c97bb'};background:{$currentId === id ? '#1c1f2e' : ''};border-left:2px solid {$currentId === id ? '#e8aa00' : 'transparent'};border-radius:0 3px 3px 0"
            onclick={() => nav(id)}
          >{id}</button>
        {/if}
      {/each}
    {/if}
  </div>
</aside>
