<!DOCTYPE html>
<html lang="<?= config('app.language', 'fr') ?>">
<head>
    <meta charset="utf-8">
    <title><?= lang('Errors.pageNotFound') ?></title>

    <style>
        body {
            height: 100%;
            background: #fafafa;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            color: #777;
            font-weight: 300;
        }
        h1 {
            font-weight: lighter;
            letter-spacing: normal;
            font-size: 3rem;
            margin-top: 0;
            margin-bottom: 0;
            color: #222;
        }
        .wrap {
            max-width: 1024px;
            margin: 5rem auto;
            padding: 2rem;
            background: #fff;
            text-align: center;
            border: 1px solid #efefef;
            border-radius: 0.5rem;
            position: relative;
        }
        p {
            margin-top: 1.5rem;
        }
    </style>
</head>
<body>
    <div class="wrap">
        <h1>404</h1>

        <p>
            <?php if (! on_prod()) : ?>
                <?= nl2br(esc($message)) ?>
            <?php else : ?>
                <?= lang('Errors.sorryCannotFind') ?>
            <?php endif; ?>
        </p>
    </div>
</body>
</html>
