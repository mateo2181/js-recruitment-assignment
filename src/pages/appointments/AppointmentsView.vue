<template>
    <div class="container">
        <CurrentAppointment :doctor="appointment.doctor" :date="formatDate(appointment.startDate, 'PPPPpp')"
            :loading="updatingAppointment" />
        <div>
            <h2>Did you have an unexpected situation?</h2>
            <p>You can change the appointment for when it suits you better</p>
        </div>
        <div class="card calendar">
            <button :disabled="indexWeek === 0" @click="indexWeek--" class="arrow" aria-label="Previous Week">
                <v-icon :scale="1.8" name="md-keyboardarrowleft" />
            </button>
            <div class="calendarContent">
                <v-icon v-if="loading" class="loader" :scale="2" name="ri-loader-3-fill" animation="spin" />
                <template v-else>
                    <div class="week">
                        <CustomCollapse class="days" :minHeight="400" :expanded="expandedView">
                            <SlotsByDay v-for="day in days.slice(indexWeek * 7, (indexWeek * 7) + 7)" :key="day"
                                :day="day" :slots="getSlotsByDay(day)" @selectDate="selectDate"
                                :appointmentSelected="appointmentSelected" />
                        </CustomCollapse>
                    </div>

                    <button class="expandSlots" @click="expandedView = !expandedView" aria-label="See More Hours">
                        {{ expandedView ? 'Less' : 'See more hours' }}
                        <v-icon v-if="!expandedView" name="md-keyboardarrowdown" />
                        <v-icon v-else name="md-keyboardarrowup" />
                    </button>
                </template>
            </div>
            <button @click="nextWeek" class="arrow" aria-label="Next Week">
                <v-icon :scale="1.8" name="md-keyboardarrowright" />
            </button>
        </div>
        <ConfirmAppointment v-if="appointmentSelected" :date="formatDate(appointmentSelected.start, 'PPPPpp')"
            :loading="updatingAppointment" @confirmNewAppointment="confirmNewAppointment" />
    </div>
</template>
<script>
import { isMonday, format, previousMonday, eachDayOfInterval, addDays, isSameDay, nextMonday } from "date-fns";
import api from '@/api';
import { formatDate } from '@/utils/dates';
import SlotsByDay from './components/SlotsByDay.vue';
import CurrentAppointment from './components/CurrentAppointment.vue';
import ConfirmAppointment from './components/ConfirmAppointment.vue';

export default {
    name: 'AppointmentsView',
    data() {
        return {
            loading: false,
            updatingAppointment: false,
            expandedView: false,
            appointment: {
                startDate: new Date(2024, 4, 21, 10, 30),
                endDate: new Date(2024, 4, 21, 10, 40),
                doctor: 'Dr. Simeon Molas'
            },
            appointmentSelected: null,
            days: eachDayOfInterval({
                start: new Date(),
                end: addDays(new Date(), 6)
            }),
            indexWeek: 0,
            slots: []
        }
    },
    components: {
        SlotsByDay,
        CurrentAppointment,
        ConfirmAppointment
    },
    created() {
        const todayDate = new Date();
        let currentMondayDate, nextMondayDate;
        if (isMonday(todayDate)) {
            currentMondayDate = format(todayDate, 'yyyyMMdd');
            this.getWeeklySlots(currentMondayDate);
        } else {
            currentMondayDate = format(previousMonday(todayDate), 'yyyyMMdd');
            nextMondayDate = format(nextMonday(todayDate), 'yyyyMMdd');
            this.getWeeklySlots(currentMondayDate);
            this.getWeeklySlots(nextMondayDate);
        }
    },
    methods: {
        formatDate,
        async getWeeklySlots(dateInput) {
            try {
                this.loading = true;
                const data = await api.getWeeklySlotsApi(dateInput);
                console.log({ data });
                this.slots = [...this.slots, ...data];

            } catch (error) {
                console.log(error);
            } finally {
                this.loading = false;
            }
        },
        getSlotsByDay(day) {
            /*
                Not the best performance. Filtering all the slots for every day is slower as the slots array have more elements.
                Perhaps use groupBy using the start date will be better since the grouping is done once.
            */
            return this.slots.filter(slot => isSameDay(slot.start, day));
        },
        selectDate(slot) {
            this.appointmentSelected = slot;
        },
        nextWeek() {
            // When the days of the week are already available and we fetch the slots available, there is no need to do it again.
            const weekNumber = this.indexWeek + 1;
            if ((this.days.length / 7) > weekNumber) {
                this.indexWeek++;
            } else {
                const week = eachDayOfInterval({
                    start: addDays(this.days[this.days.length - 1], 1),
                    end: addDays(this.days[this.days.length - 1], 7)
                });
                this.days = [...this.days, ...week];
                this.indexWeek++;
                this.fetchSlotsNextWeek();
            }
        },
        fetchSlotsNextWeek() {
            const firstDayNextWeek = this.days[this.indexWeek * 7];
            if(isMonday(firstDayNextWeek)) {
                this.getWeeklySlots(format(firstDayNextWeek, 'yyyyMMdd'));
            } else {
                const nextMondayDate = format(nextMonday(firstDayNextWeek), 'yyyyMMdd');
                this.getWeeklySlots(nextMondayDate);
            }
        },
        async confirmNewAppointment() {
            try {
                console.log(this.appointmentSelected);
                this.updatingAppointment = true;
                await api.postBookSlotApi({
                    start: formatDate(this.appointmentSelected.start, 'yyyy-MM-dd HH:mm:ss'),
                    end: formatDate(this.appointmentSelected.end, 'yyyy-MM-dd HH:mm:ss')
                });
                this.updateCurrentAppointment();
            } catch (error) {
                console.log(error);
            } finally {
                this.updatingAppointment = false;
            }
        },
        updateCurrentAppointment() {
            this.appointment.startDate = this.appointmentSelected.start;
            this.appointment.endDate = this.appointmentSelected.end;
            const indexSlot = this.slots.findIndex(s => s.start === this.appointmentSelected.start);
            this.slots[indexSlot].taken = true;
            this.appointmentSelected = null;
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    max-width: 1024px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 28px;

    p {
        font-size: 18px;
    }

    .calendar {
        display: flex;
        width: 100%;
        gap: 14px;
        overflow-x: auto;

        button.arrow {
            flex-shrink: 0;
            background-color: transparent;
            width: 50px;
            height: 50px;
            border-radius: 100px;
            background-color: var(--blue-light);
            cursor: pointer;
            transition: all .150s ease-out;

            &:disabled {
                background-color: var(--color-background-soft);
                opacity: .6;
                pointer-events: none;
            }

            &:hover {
                box-shadow: 0 -1px 6px 0px #3b3b3b7a;
            }
        }

        .calendarContent {
            flex-grow: 1;

            .loader {
                margin: 20px auto 12px;
                display: flex;
            }

            .week {
                border-bottom: 1px solid var(--color-background-soft);

                .days {
                    display: flex;
                    gap: 20px;
                }
            }

            .expandSlots {
                width: 100%;
                background-color: transparent;
                color: var(--blue);
                font-size: 15px;
                height: 50px;
                cursor: pointer;
                transition: all .3s ease-out;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;

                &:hover {
                    box-shadow: 0 -10px 20px -5px #0000000d;
                }
            }
        }
    }
}
</style>