<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    protected $user;

    public Function __construct()
    {
       $user =  JWTAuth::parseToken()->authenticate();
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function getData(Request $req)
    {
        $search = $req->search;
        $limit = $req->limit;
        $skip = $req->skip;
        $sortval = $req->sort_value;
        $sortorder = $req->sort_order;
        $studendModel = new Student();

        $data = $studendModel->getStudent($search, $limit, $skip, $sortval, $sortorder);
        $dataCount = $studendModel->getStudentCount($search, $limit, $skip);

        $response = array(
            'data' => $data,
            'count' => $dataCount
        );

        return response()->json($response);
    }

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

   
}