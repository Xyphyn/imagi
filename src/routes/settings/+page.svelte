<script lang="ts">
    import Colored from '$lib/misc/Colored.svelte'
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
    class="flex flex-col items-center justify-center max-w-xl mx-auto dark:bg-slate-800 bg-white p-4 rounded-lg w-full shadow-lg gap-4"
>
    <Colored
        ><h1 class="font-bold text-4xl self-center mx-auto">
            User Settings
        </h1></Colored
    >
    <DisclosureButton
        class="flex flex-row self-start justify-between w-full gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
        let:open
        ><span>General</span>
        <Icon
            src={ChevronRight}
            size="20"
            class={`transition-transform ${open ? 'rotate-90' : ''}`}
        /></DisclosureButton
    >
    <DisclosurePanel>
        <div
            class="flex flex-row justify-between w-full items-center p-4 my-2 dark:bg-slate-700 bg-slate-50 rounded-lg"
        >
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
                class={`w-12 h-6 relative inline-flex items-center rounded-full transition-colors ${
                    $userSettings.nossr ? 'bg-secondary' : 'bg-slate-600'
                }`}
            >
                <span
                    aria-hidden="true"
                    class={`${
                        $userSettings.nossr ? 'translate-x-7' : 'translate-x-1'
                    }
                  pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
                /></Switch
            >
        </div>
    </DisclosurePanel>
</Disclosure>
