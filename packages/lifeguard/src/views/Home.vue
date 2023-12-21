<template>
  <!-- {{ firebaseUser }} -->
  <Container v-if="user.userByUid.accessPlatform === false">
    <Acces />
  </Container>
  <Container v-if="user.userByUid.accessPlatform">
    <div v-if="activeUserRole === 300">
         <h1 class="text-3xl font-lato tracking-wide mb-6">Welkom, <span class="font-lato font-bold">{{ user.userByUid.name
            }} {{ user.userByUid.surname }}
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
    </div>
    <div v-else>
      <HomeRedder></HomeRedder>
    </div>
  </Container>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import Container from '@/components/generic/Container.vue'
import HomeRedder from '@/components/generic/HomeRedder.vue'
import { GET_USER_BY_UID } from '@/graphql/user.query'
import useFirebase from '@/composables/useFirebase'
import { ref, watch, computed } from 'vue'
import Schedule from "@/components/generic/Schedule.vue"
import Holidays from "@/components/generic/Holidays.vue"
import Tasks from "@/components/generic/Tasks.vue"
import UseRealtime from "@/composables/useRealtime"
import ModalWindow from '@/components/generic/ModalWindow.vue'
import type { Itask } from '@/interfaces/task.interface'
import Acces from '@/components/generic/Acces.vue'

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
  components: { Container, Schedule, Holidays, Tasks, ModalWindow, Acces, HomeRedder },

  setup() {
    const { firebaseUser } = useFirebase()
    const activeUser = ref<User | null>()
    const activeUserRole = ref()

    const {
      loading: userLoading,
      result: user,
      error: userError,
    } = useQuery(GET_USER_BY_UID, {
      uid: firebaseUser.value?.uid,
    })

    const { on } = UseRealtime()
    const Todos = ref<any>([])


    //  watch(user, (Value:any) => {
    //   console.log('Watch function triggered');
    //    if (Value && Value.userByUid) {
    //       console.log("Test",Value.userByUid.role);

    //   }
    // });
    // if (user) {
    //   activeUserRole.value = user.value?.uid
    //   console.log("Role:", activeUserRole)
    // }


    on('todos', (todos) => {
      Todos.value = todos
    })


    watch(user, (Value) => {
      if (Value) {
        activeUser.value = Value.userByUid
      }
    })
    if(user){
      activeUserRole.value = user.value?.userByUid.role
      console.log("Role:", activeUserRole.value)
    }

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
      modalTaskData,
      activeUserRole,
    }
  },
}
</script>

