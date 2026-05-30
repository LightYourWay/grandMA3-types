<script lang="ts">
  import { SvelteSet } from 'svelte/reactivity';
  import { data, currentId, searchQuery, searchResults, navigate } from '../lib/store';
  import TreeNode from './TreeNode.svelte';
  import type { TreeNode as TreeNodeData } from '../lib/types';

  function isInTree(id: string, node: TreeNodeData | null | undefined): boolean {
    if (!node) return false;
    if (node.id === id) return true;
    return (node.children ?? []).some((c) => isInTree(id, c));
  }

  let openSections = new SvelteSet<string>(['Object Hierarchy', 'LUA Functions - Object-Free API']);

  function toggleSection(g: string): void {
    if (openSections.has(g)) openSections.delete(g);
    else openSections.add(g);
  }

  const KIND_ICONS: Record<string, string> = {
    type: '⬡',
    interface: '◈',
    function: 'ƒ',
    enum: '◉',
    enumMember: '·',
    property: '·',
  };

  function luaLibraries(groupLists: Record<string, string[]>): string[] {
    return Object.keys(groupLists)
      .filter((k) => k.startsWith('Lua Libraries.'))
      .map((k) => k.slice('Lua Libraries.'.length))
      .sort();
  }
</script>

<aside
  class="flex flex-col shrink-0 overflow-y-auto border-r"
  style="width:272px;background:#111218;border-color:#2a2d3d"
