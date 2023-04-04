<script lang="ts">
    export let date: string

    const getDateDiff = (date: string) => {
        const diff = new Date().getTime() - new Date(date).getTime()
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        if (minutes < 1) {
            return 'Just now'
        } else if (minutes < 60) {
            return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
        } else if (hours < 24) {
            return `${hours} hour${hours === 1 ? '' : 's'} ago`
        } else {
            return `${days} day${days === 1 ? '' : 's'} ago`
        }
    }

    let clazz = ''
    export { clazz as class }
</script>

<p class={clazz}>{getDateDiff(date)}</p>
