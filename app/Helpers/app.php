<?php 

function simple_tel(string $tel): string
{
    return str_replace(['.', ' ', '-', ',', '_', '+'], '', htmlspecialchars($tel));
}
