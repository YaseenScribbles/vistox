<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = DB::table('contacts');

        if (auth()->user()->role === 'representative') {
            $query->where('state', auth()->user()->state);
        }

        $query->orderByDesc('id');

        $contacts = $query->get();

        return inertia('Contacts/ContactList', compact('contacts'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        $from  = $request->query('from');

        return inertia('Contacts/AddContact', compact('from'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'contact_person' => 'required|string',
            'shop_name' => 'required|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'zipcode' => 'nullable|string|size:6',
            'district' => 'nullable|string',
            'state' => 'required|string',
            'phone' => ['required', 'regex: /^(\d{6,15})(,\s*\d{6,15})*$/', new \App\Rules\UniqueMobileNumbers('contacts', 'phone')],
            'email' => 'nullable|email|unique:contacts,email',
            'user_id' => 'required|exists:users,id'
        ], [
            'phone.regex' => 'Enter a valid mobile number, if more separate them by commas.'
        ]);

        $contact = Contact::create($data);

        return redirect()->route('contacts.show', $contact->id)->with('message', 'Contact created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        return inertia('Contacts/ContactDetails', compact('contact'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        return inertia('Contacts/EditContact', compact('contact'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $data = $request->validate([
            'contact_person' => 'required|string',
            'shop_name' => 'required|string',
            'address' => 'nullable|string',
            'city' => 'nullable|string',
            'zipcode' => 'nullable|string|size:6',
            'district' => 'nullable|string',
            'state' => 'required|string',
            'phone' => ['required', 'regex: /^(\d{6,15})(,\s*\d{6,15})*$/', new \App\Rules\UniqueMobileNumbers('contacts', 'phone', $contact->id)],
            'email' => 'nullable|email|unique:contacts,email,' . $contact->id,
            'user_id' => 'required|exists:users,id'
        ], [
            'phone.regex' => 'Enter a valid mobile number, if more separate them by commas.'
        ]);

        $contact->update($data);
        return redirect()->route('contacts.show', $contact->id)->with('message', 'Contact updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        //
    }
}
