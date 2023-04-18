<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { Icon, ExclamationCircle } from 'svelte-hero-icons'

    export let label = ''
    export let type: 'text' | 'password' | 'email' | null | undefined = 'text'
    export let placeholder = ''
    export let value = ''
    export let maxlength: number = -1
    export let err: any = null

    function typeAction(node: Node) {
        // @ts-ignore
        node.type = type
    }

    let clazz = ''
    export { clazz as class }

    const dispatcher = createEventDispatcher<{ input: string }>()
</script>

<label class="flex flex-col items-center {clazz}">
    {#if label != ''}
        <span
            class="font-bold text-sm text-left mb-1 cursor-pointer w-max self-start {err
                ? 'text-red-500'
                : ''}"
        >
            {label}
            {#if err}
                <Icon src={ExclamationCircle} size="16" mini class="inline" />
            {/if}
        </span>
    {/if}
    <input
        use:typeAction
        bind:value
        on:input={() => dispatcher('input', value)}
        {placeholder}
        {maxlength}
        class="w-full px-3 text-sm py-2.5 bg-transparent border border-black/20
        dark:border-white/20 dark:focus:border-white focus:outline-none focus:border-black transition-colors rounded-md {clazz}
        {err
            ? 'border-red-500 focus:border-red-500 focus:dark:border-red-500 dark:border-red-500'
            : ''}"
    />
</label>
