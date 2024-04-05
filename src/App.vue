<script setup lang="ts">
import {ref} from "vue";
import {useOrder} from "./stores/order.ts";

const order = useOrder()

const step = ref<number>(0)
const refFomStep1 = ref()
const refFomStep2 = ref()
const refFomStep3 = ref()
const refReview = ref()

const next = async () => {
    if (step.value > 3) return

    let isValid = await submitForm()

    if (isValid) step.value++
}

const prev = () => {
    if (step.value > 0) step.value--
}

const onClickStep = async (index) => {
    if (index <= step.value) return step.value = index

    let isValid = await submitForm()

    if (isValid) step.value = index
}

const submitForm = async () => {
    let isValid = false
    switch (step.value) {
        case 0:
            isValid = await refFomStep1.value.onSubmit()
            break
        case 1:
            isValid = await refFomStep2.value.onSubmit()
            break
        case 2:
            isValid = await refFomStep3.value.onSubmit()
            break
        case 3:
            isValid = await refReview.value.onSubmit()
            break
    }
    return isValid
}

const handleClickContinue = () => {
    order.clearFormOrder()
    refFomStep1.value.resetForm()
    step.value = 0
}
</script>

<template>
    <div class="main">
        <ProgressSteps :value="step" @on-click-step="onClickStep"/>

        <div class="form">
            <FormStep1 v-show="step === 0" ref="refFomStep1"/>
            <FormStep2 v-show="step === 1" ref="refFomStep2"/>
            <FormStep3 v-show="step === 2" ref="refFomStep3"/>
            <FormReview v-show="step === 3" ref="refReview"/>
            <div v-show="step === 4" style="text-align: center">
                <el-button type="success" @click="handleClickContinue">Continue</el-button>
            </div>
        </div>

        <StepNavigation :step="step" @on-next="next" @on-prev="prev"/>
    </div>
</template>
