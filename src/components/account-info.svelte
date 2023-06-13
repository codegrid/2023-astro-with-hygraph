<script>
  import { account, accountLoaded } from "../stores/account";
</script>

{#if $accountLoaded}
  {#if $account !== null}
    <p>ようこそ {$account.name} さん</p>
  {:else}
    <p>ようこそ ゲスト さん</p>
  {/if}
{:else}
  <div>...Loading</div>
{/if}
