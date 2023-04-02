<script lang="ts">
    import { goto } from '$app/navigation'
    import Button from '$lib/Button.svelte'
    import Modal from '$lib/Modal.svelte'
    import { pb, currentUser } from '$lib/pocketbase'
    import { toast } from '../../app'

    export let open = false

    let confirm = ''

    function deleteAccount() {
        if (confirm != 'Yes, delete my account!') return

        pb.collection('users')
            .delete($currentUser!.id)
            .then(() => {
                toast(
                    'Deletion',
                    'Your account has been deleted. Goodbye!',
                    'info'
                )
                goto('/')
            })
    }
</script>

<Modal bind:open>
    <div class="flex flex-col gap-4 items-center p-8">
        <h1
            class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-red-500"
        >
            Delete Account
        </h1>
        <p>
            This action is <b>permanent.</b>
            All of your comments and posts will be deleted.
        </p>
        <p>
            To confirm, type "
            <b>Yes, delete my account!</b>
            " (case sensitive)
        </p>
        <input
            type="text"
            maxlength="24"
            placeholder="Confirm"
            bind:value={confirm}
        />
        <Button
            onclick={deleteAccount}
            colorType="danger"
            class={`${
                confirm == 'Yes, delete my account!'
                    ? ''
                    : 'opacity-50 cursor-not-allowed'
            }`}
        >
            Delete my account
        </Button>
    </div>
</Modal>
