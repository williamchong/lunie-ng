<template>
  <div
    v-if="undelegations.length && undelegationsLoaded"
    class="table-container"
  >
    <h1>Unstaking</h1>
    <CommonTableContainer
      :length="undelegations.length"
      :columns="properties"
      :sort="sort"
      :loaded="undelegationsLoaded"
    >
      <StakingValidatorRow
        v-for="(undelegation, index) in sortedEnrichedUndelegations"
        :key="undelegation.validatorAddress + undelegation.startHeight"
        :index="index"
        :validator="undelegation.validator"
        :undelegation="undelegation"
      />
    </CommonTableContainer>
    <!-- <ModalWithdrawUnstaked ref="WithdrawModal" /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { orderBy } from '~/common/array'

export default {
  name: `Undelegations`,
  data: () => ({
    sort: {
      property: `endTime`,
      order: `desc`,
    },
  }),
  computed: {
    ...mapState('data', ['undelegations', 'undelegationsLoaded']),
    sortedEnrichedUndelegations() {
      return orderBy(
        this.undelegations.map((undelegation) => ({
          ...undelegation,
          undelegationAmount: undelegation.amount,
          smallName: undelegation.validator.name
            ? undelegation.validator.name.toLowerCase()
            : '',
        })),
        this.sort.property,
        this.sort.order
      )
    },
    properties() {
      return [
        {
          title: `Status`,
          value: `status`,
        },
        {
          title: `Name`,
          value: `smallName`,
        },
        {
          title: `Amount`,
          value: `undelegationAmount`,
        },
        {
          title: `End Time`,
          value: `endTime`,
        },
      ]
    },
  },
  methods: {
    onWithdraw() {
      this.$refs.WithdrawModal.open()
    },
  },
}
</script>
<style scoped>
.table-container {
  margin: 0 auto;
  width: 100%;
  padding: 3rem 4rem;
  background: var(--gray-200);
}

@media screen and (max-width: 1023px) {
  .table-container {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

@media screen and (max-width: 667px) {
  .table-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
