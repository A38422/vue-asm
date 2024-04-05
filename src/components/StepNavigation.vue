<script setup lang="ts">
defineProps<{
    step: number
}>()

defineEmits(['onPrev', 'onNext'])
</script>

<template>
    <div class="step-control">
        <el-button
            v-if="step > 0 && step < 4"
            @click="$emit('onPrev')"
        >
            Previous
        </el-button>
        <div></div>
        <el-button
            v-if="step < 4"
            @click="$emit('onNext')">
            {{ step === 3 ? 'Submit' : 'Next' }}
        </el-button>
    </div>
</template>
