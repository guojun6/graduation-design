<template>
    <div>
        <entry/>
    </div>
</template>

<script>
import entry from './components/entry';

export default {
    components: {
        [entry.name]: entry
    }
};
</script>
