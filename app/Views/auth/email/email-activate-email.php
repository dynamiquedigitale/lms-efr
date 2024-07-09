<?= $this->extend('\App\Views\auth\email\layout') ?>
<?= $this->section('title', lang('Auth.emailActivateSubject')) ?>

<?= $this->section('content') ?>

<p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
	<?= __('Merci de choisir English For Real pour vous accompagner dans votre apprentissage de la langue anglaise') ?>.
</p>
<p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
	<?= lang('Auth.emailActivateMailBody') ?>
	<br /> Ce code est valide pour <span style="font-weight: 900; color: #1f1f1f">10 minutes</span> et vous ne devez le partager avec personne d'autres, y compris les employés de <?= config('app.name') ?>.
</p>
<p style="margin: 0; margin-top: 70px; font-size: 50px; font-weight: 900; letter-spacing: 35px; color: #ba3d4f;">
	<?= $code ?>
</p>

<?= $this->stop() ?>
