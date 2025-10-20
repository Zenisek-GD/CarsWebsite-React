<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
         $query = Appointment::with(['patient', 'doctor']);
        
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }
        
        if ($request->has('date')) {
            $query->whereDate('appointment_date', $request->date);
        }

        return response()->json($query->orderBy('appointment_date', 'desc')->paginate(20));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validated = $request->validate([
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:users,id',
            'appointment_date' => 'required|date',
            'reason' => 'required|string',
            'type' => 'required|string'
        ]);

        $appointment = Appointment::create([
            ...$validated,
            'status' => 'Scheduled'
        ]);

        return response()->json($appointment->load(['patient', 'doctor']), 201);
    }

     public function updateStatus(Request $request, Appointment $appointment)
    {
        $request->validate([
            'status' => 'required|in:Scheduled,Confirmed,In Progress,Completed,Cancelled'
        ]);

        $appointment->update(['status' => $request->status]);

        return response()->json($appointment);
    }

     public function dashboardStats()
    {
        $stats = [
            'total_appointments_today' => Appointment::whereDate('appointment_date', today())->count(),
            'pending_appointments' => Appointment::where('status', 'Scheduled')->count(),
            'total_patients' => Patient::count(),
            'available_doctors' => \App\Models\User::where('role', 'doctor')->count()
        ];

        return response()->json($stats);
    }
    /**
     * Display the specified resource.
     */
    public function show(Appointment $appointment)
    {
        return response()->json($appointment->load(['patient', 'doctor']));
    }

     /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appointment $appointment)
    {
        $validated = $request->validate([
            'appointment_date' => 'sometimes|date',
            'reason' => 'sometimes|string',
            'notes' => 'sometimes|string',
            'type' => 'sometimes|string'
        ]);

        $appointment->update($validated);

        return response()->json($appointment->load(['patient', 'doctor']));
    }
   

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
        return response()->json(['message' => 'Appointment deleted successfully']);
    }
}
