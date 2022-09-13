<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function show()
    {
        // return "Hi, Code Behavior";
        return view('hello');
    }

    public function getData()
    {
        $studendModel = new Student();

        // echo "<pre>";
        $data = $studendModel->getStudent();
        return response()->json($data);
    }

    public function addData(Request $req)
    {
        $json = array();
        $studendModel = new Student();
        $result = $studendModel->addStudent($req->all());

        if($result)
        {
            $json['code'] = 1;
            $json['message'] = 'Details saved successfully';
        }
        else
        {
            $json['code'] = 2;
            $json['message'] = 'Error while saving details';
        }

        return response()->json($json);
        
    }

    function deleteData(Request $req)
    {
        $studendModel = new Student();

        $id = $req->id;

        $del_result =  $studendModel->deleteData($id);

        if($del_result)
        {
            $json['code'] = 1;
            $json['message'] = 'Record deleted successfully';
        }
        else
        {
            $json['code'] = 2;
            $json['message'] = 'Error while deleting record';
        }

        return response()->json($json);
    }

    // getOneData

    public function getOneData(Request $req)
    {
        $studendModel = new Student();

         $id = $req->id;

        // echo "<pre>";
        $data = $studendModel->getOneStudent($id);
        return response()->json($data);
    }

    public function updateData(Request $req)
    {
        $json = array();
        $id = $req->id;
        $studendModel = new Student();
        $result = $studendModel->updateStudent($id,$req->all());

        if($result)
        {
            $json['code'] = 1;
            $json['message'] = 'Details updated successfully';
        }
        else
        {
            $json['code'] = 2;
            $json['message'] = 'Error while updating details';
        }

        return response()->json($json);
        
    }
}