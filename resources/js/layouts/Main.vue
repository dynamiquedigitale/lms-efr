<template>
    <app-header />
    <app-menu />

    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper container-xxl p-0">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-start mb-0">Layout Empty</h2>
                            <div class="breadcrumb-wrapper">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="index-2.html">Home</a></li>
                                    <li class="breadcrumb-item"><a href="#">Layouts</a></li>
                                    <li class="breadcrumb-item active">Layout Empty</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content-header-right text-md-end col-md-3 col-12 d-md-block d-none">
                    <div class="mb-1 breadcrumb-right">
                        <div class="dropdown">
                            <button
                                class="btn-icon btn btn-primary btn-round btn-sm dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <i data-feather="grid"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="app-todo.html"
                                    ><i class="me-1" data-feather="check-square"></i
                                    ><span class="align-middle">Todo</span></a
                                ><a class="dropdown-item" href="app-chat.html"
                                    ><i class="me-1" data-feather="message-square"></i
                                    ><span class="align-middle">Chat</span></a
                                ><a class="dropdown-item" href="app-email.html"
                                    ><i class="me-1" data-feather="mail"></i
                                    ><span class="align-middle">Email</span></a
                                ><a class="dropdown-item" href="app-calendar.html"
                                    ><i class="me-1" data-feather="calendar"></i
                                    ><span class="align-middle">Calendar</span></a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-body">
                <div class="row">
                    <div class="col-12">
                        <div class="alert alert-primary" role="alert">
                            <div class="alert-body">
                                <strong>Info:</strong> This layout can be useful for getting started
                                with empty content section. Please check the&nbsp;<a
                                    class="text-primary"
                                    href="https://pixinvent.com/demo/vuexy-html-bootstrap-admin-template/documentation/documentation-layout-empty.html"
                                    target="_blank"
                                    >Layout empty documentation</a
                                >&nbsp; for more details.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <app-customizer />
    <div class="sidenav-overlay"></div>
    <div class="drag-target"></div>
    <app-footer />
</template>

<script setup>
defineOptions({ name: 'MainLayout' })

import { onMounted } from 'vue'

import AppCustomizer from './partials/Customizer.vue'
import AppFooter from './partials/Footer.vue'
import AppHeader from './partials/Header.vue'
import AppMenu from './partials/Menu.vue'

onMounted(() => {
	if (feather) {
        feather.replace({ height: 14, width: 14 })
	}
	initApp()
})
</script>
