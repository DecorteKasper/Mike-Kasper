<template>
    <Form @submit.prevent="SendTodo" class="flex flex-col gap-4">
        <label for="">
            <input class="bg-dark_grey" type="number" name="" id="" v-model="todoMessage.post">
        </label>
        <label for="">
            <textarea class="bg-dark_grey" cols="30" rows="10" v-model="todoMessage.description"
                placeholder="type something">
          </textarea>
        </label>
        <div>
            <button class="bg-dark_green">Send todo</button>
        </div>
    </Form>
</template>

<script lang="ts">
import { ADD_TODO } from '@/graphql/todo.mutation'
import { useMutation } from '@vue/apollo-composable'
import { ref } from 'vue'
export default {
    setup() {

        const { mutate: addTodo } = useMutation(ADD_TODO)
        const todoMessage = ref(
            {
                post: 0,
                description: "",
            }
        )

        const SendTodo = () => {
            const todo = {
                post: todoMessage.value.post,
                description: todoMessage.value.description,
                status: false,
                createdAt: new Date().toISOString(),
            }
            addTodo({
                createTodoInput: todo,
            }).then((result) => {
                if (!result?.data) {
                    throw new Error('Failed to add todo')
                }
                console.log('todo added', result.data)
            }).catch((error) => {
                console.log(error)
            })
        }

        return {
            SendTodo,
            todoMessage,
        }
    }
}
</script>