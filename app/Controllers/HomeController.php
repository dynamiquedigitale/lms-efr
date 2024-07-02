<?php 

namespace App\Controllers;

class HomeController extends AppController
{
    public function index()
    {
        return inertia('Home');
    }
}