import axios from 'axios';
import { transformSlots } from '@/api/mapping';
import type { SlotPostApi } from '@/types';

const client = axios.create({
    baseURL: 'https://draliatest.azurewebsites.net/api'
});

const getWeeklySlotsApi = (dateInput: string) => {
    return client.get(`/availability/GetWeeklySlots/${dateInput}`)
        .then(res => {
            return transformSlots(res.data);
        });
}

const postBookSlotApi = (form: SlotPostApi) => {
    /* In a real situation comments and patient data are pulled from the user information or typed by the user using the UI */
    const data = {
        Start: form.start,
        End: form.end,
        Comments: 'None',
        Patient: {
            Name: 'Mateo',
            SecondName: 'Merlo',
            Email: '',
            Phone: ''
        }
    };
    return client.post(`/availability/BookSlot`, data)
        .then(res => {
            return res.data;
        });
}

export default {
    getWeeklySlotsApi,
    postBookSlotApi
}