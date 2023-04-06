<script lang="ts">
    import Button from '$lib/Button.svelte'
    import { ToastType, type Toast, toasts } from '$lib/toasts/toasts'
    import {
        InformationCircle,
        ExclamationTriangle,
        ExclamationCircle,
        CheckCircle,
        Icon,
        XMark,
    } from 'svelte-hero-icons'
    import { expoInOut } from 'svelte/easing'
    import { fade, scale } from 'svelte/transition'
    export let toast: Toast
    //
</script>

<div
    class="relative w-80 min-h-[4rem] dark:bg-slate-800 bg-white shadow-lg rounded-md overflow-hidden flex flex-row items-center"
    transition:scale={{
        duration: 500,
        start: 0.8,
        easing: expoInOut,
    }}
>
    <div
        class="h-full w-1 absolute left-0 top-0 bg-gradient-to-b {toast.type}"
    />
    <Icon
        size="20"
        solid
        class="relative m-2 ml-4 flex-shrink-0 {toast.type}"
        src={toast.type == ToastType.info
            ? InformationCircle
            : toast.type == ToastType.success
            ? CheckCircle
            : toast.type == ToastType.warning
            ? ExclamationTriangle
            : toast.type == ToastType.error
            ? ExclamationCircle
            : ExclamationCircle}
    />
    <div class="flex flex-col p-4 pl-0">
        <h1 class="font-bold text-base">{toast.title}</h1>
        <p class="text-sm">{toast.content}</p>
    </div>
    <button
        on:click={() => {
            toasts.update((toasts) => toasts.filter((t) => t.id != toast.id))
        }}
        class="absolute top-0 right-0 m-4"
    >
        <Icon src={XMark} size="20" />
    </button>
</div>
