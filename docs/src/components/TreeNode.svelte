<script lang="ts">
  import { untrack, getContext } from 'svelte';
  import { currentId, navigate } from '../lib/store';
  import type { TreeNode as TreeNodeType } from '../lib/types';
  import TreeNode from './TreeNode.svelte';

  const hierarchyNav = getContext<((id: string) => void) | undefined>('hierarchyNav');
  const nav = hierarchyNav ?? navigate;

  let { node, depth = 0 }: { node: TreeNodeType; depth?: number } = $props();

  let open = $state(untrack(() => depth < 2));

  const active = $derived($currentId === node.id);
  const hasChildren = $derived((node.children?.length ?? 0) > 0);

  function containsId(n: TreeNodeType, id: string): boolean {
    if (n.id === id) return true;
    return (n.children ?? []).some(c => containsId(c, id));
  }

  // Auto-expand when the active item is somewhere in this subtree
  $effect(() => {
    const id = $currentId;
    if (id && containsId(node, id)) open = true;
  });


</script>

<div>
  <button
    data-hier-id={node.id}
    class="flex items-center gap-1 w-full text-left hover:bg-white/[0.04] transition-colors"
    style="padding:2px 8px 2px {8 + depth * 14}px;font-size:12.5px;line-height:1.65;color:{active ? '#e8aa00' : '#8c97bb'};background:{active ? '#1c1f2e' : ''};border-left:2px solid {active ? '#e8aa00' : 'transparent'};border-radius:0 3px 3px 0"
    onclick={() => { nav(node.id); if (hasChildren) open = !open; }}
  >
    {#if hasChildren}
      <svg
        style="flex-shrink:0;opacity:0.45;transition:transform 0.15s;transform:rotate({open ? 90 : 0}deg)"
        width="8" height="8" viewBox="0 0 10 10" fill="currentColor"
      ><path d="M3 2l4 3-4 3V2z"/></svg>
    {:else}
      <svg style="flex-shrink:0;opacity:0.18" width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
        <circle cx="4" cy="4" r="2"/>
      </svg>
    {/if}
    <span class="truncate">{node.id}</span>
  </button>

  {#if open && hasChildren}
    <div style="position:relative">
      <div style="position:absolute;top:2px;bottom:4px;left:{12 + depth * 14}px;width:1px;background:rgba(255,255,255,0.05)"></div>
      {#each node.children as child (child.id)}
        <TreeNode node={child} depth={depth + 1} />
      {/each}
    </div>
  {/if}
</div>
