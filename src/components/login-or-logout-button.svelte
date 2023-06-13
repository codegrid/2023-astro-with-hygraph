<script>
  import { account, accountLoaded } from "../stores/account";

  const login = () => {
    document.cookie =
      "cgdemo-2023-astro-with-hygraph=dummy;";
    location.reload();
  };

  const logout = () => {
    document.cookie =
      "cgdemo-2023-astro-with-hygraph=deleted; max-age=0";
    location.reload();
  };
</script>

{#if $accountLoaded}
  {#if $account === null}
    <button on:click={login} type="button">Login</button>
  {:else}
    <button on:click={logout} type="button">Logout</button>
  {/if}
{/if}
