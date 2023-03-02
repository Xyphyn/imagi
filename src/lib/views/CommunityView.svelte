<script lang="ts">
    import { goto } from '$app/navigation'
    import Loader from '$lib/Loader.svelte'
    import Modal from '$lib/Modal.svelte'
    import { currentUser, pb } from '$lib/pocketbase'
    import { showToast } from '../../routes/app'

    export let expanded: boolean

    let loading = false

    let formData: any = {
        name: undefined,
        files: undefined,
        description: '',
    }

    function createCommunity() {
        loading = true
        if (!$currentUser) {
            goto('/login')
        }

        const data = new FormData()
        data.append('name', formData.name)
        data.append('description', formData.description)
        if (formData.files) {
            data.append('image', formData.files[0])
        }
        data.append('owner', $currentUser!.id)

        pb.collection('communities')
            .create(data)
            .then(() => {
                showToast(
                    'Success!',
                    'Your community was successfully created!',
                    'success'
                )

                loading = false

                goto(`/community/${formData.name}`)
            })
            .catch((err) => {
                loading = false

                showToast(
                    'Error',
                    "Could not create community. The community name must be alphanumeric lowercase. Check if you're verified.",
                    'error'
                )
            })
    }

    function onInput(input: InputEvent) {
        console.log(input)
    }
</script>

<Modal bind:expanded fullHeight={false}>
    {#if loading}
        <Loader />
    {/if}
    <h1>Create Community</h1>
    <p>
        A <b>community</b> is a place where you can post <b>organized</b> content.
    </p>
    <form on:submit|preventDefault={createCommunity} class="form">
        <input
            type="text"
            placeholder="Name (lowercase, alphanumeric)"
            maxlength="24"
            bind:value={formData.name}
        />
        <input
            type="text"
            placeholder="Description"
            maxlength="64"
            bind:value={formData.description}
        />
        <label for="community-avatar-upload" class="custom-file-upload">
            {#if formData.files}
                <span
                    style="max-width: 24ch; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"
                    >{formData.files[0].name}</span
                >
            {:else}
                Community Image
            {/if}
            <input
                id="community-avatar-upload"
                placeholder="Image"
                type="file"
                accept="image/*"
                bind:files={formData.files}
            />
        </label>
        <button type="submit">Let there be {formData.name ?? 'posts'}!</button>
    </form>
</Modal>

<style>
    .form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
