<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
// use Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class ApiController extends Controller
{
    public function register(Request $req)
    {
        $data =  $req->only('name', 'email', 'password');


        $validator = Validator::make($data, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors() ], 200);
        }

       $user =  User::create([
            'name'=> $req->name,
            'email'=> $req->email, 
            'password'=> bcrypt($req->password)  
        ]);

        if($user)
        {
            //User created, return success response
            return response()->json([
                'success' => true,
                'code' => 1,
                'message' => 'User created successfully',
                'data' => $user
            ], Response::HTTP_OK);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        //valid credential
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6|max:50'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 200);
        }

        //Request is validated
        //Crean token
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json([
                	'success' => false,
                	'message' => 'Login credentials are invalid.',
                ], 400);
            }
        } catch (JWTException $e) {
    	return $credentials;
            return response()->json([
                	'success' => false,
                	'message' => 'Could not create token.',
                ], 500);
        }
 	
 		//Token created, return with success response and jwt token
        return response()->json([
            'success' => true,
            'code' => 1,
            'message' => 'Login Successfully',
            'token' => $token,
            'user_details' => $credentials['email']
        ]);
    }


    public function get_user(Request $request)
    {

        $data =  $request->only('name', 'age', 'profile_image');


        $validator = Validator::make($data, [
            'name' => 'required|string',
            'age' => 'required|integer',
            'profile_image' => 'required|image|mimes:jpeg,jpg,png,gif',
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors(), "status" => "error" ], 200);
        }
        
        $data= array();

        $data['name'] = $request->name;
        $data['age'] = $request->age;

        if($request->file('profile_image')){
            $file= $request->file('profile_image');
            $filename= "profile-images/".$file->getClientOriginalName();
            $file-> move(public_path('images'), $filename);
            $data['profile_image'] = $filename;
        }
        

        DB::table('student')->insert($data);
        $inserted_id = DB::getPdo()->lastInsertId();
        
        
        $result = DB::table('student')->where("id", $inserted_id)->get()->first();
        
        return response()->json(
            [
                "body" => 
                [
                    "user" => [
                        "id" => $result->id,
                        "name" =>  $result->name,
                        "age" => $result->age,
                        "profile_image" => $result->profile_image,
                        "created_at"=> $result->created_at,
                        "updated_at"=> $result->updated_at
                    ]
                ],
                "status" => "successful"
            ]
                );
 
        // $user = JWTAuth::authenticate($request->token);
 
        // return response()->json(['data' => $user]);
    }


    public function get_one_user(Request $request)
    {

        $inserted_id = $request->id;
        
        
        $result = DB::table('student')->where("id", $inserted_id)->get()->first();
        
        if(!empty($result))
        {
            return response()->json(
                [
                    "body" => 
                    [
                        "user" => [
                            "id" => $result->id,
                            "name" =>  $result->name,
                            "age" => $result->age,
                            "profile_image" => $result->profile_image,
                            "created_at"=> $result->created_at,
                            "updated_at"=> $result->updated_at
                        ]
                    ],
                    "status" => "successful"
                ]
                    );
        }else{
            
        
        return response()->json(
            [
                "body" => "No user found",
                "status" => "Error"
            ]
                );
            }
    }

    
}