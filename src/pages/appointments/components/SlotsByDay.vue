<template>
	<div class="container">
		<div class="day">
			<div class="weekDay">{{ weekDay }}</div>
			<div class="shortDay">{{ shortDay }}</div>
		</div>
		<div class="slots">
			<div v-for="(slot, index) in slots" :key="index">
				<button :class="{ selected: appointmentSelected && appointmentSelected.start === slot.start }"
					@click="selectDate(slot)" v-if="!slot.taken"> {{ getDateSlot(slot.start) }} </button>
				<span v-else> {{ getDateSlot(slot.start) }} </span>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { format, isToday, isTomorrow } from "date-fns";
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { type ISlot } from '@/types';

export default defineComponent({
	name: 'SlotsByDay',
	props: {
		day: {
			type: Date,
			required: true
		},
		slots: {
			type: Array as PropType<ISlot[]>,
			default: () => []
		},
		appointmentSelected: {
			type: Object as PropType<ISlot>,
			default: null
		}
	},
	computed: {
		shortDay() {
			return format(this.day, 'dd LLL');
		},
		weekDay() {
			if (isToday(this.day)) {
				return 'Today';
			}
			if (isTomorrow(this.day)) {
				return 'Tomorrow';
			}
			return format(this.day, 'EEE');
		}
	},
	methods: {
		getDateSlot(date: string) {
			return format(date, 'HH:mm');
		},
		selectDate(slot: ISlot) {
			this.$emit('selectDate', {
				start: slot.start,
				end: slot.end
			})
		}
	}
})
</script>
<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	gap: 12px;
	min-width: 36px;

	.day {
		display: flex;
		flex-direction: column;
		align-items: center;

		.weekDay {
			font-weight: 500;
		}

		.shortDay {
			font-size: 12px;
			color: var(--text-lightest);
		}
	}

	.slots {
		display: flex;
		flex-direction: column;
		gap: 12px;

		button {
			color: var(--blue);
			background-color: var(--blue-light);
			border: none;
			padding: 6px;
			width: 100%;
			cursor: pointer;
			border-radius: 4px;

			&.selected {
				background-color: var(--blue-bg);
				color: var(--vt-c-white);
			}
		}

		span {
			width: 100%;
			display: block;
			text-align: center;
			text-decoration: line-through;
			opacity: .5;
		}

	}
}
</style>