<script lang="ts">
  import { onMount } from 'svelte';
  import { data, currentId, navigate } from './lib/store';
  import HierarchySidebar from './components/HierarchySidebar.svelte';
  import CatalogSidebar from './components/CatalogSidebar.svelte';
  import Detail from './components/Detail.svelte';

  let loading = $state(true);
  let error = $state<string | null>(null);
  let sidebarOpen = $state(false);
  let treeOpen = $state(false);

  // Close drawers on navigation
  $effect(() => { void $currentId; sidebarOpen = false; treeOpen = false; });

  onMount(async () => {
    try {
      const res = await fetch('./data.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      $data = await res.json();
      const hash = location.hash.slice(1);
      if (hash) {
        currentId.set(hash);
      } else {
        navigate('Root');
      }
    } catch (e) {
      error = (e as Error).message;
    } finally {
      loading = false;
    }
  });
</script>

<div class="flex flex-col h-screen overflow-hidden" style="background:#0c0d12">
  <header
    class="flex items-center gap-3 px-4 lg:px-6 shrink-0"
    style="height:54px;background:#0d0f16;border-bottom:1px solid #1d2033"
  >
    <!-- Tree toggle (left, mobile only) -->
    <button
      class="lg:hidden flex items-center justify-center shrink-0 rounded"
      style="width:32px;height:32px;color:{treeOpen ? '#60a5fa' : '#6b7194'}"
      onclick={() => { treeOpen = !treeOpen; sidebarOpen = false; }}
      aria-label="Toggle object tree"
    >
      {#if treeOpen}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      {:else}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="1" y="1.5" width="4" height="3" rx="0.75"/>
          <rect x="11" y="1.5" width="4" height="3" rx="0.75"/>
          <rect x="11" y="6.5" width="4" height="3" rx="0.75"/>
          <rect x="11" y="11.5" width="4" height="3" rx="0.75"/>
          <path d="M5 3H8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5"/>
          <path d="M9 3h2M9 8h2M9 13h2"/>
        </svg>
      {/if}
    </button>

    <button class="flex items-center gap-2.5" onclick={() => navigate('Root')} aria-label="Home">
      <div style="width:3px;height:22px;border-radius:2px;background:linear-gradient(180deg,#e8aa00,#f97316);flex-shrink:0"></div>
      <span style="font-size:17px;font-weight:700;letter-spacing:-0.02em;color:#dce1f0">grandMA3</span>
      <span style="font-size:17px;font-weight:300;color:#5a6285">Types</span>
    </button>
    {#if $data}
      <span style="font-size:12px;padding:3px 8px;border-radius:4px;background:#1a1d2e;color:#545c7a;font-family:monospace">v{$data.version}</span>
    {/if}

    <div class="ml-auto flex items-center gap-2">
      <a
        href="https://github.com/LightYourWay/grandMA3-types"
        target="_blank"
        rel="noopener"
        style="color:#3a4060;display:flex;align-items:center"
        aria-label="GitHub repository"
        onmouseenter={(e) => (e.currentTarget as HTMLElement).style.color='#6b7194'}
        onmouseleave={(e) => (e.currentTarget as HTMLElement).style.color='#3a4060'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
      </a>

      <!-- Catalog toggle (right, mobile only) -->
      <button
        class="lg:hidden flex items-center justify-center shrink-0 rounded"
        style="width:32px;height:32px;color:{sidebarOpen ? '#e8aa00' : '#6b7194'}"
        onclick={() => { sidebarOpen = !sidebarOpen; treeOpen = false; }}
        aria-label="Toggle catalog"
      >
        {#if sidebarOpen}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        {:else}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="7"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        {/if}
      </button>
    </div>
  </header>

  <div class="flex flex-1 min-h-0 relative">
    {#if loading}
      <div class="flex items-center justify-center w-full" style="color:#454d6a">Loading…</div>
    {:else if error}
      <div class="flex items-center justify-center w-full text-red-400">Failed to load data: {error}</div>
    {:else}
      <!-- Mobile backdrop -->
      {#if sidebarOpen || treeOpen}
        <button
          class="lg:hidden fixed inset-0 z-40"
          style="background:rgba(0,0,0,0.5);top:54px;cursor:default"
          onclick={() => { sidebarOpen = false; treeOpen = false; }}
          aria-label="Close panel"
        ></button>
      {/if}

      <HierarchySidebar open={treeOpen} />
      <main class="flex-1 min-w-0 overflow-y-auto" style="background:#0c0d12">
        <Detail />
      </main>
      <CatalogSidebar open={sidebarOpen} />
    {/if}
  </div>
</div>
