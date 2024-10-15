<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ip_history', function (Blueprint $table) {
            $table->id(); 
            $table->string('ip'); 
            $table->string('hostname'); 
            $table->string('city'); 
            $table->string('region'); 
            $table->string('country'); 
            $table->string('loc'); 
            $table->string('org'); 
            $table->string('postal'); 
            $table->string('timezone'); 
            $table->foreignId('in_po_users_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ip_history');
    }
};
