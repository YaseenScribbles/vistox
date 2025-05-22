<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;

class UniqueMobileNumbers implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */

    protected $table;
    protected $column;
    protected $ignoreId;

    public function __construct(string $table, string $column, $ignoreId = null)
    {
        $this->table = $table;
        $this->column = $column;
        $this->ignoreId = $ignoreId;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $mobiles = array_map('trim', explode(',', $value));

        foreach ($mobiles as $mobile) {
            # code...
            $query = DB::table($this->table);

            if ($this->ignoreId) {
                $query->whereNot('id', $this->ignoreId);
            }

            $query->where(function ($q) use ($mobile) {
                $q->where($this->column, $mobile)
                    ->orWhere($this->column, 'like', "$mobile,%")
                    ->orWhere($this->column,  'like', "%,$mobile")
                    ->orWhere($this->column,  'like',  "%,$mobile,%");
            });

            if ($query->exists()) {
                $fail("Mobile number $mobile is already in use.");
                return;
            }
        }
    }
}
