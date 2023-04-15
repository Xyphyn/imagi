<script>
    import SwitchInput from '$lib/ui/input/SwitchInput.svelte'
    import { userSettings } from '$lib/settings'
    import Button from '$lib/ui/Button.svelte'
    import MultiSelect from '$lib/ui/input/MultiSelect.svelte'
    import Setting from '../Setting.svelte'
</script>

<title>Settings | General</title>
<Setting>
    <span slot="title">Grid</span>
    <p slot="description">Makes the post lists a grid rather than a column.</p>
    <SwitchInput bind:enabled={$userSettings.grid} />
    <span class="text-sm">
        {$userSettings.grid ? 'Enabled' : 'Disabled'}
    </span>
</Setting>
<Setting>
    <span slot="title">Thumbnail Size</span>
    <p slot="description">
        The resolution to make thumbnails. 64x64 will disable video thumbnails.
    </p>
    <MultiSelect
        separate={false}
        options={['256x256', '128x128', '64x64']}
        bind:selected={$userSettings.thumbSize}
    />
</Setting>
