<?php

namespace App\Http\Controllers;

use App\Models\InPoUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class InPoUserController extends Controller
{
    public function login(Request $request){

        Validator($request->all(), [
            'email' => 'required | email',
            'password' => 'required'
        ])->validate();

        if(!auth()->attempt(request()->only(["email", "password"]))){
            return response([
                'message' => 'credentials issues.. sheeesh'
            ], 401);
        }
        return response([
            "name" => Auth::user()->name
        ], 201);

    }

    public function register(Request $request){
         // Validate the incoming request data
         $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Return error messages if validation fails
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create the user
        $user = InPoUser::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Return the newly created user as a JSON response
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }
    public function logout(Request $request)
    {
        // Invalidate the user session
        Auth::logout();


        return response()->json(['message' => 'User logged out successfully.'], 200);
    }

}
