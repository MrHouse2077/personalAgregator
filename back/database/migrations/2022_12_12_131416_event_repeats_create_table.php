<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_repeats', function (Blueprint $table) {
            $table->id();
            $table->integer('event_id');
            $table->integer('amount');
            $table->integer('period');
            $table->date('repeat_on_month')->nullable();
            $table->date('repeat_on_day');
            $table->date('end_date')->nullable();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
