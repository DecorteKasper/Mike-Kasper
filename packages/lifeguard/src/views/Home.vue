<template>
  <Container>
    <h1 class="text-4xl font-bold tracking-wide mb-6">Lifeguards</h1>

    <div v-if="lifeguardsLoading">Loading...</div>
    <div v-if="lifeguardsError">
      {{ lifeguardsError }}
    </div>

    <div v-if="lifeguards" class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-12">
      <div v-for="lifeguard in lifeguards.lifeguards" class="flex items-center gap-6">
        <div>
          <h2 class="text-lg font-semibold tracking-wide">
            {{ lifeguard.name }}
          </h2>

        </div>
      </div>
    </div>
  </Container>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import Container from '@/components/generic/Container.vue'
import { ALL_LIFEGUARDS } from '@/graphql/lifeguard.query'

// TODO: refactor to interface
interface Lifeguard {
  id: string
  name: string
  surname: string
  email: string
}

export default {
  components: { Container },

  setup() {
    const {
      loading: lifeguardsLoading,
      result: lifeguards,
      error: lifeguardsError,
    } = useQuery(ALL_LIFEGUARDS)

    return {
      lifeguardsLoading,
      lifeguards: lifeguards,
      lifeguardsError,
    }
  },
}
</script>