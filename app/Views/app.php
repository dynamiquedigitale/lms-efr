<!DOCTYPE html>
<html lang="<?= config('app.language', 'fr') ?>">
<head>
	<meta charset="UTF-8">
	<?= inertia()->head($page) ?>
</head>
<body><?= inertia()->app($page) ?></body>
</html>