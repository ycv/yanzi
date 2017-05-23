<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">
        <link rel="stylesheet" type="text/css" href="css/fixedColumns.dataTables.css">
        <script type="text/javascript" language="javascript" src="js/jquery-1.12.3.min.js"></script>
        <script type="text/javascript" language="javascript" src="js/jquery.dataTables.min.js"></script>
        <script type="text/javascript" language="javascript" src="js/dataTables.fixedColumns.min.js"></script>
        <script type="text/javascript" language="javascript" class="init">
            $(document).ready(function () {
                $('#example').DataTable({
                    "ajax": "data/arrays.json",
                    scrollY: "300px",
                    scrollX: true,
                    scrollCollapse: true,
                    paging: false,
                    columnDefs: [
                        {width: '20%', targets: 0}
                    ],
                    fixedColumns: {
                        leftColumns: 2
                    }
                });
            });
        </script>
        <style>
            body {
                font: 90%/1.45em "Helvetica Neue", HelveticaNeue, Arial, Helvetica, sans-serif;
                margin: 0;
                padding: 0;
                color: #333;
                background-color: #fff;
            }
            /* Ensure that the demo table scrolls */
            th, td { white-space: nowrap; }
            div.dataTables_wrapper {
                width: 800px;
                margin: 0 auto;
            }
        </style>
    </head>

    <body class="dt-example">
        <table id="example" class="stripe row-border order-column" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Position</th>
                    <th>Office</th>
                    <th>Age</th>
                    <th>Start date</th>
                    <th>Salary</th>
                    <th>Extn.</th>
                    <th>E-mail</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5.</th>
                    <th>E-6</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                </tr>
            </tfoot>
        </table>
    </body>
</html>