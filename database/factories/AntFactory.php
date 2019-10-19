<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Ant;
use Faker\Generator as Faker;

$factory->define(Ant::class, function (Faker $faker) {
    return [
        'photo_url'  => $faker->imageUrl(),
        'latitude'   => $faker->latitude,
        'longitude'  => $faker->longitude,
        'user_id'    => $faker->numberBetween($min = 1, $max = 20),
        'created_at' => $faker->dateTimeBetween($startDate = '-3 years', $endDate = 'now', $timezone = null), 
        'action'     => $faker->numberBetween($min = 1, $max = 3, $timezone = null),
    ];
});


