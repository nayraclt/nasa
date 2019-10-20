<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Ant;
use Faker\Generator as Faker;
use Bluemmb\Faker\PicsumPhotosProvider;

$factory->define(Ant::class, function (Faker $faker) {
    $now = date("2021-10-19");
    return [
        'photo_url'  => $faker->imageUrl(),
        'latitude'   => $faker->latitude,
        'longitude'  => $faker->longitude,
        'user_id'    =>  $faker->numberBetween($min = 1, $max = 20),
        'created_at' => $faker->dateTimeBetween($startDate = '-1 years', $endDate = $now, $timezone = null), 
        'action'     => $faker->numberBetween($min = 1, $max = 3, $timezone = null),
    ];
});


