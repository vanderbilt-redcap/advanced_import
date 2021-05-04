<?php
namespace Vanderbilt\AdvancedImport;

use Vanderbilt\AdvancedImport\App\Models\Queue\Queue;

$page = new \HtmlPage();
$page->PrintHeaderExt();
$root = dirname(__FILE__);

/* $database_directory = AdvancedImport::getDatabaseDirectory();
$db_path = $database_directory.DIRECTORY_SEPARATOR.AdvancedImport::DB_NAME;
if(file_exists($db_path)) unlink($db_path);
$queue = new Queue();
$queue->createJobsTable(); */

/* $newsStore = new \SleekDB\Store("news", $databaseDirectory);
$article = [
  "title" => "Google Pixel XL",
  "about" => "Google announced a new Pixel!",
  "author" => [
    "avatar" => "profile-12.jpg",
    "name" => "Foo Bar"
  ]
 ];
//  $results = $newsStore->insert($article);
$queryBuilder = $newsStore->createQueryBuilder();

$allNews = $queryBuilder->select([])->orderBy(["_id" => "DESC"])->getQuery()
->fetch();

print_r($allNews); */


// $query_string = "CREATE TEMPORARY TABLE IF NOT EXISTS `advanced_ie_test` (
// 	`id` int(11) NOT NULL AUTO_INCREMENT,
// 	PRIMARY KEY (`id`),
// 	`first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
// 	`last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
// 	`description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
// 	) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
// $result = db_query($query_string);
// $error = db_error();
// print_r($error);
// $query_string = "INSERT INTO `advanced_ie_test` (`first_name`, `last_name`) VALUES ('Francesco', 'Delacqua')";
// $result = db_query($query_string);
// $error = db_error();
// print_r($error);
// $query_string = "SELECT * FROM `advanced_ie_test`";
// $result = db_query($query_string);
// while($row = db_fetch_assoc($result)) {
// 	print_r($row);
// }

?>


<?php
$page->PrintFooterExt();
?>

