<template>
	<page-wrapper :title="$t('liste_des_meetings')" :breadcrumb="[$t('meetings.title')]">
		<div class="app-calendar overflow-hidden border">
			<b-row class="g-0">
				<b-col class="app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column">
					<div class="sidebar-wrapper">
						<div class="card-body d-flex justify-content-center border-bottom my-sm-0 mb-3 pb-2">
							<app-button :text="$t('meetings.programmer')" class="btn-toggle-sidebar w-100" @click="addMeeting()" />
						</div>
						<div class="card-body pb-0">
							<calendar 
								:is-dark="false" transparent 
								:attributes="calendarAttributes" 
								@dayclick="handleCalendarDayClick"	
							/>
							<hr class="container-m-nx my-2">
							<h5 class="section-label mb-1">
								<span class="align-middle">{{ $t('filtre.title') }}</span>
							</h5>
							<div class="form-check form-check-info mb-1">
								<input type="checkbox" class="form-check-input" id="select-all" v-model="selectedAllStatut" @input="toggleAll" :indeterminate="asIndeterminate" />
								<label class="form-check-label" for="select-all">{{ $t('filtre.all') }}</label>
							</div>
							<div class="calendar-events-filter">
								<div v-for="(value, key) in meetStatus" :key="key" :class="`form-check form-check-${value} mb-1`">
									<input type="checkbox" class="form-check-input input-filter" :id="`meet-${key}`" :value="key" v-model="selectedStatut" />
									<label class="form-check-label" :for="`meet-${key}`">{{ $t(`statut.${key}`) }}</label>
								</div>
							</div>
						</div>
					</div>
				</b-col>
				<b-col class="position-relative">
					<b-card class="shadow-none border-0 mb-0 rounded-0" body-class="pb-0">
						<FullCalendar ref="fullCalendar" :options="{ ...calendarOptions, events }" />
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
		<form-meeting v-if="openDialog && action === 'create'" :action="action" :item="item" @reset="closeDialog" @completed="closeDialog" />
	</b-modal>
</template>

<script setup>
import '@/assets/css/calendar.min.css'
import 'v-calendar/style.css'

import { computed, onMounted, ref, watch } from 'vue'
import { Calendar } from 'v-calendar'
import dayGridPlugin from '@fullcalendar/daygrid'
import enLocale from '@fullcalendar/core/locales/en-gb'
import frLocale from '@fullcalendar/core/locales/fr'
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'

import { $dayjs } from '@/plugins/dayjs'
import FormMeeting from './Form.vue'
import { STATUT } from '@/enums/statut'

defineOptions({ name: 'AdminListMeetings' })


const props = defineProps({
	meetings: { required: true, type: Array },
})
const meetStatus = {
	[STATUT.COMPLETED]  : 'success',
	[STATUT.SCHEDULED]  : 'primary',
	[STATUT.IN_PROGRESS]: 'secondary',
	[STATUT.EXPIRED]    : 'warning',
	[STATUT.CANCELLED]  : 'danger',
}	
const calendarOptions = {
	customButtons: {
		sidebarToggle: {
			text: 'Sidebar',
		},
	},
	dateClick: handleDateClick,
	datesSet: () => fullcalendar_S(),
	eventClassNames({ event: e }) {
		return ['bg-light-' + meetStatus[e._def.extendedProps.statut]]
	},
	eventClick: handleEventClick,
	headerToolbar: {
		end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
		start: 'sidebarToggle, prev,next, title',
	},
	initialDate: new Date,
	initialView: 'dayGridMonth',
	locale: 'fr' ,
	locales: [enLocale, frLocale],
	navLinks: true,
	plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin],
	viewDidMount: () => fullcalendar_S(),
}

const events = computed(() => props.meetings.filter(({ statut }) => selectedStatut.value.includes(statut)).map(meet => {
	return {
		end  : $dayjs(meet.date_deb).add(meet.duree, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
		extendedProps: { statut: meet.statut },
		id: meet.key,
		start: meet.date_deb,
		title: meet.libelle,
	}
}))

const calendarAttributes = computed(() => events.value.map(meet => ({
	dates: meet.start, // Date
	dot: { class: `bg-${meetStatus[meet.extendedProps.statut]}` },
	key: meet.id,
	popover: {
      	label: meet.title,
    },
})))

const fullCalendar = ref(null)

const openDialog = ref(false)
const action     = ref('')
const item       = ref(null)


const selectedStatut    = ref([STATUT.SCHEDULED, STATUT.IN_PROGRESS])
const selectedAllStatut = ref(false)
const asIndeterminate   = ref(true)
const toggleAll         = ({ target }) => {
	selectedStatut.value  = target.checked ? Object.keys(meetStatus) : []
	asIndeterminate.value = false
}
watch(selectedStatut, (val) => {
	if ([...val].length === 0) {
        asIndeterminate.value   = false
        selectedAllStatut.value = false
	} else if ([...val].length === Object.keys(meetStatus).length) {
		asIndeterminate.value   = false
        selectedAllStatut.value = true
	} else {
		asIndeterminate.value   = true
        selectedAllStatut.value = false
	}
})


onMounted(() => {
	initJqueryPlugins()
})


function handleCalendarDayClick({ startDate }) {
	startDate = $dayjs(startDate).format('YYYY-MM-DD')

	const calendarApi = fullCalendar.value.getApi()
	calendarApi.changeView(calendarApi.view.type, startDate)
}

function addMeeting(startDate = undefined) {
	action.value = 'create'
	openDialog.value = true
	if (startDate) {
		const curr = $dayjs()
		item.value = { 
			// eslint-disable-next-line camelcase
			date_deb: $dayjs(startDate).set('hours', curr.hour()).set('minutes', curr.minute()).format('YYYY-MM-DD HH:mm:ss'),
		}
	}
}
function handleEventClick({ event, jsEvent }) {
	jsEvent.preventDefault()
    console.log({ event })
}
function handleDateClick({ date, jsEvent }) {
	jsEvent.preventDefault()
	if ($dayjs().isSameOrBefore(date, 'date')) {
		addMeeting(date)
	}
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
