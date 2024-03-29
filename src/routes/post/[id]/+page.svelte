<script lang="ts">
  import { pb, user } from '$lib/backend/pocketbase.js'
  import Comments from '$lib/misc/comments/Comments.svelte'
  import LikeButton from '$lib/misc/likes/LikeButton.svelte'
  import { isVideo } from '$lib/misc/posts/util.js'
  import Button from '$lib/ui/Button.svelte'
  import { Color } from '$lib/ui/colors.js'
  import Menu from '$lib/ui/menus/Menu.svelte'
  import MenuButton from '$lib/ui/menus/MenuButton.svelte'
  import {
    ChatBubbleOvalLeftEllipsis,
    EllipsisHorizontal,
    Icon,
    Square2Stack,
    Trash,
    ArrowDownTray,
  } from 'svelte-hero-icons'
  import { page } from '$app/stores'
  import { Collections } from '$lib/backend/schema.js'
  import { _ } from 'svelte-i18n'

  export let data
</script>

<title>{data.post.description}</title>
<meta property="og:title" content={data.post.description} />
<meta
  property="og:description"
  content={data.post.alt_text ||
    'View this post on Imagi, a real time social app.'}
/>
{#if isVideo(pb.getFileUrl(data.post, data.post.image))}
  <meta
    property="og:video"
    content={pb.getFileUrl(data.post, data.post.image)}
  />
{/if}
<meta property="og:image" content={pb.getFileUrl(data.post, data.post.image)} />
<meta property="#fff" data-react-helmet="true" name="theme-color" />
<meta name="twitter:card" content="summary_large_image" />

<div
  class="flex flex-col gap-4 p-6 mx-auto w-max max-w-full bg-white rounded-lg shadow-lg dark:bg-zinc-900"
>
  <div class="flex flex-col">
    <h1 class="text-xl font-bold">{data.post?.description}</h1>
    <span class="text-base opacity-80">
      <a
        href={`/user/${data.post?.expand?.user.username}`}
        class="transition-colors hover:text-sky-500"
      >
        {data.post?.expand?.user.username}
      </a>

      {#if data.post?.expand?.community}
        <a
          href={`/community/${data.post?.expand?.community.name}`}
          class="transition-colors hover:text-sky-500"
        >
          • {data.post?.expand?.community.name}
        </a>
      {/if}
    </span>
  </div>
  <div class="flex flex-col gap-4 items-center mt-4 w-full">
    {#if isVideo(pb.getFileUrl(data.post, data.post?.image))}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video controls loop class="max-w-xl max-h-[80vh] rounded-lg w-full">
        <source src={pb.getFileUrl(data.post, data.post?.image)} />
      </video>
    {:else}
      <img
        src={pb.getFileUrl(data.post, data.post?.image)}
        alt={data.post.alt_text || data.post.description}
        class="w-full max-w-xl rounded-lg"
        width={400}
        height={200}
      />
    {/if}
    <div class="flex flex-row gap-2 ml-auto">
      <div class="flex flex-row gap-1 items-center">
        <Icon src={ChatBubbleOvalLeftEllipsis} size="18" mini />
        {data.post.expand?.['postCounts(post)'][0].comments}
      </div>
      <LikeButton post={data.post} />
      <Menu>
        <Button color={Color.ghost} slot="button" class="h-9">
          <Icon src={EllipsisHorizontal} size="18" mini />
        </Button>
        <MenuButton
          onclick={() =>
            navigator.clipboard.writeText(
              `${$page.url.protocol}//${$page.url.hostname}/post/${data.post?.id}`
            )}
        >
          <Icon src={Square2Stack} size="18" />
          {$_('button.post.copy')}
        </MenuButton>

        <MenuButton
          onclick={() =>
            navigator.clipboard.writeText(
              `${pb.getFileUrl(data.post, data.post?.image)}`
            )}
        >
          <Icon src={ArrowDownTray} size="18" />
          Download
        </MenuButton>
        {#if data.post && data.post.user == $user?.id}
          <MenuButton
            onclick={async () => {
              if (!data.post) return
              await pb.collection(Collections.Posts).delete(data.post.id)
            }}
            color={Color.dangerSecondary}
          >
            <Icon src={Trash} mini size="18" />
            {$_('button.action.delete')}
          </MenuButton>
        {/if}
      </Menu>
    </div>
    <Comments post={data.post} />
  </div>
</div>
