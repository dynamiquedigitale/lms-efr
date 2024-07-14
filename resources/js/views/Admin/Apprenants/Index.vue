<template>
	<page-wrapper :title="$t('Liste des apprenants')" :breadcrumb="[$t('Apprenants')]">
		<b-card no-body class="mb-4">
			<b-card-header class="d-flex flex-wrap justify-content-between">
				<b-row class="w-auto">
					<b-col cols="4">
						<app-select v-model="filter.limit" @update:model-value="(v) => { findItems(v) }" :options="[10, 20, 30, 50]" />
					</b-col>
					<b-col cols="8">
						<b-input-group class="input-group-merge">
							<b-input-group-text><app-icon name="search" /></b-input-group-text>
							<b-form-input v-model="filter.search" @keyup="findItems()" :placeholder="$t('Rechercher')" />
						</b-input-group>
					</b-col>
				</b-row>
				<app-button class="mt-1 mt-md-0" :text="$t('Ajouter un apprenant')" icon="plus" @click.prevent="addApprenant" />
			</b-card-header>

			<b-card-body>
				<app-empty-items v-if="!apprenants.total" :message="$t('Aucun apprenant enregistré')" />
				<template v-else>
					<b-row class="gy-4 mb-4">
						<b-col cols="12" lg="4" md="6" v-for="apprenant in items" :key="apprenant.id">
							<user-card :user="apprenant" @show="showProfile(apprenant)" />
						</b-col>
					</b-row>
					  
					<app-pagination 
						v-model="filter.limit"
						:links="apprenants.links"
						:prev="apprenants.prev_page_url"
						:next="apprenants.next_page_url"
						:total="apprenants.total"
						:from="apprenants.from"
						:to="apprenants.to"
					/>
				</template>
			</b-card-body>
		</b-card>
	</page-wrapper>
	
	<app-modal id="user-dialog" v-model="openDialog" :title="modalTitle" :size="modalSize" no-footer @close="onCloseDialog">
		<form-apprenant v-if="openDialog && action != 'details'" :action="action" :item="item" @reset="closeDialog" @completed="refresh" />
		<details-apprenant v-else-if="openDialog && action == 'details'" :apprenant="item" />
	</app-modal>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

import DetailsApprenant from './Details.vue'
import FormApprenant from './Form.vue'
import { handleSearch } from '@/utils/inertia'
import UserCard from '@/components/UserCard.vue'

defineOptions({ name: 'AdminListApprenants' })

const props = defineProps({
  	apprenants: { required: true, type: Object },
})

const openDialog = ref(false)
// const loading = ref(true)
const action = ref(null)
const item = ref(null) // Element en cours de manipulation (notament pour l'edition)
// const itemId = ref(null) // Id de l'element en cours de manipulation (notament pour l'edition)

const filter = reactive({
	limit: 20,
	search: '',
})

const items = computed(() => props.apprenants.data) // Liste de tous les elements (apprenants)

const modalTitle = computed(() => {
    switch (action.value) {
        case 'create':
            return 'Ajouter un apprenant'
        case 'edit':
            return 'Edition du apprenant'
        default:
            return (item.value || {}).username || ''
    }
})
// eslint-disable-next-line @stylistic/js/no-extra-parens
const modalSize = computed(() => (action.value === 'details' ? 'xl' : 'lg'))

/**
 * Ouvre le formulaire d'ajout d'un apprenant
 */
function addApprenant() {
    action.value = 'create'
    openDialog.value = true
}
/**
 * Ouvre la modale de details de l'apprenant
 */
function showProfile(apprenant) {
	item.value = apprenant
	action.value = 'details'
    openDialog.value = true
}

/**
 * Provoque la fermeture de la modale
 */
 function closeDialog() {
    openDialog.value = false
    item.value = null
    action.value = null
}
/**
 * Lorsque la modale est effectivement fermee
 */
function onCloseDialog() {
    if (action.value === 'details') {
        refresh()
    }
}

/**
 * Refraichir la liste des beneficiaires apres une creation, suppression ou edition
 */
function refresh() {
    closeDialog()
    filter.search = ''
	findItems()
}


function findItems(limit){
	handleSearch('admin.apprenants.index', {
		limit: limit || filter.limit,
		search: filter.search,
	})
}
</script>

<style>

</style>
