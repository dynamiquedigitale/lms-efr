<?= $this->extend(config('auth.views.layout')) ?>
<?= $this->section('title', __('Inscription')) ?>
<?= $this->section('heading', __('Inscrivez-vous en une minute et rejoignez notre communauté')) ?>
<?php $this->setVar('formWidth', 475) ?>

<?= $this->section('content') ?>

<form class="auth-login-form" action="<?= route('register') ?>" method="POST">
	<div class="mb-1 row">
		<div class="col-lg-6 mb-1 mb-lg-0">
			<label for="nom" class="form-label"><?= __('Nom') ?> <small class="text-danger">*</small></label>
			<input autocomplete="off" type="text" <?= $this->class(['form-control', 'is-invalid' => $errors->has('nom')]) ?> value="<?= old('nom') ?>" id="nom" name="nom" placeholder="<?= __('Entrez votre nom de famille') ?>" tabindex="1" required autofocus />
			<span class="invalid-feedback"><?= $errors->line('nom') ?></span>
		</div>
		<div class="col-lg-6">
			<label for="prenom" class="form-label"><?= __('Prenom') ?></label>
			<input autocomplete="off" type="text" <?= $this->class(['form-control', 'is-invalid' => $errors->has('prenom')]) ?> value="<?= old('prenom') ?>" id="prenom" name="prenom" placeholder="<?= __('Entrez votre prenom') ?>" tabindex="2" />
			<span class="invalid-feedback"><?= $errors->line('prenom') ?></span>
		</div>
	</div>
	<div class="mb-1 row">
		<div class="col-lg-6 mb-1 mb-lg-0">
			<label for="email" class="form-label"><?= lang('Auth.email') ?> <small class="text-danger">*</small></label>
			<input autocomplete="off" type="email" <?= $this->class(['form-control', 'is-invalid' => $errors->has('email')]) ?> value="<?= old('email') ?>" id="email" name="email" placeholder="<?= __('Entrez votre adresse email') ?>" tabindex="3" required />
			<span class="invalid-feedback"><?= $errors->line('email') ?></span>
		</div>
		<div class="col-lg-6">
			<label for="tel" class="form-label"><?= __('Téléphone') ?> <small class="text-danger">*</small></label>
			<input autocomplete="off" type="tel" <?= $this->class(['form-control', 'is-invalid' => $errors->has('tel')]) ?> value="<?= old('tel') ?>" id="tel" name="tel" placeholder="<?= __('Entrez votre numéro de téléphone') ?>" tabindex="4" required />
			<span class="invalid-feedback"><?= $errors->line('tel') ?></span>
		</div>
	</div>
	<div class="mb-1">
		<label class="form-label" for="password"><?= lang('Auth.password') ?> <small class="text-danger">*</small></label>
		<div class="input-group input-group-merge form-password-toggle">
			<input autocomplete="off" type="password" <?= $this->class(['form-control form-control-merge', 'is-invalid' => $errors->has('password')]) ?> id="password" name="password" placeholder="<?= __('Entrez votre mot de passe') ?>" tabindex="5" required />
			<span onclick="togglePassword(this)" class="input-group-text cursor-pointer"><i data-feather="eye"></i></span>
		</div>
		<span class="invalid-feedback d-inline"><?= $errors->line('password') ?></span>
	</div>
	<button class="btn btn-primary w-100" tabindex="4"><?= lang('Auth.register') ?></button>
</form>

<?= $this->stop() ?>

<?= $this->start('form-footer') ?>
	<p class="text-center mt-2">
		<span><?= lang('Auth.haveAccount') ?></span>
		<a href="<?= route('login') ?>"><span><?= lang('Auth.login') ?></span></a>
	</p>
<?= $this->stop() ?>
