<script lang="ts">
    import {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
    } from '@rgossiaux/svelte-headlessui'
    import { Icon, ChevronRight } from 'svelte-hero-icons'
</script>

<Disclosure
    class="flex flex-col items-center max-w-lg bg-slate-800 p-4 rounded-lg w-full"
>
    <DisclosureButton
        class="flex flex-row self-start justify-between w-full"
        let:open
        ><span>General</span>
        <Icon
            src={ChevronRight}
            size="20"
            class={`transition-transform ${open ? 'rotate-90' : ''}`}
        /></DisclosureButton
    >
    <DisclosurePanel>ok</DisclosurePanel>
</Disclosure>
