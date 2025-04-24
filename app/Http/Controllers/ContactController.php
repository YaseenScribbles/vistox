<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contacts = Contact::all();
        return inertia('Contacts/ContactList', compact('contacts'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Contacts/AddContact');
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
            'phone' => 'required|string',
            'email' => 'required|email|unique:contacts,email'
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
            'phone' => 'required|string',
            'email' => 'required|email|unique:contacts,email,' . $contact->id
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
