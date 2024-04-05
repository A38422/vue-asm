<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {useOrder} from "../stores/order.ts";
import {Minus, Plus} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

const order = useOrder()

const formOrder = computed(() => order.$state.formOrder)
const refFormItemStep3 = ref()
const dishes = ref([
    {
        key: new Date().getTime(),
        dish: '',
        numServing: 1,
    }
])

const handleChangeDish = (data, index) => {
    dishes.value[index] = {
        ...dishes.value[index],
        dish: data.dish,
        numServing: data.numServing,
    }
}

const handleAdd = () => {
    dishes.value.push({
        key: new Date().getTime(),
        dish: "",
        numServing: 1,
    })
}

const handleRemove = (index) => {
    dishes.value.splice(index, 1)
}

const onSubmit = async () => {
    let isValid = true
    for (const item of refFormItemStep3.value) {
        const check = await item.onSubmit()
        if (!check) isValid = check
    }

    order.setDishes(dishes.value.map(x => {
        return {
            dish: x.dish,
            numServing: x.numServing
        }
    }))

    const totalNumServing = dishes.value.reduce((acc, curr) => acc + curr.numServing, 0);

    if (totalNumServing > 10) {
        ElMessage.error("Total number of dishes must be less than or equal 10")
        return false
    }

    if (totalNumServing < formOrder.value.numPeople) {
        ElMessage.error("Total number of dishes must be than or equal to num of people")
        return false
    }

    return isValid
}

watch(() => formOrder.value.restaurant, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        dishes.value = [{
            key: new Date().getTime(),
            dish: '',
            numServing: 1,
        }]
    }
}, {deep: true})

defineExpose({
    onSubmit
})
</script>

<template>
    <div>
        <div
            v-for="(dish, index) in dishes"
            :key="dish.key"
            class="form-item"
        >
            <FormItemStep3 ref="refFormItemStep3" :dishes="dishes"
                           @on-change="(data) => handleChangeDish(data, index)"/>
            <el-button v-if="index !== 0" :icon="Minus" circle @click="handleRemove(index)"/>
        </div>

        <el-button v-if="dishes.length < 10" :icon="Plus" circle @click="handleAdd"/>
    </div>
</template>
