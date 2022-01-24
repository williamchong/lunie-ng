<template>
  <tr
    class="validator-row"
    :data-name="validator.name"
    @click="$router.push(`/validators/${validator.operatorAddress}`)"
  >
    <td class="cell index">{{ index + 1 }}</td>
    <td class="cell">
      <CommonStatus :label="validator.status" />
    </td>
    <td class="cell validator-info">
      <CommonAvatar
        class="validator-image"
        alt="generic validator logo - generated avatar from address"
        :address="validator.operatorAddress"
      />
      <div class="row">
        <h3 class="validator-name">
          {{ validator.name }}
        </h3>
      </div>
    </td>
    <template v-if="!undelegation">
      <td class="cell">
        {{
          validator.delegationAmount > 0
            ? prettyLong(validator.delegationAmount)
            : `--`
        }}
      </td>
      <td
        :class="[
          'cell',
          'reward',
          {
            'reward--has': validator.rewardAmount > 0,
          },
        ]"
      >
        {{
          validator.rewardAmount > 0 ? prettyLong(validator.rewardAmount) : `--`
        }}
      </td>
      <td class="cell">
        {{
          validator.expectedReturns
            ? bigFigureOrPercent(validator.expectedReturns)
            : `--`
        }}
      </td>
      <td class="cell">
        {{ validator.votingPower | bigFigureOrPercent }}
      </td>
    </template>
    <template v-else>
      <td class="cell">
        {{ undelegation.amount | prettyLong }}
      </td>
      <td class="cell">
        {{ undelegation.endTime | date }} ({{ undelegation.endTime | fromNow }})
      </td>
    </template>
  </tr>
</template>

<script>
import { bigFigureOrPercent, prettyLong } from '../../common/numbers'
import { date, fromNow } from '~/common/time'

export default {
  name: `ValidatorRow`,
  components: {},
  filters: {
    bigFigureOrPercent,
    date,
    fromNow,
    prettyLong,
  },
  props: {
    validator: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    undelegation: {
      type: Object,
      default: () => null,
    },
  },
  methods: {
    bigFigureOrPercent,
    prettyLong,
  },
}
</script>
<style scoped>
.validator-row {
  border-bottom: 1px solid var(--bc-dim);
}

td {
  padding: 0.5rem 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  vertical-align: middle;
}

h4,
h5 {
  font-size: var(--text-xs);
}

.cell.reward.reward--has {
  color: var(--success);
}

.validator-row:hover {
  cursor: pointer;
  background: var(--gray-100);
  color: var(--bright);
}

.validator-image {
  border-radius: 50%;
  height: 2.5rem;
  width: 2.5rem;
  min-width: 2.5rem;
  margin-right: 1rem;
}

.validator-info {
  display: flex;
  align-items: center;
}

.row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.validator-name {
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 18rem;
}
</style>
