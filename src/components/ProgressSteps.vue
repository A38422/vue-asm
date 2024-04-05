<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
    value: number;
}>()

const emit = defineEmits(['onClickStep'])

const steps = ref<Array<string>>([
    "Step 1",
    "Step 2",
    "Step 3",
    "Review",
])

const enable = (index) => {
    return index - props.value < 2
}

const handleClick = (index) => {
    if (enable(index)) emit('onClickStep', index)
}
</script>

<template>
    <el-steps
        :active="value"
        finish-status="success"
        simple
    >
        <template
            v-for="(step, index) in steps"
            :key="index"
        >
            <el-step
                :title="step"
                :class="{'step': enable(index)}"
                @click="handleClick(index)"
            />
        </template>
    </el-steps>
</template>
