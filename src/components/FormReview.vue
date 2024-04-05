<script setup lang="ts">
import {ElMessageBox, ElNotification} from "element-plus";
import {useOrder} from "../stores/order.ts";
import {computed} from "vue";

const order = useOrder()

const formOrder = computed(() => order.$state.formOrder)

const onSubmit = () => {
    return ElMessageBox.confirm(
        'Are you sure you want to this order??',
        'Confirm',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'success',
        }
    ).then(() => {
        console.log(formOrder.value)

        ElNotification({
            title: 'Notification',
            message: 'Order placed successfully!',
            type: 'success',
        })

        return true
    }).catch(() => {
        return false
    })
}

defineExpose({
    onSubmit
})
</script>

<template>
    <el-form
        ref="form"
        label-position="left"
        label-width="120px"
    >
        <el-form-item label="Meal">
            <span>{{ formOrder.meal }}</span>
        </el-form-item>

        <el-form-item label="No of People">
            <span>{{ formOrder.numPeople }}</span>
        </el-form-item>

        <el-form-item label="Restaurant">
            <span>{{ formOrder.restaurant }}</span>
        </el-form-item>

        <el-form-item label="Dishes">
            <div style="border: 1px solid #C0C0C0; padding: 8px">
                <div v-for="item in formOrder.dishes"
                     :key="item.dish">
                    {{ item.dish }} - {{ item.numServing }}
                </div>
            </div>
        </el-form-item>
    </el-form>
</template>
