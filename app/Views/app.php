<!DOCTYPE html>
<html lang="<?= config('app.language', 'fr') ?>" class="loading" data-textdirection="ltr">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
	<title inertia>English For Real</title>
	<link rel="icon" type="image/png" href="<?= img_url('logo/english-for-real.png') ?>" />
	<meta name="author" content="Dimitric Sitchet Tomkeu" />
	<link rel="preconnect" href="https://fonts.googleapis.com/">
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600">
	<link rel="stylesheet" href="<?= lib_css_url('vendors.min.css') ?>">
	<link rel="stylesheet" href="<?= lib_css_url('bootstrap/bootstrap.min.css') ?>" />
    <link rel="stylesheet" href="<?= lib_css_url('bootstrap/bootstrap-extended.min.css') ?>" />
    <link rel="stylesheet" href="<?= lib_css_url('fontawesome/fontawesome.css') ?>" />
    <link rel="stylesheet" href="<?= lib_css_url('select2/select2.min.css') ?>" />
	<link rel="stylesheet" href="<?= css_url('colors.min.css') ?>">
	<link rel="stylesheet" href="<?= css_url('components.min.css') ?>">
	<link rel="stylesheet" href="<?= css_url('themes/dark-layout.min.css') ?>">
  	<link rel="stylesheet" href="<?= css_url('themes/bordered-layout.min.css') ?>">
  	<link rel="stylesheet" href="<?= css_url('themes/semi-dark-layout.min.css') ?>">
	<link rel="stylesheet" href="<?= css_url('vertical-menu.min.css') ?>">
	<link rel="stylesheet" href="<?= css_url('style.css') ?>">

	<?= inertia()->head($page) ?>
</head>
<body class="vertical-layout vertical-menu-modern  navbar-floating footer-fixed  " data-open="click" data-menu="vertical-menu-modern" data-col="">
	<?= inertia()->app($page) ?>
	
	<script src="<?= lib_js_url('vendors.min.js') ?>"></script>
	<script src="<?= lib_js_url('select2/select2.full.min.js') ?>"></script>
  	<script src="<?= js_url('app-menu.min.js') ?>"></script>
  	<script src="<?= js_url('app.min.js') ?>"></script>
  	<script src="<?= js_url('customizer.min.js') ?>"></script>
</body>
</html>
