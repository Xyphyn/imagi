<script>
    import { Transition } from '@rgossiaux/svelte-headlessui'
    import { Icon, InformationCircle } from 'svelte-hero-icons'

    export let text = 'Base tooltip'
    export let center = false

    let shown = false

    let clazz = ''
    export { clazz as class }
</script>

<div
    class="relative overflow-visible"
    on:mouseenter={() => (shown = true)}
    on:mouseleave={() => (shown = false)}
>
    <div class="inline-block cursor-pointer {clazz}">
        <slot />
    </div>
    <Transition
        show={shown}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 translate-y-1"
        enterTo="transform opacity-100 translate-y-0 "
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 translate-y-0"
        leaveTo="transform opacity-0 translate-y-1"
    >
        <div
            class="text-sm absolute translate-y-0 pointer-events-none z-10 min-w-48 overflow-visible p-2 text-white bg-gray-800 rounded-md {center
                ? 'left-[50%] translate-x-[-50%]'
                : ''}"
        >
            <Icon src={InformationCircle} size="14" mini />
            <span class="flex flex-row items-center gap-1 overflow-visible">
                {text}
            </span>
        </div>
    </Transition>
</div>
