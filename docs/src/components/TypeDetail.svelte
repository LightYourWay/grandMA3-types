<script lang="ts">
  import { data, navigate } from '../lib/store';
  import TypeStr from './TypeStr.svelte';
  import SourceLink from './SourceLink.svelte';
  import SectionHeader from './SectionHeader.svelte';
  import Markdown from './Markdown.svelte';
  import type { TypeItem } from '../lib/types';

  let { item }: { item: TypeItem } = $props();

  let showObjMethods = $state(false);
  let showObjProps = $state(true);

  function navTarget(prop: import('../lib/types').Property): string | null {
    if (!$data) return null;
    if (prop.typeRef && ($data.items[prop.typeRef] || $data.enums[prop.typeRef])) return prop.typeRef;
    if ($data.items[prop.typeStr] || $data.enums[prop.typeStr]) return prop.typeStr;
    return null;
  }

  const methods = $derived(item.methods ?? []);
  const hasObjMethods = $derived(item.isObjBased && ($data?.objMethods?.length ?? 0) > 0);
  const hasObjProps = $derived(item.isObjBased && ($data?.objProperties?.length ?? 0) > 0);

  const parentTypes = $derived(item.parentTypes ?? []);

  const children = $derived(
    (item.properties ?? []).filter(p => p.typeRef && $data?.items[p.typeRef]?.isObjBased && !p.fromObjProps)
  );
  const valueProps = $derived(
    (item.properties ?? []).filter(p => !(p.typeRef && $data?.items[p.typeRef]?.isObjBased && !p.fromObjProps))
  );

  const displayKind = $derived(item.isObjBased ? 'Object' : item.kind);
  const kindColor = $derived(
    item.isObjBased           ? '#e8aa00' :
    item.kind === 'interface' ? '#60a5fa' :
    item.kind === 'type'      ? '#a78bfa' :
    item.kind === 'variable'  ? '#4ade80' : '#dce1f0'
  );
</script>

