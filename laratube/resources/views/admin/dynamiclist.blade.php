<!DOCTYPE html>
<html>

<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

    <style>
    input::-webkit-calendar-picker-indicator {
        opacity: 0;
    }
    </style>
</head>

<body>
    <h1>The datalist element</h1>
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <form action="/#">
        <label for="browser">Choose your browser from the list:</label>
        <input list="browsers" name="browser" id="browser">

        <datalist id="browsers" class="selectdatalist">

        </datalist>

        <input type="submit">
    </form>

    <script src="assets/js/general.js"></script>
</body>


</html>