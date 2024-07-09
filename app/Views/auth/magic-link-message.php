<?= $this->extend(config('auth.views.layout')) ?>

<?= $this->section('title', lang('Auth.useMagicLink')) ?>

<?= $this->section('content') ?>

<div class="auth-login-form">
    <div class="my-1">
		<p><b><?= lang('Auth.checkYourEmail') ?></b></p>

		<p><?= lang('Auth.magicLinkDetails', [config('auth.magic_link_lifetime') / 60]) ?></p>
	</div>
</div>

<?= $this->stop() ?>
