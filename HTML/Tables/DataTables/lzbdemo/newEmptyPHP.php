<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
        <link rel="stylesheet" type="text/css" href="css/dataTables.jqueryui.css">
        <link rel="stylesheet" type="text/css" href="css/fixedColumns.jqueryui.css">

        <script type="text/javascript" language="javascript" src="js/jquery-1.12.3.min.js"></script>
        <script type="text/javascript" language="javascript" src="js/jquery.dataTables.js"></script>
        <script type="text/javascript" language="javascript" src="js/dataTables.jqueryui.js"></script>
        <script type="text/javascript" language="javascript" src="js/dataTables.fixedColumns.js"></script>


        <script type="text/javascript" language="javascript" class="init">
            $(document).ready(function () {
                $('#example').DataTable({
                    "ajax": "data/newjson.json",
                    scrollY: "300px",
                    scrollX: true,
                    scrollCollapse: true,
                    paging: false,
                    columnDefs: [
                        {width: '20%', targets: 0}
                    ],
                    fixedColumns: {
                        leftColumns: 1
                    }
                });
            });
        </script>
        <style type="text/css" class="init">

            body {
                font: 90%/1.45em "Helvetica Neue", HelveticaNeue, Arial, Helvetica, sans-serif;
                margin: 0;
                padding: 0;
                color: #333;
                background-color: #fff;
            }

            /* Ensure that the demo table scrolls */
            th, td {
                white-space: nowrap;
                padding-left: 40px !important;
                padding-right: 40px !important;
            }
            div.dataTables_wrapper {
                width: 800px;
                margin: 0 auto;
            }

        </style>
    </head>
    <body>
        <table id="example" class="stripe row-border order-column" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th rowspan="2">Nawwme</th>
                    <th colspan="2">HR Information</th>
                    <th colspan="3">Contact</th>
                </tr>
                <tr>
                    <th>Position</th>
                    <th>Salary</th>
                    <th>Office</th>
                    <th>Extn.</th>
                    <th>E-mail</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Salary</th>
                    <th>Office</th>
                    <th>Extn.</th>
                    <th>E-mail</th>
                </tr>
            </tfoot>

        </table>
    </body>
</html>

