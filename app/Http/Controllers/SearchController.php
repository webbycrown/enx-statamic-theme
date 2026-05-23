<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Statamic\Facades\Entry;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Statamic\Facades\Form;
use Illuminate\Support\Facades\Validator;

class SearchController extends Controller
{
    public function headerSearch(Request $request)
    {   
        // Get query parameters from the request
        $query = $request->get('q', '');
        // 'blog', 'our_events', or 'our_services'
        $type = $request->get('type');
        // Whether to return full JSON results or view
        $full = $request->boolean('full');

         // Search in 'insights' collection by title or slug, then remove duplicates by title
        $insights = Entry::query()
        ->where('collection', 'insights')
        ->where(fn($q) => $q->where('title', 'like', "%$query%")
            ->orWhere('slug', 'like', "%$query%"))
            
        ->get()
        ->unique('title')
        ->values();

        // Search in 'services' collection by title or slug, then remove duplicates by title
        $services = Entry::query()
        ->where('collection', 'services')
          ->where(fn($q) => $q->where('title', 'like', "%$query%")
            ->orWhere('slug', 'like', "%$query%"))
        ->get()
        ->unique('title')
        ->values();

        // If full flag is true, return JSON with results only for the specified type
        if ($full) {
            return response()->json([
                'insights' => $type === 'insights' ? $insights : [],
                'services' => $type === 'services' ? $services : [],
                
            ]);
        }

        // Otherwise, return a partial view with all result types
        return view('partials.search-results', [
            'insights' => $insights,
            'services' => $services,
            'query' => $query,
        ]);
    }

    public function insightSearch( Request $request ){
        // Get query parameters from the request
        $query = $request->get('s', '');

        $entries = Entry::query()
        ->where('collection', 'insights')
        ->when($query, function ($q) use ($query) {
            $q->where(function ($subQuery) use ($query) {
                $subQuery->where('title', 'like', "%{$query}%")
                ->orWhere('slug', 'like', "%{$query}%");
            });
        })
            ->orderBy('updated_at', 'desc') // Sort results by last updated
            ->get()
            ->map(function ($entry) {
                $image = $entry->get('image'); // Get image field (can be array of asset IDs)
                return [
                    'title' => $entry->get('title'),
                    'short_description' => $entry->get('short_description'),
                    'author_name' => $entry->get('author_name'),
                    'publish_date' => $entry->get('publish_date'),
                    'button_label' => $entry->get('buttons')['button_label'],
                    'button_url' => $entry->get('buttons')['button_url'],
                    'slug' => $entry->slug(),
                    'url' => $entry->url(),
                    // Convert asset paths to public URLs
                    'image' =>  collect($image)->map(function ($asset) {
                        return url('assets/'.$asset);
                    })->toArray(),
                ];
            });

        return response()->json($entries);  // Return as JSON response
    } 

    public function serviceSearch( Request $request ){
        // Get query parameters from the request
        $query = $request->get('s', '');

        $entries = Entry::query()
        ->where('collection', 'services')
        ->when($query, function ($q) use ($query) {
            $q->where(function ($subQuery) use ($query) {
                $subQuery->where('title', 'like', "%{$query}%")
                ->orWhere('slug', 'like', "%{$query}%");
            });
        })
        ->orderBy('updated_at', 'desc') // Sort results by last updated
        ->get()
        ->map(function ($entry) {
            $image = $entry->get('icon'); // Get image field (can be array of asset IDs)
            return [
                'title' => $entry->get('title'),
                'short_description' => $entry->get('short_description'),
                'button_text' => $entry->get('button_text'),
                'button_url' => $entry->get('button_url'),
                'slug' => $entry->slug(),
                'url' => $entry->url(),
                // Convert asset paths to public URLs
                'image' =>  collect($image)->map(function ($asset) {
                    return url('assets/'.$asset);
                })->toArray(),
            ];
        });

        return response()->json($entries);  // Return as JSON response
    }
    
}
