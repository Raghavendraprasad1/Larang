<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dynamic;

class DynamicListController extends Controller
{
    public function dynaliclist()
    {
        
        return view('admin/dynamiclist');
    }

    public function getlist(Request $req)
    {
       $city =  $req->city;
        $model = new Dynamic();

       $result = $model->getdata($city);

        $result =  unserialize($result->city);

        

        //    print_r($result); die;

        $list="";
        //    foreach($result as $r)
        //    {
        //        $name=$r->name;
        //        $list .="<option value='$name'>";
            
        //    }

       for($i=0;$i<count($result); $i++)
       {
           $name=$result[$i];
           $list .="<option value='$name'>";
           
       }

       echo $list;
    }
}