<!DOCTYPE html>
<html lang="en">
<head>
    <!--NOTE: Most Web WorldWind examples use jquery, Bootstrap and requirejs but those technologies are NOT-->
    <!--required by Web WorldWind. See SimplestExample.html for an example of using Web WorldWind without them.-->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body  style="background:#000000;color:#ffffff">
<div class="container">
    <div class="row">
        <div class="col-sm-3">
            <h3>Ações positivas: <span id="counter"></span></h3>
            <h3>Senso <span id="ano"></span></h3>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary ano" >2017</button>
                <button type="button" class="btn btn-primary ano" >2018</button>
                <button type="button" class="btn btn-primary ano" >2019</button>
              </div>
            {{-- <div class="dropdown" id="projectionDropdown">
            </div> --}}
            {{-- <br> --}}
            {{-- <h4>Layers</h4>
            <div class="list-group" id="layerList">
            </div>
            <br> --}}
        </div>
        <div class="col-sm-9" id="globe" style="padding:0;margin:0;">
            <canvas id="canvasOne" width="1000" height="1000"
                    style="width: 100%; height: auto; background-color: black;">
                Your browser does not support HTML5 Canvas.
            </canvas>
        </div>
    </div>
</div>
</body>
</html>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.17/require.min.js"></script>
<script src="{{ asset('js/map.js')}}"></script>
