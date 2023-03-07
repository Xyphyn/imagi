<script lang="ts">
    import {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Switch,
    } from '@rgossiaux/svelte-headlessui'
    import { Icon, ChevronRight } from 'svelte-hero-icons'
    import { userSettings } from '../../stores'
</script>

<Disclosure
    class="flex flex-col items-center max-w-lg mx-auto dark:bg-slate-800 bg-white p-4 rounded-lg w-full shadow-lg h-full"
>
    <DisclosureButton
        class="flex flex-row self-start justify-between w-full gap-4"
        let:open
        ><span>General</span>
        <Icon
            src={ChevronRight}
            size="20"
            class={`transition-transform ${open ? 'rotate-90' : ''}`}
        /></DisclosureButton
    >
    <DisclosurePanel>
        <div class="flex flex-row justify-between w-full items-center">
            <span class="flex flex-col w-[80%]"
                >No-SSR Posts <span class="opacity-50 text-sm"
                    >Loads posts client side, opening posts in a dialog instead
                    of a page.</span
                >
            </span>
            <Switch
                checked={$userSettings.nossr}
                on:change={(e) => {
                    $userSettings.nossr = e.detail
                }}
                class={`w-12 relative inline-flex rounded-full transition-colors ${
                    $userSettings.nossr ? 'bg-primary' : 'bg-slate-700'
                }`}
            >
                <span
                    aria-hidden="true"
                    class={`${
                        $userSettings.nossr ? 'translate-x-6' : 'translate-x-0'
                    }
                  pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                /></Switch
            >
        </div>
    </DisclosurePanel>
</Disclosure>