<article class="py-6 px-4 lg:py-10 lg:px-10 max-w-[720px]">

  <!-- ── Header ──────────────────────────────────────────────────── -->
  <header class="mb-8">
    <div class="flex items-start justify-between gap-4 mb-3">
      <div class="flex items-center gap-3 flex-wrap">
        <h1 class="text-[28px] font-bold tracking-tight leading-none" style="color:#dce1f0">{item.name}</h1>
        <span class="badge-kind" style="color:{kindColor};border-color:{kindColor}33">{displayKind}</span>
        {#if item.objClassName && item.objClassName !== item.name}
          <span class="badge-muted">class "{item.objClassName}"</span>
        {/if}
      </div>
      <SourceLink sourceFile={item.sourceFile} sourceLine={item.sourceLine} class="shrink-0 mt-1 max-lg:hidden" />
    </div>

    {#if item.description}
      <Markdown source={item.description} class="mb-4" style="font-size:16px;line-height:1.75;color:#b0bbd5;max-width:62ch" />
    {/if}

    <!-- Parent / child-type meta -->
    {#if parentTypes.length > 0 || (item.childType && children.length === 0)}
      <div class="flex items-center gap-4 mb-3 text-sm" style="color:#6b7194">
        {#if parentTypes.length > 0}
          <span class="flex items-center gap-1.5">
            <span>{parentTypes.length === 1 ? 'Parent' : 'Parents'}:</span>
            {#each parentTypes as pt, i}
              {#if i > 0}<span style="color:#353850;font-size:11px;line-height:1;user-select:none">│</span>{/if}
              <button class="hover:underline" style="color:#a78bfa" onclick={() => navigate(pt)}>{pt}</button>
            {/each}
          </span>
        {/if}
        {#if item.childType && children.length === 0}
          <span class="flex items-center gap-1.5">
            <span>Child:</span>
            <TypeStr value={item.childType} />
          </span>
        {/if}
      </div>
    {/if}
  </header>

  <!-- Variable declaration block -->
  {#if item.kind === 'variable' && item.variableTypeStr}
    <div class="mb-8 font-mono text-sm rounded-lg px-5 py-3.5" style="background:#0d0f16;border:1px solid #252838">
      <span style="color:#a78bfa">{item.isConst ? 'const' : 'var'}</span>
      <span style="color:#dce1f0"> {item.name}</span>
      <span style="color:#454d6a">: </span>
      <span style="color:#4ade80">{item.variableTypeStr}</span>
    </div>
  {/if}

  <!-- ── Union Members ─────────────────────────────────────────────── -->
  {#if item.unionMembers?.length}
    <section class="mb-10">
      <SectionHeader title="Values" count={item.unionMembers.length} />
      <div class="member-list">
        {#each item.unionMembers as m, i}
          <div class="member-row" style="{i > 0 ? 'border-top:1px solid #141620' : ''}">
            <code class="text-sm font-mono" style="color:#a78bfa">{typeof m.value === 'string' ? `'${m.value}'` : String(m.value)}</code>
          </div>
        {/each}
      </div>
    </section>
  {/if}

  <!-- ── Children ─────────────────────────────────────────────────── -->
  {#if children.length > 0}
    <section class="mb-10">
      <SectionHeader title="Children" count={children.length} />
      <div class="member-list">
        {#each children as prop, i}
          <button
            class="member-row member-row--link"
            style="{i > 0 ? 'border-top:1px solid #141620' : ''}"
            onclick={() => navigate(prop.typeRef!)}
          >
            <div class="flex items-center gap-2 flex-wrap">
              <code class="text-sm font-bold" style="color:#dce1f0">{prop.name}</code>
              <span style="color:#3d4460;font-size:13px">:</span>
              <TypeStr value={prop.typeStr} ref={prop.typeRef} />
            </div>
            {#if prop.description}
              <Markdown source={prop.description} class="mt-1.5 leading-relaxed" style="font-size:13px;color:#707aaa" />
            {/if}
          </button>
        {/each}
      </div>
    </section>
  {/if}

  <!-- ── Properties ─────────────────────────────────────────────── -->
  {#if valueProps.length > 0}
    <section class="mb-10">
      <SectionHeader title="Properties" count={valueProps.length} />
      <div class="member-list">
        {#snippet propContent(prop: import('../lib/types').Property)}
          <div class="flex items-center gap-2 flex-wrap">
            <code class="text-sm font-bold" style="color:{prop.readonly ? '#7a8aaa' : '#dce1f0'}">{prop.name}{prop.optional ? '?' : ''}</code>
            {#if prop.readonly}<span class="badge-readonly">readonly</span>{/if}
            <span style="color:#3d4460;font-size:13px">:</span>
            <TypeStr value={prop.typeStr} ref={prop.typeRef} />
          </div>
          {#if prop.description}
            <Markdown source={prop.description} class="mt-1.5 leading-relaxed" style="font-size:13px;color:#707aaa" />
          {/if}
        {/snippet}
        {#each valueProps as prop, i}
          {@const border = i > 0 ? 'border-top:1px solid #141620' : ''}
          {@const target = navTarget(prop)}
          {#if target}
            <button class="member-row member-row--link" style={border} onclick={() => navigate(target)}>
              {@render propContent(prop)}
            </button>
          {:else}
            <div class="member-row" style={border}>
              {@render propContent(prop)}
            </div>
          {/if}
        {/each}
      </div>
    </section>
  {/if}

  <!-- ── Methods ────────────────────────────────────────────────── -->
  {#if methods.length > 0}
    <section class="mb-10">
      <SectionHeader title="Methods" count={methods.length} />
      <div class="space-y-3">
        {#each methods as m}
          <div class="rounded-lg" style="background:#161820;border:1px solid #1e2130">
            <div class="px-4 pt-3.5 pb-3 font-mono text-sm" style="border-bottom:1px solid #1a1d2a">
              <span style="color:#fb923c">{m.name}</span><span style="color:#454d6a">(</span>{#each m.signatures.slice(0,1) as sig}{sig.params.map(p => `${p.name}${p.optional?'?':''}: ${p.typeStr}`).join(', ')}{/each}<span style="color:#454d6a">)</span>
              {#each m.signatures.slice(0,1) as sig}
                <span style="color:#454d6a"> → </span><TypeStr value={sig.returnType} />
              {/each}
            </div>
            {#if m.description}
              <Markdown source={m.description} class="px-4 py-2.5 leading-relaxed" style="font-size:13px;color:#808aae" />
            {/if}
          </div>
        {/each}
      </div>
    </section>
  {/if}

  <!-- ── Inherited Obj Properties ─────────────────────────────── -->
  {#if hasObjProps}
    <section class="mb-10">
      <button
        class="section-header w-full text-left hover:opacity-80 transition-opacity"
        onclick={() => showObjProps = !showObjProps}
      >
        <svg style="transform:rotate({showObjProps ? 90 : 0}deg);transition:transform 0.15s;color:#3a4060;flex-shrink:0" width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
          <path d="M3 2l4 3-4 3V2z"/>
        </svg>
        <span>Object Properties</span>
        <span class="section-count">{$data!.objProperties.length} inherited</span>
      </button>

      {#if showObjProps}
        <div class="member-list mt-0" style="border-top:none;border-radius:0 0 8px 8px">
          {#each $data!.objProperties as prop, i}
            <div class="member-row" style="{i > 0 ? 'border-top:1px solid #141620' : ''}">
              <div class="flex items-center gap-2 flex-wrap">
                <code class="text-sm font-bold" style="color:{prop.readonly ? '#7a8aaa' : '#dce1f0'}">{prop.name}{prop.optional ? '?' : ''}</code>
                {#if prop.readonly}<span class="badge-readonly">readonly</span>{/if}
                <span style="color:#3d4460;font-size:13px">:</span>
                <TypeStr value={prop.typeStr} ref={prop.typeRef} />
              </div>
              {#if prop.description}
                <Markdown source={prop.description} class="text-xs mt-1" style="color:#454d6a" />
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </section>
  {/if}

  <!-- ── Inherited Obj Methods ──────────────────────────────────── -->
  {#if hasObjMethods}
    <section class="mb-10">
      <button
        class="section-header w-full text-left hover:opacity-80 transition-opacity"
        onclick={() => showObjMethods = !showObjMethods}
      >
        <svg style="transform:rotate({showObjMethods ? 90 : 0}deg);transition:transform 0.15s;color:#3a4060;flex-shrink:0" width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
          <path d="M3 2l4 3-4 3V2z"/>
        </svg>
        <span>Object Methods</span>
        <span class="section-count">{$data!.objMethods.length} inherited</span>
      </button>

      {#if showObjMethods}
        <div class="member-list mt-0" style="border-top:none;border-radius:0 0 8px 8px">
          {#each $data!.objMethods as m, i}
            <div class="member-row" style="{i > 0 ? 'border-top:1px solid #141620' : ''}">
              <div class="font-mono text-sm flex items-center gap-1 flex-wrap">
                <span style="color:#fb923c">{m.name}</span>
                {#each m.signatures.slice(0,1) as sig}
                  <span style="color:#454d6a">(</span><span style="color:#6b7194">{sig.params.map(p => p.name + (p.optional?'?':'') + ': ' + p.typeStr).join(', ')}</span><span style="color:#454d6a">)</span>
                  <span style="color:#454d6a"> → </span><TypeStr value={sig.returnType} />
                {/each}
              </div>
              {#if m.description}
                <Markdown source={m.description} class="text-xs mt-1" style="color:#454d6a" />
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </section>
  {/if}

  <div class="lg:hidden flex justify-end pt-4 mt-2">
    <SourceLink sourceFile={item.sourceFile} sourceLine={item.sourceLine} />
  </div>

</article>
