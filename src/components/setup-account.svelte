<script>
  import { onMount } from "svelte";
  import { fetchAccount } from "../libs/api";
  import { account, accountLoaded } from "../stores/account";

  onMount(async () => {
    const _account = await fetchAccount();
    account.set(_account);
    accountLoaded.set(true);
  });
</script>
