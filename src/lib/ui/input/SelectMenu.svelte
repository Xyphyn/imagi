<script lang="ts">
    import { Color } from '../colors'
    import Menu from '../menus/Menu.svelte'
    import MenuButton from '../menus/MenuButton.svelte'

    type T = $$Generic

    export let options: T[]
    export let optionNames: Map<any, string> = new Map()
    export let selected: T

    let open = false
    //
</script>

<Menu absolute top rtl={false}>
    <button
        class="flex flex-row gap-2 items-center px-3 py-1.5 w-full text-sm
        transition-all max-w-64 {Color.ghost} rounded-md"
        slot="button"
    >
        {optionNames.get(selected) || selected}
    </button>
    {#each options as option}
        <MenuButton onclick={() => (selected = option)}>
            {optionNames.get(option) || option}
        </MenuButton>
    {/each}
</Menu>
