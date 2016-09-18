<?php 

echo '<h1>Hello World!</h1><br>';

echo $_REQUEST['author_name'] . '<br>';
echo $_REQUEST['author_surname'] . '<br>';
echo $_REQUEST['date_birth'] . '<br>';
echo $_REQUEST['email'] . '<br>';
echo $_REQUEST['login'] . '<br>';
echo $_REQUEST['password'] . '<br>';


$mysqli = new mysqli('db3.ho.ua', 'pencilboom', 'jMhRtkEPyF', 'pencilboom');

$mysqli->query("INSERT INTO tb_author(name_author, surname_author, date_birth, email_author, username, password) VALUES ('"
 . $_REQUEST['author_name']
 . "', '" . $_REQUEST['author_surname']
 . "', '" . $_REQUEST['date_birth']
 . "', '" . $_REQUEST['email']
 . "', '" . $_REQUEST['login']
 . "', '" . $_REQUEST['password']
 . "')");

$mysqli->close;







$link = mysqli_connect('db3.ho.ua', 'pencilboom', 'jMhRtkEPyF', 'pencilboom');
if (!$link) {
    die('Ошибка подключения (' . mysqli_connect_errno() . ') '
            . mysqli_connect_error());
}
echo('Соединение установлено... ' . mysqli_get_host_info($link) . "\n<br>");





if ($result = mysqli_query($link, 'SELECT * FROM tb_author')) {
    echo('Select вернул ' . mysqli_num_rows($result) . ' строк.<br>');

echo '<table border=1>';
while($obj = $result->fetch_object()){ 
            $line ='<tr>';
            $line.='<td>' . $obj->id_author . '</td>'; 
            $line.='<td>' . $obj->name_author . '</td>'; 
            $line.='<td>' . $obj->surname_author . '</td>'; 
            $line.='<td>' . $obj->date_birth . '</td>';
            $line.='<td>' . $obj->email_author . '</td>';
            $line.='<td>' . $obj->username . '</td>';
            $line.='<td>' . $obj->password . '</td>';
            $line.='</tr>';
echo($line);
        } 

echo ('</table>');

    mysqli_free_result($result);
}


mysqli_close($link);

?>