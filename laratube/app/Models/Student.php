<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'contact',
    ];

    public function getStudent()
    {
       $users = DB::table('students')
            ->join('users', 'students.user_id', '=', 'users.id')
            ->select('users.name', 'users.email', 'users.id', 'students.contact')
            ->get();

        return $users;
    }
}