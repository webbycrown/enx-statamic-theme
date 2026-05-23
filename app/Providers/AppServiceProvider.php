<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Statamic\Statamic;
use Illuminate\Support\Facades\URL;
use Statamic\Facades\Form;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {


        Validator::extend('unique_form_submission', function ($attribute, $value, $parameters) {

        $form = $parameters[0] ?? null;
        $field = $parameters[1] ?? $attribute;

        if (!$form) return true;

        $submissions = Form::find($form)->submissions();

        return !$submissions->contains(function ($submission) use ($field, $value) {
            return $submission->get($field) === $value;
        });
    });

    Validator::replacer('unique_form_submission', function ($message, $attribute) {
        return 'This email has already been submitted.';
    });
        // Statamic::vite('app', [
        //     'resources/js/cp.js',
        //     'resources/css/cp.css',
        // ]);
    }
}
