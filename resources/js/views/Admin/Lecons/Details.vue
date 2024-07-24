<template>
    <b-row>
		<b-col xl="4" lg="5" md="5" order="1" order-md="0">
			<b-card>
				<div class="user-avatar-section">
					<div class="d-flex align-items-center flex-column">
						<div class="avatar bg-light-primary avatar-xl">
							<span class="avatar-content">{{ lecon.abbr }}</span>
						</div>
					  	<div class="user-info text-center mt-1">
							<h4>{{ lecon.intitule }}</h4>
					 	</div>
					</div>
				</div>
				<hr />
				<ul class="list-unstyled">
					<li class="mb-75 d-flex justify-content-between">
					  	<span class="fw-bolder me-25">{{ $t('utilisee_dans') }}:</span>
					  	<span><b>{{ lecon.formations_count }}</b> {{ $t('formations.title').toLowerCase() }}</span>
					</li>
				</ul>
			</b-card>
		</b-col>
		
		<b-col xl="8" lg="7" md="7" order="0" order-md="1">
			<b-nav pills class="mb-2">
				<b-nav-item v-for="({ icon, key, title }) in tabs" :key="key" :active="activeTab == key" @click.prevent="changeTab(key)">
					<app-icon :name="icon" />
					<span class="fw-bold">{{ title }}</span>
				</b-nav-item>
			</b-nav>

			<b-overlay :show="proceeding" rounded="sm">
				<b-card>
					<div class="border-top pt-1" v-if="activeTab === 'formations'">
						{{ formations }}
					</div>
					<editor v-else-if="activeTab === 'resume'" v-model="content" height="22.5em" @save="updateResume" />
				</b-card>
			</b-overlay>
		</b-col>
	</b-row>
</template>

<script setup>
import { onMounted,  ref } from 'vue'
import { html_entity_decode } from 'php-in-js/modules/string'
import { Inertia } from '@inertiajs/inertia'

import { $alert, $toast } from '@/utils/alert'
import { $t } from '@/plugins/i18n'
import Editor from '@/components/efr/Editor.vue'

defineOptions({ name: 'DetailsLecon' })

const emit = defineEmits(['completed'])

const props = defineProps({
    lecon: { required: true, type: Object },
})

const tabs = [
	{ icon: 'book-open', key: 'resume', title: $t('resume.title') },
	{ icon: 'briefcase', key: 'formations', title: $t('formations.title') },
]
const activeTab = ref('')
const proceeding = ref(false)
const content = ref(html_entity_decode(props.lecon.resume || ''))

const formations = ref([])

onMounted(() => changeTab('resume'))


function changeTab(tab) {
	activeTab.value = tab
	if (tab === 'formations') {
		getFormations()
	}
}

function getFormations() {
	proceeding.value = true

	// eslint-disable-next-line no-undef
	$.get(route('admin.lecons.formations', props.lecon.id)).done(data => {
		console.log({ data })
	})

}

function updateResume() {
	// eslint-disable-next-line no-undef
	Inertia.patch(route('admin.lecons.update', props.lecon.id), {
		intitule: props.lecon.intitule,
		resume: content.value,
	}, {
		onError(errors) {
			if (errors.default) {
				$alert.error(errors.default)
			} else {
				$alert.error($t('une_erreur_s_est_produite'))
			}
		},
		onFinish() {
			proceeding.value = false
		},
		onStart() {
			proceeding.value = true
		},
		onSuccess({ props }) {
			$toast.success(props.flash.success)
			
			emit('completed')
    	},
	})
}
</script>
