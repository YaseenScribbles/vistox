<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    use HasFactory;

    protected $fillable = [
        'contact_id',
        'reason',
        'remarks',
        'user_id'
    ];

    public function visit_images()
    {
        return $this->hasMany(VisitImage::class, 'visit_id');
    }
}
