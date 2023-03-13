<script lang="ts">
    export let onclick: () => void = () => {}
    export let type: 'button' | 'submit' | 'reset' | null | undefined =
        undefined
    export let major: boolean = false
    export let colorType: 'danger' | 'success' | undefined = undefined
    export let label = 'Button'
    export let disabled = false

    let clazz: string = ''
    export { clazz as class }
</script>

<button
    aria-label={label}
    on:click={onclick}
    {type}
    class={`active:scale-95 px-3 py-2 rounded-md text-sm
focus:outline-4 bg-transparent flex flex-row gap-2 items-center hover:brightness-95 transition-all ease-out-expo ${
        // Please forgive me for this
        colorType == 'danger'
            ? 'bg-gradient-to-br from-red-400 to-red-500 text-white border-transparent dark:border-transparent'
            : colorType == 'success'
            ? 'bg-gradient-to-br from-green-400 to-green-500 border-transparent dark:border-transparent'
            : major
            ? 'bg-gradient-to-br from-primary to-secondary text-black border-transparent dark:border-transparent'
            : 'dark:bg-slate-700 bg-slate-100'
    } ${clazz} ${
        disabled
            ? 'opacity-30 pointer-events-none cursor-default border-primary'
            : ''
    }`}
    ><slot />
</button>
