<script setup lang="ts">
import {ref, reactive, computed, watch} from 'vue'
import {FormRules} from "element-plus";
import {dishes} from "../data/dishes.json"
import {useOrder} from "../stores/order.ts";

interface RuleForm {
    dish: string,
    numServing: number
}

const props = defineProps<{
    dishes: any
}>()

const emit = defineEmits(["on-change"])

const order = useOrder()

const formOrder = computed(() => order.$state.formOrder)
const dishOptions = computed(() => new Set(dishes.filter(x =>
        x &&
        x.restaurant === formOrder.value.restaurant &&
        x.availableMeals.includes(formOrder.value.meal) &&
        !props.dishes.find(o => o.dish === x.name)
    )
))

const form = ref()
const formData = reactive<RuleForm>({
    dish: '',
    numServing: 1
})
const rules = reactive<FormRules<RuleForm>>({
    dish: [
        {
            required: true,
            message: 'Please Select a Dish',
            trigger: 'change'
        },
    ],
    numServing: [
        {
            required: true,
            message: 'Please Enter no of servings',
            trigger: 'change'
        },
    ],
})

const onSubmit = () => {
    return form.value.validate()
}

watch(formData, () => {
    emit("on-change", {
        dish: formData.dish,
        numServing: formData.numServing
    })
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
        <div style="display: flex; gap: 10px">
            <el-form-item label="Please Select a Dish" prop="dish">
                <el-select v-model="formData.dish">
                    <template
                        v-for="(item, index) in dishOptions"
                        :key="index"
                    >
                        <el-option :label="item.name" :value="item.name"/>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="Please Enter no of servings" prop="numServing">
                <el-input-number
                    v-model="formData.numServing"
                    controls-position="right"
                    :min="1"
                    :max="10"
                />
            </el-form-item>
        </div>
    </el-form>
</template>
