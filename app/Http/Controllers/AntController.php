<?php

namespace App\Http\Controllers;

use App\Ant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AntController extends Controller
{

    public function __construct(Ant $ant)
    {
        $this->ant = $ant;        
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {        
        $ants = DB::table('ants')->select('ants.photo_url','ants.id' ,'ants.latitude', 'ants.longitude', 'ants.user_id','users.name as name', 'ants.created_at','ants.action')                                                    
                                                    ->leftjoin('users', 'ants.user_id', 'users.id')
                                                    ->get();

        return compact('ants');
    }

    public function filterYear($year){
        $antsPerYear = $this->ant->whereYear('created_at',$year)->get();
        
        return compact('antsPerYear');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ant  $ant
     * @return \Illuminate\Http\Response
     */
    public function show(Ant $ant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Ant  $ant
     * @return \Illuminate\Http\Response
     */
    public function edit(Ant $ant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ant  $ant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ant $ant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ant  $ant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ant $ant)
    {
        //
    }
}
