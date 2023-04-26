<script>
  import { onMount } from "svelte";
  import { fetchAccount } from "../libs/api";
  import { account } from "../stores/account";

  onMount(async () => {
    const _account = await fetchAccount();
    account.set(_account);
  });
</script>

{#if $account !== null}
  <p>ようこそ {$account.name} さん</p>
{:else}
  <div>...Loading</div>
{/if}
