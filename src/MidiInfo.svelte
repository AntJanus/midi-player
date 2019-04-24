<script>
  export let primaryInput = {};
</script>

<style>
</style>
{#if !primaryInput.name}
  No MIDI controller detected :(
{:else}
  <h1>{primaryInput.name}</h1>
  <h3>
    {primaryInput.manufacturer}
  </h3>
  <hr />
{/if}