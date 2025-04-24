<?php

namespace App\Http\Controllers;

use App\Jobs\SendPasswordMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return inertia('Users/UserList', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $managers = $this->getManagers();

        return inertia('Users/AddUser', compact('managers'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'nullable',
            'phone' => 'nullable|string',
            'role' => 'required|string',
            'district' => 'nullable|string',
            'state' => 'required|string',
            'agent' => 'nullable|string',
            'manager' => 'nullable|exists:users,id',
        ]);

        $data['password'] = 'password';

        $user = User::create($data);
        return redirect()->route('users.show', $user->id)->with(['message' => 'User created successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $user->load('manager');
        return inertia('Users/UserDetails', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $managers = $this->getManagers();
        return inertia('Users/EditUser', compact('user', 'managers'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable',
            'phone' => 'nullable|string',
            'role' => 'required|string',
            'district' => 'nullable|string',
            'state' => 'required|string',
            'agent' => 'nullable|string',
            'manager' => 'nullable|exists:users,id',
        ]);

        if (!isset($request->password)) {
            unset($data['password']);
        }

        $user->update($data);
        return redirect()->route('users.show', $user->id)->with(['message' => 'User updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->update([
            'active' => $user->active == 1 ? 0 : 1,
        ]);
        return redirect()->route('users.show', $user->id);
    }

    public function getManagers()
    {
        return DB::table('users as u')
            ->select('id', 'name')
            ->where('role', '=', 'manager')
            ->get();
    }

    public function sendPassword(Request $request, User $user)
    {
        $data = $request->validate([
            'password' => 'required|string'
        ]);

        $user->update($data);
        SendPasswordMail::dispatch($user, $data['password']);
        return back()->with(['message' => 'Email sent successfully']);
    }
}
