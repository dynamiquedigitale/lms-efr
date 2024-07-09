<?php namespace App\Controllers;

use BlitzPHP\Contracts\Filesystem\FilesystemInterface;
use BlitzPHP\Facades\Storage;
use BlitzPHP\Filesystem\Exceptions\FileNotFoundException;
use BlitzPHP\Http\Request;
use BlitzPHP\Http\Response;

class FileViewerController
{
	private FilesystemInterface $disk;

	public function __construct(private Request $request, private Response $response)
	{	
		$this->disk = Storage::disk('local');
	}

    public function __invoke($path)
    {
        if (! Storage::exists($path)) {
            throw FileNotFoundException::fileNotFound($path);
        }

        $path = $this->disk->path($path);

        if ($this->request->boolean('download')) {
            return $this->response->download($path);
        }

        return $this->response->file($path);
    }
}
