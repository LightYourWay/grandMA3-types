<script lang="ts">
  let { title, count, style: styleProp }: {
    title: string;
    count?: number | string;
    style?: string;
  } = $props();
</script>

<div class="section-header" style={styleProp}>
  <span>{title}</span>
  {#if count !== undefined}
    <span class="section-count">{count}</span>
  {/if}
</div>
