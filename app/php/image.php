<?php
    include "connection.php";
    include "services/dataAccessController.php";
	if(!empty($_FILES['image'])){
        $ext = pathinfo($_FILES['image']['name'],PATHINFO_EXTENSION);

        //$inputData = json_decode(file_get_contents("php://input"));
        $subCategoryName =$_POST['subCategoryName'] ;
        $subCategoryId =$_POST['categoryId'] ;
        $userId =$_POST['userId'] ;
        
        //$subCategoryName = $_POST["subCategoryName"];
        //$subCategoryId = $_POST["subCategoryId"];

        $connection  = connect();
        $image = time().'.'.$ext;
        move_uploaded_file($_FILES["image"]["tmp_name"], 'images/'.$image);
        $response = "Image uploaded successfully as ".$image;
        $query = "INSERT INTO sub_categories (category_id, user_id, sub_category_name, image_name) VALUES ('$subCategoryId',$userId, '$subCategoryName','$image')";
        $response = writeData($connection, $query);
	}else{
		$response = "Image Is Empty";
    }
    //echo json_encode($response);
    echo "Image Is Empty";
?>