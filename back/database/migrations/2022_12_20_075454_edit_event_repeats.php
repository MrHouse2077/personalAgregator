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
        Schema::dropIfExists('event_repeats');
        Schema::create('event_repeats', function (Blueprint $table) {

            $table->id();
            $table->integer('event_id');
            $table->integer('amount')->nullable();
            $table->integer('period')->nullable();
            $table->integer('repeat_on_month')->nullable();
            $table->integer('repeat_on_day')->nullable();
            $table->string('repeat_on_week_day')->nullable();
            $table->string('end_date')->nullable();
            
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
