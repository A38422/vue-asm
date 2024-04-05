<script setup lang="ts">
import {ref, reactive, computed, watch} from 'vue'
import {useOrder} from "../stores/order.ts";
import {FormRules} from "element-plus";
import {dishes} from "../data/dishes.json"

interface RuleForm {
    restaurant: string
}

const order = useOrder()

const formOrder = computed(() => order.$state.formOrder)
const restaurants = computed(() => new Set(dishes.filter(x =>
        x &&
        x.availableMeals.includes(formOrder.value.meal)
    ).map(x => x.restaurant)
))

const form = ref()
const formData = reactive<RuleForm>({
    restaurant: '',
})
const rules = reactive<FormRules<RuleForm>>({
    restaurant: [
        {
            required: true,
            message: 'Please Select a Restaurant',
            trigger: 'change'
        },
    ],
})

const onSubmit = () => {
    return form.value.validate((valid, fields) => {
        if (valid) {
            order.setRestaurant(formData.restaurant)
        }
    })
}

watch(() => formOrder.value.meal, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        form.value.resetFields()
    }
}, {deep: true})

defineExpose({
    onSubmit
})
</script>

<template>
    <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        label-position="top"
    >
        <el-form-item label="Please Select a Restaurant" prop="restaurant">
            <el-select v-model="formData.restaurant">
                <template
                    v-for="(item, index) in restaurants"
                    :key="index"
                >
                    <el-option :label="item" :value="item"/>
                </template>
            </el-select>
        </el-form-item>
    </el-form>
</template>
