<script lang="ts">
    import { pb } from '$lib/backend/pocketbase'
    import Menu from '../menus/Menu.svelte'
    import MenuButton from '../menus/MenuButton.svelte'
    import TextInput from './TextInput.svelte'

    type T = $$Generic
    export let search: (search: string) => Promise<T[]>
    export let extract: (item: T) => string
    export let selected: T | null = null
    export let label = ''

    let input = ''
    let items: T[] = []
    let key = ''

    const handleInput = async (input: string) => {
        if (key) pb.cancelRequest(key)

        try {
            items = await search(input)
        } catch (err) {}
    }

    const handleSelect = (selected: T) => {
        input = extract(selected)
    }

    $: {
        if (selected != null) handleSelect(selected)
    }
</script>

<TextInput
    bind:value={input}
    on:input={(input) => handleInput(input.detail)}
    {label}
/>
<Menu open={items.length != 0} top absolute rtl={false} class="bottom-8">
    {#each items as item}
        <MenuButton onclick={() => (selected = item)}>
            {extract(item)}
        </MenuButton>
    {/each}
</Menu>
