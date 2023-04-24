<script>
  import { onMount } from "svelte";
  import { fetchAccount } from "../libs/api";

  let account = null;

  onMount(async () => {
    account = await fetchAccount();
  });
</script>

{#if account !== null}
  <p>ようこそ {account.name} さん</p>
{:else}
  <div>...Loading</div>
{/if}
