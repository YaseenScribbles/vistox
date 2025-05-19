<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Visit;
use App\Models\VisitImage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class VisitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $fromDate = $request->from_date;
        $toDate = $request->to_date;

        if (!$fromDate && !$toDate) {
            $fromDate = Carbon::now()->toDateString();
            $toDate = Carbon::now()->toDateString();
        }

        $visitSql = DB::table('visits as v')
            ->join('visit_images as vi', 'vi.visit_id', '=', 'v.id')
            ->join('contacts as c', 'c.id',  '=', 'v.contact_id')
            ->whereBetween('v.created_at', [Carbon::parse($fromDate)->startOfDay(), Carbon::parse($toDate)->endOfDay()])
            ->select([
                'v.id',
                'c.contact_person',
                'c.district',
                'c.zipcode',
                'v.reason',
                'v.remarks',
                'v.created_at',
                DB::raw('count(vi.image_path) as photos')
            ])
            ->groupBy(
                'c.contact_person',
                'c.district',
                'c.zipcode',
                'v.reason',
                'v.remarks',
                'v.created_at',
            )
            ->orderByDesc('v.id');
        return inertia('Visits/VisitList', [
            'visits' => fn() => $visitSql->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $contacts = Contact::all();
        return inertia('Visits/AddVisit', compact('contacts'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'contact_id' => 'required|exists:contacts,id',
            'reason' => 'required|string',
            'remarks' => 'string|nullable',
            'visit_images' => 'required|array',
            'visit_images.*' => 'image|mimes:jpg,jpeg,png|max:1024'
        ], [
            'contact_id.required' => 'Contact must be selected',
            'reason.required' => 'Pick a reason for the visit',
            'visit_images.required' => 'Take photos of the shop'
        ]);

        $visitData = $request->except('visit_images');
        $visitImages = $request->visit_images;

        try {
            //code...
            DB::beginTransaction();
            $visit = Visit::create($visitData);

            foreach ($visitImages as $img) {

                $imgPath = $img->store('images', 'public');

                VisitImage::create([
                    'visit_id' => $visit->id,
                    'image_path' => $imgPath
                ]);
            }

            DB::commit();

            return back()->with('message', 'Visit saved successfully');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return back()->with('message', $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Visit $visit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Visit $visit)
    {
        $contacts = Contact::all();
        $contact = Contact::find($visit->contact_id);
        return inertia('Visits/EditVisit', [
            'visit' => [
                'id' => $visit->id,
                'contact_id' => $visit->contact_id,
                'reason' => $visit->reason,
                'remarks' => $visit->remarks,
                'visit_images' => $visit->visit_images->map(function ($img) {
                    return [
                        'image_path' => asset('storage/' . $img->image_path),
                    ];
                }),
            ],
            'contact' => $contact,
            'contacts' => $contacts,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Visit $visit)
    {
        $request->validate([
            'contact_id' => 'required|exists:contacts,id',
            'reason' => 'required|string',
            'remarks' => 'string|nullable',
            'visit_images' => 'nullable|array',
            'visit_images.*.is_new' => 'boolean',
            'visit_images.*.image' => 'nullable|image|mimes:jpg,jpeg,png|max:1024',
            'visit_images.*.old_path' => 'nullable|string',
        ]);

        try {
            //code...
            DB::beginTransaction();
            $masterData = $request->except('visit_images');
            $visit->update($masterData);
            $visitImages = $request->visit_images;
            $oldImagePaths = array_filter(array_map(function ($image) {
                return !$image['is_new'] ? str_replace(asset('storage') . '/', '', $image['old_path']) : null;
            }, $visitImages));

            $newImages = array_filter(array_map(function ($image) {
                return $image['is_new'] ? $image['image'] : null;
            }, $visitImages));

            $imagestoDelete = $visit->visit_images()->whereNotIn('image_path', $oldImagePaths)->get();

            foreach ($imagestoDelete as $img) {
                # code...
                Storage::disk('public')->delete($img->image_path);
            }

            $visit->visit_images()->whereNotIn('image_path', $oldImagePaths)->delete();

            foreach ($newImages as $img) {
                # code...
                if (!$img) continue;
                $path = $img->store('images', 'public');
                VisitImage::create([
                    'visit_id' => $visit->id,
                    'image_path' => $path,
                ]);
            }

            DB::commit();

            return back()->with('message', 'Visit updated successfully');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return back()->with('message', $th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Visit $visit)
    {
        try {
            //code...
            DB::beginTransaction();
            foreach ($visit->visit_images as $img) {
                Storage::disk('public')->delete($img->image_path);
            }
            $visit->visit_images()->delete();

            $visit->delete();
            DB::commit();
            return back()->with('message', 'Visit deleted successfully');
        } catch (\Throwable $th) {
            //throw $th;
            DB::rollBack();
            return back()->with('message', $th->getMessage());
        }
    }
}
