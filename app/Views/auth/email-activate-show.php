<?= $this->extend(config('auth.views.layout')) ?>
<?= $this->section('title', __('Vérification de l\'email')) ?>

<?= $this->section('content') ?>

<form class="auth-login-form" action="<?= route('auth-action-verify') ?>" method="POST">
	<p class="card-text text-center"><?= lang('Auth.emailActivateBody') ?></p>
	<div class="my-1">
		<label for="token" class="form-label"><?= __('Code') ?></label>
		<input type="text" <?= $this->class(['form-control', 'is-invalid' => $errors->has('token')]) ?> value="<?= old('token') ?>" id="token" name="token" placeholder="000000" tabindex="1" required autofocus autocomplete="one-time-code" />
		<span class="invalid-feedback"><?= $errors->line('token') ?></span>
	</div>
	
	<button class="btn btn-primary w-100"><?= lang('Auth.send') ?></button>
</form>

<?= $this->stop() ?>

<?= $this->start('form-footer') ?>
	<p class="text-center mt-2">
		<span><?= __('Si vous n\'avez pas reçu l\'e-mail, nous vous en enverrons un autre avec plaisir.') ?></span>
		<a href="<?= route('auth-action-show') ?>"><span><?= __('Renvoyer le code') ?></span></a>
	</p>
<?= $this->stop() ?>
