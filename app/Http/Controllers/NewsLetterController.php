<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Statamic\Facades\Entry;
use Carbon\Carbon;
use Statamic\Facades\Form;
use Illuminate\Support\Facades\Validator;

class NewsLetterController extends Controller
{
    /**
     * Handle newsletter subscription.
     * Validates email, checks for duplicates, and saves new submissions.
     */
    public function newsLetter(Request $request)
    {
        // Get email from request, default to empty string
        $email = $request->get('email') ? $request->get('email') : '';

        // Validate email format and uniqueness
        $validator = Validator::make(['email' => $email], [
            'email' => [
                'required',
                'email',
                'unique_form_submission:subscription,email'
            ]
        ]);

        // If validation fails, return 422 error response
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
                'message' => $validator->errors()->first(),
            ], 422);
        }

        // Load the 'newsletter' form (needed to save submission)
        $form = Form::find('subscription');

        // Save new form submission
        $form->makeSubmission()->data([
            'email' => $email,
        ])->save();

        // Return success response
        return response()->json([
            'status' => true,
            'message' => 'Thank you for subscribing!',
        ]);

    }
}
