<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IPHistory extends Model
{
    /** @use HasFactory<\Database\Factories\IPHistoryFactory> */
    protected $table = 'ip_histories';

    // Specify the attributes that are mass assignable
    protected $fillable = [
        'ip',
        'in_po_users_id',
        'hostname',
        'city',
        'region',
        'country',
        'loc',
        'org',
        'postal',
        'timezone',
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
