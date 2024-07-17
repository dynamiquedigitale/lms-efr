<template>
	<page-wrapper class="file-manager-application" :title="$t('ressources.supports')" :breadcrumb="[$t('ressources.title')]">
		<div class="content-area-wrapper container-xxl p-0">
			<div class="sidebar-left">
			  	<div class="sidebar">
					<div class="sidebar-file-manager">
				  		<div class="sidebar-inner">
							<div class="dropdown dropdown-actions">
								<app-button @click.prevent="openDialog = true" icon="upload-cloud" :text="$t('ressources.nouvelle')" class="add-file-btn text-center w-100" />
							</div>
							<div class="sidebar-list">
					  			<div class="list-group list-group-labels">
									<h6 class="section-label px-2 mb-1">Labels</h6>
									<a v-for="({ icon, type }) in mediaTypes" :key="type" :href="`#${type}`" class="list-group-item list-group-item-action">
										<app-icon :name="icon" class="me-50 font-medium-3" />
										<span class="align-middle">{{ $t(`type_media.${type}`) }}</span>
									</a>
					  			</div>
								<div class="storage-status mb-1 px-2">
									<h6 class="section-label mb-1">Storage Status</h6>
									<div class="d-flex align-items-center cursor-pointer">
										<app-icon name="server" class="font-large-1" />
										<div class="file-manager-progress ms-1">
											<span>68GB used of 100GB</span>
											<b-progress class="my-50" value="80" style="height: 6px" />
										</div>
									</div>
								</div>
							</div>
				  		</div>
					</div>
			  	</div>
			</div>
			<div class="content-right">
			  	<div class="content-wrapper container-xxl p-0">
					<div class="content-body">
				  		<div class="body-content-overlay"></div>
	  					<div class="file-manager-main-content">
							<div class="file-manager-content-header d-flex justify-content-between align-items-center">
								<div class="d-flex align-items-center">
									<div class="sidebar-toggle d-block d-xl-none float-start align-middle ms-1">
										<app-icon name="menu" class="font-medium-5" />
									</div>
									<div class="input-group input-group-merge shadow-none m-0 flex-grow-1">
										<span class="input-group-text border-0">
											<app-icon name="search" />
										</span>
										<b-form-input class="files-filter border-0 bg-transparent" :placeholder="$t('rechercher')" />
									</div>
								</div>
								<div class="d-flex align-items-center">
									<div class="file-actions">
										<i
data-feather="arrow-down-circle"
										  class="font-medium-2 cursor-pointer d-sm-inline-block d-none me-50"></i>
										<i data-feather="trash" class="font-medium-2 cursor-pointer d-sm-inline-block d-none me-50"></i>
										<i
data-feather="alert-circle" class="font-medium-2 cursor-pointer d-sm-inline-block d-none"
										  data-bs-toggle="modal" data-bs-target="#app-file-manager-info-sidebar"></i>
										<div class="dropdown d-inline-block">
										  <i class="font-medium-2 cursor-pointer" data-feather="more-vertical" role="button" id="fileActions" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										  </i>
										  <div class="dropdown-menu dropdown-menu-end" aria-labelledby="fileActions">
											<a class="dropdown-item" href="#">
											  <i data-feather="move" class="cursor-pointer me-50"></i>
											  <span class="align-middle">Open with</span>
											</a>
											<a
