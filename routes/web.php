<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\NewsLetterController;
use Statamic\Facades\Site;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;

Site::all()->each(function (Statamic\Sites\Site $site) {
	Route::prefix($site->url())->group(function () {
		Route::statamic('/insight/category/{category_slug}', 'insight-category');
      	Route::statamic('/case-study/category/{category_slug}', 'case-study-category');
	});

});

Route::get('/header-search', [SearchController::class, 'headerSearch'])->name('header.search');
Route::get('/service-search', [SearchController::class, 'serviceSearch'])->name('service.search');
Route::get('/insight-search', [SearchController::class, 'insightSearch'])->name('insight.search');
Route::get('/newsLetter', [NewsLetterController::class, 'newsLetter'])->name('newsLetter');

Route::post('/set-job-session', function (Request $request) {
	
    Session::put('job_id', $request->input('job_id'));
    return response()->json(['success' => true]);
});
