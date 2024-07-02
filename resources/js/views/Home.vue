<script setup>
import { ref } from 'vue'

defineOptions({ name: 'HomePage' })

const count = ref(0)
</script>
<template>
    <div class="container">
        <div class="logos">
        
		</div>
        <h2>BlitzPHP  + Vite + Vue + Inertia</h2>
        <p>
            <button @click="count++">You click me {{ count }} times</button>
        </p>
        <p>
            Edit resources/js/views/Home.vue to test HMR
        </p>
    </div>
</template>

<style>

</style>