class="dropdown-item d-sm-none d-block" href="#" data-bs-toggle="modal"
											  data-bs-target="#app-file-manager-info-sidebar">
											  <i data-feather="alert-circle" class="cursor-pointer me-50"></i>
											  <span class="align-middle">More Options</span>
											</a>
											<a class="dropdown-item d-sm-none d-block" href="#">
											  <i data-feather="trash" class="cursor-pointer me-50"></i>
											  <span class="align-middle">Delete</span>
											</a>
											<div class="dropdown-divider"></div>
											<a class="dropdown-item" href="#">
											  <i data-feather="plus" class="cursor-pointer me-50"></i>
											  <span class="align-middle">Add shortcut</span>
											</a>
											<a class="dropdown-item" href="#">
											  <i data-feather="folder-plus" class="cursor-pointer me-50"></i>
											  <span class="align-middle">Move to</span>
											</a>
											<a class="dropdown-item" href="#">
											  <i data-feather="star" class="cursor-pointer me-50"></i>
											  <span class="align-middle">Add to starred</span>
											</a>
											<a class="dropdown-item" href="#">
											  <i data-feather="droplet" class="cursor-pointer me-50"></i>
											  <span class="align-middle">Change color</span>
											</a>
											<div class="dropdown-divider"></div>
											<a class="dropdown-item" href="#">
											  <i data-feather="download" class="cursor-pointer me-50"></i>
											  <span class="align-middle">Download</span>
											</a>
										  </div>
										</div>
									  </div>
									<div class="btn-group view-toggle ms-50" role="group">
										<input type="radio" class="btn-check" name="view-btn-radio" data-view="grid" id="gridView" checked autocomplete="off" />
										<label class="btn btn-outline-primary p-50 btn-sm" for="gridView">
											<app-icon name="grid" />
										</label>
										<input type="radio" class="btn-check" name="view-btn-radio" data-view="list" id="listView" autocomplete="off" />
										<label class="btn btn-outline-primary p-50 btn-sm" for="listView">
											<app-icon name="list" />
										</label>
									</div>
								</div>
							</div>
			
							<div class="file-manager-content-body">
								<div class="drives">
									<b-row>
										<b-col v-for="({ type }) in mediaTypes" :key="type" cols="12" lg="3" md="6">
											<b-card class="shadow-none border cursor-pointer">
												<svg xmlns="http://www.w3.org/2000/svg" style="height: 38px; fill: rgb(142, 84, 233)" v-if="type === 'images'" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path opacity="0.3" d="M19 2H5a3.009 3.009 0 0 0-3 3v8.86l3.88-3.88a3.075 3.075 0 0 1 4.24 0l2.871 2.887.888-.888a3.008 3.008 0 0 1 4.242 0L22 15.86V5a3.009 3.009 0 0 0-3-3z"></path><path opacity="1" d="M10.12 9.98a3.075 3.075 0 0 0-4.24 0L2 13.86V19a3.009 3.009 0 0 0 3 3h14c.815 0 1.595-.333 2.16-.92L10.12 9.98z"></path><path opacity="0.1" d="m22 15.858-3.879-3.879a3.008 3.008 0 0 0-4.242 0l-.888.888 8.165 8.209c.542-.555.845-1.3.844-2.076v-3.142z"></path></svg>
												<svg xmlns="http://www.w3.org/2000/svg" style="height: 38px; fill: rgb(245, 184, 73)" v-else-if="type === 'docs'" class="svg-warning" viewBox="0 0 24 24"><path opacity="0.3" d="m20 9-7-7H7a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3Z"></path><path opacity="1" d="M20 9h-5a2 2 0 0 1-2-2V2zm-5 9H9a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2zm0-4H9a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2zm-5-4H9a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2z"></path></svg>
												<svg xmlns="http://www.w3.org/2000/svg" style="height: 38px; fill: rgb(245, 111, 75)" v-else-if="type === 'videos'" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path opacity="0.3" d="M14 18H5a3.003 3.003 0 0 1-3-3V9a3.003 3.003 0 0 1 3-3h9a3.003 3.003 0 0 1 3 3v6a3.003 3.003 0 0 1-3 3z"></path><path opacity="1" d="M21.895 7.554a1 1 0 0 0-1.342-.449l-3.564 1.783c.001.038.01.073.011.112v6c0 .039-.01.074-.011.112l3.564 1.783A1 1 0 0 0 22 16V8a1 1 0 0 0-.105-.446z"></path></svg>
												<svg xmlns="http://www.w3.org/2000/svg" style="height: 38px; fill: rgb(73, 182, 245)" v-else-if="type === 'audios'" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path opacity="0.3" d="M6 21H3a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h3a3.003 3.003 0 0 1 3 3v2a3.003 3.003 0 0 1-3 3zm15 0h-3a3.003 3.003 0 0 1-3-3v-2a3.003 3.003 0 0 1 3-3h3a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z"></path><path opacity="1" d="M12 3C6.477 3 2 7.477 2 13v1a1 1 0 0 1 1-1h1a8 8 0 0 1 16 0h1a1 1 0 0 1 1 1v-1c0-5.523-4.477-10-10-10z"></path></svg>
												<div class="my-1"><h5>{{ $t(`type_media.${type}`) }}</h5></div>
												<div class="d-flex justify-content-between mb-50">
													<span class="text-truncate">35GB Used</span>
													<small class="text-muted">50GB</small>
												</div>
												<b-progress class="mb-0" value="70" style="height: 10px" />
											</b-card>
										</b-col>
									</b-row>
								</div>
							
							<!-- Folders Container Starts -->
							<div class="view-container">
								<h6 class="files-section-title mt-25 mb-75">Folders</h6>
								<div class="files-header">
								<h6 class="fw-bold mb-0">Filename</h6>
								<div>
									<h6 class="fw-bold file-item-size d-inline-block mb-0">Size</h6>
									<h6 class="fw-bold file-last-modified d-inline-block mb-0">Last modified</h6>
									<h6 class="fw-bold d-inline-block me-1 mb-0">Actions</h6>
								</div>
								</div>
								<div class="card file-manager-item folder level-up">
								<div class="card-img-top file-logo-wrapper">
									<div class="d-flex align-items-center justify-content-center w-100">
									<i data-feather="arrow-up"></i>
									</div>
								</div>
								<div class="card-body ps-2 pt-0 pb-1">
									<div class="content-wrapper">
									<p class="card-text file-name mb-0">...</p>
									</div>
								</div>
								</div>
								<div class="card file-manager-item folder">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="customCheck1" />
									<label class="form-check-label" for="customCheck1"></label>
								</div>
								<div class="card-img-top file-logo-wrapper">
									<div class="dropdown float-end">
									<i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i>
									</div>
									<div class="d-flex align-items-center justify-content-center w-100">
									<i data-feather="folder"></i>
									</div>
								</div>
								<div class="card-body">
									<div class="content-wrapper">
									<p class="card-text file-name mb-0">Projects</p>
									<p class="card-text file-size mb-0">2gb</p>
									<p class="card-text file-date">01 may 2019</p>
									</div>
									<small class="file-accessed text-muted">Last accessed: 21 hours ago</small>
								</div>
								</div>
								<div class="card file-manager-item folder">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="customCheck2" />
									<label class="form-check-label" for="customCheck2"></label>
								</div>
								<div class="card-img-top file-logo-wrapper">
									<div class="dropdown float-end">
									<i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i>
									</div>
									<div class="d-flex align-items-center justify-content-center w-100">
									<i data-feather="folder"></i>
									</div>
								</div>
								<div class="card-body">
									<div class="content-wrapper">
									<p class="card-text file-name mb-0">Design</p>
									<p class="card-text file-size mb-0">500mb</p>
									<p class="card-text file-date">05 may 2019</p>
									</div>
									<small class="file-accessed text-muted">Last accessed: 18 hours ago</small>
								</div>
								</div>
								<div class="card file-manager-item folder">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="customCheck3" />
									<label class="form-check-label" for="customCheck3"></label>
								</div>
								<div class="card-img-top file-logo-wrapper">
									<div class="dropdown float-end">
									<i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i>
									</div>
									<div class="d-flex align-items-center justify-content-center w-100">
									<i data-feather="folder"></i>
									</div>
								</div>
								<div class="card-body">
									<div class="content-wrapper">
									<p class="card-text file-name mb-0">UI Kit</p>
									<p class="card-text file-size mb-0">200mb</p>
									<p class="card-text file-date">01 may 2019</p>
									</div>
									<small class="file-accessed text-muted">Last accessed: 2 days ago</small>
								</div>
								</div>
								<div class="card file-manager-item folder">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="customCheck4" />
									<label class="form-check-label" for="customCheck4"></label>
								</div>
								<div class="card-img-top file-logo-wrapper">
									<div class="dropdown float-end">
									<i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i>
									</div>
									<div class="d-flex align-items-center justify-content-center w-100">
									<i data-feather="folder"></i>
									</div>
								</div>
								<div class="card-body">
									<div class="content-wrapper">
									<p class="card-text file-name mb-0">Documents</p>
									<p class="card-text file-size mb-0">50.3mb</p>
									<p class="card-text file-date">10 may 2019</p>
									</div>
									<small class="file-accessed text-muted">Last accessed: 6 days ago</small>
								</div>
								</div>
								<div class="card file-manager-item folder">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="customCheck5" />
									<label class="form-check-label" for="customCheck5"></label>
								</div>
								<div class="card-img-top file-logo-wrapper">
									<div class="dropdown float-end">
									<i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i>
									</div>
									<div class="d-flex align-items-center justify-content-center w-100">
									<i data-feather="folder"></i>
									</div>
								</div>
								<div class="card-body">
									<div class="content-wrapper">
									<p class="card-text file-name mb-0">Videos</p>
									<p class="card-text file-size mb-0">354mb</p>
									<p class="card-text file-date">08 may 2019</p>
									</div>
									<small class="file-accessed text-muted">Last accessed: 8 days ago</small>
								</div>
								</div>
								<div class="card file-manager-item folder">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="customCheck6" />
									<label class="form-check-label" for="customCheck6"></label>
								</div>
								<div class="card-img-top file-logo-wrapper">
									<div class="dropdown float-end">
									<i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i>
									</div>
									<div class="d-flex align-items-center justify-content-center w-100">
									<i data-feather="folder"></i>
									</div>
								</div>
								<div class="card-body">
									<div class="content-wrapper">
									<p class="card-text file-name mb-0">Styles</p>
									<p class="card-text file-size mb-0">32.2mb</p>
									<p class="card-text file-date">05 may 2019</p>
									</div>
									<small class="file-accessed text-muted">Last accessed: 2 months ago</small>
								</div>
								</div>
								<div class="d-none flex-grow-1 align-items-center no-result mb-3">
								<i data-feather="alert-circle" class="me-50"></i>
								No Results
								</div>
							</div>
							<!-- /Folders Container Ends -->
			
							<!-- Files Container Starts -->
							<div class="view-container">
								<h6 class="files-section-title mt-2 mb-75">Files</h6>
								<div class="card file-manager-item file">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="customCheck7" />
									<label class="form-check-label" for="customCheck7"></label>
								</div>
								<div class="card-img-top file-logo-wrapper">
									<div class="dropdown float-end">
									<i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i>
									</div>
									<div class="d-flex align-items-center justify-content-center w-100">
									<img src="../../../app-assets/images/icons/jpg.png" alt="file-icon" height="35" />
									</div>
								</div>
								<div class="card-body">
									<div class="content-wrapper">
									<p class="card-text file-name mb-0">Profile.jpg</p>
									<p class="card-text file-size mb-0">12.6mb</p>
									<p class="card-text file-date">23 may 2019</p>
									</div>
									<small class="file-accessed text-muted">Last accessed: 3 hours ago</small>
								</div>
								</div>
								<div class="card file-manager-item file">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="customCheck8" />
									<label class="form-check-label" for="customCheck8"></label>
								</div>
								<div class="card-img-top file-logo-wrapper">
									<div class="dropdown float-end">
									<i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i>
									</div>
									<div class="d-flex align-items-center justify-content-center w-100">
									<img src="../../../app-assets/images/icons/doc.png" alt="file-icon" height="35" />
									</div>
								</div>
								<div class="card-body">
									<div class="content-wrapper">
									<p class="card-text file-name mb-0">account.doc</p>
									<p class="card-text file-size mb-0">82kb</p>
									<p class="card-text file-date">25 may 2019</p>
									</div>
									<small class="file-accessed text-muted">Last accessed: 23 minutes ago</small>
								</div>
								</div>
								<div class="card file-manager-item file">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="customCheck9" />
									<label class="form-check-label" for="customCheck9"></label>
								</div>
								<div class="card-img-top file-logo-wrapper">
									<div class="dropdown float-end">
									<i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i>
									</div>
									<div class="d-flex align-items-center justify-content-center w-100">
									<img src="../../../app-assets/images/icons/txt.png" alt="file-icon" height="35" />
									</div>
								</div>
								<div class="card-body">
									<div class="content-wrapper">
									<p class="card-text file-name mb-0">notes.txt</p>
									<p class="card-text file-size mb-0">54kb</p>
									<p class="card-text file-date">01 may 2019</p>
									</div>
									<small class="file-accessed text-muted">Last accessed: 43 minutes ago</small>
								</div>
								</div>
								<div class="card file-manager-item file">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="customCheck10" />
									<label class="form-check-label" for="customCheck10"></label>
								</div>
								<div class="card-img-top file-logo-wrapper">
									<div class="dropdown float-end">
									<i data-feather="more-vertical" class="toggle-dropdown mt-n25"></i>
									</div>
									<div class="d-flex align-items-center justify-content-center w-100">
									<img src="../../../app-assets/images/icons/json.png" alt="file-icon" height="35" />
									</div>
								</div>
								<div class="card-body">
									<div class="content-wrapper">
									<p class="card-text file-name mb-0">users.json</p>
									<p class="card-text file-size mb-0">200kb</p>
									<p class="card-text file-date">12 may 2019</p>
									</div>
									<small class="file-accessed text-muted">Last accessed: 1 hour ago</small>
								</div>
								</div>
								<div class="d-none flex-grow-1 align-items-center no-result mb-3">
								<i data-feather="alert-circle" class="me-50"></i>
								No Results
								</div>
							</div>
							<!-- /Files Container Ends -->
							</div>
						</div>
	  
	  
				  <!-- File Dropdown Starts-->
				  <div class="dropdown-menu dropdown-menu-end file-dropdown">
					<a class="dropdown-item" href="#">
					  <i data-feather="eye" class="align-middle me-50"></i>
					  <span class="align-middle">Preview</span>
					</a>
					<a class="dropdown-item" href="#">
					  <i data-feather="user-plus" class="align-middle me-50"></i>
					  <span class="align-middle">Share</span>
					</a>
					<a class="dropdown-item" href="#">
					  <i data-feather="copy" class="align-middle me-50"></i>
					  <span class="align-middle">Make a copy</span>
					</a>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" href="#">
					  <i data-feather="edit" class="align-middle me-50"></i>
					  <span class="align-middle">Rename</span>
					</a>
					<a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#app-file-manager-info-sidebar">
					  <i data-feather="info" class="align-middle me-50"></i>
					  <span class="align-middle">Info</span>
					</a>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" href="#">
					  <i data-feather="trash" class="align-middle me-50"></i>
					  <span class="align-middle">Delete</span>
					</a>
					<a class="dropdown-item" href="#">
					  <i data-feather="alert-circle" class="align-middle me-50"></i>
					  <span class="align-middle">Report</span>
					</a>
				  </div>
				  <!-- /File Dropdown Ends -->
	  
				</div>
			  </div>
			</div>
		  </div>
	</page-wrapper>
	
	<app-modal id="add-ressources-modal" v-model="openDialog" title="Nouvelles ressources" size="lg" no-footer>
		<form-ressource v-if="openDialog" @reset="openDialog = false" @completed="refresh" />
	</app-modal>
