<script>
  export let pressedKeys = [];
</script>

<ul>
  {#each pressedKeys as key}
    <li>
      {key}
    </li>
  {/each}
</ul>