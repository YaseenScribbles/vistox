<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'contact_person',
        'shop_name',
        'address',
        'city',
        'zipcode',
        'district',
        'state',
        'phone',
        'email',
        'user_id'
    ];
}