>
  <!-- Search -->
  <div class="sticky top-0 z-10 p-3" style="background:#111218;border-bottom:1px solid #2a2d3d">
    <div class="relative">
      <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 opacity-40" width="14" height="14" viewBox="0 0 16 16" fill="#dce1f0">
        <path d="M6.5 0a6.5 6.5 0 1 1 0 13A6.5 6.5 0 0 1 6.5 0zm0 1.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM15.78 14.72l-3.5-3.5a.75.75 0 1 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06-1.06z"/>
      </svg>
      <input
        bind:value={$searchQuery}
        placeholder="Search"
        class="w-full pl-8 pr-3 py-1.5 rounded text-sm outline-none"
        style="background:#1e2130;color:#dce1f0;border:1px solid #2a2d3d"
        onkeydown={(e) => e.key === 'Escape' && searchQuery.set('')}
      />
      {#if $searchQuery}
        <button
          class="absolute right-2.5 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 text-xs"
          onclick={() => searchQuery.set('')}
        >✕</button>
      {/if}
    </div>
  </div>

  <!-- Search results -->
  {#if $searchResults}
    <div class="flex-1 p-2">
      {#if $searchResults.length === 0}
        <p class="text-xs p-2" style="color:#6b7194">No results for "{$searchQuery}"</p>
      {:else}
        <p class="text-xs px-2 pb-1" style="color:#6b7194">{$searchResults.length} results</p>
        {#each $searchResults as r (r.id)}
          <button
            class="flex items-center gap-2 w-full text-left px-2 py-1 rounded text-sm hover:bg-card transition-colors"
            style="color: {$currentId === r.id ? '#e8aa00' : '#b8bdd4'}"
            onclick={() => navigate(r.parentId ?? r.id)}
          >
            <span class="text-xs opacity-50 font-mono shrink-0" style="color:#6b7194">{KIND_ICONS[r.kind] ?? '·'}</span>
            <span class="truncate">
              {#if r.parentName}<span style="color:#6b7194">{r.parentName}.</span>{/if}{r.name}
            </span>
            {#if r.kind !== 'type' && r.kind !== 'function' && r.kind !== 'enum'}
              <span class="ml-auto text-xs shrink-0" style="color:#6b7194">{r.kind}</span>
            {/if}
          </button>
        {/each}
      {/if}
    </div>
  {:else if $data}

    <!-- ── Object Hierarchy (tree) ─────────────────────────── -->
    <div class="pt-2 pb-1">
      <button
        class="flex items-center gap-1.5 w-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white"
        style="color:#6b7194"
        onclick={() => toggleSection('Object Hierarchy')}
      >
        <svg class="transition-transform" style="transform:rotate({openSections.has('Object Hierarchy') ? 90 : 0}deg)" width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
          <path d="M3 2l4 3-4 3V2z"/>
        </svg>
        Object Hierarchy
      </button>
      {#if openSections.has('Object Hierarchy')}
        <TreeNode node={$data.objectTree} />
        {#each ($data.groupLists['Object Hierarchy'] ?? []).filter((id) => id !== 'Root') as id}
          {#if !isInTree(id, $data.objectTree)}
            <button
              class="flex w-full text-left px-3 py-0.5 text-sm transition-colors rounded"
              style="color: {$currentId === id ? '#e8aa00' : '#b8bdd4'};background: {$currentId === id ? '#1e2130' : 'transparent'}"
              onclick={() => navigate(id)}
            >{id}</button>
          {/if}
        {/each}
      {/if}
    </div>

    <div style="height:1px;background:#2a2d3d;margin:4px 0"></div>

    <!-- ── Objects (flat alphabetical) ───────────────────────── -->
    {#if ($data.groupLists['Objects'] ?? []).length > 0}
      <div class="py-1">
        <button
          class="flex items-center gap-1.5 w-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white"
          style="color:#6b7194"
          onclick={() => toggleSection('Objects')}
        >
          <svg class="transition-transform" style="transform:rotate({openSections.has('Objects') ? 90 : 0}deg)" width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
            <path d="M3 2l4 3-4 3V2z"/>
          </svg>
          Objects
          <span class="ml-auto font-normal normal-case tracking-normal opacity-60">{($data.groupLists['Objects'] ?? []).length}</span>
        </button>
        {#if openSections.has('Objects')}
          {#each ($data.groupLists['Objects'] ?? []) as id}
            {@const obj = ($data.items[id] as import('../lib/types').TypeItem | undefined)}
            <button
              class="flex items-center gap-1.5 w-full text-left px-3 py-0.5 text-sm rounded transition-colors"
              style="color: {$currentId === id ? '#e8aa00' : '#b8bdd4'};background: {$currentId === id ? '#1e2130' : 'transparent'}"
              onclick={() => navigate(id)}
            >
              <span class="shrink-0 font-mono text-xs" style="color:{$currentId === id ? '#e8aa00' : '#60a5fa'};opacity:0.75">{obj?.kind === 'interface' ? '◈' : '⬡'}</span>
              <span class="truncate">{obj?.name ?? id}</span>
            </button>
          {/each}
        {/if}
      </div>
      <div style="height:1px;background:#2a2d3d;margin:4px 0"></div>
    {/if}

    <!-- ── LUA Functions - Object API ────────────────────────── -->
    {#if ($data.groupLists['LUA Functions - Object API'] ?? []).length > 0}
      <div class="py-1">
        <button
          class="flex items-center gap-1.5 w-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white"
          style="color:#6b7194"
          onclick={() => toggleSection('LUA Functions - Object API')}
        >
          <svg class="transition-transform" style="transform:rotate({openSections.has('LUA Functions - Object API') ? 90 : 0}deg)" width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
            <path d="M3 2l4 3-4 3V2z"/>
          </svg>
          Object Methods
          <span class="ml-auto font-normal normal-case tracking-normal opacity-60">{($data.groupLists['LUA Functions - Object API'] ?? []).length}</span>
        </button>
        {#if openSections.has('LUA Functions - Object API')}
          {#each ($data.groupLists['LUA Functions - Object API'] ?? []) as id}
            <button
              class="flex items-center gap-1.5 w-full text-left px-3 py-0.5 text-sm rounded transition-colors"
              style="color: {$currentId === id ? '#e8aa00' : '#b8bdd4'};background: {$currentId === id ? '#1e2130' : 'transparent'}"
              onclick={() => navigate(id)}
            >
              <span class="text-xs shrink-0" style="color:#fb923c">ƒ</span>
              <span class="truncate">{($data.functions[id] ?? {}).name ?? id}</span>
            </button>
          {/each}
        {/if}
      </div>
      <div style="height:1px;background:#2a2d3d;margin:4px 0"></div>
    {/if}

    <!-- ── LUA Functions - Object-Free API ───────────────────── -->
    {#if ($data.groupLists['LUA Functions - Object-Free API'] ?? []).length > 0}
      <div class="py-1">
        <button
          class="flex items-center gap-1.5 w-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-colors hover:text-white"
          style="color:#6b7194"
          onclick={() => toggleSection('LUA Functions - Object-Free API')}
        >
          <svg class="transition-transform" style="transform:rotate({openSections.has('LUA Functions - Object-Free API') ? 90 : 0}deg)" width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
            <path d="M3 2l4 3-4 3V2z"/>
          </svg>
          Global Methods
          <span class="ml-auto font-normal normal-case tracking-normal opacity-60">{($data.groupLists['LUA Functions - Object-Free API'] ?? []).length}</span>
        </button>
        {#if openSections.has('LUA Functions - Object-Free API')}
          {#each ($data.groupLists['LUA Functions - Object-Free API'] ?? []) as id}
            {@const entry = ($data.items[id] as import('../lib/types').TypeItem | undefined) ?? $data.functions[id]}
            <button
              class="flex items-center gap-1.5 w-full text-left px-3 py-0.5 text-sm rounded transition-colors"
              style="color: {$currentId === id ? '#e8aa00' : '#b8bdd4'};background: {$currentId === id ? '#1e2130' : 'transparent'}"
              onclick={() => navigate(id)}
            >
              {#if entry?.kind === 'function'}
                <span class="text-xs shrink-0" style="color:#fb923c">ƒ</span>
              {/if}
              <span class="truncate">{id}</span>
            </button>
          {/each}
        {/if}
      </div>
      <div style="height:1px;background:#2a2d3d;margin:4px 0"></div>
    {/if}

    <!-- ── Enums ──────────────────────────────────────────────── -->
    {#if Object.keys($data.enums ?? {}).length > 0}
      <div class="py-1">
        <button
          class="flex items-center gap-1.5 w-full px-3 py-1 text-xs font-semibold uppercase tracking-wider hover:text-white"
          style="color:#6b7194"
          onclick={() => toggleSection('Enums')}
        >
          <svg class="transition-transform" style="transform:rotate({openSections.has('Enums') ? 90 : 0}deg)" width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
            <path d="M3 2l4 3-4 3V2z"/>
          </svg>
          Enums
          <span class="ml-auto font-normal normal-case tracking-normal opacity-60">{Object.keys($data.enums).length}</span>
        </button>
        {#if openSections.has('Enums')}
          {#each Object.keys($data.enums).sort() as id}
            <button
              class="flex items-center gap-1.5 w-full text-left px-3 py-0.5 text-sm rounded transition-colors"
              style="color: {$currentId === id ? '#e8aa00' : '#b8bdd4'};background: {$currentId === id ? '#1e2130' : 'transparent'}"
              onclick={() => navigate(id)}
            >
              <span class="shrink-0 font-mono text-xs" style="color:{$currentId === id ? '#e8aa00' : '#f472b6'};opacity:0.75">◉</span>
              <span class="truncate">{$data!.enums[id].name}</span>
            </button>
          {/each}
        {/if}
      </div>
      <div style="height:1px;background:#2a2d3d;margin:4px 0"></div>
    {/if}

    <!-- ── External Libraries ─────────────────────────────────── -->
    {#if luaLibraries($data.groupLists).length > 0}
      <div class="py-1">
        <button
          class="flex items-center gap-1.5 w-full px-3 py-1 text-xs font-semibold uppercase tracking-wider hover:text-white"
          style="color:#6b7194"
          onclick={() => toggleSection('External Libraries')}
        >
          <svg class="transition-transform" style="transform:rotate({openSections.has('External Libraries') ? 90 : 0}deg)" width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
            <path d="M3 2l4 3-4 3V2z"/>
          </svg>
          External Libraries
        </button>
        {#if openSections.has('External Libraries')}
          {#each luaLibraries($data.groupLists) as lib}
            {@const libKey = 'Lua Libraries.' + lib}
            {@const libItems = $data.groupLists[libKey] ?? []}
            <div class="ml-2">
              <button
                class="flex items-center gap-1.5 w-full px-3 py-0.5 text-xs font-medium transition-colors hover:text-white"
                style="color:#8b9cc4"
                onclick={() => toggleSection(libKey)}
              >
                <svg class="transition-transform shrink-0" style="transform:rotate({openSections.has(libKey) ? 90 : 0}deg)" width="7" height="7" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M3 2l4 3-4 3V2z"/>
                </svg>
                <span class="font-mono">{lib}</span>
                <span class="ml-auto font-normal opacity-60">{libItems.length}</span>
              </button>
              {#if openSections.has(libKey)}
                {#each libItems as id}
                  {@const entry = ($data.items[id] as import('../lib/types').TypeItem | undefined) ?? $data.functions[id]}
                  <button
                    class="flex items-center gap-1.5 w-full text-left py-0.5 text-sm rounded transition-colors"
                    style="padding-left:24px;color: {$currentId === id ? '#e8aa00' : '#b8bdd4'};background: {$currentId === id ? '#1e2130' : 'transparent'}"
                    onclick={() => navigate(id)}
                  >
                    {#if entry?.kind === 'function'}
                      <span class="shrink-0 font-mono text-xs" style="color:{$currentId === id ? '#e8aa00' : '#34d399'};opacity:0.75">ƒ</span>
                    {:else if entry?.kind === 'variable'}
                      <span class="shrink-0 font-mono text-xs" style="color:{$currentId === id ? '#e8aa00' : '#4ade80'};opacity:0.75">v</span>
                    {:else if entry?.kind === 'interface'}
                      <span class="shrink-0 font-mono text-xs" style="color:{$currentId === id ? '#e8aa00' : '#60a5fa'};opacity:0.75">◈</span>
                    {:else}
                      <span class="shrink-0 font-mono text-xs" style="color:{$currentId === id ? '#e8aa00' : '#60a5fa'};opacity:0.75">⬡</span>
                    {/if}
                    <span class="truncate">{entry?.name ?? id}</span>
                  </button>
                {/each}
              {/if}
            </div>
          {/each}
        {/if}
      </div>
    {/if}

  {/if}
</aside>
