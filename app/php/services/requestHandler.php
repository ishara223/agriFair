<?php
include "requestController.php";

$inputData = json_decode(file_get_contents("php://input"));
$requestType = $inputData->requestType;

/**
 * Initially client request hits here.
 * Will direct request to the correct request handler based on the
 * request type.
 * 0 -> Read data
 * 1 -> Write data
 * 2 -> Delete data
 * 3 -> Update data
 */
switch($requestType){
    case '0':
        readRequestHandler($inputData);
        break;
    case '1':
        writeRequestHandler($inputData);
        break;
    case '2':
        deleteRequestHandler($inputData);
        break;
    case '3':
        updateRequestHandler($inputData);
        break;
    default:
        echo 'Invalid request 001';
}

function readRequestHandler($inputData){
    $operation = $inputData->operation;

    switch($operation){
        case 'Login':
            loginController($inputData);
            break;
        case 'getSubCategory':
            getSubCategoryController($inputData);
            //echo "vegitable sub catogory";
            break;
        case 'getBuyerRequests':
            getBuyerRequestsController($inputData);
            break;
        case 'getAllBuyerRequests':
            getAllBuyerRequestsController($inputData);
            break;
        case 'searchBuyerRequest':
            searchBuyerRequestsController($inputData);
            break; 
        case 'getMyFarmerRequests':
            getMyFarmerRequestsController($inputData);
            break;
        case 'getOneFarmerRequest':
            getOneFarmerRequestController($inputData);
            break;
        case 'getAllFarmerRequests':
            getAllFarmerRequestsController($inputData);
            break;
        case 'getBuyerRequestData':
            getBuyerRequestDataController($inputData);
            break;
        /*case 'SelectMarks':
            selectMarksController
            selectMarksController($inputData);
            break;
        case 'GetEpisodeTwoData':
            getEpisodeTwoDataController($inputData);
            break;
        case 'GetEpisodeTwoMarks':
            getEpisodeTwoMarksController($inputData);
            break;
        case 'GetEpisodeThreeMarks':
            getEpisodeThreeMarksController($inputData);
            break;
        case 'CheckUsernameDuplicates':
            checkUsernameDuplicatesController($inputData);
            break;
        case 'CheckForAvailableData':
            checkForAvailableDataController($inputData);
            break;
        case 'getMarks':
            getMarks($inputData);
            break;*/
        default:
            echo 'Invalid request 002';
    }
}

function writeRequestHandler($inputData){
    $operation = $inputData->operation;

    switch($operation){
        case 'Registration':
            registrationController($inputData);
            break;
        case 'createFarmerRequest':
            createFarmerRequestController($inputData);
            break;
        case 'createBuyerRequest':
            createbuyerRequestController($inputData);
            break;
        case 'SubmitFeedback':
            submitFeedbackController($inputData);
            break;
        case 'submitUserDetails':
            submitUserDetailsController($inputData);
            break;
        /*case 'saveActivityThreeMarks':
            saveEpisodeThreeActivityOneMarksController($inputData);
            break;
        case 'saveEpisodeTwoMarks':
            saveEpisodeTwoMarksController($inputData);
            break;
        case 'SubmitFeedbackEpisodeTwo':
            submitEpisodeTwoFeedbackController($inputData);
            break;
        case 'SubmitFeedbackEpisodeThree':
            submitEpisodeThreeFeedbackController($inputData);
            break;*/
        case 'UpdateUserDetails':
            updateUserDetailsController($inputData);
            break;
        /*case 'saveEpisodeFourMarks':
            saveEpisodeFourMarksController($inputData);
            break;
        case 'saveMarks':
            saveEpisodeMarksController($inputData);
            break;*/
        default:
            echo 'Invalid request';
    }
}

function updateRequestHandler($inputData){
    $operation = $inputData->operation;

    switch($operation){
        case 'changePassword':
            changePasswordController($inputData);
            break;
        case 'addMarks':
            addMarksController($inputData);
            break;
        default:
            echo 'Invalid request';
    }
}

function deleteRequestHandler($inputData){
    $operation = $inputData->operation;
    switch($operation){
        
        case 'Logout':
            logoutController($inputData);
            break;
        case 'deleteMyFarmerRequests':
            deleteMyFarmerRequestsController($inputData);
            break;    
        case 'REJECT_ENROLLMENT':
            rejectEnrollmentController($inputData);
            break;
        default:
            echo 'Invalid request';
    }
}
