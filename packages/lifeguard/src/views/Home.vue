<template>
  <Container>
    <h1 class="text-3xl font-bold font-lato tracking-wide mb-6">Welkom, <span class="font-medium">{{ activeUser?.name }}
      </span>
    </h1>

    <div class="flex gap-10">
      <Schedule />
      <Holidays />
    </div>
    <div class="my-10">
      <Tasks @show-modal="showModal" v-if="sortedTodos.length > 0" :todoData="sortedTodos" />
    </div>
    <div>
      <ModalWindow @close-modal="closeModal" :isVisible="isModalVisible" :taskData="modalTaskData" />
    </div>

    <!-- <div>
      <ul>
        <li v-for="todo in sortedTodos" :key="todo.id">
          {{ todo.post }} - {{ todo.description }}
        </li>
      </ul>
    </div> -->


    <!-- <p>{{ firebaseUser }}</p> -->
    <!-- <div v-if="userLoading">Loading...</div>
    <div v-if="userError">
      {{ userError }}
    </div> -->

    <!-- <div v-if="user" class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-12">

      <div>
        <h2 class="text-lg font-semibold tracking-wide">
          {{ activeUser?.role }}
        </h2>
      </div>
    </div> -->
  </Container>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import Container from '@/components/generic/Container.vue'
import { GET_USER_BY_UID } from '@/graphql/user.query'
import useFirebase from '@/composables/useFirebase'
import { ref, watch, computed } from 'vue'
import Schedule from "@/components/generic/Schedule.vue"
import Holidays from "@/components/generic/Holidays.vue"
import Tasks from "@/components/generic/Tasks.vue"
import UseRealtime from "@/composables/useRealtime"
import ModalWindow from '@/components/generic/ModalWindow.vue'
import type { Itask } from '@/interfaces/task.interface'

// TODO: refactor to interface

interface User {
  id: string
  uid: string
  name: string
  surname: string
  email: string
  phoneNumber: string
  zipCode: number
  street: string
  role: string
}

export default {
  components: { Container, Schedule, Holidays, Tasks, ModalWindow },

  setup() {
    const { firebaseUser } = useFirebase()
    const activeUser = ref<User | null>()
    // console.log(firebaseUser.value)
    const {
      loading: userLoading,
      result: user,
      error: userError,
    } = useQuery(GET_USER_BY_UID, {
      uid: firebaseUser.value?.uid,
    })
    const { on } = UseRealtime()
    const Todos = ref<any>([])


    on('todos', (todos) => {
      Todos.value = todos
    })


    watch(user, (Value) => {
      if (Value && Value.userByUid) {
        activeUser.value = Value.userByUid
      }
    })

    const sortedTodos = computed(() => {
      const todosCopy = [...Todos.value]

      return todosCopy.sort((a, b) => {
        const dateA = new Date(a.createdAt) as any
        const dateB = new Date(b.createdAt) as any
        return dateB - dateA
      })
    })

    // Modal
    const modalTaskData = ref<Itask>()
    const isModalVisible = ref(false)
    const showModal = (task: any) => {
      isModalVisible.value = true
      modalTaskData.value = task;
    }

    const closeModal = () => {
      isModalVisible.value = false
    }


    return {
      userLoading,
      user: user,
      userError,
      firebaseUser,
      activeUser,
      sortedTodos,
      showModal,
      closeModal,
      isModalVisible,
      modalTaskData
    }
  },
}
</script>

