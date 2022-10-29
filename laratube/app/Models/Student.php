<?php

namespace App\Models;

use Exception;
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
       $users = DB::table('users')
            ->join('students', 'students.user_id', '=', 'users.id')
            ->select('users.name', 'users.email', 'users.id', 'students.contact')
            ->get();

        return $users;
    }


    public function getOneStudent($id)
    {
       $result =  DB::table('users')
       ->join('students', 'students.user_id', '=', 'users.id')
       ->select('users.name', 'users.email', 'users.id', 'students.contact')
       ->where('users.id', $id)
       ->get()->first();
       return $result;
    }

    public function updateStudent($id,$data)
    {
        // print_r($data); die;

        try{
        
            $userdata = [
                "name" => $data['name'],
                "email" => $data['email'],
            ];

            $student_data = [
                "contact" => $data['contact']
            ];
            
            $result =  DB::table('users')->where('id', $id)->update($userdata);
            $result =  DB::table('students')->where('user_id', $id)->update($student_data);
       
            return true;
        }
        catch(Exception $ex)
        {
            echo $ex->getMessage();
            return false;
        }
    }

    public function deleteData($id)
    {
       $result1 = DB::table('users')->where('id', $id)->delete();
       $result2 = DB::table('students')->where('user_id', $id)->delete();

       if($result1 && $result2)
       {
        return true;
       }
    }
}