<?php
    include "connection.php";
    include "services/dataAccessController.php";
	if(!empty($_FILES['image'])){
        $ext = pathinfo($_FILES['image']['name'],PATHINFO_EXTENSION);

        //$inputData = json_decode(file_get_contents("php://input"));
        $itemName =$_POST['itemName'] ;
        $categoryId =$_POST['categoryId'] ;
        $userId =$_POST['userId'] ;
        $unitPrice =$_POST['unitPrice'] ;
        $bulkPrice =$_POST['bulkPrice'] ;
        $discount =$_POST['discount'] ;
        $district =$_POST['district'] ;
        $phone_number =$_POST['phone_number'] ;
        $discription =$_POST['discription'] ;
        $amount =$_POST['amount'] ;
        
        //$subCategoryName = $_POST["subCategoryName"];

        $connection  = connect();
        $image = time().'.'.$ext;
        move_uploaded_file($_FILES["image"]["tmp_name"], 'services/buyerRequestImages/'.$image);
        $response = "Image uploaded successfully as ".$image;
        $query = "INSERT INTO buyer_request (user_id, catagory_id, sub_category_id, item_name,item_type,discription,location,amount,unit_price,discount,bulk_price,image_name,phone_number)
         VALUES ('$userId','$categoryId', '1','$itemName','ss','$discription','$district','$amount','$unitPrice','$discount','$bulkPrice','$image','$phone_number')";
        $response = writeData($connection, $query);
	}else{
		$response = "Image Is Empty";
    }
    //echo json_encode($response);
    echo "Image Is Empty";
?>