<!DOCTYPE html>
<html lang="<?= config('app.language', 'fr') ?>" class="loading" data-textdirection="ltr">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
    <title><?= $this->show('title', true) ?> - <?= config('app.name') ?></title>
    <link rel="icon" type="image/png" href="<?= img_url('logo/english-for-real.png') ?>" />
    <meta name="author" content="Dimitric Sitchet Tomkeu" />
    <link rel="preconnect" href="https://fonts.googleapis.com/">
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600">
    <link rel="stylesheet" href="<?= lib_css_url('vendors.min.css') ?>">
    <link rel="stylesheet" href="<?= lib_css_url('bootstrap/bootstrap.min.css') ?>" />
    <link rel="stylesheet" href="<?= lib_css_url('bootstrap/bootstrap-extended.min.css') ?>" />
    <link rel="stylesheet" href="<?= css_url('colors.min.css') ?>">
    <link rel="stylesheet" href="<?= css_url('components.min.css') ?>">
    <link rel="stylesheet" href="<?= css_url('themes/dark-layout.min.css') ?>">
    <link rel="stylesheet" href="<?= css_url('themes/bordered-layout.min.css') ?>">
    <link rel="stylesheet" href="<?= css_url('themes/semi-dark-layout.min.css') ?>">
     <link rel="stylesheet" href="<?= css_url('authentication.css') ?>">
    <link rel="stylesheet" href="<?= css_url('style.css') ?>">
</head>

<body class="vertical-layout vertical-menu-modern blank-page navbar-floating footer-static  " data-open="click"
    data-menu="vertical-menu-modern" data-col="blank-page">
    <div class="app-content content ">
    	<div class="content-overlay"></div>
    	<div class="header-navbar-shadow"></div>
    	<div class="content-wrapper">
        	<div class="content-header row"></div>
        	<div class="content-body">
            	<div class="auth-wrapper auth-basic px-2">
                	<div class="auth-inner my-2" style="max-width: <?= ($formWidth ?? 400) . 'px;' ?>">
						<div class="card mb-0">
							<div class="card-body">
								<a href="" class="brand-logo my-1 d-flex justify-content-center align-items-center">
									<img src="<?= img_url('logo/english-for-real.png') ?>" class="w-25" />
								</a>
								<h4 class="card-title mb-0 text-center"><?= $this->show('title') ?></h4>
								<p class="card-text mb-2 text-center"><?= $this->show('heading') ?></p>
								
								<div class="my-2">
									<?php if ($error = $errors->line('default')) : ?>
										<div class="small alert alert-dismissible fade show alert-danger" role="alert">
											<h4 class="alert-heading"><?= __('Erreur') ?></h4>
											<button type="button" class="btn-close" data-bs-dismiss="alert"><span>&times;</span></button>
											<div class="alert-body"><?= $error ?></div>
										</div>
									<?php elseif (session('message') !== null) : ?>
										<div class="small alert alert-dismissible fade show alert-success" role="alert">
											<button type="button" class="btn-close" data-bs-dismiss="alert"><span>&times;</span></button>
											<div class="alert-body"><?= session('message') ?></div>
										</div>
									<?php endif ?>
								</div>

								<?= $this->renderView() ?>

								<?= $this->show('form-footer') ?>
							</div>
						</div>
                	</div>
            	</div>
        	</div>
    	</div>
	</div>

    <script src="<?= lib_js_url('vendors.min.js') ?>"></script>
	<script>
		$(window).on('load', function() {
			if (feather) {
				feather.replace({ height: 14, width: 14 })
			}
		})
		function togglePassword(elt) {
			const password = $(elt).parent().find('input')
			if (password.attr('type') == 'password') {
				password.attr('type', 'text')
				$(elt).empty().append('<i data-feather="eye-off"></i>')
			} else {
				password.attr('type', 'password')
				$(elt).empty().append('<i data-feather="eye"></i>')
			}
			if (feather) {
				feather.replace({ height: 14, width: 14 })
			}
		}
	</script>
</body>
</html>
