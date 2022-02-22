<template>
  <div class="proposals">
    <div v-if="!proposalsLoaded">
      <CommonLoader />
    </div>
    <template v-else>
      <h3>Past Proposals</h3>
      <GovernanceProposalRow
        v-for="proposal in filteredProposals"
        :key="proposal.id"
        :proposal="proposal"
      />

      <CommonCard v-if="!filteredProposals.length">
        <div slot="title">No past proposals</div>
        <div slot="subtitle">
          There are no past proposals on this blockchain yet.
        </div>
      </CommonCard>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import network from '~/common/network'

export default {
  name: `Proposals`,
  data: () => ({
    network,
  }),
  computed: {
    ...mapState('data', [`proposals`, `proposalsLoaded`]),
    filteredProposals() {
      const now = Date.now()
      return this.proposals.filter(
        (proposal) => new Date(proposal.statusEndTime).getTime() < now
      )
    },
  },
  mounted() {
    this.$store.dispatch('data/getProposals')
  },
}
</script>

<style scoped>
.proposals {
  padding: 0 4rem 3rem;
}

h3 {
  font-size: 24px;
  color: var(--gray-800);
  font-weight: 600;
  padding: 3rem 0 1.5rem;
}

@media screen and (max-width: 1023px) {
  .proposals {
    padding: 1rem;
  }
}
</style>