</template>

<script setup>
import '@/assets/css/file-manager.min.css'

import { onMounted, reactive, ref } from 'vue'

import FormRessource from './Form.vue'

import { $t } from '@/plugins/i18n'
import { handleSearch } from '@/utils/inertia'

defineOptions({ name: 'AdminListRessources' })

defineProps({
  	ressources: { required: true, type: Object },
})

const openDialog = ref(false)

const filter = reactive({
	limit: 20,
	search: '',
})

const mediaTypes = [
	{ icon: 'file-text', type: 'docs' }, 
	{ icon: 'image', type: 'images' }, 
	{ icon: 'video', type: 'videos' }, 
	{ icon: 'music', type: 'audios' },
]


onMounted(() => {
	initJqueryPlugins()
})

function findItems(limit){
	handleSearch('admin.ressources.index', {
		limit: limit || filter.limit,
		search: filter.search,
	})
}

/**
 * Provoque la fermeture de la modale
 */
 function closeDialog() {
    openDialog.value = false
    // item.value = null
    // action.value = null
}

/**
 * Refraichir la liste des beneficiaires apres une creation, suppression ou edition
 */
 function refresh() {
    closeDialog()
    filter.search = ''
	findItems()
}

/**
 * Initialisation des actions jquery
 */
function initJqueryPlugins() {
	const { $ } = window

	// eslint-disable-next-line no-undef
	new PerfectScrollbar($('.file-manager-content-body')[0], {
        cancelable: !0,
        wheelPropagation: !1,
    })

	$('.view-toggle').find('input').on('change', function() {
		const e = $(this)
		$('.view-container').each(function() {
			$(this).hasClass('view-container-static') || (e.is(':checked') && 'list' === e.data('view') ? $(this).addClass('list-view') : $(this).removeClass('list-view'))
		})
	})

	const e = $('.sidebar-file-manager'), i = $('.right-sidebar'), o = $('.sidebar-toggle'), s = $('.body-content-overlay')
	o.on('click', function() {
        e.toggleClass('show'), s.toggleClass('show')
    }), $('.body-content-overlay, .sidebar-close-icon').on('click', function() {
        e.removeClass('show'), s.removeClass('show'), i.removeClass('show')
    })
		
}

</script>
