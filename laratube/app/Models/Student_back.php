<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Student_back extends Model
{
    use HasFactory;

    public function getStudent()
    {
       $result =  DB::table('student')->select('name', 'email', 'contact', 'id')->get();
       return $result;
    }

    public function addStudent($data)
    {
       $result =  DB::table('student')->insert($data);
       return $result;
    }

    public function deleteData($id)
    {
       $result = DB::table('student')->where('id', $id)->delete();
       return $result;
    }

    public function getOneStudent($id)
    {
       $result =  DB::table('student')->select('name', 'email', 'contact', 'id')->where('id', $id)->get()->first();
       return $result;
    }

    public function updateStudent($id,$data)
    {
       $result =  DB::table('student')->where('id', $id)->update($data);
       return $result;
    }


    public function getDataById($id)
    {
       $result =  DB::table('student')->select('name', 'email', 'contact', 'id')->where('id', $id)->get()->first();
       return $result;
    }
}