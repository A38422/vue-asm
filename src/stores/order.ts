import {defineStore} from "pinia";

export type Dish = {
    dish: string
    numServing: number
}

export type FormOrder = {
    meal: string
    numPeople: number
    restaurant: string
    dishes: Dish[]
}

export const useOrder = defineStore('order', {
    state: () => {
        return {
            formOrder: {} as FormOrder,
        }
    },
    getters: {
        getFormOrder: state => state.formOrder,
    },
    actions: {
        setMeal(value: string) {
            this.$state.formOrder.meal = value
        },

        setNumPeople(value: number) {
            this.$state.formOrder.numPeople = value
        },

        setRestaurant(value: string) {
            this.$state.formOrder.restaurant = value
        },

        setDishes(value: Dish[]) {
            this.$state.formOrder.dishes = value
        },

        clearFormOrder() {
            this.$state.formOrder = {} as FormOrder
        }
    },
})
