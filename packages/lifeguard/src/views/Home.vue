<template>
  <Container>
    <h1 class="text-3xl font-bold font-lato tracking-wide mb-6">Welkom, <span class="font-medium">{{ activeUser?.name }}
      </span>
    </h1>

    <div class="flex gap-10">
      <Schedule />
      <Holidays />
    </div>


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
import { ref, watch } from 'vue'
import Schedule from "@/components/generic/Schedule.vue"
import Holidays from "@/components/generic/Holidays.vue"

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
  components: { Container, Schedule, Holidays },

  setup() {
    const { firebaseUser } = useFirebase()

    const {
      loading: userLoading,
      result: user,
      error: userError,
    } = useQuery(GET_USER_BY_UID, {
      uid: firebaseUser.value?.uid,
    })


    const activeUser = ref<User | null>()

    watch(user, (Value) => {
      if (Value && Value.userByUid) {
        activeUser.value = Value.userByUid
      }
    })

    return {
      userLoading,
      user: user,
      userError,
      firebaseUser,
      activeUser
    }
  },
}
</script>