<script setup lang="ts">
import {ref, reactive} from 'vue'
import {mealCategory} from "../constants.ts";
import {useOrder} from "../stores/order.ts";
import {FormRules} from "element-plus";

interface RuleForm {
    meal: string
    numPeople: number
}

const order = useOrder()

const form = ref()
const formData = reactive<RuleForm>({
    meal: '',
    numPeople: 1,
})
const rules = reactive<FormRules<RuleForm>>({
    meal: [
        {
            required: true,
            message: 'Please Select a meal',
            trigger: 'change'
        },
    ],
    numPeople: [
        {
            required: true,
            message: 'Please Enter Number of people',
            trigger: 'blur',
        },
    ],
})

const onSubmit = () => {
    return form.value.validate((valid, fields) => {
        if (valid) {
            order.setMeal(formData.meal)
            order.setNumPeople(formData.numPeople)
        }
    })
}

const resetForm = () => {
    form.value.resetFields()
}

defineExpose({
    onSubmit,
    resetForm
})
</script>

<template>
    <el-form
        ref="form"
        :model="formData"
        :rules="rules"
        label-position="top"
    >
        <el-form-item label="Please Select a meal" prop="meal">
            <el-select v-model="formData.meal">
                <template
                    v-for="(item, index) in mealCategory"
                    :key="index"
                >
                    <el-option :label="item" :value="item"/>
                </template>
            </el-select>
        </el-form-item>

        <el-form-item label="Please Enter Number of people" prop="numPeople">
            <el-input-number
                v-model="formData.numPeople"
                controls-position="right"
                :min="1"
                :max="10"/>
        </el-form-item>
    </el-form>
</template>
