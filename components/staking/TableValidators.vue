<template>
  <CommonTableContainer
    :length="sortedEnrichedValidators.length"
    :columns="properties"
    :sort="sort"
    :loaded="loaded"
  >
    <StakingValidatorRow
      v-for="(validator, index) in sortedEnrichedValidators"
      :key="validator.operatorAddress"
      :index="index"
      :validator="validator"
    />
    <template slot="empty">
      <slot name="empty"></slot>
    </template>
  </CommonTableContainer>
</template>

<script>
import BigNumber from 'bignumber.js'

import network from '~/common/network'

export default {
  name: `StakingTableValidators`,
  components: {},
  props: {
    validators: {
      type: Array,
      required: true,
    },
    delegations: {
      type: Array,
      default: () => [],
    },
    rewards: {
      type: Array,
      default: () => [],
    },
    searchTerm: {
      type: Boolean,
      default: false,
    },
    loaded: {
      type: Boolean,
      default: true,
    },
  },
  data: () => ({
    sort: {
      property: `votingPower`,
      order: `desc`,
    },
    stakingDenom: network.stakingDenom,
  }),
  computed: {
    sortedEnrichedValidators() {
      return this.validators
        .map((validator) => {
          const delegation = this.getDelegation(validator)
          const delegationAmount = delegation ? delegation.amount : 0
          const rewards = this.getRewards(validator)
          const rewardAmount = rewards.find(
            (reward) =>
              reward.denom === this.stakingDenom && reward.amount > 0.000000001
          )
            ? this.filterStakingDenomReward(rewards)
            : 0
          return {
            ...validator,
            delegationAmount: BigNumber(delegationAmount),
            rewardAmount: BigNumber(rewardAmount),
            smallName: validator.name ? validator.name.toLowerCase() : '',
          }
        })
        .sort((aValidator, bValidator) => {
          const { property, order } = this.sort
          const isDesc = order === 'desc'
          const aProperty = aValidator[property]
          const bProperty = bValidator[property]
          // Compare any number in BigNumber
          if (!new BigNumber(aProperty).isNaN()) {
            const aNumber = new BigNumber(aProperty)
            const bNumber = new BigNumber(bProperty)
            if (aNumber.isEqualTo(bNumber)) return 0
            if (aNumber.isLessThan(bNumber)) return isDesc ? 1 : -1
            return isDesc ? -1 : 1
          }
          // Otherwise, use string compare
          return (
            `${aProperty}`.localeCompare(`${bProperty}`) * (isDesc ? -1 : 1)
          )
        })
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
          title: `Staked`,
          value: `delegationAmount`,
        },
        {
          title: `Rewards`,
          value: `rewardAmount`,
        },
        {
          title: `Expected Returns`,
          value: `expectedReturns`,
        },
        {
          title: `Voting Power`,
          value: `votingPower`,
        },
      ]
    },
  },
  methods: {
    getDelegation({ operatorAddress }) {
      return this.delegations.find(
        ({ validator }) => validator.operatorAddress === operatorAddress
      )
    },
    getRewards({ operatorAddress }) {
      if (this.rewards) {
        return (
          this.rewards
            /* istanbul ignore next */
            .filter(
              ({ validator }) => validator.operatorAddress === operatorAddress
            )
        )
      }
    },
    filterStakingDenomReward(rewards) {
      const stakingDenomRewards = rewards.filter(
        (reward) => reward.denom === this.stakingDenom
      )
      return stakingDenomRewards.length > 0 ? stakingDenomRewards[0].amount : 0
    },
  },
}
</script>
<style scoped>
.no-results {
  text-align: center;
  margin: 3rem;
  color: var(--dim);
  font-size: 12px;
}

.sortingOptions {
  margin: 0.5rem 1rem;
}

.sortingOptions li.active {
  color: var(--primary);
}

.sortingOptions li {
  padding: 1rem 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

.sorting-check {
  justify-content: space-between;
}

.sorting-check.inactive {
  color: var(--app-bg);
}

.sortingOptions .material-icons {
  font-size: 22px;
  width: 2rem;
  vertical-align: text-bottom;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media screen and (min-width: 768px) {
  .sortingOptions {
    display: none;
  }
}
</style>
