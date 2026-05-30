<script lang="ts">
  import { tick } from 'svelte';
  import { SvelteSet } from 'svelte/reactivity';
  import { data, currentId, searchQuery, searchResults, navigate, navigateSource } from '../lib/store';

  function nav(id: string) { navigate(id, 'catalog'); }

  let { open = true }: { open?: boolean } = $props();

  let openSections = new SvelteSet<string>(['LUA Functions - Object-Free API']);

  function toggle(g: string) {
    if (openSections.has(g)) openSections.delete(g);
    else openSections.add(g);
  }

  function luaLibraries(groupLists: Record<string, string[]>): string[] {
    return Object.keys(groupLists)
      .filter(k => k.startsWith('Lua Libraries.'))
      .map(k => k.slice('Lua Libraries.'.length))
      .sort();
  }

  const KIND_ICONS: Record<string, string> = {
    type: '⬡', interface: '◈', function: 'ƒ', enum: '◉', variable: '·',
  };

  function sectionOf(id: string): string | null {
    if (!$data) return null;
    if ($data.groupLists['Objects']?.includes(id)) return 'Objects';
    if ($data.groupLists['LUA Functions - Object API']?.includes(id)) return 'LUA Functions - Object API';
    if ($data.groupLists['LUA Functions - Object-Free API']?.includes(id)) return 'LUA Functions - Object-Free API';
    if ($data.enums?.[id]) return 'Enums';
    for (const key of Object.keys($data.groupLists)) {
      if (key.startsWith('Lua Libraries.') && $data.groupLists[key]?.includes(id)) return key;
    }
    return null;
  }

  $effect(() => {
    const id = $currentId;
    if (!id || !$data) return;
    const section = sectionOf(id);
    if (section) {
      openSections.add(section);
      if (section.startsWith('Lua Libraries.')) openSections.add('External Libraries');
    }
    if ($navigateSource === 'catalog') return;
    tick().then(() => tick()).then(() => {
      document.querySelector(`[data-cat-id="${CSS.escape(id)}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
</script>

<aside
  class="flex flex-col shrink-0 overflow-hidden {open ? 'max-lg:fixed max-lg:top-[54px] max-lg:right-0 max-lg:bottom-0 max-lg:z-50' : 'max-lg:hidden'}"
  style="width:248px;background:#111218;border-left:1px solid #1d2033"
>

  <!-- Search -->
  <div class="shrink-0 p-2.5" style="border-bottom:1px solid #1d2033">
    <div class="relative">
      <svg class="absolute left-2.5 top-1/2 -translate-y-1/2" style="opacity:0.3;pointer-events:none" width="13" height="13" viewBox="0 0 16 16" fill="#dce1f0">
        <path d="M6.5 0a6.5 6.5 0 1 1 0 13A6.5 6.5 0 0 1 6.5 0zm0 1.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM15.78 14.72l-3.5-3.5a.75.75 0 1 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06-1.06z"/>
      </svg>
      <input
        bind:value={$searchQuery}
        placeholder="Search"
        class="w-full outline-none"
        style="padding:6px 28px 6px 30px;border-radius:6px;background:#0d0f16;color:#c5cbe0;border:1px solid #252838;font-size:12.5px"
        onkeydown={(e) => e.key === 'Escape' && searchQuery.set('')}
      />
      {#if $searchQuery}
        <button
          class="absolute right-2.5 top-1/2 -translate-y-1/2 hover:opacity-80 transition-opacity"
          style="opacity:0.4;font-size:11px;color:#dce1f0"
          onclick={() => searchQuery.set('')}
        >✕</button>
      {/if}
    </div>
  </div>

  <div class="flex-1 overflow-y-auto">

    {#if $searchResults}
      <!-- Search results -->
      <div class="p-2">
        {#if $searchResults.length === 0}
          <p style="font-size:12px;padding:8px;color:#454d6a">No results for "{$searchQuery}"</p>
        {:else}
          <p style="font-size:11px;padding:3px 8px 6px;color:#454d6a">{$searchResults.length} results</p>
          {#each $searchResults as r (r.id + ':' + r.kind)}
            <button
              class="flex items-center gap-1.5 w-full text-left rounded px-2 py-1 hover:bg-white/[0.04] transition-colors"
              style="font-size:12.5px;color:{$currentId === r.id ? '#e8aa00' : '#9ba3c2'};background:{$currentId === r.id ? '#1c1f2e' : ''}"
              onclick={() => navigate(r.parentId ?? r.id)}
            >
              <span style="font-size:10.5px;opacity:0.4;font-family:monospace;flex-shrink:0">{KIND_ICONS[r.kind] ?? '·'}</span>
              <span class="truncate">
                {#if r.parentName}<span style="color:#454d6a">{r.parentName}.</span>{/if}{r.name}
              </span>
              {#if r.kind !== 'type' && r.kind !== 'function' && r.kind !== 'enum' && r.kind !== 'interface'}
                <span class="ml-auto shrink-0" style="font-size:10px;color:#454d6a">{r.kind}</span>
              {/if}
            </button>
          {/each}
        {/if}
      </div>

    {:else if $data}

      <!-- ── Objects ──────────────────────────────────────────── -->
      {#if ($data.groupLists['Objects'] ?? []).length > 0}
        <div>
          <button
            class="flex items-center gap-2 w-full px-3 hover:text-slate-300 transition-colors"
            style="padding-top:9px;padding-bottom:9px;border-bottom:1px solid #1d2033"
            onclick={() => toggle('Objects')}
          >
            <div style="width:5px;height:5px;border-radius:50%;background:#60a5fa;flex-shrink:0"></div>
            <span style="font-size:11px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:#6b7aa0">Objects</span>
            <span class="ml-auto" style="font-size:11px;color:#505870">{($data.groupLists['Objects'] ?? []).length}</span>
            <svg style="transform:rotate({openSections.has('Objects') ? 90 : 0}deg);transition:transform 0.15s;opacity:0.35" width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
              <path d="M3 2l4 3-4 3V2z"/>
            </svg>
          </button>
          {#if openSections.has('Objects')}
            <div class="py-1" style="border-bottom:1px solid #1d2033">
              {#each ($data.groupLists['Objects'] ?? []) as id}
                {@const obj = ($data.items[id] as import('../lib/types').TypeItem | undefined)}
                <button
                  class="flex items-center gap-1.5 w-full text-left hover:bg-white/[0.04] transition-colors"
                  data-cat-id={id}
                  style="padding:3px 8px 3px 12px;font-size:13px;color:{$currentId === id ? '#e8aa00' : '#a0aac8'};background:{$currentId === id ? '#1c1f2e' : ''};border-left:2px solid {$currentId === id ? '#e8aa00' : 'transparent'};border-radius:0 3px 3px 0"
                  onclick={() => nav(id)}
                >
                  <span style="font-family:monospace;font-size:11px;flex-shrink:0;color:{$currentId === id ? '#e8aa00' : '#60a5fa'};opacity:0.85">{obj?.kind === 'interface' ? '◈' : '⬡'}</span>
                  <span class="truncate">{obj?.name ?? id}</span>
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- ── Obj Methods (Object API) ─────────────────────────── -->
      {#if ($data.groupLists['LUA Functions - Object API'] ?? []).length > 0}
        <div>
          <button
            class="flex items-center gap-2 w-full px-3 hover:text-slate-300 transition-colors"
            style="padding-top:9px;padding-bottom:9px;border-bottom:1px solid #1d2033"
            onclick={() => toggle('LUA Functions - Object API')}
          >
            <div style="width:5px;height:5px;border-radius:50%;background:#c084fc;flex-shrink:0"></div>
            <span style="font-size:11px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:#6b7aa0">Object Methods</span>
            <span class="ml-auto" style="font-size:11px;color:#505870">{($data.groupLists['LUA Functions - Object API'] ?? []).length}</span>
            <svg style="transform:rotate({openSections.has('LUA Functions - Object API') ? 90 : 0}deg);transition:transform 0.15s;opacity:0.35" width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
              <path d="M3 2l4 3-4 3V2z"/>
            </svg>
          </button>
          {#if openSections.has('LUA Functions - Object API')}
            <div class="py-1" style="border-bottom:1px solid #1d2033">
              {#each ($data.groupLists['LUA Functions - Object API'] ?? []) as id}
                {@const fn = $data.functions[id]}
                <button
                  class="flex items-center gap-1.5 w-full text-left hover:bg-white/[0.04] transition-colors"
                  data-cat-id={id}
                  style="padding:3px 8px 3px 14px;font-size:13px;color:{$currentId === id ? '#e8aa00' : '#a0aac8'};background:{$currentId === id ? '#1c1f2e' : ''};border-left:2px solid {$currentId === id ? '#e8aa00' : 'transparent'};border-radius:0 3px 3px 0"
                  onclick={() => nav(id)}
                >
                  <span style="color:#c084fc;font-family:monospace;font-size:11px;opacity:0.85;flex-shrink:0">ƒ</span>
                  <span class="truncate">{fn?.name ?? id}</span>
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- ── Global API (Object-Free API) ───────────────────── -->
      {#if ($data.groupLists['LUA Functions - Object-Free API'] ?? []).length > 0}
        <div>
          <button
            class="flex items-center gap-2 w-full px-3 hover:text-slate-300 transition-colors"
            style="padding-top:9px;padding-bottom:9px;border-bottom:1px solid #1d2033"
            onclick={() => toggle('LUA Functions - Object-Free API')}
          >
            <div style="width:5px;height:5px;border-radius:50%;background:#818cf8;flex-shrink:0"></div>
            <span style="font-size:11px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:#6b7aa0">Global Methods</span>
            <span class="ml-auto" style="font-size:11px;color:#505870">{($data.groupLists['LUA Functions - Object-Free API'] ?? []).filter(id => $data.functions[id]).length}</span>
            <svg style="transform:rotate({openSections.has('LUA Functions - Object-Free API') ? 90 : 0}deg);transition:transform 0.15s;opacity:0.35" width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
              <path d="M3 2l4 3-4 3V2z"/>
            </svg>
          </button>
          {#if openSections.has('LUA Functions - Object-Free API')}
            <div class="py-1" style="border-bottom:1px solid #1d2033">
              {#each ($data.groupLists['LUA Functions - Object-Free API'] ?? []).filter(id => $data.functions[id]) as id}
                {@const entry = $data.functions[id]}
                <button
                  class="flex items-center gap-1.5 w-full text-left hover:bg-white/[0.04] transition-colors"
                  data-cat-id={id}
                  style="padding:3px 8px 3px 14px;font-size:13px;color:{$currentId === id ? '#e8aa00' : '#a0aac8'};background:{$currentId === id ? '#1c1f2e' : ''};border-left:2px solid {$currentId === id ? '#e8aa00' : 'transparent'};border-radius:0 3px 3px 0"
                  onclick={() => nav(id)}
                >
                  {#if entry?.kind === 'function'}
                    <span style="color:#818cf8;font-family:monospace;font-size:11px;opacity:0.85;flex-shrink:0">ƒ</span>
                  {:else if entry?.kind === 'variable'}
                    <span style="color:#4ade80;font-family:monospace;font-size:11px;opacity:0.85;flex-shrink:0">v</span>
                  {:else if entry?.kind === 'type'}
                    <span style="color:#60a5fa;font-family:monospace;font-size:11px;opacity:0.85;flex-shrink:0">⬡</span>
                  {:else if entry?.kind === 'interface'}
                    <span style="color:#60a5fa;font-family:monospace;font-size:11px;opacity:0.85;flex-shrink:0">◈</span>
                  {/if}
                  <span class="truncate">{entry?.name ?? id}</span>
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- ── Enums ────────────────────────────────────────────── -->
      {#if Object.keys($data.enums ?? {}).length > 0}
        <div>
          <button
            class="flex items-center gap-2 w-full px-3 hover:text-slate-300 transition-colors"
            style="padding-top:9px;padding-bottom:9px;border-bottom:1px solid #1d2033"
            onclick={() => toggle('Enums')}
          >
            <div style="width:5px;height:5px;border-radius:50%;background:#f472b6;flex-shrink:0"></div>
            <span style="font-size:11px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:#6b7aa0">Enums</span>
            <span class="ml-auto" style="font-size:11px;color:#505870">{Object.keys($data.enums).length}</span>
            <svg style="transform:rotate({openSections.has('Enums') ? 90 : 0}deg);transition:transform 0.15s;opacity:0.35" width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
              <path d="M3 2l4 3-4 3V2z"/>
            </svg>
          </button>
          {#if openSections.has('Enums')}
            <div class="py-1" style="border-bottom:1px solid #1d2033">
              {#each Object.keys($data.enums).sort() as id}
                <button
                  class="flex items-center gap-1.5 w-full text-left hover:bg-white/[0.04] transition-colors"
                  data-cat-id={id}
                  style="padding:3px 8px 3px 12px;font-size:13px;color:{$currentId === id ? '#e8aa00' : '#a0aac8'};background:{$currentId === id ? '#1c1f2e' : ''};border-left:2px solid {$currentId === id ? '#e8aa00' : 'transparent'};border-radius:0 3px 3px 0"
                  onclick={() => nav(id)}
                >
                  <span style="font-family:monospace;font-size:11px;flex-shrink:0;color:{$currentId === id ? '#e8aa00' : '#f472b6'};opacity:0.85">◉</span>
                  <span class="truncate">{$data!.enums[id].name}</span>
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      <!-- ── Lua Libraries ────────────────────────────────────── -->
      {#if luaLibraries($data.groupLists).length > 0}
        <div>
          <button
            class="flex items-center gap-2 w-full px-3 hover:text-slate-300 transition-colors"
            style="padding-top:9px;padding-bottom:9px;border-bottom:1px solid #1d2033"
            onclick={() => toggle('External Libraries')}
          >
            <div style="width:5px;height:5px;border-radius:50%;background:#34d399;flex-shrink:0"></div>
            <span style="font-size:11px;font-weight:700;letter-spacing:0.09em;text-transform:uppercase;color:#6b7aa0">Lua Libraries</span>
            <svg style="transform:rotate({openSections.has('External Libraries') ? 90 : 0}deg);transition:transform 0.15s;opacity:0.35;margin-left:auto" width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
              <path d="M3 2l4 3-4 3V2z"/>
            </svg>
          </button>
          {#if openSections.has('External Libraries')}
            <div style="border-bottom:1px solid #1d2033">
              {#each luaLibraries($data.groupLists) as lib}
                {@const libKey = 'Lua Libraries.' + lib}
                {@const libItems = $data.groupLists[libKey] ?? []}
                <div>
                  <button
                    class="flex items-center gap-1.5 w-full px-3 hover:text-slate-300 transition-colors"
                    style="padding-top:5px;padding-bottom:5px"
                    onclick={() => toggle(libKey)}
                  >
                    <svg style="flex-shrink:0;transform:rotate({openSections.has(libKey) ? 90 : 0}deg);transition:transform 0.15s;opacity:0.35" width="7" height="7" viewBox="0 0 10 10" fill="currentColor">
                      <path d="M3 2l4 3-4 3V2z"/>
                    </svg>
                    <span style="font-size:12px;font-weight:600;font-family:monospace;color:#3a9e7e">{lib}</span>
                    <span class="ml-auto" style="font-size:11px;color:#505870">{libItems.length}</span>
                  </button>
                  {#if openSections.has(libKey)}
                    <div class="pb-1">
                      {#each libItems as id}
                        {@const entry = ($data.items[id] as import('../lib/types').TypeItem | undefined) ?? $data.functions[id]}
                        <button
                          class="flex items-center gap-1.5 w-full text-left hover:bg-white/[0.04] transition-colors"
                          data-cat-id={id}
                          style="padding:3px 8px 3px 24px;font-size:13px;color:{$currentId === id ? '#e8aa00' : '#a0aac8'};background:{$currentId === id ? '#1c1f2e' : ''};border-left:2px solid {$currentId === id ? '#e8aa00' : 'transparent'};border-radius:0 3px 3px 0"
                          onclick={() => nav(id)}
                        >
                          {#if entry?.kind === 'function'}
                            <span style="color:#34d399;font-family:monospace;font-size:10px;opacity:0.7;flex-shrink:0">ƒ</span>
                          {:else if entry?.kind === 'variable'}
                            <span style="color:#4ade80;font-family:monospace;font-size:10px;opacity:0.7;flex-shrink:0">v</span>
                          {:else if entry?.kind === 'type' || entry?.kind === 'interface'}
                            <span style="color:#60a5fa;font-family:monospace;font-size:10px;opacity:0.7;flex-shrink:0">T</span>
                          {/if}
                          <span class="truncate">{entry?.name ?? id}</span>
                        </button>
                      {/each}
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

    {/if}
  </div>
</aside>
