<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class IPHistoryController extends Controller
{

     public function store(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'in_po_users_id' => 'required|exists:in_po_users,id',
            'ip' => 'required|string|ip',
            'hostname' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'loc' => 'required|string|max:255',
            'org' => 'required|string|max:255',
            'postal' => 'required|string|max:20',
            'timezone' => 'required|string|max:50',
        ]);

        // Return error messages if validation fails
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create a new IpHistory record using the validated data
        $ipHistory = IpHistory::create($validator->validated());

        // Return the newly created record as a JSON response
        return response()->json([
            'message' => 'IP history created successfully.',
            'ip_history' => $ipHistory
        ], 201);
    }
    public function showAll(): JsonResponse
    {
        // Find the IP history record by ID
        $ipHistory = IpHistory::find($id);

        // Check if the record exists
        if (!$ipHistory) {
            return response()->json(['message' => 'IP history not found.'], 404);
        }

        // Return the IP history record as a JSON response
        return response()->json(['ip_history' => $ipHistory], 200);
    }
    public function destroyMultiple(Request $request): JsonResponse
    {
        // Validate that 'ids' is present and is an array
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:ip_histories,id',
        ]);

        // Retrieve the array of IDs from the request
        $ids = $request->input('ids');

        // Delete the records with the specified IDs
        $deletedCount = IpHistory::destroy($ids);

        // Return a success response
        return response()->json([
            'message' => 'IP histories deleted successfully.',
            'deleted_count' => $deletedCount,
        ], 200);
    }
}
