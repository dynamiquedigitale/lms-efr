<template>
	<page-wrapper :title="$t('liste_des_meetings')" :breadcrumb="[$t('meetings.title')]">
		<div class="app-calendar overflow-hidden border">
			<b-row class="g-0">
				<b-col class="app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column">
					<div class="sidebar-wrapper">
						<div class="card-body d-flex justify-content-center border-bottom my-sm-0 mb-3 pb-2">
							<app-button :text="$t('meetings.programmer')" class="btn-toggle-sidebar w-100" @click="addMeeting" />
						</div>
						<div class="card-body pb-0">
							<calendar />
							<hr class="container-m-nx my-2">
							<h5 class="section-label mb-1">
								<span class="align-middle">{{ $t('filtre.title') }}</span>
							</h5>
							<div class="form-check mb-1">
								<input type="checkbox" class="form-check-input select-all" id="select-all" checked />
								<label class="form-check-label" for="select-all">View All</label>
							</div>
							<div class="calendar-events-filter">
							<div class="form-check form-check-danger mb-1">
								<input
								type="checkbox"
								class="form-check-input input-filter"
								id="personal"
								data-value="personal"
								checked
								/>
								<label class="form-check-label" for="personal">Personal</label>
							</div>
							<div class="form-check form-check-primary mb-1">
								<input
								type="checkbox"
								class="form-check-input input-filter"
								id="business"
								data-value="business"
								checked
								/>
								<label class="form-check-label" for="business">Business</label>
							</div>
							<div class="form-check form-check-warning mb-1">
								<input type="checkbox" class="form-check-input input-filter" id="family" data-value="family" checked />
								<label class="form-check-label" for="family">Family</label>
							</div>
							<div class="form-check form-check-success mb-1">
								<input
								type="checkbox"
								class="form-check-input input-filter"
								id="holiday"
								data-value="holiday"
								checked
								/>
								<label class="form-check-label" for="holiday">Holiday</label>
							</div>
							<div class="form-check form-check-info">
								<input type="checkbox" class="form-check-input input-filter" id="etc" data-value="etc" checked />
								<label class="form-check-label" for="etc">ETC</label>
							</div>
							</div>
						</div>
					</div>
				</b-col>
				<b-col class="position-relative">
					<b-card class="shadow-none border-0 mb-0 rounded-0" body-class="pb-0">
						<FullCalendar :options="calendarOptions" />
					</b-card>
				</b-col>
			  	<div class="body-content-overlay"></div>
			</b-row>
		</div>
	</page-wrapper>

	<b-modal v-model="openDialog" id="app-meeting" class="modal-slide-in event-sidebar" hide-footer no-close-on-esc no-close-on-backdrop dialog-class="sidebar-lg" content-class="p-0" header-class="d-flex align-items-center justify-content-between mb-1 p-1" body-class="flex-grow-1 pb-sm-0 pb-1" @close="closeDialog">
		<template #header="{ close }">
			<h5 class="modal-title text-truncate">{{ $t('meetings.nouveau') }}</h5>
			<div class="d-flex ms-1">
				<app-button size="sm" variant="flat-secondary" icon="x" text="" @click.prevent="close" />
			</div>
		</template>
		<form-meeting v-if="openDialog && action === 'create'" :action="action" @reset="closeDialog" @completed="closeDialog" />
	</b-modal>
</template>

<script setup>
import '@/assets/css/calendar.min.css'
import 'v-calendar/style.css'

import { onMounted, reactive, ref } from 'vue'
import { Calendar } from 'v-calendar'
import dayGridPlugin from '@fullcalendar/daygrid'
import enLocale from '@fullcalendar/core/locales/en-gb'
import frLocale from '@fullcalendar/core/locales/fr'
import FullCalendar from '@fullcalendar/vue3'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'

import FormMeeting from './Form.vue'

defineOptions({ name: 'AdminListMeetings' })

const calendarOptions = reactive({
	customButtons: {
		sidebarToggle: {
			text: 'Sidebar',
		},
	},
	datesSet: () => fullcalendar_S(),
	events: [
		{ start: new Date(), title: 'Meeting' },
	],
	headerToolbar: {
		end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
		start: 'sidebarToggle, prev,next, title',
	},
	initialDate: new Date,
	initialView: 'dayGridMonth',
	locale: 'fr' ,
	locales: [enLocale, frLocale],
	plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
	viewDidMount: () => fullcalendar_S(),
})

const openDialog = ref(false)
const action = ref('')
const item = ref(null)

onMounted(() => {
	initJqueryPlugins()
})


function addMeeting() {
	action.value = 'create'
	openDialog.value = true
}


function closeDialog() {
	action.value     = ''
	item.value       = null
	openDialog.value = false
}

/**
 * Initialisation des actions jquery
 */
 function initJqueryPlugins() {
	const { $ } = window

	$('.body-content-overlay').click(function() {
		$('.app-calendar-sidebar, .body-content-overlay').removeClass('show')
	})
	$('.fc-sidebarToggle-button').click(function() {
		$('.app-calendar-sidebar, .body-content-overlay').addClass('show')
	})
	$('.btn-toggle-sidebar').click(function() {
        $('.app-calendar-sidebar, .body-content-overlay').removeClass('show')
    })

	fullcalendar_S()
}
// eslint-disable-next-line camelcase
function fullcalendar_S() {
	// eslint-disable-next-line no-undef
	$('.fc-sidebarToggle-button').empty().append(feather.icons.menu.toSvg({
		class: 'ficon',
	}))
}
</script>
