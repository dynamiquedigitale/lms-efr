<template>
	<b-accordion class="accordion-margin">
		<b-accordion-item :title="$t('concernes')">
			<ul class="list-group">
				<li class="list-group-item d-flex justify-content-between align-items-center">
					<span>{{ $t('apprenants.title') }}</span>
					<span class="fw-bolder">{{ apprenant.username }}</span>
				</li>
				<li class="list-group-item d-flex justify-content-between align-items-center">
					<span>{{ $t('enseignants.title') }}</span>
					<span class="fw-bolder">{{ enseignant.username }}</span>
				</li>
				<li class="list-group-item d-flex justify-content-between align-items-center">
					<span>{{ $t('formations.title') }}</span>
					<span class="fw-bolder">{{ formation.intitule }}</span>
				</li>
				<li class="list-group-item d-flex justify-content-between align-items-center">
					<span>{{ $t('lecons.title') }}</span>
					<span class="fw-bolder">{{ cours?.lecon?.intitule || $t('non_defini') }}</span>
				</li>
			</ul>
		</b-accordion-item>
		<b-accordion-item :title="$t('meetings.title')" visible>
			<ul class="list-group">
				<li class="list-group-item d-flex justify-content-between align-items-center">
					<span>{{ $t('form.libelle') }}</span>
					<span class="fw-bolder">{{ meeting.libelle }}</span>
				</li>
				<li class="list-group-item d-flex justify-content-between align-items-center">
					<span>{{ $t('form.debut') }}</span>
					<span class="fw-bolder">{{ $dayjs(meeting.date_deb).format('ddd DD MMMM YYYY HH:mm') }}</span>
				</li>
				<li class="list-group-item d-flex justify-content-between align-items-center">
					<span>{{ $t('form.fin') }}</span>
					<span class="fw-bolder">{{ $dayjs(meeting.date_deb).add(meeting.duree, 'minutes').format('ddd DD MMMM YYYY HH:mm') }}</span>
				</li>
				<li class="list-group-item d-flex justify-content-between align-items-center">
					<span>{{ $t('statut.title') }}</span>
					<span :class="`badge bg-light-${meetStatus[meeting.statut]}`">{{ $t(`statut.${meeting.statut}`) }}</span>
				</li>
				<li class="list-group-item  bg-light">
					<p class="fs-6">{{ meeting.objectif }}</p>
				</li>
			</ul>
		</b-accordion-item>
		<b-accordion-item :title="$t('memos.title', 2)">
			<strong>This is the third item's accordion body.</strong> It is hidden by default, until the
			collapse plugin adds the appropriate classes that we use to style each element. 
		</b-accordion-item>
	</b-accordion>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({ name: 'DetalsMeetings' })

const props = defineProps({
    meeting: { required: true, type: Object },
    meetStatus: { required: true, type: Object },
})

const cours      = computed(() => props.meeting.cours)
const parcours   = computed(() => props.meeting.parcours)
const apprenant  = computed(() => parcours.value.apprenant)
const enseignant = computed(() => parcours.value.enseignant)
const formation  = computed(() => parcours.value.formation)

</script>
